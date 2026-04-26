import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import { useLenis } from "@studio-freight/react-lenis";
import {
  ArrowRight,
  Heart,
  Target,
  Globe,
  Quote,
  Shield,
  Award,
  Users,
  BookOpen,
  Zap,
  ChevronUp,
} from "lucide-react";

/**
 * Personal Storytelling Design for Partner1 - John Samuel
 * Narrative Arc: Foundation -> Social Impact -> Tourism -> Legacy.
 * Aesthetic: Simple, precise, and premium (Minimalist Luxury).
 */
const Partner1 = () => {
  const containerRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);
  const [vh, setVh] = useState(0);
  const [targetRect, setTargetRect] = useState(null);

  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    // Initial VH
    setVh(window.innerHeight);

    const updateState = () => {
      setScrollY(window.scrollY);
      // Continuously update target rect ensuring we catch it moving
      const el = document.getElementById("morph-target");
      if (el) {
        setTargetRect(el.getBoundingClientRect());
      }
    };

    window.addEventListener("scroll", updateState, { passive: true });
    window.addEventListener("resize", () => {
      setVh(window.innerHeight);
      updateState();
    });

    // Initial call
    updateState();

    return () => {
      window.removeEventListener("scroll", updateState);
      window.removeEventListener("resize", updateState);
    };
  }, []);

  // Animation Progress: 0 to 1 based on first 100vh of scroll
  const progress = Math.min(1, Math.max(0, scrollY / (vh || 1)));

  // Linear interpolation function
  const lerp = (start, end, t) => start * (1 - t) + end * t;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  let morphStyle = {};
  if (targetRect) {
    const startTop = 0;
    const startLeft = 0;
    const startWidth = typeof window !== "undefined" ? window.innerWidth : 1920;
    const startHeight =
      vh || (typeof window !== "undefined" ? window.innerHeight : 1080);

    morphStyle = {
      position: "fixed",
      top: `${lerp(startTop, targetRect.top, progress)}px`,
      left: `${lerp(startLeft, targetRect.left, progress)}px`,
      width: `${lerp(startWidth, targetRect.width, progress)}px`,
      height: `${lerp(startHeight, targetRect.height, progress)}px`,
      borderRadius: `${progress * 24}px`, // Reduced from 50px to match common card radius
      transform: "none",
      zIndex: 50,
      opacity: 1,
      overflow: "hidden",
      pointerEvents: "none",
    };
  } else {
    morphStyle = {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      zIndex: 50,
      opacity: 1,
      overflow: "hidden",
      pointerEvents: "none",
    };
  }

  const chapters = [
    {
      id: "social-development",
      title: "Social Development",
      number: "01",
      subtitle: "Empowering the marginalized through policy and purpose.",
      content:
        "Between 2003 and 2013, John played a pivotal role in initiatives focused on women’s empowerment and HIV-affected communities across Rajasthan. Collaborating with UN Women (UNIFEM), UNICEF, and WHO, he addressed social stigma and policy gaps, establishing district-level networks that provided clinical access and dignity to hundreds of families.",
      icon: <Shield className="w-5 h-5 text-blue-500" />,
      image: "/assets/Partnerships/John Samuel/1.jpg",
      stats: [
        { label: "Years in Rajasthan", value: "10" },
        { label: "Community Networks", value: "Statewide" },
        { label: "Policy Wins", value: "5+" },
      ],
      milestones: [
        "Free antiretroviral treatment advocacy",
        "Education support for affected children",
        "Transport concessions for HIV+ individuals",
        "Statewide awareness campaigns",
      ],
    },
    {
      id: "tourism-strategy",
      title: "Tourism Strategy",
      number: "02",
      subtitle: "Sustainable growth and digital transformation.",
      content:
        "Returning to Kerala in 2014, John applied his strategic networking to the tourism sector. He led business development for premium Ayurvedic resorts and eco-tourism destinations, focusing on international client engagement and digital distribution platforms to expand global market visibility.",
      icon: <Globe className="w-5 h-5 text-blue-500" />,
      image: "/assets/Partnerships/John Samuel/2.jpg",
      events: [
        { name: "Eco-Resort Branding", year: "2015", role: "Business Lead" },
        { name: "Digital Distribution", year: "2018", role: "Strategy" },
        { name: "Global Partnerships", year: "2021", role: "Consultant" },
        { name: "Revenue Optimization", year: "2024", role: "Lead" },
      ],
    },
    {
      id: "philanthropy",
      title: "Philanthropy",
      number: "03",
      subtitle: "Designing for health and early detection.",
      content:
        "Inspired by personal family experiences, John helped establish the Pink Foundation Trust. The trust bridges the gap in women's healthcare by organizing screening camps and awareness programs for breast cancer, leveraging his corporate relations to fund high-impact medical consultations.",
      icon: <Heart className="w-5 h-5 text-blue-500" />,
      image: "/assets/Partnerships/John Samuel/3.JPG",
      focus: [
        "Early Detection Camps",
        "Community Health Advocacy",
        "CSR Integration",
        "Stakeholder Collaboration",
      ],
    },
    {
      id: "hospitality-leadership",
      title: "Hospitality Lead",
      number: "04",
      subtitle: "Branding and strategic expansion at Renai Hotels.",
      content:
        "John’s leadership in the hospitality sector is defined by his work with Renai Hotels & Resorts. He specialized in business goal setting using SMART indicators, driving revenue growth, and establishing integrated marketing strategies that positioned the brand as a leader in premium service delivery.",
      icon: <Award className="w-5 h-5 text-blue-500" />,
      image: "/assets/Partnerships/John Samuel/4.jpg",
      milestones: [
        "Brand positioning for Renai Group",
        "Revenue optimization strategies",
        "International client engagement",
        "Integrated marketing systems",
      ],
    },
    {
      id: "healthcare-innovation",
      title: "Healthcare Strategy",
      number: "05",
      subtitle: "Institutional partnerships and market development.",
      content:
        "In the healthcare sector, John focused on institutional branding and market expansion. He developed critical liaison networks between government bodies and private corporate entities, ensuring that healthcare services reached wider audiences through strategic alliances.",
      icon: <Shield className="w-5 h-5 text-blue-500" />,
      image: "/assets/Partnerships/John Samuel/5.jpg",
      milestones: [
        "Institutional partnership development",
        "Government and corporate liaison",
        "Market audience expansion",
        "Service branding excellence",
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

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemFadeUp = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-[#f8f8f8] text-[#0a0a0a] font-sans selection:bg-blue-600/10 overflow-x-hidden relative"
    >
      {/* Subtle Grain Overlay - ensures pointer events don't get stuck */}
      <div className="fixed inset-0 pointer-events-none z-[9999] opacity-[0.04] mix-blend-multiply bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* 1. THE HERO BACKGROUND (MORPHING) */}
      <div style={morphStyle} className="shadow-2xl">
        <img
          src="/assets/Partnerships/John Samuel/hero-image.png"
          alt="John Samuel"
          className="w-full h-full object-cover object-[85%_20%] md:object-[center_20%] brightness-[0.8]"
        />
        {/* Visual Overlay on Hero Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent" />
      </div>

      <main className="relative">
        {/* 3. HERO SECTION (Centered on Mobile, Left-Aligned on Desktop) */}
        <section className="relative h-screen flex flex-col justify-center items-center md:items-start px-6 md:px-12 lg:px-24 z-[60] pointer-events-none text-center md:text-left">
          {/* Main Content */}
          <div className="max-w-4xl" style={{ opacity: 1 - progress * 2 }}>
            {/* Decorative Label */}
            <div className="flex items-center justify-center md:justify-start gap-4 mb-6">
              <span className="w-8 h-px bg-blue-600"></span>
              <span className="text-[11px] uppercase tracking-[0.25em] text-white/60 font-medium">
                Development Strategist
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-[18vw] md:text-[12vw] lg:text-[10vw] font-display font-black leading-[0.85] tracking-tighter uppercase text-white pointer-events-auto filter drop-shadow-2xl">
              John
              <br />
              <span className="text-blue-600">Samuel</span>
            </h1>

            {/* Tagline */}
            <p className="mt-8 text-lg md:text-xl text-white/70 font-light max-w-md leading-relaxed mx-auto md:mx-0">
              Journalism. Media. Perspective.
              <br />
              <span className="text-white font-medium">
                A trusted voice in social development.
              </span>
            </p>
          </div>

          {/* Bottom Right - Scroll Indicator */}
          <div
            className="absolute bottom-12 right-6 md:right-12 lg:right-24 flex flex-col items-center gap-2 pointer-events-auto cursor-pointer group"
            style={{ opacity: 1 - progress * 3 }}
            onClick={() =>
              document
                .getElementById("foundation")
                .scrollIntoView({ behavior: "smooth" })
            }
          >
            <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 group-hover:text-white transition-colors">
              Scroll
            </span>
            <div className="w-px h-12 bg-gradient-to-b from-white/60 to-transparent animate-pulse"></div>
          </div>
        </section>

        {/* --- EARLY FOUNDATION --- */}
        <section
          id="foundation"
          className="py-12 md:py-20 bg-white border-b border-black/5 relative z-10"
        >
          <div className="w-full px-6 md:px-12">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={staggerContainer}
              className="grid md:grid-cols-12 gap-12 items-start"
            >
              <motion.div
                variants={itemFadeUp}
                className="md:col-span-4 relative text-center md:text-left"
              >
                <span className="text-blue-600 text-[10px] font-black tracking-[0.4em] uppercase block mb-4">
                  Foundation
                </span>
                <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-none">
                  The Early <br /> Chapters.
                </h2>
                <div className="mt-8 md:mt-12 h-[1px] w-20 bg-blue-600 mx-auto md:mx-0" />

                {/* Landing Anchor for Morphing Image Effect */}
                <div
                  id="morph-target"
                  className="mt-12 md:mt-20 flex w-full aspect-[4/3] bg-gray-50/50 border border-dashed border-black/5 rounded-2xl items-center justify-center overflow-hidden"
                >
                  <span className="text-[10px] text-gray-300 font-black uppercase tracking-widest px-4 text-center">
                    Vision Frames Here
                  </span>
                </div>
              </motion.div>
              <div className="md:col-span-8 grid md:grid-cols-2 gap-12 text-center md:text-left">
                <motion.div
                  variants={itemFadeUp}
                  className="space-y-6 flex flex-col items-center md:items-start text-center md:text-left"
                >
                  <BookOpen className="text-blue-500 w-8 h-8" />
                  <h3 className="text-2xl font-black uppercase">
                    Academic Roots
                  </h3>
                  <p className="text-gray-600 font-light leading-relaxed">
                    Driven by a deep interest in social development, John earned
                    his Master’s Degree in Social Work (MSW) from GRD College of
                    Social Sciences, Coimbatore—a foundation that shaped his
                    mission to work for marginalized communities.
                  </p>
                </motion.div>
                <motion.div
                  variants={itemFadeUp}
                  className="space-y-6 flex flex-col items-center md:items-start text-center md:text-left"
                >
                  <Users className="text-blue-500 w-8 h-8" />
                  <h3 className="text-2xl font-black uppercase">
                    YMCA trivandrum
                  </h3>
                  <p className="text-gray-600 font-light leading-relaxed">
                    He began his professional career as Assistant Secretary at
                    YMCA, Trivandrum. This role provided his first exposure to
                    multi-stakeholder coordination, working closely with
                    government departments and community hubs on grassroots
                    social programs.
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* --- STORY CHAPTERS --- */}
        {chapters.map((chapter, i) => (
          <section
            key={chapter.id}
            className={`py-12 md:py-20 overflow-hidden ${
              i % 2 === 0 ? "bg-[#fcfcfc]" : "bg-white"
            }`}
          >
            <div className="w-full px-6 md:px-12">
              <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center overflow-hidden">
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  className={`space-y-8 md:space-y-12 ${i % 2 !== 0 ? "md:order-2" : ""} flex flex-col items-center md:items-start text-center md:text-left`}
                >
                  <div className="flex items-center justify-center md:justify-start gap-6">
                    <span className="text-blue-500 text-4xl font-black opacity-20">
                      {chapter.number}
                    </span>
                    <div className="h-[1px] w-20 bg-blue-500/30" />
                    {chapter.icon}
                  </div>

                  <h2 className="text-4xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85] break-words max-w-full">
                    {chapter.title.split(" ").map((word, idx) => (
                      <span key={idx} className="block overflow-hidden">
                        <motion.span variants={textReveal} className="block">
                          {word}
                        </motion.span>
                      </span>
                    ))}
                  </h2>

                  <div className="space-y-4 md:space-y-8 flex flex-col items-center md:items-start">
                    <p className="text-xl text-gray-700 font-light leading-relaxed max-w-lg italic">
                      {chapter.subtitle}
                    </p>
                    <p className="text-gray-800 leading-relaxed font-light max-w-xl">
                      {chapter.content}
                    </p>
                  </div>

                  {chapter.milestones && (
                    <ul className="space-y-4 pt-8 w-full flex flex-col items-center md:items-start text-center md:text-left">
                      {chapter.milestones.map((m, idx) => (
                        <li
                          key={idx}
                          className="flex items-start md:items-center gap-4 text-xs md:text-sm font-medium uppercase tracking-tight text-gray-700 max-w-md"
                        >
                          <Zap
                            size={14}
                            className="text-blue-500 mt-0.5 md:mt-0 flex-shrink-0"
                          />
                          <span>{m}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {chapter.stats && (
                    <div className="flex flex-wrap justify-center md:justify-start gap-12 pt-12 border-t border-black/5 w-full">
                      {chapter.stats.map((stat, idx) => (
                        <div
                          key={idx}
                          className="flex flex-col items-center md:items-start"
                        >
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
                          <span className="text-[9px] text-blue-500 uppercase">
                            {event.role}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>

                <div
                  className={`relative ${i % 2 !== 0 ? "md:order-1" : ""} flex justify-center group/img w-full`}
                >
                  <div className="relative overflow-hidden w-full max-w-2xl h-full aspect-[3/4] md:aspect-[2/3] max-h-[90vh] shadow-[0_40px_100px_rgba(0,0,0,0.15)] bg-gray-100">
                    <img
                      src={chapter.image}
                      alt={chapter.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <motion.span
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 0.05 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 1.5 }}
                    className={`absolute top-0 ${i % 2 === 0 ? "left-0" : "right-0"} text-[20vw] font-black pointer-events-none`}
                  >
                    {chapter.number}
                  </motion.span>
                </div>
              </div>
            </div>
          </section>
        ))}

        {/* --- CORE COMPETENCIES --- */}
        <section className="py-12 md:py-20 bg-gray-50 border-y border-black/5">
          <div className="w-full px-6 md:px-12">
            <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-20 gap-8 text-center md:text-left">
              <div className="max-w-xl">
                <span className="text-blue-600 text-[10px] font-black tracking-[0.4em] uppercase block mb-4">
                  06 — Expertise
                </span>
                <h2 className="text-4xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9]">
                  Core <br /> Competencies.
                </h2>
              </div>
              <p className="text-gray-500 font-light text-xl max-w-sm">
                Strategic expertise across multiple sectors, driving sustainable
                growth and market leadership.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
              {[
                {
                  title: "Business Strategy",
                  desc: "Goal setting and SMART indicators for organizational success.",
                },
                {
                  title: "Strategic Partnerships",
                  desc: "Building high-impact alliances and stakeholder relationships.",
                },
                {
                  title: "Revenue Growth",
                  desc: "Identifying and capturing new market opportunities.",
                },
                {
                  title: "Digital Marketing",
                  desc: "Integrated social media and audience development strategies.",
                },
                {
                  title: "Market Expansion",
                  desc: "Executing strategies for global market visibility.",
                },
                {
                  title: "Liaison & Advocacy",
                  desc: "Bridging communication between government and corporate bodies.",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white p-10 border border-black/5 hover:bg-blue-600 group transition-all duration-500 flex flex-col items-center md:items-start text-center md:text-left"
                >
                  <h4 className="text-xl font-black uppercase mb-4 group-hover:text-white transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-gray-500 font-light group-hover:text-blue-100 transition-colors">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 md:py-20 bg-[#0a0a0a] text-white">
          <div className="w-full px-6 md:px-12">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="mb-24 flex flex-col items-center md:items-start text-center md:text-left"
            >
              <span className="text-blue-500 text-[10px] font-black tracking-[0.4em] uppercase block mb-4">
                Milestones
              </span>
              <h2 className="text-4xl md:text-8xl font-black tracking-tighter uppercase leading-none">
                Impact in <br /> Action.
              </h2>
            </motion.div>

            <div className="flex flex-col gap-[20vh] pb-[20vh]">
              {[
                {
                  year: "2012",
                  loc: "JAIPUR",
                  title: "Charity Cricket Match",
                  desc: "John conceptualized and organized a landmark charity cricket match at the Sawai Mansingh Stadium. The event brought together corporate leaders, media, and celebrities, raising significant funds for HIV-affected children and receiving statewide recognition.",
                  z: "z-[10]",
                  top: "top-32",
                },
                {
                  year: "2013",
                  loc: "RAJASTHAN",
                  title: "World AIDS Day Campaign",
                  desc: "Engineered an awareness campaign that bridged the gap between HIV+ communities and mainstream society. The campaign engaged hundreds of participants, reducing stigma through large-scale public discourse.",
                  z: "z-[20]",
                  top: "top-40",
                },
                {
                  year: "2016",
                  loc: "ATHIRAPPILLY",
                  title: "Tribal Socio-Economic Studies",
                  desc: "Facilitated a collaboration with Rajagiri School of Social Work, enabling students to study and highlight the needs of tribal settlements. This initiative integrated social welfare into the local eco-tourism model.",
                  z: "z-[30]",
                  top: "top-48",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.5 }}
                  variants={itemFadeUp}
                  className={`sticky top-20 md:${item.top} ${item.z} bg-[#111] p-8 md:p-20 rounded-3xl border border-white/5 shadow-[0_-20px_50px_rgba(0,0,0,0.5)] group flex flex-col items-center md:items-start text-center md:text-left`}
                >
                  <div className="flex items-center justify-center md:justify-start gap-4 mb-8">
                    <div className="w-12 h-[1px] bg-blue-500" />
                    <span className="font-mono text-xs text-blue-500">
                      {item.year} — {item.loc}
                    </span>
                  </div>
                  <h3 className="text-3xl md:text-6xl font-black uppercase mb-8 group-hover:text-blue-500 transition-colors leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 font-light text-lg md:text-xl leading-relaxed max-w-2xl">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* --- GLOBAL FOOTPRINT GALLERY --- */}
        <section className="py-12 md:py-20 bg-white">
          <div className="w-full px-6 md:px-12">
            <div className="grid md:grid-cols-2 gap-20 items-center md:items-end mb-16 text-center md:text-left">
              <div className="max-w-xl mx-auto md:mx-0">
                <span className="text-blue-600 text-[10px] font-black tracking-[0.4em] uppercase block mb-4">
                  07 — Vision
                </span>
                <h2 className="text-4xl md:text-8xl font-black tracking-tighter uppercase leading-none text-gray-900">
                  Global <br /> Footprint.
                </h2>
              </div>
              <p className="text-gray-500 font-light text-xl leading-relaxed max-w-md mx-auto md:mx-0">
                From the arid social landscapes of Rajasthan to the emerald
                tourism hubs of Kerala, John's journey is a testament to
                adaptability—building bridges between business excellence and
                grassroots humanity across diverse cultural ecosystems.
              </p>
            </div>

            {/* Regional Impact Grid */}
            <div className="grid md:grid-cols-3 gap-12 pt-16 border-t border-black/5 text-center md:text-left">
              <div className="space-y-4 flex flex-col items-center md:items-start">
                <h3 className="text-blue-600 font-black text-[10px] uppercase tracking-[0.2em]">
                  North India (2003—2013)
                </h3>
                <h4 className="text-2xl font-black uppercase">Rajasthan</h4>
                <p className="text-gray-600 font-light leading-relaxed">
                  A decade-long tenure in Jaipur and rural Rajasthan,
                  orchestrating social change through UN Women and UNICEF
                  initiatives that impacted thousands of marginalized lives.
                </p>
              </div>
              <div className="space-y-4 flex flex-col items-center md:items-start">
                <h3 className="text-blue-600 font-black text-[10px] uppercase tracking-[0.2em]">
                  South India (2014—Present)
                </h3>
                <h4 className="text-2xl font-black uppercase">Kerala</h4>
                <p className="text-gray-600 font-light leading-relaxed">
                  Strategic leadership in Kochi and Trivandrum’s elite
                  hospitality sectors, redefining tourism branding, sustainable
                  development models, and institutional healthcare partnerships.
                </p>
              </div>
              <div className="space-y-4 flex flex-col items-center md:items-start">
                <h3 className="text-blue-600 font-black text-[10px] uppercase tracking-[0.2em]">
                  Global Perspective
                </h3>
                <h4 className="text-2xl font-black uppercase">International</h4>
                <p className="text-gray-600 font-light leading-relaxed">
                  Consulting for global eco-tourism brands and digital
                  distribution platforms, expanding the reach of Indian heritage
                  to international markets through strategic alliances.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* --- STRATEGIC VISION & OBJECTIVE --- */}
        <section className="py-12 md:py-20 bg-gray-50">
          <div className="w-full px-6 md:px-12">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={staggerContainer}
              className="max-w-4xl"
            >
              <motion.span
                variants={itemFadeUp}
                className="text-blue-600 text-[10px] font-black tracking-[0.4em] uppercase block mb-4"
              >
                Philosophy
              </motion.span>
              <motion.h2
                variants={itemFadeUp}
                className="text-4xl md:text-8xl font-black tracking-tighter uppercase leading-none mb-12"
              >
                Career <br /> Objective.
              </motion.h2>

              <motion.div
                variants={itemFadeUp}
                className="space-y-12 flex flex-col items-center md:items-start text-center md:text-left"
              >
                <motion.p
                  variants={textReveal}
                  className="text-2xl md:text-3xl text-gray-800 font-light leading-relaxed italic mb-12 origin-left"
                >
                  "Acquire and continually update domain knowledge... so as to
                  benefit the organization I work for and myself. To leverage
                  strategic partnerships and integrated marketing expertise to
                  drive sustainable organizational growth."
                </motion.p>

                <motion.div
                  variants={staggerContainer}
                  className="grid md:grid-cols-2 gap-12 border-t border-black/5 pt-20"
                >
                  <motion.div
                    variants={itemFadeUp}
                    className="space-y-6 flex flex-col items-center md:items-start text-center md:text-left"
                  >
                    <h3 className="text-sm font-black uppercase tracking-widest text-blue-600">
                      Professional Creed
                    </h3>
                    <p className="text-gray-600 font-light leading-relaxed">
                      John believe's that every successful initiative begins
                      with a clear goal and goal-oriented planning. By
                      prioritizing stakeholder collaboration, he ensures that
                      projects achieve excellence without compromising their
                      human core.
                    </p>
                  </motion.div>
                  <motion.div
                    variants={staggerContainer}
                    className="grid grid-cols-2 gap-8 text-center md:text-left"
                  >
                    <motion.div variants={itemFadeUp}>
                      <h4 className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-2">
                        Location
                      </h4>
                      <p className="text-sm font-bold uppercase">
                        Kochi, Kerala
                      </p>
                    </motion.div>
                    <motion.div variants={itemFadeUp}>
                      <h4 className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-2">
                        Faith
                      </h4>
                      <p className="text-sm font-bold uppercase">Orthodox</p>
                    </motion.div>
                    <motion.div variants={itemFadeUp}>
                      <h4 className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-2">
                        Age
                      </h4>
                      <p className="text-sm font-bold uppercase">47 Years</p>
                    </motion.div>
                    <motion.div variants={itemFadeUp}>
                      <h4 className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-2">
                        Contact
                      </h4>
                      <p className="text-[10px] font-bold">9846935555</p>
                    </motion.div>
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* --- FOOTER: Redesigned --- */}
        <footer className="py-12 md:py-20 bg-[#0a0a0a] text-white overflow-hidden">
          <div className="w-full px-6 md:px-12 grid md:grid-cols-2 gap-12 md:gap-20">
            <div className="space-y-8 md:space-y-12 flex flex-col items-center md:items-start text-center md:text-left">
              <h2 className="text-5xl md:text-[10rem] font-black tracking-tighter leading-none opacity-5 uppercase break-words w-full">
                LET'S <br /> ARCHITECT.
              </h2>
              <p className="text-lg md:text-xl text-gray-700 font-light max-w-sm">
                Strategic Consulting. Social Development. Sustainable Tourism.
              </p>
            </div>

            <div className="flex flex-col justify-between items-center md:items-end text-center md:text-right">
              <div className="space-y-8 md:space-y-12 w-full">
                <div>
                  <h3 className="text-sm font-black uppercase tracking-widest text-blue-600 mb-4">
                    Strategic Inquiries
                  </h3>
                  <p className="text-2xl md:text-4xl font-black uppercase tracking-tight leading-tight break-words">
                    Collaboration for <br className="hidden md:block" /> Social
                    Impact
                  </p>
                </div>
                <div className="space-y-6">
                  <p className="text-gray-500 font-light max-w-xs mx-auto md:ml-auto">
                    Focused on creating shared value through policy advocacy and
                    sustainable business strategies.
                  </p>
                  <div className="flex flex-wrap justify-center md:justify-end gap-3 md:gap-6 text-[10px] font-black uppercase tracking-widest text-gray-400">
                    <span>Social Development</span>
                    <span className="opacity-20">•</span>
                    <span>Tourism Strategy</span>
                  </div>
                </div>
              </div>
              <div className="pt-16 md:pt-0 w-full">
                <span className="text-[8px] md:text-[9px] font-black tracking-widest md:tracking-[0.5em] uppercase text-gray-300 block">
                  © MMXXIV — PURPOSE & STRATEGY — KOCHI, INDIA
                </span>
              </div>
            </div>
          </div>
        </footer>

        {/* --- BACK TO TOP BUTTON (Modern Redesign) --- */}
        <AnimatePresence>
          {scrollY > vh * 0.5 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={scrollToTop}
              className="fixed bottom-10 right-10 z-[100] cursor-pointer group"
            >
              {/* Progress Ring Background */}
              <div className="relative w-14 h-14 bg-black/80 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.3)] overflow-hidden transition-colors group-hover:bg-black">
                {/* SVG Ring */}
                <svg className="absolute inset-0 w-full h-full -rotate-90">
                  <motion.circle
                    cx="28"
                    cy="28"
                    r="26"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="transparent"
                    className="text-blue-600/20"
                  />
                  <motion.circle
                    cx="28"
                    cy="28"
                    r="26"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="transparent"
                    strokeDasharray="163.36" // 2 * PI * 26
                    style={{
                      pathLength: smoothProgress,
                    }}
                    className="text-blue-600"
                  />
                </svg>

                {/* Icon */}
                <ChevronUp
                  size={20}
                  className="text-white relative z-10 transition-transform group-hover:-translate-y-1"
                />
              </div>

              {/* Tooltip (Optional Premium Detail) */}
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-md px-3 py-1 rounded-md text-[9px] font-black uppercase tracking-widest text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-white/5">
                Back to Top
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default Partner1;

