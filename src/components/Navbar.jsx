

// // // // import { useState, useEffect, useRef } from "react";
// // // // import {
// // // //   FaBars, FaTimes, FaHome, FaBriefcase, FaTools, FaEnvelope, FaBlog,
// // // //   FaInfoCircle, FaMicrophone, FaUserTie,
// // // //   FaUsers, FaCalendarAlt, FaTrophy,
// // // //   FaHandshake
// // // // } from "react-icons/fa";
// // // // import { Link, useNavigate, useLocation } from "react-router-dom";

// // // // const MENU_ITEMS = [
// // // //   { icon: <FaHome />, label: "Home", path: "/" },
// // // //   { icon: <FaInfoCircle />, label: "About", path: "/about" },
// // // //   { icon: <FaBriefcase />, label: "Services", path: "/services" },
// // // //   { icon: <FaUsers />, label: "Our Team", path: "/our-team" },
// // // //   { icon: <FaUserTie />, label: "Careers", path: "/careers" },
// // // //   { icon: <FaBlog />, label: "Blogs", path: "/blog" },
// // // //   { icon: < FaTrophy />, label: "Leaderboard", path: "/leaderboard" },
// // // //   // { icon: <FaTools />, label: "Business Tool", path: "/tool" },
// // // //   { icon: <FaEnvelope />, label: "Contact", path: "/contact" },
// // // //   { icon: <FaMicrophone />, label: "Let's Talk", path: "/voice" },
// // // //   { icon: <FaHandshake />, label: "Partnership", path: "/partners" },
// // // // ];

// // // // const SEARCH_ITEMS = [
// // // //   { icon: <FaHome />, label: "Home", path: "/" },
// // // //   { icon: <FaBriefcase />, label: "Services", path: "/services" },
// // // //   { icon: <FaBriefcase />, label: "Web Development", path: "/services/Web-Development" },
// // // //   { icon: <FaBriefcase />, label: "API-Drive Growth & Automated Distribution", path: "/services/API-Driven-Growth-Automated-Distribution" },
// // // //   { icon: <FaBriefcase />, label: "Full-Funnel Performance Marketing", path: "/services/Full-Funnel-Performance-Marketing" },
// // // //   { icon: <FaBriefcase />, label: "Funnel Architecture Growth Pathways", path: "/services/Funnel-Architecture-Growth-Pathways" },
// // // //   { icon: <FaBriefcase />, label: "Conversion Rate Optimization Landing Systems", path: "/services/Conversion-Rate-Optimization-Landing-Systems" },
// // // //   { icon: <FaBriefcase />, label: "Messaging Positioning for Niche Brands", path: "/services/Messaging-Positioning-for-Niche-Brands" },
// // // //   { icon: <FaBriefcase />, label: "Niche Market Penetration Strategy", path: "/services/Niche-Market-Penetration-Strategy" },
// // // //   { icon: <FaBriefcase />, label: "Influencer UGC Growth Engines", path: "/services/Influencer-UGC-Growth-Engines" },
// // // //   { icon: <FaBriefcase />, label: "Lifecycle Email Automation Strategy", path: "/services/Lifecycle-Email-Automation-Strategy" },
// // // //   { icon: <FaBriefcase />, label: "Software GTM Growth Architecture", path: "/services/Software-GTM-Growth-Architecture" },
// // // //   // { icon: <FaTools />, label: "Business Tool", path: "/tool" },
// // // //   { icon: <FaBlog />, label: "Blogs", path: "/blog" },
// // // //   // { icon: <FaCalendarAlt />, label: "Events", path: "/events" },
// // // //   { icon: <FaUsers />, label: "Our Team", path: "/our-team" },
// // // //   { icon: <FaUserTie />, label: "Careers", path: "/careers" },
// // // //   { icon: <FaInfoCircle />, label: "About", path: "/about" },
// // // //   { icon: <FaEnvelope />, label: "Contact", path: "/contact" },
// // // //   { icon: <FaMicrophone />, label: "Let's Talk", path: "/voice" },
// // // //   { icon: <FaHandshake />, label: "Partnership", path: "/partners" },
// // // // ];

// // // // export default function Navbar() {
// // // //   const [menuOpen, setMenuOpen] = useState(false);
// // // //   const [showNavbar, setShowNavbar] = useState(false);
// // // //   const [isHovered, setIsHovered] = useState(false);

// // // //   const [searchTerm, setSearchTerm] = useState("");
// // // //   const [suggestions, setSuggestions] = useState([]);
// // // //   const [showSuggestions, setShowSuggestions] = useState(false);
// // // //   const searchInputRef = useRef(null);
// // // //   const navigate = useNavigate();

// // // //   const location = useLocation(); // Make sure to import this from react-router-dom

// // // //   useEffect(() => {
// // // //     const handleScroll = () => {
// // // //       const threshold = location.pathname === '/' ? window.innerHeight * 4.5 : 50;
// // // //       if (window.scrollY > threshold) setShowNavbar(true);
// // // //       else setShowNavbar(false);
// // // //     };
// // // //     window.addEventListener("scroll", handleScroll);
// // // //     return () => window.removeEventListener("scroll", handleScroll);
// // // //   }, [location.pathname]);

// // // //   useEffect(() => {
// // // //     // Update suggestions when searchTerm changes
// // // //     if (searchTerm.trim() === "") {
// // // //       setSuggestions([]);
// // // //       setShowSuggestions(false);
// // // //       return;
// // // //     }
// // // //     const matches = SEARCH_ITEMS.filter(item =>
// // // //       item.label.toLowerCase().includes(searchTerm.toLowerCase())
// // // //     );
// // // //     setSuggestions(matches);
// // // //     setShowSuggestions(matches.length > 0);
// // // //   }, [searchTerm]);

