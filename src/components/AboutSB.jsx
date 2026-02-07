// import React, { useEffect, useRef } from "react";
// import { AboutHeading } from "./AboutHeading";

// function randBetween(min, max) {
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// }

// export const AboutSB = () => {
//   const text =
//   "At SocialBureau, we don’t just build marketing campaigns, we architect high-performance ecosystems. Operating under the strategic umbrella of Trillion Edition, we fuse analytical muscle with cultural nuance to drive real outcomes for niche, high-growth brands.";

//   const words = text.match(/[\w’'-]+|[.,—]/g);

//   const refs = useRef([]);

//   useEffect(() => {
//     refs.current.forEach((span, i) => {
//       if (span) {
//         const x = randBetween(-150, 150);
//         const y = randBetween(-80, 80);
//         span.style.transform = `translate(${x}px, ${y}px) scale(0.7)`;
//         span.style.opacity = 0;

//         setTimeout(() => {
//           span.style.transition =
//             "transform 0.8s cubic-bezier(.5,1.6,.3,1), opacity 0.8s";
//           span.style.transform = "translate(0, 0) scale(1)";
//           span.style.opacity = 1;
//         }, 400 + i * 40);
//       }
//     });
//   }, []);

//   return (
//     <div
//   style={{
//     position: "relative",
//     justifyContent: "center",
//     alignItems: "center",
//     display: "flex",
//     flexDirection: "column",
//     height: "100vh",
//     width: "100vw",
//     overflow: "hidden",
//     color: "#fff",
//     zIndex: 3,
//   }}
// >

//       {/* Background Pattern Layer */}
//       <div
//         style={{
//           position: "absolute",
//           inset: 0,
//           zIndex: 0,
//           backgroundImage:
//             "radial-gradient(circle at 75% 0%, rgba(56, 5, 5, 0.7) 0%, transparent 50%)",
//         }}
//       />

//       {/* Floating Circles */}
//       <div className="absolute inset-0 pointer-events-none z-0">
//         <div className="float-circle" style={circleStyle("#ff0000", 20, "10%", "10%", 0.3)} />
//         <div className="float-circle" style={circleStyle("#ff0000", 16, "25%", "80%", 0.3, "1s")} />
//         <div className="float-circle" style={circleStyle("#ff0000", 24, "80%", "25%", 0.3, "2s")} />
//         <div className="float-circle" style={circleStyle("#ff0000", 12, "90%", "90%", 0.3, "0.5s")} />
//       </div>

//       {/* Spinning Shapes */}
//       <div
//         className="spin-shape"
//         style={spinStyle("#ff0000", 50, 6, "33%", "20%", 0.2)}
//       />
//       <div
//         className="spin-shape"
//         style={spinStyle("#ff0000", 24, 2, "67%", "67%", 0.15, "2s")}
//       />


//       {/* Foreground Content */}
//       <div style={{ position: "relative", zIndex: 2 }}>
//         <AboutHeading />
//         <style>{`
//           .aboutsb-responsive-p {
//             font-size: 25px;
//             border-radius: 1.5rem;
//             margin: 0 auto;
//             padding: 3vw;
//             width: 70vw;
//             color: #fff;
//             z-index: 3;
//             text-align: center;
//             line-height: 1.4;
//             backdrop-filter: blur(16px) saturate(160%);
//             -webkit-backdrop-filter: blur(16px) saturate(160%);
//             box-shadow: 0 6px 32px 0 rgba(40,0,0,0.12);
//           }
//           .float-circle {
//             position: absolute;
//             border-radius: 9999px;
//             animation: float 3s ease-in-out infinite;
//           }
//           .spin-shape {
//             position: absolute;
//             border-style: solid;
//             animation: spin-slow 8s linear infinite;
//           }
//           @keyframes float {
//             0%, 100% { transform: translateY(0); }
//             50% { transform: translateY(-20px); }
//           }
//           @keyframes spin-slow {
//             from { transform: rotate(0deg); }
//             to { transform: rotate(360deg); }
//           }
//           @media (max-width: 900px) {
//             .aboutsb-responsive-p {
//               padding: 40px 16px;
//               font-size: 1.28rem;
//               width: 70vw;
//             }
//           }
//           @media (max-width: 600px) {
//   .aboutsb-responsive-p {
//     font-size: 1.3rem;
//     padding: 16px;
//     word-break: break-word;
//     width: 90vw;
//     margin-top: 0;
//     box-sizing: initial;
//   }
// }

// @media (max-width: 400px) {
//   .aboutsb-responsive-p {
//     font-size: 20px;
//     width: 90vw;
//     margin-top: 0;
//     box-sizing: initial;
//   }
// }

