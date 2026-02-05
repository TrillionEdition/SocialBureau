import React, { useRef } from "react";
import { useScroll, motion } from "framer-motion";
import CustomCursor from "./CustomCursor";
import Hero from "./Hero";
import RevealTransition from "./RevealTransition";

const AwardWinningExperience = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  return (
    <div ref={containerRef} className="relative h-[550vh] bg-black">
      <CustomCursor />

      {/* Sticky Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Global Noise/Vignette for "Black Screen Effects" */}
        <div className="absolute inset-0 z-[60] pointer-events-none opacity-[0.05] bg-[url('https://res.cloudinary.com/dtwcgfmar/image/upload/v1710515152/noise_p0xk2w.png')] bg-repeat" />
        <div className="absolute inset-0 z-[60] pointer-events-none shadow-[inset_0_0_150px_rgba(0,0,0,1)]" />

        {/* Components receiving scroll progress */}
        <Hero scrollYProgress={scrollYProgress} />
        <RevealTransition scrollYProgress={scrollYProgress} />

        {/* Scroll Progress Indicator (Optional, subtle) */}

        <motion.div
          className="absolute bottom-0 left-0 h-1 bg-red-600 z-50"
          style={{ scaleX: scrollYProgress, originX: 0 }}
        />
      </div>
    </div>
  );
};

export default AwardWinningExperience;
