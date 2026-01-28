// import { useState, useEffect, useRef } from "react";
// import {
//   FaBars, FaTimes, FaHome, FaBriefcase, FaTools, FaEnvelope, FaBlog,
//   FaInfoCircle, FaMicrophone, FaUserTie,
//   FaUsers, FaCalendarAlt, FaTrophy
// } from "react-icons/fa";
// import { Link, useNavigate } from "react-router-dom";

// const MENU_ITEMS = [
//   { icon: <FaHome />, label: "Home", path: "/" },
//   { icon: <FaInfoCircle />, label: "About", path: "/about" },
//   { icon: <FaBriefcase />, label: "Services", path: "/services" },
//   { icon: <FaUsers />, label: "Our Team", path: "/our-team" },
//   { icon: <FaUserTie />, label: "Careers", path: "/careers" },
//   { icon: <FaBlog />, label: "Blogs", path: "/blog" },
//   { icon: < FaTrophy />, label: "Leaderboard", path: "/leaderboard" },
//   { icon: <FaTools />, label: "Business Tool", path: "/tool" },
//   { icon: <FaEnvelope />, label: "Contact", path: "/contact" },
//   { icon: <FaMicrophone />, label: "Let's Talk", path: "/voice" },
// ];

// const SEARCH_ITEMS = [
//   { icon: <FaHome />, label: "Home", path: "/" },
//   { icon: <FaBriefcase />, label: "Services", path: "/services" },
//   { icon: <FaBriefcase />, label: "Web Development", path: "/services/Web-Development" },
//   { icon: <FaBriefcase />, label: "API-Drive Growth & Automated Distribution", path: "/services/API-Driven-Growth-Automated-Distribution" },
//   { icon: <FaBriefcase />, label: "Full-Funnel Performance Marketing", path: "/services/Full-Funnel-Performance-Marketing" },
//   { icon: <FaBriefcase />, label: "Funnel Architecture Growth Pathways", path: "/services/Funnel-Architecture-Growth-Pathways" },
//   { icon: <FaBriefcase />, label: "Conversion Rate Optimization Landing Systems", path: "/services/Conversion-Rate-Optimization-Landing-Systems" },
//   { icon: <FaBriefcase />, label: "Messaging Positioning for Niche Brands", path: "/services/Messaging-Positioning-for-Niche-Brands" },
//   { icon: <FaBriefcase />, label: "Niche Market Penetration Strategy", path: "/services/Niche-Market-Penetration-Strategy" },
//   { icon: <FaBriefcase />, label: "Influencer UGC Growth Engines", path: "/services/Influencer-UGC-Growth-Engines" },
//   { icon: <FaBriefcase />, label: "Lifecycle Email Automation Strategy", path: "/services/Lifecycle-Email-Automation-Strategy" },
//   { icon: <FaBriefcase />, label: "Software GTM Growth Architecture", path: "/services/Software-GTM-Growth-Architecture" },
//   { icon: <FaTools />, label: "Business Tool", path: "/tool" },
//   { icon: <FaBlog />, label: "Blogs", path: "/blog" },
//   // { icon: <FaCalendarAlt />, label: "Events", path: "/events" },
//   { icon: <FaUsers />, label: "Our Team", path: "/our-team" },
//   { icon: <FaUserTie />, label: "Careers", path: "/careers" },
//   { icon: <FaInfoCircle />, label: "About", path: "/about" },
//   { icon: <FaEnvelope />, label: "Contact", path: "/contact" },
//   { icon: <FaMicrophone />, label: "Let's Talk", path: "/voice" },
// ];

// export default function Navbar() {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [showNavbar, setShowNavbar] = useState(false);
//   const [isHovered, setIsHovered] = useState(false);

//   const [searchTerm, setSearchTerm] = useState("");
//   const [suggestions, setSuggestions] = useState([]);
//   const [showSuggestions, setShowSuggestions] = useState(false);
//   const searchInputRef = useRef(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > 50) setShowNavbar(true);
//       else setShowNavbar(false);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   useEffect(() => {
//     // Update suggestions when searchTerm changes
//     if (searchTerm.trim() === "") {
//       setSuggestions([]);
//       setShowSuggestions(false);
//       return;
//     }
//     const matches = SEARCH_ITEMS.filter(item =>
//       item.label.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     setSuggestions(matches);
//     setShowSuggestions(matches.length > 0);
//   }, [searchTerm]);

