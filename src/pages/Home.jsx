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

export const Home = () => {
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setShowPopup(true);
  }, []);
  return (
    <div className='bg-black'>    
        <CyberBackground/>
        {showPopup && (
        <div
  className="fixed bottom-5 right-5 bg-black border-2 rounded-2xl p-4 cursor-pointer hover:opacity-90 transition-all z-50"
  style={{
    borderImage: "linear-gradient(to right, #3b82f6, #8b5cf6) 1",
  }}
>
          {/* Close Button */}
          <button
            onClick={(e) => {
              e.stopPropagation(); // prevent redirect when closing
              setShowPopup(false);
            }}
            className="absolute top-1 right-1 text-white font-bold"
          >
            x
          </button>

          {/* Popup Content */}
          <div onClick={() => navigate("/careers")} className='bg-black'>
            <p className="text-sm font-medium text-white">
              Join our Team
            </p>
            <span className="text-xs text-purple-400 ">New Openings</span>
          </div>
        </div>
      )}
        <HomeIntro/>
        <Navbar/>
        <HomeCards/>
        <div style={{ height: "10vh" }} />
        {/* <LatestCareers/>
        <Clients/>
        <LatestBlogs posts={posts} /> */}
        <Hometagline/>
        <HomeFooter/>
        <Footer/>
    </div>
  )
}
