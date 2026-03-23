// // // // // // import { motion } from "framer-motion";
// // // // // // import { useRef } from "react";
// // // // // // import { Link } from "react-router-dom";

// // // // // // const TextReveal = ({ text, className, delay = 0 }) => {
// // // // // //   const words = text.split(" ");
// // // // // //   return (
// // // // // //     <div className={`flex flex-wrap ${className}`}>
// // // // // //       {words.map((word, i) => (
// // // // // //         <div key={i} className="overflow-hidden">
// // // // // //           <motion.span
// // // // // //             initial={{ y: "105%" }}
// // // // // //             animate={{ y: 0 }}
// // // // // //             transition={{
// // // // // //               duration: 1,
// // // // // //               delay: delay + i * 0.05,
// // // // // //               ease: [0.16, 1, 0.3, 1]
// // // // // //             }}
// // // // // //             className="inline-block mr-[0.2em] pr-[0.1em] whitespace-nowrap"
// // // // // //           >
// // // // // //             {word}
// // // // // //           </motion.span>
// // // // // //         </div>
// // // // // //       ))}
// // // // // //     </div>
// // // // // //   );
// // // // // // };

// // // const Hero = () => {
// // //   const containerRef = useRef(null);

// // //   return (
// // //     <div ref={containerRef} className="relative min-h-screen bg-[#FFFFFF] selection:bg-[#000000] selection:text-white overflow-hidden">
// // //       <div className="noise" />

// // //       {/* Hero Section */}
// // //       <section className="relative h-screen w-full overflow-hidden bg-[#F8F8F8]">
// // //         <div className="flex flex-col lg:flex-row h-full w-full">

// // //           {/* Image Section */}
// // //           <div className="hidden lg:block relative lg:h-full lg:w-[45%] lg:order-2 overflow-hidden">
// // //             <motion.div
// // //               initial={{ opacity: 0, scale: 1.1 }}
// // //               animate={{ opacity: 1, scale: 1 }}
// // //               transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
// // //               className="h-full w-full"
// // //             >
// // //               <img
// // //                 src="https://res.cloudinary.com/dtwcgfmar/image/upload/v1773048754/Adobe_Express_-_file_1_s8y5h5.webp"
// // //                 alt="API Driven Marketing"
// // //                 className="h-full w-full object-cover object-top lg:object-[center_20%]"
// // //                 referrerPolicy="no-referrer"
// // //               />
// // //               <div className="absolute inset-0 bg-radial-gradient from-transparent to-black/5 lg:hidden" />
// // //             </motion.div>
// // //           </div>

// // //           {/* Text Section */}
// // //           <div className="relative flex min-h-screen flex-col items-center justify-center px-4 pb-12 z-10 lg:h-full lg:w-[55%] lg:items-start lg:px-24 lg:py-0 lg:order-1">

// // //             <motion.div
// // //               initial={{ opacity: 0, y: 40 }}
// // //               animate={{ opacity: 1, y: 0 }}
// // //               transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
// // //               className="w-full max-w-2xl lg:max-w-none"
// // //             >
// // //               <div className="w-full">
// // //                 {/* Mobile Image */}
// // //                 <div className="flex justify-center lg:hidden mb-6">
// // //                   <motion.img
// // //                     src="https://res.cloudinary.com/dtwcgfmar/image/upload/v1764674437/Untitled_design_23_owrydd.png"
// // //                     alt="decorative"
// // //                     initial={{ opacity: 0, scale: 0.9 }}
// // //                     animate={{ opacity: 1, scale: 1 }}
// // //                     transition={{ delay: 0.6, duration: 0.6 }}
// // //                     className="w-14 h-14 object-cover rounded-lg"
// // //                   />
// // //                 </div>
// // //                 <h1 className="font-display text-[10vw] font-bold leading-[1.1] tracking-[-0.04em] text-[#0A0A0A] sm:text-[8vw] md:text-[7vw] lg:text-[5.5vw] text-center lg:text-left">
// // //                   <TextReveal text="World's First" delay={0.2} className="flex flex-wrap justify-center lg:justify-start" />
// // //                   <div className="flex flex-wrap items-center justify-center lg:justify-start">
// // //                     <TextReveal text="API-" delay={0.4} />
// // //                     <motion.span
// // //                       initial={{ opacity: 0, rotate: -5 }}
// // //                       animate={{ opacity: 1, rotate: 0 }}
// // //                       transition={{ delay: 0.8, duration: 1 }}
// // //                       className="text-neutral-600 italic font-serif text-[9vw] sm:text-[7vw] md:text-[6vw] lg:text-[5vw]"
// // //                     >
// // //                       Driven
// // //                     </motion.span>
// // //                   </div>
// // //                   <TextReveal text="Marketing Agency" delay={0.7} className="flex flex-wrap justify-center lg:justify-start" />
// // //                 </h1>