// // // //   // Hide suggestions when clicking outside search box
// // // //   useEffect(() => {
// // // //     const handleClickOutside = (event) => {
// // // //       if (
// // // //         searchInputRef.current &&
// // // //         !searchInputRef.current.contains(event.target)
// // // //       ) {
// // // //         setShowSuggestions(false);
// // // //       }
// // // //     };
// // // //     document.addEventListener("mousedown", handleClickOutside);
// // // //     return () => document.removeEventListener("mousedown", handleClickOutside);
// // // //   }, []);

// // // //   const handleSuggestionClick = (path) => {
// // // //     setSearchTerm("");
// // // //     setShowSuggestions(false);
// // // //     navigate(path);
// // // //   };

// // // //   return (
// // // //     <>
// // // //       {/* Desktop Sidebar */}
// // // //       <nav
// // // //         className={`hidden md:flex fixed top-0 left-0 h-screen text-white flex-col items-center justify-start transition-all duration-500 z-50
// // // //         ${isHovered ? "w-48 backdrop-blur-md bg-[rgba(255,255,255,0.1)] border-r border-[rgba(255,255,255,0.2)] shadow-[0_0_20px_rgba(255,255,255,0.15)]" : "w-20 bg-transparent border-none shadow-none"}
// // // //         ${showNavbar ? "opacity-100" : "opacity-0 pointer-events-none"}`}
// // // //         onMouseEnter={() => setIsHovered(true)}
// // // //         onMouseLeave={() => {
// // // //           setIsHovered(false);
// // // //           setShowSuggestions(false);
// // // //         }}
// // // //       >
// // // //         <ul
// // // //           className="flex flex-col gap-6 mt-5 w-full items-center overflow-y-auto overflow-x-hidden max-h-[calc(100vh-100px)] pr-2"
// // // //           style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
// // // //         >
// // // //           <style>{`
// // // //             ul::-webkit-scrollbar {
// // // //               display: none;
// // // //             }
// // // //           `}</style>

// // // //           {/* Logo */}
// // // //           <li>
// // // //             <Link to="/">
// // // //               <img
// // // //                 src="/assets/socialbureau.webp"
// // // //                 alt="Logo"
// // // //                 className={`transition-all duration-500 ${isHovered ? "w-15" : "w-10"}`}
// // // //               />
// // // //             </Link>
// // // //           </li>

// // // //           {/* Menu Items - show only icon by default, expand label on hover */}
// // // //           {MENU_ITEMS.map((item, idx) => (
// // // //             <li
// // // //               key={idx}
// // // //               className={`flex items-center gap-x-4 w-full justify-start px-4 transition-all duration-300`}
// // // //             >
// // // //               {/* Circular Icon */}
// // // //               <div
// // // //                 onClick={() => navigate(item.path)}
// // // //                 className={`flex items-center justify-center text-xl w-8 h-8 rounded-full bg-[rgba(255,255,255,0.15)] backdrop-blur-sm border border-[rgba(255,255,255,0.3)] shadow-[0_0_10px_rgba(255,255,255,0.2)] transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,0,0,0.6)] hover:bg-[rgba(255,0,0,0.3)] cursor-pointer`}
// // // //                 title={item.label}
// // // //               >
// // // //                 {item.icon}
// // // //               </div>
// // // //               {/* Text (visible only when hovered) */}
// // // //               {isHovered && (
// // // //                 <Link
// // // //                   to={item.path}
// // // //                   className="text-sm font-medium transition-all duration-300 hover:text-red-400"
// // // //                 >
// // // //                   {item.label}
// // // //                 </Link>
// // // //               )}
// // // //             </li>
// // // //           ))}
// // // //         </ul>
// // // //       </nav>

// // // //       {/* Mobile Navbar (unchanged) */}
// // // //       <nav
// // // //         className={`md:hidden fixed top-0 left-0 w-full bg-black text-white px-6 py-4 flex flex-col gap-2 transition-opacity duration-500 z-50 ${showNavbar ? "opacity-100" : "opacity-0 pointer-events-none"
// // // //           }`}
// // // //       >
// // // //         <div className="flex items-center justify-between">
// // // //           <img
// // // //             src="/assets/logo.webp"
// // // //             alt="SocialBureau"
// // // //             className="h-8"
// // // //             onClick={() => navigate("/")}
// // // //           />
// // // //           {/* Hamburger */}
// // // //           <div>
// // // //             <button name="menu" onClick={() => setMenuOpen(!menuOpen)}>
// // // //               {menuOpen ? <FaTimes size={28} /> : <FaBars size={28} />}
// // // //             </button>
// // // //           </div>
// // // //         </div>

// // // //         {/* Mobile Menu (with search inside hamburger) */}
// // // //         {menuOpen && (
// // // //           <div className="w-full bg-black text-white flex flex-col items-center gap-6 py-6 md:hidden z-50 shadow-lg overflow-y-auto max-h-[calc(100vh-80px)]" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
// // // //             <style>{`
// // // //               div::-webkit-scrollbar {
// // // //                 display: none;
// // // //               }
// // // //             `}</style>

// // // //             {/* Search Box */}
// // // //             <div className="w-full mt-2 relative px-4" ref={searchInputRef}>
// // // //               <input
// // // //                 type="text"
// // // //                 placeholder="Search pages..."
// // // //                 className="w-full rounded-lg py-2 px-3 text-black bg-white border border-gray-300"
// // // //                 value={searchTerm}
// // // //                 onChange={e => setSearchTerm(e.target.value)}
// // // //                 onFocus={() => setShowSuggestions(suggestions.length > 0)}
// // // //               />
// // // //               {showSuggestions && (
// // // //                 <ul className="absolute left-0 right-0 top-full bg-white border mt-1 rounded-lg shadow-lg z-10">
// // // //                   {suggestions.map((item, idx) => (
// // // //                     <li
// // // //                       key={idx}
// // // //                       className="px-3 py-2 hover:bg-red-100 cursor-pointer flex items-center gap-2"
// // // //                       onMouseDown={() => handleSuggestionClick(item.path)}
// // // //                     >
// // // //                       <span className="text-red-400">{item.icon}</span>
// // // //                       <span className="text-black">{item.label}</span>
// // // //                     </li>
// // // //                   ))}
// // // //                 </ul>
// // // //               )}
// // // //             </div>
// // // //             {/* Menu Items */}
// // // //             <ul className="w-full flex flex-col items-center gap-6">
// // // //               {MENU_ITEMS.map((item, idx) => (
// // // //                 <li key={idx}>
// // // //                   <Link to={item.path}>{item.label}</Link>
// // // //                 </li>
// // // //               ))}
// // // //             </ul>
// // // //           </div>
// // // //         )}
// // // //       </nav>
// // // //     </>
// // // //   );
// // // // }

