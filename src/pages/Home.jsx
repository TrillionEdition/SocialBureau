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

export const Home = () => {
  const [showPopups, setShowPopups] = useState([false, false, false, false]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const popups = [
    {
      title: "New Openings: Hiring Video Editors",
      subtitle: "Join our Team",
      link: "/careers/video-editor",
    },
    {
      title: "New Openings: Hiring Performance Marketers",
      subtitle: "Join our Team",
      link: "/careers/performance-marketer",
    },
    {
      title: "New Openings: Hiring Graphics Designers",
      subtitle: "Join our Team",
      link: "/careers/graphics-designer",
    },
    {
      title: "New Openings: Hiring SEO Specialist",
      subtitle: "Join our Team",
      link: "/careers/seo-specialist",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setShowPopups((prev) => {
        const newState = [false, false, false, false]; // hide all
        newState[currentIndex] = true;          // show current
        return newState;
      });

      setCurrentIndex((prev) => (prev + 1) % popups.length); // loop
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const closePopup = (index) => {
    setShowPopups((prev) =>
      prev.map((val, i) => (i === index ? false : val))
    );
  };

  return (
    <div className="bg-black">
      <CyberBackground />

      {popups.map(
        (popup, index) =>
          showPopups[index] && (
            <div
              key={index}
              className="fixed right-4 bottom-4 flex flex-col gap-4 z-50 animate-fade-in"
            >
              <div
                className="relative bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-xl p-4 w-64 text-center hover:scale-105 transition-transform duration-300 cursor-pointer"
                onClick={() => navigate(popup.link)}
              >
                {/* Close Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    closePopup(index);
                  }}
                  className="absolute top-2 right-2 text-white text-sm font-bold hover:text-gray-200"
                >
                  ✕
                </button>

                {/* Popup Content */}
                <h2 className="text-lg font-bold text-white mb-1 drop-shadow-lg">
                  {popup.title}
                </h2>
                <p className="text-xs text-white/90 mb-3">{popup.subtitle}</p>
                <button className="bg-white text-purple-600 text-sm font-semibold px-4 py-1.5 rounded-full shadow hover:shadow-lg hover:bg-purple-100 transition-all">
                  Apply
                </button>

                {/* Decorative Neon Circles */}
                <span className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-purple-400 opacity-30 animate-pulse"></span>
                <span className="absolute -bottom-4 -right-4 w-10 h-10 rounded-full bg-blue-400 opacity-30 animate-pulse"></span>
              </div>
            </div>
          )
      )}

      <HomeIntro />
      <Navbar />
      {/* <HomeCards /> */}
      <HomeServices/>
      <LatestCareers />
      <Clients />
      <LatestBlogs posts={posts} />
      <Hometagline />
      <HomeFooter />
      <Footer />
    </div>
  );
};
