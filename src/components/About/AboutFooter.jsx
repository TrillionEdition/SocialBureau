import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, BarChart3, TrendingUp, Scale, Eye, ChevronDown } from 'lucide-react';

const trustPoints = [
  {
    id: "01",
    icon: <ShieldCheck className="w-8 h-8" />,
    title: "Demonstrated Experience Through Real Execution",
    preview: "Our credibility is built on hands-on implementation, not theoretical strategies.",
    content: `Our credibility is built on hands-on implementation, not theoretical strategies. Each campaign is led by domain-focused specialists who apply practical knowledge gained from live projects across diverse industries. This real-world experience allows us to create strategies aligned with search intent, algorithm evolution, and generative search environments, reinforcing experience and expertise at every level.`
  },
  {
    id: "02",
    icon: <BarChart3 className="w-8 h-8" />,
    title: "Performance-Led, Data-Validated Decisions",
    preview: "We rely on analytics, behavioral insights, and continuous optimization to guide every action.",
    content: `We rely on analytics, behavioral insights, and continuous optimization to guide every action. Rather than chasing surface-level metrics, we focus on measurable outcomes that support visibility, engagement, and conversion growth. This data-first approach ensures strategies remain adaptable and effective across traditional search and AI-driven discovery platforms.`
  },
  {
    id: "03",
    icon: <TrendingUp className="w-8 h-8" />,
    title: "Client Growth as a Measurable Success Indicator",
    preview: "Client trust is earned through consistent progress and long-term impact.",
    content: `Client trust is earned through consistent progress and long-term impact. We prioritize scalable growth models that evolve with business goals, market shifts, and regional demand. Our collaborative approach helps brands strengthen authority and expand reach across competitive and emerging markets.`
  },
  {
    id: "04",
    icon: <Scale className="w-8 h-8" />,
    title: "High Quality Standards and Ethical Frameworks",
    preview: "Every process we follow is grounded in compliance, accuracy, and sustainability.",
    content: `Every process we follow is grounded in compliance, accuracy, and sustainability. From content integrity to campaign execution, we adhere to ethical marketing standards that protect brand reputation and support long-term digital trust, a key factor in modern search ecosystems.`
  },
  {
    id: "05",
    icon: <Eye className="w-8 h-8" />,
    title: "Transparency, Accountability, and Strategic Clarity",
    preview: "We maintain complete transparency in planning, execution, and reporting.",
    content: `We maintain complete transparency in planning, execution, and reporting. Clients receive clear insights, actionable data, and honest guidance, enabling informed decision-making. This accountability-driven model builds lasting trust and positions brands for consistent success in global and generative search environments.`
  }
];

