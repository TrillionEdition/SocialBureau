// // import { useState, useEffect } from "react";
// // import { useNavigate, useLocation } from "react-router-dom";
// // import { Menu, X, ChevronRight } from "lucide-react";
// // import { motion, AnimatePresence } from "framer-motion";

// // export default function Navbar() {
// //   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
// //   const [activeDropdown, setActiveDropdown] = useState(null);
// //   const [isScrolled, setIsScrolled] = useState(false);
// //   const [expandedMobileCategory, setExpandedMobileCategory] = useState(null);
// //   const navigate = useNavigate();

// //   const navItems = [
// //     { label: "Home", href: "/" },
// //     {
// //       label: "Services",
// //       href: "/services",
// //       columns: [
// //         {
// //           title: "API Marketing",
// //           items: [
// //             { label: "API Marketing", href: "/api-marketing" },
// //             { label: "Performance Marketing", href: "#" },
// //             { label: "Performance Marketing", href: "/performance-marketing" },
// //             { label: "Niche Marketing", href: "/niche-marketing" },
// //             { label: "Content Marketing", href: "/content-marketing" },
// //             { label: "AdTech Integration", href: "/adTech-marketing" },
// //           ],
// //         },
// //         {
// //           title: "Design & Tech",
// //           items: [{ label: "Web Development", href: "#" }],
// //         },
// //       ],
// //     },
// //     {
// //       label: "Company",
// //       columns: [
// //         {
// //           title: "About",
// //           items: [
// //             { label: "About Us", href: "/about" },
// //             { label: "Our Team", href: "/our-team" },
// //           ],
// //         },
// //         {
// //           title: "Community",
// //           items: [
// //             { label: "Blog", href: "/blog" },
// //             { label: "Partners", href: "/partners" },
// //             { label: "Leaderboard", href: "/leaderboard" },
// //           ],
// //         },
// //       ],
// //     },
// //     {
// //       label: "Careers",
// //       href: "/careers",
// //       columns: [
// //         {
// //           title: "Open Positions",
// //           items: [
// //             { label: "Content Copywriter", href: "/careers/content-copywriter" },
// //             { label: "Client Success Manager", href: "/careers/client-success-manager" },
// //             { label: "Business Development", href: "/careers/business-development-manager" },
// //             { label: "Front Desk Manager", href: "/careers/front-desk-manager" },
// //             { label: "Digital Marketing Expert", href: "/careers/digital-marketing-expert" },
// //             { label: "Video Editor", href: "/careers/video-editor" },
// //             { label: "Web Developer", href: "#" },
// //             { label: "Office Operations", href: "/careers/office-operations-manager" },
// //           ],
// //         },
// //         {
// //           title: "Explore",
// //           items: [{ label: "All Careers", href: "/careers" }],
// //         },
// //       ],
// //     },
// //     { label: "Support", href: "/contact" },
// //     { label: "Login", href: "/login" },
// //     {
// //       label: "Performance Marketing",
// //       href: "/performance-marketing",
// //       columns: [
// //         {
// //           title: "360° Performance Marketing",
// //           items: [
// //             {
// //               label: "Paid Media Advertising",
// //               href: "https://ads.google.com/home/"
// //             },
// //             {
// //               label: "Google Ads",
// //               href: "https://ads.google.com/home/"
// //             },
// //             {
// //               label: "Meta Ads (Facebook & Instagram)",
// //               href: "https://www.facebook.com/business/ads"
// //             },
// //             {
// //               label: "LinkedIn Ads",
// //               href: "https://www.linkedin.com/marketing-solutions/ads"
// //             },
// //             {
// //               label: "Programmatic Advertising",
// //               href: "https://marketingplatform.google.com/about/display-video-360/"
// //             },
// //             {
// //               label: "Lead Generation Campaigns",
// //               href: "https://ads.google.com/intl/en_in/home/solutions/lead-generation/"
// //             },
// //             {
// //               label: "Conversion & Sales Campaigns",
// //               href: "https://support.google.com/google-ads/answer/6364"
// //             },
// //             {
// //               label: "Retargeting & Remarketing",
// //               href: "https://support.google.com/google-ads/answer/2453998"
// //             },
// //             {
// //               label: "Affiliate Marketing",
// //               href: "https://support.google.com/google-ads/answer/7644078"
// //             },
// //             {
// //               label: "Landing Page & Funnel Optimization",
// //               href: "https://support.google.com/analytics/answer/10089681"
// //             },
// //             {
// //               label: "Conversion Rate Optimization (CRO)",
// //               href: "https://support.google.com/optimize/answer/6211930"
// //             },
// //             {
// //               label: "Marketing Automation (Email / WhatsApp / SMS)",
// //               href: "https://developers.google.com/business-communications/rcs-business-messaging"
// //             }
// //           ]
// //         }
// //       ]
// //     },

