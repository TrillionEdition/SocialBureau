import React, { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

const HomeIntro = () => {
 const paragraphRef = useRef(null);

 const paragraph = `At SocialBureau we are not your regular agency! We are a growth partner that has been precisely engineered to meet the needs of the next wave of category leaders. By being India's first API marketing agency, we combine proprietary data pipelines, real-time automation, and cultural intelligence to help niche, high-growth brands scale in a more efficient manner, faster and with surgical precision.`;
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
              <h2
                style={{ fontFamily: "Playfair Display, serif" }}
                className="text-3xl sm:text-2xl md:text-3xl lg:text-[3.5rem] leading-tight md:leading-tight lg:leading-tight xl:leading-[1.1] font-serif font-bold text-left"
              >
                Smart Marketing, Built for a Connected World
              </h2>
            </div>

            {/* Right Column for H2 */}
            <div className="md:w-1/3 mt-10 md:mt-0 md:pl-10 border-l-2 border-[#ff0000]">
              <p className="text-sm md:text-base lg:text-lg leading-relaxed font-sans text-left pl-4 text-[#838383ff]">
 We combine creativity with code to power your marketing ecosystem. As a division of <a href="https://trillionedition.com">TrillionEdition LLP</a>, <a style={{ fontFamily: "MyFont, sans-serif" }} href='https://socialbureau.in'>
              Social<span className="text-[#ff0000]">B</span>ureau
            </a> bridges data, automation, and human insight to create marketing systems that scale globally.
              </p>
            </div>
          </div>
        </div>
 </div>                

 
 </section>
 </div>
 );
};

export default HomeIntro;