// // //                 <motion.div
// // //                   initial={{ opacity: 0, y: 20 }}
// // //                   animate={{ opacity: 1, y: 0 }}
// // //                   transition={{ delay: 1, duration: 0.8 }}
// // //                   className="mt-8 lg:mt-10"
// // //                 >
// // //                   <p className="max-w-xl text-base font-medium leading-relaxed text-neutral-600 md:text-lg lg:text-xl text-center lg:text-left mx-auto lg:mx-0">
// // //                     Automate, Integrate, and Scale Your Marketing powered by real-time data, AI, and performance APIs.
// // //                   </p>

// // //                   <div className="mt-10 lg:mt-12 flex flex-wrap items-center justify-center lg:justify-start gap-8">
// // //                     <Link to="/api-marketing-agency-in-kochi">
// // //                       <motion.button
// // //                         initial={{ opacity: 0, scale: 0.9 }}
// // //                         animate={{ opacity: 1, scale: 1 }}
// // //                         transition={{ delay: 1.2, duration: 0.5 }}
// // //                         whileHover={{ scale: 1.05, backgroundColor: "#111" }}
// // //                         whileTap={{ scale: 0.95 }}
// // //                         className="group relative flex h-14 lg:h-16 items-center justify-center overflow-hidden rounded-full bg-[#000000] px-10 lg:px-14 text-[11px] font-bold tracking-[0.3em] text-white uppercase transition-all shadow-2xl shadow-black/20"
// // //                       >
// // //                         <span className="relative z-10">Get Started</span>
// // //                         <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
// // //                       </motion.button>
// // //                     </Link>
// // //                   </div>
// // //                 </motion.div>
// // //               </div>
// // //             </motion.div>
// // //           </div>
// // //         </div>
// // //         <motion.img
// // //           src="https://res.cloudinary.com/dtwcgfmar/image/upload/v1764674437/Untitled_design_23_owrydd.png"
// // //           alt="decorative"
// // //           initial={{ opacity: 0, scale: 0.8 }}
// // //           animate={{ opacity: 1, scale: 1 }}
// // //           transition={{ delay: 1.4, duration: 0.6 }}
// // //           className="
// // //     hidden lg:block
// // //     absolute
// // //     bottom-6
// // //     right-6
// // //     w-20
// // //     h-20
// // //     object-cover
// // //     rounded-lg
// // //   "
// // //         />


// // //       </section>
// // //     </div>
// // //   );
// // // };

// // // export default Hero;



// // // // // import { useRef, useState, useEffect } from "react";

// // // // // export default function Hero() {
// // // // //   const videoRef = useRef(null);

// // // // //   const videos = [
    
// // // // //     "https://res.cloudinary.com/dtwcgfmar/video/upload/v1774072710/SB_Logo_white_cdzfzw.mp4",
// // // // //     "https://res.cloudinary.com/dtwcgfmar/video/upload/v1774072709/freepik_glancing-typography-with-slightly-zooming_seedance_720p_16-9_24fps_11657_z7zxbg.mp4",
// // // // //     ];

// // // // //   const [currentIndex, setCurrentIndex] = useState(0);
// // // // //   const [showImage, setShowImage] = useState(false);

// // // // //   useEffect(() => {
// // // // //     if (videoRef.current && currentIndex < videos.length) {
// // // // //       videoRef.current.src = videos[currentIndex];
// // // // //       videoRef.current.play();
// // // // //     }
// // // // //   }, [currentIndex]);

// // // // //   const handleEnded = () => {
// // // // //     if (currentIndex < videos.length - 1) {
// // // // //       setCurrentIndex((prev) => prev + 1);
// // // // //     } else {
// // // // //       setShowImage(true);
// // // // //     }
// // // // //   };

// // // // //   return (
// // // // //     <div className="w-screen h-screen relative overflow-hidden bg-black">
      
// // // // //       {!showImage && (
// // // // //         <video
// // // // //           ref={videoRef}
// // // // //           onEnded={handleEnded}
// // // // //           autoPlay
// // // // //           muted
// // // // //           playsInline
// // // // //           className="absolute inset-0 w-full h-full object-cover"
// // // // //         />
// // // // //       )}

