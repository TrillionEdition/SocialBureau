import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  useSpring,
  useInView,
  useAnimationFrame,
  useMotionValue,
} from "framer-motion";
import {
  ArrowUpRight,
  ArrowRight,
  Maximize2,
  Lock,
  Compass,
  Zap,
  Layout,
  Layers,
  Search,
} from "lucide-react";

// --- Constants ---
const ARCHIVE = [
  {
    id: "01",
    title: "Monolith Residence",
    type: "Brutalist / Concrete",
    year: "2024",
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: "02",
    title: "The Prism Office",
    type: "Glass / Light",
    year: "2023",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: "03",
    title: "Shadow Pavilion",
    type: "Ebony / Steel",
    year: "2023",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: "04",
    title: "Void Library",
    type: "Minimalist / White",
    year: "2022",
    image:
      "https://images.unsplash.com/photo-1507537362145-59049193b821?auto=format&fit=crop&q=80&w=1200",
  },
];

const METHODOLOGIES = [
  {
    title: "Structural Integrity",
    desc: "Every design choice is rooted in mathematical precision and structural honesty.",
    icon: <Layout className="w-6 h-6" />,
  },
  {
    title: "Light & Atmosphere",
    desc: "Manipulating natural light to create emotional depth within static structures.",
    icon: <Zap className="w-6 h-6" />,
  },
  {
    title: "Digital Weaving",
    desc: "Blending physical parameters with generative digital storytelling.",
    icon: <Layers className="w-6 h-6" />,
  },
];

