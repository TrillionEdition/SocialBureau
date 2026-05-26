import React, { useEffect, useState, lazy, Suspense } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { ReactLenis } from "lenis/react";
import "lenis/dist/lenis.css";
import CheriyanPage from "./pages/Partnerships/cheriyan";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "react-toastify/dist/ReactToastify.css";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollTop from "./components/ScrollTop";
import LoadingSpinner from "./components/LoadingSpinner";
import AdminRoute from "./components/AdminRoute";
import ProtectedRoute from "./components/ProtectedRoute";
import CookieConsent from "./components/CookieConsent";
import { ToastContainer } from "react-toastify";
import Partner1 from "./pages/Partnerships/johnsamuel";
import { Clickup } from "./pages/Clickup";
import ClientDashboard from "./pages/ClientDashboard";
import ApiMarketingDashboard from "./pages/ApiMarketingDashboard";
import MediaDashboard from "./pages/MediaDashboard";
import PartnershipChatbot from "./components/PartnershipChatbot";
import AjnoraDashboard from "./pages/AjnoraDashboard";
import AjinorahForm from "./components/ClientFormaji";
import CDashboard from "./components/ClickupDash/CDashboard";
import CLogin from "./components/ClickupDash/CLogin";
import AdminClickupClients from "./components/ClickupDash/AdminClickupClients";
import SpinWheel from "./components/Lottery/LotterySpinner";
import LotteryClaims from "./pages/LotteryClaims";