//         `}</style>
//         <p className="aboutsb-responsive-p text-center hover:scale-110 transition-transform duration-300">
//           {words.map((word, idx) => {
//   const isSocialBureau = word === "SocialBureau";
//   return (
//     <span
//       key={idx}
//       ref={(el) => (refs.current[idx] = el)}
//       style={{
//         display: "inline-block",
//         whiteSpace: word.match(/[.,—]/) ? "normal" : "pre",
//         marginRight: word.match(/[.,—]/) ? 0 : 6,
//         marginLeft: word.match(/[.,—]/) ? 0 : 0,
//         opacity: 0,
//         transform: "none",
//       }}
//     >
//       {isSocialBureau ? (
//         <span style={{ fontFamily: "MyFont, sans-serif" }}>
//           Social<span className="text-[#ff0000]">B</span>ureau
//         </span>
//       ) : (
//         word
//       )}
//       {word.match(/[.,—]/) ? "\u00A0" : " "}
//     </span>
//   );
// })}

//         </p>
//       </div>
//     </div>
//   );
// };

// // Helper to style floating circles
// function circleStyle(color, size, top, left, opacity, delay = "0s") {
//   return {
//     width: `${size}px`,
//     height: `${size}px`,
//     backgroundColor: color,
//     top: top,
//     left: left,
//     opacity: opacity,
//     animationDelay: delay,
//   };
// }

// // Helper to style spinning shapes
// function spinStyle(color, size, border, top, left, opacity, delay = "0s") {
//   return {
//     width: `${size}px`,
//     height: `${size}px`,
//     borderWidth: `${border}px`,
//     borderColor: color,
//     top: top,
//     left: left,
//     opacity: opacity,
//     animationDelay: delay,
//   };
// }




import React, { useEffect, useRef } from "react";

function randBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const AboutSB = () => {
  const heroText =
    "At SocialBureau, we don't just build marketing campaigns, we architect high-performance ecosystems. Operating under the strategic umbrella of Trillion Edition, we fuse analytical muscle with cultural nuance to drive real outcomes for niche, high-growth brands.";

  const words = heroText.match(/[\w''-]+|[.,—]/g);
  const refs = useRef([]);

  useEffect(() => {
    refs.current.forEach((span, i) => {
      if (span) {
        const x = randBetween(-100, 100);
        const y = randBetween(-60, 60);
        span.style.transform = `translate(${x}px, ${y}px) scale(0.8)`;
        span.style.opacity = 0;

        setTimeout(() => {
          span.style.transition =
            "transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.7s ease-out";
          span.style.transform = "translate(0, 0) scale(1)";
          span.style.opacity = 1;
        }, 200 + i * 30);
      }
    });
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-black overflow-hidden flex items-center justify-center">
      <style>{`
        @keyframes pulse-bg {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.1);
          }
        }

        .about-bg-animate {
          animation: pulse-bg 8s ease-in-out infinite;
        }

        .accent-line-gradient {
          background: linear-gradient(90deg, transparent, #ff0000, transparent);
        }

        .word-span {
          display: inline-block;
          opacity: 0;
          will-change: transform, opacity;
        }

        .about-heading-style {
          font-size: clamp(2rem, 6vw, 4rem);
          font-weight: 900;
          letter-spacing: -0.02em;
          line-height: 1.1;
          text-transform: uppercase;
        }

        .about-description-style {
          font-size: clamp(1rem, 2.5vw, 1.25rem);
          line-height: 1.6;
          letter-spacing: 0.3px;
          font-weight: 400;
        }

        @media (max-width: 768px) {
          .about-heading-style {
            font-size: 2rem;
          }

          .about-description-style {
            font-size: 1rem;
          }
        }

        @media (max-width: 480px) {
          .about-heading-style {
            font-size: 1.5rem;
          }

          .about-description-style {
            font-size: 0.95rem;
            line-height: 1.4;
            letter-spacing: 0.2px;
          }
        }
      `}</style>

      {/* Animated background */}
      <div className="absolute inset-0 z-0 about-bg-animate">
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/5 via-transparent to-black pointer-events-none" />
      </div>

      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px accent-line-gradient opacity-50 z-10" />

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-px accent-line-gradient opacity-50 z-10" />

      {/* Content */}
      <div className="relative z-20 w-full h-full flex items-center justify-center p-5 sm:p-10">
        <div className="text-center max-w-4xl w-full">
          <h1 className="about-heading-style text-white mb-8 md:mb-12">
            Results-Driven
            <br />
            <span className="text-red-500 relative inline-block">
              Digital Marketing
            </span>
          </h1>

          <p className="about-description-style text-white">
            {words.map((word, idx) => {
              const isSocialBureau = word === "SocialBureau";
              return (
                <span
                  key={idx}
                  ref={(el) => (refs.current[idx] = el)}
                  className="word-span"
                  style={{
                    whiteSpace: word.match(/[.,—]/) ? "normal" : "pre",
                    marginRight: word.match(/[.,—]/) ? 0 : 4,
                  }}
                >
                  {isSocialBureau ? (
                    <span className="font-bold">
                      Social<span className="text-red-500">B</span>ureau
                    </span>
                  ) : (
                    word
                  )}
                  {word.match(/[.,—]/) ? "\u00A0" : " "}
                </span>
              );
            })}
          </p>
        </div>
      </div>
    </div>
  );
};