import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useNavigate } from "react-router-dom";

/**
 * CyberBackground - A premium, award-winning section featuring a portrait image
 * with cinematic blurred side effects and smooth scroll-based interactions.
 */
export function CyberBackground() {
  const navigate = useNavigate();
  const containerRef = useRef(null);

  // Track scroll progress within this tall section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Clip Path Animation: Small circle in center -> Full screen
  const clipPath = useTransform(
    scrollYProgress,
    [0, 0.8],
    ["circle(0% at 50% 50%)", "circle(150% at 50% 50%)"],
  );

  // Content Opacity: Fades in only after the hole has opened significantly
  const contentOpacity = useTransform(scrollYProgress, [0.7, 0.9], [0, 1]);
  const contentY = useTransform(scrollYProgress, [0.7, 0.9], [50, 0]);

  // Image zoom effect
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.2, 1]);
  const imageBlur = useTransform(scrollYProgress, [0.8, 1], ["0px", "4px"]);

  const imageSrc = "/assets/sham.jpg";

  return (
    <div ref={containerRef} className="relative h-[400vh] bg-black">
      {/* Sticky Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Grain Overlay */}
        <div className="absolute inset-0 z-20 pointer-events-none opacity-[0.15] mix-blend-overlay">
          <svg
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
          >
            {/* <filter id="noiseFilter">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.65"
                numOctaves="3"
                stitchTiles="stitch"
              />
            </filter> */}
            <rect width="100%" height="100%" filter="url(#noiseFilter)" />
          </svg>
        </div>

        {/* Masked Background Layer */}
        <motion.div
          className="absolute inset-0 w-full h-full z-0 flex items-center justify-center bg-black"
          style={{ clipPath }}
        >
          {/* Main Portrait Image Container */}
          <div className="relative z-10 w-full h-full flex items-center justify-center px-4 md:px-0">
            {/* Image Overlay for Readability (Dynamic) */}
            <motion.div
              className="absolute inset-0 bg-black/60 z-20 pointer-events-none"
              style={{ opacity: contentOpacity }}
            />

            <motion.div
              className="relative aspect-[3/4] h-[70vh] md:h-[85vh] rounded-2xl overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.8)] border border-white/5"
              style={{ scale: imageScale, filter: `blur(${imageBlur})` }}
            >
              <img
                src={imageSrc}
                alt="Featured Portrait"
                className="w-full h-full object-cover"
              />

              {/* Subtle Gradient Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20" />
            </motion.div>
          </div>
        </motion.div>

        {/* Content Overlay */}
        <motion.div
          className="relative z-30 text-center px-6 max-w-6xl mx-auto"
          style={{ opacity: contentOpacity, y: contentY }}
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
              onClick={() => navigate("/solutions")}
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