// // // import { useState, useEffect } from "react";
// // // import { useNavigate, useLocation } from "react-router-dom";
// // // import { Search, ShoppingBag, Menu, X, ChevronRight } from "lucide-react";
// // // import { motion, AnimatePresence } from "framer-motion";

// // // export default function PremiumNavbar() {
// // //   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
// // //   const [activeDropdown, setActiveDropdown] = useState(null);
// // //   const [isScrolled, setIsScrolled] = useState(false);
// // //   const navigate = useNavigate();
// // //   const location = useLocation();

// // //   const navItems = [
// // //     { label: "Home", href: "/" },
// // //     {
// // //       label: "Services",
// // //       href: "/services",
// // //       columns: [
// // //         {
// // //           title: "Marketing Services",
// // //           items: [
// // //             { label: "API Marketing", href: "/api-marketing" },
// // //             { label: "Performance Marketing", href: "/performance-marketing" },
// // //             { label: "Niche Marketing", href: "/niche-marketing" },
// // //             { label: "Content Marketing", href: "/content-marketing" },
// // //             { label: "AdTech Integration", href: "/adTech-marketing" },
// // //           ],
// // //         },
// // //         {
// // //           title: "Design & Tech",
// // //           items: [
// // //             { label: "Web Development", href: "/services/Web-Development" },
// // //             { label: "Branding", href: "/services/branding" },
// // //             { label: "Technology", href: "/services/technology" },
// // //           ],
// // //         },
// // //         {
// // //           title: "Explore",
// // //           items: [
// // //             { label: "All Services", href: "/services" },
// // //             { label: "Featured Services", href: "/services" },
// // //           ],
// // //         },
// // //       ],
// // //     },
// // //     {
// // //       label: "Company",
// // //       columns: [
// // //         {
// // //           title: "About",
// // //           items: [
// // //             { label: "About Us", href: "/about" },
// // //             { label: "Our Team", href: "/our-team" },
// // //             { label: "Work", href: "/our-works" },
// // //           ],
// // //         },
// // //         {
// // //           title: "Community",
// // //           items: [
// // //             { label: "Blog", href: "/blog" },
// // //             { label: "Events", href: "/events" },
// // //             { label: "Partners", href: "/partners" },
// // //             { label: "Partnerships", href: "/partnerships" },
// // //           ],
// // //         },
// // //       ],
// // //     },
// // //     {
// // //       label: "Careers",
// // //       href: "/careers",
// // //       columns: [
// // //         {
// // //           title: "Open Positions",
// // //           items: [
// // //             { label: "Content Copywriter", href: "/careers/content-copywriter" },
// // //             { label: "Client Success Manager", href: "/careers/client-success-manager" },
// // //             { label: "Business Development Manager", href: "/careers/business-development-manager" },
// // //             { label: "Front Desk Manager", href: "/careers/front-desk-manager" },
// // //             { label: "Digital Marketing Expert", href: "/careers/digital-marketing-expert" },
// // //             { label: "Video Editor", href: "/careers/video-editor" },
// // //             { label: "Web Developer", href: "/careers/web-developer" },
// // //             { label: "Office Operations Manager", href: "/careers/office-operations-manager" },
// // //           ],
// // //         },
// // //         {
// // //           title: "Explore",
// // //           items: [
// // //             { label: "All Careers", href: "/careers" },
// // //             { label: "Life at Company", href: "/careers#life" },
// // //           ],
// // //         },
// // //       ],
// // //     },

// // //     { label: "Contact", href: "/contact" },
// // //     { label: "Let's Talk", href: "/voice" },
// // //   ];

// // //   useEffect(() => {
// // //     const handleScroll = () => setIsScrolled(window.scrollY > 0);
// // //     window.addEventListener("scroll", handleScroll);
// // //     return () => window.removeEventListener("scroll", handleScroll);
// // //   }, []);

// // //   // Sync navigation
// // //   const handleNavClick = (href) => {
// // //     navigate(href);
// // //     setMobileMenuOpen(false);
// // //     setActiveDropdown(null);
// // //   };

// // //   return (
// // //     <>
// // //       <nav
// // //         className={`fixed top-0 w-full z-[100] transition-all duration-500 ${isScrolled || mobileMenuOpen ? "bg-[#1d1d1f]/95" : "bg-[#1d1d1f]/80"
// // //           } backdrop-blur-md`}
// // //         onMouseLeave={() => setActiveDropdown(null)}
// // //       >
// // //         {/* Apple-style container width: max-w-[1024px] is the secret */}
// // //         <div className="max-w-[1024px] mx-auto px-4 md:px-6 lg:px-0">
// // //           <div className="flex items-center justify-between h-11 lg:h-12">

// // //             {/* Mobile Toggle */}
// // //             <button
// // //               className="lg:hidden text-white/80 hover:text-white"
// // //               onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
// // //             >
// // //               {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
// // //             </button>

// // //             {/* Logo */}
// // //             <button onClick={() => handleNavClick("/")} className="text-white/90 hover:text-white transition-opacity">
// // //               <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" /></svg>
// // //             </button>

