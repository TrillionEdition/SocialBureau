import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { WorksHeader } from '../components/WorksHeader'
import HomeMouse from '../components/HomeMouse'

import ScrollingGallery from '../components/WorksCards'
export const OurWork = () => {
  return (
    <div>
        <Navbar/>
        {/* <HomeMouse/> */}
        <WorksHeader/>
        <ScrollingGallery/>
        <Footer/>
    </div>
  )
}
