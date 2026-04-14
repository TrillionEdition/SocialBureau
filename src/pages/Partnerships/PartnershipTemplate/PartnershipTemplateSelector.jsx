import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Check, Layout, Sparkles } from "lucide-react";

const templates = [
  {
    id: "template1",
    name: "The Modernist",
    description: "A premium, high-impact design inspired by cutting-edge business agencies. Minimalist, bold, and interactive.",
    preview: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000&auto=format&fit=crop",
    features: ["Smooth Scroll", "Glassmorphism", "Dynamic Stacking", "Mobile Optimized"]
  },
  {
    id: "minimal",
    name: "Clean Slate",
    description: "Focused entirely on content and clarity. Perfect for individual consultants and writers.",
    preview: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1000&auto=format&fit=crop",
    features: ["Fast Loading", "Typography Focused", "Grid Layout", "Dark Mode Ready"],
    comingSoon: true
  }
];

const PartnershipTemplateSelector = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState("template1");

  // Check authentication
  React.useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/partners/register?redirect=/partners/select-template");
    }
  }, [navigate]);

  const handleSelect = (id) => {
    setSelected(id);
  };

  const handleContinue = () => {
    navigate(`/partners/create-portfolio?template=${selected}`);
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-16">
          <div>
            <h1 className="text-5xl font-bold mb-4 tracking-tighter">Choose Your Template</h1>
            <p className="text-gray-400 text-lg">Pick a professional layout that matches your vision.</p>
          </div>
          <button onClick={() => navigate(-1)} className="p-3 rounded-full bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 transition">
            <ArrowLeft />
          </button>
        </div>

        {/* Template Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {templates.map((tpl) => (
            <motion.div
              key={tpl.id}
              whileHover={!tpl.comingSoon ? { y: -10 } : {}}
              onClick={() => !tpl.comingSoon && handleSelect(tpl.id)}
              className={`relative rounded-[32px] overflow-hidden border-2 transition-all duration-500 cursor-pointer ${
                selected === tpl.id ? "border-lime-400 shadow-[0_0_40px_rgba(163,230,53,0.1)]" : "border-zinc-800 opacity-60 grayscale hover:grayscale-0 hover:opacity-100"
              } ${tpl.comingSoon ? "cursor-not-allowed" : ""}`}
            >
              {/* Preview Image */}
              <div className="aspect-[16/10] overflow-hidden relative">
                <img src={tpl.preview} alt={tpl.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                
                {tpl.comingSoon && (
                  <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
                    <span className="bg-zinc-800 text-zinc-400 px-6 py-2 rounded-full text-sm font-bold tracking-widest uppercase">Coming Soon</span>
                  </div>
                )}

                {selected === tpl.id && (
                  <div className="absolute top-6 right-6 bg-lime-400 text-black p-2 rounded-full">
                    <Check size={20} strokeWidth={3} />
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-8 bg-zinc-900/80 backdrop-blur-xl">
                <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
                  {tpl.name}
                  <Sparkles size={18} className="text-lime-400" />
                </h3>
                <p className="text-gray-400 mb-6 text-sm leading-relaxed">{tpl.description}</p>
                
                <div className="flex flex-wrap gap-2">
                  {tpl.features.map((f, i) => (
                    <span key={i} className="text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full bg-zinc-800 text-zinc-400 border border-zinc-700">
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer Action */}
        <div className="mt-16 text-center">
           <button
            onClick={handleContinue}
            className="px-12 py-5 rounded-full bg-white text-black text-xl font-black hover:bg-lime-400 transition-all shadow-2xl hover:scale-105 active:scale-95 flex items-center gap-4 mx-auto"
          >
            Start Building My Portfolio <Layout size={24} />
          </button>
          <p className="mt-6 text-zinc-500 text-sm">You can change your data later at any time.</p>
        </div>
      </div>
    </div>
  );
};

export default PartnershipTemplateSelector;
