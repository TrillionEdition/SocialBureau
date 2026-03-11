import React, { useEffect, useState, lazy, Suspense } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { ReactLenis } from "lenis/react";
import "lenis/dist/lenis.css";
// import Partner1 from "./pages/Partnerships/partner1";
// import ShaileshSivan from "./pages/Partnerships/shaileshsivan";
// import AlenJacob from "./pages/Partnerships/alenJacob";
import CheriyanPage from "./pages/Partnerships/cheriyan";
// import { Blog } from "./pages/Blog";
// import { Contact } from "./pages/Contact";
// These were duplicates so removed standard imports
// import CompanyAchievements from "./pages/CompanyAchievements";
// import JohnSamuel from "./components/JohnSamuel";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "react-toastify/dist/ReactToastify.css";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollTop from "./components/ScrollTop";
import LoadingSpinner from "./components/LoadingSpinner";
import AdminRoute from "./components/AdminRoute";
import CookieConsent from "./components/CookieConsent";
import { ToastContainer } from "react-toastify";

// Lazy-loaded Pages
const Home = lazy(() =>
  import("./pages/Home").then((module) => ({ default: module.Home })),
);
const About = lazy(() =>
  import("./pages/About").then((module) => ({ default: module.About })),
);
const Services = lazy(() =>
  import("./pages/Services").then((module) => ({ default: module.Services })),
);
const CaseStudy = lazy(() =>
  import("./pages/CaseStudy").then((module) => ({ default: module.CaseStudy })),
);
const JohnSamuelPage = lazy(() => import("./pages/Partnerships/johnsamuel"));
const ShaileshSivan = lazy(() => import("./pages/Partnerships/shaileshsivan"));
const AlenJacob = lazy(() => import("./pages/Partnerships/alenJacob"));
const Blog = lazy(() =>
  import("./pages/Blog").then((module) => ({ default: module.Blog })),
);
const Contact = lazy(() =>
  import("./pages/Contact").then((module) => ({ default: module.Contact })),
);
const CompanyAchievements = lazy(() => import("./pages/CompanyAchievements"));
const NotFound = lazy(() =>
  import("./pages/NotFound").then((module) => ({ default: module.NotFound })),
);
const Service1 = lazy(() => import("./pages/Service1"));
const Careers = lazy(() =>
  import("./pages/Careers").then((module) => ({ default: module.Careers })),
);
const OurTeam = lazy(() =>
  import("./pages/OurTeam").then((module) => ({ default: module.OurTeam })),
);
const OurWork = lazy(() =>
  import("./pages/OurWork").then((module) => ({ default: module.OurWork })),
);
const ScorePage = lazy(() =>
  import("./pages/ScorePage").then((module) => ({ default: module.ScorePage })),
);
const Client = lazy(() =>
  import("./pages/Client").then((module) => ({ default: module.Client })),
);
const Team = lazy(() =>
  import("./pages/Team").then((module) => ({ default: module.Team })),
);
// const ATSChecker = lazy(() => import("./pages/ATSChecker"));
// const ResumeGenerator = lazy(() => import("./pages/ResumeGenerator"));
const AuthPage = lazy(() => import("./pages/UserRegistration"));
const Verification = lazy(() => import("./pages/UserVerification"));
const AdminCreateJob = lazy(() => import("./pages/CreateJob"));
const SocialBureauInsight = lazy(() => import("./pages/SocialBureauInsight"));
const EditUser = lazy(() => import("./pages/EditUser"));
const DashboardX = lazy(() => import("./pages/DashboardX"));
const UserManagement = lazy(() => import("./pages/UserManagement"));
const ResetPassword = lazy(() =>
  import("./pages/ForgetPassword").then((module) => ({
    default: module.ResetPassword,
  })),
);
const VoiceAsst = lazy(() => import("./pages/VoiceAsst"));
const CandidateProfilePage = lazy(() => import("./pages/CandidateProfilePage"));
const Sakilan = lazy(() => import("./pages/Partnerships/sakilan"));