// // // // //       {showImage && (
// // // // //         <img
// // // // //           src="https://res.cloudinary.com/dtwcgfmar/image/upload/v1774072709/cover_white_1_pdmmfz.png"
// // // // //           className="absolute inset-0 w-full h-full object-cover"
// // // // //         />
// // // // //       )}
// // // // //     </div>
// // // // //   );
// // // // // }


// // // // import { useRef, useState, useEffect } from "react";

// // // // export default function Hero() {
// // // //   const video1Ref = useRef(null);
// // // //   const video2Ref = useRef(null);

// // // //   const videos = [
// // // //     "https://res.cloudinary.com/dtwcgfmar/video/upload/v1774073469/Hello_2_1_hd4afv.mp4",
// // // //     "https://res.cloudinary.com/dtwcgfmar/video/upload/v1774072709/freepik_glancing-typography-with-slightly-zooming_seedance_720p_16-9_24fps_11657_z7zxbg.mp4",
// // // //   ];

// // // //   const [currentIndex, setCurrentIndex] = useState(0);
// // // //   const [activeVideo, setActiveVideo] = useState(1);
// // // //   const [showImage, setShowImage] = useState(false);

// // // //   useEffect(() => {
// // // //     const activeRef = activeVideo === 1 ? video1Ref : video2Ref;
// // // //     const nextRef = activeVideo === 1 ? video2Ref : video1Ref;

// // // //     if (activeRef.current) {
// // // //       activeRef.current.src = videos[currentIndex];
// // // //       activeRef.current.play();
// // // //     }

// // // //     // preload next video
// // // //     if (nextRef.current && currentIndex + 1 < videos.length) {
// // // //       nextRef.current.src = videos[currentIndex + 1];
// // // //       nextRef.current.load();
// // // //     }
// // // //   }, [currentIndex, activeVideo]);

// // // //   const handleEnded = () => {
// // // //     if (currentIndex < videos.length - 1) {
// // // //       setCurrentIndex((prev) => prev + 1);
// // // //       setActiveVideo((prev) => (prev === 1 ? 2 : 1));
// // // //     } else {
// // // //       setShowImage(true);
// // // //     }
// // // //   };

// // // //   return (
// // // //     <div className="w-screen h-screen relative overflow-hidden bg-black">

// // // //       {!showImage && (
// // // //         <>
// // // //           <video
// // // //             ref={video1Ref}
// // // //             onEnded={handleEnded}
// // // //             muted
// // // //             playsInline
// // // //             className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
// // // //               activeVideo === 1 ? "opacity-100" : "opacity-0"
// // // //             }`}
// // // //           />

// // // //           <video
// // // //             ref={video2Ref}
// // // //             onEnded={handleEnded}
// // // //             muted
// // // //             playsInline
// // // //             className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
// // // //               activeVideo === 2 ? "opacity-100" : "opacity-0"
// // // //             }`}
// // // //           />
// // // //         </>
// // // //       )}

// // // //       {showImage && (
// // // //         <img
// // // //           src="https://res.cloudinary.com/dtwcgfmar/image/upload/v1774072709/cover_white_1_pdmmfz.png"
// // // //           className="absolute inset-0 w-full h-full object-cover object-top"
// // // //         />
// // // //       )}
// // // //     </div>
// // // //   );
// // // // }


// // import { useRef, useState, useEffect } from "react";
// // import { motion } from "framer-motion";
// // import { Link } from "react-router-dom";

// // // TextReveal Component
// // const TextReveal = ({ text, delay = 0, className = "" }) => {
// //   return (
// //     <motion.span
// //       initial={{ opacity: 0, y: 20 }}
// //       animate={{ opacity: 1, y: 0 }}
// //       transition={{ delay, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
// //       className={className}
// //     >
// //       {text.split(" ").map((word, index) => (
// //         <span key={index} className="inline-block mr-2">
// //           {word}
// //         </span>
// //       ))}
// //     </motion.span>
// //   );
// // };

// // export default function Hero() {
// //   const video1Ref = useRef(null);
// //   const video2Ref = useRef(null);

// //   const videos = [
// //     "https://res.cloudinary.com/dtwcgfmar/video/upload/v1774073469/Hello_2_1_hd4afv.mp4",
// //     "https://res.cloudinary.com/dtwcgfmar/video/upload/v1774072709/freepik_glancing-typography-with-slightly-zooming_seedance_720p_16-9_24fps_11657_z7zxbg.mp4",
// //   ];

// //   const [currentIndex, setCurrentIndex] = useState(0);
// //   const [activeVideo, setActiveVideo] = useState(1);
// //   const [showHero, setShowHero] = useState(false);