// //     {
// //       label: "Partnership",
// //       href: "/partners",
// //       columns: [
// //         {
// //           title: "Partnership",
// //           items: [
// //             { label: "Partners", href: "/partners" },
// //             { label: "Ranjit", href: "/Ranjit" },
// //           ],
// //         },
// //       ],
// //     },
// //     { label: "Entertainment", href: "/our-team" },
// //     { label: "Team", href: "/our-team" },
// //   ];

// //   useEffect(() => {
// //     const handleScroll = () => setIsScrolled(window.scrollY > 10);
// //     window.addEventListener("scroll", handleScroll);
// //     return () => window.removeEventListener("scroll", handleScroll);
// //   }, []);

// //   const handleNavClick = (href) => {
// //     navigate(href);
// //     setMobileMenuOpen(false);
// //     setActiveDropdown(null);
// //     setExpandedMobileCategory(null);
// //   };

// //   return (
// //     <>
// //       <nav
// //         className={`fixed top-0 w-full z-[100] transition-all duration-300 border-b ${isScrolled || mobileMenuOpen
// //           ? "bg-black/95 border-gray-800 shadow-sm"
// //           : "bg-black/80 border-transparent"
// //           } backdrop-blur-md`}
// //         onMouseLeave={() => setActiveDropdown(null)}
// //       >
// //         <div className="max-w-[1300px] mx-auto px-6">
// //           {/* Changed height from h-16 to h-[44px] */}
// //           <div className="flex items-center justify-between h-[44px]">

// //             {/* Logo - Scaled down slightly for the 44px height */}
// // <a
// //   style={{ fontFamily: "MyFont, sans-serif" }}
// //   href='https://socialbureau.in'
// //   className="text-white text-lg font-bold tracking-tight"
// // >
// //   Social<span className="text-[#ff0000]">B</span>ureau
// // </a>

// //             {/* Desktop Nav - Reduced gap and smaller font */}
// //             <div className="hidden lg:flex items-center justify-center flex-1 gap-6 xl:gap-8">
// //               {navItems.map((item) => (
// //                 <div key={item.label} className="relative h-full flex items-center">
// //                   <button
// //                     onMouseEnter={() => item.columns && setActiveDropdown(item.label)}
// //                     onClick={() => !item.columns && handleNavClick(item.href)}
// //                     className="text-[13px] font-medium text-gray-300 hover:text-white transition-colors h-full px-1"
// //                   >
// //                     {item.label}
// //                   </button>
// //                 </div>
// //               ))}
// //             </div>

// //             {/* Right Icons */}
// //             <div className="flex items-center gap-4 shrink-0">
// //               <button
// //                 className="lg:hidden text-gray-300 hover:text-white"
// //                 onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
// //               >
// //                 {/* Reduced icon size to 20 to fit better */}
// //                 {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
// //               </button>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Mega Dropdown */}
// //         <AnimatePresence>
// //           {activeDropdown && (
// //             <motion.div
// //               initial={{ opacity: 0, y: -2 }}
// //               animate={{ opacity: 1, y: 0 }}
// //               exit={{ opacity: 0, y: -2 }}
// //               // Positioned exactly at the bottom of the 44px nav
// //               className="hidden lg:block absolute top-[44px] w-full bg-black border-b border-gray-800 shadow-2xl"
// //             >
// //               <div className="max-w-[1200px] mx-auto px-10 py-10 flex flex-row gap-20 justify-start">
// //                 {navItems
// //                   .find((i) => i.label === activeDropdown)
// //                   ?.columns?.map((col, idx) => (
// //                     <div key={idx} className="flex flex-col">
// //                       <h3 className="text-[10px] text-gray-500 font-bold uppercase tracking-[1.5px] mb-4">
// //                         {col.title}
// //                       </h3>
// //                       <div className="flex flex-col space-y-1">
// //                         {col.items.map((subitem) => (
// //                           <button
// //                             key={subitem.label}
// //                             onClick={() => handleNavClick(subitem.href)}
// //                             className="text-[14px] font-semibold text-gray-300 hover:text-white text-left py-1.5 px-3 -ml-3 rounded-lg hover:bg-gray-900 transition-all duration-200 whitespace-nowrap"
// //                           >
// //                             {subitem.label}
// //                           </button>
// //                         ))}
// //                       </div>
// //                     </div>
// //                   ))}
// //               </div>
// //             </motion.div>
// //           )}
// //         </AnimatePresence>

