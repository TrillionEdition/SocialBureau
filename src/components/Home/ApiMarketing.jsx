

// // // // // // // // import React from "react";
// // // // // // // // import { motion } from "framer-motion";

// // // // // // // // // Utility function to optimize Cloudinary URLs
// // // // // // // // const getOptimizedCloudinaryUrl = (url, width = 1280) => {
// // // // // // // //   if (!url || !url.includes('cloudinary.com')) return url;
// // // // // // // //   if (url.includes('/video/upload/')) {
// // // // // // // //     return url.replace('/video/upload/', `/video/upload/f_auto,q_auto,w_${width},c_scale/`);
// // // // // // // //   }
// // // // // // // //   return url;
// // // // // // // // };

// // // // // // // // const ApiMarketingHero = () => {
// // // // // // // //   return (
// // // // // // // //     <section className="relative w-full h-[90vh] overflow-hidden bg-white">
// // // // // // // //       <video
// // // // // // // //         src={getOptimizedCloudinaryUrl("https://res.cloudinary.com/dtwcgfmar/video/upload/v1772009036/947a1c7e-d4ff-466e-a771-9a87f86c0d12_hpm2lu.mp4", 1280)}
// // // // // // // //         autoPlay
// // // // // // // //         loop
// // // // // // // //         muted
// // // // // // // //         playsInline
// // // // // // // //         title="SocialBureau API-driven marketing background"
// // // // // // // //         className="
// // // // // // // //       absolute inset-0
// // // // // // // //       w-full h-full
// // // // // // // //      object-center
// // // // // // // //       scale-125
// // // // // // // //       origin-center
// // // // // // // //     "
// // // // // // // //       />
// // // // // // // //       <div className="absolute inset-0 bg-black/10"></div>
// // // // // // // //     </section>
// // // // // // // //   );
// // // // // // // // };

// // // // // // // // export default ApiMarketingHero;


// // // // // // // import React from 'react';
// // // // // // // import { motion } from 'framer-motion';

// // // // // // // const GlassOrbit = () => {
// // // // // // //   const plates = Array.from({ length: 9 });

// // // // // // //   return (
// // // // // // //     <div className="relative flex items-center justify-center min-h-screen bg-[#f1f5f9] overflow-hidden perspective-[1000px]">

// // // // // // //       {/* Central Text Content */}
// // // // // // //       <motion.div
// // // // // // //         initial={{ opacity: 0, y: 20 }}
// // // // // // //         animate={{ opacity: 1, y: 0 }}
// // // // // // //         className="z-10 text-center max-w-2xl px-6 pointer-events-none"
// // // // // // //       >
// // // // // // //         <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 tracking-tight leading-tight">
// // // // // // //           World's First <br /> API-Driven Marketing Agency
// // // // // // //         </h1>
// // // // // // //         <p className="text-slate-500 text-lg md:text-xl font-medium max-w-lg mx-auto leading-relaxed">
// // // // // // //           Automate, Integrate, and Scale Your Marketing powered by real-time data, AI, and performance APIs.
// // // // // // //         </p>
// // // // // // //       </motion.div>

