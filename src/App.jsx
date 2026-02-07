import { useEffect, useState } from "react";
import "./App.css";
import { Home } from "./pages/Home";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import { About } from "./pages/About";
import { Services } from "./pages/Services";
import { CaseStudy } from "./pages/CaseStudy";
import ScrollTop from "./components/ScrollTop";
import { Blog } from "./pages/Blog";
import { Contact } from "./pages/Contact";
import CompanyAchievements from "./pages/CompanyAchievements";
import JohnSamuel from './components/JohnSamuel'
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
// import { Login } from './pages/Login'
import AuthPage from './pages/UserRegistration'
// import { Register } from './pages/Register'
// import ProofFlow from './pages/ProofFlow'
import Landing from './components/ExternalPortfolio'
import Verification from './pages/UserVerification'
import ChooseCharacter from './components/CardChoice'
import AdminCreateJob from './pages/CreateJob'
import Leaderboard from './components/Leaderboard'
import { ForgotPassword } from './components/ForgetPassword'
import { ResetPassword } from './pages/ForgetPassword'
import ApiMarketingPage from './components/ApiMarketing'
// import DashboardX from './pages/DashboardX'
// import SocialBureauInsight from './pages/SocialBureauInsight'
import EditUser from './pages/EditUser'
import NicheMarketing from './components/NicheMarketing'
// import HorizontalScrollSection from './components/trail'
import AnalyticsWidget from './components/Analytics'
import AddAchievementForm from './components/AddAchievementForm'
import UserManagement from './pages/UserManagement'
import AddReview from './components/AddReview'
import Partnership from './components/Partnership'
import PerformanceMarketing from './components/PerformanceMarketing'
import ContentMarketing from './components/ContentMarketing'
import AdTechIntegration from './components/AdTechIntegration'
import Footer from './components/Footer'

function App() {
  const VoiceAsst = lazy(() => import("./pages/VoiceAsst"));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // We handle loading termination via LoadingScreen's onComplete callback
  }, []);

  // if (loading) return <LoadingScreen onComplete={() => setLoading(false)} />;

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <ScrollTop />
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
          <Route path="/careers" element={<Careers />} />
          <Route path="/our-team" element={<OurTeam />} />
          <Route path="/our-works" element={<OurWork />} />
          <Route path="/achievements" element={<CompanyAchievements />} />
          <Route path="/tool" element={<ScorePage />} />

          <Route path="/clients" element={<Client />} />
          <Route path="/blogs/:slug" element={<BlogDetail />} />
          <Route path="/careers/:slug" element={<CareerDetail />} />
          <Route path="/qa-section" element={<QASection />} />
          <Route path="/partnerships" element={<ClientPortfolios />} />
          <Route path="/partners" element={<Partnership/>} />
          <Route path="/Ranjit" element={<Landing />} />
          <Route path="/services/branding" element={<BrandingService />} />
          <Route path="/services/experience-design" element={<XDService />} />
          <Route path="/services/technology" element={<TechnologyService />} />
          <Route
            path="/services/global-marketing"
            element={<GlobalMarketingService />}
          />
          <Route
            path="/services/google-marketing"
            element={<GoogleMarketingService />}
          />
          <Route path="/services/geo" element={<GEOService />} />
          <Route path="/services/seo" element={<SEOService />} />
          <Route path="/services/aeo" element={<AEOService />} />
          <Route
            path="/services/app-advertising"
            element={<AppAdvertisingService />}
          />
          <Route path="/services/:serviceTitle" element={<Service1 />} />
          <Route path="/employee/:name" element={<StaffDashboard />} />
          <Route path="/voice" element={
            <Suspense fallback={<div>Loading...</div>}>
              <VoiceAsst />
            </Suspense>
          } />
          {/* <Route path='/register' element={<Register />} /> */}
          {/* <Route path='/login' element={<Login />} />
          <Route path='/user-register' element={<UserRegister />} />
          <Route path='/pre' element={<ProofFlow />} /> */}
          <Route path='/proof' element={<Verification />} />
          <Route path='/card' element={<ChooseCharacter />} />

          <Route path="/jobs/create" element={<AdminCreateJob />} />

          <Route path='/leaderboard' element={<Leaderboard />} />
          <Route path='/forget-password' element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path='/login' element={<AuthPage />} />

          <Route path="/api-marketing" element={<ApiMarketingPage />} />
          <Route path='/performance-marketing' element={<PerformanceMarketing />} />
          <Route path='/niche-marketing' element={<NicheMarketing />} />
          <Route path='/content-marketing' element={<ContentMarketing />} />
          <Route path='/adTech-marketing' element={<AdTechIntegration />} />
          {/* <Route path="/dashboard-x" element={<DashboardX />} /> */}
          {/* <Route path="/insights" element={<SocialBureauInsight />} /> */}

          <Route path='/edit-user/:id' element={<EditUser />} />
          <Route path='/add-user' element={<EditUser />} />
          <Route path='/user-management' element={<UserManagement />} />

          <Route path='/analytics' element={<AnalyticsWidget />} />

          <Route path='/achievements-form' element={<AddAchievementForm />} />
          <Route path='/add-review' element={<AddReview />} />

          {/* <Route path='/partner' element={<PortfolioPager />} /> */}
          <Route path='/john-samuel' element={<JohnSamuel />} />

          <Route path="/*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
