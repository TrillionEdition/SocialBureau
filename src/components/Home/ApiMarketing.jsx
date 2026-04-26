// // // // // // // // // // // // // import { motion } from "framer-motion";
// // // // // // // // // // // // // import { useNavigate } from "react-router-dom";

// // // // // // // // // // // // // const ApiMarketing = () => {
// // // // // // // // // // // // //     const navigate = useNavigate();

// // // // // // // // // // // // //     return (
// // // // // // // // // // // // //         <section className="bg-white flex items-center py-12 md:py-24">
// // // // // // // // // // // // //             <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center w-full">

// // // // // // // // // // // // //                 <motion.div
// // // // // // // // // // // // //                     initial={{ opacity: 0, y: 20 }}
// // // // // // // // // // // // //                     animate={{ opacity: 1, y: 0 }}
// // // // // // // // // // // // //                     transition={{ duration: 0.6 }}
// // // // // // // // // // // // //                 >
// // // // // // // // // // // // //                     <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-black mb-6 tracking-tighter leading-[1.1]">
// // // // // // // // // // // // //                         World’s First
// // // // // // // // // // // // //                         <br />
// // // // // // // // // // // // //                         <span className="bg-gradient-to-r from-black via-black/70 to-black/40 bg-clip-text text-transparent">
// // // // // // // // // // // // //                             API-Driven
// // // // // // // // // // // // //                         </span>
// // // // // // // // // // // // //                         <br />
// // // // // // // // // // // // //                         Marketing Agency
// // // // // // // // // // // // //                     </h1>

// // // // // // // // // // // // //                     <p className="text-base sm:text-lg md:text-xl text-black/60 max-w-md mb-8">
// // // // // // // // // // // // //                         Automate, Integrate, and Scale Your Marketing powered by real-time
// // // // // // // // // // // // //                         data, AI, and performance APIs.
// // // // // // // // // // // // //                     </p>

// // // // // // // // // // // // //                     <div className="flex flex-col sm:flex-row gap-4">
// // // // // // // // // // // // //                         <button onClick={() => navigate("/services")} className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white rounded-full font-bold text-xs uppercase tracking-[0.2em]"
// // // // // // // // // // // // //                         >
// // // // // // // // // // // // //                             Get Started
// // // // // // // // // // // // //                         </button>
// // // // // // // // // // // // //                     </div>
// // // // // // // // // // // // //                 </motion.div>

// // // // // // // // // // // // //             </div>
// // // // // // // // // // // // //         </section>
// // // // // // // // // // // // //     );
// // // // // // // // // // // // // };

// // // // // // // // // // // // // export default ApiMarketing;

// // // // // // // // // // import { motion } from "framer-motion";
// // // // // // // // // // import { useNavigate } from "react-router-dom";

// // // // // // // // // // const ApiMarketing = () => {
// // // // // // // // // //   const navigate = useNavigate();
// // // // // // // // // //   const luxuryEase = [0.22, 1, 0.36, 1];

// // // // // // // // // //   const container = {
// // // // // // // // // //     hidden: { opacity: 1 },
// // // // // // // // // //     show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } }
// // // // // // // // // //   };

// // // // // // // // // //   const item = {
// // // // // // // // // //     hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
// // // // // // // // // //     show: {
// // // // // // // // // //       opacity: 1, y: 0, filter: "blur(0px)",
// // // // // // // // // //       transition: { duration: 1.2, ease: luxuryEase }
// // // // // // // // // //     }
// // // // // // // // // //   };

// // // // // // // // // //   return (
// // // // // // // // // //     <section className="relative w-full min-h-screen flex items-center overflow-hidden bg-[#fafafa]">

// // // // // // // // // //       {/* BACKGROUND IMAGE - Only visible on Tablet (md) and up */}
// // // // // // // // // //       <img
// // // // // // // // // //         src="https://res.cloudinary.com/dtwcgfmar/image/upload/v1772878190/ChatGPT_Image_Mar_7_2026_03_38_48_PM_tpzza6.webp"
// // // // // // // // // //         alt="API Marketing"
// // // // // // // // // //         className="hidden md:block absolute inset-0 w-full h-full object-cover object-[center_15%]"
// // // // // // // // // //       />