// // // // // // //       {/* 3D Orbit Scene */}
// // // // // // //       <div className="absolute inset-0 flex items-center justify-center [transform-style:preserve-3d]">
// // // // // // //         {plates.map((_, i) => (
// // // // // // //           <motion.div
// // // // // // //             key={i}
// // // // // // //             className="absolute [transform-style:preserve-3d]"
// // // // // // //             initial={{ rotateZ: i * 40 }}
// // // // // // //             animate={{
// // // // // // //               rotateZ: i * 40 + 360, // The "ring" rotation
// // // // // // //             }}
// // // // // // //             transition={{
// // // // // // //               duration: 25,
// // // // // // //               repeat: Infinity,
// // // // // // //               ease: "linear"
// // // // // // //             }}
// // // // // // //             style={{ width: '700px' }} // Distance from center
// // // // // // //           >
// // // // // // //             {/* The Individual Plate */}
// // // // // // //             <motion.div
// // // // // // //               animate={{
// // // // // // //                 rotateY: [0, 360],    // Spin around its own axis
// // // // // // //                 rotateX: [15, -15, 15], // Subtle wobble
// // // // // // //                 y: [0, -30, 0]        // Floating up and down
// // // // // // //               }}
// // // // // // //               transition={{
// // // // // // //                 rotateY: { duration: 12, repeat: Infinity, ease: "linear" },
// // // // // // //                 rotateX: { duration: 6, repeat: Infinity, ease: "easeInOut" },
// // // // // // //                 y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }
// // // // // // //               }}
// // // // // // //               // Glass Styling
// // // // // // //               className="w-24 h-24 md:w-36 md:h-36 rounded-full 
// // // // // // //                          bg-gradient-to-br from-blue-400/20 to-indigo-500/10 
// // // // // // //                          backdrop-blur-lg border-[1.5px] border-white/60
// // // // // // //                          shadow-[0_20px_50px_rgba(148,163,184,0.1)] 
// // // // // // //                          [transform-style:preserve-3d]"
// // // // // // //             >
// // // // // // //               {/* Inner highlight to simulate thickness/glass edge */}
// // // // // // //               <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/40 via-transparent to-transparent opacity-60" />
// // // // // // //             </motion.div>
// // // // // // //           </motion.div>
// // // // // // //         ))}
// // // // // // //       </div>

// // // // // // //       {/* Background Soft Glows */}
// // // // // // //       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-200/30 rounded-full blur-[120px] -z-10" />
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // };

// // // // // // // export default GlassOrbit;


// // // // // // import React from 'react';
// // // // // // import { motion } from 'framer-motion';

// // // // // // const GlassOrbit = () => {
// // // // // //   // 8 lenses for a clean, non-overlapping circle
// // // // // //   const lenses = Array.from({ length: 8 });

// // // // // //   return (
// // // // // //     <div className="relative flex items-center justify-center min-h-screen bg-[#fcfcfe] overflow-hidden">

// // // // // //       {/* Central Content */}
// // // // // //       <div className="z-20 text-center pointer-events-none select-none px-4">
// // // // // //         <h1 className="text-4xl md:text-6xl font-extrabold text-[#1a1a1a] leading-[1.1] mb-4">
// // // // // //           World's First <br />
// // // // // //           <span className="bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600">
// // // // // //             API-Driven Marketing Agency
// // // // // //           </span>
// // // // // //         </h1>
// // // // // //         <p className="text-slate-400 text-sm md:text-lg max-w-md mx-auto font-medium">
// // // // // //           Automate, Integrate, and Scale Your Marketing powered by real-time data, AI, and performance APIs.
// // // // // //         </p>
// // // // // //       </div>

// // // // // //       {/* 3D Orbit Scene */}
// // // // // //       <div className="absolute inset-0 flex items-center justify-center [perspective:1200px] [transform-style:preserve-3d]">
// // // // // //         {lenses.map((_, i) => {
// // // // // //           const angle = (i * 360) / lenses.length; // Evenly spaces them to prevent overlapping

// // // // // //           return (
// // // // // //             <motion.div
// // // // // //               key={i}
// // // // // //               className="absolute [transform-style:preserve-3d]"
// // // // // //               initial={{ rotate: angle }}
// // // // // //               animate={{ rotate: angle + 360 }}
// // // // // //               transition={{
// // // // // //                 duration: 25,
// // // // // //                 repeat: Infinity,
// // // // // //                 ease: "linear"
// // // // // //               }}
// // // // // //               style={{ width: '650px' }} // The "radius" of the circle
// // // // // //             >
// // // // // //               <motion.div
// // // // // //                 className="relative"
// // // // // //                 animate={{
// // // // // //                   // Complex rotation to match the video's "flipping" glass look
// // // // // //                   rotateY: [0, 180, 360],
// // // // // //                   rotateX: [10, -10, 10],
// // // // // //                   y: [0, -25, 0]
// // // // // //                 }}
// // // // // //                 transition={{
// // // // // //                   duration: 12,
// // // // // //                   repeat: Infinity,
// // // // // //                   ease: "easeInOut",
// // // // // //                   delay: i * 0.5 // Staggers the "flip" so they don't all move in unison
// // // // // //                 }}
// // // // // //               >
// // // // // //                 {/* The Glass Lens */}
// // // // // //                 <div className="w-24 h-24 md:w-32 md:h-32 rounded-full 
// // // // // //                                 bg-gradient-to-br from-blue-300/20 to-purple-400/10 
// // // // // //                                 backdrop-blur-[12px] border-[0.5px] border-white/50
// // // // // //                                 shadow-[0_10px_40px_rgba(100,120,255,0.15)]
// // // // // //                                 ring-1 ring-white/20 overflow-hidden">

