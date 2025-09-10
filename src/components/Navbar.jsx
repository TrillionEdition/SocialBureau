import { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { ChevronDown } from "lucide-react"; // nice dropdown icon

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(false);
  const [open, setOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

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
  const navigate = useNavigate();
  return (
    <nav
      className={`fixed top-0 left-0 w-full bg-[rgba(0,0,0,0.4)] text-white px-6 py-4 flex items-center justify-between transition-opacity duration-500 z-50 ${
        showNavbar ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <img
        src="/assets/logo.webp"
        alt="SocialBureau"
        className="h-8"
        onClick={() => navigate("/")}
      />

      {/* Desktop Menu */}
      <ul className="hidden md:flex gap-8 bg-[rgba(0,0,0,0.8)] rounded-full px-16 py-3 items-center">
      {/* Important items outside */}
      <li className="p-1 hover:font-bold hover:text-[#ff0000]">
        <Link to="/">Home</Link>
      </li>
      <li className="hover:text-[#ff0000] p-1 hover:font-bold">
        <Link to="/services">Services</Link>
      </li>
      <li className="hover:text-[#ff0000] p-1 hover:font-bold">
        <Link to="/tool">Business Analyser Tool</Link>
      </li>
      <li className="hover:text-[#ff0000] p-1 hover:font-bold">
        <Link to="/contact">Contact</Link>
      </li>

      {/* Dropdown for the rest */}
      <li className="relative group">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-1 hover:text-[#ff0000] p-1 hover:font-bold"
        >
          More <ChevronDown size={16} />
        </button>
        <ul
          className={`absolute min-w-50 top-full mt-2 right-0 bg-[rgba(0,0,0,0.8)] rounded-lg shadow-lg transition-all duration-200 overflow-hidden ${
            open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <li className="px-4 py-2 hover:bg-[#ff0000] hover:text-white">
            <Link to="/blog">Blogs</Link>
          </li>
          <li className="px-4 py-2 hover:bg-[#ff0000] hover:text-white">
            <Link to="/careers">Careers</Link>
          </li>
          <li className="px-4 py-2 hover:bg-[#ff0000] hover:text-white">
            <Link to="/our-team">Our Team</Link>
          </li>
          <li className="px-4 py-2 hover:bg-[#ff0000] hover:text-white">
            <Link to="/about">About</Link>
          </li>
        </ul>
      </li>
    </ul>

      <li className="hidden md:block hover:font-bold bg-[#ff0000] p-2 px-4 rounded-lg list-none">
        <Link to="/voice">Let's Talk</Link>
      </li>

      {/* Hamburger */}
      <div className="md:hidden">
        <button onClick={toggleMenu}>
          {menuOpen ? <FaTimes size={28} /> : <FaBars size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <ul className="absolute top-16 left-0 w-full bg-black text-white flex flex-col items-center gap-6 py-6 md:hidden z-50 shadow-lg">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/careers">Careers</Link>
          </li>          
          <li>
            <Link to="/services">Services</Link>
          </li>
          <li>
            <Link to="/tool">Business Analyser Tool</Link>
          </li>
          <li>
            <Link to="/blog">Blogs</Link>
          </li>
          <li>
            <Link to="/our-team">Our Team</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <Link to="/voice">Let's Talk</Link>
          </li>
        </ul>
      )}
    </nav>
  );
}