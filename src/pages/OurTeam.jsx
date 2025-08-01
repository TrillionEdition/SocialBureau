import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { TeamHeader } from '../components/TeamHeader'
import TeamSection from '../components/TeamSection'
import { TeamFooter } from '../components/TeamFooter'
import HomeMouse from '../components/HomeMouse'

export const OurTeam = () => {
  return (
    <div>
        <Navbar/>
        <HomeMouse/>
        <TeamHeader/>
        <TeamSection/>
        <TeamFooter/>
        <Footer/>
    </div>
  )
}
