import React from "react";
import { motion, useTransform } from "framer-motion";

const Hero = ({ scrollYProgress }) => {
  const xLeft = useTransform(scrollYProgress, [0, 0.25], [0, -100]);
  const xRight = useTransform(scrollYProgress, [0, 0.25], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0.15, 0.3], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.25], [1, 0.92]);

  const line1 = "THIS ISN'T ABOUT US,";
  const line2 = "IT'S ABOUT YOU.";
  const line3 = "YOUR BUSINESS.";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.4 },
    },
  };

  const letterVariants = {
    hidden: { y: "110%", rotate: 5 },
    visible: {
      y: 0,
      rotate: 0,
      transition: {
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const renderLetters = (text, isAccent = false) => {
    return text.split("").map((char, i) => (
      <motion.span
        key={i}
        variants={letterVariants}
        className={`inline-block ${isAccent ? "text-red-600" : "text-white"}`}
      >
        {char === " " ? "\u00A0" : char}
      </motion.span>
    ));
  };

  return (
    <motion.div
      className="h-full flex flex-col justify-center items-center px-6 md:px-24 pointer-events-none"
      style={{ opacity, scale }}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-[1600px] w-full flex flex-col items-center md:items-start text-center md:text-left">
        <div className="overflow-hidden">
          <motion.h1
            style={{ x: xLeft }}
            className="text-[8vw] md:text-[7vw] leading-[0.8] font-[900] tracking-tighter uppercase"
          >
            {renderLetters(line1)}
          </motion.h1>
        </div>
        <div className="overflow-hidden mt-2">
          <motion.h1
            style={{ x: xRight }}
            className="text-[8vw] md:text-[7vw] leading-[0.8] font-[900] tracking-tighter uppercase"
          >
            {renderLetters(line2, true)}
          </motion.h1>
        </div>
        <div className="overflow-hidden mt-2">
          <motion.h1
            style={{ x: xLeft }}
            className="text-[8vw] md:text-[7vw] leading-[0.8] font-[900] tracking-tighter uppercase"
          >
            {renderLetters(line3)}
          </motion.h1>
        </div>
      </div>
    </motion.div>
  );
};

export default Hero;