// // // // // //                   {/* Sheen/Refraction Effect (The "Shiny" bit) */}
// // // // // //                   <div className="absolute inset-0 bg-gradient-to-tr from-white/30 via-transparent to-transparent opacity-40" />

// // // // // //                   {/* Lens Edge Thickness (Internal Shadow) */}
// // // // // //                   <div className="absolute inset-[2px] rounded-full border border-blue-200/20 shadow-inner" />
// // // // // //                 </div>
// // // // // //               </motion.div>
// // // // // //             </motion.div>
// // // // // //           );
// // // // // //         })}
// // // // // //       </div>

// // // // // //       {/* Subtle Background Lighting */}
// // // // // //       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-50 rounded-full blur-[100px] opacity-60 -z-10" />
// // // // // //     </div>
// // // // // //   );
// // // // // // };

// // // // // // export default GlassOrbit;


// // // // // import React from "react";
// // // // // import { motion } from "framer-motion";

// // // // // const GlassOrbit = () => {
// // // // //   const lenses = Array.from({ length: 8 });
// // // // //   const radius = 280; // true orbit radius

// // // // //   return (
// // // // //     <div className="relative flex items-center justify-center min-h-screen bg-[#EDF0F4] overflow-hidden">

// // // // //       {/* Center Content */}
// // // // //       <div className="z-20 text-center pointer-events-none select-none px-4">
// // // // //         <h1 className="text-4xl md:text-6xl font-extrabold text-[#111827] leading-[1.1] mb-4">
// // // // //           World's First <br />
// // // // //           <span className="bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-500">
// // // // //             API-Driven Marketing Agency
// // // // //           </span>
// // // // //         </h1>
// // // // //         <p className="text-slate-500 text-sm md:text-lg max-w-md mx-auto font-medium">
// // // // //           Automate, Integrate, and Scale Your Marketing powered by real-time data.
// // // // //         </p>
// // // // //       </div>

// // // // //       {/* Orbit System */}
// // // // //       <motion.div
// // // // //         className="absolute inset-0 flex items-center justify-center"
// // // // //         animate={{ rotate: 360 }}
// // // // //         transition={{
// // // // //           duration: 30,
// // // // //           repeat: Infinity,
// // // // //           ease: "linear",
// // // // //         }}
// // // // //       >
// // // // //         {lenses.map((_, i) => {
// // // // //           const angle = (i * 360) / lenses.length;

// // // // //           return (
// // // // //             <div
// // // // //               key={i}
// // // // //               className="absolute"
// // // // //               style={{
// // // // //                 transform: `
// // // // //                   rotate(${angle}deg)
// // // // //                   translateX(${radius}px)
// // // // //                   rotate(-${angle}deg)
// // // // //                 `,
// // // // //               }}
// // // // //             >
// // // // //               {/* Glass Lens */}
// // // // //               <motion.div
// // // // //                 animate={{
// // // // //                   y: [0, -15, 0],
// // // // //                 }}
// // // // //                 transition={{
// // // // //                   duration: 6,
// // // // //                   repeat: Infinity,
// // // // //                   ease: "easeInOut",
// // // // //                   delay: i * 0.3,
// // // // //                 }}
// // // // //                 className="relative w-24 h-24 md:w-32 md:h-32 rounded-full 
// // // // //                            bg-gradient-to-br from-white/60 to-blue-200/40
// // // // //                            backdrop-blur-xl 
// // // // //                            border border-white/70
// // // // //                            shadow-[0_15px_60px_rgba(120,150,255,0.15)]
// // // // //                            ring-1 ring-white/40"
// // // // //               >
// // // // //                 {/* Shine */}
// // // // //                 <div className="absolute inset-0 bg-gradient-to-tr from-white/70 via-transparent to-transparent opacity-50 rounded-full" />

