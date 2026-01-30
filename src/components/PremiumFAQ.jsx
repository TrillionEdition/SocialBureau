import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaMinus } from "react-icons/fa";

const faqs = [
  {
    question: "How does SocialBureau's API-driven marketing work?",
    answer:
      "We integrate custom API solutions with your existing marketing stack to automate data flow, enhance targeting precision, and provide real-time performance analytics across all platforms.",
  },
  {
    question: "What industries do you specialize in?",
    answer:
      "While we work across sectors, we specialize in high-growth digital businesses, e-commerce giants, and forward-thinking tech ventures that require scalable, automated marketing ecosystems.",
  },
  {
    question: "How can I join the SocialBureau expert network?",
    answer:
      "We are always looking for top-tier talent in SEO, Performance Marketing, and Creative Direction. You can apply through our Q/A hub or directly via our careers page.",
  },
  {
    question: "Do you offer custom consultancy for global brands?",
    answer:
      "Yes, through our TrillionEdition venture, we provide high-level strategic consultancy for leading edge businesses globally, focusing on long-term digital dominance.",
  },
];

const PremiumFAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section className="bg-black text-white pt-20 pb-10 md:pt-32 md:pb-16 px-6 md:px-12 lg:px-24 relative overflow-hidden">
      {/* Background elements for "award-winning" feel */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden opacity-20">
        <div className="absolute top-[-10%] right-[-10%] w-[80vw] md:w-[50vw] h-[80vw] md:h-[50vw] rounded-full bg-red-600/10 blur-[80px] md:blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[60vw] md:w-[40vw] h-[60vw] md:h-[40vw] rounded-full bg-gray-600/10 blur-[60px] md:blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          {/* Left Column: Heading & CTA */}
          <div className="w-full lg:w-1/3 space-y-8 lg:space-y-10">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="mb-6 inline-block"></div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter leading-[0.9] mb-8 lg:mb-10">
                GET REAL <br />
                <span
                  className="text-transparent border-b-2 border-red-600"
                  style={{ WebkitTextStroke: "1px white" }}
                >
                  ANSWERS.
                </span>
                <br />
                <span className="text-red-600">FROM REAL EXPERTS.</span>
              </h2>
              <p className="text-base md:text-lg text-white/50 font-medium tracking-tight leading-relaxed mb-10 lg:mb-12 max-w-sm">
                Explore SocialBureau’s Live Q/A Hub. Ask questions, solve
                marketing challenges, and learn from expert discussions.
              </p>

              <button
                onClick={() => navigate("/qa-section")}
                className="group relative overflow-hidden px-8 md:px-10 py-4 md:py-5 bg-white text-black font-black uppercase tracking-widest text-[10px] md:text-xs rounded-full transition-transform hover:scale-105 active:scale-95"
              >
                <span className="relative z-10">Visit Q/A Hub</span>
                <div className="absolute inset-x-0 bottom-0 h-1 bg-red-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
              </button>
            </motion.div>
          </div>

          {/* Right Column: Accordion */}
          <motion.div
            className="w-full lg:w-2/3"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            <div className="border-t border-white/10">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="border-b border-white/10 overflow-hidden group/item"
                >
                  <button
                    onClick={() =>
                      setActiveIndex(activeIndex === index ? null : index)
                    }
                    className="w-full py-8 md:py-10 flex items-center justify-between text-left group gap-3 md:gap-8"
                  >
                    <div className="flex items-center gap-3 md:gap-6">
                      <span className="text-[10px] md:text-xs font-black text-white/20 font-mono">
                        0{index + 1}
                      </span>
                      <span
                        className={`text-lg md:text-2xl lg:text-3xl font-black tracking-tighter uppercase leading-tight transition-all duration-500 ${
                          activeIndex === index
                            ? "text-red-600 md:pl-4"
                            : "text-white/90 group-hover/item:md:pl-4 group-hover/item:text-white"
                        }`}
                      >
                        {faq.question}
                      </span>
                    </div>
                    <div
                      className={`relative flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/10 flex items-center justify-center transition-all duration-700 ${
                        activeIndex === index
                          ? "bg-red-600 border-red-600 rotate-180 scale-110"
                          : "bg-white/5 group-hover/item:border-red-600/50"
                      }`}
                    >
                      <AnimatePresence mode="wait">
                        {activeIndex === index ? (
                          <motion.div
                            key="minus"
                            initial={{ opacity: 0, rotate: -90 }}
                            animate={{ opacity: 1, rotate: 0 }}
                            exit={{ opacity: 0, rotate: 90 }}
                          >
                            <FaMinus size={12} className="md:size-[14px]" />
                          </motion.div>
                        ) : (
                          <motion.div
                            key="plus"
                            initial={{ opacity: 0, rotate: 90 }}
                            animate={{ opacity: 1, rotate: 0 }}
                            exit={{ opacity: 0, rotate: -90 }}
                          >
                            <FaPlus size={12} className="md:size-[14px]" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </button>
                  <AnimatePresence>
                    {activeIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0, y: -20 }}
                        animate={{ height: "auto", opacity: 1, y: 0 }}
                        exit={{ height: 0, opacity: 0, y: -20 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="pl-8 md:pl-12 pr-4 md:pr-12 pb-8 md:pb-12">
                          <p className="text-base md:text-xl text-white/60 font-medium tracking-tight leading-relaxed max-w-3xl border-l-2 border-red-600/30 pl-6 md:pl-8 py-2">
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PremiumFAQ;
