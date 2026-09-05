import React from 'react'
import Seo from '../components/Seo'
import { WorksHeader } from '../components/WorksHeader'
import ScrollingGallery from '../components/WorksCards'

export const OurWork = () => {
  return (
    <>
      <Seo
        title="Our Work | SocialBureau Case Studies & Creative Projects"
        description="Explore SocialBureau's web, marketing, creative, and digital growth work across campaigns, brand systems, and growth-driven experiences."
        keywords="socialbureau case studies, agency portfolio, digital marketing projects, web development work, marketing campaigns examples"
        image="/assets/socialbureau.png"
        url="https://www.socialbureau.in/our-works"
        canonicalUrl="https://www.socialbureau.in/our-works"
      />
      <div>
        <WorksHeader />
        <ScrollingGallery />
      </div>
    </>
  )
}

