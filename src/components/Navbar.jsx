import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, X, ChevronRight, Trophy, User, FileText, BarChart3 } from "lucide-react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import Logout from "./Logout";
import { BASE_URL } from "@/utils/urls";

const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isPartnership, setIsPartnership] = useState(false);
  const [isEmployee, setIsEmployee] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const rawData =
        localStorage.getItem("userData") || localStorage.getItem("user");
      const userData = rawData ? JSON.parse(rawData) : null;
      setIsLoggedIn(!!userData);
      setIsAdmin(userData?.role?.toLowerCase() === "admin");
      setIsPartnership(userData?.role?.toLowerCase() === "partnership" || userData?.role?.toLowerCase() === "partner");
      setIsEmployee(userData?.isEmployee === true || (!!userData && userData.role?.toLowerCase() !== "partnership" && userData.role?.toLowerCase() !== "partner"));
    };

    checkAuth();
    window.addEventListener("storage", checkAuth);
    window.addEventListener("authChange", checkAuth);

    return () => {
      window.removeEventListener("storage", checkAuth);
      window.removeEventListener("authChange", checkAuth);
    };
  }, []);

  return { isLoggedIn, isAdmin, isPartnership, isEmployee };
};

// Color scheme for category cards
const categoryColors = {
  "API Marketing": "from-red-500 to-red-600",
  "Design & Tech": "from-cyan-500 to-cyan-600",
  "About": "from-lime-400 to-lime-500",
  "Community": "from-white to-gray-200",
  "Open Positions": "from-yellow-400 to-yellow-500",
  "Explore": "from-orange-400 to-orange-500",
  "Marketing": "from-purple-500 to-purple-600",
  "More Channels": "from-blue-500 to-blue-600",
  "Partnership": "from-indigo-500 to-indigo-600",
};

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [isScrolled, setIsScrolled] = useState(false);
  const [isGoldTheme, setIsGoldTheme] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [expandedMobileCategory, setExpandedMobileCategory] = useState(null);
   const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn, isAdmin, isPartnership, isEmployee } = useAuth();
  
  const isTeamPage = location.pathname.startsWith('/team');

  const [homeLink, setHomeLink] = useState("/");

  useEffect(() => {
    const checkLotteryRedirect = async () => {
      try {
        const response = await fetch(`${BASE_URL}/lottery/settings`);
        const data = await response.json();
        if (data && data.isActive && data.showLotteryOnHomeStart && data.showLotteryOnHomeEnd) {
          const now = new Date();
          const start = new Date(data.showLotteryOnHomeStart);
          const end = new Date(data.showLotteryOnHomeEnd);
          if (now >= start && now <= end) {
            setHomeLink("/home");
          }
        }
      } catch (err) {
        console.error("Failed to fetch lottery settings for Navbar:", err);
      }
    };
    checkLotteryRedirect();
  }, []);

  const navItems = [
    { label: "Home", href: homeLink },
    {
  label: "Solutions",
  href: "/solutions",
  columns: [
    {
      title: "PDF TOOLKIT",
      items: [
        { label: "Merge PDF", href: "/solutions?category=pdf&tool=merge" },
        { label: "Split PDF", href: "/solutions?category=pdf&tool=split" },
        { label: "Compress PDF", href: "/solutions?category=pdf&tool=compress" },
        { label: "PDF to Images", href: "/solutions?category=pdf&tool=to-images" },
        { label: "Images to PDF", href: "/solutions?category=pdf&tool=from-images" },
        { label: "PDF to Word", href: "/solutions?category=pdf&tool=to-word" },
        { label: "Word to PDF", href: "/solutions?category=pdf&tool=from-word" },
        { label: "PDF to Text", href: "/solutions?category=pdf&tool=to-text" },
      ],
    },
    {
      title: "IMAGE TOOLKIT",
      items: [
        { label: "Resize Image", href: "/solutions?category=image&tool=resize" },
        { label: "Compress Image", href: "/solutions?category=image&tool=compress" },
        { label: "Convert Image Format", href: "/solutions?category=image&tool=convert" },
        { label: "Rotate Image", href: "/solutions?category=image&tool=rotate" },
        { label: "Grayscale Image", href: "/solutions?category=image&tool=grayscale" },
      ],
    },
    {
      title: "AI STUDIO",
      items: [
        {
          label: "AI Industrial Image",
          href: "/solutions?category=ai&tool=image",
        },
        {
          label: "AI Prompt Engineer",
          href: "/solutions?category=ai&tool=prompt",
        },
      ],
    },
  ],
},
    {
      label: "Services",
      href: "#",
      columns: [
        {
          title: "MARKETING SERVICES",
          items: [
            { label: "API Marketing", href: "/api-marketing-agency-in-kochi" },
            {
              label: "Performance Marketing",
              href: "/performance-marketing-agency-in-kochi",
            },
            {
              label: "Niche Marketing",
              href: "/niche-marketing-agency-in-kochi",
            },
            {
              label: "Content Marketing",
              href: "/content-marketing-agency-in-kochi",
            },
            {
              label: "AdTech Marketing",
              href: "/adTech-marketing-agency-in-kochi",
            },
          ],
        },
        {
          title: "Design & Tech",
          items: [
            {
              label: "Web Development",
              href: "/web-development-agency-in-kochi",
            },
          ],
        },
        {
          title: "Performance Marketing",
          items: [
            {
              label: "Content Marketing Blog",
              href: "https://socialbureau.in/blogs/why-content-marketing-is-essential-for-seo-success-in-2026",
            },
            {
              label: "Niche Brands and Build",
              href: "https://socialbureau.in/blogs/niche-brands-and-build",
            },
            {
              label: "Dark Social in Digital",
              href: "https://socialbureau.in/blogs/the-hidden-power-of-dark-social-in-digital",
            },
            {
              label: "Niche Marketing for Startups",
              href: "https://socialbureau.in/blogs/niche-marketing-for-startups",
            },
            {
              label: "Digital Marketing Belongs to Bold Ideas",
              href: "https://socialbureau.in/blogs/digital-marketing-belongs-to-bold-ideas",
            },
            {
              label: "Where ROI Meets Creative Flow",
              href: "https://socialbureau.in/blogs/where-roi-meets-creative-flow",
            },
          ],
        },
        {
          title: "More Services",
          items: [
            {
              label: "Conversion & Sales Campaigns",
              href: "/blogs/conversion-sales-campaigns",
            },
            {
              label: "Retargeting & Remarketing",
              href: "/blogs/retargeting-remarketing-the-complete-guide-to-recover-los",
            },
            {
              label: "Affiliate Marketing",
              href: "/blogs/affiliate-marketing-the-ultimate-guide-to-building-passive-",
            },
            {
              label: "Landing Page & Funnel Optimization",
              href: "/blogs/landing-page-funnel-optimization-the-ultimate-guide-to-in",
            },
            {
              label: "Conversion Rate Optimization (CRO)",
              href: "/blogs/conversion-rate-optimization-cro-the-complete-guide-to-in",
            },
            {
              label: "Marketing Automation",
              href: "/blogs/marketing-automation",
            },
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
            { label: "Our Team", href: "/team" },
          ],
        },
        {
          title: "Community",
          items: [
            { label: "Blog", href: "/blog" },
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
            {
              label: "Content Copywriter",
              href: "/careers/content-copywriter",
            },
            {
              label: "Front Desk Manager",
              href: "/careers/front-desk-manager",
            },
            {
              label: "Digital Marketing Expert",
              href: "/careers/digital-marketing-expert",
            },
            { label: "Video Editor", href: "/careers/video-editor" },
            { label: "Web Developer", href: "#" },
          ],
        },
        {
          title: "",
          items: [
            {
              label: "Client Success Manager",
              href: "/careers/client-success-manager",
            },
            {
              label: "Business Development",
              href: "/careers/business-development-manager",
            },
            {
              label: "Office Operations",
              href: "/careers/office-operations-manager",
            },
          ],
        },
        {
          title: "Explore",
          items: [{ label: "All Careers", href: "/careers" }],
        },
      ],
    },
    {
      label: "Partnership",
      href: "/partners",
    },

    { label: "Team", href: "/team" },
    { label: "Enquiry", href: "/enquiry-form" },
    { label: "Work Architect", href: "/work-architect", live: true },
    { label: "Support", href: "/contact" },
    { label: "FIFA 2026", href: "/fifa-world-cup", live: true },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Determine if scrolled enough to change state
      setIsScrolled(currentScrollY > 10);
      
      // Check if gold theme should be active (scrolled less than viewport height on Homepage)
      const isHome = location.pathname === "/" || location.pathname === "/home";
      const threshold = window.innerHeight - 80;
      setIsGoldTheme(isHome && currentScrollY < threshold);
      
      // Show/Hide logic
      if (currentScrollY <= 10) {
        setVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down and past threshold - hide unless dropdown is open
        if (!activeDropdown && !mobileMenuOpen) {
          setVisible(false);
        }
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up - show
        setVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    // Initialize state on mount/location change
    const isHome = location.pathname === "/" || location.pathname === "/home";
    const threshold = window.innerHeight - 80;
    setIsGoldTheme(isHome && window.scrollY < threshold);

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, activeDropdown, mobileMenuOpen, location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

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
      <motion.nav
        onMouseLeave={() => setActiveDropdown(null)}
        initial={{ y: 0 }}
        animate={{ y: visible ? 0 : -60 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`fixed top-0 left-0 right-0 z-[1000] backdrop-blur-xl transition-all duration-500 ${
          isGoldTheme 
            ? "bg-[#050608]/55 shadow-[0_4px_30px_rgba(0,0,0,0.75)]" 
            : "bg-[#161617]/80 border-b border-white/5"
        }`}
      >
        {/* Moving golden border at the bottom (thin) */}
        <AnimatePresence>
          {isGoldTheme && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: 1,
                backgroundPosition: ["0% 50%", "200% 50%"]
              }}
              exit={{ opacity: 0 }}
              transition={{
                opacity: { duration: 0.35 },
                backgroundPosition: {
                  duration: 5,
                  repeat: Infinity,
                  ease: "linear"
                }
              }}
              className="absolute bottom-0 left-0 right-0 h-[1.2px] z-20 pointer-events-none"
              style={{
                backgroundImage: "linear-gradient(90deg, #b77b27, #f5e8c1, #ffd700, #b77b27)",
                backgroundSize: "200% auto"
              }}
            />
          )}
        </AnimatePresence>
        {/* Top Bar */}
        <div className="w-full px-4 flex items-center h-12">
          {/* Desktop Nav - centered with logo */}
          <div className="hidden md:flex items-center justify-center flex-1 min-w-0">
            <a
              style={{ fontFamily: "MyFont, sans-serif" }}
              href={homeLink}
              className="text-white text-[17px] font-bold tracking-tight shrink-0 mr-10"
            >
              <img src="/assets/logo.webp" className="h-7 w-40" />
            </a>
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative shrink-0"
                onMouseEnter={() =>
                  item.columns && setActiveDropdown(item.label)
                }
              >
                <motion.button
                  onClick={() => handleNavClick(item.href || "#")}
                  className="relative h-6 overflow-hidden text-[11px] font-normal px-2 py-1 antialiased tracking-normal whitespace-nowrap cursor-pointer"
                  whileHover="hover"
                  initial="rest"
                >
                  <motion.span
                    className={`block flex items-center gap-1.5 ${
                      isTeamPage && item.label === 'Team' 
                        ? 'text-brand-pink font-bold' 
                        : isGoldTheme 
                        ? 'text-[#ecd292]/90 font-medium tracking-wide' 
                        : 'text-white/90'
                    }`}
                    variants={{ rest: { y: 0 }, hover: { y: -24 } }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    {item.label}
                    {item.live && (
                      <span className="relative flex h-1.5 w-1.5 -mt-1.5">
                        <span className="absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" style={{ animation: "ping 1s cubic-bezier(0,0,0.2,1) infinite" }} />
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500" />
                      </span>
                    )}
                  </motion.span>

                  {/* Hover Text - appears from bottom */}
                  <motion.span
                    className={`block absolute top-6 ${
                      isGoldTheme 
                        ? 'text-[#ffd700] drop-shadow-[0_0_6px_rgba(255,215,0,0.65)] font-bold tracking-wide' 
                        : 'text-white'
                    }`}
                    variants={{
                      rest: { y: 0 },
                      hover: { y: -24 },
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    {item.label}
                  </motion.span>
                </motion.button>
              </div>
            ))}
          </div>

          {/* Far-right desktop actions - dropdown menu or simple login */}
           <div className="hidden md:flex items-center shrink-0 pl-3 relative">
            {isTeamPage ? (
              <button
                onClick={() => handleNavClick("/contact")}
                className="bg-brand-pink text-white px-5 py-2 rounded-full text-[11px] font-black tracking-widest hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(255,51,88,0.3)] cursor-pointer"
              >
                WORK WITH US
              </button>
            ) : isLoggedIn ? (
              <div className="relative">
                <button
                  onMouseEnter={() => setActiveDropdown("userMenu")}
                  className={`flex items-center gap-1.5 text-[11px] font-semibold transition-all px-3 py-1.5 rounded-full whitespace-nowrap shrink-0 cursor-pointer ${
                    isGoldTheme 
                      ? 'text-[#ecd292] hover:text-[#ffd700] hover:bg-white/5' 
                      : 'text-white hover:bg-white/10'
                  }`}
                >
                  <User size={13} />
                  <span>Profile</span>
                </button>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {activeDropdown === "userMenu" && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 top-full mt-2 bg-[#262627]/95 backdrop-blur-xl border border-white/10 rounded-lg overflow-hidden min-w-[180px] z-50"
                      onMouseEnter={() => setActiveDropdown("userMenu")}
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      <div className="flex flex-col">
                        {isEmployee && (
                          <button
                            onClick={() => {
                              handleNavClick("/team/dashboard");
                              setActiveDropdown(null);
                            }}
                            className="text-[13px] font-medium text-brand-pink hover:text-white hover:bg-brand-pink px-4 py-3 text-left transition-colors flex items-center gap-2"
                          >
                            <BarChart3 size={14} />
                            Team Dashboard
                          </button>
                        )}
                        <button
                          onClick={() => {
                            handleNavClick("/blog/dashboard");
                            setActiveDropdown(null);
                          }}
                          className="text-[13px] font-medium text-red-500 hover:text-white hover:bg-red-600 px-4 py-3 text-left transition-colors flex items-center gap-2"
                        >
                          <BarChart3 size={14} />
                          Manage Blogs
                        </button>
                        {isAdmin && (
                          <button
                            onClick={() => {
                              handleNavClick("/admin/applications");
                              setActiveDropdown(null);
                            }}
                            className="text-[13px] font-medium text-red-500 hover:text-white hover:bg-red-600 px-4 py-3 text-left transition-colors flex items-center gap-2"
                          >
                            <BarChart3 size={14} />
                            Manage Applications
                          </button>
                        )}
                        <div className="h-px bg-white/10" />
                        <button
                          onClick={() => {
                            handleNavClick("/blog/submit");
                            setActiveDropdown(null);
                          }}
                          className="text-[13px] font-medium text-[#f5f5f7]/80 hover:text-white hover:bg-white/10 px-4 py-3 text-left transition-colors flex items-center gap-2"
                        >
                          <FileText size={14} />
                          Write a Blog
                        </button>


                        <button
                          onClick={() => {
                            handleNavClick("/leaderboard");
                            setActiveDropdown(null);
                          }}
                          className="text-[13px] font-medium text-[#f5f5f7]/80 hover:text-white hover:bg-white/10 px-4 py-3 text-left transition-colors flex items-center gap-2"
                        >
                          <Trophy size={14} />
                          Leaderboard
                        </button>
                        <div className="h-px bg-white/10" />

                        <button
                          onClick={() => {
                            handleNavClick("/profile");
                            setActiveDropdown(null);
                          }}
                          className="text-[13px] font-medium text-[#f5f5f7]/80 hover:text-white hover:bg-white/10 px-4 py-3 text-left transition-colors flex items-center gap-2"
                        >
                          <User size={14} />
                          Profile
                        </button>

                        <div className="h-px bg-white/10" />
                        <div className="px-4 py-3">
                          <Logout />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <button
                onClick={() => handleNavClick("/login")}
                className={`flex items-center gap-1.5 text-[11px] font-semibold transition-all px-3 py-1.5 rounded-full whitespace-nowrap shrink-0 cursor-pointer ${
                  isGoldTheme 
                    ? 'text-[#ecd292] hover:text-[#ffd700] hover:bg-white/5' 
                    : 'text-white hover:bg-white/10'
                }`}
              >
                <User size={13} />
                <span>Login</span>
              </button>
            )}
          </div>

          {/* Mobile Logo */}
          <a
            style={{ fontFamily: "MyFont, sans-serif" }}
            href={homeLink}
            className="md:hidden text-white text-[17px] font-bold tracking-tight shrink-0"
          >
            <img src="/assets/logo.webp" className="h-7 w-40" />
          </a>

          {/* Mobile Toggle */}
          <button
            className={`md:hidden p-2 ml-auto transition-colors duration-300 ${
              isGoldTheme ? 'text-[#ffd700]' : 'text-white'
            }`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mega Dropdown - New Card Design */}
        <AnimatePresence>
          {activeDropdown && activeDropdown !== "userMenu" && (
            <motion.div
              key="dropdown"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="hidden md:block border-t border-white/10 bg-[#0a0a0a]/95 backdrop-blur-xl"
            >
              <div className="max-w-7xl mx-auto px-8 py-16">
                {/* Section Title */}
                <div className="mb-12">
                  <h3 className="text-xl font-bold text-white tracking-widest uppercase">
                    {activeDropdown === "Services"
                      ? "API MARKETING"
                      : activeDropdown === "Company"
                        ? "COMPANY"
                        : activeDropdown === "Careers"
                          ? "CAREERS"
                          : activeDropdown === "Partnership"
                            ? "PARTNERSHIP"
                            : activeDropdown}
                  </h3>
                </div>

                {/* Cards Grid - 5 columns */}
                <div className="grid grid-cols-5 gap-8">
                  {navItems
                    .find((i) => i.label === activeDropdown)
                    ?.columns?.map((col, idx) => {
                      const colorClass = categoryColors[col.title] || "from-gray-500 to-gray-600";
                      return (
                        <div key={idx} className="flex flex-col">
                          {/* Colored Bar - 3px thick */}
                          <div
                            className={`w-12 h-1 bg-gradient-to-r ${colorClass} mb-6`}
                          />

                          {/* Column Header */}
                          <h4 className="text-white font-bold text-[16px] tracking-widest uppercase mb-6 text-[#f5f5f7]">
                            {col.title}
                          </h4>

                          {/* Items List */}
                          <div className="flex flex-col gap-4">
                            {col.items.map((subitem) => (
                              <button
                                key={subitem.label}
                                onClick={() => handleNavClick(subitem.href)}
                                className="relative text-left group/item"
                              >
                                <motion.div
                                  className="relative inline-block"
                                  whileHover="hover"
                                  initial="rest"
                                >
                                  {/* Text */}
                                  <motion.span
                                    className="block text-[16px] text-[#f5f5f7]/80 font-normal group-hover/item:text-white transition-colors"
                                    variants={{
                                      rest: { color: "rgba(255, 255, 255, 0.82)" },
                                      hover: { color: "rgba(255, 178, 211, 1)" },
                                    }}
                                    transition={{ duration: 0.2 }}
                                  >
                                    {subitem.label}
                                  </motion.span>

                                  {/* Underline - animates from left to right */}
                                  <motion.div
                                    className="absolute bottom-0 left-0 h-0.5 bg-white"
                                    variants={{
                                      rest: { width: "0%", opacity: 0 },
                                      hover: { width: "100%", opacity: 1 },
                                    }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                  />
                                </motion.div>
                              </button>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-50 bg-[#000000ea] flex flex-col pt-16 px-6 pb-8 overflow-y-auto md:hidden"
          >
            <button
              className="absolute top-4 right-4 text-white p-2"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <X size={22} />
            </button>
            <div className="flex flex-col gap-2 mt-4">
              {navItems.map((item) => (
                <div key={item.label}>
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => {
                        if (item.columns) {
                          setExpandedMobileCategory(
                            expandedMobileCategory === item.label
                              ? null
                              : item.label,
                          );
                        } else {
                          handleNavClick(item.href);
                        }
                      }}
                      className="w-full flex items-center justify-between text-[28px] font-semibold text-[#f5f5f7] active:text-[#0066cc] text-left transition-colors duration-200"
                    >
                      {item.label}
                    </button>
                    {item.columns && (
                      <ChevronRight
                        size={20}
                        className={`text-white/40 transition-transform duration-200 ${expandedMobileCategory === item.label
                          ? "rotate-90"
                          : ""
                          }`}
                      />
                    )}
                  </div>

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

              {/* Mobile bottom actions */}
              <div className="mt-6 pt-6 border-t border-white/10 flex flex-col gap-3">
                {isLoggedIn && (
                  <>
                    {isEmployee && (
                      <button
                        onClick={() => handleNavClick("/team/dashboard")}
                        className="flex items-center gap-2 text-[22px] font-semibold text-brand-pink active:text-white text-left transition-colors"
                      >
                        <BarChart3 size={20} />
                        Team Dashboard
                      </button>
                    )}
                    {(isAdmin || isPartnership) && (
                      <>
                        <button
                          onClick={() => handleNavClick("/blog/submit")}
                          className="flex items-center gap-2 text-[22px] font-semibold text-[#f5f5f7] active:text-[#ff0000] text-left transition-colors"
                        >
                          <FileText size={20} />
                          Write a Blog
                        </button>

                      </>
                    )}
                    <button
                      onClick={() => handleNavClick("/leaderboard")}
                      className="flex items-center gap-2 text-[22px] font-semibold text-[#f5f5f7] active:text-[#ff0000] text-left transition-colors"
                    >
                      <Trophy size={20} />
                      Leaderboard
                    </button>
                    <Logout />
                  </>
                )}
                <button
                  onClick={() =>
                    handleNavClick(isLoggedIn ? "/profile" : "/login")
                  }
                  className="flex items-center gap-2 text-[22px] font-semibold text-[#ff0000] text-left transition-colors"
                >
                  <User size={20} />
                  {isLoggedIn ? "Profile" : "Login"}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer */}
      <div className="h-12" />
    </>
  );
}
