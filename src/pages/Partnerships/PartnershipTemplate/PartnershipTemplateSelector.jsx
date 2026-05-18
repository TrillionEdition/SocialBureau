import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Check, Layout, ChevronRight, LogOut, ArrowRight, MousePointer2 } from "lucide-react";
import Logout from "../../../components/Logout";
import { BASE_URL } from "@/utils/urls";

const templates = [
  {
    id: "template1",
    name: "Modernist",
    type: "Digital Vessel 01",
    description: "A high-impact, clinical architecture designed for world-class digital dominance.",
    preview: "https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/portfolio1_rgyorf.webp",
    tags: ["Clinical", "Glass", "Parallax"]
  },
  {
    id: "influencer",
    name: "Influencer",
    type: "Digital Vessel 02",
    description: "A professional design for content creators, with focus on social presence and visual storytelling.",
    preview: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop",
    tags: ["Creator", "Vibrant", "Social"],
  },
  {
    id: "minimal",
    name: "Elite",
    type: "Digital Vessel 03",
    description: "A narrative-focused authority engine for executive leaders and visionaries.",
    preview: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1000&auto=format&fit=crop",
    tags: ["Narrative", "Grid", "Typography"],
    comingSoon: true
  }
];

const PartnershipTemplateSelector = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState("template1");
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/partners/register");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-[#E8001A] font-sans antialiased overflow-x-hidden">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_20%,_rgba(232,0,26,0.05),transparent_50%)]" />
        <div className="absolute bottom-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_80%,_rgba(255,255,255,0.02),transparent_40%)]" />
      </div>

      {/* Persistent Navigation */}
      <nav className="fixed top-0 left-0 w-full p-6 md:p-8 flex justify-between items-center z-[110] mix-blend-difference">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-4">
          <div className="w-10 h-[1px] bg-white/20" />
        </motion.div>
        <div className="flex items-center gap-6 md:gap-10">
           <div className="flex items-center gap-4 border-r border-white/10 pr-6 md:pr-10">
              <Logout />
           </div>
           <button onClick={() => navigate(-1)} className="group flex items-center gap-3">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] italic text-white/40 group-hover:text-white transition-colors">Return</span>
              <ArrowLeft size={16} className="text-white/20 group-hover:-translate-x-1 transition-transform" />
           </button>
        </div>
      </nav>

      <main className="max-w-[1800px] mx-auto px-8 md:px-12 pt-20 pb-20 relative z-10">
        {/* Extreme Typography Header */}
        <header className="mb-12">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-tight">
              Choose your <br />
              <span className="bg-gradient-to-tr from-[#E8001A] via-[#FF5C35] to-[#FF1493] bg-clip-text text-transparent">portfolio design.</span>
            </h1>
          </motion.div>
        </header>

        {/* Minimalist Asymmetrical Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 lg:gap-32">
          {templates.map((tpl, idx) => (
            <motion.div
              key={tpl.id}
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              onMouseEnter={() => setHovered(tpl.id)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => !tpl.comingSoon && setSelected(tpl.id)}
              className={`relative cursor-pointer transition-all duration-700 ${
                idx === 0 ? "lg:col-span-7" : "lg:col-span-5 lg:mt-32"
              } ${selected === tpl.id ? "z-20" : "z-10"}`}
            >
              {/* Floating ID Tag */}
              <div className="absolute -top-12 left-0 flex items-center gap-4">
                <span className="text-[10px] font-black text-white/20 italic">{tpl.type}</span>
                <div className={`h-[1px] transition-all duration-700 ${selected === tpl.id ? "w-20 bg-[#E8001A]" : "w-0 bg-white/10"}`} />
              </div>

              {/* Image Vessel */}
              <div className={`relative aspect-[6966/3267] overflow-hidden transition-all duration-1000 ease-[0.16, 1, 0.3, 1] ${
                selected === tpl.id ? "shadow-[0_60px_120px_rgba(232,0,26,0.2)]" : "grayscale opacity-30 scale-95"
              }`}>
                <motion.img 
                  animate={{ scale: hovered === tpl.id ? 1.05 : 1 }}
                  transition={{ duration: 2 }}
                  src={tpl.preview} 
                  alt={tpl.name} 
                  className="w-full h-full object-cover" 
                />
                <div className={`absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent transition-opacity duration-1000 ${selected === tpl.id ? "opacity-60" : "opacity-90"}`} />
                
                {tpl.comingSoon && (
                  <div className="absolute inset-0 bg-black/40 backdrop-blur-xl flex items-center justify-center">
                    <span className="text-[10px] font-black tracking-[0.5em] uppercase italic text-white/20">Module Pending</span>
                  </div>
                )}

                {/* Selection Indicator */}
                <AnimatePresence>
                  {selected === tpl.id && (
                    <motion.div 
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      className="absolute top-10 right-10 w-16 h-16 rounded-full bg-[#E8001A] flex items-center justify-center shadow-2xl"
                    >
                      <Check size={32} strokeWidth={4} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Content Block */}
              <div className="mt-12 space-y-6">
                <div className="flex items-end justify-between border-b border-white/5 pb-8">
                  <div>
                    <h3 className={`text-3xl font-bold tracking-tight transition-colors duration-700 ${selected === tpl.id ? "text-white" : "text-white/20"}`}>
                      {tpl.name}
                    </h3>
                    <p className="text-white/50 text-sm font-light mt-4 max-w-sm leading-relaxed">{tpl.description}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                     {tpl.tags.map(tag => (
                       <span key={tag} className="text-[10px] font-bold text-white/20">{tag}</span>
                     ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tactical Footer */}
        <footer className="mt-40 flex flex-col items-center">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              const route = selected === "influencer" ? "/partners/create-influencer" : "/partners/create-portfolio";
              navigate(`${route}?template=${selected}`);
            }}
            className="group relative px-16 py-6 overflow-hidden rounded-2xl transition-all duration-500"
          >
            {/* Animated Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#E8001A] via-[#FF3B5C] to-[#E8001A] bg-[length:200%_100%] group-hover:animate-gradient-shift" />
            
            {/* Glow Effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[0_0_40px_rgba(232,0,26,0.6)]" />
            
            <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            
            <span className="relative z-10 text-white group-hover:text-black text-sm font-black uppercase tracking-[0.2em] flex items-center gap-4">
              Start building
              <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform duration-500" />
            </span>
          </motion.button>
          
        </footer>
      </main>


      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        .animate-gradient-shift {
          animation: gradient-shift 3s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default PartnershipTemplateSelector;
