import React from 'react'
import Navbar from '../components/Navbar'
import HomeMouse from '../components/HomeMouse'
import Footer from '../components/Footer'
import ContactSection from '../components/ContactSection'

export const Contact = () => {
  return (
    <div className='bg-black'>
        <Navbar/>
        {/* <HomeMouse/> */}
        <ContactSection/>
    </div>
  )
}