// // // // //                 {/* Inner Edge */}
// // // // //                 <div className="absolute inset-[3px] rounded-full border border-blue-100/40 shadow-inner" />
// // // // //               </motion.div>
// // // // //             </div>
// // // // //           );
// // // // //         })}
// // // // //       </motion.div>

// // // // //       {/* Soft Center Glow */}
// // // // //       <div className="absolute w-[700px] h-[700px] bg-blue-200/30 rounded-full blur-[120px] -z-10" />
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default GlassOrbit;

// // // // import React from "react";
// // // // import { motion } from "framer-motion";

// // // // const GlassOrbit = () => {
// // // //   const lenses = Array.from({ length: 10 });
// // // //   const radius = 450; // true orbit radius

// // // //   return (
// // // //     <div className="relative flex items-center justify-center min-h-screen bg-[#EDF0F4] overflow-hidden">

// // // //       {/* Center Content */}
// // // //       <div className="z-20 text-center pointer-events-none select-none px-4">
// // // //         <h1 className="text-4xl md:text-6xl font-extrabold text-[#111827] leading-[1.1] mb-4">
// // // //           World's First <br />
// // // //           <span className="bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-500">
// // // //             API-Driven Marketing Agency
// // // //           </span>
// // // //         </h1>
// // // //         <p className="text-slate-500 text-sm md:text-lg max-w-md mx-auto font-medium">
// // // //           Automate, Integrate, and Scale Your Marketing powered by real-time data.
// // // //         </p>
// // // //       </div>

// // // //       {/* Orbit System */}
// // // //       <motion.div
// // // //         className="absolute inset-0 flex items-center justify-center"
// // // //         animate={{ rotate: 360 }}
// // // //         transition={{
// // // //           duration: 30,
// // // //           repeat: Infinity,
// // // //           ease: "linear",
// // // //         }}
// // // //       >
// // // //         {lenses.map((_, i) => {
// // // //           const angle = (i * 360) / lenses.length;

// // // //           return (
// // // //             <div
// // // //               key={i}
// // // //               className="absolute"
// // // //               style={{
// // // //                 transform: `
// // // //                   rotate(${angle}deg)
// // // //                   translateX(${radius}px)
// // // //                   rotate(-${angle}deg)
// // // //                 `,
// // // //               }}
// // // //             >
// // // //               {/* Glass Lens */}
// // // //               <motion.div
// // // //                 animate={{
// // // //                   y: [0, -15, 0],
// // // //                 }}
// // // //                 transition={{
// // // //                   duration: 6,
// // // //                   repeat: Infinity,
// // // //                   ease: "easeInOut",
// // // //                   delay: i * 0.3,
// // // //                 }}
// // // //                 className="relative w-44 h-44 md:w-44 md:h-44 rounded-full 
// // // //                            bg-gradient-to-br from-white/60 to-blue-600/40
// // // //                            backdrop-blur-xl 
// // // //                            border border-white/70
// // // //                            shadow-[0_15px_60px_rgba(120,150,255,0.15)]
// // // //                            ring-1 ring-white/40"
// // // //               >
// // // //                 {/* Shine */}
// // // //                 <div className="absolute inset-0 bg-gradient-to-tr from-white/70 via-transparent to-transparent opacity-50 rounded-full" />

// // // //                 {/* Inner Edge */}
// // // //                 <div className="absolute inset-[3px] rounded-full border border-blue-100/40 shadow-inner" />
// // // //               </motion.div>
// // // //             </div>
// // // //           );
// // // //         })}
// // // //       </motion.div>

// // // //       {/* Soft Center Glow */}
// // // //       <div className="absolute w-[700px] h-[700px] bg-blue-200/30 rounded-full blur-[120px] -z-10" />
// // // //     </div>
// // // //   );
// // // // };

// // // // export default GlassOrbit;

// // // import React from "react";
// // // import { motion } from "framer-motion";

// // // const GlassOrbit = () => {
// // //   const lenses = Array.from({ length: 10 });