// Lazy-loaded Components
const AddAchievementForm = lazy(
  () => import("./components/AddAchievementForm"),
);
const AddEvent = lazy(() => import("./components/AddEvent"));
const AddReview = lazy(() => import("./components/AddReview"));
const AdTechIntegration = lazy(() => import("./components/AdTechIntegration"));
const AEOService = lazy(() => import("./components/AEOService"));
const AdminPanel = lazy(() => import("./components/AdminPannel"));
const AnalyticsWidget = lazy(() => import("./components/Analytics"));
const ApiMarketingPage = lazy(() => import("./components/ApiMarketing"));
const AppAdvertisingService = lazy(
  () => import("./components/AppAdvertisingService"),
);
const BlogDetail = lazy(() => import("./components/BlogDetail"));
const BrandingService = lazy(() => import("./components/BrandingService"));
const CandidateProfile = lazy(
  () => import("./components/HrForum/CandidateProfile"),
);
const CareerDetail = lazy(() => import("./components/CareerDetail"));
const ContentMarketing = lazy(() => import("./components/ContentMarketing"));
const CookiePolicy = lazy(() => import("./components/CookiePolicy"));
const Disclaimer = lazy(() => import("./components/Disclaimer"));
const Events = lazy(() => import("./components/Events"));
const ForgotPassword = lazy(() =>
  import("./components/ForgetPassword").then((module) => ({
    default: module.ForgotPassword,
  })),
);
const GEOService = lazy(() => import("./components/GEOService"));
const GlobalMarketingService = lazy(
  () => import("./components/GlobalMarketingService"),
);
const GoogleMarketingService = lazy(
  () => import("./components/GoogleMarketingService"),
);
const HRForum = lazy(() => import("./components/HrForum/Home"));
const JobDetails = lazy(() => import("./components/HrForum/JobDetails"));
const JobPosting = lazy(() => import("./components/HrForum/JobPosting"));
const JobsList = lazy(() => import("./components/HrForum/JobListing"));
const Partner1 = lazy(() => import("./pages/Partnerships/Partner1"));
const Partner2 = lazy(() => import("./pages/Partnerships/Partner2"));
const Partner3 = lazy(() => import("./pages/Partnerships/Partner3"));
const Partner4 = lazy(() => import("./pages/Partnerships/Partner4"));
const Landing = lazy(() => import("./components/ExternalPortfolio"));
const Leaderboard = lazy(() => import("./components/Leaderboard"));
const Logout = lazy(() => import("./components/Logout"));
const Niche = lazy(() => import("./components/Niche"));
const Partnership = lazy(() => import("./components/Partnership"));
const PerformanceMarketing = lazy(
  () => import("./components/PerformanceMarketing"),
);
const PrivacyPolicy = lazy(() => import("./components/PrivacyPolicy"));
const ProfilePage = lazy(() => import("./components/Profile"));
const QASection = lazy(() => import("./components/QASection"));
const SEOService = lazy(() => import("./components/SEOService"));
const Sivaprasad = lazy(() => import("./components/Sivaprasad"));
const StaffDashboard = lazy(() =>
  import("./components/StaffDashboard").then((module) => ({
    default: module.StaffDashboard,
  })),
);
const SubmitBlog = lazy(() => import("./components/SubmitBlog"));
const TechnologyService = lazy(() => import("./components/TechnologyService"));
const ViewEvents = lazy(() => import("./components/ViewEvents"));
const WebDevelopment = lazy(() => import("./components/Home/WebDevelopment"));
const XDService = lazy(() => import("./components/XDService"));

function ConditionalFooter() {
  const location = useLocation();
  const hideFooterRoutes = [
    "/partnership/partner-1",
    "/partnership/Partner1",
    "/partnership/JohnSamuel",
    "/partnership/shailesh-sivan",
    "/partnership/alen-jacob",
    "/partnership/cheriyan",
    "/partnership/sakilan",
    "/dashboard",
    "/user-management",
    "/analytics",
    "/achievements-form",
    "/add-user",
    "/edit-user",
    "/add-review",
  ];

  const shouldHide = hideFooterRoutes.some(
    (route) =>
      location.pathname === route || location.pathname.startsWith(route + "/"),
  );

  return shouldHide ? null : <Footer />;
}

function ConditionalNavbar() {
  const location = useLocation();
  const hideNavbarRoutes = [
    "/partnership/Partner1",
    "/partnership/JohnSamuel",
    "/partnership/shailesh-sivan",
    "/partnership/alen-jacob",
    "/partnership/cheriyan",
    "/partnership/sakilan",
    "/dashboard",
    "/user-management",
    "/analytics",
    "/achievements-form",
    "/add-user",
    "/edit-user",
    "/add-review",
  ];

  const shouldHide = hideNavbarRoutes.some(
    (route) =>
      location.pathname === route || location.pathname.startsWith(route + "/"),
  );

  return shouldHide ? null : <Navbar />;
}

const lenisOptions = {
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
  smoothTouch: true,
  touchMultiplier: 1.5,
  lerp: 0.1,
  infinite: false,
};

