import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * HERO ANIMATION VARIANTS
 */
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.3 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] }
  }
};

export default function CareersHeader() {
  const missionRef = useRef(null);

  // Parallax logic for the background image
  const { scrollYProgress } = useScroll({
    target: missionRef,
    offset: ["start end", "end start"]
  });

  // Moves the background image slightly on Y axis as you scroll
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <div className="bg-[#fafafa] text-[#1a1a1a] font-sans selection:bg-red-200 overflow-hidden" style={{ fontFamily: "'Playfair Display', serif" }}>

      {/* --- HERO SECTION --- */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="py-32 md:py-48 px-6 text-center"
      >
        <div className="max-w-5xl mx-auto">
          <motion.span
            variants={itemVariants}
            className="uppercase tracking-[0.5em] text-[10px] md:text-[12px] text-gray-400 mb-8 block font-medium"
          >
            Join the Bureau
          </motion.span>

          <h1
            style={{ fontFamily: "'Playfair Display', serif" }}
            className="text-6xl md:text-9xl font-medium mb-12 leading-[0.85] tracking-tighter"
          >
            <motion.span variants={itemVariants} className="block">Build the Future of</motion.span>
            <motion.span variants={itemVariants} className="italic text-red-600 block mt-4">API Marketing</motion.span>
          </h1>

          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl font-light text-gray-500 mb-16 max-w-xl mx-auto leading-relaxed"
          >
            Join the World’s First API Marketing Agency. Be part of the next evolution where data meets creative mastery.
          </motion.p>

          <motion.div variants={itemVariants}>
            <a
              href="#opportunities"
              className="inline-block border border-[#1a1a1a] px-14 py-6 text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-[#1a1a1a] hover:text-white transition-all duration-700 ease-out"
            >
              Explore Opportunities
            </a>
          </motion.div>
        </div>
      </motion.section>

      {/* --- MISSION SECTION --- */}
      <motion.section
        ref={missionRef}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
        className="relative h-[90vh] flex items-center justify-center overflow-hidden"
      >

        {/* Background Image */}
        <motion.div
          style={{ y: backgroundY }}
          initial={{ scale: 1.2 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 z-0"
        >
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80"
            alt="Minimalist Architecture"
            className="w-full h-full object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-white/40" />
        </motion.div>


        {/* CENTERED TEXT */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 max-w-4xl text-center px-6"
        >
          <h3 className="text-4xl md:text-6xl font-light leading-[1.25] tracking-tight text-gray-900">
            At{" "}
            <a
              href="https://socialbureau.in"
              className="border-b border-gray-300 hover:border-red-600 transition"
            >
              SocialBureau
            </a>
            , a project by <span className="font-medium">TrillionEdition LLP</span>,
            we are architecting the intersection of{" "}
            <span className="italic">performance</span> and{" "}
            <span className="italic text-red-600">artistry</span>.
          </h3>

          <div className="mx-auto mt-12 h-[2px] w-24 bg-red-600" />

          <p className="mt-12 text-xl md:text-2xl text-gray-600 font-light leading-relaxed">
            We are currently seeking{" "}
            <span className="text-black font-medium">25+ visionaries</span> to join
            our departments of strategy, technology, and design.
          </p>
        </motion.div>
      </motion.section>

    </div>
  );
}
