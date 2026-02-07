import React from "react";
import { motion } from "framer-motion";

export const Intro = () => {
  const cards = [
    {
      id: "01",
      title: "API-Powered Growth",
      desc: "Fully automated marketing pipelines built with Meta, Google, LinkedIn, and custom APIs.",
      align: "start",
    },
    {
      id: "02",
      title: "Data-Driven Strategy",
      desc: "Every click, view, and conversion is tracked, analyzed, and optimized.",
      align: "end",
    },
    {
      id: "03",
      title: "Global Marketing Reach",
      desc: "Scalable systems to launch your campaigns anywhere in the world.",
      align: "start",
    },
    {
      id: "04",
      title: "Creative + Tech Fusion",
      desc: "We blend marketing intelligence with software engineering precision.",
      align: "end",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95, filter: "blur(4px)" },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section className="relative py-15 px-6 lg:px-24 bg-black overflow-hidden">
      {/* Cinematic Background Glows */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/4 -left-1/4 w-[60vw] h-[60vw] bg-red-600/5 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 -right-1/4 w-[60vw] h-[60vw] bg-red-900/5 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-none text-white italic">
            WHY WE'RE <br />
            <span
              className="text-transparent"
              style={{ WebkitTextStroke: "1.5px #dc2626" }}
            >
              DIFFERENT
            </span>
          </h2>
        </motion.div>

        {/* Feature Cards Grid/Stack */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-100px" }}
          className="flex flex-col gap-6 md:gap-8"
        >
          {cards.map((card, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ scale: 1.01, x: card.align === "end" ? -10 : 10 }}
              className={`w-full md:max-w-xl ${
                card.align === "end" ? "md:self-end" : "md:self-start"
              }`}
            >
              <div className="group relative">
                {/* Underlay glow */}
                <div className="absolute inset-0 bg-red-600/0 group-hover:bg-red-600/10 blur-3xl transition-all duration-700 -z-10" />

                <div className="relative bg-white/[0.03] backdrop-blur-3xl border border-white/10 p-5 md:p-7 rounded-3xl hover:border-red-600/40 transition-all duration-500 overflow-hidden">
                  <div className="flex items-center gap-6 md:gap-8">
                    <span className="text-3xl md:text-4xl font-black text-red-600/30 font-mono italic leading-none shrink-0">
                      {card.id}
                    </span>
                    <div className="space-y-1">
                      <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight text-white/90 group-hover:text-red-500 transition-colors duration-500">
                        {card.title}
                      </h3>
                      <p className="text-sm md:text-base text-white/40 font-medium tracking-tight leading-snug group-hover:text-white/70 transition-colors duration-500">
                        {card.desc}
                      </p>
                    </div>
                  </div>

                  {/* Aesthetic accent line */}
                  <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-red-600/30 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Outcome/Manifesto */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="mt-32 text-center"
        >
          <p className="text-xl md:text-3xl font-medium tracking-tighter text-white/70 leading-tight max-w-5xl mx-auto italic">
            <span className="text-white not-italic font-black">
              <a style={{ fontFamily: "MyFont, sans-serif" }} href='https://socialbureau.in'>
              Social<span className="text-[#ff0000]">B</span>ureau
            </a>
            </span>{" "}
            is a vision by{" "}
            <a
              href="https://trillionedition.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-red-600 transition-colors"
            >
              TrillionEdition
            </a>
            , designed to modernize marketing for the digital age. We believe
            the future of marketing is programmable and we’re already building
            it.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