// //   useEffect(() => {
// //     const activeRef = activeVideo === 1 ? video1Ref : video2Ref;
// //     const nextRef = activeVideo === 1 ? video2Ref : video1Ref;

// //     if (activeRef.current) {
// //       activeRef.current.src = videos[currentIndex];
// //       activeRef.current.play();
// //     }

// //     // preload next video
// //     if (nextRef.current && currentIndex + 1 < videos.length) {
// //       nextRef.current.src = videos[currentIndex + 1];
// //       nextRef.current.load();
// //     }
// //   }, [currentIndex, activeVideo]);

// //   const handleEnded = () => {
// //     if (currentIndex < videos.length - 1) {
// //       setCurrentIndex((prev) => prev + 1);
// //       setActiveVideo((prev) => (prev === 1 ? 2 : 1));
// //     } else {
// //       setShowHero(true);
// //     }
// //   };

// //   return (
// //     <div className="w-screen relative overflow-hidden bg-black">
      
// //       {/* VIDEO SECTION */}
// //       {!showHero && (
// //         <div className="w-screen h-screen relative overflow-hidden bg-black">
// //           {/* Video 1 */}
// //           <video
// //             ref={video1Ref}
// //             onEnded={handleEnded}
// //             muted
// //             playsInline
// //             className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
// //               activeVideo === 1 ? "opacity-100" : "opacity-0"
// //             }`}
// //           />

// //           {/* Video 2 */}
// //           <video
// //             ref={video2Ref}
// //             onEnded={handleEnded}
// //             muted
// //             playsInline
// //             className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
// //               activeVideo === 2 ? "opacity-100" : "opacity-0"
// //             }`}
// //           />
// //         </div>
// //       )}

// //       {/* HERO SECTION (Replaces Final Image) */}
// //       {showHero && (
// //         <motion.div
// //           initial={{ opacity: 0 }}
// //           animate={{ opacity: 1 }}
// //           transition={{ duration: 0.8 }}
// //           className="w-screen relative min-h-screen bg-[#FFFFFF] selection:bg-[#000000] selection:text-white overflow-hidden"
// //         >
// //           <div className="noise" />

// //           {/* Hero Section */}
// //           <section className="relative h-screen w-full overflow-hidden bg-[#F8F8F8]">
// //             <div className="flex flex-col lg:flex-row h-full w-full">

// //               {/* Image Section */}
// //               <div className="hidden lg:block relative lg:h-full lg:w-[45%] lg:order-2 overflow-hidden">
// //                 <motion.div
// //                   initial={{ opacity: 0, scale: 1.1 }}
// //                   animate={{ opacity: 1, scale: 1 }}
// //                   transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
// //                   className="h-full w-full"
// //                 >
// //                   <img
// //                     src="https://res.cloudinary.com/dtwcgfmar/image/upload/v1773048754/Adobe_Express_-_file_1_s8y5h5.webp"
// //                     alt="API Driven Marketing"
// //                     className="h-full w-full object-cover object-top lg:object-[center_20%]"
// //                     referrerPolicy="no-referrer"
// //                   />
// //                   <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/5" />
// //                 </motion.div>
// //               </div>

// //               {/* Text Section */}
// //               <div className="relative flex min-h-screen flex-col items-center justify-center px-4 pb-12 z-10 lg:h-full lg:w-[55%] lg:items-start lg:px-24 lg:py-0 lg:order-1">

// //                 <motion.div
// //                   initial={{ opacity: 0, y: 40 }}
// //                   animate={{ opacity: 1, y: 0 }}
// //                   transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
// //                   className="w-full max-w-2xl lg:max-w-none"
// //                 >
// //                   <div className="w-full">
// //                     {/* Mobile Image */}
// //                     <div className="flex justify-center lg:hidden mb-6">
// //                       <motion.img
// //                         src="https://res.cloudinary.com/dtwcgfmar/image/upload/v1764674437/Untitled_design_23_owrydd.png"
// //                         alt="decorative"
// //                         initial={{ opacity: 0, scale: 0.9 }}
// //                         animate={{ opacity: 1, scale: 1 }}
// //                         transition={{ delay: 0.6, duration: 0.6 }}
// //                         className="w-14 h-14 object-cover rounded-lg"
// //                       />
// //                     </div>

