import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const services = [
  {
    id: "01",
    title: "STRATEGIC ADVISORY",
    description:
      "Partnering with executive leadership to navigate complex market dynamics. We clarify vision, identify high-impact opportunities, and chart a definitive roadmap for sustainable, long-term growth.",
  },
  {
    id: "02",
    title: "OPERATIONAL EXCELLENCE",
    description:
      "Transforming organizational friction into seamless execution. By streamlining processes and optimizing resource allocation, we help businesses scale efficiently without compromising on quality.",
  },
  {
    id: "03",
    title: "MARKET EXPANSION",
    description:
      "Unlocking new avenues for revenue generation. From competitive analysis to go-to-market strategies, we equip your organization with the insights needed to confidently enter uncharted territories.",
  },
  {
    id: "04",
    title: "TRANSFORMATION",
    description:
      "Leading structural and digital change that future-proofs your enterprise. We guide teams through complex transitions, ensuring adoption and alignment at every level of the organization.",
    images: [
      "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2670&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2670&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2669&auto=format&fit=crop",
    ],
  },
];

const principles = [
  {
    title: "CLARITY FIRST",
    desc: "We distill complex organizational challenges into clear, actionable frameworks. Ambiguity is the enemy of progress.",
  },
  {
    title: "DATA DRIVEN",
    desc: "Instinct informs vision, but data dictates execution. Every strategy is rooted in rigorous quantitative analysis.",
  },
  {
    title: "HUMAN CENTRIC",
    desc: "Transformation only succeeds when people adopt it. We align operational change with human behavior and culture.",
  },
];

const AnimatedText = ({ text, className = "" }) => {
  return (
    <span className={className}>
      {text.split(" ").map((word, i, arr) => (
        <React.Fragment key={i}>
          <motion.span
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
              },
            }}
            className="inline-block"
          >
            {word}
          </motion.span>
          {i !== arr.length - 1 && " "}
        </React.Fragment>
      ))}
    </span>
  );
};

