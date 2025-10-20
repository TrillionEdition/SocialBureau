import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useParams } from "react-router-dom";
import profiles from "../data/profiles";
import { FaCrown, FaGem, FaLeaf, FaMapMarkerAlt, FaMedal, FaPiggyBank, FaRocket, FaStar, FaUserGraduate } from "react-icons/fa";
import domtoimage from "dom-to-image";
import { saveAs } from "file-saver";
import axios from 'axios';
import { dashboardAPI } from "../../services/clickupServices";
import { useQuery } from '@tanstack/react-query';

const LEVELS = [
  {
    key: 1,
    name: 'Intern',
    icon: <FaUserGraduate style={{ fontSize: '2.5rem', color: '#ffffffff' }} />,
    bg: '#cd7f32',
    border: '#cd7f32',
    iconColor: '#a97142',
    time: 'Bronze',
    subtitle: 'Intern',
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

const reviews = [
  {
    text: "My buying experience is so nice, and received me very politely. Riding experience is also very good. Very good performance. I never experienced such a kind of performance. Very good service.",
    name: "Karan",
    time: "1 week ago",
    avatar: "https://randomuser.me/api/portraits/men/31.jpg",
  },
  {
    text: "Visited to EO store. Product, particularly welds, looked good. My wife and I took small test ride in parking lot area. We bought with customization after staff went over all the options. Very satisfied.",
    name: "Peter",
    time: "2 weeks ago",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
  },
  {
    text: "I love my e-bike and the customer service is excellent. They respond in a timely manner with loads of information about e-bikes, accessories and maintenance information.",
    name: "Catherine",
    time: "10 days ago",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    text: "Visited to EO store. Product, particularly welds, looked good. My wife and I took small test ride in parking lot area. We bought with customization after staff went over all the options. Very satisfied.",
    name: "Peter",
    time: "2 weeks ago",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
  },
];

export function StaffDashboard() {
  const staffName = useParams();
  const decodedName = decodeURIComponent(staffName.name);
const { data, refetch } = useQuery({
    queryKey: ['profile'],
    queryFn: dashboardAPI,
  });
console.log(data);
  const profile = profiles.find(p => p.name === decodedName);
  const experienceData = [
    { year: "2019", users: 3.2 },
    { year: "2020", users: 4.0 },
    { year: "2021", users: 4.2 },
    { year: "2022", users: 3.4 },
  ];

  // For review carousel
  const [startIdx, setStartIdx] = useState(0);
  const cardsToShow = 3;
  const totalReviews = reviews.length;
  const prev = () => setStartIdx((prevIdx) => Math.max(prevIdx - 1, 0));
  const next = () => setStartIdx((prevIdx) => Math.min(prevIdx + 1, totalReviews - cardsToShow));
  if (!profile) {
    return (
      <>
        <Navbar />
        <div className="bg-black min-h-screen flex flex-col items-center justify-center text-white">
          <h1 className="text-3xl font-bold mb-4">Staff Not Found</h1>
          <p className="text-lg">The staff member "{decodedName}" does not exist.</p>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="bg-black min-h-screen font-sans">
        {/* Cover */}
        <section className="relative mb-3">
          <div className="w-full h-auto flex items-end justify-end rounded-b-lg">
            <img src={`/${profile.img}`} alt={profile.name} className="w-full md:h-auto object-cover rounded-b-lg"/>
          </div>
        </section>

        {/* Details Section */}
        <section className="max-w-full md:max-w-[80vw] mx-auto mt-4 md:mt-8 px-2">
          <div className="bg-white p-4 md:p-5 rounded-lg">
            <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-4">
              <div className="flex-1 w-full">
                <h1 className="text-xl md:text-2xl font-bold text-gray-900 flex items-center gap-2">
                  {profile.name}
                  <img 
                    src="https://img.icons8.com/ios11/512/FA5252/instagram-verification-badge.png" 
                    alt="icon" 
                    className="h-5 w-5"
                  />
                </h1>
                <div className="text-gray-700 mt-2 font-medium">{data?.user.username}</div>
                <div className="text-sm text-gray-500 mt-1">Kochi, Kerala</div>
                <div className="mt-2 text-red-600 font-bold text-sm">50+ connections</div>
                <span className="inline-flex items-center py-1 text-sm">
  <div className="flex flex-col sm:flex-row  justify-start space-y-3 sm:space-y-0 sm:space-x-3">
    {profile.links?.map((tool, key) => (
      <a href={tool.url} key={key}>
        <img
          key={tool.name}
          src={tool.img}
          alt={tool.name}
          className="w-8 h-8 rounded-full object-cover"
        />
      </a>
    ))}
  </div>
</span>
              </div>
              {/* Badge and Tools */}
              <div className="flex flex-col items-end mt-4 md:mt-0">
                <span className="inline-flex items-center px-2 py-1 mb-2 font-semibold">
                  <div className="flex flex-row justify-end mb-2 space-x-3 ml-3">
                    {profile.tools?.map((tool) => (
                      <img
                        key={tool.name}
                        src={tool.img}
                        alt={tool.name}
                        title={tool.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ))}
                  </div>
                </span>
                <div className="flex items-center space-x-4 mt-2">
                  <span className="flex items-center text-yellow-500 font-semibold text-sm border-7 border-yellow-500 rounded-full h-15 w-15 p-2">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.564-.955L10 0l2.948 5.955 6.564.955-4.756 4.635 1.122 6.545z"/></svg>
                    {profile.rating}
                  </span>
                  <span className="text-green-600 font-bold text-lg">{profile.rate}</span>
                </div>
              </div>
            </div>
            <div className="flex space-x-3 mt-5">
              <button className="bg-red-600 text-white px-4 py-2 rounded font-semibold shadow hover:bg-red-700 w-full md:w-auto">Enquire Now</button>
            </div>
          </div>
          
          {/* GRID CARDS - Responsive */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-4">
            <div className="bg-gray-900 rounded-xl p-4 md:p-6 flex flex-col items-center">
              <span className="text-gray-400 text-xs mb-2">Total works done</span>
              <span className="text-3xl font-bold text-white">{data?.worksDone}</span>
              <span className="text-xs text-gray-400 mt-2">Last 30 days</span>
            </div>
            <div className="bg-gray-900 rounded-xl p-4 md:p-6 flex flex-col items-center">
              <span className="text-gray-400 text-xs mb-2">Articles Published</span>
              <span className="text-3xl font-bold text-white">0</span>
              <span className="text-xs text-gray-400 mt-2">This month</span>
            </div>
            <div className="bg-gray-900 rounded-xl p-4 md:p-6 flex flex-col items-center">
              <span className="text-gray-400 text-xs mb-2">Projects Delivered</span>
              <span className="text-3xl font-bold text-white">{profile.projects}5</span>
              <span className="text-xs text-gray-400 mt-2">This quarter</span>
            </div>
            <div className="bg-gray-900 rounded-xl p-4 md:p-6 flex flex-col items-center">
              <span className="text-gray-400 text-xs mb-2">Active Clients</span>
              <span className="text-3xl font-bold text-white">{profile.clients.length}</span>
              <span className="text-xs text-gray-400 mt-2">Realtime</span>
            </div>
          </div>
          
          {/* LEVELS BAR - Responsive flex-wrap */}
          <div className="flex flex-wrap md:flex-nowrap items-center justify-between bg-black p-4 md:p-8 rounded-xl w-full max-w-5xl mx-auto mt-4">
            {LEVELS.map((level, idx) => (
              <React.Fragment key={level.key}>
                <div
                  className={`flex flex-col items-center p-2 md:p-3 rounded-xl ${
                    profile.exp == (idx + 1)
                      ? 'border-2 border-[#D7FF40] shadow-lg scale-105 md:scale-110'
                      : 'border-0'
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-4">
            <div className="rounded-xl p-6 flex flex-col items-center"></div>
            <div className="bg-gray-900 rounded-xl p-4 md:p-6 flex flex-col items-center">
              <span className="text-gray-400 text-xs mb-2">Time Worked</span>
              <span className="text-3xl font-bold text-white">{data ? Math.floor(data.totalHours) : 0} hrs</span>
              <span className="text-xs text-gray-400 mt-2">Last 30 days</span>
            </div>
            <div className="bg-gray-900 rounded-xl p-4 md:p-6 flex flex-col items-center">
              <span className="text-gray-400 text-xs mb-2">Years of Experience</span>
              <span className="text-3xl font-bold text-white">{profile.rating}</span>
              <span className="text-xs text-gray-400 mt-2">This month</span>
            </div>
          </div>
          
          {/* Clients - Responsive */}
          <div className="bg-gray-900 rounded-lg shadow-md p-4 md:p-6 mb-4 mt-4">
            <h2 className="text-lg md:text-xl font-bold mb-4 text-white">Clients</h2>
            <div className="flex flex-wrap gap-8 md:gap-4 justify-start items-center">
              {profile.clients.map((client, idx) => (
                <div
                  key={client.name}
                  className={`w-20 h-24 md:w-24 md:h-28 flex flex-col items-center justify-center rounded-lg shadow hover:shadow-lg transition-shadow p-2
                  ${idx % 2 === 0 ? "bg-white" : "bg-black"}
                  `}
                >
                  <img
                    src={client.logo}
                    alt={client.name}
                    title={client.name}
                    className="w-12 h-12 md:w-16 md:h-16 object-contain mb-2"
                  />
                  <p className={`text-xs font-semibold text-center ${idx % 2 === 0 ? "text-gray-700" : "text-white"}`}>
                    {client.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Review Section - Responsive */}
          <div className="bg-white rounded-lg shadow p-4 md:p-6 flex flex-col md:flex-row items-center md:items-start mt-4">
            {/* Left Side: Quote and Title */}
            <div className="w-full md:w-1/3 flex flex-col items-start mb-4 md:mb-0">
              <svg className="w-8 h-8 md:w-12 md:h-12 text-[#4b1886ff] mb-2" fill="none" viewBox="0 0 48 48">
                <text x="0" y="40" fontSize="40" fontFamily="Arial" fill="currentColor">“</text>
              </svg>
              <h2 className="font-semibold text-lg md:text-2xl mb-2 text-gray-800">What our clients are saying</h2>
              <div className="flex items-center space-x-2 mt-2 md:mt-4">
                <button
                  onClick={prev}
                  disabled={startIdx === 0}
                  className={`p-2 rounded-full border border-[#4b1886ff] text-[#4b1886ff] hover:text-bold hover:bg-[#9c82b9ff] transition ${
                    startIdx === 0 ? "opacity-50 cursor-not-allowed" : ""
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
                  className={`p-2 rounded-full border border-[#4b1886ff] text-[#4b1886ff] hover:text-bold hover:bg-[#9c82b9ff] transition ${
                    startIdx >= totalReviews - cardsToShow ? "opacity-50 cursor-not-allowed" : ""
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
              {profile.reviews.slice(startIdx, startIdx + cardsToShow).map((review, idx) => (
                <div key={idx} className="flex-1 bg-white rounded-lg shadow p-4 md:p-5">
                  <p className="text-gray-700 mb-4">{review.text}</p>
                  <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 md:w-5 md:h-5 text-[#4b1886ff]" fill="currentColor" viewBox="0 0 20 20">
                        <polygon points="10,1 12,7 18,7 13,11 15,17 10,13 5,17 7,11 2,7 8,7" />
                      </svg>
                    ))}
                  </div>
                  <div className="flex items-center mt-2">
                    <img src="https://i.pinimg.com/474x/b0/83/31/b0833156962d005d1ccbee648cba509b.jpg" alt="user_icon" className="h-8 w-8 mr-2 md:mr-5"/>
                    <div>
                      <div className="font-medium text-gray-800 text-xs md:text-sm">{review.name}</div>
                      <div className="text-xs text-gray-500">{review.time}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
      <Footer/>
    </>
  );
}