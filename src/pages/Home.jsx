// import React, { useEffect, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import Navbar from "../components/Navbar";
// import HomeIntro from "../components/HomeIntro";
// import HomeCards from "../components/HomeCards";
// import Hometagline from "../components/Hometagline";
// import PremiumFooter from "../components/PremiumFooter";
// import { CyberBackground } from "../components/CyberBackground";
// import CookieConsent from "../components/CookieConsent";
// import { useNavigate } from "react-router-dom";
// import Clients from "../components/Clients";
// import LatestBlogs from "../components/LatestBlogs";
// import LatestCareers from "../components/LatestCareers";
// import HomeServices from "../components/HomeServices";
// import Chatbot from "../components/Chatbot";
// import { Googlereview } from "../components/Googlereview";
// import { Intro } from "../components/Intro";
// import LoadingSpinner from "../components/LoadingSpinner";
// import UpcomingEvents from "../components/UpcomingEvents";
// import PremiumFAQ from "../components/PremiumFAQ";

// const AwardWinningExperience = React.lazy(
//   () => import("../components/AwardWinning/AwardWinningExperience"),
// );
// const EmployeeOfMonth = React.lazy(
//   () => import("../components/AwardWinning/EmployeeOfMonth/EmployeeOfMonth"),
// );

// export const Home = () => {
//   const navigate = useNavigate();

//   // Image modal state
//   // const [showImageModal, setShowImageModal] = useState(false);
//   // const [hasShownModal, setHasShownModal] = useState(false);
//   // const modalImage =
//   //   (typeof import.meta !== 'undefined' && import.meta.env?.VITE_HOME_MODAL_IMAGE) ||
//   //   'https://res.cloudinary.com/dtwcgfmar/image/upload/v1767434989/Artboard_1_copy_3_1_daw2ii.png';

//   // useEffect(() => {
//   //   const onKey = (e) => {
//   //     if (e.key === 'Escape') setShowImageModal(false);
//   //   };
//   //   window.addEventListener('keydown', onKey);
//   //   return () => window.removeEventListener('keydown', onKey);
//   // }, []);

//   // useEffect(() => {
//   //   const handleScroll = () => {
//   //     if (!showImageModal && !hasShownModal && window.scrollY > window.innerHeight * 5.5) {
//   //       setShowImageModal(true);
//   //       setHasShownModal(true);
//   //     }
//   //   };
//   //   window.addEventListener('scroll', handleScroll);
//   //   return () => window.removeEventListener('scroll', handleScroll);
//   // }, [showImageModal, hasShownModal]);

//   // Regular rotating popups (bottom-right)
//   const popups = [
//     {
//       title: "New Openings: Hiring Video Editors",
//       subtitle: "Join our Team",
//       link: "/careers/video-editor",
//     },
//     {
//       title: "New Openings: Hiring Cinematographers",
//       subtitle: "Join our Team",
//       link: "/careers/cinematographer",
//     },
//     {
//       title: "New Openings: Hiring Performance Marketers",
//       subtitle: "Join our Team",
//       link: "/careers/performance-marketing-manager",
//     },
//     {
//       title: "New Openings: Hiring Graphics Designers",
//       subtitle: "Join our Team",
//       link: "/careers/graphic-designer",
//     },
//     {
//       title: "New Openings: Hiring SEO Specialist",
//       subtitle: "Join our Team",
//       link: "/careers/seo-expert",
//     },
//     {
//       title: "New Openings: Web Developers",
//       subtitle: "Join our Team",
//       link: "/careers/web-developer",
//     },
//   ];

//   // showPopups for rotating bottom-right popups (dynamic length)
//   const [showPopups, setShowPopups] = useState(() =>
//     Array(popups.length).fill(false),
//   );
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [paused, setPaused] = useState(false);
//   useEffect(() => {
//     if (paused) return;

//     const interval = setInterval(() => {
//       setShowPopups(() => {
//         const newState = Array(popups.length).fill(false);
//         newState[currentIndex] = true;
//         return newState;
//       });

//       setCurrentIndex((prev) => (prev + 1) % popups.length);
//     }, 3000);

//     return () => clearInterval(interval);
//   }, [currentIndex, paused, popups.length]);

//   const closePopup = (index) => {
//     setShowPopups((prev) => prev.map((val, i) => (i === index ? false : val)));
//     setPaused(true);
//   };
//   // No internal loading, using the global loader in App.jsx

//   const [cyberScrollProgress, setCyberScrollProgress] = useState(0);