// //         {/* Mobile Menu */}
// //         <AnimatePresence>
// //           {mobileMenuOpen && (
// //             <motion.div
// //               initial={{ opacity: 0, height: 0 }}
// //               animate={{ opacity: 1, height: "100vh" }}
// //               exit={{ opacity: 0, height: 0 }}
// //               // Changed top-[64px] to top-[44px]
// //               className="lg:hidden fixed inset-0 top-[44px] bg-black z-40 overflow-y-auto px-6 py-4"
// //             >
// //               <div className="flex flex-col divide-y divide-gray-800">
// //                 {navItems.map((item) => (
// //                   <div key={item.label} className="py-1">
// //                     {item.columns ? (
// //                       <>
// //                         <button
// //                           onClick={() => setExpandedMobileCategory(expandedMobileCategory === item.label ? null : item.label)}
// //                           className="w-full flex justify-between items-center py-3 text-base font-bold text-white"
// //                         >
// //                           {item.label}
// //                           <ChevronRight size={18} className={`transition-transform duration-300 text-gray-400 ${expandedMobileCategory === item.label ? 'rotate-90' : ''}`} />
// //                         </button>
// //                         <AnimatePresence>
// //                           {expandedMobileCategory === item.label && (
// //                             <motion.div
// //                               initial={{ height: 0, opacity: 0 }}
// //                               animate={{ height: "auto", opacity: 1 }}
// //                               className="bg-gray-900 rounded-xl p-4 mb-3 space-y-4 overflow-hidden"
// //                             >
// //                               {item.columns.map((col) => (
// //                                 <div key={col.title}>
// //                                   <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-2">{col.title}</p>
// //                                   <div className="flex flex-col gap-2">
// //                                     {col.items.map(sub => (
// //                                       <button
// //                                         key={sub.label}
// //                                         onClick={() => handleNavClick(sub.href)}
// //                                         className="text-left text-sm text-gray-300 font-semibold hover:text-white"
// //                                       >
// //                                         {sub.label}
// //                                       </button>
// //                                     ))}
// //                                   </div>
// //                                 </div>
// //                               ))}
// //                             </motion.div>
// //                           )}
// //                         </AnimatePresence>
// //                       </>
// //                     ) : (
// //                       <button
// //                         onClick={() => handleNavClick(item.href)}
// //                         className="w-full text-left py-3 text-base font-bold text-white"
// //                       >
// //                         {item.label}
// //                       </button>
// //                     )}
// //                   </div>
// //                 ))}
// //               </div>
// //             </motion.div>
// //           )}
// //         </AnimatePresence>
// //       </nav>
// //       {/* Spacer updated to 44px */}
// //       <div className="h-[44px]" />
// //     </>
// //   );
// // }


// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { Menu, X, ChevronRight } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";

// export default function Navbar() {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [activeDropdown, setActiveDropdown] = useState(null);
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [expandedMobileCategory, setExpandedMobileCategory] = useState(null);
//   const navigate = useNavigate();

