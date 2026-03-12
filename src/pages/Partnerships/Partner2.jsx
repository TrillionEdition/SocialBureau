/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  useSpring,
} from "framer-motion";
import { Plus, ArrowUpRight, Instagram, Linkedin, ArrowUp } from "lucide-react";

// --- Constants ---
const PROJECTS = [
  {
    id: "1",
    name: "Lumina Experience",
    category: "Digital Design",
    role: "Lead Designer",
    year: "2024",
    image:
      "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=1000",
  },
  {
    id: "2",
    name: "Nebula Brand",
    category: "Branding",
    role: "Creative Director",
    year: "2023",
    image:
      "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=1000",
  },
  {
    id: "3",
    name: "Aether Interface",
    category: "UI/UX",
    role: "Product Designer",
    year: "2024",
    image:
      "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&q=80&w=1000",
  },
  {
    id: "4",
    name: "Solstice Web",
    category: "Development",
    role: "Full Stack Dev",
    year: "2022",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1000",
  },
  {
    id: "5",
    name: "Vortex Motion",
    category: "Animation",
    role: "Motion Designer",
    year: "2023",
    image:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1000",
  },
  {
    id: "6",
    name: "Zenith App",
    category: "Mobile",
    role: "UX Researcher",
    year: "2021",
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=1000",
  },
  {
    id: "7",
    name: "Elysian Design",
    category: "Visual Arts",
    role: "Art Director",
    year: "2022",
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=1000",
  },
];

const INSPIRATIONS = [
  {
    category: "Typography",
    images: [
      "https://picsum.photos/seed/type1/600/800",
      "https://picsum.photos/seed/type2/600/800",
      "https://picsum.photos/seed/type3/600/800",
    ],
  },
  {
    category: "Motion & Interaction",
    images: [
      "https://picsum.photos/seed/motion1/600/800",
      "https://picsum.photos/seed/motion2/600/800",
      "https://picsum.photos/seed/motion3/600/800",
    ],
  },
  {
    category: "Minimalist Interface",
    images: [
      "https://picsum.photos/seed/ui1/600/800",
      "https://picsum.photos/seed/ui2/600/800",
      "https://picsum.photos/seed/ui3/600/800",
    ],
  },
];

// --- Components ---

