import React from "react";
import { motion, useTransform } from "framer-motion";

const RevealTransition = ({ scrollYProgress }) => {
  // Text Animation - Cinematic split reveal
  const textOpacity = useTransform(
    scrollYProgress,
    [0.2, 0.3, 0.95, 0.99],
    [0, 1, 1, 0],
  );
  const textScale = useTransform(scrollYProgress, [0.2, 0.99], [0.95, 1.05]);
  const textY = useTransform(
    scrollYProgress,
    [0.2, 0.3, 0.95, 0.99],
    [40, 0, 0, -40],
  );

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
      {/* Main Statement */}
      <motion.div
        style={{
          opacity: textOpacity,
          scale: textScale,
          y: textY,
        }}
        className="absolute z-30 flex flex-col items-center w-full px-8 text-center"
      >
        <div className="overflow-hidden">
          <h2 className="text-4xl md:text-7xl lg:text-8xl font-black leading-[0.9] text-white uppercase tracking-tighter">
            We don't just <br />
            <motion.span
              style={{
                color: useTransform(
                  scrollYProgress,
                  [0.4, 0.5],
                  ["#fff", "#dc2626"],
                ),
                textShadow: useTransform(
                  scrollYProgress,
                  [0.4, 0.5],
                  [
                    "0px 0px 0px transparent",
                    "0px 0px 20px rgba(220,38,38,0.4)",
                  ],
                ),
              }}
              className="italic font-serif"
            >
              design
            </motion.span>
            .
          </h2>
        </div>
        <div className="overflow-hidden mt-2">
          <h2 className="text-4xl md:text-7xl lg:text-8xl font-black leading-[0.9] text-white uppercase tracking-tighter">
            We create digital <br />
            <motion.span
              style={{
                color: useTransform(
                  scrollYProgress,
                  [0.55, 0.65],
                  ["#fff", "#dc2626"],
                ),
                textShadow: useTransform(
                  scrollYProgress,
                  [0.55, 0.65],
                  [
                    "0px 0px 0px transparent",
                    "0px 0px 20px rgba(220,38,38,0.4)",
                  ],
                ),
              }}
            >
              legacies
            </motion.span>
            .
          </h2>
        </div>
      </motion.div>
    </div>
  );
};

export default RevealTransition;
