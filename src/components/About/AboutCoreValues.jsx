import React from "react";
import { motion } from "framer-motion";

const values = [
  { icon: "assets/icon1.webp", title: "Performance First", desc: "We don't guess. We design outcomes." },
  { icon: "assets/icon2.webp", title: "Niche-Native Thinking", desc: "We understand the cultural codes that others ignore." },
  { icon: "assets/icon3.webp", title: "Speed & Precision", desc: "Fast, focused and flawless." },
  { icon: "assets/icon4.webp", title: "Brutal Clarity", desc: "No jargon. Only sharp, clear, actionable insights." },
  { icon: "assets/icon5.webp", title: "Zero Vanity", desc: "No fake work. Only compounding ROI." },
];

export default function AboutCoreValues() {
  return (
    <section className="min-h-screen flex flex-col justify-center py-16 px-4 sm:px-6 md:py-32 lg:py-48 bg-black border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto w-full">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-[#8D0F16] font-bold uppercase tracking-[0.2em] text-center text-[14px] sm:text-[16px] mb-4"
        >
          What drives us
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-[24px] sm:text-[32px] md:text-[48px] font-black tracking-[-0.03em] text-white text-center mb-12 sm:mb-24"
        >
          Our Core <span className="text-[#8D0F16]">Values</span>
        </motion.h2>

        {/* ── MOBILE: single column full-width cards ── */}
        <div className="flex flex-col gap-3 sm:hidden">
          {values.map((val, idx) => (
            <motion.div
              key={val.title}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              viewport={{ once: true }}
              className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-4 flex flex-row items-center gap-4 shadow-xl group hover:border-[#8D0F16]/20 transition-all duration-500"
            >
              {/* Icon */}
              <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center p-2.5 bg-[#111] rounded-xl shadow-inner group-hover:scale-110 transition-transform">
                <img src={val.icon} alt={val.title} className="w-full h-full object-contain brightness-0 invert" />
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <h3 className="text-[14px] sm:text-[15px] font-bold tracking-tight text-white leading-tight group-hover:text-[#8D0F16] transition-colors mb-1">
                  {val.title}
                </h3>
                <p className="text-[13px] sm:text-[14px] text-white/50 leading-relaxed font-medium group-hover:text-white/80 transition-colors">
                  {val.desc}
                </p>
              </div>

              {/* Accent bar */}
              <div className="w-1 h-8 flex-shrink-0 bg-white/10 group-hover:bg-[#8D0F16] transition-all duration-500 rounded-full" />
            </motion.div>
          ))}
        </div>

        {/* ── TABLET / DESKTOP: original grid ── */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {values.map((val, idx) => (
            <motion.div
              key={val.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -15 }}
              className="bg-[#0a0a0a] border border-white/5 rounded-[2.5rem] p-10 flex flex-col items-center text-center shadow-2xl hover:border-[#8D0F16]/20 transition-all duration-500 group"
            >
              <div className="w-16 h-16 mb-8 flex items-center justify-center p-3 bg-[#111] rounded-2xl shadow-inner group-hover:scale-110 transition-transform">
                <img src={val.icon} alt={val.title} className="w-full h-full object-contain brightness-0 invert" />
              </div>
              <h3 className="text-[18px] sm:text-[20px] md:text-[24px] font-bold tracking-tight text-white mb-4 leading-tight group-hover:text-[#8D0F16] transition-colors">
                {val.title}
              </h3>
              <p className="text-[13px] sm:text-[14px] text-white/50 leading-relaxed font-medium group-hover:text-white/80 transition-colors">
                {val.desc}
              </p>
              <div className="mt-8 w-8 h-1 bg-white/10 group-hover:w-full group-hover:bg-[#8D0F16] transition-all duration-700" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

