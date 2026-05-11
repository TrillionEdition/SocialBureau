import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  useSpring,
  useMotionValue,
} from "framer-motion";
import {
  Linkedin,
  Twitter,
  Instagram,
  Github,
  Globe,
  ExternalLink,
  Quote,
  ArrowUpRight,
  ArrowUp,
  Sparkles,
  ChevronDown,
  Edit3,
  X,
  Save,
  Palette,
  Type,
  Maximize2,
  Mail,
  MapPin,
  Phone,
  Send,
  Facebook,
  Youtube,
  MessageSquare,
  Users,
  TrendingUp,
  BarChart3,
  Layers,
  Zap,
} from "lucide-react";

/**
 * Magnetic effect for buttons/icons
 */
const MagneticButton = ({ children, className = "", distance = 0.35 }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    if (!ref.current) return;
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
      animate={{ x: x * distance, y: y * distance }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/**
 * Text Mask Reveal Animation
 */
const TextReveal = ({ children, className = "", delay = 0 }) => (
  <div className={`overflow-hidden ${className}`}>
    <motion.div
      initial={{ y: "100%", rotate: 5 }}
      whileInView={{ y: 0, rotate: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  </div>
);

/**
 * 3D Tilt Card Effect
 */
const TiltCard = ({ children, className = "" }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/**
 * Floating Background Elements
 */
const FloatingElements = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 5 + i,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute opacity-10"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            color: "var(--primary-color)",
          }}
        >
          <Sparkles size={20 + i * 10} />
        </motion.div>
      ))}
    </div>
  );
};

const SectionHeading = ({ title, subtitle, light = false }) => (
  <div className="text-center mb-16 md:mb-24">
    <div className="flex flex-col items-center gap-4">
      <TextReveal>
        <h2
          className={`text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none ${light ? "text-white" : "text-zinc-900"}`}
        >
          {title}
        </h2>
      </TextReveal>
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: "80px" }}
        viewport={{ once: true }}
        className="h-1.5 bg-yellow-500 rounded-full"
      />
      {subtitle && (
        <TextReveal>
          <p
            className={`mt-4 max-w-2xl text-[10px] md:text-xs uppercase tracking-[0.5em] font-black italic ${light ? "text-zinc-500" : "text-zinc-400"}`}
          >
            {subtitle}
          </p>
        </TextReveal>
      )}
    </div>
  </div>
);

const SocialIcon = ({ platform }) => {
  switch (platform?.toLowerCase()) {
    case "linkedin":
      return <Linkedin size={24} />;
    case "twitter":
      return <Twitter size={24} />;
    case "instagram":
      return <Instagram size={24} />;
    case "github":
      return <Github size={24} />;
    case "facebook":
      return <Facebook size={24} />;
    case "youtube":
      return <Youtube size={24} />;
    default:
      return <Globe size={24} />;
  }
};

/**
 * Horizontal Marquee
 */
