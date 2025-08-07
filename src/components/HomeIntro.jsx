import React, { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

const HomeIntro = () => {
  const paragraphRef = useRef(null);

  const isInView = useInView(paragraphRef, {
    margin: "-20% 0px -20% 0px",
  });


  const paragraph = `SocialBureau isn’t standard agency! We’re the engine for niche, high-growth brands
scaling smarter and faster. We deliver cultural fluency, ROI-driven strategy, and precise
tactics that create undeniable market impact.`;
  const words = paragraph.split(" ");

  return (
    <div className="w-full text-white bg-black overflow-hidden">
<section className="relative z-20">
      <div
        className="relative md:min-h-screen flex flex-col items-center justify-center px-4 md:py-40 bg-black overflow-hidden"
      >
        {/* Gradients */}
        <div className="absolute top-0 left-0 w-64 md:h-64 bg-gradient-to-br from-[#ff0000] via-transparent to-transparent rounded-full blur-3xl z-0"></div>
        <div className="absolute bottom-0 right-0 w-64 md:h-64 bg-gradient-to-tl from-[#ff0000] via-transparent to-transparent rounded-full blur-2xl z-0"></div>

        {/* Main Content */}
        <div className="relative z-10 text-white text-center">
          <h1
            style={{ fontFamily: "Playfair Display, serif" }}
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl leading-10 sm:leading-3 md:leading-15 lg:leading-20 font-serif font-normal"
          >
            Unfair Advantage for Niche<br /> Brands in Noisy Markets
          </h1>

          <div className="flex flex-col lg:flex-row items-center mt-20 px-[8vw]">
            <div className="flex-3 text-white">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-10 lg:leading-15 font-sans">
                We craft bespoke luxury campaigns for global discernment. Fueled by analytics,
storytelling, and sector-native expertise, we transform visions into legendary brands.
              </h2>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-[10vh] px-6 lg:px-40 text-white text-center">
        <p
  ref={paragraphRef}
  className="text-xl sm:text-xl md:text-2xl lg:text-3xl leading-relaxed flex flex-wrap justify-center gap-x-1"
>
  {words.map((word, index) => {
    if (index === 0 && word.startsWith("SocialBureau")) {
      return (
        <motion.span
          key={index}
          animate={
            isInView
              ? { scale: 1, opacity: 1 }
              : { scale: 0.8, opacity: 0.2 }
          }
          transition={{ duration: 0.4, delay: index * 0.05 }}
          className="inline-block"
          style={{ fontFamily: "MyFont, sans-serif" }}
        >
          Social
          <span className="text-[#ff0000]">B</span>
          ureau
          {word.length > "SocialBureau".length
            ? word.slice("SocialBureau".length)
            : ""}
          &nbsp;
        </motion.span>
      );
    }
    return (
      <motion.span
        key={index}
        animate={
          isInView
            ? { scale: 1, opacity: 1 }
            : { scale: 0.8, opacity: 0.2 }
        }
        transition={{ duration: 0.4, delay: index * 0.05 }}
        className="inline-block"
      >
        {word}&nbsp;
      </motion.span>
    );
  })}
</p>

      </div>
      </section>
    </div>
  );
};

export default HomeIntro;
