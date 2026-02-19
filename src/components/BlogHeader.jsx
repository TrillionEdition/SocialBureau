import React, { useState, useRef } from "react";

export default function BlogHeader() {
  const title = "The Marketing Intelligence Journal";
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const titleRef = useRef(null);

  return (
    <div>
    <section className="text-center py-30 px-4 bg-black max-w-[80vw] mx-auto justify-center">
      <div className="flex justify-center items-center mb-3">
        <div className="w-20 h-px bg-[#ff0000] mr-2"></div>
      </div>
      <h1 style={{ fontFamily: "Playfair Display, serif" }} className="text-4xl xs:text-3xl sm:text-4xl md:text-6xl font-black leading-tight mb-4 text-white">
        The
        <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#ff0000]"> Marketing Intelligence Journal</span>
      </h1>
      <p className="mt-4 text-gray-400 text-base md:text-2xl">
        Learn. Adapt. Evolve, Global Marketing Updates from the <a style={{ fontFamily: "MyFont, sans-serif" }} href='https://socialbureau.in'>
              Social<span className="text-[#ff0000]">B</span>ureau
            </a> Team
      </p>
    </section>
    <p className="text-xl md:text-2xl font-light text-gray-300 mb-12 max-w-[80vw] mx-auto text-center">
             Welcome to <a style={{ fontFamily: "MyFont, sans-serif" }} href='https://socialbureau.in'>
              Social<span className="text-[#ff0000]">B</span>ureau
            </a> Insights, our exclusive content hub designed for marketing professionals, agency owners, and freelancers who want to stay ahead of the digital curve.

 From Meta and Google Ads updates to the latest in AI tools, content strategy, and platform algorithms, we publish real-world insights that help you upgrade your marketing knowledge every week.
          </p>


    </div>
  );
}
