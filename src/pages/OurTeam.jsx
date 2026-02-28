import React from 'react'
import Footer from '../components/Footer'
import { TeamHeader } from '../components/TeamHeader'
import TeamSection from '../components/TeamSection'
import HomeMouse from '../components/HomeMouse'
import LatestVideos from '../components/YoutubeVideos'
import Testimonials from '../components/Testimonials'
import TeamLayout from '../components/TeamLayout'
import Seo from '../components/Seo'

export const OurTeam = () => {
  return (
    <div>
       <Seo
        title="Leadership & Team | SocialBureau & TrillionEdition LLP | Marketing Innovators in India"
        description="Meet the SocialBureau team and TrillionEdition LLP management, a powerhouse of creative agency leadership, content production experts, performance marketing, and API-driven digital innovation."
        keywords="socialbureau team, trillionedition llp management, marketing agency india team, creative agency leadership, content production experts, performance marketing team, api marketing professionals, digital marketing agency staff, socialbureau directors, marketing innovators india"
        image="/assets/socialbureau.png"
        canonicalUrl="https://www.socialbureau.in/our-team"
        url="https://www.socialbureau.in/our-team"
      />
        <TeamHeader/>
        <TeamSection/>
        {/* <TeamLayout/>         */}
        <LatestVideos/>
        <Testimonials/>
    </div>
  )
}