//   const navItems = [
//     { label: "Home", href: "/" },
//     {
//       label: "Services",
//       href: "/services",
//       columns: [
//         {
//           title: "API Marketing",
//           items: [
//             { label: "API Marketing", href: "/api-marketing" },
//             // ✅ FIXED: Removed duplicate, kept only the working one
//             { label: "Performance Marketing", href: "/performance-marketing" },
//             { label: "Niche Marketing", href: "/niche-marketing" },
//             { label: "Content Marketing", href: "/content-marketing" },
//             { label: "AdTech Integration", href: "/adTech-marketing" },
//           ],
//         },
//         {
//           title: "Design & Tech",
//           items: [{ label: "Web Development", href: "#" }],
//         },
//       ],
//     },
//     {
//       label: "Company",
//       columns: [
//         {
//           title: "About",
//           items: [
//             { label: "About Us", href: "/about" },
//             { label: "Our Team", href: "/our-team" },
//           ],
//         },
//         {
//           title: "Community",
//           items: [
//             { label: "Blog", href: "/blog" },
//             { label: "Partners", href: "/partners" },
//             { label: "Leaderboard", href: "/leaderboard" },
//           ],
//         },
//       ],
//     },
//     {
//       label: "Careers",
//       href: "/careers",
//       columns: [
//         {
//           title: "Open Positions",
//           items: [
//             { label: "Content Copywriter", href: "/careers/content-copywriter" },
//             { label: "Client Success Manager", href: "/careers/client-success-manager" },
//             { label: "Business Development", href: "/careers/business-development-manager" },
//             { label: "Front Desk Manager", href: "/careers/front-desk-manager" },
//             { label: "Digital Marketing Expert", href: "/careers/digital-marketing-expert" },
//             { label: "Video Editor", href: "/careers/video-editor" },
//             { label: "Web Developer", href: "#" },
//             { label: "Office Operations", href: "/careers/office-operations-manager" },
//           ],
//         },
//         {
//           title: "Explore",
//           items: [{ label: "All Careers", href: "/careers" }],
//         },
//       ],
//     },
//     { label: "Support", href: "/contact" },
//     { label: "Login", href: "/login" },
//     {
//       label: "Performance Marketing",
//       href: "/performance-marketing",
//       columns: [
//         {
//           title: "360° Performance Marketing",
//           items: [
//             { label: "Paid Media Advertising", href: "https://ads.google.com/home/" },
//             { label: "Google Ads", href: "https://ads.google.com/home/" },
//             { label: "Meta Ads (Facebook & Instagram)", href: "https://www.facebook.com/business/ads" },
//             { label: "LinkedIn Ads", href: "https://www.linkedin.com/marketing-solutions/ads" },
//             { label: "Programmatic Advertising", href: "https://marketingplatform.google.com/about/display-video-360/" },
//             { label: "Lead Generation Campaigns", href: "https://ads.google.com/intl/en_in/home/solutions/lead-generation/" },
//           ]
//         },
//         {
//           items: [
//             { label: "Conversion & Sales Campaigns", href: "https://support.google.com/google-ads/answer/6364" },
//             { label: "Retargeting & Remarketing", href: "https://support.google.com/google-ads/answer/2453998" },
//             { label: "Affiliate Marketing", href: "https://support.google.com/google-ads/answer/7644078" },
//             { label: "Landing Page & Funnel Optimization", href: "https://support.google.com/analytics/answer/10089681" },
//             { label: "Conversion Rate Optimization (CRO)", href: "https://support.google.com/optimize/answer/6211930" },
//             { label: "Marketing Automation (Email / WhatsApp / SMS)", href: "https://developers.google.com/business-communications/rcs-business-messaging" },
//           ],
//         },
//       ],
//     },
//     {
//       label: "Partnership",
//       href: "/partners",
//       columns: [
//         {
//           title: "Partnership",
//           items: [
//             { label: "Partners", href: "/partners" },
//             { label: "Ranjit", href: "/Ranjit" },
//           ],
//         },
//       ],
//     },
//     { label: "Entertainment", href: "/our-team" },
//     { label: "Team", href: "/our-team" },
//     { label: "Profile", href: '/profile' },
//   ];

//   useEffect(() => {
//     const handleScroll = () => setIsScrolled(window.scrollY > 10);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   // ✅ FIXED: Handle both external (https) and internal links correctly
//   const handleNavClick = (href) => {
//     if (!href || href === "#") return;

//     if (href.startsWith("http://") || href.startsWith("https://")) {
//       window.open(href, "_blank", "noopener,noreferrer");
//     } else {
//       navigate(href);
//     }

//     setMobileMenuOpen(false);
//     setActiveDropdown(null);
//     setExpandedMobileCategory(null);
//   };