const Home = lazy(() =>
  import("./pages/Home").then((module) => ({ default: module.Home })),
);
const About = lazy(() =>
  import("./pages/About").then((module) => ({ default: module.About })),
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

const Careers = lazy(() => import("./pages/Careers").then(module => ({ default: module.Careers })));
const OurWork = lazy(() => import("./pages/OurWork").then(module => ({ default: module.OurWork })));
const Team = lazy(() => import("./pages/Team").then(module => ({ default: module.Team })));
const EmployeePage = lazy(() => import("./pages/Team/EmployeePage"));
const ATSChecker = lazy(() => import("./pages/Resume/ATSChecker"));
const ResumeGenerator = lazy(() => import("./pages/Resume/ResumeGenerator"));
const AuthPage = lazy(() => import("./pages/UserRegistration"));
const Verification = lazy(() => import("./pages/UserVerification"));
const AdminCreateJob = lazy(() => import("./pages/CreateJob"));
const EditUser = lazy(() => import("./pages/EditUser"));
const DashboardX = lazy(() => import("./pages/DashboardX"));
const BlogDashboard = lazy(() => import("./pages/Blog/BlogDashboard"));
const UserManagement = lazy(() => import("./pages/UserManagement"));
const TeamDashboard = lazy(() => import("./pages/TeamDashboard"));
const AdminTeamDashboard = lazy(() => import("./pages/AdminTeamDashboard"));
const AllApplications = lazy(() => import("./pages/AllApplications"));
const ResetPassword = lazy(() =>

  import("./pages/ForgetPassword").then((module) => ({
    default: module.ResetPassword,
  })),
);
const Sakilan = lazy(() => import("./pages/Partnerships/sakilan"));
const Partner2 = lazy(() => import("./pages/Partnerships/Partner2"));

// Lazy-loaded Components
const AddAchievementForm = lazy(
  () => import("./components/AddAchievementForm"),
);
const AddEvent = lazy(() => import("./components/AddEvent"));
const AddReview = lazy(() => import("./components/AddReview"));
const AdTechIntegration = lazy(() => import("./components/AdTechIntegration"));
const AdminPanel = lazy(() => import("./components/AdminPannel"));
const AnalyticsWidget = lazy(() => import("./components/Analytics"));
const ApiMarketingPage = lazy(() => import("./components/ApiMarketing"));
const BlogDetail = lazy(() => import("./components/BlogDetail"));
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
const HRForum = lazy(() => import("./components/HrForum/Home"));
const JobDetails = lazy(() => import("./components/HrForum/JobDetails"));
const JobPosting = lazy(() => import("./components/HrForum/JobPosting"));
const HrMessages = lazy(() => import("./components/HrForum/HrMessages"));
const JobsList = lazy(() => import("./components/HrForum/JobListing"));
const JobApplicants = lazy(() => import("./components/HrForum/JobApplicants"));
const JohnSamuel = lazy(() => import("./components/JohnSamuel"));
const Landing = lazy(() => import("./components/ExternalPortfolio"));
const Leaderboard = lazy(() => import("./components/Leaderboard"));
const Logout = lazy(() => import("./components/Logout"));
const Niche = lazy(() => import("./components/Niche"));
const Partnership = lazy(() => import("./components/Partnership"));
const PerformanceMarketing = lazy(  () => import("./components/PerformanceMarketing"),);
const PrivacyPolicy = lazy(() => import("./components/PrivacyPolicy"));
const ProfilePage = lazy(() => import("./components/Profile"));
const Sivaprasad = lazy(() => import("./components/Sivaprasad"));
const SubmitBlog = lazy(() => import("./components/SubmitBlog"));
const ViewEvents = lazy(() => import("./components/ViewEvents"));
const WebDevelopment = lazy(() => import("./components/WebDevelopment"));
const PartnershipTemplateSelector = lazy(() => import("./pages/Partnerships/PartnershipTemplate/PartnershipTemplateSelector"));
const PartnershipDataForm = lazy(() => import("./pages/Partnerships/PartnershipTemplate/PartnershipDataForm"));
const InfluencerDataForm = lazy(() => import("./pages/Partnerships/PartnershipTemplate/InfluencerDataForm"));
const DynamicPartnershipPage = lazy(() => import("./pages/Partnerships/PartnershipTemplate/DynamicPartnershipPage"));
const PartnerRegister = lazy(() => import("./pages/Partnerships/PartnershipTemplate/PartnerRegister"));
const PartnerLogin = lazy(() => import("./pages/Partnerships/PartnershipTemplate/PartnerLogin"));
const PartnerDashboard = lazy(() => import("./pages/Partnerships/PartnershipTemplate/PartnerDashboard"));
const PartnerDashboardHub = lazy(() => import("./pages/Partnerships/PartnershipTemplate/PartnerDashboardHub"));
const StudentShowcase = lazy(() => import("./pages/Partnerships/StudentShowcase"));

function ConditionalFooter() {
  const location = useLocation();
  const hideFooterRoutes = [
    "/partnership",
    "/dashboard",
    "/user-management",
    "/analytics",
    "/achievements-form",
    "/add-user",
    "/edit-user",
    "/add-review",
    "/hr-forum",
    "/apply-job",
    "/job-details",
    "/job-listing",
    "/job-applicants",
    "/candidate-profile",
    "/team/admin",
    "/team/dashboard",
    "/client-portal",
    "/client-login",
    "/client-dashboard",
    "/admin",
    "/ajnoradashboard",
    "/lottery"
  ];


  const shouldHide = hideFooterRoutes.some((route) => {
    const normalizedPath = location.pathname.toLowerCase().replace(/\/$/, "");
    const normalizedRoute = route.toLowerCase().replace(/\/$/, "");
    return normalizedPath === normalizedRoute || normalizedPath.startsWith(normalizedRoute + "/");
  });

  return shouldHide ? null : <Footer />;
}

function ConditionalNavbar() {
  const location = useLocation();
  const hideNavbarRoutes = [
    "/partnership",
    "/dashboard",
    "/user-management",
    "/analytics",
    "/achievements-form",
    "/add-user",
    "/edit-user",
    "/add-review",
    "/hr-forum",
    "/apply-job",
    "/job-details",
    "/job-listing",
    "/job-applicants",
    "/candidate-profile",
    "/client-portal",
    "/client-login",
    "/client-dashboard",
    "/admin",
    "/ajnoradashboard",
    "/lottery"
  ];


  const shouldHide = hideNavbarRoutes.some((route) => {
    const normalizedPath = location.pathname.toLowerCase().replace(/\/$/, "");
    const normalizedRoute = route.toLowerCase().replace(/\/$/, "");
    return normalizedPath === normalizedRoute || normalizedPath.startsWith(normalizedRoute + "/");
  });

  return shouldHide ? null : <Navbar />;
}

function ConditionalChatbot() {
  const location = useLocation();
  const path = location.pathname.toLowerCase();

  // Define actual partner slugs that should have the chatbot
  const actualPartnerSlugs = [
    "ranjit",
    "sivaprasad",
    "partner1",
    "partner-1",
    "johnsamuel",
    "shailesh-sivan",
    "alen-jacob",
    "cheriyan",
    "sakilan"
  ];

  const isActualPartnerPage = actualPartnerSlugs.some(slug =>
    path === `/partnership/${slug.toLowerCase()}`
  );

  return isActualPartnerPage ? <PartnershipChatbot /> : null;
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
        <ConditionalChatbot />
        <ScrollTop />
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/clickup" element={<Clickup />} />
            <Route
              path="/blog/submit"
              element={
                <SubmitBlog />
              }
            />
            <Route
              path="/blog/dashboard"
              element={
                <BlogDashboard />
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
            <Route
              path="/enquiry-form"
              element={
                <AjinorahForm />
              }
            />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/cookie-policy" element={<CookiePolicy />} />
            <Route path="/disclaimer" element={<Disclaimer />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/our-works" element={<OurWork />} />
            <Route path="/achievements" element={<CompanyAchievements />} />
            <Route path="/ats-checker" element={<ATSChecker />} />
            <Route path="/resume-generator" element={<ResumeGenerator />} />

            <Route path="/blogs/:slug" element={<BlogDetail />} />
            <Route path="/careers/:slug" element={<CareerDetail />} />
            <Route path="/hr-forum" element={<HRForum />} />
            <Route path="/apply-job" element={<JobPosting />} />
            <Route path="/job-details/:id" element={<JobDetails />} />
            <Route path="/job-listing" element={<JobsList />} />
            <Route path="/job-applicants/:jobId" element={<JobApplicants />} />
            <Route path="/candidate-profile/:applicationId" element={<CandidateProfile />} />
            <Route path="/hr-messages" element={<HrMessages />} />
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

            <Route path="/team" element={<Team />} />
            <Route path="/team/:slug" element={<EmployeePage />} />

            <Route path="/team/dashboard"
              element={
                <ProtectedRoute>
                  <TeamDashboard />
                </ProtectedRoute>
              }
            />
            <Route path="/team/admin"
              element={
                <AdminRoute>
                  <AdminTeamDashboard />
                </AdminRoute>
              }
            />

            <Route path="/admin"
              element={
                <AdminRoute>
                  <AdminPanel />
                </AdminRoute>
              }
            />
            <Route
              path="/jobs/create" element={
                <AdminRoute>
                  <AdminCreateJob />
                </AdminRoute>
              }
            />
            <Route path="/edit-user/:id"
              element={
                <AdminRoute>
                  <EditUser />
                </AdminRoute>
              }
            />
            <Route path="/add-user"
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
            <Route
              path="/admin/applications"
              element={
                <AdminRoute>
                  <AllApplications />
                </AdminRoute>
              }
            />

            <Route path="/client-form" element={<AjinorahForm />} />
            <Route path="/client-dashboard" element={<ClientDashboard />} />
            <Route path="/client-portal" element={<CDashboard />} />
            <Route path="/client-login" element={<CLogin />} />
            <Route path="/admin/clickup-clients" element={<AdminRoute><AdminClickupClients /></AdminRoute>} />
            <Route path="/lottery" element={<SpinWheel />} />
            <Route path="/api-marketing-dashboard" element={<AdminRoute><ApiMarketingDashboard /></AdminRoute>} />
            <Route path="/media-dashboard" element={<AdminRoute><MediaDashboard /></AdminRoute>} />
            <Route path="/admin/lottery-claims" element={<AdminRoute><LotteryClaims /></AdminRoute>} />
            <Route path="/ajnoradashboard" element={<AdminRoute><AjnoraDashboard /></AdminRoute>} />
            <Route path="/ajnoradashboard/:id" element={<AdminRoute><AjnoraDashboard /></AdminRoute>} />


            <Route path="/analytics" element={<AnalyticsWidget />} />
            <Route
              path="/achievements-form" element={
                <AdminRoute>
                  <AddAchievementForm />
                </AdminRoute>
              }
            />
            <Route path="/add-review" element={<AddReview />} />
            <Route path="/partners" element={<Partnership />} />
            <Route path="/partnership/Ranjit" element={<Landing />} />
            <Route path="/partnership/Sivaprasad" element={<Sivaprasad />} />
            <Route path="/partnership/Partner1" element={<Partner1 />} />
            <Route path="/partnership/JohnSamuel" element={<JohnSamuelPage />} />
            <Route path="/partnership/shailesh-sivan" element={<ShaileshSivan />} />
            <Route path="/partnership/alen-jacob" element={<AlenJacob />} />
            <Route path="/partnership/cheriyan" element={<CheriyanPage />} />
            <Route path="/partnership/sakilan" element={<Sakilan />} />
            <Route path="/partnership/:slug" element={<DynamicPartnershipPage />} />
            <Route path="/partners/select-template" element={<PartnershipTemplateSelector />} />
            <Route path="/partners/create-portfolio" element={<PartnershipDataForm />} />
            <Route path="/partners/create-influencer" element={<InfluencerDataForm />} />
            <Route path="/partners/register" element={<PartnerRegister />} />
            <Route path="/partners/login" element={<PartnerLogin />} />
            <Route path="/partners/dashboard" element={<PartnerDashboardHub />} />
            <Route path="/partners/manage" element={<PartnerDashboard />} />
            <Route path="/partners/students" element={<StudentShowcase />} />
            <Route path="/partnership/Partner2" element={<Partner2 />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </Suspense>

        <ConditionalFooter />
      </BrowserRouter>
    </ReactLenis>
  );
}

export default App;