const RedactedHeading = ({
  children,
  className = "",
  delay = 0.5,
  color = "bg-black",
}) => {
  return (
    <div className={`relative inline-block overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: "100%" }}
        whileInView={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
      >
        {children}
      </motion.div>
      <motion.div
        initial={{ width: "100%" }}
        whileInView={{ width: 0 }}
        transition={{ duration: 1, delay, ease: [0.65, 0, 0.35, 1] }}
        className={`absolute inset-0 ${color} z-20`}
      />
    </div>
  );
};

// --- Components ---

const ScannerHero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  // Scanner Beam Position (Optimized)
  const beamPos = useMotionValue(0);

  useAnimationFrame((time) => {
    // Smooth oscillating beam
    const pos = Math.sin(time / 2000) * 50 + 50;
    beamPos.set(pos);
  });

  return (
    <section className="relative h-[100dvh] bg-[#050505] text-[#fcfcfc] overflow-hidden flex items-center justify-center will-change-transform transform-gpu">
      {/* Background Architectural Noise */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />

      {/* Dynamic Grid */}
      <div className="absolute inset-0 grid grid-cols-12 opacity-10 pointer-events-none">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="border-x border-white/10" />
        ))}
      </div>

      <motion.div
        style={{ y: y1, opacity }}
        className="relative z-10 text-center will-change-transform"
      >
        <h1 className="text-[clamp(4rem,22vw,28rem)] font-black uppercase tracking-tighter leading-[0.8] m-0 relative">
          JULIAN
          {/* Glitch Overlay */}
          <motion.span
            animate={{ x: [-2, 2, -2], opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 0.2, repeat: Infinity }}
            className="absolute inset-0 text-orange-600/20 translate-x-1"
          >
            JULIAN
          </motion.span>
        </h1>
        <h1 className="text-[clamp(4rem,22vw,28rem)] font-black uppercase tracking-tighter leading-[0.8] m-0 italic outline-text relative">
          VANE
          <motion.span
            animate={{ x: [2, -2, 2], opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 0.2, repeat: Infinity }}
            className="absolute inset-0 text-white/5 -translate-x-1 outline-text"
          >
            VANE
          </motion.span>
        </h1>

        {/* The Displacement Scanner Beam */}
        <motion.div
          className="absolute left-[-10vw] right-[-10vw] h-[2px] bg-orange-600 shadow-[0_0_30px_#ff4d00] z-50 pointer-events-none will-change-[top]"
          style={{ top: useTransform(beamPos, [0, 100], ["0%", "100%"]) }}
        />

        {/* Architectural Coordinates */}
        <div className="absolute -bottom-16 md:-bottom-24 left-1/2 -translate-x-1/2 font-mono text-[8px] md:text-[10px] tracking-[0.4em] md:tracking-[0.8em] uppercase text-white/40 flex flex-col md:flex-row gap-4 md:gap-12 items-center whitespace-nowrap">
          <span>Lat: 40.7128° N</span>
          <span>Lon: 74.0060° W</span>
          <span className="text-orange-600">Elev: 0.00m</span>
        </div>
      </motion.div>

      {/* Hero Subtext */}
      <div className="absolute bottom-12 left-12 md:left-24 max-w-xs text-left">
        <p className="font-mono text-[8px] uppercase tracking-widest text-orange-600 mb-4 font-black">
          System_State: ACTIVE
        </p>
        <p className="text-sm font-light leading-relaxed opacity-60 italic">
          Visualizing the unseen structures of the digital void.
        </p>
      </div>

      <style jsx>{`
        .outline-text {
          -webkit-text-stroke: 1px currentColor;
          color: transparent;
        }
      `}</style>
    </section>
  );
};

const BlueprintAbout = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  return (
    <section
      ref={ref}
      className="py-32 md:py-64 bg-[#fcfcfc] text-[#0a0a0a] px-6 md:px-24"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-24">
        <div className="flex-1 space-y-12">
          <div className="overflow-hidden">
            <motion.span
              initial={{ y: "100%" }}
              animate={isInView ? { y: 0 } : { y: "100%" }}
              className="text-orange-600 text-xs tracking-[0.6em] uppercase block font-bold"
            >
              The Blueprint
            </motion.span>
          </div>
          <RedactedHeading className="w-full">
            <motion.h2
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-[12vw] md:text-9xl font-bold tracking-tight leading-[0.9] uppercase"
            >
              Constructing <br />{" "}
              <span className="italic font-serif serif-font">Absence</span>
            </motion.h2>
          </RedactedHeading>

          <p className="text-lg md:text-3xl font-light leading-relaxed max-w-2xl text-gray-800">
            Architecture is the art of defining the void. I use steel, stone,
            and light to tell stories that haven't been written yet.
          </p>

          <div className="pt-12">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              className="h-px bg-black/10 mb-8"
            />
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-12 font-mono text-xs uppercase tracking-widest opacity-60">
              <div>
                <span className="block mb-2 text-orange-600">Location</span>
                Remote / Global
              </div>
              <div>
                <span className="block mb-2 text-orange-600">Status</span>
                Independent
              </div>
              <div>
                <span className="block mb-2 text-orange-600">Focus</span>
                Visual Storytelling
              </div>
            </div>
          </div>
        </div>

        <div className="w-full md:w-[35vw] aspect-[4/5] bg-black relative rounded-sm overflow-hidden group">
          <motion.div
            className="absolute inset-0 border border-white/20 m-4 z-10"
            animate={
              isInView ? { opacity: [0, 1, 0, 1], scale: [1, 1.02, 1] } : {}
            }
            transition={{ duration: 2 }}
          />
          <img
            src="https://images.unsplash.com/photo-1449156001931-8283ca2f2450?auto=format&fit=crop&q=80&w=1000"
            alt="Julian"
            className="w-full h-full object-cover opacity-60 grayscale scale-110 group-hover:scale-100 transition-transform duration-[2s]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
          <div className="absolute bottom-8 left-8 text-white font-mono text-[10px] tracking-widest uppercase">
            Structure Ref: JV_ARCH_77
          </div>
        </div>
      </div>
    </section>
  );
};

const Manifesto = () => {
  const { scrollYProgress } = useScroll();
  const x1 = useTransform(scrollYProgress, [0, 1], [0, -500]);
  const x2 = useTransform(scrollYProgress, [0, 1], [0, 500]);

  return (
    <section className="py-64 bg-[#0a0a0a] text-white overflow-hidden relative">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
      </div>

      <div className="flex flex-col gap-12 select-none relative z-10">
        <motion.div
          style={{ x: x1 }}
          className="whitespace-nowrap flex gap-12 opacity-20 will-change-transform transform-gpu"
        >
          {Array.from({ length: 10 }).map((_, i) => (
            <h2
              key={i}
              className="text-[clamp(4rem,15vw,20rem)] font-black uppercase tracking-tighter italic"
            >
              Architecture is the silence between the stones
            </h2>
          ))}
        </motion.div>

        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            className="p-8 md:p-24 border border-white/5 bg-white/5 backdrop-blur-3xl rounded-sm"
          >
            <RedactedHeading color="bg-orange-600" className="mb-12">
              <h3 className="text-sm tracking-[0.8em] uppercase text-orange-600 font-bold">
                The Manifesto
              </h3>
            </RedactedHeading>
            <p className="text-3xl md:text-6xl font-light leading-tight tracking-tight italic font-serif">
              "I don't build houses. I build containers for{" "}
              <span className="text-orange-600 font-sans font-black not-italic uppercase tracking-tighter">
                light
              </span>{" "}
              and{" "}
              <span className="text-orange-600 font-sans font-black not-italic uppercase tracking-tighter">
                memory
              </span>
              ."
            </p>
          </motion.div>
        </div>

        <motion.div
          style={{ x: x2 }}
          className="whitespace-nowrap flex gap-12 opacity-20 will-change-transform transform-gpu"
        >
          {Array.from({ length: 10 }).map((_, i) => (
            <h2
              key={i}
              className="text-[clamp(4rem,15vw,20rem)] font-black uppercase tracking-tighter outline-text"
            >
              Visualizing the unseen structures of the void
            </h2>
          ))}
        </motion.div>
      </div>

      <style jsx>{`
        .outline-text {
          -webkit-text-stroke: 1px white;
          color: transparent;
        }
      `}</style>
    </section>
  );
};

const Footprint = () => {
  const [activePhase, setActivePhase] = useState(0);
  const { scrollYProgress } = useScroll();
  const rotateY = useTransform(scrollYProgress, [0.3, 0.6], [0, 45]);
  const scale = useTransform(scrollYProgress, [0.3, 0.5], [0.8, 1]);

  const PHASES = [
    {
      label: "Phase_01",
      title: "Site Reconnaissance",
      desc: "Detailed analysis of geographical and sociocultural parameters.",
      coords: "40.7128° N, 74.0060° W",
    },
    {
      label: "Phase_02",
      title: "Structural Logic",
      desc: "Defining the skeletal system that governs spatial flow.",
      coords: "51.5074° N, 0.1278° W",
    },
    {
      label: "Phase_03",
      title: "Material Synthesis",
      desc: "Merging tactile elements with atmospheric digital rendering.",
      coords: "35.6762° N, 139.6503° E",
    },
  ];

  return (
    <section className="py-32 md:py-64 bg-[#0a0a0a] text-white px-6 md:px-24 overflow-hidden relative touch-pan-y">
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-orange-600 to-transparent animate-scan transform-gpu" />
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-end justify-between mb-32 gap-12">
          <div className="max-w-xl">
            <h2 className="text-sm tracking-[0.8em] uppercase text-orange-600 font-bold mb-8">
              Global Operations
            </h2>
            <RedactedHeading color="bg-orange-600">
              <h3 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.8]">
                Command <br /> Matrix
              </h3>
            </RedactedHeading>
          </div>
          <div className="text-right font-mono text-[10px] tracking-widest opacity-40">
            STRATEGIC_SURVEILLANCE // v3.0
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-center">
          <div className="lg:col-span-7 relative">
            <motion.div
              style={{ rotateY, scale, perspective: 1000 }}
              className="relative aspect-square md:aspect-square bg-white/[0.02] border border-white/10 rounded-full p-4 md:p-24 will-change-transform transform-gpu"
            >
              <div className="absolute inset-0 rounded-full border border-orange-600/20 animate-spin-slow" />
              <div className="absolute inset-4 rounded-full border border-white/5 animate-reverse-spin" />

              {/* The World Mapping (Tactical GUI style) */}
              <div className="relative w-full h-full rounded-full overflow-hidden bg-[#050505] shadow-[inset_0_0_50px_rgba(255,77,0,0.1)]">
                <div className="absolute inset-0 grid grid-cols-24 grid-rows-24 opacity-20">
                  {Array.from({ length: 576 }).map((_, i) => (
                    <div key={i} className="border-[0.5px] border-white/10" />
                  ))}
                </div>

                {/* Animated Signal Waves */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-4/5">
                  <motion.div
                    animate={{ scale: [1, 2], opacity: [0.5, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="absolute inset-0 border border-orange-600 rounded-full"
                  />
                  <motion.div
                    animate={{ scale: [1, 2.5], opacity: [0.3, 0] }}
                    transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                    className="absolute inset-0 border border-white/40 rounded-full"
                  />
                </div>

                {/* Active Sector Highlight */}
                <motion.div
                  animate={{ opacity: [0.1, 0.4, 0.1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 bg-orange-600/5 backdrop-blur-sm"
                />

                {/* Coordinate HUD */}
                <div className="absolute bottom-8 left-8 right-8 flex justify-between font-mono text-[8px] tracking-widest text-orange-600 uppercase">
                  <div>Status: Tracking</div>
                  <div>ID: {PHASES[activePhase].label}</div>
                  <div>LOC: {PHASES[activePhase].coords}</div>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-5 space-y-4">
            {PHASES.map((phase, i) => (
              <motion.div
                key={i}
                onMouseEnter={() => setActivePhase(i)}
                onClick={() => setActivePhase(i)}
                className={`p-6 md:p-12 border transition-all duration-500 cursor-pointer group relative overflow-hidden ${
                  activePhase === i
                    ? "bg-white text-black border-white"
                    : "bg-white/5 border-white/10 text-white/40 hover:border-orange-600/50"
                }`}
              >
                <div className="relative z-10 flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <span
                      className={`font-mono text-[10px] tracking-widest uppercase ${
                        activePhase === i ? "text-orange-600" : ""
                      }`}
                    >
                      {phase.label}
                    </span>
                    <div
                      className={`w-2 h-2 rounded-full ${
                        activePhase === i
                          ? "bg-orange-600 animate-pulse"
                          : "bg-white/20"
                      }`}
                    />
                  </div>
                  <h4 className="text-3xl md:text-5xl font-black uppercase tracking-tighter">
                    {phase.title}
                  </h4>
                  {activePhase === i && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="text-gray-400 text-lg leading-relaxed italic"
                    >
                      {phase.desc}
                    </motion.p>
                  )}
                </div>
                {activePhase === i && (
                  <div className="absolute top-0 right-0 p-4 font-mono text-[6px] opacity-10 uppercase tracking-widest flex flex-col gap-1 items-end">
                    <span>SYNC_PKT_0x{i}</span>
                    <motion.span
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ duration: 0.5, repeat: Infinity }}
                    >
                      DATALINK_ESTABLISHED
                    </motion.span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Scrolling Coordinate Stream Footer */}
        <div className="mt-32 pt-8 border-t border-white/5 overflow-hidden whitespace-nowrap opacity-20 font-mono text-[8px] tracking-[0.4em] flex gap-24 relative">
          <motion.div
            animate={{ x: [0, -1000] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="flex gap-24"
          >
            {Array.from({ length: 10 }).map((_, i) => (
              <span key={i}>
                COORD_STREAM :: {Math.random().toFixed(4)}°N,{" "}
                {Math.random().toFixed(4)}°E // PACKET_RECV // ARCH_JV_v3.0
                //{" "}
              </span>
            ))}
          </motion.div>
          <motion.div
            animate={{ x: [0, -1000] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="flex gap-24"
          >
            {Array.from({ length: 10 }).map((_, i) => (
              <span key={i}>
                COORD_STREAM :: {Math.random().toFixed(4)}°N,{" "}
                {Math.random().toFixed(4)}°E // PACKET_RECV // ARCH_JV_v3.0
                //{" "}
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scan {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(100vh);
          }
        }
        .animate-scan {
          animation: scan 8s linear infinite;
          will-change: transform;
        }
        .animate-spin-slow {
          animation: spin 30s linear infinite;
        }
        .animate-reverse-spin {
          animation: spin 20s linear infinite reverse;
        }
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </section>
  );
};

const ArtifactItem = ({ project }) => {
  const cardRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const rotateX = useSpring(mousePos.y * -20, { stiffness: 100, damping: 20 });
  const rotateY = useSpring(mousePos.x * 20, { stiffness: 100, damping: 20 });

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMousePos({ x: 0, y: 0 });
      }}
      style={{
        perspective: 1000,
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
      }}
      className="group relative h-[70vh] md:h-[90vh] bg-black overflow-hidden will-change-transform transform-gpu touch-pan-y"
    >
      <motion.img
        src={project.image}
        alt={project.title}
        className="w-full h-full object-cover opacity-50 grayscale transition-all duration-1000 group-hover:scale-110 group-hover:opacity-100 group-hover:grayscale-0 will-change-transform"
        style={{
          x: useTransform(rotateY, [-10, 10], [-20, 20]),
          y: useTransform(rotateX, [-10, 10], [20, -20]),
        }}
        referrerPolicy="no-referrer"
      />

      {/* Redacted Data */}
      <div className="absolute top-12 left-12 space-y-2 z-20">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          className="bg-[#ff4d00] text-black px-3 py-1 font-mono text-[10px] uppercase font-black"
        >
          SECURE_ARCHIVE
        </motion.div>
        <div className="bg-black/80 backdrop-blur-md px-2 py-1 text-white font-mono text-[10px] border border-white/10">
          REF: JV_DATA_{project.id}
        </div>
      </div>

      <div className="absolute bottom-12 left-12 right-12 flex items-end justify-between z-20">
        <div className="translate-y-8 group-hover:translate-y-0 transition-transform duration-700">
          <span className="text-xs uppercase tracking-[0.4em] text-orange-500 mb-2 block font-black">
            {project.type}
          </span>
          <h4 className="text-3xl md:text-7xl font-black uppercase tracking-tighter leading-none">
            {project.title}
          </h4>
        </div>
        <div className="w-20 h-20 rounded-full border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 scale-0 group-hover:scale-100 transition-all duration-500 bg-white/5 backdrop-blur-sm">
          <Maximize2 className="w-8 h-8 text-white" />
        </div>
      </div>

      {/* Suspense Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40 pointer-events-none" />
    </motion.div>
  );
};

const ArtifactGallery = () => {
  return (
    <section className="py-32 md:py-64 bg-[#0a0a0a] text-white">
      <div className="px-6 md:px-24 mb-32 flex flex-col md:flex-row md:items-end justify-between gap-12">
        <div>
          <h2 className="text-sm tracking-[0.8em] uppercase opacity-40 font-black mb-4">
            Classified Archive
          </h2>
          <RedactedHeading color="bg-orange-600">
            <h3 className="text-5xl md:text-9xl font-black uppercase tracking-tighter">
              The Artifacts
            </h3>
          </RedactedHeading>
        </div>
        <div className="max-w-md text-gray-500 font-light text-lg italic md:text-right">
          "Every space is a story waiting to be decoded. These are the fragments
          of my visual journey."
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[2px] bg-white/5 border-y border-white/5">
        {ARCHIVE.map((project, i) => (
          <ArtifactItem key={i} project={project} />
        ))}
      </div>
    </section>
  );
};


const MethodItem = ({ method, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white p-12 md:p-20 group hover:bg-[#0a0a0a] hover:text-white transition-all duration-700 relative overflow-hidden"
    >
      <div className="relative z-10 flex flex-col md:flex-row gap-12 md:items-center">
        <div className="w-16 h-16 bg-black/5 flex items-center justify-center rounded-lg group-hover:bg-white/10 transition-colors shrink-0">
          {method.icon}
        </div>
        <div className="space-y-4 max-w-xl">
          <div className="relative inline-block">
            <h4 className="text-2xl md:text-5xl font-black uppercase tracking-tighter">
              {method.title}
            </h4>
            {/* Redacted Bar effect */}
            <motion.div
              initial={{ width: "100%" }}
              whileInView={{ width: 0 }}
              transition={{ duration: 1, delay: 0.5 + index * 0.2 }}
              className="absolute inset-0 bg-black group-hover:bg-orange-600"
            />
          </div>
          <p className="text-gray-500 group-hover:text-gray-400 font-light text-lg transition-colors italic leading-relaxed">
            {method.desc}
          </p>
        </div>
        <div className="md:ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          >
            <Compass className="w-8 h-8 text-orange-600" />
          </motion.div>
        </div>
      </div>
      <div className="absolute top-0 right-0 p-4 font-mono text-[8px] opacity-10 uppercase tracking-widest select-none">
        Encrypted Method :: 01010{index}
      </div>
    </motion.div>
  );
};

const MethodReveal = () => {
  return (
    <section className="py-32 md:py-64 bg-[#fcfcfc] text-[#0a0a0a] px-6 md:px-24 relative overflow-hidden">
      <div className="absolute top-0 right-0 text-[30rem] font-black opacity-[0.02] uppercase translate-x-1/2 -translate-y-1/2 select-none">
        GRID
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-start gap-24">
          <div className="lg:col-span-5 lg:sticky top-32 pr-2 md:pr-12">
            <h2 className="text-sm tracking-[0.6em] uppercase text-orange-600 font-bold mb-12">
              The Methodology
            </h2>
            <RedactedHeading>
              <h3 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.8] mb-8">
                Structural <br /> Intelligence
              </h3>
            </RedactedHeading>
            <p className="text-gray-500 text-xl font-light leading-relaxed mb-12 max-w-xs">
              Every space is a dialogue. I look for the silence between the
              structures.
            </p>
            <motion.button
              whileHover={{ x: 10 }}
              className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest border-b border-black pb-2"
            >
              Open Protocol <ArrowRight className="w-4 h-4 text-orange-600" />
            </motion.button>
          </div>

          <div className="lg:col-span-7 space-y-[2px] bg-black/5 border border-black/5">
            {METHODOLOGIES.map((method, i) => (
              <MethodItem key={i} method={method} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const ContactPortal = () => {
  return (
    <footer className="relative py-32 md:py-64 bg-[#0a0a0a] text-white px-6 md:px-24 overflow-hidden">
      {/* Depth Effect */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#ff4d00]/5 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] h-[100vh] border border-white/5 rotate-12 scale-150" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[150vh] border border-white/5 -rotate-12 scale-150" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center text-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="mb-16"
        >
          <Compass className="w-20 h-20 text-orange-600" />
        </motion.div>

        <RedactedHeading
          color="bg-orange-600"
          delay={0.2}
          className="block mx-auto mb-12 md:mb-24"
        >
          <h2 className="text-[clamp(2rem,12vw,12rem)] font-black uppercase tracking-tighter leading-[0.85]">
            Send <br />{" "}
            <span className="outline-text text-transparent">Signal</span>
          </h2>
        </RedactedHeading>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl mb-32">
          {["X / Twitter", "LinkedIn", "Instagram"].map((social, i) => (
            <motion.a
              key={i}
              href="#"
              whileHover={{ y: -5, backgroundColor: "rgba(255, 77, 0, 0.1)" }}
              className="p-12 border border-white/10 rounded-sm font-bold uppercase tracking-widest text-[10px] bg-white/5 backdrop-blur-xl flex flex-col items-center gap-4 group"
            >
              <span className="opacity-20 group-hover:opacity-100 transition-opacity font-mono">
                DATA_PKT_{i + 1}
              </span>
              {social}
            </motion.a>
          ))}
        </div>

        <p className="font-mono text-[10px] tracking-[0.5em] uppercase opacity-20 hover:opacity-100 transition-opacity cursor-crosshair">
          Connection Secure // Julian Vane Studio
        </p>
      </div>

      <style jsx>{`
        .animate-spin-slow {
          animation: spin 20s linear infinite;
        }
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .outline-text {
          -webkit-text-stroke: 1px white;
        }
      `}</style>
    </footer>
  );
};

const LoadingSuspense = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.floor(Math.random() * 15);
      });
    }, 300);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[99999] bg-[#0a0a0a] flex flex-col items-center justify-center p-12 overflow-hidden"
    >
      <div className="absolute inset-0 grid grid-cols-12 opacity-5 pointer-events-none">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="border-x border-white/10" />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-md text-white">
        <div className="flex justify-between items-end mb-4 font-mono text-[10px] tracking-widest uppercase">
          <span>Julian Vane / Portfolio</span>
          <span className="text-orange-600">{Math.min(progress, 100)}%</span>
        </div>
        <div className="h-[2px] w-full bg-white/10 relative">
          <motion.div
            className="h-full bg-white absolute top-0 left-0"
            animate={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
        <div className="mt-8 font-mono text-[8px] tracking-tighter opacity-20 uppercase">
          Initialising architectural parameters... <br />
          Constructing spatial geometry... <br />
          Establishing secure connection...
        </div>
      </div>
    </motion.div>
  );
};

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 500) setIsVisible(true);
      else setIsVisible(false);
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          onClick={scrollToTop}
          className="fixed bottom-12 right-12 w-16 h-16 bg-[#ff4d00] text-black rounded-sm z-[9990] flex items-center justify-center group shadow-2xl"
        >
          <ArrowUpRight className="w-8 h-8 group-hover:scale-125 transition-transform" />
          <div className="absolute -top-1 px-2 py-0.5 bg-black text-white text-[8px] font-mono uppercase tracking-widest whitespace-nowrap">
            Jump_Home
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default function Partner4() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 3500);

    // Smooth scroll support
    window.scrollTo(0, 0);
    const root = document.getElementById("root");
    if (root) root.style.overflow = "visible";
    document.body.style.overflow = "visible";
    document.documentElement.style.overflow = "visible";

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#fcfcfc] selection:bg-[#ff4d00] selection:text-white">
      <AnimatePresence>{isLoading && <LoadingSuspense />}</AnimatePresence>

      <main>
        <ScannerHero />
        <BlueprintAbout />
        <Manifesto />
        <ArtifactGallery />
        <Footprint />
        <MethodReveal />
        <ContactPortal />
      </main>

      <BackToTop />

      {/* Global Aesthetics */}
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,900;1,900&family=Inter:wght@300;400;700;900&display=swap");

        body {
          font-family: "Inter", sans-serif;
        }

        .serif-font {
          font-family: "Playfair Display", serif;
        }

        /* Hide standard scrollbar for that premium feel in some areas */
        ::-webkit-scrollbar {
          width: 4px;
        }
        ::-webkit-scrollbar-track {
          background: transparent;
        }
        ::-webkit-scrollbar-thumb {
          background: rgba(255, 77, 0, 0.2);
          border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 77, 0, 0.5);
        }
      `}</style>
    </div>
  );
}