// //                     {/* Heading */}
// //                     <h1 className="font-display text-[10vw] font-bold leading-[1.1] tracking-[-0.04em] text-[#0A0A0A] sm:text-[8vw] md:text-[7vw] lg:text-[5.5vw] text-center lg:text-left">
// //                       <TextReveal text="World's First" delay={0.2} className="flex flex-wrap justify-center lg:justify-start" />
// //                       <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
// //                         <TextReveal text="API-" delay={0.4} />
// //                         <motion.span
// //                           initial={{ opacity: 0, rotate: -5 }}
// //                           animate={{ opacity: 1, rotate: 0 }}
// //                           transition={{ delay: 0.8, duration: 1 }}
// //                           className="text-neutral-600 italic font-serif text-[9vw] sm:text-[7vw] md:text-[6vw] lg:text-[5vw]"
// //                         >
// //                           Driven
// //                         </motion.span>
// //                       </div>
// //                       <TextReveal text="Marketing Agency" delay={0.7} className="flex flex-wrap justify-center lg:justify-start" />
// //                     </h1>

// //                     {/* Description and CTA */}
// //                     <motion.div
// //                       initial={{ opacity: 0, y: 20 }}
// //                       animate={{ opacity: 1, y: 0 }}
// //                       transition={{ delay: 1, duration: 0.8 }}
// //                       className="mt-8 lg:mt-10"
// //                     >
// //                       <p className="max-w-xl text-base font-medium leading-relaxed text-neutral-600 md:text-lg lg:text-xl text-center lg:text-left mx-auto lg:mx-0">
// //                         Automate, Integrate, and Scale Your Marketing powered by real-time data, AI, and performance APIs.
// //                       </p>

// //                       <div className="mt-10 lg:mt-12 flex flex-wrap items-center justify-center lg:justify-start gap-8">
// //                         <Link to="/api-marketing-agency-in-kochi">
// //                           <motion.button
// //                             initial={{ opacity: 0, scale: 0.9 }}
// //                             animate={{ opacity: 1, scale: 1 }}
// //                             transition={{ delay: 1.2, duration: 0.5 }}
// //                             whileHover={{ scale: 1.05, backgroundColor: "#111" }}
// //                             whileTap={{ scale: 0.95 }}
// //                             className="group relative flex h-14 lg:h-16 items-center justify-center overflow-hidden rounded-full bg-[#000000] px-10 lg:px-14 text-[11px] font-bold tracking-[0.3em] text-white uppercase transition-all shadow-2xl shadow-black/20"
// //                           >
// //                             <span className="relative z-10">Get Started</span>
// //                             <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
// //                           </motion.button>
// //                         </Link>
// //                       </div>
// //                     </motion.div>
// //                   </div>
// //                 </motion.div>
// //               </div>
// //             </div>

// //             {/* Decorative Image - Bottom Right */}
// //             <motion.img
// //               src="https://res.cloudinary.com/dtwcgfmar/image/upload/v1764674437/Untitled_design_23_owrydd.png"
// //               alt="decorative"
// //               initial={{ opacity: 0, scale: 0.8 }}
// //               animate={{ opacity: 1, scale: 1 }}
// //               transition={{ delay: 1.4, duration: 0.6 }}
// //               className="hidden lg:block absolute bottom-6 right-6 w-20 h-20 object-cover rounded-lg"
// //             />
// //           </section>
// //         </motion.div>
// //       )}
// //     </div>
// //   );
// // }


// import { useRef, useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { Link } from "react-router-dom";

// // TextReveal Component
// const TextReveal = ({ text, delay = 0, className = "" }) => {
//   return (
//     <motion.span
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ delay, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
//       className={className}
//     >
//       {text.split(" ").map((word, index) => (
//         <span key={index} className="inline-block mr-2">
//           {word}
//         </span>
//       ))}
//     </motion.span>
//   );
// };

// export default function Hero() {
//   const video1Ref = useRef(null);
//   const video2Ref = useRef(null);

//   const videos = [
//     "https://res.cloudinary.com/dtwcgfmar/video/upload/v1774073469/Hello_2_1_hd4afv.mp4",
//     "https://res.cloudinary.com/dtwcgfmar/video/upload/v1774072709/freepik_glancing-typography-with-slightly-zooming_seedance_720p_16-9_24fps_11657_z7zxbg.mp4",
//   ];

//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [activeVideo, setActiveVideo] = useState(1);
//   const [showHero, setShowHero] = useState(false);

//   useEffect(() => {
//     const activeRef = activeVideo === 1 ? video1Ref : video2Ref;
//     const nextRef = activeVideo === 1 ? video2Ref : video1Ref;

//     if (activeRef.current) {
//       activeRef.current.src = videos[currentIndex];
//       activeRef.current.play();
//     }

