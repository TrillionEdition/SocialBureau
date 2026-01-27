import React, { useEffect, useRef, useState } from 'react'
import { AboutSB } from '../components/AboutSB'
import { AboutTagline } from '../components/AboutTagline'
import AboutFooter from '../components/AboutFooter'
import AboutCoreValues from '../components/AboutCoreValues'
import Footer from '../components/Footer'

export const About = () => {

  return (
    <div className='bg-black text-white '>
        <AboutSB/>
        <AboutTagline/>
        <AboutCoreValues/>
        <AboutFooter/>
        <Footer/>
    </div>
  )
}