//   return (
//     <>
//       <nav
//         onMouseLeave={() => setActiveDropdown(null)}
//         className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-black/90 backdrop-blur-md shadow-lg" : "bg-transparent"
//           }`}
//       >
//         <div className="max-w-7xl mx-auto px-4 flex items-center justify-center h-[44px] gap-6">
//           {/* Logo */}
//           <a
//             style={{ fontFamily: "MyFont, sans-serif" }}
//             href='https://socialbureau.in'
//             className="text-white text-lg font-bold tracking-tight"
//           >
//             Social<span className="text-[#ff0000]">B</span>ureau
//           </a>

//           {/* Desktop Nav */}
//           <div className="hidden md:flex items-center h-full gap-1">
//             {navItems.map((item) => (
//               <div
//                 key={item.label}
//                 className="relative h-full flex items-center"
//                 onMouseEnter={() => item.columns && setActiveDropdown(item.label)}
//               >
//                 <button
//                   onClick={() => handleNavClick(item.href || "#")}
//                   className="text-[13px] font-medium text-gray-300 hover:text-white transition-colors h-full px-2"
//                 >
//                   {item.label}
//                 </button>
//               </div>
//             ))}
//           </div>

//           {/* Mobile Menu Toggle */}
//           <button
//             className="md:hidden text-white"
//             onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//           >
//             {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
//           </button>
//         </div>

//         {/* Mega Dropdown */}
//         <AnimatePresence>
//           {activeDropdown && (
//             <motion.div
//               initial={{ opacity: 0, y: -8 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -8 }}
//               className="absolute left-0 right-0 bg-black/95 backdrop-blur-md border-t border-gray-800 px-8 py-6"
//             >
//               <div className="max-w-7xl mx-auto flex gap-12">
//                 {navItems
//                   .find((i) => i.label === activeDropdown)
//                   ?.columns?.map((col, idx) => (
//                     <div key={idx} className="min-w-[160px]">
//                       <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">
//                         {col.title}
//                       </p>
//                       <div className="flex flex-col gap-1">
//                         {col.items.map((subitem) => (
//                           <button
//                             key={subitem.label}
//                             onClick={() => handleNavClick(subitem.href)}
//                             className="text-[14px] font-semibold text-gray-300 hover:text-white text-left py-1.5 px-3 -ml-3 rounded-lg hover:bg-gray-900 transition-all duration-200 whitespace-nowrap"
//                           >
//                             {subitem.label}
//                           </button>
//                         ))}
//                       </div>
//                     </div>
//                   ))}
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* Mobile Menu */}
//         <AnimatePresence>
//           {mobileMenuOpen && (
//             <motion.div
//               initial={{ opacity: 0, height: 0 }}
//               animate={{ opacity: 1, height: "auto" }}
//               exit={{ opacity: 0, height: 0 }}
//               className="md:hidden bg-black/95 px-4 pb-6 overflow-y-auto max-h-[80vh]"
//             >
//               {navItems.map((item) => (
//                 <div key={item.label} className="border-b border-gray-800">
//                   {item.columns ? (
//                     <>
//                       <button
//                         onClick={() =>
//                           setExpandedMobileCategory(
//                             expandedMobileCategory === item.label ? null : item.label
//                           )
//                         }
//                         className="w-full flex justify-between items-center py-3 text-base font-bold text-white"
//                       >
//                         {item.label}
//                         <ChevronRight
//                           size={16}
//                           className={`transition-transform ${expandedMobileCategory === item.label ? "rotate-90" : ""
//                             }`}
//                         />
//                       </button>
//                       {expandedMobileCategory === item.label && (
//                         <div className="pb-3 pl-4 flex flex-col gap-4">
//                           {item.columns.map((col) => (
//                             <div key={col.title}>
//                               <p className="text-xs text-gray-500 uppercase font-bold mb-2">
//                                 {col.title}
//                               </p>
//                               <div className="flex flex-col gap-2">
//                                 {col.items.map((sub) => (
//                                   <button
//                                     key={sub.label}
//                                     onClick={() => handleNavClick(sub.href)}
//                                     className="text-left text-sm text-gray-300 font-semibold hover:text-white"
//                                   >
//                                     {sub.label}
//                                   </button>
//                                 ))}
//                               </div>
//                             </div>
//                           ))}
//                         </div>
//                       )}
//                     </>
//                   ) : (
//                     <button
//                       onClick={() => handleNavClick(item.href)}
//                       className="w-full text-left py-3 text-base font-bold text-white"
//                     >
//                       {item.label}
//                     </button>
//                   )}
//                 </div>
//               ))}
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </nav>

