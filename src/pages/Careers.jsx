import React from 'react'
import Footer from '../components/Footer'
import CareersHeader from '../components/CareersHeader'
import CareersPost from '../components/CareersList'
import CareersContent from '../components/CareersContent'
import { CareerCTA } from '../components/CareerCTA'
import Seo from '../components/Seo'
import TreasureHuntDiamond from '../components/TreasureHuntDiamond'

export const Careers = () => {
  return (
    <div className='bg-gradient-to-br from-black to-[#3f0000]'>
      <Seo
              title="SocialBureau Careers | Join India’s Fastest-Growing Creative & Digital Agency"
              description="Explore exciting career opportunities at SocialBureau. Join our team of designers, marketers, developers, and creators shaping the future of digital experiences."
              keywords="socialbureau careers, trillionedition llp jobs, api marketing jobs, digital marketing career, seo expert jobs india, creative agency hiring, video editor hiring, content writer jobs, performance marketing openings, join socialbureau"
              image="/assets/socialbureau.png"
              url="https://www.socialbureau.in/careers"
              canonicalUrl="https://www.socialbureau.in/careers"
            />
        <CareersHeader/>
        <CareersContent/>
        <CareersPost/>
        <CareerCTA/>
        <TreasureHuntDiamond 
          stepRequired={3} 
          clueText="Wisdom leaves footprints. Explore where ideas are shared with the world." 
        />
    </div>
  )
}