//     // preload next video
//     if (nextRef.current && currentIndex + 1 < videos.length) {
//       nextRef.current.src = videos[currentIndex + 1];
//       nextRef.current.load();
//     }
//   }, [currentIndex, activeVideo]);

//   const handleEnded = () => {
//     if (currentIndex < videos.length - 1) {
//       setCurrentIndex((prev) => prev + 1);
//       setActiveVideo((prev) => (prev === 1 ? 2 : 1));
//     } else {
//       setShowHero(true);
//     }
//   };

//   return (
//     <div className="w-screen relative overflow-hidden bg-black">
      
//       {/* VIDEO SECTION */}
//       {!showHero && (
//         <div className={`w-screen h-screen relative overflow-hidden flex items-center justify-center transition-colors duration-300 ${
//           activeVideo === 2 ? "bg-[#D5D7D4]" : "bg-black"
//         }`}>
//           {/* Video 1 */}
//           <video
//             ref={video1Ref}
//             onEnded={handleEnded}
//             muted
//             playsInline
//             autoPlay
//             className={`absolute inset-0 w-full h-full object-contain sm:object-cover transition-opacity duration-300 ${
//               activeVideo === 1 ? "opacity-100" : "opacity-0"
//             }`}
//           />

//           {/* Video 2 */}
//           <video
//             ref={video2Ref}
//             onEnded={handleEnded}
//             muted
//             playsInline
//             className={`absolute inset-0 w-full h-full object-contain sm:object-cover transition-opacity duration-300 ${
//               activeVideo === 2 ? "opacity-100" : "opacity-0"
//             }`}
//           />
//         </div>
//       )}

//       {/* HERO SECTION (Replaces Final Image) */}
//       {showHero && (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.8 }}
//           className="w-screen relative min-h-screen bg-[#FFFFFF] selection:bg-[#000000] selection:text-white overflow-hidden"
//         >
//           <div className="noise" />

//           {/* Hero Section */}
//           <section className="relative h-screen w-full overflow-hidden bg-[#F8F8F8]">
//             <div className="flex flex-col lg:flex-row h-full w-full">

//               {/* Image Section */}
//               <div className="hidden lg:block relative lg:h-full lg:w-[45%] lg:order-2 overflow-hidden">
//                 <motion.div
//                   initial={{ opacity: 0, scale: 1.1 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
//                   className="h-full w-full"
//                 >
//                   <img
//                     src="https://res.cloudinary.com/dtwcgfmar/image/upload/v1773048754/Adobe_Express_-_file_1_s8y5h5.webp"
//                     alt="API Driven Marketing"
//                     className="h-full w-full object-cover object-top lg:object-[center_20%]"
//                     referrerPolicy="no-referrer"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/5" />
//                 </motion.div>
//               </div>

//               {/* Text Section */}
//               <div className="relative flex min-h-screen flex-col items-center justify-center px-4 pb-12 z-10 lg:h-full lg:w-[55%] lg:items-start lg:px-24 lg:py-0 lg:order-1">

//                 <motion.div
//                   initial={{ opacity: 0, y: 40 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
//                   className="w-full max-w-2xl lg:max-w-none"
//                 >
//                   <div className="w-full">
//                     {/* Mobile Image */}
//                     <div className="flex justify-center lg:hidden mb-6">
//                       <motion.img
//                         src="https://res.cloudinary.com/dtwcgfmar/image/upload/v1764674437/Untitled_design_23_owrydd.png"
//                         alt="decorative"
//                         initial={{ opacity: 0, scale: 0.9 }}
//                         animate={{ opacity: 1, scale: 1 }}
//                         transition={{ delay: 0.6, duration: 0.6 }}
//                         className="w-14 h-14 object-cover rounded-lg"
//                       />
//                     </div>

//                     {/* Heading */}
//                     <h1 className="font-display text-[10vw] font-bold leading-[1.1] tracking-[-0.04em] text-[#0A0A0A] sm:text-[8vw] md:text-[7vw] lg:text-[5.5vw] text-center lg:text-left">
//                       <TextReveal text="World's First" delay={0.2} className="flex flex-wrap justify-center lg:justify-start" />
//                       <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
//                         <TextReveal text="API-" delay={0.4} />
//                         <motion.span
//                           initial={{ opacity: 0, rotate: -5 }}
//                           animate={{ opacity: 1, rotate: 0 }}
//                           transition={{ delay: 0.8, duration: 1 }}
//                           className="text-neutral-600 italic font-serif text-[9vw] sm:text-[7vw] md:text-[6vw] lg:text-[5vw]"
//                         >
//                           Driven
//                         </motion.span>
//                       </div>
//                       <TextReveal text="Marketing Agency" delay={0.7} className="flex flex-wrap justify-center lg:justify-start" />
//                     </h1>

