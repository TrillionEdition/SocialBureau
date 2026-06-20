import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const CHOCOLATES = [
  {
    id: "hot-chocolate-lollipop",
    name: "Hot Chocolate Lollipop",
    image: "/assets/suntips-spin/hotchocolate.webp",
    description: "Savor the pure magic of rich, velvety chocolate on a stick. Melt it in warm milk or enjoy it as a decadent treat.",
    accentColor: "#d97706", // Amber
    glowColor: "rgba(217, 119, 6, 0.4)",
    tagline: "MELT & ESCAPE",
    notes: ["Creamy Cocoa", "Slow Melt", "Interactive Treat"],
    bgColor: "from-amber-900/20 to-amber-950/40"
  },
  {
    id: "premium-milk-chocolate-bark",
    name: "Premium Chocolate Bites",
    image: "https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/Chocochi/Chocochi/WhatsApp%20Image%202026-06-19%20at%2018.36.58%20(2).jpeg",
    description: "Crafted for the true chocolate lover. Each bite offers an intense cocoa experience with a buttery, lingering finish.",
    accentColor: "#3c6056", // Dark Green
    glowColor: "rgba(60, 96, 86, 0.4)",
    tagline: "ARTISANAL INDULGENCE",
    notes: ["Rich Butter", "Deep Aroma", "Velvet Finish"],
    bgColor: "from-emerald-950/30 to-stone-950/40"
  },
  {
    id: "cranberry-ruby",
    name: "Cranberry Ruby",
    image: "https://www.chocochi.com/cdn/shop/files/5_1.jpg?v=1776934532&width=1200",
    description: "A sensational pairing of naturally tart premium cranberries and smooth, fruity Ruby chocolate. A feast for the senses.",
    accentColor: "#be185d", // Ruby Rose
    glowColor: "rgba(190, 24, 93, 0.4)",
    tagline: "FRUITY & TART",
    notes: ["Ruby Cacao", "Handpicked Berry", "Floral Notes"],
    bgColor: "from-rose-950/20 to-pink-950/40"
  },
  {
    id: "dark-chocolate-pink-salt",
    name: "Dark Chocolate Pink Salt",
    image: "https://www.chocochi.com/cdn/shop/files/6.jpg?v=1776933961&width=3840",
    description: "Bold 70% dark chocolate meets hand-harvested Himalayan pink salt. A sophisticated sweet and savory masterpiece.",
    accentColor: "#fbbf24", // Gold/Amber
    glowColor: "rgba(251, 191, 36, 0.35)",
    tagline: "SWEET & SAVORY",
    notes: ["70% Dark", "Himalayan Salt", "Bold & Intense"],
    bgColor: "from-stone-900/30 to-amber-950/40"
  },
  {
    id: "signature-plain-milk-pink",
    name: "Signature Plain Milk ",
    image: "https://www.chocochi.com/cdn/shop/files/4.jpg?v=1776935417&width=1200",
    description: "Our signature smooth milk chocolate dressed in an elegant, festive pink wrap. Creamy, comforting, and timeless.",
    accentColor: "#db2777", // Pink
    glowColor: "rgba(219, 39, 119, 0.4)",
    tagline: "CLASSIC COMFORT",
    notes: ["Alpine Milk", "Sweet Harmony", "Luxe Pink Wrap"],
    bgColor: "from-pink-900/20 to-pink-950/40"
  },
  {
    id: "signature-plain-milk-blue",
    name: "Signature Plain Milk (Blue)",
    image: "https://www.chocochi.com/cdn/shop/files/8.jpg?v=1776937430",
    description: "Classic premium milk chocolate presented in our royal blue signature wrap. Rich, buttery, and melts in the mouth.",
    accentColor: "#0284c7", // Blue
    glowColor: "rgba(2, 132, 199, 0.4)",
    tagline: "ROYAL INDULGENCE",
    notes: ["Smooth Solid", "Rich Melt", "Royal Blue Wrap"],
    bgColor: "from-sky-900/20 to-indigo-950/40"
  }
];

