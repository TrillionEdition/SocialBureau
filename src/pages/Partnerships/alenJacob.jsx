import React, { useEffect, useState, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
} from "framer-motion";

// --- Utility Components ---

const RevealText = ({ children, className = "", delay = 0 }) => {
  return (
    <motion.div
      className={className}
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: false, amount: 0 }}
      transition={{
        duration: 0.8,
        delay: delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
};

const Magnetic = ({ children, strength = 0.5 }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const deltaX = (clientX - centerX) * strength;
    const deltaY = (clientY - centerY) * strength;
    x.set(deltaX);
    y.set(deltaY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  const quickX = useSpring(x, springConfig);
  const quickY = useSpring(y, springConfig);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: quickX, y: quickY }}
    >
      {children}
    </motion.div>
  );
};

const VENTURES = [
  {
    title: "Trillion Edition",
    category: "Luxury Assets & Strategy",
    color: "emerald",
    accent: "#10b981",
    description:
      "Architecting exclusive business frameworks for elite ventures.",
    image:
      "https://images.unsplash.com/photo-1507679799987-c7377f0c8488?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "Social Bureau",
    category: "Data-Driven Marketing",
    color: "indigo",
    accent: "#6366f1",
    description:
      "Kerala's first API-based advertising and social strategy agency.",
    image:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "Business Bureau",
    category: "Corporate Systems",
    color: "blue",
    accent: "#3b82f6",
    description:
      "Bridging architectural visions with corporate strategy and systems.",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "VentureX",
    category: "Equity & Growth",
    color: "amber",
    accent: "#f59e0b",
    description: "Accelerating disruptive startups through strategic capital.",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800",
  },
];

const RECOGNITION = [
  {
    company: "Forbes Insight",
    year: "2023",
    title: "Visionary Business Systems Architect",
  },
  {
    company: "Business World",
    year: "2022",
    title: "Top 40 Under 40 Business Leaders",
  },
  {
    company: "Digital Global",
    year: "2024",
    title: "Innovation Excellence Award",
  },
  {
    company: "The Hindu",
    year: "2021",
    title: "Expanding Strategic Horizons in India",
  },
];

const CornerBracket = ({ className = "" }) => (
  <div className={`absolute pointer-events-none ${className}`}>
    <div className="absolute -top-1 -left-1 w-4 h-4 border-t border-l border-black/40" />
    <div className="absolute -top-1 -right-1 w-4 h-4 border-t border-r border-black/40" />
    <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b border-l border-black/40" />
    <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b border-r border-black/40" />
  </div>
);

