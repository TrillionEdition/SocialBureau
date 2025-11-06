import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { StaffDashboard } from '../components/StaffDashboard'
import Seo from '../components/Seo'

export const Team = () => {
  return (
    <div>
      <Seo
  title="Meet the Team | SocialBureau & TrillionEdition Leadership"
  description="The minds behind SocialBureau and TrillionEdition LLP — experts in branding, experience design, and API-powered marketing technology."
  keywords="socialbureau team, trillionedition llp management, marketing agency india team, creative agency leadership, content production experts, performance marketing team, api marketing professionals, digital marketing agency staff, socialbureau directors, marketing innovators india"
  image="/assets/socialbureau.png"
  url="https://www.socialbureau.in/our-team"
/>
        <Navbar/>
        <StaffDashboard/>
        <Footer/>
    </div>
  )
}
