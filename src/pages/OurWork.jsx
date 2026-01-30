import React from 'react'
import Footer from '../components/Footer'
import { WorksHeader } from '../components/WorksHeader'

import ScrollingGallery from '../components/WorksCards'
export const OurWork = () => {
  return (
    <div>
        <WorksHeader/>
        <ScrollingGallery/>
        <Footer/>
    </div>
  )
}
