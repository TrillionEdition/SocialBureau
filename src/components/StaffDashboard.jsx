import React, { useState, useRef, useEffect } from "react";
import Footer from "./Footer";
import { useNavigate, useParams } from "react-router-dom";
import { FaCrown, FaDownload, FaGem, FaLeaf, FaMapMarkerAlt, FaMedal, FaPiggyBank, FaRocket, FaStar, FaUserGraduate } from "react-icons/fa";
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { userDetailsAPI } from "../../services/clickupServices";
import { BASE_URL } from "../../utils/urls";

const LEVELS = [
  {
    key: 1,
    name: 'Probation',
    icon: <FaUserGraduate style={{ fontSize: '2.5rem', color: '#ffffffff' }} />,
    bg: '#cd7f32',
    border: '#cd7f32',
    iconColor: '#a97142',
    time: 'Bronze',
    subtitle: 'Probation',
    textColor: 'white',
  },
  {
    key: 2,
    name: 'Bronze',
    icon: <FaMedal style={{ fontSize: '2.5rem', color: '#000000ff' }} />,
    bg: '#C0C0C0',
    border: '#C0C0C0',
    iconColor: 'gray-800',
    time: 'Silver',
    subtitle: '3 months',
    textColor: 'white',
  },
  {
    key: 3,
    name: 'Silver',
    icon: <FaStar className="text-black" style={{ fontSize: '2.5rem' }} />,
    bg: '#FFD700',
    border: '#FFD700',
    iconColor: 'yellow-800',
    time: 'Gold',
    subtitle: '1 Year',
    textColor: 'white',
  },
  {
    key: 4,
    name: 'Gold',
    icon: <FaCrown className="text-black" style={{ fontSize: '2.5rem' }} />,
    bg: '#4fc3f7',
    border: '#4fc3f7',
    iconColor: 'blue-800',
    time: 'Diamond',
    subtitle: '2 Years',
    textColor: 'white',
  },
  {
    key: 5,
    name: 'Diamond',
    icon: <FaGem className="text-black" style={{ fontSize: '2.5rem' }} />,
    bg: '#aef74fff',
    border: '#aef74fff',
    iconColor: 'green-800',
    time: 'Master',
    subtitle: '5 Years',
    textColor: 'white',
  },
];

