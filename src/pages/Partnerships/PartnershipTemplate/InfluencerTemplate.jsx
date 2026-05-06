import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { 
  Linkedin, Twitter, Instagram, Github, Globe, 
  ExternalLink, Quote, ArrowUpRight, ArrowUp, 
  Sparkles, ChevronDown, Edit3, X, Save, 
  Palette, Type, Maximize2, Mail, MapPin, 
  Phone, Send, Facebook, Youtube, MessageSquare,
  Users, TrendingUp, BarChart3, Layers
} from "lucide-react";

/**
 * Magnetic effect for buttons/icons
 */
const MagneticButton = ({ children, className = "" }) => {
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
      animate={{ x: x * 0.35, y: y * 0.35 }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const SectionHeading = ({ title, subtitle, light = false }) => (
  <div className="text-center mb-16">
    <div className="flex flex-col items-center gap-2">
      <h2 className={`text-4xl md:text-5xl font-black uppercase tracking-tight ${light ? 'text-white' : 'text-zinc-900'}`}>
        {title}
      </h2>
      <div className="w-12 h-1 bg-yellow-500 rounded-full" />
      {subtitle && (
        <p className={`mt-4 max-w-2xl text-sm uppercase tracking-widest font-bold ${light ? 'text-zinc-400' : 'text-zinc-500'}`}>
          {subtitle}
        </p>
      )}
    </div>
  </div>
);

const SocialIcon = ({ platform }) => {
  switch (platform?.toLowerCase()) {
    case "linkedin": return <Linkedin size={24} />;
    case "twitter": return <Twitter size={24} />;
    case "instagram": return <Instagram size={24} />;
    case "github": return <Github size={24} />;
    case "facebook": return <Facebook size={24} />;
    case "youtube": return <Youtube size={24} />;
    default: return <Globe size={24} />;
  }
};

export const InfluencerTemplate = ({ data, isEditing, onUpdate }) => {
  const { 
    name, subtitle, bio, services = [], 
    projects = [], testimonials = [], 
    socialLinks = [], image, styles = {},
    blogPosts = []
  } = data;

  // Default styles
  const defaultStyles = {
    primaryColor: "#FFC107",
    backgroundColor: "#FFFFFF",
    headerColor: "#1A1A1A",
    fontFamily: "'Inter', sans-serif",
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

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div 
      className="influencer-template min-h-screen font-sans selection:bg-yellow-500 selection:text-black"
      style={styleVariables}
    >
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;700;900&family=Outfit:wght@300;400;700;900&display=swap');
          
          .influencer-template {
            font-family: var(--font-family);
            background-color: var(--bg-color);
          }

          .hero-curve {
            clip-path: ellipse(150% 100% at 50% 0%);
          }

          @media (min-width: 768px) {
            .hero-curve {
              clip-path: ellipse(120% 100% at 50% 0%);
            }
          }

          .yellow-blob {
            background: var(--primary-color);
            border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
          }

          .masonry-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            grid-auto-rows: 200px;
            gap: 20px;
          }

          .masonry-item:nth-child(2n) { grid-row: span 2; }
          .masonry-item:nth-child(3n) { grid-row: span 1.5; }
        `}
      </style>

      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative bg-[#1A1A1A] text-white min-h-[90vh] flex flex-col hero-curve overflow-hidden"
      >
        <nav className="relative z-20 flex justify-between items-center px-6 md:px-12 py-8">
          <div className="text-2xl font-black tracking-tighter text-yellow-500">
            {name?.split(' ')[0].toUpperCase() || "AHLAN"}
          </div>
          <div className="hidden md:flex gap-8 text-[10px] font-bold uppercase tracking-widest">
            {["Home", "About", "Portfolio", "Services", "Blog"].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-yellow-500 transition-colors">
                {item}
              </a>
            ))}
          </div>
          <div className="md:hidden">
            <Layers className="text-yellow-500" />
          </div>
        </nav>

        <div className="flex-1 max-w-7xl mx-auto w-full px-6 md:px-12 grid md:grid-cols-2 items-center gap-12 py-12 relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="space-y-6"
          >
            <div className="space-y-2">
              <h1 className="text-5xl md:text-7xl font-black leading-tight">
                Hello,<br />
                I'M <span className="text-yellow-500">{name || "Lara Elizabeth"}</span>
              </h1>
              <p className="text-lg md:text-xl text-zinc-400 font-medium tracking-wide">
                {subtitle || "Professional Influencer & Content Creator"}
              </p>
            </div>
            <p className="text-zinc-500 max-w-md leading-relaxed">
              {data.heroDescription || "Helping brands reach their target audience through authentic storytelling and high-impact visual content."}
            </p>
            <div className="flex gap-4 pt-4">
              <button className="px-8 py-4 bg-yellow-500 text-black font-black uppercase tracking-widest text-xs rounded hover:bg-yellow-400 transition-all shadow-xl shadow-yellow-500/20">
                Contact Me
              </button>
            </div>
          </motion.div>

          <motion.div 
            style={{ y: heroY, opacity: heroOpacity }}
            className="relative hidden md:block"
          >
            <div className="relative z-10 rounded-3xl overflow-hidden aspect-[4/5] shadow-2xl grayscale hover:grayscale-0 transition-all duration-1000 border-8 border-white/5">
              <img 
                src={image || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop"} 
                alt={name} 
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-yellow-500/10 rounded-full blur-3xl" />
            <div className="absolute -top-10 -right-10 w-60 h-60 bg-yellow-500/5 rounded-full blur-3xl" />
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30">
          <div className="w-px h-12 bg-gradient-to-b from-yellow-500 to-transparent" />
          <span className="text-[8px] font-black uppercase tracking-[0.4em]">Scroll</span>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 md:py-40 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center">
          <div className="relative">
            <div className="yellow-blob w-full aspect-square absolute top-10 -left-10 opacity-20 animate-pulse" />
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-700">
              <img 
                src={image || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop"} 
                alt="About" 
                className="w-full h-auto"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-yellow-500 p-8 rounded-2xl shadow-xl z-20">
              <span className="block text-4xl font-black text-black">5+</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-black/60">Years Experience</span>
            </div>
          </div>

          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-1 bg-yellow-500" />
                <span className="text-yellow-500 font-black uppercase tracking-widest text-sm">About Me</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-zinc-900 leading-tight">
                I Am a Creative Influencer <br />& Content Specialist
              </h2>
            </div>
            <p className="text-zinc-600 leading-relaxed text-lg">
              {bio || "I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth."}
            </p>
            <div className="grid grid-cols-2 gap-8 pt-4">
              <div>
                <span className="block text-sm font-black uppercase tracking-widest text-zinc-400 mb-1">Followers</span>
                <span className="text-2xl font-black text-zinc-900">{data.details?.stats?.followers || "100K+"}</span>
              </div>
              <div>
                <span className="block text-sm font-black uppercase tracking-widest text-zinc-400 mb-1">Engagement</span>
                <span className="text-2xl font-black text-zinc-900">{data.details?.stats?.engagement || "5.2%"}</span>
              </div>
            </div>
            <button className="px-8 py-4 bg-yellow-500 text-black font-black uppercase tracking-widest text-xs rounded hover:bg-zinc-900 hover:text-white transition-all">
              Download Media Kit
            </button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-zinc-50 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <SectionHeading title="What We Do" subtitle="Specialized Services For Brands" />
          
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -10 }}
                className="bg-white p-12 rounded-3xl shadow-sm hover:shadow-xl transition-all border border-zinc-100 text-center space-y-6"
              >
                <div className="w-20 h-20 bg-yellow-500 rounded-full flex items-center justify-center mx-auto text-black shadow-lg shadow-yellow-500/20">
                  <Layers size={32} />
                </div>
                <h3 className="text-xl font-black uppercase tracking-tight text-zinc-900">{service.title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            ))}
            {services.length === 0 && [1, 2, 3].map((_, i) => (
              <div key={i} className="bg-white p-12 rounded-3xl shadow-sm border border-zinc-100 text-center space-y-6 opacity-40">
                <div className="w-20 h-20 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto" />
                <div className="h-6 w-32 bg-zinc-100 mx-auto rounded" />
                <div className="h-20 w-full bg-zinc-50 rounded" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Media - The "Very Noted" Section */}
      <section className="py-24 md:py-40 bg-[#1A1A1A] text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-yellow-500/5 -skew-x-12 transform translate-x-1/2" />
        
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-1 bg-yellow-500" />
                  <span className="text-yellow-500 font-black uppercase tracking-widest text-sm">Connect & Grow</span>
                </div>
                <h2 className="text-4xl md:text-6xl font-black leading-tight uppercase italic">
                  Digital <span className="text-yellow-500">Presence</span>
                </h2>
              </div>
              <p className="text-zinc-400 text-lg max-w-md">
                Bridging the gap between brands and communities across all major social platforms.
              </p>
              
              <div className="flex flex-wrap gap-4">
                {socialLinks.map((link, i) => (
                  <MagneticButton key={i}>
                    <a 
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-16 h-16 rounded-2xl bg-zinc-800 flex items-center justify-center hover:bg-yellow-500 hover:text-black transition-all duration-500 border border-white/5"
                    >
                      <SocialIcon platform={link.platform} />
                    </a>
                  </MagneticButton>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Instagram", value: "85K", icon: Instagram, color: "text-pink-500" },
                { label: "YouTube", value: "24K", icon: Youtube, color: "text-red-500" },
                { label: "Twitter", value: "12K", icon: Twitter, color: "text-blue-400" },
                { label: "LinkedIn", value: "5K", icon: Linkedin, color: "text-blue-700" },
              ].map((stat, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-white/10 hover:border-yellow-500/50 transition-all group"
                >
                  <stat.icon size={24} className={`${stat.color} mb-4`} />
                  <span className="block text-3xl font-black group-hover:text-yellow-500 transition-colors">{stat.value}</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">{stat.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Gallery */}
      <section id="portfolio" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <SectionHeading title="Visual Gallery" subtitle="Selected Projects & Captures" />
        
        <div className="masonry-grid">
          {projects.map((project, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="masonry-item relative group rounded-2xl overflow-hidden shadow-lg"
            >
              <img 
                src={project.image || "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1000&auto=format&fit=crop"} 
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-8">
                <h4 className="text-white font-black uppercase tracking-tight text-lg">{project.title}</h4>
                <p className="text-yellow-500 text-[10px] font-bold uppercase tracking-widest">{project.description}</p>
              </div>
            </motion.div>
          ))}
          {projects.length === 0 && [1, 2, 3, 4, 5, 6].map((_, i) => (
            <div key={i} className="masonry-item bg-zinc-100 rounded-2xl animate-pulse" />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <button className="px-8 py-4 bg-yellow-500 text-black font-black uppercase tracking-widest text-xs rounded hover:bg-zinc-900 hover:text-white transition-all">
            Load More
          </button>
        </div>
      </section>

      {/* Blog/Latest Feed */}
      <section id="blog" className="py-24 bg-zinc-50 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <SectionHeading title="Latest Insights" subtitle="News, Tips & Adventures" />
          
          <div className="grid md:grid-cols-3 gap-12">
            {blogPosts.map((post, i) => (
              <div key={i} className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all">
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={post.image || `https://images.unsplash.com/photo-${1500000000000 + i * 10000000}?q=80&w=1000&auto=format&fit=crop`} 
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="p-8 space-y-4">
                  <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-zinc-400">
                    <span>{post.date || "Recent Post"}</span>
                    <span className="text-yellow-500">{post.category || "General"}</span>
                  </div>
                  <h3 className="text-xl font-black text-zinc-900 group-hover:text-yellow-500 transition-colors">{post.title}</h3>
                  <p className="text-zinc-500 text-sm line-clamp-3">
                    {post.description}
                  </p>
                  <a href="#" className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-zinc-900 group-hover:gap-4 transition-all">
                    Read More <ArrowUpRight size={14} className="text-yellow-500" />
                  </a>
                </div>
              </div>
            ))}
            {blogPosts.length === 0 && [1, 2, 3].map((_, i) => (
              <div key={i} className="group bg-white rounded-3xl overflow-hidden shadow-sm opacity-40">
                <div className="aspect-video bg-zinc-100" />
                <div className="p-8 space-y-4">
                  <div className="h-4 w-20 bg-zinc-50 rounded" />
                  <div className="h-6 w-full bg-zinc-100 rounded" />
                  <div className="h-20 w-full bg-zinc-50 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 md:px-12 bg-yellow-500 text-center relative overflow-hidden">
        {/* Decorative background text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-black text-black/5 pointer-events-none select-none uppercase italic whitespace-nowrap">
          Creative Force
        </div>
        
        <div className="max-w-5xl mx-auto space-y-10 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <h2 className="text-5xl md:text-8xl font-black text-black uppercase tracking-tighter leading-[0.85] italic">
              {data.details?.ctaTitle || "Ready to Scale Your Brand?"}
            </h2>
            <p className="text-black/60 text-xl md:text-2xl font-bold uppercase italic tracking-widest">
              {data.details?.ctaSubtitle || "Let's create viral content together."}
            </p>
          </motion.div>
          
          <MagneticButton className="inline-block">
            <button 
              onClick={() => window.location.href = `mailto:${data.email || 'hello@lara.com'}`}
              className="px-16 py-6 bg-black text-white font-black uppercase tracking-[0.3em] text-sm rounded-full hover:scale-105 transition-all shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex items-center gap-4 mx-auto"
            >
              Get In Touch <Send size={18} className="text-yellow-500" />
            </button>
          </MagneticButton>
        </div>
      </section>


      {/* Footer */}
      <footer className="py-12 bg-[#1A1A1A] border-t border-white/5 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex gap-4">
            {socialLinks.map((link, i) => (
              <a key={i} href={link.url} className="text-zinc-500 hover:text-yellow-500 transition-colors">
                <SocialIcon platform={link.platform} />
              </a>
            ))}
          </div>
          <div className="text-zinc-600 text-[10px] font-bold uppercase tracking-widest">
            © 2024 {name || "Lara Elizabeth"}. All Rights Reserved.
          </div>
          <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
            Powered by SocialBureau
          </div>
        </div>
      </footer>

      {/* Custom Styles for Editing */}
      {isEditing && (
        <div className="fixed bottom-8 left-8 z-[100] flex gap-4">
          <button className="p-4 bg-white text-black rounded-full shadow-2xl hover:scale-110 transition-transform">
            <Edit3 size={20} />
          </button>
        </div>
      )}
    </div>
  );
};

export default InfluencerTemplate;
