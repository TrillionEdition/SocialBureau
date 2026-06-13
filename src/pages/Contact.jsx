import React from 'react'
import ContactSection from '../components/ContactSection'
import TreasureHuntDiamond from '../components/TreasureHuntDiamond'

export const Contact = () => {
  return (
    <div className='bg-black'>
      <ContactSection />
       <TreasureHuntDiamond 
                stepRequired={6} 
                clueText="Great content tells great stories. One of them holds your next clue." 
            />
    </div>
  )
}

