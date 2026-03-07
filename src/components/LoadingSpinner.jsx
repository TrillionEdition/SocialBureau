// // // const LoadingSpinner = () => {
// // //   return (
// // //     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
// // //       <img
// // //         src="https://res.cloudinary.com/dtwcgfmar/image/upload/v1767617055/FromKlickPinCF3DAnimatedOrb_MotiongraphicsdesignLogodesignvideoWebbannerdesign-ezgif.com-video-to-gif-converter_1_tjuhqo.gif"
// // //         alt="Loading"
// // //         className="
// // //           object-contain
// // //           animate-fade-in

// // //           w-[140px] h-[140px]        /* mobile */
// // //           sm:w-[170px] sm:h-[170px] /* small tablets */
// // //           md:w-[200px] md:h-[200px] /* tablets */
// // //           lg:w-[240px] lg:h-[240px] /* desktop */
// // //           xl:w-[280px] xl:h-[280px] /* large screens */
// // //         "
// // //         style={{ filter: "drop-shadow(0 6px 20px rgba(0,0,0,0.6))" }}
// // //       />
// // //     </div>
// // //   );
// // // };

// // // export default LoadingSpinner;


// // import React from 'react';

// // const LoadingSpinner = () => {
// //   return (
// //     <div className="flex items-center justify-center min-h-screen bg-black">
// //       {/* Main spinner container */}
// //       <div className="relative w-20 h-20 sm:w-28 sm:h-28 md:w-40 md:h-40">

// //         {/* Outer rotating gradient ring */}
// //         <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 animate-spin p-1.5 sm:p-2">
// //           <div className="w-full h-full rounded-full bg-black"></div>
// //         </div>

// //         {/* Middle pulsing gradient circle */}
// //         <div className="absolute inset-4 sm:inset-6 md:inset-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 animate-pulse"></div>

// //         {/* Center glowing dot */}
// //         <div className="absolute inset-0 flex items-center justify-center">
// //           <div className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 rounded-full bg-cyan-400 shadow-xl shadow-cyan-400/80 animate-pulse">
// //             <div className="absolute inset-0 rounded-full bg-cyan-300 animate-ping opacity-75"></div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Loading text */}
// //       <div className="absolute bottom-20 sm:bottom-32 text-cyan-400 text-xs sm:text-sm md:text-base font-semibold tracking-widest uppercase animate-pulse">
// //         Loading
// //       </div>

// //       {/* Custom animations */}
// //       <style jsx>{`
// //         @keyframes rotate {
// //           from {
// //             transform: rotate(0deg);
// //           }
// //           to {
// //             transform: rotate(360deg);
// //           }
// //         }

// //         @keyframes pulse {
// //           0%, 100% {
// //             opacity: 0.6;
// //           }
// //           50% {
// //             opacity: 1;
// //           }
// //         }

// //         @keyframes ping {
// //           75%, 100% {
// //             transform: scale(2.5);
// //             opacity: 0;
// //           }
// //         }

// //         .animate-spin {
// //           animation: rotate 2.5s linear infinite;
// //         }

// //         .animate-pulse {
// //           animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
// //         }

// //         .animate-ping {
// //           animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
// //         }
// //       `}</style>
// //     </div>
// //   );
// // };

// // export default LoadingSpinner;

// import React from "react";

// const LoadingSpinner = () => {
//   return (
//     <div className="flex items-center justify-center min-h-screen bg-black flex-col">

//       {/* Logo Text */}
//       <div className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-wide text-white flex items-center" style={{ fontFamily: "MyFont, sans-serif" }} >

//         {/* Social */}
//         <span className="animate-fadeIn">Social</span>

//         {/* Red B */}
//         <span className="text-[#ff0000] mx-1">B</span>

//         {/* ureau */}
//         <span className="animate-slideIn">ureau</span>
//       </div>

//       {/* Loading dots */}
//       <div className="mt-6 flex space-x-2">
//         <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
//         <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-150"></div>
//         <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-300"></div>
//       </div>

//       {/* Custom Animations */}
//       <style jsx>{`
//         @keyframes fadeIn {
//           0% { opacity: 0; transform: translateY(10px); }
//           100% { opacity: 1; transform: translateY(0); }
//         }

//         @keyframes slideIn {
//           0% { opacity: 0; transform: translateX(20px); }
//           100% { opacity: 1; transform: translateX(0); }
//         }

//         @keyframes glow {
//           0%, 100% {
//             text-shadow: 0 0 8px #ff0000, 0 0 16px #ff0000;
//           }
//           50% {
//             text-shadow: 0 0 16px #ff3333, 0 0 32px #ff0000;
//           }
//         }

//         @keyframes bounce {
//           0%, 80%, 100% {
//             transform: translateY(0);
//           }
//           40% {
//             transform: translateY(-6px);
//           }
//         }

//         .delay-150 {
//           animation-delay: 0.15s;
//         }

//         .delay-300 {
//           animation-delay: 0.3s;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default LoadingSpinner;


import React from "react";

const LoadingSpinner = () => {
  const letters = [
    { char: "S", delay: 0 },
    { char: "o", delay: 0.1 },
    { char: "c", delay: 0.2 },
    { char: "i", delay: 0.3 },
    { char: "a", delay: 0.4 },
    { char: "l", delay: 0.5 },
    { char: "B", delay: 0.6, color: "#ff0000" },
    { char: "u", delay: 0.7 },
    { char: "r", delay: 0.8 },
    { char: "e", delay: 0.9 },
    { char: "a", delay: 1.0 },
    { char: "u", delay: 1.1 },
  ];

  return (
    <div className="flex items-center justify-center min-h-screen bg-black flex-col">
      {/* Logo Text - Sequential Letter Animation */}
      <div
        className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-wide text-white flex items-center"
        style={{ fontFamily: "MyFont, sans-serif" }}
      >
        {letters.map((letterObj, index) => (
          <span
            key={index}
            className="inline-block"
            style={{
              color: letterObj.color || "white",
              animation: `fadeInSlide 0.5s ease-out forwards`,
              animationDelay: `${letterObj.delay}s`,
            }}
          >
            {letterObj.char}
          </span>
        ))}
      </div>

      {/* Loading dots */}
      <div className="mt-6 flex space-x-2">
        <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
        <div
          className="w-2 h-2 bg-white rounded-full animate-bounce"
          style={{ animationDelay: "0.15s" }}
        ></div>
        <div
          className="w-2 h-2 bg-white rounded-full animate-bounce"
          style={{ animationDelay: "0.3s" }}
        ></div>
      </div>

      {/* Custom Animations */}
      <style>{`
        @keyframes fadeInSlide {
          0% {
            opacity: 0;
            transform: translateY(10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bounce {
          0%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-6px);
          }
        }
      `}</style>
    </div>
  );
};

export default LoadingSpinner;