//                     {/* Description and CTA */}
//                     <motion.div
//                       initial={{ opacity: 0, y: 20 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ delay: 1, duration: 0.8 }}
//                       className="mt-8 lg:mt-10"
//                     >
//                       <p className="max-w-xl text-base font-medium leading-relaxed text-neutral-600 md:text-lg lg:text-xl text-center lg:text-left mx-auto lg:mx-0">
//                         Automate, Integrate, and Scale Your Marketing powered by real-time data, AI, and performance APIs.
//                       </p>

//                       <div className="mt-10 lg:mt-12 flex flex-wrap items-center justify-center lg:justify-start gap-8">
//                         <Link to="/api-marketing-agency-in-kochi">
//                           <motion.button
//                             initial={{ opacity: 0, scale: 0.9 }}
//                             animate={{ opacity: 1, scale: 1 }}
//                             transition={{ delay: 1.2, duration: 0.5 }}
//                             whileHover={{ scale: 1.05, backgroundColor: "#111" }}
//                             whileTap={{ scale: 0.95 }}
//                             className="group relative flex h-14 lg:h-16 items-center justify-center overflow-hidden rounded-full bg-[#000000] px-10 lg:px-14 text-[11px] font-bold tracking-[0.3em] text-white uppercase transition-all shadow-2xl shadow-black/20"
//                           >
//                             <span className="relative z-10">Get Started</span>
//                             <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
//                           </motion.button>
//                         </Link>
//                       </div>
//                     </motion.div>
//                   </div>
//                 </motion.div>
//               </div>
//             </div>

//             {/* Decorative Image - Bottom Right */}
//             <motion.img
//               src="https://res.cloudinary.com/dtwcgfmar/image/upload/v1764674437/Untitled_design_23_owrydd.png"
//               alt="decorative"
//               initial={{ opacity: 0, scale: 0.8 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ delay: 1.4, duration: 0.6 }}
//               className="hidden lg:block absolute bottom-6 right-6 w-20 h-20 object-cover rounded-lg"
//             />
//           </section>
//         </motion.div>
//       )}
//     </div>
//   );
// }

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

// TextReveal Component
const TextReveal = ({ text, delay = 0, className = "" }) => {
  return (
    <motion.span
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {text.split(" ").map((word, index) => (
        <span key={index} className="inline-block mr-2">
          {word}
        </span>
      ))}
    </motion.span>
  );
};

