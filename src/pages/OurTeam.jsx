import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { TeamHeader } from '../components/TeamHeader'
import TeamSection from '../components/TeamSection'
import HomeMouse from '../components/HomeMouse'
import LatestVideos from '../components/YoutubeVideos'
import Testimonials from '../components/Testimonials'

export const OurTeam = () => {
  return (
    <div>
        <Navbar/>
        <TeamHeader/>
        <TeamSection/>
        <LatestVideos/>
        {/* <Testimonials/> */}
        <Footer/>
    </div>
  )
}