//       {/* Spacer */}
//       <div className="h-[44px]" />
//     </>
//   );
// }

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [expandedMobileCategory, setExpandedMobileCategory] = useState(null);
  const navigate = useNavigate();

  const navItems = [
    { label: "Home", href: "/" },
    {
      label: "Services",
      href: "/services",
      columns: [
        {
          title: "API Marketing",
          items: [
            { label: "API Marketing", href: "/api-marketing" },
            { label: "Performance Marketing", href: "/performance-marketing" },
            { label: "Niche Marketing", href: "/niche-marketing" },
            { label: "Content Marketing", href: "/content-marketing" },
            { label: "AdTech Integration", href: "/adTech-marketing" },
          ],
        },
        {
          title: "Design & Tech",
          items: [{ label: "Web Development", href: "#" }],
        },
      ],
    },
    {
      label: "Company",
      columns: [
        {
          title: "About",
          items: [
            { label: "About Us", href: "/about" },
            { label: "Our Team", href: "/our-team" },
          ],
        },
        {
          title: "Community",
          items: [
            { label: "Blog", href: "/blog" },
            { label: "Partners", href: "/partners" },
            { label: "Leaderboard", href: "/leaderboard" },
          ],
        },
      ],
    },
    {
      label: "Careers",
      href: "/careers",
      columns: [
        {
          title: "Open Positions",
          items: [
            { label: "Content Copywriter", href: "/careers/content-copywriter" },
            { label: "Client Success Manager", href: "/careers/client-success-manager" },
            { label: "Business Development", href: "/careers/business-development-manager" },
            { label: "Front Desk Manager", href: "/careers/front-desk-manager" },
            { label: "Digital Marketing Expert", href: "/careers/digital-marketing-expert" },
            { label: "Video Editor", href: "/careers/video-editor" },
            { label: "Web Developer", href: "#" },
            { label: "Office Operations", href: "/careers/office-operations-manager" },
          ],
        },
        {
          title: "Explore",
          items: [{ label: "All Careers", href: "/careers" }],
        },
      ],
    },
    { label: "Support", href: "/contact" },
    { label: "Login", href: "/login" },
    {
      label: "Performance Marketing",
      href: "/performance-marketing",
      columns: [
        {
          title: "360° Performance Marketing",
          items: [
            { label: "Paid Media Advertising", href: "https://ads.google.com/home/" },
            { label: "Google Ads", href: "https://ads.google.com/home/" },
            { label: "Meta Ads (Facebook & Instagram)", href: "https://www.facebook.com/business/ads" },
            { label: "LinkedIn Ads", href: "https://www.linkedin.com/marketing-solutions/ads" },
            { label: "Programmatic Advertising", href: "https://marketingplatform.google.com/about/display-video-360/" },
            { label: "Lead Generation Campaigns", href: "https://ads.google.com/intl/en_in/home/solutions/lead-generation/" },
          ],
        },
        {
          title: "More Channels",
          items: [
            { label: "Conversion & Sales Campaigns", href: "https://support.google.com/google-ads/answer/6364" },
            { label: "Retargeting & Remarketing", href: "https://support.google.com/google-ads/answer/2453998" },
            { label: "Affiliate Marketing", href: "https://support.google.com/google-ads/answer/7644078" },
            { label: "Landing Page & Funnel Optimization", href: "https://support.google.com/analytics/answer/10089681" },
            { label: "Conversion Rate Optimization (CRO)", href: "https://support.google.com/optimize/answer/6211930" },
            { label: "Marketing Automation (Email / WhatsApp / SMS)", href: "https://developers.google.com/business-communications/rcs-business-messaging" },
          ],
        },
      ],
    },
    {
      label: "Partnership",
      href: "/partners",
      columns: [
        {
          title: "Partnership",
          items: [
            { label: "Partners", href: "/partners" },
            { label: "Ranjit", href: "/Ranjit" },
          ],
        },
      ],
    },
    { label: "Entertainment", href: "/our-team" },
    { label: "Team", href: "/our-team" },
    { label: "Profile", href: "/profile" },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href) => {
    if (!href || href === "#") return;
    if (href.startsWith("http://") || href.startsWith("https://")) {
      window.open(href, "_blank", "noopener,noreferrer");
    } else {
      navigate(href);
    }
    setMobileMenuOpen(false);
    setActiveDropdown(null);
    setExpandedMobileCategory(null);
  };

  return (
    <>
      <nav
        onMouseLeave={() => setActiveDropdown(null)}
        className="fixed top-0 left-0 right-0 z-50 bg-[#161617]/80 backdrop-blur-xl transition-colors duration-500"
      >
        {/* Top Bar */}
        <div className="max-w-[980px] mx-auto px-4 flex items-center justify-between h-12">
          {/* Logo */}
          <a
            style={{ fontFamily: "MyFont, sans-serif" }}
            href="https://socialbureau.in"
            className="text-white text-[17px] font-bold tracking-tight shrink-0"
          >
            Social<span className="text-[#ff0000]">B</span>ureau
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.columns && setActiveDropdown(item.label)}
              >
                <button
                  onClick={() => handleNavClick(item.href || "#")}
                  className="text-[12px] font-normal text-[#f5f5f7]/80 hover:text-white transition-colors px-2 py-1 antialiased tracking-normal"
                >
                  {item.label}
                </button>
              </div>
            ))}
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mega Dropdown */}
        <AnimatePresence>
          {activeDropdown && (
            <motion.div
              key="dropdown"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="hidden md:block border-t border-white/10 bg-[#161617]/95 backdrop-blur-xl"
            >
              <div className="max-w-[980px] mx-auto px-4 py-8 flex gap-12">
                {navItems
                  .find((i) => i.label === activeDropdown)
                  ?.columns?.map((col, idx) => (
                    <div key={idx} className="min-w-[160px]">
                      <p className="text-[11px] font-semibold text-[#f5f5f7]/40 uppercase tracking-widest mb-3">
                        {col.title}
                      </p>
                      <div className="flex flex-col gap-2">
                        {col.items.map((subitem) => (
                          <button
                            key={subitem.label}
                            onClick={() => handleNavClick(subitem.href)}
                            className="text-[17px] font-semibold text-[#f5f5f7] hover:text-[#0066cc] text-left transition-colors leading-tight"
                          >
                            {subitem.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Mobile Menu - Full Screen */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-40 bg-[#161617] flex flex-col pt-16 px-6 pb-8 overflow-y-auto md:hidden"
          >
            <div className="flex flex-col gap-4 mt-4">
              {navItems.map((item) => (
                <div key={item.label}>
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => {
                        if (item.columns) {
                          setExpandedMobileCategory(
                            expandedMobileCategory === item.label ? null : item.label
                          );
                        } else {
                          handleNavClick(item.href);
                        }
                      }}
                      className="text-[28px] font-semibold text-[#f5f5f7] active:text-[#0066cc] text-left transition-colors duration-200"
                    >
                      {item.label}
                    </button>
                    {item.columns && (
                      <ChevronRight
                        size={20}
                        className={`text-white/40 transition-transform duration-200 ${expandedMobileCategory === item.label ? "rotate-90" : ""
                          }`}
                      />
                    )}
                  </div>

                  {/* Mobile Sub-items */}
                  <AnimatePresence>
                    {item.columns && expandedMobileCategory === item.label && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-3 ml-2 flex flex-col gap-4">
                          {item.columns.map((col, idx) => (
                            <div key={idx}>
                              <p className="text-[11px] font-semibold text-[#f5f5f7]/40 uppercase tracking-widest mb-2">
                                {col.title}
                              </p>
                              <div className="flex flex-col gap-2">
                                {col.items.map((subitem) => (
                                  <button
                                    key={subitem.label}
                                    onClick={() => handleNavClick(subitem.href)}
                                    className="text-[16px] font-medium text-[#f5f5f7]/80 hover:text-[#0066cc] text-left transition-colors"
                                  >
                                    {subitem.label}
                                  </button>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer */}
      <div className="h-12" />
    </>
  );
}