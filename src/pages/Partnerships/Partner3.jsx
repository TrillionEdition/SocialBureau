import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  useSpring,
  useInView,
} from "framer-motion";
import {
  ArrowUpRight,
  Github,
  Twitter,
  Linkedin,
  ArrowRight,
  Monitor,
  Smartphone,
  Layers,
  Zap,
  ArrowUp,
} from "lucide-react";

// --- Constants ---
const PROJECTS = [
  {
    title: "Aetherial",
    category: "Immersive Web",
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200",
    color: "#7000ff",
  },
  {
    title: "Vortex",
    category: "Digital Identity",
    image:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=1200",
    color: "#00f2ff",
  },
  {
    title: "Nebula",
    category: "Creative Dev",
    image:
      "https://images.unsplash.com/photo-1635776062127-d379bfcba9f8?auto=format&fit=crop&q=80&w=1200",
    color: "#ff007a",
  },
  {
    title: "Synth",
    category: "UX / UI",
    image:
      "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=1200",
    color: "#00ff8c",
  },
];

const SERVICES = [
  {
    title: "Interaction Design",
    icon: <Zap className="w-6 h-6" />,
    desc: "Creating fluid, human-centric interfaces that react to every touch and movement.",
  },
  {
    title: "Creative Tech",
    icon: <Monitor className="w-6 h-6" />,
    desc: "Bridging the gap between ambitious design concepts and cutting-edge web technology.",
  },
  {
    title: "Mobile First",
    icon: <Smartphone className="w-6 h-6" />,
    desc: "Ensuring high-end experiences translate perfectly across all handheld devices.",
  },
  {
    title: "Brand Motion",
    icon: <Layers className="w-6 h-6" />,
    desc: "Bringing static identities to life through purposeful, cinematic animation.",
  },
];

const RECOGNITION = [
  { year: "2024", award: "Site of the Year", platform: "Awwwards" },
  { year: "2023", award: "Best Portfolio", platform: "FWA" },
  { year: "2023", award: "Mobile Excellence", platform: "Awwwards" },
  { year: "2022", award: "Red Dot Award", platform: "Red Dot" },
];

const TESTIMONIALS = [
  {
    quote:
      "Elena doesn't just design websites; she crafts digital symphonies. Every interaction feels calculated yet effortless.",
    author: "Marc Andre",
    role: "CEO at V-Studio",
  },
  {
    quote:
      "The best creative technologist I've worked with. She bridges the gap between impossible design and high performance.",
    author: "Sarah Chen",
    role: "Design Lead at Meta",
  },
];

const ARTICLES = [
  {
    date: "MAR 2024",
    title: "The Future of Post-Minimalism",
    readTime: "5 MIN READ",
  },
  {
    date: "JAN 2024",
    title: "Why Motion is the New UX",
    readTime: "8 MIN READ",
  },
  {
    date: "DEC 2023",
    title: "WebGPU and Cinematic Web",
    readTime: "12 MIN READ",
  },
];

// --- Utility Components ---

const MagneticWrapper = ({ children, strength = 0.5 }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  const handleMouseMove = (e) => {
    if (isMobile) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) * strength;
    const y = (clientY - (top + height / 2)) * strength;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {children}
    </motion.div>
  );
};

