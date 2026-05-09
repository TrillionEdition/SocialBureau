import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  useSpring,
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
const TextReveal = ({ children, className = "" }) => (
  <div className={`overflow-hidden ${className}`}>
    <motion.div
      initial={{ y: "100%" }}
      whileInView={{ y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  </div>
);

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

export const InfluencerTemplate = ({ data, isEditing, onUpdate }) => {
  const {
    name,
    subtitle,
    bio,
    services = [],
    projects = [],
    testimonials = [],
    socialLinks = [],
    image,
    styles = {},
    blogPosts = [],
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
    "--primary-color": activeStyles.primaryColor,
    "--bg-color": activeStyles.backgroundColor,
    "--header-color": activeStyles.headerColor,
    "--font-family": activeStyles.fontFamily,
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
      className="influencer-template min-h-screen font-sans selection:bg-yellow-500 selection:text-black relative"
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
        className="fixed top-0 left-0 right-0 h-1 bg-yellow-500 origin-left z-[1000]"
        style={{ scaleX }}
      />

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative bg-[#0A0A0A] text-white min-h-screen flex flex-col hero-curve overflow-hidden"
      >
        <nav className="relative z-20 flex justify-between items-center px-6 md:px-16 py-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-black tracking-tighter text-yellow-500 italic"
          >
            {name?.split(" ")[0].toUpperCase() || "CREATIVE"}
          </motion.div>
          <div className="hidden md:flex gap-12 text-[9px] font-black uppercase tracking-[0.4em] italic text-white/40">
            {["Home", "About", "Portfolio", "Services"].map(
              (item, i) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i }}
                  className="hover:text-yellow-500 transition-colors"
                >
                  {item}
                </motion.a>
              ),
            )}
          </div>
          <MagneticButton>
            <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-full flex items-center justify-center cursor-pointer hover:bg-yellow-500 hover:text-black transition-all">
              <Layers size={18} />
            </div>
          </MagneticButton>
        </nav>

        <div className="flex-1 max-w-7xl mx-auto w-full px-6 md:px-16 grid md:grid-cols-2 items-center gap-20 py-20 relative z-10">
          <div className="space-y-10">
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-4 text-yellow-500"
              >
                <Zap size={14} fill="currentColor" />
                <span className="text-[10px] font-black uppercase tracking-[0.5em] italic">
                  Available for booking
                </span>
              </motion.div>

              <div className="space-y-2">
                <TextReveal>
                  <h1 className="text-6xl md:text-[120px] font-black leading-[0.8] tracking-tighter uppercase italic">
                    Hello,
                    <br />
                    I'M{" "}
                    <span className="text-yellow-500">{name || "AHLAN"}</span>
                  </h1>
                </TextReveal>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-xl md:text-2xl text-white/40 font-black italic tracking-tight uppercase"
                >
                  {subtitle || "Professional Influencer"}
                </motion.p>
              </div>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-white/40 max-w-sm leading-relaxed text-sm md:text-base font-light italic"
            >
              {data.heroDescription ||
                "Helping brands reach their target audience through authentic storytelling and high-impact visual content."}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="flex gap-6 pt-6"
            >
              <button className="px-12 py-6 bg-yellow-500 text-black font-black uppercase tracking-[0.3em] text-[10px] rounded hover:scale-105 transition-all shadow-[0_20px_50px_rgba(234,179,8,0.2)] italic">
                Contact Me
              </button>
              <button className="px-12 py-6 bg-white/5 border border-white/10 text-white font-black uppercase tracking-[0.3em] text-[10px] rounded hover:bg-white/10 transition-all italic">
                Media Kit
              </button>
            </motion.div>
          </div>

          <motion.div
            style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
            className="relative hidden md:block"
          >
            <div className="relative z-10 rounded-[40px] overflow-hidden aspect-[4/5] shadow-[0_50px_100px_rgba(0,0,0,0.5)] border-[12px] border-white/5 group">
              <img
                src={
                  image ||
                  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop"
                }
                alt={name}
                className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-10">
                <span className="text-[10px] font-black uppercase tracking-widest text-yellow-500 mb-2 italic">
                  Creator Identity
                </span>
                <h3 className="text-2xl font-black uppercase italic">{name}</h3>
              </div>
            </div>
            {/* Immersive glow */}
            <div className="absolute -inset-10 bg-yellow-500/20 blur-[100px] -z-10 rounded-full animate-pulse" />
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-20"
        >
          <div className="w-[1px] h-20 bg-gradient-to-b from-yellow-500 to-transparent" />
          <span className="text-[8px] font-black uppercase tracking-[0.6em] italic">
            Scroll Down
          </span>
        </motion.div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="py-32 md:py-60 px-6 md:px-16 max-w-7xl mx-auto"
      >
        <div className="grid md:grid-cols-2 gap-24 md:gap-40 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-yellow-500/10 rounded-[60px] blur-3xl -z-10" />
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
              className="absolute -bottom-10 -right-10 bg-yellow-500 p-10 md:p-14 rounded-[40px] shadow-2xl z-20"
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
                <div className="w-16 h-[2px] bg-yellow-500" />
                <span className="text-yellow-500 font-black uppercase tracking-[0.4em] text-[10px] italic">
                  Creative Force
                </span>
              </div>
              <TextReveal>
                <h2 className="text-5xl md:text-7xl font-black text-zinc-900 leading-[0.9] uppercase italic tracking-tighter">
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

            <button className="px-12 py-6 bg-zinc-900 text-white font-black uppercase tracking-[0.3em] text-[10px] rounded hover:bg-yellow-500 hover:text-black transition-all italic">
              Download Media Kit
            </button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section
        id="services"
        className="py-32 md:py-60 bg-zinc-50 px-6 md:px-16 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-1/2 h-full bg-yellow-500/5 -skew-x-12 translate-x-1/2" />

        <div className="max-w-7xl mx-auto relative z-10">
          <SectionHeading
            title="Solutions"
            subtitle="Strategic Collaboration Offerings"
          />

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -20, scale: 1.02 }}
                className="bg-white p-12 md:p-16 rounded-[48px] shadow-[0_20px_50px_rgba(0,0,0,0.03)] hover:shadow-[0_40px_100px_rgba(0,0,0,0.08)] transition-all border border-zinc-100 flex flex-col justify-between group h-[450px]"
              >
                <div className="space-y-8">
                  <div className="w-20 h-20 bg-zinc-50 rounded-[28px] flex items-center justify-center text-zinc-900 group-hover:bg-yellow-500 transition-all duration-700">
                    <Layers size={32} />
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-2xl font-black uppercase tracking-tight text-zinc-900 italic leading-none">
                      {service.title}
                    </h3>
                    <p className="text-zinc-500 text-sm leading-relaxed italic font-light">
                      {service.description}
                    </p>
                  </div>
                </div>

                <div className="pt-8 flex items-center gap-4 text-[9px] font-black uppercase tracking-widest text-yellow-500 group-hover:gap-6 transition-all">
                  <span>Learn More</span>
                  <ArrowUpRight size={14} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Media Presence */}
      <section className="py-32 md:py-60 bg-[#0A0A0A] text-white overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,_rgba(234,179,8,0.05),transparent_50%)]" />

        <div className="max-w-7xl mx-auto px-6 md:px-16 relative z-10">
          <div className="grid lg:grid-cols-2 gap-24 md:gap-40 items-center">
            <div className="space-y-12">
              <div className="space-y-6">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-[2px] bg-yellow-500" />
                  <span className="text-yellow-500 font-black uppercase tracking-[0.4em] text-[10px] italic">
                    Global Network
                  </span>
                </div>
                <TextReveal>
                  <h2 className="text-5xl md:text-8xl font-black leading-[0.85] uppercase italic tracking-tighter">
                    Digital <br />
                    <span className="text-yellow-500">Echo.</span>
                  </h2>
                </TextReveal>
              </div>
              <p className="text-white/40 text-xl font-light italic max-w-md leading-relaxed">
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
                      className="w-20 h-20 rounded-[28px] bg-white/5 flex items-center justify-center hover:bg-yellow-500 hover:text-black transition-all duration-700 border border-white/5 group shadow-2xl"
                    >
                      <SocialIcon platform={link.platform} />
                    </a>
                  </MagneticButton>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
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
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1, type: "spring" }}
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
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Gallery */}
      <section
        id="portfolio"
        className="py-32 md:py-60 px-6 md:px-16 max-w-[1600px] mx-auto"
      >
        <SectionHeading
          title="Archive"
          subtitle="Curated Visual Masterpieces"
        />

        <div className="masonry-grid">
          {projects.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="masonry-item relative group rounded-[40px] overflow-hidden shadow-2xl cursor-none"
            >
              <img
                src={
                  project.image ||
                  "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1000&auto=format&fit=crop"
                }
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-125"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 flex flex-col justify-end p-12">
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
          ))}
        </div>
      </section>


      {/* CTA Section */}
      <section className="py-40 md:py-80 px-6 md:px-16 bg-yellow-500 text-center relative overflow-hidden">
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
              <h2 className="text-7xl md:text-[180px] font-black text-black uppercase tracking-tighter leading-[0.75] italic">
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
              Start Project <Send size={20} className="text-yellow-500" />
            </button>
          </MagneticButton>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 bg-[#0A0A0A] border-t border-white/5 px-6 md:px-16">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="flex gap-6">
            {socialLinks.slice(0, 4).map((link, i) => (
              <a
                key={i}
                href={link.url}
                className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-zinc-500 hover:text-yellow-500 hover:bg-white/10 transition-all"
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
