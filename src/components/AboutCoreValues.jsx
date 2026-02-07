import React, { useEffect } from "react";

const values = [
  {
    icon: "assets/icon1.webp",
    title: "Performance First",
    desc: "We don't guess. We design outcomes.",
  },
  {
    icon: "assets/icon2.webp",
    title: "Niche-Native Thinking",
    desc: "We understand the cultural codes that others ignore",
  },
  {
    icon: "assets/icon3.webp",
    title: "Speed & Precision",
    desc: "Fast, focused and flawless.",
  },
  {
    icon: "assets/icon4.webp",
    title: "Brutal Clarity",
    desc: "No jargon. Only sharp, clear, actionable insights",
  },
  {
    icon: "assets/icon5.webp",
    title: "Zero Vanity",
    desc: "No fake work. Only compounding ROI.",
  },
];

export default function AboutCoreValues() {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };
    const observer = new window.IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate");
        }
      });
    }, observerOptions);

    document.querySelectorAll(".fade-in-up").forEach((el) => {
      observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
      @keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
}
@keyframes rotate {
  0% { transform: rotate(0deg); }
  50% { transform: rotate(5deg); }
  100% { transform: rotate(0deg); }
}
@keyframes wiggle {
  0% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  50% { transform: translateX(5px); }
  75% { transform: translateX(-5px); }
  100% { transform: translateX(0); }
}
.float {
  animation: float 3s ease-in-out infinite;
}
.rotate {
  animation: rotate 4s ease-in-out infinite;
}
.wiggle {
  animation: wiggle 2s ease-in-out infinite;
}

        .card-3d {
          perspective: 1000px;
          transform-style: preserve-3d;
          transition: all 0.5s cubic-bezier(.23,1,.32,1);
        }
        @media (min-width: 769px) {
  .card-3d:hover {
    transform: rotateY(15deg) rotateX(10deg) scale(1.05);
    z-index: 45;
  }

  .card-3d:hover .card-inner {
    background: linear-gradient(135deg, rgba(255, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.8) 100%);
    border-color: rgba(255, 0, 0, 0.6);
    box-shadow: 0 20px 40px rgba(255, 0, 0, 0.2), inset 0 0 20px rgba(255, 0, 0, 0.1);
  }
}

        .card-inner {
          background: linear-gradient(135deg, rgba(255, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.9) 100%);
          border: 1px solid rgba(255,0,0,0.3);
          backdrop-filter: blur(10px);
          transform-style: preserve-3d;
          transition: all 0.3s cubic-bezier(.23,1,.32,1);
        }
          @media (max-width: 800px) {
        .card-3d:hover .card-inner {
          background: linear-gradient(135deg, rgba(255, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.8) 100%);
          border-color: rgba(255, 0, 0, 0.6);
          box-shadow: 0 20px 40px rgba(255, 0, 0, 0.2), inset 0 0 20px rgba(255, 0, 0, 0.1);
      }}
        .neon-text {
          color: #fff;
          text-shadow:
            0 0 5px #fff,
            0 0 10px #fff,
            0 0 15px #ff0000,
            0 0 20px #ff0000,
            0 0 35px #ff0000,
            0 0 40px #ff0000;
          animation: flicker 2s infinite alternate;
        }
        @keyframes flicker {
          0%, 18%, 22%, 25%, 53%, 57%, 100% {
            text-shadow:
              0 0 5px #fff,
              0 0 10px #fff,
              0 0 15px #ff0000,
              0 0 20px #ff0000,
              0 0 35px #ff0000,
              0 0 40px #ff0000;
          }
          20%, 24%, 55% { text-shadow: none; }
        }
        .pulse-red {
          animation: pulse-red 2s ease infinite;
        }
        @keyframes pulse-red {
          0%, 100% { box-shadow: 0 0 5px rgba(255, 0, 0, 0.5); }
          50% { box-shadow: 0 0 30px rgba(255, 0, 0, 0.8), 0 0 60px rgba(255, 0, 0, 0.4); }
        }
        .cyber-lines {
          position: relative;
          overflow: hidden;
          height:40vh;
          justify-content:center;
        }
        .cyber-lines::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 2px;
          background: linear-gradient(90deg, transparent, #ff0000, transparent);
          animation: scan 2s ease infinite;
        }
        @keyframes scan {
          0% { left: -100%; }
          100% { left: 100%; }
        }
        .fade-in-up {
          opacity: 0;
          transform: translateY(50px);
          transition: all 0.8s cubic-bezier(.23,1,.32,1);
        }
        .fade-in-up.animate {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
      <section className="py-30 px-6 bg-black flex flex-col items-center">
        <h2
          className="text-3xl md:text-5xl font-black text-center mb-16"
          style={{ fontFamily: "Playfair Display, serif" }}
        >
          OUR CORE VALUES
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 w-full max-w-7xl">
         {values.map((val, idx) => {

  return (
    <div
      className="card-3d fade-in-up"
      key={val.title}
      style={{ animationDelay: `${idx * 0.13}s` }}
    >
      <div className="card-inner p-8 rounded-xl h-full flex flex-col items-center text-center cyber-lines">
        <div className={`text-4xl mb-6 w-10 h-10 float`}>
          <img src={val.icon} alt={val.title} />
        </div>
        <h3 className="text-xl font-bold mb-4">{val.title}</h3>
        <p className="text-sm opacity-80">{val.desc}</p>
      </div>
    </div>
  );
})}
</div>
      </section>
    </>
  );
}

