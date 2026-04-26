// import React, { useState, useEffect, useMemo, useRef } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import Letter from './Letter';
// import { LOADING_PHRASES, LETTER_COUNT } from './constants';

// const LoadingScreen = ({ onComplete }) => {
//   const [progress, setProgress] = useState(0);
//   const [time, setTime] = useState(0);
//   const [mouse, setMouse] = useState({ x: 0, y: 0 });
//   const [isExiting, setIsExiting] = useState(false);
//   const requestRef = useRef(0);

//   // Generate randomized letters once
//   const letters = useMemo(() => {
//     const chars = LOADING_PHRASES.join('').split('');
//     const data = [];
//     for (let i = 0; i < LETTER_COUNT; i++) {
//       const char = chars[Math.floor(Math.random() * chars.length)];
//       data.push({
//         id: i,
//         char,
//         initialAngle: Math.random() * Math.PI * 2,
//         radiusOffset: Math.random() * 150,
//         rotationSpeed: (Math.random() - 0.5) * 0.4,
//         oscillationSpeed: 0.3 + Math.random() * 1.2,
//         oscillationAmplitude: 50 + Math.random() * 150,
//         phase: Math.random() * Math.PI * 2,
//       });
//     }
//     return data;
//   }, []);

//   const animate = (t) => {
//     setTime(t / 1000);
//     requestRef.current = requestAnimationFrame(animate);
//   };

//   useEffect(() => {
//     requestRef.current = requestAnimationFrame(animate);

//     const handleMouseMove = (e) => {
//       setMouse({ x: e.clientX, y: e.clientY });
//     };
//     window.addEventListener('mousemove', handleMouseMove);
    
//     // Progress interval
//     const interval = setInterval(() => {
//       setProgress((prev) => {
//         if (prev >= 100) {
//           clearInterval(interval);
//           setTimeout(() => setIsExiting(true), 500);
//           return 100;
//         }
//         const inc = Math.floor(Math.random() * 4) + 1;
//         return Math.min(100, prev + inc);
//       });
//     }, 80);

//     return () => {
//       if (requestRef.current) cancelAnimationFrame(requestRef.current);
//       clearInterval(interval);
//       window.removeEventListener('mousemove', handleMouseMove);
//     };
//   }, []);

//   // Progress ring calculations
//   const radius = 90;
//   const circumference = 2 * Math.PI * radius;
//   const strokeDashoffset = circumference - (progress / 100) * circumference;

//   return (
//     <AnimatePresence onExitComplete={onComplete}>
//       {!isExiting && (
//         <motion.div 
//           initial={{ opacity: 1 }}
//           exit={{ opacity: 0, scale: 1.1, filter: 'blur(20px)' }}
//           transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
//           className="fixed inset-0 bg-black flex items-center justify-center overflow-hidden z-[9999] font-sans"
//         >
//           {/* Noise/Film Grain Overlay */}
//           <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-50 bg-[url('https://res.cloudinary.com/dtwcgfmar/image/upload/v1710515152/noise_p0xk2w.png')] bg-repeat" />
          
//           {/* Background radial gradient */}
//           <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(220,38,38,0.12)_0%,_transparent_70%)]" />

//           {/* Letter Cloud Layer */}
//           <div className="relative w-full h-full">
//             {letters.map((letter) => (
//               <Letter key={letter.id} data={letter} time={time} mouse={mouse} />
//             ))}
//           </div>

//           {/* Center Progress Ring Indicator */}
//           <div className="absolute flex flex-col items-center justify-center">
//             <div className="relative w-64 h-64 flex items-center justify-center">
//               {/* SVG Progress Ring */}
//               <svg className="absolute w-full h-full -rotate-90">
//                 <circle
//                   cx="128"
//                   cy="128"
//                   r={radius}
//                   stroke="currentColor"
//                   strokeWidth="1"
//                   fill="transparent"
//                   className="text-red-900/10"
//                 />
//                 <motion.circle
//                   cx="128"
//                   cy="128"
//                   r={radius}
//                   stroke="currentColor"
//                   strokeWidth="2"
//                   fill="transparent"
//                   strokeDasharray={circumference}
//                   animate={{ strokeDashoffset }}
//                   transition={{ duration: 0.3, ease: "easeOut" }}
//                   className="text-red-600 drop-shadow-[0_0_8px_rgba(220,38,38,0.8)]"
//                 />
//               </svg>

//               {/* Central Text */}
//               <div className="flex flex-col items-center">
//                 <motion.div 
//                   initial={{ y: 20, opacity: 0 }}
//                   animate={{ y: 0, opacity: 1 }}
//                   className="text-red-600 text-7xl font-bold tracking-tighter mb-2"
//                 >
//                   {progress}
//                 </motion.div>
//                 <div className="text-red-900/60 text-[10px] uppercase tracking-[0.6em] font-bold">
//                   SOCIAL BUREAU
//                 </div>
//               </div>
//             </div>
            
//             {/* <div className="mt-8 overflow-hidden">
//                <motion.p 
//                 initial={{ y: "100%" }}
//                 animate={{ y: 0 }}
//                 transition={{ duration: 0.8, ease: "circOut" }}
//                 className="text-red-900/40 text-[9px] uppercase tracking-[1em] font-medium"
//                >
//                 API MARKETING
//                </motion.p>
//             </div> */}
//           </div>

//           {/* Vignette Overlay */}
//           <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_200px_rgba(0,0,0,0.95)]" />
          
//           {/* Subtle Scanning Lines */}
//           <div className="absolute inset-0 pointer-events-none opacity-[0.05] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.5)_50%),linear-gradient(90deg,rgba(255,0,0,0.1),rgba(0,255,0,0.02),rgba(0,0,255,0.1))] bg-[length:100%_2px,1px_100%]" />
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// };

// export default LoadingScreen;

