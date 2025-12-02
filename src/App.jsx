import { useEffect, useState } from 'react'
import './App.css'
import { Home } from './pages/Home'
import Navbar from './components/Navbar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { About } from './pages/About'
import { Services } from './pages/Services'
import { CaseStudy } from './pages/CaseStudy'
import ScrollTop from './components/ScrollTop'
import { Blog } from './pages/Blog'
import { Contact } from './pages/Contact'
import '@fortawesome/fontawesome-free/css/all.min.css';
import { NotFound } from './pages/NotFound'
import React, { lazy, Suspense } from 'react';
import Service1 from './pages/Service1'
import PrivacyPolicy from './components/PrivacyPolicy'
import Disclaimer from './components/Disclaimer'
import { Careers } from './pages/Careers'
import { OurTeam } from './pages/OurTeam'
import { OurWork } from './pages/OurWork'
import { ScorePage } from './pages/ScorePage'
import { Client } from './pages/Client'
import BlogDetail from './components/BlogDetail'
import CareerDetail from './components/CareerDetail'
import { Team } from './pages/Team'
import { StaffDashboard } from './components/StaffDashboard'
import LoadingSpinner from './components/LoadingSpinner'
import BrandingService from './components/BrandingService'
import XDService from './components/XDService'
import TechnologyService from './components/TechnologyService'
import GlobalMarketingService from './components/GlobalMarketingService'
import GoogleMarketingService from './components/GoogleMarketingService'
import AppAdvertisingService from './components/AppAdvertisingService'
import GEOService from './components/GEOService'
import SEOService from './components/SEOService'
import AEOService from './components/AEOService'
import QASection from './components/QASection'
import SubmitBlog from './components/SubmitBlog'
import CookieConsent from './components/CookieConsent'
import CookiePolicy from './components/CookiePolicy'
import Events from './components/Events'
import AddEvent from './components/AddEvent'
import ViewEvents from './components/ViewEvents'
import { ClientPortfolios } from './pages/ClientPortfolios'

function App() {
  const VoiceAsst = lazy(() => import('./pages/VoiceAsst'));
  const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const timer = setTimeout(() => setLoading(false), 1200);
      return () => clearTimeout(timer);
    }, []);
  
    if (loading) return <LoadingSpinner />;
  
  return (
    <>
      <BrowserRouter>
      {/* <Navbar/> */}
       <ScrollTop />
       <CookieConsent />
      <Routes>        
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />        
         <Route path="/casestudy" element={<CaseStudy />} />
        <Route path="/services" element={<Services />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/submit" element={<SubmitBlog />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/manage" element={<ViewEvents />} />
        <Route path="/events/add" element={<AddEvent />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/cookie-policy" element={<CookiePolicy />} />
        <Route path="/disclaimer" element={<Disclaimer />} />
        <Route path="/careers" element={<Careers/>} />
        <Route path="/our-team" element={<OurTeam/>} />
        <Route path="/our-works" element={<OurWork/>} />
        <Route path="/tool" element={<ScorePage/>} />
        <Route path="/clients" element={<Client/>} />
        <Route path="/blogs/:slug" element={<BlogDetail />} />
        <Route path="/careers/:slug" element={<CareerDetail />} />
        <Route path="/qa-section" element={<QASection />} />
        <Route path="/partnerships" element={<ClientPortfolios />} />
        
        <Route path="/services/branding" element={<BrandingService />} />
        <Route path="/services/experience-design" element={<XDService />} />
        <Route path="/services/technology" element={<TechnologyService />} />
        <Route path="/services/global-marketing" element={<GlobalMarketingService />} />
        <Route path="/services/google-marketing" element={<GoogleMarketingService />} />
        <Route path="/services/geo" element={<GEOService />} />
        <Route path="/services/seo" element={<SEOService />} />
        <Route path="/services/aeo" element={<AEOService />} />
        <Route path="/services/app-advertising" element={<AppAdvertisingService />} />
        <Route path="/services/:serviceTitle" element={<Service1 />} />
        <Route path="/:name" element={<StaffDashboard />} />
        <Route path="/voice" element={
          <Suspense fallback={<div>Loading...</div>}>
            <VoiceAsst />
          </Suspense>
        } />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
