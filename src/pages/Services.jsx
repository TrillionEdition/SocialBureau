import React, { useEffect, useRef, useState } from 'react'
import Navbar from '../components/Navbar'
import ServicesHeader from '../components/ServicesHeader'
import ServicesList from '../components/ServicesList'
import ServiceFooter from '../components/ServiceFooter'
import Footer from '../components/Footer'
import Ser from '../components/ViewServices'
import Liquid from '../components/Liquid'

export const Services = () => {
    const listRef = useRef(null);

  // Scroll to the list section
  const handleArrowClick = () => {
    if (listRef.current) {
      listRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Set initial state
        return () => window.removeEventListener('resize', handleResize);
    }, []);
  return (
    <div>
        <Navbar/>
      <ServicesHeader onArrowClick={handleArrowClick} />
      <Liquid/>
      {/* {isMobile ? (
                <ServicesList />
            ) : (
                <Ser/>
            )}

            {!isMobile && (
                <div className="other-desktop-elements">
                </div>
            )}
            {isMobile && (
                <div className="other-mobile-elements">
                </div>
            )} */}
      <ServiceFooter/>
      <Footer/>
    </div>
  )
}
