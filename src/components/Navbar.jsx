import { useState, useEffect } from "react";
import { FaBars, FaTimes, FaHome, FaBriefcase, FaTools, FaEnvelope, FaBlog, FaUsers, FaInfoCircle, FaMicrophone, FaUserTie } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setShowNavbar(true);
      } else {
        setShowNavbar(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Desktop Sidebar */}
<nav
  className={`hidden md:flex fixed top-0 left-0 h-full text-white flex-col items-center justify-start transition-all duration-500 z-50
    ${isHovered ? "w-48 backdrop-blur-md bg-[rgba(255,255,255,0.1)] border-r border-[rgba(255,255,255,0.2)] shadow-[0_0_20px_rgba(255,255,255,0.15)]" : "w-20 bg-transparent border-none shadow-none"}
    ${showNavbar ? "opacity-100" : "opacity-0 pointer-events-none"}`}
  onMouseEnter={() => setIsHovered(true)}
  onMouseLeave={() => setIsHovered(false)}
>
  <ul className="flex flex-col gap-6 mt-8 w-full items-center">
    {/* Logo */}
    <li className="mb-2">
      <Link to="/">
        <img
          src="/assets/logo.webp"
          alt="Logo"
          className={`transition-all duration-500 ${isHovered ? "w-24" : "w-10"}`}
        />
      </Link>
    </li>

    {/* Menu Items */}
    {[
      { icon: <FaHome />, label: "Home", path: "/" },
      { icon: <FaBriefcase />, label: "Services", path: "/services" },
      { icon: <FaTools />, label: "Business Tool", path: "/tool" },
      { icon: <FaBlog />, label: "Blogs", path: "/blog" },
      // { icon: <FaUsers />, label: "Our Team", path: "/our-team" },
      { icon: <FaUserTie />, label: "Careers", path: "/careers" },
      { icon: <FaInfoCircle />, label: "About", path: "/about" },
      { icon: <FaEnvelope />, label: "Contact", path: "/contact" },
      { icon: <FaMicrophone />, label: "Let's Talk", path: "/voice" },
    ].map((item, idx) => (
      <li
        key={idx}
        className={`flex items-center gap-4 w-full justify-start px-4 transition-all duration-300`}
      >
        {/* Circular Icon */}
        <div onClick={()=>navigate(item.path)}
          className={`flex items-center justify-center text-xl w-8 h-8 rounded-full bg-[rgba(255,255,255,0.15)] backdrop-blur-sm border border-[rgba(255,255,255,0.3)] shadow-[0_0_10px_rgba(255,255,255,0.2)] transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,0,0,0.6)] hover:bg-[rgba(255,0,0,0.3)]`}
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


      {/* Mobile Navbar */}
      <nav
        className={`md:hidden fixed top-0 left-0 w-full bg-[rgba(0,0,0,0.4)] text-white px-6 py-4 flex items-center justify-between transition-opacity duration-500 z-50 ${
          showNavbar ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <img
          src="/assets/logo.webp"
          alt="SocialBureau"
          className="h-8"
          onClick={() => navigate("/")}
        />

        {/* Hamburger */}
        <div>
          <button name="menu" onClick={toggleMenu}>
            {menuOpen ? <FaTimes size={28} /> : <FaBars size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <ul className="absolute top-16 left-0 w-full bg-black text-white flex flex-col items-center gap-6 py-6 md:hidden z-50 shadow-lg">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/tool">Business Tool</Link></li>
            <li><Link to="/blog">Blogs</Link></li>
            {/* <li><Link to="/our-team">Our Team</Link></li> */}
            <li><Link to="/careers">Careers</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/voice">Let's Talk</Link></li>
          </ul>
        )}
      </nav>
    </>
  );
}
