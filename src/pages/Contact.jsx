import React from 'react'
import Seo from '../components/Seo'
import ContactSection from '../components/ContactSection'
import TreasureHuntDiamond from '../components/TreasureHuntDiamond'

export const Contact = () => {
  return (
    <>
      <Seo
        title="Contact SocialBureau | Growth Marketing, Web & API Solutions"
        description="Talk to SocialBureau about performance marketing, API integrations, web development, and digital growth strategy for your brand or business."
        keywords="contact socialbureau, marketing agency contact, web development agency contact, api marketing agency kochi"
        image="/assets/socialbureau.png"
        url="https://www.socialbureau.in/contact"
        canonicalUrl="https://www.socialbureau.in/contact"
      />
      <div className='bg-black'>
        <ContactSection />
        <TreasureHuntDiamond
          stepRequired={6}
          clueText="Great content tells great stories. One of them holds your next clue."
        />
      </div>
    </>
  )
}