const TextReveal = ({ children, className = "", delay = 0 }) => {
  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: "100%" }}
        whileInView={{ y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 1, delay, ease: [0.33, 1, 0.68, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
};

const ImageReveal = ({ src, alt, className = "" }) => {
  return (
    <div className={`overflow-hidden relative ${className}`}>
      <motion.img
        initial={{ scale: 1.3, y: "20%" }}
        whileInView={{ scale: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 1.8, ease: [0.33, 1, 0.68, 1] }}
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        referrerPolicy="no-referrer"
      />
    </div>
  );
};

const Hero = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const titleY = useTransform(scrollYProgress, [0, 0.4], [0, -300]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const imgScale = useTransform(scrollYProgress, [0, 0.9], [0.6, 1.5]);
  const imgRadius = useTransform(scrollYProgress, [0, 0.7], [40, 0]);
  const textOpacity = useTransform(scrollYProgress, [0.7, 0.9], [0, 1]);

  return (
    <section ref={containerRef} className="relative h-[400vh] bg-brand-bg">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-visible">
        {/* Background Title */}
        <motion.div
          style={{ y: titleY, opacity: titleOpacity }}
          className="absolute top-10 md:top-20 w-full flex justify-center pointer-events-none z-0 px-4"
        >
          <h1 className="text-[clamp(3rem,12vw,12rem)] font-serif leading-none tracking-tighter uppercase text-brand-ink text-center whitespace-normal md:whitespace-nowrap">
            Alex Rivera
          </h1>
        </motion.div>

        {/* Expanding Image */}
        <motion.div
          style={{
            scale: imgScale,
            borderRadius: imgRadius,
          }}
          className="relative h-[60vh] aspect-square overflow-hidden shadow-2xl z-10 origin-center"
        >
          <img
            src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=1200"
            alt="Alex Rivera"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </motion.div>

        {/* Floating Text */}
        <motion.div
          style={{ opacity: textOpacity }}
          className="absolute bottom-10 md:bottom-12 left-6 md:left-12 right-6 md:right-auto max-w-md z-30 drop-shadow-sm"
        >
          <TextReveal>
            <p className="text-lg md:text-xl font-serif italic leading-relaxed text-white text-center md:text-left drop-shadow-lg">
              Alex Rivera is a digital designer and creative developer crafting
              immersive experiences at the intersection of art and technology.
            </p>
          </TextReveal>
        </motion.div>
      </div>
    </section>
  );
};

const AgencySection = () => {
  return (
    <section className="relative py-32 md:py-64 px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32 items-center bg-brand-bg z-10">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 0.03 }}
        viewport={{ once: false }}
        transition={{ duration: 2.5, ease: "easeOut" }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[150vw] md:w-[120vw] h-[150vw] md:h-[120vw] border border-brand-ink rounded-full pointer-events-none"
      />

      <div className="relative z-10">
        <TextReveal className="mb-8 md:mb-16">
          <h2 className="text-6xl md:text-9xl text-brand-ink">The Studio</h2>
        </TextReveal>
        <div className="space-y-6 md:space-y-12 text-lg md:text-2xl leading-relaxed opacity-80 max-w-full md:max-w-xl text-brand-ink">
          <TextReveal delay={0.1}>
            <p>
              Based in New York, my studio focuses on building digital products
              that are as functional as they are beautiful. I believe in the
              power of minimalist design and clean code.
            </p>
          </TextReveal>
          <TextReveal delay={0.2}>
            <p>
              From branding to full-stack development, I help visionaries bring
              their ideas to life through a meticulous process of research,
              design, and execution.
            </p>
          </TextReveal>
        </div>
      </div>
      <ImageReveal
        src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1200"
        alt="Studio"
        className="aspect-[4/5] rounded-sm shadow-xl"
      />
    </section>
  );
};

const FeaturedProject = () => {
  return (
    <section className="bg-[#e8e4de] py-32 md:py-64 px-6 md:px-12 relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 items-start lg:items-end mb-16 md:mb-32">
        <div className="lg:col-span-5">
          <TextReveal>
            <h2 className="text-[clamp(2.5rem,10vw,8rem)] leading-none mb-8 md:mb-12 text-brand-ink">
              Lumina App
            </h2>
          </TextReveal>
          <div className="flex flex-wrap gap-4 md:gap-12 text-[10px] md:text-sm tracking-widest uppercase opacity-60 text-brand-ink">
            <TextReveal delay={0.1}>
              <span>[ MOBILE ]</span>
            </TextReveal>
            <TextReveal delay={0.2}>
              <span>[ PRODUCT DESIGN ]</span>
            </TextReveal>
            <TextReveal delay={0.3}>
              <span>[ 2024 ]</span>
            </TextReveal>
          </div>
        </div>
        <div className="lg:col-span-4">
          <TextReveal delay={0.4}>
            <p className="text-lg md:text-xl font-serif italic leading-relaxed text-brand-ink mt-8 lg:mt-0">
              LUMINA IS A REVOLUTIONARY APP THAT REDEFINES HOW WE INTERACT WITH
              LIGHT IN OUR DIGITAL SPACES.
            </p>
          </TextReveal>
        </div>
        <div className="lg:col-span-3 lg:flex lg:justify-end mt-12 lg:mt-0">
          <motion.button
            whileHover={{ scale: 1.05, x: 10 }}
            whileTap={{ scale: 0.95 }}
            className="group flex items-center gap-6 text-xs tracking-widest uppercase border border-brand-ink/20 px-10 py-5 rounded-full hover:bg-brand-ink hover:text-brand-bg transition-all duration-700 text-brand-ink"
          >
            View Case Study
            <ArrowUpRight className="w-5 h-5 group-hover:rotate-45 transition-transform duration-500" />
          </motion.button>
        </div>
      </div>

      <ImageReveal
        src="https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=2000"
        alt="Lumina App"
        className="aspect-video shadow-2xl"
      />
    </section>
  );
};

const ProjectList = () => {
  const [hoveredId, setHoveredId] = useState(null);
  const mouseX = useSpring(0, { damping: 30, stiffness: 200 });
  const mouseY = useSpring(0, { damping: 30, stiffness: 200 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="py-32 md:py-64 px-6 md:px-12 relative z-10 bg-brand-bg">
      <div className="border-t border-brand-ink/10">
        {PROJECTS.map((project, i) => (
          <motion.div
            key={project.id}
            onMouseEnter={() => setHoveredId(project.id)}
            onMouseLeave={() => setHoveredId(null)}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, delay: i * 0.1 }}
            className="group relative border-b border-brand-ink/10 py-8 md:py-12 grid grid-cols-4 md:grid-cols-12 items-center cursor-pointer transition-colors duration-700 hover:bg-brand-ink hover:text-brand-bg px-4 md:px-8 text-brand-ink"
          >
            <div className="col-span-3 md:col-span-5">
              <h3 className="text-2xl md:text-5xl font-serif transition-transform duration-500 group-hover:translate-x-4">
                {project.name}
              </h3>
            </div>
            <div className="hidden md:block col-span-2 text-sm tracking-widest opacity-60 group-hover:opacity-100">
              {project.category}
            </div>
            <div className="hidden md:block col-span-4 text-sm tracking-widest opacity-60 group-hover:opacity-100">
              {project.role}
            </div>
            <div className="col-span-1 flex justify-end">
              <ArrowUpRight className="w-6 h-6 md:w-8 md:h-8 opacity-40 md:opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-0 md:translate-x-8 group-hover:translate-x-0" />
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {hoveredId && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{
              opacity: 1,
              scale: 1,
              x: mouseX.get() + 40,
              y: mouseY.get() - 200,
            }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ type: "spring", damping: 30, stiffness: 250 }}
            className="fixed pointer-events-none z-[100] w-96 aspect-[4/3] overflow-hidden rounded-sm shadow-2xl"
          >
            <img
              src={PROJECTS.find((p) => p.id === hoveredId)?.image}
              alt="Preview"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-32 flex justify-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="group flex items-center gap-6 text-xs tracking-widest uppercase border border-brand-ink/20 px-16 py-6 rounded-full hover:bg-brand-ink hover:text-brand-bg transition-all duration-700 shadow-sm text-brand-ink"
        >
          All Projects
          <ArrowUpRight className="w-5 h-5 group-hover:rotate-45 transition-transform duration-500" />
        </motion.button>
      </div>
    </section>
  );
};

const VisionSection = () => {
  return (
    <section className="py-32 md:py-64 px-6 md:px-12 bg-white relative z-10">
      <div className="max-w-5xl mx-auto text-center mb-24 md:mb-48">
        <TextReveal>
          <h2 className="text-[clamp(2.5rem,10vw,8rem)] mb-8 md:mb-16 text-brand-ink">
            The Vision
          </h2>
        </TextReveal>
        <TextReveal delay={0.2}>
          <p className="text-lg md:text-3xl font-serif italic leading-relaxed opacity-80 text-brand-ink">
            I strive to create digital experiences that bridge the gap between
            human emotion and technological precision. My work is driven by a
            passion for clean aesthetics, meaningful interactions, and the
            relentless pursuit of excellence.
          </p>
        </TextReveal>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
        <ImageReveal
          src="https://picsum.photos/seed/vision1/800/1000"
          alt="Vision 1"
          className="aspect-[4/5] grayscale hover:grayscale-0 transition-all duration-1000 shadow-2xl"
        />
        <ImageReveal
          src="https://picsum.photos/seed/vision2/800/1000"
          alt="Vision 2"
          className="aspect-[4/5] grayscale hover:grayscale-0 transition-all duration-1000 shadow-2xl md:mt-48"
        />
      </div>
    </section>
  );
};

const InspirationSection = () => {
  return (
    <section className="py-32 md:py-64 px-6 md:px-12 relative z-10 bg-brand-bg">
      <TextReveal>
        <h2 className="text-[clamp(2.5rem,10vw,8rem)] mb-16 md:mb-32 text-brand-ink">
          Inspiration
        </h2>
      </TextReveal>

      {INSPIRATIONS.map((section, idx) => (
        <div key={idx} className="mb-24 md:mb-48 last:mb-0">
          <div className="flex justify-between items-end mb-8 md:mb-16 border-b border-brand-ink/10 pb-4 md:pb-8">
            <TextReveal>
              <h3 className="text-2xl md:text-4xl font-serif italic text-brand-ink">
                {section.category}
              </h3>
            </TextReveal>
            <TextReveal delay={0.1}>
              <span className="text-[10px] md:text-sm tracking-widest uppercase opacity-40 text-brand-ink">
                {section.images.length} IMAGES
              </span>
            </TextReveal>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 md:gap-10">
            <div className="col-span-2 flex flex-col justify-center pr-4 md:pr-16 text-brand-ink mb-8 md:mb-0">
              <TextReveal delay={0.2}>
                <p className="text-sm md:text-lg tracking-wide opacity-60 leading-relaxed font-serif italic">
                  A collection of things that inspire my creative process.
                </p>
              </TextReveal>
            </div>
            {section.images.map((img, i) => (
              <div key={i}>
                <ImageReveal
                  src={img}
                  alt={`Inspiration ${i}`}
                  className="aspect-[3/4] bg-brand-ink/5 group cursor-pointer shadow-lg hover:shadow-2xl transition-shadow duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
};

const CapabilitiesSection = () => {
  const capabilities = [
    {
      title: "Creative Direction",
      desc: "Setting the visual and strategic tone for high-end digital brands.",
    },
    {
      title: "Digital Strategy",
      desc: "Mapping out the roadmap for long-term digital growth and engagement.",
    },
    {
      title: "Product Design",
      desc: "Crafting intuitive interfaces that solve complex user problems.",
    },
    {
      title: "Technical Architecture",
      desc: "Building scalable, robust foundations for modern web applications.",
    },
  ];

  return (
    <section className="py-32 md:py-64 px-6 md:px-12 bg-white relative z-10 border-y border-brand-ink/5">
      <div className="max-w-7xl mx-auto">
        <TextReveal className="mb-12 md:mb-32">
          <h2 className="text-[clamp(2.2rem,10vw,10rem)] text-brand-ink uppercase leading-none break-words">
            Capabilities
          </h2>
        </TextReveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 md:gap-x-32 gap-y-12 md:gap-y-24">
          {capabilities.map((item, i) => (
            <div
              key={i}
              className="group border-t border-brand-ink/10 pt-8 md:pt-12 pb-12 md:pb-24"
            >
              <TextReveal delay={i * 0.1}>
                <h3 className="text-2xl md:text-4xl font-serif italic mb-4 md:mb-6 text-brand-ink">
                  {item.title}
                </h3>
              </TextReveal>
              <TextReveal delay={i * 0.1 + 0.1}>
                <p className="text-lg md:text-xl opacity-60 text-brand-ink max-w-full md:max-w-sm">
                  {item.desc}
                </p>
              </TextReveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ProcessSection = () => {
  const steps = [
    {
      num: "01",
      title: "Discovery",
      desc: "Initial research and deep dive into the project's soul and goals.",
    },
    {
      num: "02",
      title: "Concept",
      desc: "Visual exploration and defining the core design system.",
    },
    {
      num: "03",
      title: "Execution",
      desc: "Meticulous development and design implementation.",
    },
    {
      num: "04",
      title: "Launch",
      desc: "Refined details and deploying the final experience.",
    },
  ];

  return (
    <section className="py-32 md:py-64 px-6 md:px-12 bg-brand-bg relative z-10 overflow-visible">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-32">
        <div className="lg:col-span-4">
          <div className="md:sticky md:top-32 mb-16 md:mb-0">
            <TextReveal>
              <h2 className="text-5xl md:text-7xl text-brand-ink mb-6 md:mb-8">
                The Process
              </h2>
            </TextReveal>
            <TextReveal delay={0.1}>
              <p className="text-lg md:text-xl opacity-60 text-brand-ink">
                A structured yet flexible approach to bringing digital visions
                to life.
              </p>
            </TextReveal>
          </div>
        </div>
        <div className="lg:col-span-8 space-y-24 md:space-y-48">
          {steps.map((step, i) => (
            <div key={i} className="group relative">
              <div className="flex flex-col md:flex-row items-start gap-8 md:gap-12">
                <TextReveal>
                  <span className="text-4xl md:text-6xl font-serif italic opacity-20 text-brand-ink">
                    {step.num}
                  </span>
                </TextReveal>
                <div>
                  <TextReveal delay={0.1}>
                    <h3 className="text-4xl md:text-6xl text-brand-ink mb-6 md:mb-12 uppercase">
                      {step.title}
                    </h3>
                  </TextReveal>
                  <TextReveal delay={0.2}>
                    <p className="text-xl md:text-2xl leading-relaxed opacity-80 text-brand-ink max-w-full md:max-w-xl">
                      {step.desc}
                    </p>
                  </TextReveal>
                </div>
              </div>
              <ImageReveal
                src={`https://picsum.photos/seed/process${i}/800/600`}
                alt={step.title}
                className="mt-12 md:mt-16 aspect-video rounded-sm grayscale hover:grayscale-0 transition-all duration-700 shadow-xl"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ConnectSection = () => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center p-12 bg-brand-ink text-brand-bg relative z-10 overflow-hidden">
      <motion.div
        initial={{ scale: 2, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 0.1 }}
        viewport={{ once: false }}
        transition={{ duration: 3, ease: "easeOut" }}
        className="absolute inset-0 bg-gradient-to-tr from-brand-bg/20 to-transparent pointer-events-none"
      />

      <div className="relative z-10 text-center max-w-6xl px-6">
        <TextReveal>
          <h2 className="text-[clamp(2.5rem,12vw,12rem)] leading-none uppercase mb-8 md:mb-16 font-serif italic tracking-tighter">
            Let's create
          </h2>
        </TextReveal>
        <TextReveal delay={0.1}>
          <h2 className="text-[clamp(2rem,10vw,10rem)] leading-none uppercase mb-16 md:mb-24 opacity-80">
            something extraordinary
          </h2>
        </TextReveal>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="px-12 py-6 md:px-20 md:py-8 border border-brand-bg rounded-full text-lg md:text-xl uppercase tracking-widest hover:bg-brand-bg hover:text-brand-ink transition-all duration-700 mb-24 md:mb-32"
        >
          Book a Discovery Call
        </motion.button>

        <div className="flex flex-wrap justify-center gap-8 md:gap-16 text-[10px] md:text-sm tracking-[0.2em] uppercase opacity-60">
          <a href="#" className="hover:opacity-100 transition-opacity">
            Instagram
          </a>
          <a href="#" className="hover:opacity-100 transition-opacity">
            LinkedIn
          </a>
          <a href="#" className="hover:opacity-100 transition-opacity">
            Awwwards
          </a>
          <a href="#" className="hover:opacity-100 transition-opacity">
            Behance
          </a>
        </div>
      </div>

      <div className="absolute bottom-12 left-12 text-[10px] tracking-widest uppercase opacity-40">
        © 2024 Alex Rivera — All rights reserved
      </div>
    </section>
  );
};

const LoadingScreen = () => {
  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: "-100%" }}
      transition={{ duration: 1.2, delay: 2, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 bg-brand-ink z-[300] flex items-center justify-center"
    >
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.8 }}
        className="text-brand-bg text-4xl md:text-6xl font-serif uppercase tracking-widest text-center px-6"
      >
        Alex Rivera
      </motion.h2>
    </motion.div>
  );
};

const BackToTop = ({ visible }) => {
  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 md:bottom-12 right-6 md:right-12 z-[150] w-12 h-12 md:w-14 md:h-14 bg-brand-ink text-brand-bg rounded-full flex items-center justify-center shadow-2xl group border border-brand-bg/10"
        >
          <ArrowUp className="w-5 h-5 md:w-6 md:h-6 transition-transform duration-500 group-hover:-translate-y-1" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default function Partner2() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);

    const timer = setTimeout(() => setIsLoading(false), 3000);

    // Sticky fix: force parents to overflow visible
    const root = document.getElementById("root");
    const body = document.body;
    const html = document.documentElement;

    if (root) root.style.overflow = "visible";
    if (body) body.style.overflow = "visible";
    if (html) html.style.overflow = "visible";

    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 800);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
      if (root) root.style.overflow = "";
      if (body) body.style.overflow = "";
      if (html) html.style.overflow = "";
    };
  }, []);

  return (
    <div className="relative min-h-screen selection:bg-brand-ink selection:text-brand-bg bg-brand-bg">
      <AnimatePresence>{isLoading && <LoadingScreen />}</AnimatePresence>

      <main>
        <Hero />
        <AgencySection />
        <CapabilitiesSection />
        <FeaturedProject />
        <ProcessSection />
        <ProjectList />
        <VisionSection />
        <InspirationSection />
        <ConnectSection />
      </main>

      {/* Custom Cursor */}
      <motion.div
        className="fixed top-0 left-0 w-12 h-12 border border-brand-ink rounded-full pointer-events-none z-[200] hidden md:flex items-center justify-center mix-blend-difference"
        animate={{
          x: mousePos.x - 24,
          y: mousePos.y - 24,
        }}
        transition={{ type: "spring", damping: 35, stiffness: 450, mass: 0.5 }}
      >
        <motion.div
          className="w-1.5 h-1.5 bg-brand-ink rounded-full"
          animate={{ scale: [1, 1.8, 1] }}
          transition={{ repeat: Infinity, duration: 2.5 }}
        />
      </motion.div>

      <BackToTop visible={showBackToTop} />
    </div>
  );
}