// // // // // // // // // //       {/* CONTENT - Centered on Mobile, Left-Aligned on Desktop */}
// // // // // // // // // //       <div className="relative z-10 w-full max-w-7xl mx-auto px-6 flex justify-center md:justify-start text-center md:text-left">
// // // // // // // // // //         <motion.div
// // // // // // // // // //           variants={container}
// // // // // // // // // //           initial="hidden"
// // // // // // // // // //           whileInView="show"
// // // // // // // // // //           viewport={{ once: true }}
// // // // // // // // // //           className="max-w-xl"
// // // // // // // // // //         >
// // // // // // // // // //           {/* Headline */}
// // // // // // // // // //           <motion.h1
// // // // // // // // // //             variants={item}
// // // // // // // // // //             className="text-4xl sm:text-5xl md:text-7xl font-black text-black mb-6 tracking-tighter leading-[1.1]"
// // // // // // // // // //           >
// // // // // // // // // //             World’s First
// // // // // // // // // //             <br />
// // // // // // // // // //             <span className="bg-gradient-to-r from-black via-black/60 to-black/30 bg-clip-text text-transparent">
// // // // // // // // // //               API-Driven
// // // // // // // // // //             </span>
// // // // // // // // // //             <br />
// // // // // // // // // //             Marketing Agency
// // // // // // // // // //           </motion.h1>

// // // // // // // // // //           {/* Subtext - Centered container for mobile */}
// // // // // // // // // //           <motion.p
// // // // // // // // // //             variants={item}
// // // // // // // // // //             className="text-base sm:text-lg md:text-xl text-black/70 mx-auto md:mx-0 max-w-md mb-8 leading-relaxed"
// // // // // // // // // //           >
// // // // // // // // // //             Automate, Integrate, and Scale Your Marketing powered by real-time data, AI, and performance APIs
// // // // // // // // // //           </motion.p>

// // // // // // // // // //           {/* Button */}
// // // // // // // // // //           <motion.div variants={item}>
// // // // // // // // // //             <button
// // // // // // // // // //               onClick={() => navigate("/api-marketing-agency-in-kochi")}
// // // // // // // // // //               className="px-10 py-4 bg-black text-white rounded-full font-bold text-[10px] uppercase tracking-[0.3em] transition-all duration-500 hover:bg-red-600"
// // // // // // // // // //             >
// // // // // // // // // //               Get Started
// // // // // // // // // //             </button>
// // // // // // // // // //           </motion.div>
// // // // // // // // // //         </motion.div>
// // // // // // // // // //       </div>
// // // // // // // // // //     </section>
// // // // // // // // // //   );
// // // // // // // // // // };

// // // // // // // // // // export default ApiMarketing;





// // // // // // // import { motion } from "framer-motion";
// // // // // // // import { useNavigate } from "react-router-dom";

// // // // // // // const ApiMarketing = () => {
// // // // // // //   const navigate = useNavigate();
// // // // // // //   const luxuryEase = [0.22, 1, 0.36, 1];

// // // // // // //   const container = {
// // // // // // //     hidden: { opacity: 1 },
// // // // // // //     show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } }
// // // // // // //   };

// // // // // // //   const item = {
// // // // // // //     hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
// // // // // // //     show: {
// // // // // // //       opacity: 1, y: 0, filter: "blur(0px)",
// // // // // // //       transition: { duration: 1.2, ease: luxuryEase }
// // // // // // //     }
// // // // // // //   };

// // // // // // //   return (
// // // // // // //     <section className="relative w-full min-h-screen flex items-center overflow-hidden">

// // // // // // //       {/* GRADIENT BACKGROUND - Red gradient like the image */}
// // // // // // //       <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a1a] via-red-900 to-red-700 z-0"></div>

// // // // // // //       {/* CONTAINER - Flex layout with image on left, content on right */}
// // // // // // //       <div className="relative z-10 w-full max-w-7xl mx-auto px-6 flex items-center gap-8 md:gap-12">

// // // // // // //         {/* LEFT SIDE - IMAGE */}
// // // // // // //         <motion.div
// // // // // // //           initial={{ opacity: 0, x: -50 }}
// // // // // // //           whileInView={{ opacity: 1, x: 0 }}
// // // // // // //           transition={{ duration: 1, ease: luxuryEase }}
// // // // // // //           viewport={{ once: true }}
// // // // // // //           className="hidden md:flex flex-1 justify-center"
// // // // // // //         >
// // // // // // //           <img
// // // // // // //             src="https://res.cloudinary.com/dtwcgfmar/image/upload/v1773048754/Adobe_Express_-_file_1_s8y5h5.webp"
// // // // // // //             alt="API Marketing Professional"
// // // // // // //             className="w-full max-w-md h-auto object-contain"
// // // // // // //           />
// // // // // // //         </motion.div>