// // //   const radiusX = 450; // left-right (wide)
// // //   const radiusY = 400; // up-down (smaller = oval shape)

// // //   return (
// // //     <div className="relative flex items-center justify-center min-h-screen bg-[#EDF0F4] overflow-hidden">

// // //       {/* Center Content */}
// // //       <div className="z-20 text-center pointer-events-none select-none px-4">
// // //         <h1 className="text-4xl md:text-6xl font-extrabold text-[#111827] leading-[1.1] mb-4">
// // //           World's First <br />
// // //           <span className="bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-500">
// // //             API-Driven Marketing Agency
// // //           </span>
// // //         </h1>
// // //         <p className="text-slate-500 text-sm md:text-lg max-w-md mx-auto font-medium">
// // //           Automate, Integrate, and Scale Your Marketing powered by real-time data.
// // //         </p>
// // //       </div>

// // //       {/* Orbit System */}
// // //       <motion.div
// // //         className="absolute inset-0 flex items-center justify-center"
// // //         animate={{ rotate: 360 }}
// // //         transition={{
// // //           duration: 30,
// // //           repeat: Infinity,
// // //           ease: "linear",
// // //         }}
// // //       >
// // //         {lenses.map((_, i) => {
// // //           const angle = (i * 360) / lenses.length;
// // //           const rad = (angle * Math.PI) / 180;

// // //           const x = Math.cos(rad) * radiusX;
// // //           const y = Math.sin(rad) * radiusY;

// // //           return (
// // //             <div
// // //               key={i}
// // //               className="absolute"
// // //               style={{
// // //                 transform: `translate(${x}px, ${y}px)`,
// // //               }}
// // //             >
// // //               {/* Glass Lens */}
// // //               <motion.div
// // //                 animate={{ y: [0, -15, 0] }}
// // //                 transition={{
// // //                   duration: 6,
// // //                   repeat: Infinity,
// // //                   ease: "easeInOut",
// // //                   delay: i * 0.3,
// // //                 }}
// // //                 className="relative w-44 h-44 rounded-full 
// // //                            bg-gradient-to-br from-white/60 to-blue-600/40
// // //                            backdrop-blur-xl 
// // //                            border border-white/70
// // //                            shadow-[0_15px_60px_rgba(120,150,255,0.15)]
// // //                            ring-1 ring-white/40"
// // //               >
// // //                 <div className="absolute inset-0 bg-gradient-to-tr from-white/70 via-transparent to-transparent opacity-50 rounded-full" />
// // //                 <div className="absolute inset-[3px] rounded-full border border-blue-100/40 shadow-inner" />
// // //               </motion.div>
// // //             </div>
// // //           );
// // //         })}
// // //       </motion.div>

// // //       {/* Soft Center Glow */}
// // //       <div className="absolute w-[700px] h-[700px] bg-blue-200/30 rounded-full blur-[120px] -z-10" />
// // //     </div>
// // //   );
// // // };

// // // export default GlassOrbit;


// // import React, { useEffect } from "react";
// // import { motion, useMotionValue, useTransform } from "framer-motion";

// // const GlassOrbit = () => {
// //   const lenses = Array.from({ length: 10 });

// //   // Responsive radius
// //   const radiusX = typeof window !== "undefined"
// //     ? window.innerWidth < 768 ? 180 : 420
// //     : 420;

// //   const radiusY = typeof window !== "undefined"
// //     ? window.innerWidth < 768 ? 70 : 160
// //     : 160;

// //   const angle = useMotionValue(0);

// //   // Clockwise rotation
// //   useEffect(() => {
// //     const animate = () => {
// //       angle.set((angle.get() + 0.05) % 360);
// //       requestAnimationFrame(animate);
// //     };
// //     animate();
// //   }, [angle]);

// //   return (
// //     <div className="relative flex items-center justify-center min-h-[90vh] bg-[#EDF0F4] overflow-hidden px-6">

// //       {/* Center Content */}
// //       <div className="z-20 text-center max-w-xl">
// //         <h1 className="text-3xl md:text-6xl font-extrabold text-[#111827] leading-[1.1] mb-4">
// //           World's First <br />
// //           <span className="bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-500">
// //             API-Driven Marketing Agency
// //           </span>
// //         </h1>
// //         <p className="text-slate-500 text-sm md:text-lg font-medium">
// //           Automate, Integrate, and Scale Your Marketing powered by real-time data.
// //         </p>
// //       </div>

