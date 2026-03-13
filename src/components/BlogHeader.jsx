import React, { useState, useEffect } from "react";

export default function BlogHeader() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Small timeout to ensure the browser is ready for the transition
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-[#FCFCFC] text-[#1a1a1a] overflow-hidden">
      <section className="relative h-[75vh] flex items-center justify-center border-b border-gray-100">
        
        {/* Background with Cinematic Zoom */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=2000" 
            alt="Workspace"
            className={`w-full h-full object-cover transition-transform duration-[3000ms] ease-out ${
              loaded ? "scale-110 opacity-20" : "scale-100 opacity-0"
            }`}
          />
          {/* Soft Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-[#FCFCFC]/80 to-[#FCFCFC]"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl">
          {/* 1. Staggered Red Line */}
          <div className="flex justify-center items-center mb-8">
            <div 
              className={`h-[2px] bg-[#ff0000] transition-all duration-1000 delay-300 ease-out ${
                loaded ? "w-16 opacity-100" : "w-0 opacity-0"
              }`}
            ></div>
          </div>
          
          {/* 2. Staggered Title */}
          <h1 
            style={{ fontFamily: "Playfair Display, serif" }} 
            className={`text-6xl md:text-8xl font-black leading-tight mb-8 tracking-tighter transition-all duration-[1200ms] delay-500 ease-out transform ${
              loaded ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
            }`}
          >
            The <span className="italic font-normal">Intelligence</span> Journal
          </h1>

          {/* 3. Staggered Sub-sentence */}
          <p 
            className={`max-w-2xl mx-auto text-lg md:text-xl text-gray-400 font-light tracking-[0.2em] uppercase transition-all duration-[1200ms] delay-700 ease-out transform ${
              loaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            Marketing insights for the <span className="text-black font-semibold">Digital Elite</span>
          </p>
        </div>
        
        {/* Subtle Scroll Indicator */}
        <div className={`absolute bottom-10 left-1/2 -translate-x-1/2 transition-opacity duration-1000 delay-[1500ms] ${loaded ? 'opacity-100' : 'opacity-0'}`}>
          <div className="w-[1px] h-12 bg-gradient-to-b from-[#ff0000] to-transparent"></div>
        </div>
      </section>

      {/* Intro Text - Fades in last */}
      <section className={`py-24 px-6 bg-white transition-all duration-1000 delay-[1000ms] ${loaded ? 'opacity-100' : 'opacity-0'}`}>
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-2xl md:text-4xl font-light text-gray-800 leading-[1.4] tracking-tight">
            Welcome to{" "}
            <a style={{ fontFamily: "MyFont, sans-serif" }} href="https://socialbureau.in" className="relative inline-block group">
              Social<span className="text-[#ff0000]">B</span>ureau
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-gray-200 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
            </a>{" "}
            Insights. Real-world data to help you learn, adapt, and evolve.
          </p>
        </div>
      </section>
    
    </div>
  );
}