const Marquee = ({ text, reverse = false }) => {
  return (
    <div className="py-20 bg-[var(--primary-color)] overflow-hidden flex whitespace-nowrap border-y-4 border-black">
      <motion.div
        animate={{ x: reverse ? [0, "100%"] : [0, "-100%"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="flex gap-20 items-center pr-20"
      >
        {[...Array(10)].map((_, i) => (
          <span key={i} className="text-6xl md:text-9xl font-black uppercase italic text-black tracking-tighter">
            {text} •
          </span>
        ))}
      </motion.div>
      <motion.div
        animate={{ x: reverse ? [0, "100%"] : [0, "-100%"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="flex gap-20 items-center pr-20"
      >
        {[...Array(10)].map((_, i) => (
          <span key={i} className="text-6xl md:text-9xl font-black uppercase italic text-black tracking-tighter">
            {text} •
          </span>
        ))}
      </motion.div>
    </div>
  );
};

export const InfluencerTemplate = ({ data, isEditing, onUpdate }) => {
  const {
    name,
    subtitle,
    bio,
    services = [],
    projects = [],
    testimonials = [],
    socialLinks = [],
    blogPosts = [],
    image,
    styles = {},
  } = data;

  const containerRef = useRef(null);


  // Default styles
  const defaultStyles = {
    primaryColor: "#FFC107",
    backgroundColor: "#FFFFFF",
    headerColor: "#1A1A1A",
    fontFamily: "'Outfit', sans-serif",
  };

  const activeStyles = { ...defaultStyles, ...styles };

  const styleVariables = {
    "--primary-color": activeStyles.primaryColor || "#FFC107",
    "--bg-color": activeStyles.backgroundColor || "#FFFFFF",
    "--header-color": activeStyles.headerColor || "#1A1A1A",
    "--font-family": activeStyles.fontFamily || "'Outfit', sans-serif",
    "--hero-name-size": activeStyles.heroNameFontSize || "1",
    "--hero-subtitle-size": activeStyles.heroSubtitleFontSize || "1",
    "--hero-text-y": (activeStyles.heroTextY || 0) + "px",
    "--hero-image-scale": activeStyles.heroImageScale || "1",
    "--bio-size": activeStyles.bioFontSize || "1",
    "--section-title-size": activeStyles.sectionTitleFontSize || "1",
    "--service-title-size": activeStyles.serviceTitleFontSize || "1",
    "--service-body-size": activeStyles.serviceBodyFontSize || "1",
    "--project-title-size": activeStyles.projectTitleFontSize || "1",
    "--project-body-size": activeStyles.projectBodyFontSize || "1",
    "--testimonial-quote-size": activeStyles.testimonialQuoteFontSize || "1",
    "--testimonial-author-size": activeStyles.testimonialAuthorFontSize || "1",
    "--footer-title-size": activeStyles.footerTitleFontSize || "1",
    "--bio-bg": activeStyles.bioBg || activeStyles.backgroundColor || "#FFFFFF",
    "--services-bg": activeStyles.servicesBg || "#f9fafb",
    "--testimonials-bg": activeStyles.testimonialsBg || activeStyles.backgroundColor || "#FFFFFF",
    "--footer-bg": activeStyles.footerBg || "#0A0A0A",
    "--archive-columns": activeStyles.archiveColumns || "3",
    "--archive-gap": (activeStyles.archiveGap || 32) + "px",
    "--archive-radius": (activeStyles.archiveRadius || 40) + "px",
    "--archive-overlay": activeStyles.archiveOverlay || "0.9",
    "--archive-aspect": activeStyles.archiveAspect || "3/4",
    "--archive-hover": activeStyles.archiveHover || "zoom",
    "--archive-style": activeStyles.archiveStyle || "clean",
  };

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

  // Smooth progress bar
  const { scrollYProgress: totalProgress } = useScroll();
  const scaleX = useSpring(totalProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div
      ref={containerRef}
      className="influencer-template min-h-screen font-sans selection:bg-yellow-500 selection:text-black relative overflow-x-hidden"
      style={styleVariables}
    >
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;700;900&family=Outfit:wght@300;400;700;900&display=swap');
          
          .influencer-template {
            font-family: var(--font-family);
            background-color: var(--bg-color);
          }

          .grainy-overlay {
            background-image: url("https://grainy-gradients.vercel.app/noise.svg");
            filter: contrast(150%) brightness(1000%);
            opacity: 0.03;
            pointer-events: none;
            position: fixed;
            inset: 0;
            z-index: 999;
          }

          .hero-curve {
            clip-path: ellipse(150% 100% at 50% 0%);
          }

          @media (min-width: 768px) {
            .hero-curve {
              clip-path: ellipse(120% 100% at 50% 0%);
            }
          }

          .masonry-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
            grid-auto-rows: 250px;
            gap: 24px;
          }

          .masonry-item:nth-child(2n) { grid-row: span 2; }
          .masonry-item:nth-child(3n) { grid-row: span 1.5; }

          /* Gallery Styles */
          .archive-card {
            aspect-ratio: var(--archive-aspect);
            border-radius: var(--archive-radius);
            position: relative;
            overflow: hidden;
            transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          }

          .archive-card.style-glass {
            background: rgba(255, 255, 255, 0.03);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
          }

          .archive-card.style-bordered {
            border: 4px solid var(--primary-color);
          }

          .archive-card.style-shadow {
            box-shadow: 0 40px 80px -20px rgba(0, 0, 0, 0.5);
          }

          .archive-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 1.2s cubic-bezier(0.16, 1, 0.3, 1);
          }

          /* Hover Effects */
          .archive-card.hover-zoom:hover .archive-image {
            transform: scale(1.15);
          }

          .archive-card.hover-slide .archive-overlay {
            transform: translateY(10%);
            transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
          }

          .archive-card.hover-slide:hover .archive-overlay {
            transform: translateY(0);
          }

          .archive-card.hover-fade .archive-overlay {
            opacity: 0;
            transition: opacity 0.4s ease;
          }

          .archive-card.hover-fade:hover .archive-overlay {
            opacity: 1;
          }

          .archive-overlay {
            position: absolute;
            inset: 0;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            padding: 2.5rem;
            background: linear-gradient(to top, rgba(0,0,0,var(--archive-overlay)), rgba(0,0,0,0.3), transparent);
            opacity: 0;
            transition: all 0.5s ease;
          }

          .archive-card:hover .archive-overlay {
            opacity: 1;
          }

          ::-webkit-scrollbar {
            width: 8px;
          }
          ::-webkit-scrollbar-track {
            background: #000;
          }
          ::-webkit-scrollbar-thumb {
            background: var(--primary-color);
            border-radius: 10px;
          }
        `}
      </style>

      {/* Aesthetic Grain & Progress */}
      <div className="grainy-overlay" />
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 origin-left z-[1000]"
        style={{ scaleX, backgroundColor: "var(--primary-color)" }}
      />

      {/* Hero Section - Deconstructed Editorial Layout */}
      <section
        id="identity-section"
        ref={heroRef}
        className="relative bg-[#050505] text-white h-[100svh] min-h-[600px] flex flex-col lg:flex-row overflow-hidden items-stretch"
      >
        <FloatingElements />
        
        {/* LEFT COLUMN: The Vertical Identity */}
        <div className="relative w-full lg:w-[12%] xl:w-[10%] border-r border-white/5 flex lg:flex-col items-center justify-between py-8 lg:py-12 px-6 z-30 bg-black">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-xl md:text-2xl font-black tracking-tighter italic"
            style={{ color: "var(--primary-color)" }}
          >
            {name?.split(" ")[0].toUpperCase() || "CREATIVE"}
          </motion.div>

          <div className="hidden lg:flex flex-col items-center gap-8 py-12">
            <div className="h-24 xl:h-40 w-[1px] bg-gradient-to-b from-white/20 to-transparent" />
            <span className="text-[7px] xl:text-[8px] font-black uppercase tracking-[0.8em] vertical-text opacity-20 italic">Portfolio 2026</span>
          </div>

          <div className="flex flex-col items-center gap-6">
            <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-all cursor-pointer">
              <Layers size={14} className="opacity-40" />
            </div>
          </div>
        </div>

        {/* CENTER COLUMN: The Visual Core */}
        <div className="relative flex-1 flex items-center justify-center p-6 md:p-8 lg:p-12 overflow-hidden">
          
          {/* Huge Background Letter - Parallax */}
          <motion.div
            style={{ y: useTransform(scrollYProgress, [0, 1], [0, 150]), opacity: 0.05 }}
            className="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none z-0"
          >
            <span className="text-[50vw] font-black leading-none uppercase italic tracking-tighter select-none">
              {name?.charAt(0) || "A"}
            </span>
          </motion.div>

          {/* Portrait with reveal effect */}
          <div className="relative z-10 w-full max-w-[280px] sm:max-w-[400px] lg:max-w-[500px] xl:max-w-[550px] group">
            <TiltCard>
              <motion.div
                initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
                className="relative aspect-[4/5] max-h-[70vh] overflow-hidden rounded-[20px] md:rounded-[40px] shadow-[0_60px_100px_-30px_rgba(0,0,0,0.8)]"
              >
                <motion.img
                  style={{ scale: heroScale }}
                  src={image || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop"}
                  alt={name}
                  className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
              </motion.div>
            </TiltCard>

            {/* Overlapping Floating Name */}
            <div className="absolute -bottom-6 lg:-bottom-12 -left-6 lg:-left-12 z-20 pointer-events-none">
              <TextReveal delay={0.5}>
                <h1 
                  className="text-[clamp(3rem,10vw,8rem)] font-black leading-[0.8] tracking-tighter uppercase italic mix-blend-difference"
                  style={{ fontSize: `calc(clamp(3rem,10vw,8rem) * var(--hero-name-size))` }}
                >
                  {name?.split(" ")[0] || "AHLAN"}<br />
                  <span className="text-[var(--primary-color)]">{name?.split(" ")[1] || ""}</span>
                </h1>
              </TextReveal>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: The Narrative & Stats */}
        <div className="relative w-full lg:w-[25%] xl:w-[22%] border-l border-white/5 flex flex-col justify-center p-8 md:p-10 lg:p-12 xl:p-16 z-30 bg-zinc-950/50 backdrop-blur-3xl overflow-y-auto custom-scrollbar">
          
          <div className="space-y-10 lg:space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="space-y-3"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-[1px] bg-[var(--primary-color)]" />
                <span className="text-[8px] font-black uppercase tracking-[0.4em] italic text-[var(--primary-color)]">Identity</span>
              </div>
              <p className="text-white/40 leading-relaxed text-[11px] italic font-light max-w-[240px]">
                {data.heroDescription || "Helping brands reach their target audience through authentic storytelling and high-impact visual content."}
              </p>
            </motion.div>

            <div className="space-y-8">
              {[
                { label: "Community", value: data.details?.stats?.followers || "100K+" },
                { label: "Engagement", value: data.details?.stats?.engagement || "5.2%" },
                { label: "Reach", value: data.details?.stats?.reach || "2M+" }
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 + i * 0.2 }}
                  className="space-y-0.5 group cursor-default"
                >
                  <span className="text-[7px] font-black uppercase tracking-[0.4em] text-white/20 italic block group-hover:text-[var(--primary-color)] transition-colors">{stat.label}</span>
                  <span className="text-3xl xl:text-4xl font-black italic tracking-tighter block leading-none">
                    {stat.value}
                  </span>
                </motion.div>
              ))}
            </div>

            <div className="space-y-4 pt-6">
              <MagneticButton>
                <button className="w-full py-5 bg-[var(--primary-color)] text-black font-black uppercase tracking-[0.3em] text-[9px] rounded-full hover:scale-[1.02] active:scale-95 transition-all shadow-2xl italic">
                  Contact Me
                </button>
              </MagneticButton>
              <button className="w-full py-5 bg-white/5 border border-white/10 text-white font-black uppercase tracking-[0.3em] text-[9px] rounded-full hover:bg-white/10 transition-all italic">
                Media Kit
              </button>
            </div>
          </div>
        </div>

        {/* Floating Decorative Label */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 hidden xl:block pointer-events-none opacity-5">
           <span className="text-[180px] font-black uppercase vertical-text tracking-tighter leading-none italic">EST. 2026</span>
        </div>
      </section>

      {/* About Section */}
      <section
        id="narrative-section"
        className="py-20 md:py-32 px-6 md:px-16 max-w-7xl mx-auto relative"
        style={{ backgroundColor: "var(--bio-bg)" }}
      >
        <FloatingElements />
        <div className="grid md:grid-cols-2 gap-24 md:gap-40 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
            style={{ y: useTransform(totalProgress, [0, 1], [0, -100]) }}
          >
            <div 
              className="absolute -inset-4 rounded-[60px] blur-3xl -z-10" 
              style={{ backgroundColor: "var(--primary-color)", opacity: 0.1 }}
            />
            <div className="relative z-10 rounded-[48px] overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.1)] group">
              <img
                src={
                  image ||
                  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop"
                }
                alt="About"
                className="w-full h-auto transition-transform duration-1000 group-hover:scale-110"
              />
            </div>
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="absolute -bottom-10 -right-10 p-10 md:p-14 rounded-[40px] shadow-2xl z-20"
              style={{ backgroundColor: "var(--primary-color)" }}
            >
              <span className="block text-6xl font-black text-black leading-none">
                5+
              </span>
              <span className="text-[10px] font-black uppercase tracking-widest text-black/40 italic">
                Years Experience
              </span>
            </motion.div>
          </motion.div>

          <div className="space-y-12">
            <div className="space-y-6">
              <div className="flex items-center gap-6">
                <div className="w-16 h-[2px]" style={{ backgroundColor: "var(--primary-color)" }} />
                <span className="font-black uppercase tracking-[0.4em] text-[10px] italic" style={{ color: "var(--primary-color)" }}>
                  Creative Force
                </span>
              </div>
              <TextReveal>
                <h2 
                  className="text-5xl md:text-7xl font-black text-zinc-900 leading-[0.9] uppercase italic tracking-tighter"
                  style={{ fontSize: `calc(4.5rem * var(--section-title-size))` }}
                >
                  Crafting Digital <br />
                  <span className="text-zinc-300">Narratives</span>
                </h2>
              </TextReveal>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-zinc-500 leading-relaxed text-lg md:text-xl font-light italic"
              style={{ fontSize: `calc(1.25rem * var(--bio-size))` }}
            >
              {bio ||
                "I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth."}
            </motion.p>

            <div className="grid grid-cols-2 gap-12 pt-6">
              {[
                {
                  label: "Community",
                  value: data.details?.stats?.followers || "100K+",
                },
                {
                  label: "Engagement",
                  value: data.details?.stats?.engagement || "5.2%",
                },
              ].map((stat, i) => (
                <div key={i}>
                  <span className="block text-[10px] font-black uppercase tracking-widest text-zinc-300 mb-2 italic">
                    {stat.label}
                  </span>
                  <span className="text-4xl font-black text-zinc-900 tracking-tighter italic">
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>

            <button 
              className="px-12 py-6 bg-zinc-900 text-white font-black uppercase tracking-[0.3em] text-[10px] rounded transition-all italic"
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "var(--primary-color)";
                e.currentTarget.style.color = "black";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#18181b";
                e.currentTarget.style.color = "white";
              }}
            >
              Download Media Kit
            </button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section
        id="solutions-section"
        className="py-20 md:py-32 px-6 md:px-16 relative overflow-hidden"
        style={{ backgroundColor: "var(--services-bg)" }}
      >
        <div 
          className="absolute top-0 right-0 w-1/2 h-full -skew-x-12 translate-x-1/2" 
          style={{ backgroundColor: "var(--primary-color)", opacity: 0.05 }}
        />

        <div className="max-w-7xl mx-auto relative z-10">
          <SectionHeading
            title="Solutions"
            subtitle="Strategic Collaboration Offerings"
          />

          <motion.div 
            className="grid md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.2 }
              }
            }}
          >
            {services.map((service, idx) => (
              <motion.div
                key={idx}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 }
                }}
                whileHover={{ y: -20, scale: 1.02 }}
                className="bg-white p-12 md:p-16 rounded-[48px] shadow-[0_20px_50px_rgba(0,0,0,0.03)] hover:shadow-[0_40px_100px_rgba(0,0,0,0.08)] transition-all border border-zinc-100 flex flex-col justify-between group h-[450px]"
              >
                <div className="space-y-8">
                  <div 
                    className="w-20 h-20 bg-zinc-50 rounded-[28px] flex items-center justify-center text-zinc-900 transition-all duration-700"
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "var(--primary-color)"}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#f9fafb"}
                  >
                    <Layers size={32} />
                  </div>
                  <div className="space-y-4">
                    <h3 
                      className="text-2xl font-black uppercase tracking-tight text-zinc-900 italic leading-none"
                      style={{ fontSize: `calc(1.5rem * var(--service-title-size))` }}
                    >
                      {service.title}
                    </h3>
                    <p 
                      className="text-zinc-500 text-sm leading-relaxed italic font-light"
                      style={{ fontSize: `calc(0.875rem * var(--service-body-size))` }}
                    >
                      {service.description}
                    </p>
                  </div>
                </div>

                <div 
                  className="pt-8 flex items-center gap-4 text-[9px] font-black uppercase tracking-widest group-hover:gap-6 transition-all"
                  style={{ color: "var(--primary-color)" }}
                >
                  <span>Learn More</span>
                  <ArrowUpRight size={14} />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <Marquee text={name?.toUpperCase() || "CREATIVE FORCE"} />

      {/* Social Media Presence */}
      <section 
        id="digital-echo-section"
        className="py-20 md:py-32 bg-[#0A0A0A] text-white overflow-hidden relative"
      >
        <div 
          className="absolute inset-0" 
          style={{ background: `radial-gradient(circle_at_30%_50%, var(--primary-color), transparent 50%)`, opacity: 0.05 }}
        />

        <div className="max-w-7xl mx-auto px-6 md:px-16 relative z-10">
          <div className="grid lg:grid-cols-2 gap-24 md:gap-40 items-center">
            <div className="space-y-12">
              <div className="space-y-6">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-[2px]" style={{ backgroundColor: "var(--primary-color)" }} />
                  <span className="font-black uppercase tracking-[0.4em] text-[10px] italic" style={{ color: "var(--primary-color)" }}>
                    Global Network
                  </span>
                </div>
                <TextReveal>
                  <h2 className="text-5xl md:text-8xl font-black leading-[0.85] uppercase italic tracking-tighter">
                    Digital <br />
                    <span style={{ color: "var(--primary-color)", fontSize: `calc(5rem * var(--section-title-size))` }}>Echo.</span>
                  </h2>
                </TextReveal>
              </div>
              <p 
                className="text-white/40 text-xl font-light italic max-w-md leading-relaxed"
                style={{ fontSize: `calc(1.25rem * var(--bio-size))` }}
              >
                Bridging the gap between brands and communities across all major
                social platforms.
              </p>

              <div className="flex flex-wrap gap-6">
                {socialLinks.map((link, i) => (
                  <MagneticButton key={i} distance={0.5}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-20 h-20 rounded-[28px] bg-white/5 flex items-center justify-center transition-all duration-700 border border-white/5 group shadow-2xl"
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "var(--primary-color)";
                        e.currentTarget.style.color = "black";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.05)";
                        e.currentTarget.style.color = "white";
                      }}
                    >
                      <SocialIcon platform={link.platform} />
                    </a>
                  </MagneticButton>
                ))}
              </div>
            </div>

            <motion.div 
              className="grid grid-cols-2 gap-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.1 }
                }
              }}
            >
              {[
                {
                  label: "Instagram",
                  value: "85K",
                  icon: Instagram,
                  color: "text-pink-500",
                },
                {
                  label: "YouTube",
                  value: "24K",
                  icon: Youtube,
                  color: "text-red-500",
                },
                {
                  label: "Twitter",
                  value: "12K",
                  icon: Twitter,
                  color: "text-blue-400",
                },
                {
                  label: "LinkedIn",
                  value: "5K",
                  icon: Linkedin,
                  color: "text-blue-700",
                },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  variants={{
                    hidden: { opacity: 0, scale: 0.8 },
                    visible: { opacity: 1, scale: 1 }
                  }}
                  className="bg-white/5 backdrop-blur-3xl p-10 md:p-14 rounded-[48px] border border-white/10 hover:border-yellow-500/50 transition-all group flex flex-col items-center text-center space-y-4"
                >
                  <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <stat.icon size={24} className={`${stat.color}`} />
                  </div>
                  <span className="block text-4xl md:text-5xl font-black group-hover:text-yellow-500 transition-colors tracking-tighter italic">
                    {stat.value}
                  </span>
                  <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white/20 italic">
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Portfolio Gallery */}
      <section
        id="archive-section"
        className="py-20 md:py-32 px-6 md:px-16 max-w-[1600px] mx-auto"
        style={{ backgroundColor: "var(--bg-color)" }}
      >
        <SectionHeading
          title="Archive"
          subtitle="Curated Visual Masterpieces"
        />

        <div 
          className="grid gap-8"
          style={{ 
            gridTemplateColumns: `repeat(var(--archive-columns), minmax(0, 1fr))`,
            gap: `var(--archive-gap)`
          }}
        >
          {projects.map((project, idx) => (
            <TiltCard key={idx} className="perspective-1000">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.1 }}
                className={`archive-card group hover-${activeStyles.archiveHover || 'zoom'} style-${activeStyles.archiveStyle || 'clean'}`}
              >
                <img
                  src={
                    project.image ||
                    "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1000&auto=format&fit=crop"
                  }
                  alt={project.title}
                  className="archive-image"
                />
                <div 
                  className="archive-overlay"
                >
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    className="space-y-4"
                  >
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-yellow-500 italic">
                      Project Showcase
                    </span>
                    <h4 className="text-3xl md:text-4xl font-black uppercase tracking-tighter italic leading-none">
                      {project.title}
                    </h4>
                    <p className="text-white/40 text-sm font-light italic leading-snug">
                      {project.description}
                    </p>
                    <div className="pt-4">
                      <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center text-black">
                        <ArrowUpRight size={20} />
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </TiltCard>
          ))}
        </div>
      </section>


      {/* Insights Section */}
      {blogPosts && blogPosts.length > 0 && (
        <section
          id="insights-section"
          className="py-20 md:py-32 px-6 md:px-16 bg-zinc-950 relative overflow-hidden"
        >
          {/* Background Detail */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-[var(--primary-color)] opacity-[0.02] -skew-x-12 translate-x-1/2" />
          
          <div className="max-w-7xl mx-auto relative z-10">
            <SectionHeading
              title="Insights"
              subtitle="The Narrative Feed"
              light={true}
            />

            <motion.div 
              className="grid md:grid-cols-3 gap-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.1 }
                }
              }}
            >
              {blogPosts.map((post, idx) => (
                <motion.div
                  key={idx}
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  className="group"
                >
                  <div className="relative aspect-video rounded-[32px] overflow-hidden bg-white/5 border border-white/10 mb-8">
                    <img 
                      src={post.image || "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=1000&auto=format&fit=crop"} 
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-[8px] font-black uppercase tracking-[0.3em] italic">
                      <span className="text-[var(--primary-color)]">{post.category || "General"}</span>
                      <span className="text-white/20">{post.date || "2024"}</span>
                    </div>
                    <h3 className="text-2xl font-black text-white leading-none uppercase italic tracking-tighter group-hover:text-[var(--primary-color)] transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-white/30 text-[10px] leading-relaxed italic line-clamp-3">
                      {post.description}
                    </p>
                    <div className="pt-4 flex items-center gap-4 text-[9px] font-black uppercase tracking-widest text-white/40 group-hover:text-white transition-colors group-hover:gap-6 transition-all cursor-pointer">
                      <span>Read Narrative</span>
                      <ArrowUpRight size={14} className="text-[var(--primary-color)]" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section 
        id="unleash-section"
        className="py-24 md:py-40 px-6 md:px-16 text-center relative overflow-hidden"
        style={{ backgroundColor: "var(--primary-color)" }}
      >
        {/* Cinematic Background Text */}
        <motion.div
          style={{ x: heroY }}
          className="absolute top-1/2 left-0 text-[30vw] font-black text-black/5 pointer-events-none select-none uppercase italic whitespace-nowrap -translate-y-1/2"
        >
          Limitless Potential
        </motion.div>

        <div className="max-w-5xl mx-auto space-y-16 relative z-10">
          <div className="space-y-6">
            <TextReveal>
              <h2 
                className="text-7xl md:text-[180px] font-black text-black uppercase tracking-tighter leading-[0.75] italic"
                style={{ fontSize: `calc(11.25rem * var(--footer-title-size))` }}
              >
                {data.details?.ctaTitle?.toUpperCase() || "UNLEASH"}
              </h2>
            </TextReveal>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-black/40 text-xl md:text-4xl font-black uppercase italic tracking-tighter"
            >
              {data.details?.ctaSubtitle || "Let's create viral impact."}
            </motion.p>
          </div>

          <MagneticButton className="inline-block" distance={0.6}>
            <button
              onClick={() =>
                (window.location.href = `mailto:${data.email || "hello@lara.com"}`)
              }
              className="px-20 py-8 bg-black text-white font-black uppercase tracking-[0.5em] text-xs rounded-full hover:scale-110 transition-all shadow-[0_30px_100px_rgba(0,0,0,0.4)] flex items-center gap-6 mx-auto italic"
            >
              Start Project <Send size={20} style={{ color: "var(--primary-color)" }} />
            </button>
          </MagneticButton>
        </div>
      </section>

      {/* Footer */}
      <footer 
        className="py-20 border-t border-white/5 px-6 md:px-16"
        style={{ backgroundColor: "var(--footer-bg)" }}
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="flex gap-6">
            {socialLinks.slice(0, 4).map((link, i) => (
              <a
                key={i}
                href={link.url}
                className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-zinc-500 transition-all"
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--primary-color)";
                  e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "#71717a";
                  e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.05)";
                }}
              >
                <SocialIcon platform={link.platform} />
              </a>
            ))}
          </div>
          <div className="flex flex-col items-center md:items-end gap-2">
            <div className="text-white font-black text-xl italic tracking-tighter">
              {name?.toUpperCase()}
            </div>
            <div className="text-zinc-600 text-[9px] font-black uppercase tracking-[0.4em] italic">
              © 2024 Permanent Identity established by SocialBureau
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default InfluencerTemplate;