// // //             {/* Desktop Nav - Reduced Spacing */}
// // //             <div className="hidden lg:flex items-center justify-between flex-1 max-w-[800px] mx-auto px-4">
// // //               {navItems.map((item) => (
// // //                 <div key={item.label} className="relative">
// // //                   <button
// // //                     onMouseEnter={() => item.columns && setActiveDropdown(item.label)}
// // //                     onClick={() => !item.columns && handleNavClick(item.href)}
// // //                     className="text-[12px] font-normal tracking-tight text-white/80 hover:text-white transition-colors py-1"
// // //                   >
// // //                     {item.label}
// // //                   </button>
// // //                 </div>
// // //               ))}
// // //             </div>

// // //             {/* Right Icons */}
// // //             {/* <div className="flex items-center gap-6">
// // //               <button className="text-white/80 hover:text-white"><ShoppingBag size={15} /></button>
// // //             </div> */}
// // //           </div>
// // //         </div>

// // //         {/* Mega Dropdown - Full Width Slide Down */}
// // //         <AnimatePresence>
// // //           {activeDropdown && (
// // //             <motion.div
// // //               initial={{ height: 0, opacity: 0 }}
// // //               animate={{ height: "auto", opacity: 1 }}
// // //               exit={{ height: 0, opacity: 0 }}
// // //               transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
// // //               className="hidden lg:block bg-[#1d1d1f] border-t border-white/5 overflow-hidden"
// // //             >
// // //               <div className="max-w-[1024px] mx-auto py-12 flex gap-24">
// // //                 {navItems.find(i => i.label === activeDropdown)?.columns?.map((col, idx) => (
// // //                   <div key={idx} className="flex flex-col space-y-4">
// // //                     <h3 className="text-[11px] text-white/40 font-bold uppercase tracking-widest">
// // //                       {col.title}
// // //                     </h3>
// // //                     <div className="flex flex-col space-y-2">
// // //                       {col.items.map((subitem) => (
// // //                         <button
// // //                           key={subitem.label}
// // //                           onClick={() => handleNavClick(subitem.href)}
// // //                           className="text-2xl font-semibold text-white/90 hover:text-white text-left transition-colors tracking-tight"
// // //                         >
// // //                           {subitem.label}
// // //                         </button>
// // //                       ))}
// // //                     </div>
// // //                   </div>
// // //                 ))}
// // //               </div>
// // //             </motion.div>
// // //           )}
// // //         </AnimatePresence>

// // //         {/* Mobile Menu Overlay */}
// // //         <AnimatePresence>
// // //           {mobileMenuOpen && (
// // //             <motion.div
// // //               initial={{ opacity: 0 }}
// // //               animate={{ opacity: 1 }}
// // //               exit={{ opacity: 0 }}
// // //               className="lg:hidden fixed inset-0 top-11 bg-[#000000] z-50 px-10 pt-8"
// // //             >
// // //               <div className="flex flex-col space-y-5">
// // //                 {navItems.map((item, i) => (
// // //                   <motion.button
// // //                     initial={{ y: -10, opacity: 0 }}
// // //                     animate={{ y: 0, opacity: 1 }}
// // //                     transition={{ delay: i * 0.04 }}
// // //                     key={item.label}
// // //                     onClick={() => handleNavClick(item.href || "/services")}
// // //                     className="text-2xl font-semibold text-white/90 text-left border-b border-white/10 pb-2 flex justify-between items-center"
// // //                   >
// // //                     {item.label}
// // //                     <ChevronRight size={18} className="text-white/20" />
// // //                   </motion.button>
// // //                 ))}
// // //               </div>
// // //             </motion.div>
// // //           )}
// // //         </AnimatePresence>
// // //       </nav>
// // //       {/* Spacer to prevent content from going under the fixed nav */}
// // //       <div className="h-11 lg:h-12" />
// // //     </>
// // //   );
// // // }



// // import { useState, useEffect } from "react";
// // import { useNavigate, useLocation } from "react-router-dom";
// // import { Search, ShoppingBag, Menu, X, ChevronRight } from "lucide-react";
// // import { motion, AnimatePresence } from "framer-motion";

// // export default function Navbar() {
// //   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
// //   const [activeDropdown, setActiveDropdown] = useState(null);
// //   const [isScrolled, setIsScrolled] = useState(false);
// //   const [expandedMobileCategory, setExpandedMobileCategory] = useState(null);
// //   const navigate = useNavigate();
// //   const location = useLocation();

// //   const navItems = [
// //     { label: "Home", href: "/" },
// //     {
// //       label: "Services",
// //       href: "/services",
// //       columns: [
// //         {
// //           title: "Marketing Services",
// //           items: [
// //             { label: "API Marketing", href: "/api-marketing" },
// //             { label: "Performance Marketing", href: "/performance-marketing" },
// //             { label: "Niche Marketing", href: "/niche-marketing" },
// //             { label: "Content Marketing", href: "/content-marketing" },
// //             { label: "AdTech Integration", href: "/adTech-marketing" },
// //           ],
// //         },
// //         {
// //           title: "Design & Tech",
// //           items: [
// //             { label: "Web Development", href: "/services/Web-Development" },
// //             { label: "Branding", href: "/services/branding" },
// //             { label: "Technology", href: "/services/technology" },
// //           ],
// //         },
// //         {
// //           title: "Explore",
// //           items: [
// //             { label: "All Services", href: "/services" },
// //             { label: "Featured Services", href: "/services" },
// //           ],
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
// //             { label: "Work", href: "/our-works" },
// //           ],
// //         },
// //         {
// //           title: "Community",
// //           items: [
// //             { label: "Blog", href: "/blog" },
// //             { label: "Events", href: "/events" },
// //             { label: "Partners", href: "/partners" },
// //             { label: "Partnerships", href: "/partnerships" },
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
// //             { label: "Business Development Manager", href: "/careers/business-development-manager" },
// //             { label: "Front Desk Manager", href: "/careers/front-desk-manager" },
// //             { label: "Digital Marketing Expert", href: "/careers/digital-marketing-expert" },
// //             { label: "Video Editor", href: "/careers/video-editor" },
// //             { label: "Web Developer", href: "/careers/web-developer" },
// //             { label: "Office Operations Manager", href: "/careers/office-operations-manager" },
// //           ],
// //         },
// //         {
// //           title: "Explore",
// //           items: [
// //             { label: "All Careers", href: "/careers" },
// //             { label: "Life at Company", href: "/careers#life" },
// //           ],
// //         },
// //       ],
// //     },
// //     { label: "Contact", href: "/contact" },
// //     { label: "Let's Talk", href: "/voice" },
// //   ];

