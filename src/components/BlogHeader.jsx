// // // import React, { useState, useRef } from "react";

// // // export default function BlogHeader() {
// // //   const title = "The Marketing Intelligence Journal";
// // //   const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
// // //   const titleRef = useRef(null);

// // //   return (
// // //     <div>
// // //     <section className="text-center py-30 px-4 bg-black max-w-[80vw] mx-auto justify-center">
// // //       <div className="flex justify-center items-center mb-3">
// // //         <div className="w-20 h-px bg-[#ff0000] mr-2"></div>
// // //       </div>
// // //       <h1 style={{ fontFamily: "Playfair Display, serif" }} className="text-4xl xs:text-3xl sm:text-4xl md:text-6xl font-black leading-tight mb-4 text-white">
// // //         The
// // //         <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#ff0000]"> Marketing Intelligence Journal</span>
// // //       </h1>
// // //       <p className="mt-4 text-gray-400 text-base md:text-2xl">
// // //         Learn. Adapt. Evolve, Global Marketing Updates from the <a style={{ fontFamily: "MyFont, sans-serif" }} href='https://socialbureau.in'>
// // //               Social<span className="text-[#ff0000]">B</span>ureau
// // //             </a> Team
// // //       </p>
// // //     </section>
// // //     <p className="text-xl md:text-2xl font-light text-gray-300 mb-12 max-w-[80vw] mx-auto text-center">
// // //              Welcome to <a style={{ fontFamily: "MyFont, sans-serif" }} href='https://socialbureau.in'>
// // //               Social<span className="text-[#ff0000]">B</span>ureau
// // //             </a> Insights, our exclusive content hub designed for marketing professionals, agency owners, and freelancers who want to stay ahead of the digital curve.

// // //  From Meta and Google Ads updates to the latest in AI tools, content strategy, and platform algorithms, we publish real-world insights that help you upgrade your marketing knowledge every week.
// // //           </p>


// // //     </div>
// // //   );
// // // }

// // import React, { useState, useEffect } from "react";

// // export default function BlogHeader() {
// //   const [isVisible, setIsVisible] = useState(false);

// //   // Trigger the entrance animation on mount
// //   useEffect(() => {
// //     setIsVisible(true);
// //   }, []);

// //   return (
// //     <div className="bg-black text-white font-sans">
// //       {/* Hero Image Section */}
// //       <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
// //         {/* Background Image with Overlay */}
// //         <div className="absolute inset-0 z-0">
// //           <img
// //             src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2000" 
// //             alt="Marketing Intelligence"
// //             className="w-full h-full object-cover opacity-50"
// //           />
// //           <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
// //         </div>

// //         {/* Content Container */}
// //         <div 
// //           className={`relative z-10 text-center px-4 transition-all duration-1000 ease-out transform ${
// //             isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
// //           }`}
// //         >
// //           <div className="flex justify-center items-center mb-6">
// //             <div className="w-12 h-1 bg-[#ff0000]"></div>
// //           </div>
          
// //           <h1 
// //             style={{ fontFamily: "Playfair Display, serif" }} 
// //             className="text-5xl md:text-7xl font-black leading-tight mb-6"
// //           >
// //             The <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff0000] to-[#ff6666]">
// //               Marketing Intelligence
// //             </span> Journal
// //           </h1>

// //           <p className="max-w-2xl mx-auto text-lg md:text-2xl text-gray-200 font-light italic">
// //             "The future belongs to those who see possibilities before they become obvious."
// //           </p>
// //         </div>
// //       </section>

// //       {/* Intro Text Section */}
// //       <section className="py-20 px-6">
// //         <div className="max-w-4xl mx-auto text-center">
// //           <p className="text-xl md:text-2xl font-light text-gray-300 leading-relaxed">
// //             Welcome to{" "}
// //             <a style={{ fontFamily: "MyFont, sans-serif" }} href="https://socialbureau.in" className="hover:opacity-80 transition-opacity">
// //               Social<span className="text-[#ff0000]">B</span>ureau
// //             </a>{" "}
// //             Insights—our exclusive content hub for professionals staying ahead of the digital curve. 
// //             From Meta updates to AI-driven strategy, we deliver real-world knowledge every week.
// //           </p>
// //         </div>
// //       </section>
      
// //       <hr className="border-gray-800 w-1/2 mx-auto" />
// //     </div>
// //   );
// // }
// import React, { useState, useEffect } from "react";

// export default function BlogHeader() {
//   const [isVisible, setIsVisible] = useState(false);

//   useEffect(() => {
//     setIsVisible(true);
//   }, []);

//   return (
//     <div className="bg-[#FCFCFC] text-[#1a1a1a]">
//       <section className="relative h-[60vh] flex items-center justify-center overflow-hidden border-b border-gray-100">
//         {/* Background - Soft & Clean */}
//         <div className="absolute inset-0 z-0">
//           <img
//             src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2000" 
//             alt="Workspace"
//             className="w-full h-full object-cover opacity-10 grayscale-[30%]"
//           />
//           <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-white/80 to-[#FCFCFC]"></div>
//         </div>

//         <div 
//           className={`relative z-10 text-center px-4 transition-all duration-1000 ease-out transform ${
//             isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
//           }`}
//         >
//           <div className="flex justify-center items-center mb-6">
//             <div className="w-12 h-[2px] bg-[#ff0000]"></div>
//           </div>
          
//           <h1 
//             style={{ fontFamily: "Playfair Display, serif" }} 
//             className="text-5xl md:text-8xl font-black leading-tight mb-6 tracking-tight"
//           >
//             The <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1a1a1a] to-gray-500">
//               Intelligence
//             </span> Journal
//           </h1>

//           <p className="max-w-3xl mx-auto text-lg md:text-xl text-gray-500 font-light tracking-wide uppercase">
//             Marketing Insights for the Modern Professional
//           </p>
//         </div>
//       </section>

//       <section className="py-16 px-6 bg-white">
//         <div className="max-w-5xl mx-auto text-center">
//           <p className="text-xl md:text-3xl font-light text-gray-700 leading-relaxed">
//             Welcome to{" "}
//             <a style={{ fontFamily: "MyFont, sans-serif" }} href="https://socialbureau.in" className="hover:text-[#ff0000] transition-colors">
//               Social<span className="text-[#ff0000]">B</span>ureau
//             </a>{" "}
//             Insights. We dissect platform algorithms and AI strategy so you don't have to.
//           </p>
//         </div>
//       </section>
//     </div>
//   );
// }
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