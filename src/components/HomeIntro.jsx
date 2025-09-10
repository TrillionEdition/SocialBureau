import React, { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

const HomeIntro = () => {
 const paragraphRef = useRef(null);

 const isInView = useInView(paragraphRef, {
 margin: "0px",
 });

  const items = [
    "Define",
    "Design",
    "Deliver",
    "Define",
    "Design",
    "Deliver",
  ];
 const paragraph = `SocialBureau isn’t standard agency! We’re the engine for niche, high-growth brands
scaling smarter and faster. We deliver cultural fluency, ROI-driven strategy, and precise
tactics that create undeniable market impact.`;
 const words = paragraph.split(" ");

 return (
 <div className="w-full text-white bg-black overflow-hidden">
   
      <section className=" z-20">
 <div
 className=" flex flex-col items-center justify-center px-4 py-10 md:pt-20 bg-black overflow-hidden"
 >

 {/* Main Content */}
 <div className="relative z-10 text-white text-left px-10 w-full">
          <div className="flex flex-col md:flex-row md:items-start justify-between">
            {/* Left Column for H1 */}
            <div className="flex-1 md:pr-5">
              <h1
                style={{ fontFamily: "Playfair Display, serif" }}
                className="text-3xl sm:text-2xl md:text-3xl lg:text-[3.5rem] leading-tight md:leading-tight lg:leading-tight xl:leading-[1.1] font-serif font-bold text-left"
              >
                Unfair Advantage for Niche Brands in Noisy Markets
              </h1>
            </div>

            {/* Right Column for H2 */}
            <div className="md:w-1/3 mt-10 md:mt-0 md:pl-10 border-l-2 border-[#ff0000]">
              <h2 className="text-sm md:text-base lg:text-lg leading-relaxed font-sans text-left pl-4 text-[#838383ff]">
We craft bespoke luxury campaigns for global discernment. Fueled by analytics,
                storytelling, and sector-native expertise, we transform visions into legendary brands.
              </h2>
            </div>
          </div>
        </div>
 </div>                

 <div className="px-6 lg:px-40 text-white text-center">
 <p
ref={paragraphRef}
 className="text-xl sm:text-xl md:text-2xl lg:text-2xl leading-relaxed text-center"
>
<span style={{ fontFamily: "MyFont, sans-serif" }}>
          Social<span className="text-[#ff0000]">B</span>ureau
        </span>&nbsp;
  isn’t standard agency! We’re the engine for niche, high-growth brands
 scaling smarter and faster. We deliver cultural fluency, ROI-driven strategy, and precise
 tactics that create undeniable market impact.
 </p>
 </div>
 </section>
 </div>
 );
};

export default HomeIntro;