// import React, { useEffect } from "react";

// const values = [
//   {
//     icon: "assets/icon1.webp",
//     title: "Performance First",
//     desc: "We don't guess. We design outcomes.",
//   },
//   {
//     icon: "assets/icon2.webp",
//     title: "Niche-Native Thinking",
//     desc: "We understand the cultural codes that others ignore",
//   },
//   {
//     icon: "assets/icon3.webp",
//     title: "Speed & Precision",
//     desc: "Fast, focused and flawless.",
//   },
//   {
//     icon: "assets/icon4.webp",
//     title: "Brutal Clarity",
//     desc: "No jargon. Only sharp, clear, actionable insights",
//   },
//   {
//     icon: "assets/icon5.webp",
//     title: "Zero Vanity",
//     desc: "No fake work. Only compounding ROI.",
//   },
// ];

// export default function AboutCoreValues() {
//   useEffect(() => {
//     const observerOptions = {
//       threshold: 0.15,
//       rootMargin: "0px 0px -100px 0px",
//     };

//     const observer = new window.IntersectionObserver((entries) => {
//       entries.forEach((entry) => {
//         if (entry.isIntersecting) {
//           entry.target.classList.add("animate-in");
//         }
//       });
//     }, observerOptions);

//     document.querySelectorAll(".value-item").forEach((el) => {
//       observer.observe(el);
//     });

//     return () => observer.disconnect();
//   }, []);

//   return (
//     <>
//       <style>{`
//         .accent-line-gradient {
//           background: linear-gradient(90deg, transparent, #ff0000, transparent);
//         }

//         @keyframes float-icon {
//           0%, 100% {
//             transform: translateY(0);
//           }
//           50% {
//             transform: translateY(-10px);
//           }
//         }

//         .value-item {
//           opacity: 0;
//           transform: translateY(50px);
//           transition: all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1);
//         }

//         .value-item.animate-in {
//           opacity: 1;
//           transform: translateY(0);
//         }

//         .value-icon {
//           animation: float-icon 3s ease-in-out infinite;
//         }

//         .value-title {
//           position: relative;
//           display: inline-block;
//         }

//         .value-title::after {
//           content: '';
//           position: absolute;
//           bottom: -4px;
//           left: 0;
//           width: 0;
//           height: 2px;
//           background: #ff0000;
//           transition: width 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
//         }

//         .value-item:hover .value-title::after {
//           width: 100%;
//         }

//         @media (max-width: 480px) {
//           .value-title {
//             font-size: 1rem;
//           }
//         }
//       `}</style>

//       <section className="bg-black text-white py-20 md:py-32 px-4 md:px-8 relative">
//         {/* Top accent line */}
//         <div className="absolute top-0 left-0 right-0 h-px accent-line-gradient opacity-50" />

//         {/* Bottom accent line */}
//         <div className="absolute bottom-0 left-0 right-0 h-px accent-line-gradient opacity-50" />

//         <div className="relative z-10 max-w-7xl mx-auto">
//           <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-center mb-16 md:mb-24 uppercase tracking-tight">
//             Core <span className="text-red-500">Values</span>
//           </h2>

//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
//             {values.map((val, idx) => (
//               <div
//                 key={val.title}
//                 className="value-item"
//                 style={{ transitionDelay: `${idx * 0.08}s` }}
//               >
//                 <div className="space-y-4">
//                   {/* Icon */}
//                   <div className="value-icon w-16 h-16 md:w-20 md:h-20">
//                     <img
//                       src={val.icon}
//                       alt={val.title}
//                       loading="lazy"
//                       className="w-full h-full object-contain"
//                     />
//                   </div>

//                   {/* Title */}
//                   <h3 className="value-title text-lg md:text-xl lg:text-2xl font-bold leading-tight">
//                     {val.title}
//                   </h3>

//                   {/* Description */}
//                   <p className="text-sm md:text-base text-gray-300 leading-relaxed">
//                     {val.desc}
//                   </p>

//                   {/* Divider */}
//                   <div className="w-12 h-px bg-gradient-to-r from-red-500 to-transparent opacity-60" />
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }


