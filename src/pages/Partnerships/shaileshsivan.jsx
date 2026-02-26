import React, { useState, useRef, useEffect, useMemo } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  AnimatePresence,
  useMotionValueEvent,
  useMotionValue,
} from "framer-motion";
import {
  ArrowRight,
  ChevronDown,
  Plus,
  ArrowUpRight,
  Phone,
  MapPin,
  Award,
  Building2,
  Calendar,
  Github,
  Twitter,
  Linkedin,
  Mail,
  Smartphone,
  Globe,
  ArrowUp,
} from "lucide-react";

// --- Constants ---
const SUMMARY =
  "I'm a technology evangelist, educator, and researcher currently working as Principal AI Architect at Laennec AI. With deep experience in both academia and industry, I specialize in Deep Learning, Computer Vision, Quantum Computing, and Knowledge Graphs. My mission is to transform the digital era through responsible AI innovation.";

const PHILOSOPHY = "Inspire Yourself Uplift Others";

const CONTACT = {
  email: "shaileshsivan@gmail.com",
  phone: "+91 8907230664",
  location: "Alappuzha, Kerala",
  website: "shaileshsivan.info",
};

const SOCIALS = [
  {
    platform: "GitHub",
    url: "https://github.com/shailooz",
    handle: "shailooz",
  },
  {
    platform: "Twitter/X",
    url: "https://x.com/SivanShailesh",
    handle: "@SivanShailesh",
  },
  {
    platform: "LinkedIn",
    url: "https://linkedin.com/in/shaileshsivan",
    handle: "shaileshsivan",
  },
];

const PUBLICATIONS = [
  {
    title:
      "Content-Based Image Retrieval for Medical Diagnosis Using Fuzzy Clustering and Deep Learning",
    source: "Biomedical Signal Processing and Control, Elsevier (Q1 SCIE)",
    year: "2024",
    doi: "10.1016/j.bspc.2023.105620",
    tags: ["Q1", "Medical AI", "Deep Learning"],
  },
  {
    title:
      "A Novel Neural Network Model with Distributed Evolutionary Approach for Big Data Classification",
    source: "Scientific Reports, Nature (Q1 SCIE)",
    year: "2023",
    doi: "10.1038/s41598-023-37540-z",
    tags: ["Nature", "Q1", "Evolutionary AI"],
  },
  {
    title:
      "Understanding Dance Semantics Using Spatio-Temporal Features Coupled with GRU Networks",
    source: "Entertainment Computing, Elsevier (Q2 SCIE)",
    year: "2022",
    tags: ["Q2", "Computer Vision", "Cultural Heritage"],
  },
  {
    title:
      "A Convolutional Neural Network Approach to Doppler Spectra Classification of 205 MHz Radar",
    source: "Theoretical and Applied Climatology",
    year: "2022",
    tags: ["Q2", "Climatology", "CNN"],
  },
  {
    title: "Novel Abstraction Methods for TDMA-Based MAC Protocols",
    source: "Telecommunication Systems",
    year: "2024",
    tags: ["Q2", "Protocols", "Formal Verification"],
  },
];

const PATENTS = [
  {
    title: "AI Powered Device for Radiant Heat-Flux Prediction",
    id: "202441016276",
    description:
      "An AI-powered device using complex image geometry to analyze flame images and predict radiant heat flux threat zones.",
  },
  {
    title: "Voice Assisted Obtuse ATM",
    id: "202041029173",
    description:
      "Specifically designed for the visually impaired, featuring two-layer authentication and fully homomorphic encryption.",
  },
];

const EXPERIENCES = [
  {
    role: "Principal AI Architect",
    company: "Laennec AI India Pvt. Ltd.",
    period: "JUL 2025 – Present",
    location: "Ernakulam, Kerala",
    highlights: [
      "Architecting scalable AI models for medical stethoscope solutions and self-care apps.",
      "Developing secure AI deployment pipelines across mobile and cloud environments.",
      "Ensuring GDPR and HIPAA compliance in sensitive medical data handling.",
      "Collaborating with clinical and regulatory teams to align AI innovation with safety standards.",
    ],
  },
  {
    role: "Assistant Professor (On Leave)",
    company: "DCS, CUSAT",
    period: "OCT 2021 – JUN 2025",
    location: "Cochin University of Science and Technology",
    highlights: [
      "Supervising Ph.D. students in AI/ML, Computer Vision, and Quantum Computing.",
      "Teaching M.Tech specializing in Software Engineering and AI.",
      "Coordinating institutional Grievances Cell and NSS activities.",
    ],
  },
  {
    role: "Post-Doctoral Research Associate",
    company: "Knowledge Media Institute, Open University",
    period: "SEP 2021 – OCT 2021",
    location: "Milton Keynes, UK",
    highlights: [
      "Associated with 'Cultural Heritage Knowledge Graphs' funded by EU Horizon 2020.",
    ],
  },
  {
    role: "Research Fellow",
    company: "DCA, CUSAT",
    period: "DEC 2017 – MAY 2021",
    location: "Ernakulam, Kerala",
    highlights: [
      "PhD Thesis: Computational Framework for ID of Spatio-Temporal Patterns in Classical Dance using ML.",
      "Design, Development and Deployment of AI, ML, Deep Learning and Data Science Projects.",
    ],
  },
  {
    role: "Assistant Professor",
    company: "Sacred Heart's College, Thevara",
    period: "JUN 2016 – NOV 2017",
    location: "Ernakulam, Kerala",
    highlights: [
      "Teaching Bachelor's in Computer Application (Cloud Computing & Mobile Apps).",
      "Handling IT papers for Non-IT PG programmes.",
    ],
  },
  {
    role: "Senior Software Engineer",
    company: "Travancore Analytics",
    period: "JAN 2016 – JUN 2016",
    location: "Kochi, Kerala",
    highlights: [
      "C++ application development for project 'REMO'.",
      "Involved in analysis, design, development, and deployment phases.",
    ],
  },
  {
    role: "Senior Software Engineer",
    company: "Techgentsia Software Technologies",
    period: "AUG 2012 – DEC 2015",
    location: "Cherthala, Kerala",
    highlights: [
      "Developed Windows Client Applications and Firebreath Plugins for video conferencing.",
      "Expertise in real-time collaboration tools development.",
    ],
  },
];

const EDUCATION = [
  {
    degree: "Ph.D. Computer Science",
    institution: "CUSAT",
    period: "2017 - 2021",
    details:
      "Computational Framework for Identification of Spatio-Temporal Patterns in Classical Dance",
  },
  {
    degree: "M.Sc. Mathematics",
    institution: "Madras University",
    period: "2016 - 2018",
  },
  {
    degree: "M.Tech. Computer & Information Science",
    institution: "CUSAT",
    period: "2013 - 2015",
  },
  {
    degree: "B.Tech. Computer Science & Engineering",
    institution: "Kerala University",
    period: "2008 - 2012",
  },
];

const ACHIEVEMENTS = [
  {
    title: "Young Scientist Award",
    description: "Sacred Heart College, Thevara (Institutional Level)",
    year: "2020",
  },
  {
    title: "Junior Research Fellowship (JRF)",
    description: "Qualified UGC-NET 2019",
    year: "2019",
  },
  {
    title: "Qualified NET 2017, 2018, 2019",
    description: "Qualified NET for Assistant Professor eligibility.",
    year: "2017-19",
  },
  {
    title: "GATE Qualified",
    description: "Qualified 5 times (2013, 16, 17, 18, 2024 DSAI)",
    year: "2024",
  },
  {
    title: "President Scout Award",
    description: "Rashtrapathi Scout Award - National Level",
    year: "National",
  },
];

const STATS = [
  { label: "Journal Publications", value: "22" },
  { label: "Conference Papers", value: "35" },
  { label: "Resource Sessions", value: "160+" },
  { label: "Patents Granted", value: "02" },
];

const CONSULTANCIES = [
  "PearlSoft - Technical Consultant & AI Product Advisor",
  "G10X - AI Strategy & Enterprise Solutions Advisor",
  "ZineMind - Product Innovation & Deep Learning Advisor",
  "Laennec AI - Principal AI Architect (Former Advisor)",
];

const SKILL_CATEGORIES = [
  {
    title: "Generative AI & LLMs",
    skills: [
      "Transformers",
      "LLMs (GPT, BERT)",
      "RAG & Prompt Engineering",
      "Fine-tuning (LoRA, CLIP)",
      "VLMs & Diffusion Models",
      "LangChain / LangGraph",
    ],
  },
  {
    title: "Deep Learning & CV",
    skills: [
      "CNN / RNN / LSTM",
      "AutoEncoders & GANs",
      "Graph Neural Networks",
      "Object Detection / Segm",
      "Attention Mechanisms",
      "Image/Video Manipulation",
    ],
  },
  {
    title: "Advanced Research",
    skills: [
      "Quantum Computing (Qiskit)",
      "Topological Data Analysis",
      "Reinforcement Learning (PPO)",
      "Explainable AI (XAI)",
      "Knowledge Graphs (Neo4j)",
      "Machine Learning (SVM, RF)",
    ],
  },
  {
    title: "Ecosystem & Logic",
    skills: [
      "Python / C++ / R",
      "PyTorch / TensorFlow",
      "Big Data (Hadoop/Spark)",
      "HDB3.0 / Cloudera",
      "Docker / Kubernetes",
      "Mathematical Statistics",
    ],
  },
];

// --- Components ---
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

