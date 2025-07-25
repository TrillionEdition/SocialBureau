import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import CareersHeader from '../components/CareersHeader'
import CareersPost from '../components/CareersPost'
import CareersContent from '../components/CareersContent'

export const Careers = () => {
  return (
    <div>
        <Navbar/>
        <CareersHeader/>
        <CareersContent/>
        <CareersPost/>    
        <div className="max-w-6xl mx-auto text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-6 text-white" style={{ fontFamily: "Playfair Display, serif" }}>Begin Your Journey</h2>
          <p className="text-xl text-gray-300 font-light">Ready to join an organization that values excellence?</p>
            <a
            href="https://www.linkedin.com/jobs/socialbureau.in-jobs-worldwide?position=1&pageNum=0" 
            className="inline-block border hover:border-white rounded-full p-3 px-5 my-10 text-lg font-medium bg-[#ff0000] border-[#ff0000] hover:bg-black hover:scale-105 text-white transition"
          >
            Join Now
          </a>
        </div>    
        <Footer/>
    </div>
  )
}
