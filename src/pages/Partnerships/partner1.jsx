import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Heart, Target, Globe, Quote } from "lucide-react";

/**
 * Personal Storytelling Design for Partner1
 * Narrative Arc: Strategist -> Philanthropist -> Legacy.
 * Aesthetic: Simple, precise, and premium (Minimalist Luxury).
 */
const Partner1 = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });

  const chapters = [
    {
      id: "strategist",
      title: "The Strategist",
      number: "01",
      subtitle: "Precision in execution, clarity in vision.",
      content:
        "Advancing organizational excellence through data-driven business goal setting and strategic planning. With expertise in LOGFRAME indicators and monitoring strategies, I transform complex market challenges into measurable outcomes across hospitality, healthcare, and social development sectors.",
      icon: <Target className="w-5 h-5 text-blue-500" />,
      image: "/assets/Partnerships/John Samuel/1.jpg",
      stats: [
        { label: "Market Growth", value: "30%+" },
        { label: "Strategic Hubs", value: "Global" },
        { label: "Alliances Built", value: "100+" },
      ],
    },
    {
      id: "networker",
      title: "The Networker",
      number: "02",
      subtitle: "Impact through connection.",
      content:
        "Bridging gaps between government, corporate, and institutional entities. My role involves high-level liaison with bureaucrats, media, and primary stakeholders to build robust brand identities. I specialize in public relations management and strategic partnerships.",
      icon: <Heart className="w-5 h-5 text-blue-500" />,
      image: "/assets/Partnerships/John Samuel/2.jpg",
      events: [
        { name: "Renai Hotels branding", year: "2024", role: "Strategic Lead" },
        { name: "Healthcare Access", year: "2023", role: "Brand Architect" },
        { name: "Institutional Liaison", year: "2024", role: "Govt. Liaison" },
        { name: "Integrated Marketing", year: "2024", role: "Specialist" },
      ],
    },
    {
      id: "leader",
      title: "Growth Leader",
      number: "03",
      subtitle: "Designing for the next decade.",
      content:
        "Driving market expansion through innovative digital marketing and audience engagement strategies. My focus is on domestic and international revenue opportunities, leveraging leadership and negotiation skills for long-term stability and excellence.",
      icon: <Globe className="w-5 h-5 text-blue-500" />,
      image: "/assets/Partnerships/John Samuel/3.JPG",
      focus: [
        "Business Goal Setting",
        "Market Expansion",
        "Stakeholder Liaison",
        "Digital Strategy",
      ],
    },
  ];

  // Animation Variants
  const textReveal = {
    hidden: { y: "100%", opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const imageReveal = {
    hidden: { scale: 1.1, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 1.5, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-[#f8f8f8] text-[#0a0a0a] font-sans selection:bg-blue-600/10 overflow-x-hidden relative"
    >
      {/* Subtle Grain Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[9999] opacity-[0.04] mix-blend-multiply bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* Progress Line - Vertical & Minimalist */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 h-48 w-[1px] bg-black/10 z-50 hidden md:block">
        <motion.div
          className="w-full bg-blue-600 origin-top"
          style={{ height: "100%", scaleY: scrollYProgress }}
        />
      </div>

      <main className="relative">
        {/* --- HERO: Cinematic Reveal --- */}
        <section className="min-h-screen flex flex-col justify-center relative">
          <div className="absolute top-10 left-4 md:left-20">
            <span className="text-[10px] font-black tracking-[0.5em] uppercase text-blue-500 block mb-2 overflow-hidden">
              <motion.span
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                className="block"
              >
                Vol. 01 — KOCHI, KERALA
              </motion.span>
            </span>
          </div>

          <div className="w-full px-6 md:px-12">
            <h1 className="text-[15vw] md:text-[12vw] font-black tracking-tighter leading-[0.75] uppercase flex flex-col">
              <div className="overflow-hidden">
                <motion.span
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{
                    duration: 1.2,
                    delay: 0.2,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="block"
                >
                  JOHN
                </motion.span>
              </div>
              <div className="overflow-hidden flex flex-wrap items-end">
                <motion.span
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{
                    duration: 1.2,
                    delay: 0.3,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="block text-transparent stroke-black"
                  style={{ WebkitTextStroke: "1.5px rgba(0,0,0,0.2)" }}
                >
                  SAMUEL
                </motion.span>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "20vw" }}
                  transition={{
                    duration: 1.5,
                    delay: 0.6,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="h-[1px] bg-blue-600 mb-[2.5vw] ml-4 hidden md:block"
                />
              </div>
            </h1>

            <div className="grid md:grid-cols-2 gap-10 mt-20">
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="text-lg md:text-2xl text-gray-800 font-light leading-relaxed max-w-xl"
              >
                Sales, Marketing & Strategic Partnerships Professional.
                Advancing hospitality, healthcare, and human growth through
                precision.
              </motion.p>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1 }}
                className="flex flex-col justify-end items-start md:items-end gap-4"
              >
                <div
                  className="flex items-center gap-4 text-[10px] font-black tracking-widest uppercase cursor-pointer group"
                  onClick={() =>
                    document
                      .getElementById("philosophy")
                      .scrollIntoView({ behavior: "smooth" })
                  }
                >
                  <span className="group-hover:text-blue-500 transition-colors">
                    Begin the Exhibit
                  </span>
                  <div className="w-10 h-[10px] border border-black/10 rounded-full flex items-center px-1 overflow-hidden group">
                    <motion.div
                      animate={{ x: [0, 20, 0] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="w-2 h-2 rounded-full bg-blue-600"
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* --- PHILOSOPHY: The Blueprint --- */}
        <section id="philosophy" className="py-40 bg-white">
          <div className="w-full px-6 md:px-12">
            <div className="mb-32">
              <span className="text-blue-600 text-[10px] font-black tracking-[0.4em] uppercase block mb-4">
                Core Principles
              </span>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-none">
                THE ARCHITECTURE <br /> OF EXCELLENCE.
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-1px bg-black/5 border border-black/5">
              {[
                {
                  title: "Knowledge",
                  text: "Continually updating domain expertise across multiple sectors.",
                },
                {
                  title: "Integrity",
                  text: "Trust is the ultimate currency in strategic alliances.",
                },
                {
                  title: "Outcome",
                  text: "Rigorous focus on SMART indicators and measurable growth.",
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.05)" }}
                  className="p-12 bg-white transition-colors"
                >
                  <span className="text-blue-600 font-mono text-xs block mb-8">
                    0{i + 1}
                  </span>
                  <h3 className="text-2xl font-black tracking-tight mb-4 uppercase">
                    {item.title}
                  </h3>
                  <p className="text-gray-800 text-sm leading-relaxed font-light">
                    {item.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* --- STORY CHAPTERS --- */}
        {chapters.map((chapter, i) => (
          <section
            key={chapter.id}
            className={`py-40 overflow-hidden ${
              i % 2 === 0 ? "bg-[#fcfcfc]" : "bg-white"
            }`}
          >
            <div className="w-full px-6 md:px-12">
              <div
                className={`grid md:grid-cols-2 gap-20 items-center ${
                  i % 2 !== 0 ? "md:direction-rtl" : ""
                }`}
              >
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  className={`space-y-12 ${i % 2 !== 0 ? "md:order-2" : ""}`}
                >
                  <div className="flex items-center gap-6">
                    <span className="text-blue-500 text-4xl font-black opacity-20">
                      {chapter.number}
                    </span>
                    <div className="h-[1px] w-20 bg-blue-500/30" />
                    {chapter.icon}
                  </div>

                  <h2 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.8]">
                    {chapter.title.split(" ").map((word, idx) => (
                      <span key={idx} className="block overflow-hidden">
                        <motion.span variants={textReveal} className="block">
                          {word}
                        </motion.span>
                      </span>
                    ))}
                  </h2>

                  <div className="space-y-8">
                    <p className="text-xl text-gray-700 font-light leading-relaxed max-w-lg italic">
                      {chapter.subtitle}
                    </p>
                    <p className="text-gray-800 leading-relaxed font-light max-w-xl">
                      {chapter.content}
                    </p>
                  </div>

                  {chapter.stats && (
                    <div className="flex gap-12 pt-12 border-t border-black/5">
                      {chapter.stats.map((stat, idx) => (
                        <div key={idx}>
                          <div className="text-3xl font-black text-black mb-2">
                            {stat.value}
                          </div>
                          <div className="text-[9px] font-black uppercase tracking-widest text-blue-600">
                            {stat.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {chapter.events && (
                    <div className="grid grid-cols-2 gap-6 pt-12 border-t border-black/5">
                      {chapter.events.map((event, idx) => (
                        <div key={idx} className="group cursor-default">
                          <span className="text-[10px] text-gray-500 group-hover:text-blue-600 transition-colors block mb-1">
                            {event.year}
                          </span>
                          <h4 className="text-sm font-bold uppercase tracking-tight">
                            {event.name}
                          </h4>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>

                <div
                  className={`relative ${i % 2 !== 0 ? "md:order-1" : ""} flex justify-center group/img w-full`}
                >
                  <div className="relative overflow-hidden w-full max-w-2xl h-full aspect-[3/4] md:aspect-[2/3] max-h-[90vh] shadow-[0_40px_100px_rgba(0,0,0,0.15)] bg-gray-100">
                    {/* Award-Winning Multi-Stage Mask Reveal */}
                    {[0, 1, 2].map((depth) => (
                      <motion.div
                        key={depth}
                        initial={{ scaleY: 1 }}
                        whileInView={{ scaleY: 0 }}
                        viewport={{ once: true, margin: "-10%" }}
                        transition={{
                          duration: 1.2 + depth * 0.2,
                          delay: depth * 0.1,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        className={`absolute inset-0 bg-blue-600/${100 - depth * 20} z-${30 - depth * 10} origin-bottom`}
                      />
                    ))}

                    <motion.div
                      style={{
                        y: useTransform(scrollYProgress, [0, 1], [20, -20]),
                      }}
                      className="w-full h-full"
                    >
                      <motion.img
                        initial={{ scale: 1.2, y: 40 }}
                        whileInView={{ scale: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 2.5,
                          ease: [0.16, 1, 0.3, 1],
                          delay: 0.2,
                        }}
                        src={chapter.image}
                        alt={chapter.title}
                        className="w-full h-full object-cover object-top transition-transform duration-1000 group-hover/img:scale-105"
                      />
                      {/* Luxury Shimmer Glint */}
                      <motion.div
                        initial={{ x: "-100%", skewX: -45 }}
                        whileInView={{ x: "200%" }}
                        transition={{
                          duration: 2,
                          delay: 1.5,
                          ease: "easeInOut",
                        }}
                        className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none"
                      />
                    </motion.div>
                  </div>

                  {/* Enhanced Background Depth */}
                  <motion.div
                    style={{
                      y: useTransform(scrollYProgress, [0, 1], [-50, 50]),
                      rotate: i % 2 === 0 ? 5 : -5,
                    }}
                    className={`absolute -bottom-24 ${
                      i % 2 === 0 ? "-right-24" : "-left-24"
                    } w-80 h-80 bg-blue-600/10 blur-[140px] rounded-full -z-10`}
                  />

                  {/* Floating Number Overlay - Minimalist Luxury Detail */}
                  <motion.span
                    initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                    whileInView={{ opacity: 0.05, x: 0 }}
                    transition={{ duration: 1.5, delay: 0.8 }}
                    className={`absolute top-0 ${i % 2 === 0 ? "left-0" : "right-0"} text-[20vw] font-black pointer-events-none`}
                  >
                    {chapter.number}
                  </motion.span>
                </div>
              </div>
            </div>
          </section>
        ))}

        {/* --- FOOTPRINT: Grid Layout --- */}
        <section className="py-40 bg-[#f8f8f8]">
          <div className="w-full px-6 md:px-12">
            <div className="flex justify-between items-end mb-24">
              <div>
                <span className="text-blue-600 text-[10px] font-black tracking-[0.4em] uppercase block mb-4">
                  Footprint
                </span>
                <h2 className="text-5xl font-black tracking-tighter uppercase">
                  Professional <br /> Reach.
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {["Kochi", "Kerala", "International", "Digital"].map(
                (city, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ y: -10 }}
                    className="p-10 border border-black/5 bg-white relative overflow-hidden group shadow-sm"
                  >
                    <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowRight size={14} className="text-blue-600" />
                    </div>
                    <h3 className="text-xl md:text-3xl font-black mb-4 group-hover:text-blue-600 transition-colors uppercase">
                      {city}
                    </h3>
                    <div className="w-8 h-[1px] bg-black/10 group-hover:w-full transition-all duration-500" />
                  </motion.div>
                ),
              )}
            </div>
          </div>
        </section>

        {/* --- QUOTE --- */}
        <section className="min-h-screen flex items-center justify-center bg-white relative">
          <div className="max-w-4xl mx-auto px-8 text-center relative z-10">
            <Quote className="text-blue-600/10 mx-auto mb-16" size={80} />
            <motion.h3
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5 }}
              className="text-4xl md:text-7xl font-light leading-tight tracking-tighter italic"
            >
              "Strategies for growth are only as strong as the{" "}
              <span className="text-blue-600 NOT-italic font-black">
                humanity
              </span>{" "}
              that informs them."
            </motion.h3>
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl aspect-square bg-blue-600/5 blur-[120px] rounded-full" />
        </section>

        {/* --- FOOTER --- */}
        <footer className="py-40 bg-white border-t border-black/5">
          <div className="w-full px-6 md:px-12 grid md:grid-cols-2 gap-20">
            <div className="space-y-12">
              <h2 className="text-8xl md:text-[12rem] font-black tracking-tighter leading-none opacity-5 uppercase">
                HELLO.
              </h2>
              <p className="text-xl text-gray-700 font-light max-w-sm">
                Available for strategic partnerships, market expansion
                consultation, and leadership roles.
              </p>
            </div>

            <div className="flex flex-col justify-between items-start md:items-end">
              <div className="space-y-8 text-left md:text-right">
                <a
                  href="mailto:experiment13john@gmail.com"
                  className="block text-2xl md:text-4xl font-black hover:text-blue-600 transition-colors uppercase tracking-tight"
                >
                  Get In Touch
                </a>
                <div className="space-y-2">
                  <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
                    +91 9846935555
                  </div>
                  <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
                    Kalamassery, Kerala
                  </div>
                </div>
              </div>

              <div className="pt-20 md:pt-0">
                <span className="text-[9px] font-black tracking-[0.5em] uppercase text-gray-200">
                  © MMXXIV — JOHN SAMUEL — PRECISION & SCALE
                </span>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Partner1;
