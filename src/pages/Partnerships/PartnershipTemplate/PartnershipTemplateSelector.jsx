import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Check, Layout, Sparkles, ChevronRight, LogOut } from "lucide-react";
import Logout from "../../../components/Logout";

const templates = [
  {
    id: "template1",
    name: "The Modernist",
    description: "A premium, high-impact design inspired by cutting-edge digital agencies. Minimalist, bold, and world-class.",
    preview: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000&auto=format&fit=crop",
    features: ["Smooth Scroll", "Glassmorphism", "Dynamic Parallax", "Clinical Layout"]
  },
  {
    id: "minimal",
    name: "Elite Vision",
    description: "Focused entirely on narrative and authority. Perfect for executive consultants and thought leaders.",
    preview: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1000&auto=format&fit=crop",
    features: ["Fast Response", "Typography Focus", "Grid System", "Verified Badge"],
    comingSoon: true
  }
];

const PartnershipTemplateSelector = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState("template1");

  React.useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) navigate("/partners/create-portfolio");
  }, [navigate]);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white selection:bg-[#E8001A] selection:text-white font-sans antialiased overflow-x-hidden p-6 md:p-10 lg:p-16">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-[#E8001A]/5 blur-[140px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <header className="mb-16 md:mb-24 flex flex-col md:flex-row justify-between items-start md:items-end gap-10 md:gap-12">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
            <span className="text-[8px] md:text-[9px] font-black text-[#E8001A] uppercase tracking-[0.3em] md:tracking-[0.4em] mb-2 block underline underline-offset-4 decoration-1 italic">Design Selector</span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter leading-[0.9] md:leading-[0.85] uppercase italic">
              Select Your<br /><span className="bg-gradient-to-tr from-[#E8001A] via-[#FF5C35] to-[#FF1493] bg-clip-text text-transparent">Digital Vessel.</span>
            </h1>
          </motion.div>
          <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end border-t border-white/5 pt-8 md:pt-0 md:border-0">
            <Logout />
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate(-1)} 
              className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:bg-[#E8001A] hover:border-[#E8001A] transition-all group"
            >
              <ArrowLeft className="text-white/40 group-hover:text-white transition-colors" />
            </motion.button>
          </div>
        </header>

        {/* Template Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {templates.map((tpl, idx) => (
            <motion.div
              key={tpl.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => !tpl.comingSoon && setSelected(tpl.id)}
              className={`group relative rounded-[32px] md:rounded-[48px] overflow-hidden border-2 transition-all duration-700 cursor-pointer ${
                selected === tpl.id ? "border-[#E8001A] shadow-[0_40px_100px_rgba(232,0,26,0.15)]" : "border-white/5 opacity-50 grayscale hover:opacity-100"
              } ${tpl.comingSoon ? "cursor-not-allowed" : ""}`}
            >
              {/* Preview Image with Mask */}
              <div className="aspect-[16/11] overflow-hidden relative">
                <img src={tpl.preview} alt={tpl.name} className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/20 to-transparent" />
                
                {tpl.comingSoon && (
                  <div className="absolute inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center">
                    <span className="bg-white/5 text-white/20 border border-white/10 px-6 md:px-8 py-3 rounded-full text-[8px] md:text-[10px] font-black tracking-[0.3em] md:tracking-[0.4em] uppercase italic">Module Pending</span>
                  </div>
                )}

                <div className="absolute top-6 md:top-8 right-6 md:right-8 transition-all duration-700">
                  <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all ${selected === tpl.id ? "bg-[#E8001A] scale-100" : "bg-white/10 scale-0"}`}>
                    <Check size={20} md:size={24} strokeWidth={4} />
                  </div>
                </div>
              </div>

              {/* Information Panel */}
              <div className="p-6 md:p-10 bg-[#0F0F0F]/80 backdrop-blur-3xl">
                <div className="flex items-center gap-4 mb-3 md:mb-5">
                   <h3 className="text-xl md:text-2xl font-black tracking-tighter uppercase italic">{tpl.name}</h3>
                   <Sparkles size={16} md:size={18} className="text-[#E8001A]" />
                </div>
                <p className="text-white/40 mb-6 md:mb-8 text-xs md:text-sm font-light italic leading-relaxed">{tpl.description}</p>
                
                <div className="flex flex-wrap gap-2 md:gap-3">
                  {tpl.features.map((f, i) => (
                    <span key={i} className="text-[8px] md:text-[9px] font-black tracking-widest uppercase px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-white/5 text-white/30 border border-white/5 group-hover:border-[#E8001A]/20 transition-colors">
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tactical Action */}
        <footer className="mt-12 md:mt-16 text-center">
           <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(`/partners/create-portfolio?template=${selected}`)}
            className="group px-8 md:px-12 py-4 md:py-5 rounded-full bg-white text-black text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] md:tracking-[0.4em] hover:bg-[#E8001A] hover:text-white transition-all shadow-[0_40px_100px_rgba(255,255,255,0.1)] hover:shadow-[#E8001A]/30 flex items-center gap-4 md:gap-5 mx-auto italic"
          >
            Forge Digital Legacy <ChevronRight size={16} md:size={18} className="group-hover:translate-x-2 transition-transform" />
          </motion.button>
          <p className="mt-6 md:mt-8 text-white/10 text-[7px] md:text-[8px] font-black uppercase tracking-[0.4em] md:tracking-[0.5em] italic">Clinical Architecture // Permanent Identity</p>
        </footer>
      </div>
    </div>
  );
};

export default PartnershipTemplateSelector;

