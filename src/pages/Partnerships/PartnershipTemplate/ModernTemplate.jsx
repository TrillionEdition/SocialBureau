import React, { useRef } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import { Linkedin, Twitter, Instagram, Github, Globe, ExternalLink, Quote, ArrowUpRight, ArrowUp, Sparkles, ChevronDown, Edit3, X, Save, Palette, Type, Maximize2 } from "lucide-react";

/**
 * Magnetic effect for buttons/icons
 */
const MagneticButton = ({ children, className = "" }) => {
  const ref = useRef(null);
  const [position, setPosition] = React.useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const { x, y } = position;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: x * 0.35, y: y * 0.35 }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const AnimatedText = ({ text, className = "", style = {} }) => {
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.02, delayChildren: 0.03 * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", damping: 15, stiffness: 120 },
    },
    hidden: {
      opacity: 0,
      y: 30,
      transition: { type: "spring", damping: 15, stiffness: 120 },
    },
  };

  return (
    <motion.span
      style={{ display: "inline-block", overflow: "hidden", padding: "0.2em 0", ...style }}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
      className={className}
    >
      {text.split(" ").map((word, index) => (
        <motion.span
          variants={child}
          style={{ display: "inline-block", marginRight: "0.25em", paddingBottom: "0.1em" }}
          key={index}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
};

const PremiumHeading = ({ children, className = "", style = {} }) => {
  return (
    <div className="overflow-hidden py-10 -my-8 px-4 -mx-4">
      <motion.div
        initial={{ y: "110%", skewY: 7, opacity: 0 }}
        whileInView={{ y: 0, skewY: 0, opacity: 1 }}
        viewport={{ once: true, margin: "-5%" }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
        className={className}
        style={style}
      >
        {children}
      </motion.div>
    </div>
  );
};


const BackToTop = () => {
  const [isVisible, setIsVisible] = React.useState(false);
  const { scrollYProgress } = useScroll();
  
  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0, y: 20 }}
          onClick={scrollToTop}
          className="fixed bottom-8 md:bottom-12 right-8 md:right-12 z-[200] group"
        >
          <MagneticButton>
            <div className="relative w-16 h-16 md:w-24 md:h-24 flex items-center justify-center">
              {/* Progress Circle */}
              <svg className="absolute inset-0 w-full h-full -rotate-90">
                <circle
                  cx="50%"
                  cy="50%"
                  r="40%"
                  className="stroke-white/10 fill-none"
                  strokeWidth="1"
                />
                <motion.circle
                  cx="50%"
                  cy="50%"
                  r="40%"
                  className="stroke-[var(--primary-color)] fill-none"
                  strokeWidth="2"
                  strokeDasharray="1"
                  style={{ pathLength: scrollYProgress }}
                />
              </svg>
              
              {/* Button Core */}
              <div className="w-12 h-12 md:w-16 md:h-16 bg-white/[0.03] backdrop-blur-2xl rounded-full border border-white/10 flex items-center justify-center group-hover:bg-[var(--primary-color)] transition-all duration-700 shadow-2xl">
                <ArrowUp className="w-5 h-5 md:w-6 md:h-6 text-white group-hover:scale-110 transition-transform duration-500" />
              </div>
              
              {/* Label */}
              <div className="absolute top-1/2 right-full mr-8 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none translate-x-4 group-hover:translate-x-0">
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 whitespace-nowrap">Top</span>
              </div>
            </div>
          </MagneticButton>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

const SocialIcon = ({ platform }) => {
  switch (platform?.toLowerCase()) {
    case "linkedin": return <Linkedin size={20} />;
    case "twitter": return <Twitter size={20} />;
    case "instagram": return <Instagram size={20} />;
    case "github": return <Github size={20} />;
    default: return <Globe size={20} />;
  }
};

export const ModernTemplate = ({ data, isEditing, onUpdate }) => {
  const { name, subtitle, bio, services = [], projects = [], testimonials = [], socialLinks = [], image, styles = {} } = data;
  const [isPortrait, setIsPortrait] = React.useState(false);

  // Default styles
  const defaultStyles = {
    primaryColor: "#E8001A",
    backgroundColor: "#0A0A0A",
    fontFamily: "sans-serif",
    headingFontSize: "100%",
    bodyFontSize: "100%",
    headingColor: "#FFFFFF",
    paragraphColor: "#FFFFFF",
  };

  const activeStyles = { ...defaultStyles, ...styles };

  const styleVariables = {
    "--primary-color": activeStyles.primaryColor,
    "--bg-color": activeStyles.backgroundColor,
    "--font-family": activeStyles.fontFamily,
    "--heading-size": activeStyles.headingFontSize || "1",
    "--body-size": activeStyles.bodyFontSize || "1",
    "--hero-name-size": activeStyles.heroNameFontSize || "1",
    "--hero-subtitle-size": activeStyles.heroSubtitleFontSize || "1",
    "--bio-size": activeStyles.bioFontSize || "1",
    "--section-title-size": activeStyles.sectionTitleFontSize || "1",
    "--service-title-size": activeStyles.serviceTitleFontSize || "1",
    "--service-body-size": activeStyles.serviceBodyFontSize || "1",
    "--project-title-size": activeStyles.projectTitleFontSize || "1",
    "--project-body-size": activeStyles.projectBodyFontSize || "1",
    "--testimonial-quote-size": activeStyles.testimonialQuoteFontSize || "1",
    "--testimonial-author-size": activeStyles.testimonialAuthorFontSize || "1",
    "--footer-title-size": activeStyles.footerTitleFontSize || "1",
    "--hero-font": activeStyles.heroFont || activeStyles.fontFamily,
    "--bio-font": activeStyles.bioFont || activeStyles.fontFamily,
    "--card-font": activeStyles.cardFont || activeStyles.fontFamily,
    "--testimonial-font": activeStyles.testimonialFont || activeStyles.fontFamily,
    "--footer-font": activeStyles.footerFont || activeStyles.fontFamily,
    "--module-font": activeStyles.moduleFont || activeStyles.fontFamily,
    "--hero-image-scale": activeStyles.heroImageScale || "1",
    "--project-image-scale": activeStyles.projectImageScale || "1",
    "--noise-opacity": activeStyles.noiseOpacity || "0",
    "--grid-opacity": activeStyles.gridOpacity || "0",
    "--grid-color": activeStyles.gridColor || "#FFFFFF",
    "--hero-text-y": (activeStyles.heroTextY || 0) + "px",
    "--hero-bg": activeStyles.heroBg || activeStyles.backgroundColor,
    "--bio-bg": activeStyles.bioBg || activeStyles.backgroundColor,
    "--projects-bg": activeStyles.projectsBg || activeStyles.backgroundColor,
    "--services-bg": activeStyles.servicesBg || activeStyles.backgroundColor,
    "--testimonials-bg": activeStyles.testimonialsBg || activeStyles.backgroundColor,
    "--footer-bg": activeStyles.footerBg || activeStyles.backgroundColor,
    "--heading-color": activeStyles.headingColor || "#FFFFFF",
    "--paragraph-color": activeStyles.paragraphColor || "#FFFFFF",
  };
  
  React.useEffect(() => {
    if (image) {
      const img = new Image();
      img.src = image;
      img.onload = () => {
        setIsPortrait(img.naturalHeight > img.naturalWidth);
      };
    }
  }, [image]);
  
  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(heroScroll, [0, 1], ["0%", "50%"]);
  const heroOpacity = useTransform(heroScroll, [0, 0.8], [1, 0]);
  const heroScale = useTransform(heroScroll, [0, 1], [1, 1.3]);
  const heroBlur = useTransform(heroScroll, [0, 0.5], ["0px", "10px"]);
  const nextSectionTranslateY = useTransform(heroScroll, [0, 1], ["0%", "-10%"]);

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;300;400;700;900&family=Outfit:wght@100;300;400;700;900&family=Space+Grotesk:wght@300;400;700&family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700;1,900&display=swap');
          
          .font-custom {
            font-family: var(--font-family) !important;
          }
          .hero-font { font-family: var(--hero-font) !important; }
          .bio-font { font-family: var(--bio-font) !important; }
          .card-font { font-family: var(--card-font) !important; }
          .testimonial-font { font-family: var(--testimonial-font) !important; }
          .footer-font { font-family: var(--footer-font) !important; }
          .module-font { font-family: var(--module-font) !important; }
          
          h1, h2, h3, h4, h5, h6 {
            color: var(--heading-color) !important;
          }
          p, span, li, a:not(.btn) {
            color: var(--paragraph-color);
          }
          .text-primary-color {
            color: var(--primary-color) !important;
          }
        `}
      </style>
      <div 
        className="text-white selection:bg-[var(--primary-color)] selection:text-white font-custom antialiased overflow-x-hidden scroll-smooth"
      style={{ 
        ...styleVariables, 
        backgroundColor: "var(--bg-color)",
        fontFamily: "var(--font-family)"
      }}
    >
      {/* Background Ambience Layers */}
      <div className="fixed inset-0 pointer-events-none opacity-[var(--noise-opacity)] z-[60] mix-blend-overlay bg-[url('https://res.cloudinary.com/dtwcgfmar/image/upload/v1710515152/noise_u6p5qg.png')] bg-repeat" />
      <div 
        className="fixed inset-0 pointer-events-none opacity-[var(--grid-opacity)] z-[5] " 
        style={{ 
          backgroundImage: `linear-gradient(to right, var(--grid-color) 1px, transparent 1px), linear-gradient(to bottom, var(--grid-color) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          opacity: `calc(var(--grid-opacity) * 0.2)`
        }} 
      />

      {/* Hero Section */}
      <section
        id="hero-section"
        ref={heroRef}
        className={`relative w-full flex items-center justify-center px-4 md:px-6 min-h-[85vh] lg:min-h-screen pt-20 pb-20`}
        style={{ backgroundColor: 'var(--hero-bg)' }}
      >
        {/* Background Layer with Parallax */}
        <motion.div
          style={{ y: heroY, opacity: heroOpacity, scale: heroScale, filter: `blur(${heroBlur})` }}
          className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
        >
          <img
             src={image || "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop"} 
             alt={name} 
             className={`w-full h-full object-cover opacity-30 ${isPortrait ? "blur-2xl" : ""}`}
             style={{ transform: `scale(var(--hero-image-scale))` }}
           />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--bg-color)]/20 to-[var(--bg-color)]" />
        </motion.div>

        <div className="absolute top-8 md:top-12 left-6 md:left-12 z-50 flex items-center gap-4 md:gap-6">
          <motion.div 
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-2 md:w-3 h-2 md:h-3 rounded-full bg-[var(--primary-color)] shadow-[0_0_20px_var(--primary-color)]" 
          />
          <div 
            className="text-[9px] md:text-[11px] font-black tracking-[0.4em] md:tracking-[0.6em] uppercase italic"
            style={{ color: 'var(--paragraph-color)', opacity: 0.6 }}
          >
            {name || "SOCIAL BUREAU PARTNER"}
          </div>
        </div>

        <div 
          className={`max-w-7xl w-full relative z-10 flex flex-col items-center ${isPortrait ? "lg:flex-row lg:items-center lg:justify-center lg:gap-32" : "text-center"}`}
          style={{ paddingTop: `var(--hero-text-y)` }}
        >
          
          {/* Portrait Image Frame */}
          {isPortrait && (
            <motion.div 
              initial={{ opacity: 0, y: 60, rotate: -3 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-[280px] sm:w-[320px] md:w-[380px] lg:w-[420px] aspect-[3/4] rounded-[32px] md:rounded-[48px] overflow-hidden shadow-[0_60px_120px_-20px_rgba(232,0,26,0.15)] border border-white/10 p-1.5 md:p-2 bg-white/5 backdrop-blur-3xl z-20"
            >
               <img src={image || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop"} alt={name} className="w-full h-full object-cover rounded-[28px] md:rounded-[40px] transition-all duration-1000" style={{ transform: `scale(var(--hero-image-scale))` }} />
            </motion.div>
          )}

          <div className={`${isPortrait ? "flex-1 text-center lg:text-left mt-12 lg:mt-0" : "w-full mt-12"}`}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="mb-8 md:mb-12"
            >
              <span 
                className="font-black tracking-[0.3em] md:tracking-[0.4em] uppercase text-[var(--primary-color)] border border-[var(--primary-color)]/20 px-6 md:px-8 py-2 md:py-3 rounded-full bg-[var(--primary-color)]/5 backdrop-blur-xl shadow-2xl shadow-[var(--primary-color)]/10 italic inline-block hero-font"
                style={{ fontSize: `calc(var(--hero-subtitle-size) * clamp(0.6rem, 2.5vw, 0.85rem))` }}
              >
                {subtitle || "The Visionary Creator"}
              </span>
            </motion.div>

            <div className={`space-y-4 ${isPortrait ? "text-center lg:text-left" : "text-center flex flex-col items-center"}`}>
              <div className="overflow-hidden py-2 md:py-4">
                <motion.h1
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                  className="font-black leading-[0.9] tracking-tight uppercase italic pr-4 hero-font"
                  style={{ fontSize: `calc(var(--hero-name-size) * ${isPortrait ? "clamp(1.2rem, 6.5vw, 6rem)" : "clamp(3rem, 12vw, 12rem)"})`, color: 'var(--heading-color)' }}
                >
                  {name || "IDENTITY."}
                </motion.h1>
              </div>
              
              {data.heroDescription && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="text-[10px] md:text-xs font-black uppercase tracking-[0.4em] italic"
                  style={{ color: 'var(--paragraph-color)', opacity: 0.7 }}
                >
                  {data.heroDescription}
                </motion.p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Narrative Section */}
      <motion.section 
        id="narrative-section"
        style={{ y: nextSectionTranslateY, backgroundColor: 'var(--bio-bg)' }}
        className="py-20 md:py-40 px-6 md:px-12 lg:px-24 relative z-20 shadow-[0_-50px_100px_rgba(0,0,0,0.5)]"
      >
        {/* Background Decorative Text - High Speed Parallax */}
        <motion.div 
          style={{ x: useTransform(heroScroll, [0.5, 1.5], ["-20%", "20%"]) }}
          className="absolute top-1/2 left-0 -translate-y-1/2 text-[35vw] font-black text-white/[0.02] pointer-events-none whitespace-nowrap italic tracking-tighter"
        >
          NARRATIVE
        </motion.div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row gap-12 md:gap-32 items-start">
              <div className="w-full lg:w-1/3">
                  <div className="sticky top-32">
                    <span className="text-[10px] font-black tracking-[0.4em] uppercase text-[var(--primary-color)] italic underline underline-offset-8 decoration-2">01 / The Core Mission</span>
                    <p className="text-white/20 text-xs mt-12 font-medium tracking-widest max-w-[200px] leading-relaxed italic">CRAFTING DIGITAL LEGACIES THROUGH CLINICAL PRECISION.</p>
                  </div>
              </div>
              <div className="w-full lg:w-2/3">
                  <AnimatedText 
                    className="font-bold leading-[1.1] tracking-tight italic uppercase bio-font"
                    text={bio || "We exist at the intersection of clinical data and disruptive creativity. Engineering legacies that transcend the digital noise."}
                    style={{ fontSize: `calc(var(--bio-size) * ${isPortrait ? "1.4rem" : "2.2rem"})`, color: 'var(--paragraph-color)' }}
                  />
                  <motion.div 
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                    className="h-px w-full bg-gradient-to-r from-[var(--primary-color)] to-transparent mt-16 md:mt-24 origin-left"
                  />
              </div>
          </div>
        </div>
      </motion.section>

      {/* Selected Works Grid */}
      {projects.length > 0 && (
        <section 
          id="projects-section"
          className="py-20 md:py-40 px-6 md:px-12 lg:px-24 relative overflow-hidden"
          style={{ backgroundColor: 'var(--projects-bg)' }}
        >
           {/* Parallax Background Title */}
           <motion.div 
              style={{ x: useTransform(heroScroll, [0, 1], ["20%", "-20%"]) }}
              className="absolute top-20 left-0 text-[40vw] font-black text-white/[0.02] leading-none select-none italic pointer-events-none uppercase"
           >
              PROJECTS
           </motion.div>

           <div className="max-w-7xl mx-auto relative z-10">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-32 border-b border-white/5 pb-8 md:pb-16 gap-8">
                  <PremiumHeading 
                    className="font-black tracking-tighter uppercase leading-[0.9] italic module-font"
                    style={{ fontSize: `calc(var(--section-title-size) * 7vw)` }}
                  >
                    Selected<br /><span className="text-[var(--primary-color)]">Artifacts</span>
                  </PremiumHeading>
                  <div className="text-[10px] font-black tracking-[0.4em] uppercase text-white/20 hidden md:block italic" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 md:gap-x-20 gap-y-12 md:gap-y-24">
                  {projects.map((project, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, y: 60 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-10%" }}
                      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                      className={`group relative ${idx % 2 !== 0 ? "md:mt-24" : ""}`}
                    >
                        <div className="aspect-[3/2] rounded-[24px] md:rounded-[40px] overflow-hidden bg-white/5 border border-white/5 relative mb-6 md:mb-8 shadow-2xl transition-all duration-700 hover:shadow-[var(--primary-color)]/10 max-w-2xl mx-auto">
                            {project.image ? (
                               <img 
                                 src={project.image} 
                                 alt={project.title} 
                                 className="w-full h-full object-cover transition-transform duration-[2.5s] ease-out group-hover:scale-110" 
                                 style={{ transform: `scale(var(--project-image-scale))` }}
                               />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-white/5 font-black text-[15vw] md:text-[10vw] italic">{idx + 1}</div>
                            )}
                             <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-color)]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700" />
                        </div>
                        <div className="flex justify-between items-start pr-4 md:pr-6">
                           <div className="max-w-md">
                              <h3 
                                className="font-black tracking-tighter uppercase mb-4 md:mb-6 italic leading-none text-[var(--primary-color)] transition-colors card-font"
                                style={{ fontSize: `calc(var(--project-title-size) * 2rem)` }}
                              >
                                {project.title}
                              </h3>
                              <p 
                                className="leading-relaxed font-light italic card-font"
                                style={{ fontSize: `calc(var(--project-body-size) * 0.875rem)`, color: 'var(--paragraph-color)', opacity: 0.7 }}
                              >
                                {project.description}
                              </p>
                           </div>
                           <span className="text-xl md:text-2xl font-black italic text-white/5">0{idx + 1}</span>
                        </div>
                    </motion.div>
                  ))}
              </div>
           </div>
        </section>
      )}

      {/* Expertise Section */}
      <section 
        id="expertise-section"
        className="py-20 md:py-32 px-6 md:px-12 lg:px-24 relative z-10"
        style={{ backgroundColor: 'var(--services-bg)' }}
      >
        <div className="max-w-7xl mx-auto">
           <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16 mb-20 md:mb-40">
               <PremiumHeading 
                className="font-black italic uppercase tracking-tighter leading-none module-font"
                style={{ fontSize: `calc(var(--section-title-size) * 7vw)`, color: "var(--primary-color)" }}
              >
                Excellence Units
              </PremiumHeading>
               <div className="h-px flex-1 bg-white/5 hidden md:block" />
               <div className="text-[10px] font-black tracking-[0.4em] uppercase text-[var(--primary-color)] italic" />
           </div>

           <div className={`grid grid-cols-1 sm:grid-cols-2 ${isEditing ? "xl:grid-cols-3" : "lg:grid-cols-3"} gap-px bg-white/5 border border-white/5 rounded-[32px] md:rounded-[80px] overflow-hidden`}>
            {services.map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.1 * idx }}
                className="group p-10 md:p-20 lg:p-24 hover:bg-[var(--primary-color)]/5 transition-all duration-700 flex flex-col justify-between aspect-square relative"
                style={{ backgroundColor: 'var(--bg-color)' }}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--primary-color)]/10 blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                
                <div className="text-[10px] md:text-[11px] font-black tracking-widest text-[var(--primary-color)] mb-8 md:mb-12 flex items-center gap-4 italic uppercase relative z-10" />
                <div className="relative z-10">
                  <h3 
                    className="font-black tracking-tighter mb-6 md:mb-10 uppercase leading-[0.85] italic text-[var(--primary-color)] transition-colors break-words overflow-hidden card-font"
                    style={{ fontSize: `calc(var(--service-title-size) * 2.5rem)` }}
                  >
                    {service.title}
                  </h3>
                  <p 
                    className="group-hover:opacity-100 leading-relaxed font-light italic card-font transition-opacity"
                    style={{ fontSize: `calc(var(--service-body-size) * 1.125rem)`, color: 'var(--paragraph-color)', opacity: 0.7 }}
                  >
                    {service.description}
                  </p>
                </div>
              </motion.div>
            ))}
           </div>
        </div>
      </section>

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section 
          id="testimonials-section"
          className="py-24 md:py-48 px-6 md:px-12 lg:px-24 relative overflow-hidden"
          style={{ backgroundColor: 'var(--testimonials-bg)' }}
        >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[800px] h-[300px] sm:h-[800px] bg-[var(--primary-color)]/5 rounded-full blur-[80px] md:blur-[160px] pointer-events-none" />
            
            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-20 md:mb-40">
                    <Sparkles className="text-[var(--primary-color)] mx-auto mb-6 md:mb-10 animate-pulse w-10 md:w-16 h-10 md:h-16" />
                    <PremiumHeading className="text-5xl sm:text-6xl md:text-[8rem] font-black tracking-tighter uppercase italic leading-[0.8] module-font">
                        Voices of<br /><span className="text-[var(--primary-color)]">Assurance</span>
                    </PremiumHeading>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
                    {testimonials.map((t, idx) => (
                      <motion.div 
                        key={idx}
                        initial={{ opacity: 0, y: 60 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: idx * 0.15 }}
                        className="bg-white/[0.01] backdrop-blur-3xl p-10 md:p-20 rounded-[48px] md:rounded-[80px] border border-white/5 hover:border-[var(--primary-color)]/20 transition-all duration-1000 flex flex-col justify-between group relative overflow-hidden"
                      >
                          <div className="absolute -top-10 -right-10 w-40 h-40 bg-[var(--primary-color)]/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                          <Quote 
                            className="mb-10 md:mb-16 group-hover:text-[var(--primary-color)]/10 transition-colors w-10 md:w-16 h-10 md:h-16 -ml-2" 
                            style={{ color: 'var(--paragraph-color)', opacity: 0.05 }}
                          />
                          <p 
                            className="font-medium tracking-tight mb-10 md:mb-24 italic leading-[1.2] md:leading-[1.1] transition-colors testimonial-font"
                            style={{ fontSize: `calc(var(--testimonial-quote-size) * ${isPortrait ? "clamp(1rem, 5vw, 1.8rem)" : "2.5rem"})`, color: 'var(--paragraph-color)', opacity: 0.7 }}
                          >
                            "{t.quote}"
                          </p>
                          <div className="flex items-center gap-6 md:gap-8">
                              <div className="w-12 md:w-20 h-px bg-[var(--primary-color)]/40 group-hover:w-24 md:group-hover:w-32 transition-all duration-700" />
                              <div>
                                <p 
                                  className="font-black uppercase tracking-[0.3em] md:tracking-[0.4em] text-[var(--primary-color)] testimonial-font"
                                  style={{ fontSize: `calc(var(--testimonial-author-size) * 0.875rem)` }}
                                >
                                  {t.author}
                                </p>
                                <p className="text-[9px] md:text-[11px] uppercase tracking-[0.4em] md:tracking-[0.5em] text-white/10 mt-2 italic font-black group-hover:text-white/20 transition-colors">Verified Visionary</p>
                              </div>
                          </div>
                      </motion.div>
                    ))}
                </div>
            </div>
         </section>
      )}

      {/* High-End Footer */}
      <footer 
        id="footer-section"
        className="py-8 px-6 md:px-12 lg:px-24 relative overflow-hidden"
        style={{ backgroundColor: 'var(--footer-bg)' }}
      >
        <div className="max-w-7xl mx-auto relative z-10">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center border-b border-white/5 pb-8 mb-8 gap-16 md:gap-24">
                <div className="space-y-8 md:space-y-12 w-full">
                    <PremiumHeading 
                      className="font-black tracking-tighter uppercase leading-[0.85] md:leading-[0.7] mb-6 md:mb-8 italic footer-font"
                      style={{ fontSize: `calc(var(--footer-title-size) * ${isPortrait ? "clamp(2.5rem, 14vw, 5rem)" : "10rem"})` }}
                    >
                      Let's Build<br /><span className="text-[var(--primary-color)]">Legendary.</span>
                    </PremiumHeading>
                    <p 
                      className="text-base md:text-xl lg:text-2xl font-light italic tracking-tight max-w-xl leading-relaxed"
                      style={{ color: 'var(--paragraph-color)', opacity: 0.7 }}
                    >
                      Available for elite collaborations that demand clinical precision and bold execution.
                    </p>
                </div>
                
                <div className="flex flex-wrap gap-3 sm:gap-4 md:gap-8">
                    {socialLinks.map((link, i) => (
                      <MagneticButton key={i} className="flex shrink-0">
                        <a 
                          href={link.url} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="w-14 sm:w-16 md:w-24 h-14 sm:h-16 md:h-24 rounded-[16px] sm:rounded-[20px] md:rounded-[32px] bg-white/[0.03] border border-white/10 flex items-center justify-center hover:bg-[var(--primary-color)] hover:text-white hover:border-[var(--primary-color)] transition-all duration-700 shadow-2xl"
                        >
                          <SocialIcon platform={link.platform} />
                        </a>
                      </MagneticButton>
                    ))}
                </div>
            </div>

            <div className="flex flex-col items-center gap-8 text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] md:tracking-[0.5em] text-white/10 italic text-center">
                <div className="flex flex-col items-center gap-4">
                  <p className="text-[11px] font-black text-white/90 uppercase tracking-[0.2em]">
                    Powered by{" "}
                    <a
                      style={{ fontFamily: "MyFont, sans-serif" }}
                      href="https://socialbureau.in"
                      className="text-white/80 hover:text-white transition-all duration-300 font-bold tracking-tight relative group inline-block"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="relative z-10">
                        Social<span className="text-red-500">B</span>ureau
                      </span>
                      <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-red-500 to-red-700 group-hover:w-full transition-all duration-300"></span>
                    </a>
                  </p>
                </div>
            </div>
        </div>
      </footer>
      <BackToTop />
    </div>
    </>
  );
};

export default ModernTemplate;

