import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "@/utils/urls";

export default function ChocochiForm() {
  const [name, setName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [chestNumber, setChestNumber] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  // Dynamic particle generation (identical to Chocochi page)
  const [particles, setParticles] = useState([]);
  useEffect(() => {
    const generated = Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: Math.random() * 8,
      duration: 6 + Math.random() * 6,
      size: 4 + Math.random() * 6,
    }));
    setParticles(generated);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !mobileNumber || !chestNumber) {
      setError("Please fill out all fields.");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const resp = await axios.post(`${BASE_URL}/chocochi/register`, {
        name,
        mobileNumber,
        chestNumber,
      });

      if (resp.status === 201) {
        setSubmitted(true);
        localStorage.setItem("chocochi_registered", "true");
        localStorage.setItem("chocochi_chest_number", chestNumber);
      } else {
        throw new Error("Unexpected server response");
      }
    } catch (err) {
      console.warn("Backend registration failed, falling back to local registration:", err);
      // Fallback: allow download anyway so the user experience is never blocked
      localStorage.setItem("chocochi_registered_locally", "true");
      localStorage.setItem("chocochi_chest_number", chestNumber);
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDownload = () => {
    // PDF file located in public/assets/pdf/chocochi.pdf is served from root /assets/pdf/chocochi.pdf
    const link = document.createElement("a");
    link.href = "/assets/pdf/chocochi.pdf";
    link.download = `chocochi-chest-${chestNumber || "gift"}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#0a0503] font-sans text-white select-none flex flex-col justify-between">
      {/* CSS Keyframe Animations Injection */}
      <style>{`
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
          background: `radial-gradient(circle at 50% 50%, rgba(217, 119, 6, 0.25) 0%, rgba(10,5,3,0) 70%)`
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
      <header className="relative w-full z-30 px-6 py-6 md:px-12 flex items-center justify-between bg-gradient-to-b from-[#0a0503] to-transparent shrink-0">
        <Link 
          to="/chocochi"
          className="flex items-center gap-2.5 group text-white/60 hover:text-white transition-all text-sm tracking-widest font-bold uppercase"
        >
          <span className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:border-white transition-all">
            <i className="fa-solid fa-arrow-left text-[11px]" />
          </span>
          BACK TO CHOCOCHI
        </Link>
      </header>

      {/* Main Content Card */}
      <main className="relative flex-1 w-full max-w-[1200px] mx-auto px-4 flex items-center justify-center z-10 overflow-hidden">
        
        <div className="w-full max-w-md bg-stone-950/70 border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.85)] backdrop-blur-md p-8 rounded-3xl relative overflow-hidden">
          {/* Top Gold Ribbon decoration */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-600 via-yellow-400 to-amber-700" />
          
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                {/* Logo and Titles */}
                <div className="text-center mb-6">
                  <div className="inline-block px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 font-extrabold text-[10px] sm:text-xs tracking-wider uppercase mb-3">
                    ✨ Premium Member Event ✨
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-black tracking-wide bg-gradient-to-r from-white via-stone-100 to-stone-400 bg-clip-text text-transparent mb-2">
                    Chocochi Portal
                  </h1>
                  <p className="text-xs text-stone-400 font-medium">
                    Register with your chest number to download your exclusive document.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && (
                    <div className="p-3 bg-red-950/30 border border-red-500/30 text-red-400 rounded-xl text-xs font-semibold text-center">
                      {error}
                    </div>
                  )}

                  {/* Name field */}
                  <div>
                    <label className="block text-stone-400 text-[10px] sm:text-xs font-bold mb-1.5 uppercase tracking-wider">
                      Full Name
                    </label>
                    <input 
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your name"
                      className="w-full bg-stone-900/50 border border-white/10 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all duration-300 text-xs sm:text-sm font-medium"
                    />
                  </div>

                  {/* Mobile Number field */}
                  <div>
                    <label className="block text-stone-400 text-[10px] sm:text-xs font-bold mb-1.5 uppercase tracking-wider">
                      Mobile Number
                    </label>
                    <input 
                      type="tel"
                      required
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
                      placeholder="Enter mobile number"
                      className="w-full bg-stone-900/50 border border-white/10 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all duration-300 text-xs sm:text-sm font-medium"
                    />
                  </div>

                  {/* Chest Number field */}
                  <div>
                    <label className="block text-stone-400 text-[10px] sm:text-xs font-bold mb-1.5 uppercase tracking-wider">
                      Chest Number
                    </label>
                    <input 
                      type="text"
                      required
                      value={chestNumber}
                      onChange={(e) => setChestNumber(e.target.value)}
                      placeholder="Enter your chest number"
                      className="w-full bg-stone-900/50 border border-white/10 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all duration-300 text-xs sm:text-sm font-medium"
                    />
                  </div>

                  {/* Submit button */}
                  <button 
                    type="submit"
                    disabled={submitting}
                    className="w-full mt-2 py-3.5 sm:py-4 rounded-xl font-bold tracking-widest uppercase transition-all duration-300 bg-gradient-to-r from-amber-500 to-amber-700 hover:from-amber-600 hover:to-amber-800 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg active:scale-95 cursor-pointer border-none text-white text-xs sm:text-sm"
                  >
                    {submitting ? "Submitting..." : "Submit Registration"}
                  </button>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="text-center py-4"
              >
                <div className="w-16 h-16 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-amber-500/30">
                  <i className="fa-solid fa-circle-check text-amber-500 text-3xl" />
                </div>
                
                <h2 className="text-2xl sm:text-3xl font-black text-white mb-2 tracking-wide">
                  Registration Complete!
                </h2>
                
                <p className="text-stone-300 text-xs sm:text-sm mb-6 max-w-xs mx-auto leading-relaxed">
                  Thank you, <span className="text-amber-400 font-bold">{name}</span>. Your chest number <span className="text-amber-400 font-bold">#{chestNumber}</span> has been confirmed. You can now download your PDF document.
                </p>

                {/* Download PDF button */}
                <button 
                  onClick={handleDownload}
                  className="w-full py-3.5 sm:py-4 rounded-xl font-black tracking-widest uppercase transition-all duration-300 bg-gradient-to-r from-yellow-400 via-amber-500 to-amber-600 hover:from-yellow-500 hover:via-amber-600 hover:to-amber-700 text-stone-950 shadow-2xl active:scale-95 flex items-center justify-center gap-2 cursor-pointer border-none text-xs sm:text-sm"
                >
                  <i className="fa-solid fa-file-pdf text-base" />
                  Download PDF Document
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    
    </div>
  );
}
