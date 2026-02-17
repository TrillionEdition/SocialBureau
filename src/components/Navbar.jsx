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
            { label: "Web Development", href: "#" },
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




