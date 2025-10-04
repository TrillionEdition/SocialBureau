import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ClientDetails from '../components/ClientDetails'
import ClientTestimonials from '../components/ClientTestimonials'

export const Client = () => {
  return (
    <div>
        <Navbar/>
        <ClientDetails/>
        <ClientTestimonials/>
        <Footer/>
    </div>
  )
}
