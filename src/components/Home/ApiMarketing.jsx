// // // import { motion } from "framer-motion";
// // // import { useNavigate } from "react-router-dom";

// // // const ApiMarketing = () => {
// // //     const navigate = useNavigate();

// // //     return (
// // //         <section className="bg-white flex items-center py-12 md:py-24">
// // //             <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center w-full">

// // //                 <motion.div
// // //                     initial={{ opacity: 0, y: 20 }}
// // //                     animate={{ opacity: 1, y: 0 }}
// // //                     transition={{ duration: 0.6 }}
// // //                 >
// // //                     <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-black mb-6 tracking-tighter leading-[1.1]">
// // //                         World’s First
// // //                         <br />
// // //                         <span className="bg-gradient-to-r from-black via-black/70 to-black/40 bg-clip-text text-transparent">
// // //                             API-Driven
// // //                         </span>
// // //                         <br />
// // //                         Marketing Agency
// // //                     </h1>

// // //                     <p className="text-base sm:text-lg md:text-xl text-black/60 max-w-md mb-8">
// // //                         Automate, Integrate, and Scale Your Marketing powered by real-time
// // //                         data, AI, and performance APIs.
// // //                     </p>

// // //                     <div className="flex flex-col sm:flex-row gap-4">
// // //                         <button onClick={() => navigate("/services")} className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white rounded-full font-bold text-xs uppercase tracking-[0.2em]"
// // //                         >
// // //                             Get Started
// // //                         </button>
// // //                     </div>
// // //                 </motion.div>

// // //             </div>
// // //         </section>
// // //     );
// // // };

// // // export default ApiMarketing;



// // import { motion } from "framer-motion";
// // import { useNavigate } from "react-router-dom";

// // const ApiMarketing = () => {
// //     const navigate = useNavigate();

// //     const container = {
// //         hidden: {},
// //         show: {
// //             transition: {
// //                 staggerChildren: 0.2
// //             }
// //         }
// //     };

// //     const item = {
// //         hidden: { opacity: 0, y: 30 },
// //         show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
// //     };

// //     return (
// //         <section className="bg-white flex items-center py-16 md:py-24">
// //             <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center w-full">

// //                 {/* LEFT IMAGE */}
// //                 <motion.div
// //                     initial={{ opacity: 0, scale: 0.95 }}
// //                     animate={{ opacity: 1, scale: 1 }}
// //                     transition={{ duration: 0.8 }}
// //                     className="flex justify-center"
// //                 >
// //                     <img
// //                         src="https://images.unsplash.com/photo-1553877522-43269d4ea984"
// //                         alt="API Marketing"
// //                         className="w-full max-w-lg rounded-2xl shadow-xl object-cover"
// //                     />
// //                 </motion.div>

// //                 {/* RIGHT TEXT */}
// //                 <motion.div
// //                     variants={container}
// //                     initial="hidden"
// //                     animate="show"
// //                 >
// //                     <motion.h1
// //                         variants={item}
// //                         className="text-4xl sm:text-5xl md:text-7xl font-black text-black mb-6 tracking-tighter leading-[1.1]"
// //                     >
// //                         World’s First
// //                         <br />
// //                         <span className="bg-gradient-to-r from-black via-black/70 to-black/40 bg-clip-text text-transparent">
// //                             API-Driven
// //                         </span>
// //                         <br />
// //                         Marketing Agency
// //                     </motion.h1>

// //                     <motion.p
// //                         variants={item}
// //                         className="text-base sm:text-lg md:text-xl text-black/60 max-w-md mb-8"
// //                     >
// //                         Automate, Integrate, and Scale Your Marketing powered by real-time
// //                         data, AI, and performance APIs.
// //                     </motion.p>

// //                     <motion.div variants={item}>
// //                         <button
// //                             onClick={() => navigate("/services")}
// //                             className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white rounded-full font-bold text-xs uppercase tracking-[0.2em]"
// //                         >
// //                             Get Started
// //                         </button>
// //                     </motion.div>
// //                 </motion.div>

// //             </div>
// //         </section>
// //     );
// // };

// // export default ApiMarketing;


// import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom";

// const ApiMarketing = () => {
//   const navigate = useNavigate();

//   // Luxury Easing: "Quartic Out" (starts fast, finishes with a very long, smooth deceleration)
//   const luxuryEase = [0.22, 1, 0.36, 1];

//   const container = {
//     hidden: { opacity: 1 }, // Keep container visible to avoid layout jumps
//     show: {
//       transition: { 
//         staggerChildren: 0.12, // Tight stagger for a more professional feel
//         delayChildren: 0.2 
//       }
//     }
//   };

