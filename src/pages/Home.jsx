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
import {Googlereview} from '../components/Googlereview'
import { Intro } from '../components/Intro'
import LoadingSpinner from '../components/LoadingSpinner'
import UpcomingEvents from '../components/UpcomingEvents'

export const Home = () => {
  const navigate = useNavigate();

  // Regular rotating popups (bottom-right)
  const popups = [
    { title: "New Openings: Hiring Video Editors", subtitle: "Join our Team", link: "/careers/video-editor" },
    { title: "New Openings: Hiring Performance Marketers", subtitle: "Join our Team", link: "/careers/performance-marketing-manager" },
    { title: "New Openings: Hiring Graphics Designers", subtitle: "Join our Team", link: "/careers/graphic-designer" },
    { title: "New Openings: Hiring SEO Specialist", subtitle: "Join our Team", link: "/careers/seo-expert" },
    { title: "New Openings: Web Developers", subtitle: "Join our Team", link: "/careers/web-developer" },
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <LoadingSpinner />;


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
                className="relative bg-gradient-to-r from-red-600 to-black rounded-2xl shadow-xl p-4 w-64 text-center hover:scale-105 transition-transform duration-300 cursor-pointer"
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
                <p className="text-xs text-gray-200 mb-3 shadow-xl">{popup.subtitle}</p>
                <button className="bg-white text-gray-800 text-sm font-semibold px-4 py-1.5 rounded-full shadow hover:shadow-lg hover:bg-purple-100 transition-all">
                  Apply
                </button>

                <span className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-red-400 opacity-30 animate-pulse"></span>
                <span className="absolute -bottom-4 -right-4 w-10 h-10 rounded-full bg-red-800 opacity-30 animate-pulse"></span>
              </div>
            </div>
          )
      )}

      <HomeIntro />
      <Navbar />
      <HomeServices/>
      <Intro />     
      {/* <UpcomingEvents />  */}
      <LatestCareers />
      <Googlereview />
      <Clients />
      <LatestBlogs posts={posts} />
      <div className="bg-gray-900 text-white">
      
      <section className="bg-black/55 p-12 mt-10">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold">Get Real Answers. From Real Experts.</h2>
          <p className="mt-4 text-gray-300 max-w-2xl mx-auto">
            Explore SocialBureau’s Live Q/A Hub. Ask questions, solve marketing challenges, and learn from expert discussions.
          </p>

          <button className="mt-6 px-6 py-3 bg-[#3f0000] rounded-full font-semibold hover:bg-[#2f0000] transition" onClick={()=>(navigate('/qa-section'))}>
            Visit Q/A Hub
          </button>
        </div>
      </section>
      </div>
      <Hometagline />
      <HomeFooter />
    
      <Footer />
    </div>
  );
};