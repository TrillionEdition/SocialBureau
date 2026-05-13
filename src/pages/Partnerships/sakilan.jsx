import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  useInView,
} from "framer-motion";
import {
  ChevronUp,
  ArrowRight,
  Linkedin,
  Twitter,
  Youtube,
  Instagram,
  Award,
  Users,
  Globe,
  Zap,
} from "lucide-react";
import { Routes, Route, Link, useLocation } from "react-router-dom";

// --- Utility Components ---

const TextReveal = ({ children, className = "", delay = 0 }) => {
  const words = typeof children === "string" ? children.split(" ") : [];

  return (
    <div className={`flex flex-wrap ${className}`}>
      {words.map((word, i) => (
        <div key={i} className="overflow-hidden mr-[0.2em] py-[0.1em]">
          <motion.span
            initial={{ y: "100%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 1,
              delay: delay + i * 0.03,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="inline-block pr-[0.1em]"
          >
            {word}
          </motion.span>
        </div>
      ))}
    </div>
  );
};

const MagneticButton = ({ children, className = "" }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const ref = useRef(null);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) * 0.3;
    const y = (clientY - (top + height / 2)) * 0.3;
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
      className={className}
    >
      {children}
    </motion.div>
  );
};

// --- Sections ---

const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 400]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);
  const scale = useTransform(scrollY, [0, 1000], [1, 1.1]);

  return (
    <section className="relative h-[80vh] md:h-[120vh] w-full overflow-hidden flex items-center justify-center bg-black pt-20">
      <motion.div
        style={{ y, scale, opacity }}
        className="absolute inset-0 z-0 flex items-center justify-center px-6 md:px-24 lg:px-48"
      >
        <div className="relative w-full h-full max-w-4xl mx-auto flex items-center justify-center">
          <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent -translate-x-12 hidden md:block" />
          <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent translate-x-12 hidden md:block" />

          <img
            src="https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/Sakhilan_sir_usbgfx.jpg"
            alt="Sakilan Padmanabhan"
            className="w-full h-full object-contain opacity-70 grayscale hover:grayscale-0 transition-all duration-1000"
            referrerPolicy="no-referrer"
          />
        </div>
      </motion.div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 text-center">
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-[10px] uppercase tracking-[0.5em] font-bold text-white/40 mb-4 md:mb-8"
          >
            Managing Director & Chairman
          </motion.div>
          <h1 className="font-display text-5xl md:text-7xl lg:text-[12vw] font-bold leading-[0.8] tracking-tighter text-white">
            <div className="overflow-hidden">
              <motion.span
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{
                  duration: 1.5,
                  delay: 0.2,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="inline-block"
              >
                Sakilan
              </motion.span>
            </div>
            <div className="overflow-hidden">
              <motion.span
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{
                  duration: 1.5,
                  delay: 0.4,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="inline-block italic font-serif font-light opacity-80"
              >
                Padmanabhan
              </motion.span>
            </div>
          </h1>
        </div>
      </div>
    </section>
  );
};

const Statement = () => {
  return (
    <section className="py-12 md:py-32 px-6 md:px-12 bg-black">
      <div className="max-w-5xl mx-auto">
        <TextReveal className="font-display text-3xl md:text-6xl font-medium leading-[1.1] tracking-tight text-white">
          Sakilan Padmanabhan leads multiple ventures including TCCL — the team
          behind News Tamil 24x7 — and MUA Technologies. Known for strategic
          leadership and media innovation, he builds products that connect with
          audiences across Tamil Nadu and beyond.
        </TextReveal>
      </div>
    </section>
  );
};

const Feature = ({ id, title, description, image, index, path = "#" }) => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-20%" });

  return (
    <section
      id={id}
      ref={containerRef}
      className="py-12 md:py-32 px-6 md:px-12 border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
        <div
          className={`lg:col-span-5 ${index % 2 === 0 ? "lg:order-1" : "lg:order-2"}`}
        >
          <div className="space-y-6 md:space-y-8">
            <motion.span
              animate={
                isInView ? { opacity: 0.4, x: 0 } : { opacity: 0, x: -20 }
              }
              transition={{ duration: 0.8 }}
              className="text-xs font-bold uppercase tracking-[0.4em] text-white/40 block"
            >
              0{index + 1} // Venture
            </motion.span>

            <TextReveal className="font-display text-4xl md:text-7xl font-bold leading-none text-white">
              {title}
            </TextReveal>

            <motion.p
              animate={
                isInView ? { opacity: 0.6, y: 0 } : { opacity: 0, y: 20 }
              }
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg md:text-xl text-white/60 leading-relaxed max-w-md"
            >
              {description}
            </motion.p>
          </div>
        </div>

        <div
          className={`lg:col-span-7 ${index % 2 === 0 ? "lg:order-2" : "lg:order-1"}`}
        >
          <motion.div
            animate={
              isInView
                ? { opacity: 1, scale: 1, rotate: 0 }
                : { opacity: 0, scale: 0.8, rotate: index % 2 === 0 ? 2 : -2 }
            }
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="aspect-[16/10] rounded-sm overflow-hidden bg-black flex items-center justify-center border border-white/5"
          >
            <motion.img
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              src={image}
              alt={title}
              className="w-full h-full object-contain opacity-90 grayscale hover:grayscale-0 transition-all duration-1000"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const AudienceImpact = () => {
  const stats = [
    { label: "Daily Viewership", value: "25M+", icon: Users },
    { label: "Global Reach", value: "120+", icon: Globe },
    { label: "Content Hours", value: "24/7", icon: Zap },
    { label: "Awards Won", value: "15+", icon: Award },
  ];

  return (
    <section className="py-12 md:py-32 px-6 md:px-12 bg-black border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-12">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              className="p-6 md:p-12 border border-white/5 bg-zinc-900/20 rounded-sm hover:bg-zinc-900/40 transition-colors"
            >
              <stat.icon className="text-white/20 mb-4 md:mb-8" size={32} />
              <div className="text-3xl md:text-5xl font-display font-bold text-white mb-2">
                {stat.value}
              </div>
              <div className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/40">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Philosophy = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-200, 200]);

  return (
    <section
      ref={containerRef}
      className="relative h-[60vh] md:h-[80vh] overflow-hidden flex items-center justify-center bg-zinc-900"
    >
      <motion.div
        style={{ y }}
        className="absolute inset-0 opacity-20 pointer-events-none"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black z-10" />
        <h2 className="text-[30vw] font-display font-bold text-white/10 uppercase leading-none whitespace-nowrap">
          Vision Innovation Impact
        </h2>
      </motion.div>

      <div className="relative z-20 max-w-4xl px-6 text-center">
        <TextReveal className="font-display text-3xl md:text-7xl font-bold leading-tight italic text-white">
          "The future belongs to those who innovate the ways we connect and
          converse."
        </TextReveal>
      </div>
    </section>
  );
};

const Timeline = () => {
  const items = [
    {
      year: "2010",
      title: "The Beginning",
      desc: "First steps into media consultancy and strategic leadership.",
    },
    {
      year: "2015",
      title: "Media Expansion",
      desc: "Launching core broadcasting initiatives across South India.",
    },
    {
      year: "2019",
      title: "News Tamil 24x7",
      desc: "Redefining news broadcasting for the Tamil audience.",
    },
    {
      year: "2023",
      title: "Digital Frontier",
      desc: "Establishing MUA Technologies for global software impact.",
    },
  ];

  return (
    <section className="py-12 md:py-32 px-6 md:px-12 bg-black overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="text-xs font-bold uppercase tracking-[0.4em] text-white/40 mb-12 md:mb-24"
        >
          Journey & Milestones
        </motion.div>

        <div className="space-y-16 md:space-y-32">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col md:flex-row gap-6 md:gap-24 items-start"
            >
              <div className="font-display text-5xl md:text-9xl font-bold text-white/10 leading-none">
                {item.year}
              </div>
              <div className="max-w-xl self-center">
                <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-4">
                  {item.title}
                </h3>
                <p className="text-base md:text-lg text-white/50 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-black pt-16 md:pt-48 pb-12 px-6 md:px-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-24 mb-12 md:mb-48">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-display text-6xl md:text-[8vw] font-bold tracking-tighter leading-none mb-12 text-white"
            >
              Sakilan.P
            </motion.h2>
            <div className="flex gap-6">
              {[Linkedin, Twitter, Youtube, Instagram].map((Icon, i) => (
                <MagneticButton key={i}>
                  <a
                    href="#"
                    className="p-4 border border-white/10 rounded-full hover:bg-white hover:text-black transition-all block text-white"
                  >
                    <Icon size={20} />
                  </a>
                </MagneticButton>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-12">
            <div className="space-y-8">
              <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/40">
                Entities
              </h4>
              <nav className="flex flex-col gap-4 text-2xl font-medium">
                {[
                  { name: "TCCL", id: "tccl" },
                  {
                    name: "News Tamil 24x7",
                    id: "news-tamil",
                  },
                  {
                    name: "News Malayalam 24x7",
                    id: "news-malayalam",
                  },
                  {
                    name: "MUA Technologies",
                    id: "mua-tech",
                  },
                ].map((item, i) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <a
                      href={`#${item.id}`}
                      className="hover:italic transition-all text-white cursor-pointer block"
                    >
                      {item.name}
                    </a>
                  </motion.div>
                ))}
              </nav>
            </div>
            <div className="space-y-8">
              <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/40">
                Contact
              </h4>
              <div className="space-y-4 text-lg text-white/60">
                <p className="hover:text-white transition-colors cursor-pointer">
                  contact@sakilan.p
                </p>
                <p className="pt-8 text-sm opacity-40">Chennai, India</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-white/5 text-[10px] uppercase tracking-widest font-bold text-white/20">
          <p>© 2026 Sakilan Padmanabhan. All Rights Reserved.</p>
          <div className="flex gap-12 mt-8 md:mt-0">
            {["Privacy", "Terms", "Cookies"].map((item) => (
              <a
                key={item}
                href="#"
                className="hover:text-white transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed bottom-12 right-12 z-[999]"
        >
          <MagneticButton>
            <button
              onClick={scrollToTop}
              className="p-4 bg-white text-black rounded-full shadow-2xl hover:scale-110 transition-transform active:scale-95 flex items-center justify-center group"
              aria-label="Back to Top"
            >
              <ChevronUp
                className="group-hover:-translate-y-1 transition-transform"
                size={20}
              />
            </button>
          </MagneticButton>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// --- Main Sakilan Component ---

export default function Sakilan() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
      {/* Subtle Noise Texture */}
      <div className="fixed inset-0 pointer-events-none z-[9999] opacity-[0.03] mix-blend-overlay">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat" />
      </div>

      <main>
        <Hero />
        <Statement />
        <Feature
          id="tccl"
          index={0}
          title="TCCL"
          description="A prominent network delivering quality content and broadcasting excellence, connecting with millions through innovative media solutions."
          image="https://play-lh.googleusercontent.com/-UftA-MmReu9hoMSHCIOH5Lwog0Gu49Hf8Y2p5-YzohwE7aLrWTdP425L-jlloOBxgk"
        />
        <Feature
          id="news-tamil"
          index={1}
          title="News Tamil 24x7"
          description="A leading voice in Tamil journalism, providing deep insights and breaking news to audiences across the state and the diaspora."
          image="https://play-lh.googleusercontent.com/jJzvw46BAAcWl2OGHiegCKrhKKOpHRlhdcrDdeoDth9-8-ph3r2oTVDtF9w99o6_-dO5=w600-h300-pc0xffffff-pd"
        />
        <AudienceImpact />
        <Feature
          id="news-malayalam"
          index={2}
          title="News Malayalam 24x7"
          description="Extending the reach of credible news to Malayalam-speaking audiences with a focus on trust and technological excellence."
          image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2Vck-drp0CpnTAAc5gMfrN8Ar1zx7OpPTKA&s"
        />
        <Philosophy />
        <Timeline />
        <Feature
          id="mua-tech"
          index={3}
          title="MUA Technologies"
          description="Building the future of digital solutions, MUA Technologies focuses on strategic innovation and connecting products with the global market."
          image="https://media.licdn.com/dms/image/v2/D5622AQFaKGbmlDjpUQ/feedshare-shrink_800/feedshare-shrink_800/0/1716978534465?e=2147483647&v=beta&t=5w-niTNAJ4t13HVpayhv1PgOaenuKUZepSJSnkUHDXg"
        />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}

