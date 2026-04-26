import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { GrainOverlay } from './GrainOverlay';
import { DEFAULT_EMPLOYEE_DATA } from './constants';

const EmployeeOfMonth = () => {
  const containerRef = useRef(null);
  const [scene, setScene] = useState('SCENE1');

  // Track scroll progress for the entire 400vh container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Map scroll progress to scenes
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < 0.25) {
      setScene('SCENE1');
    } else if (latest < 0.5) {
      setScene('SCENE2');
    } else if (latest < 0.75) {
      setScene('SCENE3');
    } else {
      setScene('SCENE4');
    }
  });

  // Entrance Effects (linked to the very start of the section)
  // We want the entrance to happen quickly as the user first engages with the sticky section
  const entranceProgress = useTransform(scrollYProgress, [0, 0.1], [0, 1]);
  const scale = useTransform(entranceProgress, [0, 1], [1.1, 1]);
  const opacity = useTransform(entranceProgress, [0, 1], [0, 1]);
  const filter = useTransform(entranceProgress, [0, 1], ["blur(10px)", "blur(0px)"]);

  const { portraits, employeeName, designation, tagline, congratsText } = DEFAULT_EMPLOYEE_DATA;
  const [firstName, lastName] = employeeName.split(' ');

  return (
    <div ref={containerRef} className="relative h-[400vh] w-full bg-black selection:bg-white selection:text-black">
      
      {/* Sticky Wrapper: Pins content to the viewport while scrolling through the h-[400vh] track */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <GrainOverlay />
        
        {/* Animated Content Wrapper */}
        <motion.div 
          style={{ scale, opacity, filter }}
          className="w-full h-full"
        >
          <AnimatePresence mode="wait">
            <motion.div 
              className="relative flex h-full w-full items-center justify-center"
              initial="initial"
              animate="animate"
            >
            {/* EDITORIAL TYPOGRAPHY LAYER (Behind Portrait) */}
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
              {/* First Name - Large Outline/Solid Mix */}
              <motion.div
                className="relative w-full text-center"
                initial={{ opacity: 0, x: -150, skewX: -20 }}
                animate={scene === 'SCENE4' ? { opacity: 1, x: 0, skewX: 0 } : { opacity: 0, x: -150, skewX: -20 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              >
                <h2 className="text-[18vw] font-black tracking-tighter leading-none opacity-10 select-none uppercase"
                    style={{ WebkitTextStroke: '2px rgba(255,255,255,0.5)', color: 'transparent' }}>
                  {firstName}
                </h2>
              </motion.div>

              {/* Last Name - Large Solid */}
              <motion.div
                className="relative w-full text-center -mt-[8vw]"
                initial={{ opacity: 0, x: 150, skewX: 20 }}
                animate={scene === 'SCENE4' ? { opacity: 1, x: 0, skewX: 0 } : { opacity: 0, x: 150, skewX: 20 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              >
                <h2 className="text-[18vw] font-black tracking-tighter leading-none text-white opacity-5 select-none uppercase">
                  {lastName}
                </h2>
              </motion.div>
            </div>

            {/* FRONT TYPOGRAPHY LAYER (Above Portrait Elements) */}
            <div className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-between py-8 sm:py-12">
              {/* Tagline at the Top */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={scene === 'SCENE4' ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="text-center"
              >
                <div className="flex flex-col items-center gap-2">
                  <span className="text-xs sm:text-sm font-bold tracking-[0.3em] text-white/80 uppercase">
                    {congratsText}
                  </span>
                  <span className="text-lg sm:text-2xl font-black tracking-[0.3em] text-[#FF0033] uppercase drop-shadow-[0_0_15px_rgba(255,0,51,0.6)]">
                    {tagline}
                  </span>
                </div>
              </motion.div>

              {/* Designation at the Bottom */}
              <motion.div
                className="flex flex-col items-center text-center px-6"
                initial={{ opacity: 0, y: 30 }}
                animate={scene === 'SCENE4' ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <h3 className="text-2xl sm:text-4xl font-bold tracking-widest text-white uppercase mb-2 drop-shadow-lg">
                  {employeeName}
                </h3>
                <p className="text-sm sm:text-xl font-medium tracking-[0.2em] text-[#FF0033] uppercase">
                  {designation}
                </p>
                <motion.div 
                  className="h-[2px] bg-gradient-to-r from-transparent via-white/40 to-transparent mt-4"
                  initial={{ width: 0 }}
                  animate={scene === 'SCENE4' ? { width: '120px' } : { width: 0 }}
                  transition={{ delay: 1.2, duration: 1.5, ease: "circOut" }}
                />
              </motion.div>
            </div>

            {/* PORTRAIT CARDS CONTAINER */}
            <div className="relative z-10 flex items-center justify-center">
              {portraits.map((src, index) => {
                const isMiddle = index === 2;
                
                let xOffset = (index - 2) * 260; 
                let scale = 1;
                let opacity = 1;
                let contrast = "100%";
                let border = "0px solid transparent";
                let shadow = "none";

                if (scene === 'SCENE2') {
                  xOffset = (index - 2) * 110; 
                  scale = 0.9;
                  contrast = "115%";
                  } else if (scene === 'SCENE3' || scene === 'SCENE4') {
                    if (isMiddle) {
                      xOffset = 0;
                      if (scene === 'SCENE4') {
                         scale =  1.3;
                         // Shift up more to clear bottom text
                      } else {
                         scale = 1.2;
                      }
                      border = "10px solid white";
                      shadow = "0 40px 100px -20px rgba(0,0,0,0.8)";
                    } else {
                    xOffset = 0;
                    scale = 0.6;
                    opacity = 0;
                  }
                }

                return (
                  <motion.div
                    key={index}
                    layout
                    layoutId={`card-${index}`}
                    initial={{ opacity: 0, y: 20, scale: 0.98 }}
                    animate={{ 
                      opacity, 
                      y: scene === 'SCENE4' && isMiddle ? -80 : 0, 
                      x: xOffset, 
                      scale,
                      filter: `contrast(${contrast})`,
                      boxShadow: shadow
                    }}
                    transition={{
                      opacity: { duration: 0.6, delay: index * 0.1 },
                      y: { duration: 0.6, delay: index * 0.1 },
                      x: { type: 'spring', stiffness: 100, damping: 18, mass: 1 },
                      scale: { type: 'spring', stiffness: 120, damping: 20 },
                      filter: { duration: 0.5 },
                      boxShadow: { duration: 0.8 }
                    }}
                    className="absolute cursor-default overflow-hidden bg-black"
                    style={{
                      width: '200px',
                      height: '280px',
                      border,
                      transition: 'border 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                    whileHover={scene === 'SCENE4' && isMiddle ? { y: -15, scale: 1.55 } : {}}
                  >
                    <motion.img 
                      src={src} 
                      alt={`Portrait ${index}`}
                      className="h-full w-full object-cover grayscale-[0.1]"
                      layoutId={`img-${index}`}
                    />
                    {/* Subtle glass reflection overlay */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none mix-blend-overlay" />
                  </motion.div>
                );
              })}
            </div>

            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
      <style>{`
        @media (max-width: 768px) {
          /* Mobile scaling adjustments */
          h2 { font-size: 25vw !important; }
          .absolute[style*="width: 200px"] {
            width: 140px !important;
            height: 196px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default EmployeeOfMonth;

