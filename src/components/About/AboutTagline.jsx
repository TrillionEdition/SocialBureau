import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AboutMission = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-black text-white overflow-x-hidden selection:bg-[#8D0F16] selection:text-white">
      {/* HERO SECTION */}
      <section className="min-h-screen flex flex-col justify-center items-center text-center px-4 sm:px-6 pt-10 pb-10 md:pt-16 md:pb-16">

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-[14px] sm:text-[16px] font-bold text-[#8D0F16] tracking-[0.2em] uppercase mb-6"
        >
          Our Mission
        </motion.p>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-[32px] sm:text-[48px] md:text-[72px] lg:text-[96px] font-black tracking-[-0.04em] leading-[0.9] text-white pt-3 pb-8 md:pt-4 md:pb-10"
        >
          Empower businesses.
          <br />
          <span className="text-[#8D0F16]">Deliver growth.</span>
        </motion.h1>

        {/* Wider: max-w-4xl → max-w-6xl */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="max-w-6xl w-full text-[16px] sm:text-[18px] md:text-[22px] font-medium text-white/70 leading-[1.6]"
          style={{ letterSpacing: '-0.01em' }}
        >
          {/* ── DESKTOP: all visible ── */}
          <div className="hidden md:block space-y-8 text-center">
            <p>
              Our mission is to empower businesses with strategic, results-driven
              digital and API marketing solutions that deliver{' '}
              <span className="text-white font-bold border-b-4 border-[#8D0F16]">
                consistent, measurable growth.
              </span>
            </p>
            <p className="text-white/50">
              We focus on building strong brand authority by combining industry
              expertise, data-led strategies, and future-ready technologies.
              By aligning marketing efforts with user intent, evolving search
              behaviors, and AI-driven discovery platforms, we help brands stay{' '}
              <span className="text-white font-bold">visible, credible, and competitive.</span>
            </p>
            <p className="text-white/50 italic">
              We are committed to transparency, innovation, and continuous
              optimization, ensuring every campaign is scalable and
              performance-focused. Rather than chasing short-term gains, we create
              sustainable marketing ecosystems that support long-term success,
              strengthen digital trust, and drive meaningful business outcomes
              across global markets.
            </p>
          </div>

          {/* ── MOBILE: first paragraph + read more centered ── */}
          <div className="md:hidden space-y-5 text-left">
            <p>
              Our mission is to empower businesses with strategic, results-driven
              digital and API marketing solutions that deliver{' '}
              <span className="text-white font-bold border-b-4 border-[#8D0F16]">
                consistent, measurable growth.
              </span>
            </p>

            <AnimatePresence initial={false}>
              {expanded && (
                <motion.div
                  key="extra"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.45, ease: 'easeInOut' }}
                  className="overflow-hidden space-y-5"
                >
                  <p className="text-white/50">
                    We focus on building strong brand authority by combining industry
                    expertise, data-led strategies, and future-ready technologies.
                    By aligning marketing efforts with user intent, evolving search
                    behaviors, and AI-driven discovery platforms, we help brands stay{' '}
                    <span className="text-white font-bold">visible, credible, and competitive.</span>
                  </p>
                  <p className="text-white/50 italic">
                    We are committed to transparency, innovation, and continuous
                    optimization, ensuring every campaign is scalable and
                    performance-focused. Rather than chasing short-term gains, we create
                    sustainable marketing ecosystems that support long-term success,
                    strengthen digital trust, and drive meaningful business outcomes
                    across global markets.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Toggle button — centered */}
            <div className="flex justify-center pt-2 pb-4">
              <button
                onClick={() => setExpanded(!expanded)}
                className="flex items-center gap-2 text-[14px] font-black uppercase tracking-widest text-white/40 hover:text-[#8D0F16] transition-colors"
              >
                <span>{expanded ? 'Read Less' : 'Read More'}</span>
                <motion.span
                  animate={{ rotate: expanded ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-[18px] leading-none"
                >
                  ↓
                </motion.span>
              </button>
            </div>
          </div>

        </motion.div>
      </section>

      {/* Divider */}
      <div className="flex justify-center pb-12">
        <div className="w-[100px] h-[4px] bg-[#8D0F16]" />
      </div>
    </div>
  );
};

export default AboutMission;