//   const item = {
//     hidden: { 
//       opacity: 0, 
//       y: 20, 
//       filter: "blur(4px)" // Subtle blur adds a "dreamy" high-end reveal
//     },
//     show: { 
//       opacity: 1, 
//       y: 0, 
//       filter: "blur(0px)",
//       transition: { 
//         duration: 1.2, // Longer duration for that "weighty" luxury feel
//         ease: luxuryEase 
//       } 
//     }
//   };

//   return (
//     <section className="relative w-full min-h-screen flex items-center overflow-hidden">

//       {/* STATIC BACKGROUND IMAGE (No Transition) */}
//       <img
//         src="https://res.cloudinary.com/dtwcgfmar/image/upload/v1772878190/ChatGPT_Image_Mar_7_2026_03_38_48_PM_tpzza6.webp"
//         alt="API Marketing"
//         className="absolute inset-0 w-full h-full object-cover object-[center_15%]"
//       />

//       {/* CONTENT */}
//       <div className="relative z-10 w-full max-w-7xl mx-auto px-6 flex justify-start">
//         <motion.div
//           variants={container}
//           initial="hidden"
//           whileInView="show"
//           viewport={{ once: true }}
//           className="max-w-xl"
//         >
//           {/* Headline Reveal */}
//           <motion.h1
//             variants={item}
//             className="text-4xl sm:text-5xl md:text-7xl font-black text-black mb-6 tracking-tighter leading-[1.1]"
//           >
//             World’s First
//             <br />
//             <span className="bg-gradient-to-r from-black via-black/60 to-black/30 bg-clip-text text-transparent">
//               API-Driven
//             </span>
//             <br />
//             Marketing Agency
//           </motion.h1>

//           {/* Subtext Reveal */}
//           <motion.p
//             variants={item}
//             className="text-base sm:text-lg md:text-xl text-black/70 max-w-md mb-8 leading-relaxed"
//           >
//             Automate, Integrate, and Scale Your Marketing powered by real-time
//             data, AI, and performance APIs.
//           </motion.p>

//           {/* Button Reveal */}
//           <motion.div variants={item}>
//             <button
//               onClick={() => navigate("/api-marketing-agency-in-kochi")}
//               className="group relative px-10 py-4 bg-black text-white rounded-full font-bold text-[10px] uppercase tracking-[0.3em] overflow-hidden transition-all duration-500 hover:bg-red-600"
//             >
//               <span className="relative z-10">Get Started</span>
//             </button>
//           </motion.div>
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default ApiMarketing;


import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const ApiMarketing = () => {
  const navigate = useNavigate();
  const luxuryEase = [0.22, 1, 0.36, 1];

  const container = {
    hidden: { opacity: 1 },
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } }
  };

  const item = {
    hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
    show: { 
      opacity: 1, y: 0, filter: "blur(0px)",
      transition: { duration: 1.2, ease: luxuryEase } 
    }
  };

  return (
    <section className="relative w-full min-h-screen flex items-center overflow-hidden bg-[#fafafa]">
      
      {/* BACKGROUND IMAGE - Only visible on Tablet (md) and up */}
      <img
        src="https://res.cloudinary.com/dtwcgfmar/image/upload/v1772878190/ChatGPT_Image_Mar_7_2026_03_38_48_PM_tpzza6.webp"
        alt="API Marketing"
        className="hidden md:block absolute inset-0 w-full h-full object-cover object-[center_15%]"
      />

      {/* CONTENT - Centered on Mobile, Left-Aligned on Desktop */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 flex justify-center md:justify-start text-center md:text-left">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="max-w-xl"
        >
          {/* Headline */}
          <motion.h1
            variants={item}
            className="text-4xl sm:text-5xl md:text-7xl font-black text-black mb-6 tracking-tighter leading-[1.1]"
          >
            World’s First
            <br />
            <span className="bg-gradient-to-r from-black via-black/60 to-black/30 bg-clip-text text-transparent">
              API-Driven
            </span>
            <br />
            Marketing Agency
          </motion.h1>

          {/* Subtext - Centered container for mobile */}
          <motion.p
            variants={item}
            className="text-base sm:text-lg md:text-xl text-black/70 mx-auto md:mx-0 max-w-md mb-8 leading-relaxed"
          >
            Automate, Integrate, and Scale Your Marketing powered by real-time
            data, AI, and performance APIs.
          </motion.p>

          {/* Button */}
          <motion.div variants={item}>
            <button
              onClick={() => navigate("/api-marketing-agency-in-kochi")}
              className="px-10 py-4 bg-black text-white rounded-full font-bold text-[10px] uppercase tracking-[0.3em] transition-all duration-500 hover:bg-red-600"
            >
              Get Started
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ApiMarketing;