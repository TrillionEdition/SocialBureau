import React, { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Linkedin, Twitter, Instagram, Github, Globe, ExternalLink, Quote, ArrowUpRight } from "lucide-react";

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
      animate={{ x: x * 0.4, y: y * 0.4 }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const AnimatedText = ({ text, className = "" }) => {
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: 0.04 * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.span
      style={{ display: "inline-block", overflow: "hidden" }}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={className}
    >
      {text.split(" ").map((word, index) => (
        <motion.span
          variants={child}
          style={{ display: "inline-block", marginRight: "0.25em" }}
          key={index}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
};

const SocialIcon = ({ platform }) => {
  switch (platform.toLowerCase()) {
    case "linkedin": return <Linkedin size={20} />;
    case "twitter": return <Twitter size={20} />;
    case "instagram": return <Instagram size={20} />;
    case "github": return <Github size={20} />;
    default: return <Globe size={20} />;
  }
};

export const ModernTemplate = ({ data }) => {
  const { name, subtitle, bio, services = [], projects = [], testimonials = [], socialLinks = [], heroImage } = data;
  const [isPortrait, setIsPortrait] = React.useState(false);
  
  React.useEffect(() => {
    if (heroImage) {
      const img = new Image();
      img.src = heroImage;
      img.onload = () => {
        setIsPortrait(img.naturalHeight > img.naturalWidth);
      };
    }
  }, [heroImage]);
  
  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(heroScroll, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(heroScroll, [0, 1], [1, 0.2]);

  return (
    <div className="bg-[#FAF9F6] text-zinc-900 selection:bg-black selection:text-white font-sans antialiased overflow-x-hidden">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className={`relative w-full overflow-hidden bg-[#FAF9F6] flex items-center justify-center px-6 ${isPortrait ? "min-h-[110vh] pt-32 pb-20" : "h-[90vh] md:h-screen"}`}
      >
        {/* Background Layer */}
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="absolute inset-0 z-0 pointer-events-none"
        >
          <img
            src={heroImage || "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop"}
            alt="Hero Background"
            className={`w-full h-full object-cover scale-110 ${isPortrait ? "blur-3xl opacity-30 grayscale" : ""}`}
          />
          <div className={`absolute inset-0 bg-[#FAF9F6] ${isPortrait ? "opacity-60" : "mix-blend-color opacity-90"}`} />
          {!isPortrait && <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#FAF9F6]" />}
        </motion.div>

        <div className="absolute top-12 left-6 md:left-12 z-20 flex items-center gap-4">
          <div className="w-2 h-2 rounded-full bg-lime-400 animate-pulse" />
          <div className="text-[10px] tracking-[0.4em] font-black text-zinc-900 uppercase">
            {name || "EST. 2024"}
          </div>
        </div>

        <div className={`max-w-7xl w-full relative z-10 flex flex-col items-center ${isPortrait ? "md:flex-row md:items-center md:justify-center gap-12 md:gap-24" : "text-center"}`}>
          
          {/* Portrait Image Frame - Only shown in Portrait Mode */}
          {isPortrait && (
            <motion.div 
              initial={{ opacity: 0, y: 40, rotate: -2 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-[300px] md:w-[450px] aspect-[3/4] rounded-[40px] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] border-[12px] border-white z-20"
            >
               <img src={heroImage} alt={name} className="w-full h-full object-cover" />
            </motion.div>
          )}

          <div className={isPortrait ? "flex-1 text-left" : "w-full"}>
            <motion.div
              initial={{ opacity: 0, x: isPortrait ? 50 : 0, scale: isPortrait ? 1 : 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="mb-10"
            >
              <span className="text-[10px] md:text-xs font-black tracking-[0.4em] uppercase text-zinc-400 border border-zinc-200 px-8 py-3 rounded-full bg-white/80 backdrop-blur-xl shadow-xl shadow-black/5">
                {subtitle || "Independent Professional"}
              </span>
            </motion.div>

            <div className={`space-y-[-0.1em] ${isPortrait ? "text-left" : "text-center flex flex-col items-center"}`}>
              <div className="overflow-hidden py-2">
                <motion.h1
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                  className={`${isPortrait ? "text-6xl md:text-[8vw]" : "text-7xl md:text-[12vw]"} font-black leading-[0.8] tracking-tighter text-zinc-900 uppercase`}
                >
                  {name?.split(" ")[0] || "PORTFOLIO."}
                </motion.h1>
              </div>
              {name?.split(" ")[1] && (
                <div className="overflow-hidden py-2">
                  <motion.h1
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className={`${isPortrait ? "text-6xl md:text-[8vw]" : "text-7xl md:text-[12vw]"} font-black leading-[0.8] tracking-tighter text-zinc-900 uppercase italic flex items-center ${isPortrait ? "justify-start" : "justify-center"} gap-[0.2em]`}
                  >
                    <span className="text-zinc-300">/</span> {name?.split(" ")[1]}
                  </motion.h1>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-40">
           <div className="text-[10px] font-black tracking-[0.2em] uppercase">Scroll to explore</div>
           <div className="w-px h-12 bg-zinc-900/20 relative overflow-hidden">
               <motion.div 
                 animate={{ y: ["-100%", "100%"] }}
                 transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                 className="absolute inset-0 bg-zinc-900" 
               />
           </div>
        </div>
      </section>

      {/* Narrative Section */}
      <section className="py-40 px-6 md:px-12 lg:px-24 bg-white relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row gap-20">
              <div className="md:w-1/3">
                  <span className="text-[10px] font-black tracking-[0.3em] uppercase text-zinc-400">01 / The Vision</span>
              </div>
              <div className="md:w-2/3">
                  <AnimatedText 
                    className="text-3xl md:text-5xl font-medium leading-[1.1] tracking-tight text-zinc-900"
                    text={bio || "Driven by excellence and innovation. We transform ideas into measurable reality with precision and strategic action."} 
                  />
              </div>
          </div>
        </div>
      </section>

      {/* Selected Works / Projects */}
      {projects.length > 0 && (
        <section className="py-40 px-6 md:px-12 lg:px-24 bg-zinc-50 border-y border-zinc-100">
           <div className="max-w-7xl mx-auto">
              <div className="flex justify-between items-end mb-24">
                  <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-none">Selected<br />Works</h2>
                  <div className="text-[10px] font-black tracking-[0.3em] uppercase text-zinc-400 hidden md:block">02 / Portfolio</div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-32">
                  {projects.map((project, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: idx * 0.1 }}
                      className={`group cursor-none transition-transform duration-700 ${idx % 2 !== 0 ? "md:mt-32" : ""}`}
                    >
                        <div className="aspect-[4/5] rounded-[40px] overflow-hidden bg-zinc-200 border border-zinc-200 relative mb-10 shadow-2xl shadow-black/10">
                            {project.image ? (
                              <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s] ease-out" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-zinc-400 font-black text-4xl italic">PRJ.{idx + 1}</div>
                            )}
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-[2px]">
                                <div className="p-8 rounded-full bg-white text-black scale-0 group-hover:scale-100 transition-transform duration-500 shadow-2xl">
                                  <ArrowUpRight size={40} />
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-between items-start pr-4">
                           <div className="max-w-xs">
                              <h3 className="text-3xl font-black tracking-tighter uppercase mb-4">{project.title}</h3>
                              <p className="text-zinc-500 text-sm leading-relaxed">{project.description}</p>
                           </div>
                           <span className="text-[10px] font-black text-zinc-300">/ 0{idx + 1}</span>
                        </div>
                    </motion.div>
                  ))}
              </div>
           </div>
        </section>
      )}

      {/* Services Grid */}
      <section className="py-40 px-6 md:px-12 lg:px-24 bg-white relative z-10">
        <div className="max-w-7xl mx-auto">
           <div className="flex items-center gap-12 mb-32">
               <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-none">The<br />Expertise</h2>
               <div className="h-px flex-1 bg-zinc-200" />
               <div className="text-[10px] font-black tracking-[0.3em] uppercase text-zinc-400 hidden md:block">03 / CORE</div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
            {services.map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 * idx }}
                className="group p-10 rounded-[40px] hover:bg-zinc-900 hover:text-white transition-all duration-700 border border-zinc-100 hover:border-zinc-900"
              >
                <div className="text-[10px] font-black tracking-widest text-zinc-400 mb-8 border-b border-zinc-100 group-hover:border-white/10 pb-4">0{idx + 1} // CAPACITY</div>
                <h3 className="text-3xl font-black tracking-tighter mb-6 uppercase leading-tight">{service.title}</h3>
                <p className="text-zinc-500 group-hover:text-zinc-400 leading-relaxed text-sm">{service.description}</p>
              </motion.div>
            ))}
           </div>
        </div>
      </section>

      {/* Testimonials */}
      {testimonials.length > 0 && (
         <section className="py-40 px-6 md:px-12 lg:px-24 bg-zinc-950 text-white rounded-[60px] mx-4 my-10 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-lime-400/10 rounded-full blur-[120px] -mr-64 -mt-64" />
            
            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-32">
                    <Quote className="text-lime-400 mx-auto mb-8" size={60} />
                    <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic">Words of<br />Confidence</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {testimonials.map((t, idx) => (
                      <motion.div 
                        key={idx}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: idx * 0.1 }}
                        className="bg-white/5 backdrop-blur-3xl p-12 rounded-[50px] border border-white/10 hover:border-lime-400/30 transition-colors duration-700 h-full flex flex-col justify-between"
                      >
                          <p className="text-2xl md:text-3xl font-medium tracking-tight mb-12 italic leading-snug">"{t.quote}"</p>
                          <div>
                              <div className="w-12 h-1 bg-lime-400 mb-6" />
                              <p className="text-sm font-black uppercase tracking-[0.2em]">{t.author}</p>
                              <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 mt-1">Verified Partner</p>
                          </div>
                      </motion.div>
                    ))}
                </div>
            </div>
         </section>
      )}

      {/* Multi-Section Footer */}
      <footer className="bg-[#FAF9F6] text-zinc-900 py-32 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-zinc-200 pb-20 mb-20 gap-12">
                <div className="space-y-4">
                    <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-[0.8] mb-4">Let's build<br />something.</h2>
                    <p className="text-zinc-500 text-sm font-medium tracking-tight">Available for high-impact collaborations worldwide.</p>
                </div>
                
                <div className="flex flex-wrap gap-4">
                    {socialLinks.map((link, i) => (
                      <MagneticButton key={i} className="flex">
                        <a 
                          href={link.url} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="w-16 h-16 rounded-full border border-zinc-200 flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition-colors duration-500 shadow-xl shadow-black/5"
                        >
                          <SocialIcon platform={link.platform} />
                        </a>
                      </MagneticButton>
                    ))}
                </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">©{new Date().getFullYear()} // {name} // All Space Reserved</div>
                <div className="flex gap-8 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">
                    <a href="#" className="hover:text-black transition-colors">Privacy Policy</a>
                    <a href="#" className="hover:text-black transition-colors">Terms of Service</a>
                </div>
            </div>
        </div>
      </footer>
    </div>
  );
};

export default ModernTemplate;