export function StaffDashboard() {
  const { name } = useParams();
  const decodedName = name ? decodeURIComponent(name) : null;
  const [achievements, setAchievements] = useState([]);
  const [loadingAchievements, setLoadingAchievements] = useState(false);
  // Only run the query when we have a decodedName to avoid unnecessary/invalid requests
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['profile', decodedName],
    queryFn: () => userDetailsAPI(decodedName),
    enabled: Boolean(decodedName),
    staleTime: Infinity,
    cacheTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  });


  const navigate = useNavigate()
  const user = data?.user
  const clickup = data?.clickup

  // For review carousel
  const [startIdx, setStartIdx] = useState(0);
  const cardsToShow = 3;
  const totalReviews = user?.reviews.length;
  const prev = () => setStartIdx((prevIdx) => Math.max(prevIdx - 1, 0));
  const next = () => setStartIdx((prevIdx) => Math.min(prevIdx + 1, totalReviews - cardsToShow));

  // For review submission form
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewFormData, setReviewFormData] = useState({
    name: '',
    email: '',
    company: '',
    review: '',
    rating: 5
  });
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchAchievements = async (userId) => {
    setLoadingAchievements(true);
    console.log("🔍 Fetching achievements directly for user ID:", userId);

    try {
      // Use the direct endpoint which queries the Achievement collection by user ID
      const response = await axios.get(`${BASE_URL}/achievement/user/${userId}`);
      console.log("📊 API Response:", response.data);

      if (response.data && response.data.success) {
        if (response.data.data && Array.isArray(response.data.data)) {
          console.log(`✅ Found ${response.data.data.length} achievements via direct endpoint`);
          setAchievements(response.data.data);
        } else {
          console.log("⚠️ Response success but data format unexpected:", response.data);
          setAchievements([]);
        }
      } else {
        console.warn("⚠️ Direct fetch failed or returned false success.", response.data);
        setAchievements([]);
      }
    } catch (error) {
      console.error('❌ Error fetching achievements:', error);
      setAchievements([]);
    } finally {
      setLoadingAchievements(false);
    }
  };

  // Fetch achievements periodically or when user changes
  useEffect(() => {
    if (user && user._id) {
      fetchAchievements(user._id);
    }
  }, [user?._id]);

  // Sync achievements with user data if fetch hasn't completed or as a fallback
  useEffect(() => {
    if (user?.achievements && user.achievements.length > 0 && achievements.length === 0) {
      setAchievements(user.achievements);
    }
  }, [user?.achievements, achievements.length]);


  const handleReviewInputChange = (e) => {
    const { name, value } = e.target;
    setReviewFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRatingChange = (rating) => {
    setReviewFormData(prev => ({ ...prev, rating }));
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: '', message: '' });

    try {
      const response = await axios.post(`${BASE_URL}/review/add`, {
        ...reviewFormData,
        employee: user._id
      });


      if (response.data.success) {
        setSubmitStatus({ type: 'success', message: 'Thank you! Your review has been submitted and is pending approval.' });
        setReviewFormData({ name: '', email: '', company: '', review: '', rating: 5 });
        setShowReviewForm(false);
        // Optionally open Google 'Write a review' for the user to also post publicly.
        try {
          const GOOGLE_PLACE_ID = import.meta.env.VITE_GOOGLE_PLACE_ID;
          if (GOOGLE_PLACE_ID) {
            const googleReviewUrl = `https://search.google.com/local/writereview?placeid=${GOOGLE_PLACE_ID}`;
            // open in new tab/window (user action initiated earlier via submit)
            window.open(googleReviewUrl, '_blank', 'noopener,noreferrer');
          }
        } catch (err) {
          // silently fail if env is not available or window.open blocked
          console.warn('Could not open Google review link', err);
        }

        // clear the success message after a short delay
        setTimeout(() => setSubmitStatus({ type: '', message: '' }), 5000);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to submit review. Please try again.';
      setSubmitStatus({ type: 'error', message: errorMessage });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading || isFetching) {
    // If decodedName is missing (malformed route) show a small message (avoid firing query)
    if (!decodedName) {
      return (
        <>
          <div className="bg-black min-h-screen flex items-center justify-center text-white p-6">
            <div className="max-w-xl text-center">
              <h1 className="text-2xl font-semibold mb-2">No staff selected</h1>
              <p className="text-gray-400">Please open a staff profile from the team list.</p>
            </div>
          </div>
        </>
      );
    }

    return (
      <>
        <div className="bg-black min-h-screen flex flex-col items-center justify-center text-white">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-red-600 border-solid"></div>
          <h1 className="mt-4 text-xl font-semibold">Loading Staff Profile...</h1>
        </div>
        <Footer />
      </>
    );
  }
  if (!user) {
    return (
      <>
        <div className="bg-black min-h-screen flex flex-col items-center justify-center text-white">
          <h1 className="text-3xl font-bold mb-4">Staff Not Found</h1>
          <p className="text-lg">The staff member "{decodedName}" does not exist.</p>
        </div>
        <Footer />
      </>
    );
  }

  const handleClick = () => {
    const subject = 'Enquiry about your service';
    const body = 'Hi,\n\nlike to enquire about...';

    if (!user?.email) {
      // Option: open mail with only CC if no user email, or show message
      const mailtoNoTo = `mailto:?cc=${encodeURIComponent('web@socialbureau.in')}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailtoNoTo;
      return;
    }

    const mailto = `mailto:${user.email}?cc=${encodeURIComponent('web@socialbureau.in')}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
  };

  function getExperienceFromDOJ(doj) {
    if (!doj) return 0;

    const start = new Date(doj);
    const now = new Date();

    const diffInMs = now - start; // difference in milliseconds
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24); // convert to days

    const diffInMonths = diffInDays / 30.44; // avg month length

    return diffInMonths; // returning months precisely
  }

  function getExpIndex(doj) {
    const months = getExperienceFromDOJ(doj);

    // 🔥 Precision based on actual days difference, not rough year decimals
    if (months < 3) return 0;        // < 3 months completed
    if (months < 12) return 1;       // >= 3 months but < 1 year
    if (months < 24) return 2;       // >= 1 year but < 2 years
    if (months < 60) return 3;       // >= 2 years but < 5 years

    return 3;
  }

  const expIndex = getExpIndex(user?.doj);

  const downloadPagePdf = async () => {
    try {
      // lazy-load heavy libraries only when user requests download
      const domtoimage = (await import('dom-to-image')).default;
      const jsPDF = (await import('jspdf')).default;

      const node = document.documentElement || document.body;
      if (!node) return;

      const scale = 2;
      const width = Math.max(node.scrollWidth, node.clientWidth || 0);
      const height = Math.max(node.scrollHeight, node.clientHeight || 0);

      const dataUrl = await domtoimage.toPng(node, {
        width: width * scale,
        height: height * scale,
        style: {
          transform: 'scale(' + scale + ')',
          transformOrigin: 'top left',
          width: width + 'px',
        },
      });

      const pdf = new jsPDF({ unit: 'px', format: [width, height] });
      pdf.addImage(dataUrl, 'PNG', 0, 0, width, height);
      const fileName = `${user?.name ? user.name.replace(/\s+/g, '_') : 'page'}.pdf`;
      pdf.save(fileName);
    } catch (err) {
      console.error('Failed to generate page PDF', err);
    }
  };

  return (
    <>
      <div className="bg-black min-h-screen font-sans">
        {/* Cover */}
        <section className="relative mb-3">
          <div className="w-full h-auto flex items-end justify-end rounded-b-lg">
            <img src={user?.coverImage} alt={user?.name} className="w-full md:h-auto object-cover rounded-b-lg" />
          </div>
        </section>

        {/* Details Section */}
        <section className="max-w-full md:max-w-[80vw] mx-auto mt-4 md:mt-8 px-2">
          <section className="max-w-full md:max-w-[80vw] mx-auto mt-4 md:mt-8 px-2">
            <div className="bg-white p-4 md:p-5 rounded-lg">
              <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-4">

                {/* Left Side - User Info */}
                <div className="flex-1 w-full text-center md:text-left">
                  <h1 className="text-xl md:text-2xl font-bold text-gray-900 flex justify-center md:justify-start items-center gap-2">
                    {user?.name}
                    <img
                      src="https://img.icons8.com/ios11/512/FA5252/instagram-verification-badge.png"
                      alt="verify"
                      className="h-5 w-5"
                    />
                  </h1>

                  <div className="text-gray-700 mt-2 font-medium">{user?.role}</div>
                  <div className="text-sm text-gray-500 mt-1">Kochi, Kerala</div>
                  <div className="mt-2 text-red-600 font-bold text-sm">50+ connections</div>

                  {/* social media links */}
                  <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-3">
                    {user.links?.map((tool, key) => (
                      <a href={tool.url} key={key}>
                        <img
                          src={tool.img}
                          alt={tool.name}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                      </a>
                    ))}
                  </div>
                </div>

                {/* Right Side - Rating, Price, Tools */}
                <div className="flex flex-col items-center md:items-end w-full md:w-auto">

                  {/* tools */}
                  <div className="flex flex-wrap justify-center md:justify-end gap-3 mb-2 mt-2 md:mt-0">
                    {user?.tools?.map((tool) => (
                      <img
                        key={tool.toolName}
                        src={tool.icon}
                        alt={tool.toolName}
                        title={tool.toolName}
                        className="w-8 h-8 rounded-full object-cover cursor-pointer"
                        onClick={() => navigate(tool.url)}
                      />
                    ))}
                  </div>

                  {/* rating + rate */}
                  <div className="flex items-center justify-center gap-4 mt-2">
                    <span className="flex items-center text-yellow-500 font-semibold text-sm border rounded-full px-3 py-2">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.564-.955L10 0l2.948 5.955 6.564.955-4.756 4.635 1.122 6.545z" />
                      </svg>
                      {user.rating || 4}
                    </span>

                    <span className="text-green-600 font-bold text-lg">
                      ${user.rate}/hr
                    </span>
                  </div>

                </div>
              </div>

              {/* CTA Button */}
              <div className="flex mt-5">
                <button
                  className="bg-red-600 text-white px-4 py-2 rounded font-semibold shadow hover:bg-red-700 w-full md:w-auto"
                  onClick={handleClick}
                >
                  Enquire Now
                </button>
                <button
                  onClick={downloadPagePdf}
                  className="px-3 py-1 rounded-md bg-red-600 text-white text-sm hover:opacity-90 transition ml-2"
                >
                  <FaDownload />
                </button>
              </div>

            </div>
          </section>
          {/* GRID CARDS - Responsive */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-4">
            <div className="bg-gray-900 rounded-xl p-4 md:p-6 flex flex-col items-center">
              <span className="text-gray-400 text-xs mb-2">Total works done</span>
              <span className="text-3xl font-bold text-white">{clickup.tasks}</span>
              <span className="text-xs text-gray-400 mt-2">Last 30 days</span>
            </div>

            <div className="bg-gray-900 rounded-xl p-4 md:p-6 flex flex-col items-center">
              <span className="text-gray-400 text-xs mb-2">Articles Published</span>
              <span className="text-3xl font-bold text-white">0</span>
              <span className="text-xs text-gray-400 mt-2">This month</span>
            </div>

            <div className="bg-gray-900 rounded-xl p-4 md:p-6 flex flex-col items-center">
              <span className="text-gray-400 text-xs mb-2">Projects Delivered</span>
              <span className="text-3xl font-bold text-white">5</span>
              <span className="text-xs text-gray-400 mt-2">This quarter</span>
            </div>

            <div className="bg-gray-900 rounded-xl p-4 md:p-6 flex flex-col items-center">
              <span className="text-gray-400 text-xs mb-2">Active Clients</span>
              <span className="text-3xl font-bold text-white">{user?.clients?.length || 3}</span>
              <span className="text-xs text-gray-400 mt-2">Realtime</span>
            </div>
          </div>


          {/* LEVELS BAR - Responsive flex-wrap */}
          <div className="flex flex-wrap md:flex-nowrap items-center justify-between bg-black p-4 md:p-8 rounded-xl w-full max-w-5xl mx-auto mt-4">
            {LEVELS.map((level, idx) => (
              <React.Fragment key={level.key}>
                <div
                  className={`flex flex-col items-center p-2 md:p-3 rounded-xl ${expIndex === idx
                    ? "border-2 border-[#D7FF40] shadow-lg scale-105 md:scale-110"
                    : "border-0"
                    }`}
                >
                  <div
                    className="w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center text-xl font-bold mb-2"
                    style={{
                      background: level.bg,
                      borderColor: level.border,
                      borderWidth: 4,
                      color: level.iconColor,
                    }}
                  >
                    {level.icon}
                  </div>
                  <span className="text-white font-semibold text-xs md:text-base">{level.time}</span>
                  <span className="text-gray-400 text-xs mt-1">{level.subtitle}</span>
                </div>
                {idx < LEVELS.length - 1 && (
                  <div className="flex-1 h-1 bg-[#D7FF40] mx-1 md:mx-2 hidden sm:block"></div>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Extra Cards - Responsive */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-4">
            <div className="rounded-xl p-6 flex flex-col items-center"></div>
            <div className="bg-gray-900 rounded-xl p-4 md:p-6 flex flex-col items-center">
              <span className="text-gray-400 text-xs mb-2">Time Worked</span>
              <span className="text-3xl font-bold text-white">{Math.round(Number(clickup?.totalHours ?? 0))} hrs</span>
              <span className="text-xs text-gray-400 mt-2">Last 30 days</span>
            </div>
            <div className="bg-gray-900 rounded-xl p-4 md:p-6 flex flex-col items-center">
              <span className="text-gray-400 text-xs mb-2">Experience</span>
              <span className="text-3xl font-bold text-white">
                {(() => {
                  if (!user?.doj) return "0"; // fallback if doj not available

                  const doj = new Date(user.doj);
                  const now = new Date();

                  const diffInMonths =
                    (now.getFullYear() - doj.getFullYear()) * 12 +
                    (now.getMonth() - doj.getMonth());

                  const years = Math.floor(diffInMonths / 12);
                  const months = diffInMonths % 12;

                  return years < 1 ? months : years;
                })()}
              </span>

              <span className="text-xs text-gray-400 mt-2">
                {(() => {
                  if (!user?.doj) return "years"; // fallback label

                  const doj = new Date(user.doj);
                  const now = new Date();

                  const diffInMonths =
                    (now.getFullYear() - doj.getFullYear()) * 12 +
                    (now.getMonth() - doj.getMonth());

                  return diffInMonths < 12 ? "months" : "years";
                })()}
              </span>

            </div>
          </div>

          {/* Clients - Responsive */}
          <div className="bg-gray-900 rounded-2xl shadow-lg p-6 md:p-8 my-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl md:text-2xl font-bold text-white">
                Clients Handled
              </h2>
              <span className="px-3 py-1 text-xs bg-gray-800 text-gray-300 rounded-full">
                {user?.clients?.length || 0} Brands
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {user?.clients?.map((client, idx) => (
                <div
                  key={client.name}
                  onClick={() => client.website && window.open(client.website, "_blank")}
                  className="group cursor-pointer border border-gray-700 hover:border-black rounded-xl transition-all duration-300 p-4 flex flex-col items-center justify-center bg-gray-800/40 hover:bg-gray-800"
                >
                  {client.logo && (
                    <div className="w-14 h-14 md:w-16 md:h-16 flex items-center justify-center">
                      <img
                        src={client.logo}
                        alt={client.name}
                        title={client.name}
                        className="object-contain w-full h-full group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  )}

                  <p className="mt-3 text-xs font-medium text-gray-300 text-center group-hover:text-white transition-colors">
                    {client.name}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ACHIEVEMENTS SECTION */}
          <section className="mt-8 mb-12">
            <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-3xl p-6 md:p-10 shadow-2xl overflow-hidden relative group">
              {/* Decorative Background Elements */}
              <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl group-hover:bg-yellow-500/20 transition-all duration-700"></div>
              <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-red-600/10 rounded-full blur-3xl group-hover:bg-red-600/20 transition-all duration-700"></div>

              <div className="flex flex-col md:flex-row justify-between items-center mb-10 relative z-10">
                <div>
                  <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight flex items-center gap-3">
                    Milestones & Achievements
                    <FaMedal className="text-yellow-400 animate-bounce" />
                  </h2>
                  <p className="text-gray-400 mt-2 text-sm md:text-base font-medium">
                    Celebrating professional excellence and continuous growth
                  </p>
                </div>
                <div className="mt-4 md:mt-0 px-6 py-2 bg-black/40 border border-gray-700 rounded-2xl backdrop-blur-md">
                  <span className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                    {loadingAchievements ? '...' : achievements.length}
                  </span>
                  <span className="text-gray-400 ml-2 text-sm font-semibold uppercase tracking-wider">Badges</span>
                </div>
              </div>

              {loadingAchievements && achievements.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-400 mb-4"></div>
                  <p className="text-gray-400 font-medium">Fetching excellence...</p>
                </div>
              ) : !achievements || achievements.length === 0 ? (
                <div className="text-center py-16 bg-black/20 rounded-2xl border border-dashed border-gray-700 relative z-10">
                  <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaRocket className="text-gray-500 text-2xl" />
                  </div>
                  <h3 className="text-white font-bold text-xl mb-2">The Journey Begins</h3>
                  <p className="text-gray-400 max-w-sm mx-auto px-6">
                    Professional milestones will appear here as they are earned. Every great achievement starts with the decision to try.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 relative z-10">
                  {achievements.map((achievement, idx) => (
                    <div
                      key={achievement._id || idx}
                      className="relative group/card overflow-hidden rounded-2xl border border-gray-800 bg-black/40 
             hover:border-yellow-500/50 transition-all duration-500
             hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(234,179,8,0.25)]"
                    >
                      {/* IMAGE */}
                      {achievement.image ? (
                        <img
                          src={achievement.image}
                          alt={achievement.title}
                          className="w-full h-56 object-cover transition-transform duration-700 group-hover/card:scale-110"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      ) : (
                        <div className="w-full h-56 flex items-center justify-center bg-black">
                          <FaStar className="text-yellow-400 text-5xl drop-shadow-[0_0_12px_rgba(234,179,8,0.6)]" />
                        </div>
                      )}

                      {/* OVERLAY */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent
                  opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-5">

                        <h3 className="text-white font-extrabold text-lg mb-1 translate-y-4
                   group-hover/card:translate-y-0 transition-transform duration-500">
                          {achievement.title || 'Excellence Award'}
                        </h3>

                        {achievement.description && (
                          <p className="text-gray-300 text-sm leading-relaxed opacity-0
                    group-hover/card:opacity-100 transition-opacity duration-500 delay-100 line-clamp-3">
                            {achievement.description}
                          </p>
                        )}

                        <div className="mt-3 flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-gray-400">
                          <span>Achievement</span>
                          <span className="text-yellow-400/80">
                            {achievement.createdAt
                              ? new Date(achievement.createdAt).getFullYear()
                              : '2024'}
                          </span>
                        </div>
                      </div>
                    </div>

                  ))}
                </div>
              )}
            </div>
          </section>


          {/* Review Section - Responsive */}
          <div className="bg-white rounded-lg shadow m-10 p-4 md:p-6 flex flex-col md:flex-row items-center md:items-start mt-4">
            {/* Left Side: Quote and Title */}
            <div className="w-full md:w-1/3 flex flex-col items-start mb-4 md:mb-0">
              <svg className="w-8 h-8 md:w-12 md:h-12 text-[#4b1886ff] mb-2" fill="none" viewBox="0 0 48 48">
                <text x="0" y="40" fontSize="40" fontFamily="Arial" fill="currentColor">"</text>
              </svg>
              <h2 className="font-semibold text-lg md:text-2xl mb-2 text-gray-800">Client Reviews</h2>

              {/* Add Review Button */}
              <button
                onClick={() => setShowReviewForm(!showReviewForm)}
                className="bg-[#4b1886ff] text-white px-4 py-2 rounded-lg hover:bg-[#370d66ff] transition text-sm font-semibold mb-4"
              >
                {showReviewForm ? 'Cancel' : 'Add a Review'}
              </button>

              <div className="flex items-center space-x-2 mt-2 md:mt-4">
                <button
                  onClick={prev}
                  disabled={startIdx === 0}
                  className={`p-2 rounded-full border border-[#4b1886ff] text-[#4b1886ff] hover:text-bold hover:bg-[#9c82b9ff] transition ${startIdx === 0 ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  aria-label="Previous reviews"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={next}
                  disabled={startIdx >= totalReviews - cardsToShow}
                  className={`p-2 rounded-full border border-[#4b1886ff] text-[#4b1886ff] hover:text-bold hover:bg-[#9c82b9ff] transition ${startIdx >= totalReviews - cardsToShow ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  aria-label="Next reviews"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
            {/* Right Side: Review Cards */}
            <div className="w-full md:w-2/3 flex flex-col md:flex-row justify-between space-y-4 md:space-y-0 md:space-x-4">
              {user?.reviews?.slice(startIdx, startIdx + cardsToShow).map((review, idx) => (
                <div key={idx} className="flex-1 bg-white rounded-lg shadow p-4 md:p-5 hover:bg-gray-800/10">
                  <p className="text-gray-700 mb-4">{review.review}</p>
                  <div className="flex items-center mb-2">
                    {Array.from({ length: Number(review.rating) }, (_, i) => (
                      <svg
                        key={i}
                        className="w-4 h-4 md:w-5 md:h-5 text-[#4b1886ff]"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <polygon points="10,1 12,7 18,7 13,11 15,17 10,13 5,17 7,11 2,7 8,7" />
                      </svg>
                    ))}

                  </div>
                  <div className="flex items-center mt-2">
                    <img src="https://res.cloudinary.com/dtwcgfmar/image/upload/v1762926257/b0833156962d005d1ccbee648cba509b_fl58sy.jpg" alt="user_icon" className="h-8 w-8 mr-2 md:mr-5" />
                    <div>
                      <div className="font-medium text-gray-800 text-xs md:text-sm">{review.name}</div>
                      {review.company && (
                        <div className="text-xs text-gray-600 font-medium">{review.company}</div>
                      )}
                      <div className="text-xs text-gray-500">
                        {review.time || new Date(review.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Review Submission Form */}
          {showReviewForm && (
            <div className="bg-gray-900 rounded-lg shadow-lg m-10 p-6 md:p-8 mt-4">
              <h3 className="text-xl md:text-2xl font-bold text-white mb-4">Write Your Review</h3>

              {submitStatus.message && (
                <div className={`mb-4 p-3 rounded-lg ${submitStatus.type === 'success' ? 'bg-green-600/20 text-green-200' : 'bg-red-600/20 text-red-200'
                  }`}>
                  {submitStatus.message}
                </div>
              )}

              <form onSubmit={handleReviewSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={reviewFormData.name}
                      onChange={handleReviewInputChange}
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-red-600"
                      placeholder="Enter your name"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Your Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={reviewFormData.email}
                      onChange={handleReviewInputChange}
                      required
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-red-600"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={reviewFormData.company}
                    onChange={handleReviewInputChange}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-red-600"
                    placeholder="Your company or organization (optional)"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Rating <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => handleRatingChange(star)}
                        className="focus:outline-none"
                      >
                        <svg
                          className={`w-8 h-8 transition ${star <= reviewFormData.rating ? 'text-yellow-500' : 'text-gray-600'
                            }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <polygon points="10,1 12,7 18,7 13,11 15,17 10,13 5,17 7,11 2,7 8,7" />
                        </svg>
                      </button>
                    ))}
                    <span className="text-gray-400 ml-2 self-center">
                      {reviewFormData.rating} star{reviewFormData.rating !== 1 ? 's' : ''}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Your Review <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="review"
                    value={reviewFormData.review}
                    onChange={handleReviewInputChange}
                    required
                    rows="5"
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-red-600 resize-none"
                    placeholder="Share your experience working with this team member..."
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-red-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowReviewForm(false)}
                    className="bg-gray-700 text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-600 transition"
                  >
                    Cancel
                  </button>
                </div>

                <p className="text-xs text-gray-400 mt-2">
                  * Your review will be reviewed by our team before being published.
                </p>
              </form>
            </div>
          )}
        </section>
      </div>
      <Footer />
    </>
  );
}