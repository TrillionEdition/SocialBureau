import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const sections = [
  {
    id: "01",
    title: "Who We Are",
    preview: "A results-driven digital marketing and branding agency.",
    content:
      "Social Bureau is a results-driven digital marketing and branding agency dedicated to helping businesses build strong, credible, and future-ready brands. We partner with organizations to create strategic marketing solutions that enhance visibility, strengthen brand presence, and drive sustainable growth.",
  },
  {
    id: "02",
    title: "Our Approach",
    preview: "Insight, creativity, and performance working together.",
    content:
      "With a balanced approach combining insight, creativity, and performance, we deliver end-to-end digital solutions including brand strategy, content development, social media management, and digital marketing. Every initiative is guided by clear objectives, audience understanding, and measurable outcomes.",
  },
  {
    id: "03",
    title: "Our Philosophy",
    preview: "Effective marketing built on clarity, consistency, and trust.",
    content:
      "At Social Bureau, we believe effective marketing is built on clarity, consistency, and trust. Our team works closely with clients to ensure their brand message is communicated with precision, professionalism, and impact across all digital platforms.",
  },
];

export const AboutCompany = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section className="bg-white text-black min-h-screen flex flex-col justify-center pt-6 pb-16 px-4 sm:px-6 md:pt-10 md:pb-32 lg:pt-14 lg:pb-48 border-t border-gray-100 relative overflow-hidden">
      {/* Decorative Red Blur */}
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#8D0F16]/5 blur-[120px] rounded-full -z-1" />

      <div className="max-w-[1100px] mx-auto w-full">
        {sections.map((s, i) => (
          <motion.div
            key={s.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: i * 0.2 }}
            viewport={{ once: true }}
            className={`${i < sections.length - 1 ? 'border-b border-gray-100' : ''} group`}
          >
            {/* ── DESKTOP (md+) ── */}
            <div className="hidden md:grid md:grid-cols-12 gap-12 py-20 group">
              <div className="md:col-span-1 flex items-start">
                <span className="text-[14px] sm:text-[16px] font-bold tracking-[0.2em] text-[#8D0F16] transition-all group-hover:scale-150 transform origin-left">
                  {s.id}
                </span>
              </div>
              <div className="md:col-span-11">
                <h2 className="text-[24px] sm:text-[32px] md:text-[48px] font-black tracking-[-0.03em] text-black mb-8 leading-[1.05] group-hover:text-[#8D0F16] transition-colors">
                  {s.title}
                </h2>
                <p className="text-[16px] sm:text-[18px] md:text-[22px] text-gray-500 leading-[1.6] max-w-4xl font-medium group-hover:text-black transition-colors duration-300">
                  {s.content}
                </p>
              </div>
            </div>

            {/* ── MOBILE (accordion) ── */}
            <div className="md:hidden">
              <button
                onClick={() => toggle(i)}
                className="w-full text-left py-6 flex flex-col gap-2 focus:outline-none"
              >
                {/* Number + chevron row */}
                <div className="flex items-center justify-between">
                  <span className="text-[14px] sm:text-[16px] font-bold tracking-[0.2em] text-[#8D0F16]">
                    {s.id}
                  </span>
                  <motion.div
                    animate={{ rotate: openIndex === i ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  </motion.div>
                </div>

                {/* Title */}
                <h2
                  className={`text-[18px] sm:text-[20px] md:text-[24px] font-black tracking-[-0.03em] leading-[1.1] transition-colors duration-300 ${openIndex === i ? 'text-[#8D0F16]' : 'text-black'
                    }`}
                >
                  {s.title}
                </h2>

                {/* Preview — always visible */}
                <p className="text-[13px] sm:text-[14px] text-gray-400 leading-[1.5] font-medium">
                  {s.preview}
                </p>
              </button>

              {/* Expanded full content */}
              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.div
                    key="body"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <p className="pb-6 pt-3 text-[14px] sm:text-[15px] md:text-[18px] text-gray-600 leading-[1.65] font-medium border-t border-gray-100">
                      {s.content}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}
      </div>
      <a href='/blog'>
        <button className='bg-[#8D0F16] text-white pt-3 px-5 py-3 rounded-full' style={{ marginLeft: '50%' }}>OUR BLOG</button></a>

    </section>
  );
};

