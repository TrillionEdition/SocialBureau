import React, { useState, useEffect } from "react";

export default function BlogHeader() {
  const [loaded, setLoaded] = useState(false);
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    const clock = setInterval(() => setTime(new Date().toLocaleTimeString()), 1000);
    return () => {
      clearTimeout(timer);
      clearInterval(clock);
    };
  }, []);

  return (
    <div className="bg-[#FFFFFF] text-[#1a1a1a] overflow-hidden font-sans selection:bg-[#ff0000] selection:text-white">



      <section className="relative min-h-[85vh] flex flex-col items-center justify-center px-4 pt-10 pb-10">

        {/* Minimalist Grid Pattern Background */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#000 1.5px, transparent 1.5px)', backgroundSize: '60px 60px' }}></div>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto text-center">

          <div className="inline-flex items-center gap-4 mb-12">
            <div className="h-[1px] w-12 bg-gray-200"></div>
            <span className={`text-[11px] font-black uppercase tracking-[0.6em] text-gray-300 transition-all duration-1000 delay-300 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              Engineering the Future
            </span>
            <div className="h-[1px] w-12 bg-gray-200"></div>
          </div>

          <h1
            style={{ fontFamily: "'Playfair Display', serif" }}
            className={`flex flex-col text-[12vw] md:text-[160px] font-black leading-[0.8] tracking-[-0.04em] transition-all duration-[1500ms] delay-500 ease-out transform ${loaded ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"}`}
          >
            <span className="relative">
              The
            </span>
            <span className="text-[#ff0000] italic font-light lowercase my-2 md:my-6">Intelligence</span>
            <span className="relative">
              Journal
            </span>
          </h1>

          <div className={`mt-20 flex flex-col items-center gap-10 transition-all duration-1000 delay-[1200ms] ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <p className="text-sm md:text-base text-gray-500 max-w-xl font-medium tracking-tight leading-relaxed px-4">
              Curating high-stakes data, architectural marketing, and human behavior analysis for the digital elite.
            </p>
            <div className="flex flex-col items-center gap-4">
              <div className="w-[1.5px] h-20 bg-gradient-to-b from-[#ff0000] to-transparent"></div>
            </div>
          </div>
        </div>
      </section>

      <style dangerouslySetInnerHTML={{
        __html: `
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,900;1,400;1,900&display=swap');
      `}} />
    </div>
  );
}

