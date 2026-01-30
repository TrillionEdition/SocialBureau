import React, { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useNavigate } from "react-router-dom";

/**
 * CyberBackground - A premium, award-winning section featuring a portrait image
 * with cinematic blurred side effects and smooth scroll-based interactions.
 */
export function CyberBackground({ onScrollEnd }) {
  const navigate = useNavigate();
  const containerRef = useRef(null);

  // Track scroll progress within this tall section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Notify parent of scroll progress for choreographed reveals
  useEffect(() => {
    return scrollYProgress.onChange((latest) => {
      if (onScrollEnd) {
        onScrollEnd(latest);
      }
    });
  }, [scrollYProgress, onScrollEnd]);

  // Clip Path Animation: Growing from absolute black (0%) as soon as scroll starts
  const clipPath = useTransform(
    scrollYProgress,
    [0, 0.25, 0.55], // Starts at 0, smooth growth
    [
      "circle(0% at 50% 50%)",
      "circle(12% at 50% 50%)",
      "circle(150% at 50% 50%)",
    ],
  );

  // Content Opacity: Delayed until 75% to ensure a "hold" on the clean image
  const contentOpacity = useTransform(scrollYProgress, [0.75, 0.9], [0, 1]);
  const contentY = useTransform(scrollYProgress, [0.75, 0.9], [50, 0]);

  // Image zoom effect
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.1, 1]);
  // Blur only starts as text comes in
  const imageBlur = useTransform(scrollYProgress, [0.8, 1], ["0px", "4px"]);

  const imageSrc = "/assets/sham-alen.JPG";

  return (
    <div ref={containerRef} className="relative h-[400vh] bg-black">
      {/* Sticky Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
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
