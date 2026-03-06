import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X, ChevronRight, Trophy, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Logout from "./Logout";

const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isPartnership, setIsPartnership] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const rawData =
        localStorage.getItem("userData") || localStorage.getItem("user");
      const userData = rawData ? JSON.parse(rawData) : null;
      setIsLoggedIn(!!userData);
      setIsAdmin(userData?.role?.toLowerCase() === "admin");
      setIsPartnership(userData?.role?.toLowerCase() === "partnership");
    };

    checkAuth();
    window.addEventListener("storage", checkAuth);
    window.addEventListener("authChange", checkAuth);

    return () => {
      window.removeEventListener("storage", checkAuth);
      window.removeEventListener("authChange", checkAuth);
    };
  }, []);

  return { isLoggedIn, isAdmin, isPartnership };
};

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [expandedMobileCategory, setExpandedMobileCategory] = useState(null);
  const navigate = useNavigate();
  const { isLoggedIn, isAdmin, isPartnership } = useAuth();

  const navItems = [
    { label: "Home", href: "/" },
    {
      label: "Services",
      href: "#",
      columns: [
        {
          title: "API Marketing",
          items: [
            { label: "API Marketing", href: "/api-marketing-agency-in-kochi" },
            { label: "Performance Marketing", href: "/performance-marketing-agency-in-kochi" },
            { label: "Niche Marketing", href: "/niche-marketing-agency-in-kochi" },
            { label: "Content Marketing", href: "/content-marketing-agency-in-kochi" },
            { label: "AdTech Marketing", href: "/adTech-marketing-agency-in-kochi" },
          ],
        },
        {
          title: "Design & Tech",
          items: [{ label: "Web Development", href: "/web-development-agency-in-kochi" }],
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
            { label: "Work", href: "#" },
          ],
        },
        {
          title: "Community",
          items: [
            { label: "Blog", href: "/blog" },
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
            {
              label: "Content Copywriter",
              href: "/careers/content-copywriter",
            },
            {
              label: "Client Success Manager",
              href: "/careers/client-success-manager",
            },
            {
              label: "Business Development",
              href: "/careers/business-development-manager",
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
      label: "Performance Marketing",
      href: "/performance-marketing-agency-in-kochi",
      columns: [
        {
          title: "Marketing",
          items: [
            {
              label: "Content Marketing Blog",
              href: "https://socialbureau.in/blogs/why-content-marketing-is-essential-for-seo-success-in-2026",
            },
            { label: "Niche Brands and Build", href: "https://socialbureau.in/blogs/niche-brands-and-build" },
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
          title: "More Channels",
          items: [
            { label: "Conversion & Sales Campaigns", href: "#" },
            { label: "Retargeting & Remarketing", href: "#" },
            { label: "Affiliate Marketing", href: "#" },
            { label: "Landing Page & Funnel Optimization", href: "#" },
            { label: "Conversion Rate Optimization (CRO)", href: "#" },
            { label: "Marketing Automation", href: "#" },
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
            { label: "Ranjit", href: "/partnership/Ranjit" },
            { label: 'Sivaprasad', href: '/partnership/Sivaprasad' },
          ],
        },
      ],
    },
    { label: "Entertainment", href: "/our-team" },
    { label: "Team", href: "/our-team" },
    { label: "Support", href: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      <nav
        onMouseLeave={() => setActiveDropdown(null)}
        className="fixed top-0 left-0 right-0 z-100 bg-[#161617]/80 backdrop-blur-xl transition-colors duration-500"
      >
        {/* Top Bar */}
        <div className="w-full px-4 flex items-center h-12">
          {/* Desktop Nav - centered with logo */}
          <div className="hidden md:flex items-center justify-center flex-1 min-w-0">
            <a
              style={{ fontFamily: "MyFont, sans-serif" }}
              href="https://socialbureau.in"
              className="text-white text-[17px] font-bold tracking-tight shrink-0 mr-10"
            >
              Social<span className="text-[#ff0000]">B</span>ureau
            </a>
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative shrink-0"
                onMouseEnter={() =>
                  item.columns && setActiveDropdown(item.label)
                }
              >
                <button
                  onClick={() => handleNavClick(item.href || "#")}
                  className="text-[11px] font-normal text-[#f5f5f7]/80 hover:text-white transition-colors px-2 py-1 antialiased tracking-normal whitespace-nowrap cursor-pointer"
                >
                  {item.label}
                </button>
              </div>
            ))}
          </div>

          {/* Far-right desktop actions - dropdown menu or simple login */}
          <div className="hidden md:flex items-center shrink-0 pl-3 relative">
            {isLoggedIn ? (
              <div className="relative">
                <button
                  onMouseEnter={() => setActiveDropdown("userMenu")}
                  className="flex items-center gap-1.5 text-[11px] font-semibold transition-all px-3 py-1.5 rounded-full whitespace-nowrap shrink-0 cursor-pointer text-white hover:bg-white/10"
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
                        {(isAdmin || isPartnership) && (
                          <>
                            <button
                              onClick={() => {
                                handleNavClick("/dashboard");
                                setActiveDropdown(null);
                              }}
                              className="text-[13px] font-medium text-[#f5f5f7]/80 hover:text-white hover:bg-white/10 px-4 py-3 text-left transition-colors flex items-center gap-2"
                            >
                              <User size={14} />
                              Dashboard
                            </button>
                            <div className="h-px bg-white/10" />
                          </>
                        )}

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
                className="flex items-center gap-1.5 text-[11px] font-semibold transition-all px-3 py-1.5 rounded-full whitespace-nowrap shrink-0 cursor-pointer text-white hover:bg-white/10"
              >
                <User size={13} />
                <span>Login</span>
              </button>
            )}
          </div>

          {/* Mobile Logo */}
          <a
            style={{ fontFamily: "MyFont, sans-serif" }}
            href="https://socialbureau.in"
            className="md:hidden text-white text-[17px] font-bold tracking-tight shrink-0"
          >
            Social<span className="text-[#ff0000]">B</span>ureau
          </a>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-white p-2 ml-auto"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mega Dropdown */}
        <AnimatePresence>
          {activeDropdown && activeDropdown !== "userMenu" && (
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
                            className="text-[17px] text-[#f5f5f7] hover:text-[#e20000] text-left transition-colors leading-tight"
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
                    {(isAdmin || isPartnership) && (
                      <button
                        onClick={() => handleNavClick("/dashboard")}
                        className="flex items-center gap-2 text-[22px] font-semibold text-[#f5f5f7] active:text-[#ff0000] text-left transition-colors"
                      >
                        <User size={20} />
                        Dashboard
                      </button>
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