// //   useEffect(() => {
// //     const handleScroll = () => setIsScrolled(window.scrollY > 0);
// //     window.addEventListener("scroll", handleScroll);
// //     return () => window.removeEventListener("scroll", handleScroll);
// //   }, []);

// //   // Sync navigation
// //   const handleNavClick = (href) => {
// //     navigate(href);
// //     setMobileMenuOpen(false);
// //     setActiveDropdown(null);
// //     setExpandedMobileCategory(null);
// //   };

// //   return (
// //     <>
// //       <nav
// //         className={`fixed top-0 w-full z-[100] transition-all duration-500 ${
// //           isScrolled || mobileMenuOpen ? "bg-[#1d1d1f]/95" : "bg-[#1d1d1f]/80"
// //         } backdrop-blur-md`}
// //         onMouseLeave={() => setActiveDropdown(null)}
// //       >
// //         {/* Apple-style container width: max-w-[1024px] is the secret */}
// //         <div className="max-w-[1024px] mx-auto px-4 md:px-6 lg:px-0">
// //           <div className="flex items-center justify-between h-11 lg:h-12">
// //             {/* Mobile Toggle */}
// //             <button
// //               className="lg:hidden text-white/80 hover:text-white"
// //               onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
// //             >
// //               {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
// //             </button>

// //             {/* Logo */}
// //             <button
// //               onClick={() => handleNavClick("/")}
// //               className="text-white/90 hover:text-white transition-opacity"
// //             >
// //               <svg
// //                 className="w-4 h-4"
// //                 fill="currentColor"
// //                 viewBox="0 0 24 24"
// //               >
// //                 <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
// //               </svg>
// //             </button>

// //             {/* Desktop Nav - Reduced Spacing */}
// //             <div className="hidden lg:flex items-center justify-between flex-1 max-w-[800px] mx-auto px-4">
// //               {navItems.map((item) => (
// //                 <div key={item.label} className="relative">
// //                   <button
// //                     onMouseEnter={() =>
// //                       item.columns && setActiveDropdown(item.label)
// //                     }
// //                     onClick={() =>
// //                       !item.columns && handleNavClick(item.href)
// //                     }
// //                     className="text-[12px] font-normal tracking-tight text-white/80 hover:text-white transition-colors py-1"
// //                   >
// //                     {item.label}
// //                   </button>
// //                 </div>
// //               ))}
// //             </div>

// //             {/* Right Icons */}
// //             <div className="hidden lg:flex items-center gap-6">
// //               <button className="text-white/80 hover:text-white">
// //                 <Search size={15} />
// //               </button>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Mega Dropdown - Full Width Slide Down (Desktop) */}
// //         <AnimatePresence>
// //           {activeDropdown && (
// //             <motion.div
// //               initial={{ height: 0, opacity: 0 }}
// //               animate={{ height: "auto", opacity: 1 }}
// //               exit={{ height: 0, opacity: 0 }}
// //               transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
// //               className="hidden lg:block bg-[#1d1d1f] border-t border-white/5 overflow-hidden"
// //             >
// //               <div className="max-w-[1024px] mx-auto py-12 flex gap-24">
// //                 {navItems
// //                   .find((i) => i.label === activeDropdown)
// //                   ?.columns?.map((col, idx) => (
// //                     <div key={idx} className="flex flex-col space-y-4">
// //                       <h3 className="text-[11px] text-white/40 font-bold uppercase tracking-widest">
// //                         {col.title}
// //                       </h3>
// //                       <div className="flex flex-col space-y-2">
// //                         {col.items.map((subitem) => (
// //                           <button
// //                             key={subitem.label}
// //                             onClick={() => handleNavClick(subitem.href)}
// //                             className="text-2xl font-semibold text-white/90 hover:text-white text-left transition-colors tracking-tight"
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

// //         {/* Mobile Menu - Apple Style Vertical List */}
// //         <AnimatePresence>
// //           {mobileMenuOpen && (
// //             <motion.div
// //               initial={{ opacity: 0, y: -10 }}
// //               animate={{ opacity: 1, y: 0 }}
// //               exit={{ opacity: 0, y: -10 }}
// //               transition={{ duration: 0.3 }}
// //               className="lg:hidden fixed inset-0 top-11 bg-white z-50 overflow-y-auto"
// //             >
// //               <div className="flex flex-col w-full">
// //                 {navItems.map((item, i) => (
// //                   <motion.div
// //                     key={item.label}
// //                     initial={{ opacity: 0 }}
// //                     animate={{ opacity: 1 }}
// //                     transition={{ delay: i * 0.02 }}
// //                   >
// //                     {/* Category with submenu */}
// //                     {item.columns ? (
// //                       <>
// //                         <button
// //                           onClick={() =>
// //                             setExpandedMobileCategory(
// //                               expandedMobileCategory === item.label
// //                                 ? null
// //                                 : item.label
// //                             )
// //                           }
// //                           className="w-full text-left px-6 py-4 border-b border-gray-200 flex justify-between items-center hover:bg-gray-50 transition-colors"
// //                         >
// //                           <span className="text-lg font-medium text-black">
// //                             {item.label}
// //                           </span>
// //                           <motion.div
// //                             animate={{
// //                               rotate:
// //                                 expandedMobileCategory === item.label ? 90 : 0,
// //                             }}
// //                             transition={{ duration: 0.3 }}
// //                           >
// //                             <ChevronRight
// //                               size={20}
// //                               className="text-gray-400"
// //                             />
// //                           </motion.div>
// //                         </button>

