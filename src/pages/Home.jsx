import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import HomeIntro from '../components/HomeIntro'
import HomeCards from '../components/HomeCards'
import Hometagline from '../components/Hometagline'
import HomeFooter from '../components/HomeFooter'
import Footer from '../components/Footer'
import { CyberBackground } from '../components/CyberBackground'
import { useNavigate } from 'react-router-dom'
import Clients from '../components/Clients'
import posts from "../data/blogs";
import LatestBlogs from '../components/LatestBlogs'
import LatestCareers from '../components/LatestCareers'
import HomeServices from '../components/HomeServices'
import Chatbot from '../components/Chatbot'

export const Home = () => {
  const navigate = useNavigate();

  // Regular rotating popups (bottom-right)
  const popups = [
    { title: "New Openings: Hiring Video Editors", subtitle: "Join our Team", link: "/careers/video-editor" },
    { title: "New Openings: Hiring Performance Marketers", subtitle: "Join our Team", link: "/careers/performance-marketer" },
    { title: "New Openings: Hiring Graphics Designers", subtitle: "Join our Team", link: "/careers/graphics-designer" },
    { title: "New Openings: Hiring SEO Specialist", subtitle: "Join our Team", link: "/careers/seo-specialist" },
  ];

  // showPopups for rotating bottom-right popups (dynamic length)
  const [showPopups, setShowPopups] = useState(() => Array(popups.length).fill(false));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused) return;

    const interval = setInterval(() => {
      setShowPopups(() => {
        const newState = Array(popups.length).fill(false);
        newState[currentIndex] = true;
        return newState;
      });

      setCurrentIndex((prev) => (prev + 1) % popups.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex, paused, popups.length]);

  const closePopup = (index) => {
    setShowPopups((prev) =>
      prev.map((val, i) => (i === index ? false : val))
    );
    setPaused(true);
  };

  return (
    <div className="bg-black">
      <CyberBackground />
      {/* <Chatbot/> */}

      {/* Rotating bottom-right popups */}
      {popups.map(
        (popup, index) =>
          showPopups[index] && (
            <div
              key={index}
              className="fixed right-4 bottom-4 flex flex-col gap-4 z-40 animate-fade-in"
            >
              <div
                className="relative bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-xl p-4 w-64 text-center hover:scale-105 transition-transform duration-300 cursor-pointer"
                onClick={() => navigate(popup.link)}
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    closePopup(index);
                  }}
                  className="absolute top-2 right-2 text-white text-sm font-bold hover:text-gray-200"
                >
                  ✕
                </button>

                <h2 className="text-lg font-bold text-white mb-1 drop-shadow-lg">{popup.title}</h2>
                <p className="text-xs text-red/90 mb-3 shadow-xl">{popup.subtitle}</p>
                <button className="bg-white text-purple-600 text-sm font-semibold px-4 py-1.5 rounded-full shadow hover:shadow-lg hover:bg-purple-100 transition-all">
                  Apply
                </button>

                <span className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-purple-400 opacity-30 animate-pulse"></span>
                <span className="absolute -bottom-4 -right-4 w-10 h-10 rounded-full bg-blue-400 opacity-30 animate-pulse"></span>
              </div>
            </div>
          )
      )}

      <HomeIntro />
      <Navbar />
      <HomeServices/>
<div className="relative px-6 lg:px-32 py-20 text-white overflow-hidden max-w-6xl mx-auto text-center">

  {/* background gradient glow */}
  <div className="absolute inset-0 -z-10 blur-[160px] opacity-20 bg-gradient-to-br from-purple-600 via-indigo-500 to-blue-600"></div>

  {/* Section Title */}
  <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] mb-16">
    Why us?
  </h1>

  <div className="relative flex flex-col gap-16 items-center">

    {/* CARD 1 */}
    <div className="md:max-w-[70%] bg-gradient-to-br from-black to-[#3f0000] text-gray-300 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-lg hover:shadow-[#3f0000] transition-all md:self-start text-left">
      <h3 className="text-3xl font-semibold mb-3">Cultural Fluency</h3>
      <p className="text-lg opacity-80">
        Native insights across <span className="font-semibold text-[#ff0000ff]">28+ Indian languages</span>&nbsp;
        and micro-cultures, enabling every campaign to resonate at a hyper-local level while scaling nationally.
      </p>
    </div>

    {/* CARD 2 */}
    <div className="md:max-w-[70%] bg-gradient-to-br from-black to-[#3f0000] backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-lg hover:shadow-[#3f0000] transition-all md:self-end text-left">
      <h3 className="text-3xl font-semibold mb-3">ROI-Driven Strategy</h3>
      <p className="text-lg opacity-80">
        Predictive modeling, attribution & LTV optimization →
        making every rupee <span className="font-semibold text-[#ff0000ff]">accountable for growth.</span>
      </p>
    </div>

    {/* CARD 3 */}
    <div className="md:max-w-[70%] bg-gradient-to-br from-black to-[#3f0000] backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-lg hover:shadow-[#3f0000] transition-all md:self-start text-left">
      <h3 className="text-3xl font-semibold mb-3">API-Powered Performance</h3>
      <p className="text-lg opacity-80">
        Frictionless CRM/ERP/e-commerce integration + real-time bidding triggers →
        <span className="font-semibold text-[#ff0000ff]"> machine-speed execution.</span>
      </p>
    </div>
  </div>

  {/* Outcome */}
  <p className="mt-20 font-light opacity-90 text-lg max-w-5xl mx-auto">
    The result?
    <span className="font-semibold text-[#ff0000ff]"> Market dominance →</span>
    higher conversions, lower CAC, and brand love that compounds. If you are a B2B disruptor, SaaS trailblazer, or premium lifestyle brand,
    building your <span className="font-semibold text-[#ff0000ff]">unfair advantage</span> would be our pleasure.
  </p>
</div>


      <LatestCareers />
      <Clients />
      <LatestBlogs posts={posts} />
      <Hometagline />
      <HomeFooter />
      <Footer />
    </div>
  );
};