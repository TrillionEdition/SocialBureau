// import React, { useEffect, useState } from "react";

// const animatedText = " but always on purpose";

// export const AboutTagline = () => {
//   const [displayed, setDisplayed] = useState("");
//   const [index, setIndex] = useState(0);

//   useEffect(() => {
//     let timeoutId;
//     let interval;
//     if (index < animatedText.length) {
//       interval = setInterval(() => {
//         setDisplayed(animatedText.slice(0, index + 1));
//         setIndex(index + 1);
//       }, 80);
//     } else {
//       timeoutId = setTimeout(() => {
//         setDisplayed("");
//         setIndex(0);
//       }, 800);
//     }
//     return () => {
//       clearInterval(interval);
//       clearTimeout(timeoutId);
//     };
//   }, [index]);

//   return (
//     <div
//       style={{
//         width: "100%",
//         margin: "0 auto",
//         padding: "3vw",
//         borderRadius: 16,
//         boxShadow: "0 4px 32px rgba(0,0,0,0.07)",
//         textAlign:"center",
//         fontFamily: "system-ui, sans-serif",
//       }} className="text-[1.2rem] md:text-[1.7rem]"
//     >
//       <p className="about-text">
//         We obsess over one thing:{" "}
//         <span className="highlight">RESULTS</span>.
//         <br className="about-break" />
//         Whether it’s cutting CAC,
//         unlocking new audiences, or compounding LTV, we move fast,{" "}
//         <span
//           className="animated-text"
//         >
//           {displayed}
//           <span className="cursor">&nbsp;</span>
//         </span>
//       </p>

//       <style>
//         {`
//         @keyframes blink {
//           0%, 100% { opacity: 0.4; }
//           50% { opacity: 1; }
//         }
//         .about-text {
//           line-height: 1.6;
//           color: #fff;
//           margin: 0;
//           max-width: 100%;
//         }
//         .highlight {
//           color: #ff0000;
//           font-weight: 500;
//         }
//         .animated-text {
//           display: inline-block;
//           min-height: 1em;
//           font-family: monospace;
//           font-weight: 600;
//           letter-spacing: 1px;
//           color: #ff0000;
//           margin-left: 4px;
//         }
//         .cursor {
//           display: inline-block;
//           width: 1ch;
//           background: #ff0000;
//           opacity: 0.4;
//           margin-left: 2px;
//           animation: blink 1s steps(1) infinite;
//         }
//         /* Medium screens */
//         @media (min-width: 600px) {
//           .about-text {
//             max-width: 80%;
//             margin: 0 auto;
//           }
//         }
//         /* Large screens */
//         @media (min-width: 1000px) {
//           .about-text {
//             max-width: 80%;
//           }
//         }
//         /* Small screens */
//         @media (max-width: 400px) {
//         padding-left:50px;
//         padding-right:50px;
//         }
//         `}
//       </style>
//     </div>
//   );
// };



import React, { useEffect, useState } from "react";

const animatedText = "but always on purpose";

export const AboutTagline = () => {
  const [displayed, setDisplayed] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let timeoutId;
    let interval;
    if (index < animatedText.length) {
      interval = setInterval(() => {
        setDisplayed(animatedText.slice(0, index + 1));
        setIndex(index + 1);
      }, 75);
    } else {
      timeoutId = setTimeout(() => {
        setDisplayed("");
        setIndex(0);
      }, 1200);
    }
    return () => {
      clearInterval(interval);
      clearTimeout(timeoutId);
    };
  }, [index]);

  return (
    <div className="w-full bg-black text-white py-16 md:py-20 px-4 md:px-8 border-t border-b border-red-950 border-opacity-30 relative overflow-hidden">
      <style>{`
        @keyframes cursor-blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }

        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }

        .tagline-text {
          font-size: clamp(1.1rem, 2.2vw, 1.5rem);
          line-height: 1.7;
          letter-spacing: 0.3px;
          margin: 0;
          font-weight: 400;
          position: relative;
          z-index: 2;
        }

        .tagline-cursor {
          display: inline-block;
          width: 2px;
          height: 1.2em;
          background: #ff0000;
          margin-left: 4px;
          vertical-align: text-bottom;
          animation: cursor-blink 1s steps(1) infinite;
        }

        .tagline-bg-accent {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 0, 0, 0.05),
            transparent
          );
          pointer-events: none;
        }

        @media (max-width: 768px) {
          .tagline-text {
            font-size: 1.1rem;
            line-height: 1.6;
          }
        }

        @media (max-width: 480px) {
          .tagline-text {
            font-size: 1rem;
            line-height: 1.5;
            letter-spacing: 0.2px;
          }
        }
      `}</style>

      {/* Background accent */}
      <div className="tagline-bg-accent" />

      <div className="max-w-4xl mx-auto relative z-10">
        <p className="tagline-text text-white text-center">
          We obsess over one thing:{" "}
          <span className="text-red-500 font-bold uppercase tracking-wider">
            RESULTS
          </span>
          . Whether it's cutting CAC, unlocking new audiences, or compounding
          LTV, we move fast,{" "}
          <span className="text-red-500 font-semibold font-mono tracking-wider">
            {displayed}
            <span className="tagline-cursor" />
          </span>
        </p>
      </div>
    </div>
  );
};