// //                         {/* Expanded submenu */}
// //                         <AnimatePresence>
// //                           {expandedMobileCategory === item.label && (
// //                             <motion.div
// //                               initial={{ height: 0, opacity: 0 }}
// //                               animate={{ height: "auto", opacity: 1 }}
// //                               exit={{ height: 0, opacity: 0 }}
// //                               transition={{ duration: 0.3 }}
// //                               className="overflow-hidden bg-gray-50"
// //                             >
// //                               {item.columns.map((col, colIdx) => (
// //                                 <div key={colIdx} className="px-6 py-4">
// //                                   <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">
// //                                     {col.title}
// //                                   </h3>
// //                                   <div className="space-y-2">
// //                                     {col.items.map((subitem) => (
// //                                       <button
// //                                         key={subitem.label}
// //                                         onClick={() =>
// //                                           handleNavClick(subitem.href)
// //                                         }
// //                                         className="block w-full text-left py-2 text-base text-gray-700 hover:text-black transition-colors font-medium"
// //                                       >
// //                                         {subitem.label}
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
// //                       /* Simple menu item without submenu */
// //                       <button
// //                         onClick={() => handleNavClick(item.href)}
// //                         className="w-full text-left px-6 py-4 border-b border-gray-200 hover:bg-gray-50 transition-colors"
// //                       >
// //                         <span className="text-lg font-medium text-black">
// //                           {item.label}
// //                         </span>
// //                       </button>
// //                     )}
// //                   </motion.div>
// //                 ))}
// //               </div>
// //             </motion.div>
// //           )}
// //         </AnimatePresence>
// //       </nav>

// //       {/* Spacer to prevent content from going under the fixed nav */}
// //       <div className="h-11 lg:h-12" />
// //     </>
// //   );
// // }



// import { useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { Search, Menu, X, ChevronRight } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";

// export default function Navbar() {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [activeDropdown, setActiveDropdown] = useState(null);
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [expandedMobileCategory, setExpandedMobileCategory] = useState(null);
//   const navigate = useNavigate();
//   const location = useLocation();

//   const navItems = [
//     { label: "Home", href: "/" },
//     {
//       label: "Services",
//       href: "/services",
//       columns: [
//         {
//           title: "Marketing Services",
//           items: [
//             { label: "API Marketing", href: "/api-marketing" },
//             { label: "Performance Marketing", href: "/performance-marketing" },
//             { label: "Niche Marketing", href: "/niche-marketing" },
//             { label: "Content Marketing", href: "/content-marketing" },
//             { label: "AdTech Integration", href: "/adTech-marketing" },
//           ],
//         },
//         {
//           title: "Design & Tech",
//           items: [
//             { label: "Web Development", href: "/services/Web-Development" },
//             { label: "Branding", href: "/services/branding" },
//             { label: "Technology", href: "/services/technology" },
//           ],
//         },
//         {
//           title: "Explore",
//           items: [
//             { label: "All Services", href: "/services" },
//             { label: "Featured Services", href: "/services" },
//           ],
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
//             { label: "Work", href: "/our-works" },
//           ],
//         },
//         {
//           title: "Community",
//           items: [
//             { label: "Blog", href: "/blog" },
//             { label: "Events", href: "/events" },
//             { label: "Partners", href: "/partners" },
//             { label: "Partnerships", href: "/partnerships" },
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
//             { label: "Business Development Manager", href: "/careers/business-development-manager" },
//             { label: "Front Desk Manager", href: "/careers/front-desk-manager" },
//             { label: "Digital Marketing Expert", href: "/careers/digital-marketing-expert" },
//             { label: "Video Editor", href: "/careers/video-editor" },
//             { label: "Web Developer", href: "/careers/web-developer" },
//             { label: "Office Operations Manager", href: "/careers/office-operations-manager" },
//           ],
//         },
//         {
//           title: "Explore",
//           items: [
//             { label: "All Careers", href: "/careers" },
//             { label: "Life at Company", href: "/careers#life" },
//           ],
//         },
//       ],
//     },
//     { label: "Contact", href: "/contact" },
//     { label: "Let's Talk", href: "/voice" },
//   ];

//   useEffect(() => {
//     const handleScroll = () => setIsScrolled(window.scrollY > 0);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   // Sync navigation
//   const handleNavClick = (href) => {
//     navigate(href);
//     setMobileMenuOpen(false);
//     setActiveDropdown(null);
//     setExpandedMobileCategory(null);
//   };

//   return (
//     <>
//       <nav
//         className={`fixed top-0 w-full z-[100] transition-all duration-500 ${isScrolled || mobileMenuOpen ? "bg-[#1d1d1f]/95" : "bg-[#1d1d1f]/80"
//           } backdrop-blur-md`}
//         onMouseLeave={() => setActiveDropdown(null)}
//       >
//         {/* Apple-style container */}
//         <div className="max-w-[1200px] mx-auto px-4 md:px-8 lg:px-12">
//           <div className="flex items-center justify-between h-14 lg:h-16">
//             {/* Mobile Toggle */}
//             <button
//               className="lg:hidden text-white/80 hover:text-white transition-colors"
//               onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//             >
//               {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
//             </button>

//             {/* Logo - Desktop and Mobile */}
//             <button
//               onClick={() => handleNavClick("/")}
//               className="flex-shrink-0 transition-opacity hover:opacity-80"
//             >
//               {/* Replace with your company logo */}
//               <img
//                 src="/assets/socialbureau.webp"
//                 alt="Company Logo"
//                 className="h-8 lg:h-10 w-auto"
//               />
//               {/* Fallback if no image */}
//               {/* <span className="text-white font-bold text-lg">YourBrand</span> */}
//             </button>

