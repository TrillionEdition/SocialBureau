import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

/**
 * CyberBackground - A premium, award-winning section featuring a portrait image
 * with cinematic blurred side effects and smooth scroll-based interactions.
 */
export function CyberBackground() {
  const navigate = useNavigate();

  // Static layout — simplified to remove extra scroll spacing and animations

  return (
    <div className="relative min-h-screen bg-black flex items-center">
      <div className="w-full flex items-center justify-center py-24">
        {/* Content Overlay */}
        <motion.div
          className="relative z-30 text-center px-6 max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-8xl font-black text-white mb-6 tracking-tighter leading-[0.9]">
            World’s First
            <br />
            <span className="bg-gradient-to-r from-white via-white/80 to-white/40 bg-clip-text text-transparent">
              API-Driven
            </span>
            <br />
            Marketing Agency
          </h1>

          <p className="text-sm md:text-lg text-white/60 max-w-2xl mx-auto mb-12 font-medium tracking-wide">
            Automate, Integrate, and Scale Your Marketing powered by real-time
            <br className="hidden md:block" />
            data, AI, and performance APIs.
          </p>

          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
            <button
              onClick={() => navigate("/services")}
              className="text-white hover:text-white/70 font-bold text-sm uppercase tracking-[0.2em] transition-all"
            >
              Get Started
            </button>
            <button
              onClick={() => navigate("/services")}
              className="px-10 py-4 bg-transparent border border-white/20 hover:border-white/60 text-white rounded-full font-bold text-xs uppercase tracking-[0.2em] transition-all backdrop-blur-sm"
            >
              Explore Our Solutions
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default CyberBackground;
