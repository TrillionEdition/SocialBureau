import { useState } from 'react'
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

function App() {
  const VoiceAsst = lazy(() => import('./pages/VoiceAsst'));
  return (
    <>
      <BrowserRouter>
      {/* <Navbar/> */}
       <ScrollTop />
      <Routes>        
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />        
         <Route path="/casestudy" element={<CaseStudy />} />
        <Route path="/services" element={<Services />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/disclaimer" element={<Disclaimer />} />
        <Route path="/careers" element={<Careers/>} />
        <Route path="/our-team" element={<OurTeam/>} />
        <Route path="/our-works" element={<OurWork/>} />
        <Route path="/tool" element={<ScorePage/>} />
        <Route path="/clients" element={<Client/>} />
        <Route path="/blogs/:slug" element={<BlogDetail />} />
        <Route path="/careers/:slug" element={<CareerDetail />} />
        <Route path="/:name" element={<StaffDashboard />} />
        <Route path="/services/:serviceTitle" element={<Service1 />} />
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