// // // // // // //         {/* RIGHT SIDE - CONTENT */}
// // // // // // //         <motion.div
// // // // // // //           variants={container}
// // // // // // //           initial="hidden"
// // // // // // //           whileInView="show"
// // // // // // //           viewport={{ once: true }}
// // // // // // //           className="flex-1 text-center md:text-left max-w-2xl mx-auto md:mx-0"
// // // // // // //         >
// // // // // // //           {/* Headline */}
// // // // // // //           <motion.h1
// // // // // // //             variants={item}
// // // // // // //             className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 md:mb-6 tracking-tight leading-[1.2]"
// // // // // // //           >
// // // // // // //             World's First API
// // // // // // //             <br />
// // // // // // //             Marketing Agency
// // // // // // //           </motion.h1>

// // // // // // //           {/* Subtext */}
// // // // // // //           <motion.p
// // // // // // //             variants={item}
// // // // // // //             className="text-base sm:text-lg md:text-xl text-white/90 mb-6 md:mb-8 leading-relaxed"
// // // // // // //           >
// // // // // // //             Automate your ads, content, analytics & sales with API + AI
// // // // // // //           </motion.p>

// // // // // // //           {/* Button */}
// // // // // // //           <motion.div variants={item}>
// // // // // // //             <button
// // // // // // //               onClick={() => navigate("/api-marketing-agency-in-kochi")}
// // // // // // //               className="px-8 md:px-10 py-3 md:py-4 bg-[#0071E3] text-white rounded-full font-semibold text-sm md:text-base transition-all duration-500 hover:bg-blue-700 shadow-lg hover:shadow-xl"
// // // // // // //             >
// // // // // // //               → Start API Marketing Today
// // // // // // //             </button>
// // // // // // //           </motion.div>
// // // // // // //         </motion.div>
// // // // // // //       </div>
// // // // // // //     </section>
// // // // // // //   );
// // // // // // // };

// // // // // // // export default ApiMarketing;


// // // // // // import { motion } from "framer-motion";
// // // // // // import { useNavigate } from "react-router-dom";

// // // // // // const ApiMarketing = () => {
// // // // // //   const navigate = useNavigate();
// // // // // //   const luxuryEase = [0.22, 1, 0.36, 1];

// // // // // //   const container = {
// // // // // //     hidden: { opacity: 1 },
// // // // // //     show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } }
// // // // // //   };

// // // // // //   const item = {
// // // // // //     hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
// // // // // //     show: {
// // // // // //       opacity: 1, y: 0, filter: "blur(0px)",
// // // // // //       transition: { duration: 1.2, ease: luxuryEase }
// // // // // //     }
// // // // // //   };

// // // // // //   return (
// // // // // //     <section className="relative w-full min-h-screen flex items-center overflow-hidden">

// // // // // //       {/* BACKGROUND - Split layout: Dark left, Red right */}
// // // // // //       <div className="absolute inset-0 flex z-0">
// // // // // //         {/* LEFT - Dark overlay */}
// // // // // //         <div className="w-0 md:w-1/2 bg-gradient-to-r from-black/80 to-red-900/40"></div>
// // // // // //         {/* RIGHT - Red gradient */}
// // // // // //         <div className="w-full md:w-1/2 bg-gradient-to-r from-red-700 to-red-500"></div>
// // // // // //       </div>

// // // // // //       {/* CONTAINER */}
// // // // // //       <div className="relative z-10 w-full h-full max-w-7xl mx-auto flex items-center">

// // // // // //         {/* LEFT SIDE - IMAGE (positioned absolutely, overlapping) */}
// // // // // //         <motion.div
// // // // // //           initial={{ opacity: 0, x: -100 }}
// // // // // //           whileInView={{ opacity: 1, x: 0 }}
// // // // // //           transition={{ duration: 1.2, ease: luxuryEase }}
// // // // // //           viewport={{ once: true }}
// // // // // //           className="hidden md:block absolute left-0 bottom-0 w-1/2 h-full flex items-end justify-start pl-6"
// // // // // //         >
// // // // // //           <img
// // // // // //             src="https://res.cloudinary.com/dtwcgfmar/image/upload/v1773048754/Adobe_Express_-_file_1_s8y5h5.webp"
// // // // // //             alt="API Marketing Professional"
// // // // // //             className="h-full object-contain object-bottom max-w-sm"
// // // // // //           />
// // // // // //         </motion.div>

// // // // // //         {/* RIGHT SIDE - CONTENT */}
// // // // // //         <motion.div
// // // // // //           variants={container}
// // // // // //           initial="hidden"
// // // // // //           whileInView="show"
// // // // // //           viewport={{ once: true }}
// // // // // //           className="w-full md:w-1/2 md:ml-auto px-6 md:px-12 py-20 md:py-0 text-center md:text-left flex flex-col justify-center h-screen"
// // // // // //         >
// // // // // //           {/* Headline */}
// // // // // //           <motion.h1
// // // // // //             variants={item}
// // // // // //             className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 md:mb-6 tracking-tight leading-[1.15]"
// // // // // //           >
// // // // // //             World's First API Marketing <span className="block">Agency</span>
// // // // // //           </motion.h1>