const AboutFooter = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <div className="overflow-hidden">

      {/* ── HERO — Red background ── */}
      <section className="bg-[#8D0F16] py-16 sm:py-32 md:py-48 px-4 sm:px-6 text-center">
        <div className="max-w-[900px] mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-[14px] sm:text-[16px] font-bold text-white/80 uppercase tracking-[0.2em] mb-6 sm:mb-8"
          >
            Why Clients Trust Us
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-[32px] sm:text-[48px] md:text-[72px] lg:text-[96px] font-black tracking-[-0.04em] leading-[0.9] text-white mb-6 sm:mb-10"
          >
            Trust is built on
            <br />
            <span className="text-black">proven execution.</span>
          </motion.h2>

          {/* Subtitle — full white, high opacity */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-[16px] sm:text-[18px] md:text-[22px] text-white font-medium leading-[1.6] max-w-2xl mx-auto"
          >
            Credibility earned through experience, performance, and transparency.
          </motion.p>
        </div>
      </section>

      {/* ── TRUST POINTS — White background ── */}
      <section className="bg-white w-full py-16 sm:py-32">
        <div className="px-4 sm:px-6 max-w-[1100px] mx-auto">
          {trustPoints.map((point, i) => (
            <motion.div
              key={point.id}
              initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              viewport={{ once: true }}
              className={`${i < trustPoints.length - 1 ? 'border-b border-gray-100' : ''} group`}
            >
              {/* ── DESKTOP LAYOUT (md+) ── */}
              <div className="hidden md:grid md:grid-cols-12 gap-12 py-16 group">
                {/* Number + Icon */}
                <div className="md:col-span-2 flex flex-col items-start gap-6">
                  <span className="text-[14px] sm:text-[16px] font-bold tracking-[0.2em] text-gray-300 group-hover:text-[#8D0F16] transition-colors">
                    {point.id}
                  </span>
                  <div className="p-4 bg-gray-100 rounded-2xl text-[#8D0F16] group-hover:bg-[#8D0F16] group-hover:text-white transition-all duration-500 transform group-hover:rotate-12">
                    {point.icon}
                  </div>
                </div>

                {/* Title */}
                <div className="md:col-span-4">
                  <h3 className="text-[18px] sm:text-[20px] md:text-[24px] font-bold tracking-tight leading-[1.2] text-black group-hover:text-[#8D0F16] transition-colors">
                    {point.title}
                  </h3>
                </div>

                {/* Full Content */}
                <div className="md:col-span-6">
                  <p className="text-[14px] sm:text-[15px] md:text-[18px] text-gray-500 leading-[1.6] font-medium group-hover:text-gray-800 transition-colors">
                    {point.content}
                  </p>
                </div>
              </div>

              {/* ── MOBILE LAYOUT (accordion) ── */}
              <div className="md:hidden">
                <button
                  onClick={() => toggle(i)}
                  className="w-full text-left py-6 flex flex-col gap-3 focus:outline-none"
                >
                  {/* Top row: number + icon + chevron */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-[14px] sm:text-[16px] font-bold tracking-[0.2em] text-gray-300">
                        {point.id}
                      </span>
                      <div
                        className={`p-3 rounded-xl transition-all duration-300 ${openIndex === i
                            ? 'bg-[#8D0F16] text-white'
                            : 'bg-gray-100 text-[#8D0F16]'
                          }`}
                      >
                        {React.cloneElement(point.icon, { className: 'w-5 h-5' })}
                      </div>
                    </div>
                    <motion.div
                      animate={{ rotate: openIndex === i ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    </motion.div>
                  </div>

                  {/* Title */}
                  <h3 className={`text-[18px] sm:text-[20px] font-bold tracking-tight leading-[1.2] transition-colors duration-300 ${openIndex === i ? 'text-[#8D0F16]' : 'text-black'
                    }`}>
                    {point.title}
                  </h3>

                  {/* Preview text */}
                  <p className="text-[13px] sm:text-[14px] text-gray-400 leading-[1.5] font-medium">
                    {point.preview}
                  </p>
                </button>

                {/* Dropdown expanded content */}
                <AnimatePresence initial={false}>
                  {openIndex === i && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 text-[14px] sm:text-[15px] text-gray-600 leading-[1.65] font-medium border-t border-gray-100 pt-4">
                        {point.content}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── CTA — Black background ── */}
      <section className="py-20 sm:py-40 px-4 sm:px-6 border-t border-white/10 text-center bg-black">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-[800px] mx-auto"
        >
          <h3 className="text-[24px] sm:text-[32px] md:text-[48px] font-black tracking-[-0.03em] text-white mb-6 sm:mb-8 leading-[1.05]">
            Experience <span className="text-[#8D0F16]">strategic</span> clarity.
          </h3>
          <p className="text-[16px] sm:text-[18px] md:text-[22px] text-white/60 mb-10 sm:mb-16 leading-[1.6] max-w-2xl mx-auto">
            Partner with a team that turns data into decisions and decisions into growth.
          </p>
          <a href="/contact">
            <button className="bg-[#8D0F16] text-white px-10 sm:px-16 py-4 sm:py-6 rounded-full text-[14px] sm:text-[16px] md:text-[18px] font-bold hover:bg-white hover:text-[#8D0F16] transition-all transform hover:scale-110 shadow-[0_0_40px_rgba(156,31,30,0.4)] uppercase tracking-widest">
              Partner with us
            </button>
          </a>
        </motion.div>
      </section>

    </div>
  );
};

export default AboutFooter;