function ServiceSection({ service, index }) {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.3]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  // Alternating background colors for the stack effect to create depth in light mode
  const bgColors = [
    "bg-[#F8F9FA]",
    "bg-[#F1F3F5]",
    "bg-[#E9ECEF]",
    "bg-[#DEE2E6]",
  ];
  const bgColor = bgColors[index % bgColors.length];

  return (
    <div
      ref={container}
      className={`h-screen sticky top-0 overflow-hidden ${bgColor}`}
      style={{ zIndex: index + 1 }}
    >
      <motion.div
        style={{ scale, opacity, y }}
        className="h-full w-full flex flex-col justify-center py-20 px-6 md:px-12 lg:px-24 border-t border-black/5"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-7xl mx-auto w-full">
          <div className="lg:col-span-8">
            <div className="flex items-baseline gap-4 mb-8">
              <span className="font-mono text-sm font-medium text-black/40">
                {service.id}
              </span>
              <div className="h-px w-16 bg-black/20" />
            </div>
            <motion.h2
              initial={{ x: -30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tighter leading-[0.9] text-zinc-900 break-words"
            >
              {service.title}
            </motion.h2>
          </div>
          <div className="lg:col-span-4 lg:pt-24">
            <motion.p
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              viewport={{ once: true }}
              className="text-lg md:text-xl text-zinc-600 leading-relaxed font-normal"
            >
              {service.description}
            </motion.p>
          </div>
        </div>

        {service.images && (
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-7xl mx-auto w-full"
          >
            {service.images.map((img, i) => (
              <div
                key={i}
                className="aspect-[4/3] overflow-hidden rounded-xl bg-zinc-200 group cursor-pointer border border-black/5 shadow-sm"
              >
                <img
                  src={img}
                  alt="Consulting Workshop"
                  className="w-full h-full object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
              </div>
            ))}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

export default function CheriyanPage() {
  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(heroScroll, [0, 1], ["0%", "40%"]);
  const heroOpacity = useTransform(heroScroll, [0, 1], [1, 0]);
  const heroScale = useTransform(heroScroll, [0, 1], [1, 1.1]);

  return (
    <div className="bg-[#FAF9F6] text-zinc-900 selection:bg-black selection:text-white font-sans antialiased">
      {/* Spacer for potential fixed navbars, optional */}

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="h-screen w-full relative overflow-hidden bg-[#FAF9F6] flex items-center justify-center px-6"
      >
        <motion.div
          style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
          className="absolute inset-0 z-0 pointer-events-none opacity-20"
        >
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop"
            alt="Architecture"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#FAF9F6] mix-blend-lighten" />
        </motion.div>

        <div className="absolute top-8 left-6 md:left-12 z-20">
          <div className="text-xs tracking-[0.2em] font-semibold text-zinc-500">
            CHERIYAN CO.
          </div>
        </div>

        <div className="max-w-7xl w-full relative z-10 flex flex-col items-center text-center mt-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <span className="text-sm md:text-base font-medium tracking-[0.3em] uppercase text-zinc-500 border border-zinc-200 px-6 py-2 rounded-full bg-white/50 backdrop-blur-sm shadow-sm">
              Business Transformation
            </span>
          </motion.div>

          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-7xl md:text-[10vw] font-bold leading-[0.85] tracking-tighter text-zinc-900"
            >
              ENGINEER
            </motion.h1>
          </div>
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{
                duration: 1.2,
                delay: 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="text-7xl md:text-[10vw] font-bold leading-[0.85] tracking-tighter text-zinc-900"
            >
              TOMORROW.
            </motion.h1>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-32 md:py-48 px-6 md:px-12 lg:px-24 bg-white relative z-10 border-t border-black/5">
        <div className="max-w-4xl mx-auto">
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              visible: { transition: { staggerChildren: 0.03 } },
              hidden: {},
            }}
            className="text-2xl md:text-4xl lg:text-5xl font-medium leading-[1.3] tracking-tight text-zinc-900"
          >
            <AnimatedText text="We don't do theoretical advice. We build operational engines that drive" />{" "}
            <AnimatedText
              text="measurable enterprise value"
              className="text-zinc-400"
            />
            <AnimatedText text=". From strategic turnarounds to aggressive market expansion, our approach is defined by precision and action." />
          </motion.p>
        </div>
      </section>

      {/* Methodologies Grid */}
      <section className="py-32 px-6 md:px-12 lg:px-24 bg-zinc-900 text-white relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <motion.h2
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl font-bold tracking-tighter leading-none"
            >
              THE
              <br />
              APPROACH.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-zinc-400 max-w-sm text-lg"
            >
              Our methodology ensures that vision translates flawlessly into
              bottom-line reality.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {principles.map((principle, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 * idx }}
                className="bg-zinc-800 p-8 md:p-12 rounded-2xl border border-zinc-700 hover:bg-zinc-700/50 transition-colors duration-500"
              >
                <div className="text-sm font-mono text-zinc-500 mb-8">
                  0{idx + 1}
                </div>
                <h3 className="text-2xl font-bold tracking-tight mb-4">
                  {principle.title}
                </h3>
                <p className="text-zinc-400 leading-relaxed">
                  {principle.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="relative">
        <div className="sticky top-0 bg-[#F8F9FA] py-8 px-6 md:px-12 lg:px-24 z-0 border-b border-black/5">
          <h2 className="text-xl font-semibold tracking-tight uppercase text-zinc-400 text-center">
            Core Disciplines
          </h2>
        </div>
        {services.map((service, index) => (
          <ServiceSection key={service.id} service={service} index={index} />
        ))}
      </section>

      {/* Footer */}
      <footer className="bg-zinc-900 text-white min-h-[60vh] flex flex-col justify-between py-12 px-6 md:px-12 lg:px-24 relative z-50">
        <div className="max-w-7xl mx-auto w-full flex-grow flex flex-col justify-center items-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="w-full"
          >
            <h2 className="text-[15vw] font-bold tracking-tighter leading-none text-white whitespace-nowrap overflow-hidden">
              CHERIYAN.
            </h2>
          </motion.div>
        </div>

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-8 items-end pt-12 border-t border-white/10 mt-12">
          <div className="text-zinc-500 text-sm">
            <p>Elevating enterprises.</p>
            <p>Dallas, TX — Worldwide.</p>
          </div>

          <div className="flex flex-col md:items-center gap-2">
            <span className="text-white font-semibold">Connect with us</span>
            <div className="flex gap-6">
              <a
                href="#"
                className="text-zinc-400 hover:text-white transition-colors duration-300"
              >
                LinkedIn
              </a>
              <a
                href="#"
                className="text-zinc-400 hover:text-white transition-colors duration-300"
              >
                Twitter
              </a>
            </div>
          </div>

          <div className="md:text-right text-zinc-600 text-sm">
            © {new Date().getFullYear()} Cheriyan Consulting.
            <br /> All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