//   return (
//     <div className="bg-black">
//       <React.Suspense fallback={<div className="h-screen w-full bg-black" />}>
//         <AwardWinningExperience />
//       </React.Suspense>
//       {/* <React.Suspense fallback={<div className="h-screen w-full bg-black" />}>
//         <EmployeeOfMonth />
//       </React.Suspense> */}
//       <CyberBackground onScrollEnd={setCyberScrollProgress} />
//       {/* <Chatbot/> */}

//       {/* Choreographed Popups based on scroll progress */}
//       {cyberScrollProgress >= 0.99 &&
//         popups.map(
//           (popup, index) =>
//             showPopups[index] && (
//               <div
//                 key={index}
//                 className="fixed right-4 bottom-4 flex flex-col gap-4 z-40 animate-fade-in"
//               >
//                 <div
//                   className="relative bg-gradient-to-br from-red-600 to-black rounded-[1.5rem] shadow-2xl p-6 w-72 text-center hover:scale-105 transition-transform duration-300 cursor-pointer overflow-hidden border border-white/10"
//                   onClick={() => (window.location.href = popup.link)}
//                 >
//                   {/* Pulse Accents */}
//                   <span className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-red-400 opacity-20 animate-pulse"></span>
//                   <span className="absolute -bottom-6 -right-6 w-14 h-14 rounded-full bg-red-900 opacity-40 animate-pulse"></span>

//                   <button
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       closePopup(index);
//                     }}
//                     className="absolute top-3 right-3 text-white/60 hover:text-white transition-colors"
//                   >
//                     <i className="fas fa-times text-lg"></i>
//                   </button>

//                   <h2 className="text-xl font-black text-white mb-1 leading-tight tracking-tight drop-shadow-xl">
//                     {popup.title}
//                   </h2>
//                   <p className="text-gray-300 text-xs font-medium mb-6">
//                     {popup.subtitle}
//                   </p>

//                   <button className="bg-white text-gray-900 text-[10px] font-black px-8 py-2.5 rounded-full shadow-2xl hover:bg-gray-100 transition-all active:scale-95 uppercase tracking-widest">
//                     APPLY NOW
//                   </button>
//                 </div>
//               </div>
//             ),
//         )}

//       {/* Cookie Consent appears at the absolute end of the section */}
//       <CookieConsent forceShow={cyberScrollProgress >= 0.99} />
//       <HomeIntro />
//       <HomeServices />
//       <Intro />
//       {/* <UpcomingEvents />  */}
//       <LatestCareers />
//       <Googlereview />
//       {/* <Clients /> */}
//       <LatestBlogs />
//       <PremiumFAQ />
//       <PremiumFooter />

//       {/* Image Modal (centered) */}
//       {/* {showImageModal && (
//         <div
//           className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
//           onClick={() => setShowImageModal(false)}
//         >
//           <div
//             className="relative max-w-4xl w-[90%] mx-auto p-4"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <motion.div
//               initial={{ opacity: 0, scale: 0.8, y: 50 }}
//               animate={{ opacity: 1, scale: 1, y: 0 }}
//               exit={{ opacity: 0, scale: 0.8, y: 50 }}
//               transition={{ type: "spring", stiffness: 300, damping: 25 }}
//               className="relative max-w-4xl w-[90%] mx-auto p-4"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <button
//                 onClick={() => setShowImageModal(false)}
//                 className="absolute -top-4 -right-4 bg-black/80 text-white rounded-full p-2 shadow-lg hover:scale-110 transition-transform"
//                 aria-label="Close image"
//               >
//                 ✕
//               </button>

//             <img
//               src={modalImage}
//               alt="Showcase"
//               className="w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
//             />
//           </div>
//         </div>
//       )} */}
//     </div>
//   );
// };



import React from "react";
import HeroSection from "../components/Home/Hero";
import ApiMarketing from "../components/Home/ApiMarketing";
import ServicesGrid from "../components/Home/ServicesGrid";
import WebSection from "../components/Home/WebSection";
import CareerSection from "../components/Home/CareerSection";
import PartnershipTeamGrid from "../components/Home/PartnershipNTeam";
import EntertainmentGrid from "../components/Home/EntertainmentGrid";
import TestimonialsSection from "../components/Home/TestimonialsSection";
import FAQSection from "../components/Home/FAQSection";

export const Home = () => {
  return (
    <div>
      <HeroSection />
      <ApiMarketing />
      <ServicesGrid />
      <WebSection />
      <CareerSection />
      <PartnershipTeamGrid />
      <EntertainmentGrid />
      <TestimonialsSection />
      <FAQSection FAQSection />


    </div>
  );
};