const CornerBracket = ({ className = "" }) => (
  <div className={`absolute pointer-events-none ${className}`}>
    <div className="absolute -top-1 -left-1 w-4 h-4 border-t border-l border-[#10B981]/40" />
    <div className="absolute -top-1 -right-1 w-4 h-4 border-t border-r border-[#10B981]/40" />
    <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b border-l border-[#10B981]/40" />
    <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b border-r border-[#10B981]/40" />
  </div>
);

const NodePoint = ({ className = "", delay = 0 }) => (
  <motion.div
    initial={{ scale: 0, opacity: 0 }}
    whileInView={{ scale: 1, opacity: 1 }}
    transition={{ delay, duration: 0.5 }}
    className={`w-2 h-2 rounded-full border border-[#10B981] bg-white relative ${className}`}
  >
    <motion.div
      animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
      transition={{ duration: 2, repeat: Infinity }}
      className="absolute inset-[-4px] rounded-full bg-[#10B981]/20"
    />
  </motion.div>
);

const DataLine = ({ className = "", delay = 0, vertical = false }) => (
  <motion.div
    initial={vertical ? { scaleY: 0 } : { scaleX: 0 }}
    whileInView={vertical ? { scaleY: 1 } : { scaleX: 1 }}
    transition={{ delay, duration: 1, ease: [0.16, 1, 0.3, 1] }}
    className={`bg-gradient-to-r from-[#10B981]/20 via-[#10B981]/5 to-transparent origin-left ${vertical ? "w-[1px] h-full origin-top from-[#10B981]/20 via-[#10B981]/5 to-transparent bg-gradient-to-b" : "h-[1px] w-full"} ${className}`}
  />
);

const Magnetic = ({ children, strength = 0.5 }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = (e) => {
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

const BackToTop = () => {
  const [visible, setVisible] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 500) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, x: 20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          exit={{ opacity: 0, scale: 0.5, x: 20 }}
          className="fixed bottom-6 right-6 md:bottom-12 md:right-12 z-[1000]"
        >
          <Magnetic strength={0.3}>
            <button
              onClick={scrollToTop}
              className="w-12 h-12 md:w-14 md:h-14 bg-black border border-white/10 text-[#10B981] flex items-center justify-center group relative overflow-hidden transition-colors hover:border-[#10B981]/40"
            >
              <CornerBracket className="top-1 left-1 w-4 h-4 opacity-40 group-hover:opacity-100 transition-opacity" />
              <ArrowUp
                size={18}
                className="relative z-10 transition-transform group-hover:-translate-y-1"
              />
              <div className="absolute inset-0 bg-[#10B981]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          </Magnetic>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const SectionTitle = ({ label, title, light = false }) => (
  <div className="mb-8 md:mb-20 w-full text-left">
    <RevealText
      className={`text-[10px] font-bold uppercase tracking-[0.4em] mb-4 ${light ? "text-white/40" : "text-gray-400"}`}
    >
      {label}
    </RevealText>
    <RevealText
      className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-medium tracking-tighter leading-[0.9] sm:leading-[0.85] uppercase ${light ? "text-white" : "text-[#0e0e0e]"}`}
    >
      {title}
    </RevealText>
  </div>
);

const ImpactHighlight = () => {
  const impactData = [
    {
      value: "22",
      label: "Journal Publications",
      description:
        "Strategic contribution to high-impact Q1 scientific journals including Nature and Elsevier.",
      code: "0x_PRIME_22",
    },
    {
      value: "160+",
      label: "Global Sessions",
      description:
        "Technical evangelism and keynotes delivered at major international AI summits and academia-industry workshops.",
      code: "0x_REACH_160",
    },
    {
      value: "35",
      label: "Conf. Publications",
      description:
        "High-quality research presentations in globally recognized international conferences.",
      code: "0x_CORE_35",
    },
    {
      value: "02",
      label: "Intellectual Prop",
      description:
        "Granted patents in radiant heat-flux prediction and accessible interface security.",
      code: "0x_PAT_02",
    },
  ];

  return (
    <section
      id="impact"
      className="py-12 md:py-24 px-[5%] bg-[#020202] text-white relative overflow-hidden"
    >
      {/* Subtle Data Dust Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(0,210,255,0.05),transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 bg-grid opacity-5 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionTitle label="01 Metrics" title="Impact" light={true} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 md:mt-16">
          {impactData.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.8 }}
              whileHover={{ y: -10 }}
              className="group relative bg-[#10B981]/5 backdrop-blur-md border border-white/10 p-8 md:p-12 overflow-hidden hover:border-[#10B981]/30 transition-all duration-500"
            >
              <CornerBracket className="top-4 left-4 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <CornerBracket className="bottom-4 right-4 w-8 h-8 rotate-180 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Background Hollow Value */}
              <div className="absolute -bottom-10 -right-10 pointer-events-none select-none opacity-[0.03] group-hover:opacity-[0.05] transition-opacity duration-700">
                <span
                  className="text-[30vw] md:text-[20vw] font-display font-black leading-none"
                  style={{ WebkitTextStroke: "1px rgba(255,255,255,0.1)" }}
                >
                  {item.value}
                </span>
              </div>

              {/* HUD Ornaments */}
              <div className="absolute top-6 left-6 text-[8px] font-mono text-[#10B981]/40 tracking-[0.4em] uppercase">
                {item.code}
              </div>

              <div className="absolute top-0 right-0 p-6 flex gap-1">
                <div className="w-1 h-3 bg-[#10B981]/20" />
                <div className="w-3 h-1 bg-[#10B981]/20" />
              </div>

              <div className="relative z-10 mt-6 md:mt-12">
                <div className="flex items-end gap-6 mb-8">
                  <span className="text-6xl md:text-9xl font-display font-black text-[#10B981] leading-none">
                    {item.value}
                  </span>
                  <div className="h-[2px] flex-grow bg-gradient-to-r from-[#10B981]/20 to-transparent mb-4" />
                </div>

                <h3 className="text-2xl md:text-3xl font-display font-bold uppercase tracking-tight mb-6">
                  {item.label}
                </h3>

                <p className="text-lg text-white/40 font-light leading-relaxed max-w-sm group-hover:text-white/70 transition-colors">
                  "{item.description}"
                </p>
              </div>

              {/* Interactive Internal Glow */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_var(--mouse-x,50%)_var(--mouse-y,50%),rgba(0,210,255,0.05)_0%,transparent_80%)] opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ExperienceSlide = ({ experience, index }) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "start start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["40vh", "0vh"]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const subY = useTransform(scrollYProgress, [0, 1], ["20vh", "0vh"]);

  return (
    <div
      ref={container}
      className="min-h-screen md:h-screen w-full md:sticky top-0 flex items-center justify-center bg-[#070707] perspective-1000 py-20 md:py-0"
    >
      <motion.div
        style={{ y, scale, opacity }}
        className="w-full h-full flex flex-col justify-center px-[5%] md:px-[10%] relative z-10"
      >
        <div className="absolute inset-0 opacity-5 bg-grid pointer-events-none" />

        {/* Background Number - Counter Parallax */}
        <motion.div
          style={{
            y: useTransform(scrollYProgress, [0, 1], ["-10vh", "10vh"]),
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-[0.02] select-none"
        >
          <span className="text-[40vw] font-display font-black leading-none text-white overflow-hidden">
            0{index + 1}
          </span>
        </motion.div>

        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="blob w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-[#10B981] -top-20 -right-20 md:-top-40 md:-right-40 opacity-20"
        />

        <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 relative z-10">
          {/* Timeline Line */}
          <div className="hidden lg:block lg:col-span-1 border-l border-white/10 relative h-full">
            <motion.div
              style={{ scaleY: scrollYProgress }}
              className="absolute top-0 left-[-1px] w-[1px] h-full bg-[#10B981] origin-top"
            />
            <div className="absolute top-0 left-[-4px] w-2 h-2 bg-[#10B981] rounded-full" />
          </div>

          <div className="lg:col-span-11 pl-0 lg:pl-12">
            <motion.div style={{ y: subY }}>
              <RevealText className="text-[#10B981] font-bold text-xs uppercase tracking-[0.8em] mb-8 flex items-center gap-4">
                <span className="w-8 h-[1px] bg-[#10B981]" />
                {experience.period}
                <NodePoint delay={0.5} />
              </RevealText>

              <div className="mb-6 md:mb-12 relative">
                <CornerBracket className="top-0 -left-8 w-8 h-8 opacity-20" />
                <RevealText className="text-[10vw] md:text-[6vw] font-display font-bold uppercase tracking-tighter leading-[0.85] text-white">
                  {experience.role}
                </RevealText>
                <RevealText className="text-2xl md:text-5xl font-display font-light text-white/30 uppercase mt-4">
                  {experience.company}{" "}
                  <span className="text-[#10B981]/20 mx-2 md:mx-4">/</span>{" "}
                  {experience.location}
                </RevealText>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-4 md:gap-y-8 mt-6 md:mt-12 border-t border-white/5 pt-6 md:pt-12 relative">
                <DataLine className="absolute top-0 left-0 w-1/2" delay={0.3} />
                {experience.highlights.map((h, hi) => (
                  <div key={hi} className="flex gap-4 md:gap-6 group">
                    <div className="mt-2 md:mt-3 w-1.5 h-1.5 md:w-2 md:h-2 rounded-full border border-[#10B981]/40 group-hover:bg-[#10B981] transition-colors shrink-0" />
                    <RevealText
                      delay={hi * 0.1}
                      className="text-base md:text-xl text-white/50 font-light leading-relaxed group-hover:text-white/80 transition-colors"
                    >
                      {h}
                    </RevealText>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const AboutSection = () => {
  return (
    <section
      id="about"
      className="py-12 md:py-24 px-[5%] bg-white relative z-10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:grid md:grid-cols-12 gap-8 md:gap-20 items-start md:items-center w-full">
        {/* Profile Image Container */}
        <div className="md:col-span-5 relative group w-full max-w-md md:max-w-none mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10"
          >
            <div className="aspect-[4/5] overflow-hidden bg-gray-100 border border-gray-200 shadow-2xl relative">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop"
                alt="Dr. Shailesh Sivan"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 scale-105 hover:scale-100"
              />
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none"
              />
            </div>

            {/* Philosophy Overlay - HUD Style */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="absolute -bottom-6 left-0 sm:-left-6 md:-left-8 bg-black text-white p-4 sm:p-6 shadow-2xl z-20 max-w-[240px] sm:max-w-[280px]"
            >
              <div className="text-[8px] font-mono text-[#10B981] mb-2 uppercase tracking-[0.3em] overflow-hidden whitespace-nowrap">
                Personal_Philosophy_v2.0
              </div>
              <div className="text-sm sm:text-lg font-display italic leading-tight">
                "{PHILOSOPHY}"
              </div>
            </motion.div>

            {/* HUD Corner Brackets for Image */}
            <CornerBracket className="top-2 left-2 w-full h-full" />
            <NodePoint className="absolute -top-1 -right-1" delay={0.5} />
            <NodePoint className="absolute -bottom-1 -left-1" delay={0.7} />
          </motion.div>

          {/* Subtle decorative blob */}
          <div className="absolute -z-10 -bottom-20 -left-20 w-64 h-64 bg-[#10B981]/10 blur-3xl rounded-full" />
        </div>

        {/* Biography Content */}
        <div className="w-full md:col-span-7 space-y-12">
          <div>
            <SectionTitle label="00 Bio" title="About" />
            <RevealText className="text-xl md:text-3xl font-light leading-relaxed text-gray-600 mt-6 md:mt-12 italic">
              Dr. Shailesh Sivan is a distinguished{" "}
              <span className="text-black font-medium not-italic">
                AI Architect and Researcher
              </span>{" "}
              with over a decade of experience bridging the gap between
              theoretical academia and enterprise-scale implementation.
            </RevealText>
          </div>

          <div className="space-y-6 md:space-y-8 border-l-2 border-[#10B981]/10 pl-6 md:pl-8">
            <RevealText
              delay={0.2}
              className="text-base md:text-lg text-gray-500 font-light leading-relaxed"
            >
              Currently serving as the Principal AI Architect at Laennec AI, he
              specializes in deep learning, computer vision, and quantum
              computing. His mission is to transform the digital era through
              responsible AI innovation, moving beyond simple automation towards
              systems that achieve true cognitive synergy.
            </RevealText>

            <RevealText
              delay={0.3}
              className="text-base md:text-lg text-gray-500 font-light leading-relaxed"
            >
              With a Ph.D. in Computer Science and a history of high-impact
              research (Nature, Elsevier), Dr. Sivan brings a unique blend of
              scientific rigor and engineering precision to every project he
              architects.
            </RevealText>
          </div>

          {/* Social Matrix */}
          <div className="flex flex-wrap gap-4 md:gap-8 pt-4 md:pt-8">
            {SOCIALS.map((social, i) => (
              <Magnetic key={i} strength={0.2}>
                <motion.a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="group flex flex-col gap-1 px-4 py-2"
                >
                  <div className="text-[9px] font-mono text-[#10B981] uppercase tracking-widest flex items-center gap-2">
                    <div className="w-4 h-[1px] bg-[#10B981]/30 group-hover:w-6 transition-all" />
                    {social.platform}
                  </div>
                  <div className="text-sm font-medium text-black group-hover:text-[#10B981] transition-colors pl-6">
                    {social.handle}
                  </div>
                </motion.a>
              </Magnetic>
            ))}
          </div>

          <div className="pt-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="flex items-center gap-4 text-[10px] font-mono uppercase tracking-[0.5em] text-[#10B981]"
            >
              <div className="w-8 h-[1px] bg-[#10B981]" />
              Architect_Profile_Sync_Complete
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ConsultancySection = () => {
  return (
    <section
      id="consultancy"
      className="py-12 md:py-24 px-[5%] bg-white relative z-10"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-4 md:sticky top-32 h-fit">
            <SectionTitle label="02 Industry" title="Consultancy" />
            <RevealText className="text-gray-500 font-light leading-relaxed mt-4 md:mt-8">
              Bridging the gap between frontier research and industrial
              application through strategic advisory and technical leadership.
            </RevealText>
          </div>
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {CONSULTANCIES.map((item, i) => {
                const [name, desc] = item.split(" - ");
                return (
                  <Magnetic key={i} strength={0.1}>
                    <motion.div
                      whileHover={{ y: -5 }}
                      className="p-8 border border-gray-100 bg-gray-50/50 hover:border-[#10B981]/30 hover:bg-white transition-all duration-300 relative group/card"
                    >
                      <CornerBracket className="top-2 left-2 w-4 h-4 opacity-0 group-hover/card:opacity-100 transition-opacity" />
                      <div className="text-[10px] font-mono text-[#10B981] mb-4 uppercase tracking-[0.3em]">
                        Partner_Node_{i + 1}
                      </div>
                      <div className="text-xl font-display font-bold mb-3">
                        {name}
                      </div>
                      <div className="text-sm text-gray-500 font-light leading-relaxed">
                        {desc}
                      </div>
                    </motion.div>
                  </Magnetic>
                );
              })}
            </div>
            {/* Resource Person Stats */}
            <div className="mt-16 p-12 bg-black text-white relative overflow-hidden group">
              <div className="absolute inset-0 bg-grid opacity-20" />
              <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6 md:gap-8">
                <div>
                  <div className="text-[10px] font-mono text-[#10B981] uppercase tracking-[0.4em] mb-4">
                    Extending_Knowledge
                  </div>
                  <div className="text-2xl md:text-4xl font-display font-medium leading-tight">
                    Resource Person for <br className="hidden md:block" />{" "}
                    <span className="text-[#10B981]">
                      160+ Technical Sessions
                    </span>
                  </div>
                </div>
                <div className="text-5xl md:text-6xl font-display font-bold text-white/10 group-hover:text-[#10B981]/20 transition-colors">
                  160+
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const EducationSection = () => {
  return (
    <section
      id="education"
      className="py-12 md:py-24 px-[5%] bg-gray-50 relative z-10"
    >
      <div className="max-w-7xl mx-auto">
        <SectionTitle label="04 Background" title="Education" />
        <div className="space-y-4 md:space-y-6 mt-8 md:mt-16">
          {EDUCATION.map((edu, i) => (
            <Magnetic key={i} strength={0.05}>
              <div className="bg-white/80 backdrop-blur-xl p-8 md:p-12 border border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center group hover:bg-white hover:shadow-2xl hover:shadow-[#10B981]/10 transition-all duration-500 relative overflow-hidden">
                <CornerBracket className="top-4 left-4 w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="max-w-2xl relative z-10">
                  <div className="text-[10px] font-mono text-[#10B981] mb-2 md:mb-4 uppercase tracking-[0.3em] flex items-center gap-4">
                    <NodePoint delay={i * 0.1} />
                    {edu.institution} // {edu.period}
                  </div>
                  <RevealText className="text-xl md:text-4xl font-display font-medium uppercase leading-tight mb-2 md:mb-4">
                    {edu.degree}
                  </RevealText>
                  {edu.details && (
                    <RevealText className="text-xs md:text-sm text-gray-400 font-light italic leading-relaxed">
                      {edu.details}
                    </RevealText>
                  )}
                </div>
                <div className="mt-8 md:mt-0 relative z-10">
                  <div className="w-12 h-12 rounded-full border border-gray-100 flex items-center justify-center group-hover:border-[#10B981]/30 transition-all duration-500 group-hover:rotate-45">
                    <ArrowUpRight
                      size={20}
                      className="text-gray-300 group-hover:text-[#10B981]"
                    />
                  </div>
                </div>
                {/* Decorative DataLine */}
                <DataLine
                  className="absolute bottom-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  delay={0.2}
                />
              </div>
            </Magnetic>
          ))}
        </div>
      </div>
    </section>
  );
};

const ContactFooter = () => {
  return (
    <footer
      id="contact"
      className="py-24 px-[5%] bg-black text-white relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 md:gap-8 items-start mb-24">
          <div className="md:col-span-2">
            <RevealText className="text-[10px] font-mono text-[#10B981] uppercase tracking-[0.5em] mb-8">
              System_Broadcast_Ready
            </RevealText>
            <RevealText className="text-4xl md:text-7xl font-display font-bold uppercase tracking-tighter leading-none mb-12">
              Get in <br className="hidden md:block" />{" "}
              <span className="text-[#10B981]">Touch</span>
            </RevealText>
          </div>

          <div className="space-y-12">
            <div>
              <div className="text-[9px] font-mono text-white/30 uppercase tracking-[0.3em] mb-4 flex items-center gap-4">
                <Mail size={12} className="text-[#10B981]" />
                Direct_Channel
              </div>
              <a
                href={`mailto:${CONTACT.email}`}
                className="text-xl md:text-2xl font-light hover:text-[#10B981] transition-colors underline decoration-white/10 underline-offset-8"
              >
                {CONTACT.email}
              </a>
            </div>
            <div>
              <div className="text-[9px] font-mono text-white/30 uppercase tracking-[0.3em] mb-4 flex items-center gap-4">
                <Smartphone size={12} className="text-[#10B981]" />
                Secure_Line
              </div>
              <a
                href={`tel:${CONTACT.phone.replace(/\s+/g, "")}`}
                className="text-xl md:text-2xl font-light hover:text-[#10B981] transition-colors"
              >
                {CONTACT.phone}
              </a>
            </div>
          </div>

          <div className="space-y-12">
            <div>
              <div className="text-[9px] font-mono text-white/30 uppercase tracking-[0.3em] mb-4 flex items-center gap-4">
                <MapPin size={12} className="text-[#10B981]" />
                Geo_Location
              </div>
              <div className="text-xl md:text-2xl font-light">
                {CONTACT.location} <br />
                <span className="text-white/40">India</span>
              </div>
            </div>
            <div>
              <div className="text-[9px] font-mono text-white/30 uppercase tracking-[0.3em] mb-4 flex items-center gap-4">
                <Globe size={12} className="text-[#10B981]" />
                Digital_Home
              </div>
              <a
                href={`https://${CONTACT.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl md:text-2xl font-light hover:text-[#10B981] transition-colors"
              >
                {CONTACT.website}
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-16 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-[10px] font-mono text-white/20 uppercase tracking-widest">
            &copy; 2026 Shailesh Sivan. All Rights Reserved. // Secured_Node
          </div>
          <div className="flex gap-12">
            {SOCIALS.map((social, i) => (
              <a
                key={i}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] font-mono text-white/40 hover:text-[#10B981] uppercase tracking-widest transition-colors"
              >
                {social.platform}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

const ShaileshSivan = () => {
  const containerRef = useRef(null);
  const workRef = useRef(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const { scrollYProgress } = useScroll();
  const workScroll = useScroll({
    target: workRef,
    offset: ["start end", "end start"],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });
  const scrollWidth = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  return (
    <div
      ref={containerRef}
      className={`relative bg-[#f2f2f2] text-[#0e0e0e] selection:bg-[#10B981] selection:text-white font-sans overflow-x-hidden transition-opacity duration-1000 ${loading ? "opacity-0 h-screen overflow-hidden" : "opacity-100"}`}
    >
      <BackToTop />
      <AnimatePresence>
        {loading && (
          <motion.div
            key="loader"
            exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
            transition={{ duration: 1.5, ease: [0.43, 0.13, 0.23, 0.96] }}
            className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center overflow-hidden"
          >
            {/* Pulsing Core */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="w-96 h-96 bg-[#10B981]/20 rounded-full blur-[100px] absolute"
            />

            <div className="relative text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="text-[#10B981] font-mono text-[10px] uppercase tracking-[0.8em] mb-6"
              >
                Initializing_Neural_Vault
              </motion.div>

              <div className="overflow-hidden">
                <motion.h1
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  className="text-white text-4xl md:text-5xl font-display font-medium tracking-tighter uppercase"
                >
                  Shailesh Sivan
                </motion.h1>
              </div>

              {/* Progress Line */}
              <div className="mt-8 w-64 h-[2px] bg-white/10 relative overflow-hidden">
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 bg-[#10B981]"
                />
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="mt-6 text-white/20 font-mono text-[8px] uppercase tracking-widest"
              >
                Syncing_Biometrics_v3.0.4
              </motion.div>
            </div>

            {/* Corner Accents */}
            <div className="absolute top-12 left-12 w-32 h-32 border-t border-l border-white/10" />
            <div className="absolute bottom-12 right-12 w-32 h-32 border-b border-r border-white/10" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Progress Bar */}
      <motion.div
        className="fixed left-0 top-0 h-1 bg-[#10B981] z-[1001]"
        style={{ width: scrollWidth }}
      />

      {/* HERO */}
      <section
        id="home"
        className="min-h-screen flex flex-col justify-end px-[5%] pt-12 pb-16 md:pt-48 md:pb-24 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
        <motion.div
          animate={{ x: [0, 50, 0], y: [0, -30, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="blob w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-emerald-200 -top-20 md:-top-40 right-10 md:right-20 opacity-30"
        />
        <div className="max-w-7xl mx-auto relative z-10 w-full">
          <RevealText className="text-[12px] font-bold uppercase tracking-[0.5em] text-gray-500 mb-8">
            AI Architect & Researcher
          </RevealText>
          <div className="space-y-0">
            <RevealText className="text-[clamp(2.5rem,14vw,12rem)] font-display font-medium leading-[0.8] tracking-tighter uppercase">
              Shailesh
            </RevealText>
            <RevealText className="text-[clamp(2.5rem,14vw,12rem)] font-display font-medium leading-[0.8] tracking-tighter uppercase italic ml-[0.2em] sm:ml-[0.5em]">
              Sivan
            </RevealText>
          </div>
          <div className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-12 gap-12 items-end">
            <div className="md:col-span-5">
              <RevealText className="text-xl md:text-3xl leading-tight text-gray-800 font-light italic">
                "{SUMMARY}"
              </RevealText>
            </div>
            <div className="md:col-span-7 flex flex-wrap gap-x-8 md:gap-x-12 gap-y-6 justify-center md:justify-end items-center">
              {STATS.map((stat, i) => (
                <div
                  key={i}
                  className="text-center md:text-right min-w-[120px]"
                >
                  <RevealText className="text-5xl md:text-7xl font-display font-bold">
                    {stat.value}
                  </RevealText>
                  <RevealText className="text-[9px] font-bold uppercase tracking-widest text-gray-400">
                    {stat.label}
                  </RevealText>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <AboutSection />

      {/* EXPERTISE */}
      <section
        id="expertise"
        className="py-12 md:py-24 px-[5%] border-t border-gray-200 bg-white relative z-10"
      >
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="blob w-[800px] h-[800px] bg-gray-100 -bottom-40 -left-40 opacity-50"
        />
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 relative z-10 w-full">
          <div className="lg:col-span-4 md:sticky top-32 h-fit">
            <SectionTitle label="01 Expertise" title="Capabilities" />
          </div>
          <div className="lg:col-span-8 space-y-8 md:space-y-16 mt-16 md:mt-0">
            {SKILL_CATEGORIES.map((cat, i) => (
              <div
                key={i}
                className="group border-b border-gray-300 pb-12 md:pb-20 last:border-0"
              >
                <div className="flex justify-between items-end mb-16 relative">
                  <DataLine
                    className="absolute -bottom-8 left-0"
                    delay={i * 0.1}
                  />
                  <RevealText className="text-2xl md:text-5xl lg:text-3xl xl:text-6xl font-display font-medium uppercase tracking-tighter text-[#10B981]">
                    {cat.title}
                  </RevealText>
                  <Magnetic strength={0.3}>
                    <Plus className="text-gray-300 group-hover:text-[#10B981] transition-colors mb-4 cursor-pointer w-8 h-8 md:w-10 md:h-10" />
                  </Magnetic>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                  {cat.skills.map((skill, si) => (
                    <div
                      key={si}
                      className="text-lg md:text-2xl font-light text-gray-400 border-b border-gray-100 py-4 md:py-6 flex justify-between items-center hover:text-black transition-colors"
                    >
                      <RevealText delay={si * 0.05}>{skill}</RevealText>
                      <ArrowUpRight
                        size={20}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ImpactHighlight />

      {/* EXPERIENCE - FULLSCREEN STACKING */}
      <section
        id="work"
        ref={workRef}
        className="relative bg-[#0e0e0e] overflow-hidden"
      >
        <motion.div
          style={{
            x: useTransform(
              workScroll.scrollYProgress,
              [0, 1],
              ["-20%", "20%"],
            ),
            opacity: useTransform(
              workScroll.scrollYProgress,
              [0, 0.2, 0.8, 1],
              [0, 0.1, 0.1, 0],
            ),
          }}
          className="absolute inset-0 flex items-center justify-center whitespace-nowrap pointer-events-none select-none z-0"
        >
          <span className="text-[60vw] font-display font-black uppercase tracking-tighter">
            Path
          </span>
        </motion.div>

        <div className="h-[100vh] relative z-10">
          <motion.div
            style={{
              opacity: useTransform(
                workScroll.scrollYProgress,
                [0, 0.2, 0.8, 1],
                [0.3, 1, 1, 0],
              ),
              scale: useTransform(
                workScroll.scrollYProgress,
                [0, 0.2, 0.9],
                [0.95, 1, 1.1],
              ),
              filter: useTransform(
                workScroll.scrollYProgress,
                [0, 0.2, 0.8, 1],
                ["blur(0px)", "blur(0px)", "blur(0px)", "blur(20px)"],
              ),
              letterSpacing: useTransform(
                workScroll.scrollYProgress,
                [0, 0.3],
                ["0.3em", "0em"],
              ),
            }}
            className="sticky top-0 h-screen w-full flex flex-col items-center justify-center px-[5%] pointer-events-none"
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              className="text-center"
            >
              <div className="text-[#10B981] font-bold text-xs uppercase tracking-[0.8em] mb-12 flex items-center justify-center gap-6">
                <span className="w-12 h-[1px] bg-[#10B981]" />
                02 Path
                <span className="w-12 h-[1px] bg-[#10B981]" />
              </div>
              <h2 className="text-[18vw] md:text-[12vw] font-display font-bold uppercase tracking-tighter leading-[0.8] text-white">
                Experience
              </h2>
            </motion.div>
          </motion.div>
        </div>

        <div className="relative z-20">
          {EXPERIENCES.map((exp, i) => (
            <ExperienceSlide key={i} experience={exp} index={i} />
          ))}
        </div>
      </section>

      {/* PATENTS & ACHIEVEMENTS */}
      <section
        id="patents"
        className="py-12 md:py-24 px-[5%] bg-white relative overflow-hidden"
      >
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="blob w-[600px] h-[600px] bg-green-50 -top-20 right-0 opacity-40"
        />
        <div className="max-w-7xl mx-auto relative z-10">
          <SectionTitle label="03 Innovation" title="Intellect" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 mt-8 md:mt-16">
            <div className="space-y-12 md:space-y-24">
              <RevealText className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-300">
                Granted Patents
              </RevealText>
              {PATENTS.map((pat, i) => (
                <div
                  key={i}
                  className="group cursor-default border-l-2 border-gray-100 pl-12 hover:border-[#10B981] transition-colors"
                >
                  <RevealText className="text-sm font-bold text-[#10B981] mb-4">
                    Patent #{pat.id}
                  </RevealText>
                  <RevealText className="text-3xl font-display font-medium uppercase mb-6">
                    {pat.title}
                  </RevealText>
                  <RevealText className="text-lg text-gray-500 font-light leading-relaxed">
                    {pat.description}
                  </RevealText>
                </div>
              ))}
            </div>
            <div className="space-y-12 md:space-y-24">
              <RevealText className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-300">
                Achievements
              </RevealText>
              <div className="grid grid-cols-1 gap-12">
                {ACHIEVEMENTS.map((ach, i) => (
                  <div key={i} className="flex gap-8">
                    <div className="h-12 w-12 bg-gray-50 rounded-full flex items-center justify-center shrink-0">
                      <Award className="text-gray-300" size={24} />
                    </div>
                    <div>
                      <RevealText className="text-xl font-bold uppercase tracking-tight mb-2">
                        {ach.title}
                      </RevealText>
                      <RevealText className="text-sm text-gray-400 font-light">
                        {ach.description} {ach.year && `(${ach.year})`}
                      </RevealText>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <EducationSection />

      <ConsultancySection />

      {/* RESEARCH */}
      <section id="research" className="py-12 md:py-24 px-[5%] bg-white">
        <div className="max-w-7xl mx-auto">
          <SectionTitle label="06 Science" title="Publications" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-gray-200 border border-gray-200 mt-8 md:mt-16">
            {PUBLICATIONS.map((pub, i) => (
              <div
                key={i}
                className="bg-white p-8 md:p-12 flex flex-col group hover:bg-[#f2f2f2] transition-colors relative"
              >
                <div className="flex flex-wrap gap-2 mb-10">
                  {pub.tags.map((tag, ti) => (
                    <span
                      key={ti}
                      className="text-[8px] font-black tracking-widest uppercase px-3 py-1 border border-gray-200 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-2xl font-display font-medium uppercase tracking-tight mb-auto leading-tight">
                  <RevealText delay={i * 0.05}>{pub.title}</RevealText>
                </h3>
                <div className="mt-16 pt-10 border-t border-gray-100">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-300 mb-4 leading-relaxed">
                    {pub.source}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-light text-gray-400 italic">
                      {pub.year}
                    </span>
                    {pub.doi && (
                      <a
                        href={`https://doi.org/${pub.doi}`}
                        target="_blank"
                        className="text-[#10B981] hover:scale-125 transition-transform"
                      >
                        <ArrowUpRight size={20} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-20 text-center">
            <RevealText className="text-gray-400 text-sm italic">
              + 35 Conference Papers & 5 Book Chapters
            </RevealText>
          </div>
        </div>
      </section>

      <ContactFooter />
    </div>
  );
};

export default ShaileshSivan;