export default function Hero() {
  const video1Ref = useRef(null);
  const video2Ref = useRef(null);

  const videos = [
    "https://res.cloudinary.com/dtwcgfmar/video/upload/v1774073469/Hello_2_1_hd4afv.mp4",
    "https://res.cloudinary.com/dtwcgfmar/video/upload/v1774267811/SB_Logo_glass_effect_2_edqpb3.mp4",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeVideo, setActiveVideo] = useState(1);
  const [showHero, setShowHero] = useState(false);

  useEffect(() => {
    const activeRef = activeVideo === 1 ? video1Ref : video2Ref;
    const nextRef = activeVideo === 1 ? video2Ref : video1Ref;

    if (activeRef.current) {
      activeRef.current.src = videos[currentIndex];
      activeRef.current.play();
    }

    // preload next video
    if (nextRef.current && currentIndex + 1 < videos.length) {
      nextRef.current.src = videos[currentIndex + 1];
      nextRef.current.load();
    }
  }, [currentIndex, activeVideo]);

  const handleEnded = () => {
    if (currentIndex < videos.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setActiveVideo((prev) => (prev === 1 ? 2 : 1));
    } else {
      setShowHero(true);
    }
  };

  return (
    <div className="w-screen relative overflow-hidden bg-black">
      
      {/* VIDEO SECTION */}
      {!showHero && (
        <div className={`w-screen h-screen relative overflow-hidden flex items-center justify-center transition-colors duration-300 bg-black
        `}>
          {/* Video 1 */}
          <video
            ref={video1Ref}
            onEnded={handleEnded}
            muted
            playsInline
            autoPlay
            className={`absolute inset-0 w-full h-full object-contain sm:object-cover transition-opacity duration-300 ${
              activeVideo === 1 ? "opacity-100" : "opacity-0"
            }`}
          />

          {/* Video 2 */}
          <video
            ref={video2Ref}
            onEnded={handleEnded}
            muted
            playsInline
            className={`absolute inset-0 w-full h-full object-contain sm:object-cover transition-opacity duration-300 ${
              activeVideo === 2 ? "opacity-100" : "opacity-0"
            }`}
          />
        </div>
      )}

      {/* HERO SECTION (Replaces Final Image) */}
      {showHero && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="w-screen relative min-h-screen bg-[#F5F5F5] selection:bg-[#000000] selection:text-white overflow-hidden"
        >
          <div className="noise" />

          {/* Hero Section */}
          <section className="relative h-screen w-full overflow-hidden bg-[#F5F5F5]">
            <div className="flex flex-col lg:flex-row h-full w-full">

              {/* Image Section - Same background as text */}
              <div className="hidden lg:block relative lg:h-full lg:w-[45%] lg:order-2 overflow-hidden bg-[#F5F5F5]">
                <motion.div
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                  className="h-full w-full"
                >
                  <img
                    src="https://res.cloudinary.com/dtwcgfmar/image/upload/v1773048754/Adobe_Express_-_file_1_s8y5h5.webp"
                    alt="API Driven Marketing"
                    className="h-full w-full object-cover object-top lg:object-[center_20%]"
                    referrerPolicy="no-referrer"
                  />
                </motion.div>
              </div>

              {/* Text Section */}
              <div className="relative flex min-h-screen flex-col items-center justify-center px-4 pb-12 z-10 lg:h-full lg:w-[55%] lg:items-start lg:px-24 lg:py-0 lg:order-1">

                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full max-w-2xl lg:max-w-none"
                >
                  <div className="w-full">
                    {/* Mobile Image */}
                    <div className="flex justify-center lg:hidden mb-6">
                      <motion.img
                        src="https://res.cloudinary.com/dtwcgfmar/image/upload/v1764674437/Untitled_design_23_owrydd.png"
                        alt="decorative"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.6, duration: 0.6 }}
                        className="w-14 h-14 object-cover rounded-lg"
                      />
                    </div>

                    {/* Heading */}
                    <h1 className="font-display text-[10vw] font-bold leading-[1.1] tracking-[-0.04em] text-[#0A0A0A] sm:text-[8vw] md:text-[7vw] lg:text-[5.5vw] text-center lg:text-left">
                      <TextReveal text="World's First" delay={0.2} className="flex flex-wrap justify-center lg:justify-start" />
                      <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
                        <TextReveal text="API-" delay={0.4} />
                        <motion.span
                          initial={{ opacity: 0, rotate: -5 }}
                          animate={{ opacity: 1, rotate: 0 }}
                          transition={{ delay: 0.8, duration: 1 }}
                          className="text-neutral-600 italic font-serif text-[9vw] sm:text-[7vw] md:text-[6vw] lg:text-[5vw]"
                        >
                          Driven
                        </motion.span>
                      </div>
                      <TextReveal text="Marketing Agency" delay={0.7} className="flex flex-wrap justify-center lg:justify-start" />
                    </h1>

                    {/* Description and CTA */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1, duration: 0.8 }}
                      className="mt-8 lg:mt-10"
                    >
                      <p className="max-w-xl text-base font-medium leading-relaxed text-neutral-600 md:text-lg lg:text-xl text-center lg:text-left mx-auto lg:mx-0">
                        Automate, Integrate, and Scale Your Marketing powered by real-time data, AI, and performance APIs.
                      </p>

                      <div className="mt-10 lg:mt-12 flex flex-wrap items-center justify-center lg:justify-start gap-8">
                        <Link to="/api-marketing-agency-in-kochi">
                          <motion.button
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 1.2, duration: 0.5 }}
                            whileHover={{ scale: 1.05, backgroundColor: "#111" }}
                            whileTap={{ scale: 0.95 }}
                            className="group relative flex h-14 lg:h-16 items-center justify-center overflow-hidden rounded-full bg-[#000000] px-10 lg:px-14 text-[11px] font-bold tracking-[0.3em] text-white uppercase transition-all shadow-2xl shadow-black/20"
                          >
                            <span className="relative z-10">Get Started</span>
                            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
                          </motion.button>
                        </Link>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Decorative Image - Bottom Right */}
            <motion.img
              src="https://res.cloudinary.com/dtwcgfmar/image/upload/v1764674437/Untitled_design_23_owrydd.png"
              alt="decorative"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.4, duration: 0.6 }}
              className="hidden lg:block absolute bottom-6 right-6 w-20 h-20 object-cover rounded-lg"
            />
          </section>
        </motion.div>
      )}
    </div>
  );
}