export default function Chocochi() {
  const [activeId, setActiveId] = useState(CHOCOLATES[0].id);
  const activeChoc = CHOCOLATES.find((c) => c.id === activeId) || CHOCOLATES[0];

  // Dynamic particle generation
  const [particles, setParticles] = useState([]);
  useEffect(() => {
    const generated = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: Math.random() * 8,
      duration: 6 + Math.random() * 6,
      size: 4 + Math.random() * 6,
    }));
    setParticles(generated);
  }, []);

  // Auto-rotation slider logic (cycles every 5 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveId((prevId) => {
        const currentIndex = CHOCOLATES.findIndex((c) => c.id === prevId);
        const nextIndex = (currentIndex + 1) % CHOCOLATES.length;
        return CHOCOLATES[nextIndex].id;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [activeId]);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#0a0503] font-sans text-white select-none flex flex-col justify-between">
      {/* CSS Keyframe Animations Injection */}
      <style>{`
        @keyframes orbit {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(2deg); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.25; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.08); }
        }
        @keyframes rise {
          0% { transform: translateY(110vh) rotate(0deg); opacity: 0; }
          10% { opacity: 0.6; }
          90% { opacity: 0.6; }
          100% { transform: translateY(-10vh) rotate(360deg); opacity: 0; }
        }
        .orbit-ring {
          animation: orbit 15s linear infinite;
        }
        .float-logo {
          animation: float-slow 6s ease-in-out infinite;
        }
        .ambient-glow {
          animation: pulse-slow 8s ease-in-out infinite;
        }
        .particle {
          animation: rise linear infinite;
        }
      `}</style>

      {/* Dynamic Background Glow Layer */}
      <div 
        className="absolute inset-0 transition-all duration-1000 ease-out z-0 ambient-glow pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${activeChoc.glowColor} 0%, rgba(10,5,3,0) 70%)`
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-950/10 via-transparent to-transparent pointer-events-none z-0" />
      
      {/* Cyber Grid Background */}
      <div 
        className="absolute inset-0 opacity-15 pointer-events-none z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Floating Cocoa Gold Sparkles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute bottom-0 rounded-full bg-gradient-to-t from-amber-400 to-yellow-200 opacity-60 particle"
            style={{
              left: p.left,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              filter: "blur(1px)",
            }}
          />
        ))}
      </div>

      {/* Header Bar */}
      <header className="relative w-full z-30 px-6 py-6 md:px-12 flex items-center justify-between bg-gradient-to-b from-[#0a0503] to-transparent">
        <Link 
          to="/"
          className="flex items-center gap-2.5 group text-white/60 hover:text-white transition-all text-sm tracking-widest font-bold uppercase"
        >
          <span className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:border-white transition-all">
            <i className="fa-solid fa-arrow-left text-[11px]" />
          </span>
          BACK
        </Link>
      </header>

      {/* Main Content Arena */}
      <main className="relative flex-1 w-full max-w-[1500px] mx-auto px-4 md:px-12 flex flex-col md:flex-row items-center justify-between z-10 overflow-hidden">
        
        {/* Left Column: Cards 1 - 3 (Desktop Only) */}
        <div className="hidden md:flex flex-col gap-8 w-1/4 items-start pl-4 z-20">
          {CHOCOLATES.slice(0, 3).map((choc) => {
            const isActive = choc.id === activeId;
            return (
              <motion.div
                key={choc.id}
                onClick={() => setActiveId(choc.id)}
                whileHover={{ x: 16, scale: 1.03 }}
                className={`relative flex items-center gap-5 p-4 rounded-2xl cursor-pointer transition-all duration-500 w-[400px] border ${
                  isActive 
                    ? "bg-white/10 border-white/20 shadow-[0_15px_35px_rgba(0,0,0,0.6)] backdrop-blur-md" 
                    : "bg-white/0 border-transparent hover:bg-white/5"
                }`}
              >
                <div className="relative w-36 h-36 rounded-xl overflow-hidden bg-white border border-white/10 shrink-0 shadow-lg">
                  <img src={choc.image} alt={choc.name} className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" />
                  {isActive && (
                    <div 
                      className="absolute inset-0 animate-pulse pointer-events-none"
                      style={{ boxShadow: `inset 0 0 16px ${choc.accentColor}` }}
                    />
                  )}
                </div>
                <div className="flex flex-col min-w-0 gap-1.5">
                  <span className="text-xs tracking-widest opacity-40 font-bold uppercase" style={{ color: choc.accentColor }}>
                    {choc.tagline}
                  </span>
                  <span className="text-lg font-bold tracking-wide">{choc.name}</span>
                </div>
                {isActive && (
                  <motion.div 
                    layoutId="activeIndicatorLeft"
                    className="absolute right-3 w-2 h-2 rounded-full"
                    style={{ backgroundColor: choc.accentColor }}
                  />
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Center Column: Logo Showcase + Selected Details */}
        <div className="flex-1 flex flex-col items-center justify-center text-center h-full max-w-xl mx-auto px-4 z-10">
          {/* Logo Spotlight */}
          <div className="relative flex items-center justify-center w-72 h-72 md:w-[380px] md:h-[380px] mb-8 shrink-0 float-logo">
            {/* Spinning Golden Orbit Ring */}
            <div className="absolute inset-0 rounded-full border border-dashed border-amber-500/30 orbit-ring pointer-events-none" />
            <div className="absolute inset-6 rounded-full border border-double border-white/5 orbit-ring pointer-events-none" />
            
            {/* Logo Backdrop Glow */}
            <div 
              className="absolute inset-10 rounded-3xl blur-3xl opacity-60 transition-all duration-1000"
              style={{ backgroundColor: activeChoc.accentColor }}
            />
            
            {/* Central Logo Container */}
            <div className="absolute inset-10 rounded-3xl bg-stone-950/70 border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.85)] backdrop-blur-md p-10 flex items-center justify-center">
              <img 
                src="https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/Chocochi/Chocochi/Untitled%20(4).png" 
                alt="Chocochi QR Code" 
                className="w-full h-full object-contain filter drop-shadow-[0_6px_18px_rgba(251,191,36,0.45)] transition-transform duration-500 hover:scale-105"
              />
            </div>
          </div>

          {/* Active Product Details with AnimatePresence */}
          <div className="h-56 md:h-60 flex flex-col items-center justify-start w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeChoc.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-center w-full"
              >
                <span 
                  className="text-xs md:text-sm font-bold tracking-[0.4em] uppercase transition-colors duration-500"
                  style={{ color: activeChoc.accentColor }}
                >
                  {activeChoc.tagline}
                </span>
                
                <h1 className="text-3xl md:text-5xl font-black tracking-wide mt-1.5 mb-3 bg-gradient-to-r from-white via-stone-100 to-stone-400 bg-clip-text text-transparent">
                  {activeChoc.name}
                </h1>
                
                <p className="text-sm md:text-base text-stone-300 leading-relaxed font-medium max-w-md">
                  {activeChoc.description}
                </p>

                {/* Flavor Notes Capsules */}
                <div className="flex flex-wrap justify-center gap-2.5 mt-5">
                  {activeChoc.notes.map((note) => (
                    <span 
                      key={note}
                      className="px-4 py-1.5 rounded-full text-[10px] md:text-xs font-semibold tracking-wider bg-white/5 border border-white/10 uppercase text-stone-200"
                    >
                      {note}
                    </span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Right Column: Cards 4 - 6 (Desktop Only) */}
        <div className="hidden md:flex flex-col gap-8 w-1/4 items-end pr-4 z-20">
          {CHOCOLATES.slice(3, 6).map((choc) => {
            const isActive = choc.id === activeId;
            return (
              <motion.div
                key={choc.id}
                onClick={() => setActiveId(choc.id)}
                whileHover={{ x: -16, scale: 1.03 }}
                className={`relative flex items-center justify-end gap-5 p-4 rounded-2xl cursor-pointer transition-all duration-500 w-[400px] border text-right ${
                  isActive 
                    ? "bg-white/10 border-white/20 shadow-[0_15px_35px_rgba(0,0,0,0.6)] backdrop-blur-md" 
                    : "bg-white/0 border-transparent hover:bg-white/5"
                }`}
              >
                <div className="flex flex-col min-w-0 text-right items-end gap-1.5">
                  <span className="text-xs tracking-widest opacity-40 font-bold uppercase" style={{ color: choc.accentColor }}>
                    {choc.tagline}
                  </span>
                  <span className="text-lg font-bold tracking-wide">{choc.name}</span>
                </div>
                <div className="relative w-36 h-36 rounded-xl overflow-hidden bg-white border border-white/10 shrink-0 shadow-lg">
                  <img src={choc.image} alt={choc.name} className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" />
                  {isActive && (
                    <div 
                      className="absolute inset-0 animate-pulse pointer-events-none"
                      style={{ boxShadow: `inset 0 0 16px ${choc.accentColor}` }}
                    />
                  )}
                </div>
                {isActive && (
                  <motion.div 
                    layoutId="activeIndicatorRight"
                    className="absolute left-3 w-2 h-2 rounded-full"
                    style={{ backgroundColor: choc.accentColor }}
                  />
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Mobile Horizontal Carousel (Mobile Only) */}
        <div className="flex md:hidden w-full overflow-x-auto gap-4 py-4 px-2 no-scrollbar z-20" style={{ scrollbarWidth: 'none' }}>
          {CHOCOLATES.map((choc) => {
            const isActive = choc.id === activeId;
            return (
              <div
                key={choc.id}
                onClick={() => setActiveId(choc.id)}
                className={`flex-none w-60 p-3 rounded-2xl border transition-all duration-500 flex flex-col items-center text-center gap-2 ${
                  isActive 
                    ? "bg-white/10 border-white/20 shadow-[0_10px_20px_rgba(0,0,0,0.4)] backdrop-blur-md" 
                    : "bg-white/5 border-transparent hover:bg-white/10"
                }`}
              >
                <div className="w-44 h-44 rounded-xl overflow-hidden bg-white border border-white/10 shadow-md">
                  <img src={choc.image} alt={choc.name} className="w-full h-full object-cover" />
                </div>
                <span className="text-[9px] font-bold tracking-widest truncate w-full" style={{ color: choc.accentColor }}>
                  {choc.tagline}
                </span>
                <span className="text-xs font-bold tracking-wide truncate w-full">{choc.name}</span>
              </div>
            );
          })}
        </div>

      </main>

      {/* Footer Navigation indicators */}
      <footer className="relative w-full z-30 px-6 py-6 flex items-center justify-center border-t border-white/5 bg-gradient-to-t from-[#0a0503]/80 to-transparent backdrop-blur-xs">
        <div className="flex items-center gap-3">
          {CHOCOLATES.map((choc) => (
            <button
              key={choc.id}
              onClick={() => setActiveId(choc.id)}
              className={`w-8 h-1.5 rounded-full transition-all duration-500 ${
                choc.id === activeId ? "w-12" : "opacity-30"
              }`}
              style={{ backgroundColor: choc.accentColor }}
            />
          ))}
        </div>
      </footer>
    </div>
  );
}