// //       {/* Orbit */}
// //       <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
// //         {lenses.map((_, i) => {
// //           const offset = (i * 360) / lenses.length;

// //           const x = useTransform(angle, (a) => {
// //             const rad = ((a + offset) * Math.PI) / 180;
// //             return Math.cos(rad) * radiusX;
// //           });

// //           const y = useTransform(angle, (a) => {
// //             const rad = ((a + offset) * Math.PI) / 180;
// //             return Math.sin(rad) * radiusY;
// //           });

// //           return (
// //             <motion.div
// //               key={i}
// //               style={{ x, y }}
// //               className="absolute"
// //             >
// //               <div
// //                 className="
// //                   relative 
// //                   w-20 h-20 md:w-40 md:h-40
// //                   rounded-full
// //                   bg-gradient-to-br from-white/70 to-blue-400/40
// //                   backdrop-blur-2xl
// //                   border border-white/70
// //                   shadow-[0_20px_80px_rgba(100,120,255,0.18)]
// //                   ring-1 ring-white/40
// //                 "
// //               >
// //                 <div className="absolute inset-0 bg-gradient-to-tr from-white/80 via-transparent to-transparent opacity-50 rounded-full" />
// //                 <div className="absolute inset-[4px] rounded-full border border-blue-100/40 shadow-inner" />
// //               </div>
// //             </motion.div>
// //           );
// //         })}
// //       </div>

// //       {/* Soft Background Glow */}
// //       <div className="absolute w-[500px] md:w-[800px] h-[500px] md:h-[800px] bg-blue-200/30 rounded-full blur-[140px] -z-10" />
// //     </div>
// //   );
// // };

// // export default GlassOrbit;

// import React from "react";
// import { motion, useTime, useTransform } from "framer-motion";

// const GlassOrbit = () => {
//   const lenses = Array.from({ length: 8 }); // Reduced count for better visual spacing

//   // Base settings for the "3D" feel
//   const radiusX = 300; 
//   const radiusY = 250; // Flattened Y gives the perspective look
//   const duration = 30000; // 20 seconds per rotation

//   const time = useTime();
//   const rotate = useTransform(time, [0, duration], [0, 360], { clamp: false });

//   return (
//     <div className="relative flex items-center justify-center min-h-[90vh] bg-[#EDF0F4] overflow-hidden px-6 perspective-[1000px]">
      
//       {/* Center Content */}
//       <div className="z-20 text-center max-w-xl pointer-events-none">
//         <h1 className="text-3xl md:text-6xl font-extrabold text-[#111827] leading-[1.1] mb-4">
//           World's First <br />
//           <span className="bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-500">
//             API-Driven Marketing Agency
//           </span>
//         </h1>
//         <p className="text-slate-500 text-sm md:text-lg font-medium">
//           Automate, Integrate, and Scale Your Marketing powered by real-time data.
//         </p>
//       </div>

//       {/* Orbit Container */}
//       <div className="absolute inset-0 flex items-center justify-center">
//         {lenses.map((_, i) => {
//           const angleOffset = (i * 360) / lenses.length;

//           // X Position (Width of the oval)
//           const x = useTransform(rotate, (v) => {
//             const rad = ((v + angleOffset) * Math.PI) / 180;
//             return Math.cos(rad) * radiusX;
//           });

//           // Y Position (Height of the oval)
//           const y = useTransform(rotate, (v) => {
//             const rad = ((v + angleOffset) * Math.PI) / 180;
//             return Math.sin(rad) * radiusY;
//           });

//           // Scale: Larger when in front (sin > 0), Smaller when behind (sin < 0)
//           const scale = useTransform(rotate, (v) => {
//             const rad = ((v + angleOffset) * Math.PI) / 180;
//             return 0.6 + (Math.sin(rad) + 1) * 0.2; // Ranges from 0.6 to 1.0
//           });