const ArrowUp = ({ size = 18, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="m5 12 7-7 7 7" />
    <path d="M12 19V5" />
  </svg>
);

const RecognitionSection = () => {
  return (
    <section className="py-12 md:py-32 px-[5%] bg-purple-50/30 border-t border-purple-100 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:grid md:grid-cols-12 gap-12 md:gap-20">
        <div className="md:col-span-4">
          <RevealText className="text-[10px] font-bold uppercase tracking-[0.4em] text-purple-400 mb-8 block">
            03 Recognition
          </RevealText>
          <h2 className="text-5xl md:text-7xl font-black font-condensed tracking-tighter text-black uppercase leading-[0.9]">
            WORLD <br />
            <span className="text-purple-300">VIEWS.</span>
          </h2>
        </div>

        <div className="md:col-span-8">
          <div className="divide-y divide-purple-100 border-y border-purple-100">
            {RECOGNITION.map((r, i) => (
              <div
                key={i}
                className="group py-8 md:py-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 transition-all hover:bg-white hover:px-8"
              >
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-purple-500">
                    {r.company} — {r.year}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-black font-condensed uppercase transition-colors group-hover:text-purple-600">
                    {r.title}
                  </h3>
                </div>
                <div className="w-12 h-12 rounded-full border border-purple-200 flex items-center justify-center transition-all group-hover:bg-purple-600 group-hover:text-white group-hover:rotate-45">
                  <ArrowUp size={16} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      className={`fixed bottom-6 right-6 md:bottom-12 md:right-12 z-[1000] transition-all duration-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"}`}
    >
      <Magnetic strength={0.3}>
        <button
          onClick={scrollToTop}
          className="w-12 h-12 md:w-14 md:h-14 bg-black border border-white/10 text-white flex items-center justify-center group relative overflow-hidden transition-colors hover:border-white/20"
        >
          <CornerBracket className="top-1 left-1 w-4 h-4 opacity-40 group-hover:opacity-100 transition-opacity" />
          <ArrowUp
            size={18}
            className="relative z-10 transition-transform group-hover:-translate-y-1"
          />
          <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>
      </Magnetic>
    </div>
  );
};

// --- Utility Components ---

const Hero = () => {
  return (
    <section className="relative w-full h-screen overflow-hidden bg-neutral-100 flex flex-col">
      <div className="relative flex-grow flex items-center justify-center">
        <img
          src="https://images.unsplash.com/photo-1488161628813-04466f872be2?auto=format&fit=crop&q=80&w=1920"
          alt="Architectural portrait"
          className="absolute inset-0 w-full h-full object-cover brightness-[0.9] contrast-[1.05]"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 via-transparent to-indigo-500/20"></div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <p className="text-white/80 text-[10px] md:text-xs font-bold uppercase tracking-[0.5em] mb-6 animate-pulse">
            Defining Contemporary Bureaucracy
          </p>
          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-white text-7xl md:text-[12vw] font-black tracking-tighter leading-[0.8] mix-blend-difference"
          >
            ALEN <br />
            <span className="italic font-serif">JACOB.</span>
          </motion.h1>

          <div className="mt-16 flex flex-col md:flex-row gap-6 justify-center items-center">
            <div className="w-px h-16 bg-white/30 hidden md:block"></div>
            <p className="text-white/60 max-w-xs text-left text-sm font-medium leading-relaxed hidden md:block">
              Alen Jacob specializes in bridging the gap between social
              structures, business systems, and tangible reality.
            </p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-[1px] h-12 bg-black"
        ></motion.div>
      </div>
    </section>
  );
};

const ScrollRow = ({
  items,
  direction,
  textColor,
  isOutlined,
  scrollProgress,
  rotation = 0,
}) => {
  const content = [
    ...items,
    ...items,
    ...items,
    ...items,
    ...items,
    ...items,
    ...items,
    ...items,
  ];
  const speed = 0.6;
  const movement =
    direction === "left" ? -(scrollProgress * speed) : scrollProgress * speed;
  const initialOffset = direction === "left" ? 0 : -3000;

  return (
    <div className="py-2 md:py-4 overflow-hidden whitespace-nowrap select-none">
      <div
        className="flex items-center gap-10 md:gap-20 transition-transform duration-100 ease-out will-change-transform"
        style={{ transform: `translateX(${initialOffset + movement}px)` }}
      >
        {content.map((item, idx) => (
          <React.Fragment key={idx}>
            <span
              className={`
              text-[9vw] md:text-[11vw] font-black font-condensed uppercase tracking-tighter leading-none transition-colors duration-500
              ${isOutlined ? "text-outline opacity-40 hover:opacity-100" : "opacity-100 hover:text-neutral-400"}
              ${textColor}
            `}
            >
              {item.text}
            </span>
            <div
              className="w-[16vw] h-[16vw] md:w-[13vw] md:h-[13vw] shrink-0 overflow-hidden shadow-2xl border-[12px] border-white bg-neutral-200"
              style={{
                borderRadius: "0px",
                transform: `rotate(${idx % 2 === 0 ? rotation : -rotation}deg)`,
              }}
            >
              <img
                src={item.img}
                alt=""
                className="w-full h-full object-cover transition-all duration-700"
                loading="lazy"
              />
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

const ScrollingSection = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    let requestRef;
    const handleScroll = () => {
      requestRef = requestAnimationFrame(() => {
        setScrollPosition(window.scrollY);
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(requestRef);
    };
  }, []);

  const bureaus = [
    {
      text: "Trillion Edition",
      img: "https://images.unsplash.com/photo-1507679799987-c7377f0c8488?auto=format&fit=crop&q=80&w=500",
    },
    {
      text: "Social Bureau",
      img: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=500",
    },
    {
      text: "Business Bureau",
      img: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=500",
    },
    {
      text: "VentureX",
      img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=500",
    },
  ];

  return (
    <div
      ref={containerRef}
      className="bg-white py-16 md:py-32 relative overflow-hidden border-y border-neutral-100"
    >
      <div className="flex flex-col gap-0 md:gap-4">
        <ScrollRow
          items={bureaus}
          direction="left"
          textColor="text-black"
          isOutlined={false}
          scrollProgress={scrollPosition}
          rotation={4}
        />
        <ScrollRow
          items={[...bureaus].reverse()}
          direction="right"
          textColor="text-black"
          isOutlined={true}
          scrollProgress={scrollPosition}
          rotation={-2}
        />
        <ScrollRow
          items={[bureaus[2], bureaus[0], bureaus[1]]}
          direction="left"
          textColor="text-black"
          isOutlined={false}
          scrollProgress={scrollPosition * 1.2}
          rotation={6}
        />
        <ScrollRow
          items={bureaus}
          direction="right"
          textColor="text-black"
          isOutlined={true}
          scrollProgress={scrollPosition}
          rotation={-5}
        />
      </div>
    </div>
  );
};

const GlobalImpactSection = () => {
  const stats = [
    {
      label: "Assets Under Strategy",
      value: "$2.4B+",
      detail: "Across 12 global markets",
    },
    {
      label: "Ventures Architected",
      value: "18",
      detail: "From seed to enterprise scale",
    },
    {
      label: "Direct Impact",
      value: "5.2M+",
      detail: "Users engaged through bureau systems",
    },
  ];

  return (
    <section className="py-12 md:py-32 px-[5%] bg-neutral-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-20">
        <div className="lg:col-span-4">
          <RevealText className="text-[10px] font-bold uppercase tracking-[0.4em] text-neutral-400 mb-8 block">
            02 Scale
          </RevealText>
          <h2 className="text-5xl md:text-7xl font-black font-condensed tracking-tighter text-black uppercase leading-[0.9]">
            STRATEGIC <br />
            <span className="text-neutral-300">IMPACT.</span>
          </h2>
        </div>

        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          {stats.map((s, i) => (
            <div
              key={i}
              className={`p-8 md:p-12 bg-white border-l-4 border-emerald-500 shadow-sm ${i === 0 ? "md:col-span-2" : ""}`}
            >
              <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-600 mb-4 block">
                {s.label}
              </span>
              <div className="text-4xl md:text-8xl font-black font-condensed mb-2 text-black">
                {s.value}
              </div>
              <p className="text-neutral-500 font-medium">{s.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const VenturesSection = () => {
  return (
    <section className="py-12 md:py-24 px-[5%] bg-white border-b border-neutral-100">
      <div className="max-w-7xl mx-auto">
        <RevealText className="text-[10px] font-bold uppercase tracking-[0.4em] text-neutral-400 mb-8 block">
          01 Portfolio
        </RevealText>
        <h2 className="text-5xl md:text-8xl font-black font-condensed tracking-tighter text-black uppercase leading-[0.85] mb-16 md:mb-32">
          THE <br />
          <span className="text-neutral-300">VENTURES.</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-neutral-100 border border-neutral-100">
          {VENTURES.map((v, i) => (
            <div
              key={i}
              className={`group relative bg-white p-8 md:p-16 overflow-hidden transition-all duration-700 hover:bg-${v.color}-50`}
            >
              <div className="relative z-10">
                <span
                  className={`text-[10px] font-bold uppercase tracking-widest text-${v.color}-600 mb-4 block`}
                >
                  {v.category}
                </span>
                <h3 className="text-3xl md:text-5xl font-black font-condensed uppercase mb-6 transition-colors group-hover:text-black">
                  {v.title}
                </h3>
                <p className="text-neutral-500 max-w-sm leading-relaxed mb-8">
                  {v.description}
                </p>
                <button
                  className={`text-[10px] font-bold uppercase tracking-widest border-b-2 transition-all`}
                  style={{ borderColor: v.accent, color: v.accent }}
                >
                  Explore Entity
                </button>
              </div>
              <div className="absolute right-0 bottom-0 w-1/2 h-1/2 md:w-2/3 md:h-2/3 translate-x-1/4 translate-y-1/4 opacity-0 group-hover:opacity-30 transition-all duration-1000 group-hover:translate-x-0 group-hover:translate-y-0">
                <img
                  src={v.image}
                  alt=""
                  className="w-full h-full object-cover shadow-2xl"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const PhilosophySection = () => {
  return (
    <section className="py-12 md:py-24 px-[5%] bg-emerald-950 text-white relative flex flex-col items-center text-center overflow-hidden">
      <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_50%_50%,#10b981_0%,transparent_70%)]"></div>

      <div className="max-w-4xl relative z-10 py-12 md:py-32">
        <RevealText className="text-[10px] font-bold uppercase tracking-[0.6em] text-emerald-400 mb-12 block">
          Executive Philosophy
        </RevealText>
        <h2 className="text-3xl md:text-6xl font-serif italic leading-[1.3] mb-16">
          "Systems are not merely structures of business; they are the
          <span className="text-emerald-400">
            {" "}
            architecture of human progress.{" "}
          </span>
          We build for the legacy, not just the quarter."
        </h2>
        <div className="w-px h-24 bg-gradient-to-b from-emerald-500/40 to-transparent mx-auto"></div>
      </div>
    </section>
  );
};

const AlenJacob = () => {
  return (
    <div className="min-h-screen bg-neutral-100 selection:bg-black selection:text-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Antonio:wght@400;700&family=Inter:wght@400;700;900&family=Playfair+Display:ital,wght@0,900;1,900&display=swap');
        
        .font-condensed {
            font-family: 'Antonio', sans-serif;
            letter-spacing: -0.02em;
        }
        .font-serif {
            font-family: 'Playfair Display', serif;
        }
        .text-outline {
            -webkit-text-stroke: 1.5px currentColor;
            -webkit-text-fill-color: transparent;
        }
      `}</style>

      <main>
        <Hero />
        <ScrollingSection />
        <VenturesSection />
        <PhilosophySection />
        <GlobalImpactSection />
        <RecognitionSection />
        <BackToTop />

        <section className="bg-white py-16 md:py-32 px-6 md:px-12">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-end">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-neutral-400 mb-6 md:mb-8 block">
                Inquiry
              </span>
              <h2 className="text-5xl md:text-8xl font-black font-condensed tracking-tighter text-black uppercase leading-[0.85]">
                Bridging the <br />
                <span className="text-emerald-500 opacity-60">Intangible.</span>
              </h2>
            </div>
            <div className="flex flex-col gap-6 md:gap-8">
              <p className="text-base md:text-lg text-neutral-600 font-medium leading-relaxed">
                I create systems that allow social concepts to thrive within
                business frameworks, ultimately manifesting in physical reality.
                Each bureau represents a pillar of modern existence.
              </p>
              <button className="self-start text-[10px] font-bold uppercase tracking-[0.2em] border-b-2 border-black pb-2 hover:text-neutral-400 hover:border-neutral-400 transition-all">
                View Manifesto
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-black text-white py-12 md:py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex flex-col gap-12 md:gap-20">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12">
            <div className="text-3xl md:text-6xl font-black tracking-widest uppercase font-condensed">
              ALEN.JACOB
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-16">
              <div className="flex flex-col gap-4">
                <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">
                  Navigation
                </span>
                <a href="#" className="text-sm hover:text-white/60">
                  Philosophy
                </a>
                <a href="#" className="text-sm hover:text-white/60">
                  Bureaus
                </a>
                <a href="#" className="text-sm hover:text-white/60">
                  Journal
                </a>
              </div>
              <div className="flex flex-col gap-4">
                <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">
                  Connect
                </span>
                <a href="#" className="text-sm hover:text-white/60">
                  Instagram
                </a>
                <a href="#" className="text-sm hover:text-white/60">
                  LinkedIn
                </a>
                <a href="#" className="text-sm hover:text-white/60">
                  X.com
                </a>
              </div>
              <div className="flex flex-col gap-4">
                <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">
                  Legal
                </span>
                <a href="#" className="text-sm hover:text-white/60">
                  Privacy
                </a>
                <a href="#" className="text-sm hover:text-white/60">
                  Terms
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 md:pt-12 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-bold uppercase tracking-widest text-white/20">
            <span>© 2024 Alen Jacob. All rights reserved.</span>
            <span>Designed for the Future.</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AlenJacob;