//   // Hide suggestions when clicking outside search box
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (
//         searchInputRef.current &&
//         !searchInputRef.current.contains(event.target)
//       ) {
//         setShowSuggestions(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const handleSuggestionClick = (path) => {
//     setSearchTerm("");
//     setShowSuggestions(false);
//     navigate(path);
//   };

//   return (
//     <>
//       {/* Desktop Sidebar */}
//       <nav
//         className={`hidden md:flex fixed top-0 left-0 h-screen text-white flex-col items-center justify-start transition-all duration-500 z-50
//         ${isHovered ? "w-48 backdrop-blur-md bg-[rgba(255,255,255,0.1)] border-r border-[rgba(255,255,255,0.2)] shadow-[0_0_20px_rgba(255,255,255,0.15)]" : "w-20 bg-transparent border-none shadow-none"}
//         ${showNavbar ? "opacity-100" : "opacity-0 pointer-events-none"}`}
//         onMouseEnter={() => setIsHovered(true)}
//         onMouseLeave={() => {
//           setIsHovered(false);
//           setShowSuggestions(false);
//         }}
//       >
//         <ul className="flex flex-col gap-6 mt-5 w-full items-center">
//           {/* Search Box (only visible when hovered) */}
//           {/* {isHovered && (
//             <li className="w-full px-4" ref={searchInputRef}>
//               <div className="relative">
//                 <input
//                   type="text"
//                   placeholder="Search pages..."
//                   className="w-full rounded-lg py-2 px-3 text-black bg-white transition-all duration-300 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-300"
//                   value={searchTerm}
//                   onChange={e => setSearchTerm(e.target.value)}
//                   onFocus={() => setShowSuggestions(suggestions.length > 0)}
//                 />
//                 {showSuggestions && (
//                   <ul className="absolute left-0 right-0 top-full bg-white border mt-1 rounded-lg shadow-lg z-10">
//                     {suggestions.map((item, idx) => (
//                       <li
//                         key={idx}
//                         className="px-3 py-2 hover:bg-red-100 cursor-pointer flex items-center gap-2"
//                         onMouseDown={() => handleSuggestionClick(item.path)}
//                       >
//                         <span className="text-red-400">{item.icon}</span>
//                         <span className="text-black">{item.label}</span>
//                       </li>
//                     ))}
//                   </ul>
//                 )}
//               </div>
//             </li>
//           )} */}

//           {/* Logo */}
//           <li>
//             <Link to="/">
//               <img
//                 src="/assets/socialbureau.webp"
//                 alt="Logo"
//                 className={`transition-all duration-500 ${isHovered ? "w-15" : "w-10"}`}
//               />
//             </Link>
//           </li>

//           {/* Menu Items - show only icon by default, expand label on hover */}
//           {MENU_ITEMS.map((item, idx) => (
//             <li
//               key={idx}
//               className={`flex items-center gap-x-4 w-full justify-start px-4 transition-all duration-300`}
//             >
//               {/* Circular Icon */}
//               <div
//                 onClick={() => navigate(item.path)}
//                 className={`flex items-center justify-center text-xl w-8 h-8 rounded-full bg-[rgba(255,255,255,0.15)] backdrop-blur-sm border border-[rgba(255,255,255,0.3)] shadow-[0_0_10px_rgba(255,255,255,0.2)] transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,0,0,0.6)] hover:bg-[rgba(255,0,0,0.3)] cursor-pointer`}
//                 title={item.label} // Tooltip for collapsed sidebar
//               >
//                 {item.icon}
//               </div>
//               {/* Text (visible only when hovered) */}
//               {isHovered && (
//                 <Link
//                   to={item.path}
//                   className="text-sm font-medium transition-all duration-300 hover:text-red-400"
//                 >
//                   {item.label}
//                 </Link>
//               )}
//             </li>
//           ))}
//         </ul>
//       </nav>

//       {/* Mobile Navbar (unchanged) */}
//       <nav
//         className={`md:hidden fixed top-0 left-0 w-full bg-black text-white px-6 py-4 flex flex-col gap-2 transition-opacity duration-500 z-50 ${showNavbar ? "opacity-100" : "opacity-0 pointer-events-none"
//           }`}
//       >
//         <div className="flex items-center justify-between">
//           <img
//             src="/assets/logo.webp"
//             alt="SocialBureau"
//             className="h-8"
//             onClick={() => navigate("/")}
//           />
//           {/* Hamburger */}
//           <div>
//             <button name="menu" onClick={() => setMenuOpen(!menuOpen)}>
//               {menuOpen ? <FaTimes size={28} /> : <FaBars size={28} />}
//             </button>
//           </div>
//         </div>

//         {/* Mobile Menu (with search inside hamburger) */}
//         {menuOpen && (
//           <div className="w-full bg-black text-white flex flex-col items-center gap-6 py-6 md:hidden z-50 shadow-lg">
//             {/* Search Box */}
//             <div className="w-full mt-2 relative px-4" ref={searchInputRef}>
//               <input
//                 type="text"
//                 placeholder="Search pages..."
//                 className="w-full rounded-lg py-2 px-3 text-black bg-white border border-gray-300"
//                 value={searchTerm}
//                 onChange={e => setSearchTerm(e.target.value)}
//                 onFocus={() => setShowSuggestions(suggestions.length > 0)}
//               />
//               {showSuggestions && (
//                 <ul className="absolute left-0 right-0 top-full bg-white border mt-1 rounded-lg shadow-lg z-10">
//                   {suggestions.map((item, idx) => (
//                     <li
//                       key={idx}
//                       className="px-3 py-2 hover:bg-red-100 cursor-pointer flex items-center gap-2"
//                       onMouseDown={() => handleSuggestionClick(item.path)}
//                     >
//                       <span className="text-red-400">{item.icon}</span>
//                       <span className="text-black">{item.label}</span>
//                     </li>
//                   ))}
//                 </ul>
//               )}
//             </div>
//             {/* Menu Items */}
//             <ul className="w-full flex flex-col items-center gap-6">
//               {MENU_ITEMS.map((item, idx) => (
//                 <li key={idx}>
//                   <Link to={item.path}>{item.label}</Link>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}
//       </nav>
//     </>
//   );
// }



import { useState, useEffect, useRef } from "react";
import {
  FaBars, FaTimes, FaHome, FaBriefcase, FaTools, FaEnvelope, FaBlog,
  FaInfoCircle, FaMicrophone, FaUserTie,
  FaUsers, FaCalendarAlt, FaTrophy
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const MENU_ITEMS = [
  { icon: <FaHome />, label: "Home", path: "/" },
  { icon: <FaInfoCircle />, label: "About", path: "/about" },
  { icon: <FaBriefcase />, label: "Services", path: "/services" },
  { icon: <FaUsers />, label: "Our Team", path: "/our-team" },
  { icon: <FaUserTie />, label: "Careers", path: "/careers" },
  { icon: <FaBlog />, label: "Blogs", path: "/blog" },
  { icon: < FaTrophy />, label: "Leaderboard", path: "/leaderboard" },
  // { icon: <FaTools />, label: "Business Tool", path: "/tool" },
  { icon: <FaEnvelope />, label: "Contact", path: "/contact" },
  { icon: <FaMicrophone />, label: "Let's Talk", path: "/voice" },
];

const SEARCH_ITEMS = [
  { icon: <FaHome />, label: "Home", path: "/" },
  { icon: <FaBriefcase />, label: "Services", path: "/services" },
  { icon: <FaBriefcase />, label: "Web Development", path: "/services/Web-Development" },
  { icon: <FaBriefcase />, label: "API-Drive Growth & Automated Distribution", path: "/services/API-Driven-Growth-Automated-Distribution" },
  { icon: <FaBriefcase />, label: "Full-Funnel Performance Marketing", path: "/services/Full-Funnel-Performance-Marketing" },
  { icon: <FaBriefcase />, label: "Funnel Architecture Growth Pathways", path: "/services/Funnel-Architecture-Growth-Pathways" },
  { icon: <FaBriefcase />, label: "Conversion Rate Optimization Landing Systems", path: "/services/Conversion-Rate-Optimization-Landing-Systems" },
  { icon: <FaBriefcase />, label: "Messaging Positioning for Niche Brands", path: "/services/Messaging-Positioning-for-Niche-Brands" },
  { icon: <FaBriefcase />, label: "Niche Market Penetration Strategy", path: "/services/Niche-Market-Penetration-Strategy" },
  { icon: <FaBriefcase />, label: "Influencer UGC Growth Engines", path: "/services/Influencer-UGC-Growth-Engines" },
  { icon: <FaBriefcase />, label: "Lifecycle Email Automation Strategy", path: "/services/Lifecycle-Email-Automation-Strategy" },
  { icon: <FaBriefcase />, label: "Software GTM Growth Architecture", path: "/services/Software-GTM-Growth-Architecture" },
  // { icon: <FaTools />, label: "Business Tool", path: "/tool" },
  { icon: <FaBlog />, label: "Blogs", path: "/blog" },
  // { icon: <FaCalendarAlt />, label: "Events", path: "/events" },
  { icon: <FaUsers />, label: "Our Team", path: "/our-team" },
  { icon: <FaUserTie />, label: "Careers", path: "/careers" },
  { icon: <FaInfoCircle />, label: "About", path: "/about" },
  { icon: <FaEnvelope />, label: "Contact", path: "/contact" },
  { icon: <FaMicrophone />, label: "Let's Talk", path: "/voice" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) setShowNavbar(true);
      else setShowNavbar(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Update suggestions when searchTerm changes
    if (searchTerm.trim() === "") {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }
    const matches = SEARCH_ITEMS.filter(item =>
      item.label.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSuggestions(matches);
    setShowSuggestions(matches.length > 0);
  }, [searchTerm]);

  // Hide suggestions when clicking outside search box
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSuggestionClick = (path) => {
    setSearchTerm("");
    setShowSuggestions(false);
    navigate(path);
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <nav
        className={`hidden md:flex fixed top-0 left-0 h-screen text-white flex-col items-center justify-start transition-all duration-500 z-50
        ${isHovered ? "w-48 backdrop-blur-md bg-[rgba(255,255,255,0.1)] border-r border-[rgba(255,255,255,0.2)] shadow-[0_0_20px_rgba(255,255,255,0.15)]" : "w-20 bg-transparent border-none shadow-none"}
        ${showNavbar ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setShowSuggestions(false);
        }}
      >
        <ul
          className="flex flex-col gap-6 mt-5 w-full items-center overflow-y-auto overflow-x-hidden max-h-[calc(100vh-100px)] pr-2"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <style>{`
            ul::-webkit-scrollbar {
              display: none;
            }
          `}</style>

          {/* Logo */}
          <li>
            <Link to="/">
              <img
                src="/assets/socialbureau.webp"
                alt="Logo"
                className={`transition-all duration-500 ${isHovered ? "w-15" : "w-10"}`}
              />
            </Link>
          </li>

          {/* Menu Items - show only icon by default, expand label on hover */}
          {MENU_ITEMS.map((item, idx) => (
            <li
              key={idx}
              className={`flex items-center gap-x-4 w-full justify-start px-4 transition-all duration-300`}
            >
              {/* Circular Icon */}
              <div
                onClick={() => navigate(item.path)}
                className={`flex items-center justify-center text-xl w-8 h-8 rounded-full bg-[rgba(255,255,255,0.15)] backdrop-blur-sm border border-[rgba(255,255,255,0.3)] shadow-[0_0_10px_rgba(255,255,255,0.2)] transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,0,0,0.6)] hover:bg-[rgba(255,0,0,0.3)] cursor-pointer`}
                title={item.label}
              >
                {item.icon}
              </div>
              {/* Text (visible only when hovered) */}
              {isHovered && (
                <Link
                  to={item.path}
                  className="text-sm font-medium transition-all duration-300 hover:text-red-400"
                >
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile Navbar (unchanged) */}
      <nav
        className={`md:hidden fixed top-0 left-0 w-full bg-black text-white px-6 py-4 flex flex-col gap-2 transition-opacity duration-500 z-50 ${showNavbar ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
      >
        <div className="flex items-center justify-between">
          <img
            src="/assets/logo.webp"
            alt="SocialBureau"
            className="h-8"
            onClick={() => navigate("/")}
          />
          {/* Hamburger */}
          <div>
            <button name="menu" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <FaTimes size={28} /> : <FaBars size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu (with search inside hamburger) */}
        {menuOpen && (
          <div className="w-full bg-black text-white flex flex-col items-center gap-6 py-6 md:hidden z-50 shadow-lg overflow-y-auto max-h-[calc(100vh-80px)]" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            <style>{`
              div::-webkit-scrollbar {
                display: none;
              }
            `}</style>

            {/* Search Box */}
            <div className="w-full mt-2 relative px-4" ref={searchInputRef}>
              <input
                type="text"
                placeholder="Search pages..."
                className="w-full rounded-lg py-2 px-3 text-black bg-white border border-gray-300"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                onFocus={() => setShowSuggestions(suggestions.length > 0)}
              />
              {showSuggestions && (
                <ul className="absolute left-0 right-0 top-full bg-white border mt-1 rounded-lg shadow-lg z-10">
                  {suggestions.map((item, idx) => (
                    <li
                      key={idx}
                      className="px-3 py-2 hover:bg-red-100 cursor-pointer flex items-center gap-2"
                      onMouseDown={() => handleSuggestionClick(item.path)}
                    >
                      <span className="text-red-400">{item.icon}</span>
                      <span className="text-black">{item.label}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {/* Menu Items */}
            <ul className="w-full flex flex-col items-center gap-6">
              {MENU_ITEMS.map((item, idx) => (
                <li key={idx}>
                  <Link to={item.path}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </>
  );
}