function App() {
  return (
    <ReactLenis root options={lenisOptions}>
      <BrowserRouter>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        <ConditionalNavbar />
        <ScrollTop />
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/casestudy" element={<CaseStudy />} />
            <Route path="/blog" element={<Blog />} />
            <Route
              path="/blog/submit"
              element={
                <AdminRoute>
                  <SubmitBlog />
                </AdminRoute>
              }
            />
            <Route path="/contact" element={<Contact />} />
            <Route path="/events" element={<Events />} />
            <Route
              path="/events/manage"
              element={
                <AdminRoute>
                  <ViewEvents />
                </AdminRoute>
              }
            />
            <Route
              path="/events/add"
              element={
                <AdminRoute>
                  <AddEvent />
                </AdminRoute>
              }
            />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/cookie-policy" element={<CookiePolicy />} />
            <Route path="/disclaimer" element={<Disclaimer />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/our-team" element={<OurTeam />} />
            <Route path="/our-works" element={<OurWork />} />
            <Route path="/achievements" element={<CompanyAchievements />} />
            {/* <Route path="/ats-checker" element={<ATSChecker />} /> */}
            {/* <Route path="/resume-generator" element={<ResumeGenerator />} /> */}
            <Route path="/tool" element={<ScorePage />} />

            <Route path="/blogs/:slug" element={<BlogDetail />} />
            <Route path="/careers/:slug" element={<CareerDetail />} />
            <Route path="/qa-section" element={<QASection />} />

            <Route path="/services/branding" element={<BrandingService />} />
            <Route path="/services/experience-design" element={<XDService />} />
            <Route
              path="/services/technology"
              element={<TechnologyService />}
            />
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

            <Route path="/hr-forum" element={<HRForum />} />
            <Route path="/appy-job" element={<JobPosting />} />
            <Route path="/job-details/:id" element={<JobDetails />} />
            <Route path="/job-listing" element={<JobsList />} />
            <Route path="/candidate-profile" element={<CandidateProfile />} />
            <Route
              path="/candidate-profile/:applicationId"
              element={<CandidateProfilePage />}
            />

            <Route path="/services/:serviceTitle" element={<Service1 />} />
            <Route path="/employee/:name" element={<StaffDashboard />} />
            <Route
              path="/voice"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <VoiceAsst />
                </Suspense>
              }
            />

            <Route path="/proof" element={<Verification />} />

            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="/login" element={<AuthPage />} />
            <Route path="/logout" element={<Logout />} />

            <Route
              path="/api-marketing-agency-in-kochi"
              element={<ApiMarketingPage />}
            />
            <Route
              path="/performance-marketing-agency-in-kochi"
              element={<PerformanceMarketing />}
            />
            <Route
              path="/niche-marketing-agency-in-kochi"
              element={<Niche />}
            />
            <Route
              path="/content-marketing-agency-in-kochi"
              element={<ContentMarketing />}
            />
            <Route
              path="/adTech-marketing-agency-in-kochi"
              element={<AdTechIntegration />}
            />
            <Route
              path="/web-development-agency-in-kochi"
              element={<WebDevelopment />}
            />
            <Route path="/dashboard" element={<DashboardX />} />
            <Route path="/insights" element={<SocialBureauInsight />} />

            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminPanel />
                </AdminRoute>
              }
            />
            <Route
              path="/jobs/create"
              element={
                <AdminRoute>
                  <AdminCreateJob />
                </AdminRoute>
              }
            />
            <Route
              path="/edit-user/:id"
              element={
                <AdminRoute>
                  <EditUser />
                </AdminRoute>
              }
            />
            <Route
              path="/add-user"
              element={
                <AdminRoute>
                  <EditUser />
                </AdminRoute>
              }
            />
            <Route
              path="/user-management"
              element={
                <AdminRoute>
                  <UserManagement />
                </AdminRoute>
              }
            />

            <Route path="/analytics" element={<AnalyticsWidget />} />

            <Route
              path="/achievements-form"
              element={
                <AdminRoute>
                  <AddAchievementForm />
                </AdminRoute>
              }
            />
            <Route path="/add-review" element={<AddReview />} />

            {/* <Route path='/partner' element={<PortfolioPager />} /> */}
            <Route path="/partners" element={<Partnership />} />
            <Route path="/partnership/Ranjit" element={<Landing />} />
            <Route path="/partnership/Sivaprasad" element={<Sivaprasad />} />
            <Route path="/partnership/Partner1" element={<Partner1 />} />
            <Route
              path="/partnership/JohnSamuel"
              element={<JohnSamuelPage />}
            />
            <Route
              path="/partnership/shailesh-sivan"
              element={<ShaileshSivan />}
            />
            <Route path="/partnership/alen-jacob" element={<AlenJacob />} />
            <Route path="/partnership/cheriyan" element={<CheriyanPage />} />
            <Route path="/partnership/sakilan" element={<Sakilan />} />
            <Route path="/partnership/Partner2" element={<Partner2 />} />
            <Route path="/partnership/Partner3" element={<Partner3 />} />
            <Route path="/partnership/Partner4" element={<Partner4 />} />
            

            <Route path="/*" element={<NotFound />} />
          </Routes>
        </Suspense>

        <ConditionalFooter />
      </BrowserRouter>
    </ReactLenis>
  );
}

export default App;