const TextReveal = ({ children, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.5 });

  return (
    <div ref={ref} className="overflow-hidden relative">
      <motion.div
        initial={{ y: "100%" }}
        animate={isInView ? { y: 0 } : { y: "100%" }}
        transition={{ duration: 0.8, delay, ease: [0.33, 1, 0.68, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
};

// --- Sections ---

const CustomCursor = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const cursorX = useSpring(mousePos.x, { stiffness: 500, damping: 28 });
  const cursorY = useSpring(mousePos.y, { stiffness: 500, damping: 28 });

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full bg-white mix-blend-difference pointer-events-none z-[9999] hidden md:block"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
      <motion.div
        className="fixed top-0 left-0 w-40 h-40 rounded-full border border-white/20 pointer-events-none z-[9998] hidden md:block"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      />
    </>
  );
};

const Hero = () => {
  return (
    <section className="relative h-screen flex flex-col items-center justify-center bg-[#050505] text-white overflow-hidden px-6">
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-50 contrast-150 brightness-100" />
      </div>

      <div className="relative z-10 text-center w-full">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-cyan-400 text-[10px] md:text-sm tracking-[0.4em] uppercase mb-6 md:mb-8 block font-medium"
        >
          Creative Technologist
        </motion.span>

        <div className="flex flex-col gap-0 items-center">
          <MagneticWrapper strength={0.2}>
            <h1 className="text-[clamp(3.5rem,15vw,18rem)] font-black leading-[0.85] tracking-tighter uppercase italic select-none break-words">
              Elena
            </h1>
          </MagneticWrapper>
          <MagneticWrapper strength={0.3}>
            <h1 className="text-[clamp(3.5rem,15vw,18rem)] font-black leading-[0.85] tracking-tighter uppercase select-none outline-text text-transparent break-words">
              Cross
            </h1>
          </MagneticWrapper>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-8 md:mt-12 max-w-lg mx-auto px-4"
        >
          <p className="text-gray-400 text-base md:text-xl leading-relaxed font-light">
            Architecting digital dreams into cinematic realities through
            minimalist design and sophisticated interaction code.
          </p>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 opacity-30"
      >
        <div className="w-px h-24 bg-gradient-to-b from-white to-transparent" />
      </motion.div>
    </section>
  );
};

const About = () => {
  return (
    <section className="py-24 md:py-64 bg-[#050505] text-white px-6 md:px-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
        <div className="relative aspect-[3/4] rounded-2xl overflow-hidden group">
          <motion.img
            initial={{ scale: 1.2 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 1.5 }}
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=1000"
            alt="Elena Cross"
            className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 transition-all duration-1000"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent opacity-60" />
        </div>

        <div className="space-y-8 md:space-y-12">
          <TextReveal>
            <h2 className="text-4xl md:text-7xl font-bold tracking-tight">
              The Ethos
            </h2>
          </TextReveal>
          <div className="space-y-6 md:space-y-8 text-lg md:text-2xl text-gray-400 leading-relaxed font-light">
            <TextReveal delay={0.1}>
              <p>
                I believe that every pixel should have a soul. My work is not
                just about visuals; it's about the rhythm of interaction and the
                story told through motion.
              </p>
            </TextReveal>
            <TextReveal delay={0.2}>
              <p>
                As an award-winning independent designer, I've spent the last
                decade partnering with visionaries to redefine the boundaries of
                what is possible on the web.
              </p>
            </TextReveal>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group flex items-center gap-4 text-white font-medium text-base md:text-lg pt-4 md:pt-8"
            >
              Learn more about my process
              <span className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
              </span>
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
};

const HorizontalProjects = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-95%"]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (isMobile) {
    return (
      <section className="py-24 bg-white px-6">
        <h2 className="text-[clamp(3rem,14vw,6xl)] font-black text-black uppercase tracking-tighter leading-none mb-16">
          Selected <br /> <span className="text-gray-300">Works</span>
        </h2>
        <div className="space-y-8">
          {PROJECTS.map((project, i) => (
            <div
              key={i}
              className="relative aspect-[4/5] bg-gray-100 rounded-2xl overflow-hidden shadow-xl"
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-8">
                <span className="text-cyan-400 text-[10px] tracking-widest uppercase mb-2 block">
                  {project.category}
                </span>
                <h3 className="text-3xl font-bold text-white uppercase tracking-tighter">
                  {project.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-white">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-20 px-24">
          <div className="flex flex-col justify-center min-w-[50vw]">
            <h2 className="text-9xl font-black text-black uppercase tracking-tighter leading-none">
              Selected <br /> <span className="text-gray-300">Works</span>
            </h2>
          </div>
          {PROJECTS.map((project, i) => (
            <motion.div
              key={i}
              className="relative min-w-[35vw] aspect-[4/5] bg-gray-100 rounded-3xl overflow-hidden group shadow-2xl"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.5 }}
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-12">
                <motion.span className="text-cyan-400 text-xs tracking-widest uppercase mb-4 block">
                  {project.category}
                </motion.span>
                <motion.h3 className="text-5xl font-bold text-white uppercase tracking-tighter">
                  {project.title}
                </motion.h3>
                <ArrowUpRight className="absolute top-12 right-12 text-white w-12 h-12" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const Services = () => {
  return (
    <section className="py-24 md:py-64 bg-[#050505] text-white px-6 md:px-24">
      <div className="max-w-7xl mx-auto">
        <TextReveal>
          <h2 className="text-5xl md:text-9xl font-black uppercase tracking-tighter mb-16 md:mb-32 text-center">
            Capabilities
          </h2>
        </TextReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {SERVICES.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: false }}
              className="p-8 md:p-10 rounded-2xl md:rounded-3xl border border-white/5 bg-white/5 backdrop-blur-sm group hover:bg-white hover:text-black transition-all duration-700 cursor-default"
            >
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-white/10 flex items-center justify-center mb-6 md:mb-8 group-hover:bg-black group-hover:text-white transition-colors">
                {React.cloneElement(service.icon, {
                  className: "w-5 h-5 md:w-6 md:h-6",
                })}
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">
                {service.title}
              </h3>
              <p className="text-gray-400 group-hover:text-black/60 leading-relaxed font-light text-sm md:text-base">
                {service.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const RecognitionSection = () => {
  return (
    <section className="py-24 md:py-64 bg-white text-black px-6 md:px-24 border-y border-black/5">
      <div className="max-w-7xl mx-auto">
        <TextReveal>
          <h2 className="text-[10px] md:text-sm tracking-[0.4em] uppercase mb-12 md:mb-16 opacity-40 font-medium text-center md:text-left">
            Recognition
          </h2>
        </TextReveal>

        <div className="border-t border-black/10">
          {RECOGNITION.map((item, i) => (
            <motion.div
              key={i}
              className="flex flex-col md:flex-row md:items-center justify-between py-8 md:py-12 border-b border-black/10 group cursor-pointer"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false }}
            >
              <div className="flex items-center gap-6 md:gap-24 mb-4 md:mb-0">
                <span className="text-base md:text-xl opacity-30 group-hover:opacity-100 transition-opacity font-serif italic min-w-[3rem] md:min-w-0">
                  {item.year}
                </span>
                <h3 className="text-xl md:text-5xl font-black uppercase tracking-tighter group-hover:translate-x-4 transition-transform duration-500 leading-none">
                  {item.award}
                </h3>
              </div>
              <span className="text-xs md:text-lg opacity-40 group-hover:text-cyan-500 transition-colors uppercase tracking-widest text-right md:text-left">
                {item.platform}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const TestimonialsSection = () => {
  return (
    <section className="py-24 md:py-64 bg-[#050505] text-white px-6 md:px-24 overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-16 md:space-y-32">
        {TESTIMONIALS.map((item, i) => (
          <div
            key={i}
            className={`flex flex-col ${i % 2 === 0 ? "items-start text-left" : "items-end text-right"}`}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="max-w-4xl"
            >
              <h3 className="text-xl md:text-5xl font-serif italic font-light leading-snug md:leading-tight mb-6 md:mb-8">
                "{item.quote}"
              </h3>
              <div
                className={`flex flex-col ${i % 2 === 0 ? "items-start" : "items-end"}`}
              >
                <span className="text-base md:text-xl font-bold uppercase tracking-widest mb-1">
                  {item.author}
                </span>
                <span className="text-cyan-400 text-sm md:text-base opacity-60 italic">
                  {item.role}
                </span>
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
};

const JournalSection = () => {
  return (
    <section className="py-24 md:py-64 bg-white text-black px-6 md:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center md:items-end justify-between mb-16 md:mb-24 gap-8">
          <TextReveal>
            <h2 className="text-[clamp(2.5rem,15vw,9xl)] font-black uppercase tracking-tighter leading-none text-center md:text-left">
              Insights & <br /> <span className="text-gray-300">Notes</span>
            </h2>
          </TextReveal>
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="w-24 h-24 md:w-32 md:h-32 rounded-full border border-black/10 flex items-center justify-center text-[10px] tracking-widest uppercase cursor-pointer hover:bg-black hover:text-white transition-all shrink-0"
          >
            View all
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {ARTICLES.map((article, i) => (
            <motion.div
              key={i}
              className="group cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: false }}
            >
              <div className="relative aspect-square bg-[#f5f5f5] rounded-3xl mb-6 md:mb-8 overflow-hidden">
                <div className="absolute inset-0 bg-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="absolute inset-0 flex items-center justify-center text-6xl md:text-8xl font-black opacity-[0.03] group-hover:opacity-20 transition-opacity">
                  0{i + 1}
                </div>
                <div className="absolute top-6 right-6 md:top-8 md:right-8 w-10 h-10 md:w-12 md:h-12 rounded-full border border-black/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all group-hover:rotate-45">
                  <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5" />
                </div>
              </div>
              <span className="text-[10px] tracking-[0.3em] uppercase opacity-40 mb-3 md:mb-4 block font-medium">
                {article.date} — {article.readTime}
              </span>
              <h3 className="text-lg md:text-xl font-bold group-hover:text-cyan-600 transition-colors uppercase leading-tight tracking-tight">
                {article.title}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <footer className="relative py-24 md:py-64 bg-[#050505] text-white px-6 md:px-24 overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="w-[200vw] h-[200vw] md:w-[150vw] md:h-[150vw] border-[1px] border-white/5 rounded-full"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center text-center">
        <TextReveal>
          <h2 className="text-[clamp(2.5rem,15vw,12rem)] font-black uppercase tracking-tighter leading-[0.9] md:leading-none mb-12 md:mb-16">
            Let's build <br />{" "}
            <span className="outline-text text-transparent">together</span>
          </h2>
        </TextReveal>

        <MagneticWrapper strength={0.4}>
          <button className="px-10 py-6 md:px-16 md:py-8 rounded-full border border-white text-lg md:text-2xl font-medium hover:bg-white hover:text-black transition-all duration-500 mb-16 md:mb-24">
            Start a project
          </button>
        </MagneticWrapper>

        <div className="flex flex-wrap justify-center gap-6 md:gap-12 text-[10px] md:text-sm tracking-widest uppercase opacity-40 mb-12 md:mb-0">
          <a
            href="#"
            className="hover:opacity-100 transition-opacity whitespace-nowrap"
          >
            Instagram
          </a>
          <a
            href="#"
            className="hover:opacity-100 transition-opacity whitespace-nowrap"
          >
            LinkedIn
          </a>
          <a
            href="#"
            className="hover:opacity-100 transition-opacity whitespace-nowrap"
          >
            Twitter
          </a>
          <a
            href="#"
            className="hover:opacity-100 transition-opacity whitespace-nowrap"
          >
            Awwwards
          </a>
        </div>

        <p className="mt-12 md:mt-24 text-[9px] md:text-[10px] tracking-widest uppercase opacity-20">
          © {new Date().getFullYear()} Elena Cross Portfolio — All rights
          reserved
        </p>
      </div>

      <style jsx>{`
        .outline-text {
          -webkit-text-stroke: 1px white;
        }
      `}</style>
    </footer>
  );
};

const LoadingScreen = () => {
  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: "-100%" }}
      transition={{ duration: 1.5, delay: 2.5, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 bg-[#050505] z-[99999] flex flex-col items-center justify-center text-white"
    >
      <div className="overflow-hidden mb-4">
        <motion.h2
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-100%" }}
          className="text-4xl md:text-6xl font-black italic tracking-tighter"
        >
          ELENA CROSS
        </motion.h2>
      </div>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: 200 }}
        className="h-[1px] bg-cyan-400"
      />
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
          className="fixed bottom-6 md:bottom-12 right-6 md:right-12 z-[150] w-12 h-12 md:w-14 md:h-14 bg-white text-black rounded-full flex items-center justify-center shadow-2xl group border border-white/10"
        >
          <ArrowUp className="w-5 h-5 md:w-6 md:h-6 transition-transform duration-500 group-hover:-translate-y-1" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default function Partner3() {
  const [isLoading, setIsLoading] = useState(true);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 3000);

    // Smooth scroll support
    const root = document.getElementById("root");
    if (root) root.style.overflow = "visible";
    document.body.style.overflow = "visible";
    document.documentElement.style.overflow = "visible";

    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 800);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#050505] selection:bg-cyan-400 selection:text-black">
      <AnimatePresence>{isLoading && <LoadingScreen />}</AnimatePresence>

      <CustomCursor />

      <main>
        <Hero />
        <About />
        <HorizontalProjects />
        <Services />
        <RecognitionSection />
        <TestimonialsSection />
        <JournalSection />
        <Contact />
      </main>

      <BackToTop visible={showBackToTop} />
    </div>
  );
}

