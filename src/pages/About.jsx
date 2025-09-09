import React, { useEffect, useRef, useState } from 'react'
import Navbar from '../components/Navbar'
import { AboutSB } from '../components/AboutSB'
import { AboutTagline } from '../components/AboutTagline'
import AboutFooter from '../components/AboutFooter'
import AboutCoreValues from '../components/AboutCoreValues'
import Footer from '../components/Footer'
import HomeMouse from '../components/HomeMouse'

export const About = () => {

  return (
    <div className='bg-black text-white '>
      {/* <HomeMouse/>       */}
        <AboutSB/>
        <AboutTagline/>
        <AboutCoreValues/>
        <AboutFooter/>
        <Navbar/>
        <Footer/>
    </div>
  )
}