// // // // // //           {/* Subtext */}
// // // // // //           <motion.p
// // // // // //             variants={item}
// // // // // //             className="text-base sm:text-lg md:text-xl text-white/95 mb-8 md:mb-10 leading-relaxed"
// // // // // //           >
// // // // // //             Automate your ads, content, analytics & sales with API + AI
// // // // // //           </motion.p>

// // // // // //           {/* Button */}
// // // // // //           <motion.div variants={item}>
// // // // // //             <button
// // // // // //               onClick={() => navigate("/api-marketing-agency-in-kochi")}
// // // // // //               className="px-8 md:px-12 py-3 md:py-4 bg-[#0071E3] text-white rounded-full font-semibold text-sm md:text-base transition-all duration-500 hover:bg-blue-700 shadow-lg hover:shadow-xl w-fit"
// // // // // //             >
// // // // // //               → Start API Marketing Today
// // // // // //             </button>
// // // // // //           </motion.div>
// // // // // //         </motion.div>
// // // // // //       </div>
// // // // // //     </section>
// // // // // //   );
// // // // // // };

// // // // // // export default ApiMarketing;



// // // // // const ApiMarketing = () => {
// // // // //   return (
// // // // //     <section className="relative w-full h-screen overflow-hidden">
// // // // //       <img
// // // // //         src="https://res.cloudinary.com/dtwcgfmar/image/upload/v1773050640/ChatGPT_Image_Mar_9_2026_03_33_22_PM_ugsl0n.webp"
// // // // //         alt="API Marketing Hero"
// // // // //         className="absolute inset-0 w-full h-full object-cover"
// // // // //       />
// // // // //     </section>
// // // // //   );
// // // // // };

// // // // // export default ApiMarketing;

// // // // const ApiMarketing = () => {
// // // //   return (
// // // //     <section className="relative w-full h-screen overflow-hidden">
// // // //       <img
// // // //         src="https://res.cloudinary.com/dtwcgfmar/image/upload/v1773050640/ChatGPT_Image_Mar_9_2026_03_33_22_PM_ugsl0n.webp"
// // // //         alt="API Marketing Hero"
// // // //         className="absolute inset-0 w-full h-full object-cover object-[center_6%]"
// // // //       />
// // // //     </section>
// // // //   );
// // // // };

// // // // export default ApiMarketing;

// // // const ApiMarketing = () => {
// // //   return (
// // //     <section className="relative w-full h-screen overflow-hidden">
// // //       <img
// // //         src="https://res.cloudinary.com/dtwcgfmar/image/upload/v1773050640/ChatGPT_Image_Mar_9_2026_03_33_22_PM_ugsl0n.webp"
// // //         alt="API Marketing Hero"
// // //         className="absolute inset-0 w-full h-full object-cover object-[center_20%]"
// // //       />
// // //     </section>
// // //   );
// // // };

// // // export default ApiMarketing;


// // const ApiMarketing = () => {
// //   return (
// //     <section className="relative w-full h-screen overflow-hidden">
// //       <img
// //         src="https://res.cloudinary.com/dtwcgfmar/image/upload/v1773050640/ChatGPT_Image_Mar_9_2026_03_33_22_PM_ugsl0n.webp"
// //         alt="API Marketing Hero"
// //         className="w-full h-full object-cover object-[center_20%]"
// //       />
// //     </section>
// //   );
// // };

// // export default ApiMarketing;


// const ApiMarketing = () => {
//   return (
//     <section className="relative w-full min-h-screen overflow-hidden">
//       <img
//         src="https://res.cloudinary.com/dtwcgfmar/image/upload/v1773050640/ChatGPT_Image_Mar_9_2026_03_33_22_PM_ugsl0n.webp"
//         alt="API Marketing Hero"
//         className="w-full min-h-screen object-cover object-[center_20%]"
//       />
//     </section>
//   );
// };

// export default ApiMarketing;

const ApiMarketing = () => {
  return (
    <section className="relative w-full">
      <img
        src="https://res.cloudinary.com/dtwcgfmar/image/upload/v1773061735/Gemini_Generated_Image_oxo5lwoxo5lwoxo5_hjurna.png"
        alt="API Marketing Hero"
        className="max-h-screen w-full object-contain"
      />
    </section>
  );
};

export default ApiMarketing;