//           // Z-Index and Opacity based on depth
//           const zIndex = useTransform(rotate, (v) => {
//             const rad = ((v + angleOffset) * Math.PI) / 180;
//             return Math.sin(rad) > 0 ? 30 : 10; // Front vs Back
//           });

//           const opacity = useTransform(rotate, (v) => {
//             const rad = ((v + angleOffset) * Math.PI) / 180;
//             return 0.4 + (Math.sin(rad) + 1) * 0.3; // Fades slightly when at the back
//           });

//           return (
//             <motion.div
//               key={i}
//               style={{ x, y, scale, zIndex, opacity }}
//               className="absolute"
//             >
//               <div
//                 className="
//                   relative 
//                   w-34 h-34 md:w-34 md:h-34
//                   rounded-full
//                   bg-gradient-to-br from-white/60 to-blue-400/90
//                   backdrop-blur-xl
//                   border border-white/80
//                   shadow-[0_20px_60px_rgba(100,120,255,0.15)]
//                 "
//               >
//               </div>
//             </motion.div>
//           );
//         })}
//       </div>

//       {/* Background Glow */}
//       <div className="absolute w-[600px] h-[600px] bg-blue-200/40 rounded-full blur-[120px] -z-10" />
//     </div>
//   );
// };

// export default GlassOrbit;



import React from "react";
import { motion, useTime, useTransform } from "framer-motion";

const GlassOrbit = () => {
  const lenses = Array.from({ length: 8 });

  const radiusX = 300; 
  const radiusY = 250;
  const duration = 30000;

  const time = useTime();
  const rotate = useTransform(time, [0, duration], [0, 360], { clamp: false });

  return (
    <div className="relative flex items-center justify-center min-h-[90vh] bg-[#EDF0F4] bg-[url('https://res.cloudinary.com/dtwcgfmar/image/upload/v1772538064/8_hrm1he.jpg')] bg-cover bg-center bg-no-repeat overflow-hidden px-6 perspective-[1000px]">
      
      {/* Center Content */}
      <div className="z-20 text-center max-w-xl pointer-events-none">
        <h1 className="text-3xl md:text-6xl font-extrabold text-[#111827] leading-[1.1] mb-4">
          World's First <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-500">
            API-Driven Marketing Agency
          </span>
        </h1>
        <p className="text-slate-500 text-sm md:text-lg font-medium">
          Automate, Integrate, and Scale Your Marketing powered by real-time data.
        </p>
      </div>

      {/* Orbit Container */}
      <div className="absolute inset-0 flex items-center justify-center">
        {lenses.map((_, i) => {
          const angleOffset = (i * 360) / lenses.length;

          const x = useTransform(rotate, (v) => {
            const rad = ((v + angleOffset) * Math.PI) / 180;
            return Math.cos(rad) * radiusX;
          });

          const y = useTransform(rotate, (v) => {
            const rad = ((v + angleOffset) * Math.PI) / 180;
            return Math.sin(rad) * radiusY;
          });

          const scale = useTransform(rotate, (v) => {
            const rad = ((v + angleOffset) * Math.PI) / 180;
            return 0.6 + (Math.sin(rad) + 1) * 0.2;
          });

          const zIndex = useTransform(rotate, (v) => {
            const rad = ((v + angleOffset) * Math.PI) / 180;
            return Math.sin(rad) > 0 ? 30 : 10;
          });

          const opacity = useTransform(rotate, (v) => {
            const rad = ((v + angleOffset) * Math.PI) / 180;
            return 0.4 + (Math.sin(rad) + 1) * 0.3;
          });

          return (
            <motion.div
              key={i}
              style={{ x, y, scale, zIndex, opacity }}
              className="absolute"
            >
              <div
                className="
                  relative 
                  w-34 h-34 md:w-34 md:h-34
                  rounded-full
                  bg-gradient-to-br from-white/60 to-blue-400/90
                  backdrop-blur-xl
                  border border-white/80
                  shadow-[0_20px_60px_rgba(100,120,255,0.15)]
                "
              >
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Background Glow */}
      <div className="absolute w-[600px] h-[600px] bg-blue-200/40 rounded-full blur-[120px] -z-10" />
    </div>
  );
};

export default GlassOrbit;