//             {/* Desktop Nav - Better Spacing */}
//             <div className="hidden lg:flex items-center justify-center flex-1 gap-10 mx-8">
//               {navItems.map((item) => (
//                 <div key={item.label} className="relative group">
//                   <button
//                     onMouseEnter={() =>
//                       item.columns && setActiveDropdown(item.label)
//                     }
//                     onClick={() =>
//                       !item.columns && handleNavClick(item.href)
//                     }
//                     className="text-[13px] font-medium tracking-tight text-white/85 hover:text-white transition-colors py-2 whitespace-nowrap"
//                   >
//                     {item.label}
//                   </button>
//                 </div>
//               ))}
//             </div>

//             {/* Right Icons */}
//             <div className="hidden lg:flex items-center gap-6">
//               <button className="text-white/80 hover:text-white transition-colors">
//                 <Search size={18} />
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Mega Dropdown - Expanded (Desktop) */}
//         <AnimatePresence>
//           {activeDropdown && (
//             <motion.div
//               initial={{ height: 0, opacity: 0 }}
//               animate={{ height: "auto", opacity: 1 }}
//               exit={{ height: 0, opacity: 0 }}
//               transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
//               className="hidden lg:block bg-[#1d1d1f] border-t border-white/10 overflow-hidden"
//             >
//               <div className="max-w-[1200px] mx-auto px-12 py-16 flex gap-32">
//                 {navItems
//                   .find((i) => i.label === activeDropdown)
//                   ?.columns?.map((col, idx) => (
//                     <motion.div
//                       key={idx}
//                       initial={{ opacity: 0, y: 10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ delay: idx * 0.1 }}
//                       className="flex flex-col space-y-6"
//                     >
//                       <h3 className="text-[12px] text-white/50 font-bold uppercase tracking-widest">
//                         {col.title}
//                       </h3>
//                       <div className="flex flex-col space-y-3">
//                         {col.items.map((subitem) => (
//                           <button
//                             key={subitem.label}
//                             onClick={() => handleNavClick(subitem.href)}
//                             className="text-lg font-semibold text-white/90 hover:text-white text-left transition-colors tracking-tight hover:translate-x-1 duration-200"
//                           >
//                             {subitem.label}
//                           </button>
//                         ))}
//                       </div>
//                     </motion.div>
//                   ))}
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* Mobile Menu - White Background */}
//         <AnimatePresence>
//           {mobileMenuOpen && (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               transition={{ duration: 0.3 }}
//               className="lg:hidden fixed inset-0 top-14 bg-white z-50 overflow-y-auto"
//             >
//               <div className="flex flex-col w-full">
//                 {navItems.map((item, i) => (
//                   <motion.div
//                     key={item.label}
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     transition={{ delay: i * 0.05 }}
//                   >
//                     {/* Category with submenu */}
//                     {item.columns ? (
//                       <>
//                         <button
//                           onClick={() =>
//                             setExpandedMobileCategory(
//                               expandedMobileCategory === item.label
//                                 ? null
//                                 : item.label
//                             )
//                           }
//                           className="w-full text-left px-6 py-5 border-b border-gray-200 flex justify-between items-center hover:bg-gray-50 transition-colors active:bg-gray-100"
//                         >
//                           <span className="text-lg font-semibold text-black">
//                             {item.label}
//                           </span>
//                           <motion.div
//                             animate={{
//                               rotate:
//                                 expandedMobileCategory === item.label ? 90 : 0,
//                             }}
//                             transition={{ duration: 0.3 }}
//                           >
//                             <ChevronRight
//                               size={22}
//                               className="text-gray-500"
//                             />
//                           </motion.div>
//                         </button>

//                         {/* Expanded submenu */}
//                         <AnimatePresence>
//                           {expandedMobileCategory === item.label && (
//                             <motion.div
//                               initial={{ height: 0, opacity: 0 }}
//                               animate={{ height: "auto", opacity: 1 }}
//                               exit={{ height: 0, opacity: 0 }}
//                               transition={{ duration: 0.3 }}
//                               className="overflow-hidden bg-gray-50"
//                             >
//                               {item.columns.map((col, colIdx) => (
//                                 <div key={colIdx} className="px-6 py-5 border-b border-gray-200 last:border-b-0">
//                                   <h3 className="text-xs font-bold text-gray-600 uppercase tracking-widest mb-4">
//                                     {col.title}
//                                   </h3>
//                                   <div className="space-y-3 ml-2">
//                                     {col.items.map((subitem) => (
//                                       <button
//                                         key={subitem.label}
//                                         onClick={() =>
//                                           handleNavClick(subitem.href)
//                                         }
//                                         className="block w-full text-left py-2.5 text-base text-gray-800 hover:text-black hover:font-medium transition-colors"
//                                       >
//                                         {subitem.label}
//                                       </button>
//                                     ))}
//                                   </div>
//                                 </div>
//                               ))}
//                             </motion.div>
//                           )}
//                         </AnimatePresence>
//                       </>
//                     ) : (
//                       /* Simple menu item without submenu */
//                       <button
//                         onClick={() => handleNavClick(item.href)}
//                         className="w-full text-left px-6 py-5 border-b border-gray-200 hover:bg-gray-50 transition-colors active:bg-gray-100"
//                       >
//                         <span className="text-lg font-semibold text-black">
//                           {item.label}
//                         </span>
//                       </button>
//                     )}
//                   </motion.div>
//                 ))}

//                 {/* Mobile Footer Links */}
//                 <div className="border-t border-gray-200 p-6 mt-4 bg-gray-50">
//                   <div className="space-y-3">
//                     <p className="text-xs text-gray-600 uppercase tracking-widest font-semibold mb-4">
//                       Legal
//                     </p>
//                     <a href="#" className="block text-sm text-gray-700 hover:text-black">
//                       Privacy Policy
//                     </a>
//                     <a href="#" className="block text-sm text-gray-700 hover:text-black">
//                       Terms of Service
//                     </a>
//                     <a href="#" className="block text-sm text-gray-700 hover:text-black">
//                       Contact
//                     </a>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </nav>

//       {/* Spacer to prevent content from going under the fixed nav */}
//       <div className="h-14 lg:h-16" />
//     </>
//   );
// }


import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Search, Menu, X, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [expandedMobileCategory, setExpandedMobileCategory] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: "Home", href: "/" },
    {
      label: "Services",
      href: "/services",
      columns: [
        {
          title: "Marketing Services",
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
          items: [
            { label: "Web Development", href: "/services/Web-Development" },
          ],
        },
        {
          title: "Explore",
          items: [
            { label: "Featured Services", href: "/services" },
          ],
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
            { label: "Work", href: "/our-works" },
          ],
        },
        {
          title: "Community",
          items: [
            { label: "Blog", href: "/blog" },
            { label: "Events", href: "/events" },
            { label: "Partners", href: "/partners" },
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
            { label: "Web Developer", href: "/careers/web-developer" },
            { label: "Office Operations", href: "/careers/office-operations-manager" },
          ],
        },
        {
          title: "Explore",
          items: [
            { label: "All Careers", href: "/careers" },
          ],
        },
      ],
    },
    { label: "Contact", href: "/contact" },
    { label: "Login", href: "/login" },
    {
      label: "Partnership", href: "/partners",

      columns: [
        {
          title: "Partnership",
          items: [
            { label: "Partners", href: "/partners" },
            { label: "Ranjit", href: "/Ranjit" },],
        },
      ],
    },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href) => {
    navigate(href);
    setMobileMenuOpen(false);
    setActiveDropdown(null);
    setExpandedMobileCategory(null);
  };

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-[100] transition-all duration-300 border-b ${isScrolled || mobileMenuOpen
          ? "bg-white/95 border-gray-200 shadow-sm"
          : "bg-white/80 border-transparent"
          } backdrop-blur-md`}
        onMouseLeave={() => setActiveDropdown(null)}
      >
        <div className="max-w-[1300px] mx-auto px-6">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <button onClick={() => handleNavClick("/")} className="z-50 shrink-0">
              <img
                src="/assets/socialbureau.webp"
                alt="Logo"
                className="h-8 lg:h-9 w-auto object-contain block"
                style={{ minWidth: 'auto' }}
              />
            </button>

            {/* Desktop Nav - Balanced Spacing */}
            <div className="hidden lg:flex items-center justify-center flex-1 gap-8 xl:gap-10">
              {navItems.map((item) => (
                <div key={item.label} className="relative">
                  <button
                    onMouseEnter={() => item.columns && setActiveDropdown(item.label)}
                    onClick={() => !item.columns && handleNavClick(item.href)}
                    className="text-[14px] font-medium text-gray-700 hover:text-black transition-colors py-5"
                  >
                    {item.label}
                  </button>
                </div>
              ))}
            </div>

            {/* Right Icons */}
            <div className="flex items-center gap-5 shrink-0">
              <button
                className="lg:hidden text-gray-600 hover:text-black"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mega Dropdown - Clean White Design */}
        <AnimatePresence>
          {activeDropdown && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="hidden lg:block absolute w-full bg-white border-b border-gray-200 shadow-2xl"
            >
              <div className="max-w-[1200px] mx-auto px-10 py-14 flex flex-row gap-20 justify-start">
                {navItems
                  .find((i) => i.label === activeDropdown)
                  ?.columns?.map((col, idx) => (
                    <div key={idx} className="flex flex-col">
                      <h3 className="text-[11px] text-gray-400 font-bold uppercase tracking-[1.5px] mb-6">
                        {col.title}
                      </h3>
                      <div className="flex flex-col space-y-1">
                        {col.items.map((subitem) => (
                          <button
                            key={subitem.label}
                            onClick={() => handleNavClick(subitem.href)}
                            className="text-[15px] font-semibold text-gray-700 hover:text-black text-left py-2 px-3 -ml-3 rounded-lg hover:bg-gray-50 transition-all duration-200 whitespace-nowrap"
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

        {/* Mobile Menu - Vertical White List */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "100vh" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden fixed inset-0 top-[64px] bg-white z-40 overflow-y-auto px-6 py-4"
            >
              <div className="flex flex-col divide-y divide-gray-100">
                {navItems.map((item) => (
                  <div key={item.label} className="py-2">
                    {item.columns ? (
                      <>
                        <button
                          onClick={() => setExpandedMobileCategory(expandedMobileCategory === item.label ? null : item.label)}
                          className="w-full flex justify-between items-center py-4 text-lg font-bold text-gray-900"
                        >
                          {item.label}
                          <ChevronRight className={`transition-transform duration-300 ${expandedMobileCategory === item.label ? 'rotate-90' : ''}`} />
                        </button>
                        <AnimatePresence>
                          {expandedMobileCategory === item.label && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              className="bg-gray-50 rounded-2xl p-5 mb-4 space-y-6 overflow-hidden"
                            >
                              {item.columns.map((col) => (
                                <div key={col.title}>
                                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">{col.title}</p>
                                  <div className="flex flex-col gap-3">
                                    {col.items.map(sub => (
                                      <button key={sub.label} onClick={() => handleNavClick(sub.href)} className="text-left text-gray-700 font-semibold">{sub.label}</button>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <button onClick={() => handleNavClick(item.href)} className="w-full text-left py-4 text-lg font-bold text-gray-900">
                        {item.label}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
      {/* Dynamic Spacer */}
      <div className="h-16" />
    </>
  );
}




