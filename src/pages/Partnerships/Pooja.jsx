import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Scale,
  FileText,
  ShieldCheck,
  Gavel,
  BookOpenText,
  Compass,
  Mail,
  ArrowUpRight,
  ChevronDown,
  MapPin,
  Circle,
  Plus,
} from "lucide-react";

/* ============================================================
   IMAGE IMPORTS
   ------------------------------------------------------------
   Replace these paths with the correct relative path to wherever
   you place the three supplied images inside your React project
   (e.g. `src/assets/...`). If you are using Create React App or
   Vite, importing like this lets the bundler fingerprint/optimise
   the files. If you'd rather keep them in /public, delete these
   imports and reference the files directly by string, e.g.
   src="/images/headshot.jpeg".
============================================================ */

/* ============================================================
   DATA
============================================================ */

const IDENTITY_TAGS = [
  "Commercial Contracts",
  "Corporate & Business Advisory",
  "Regulatory Compliance",
  "Risk Management",
  "Litigation & Dispute Resolution",
  "Data Protection & Privacy",
  "Corporate Governance",
  "Contract Lifecycle Management",
];

const FEATURED_HIGHLIGHTS = [
  "Commercial agreements & negotiation",
  "Strategic legal advice",
  "Litigation management",
  "Regulatory compliance",
  "Legal risk mitigation",
  "Contract management systems",
  "External counsel management",
  "Governance & management reporting",
];

const EXPERTISE = [
  {
    n: "01",
    title: "Commercial & Corporate",
    desc: "Advisory across commercial transactions, corporate structuring, and day-to-day business decision-making.",
    Icon: Compass,
  },
  {
    n: "02",
    title: "Contracts & Negotiation",
    desc: "Drafting, reviewing, and negotiating agreements that protect commercial interests without stalling deals.",
    Icon: FileText,
  },
  {
    n: "03",
    title: "Litigation & Disputes",
    desc: "Managing disputes end-to-end, from early risk assessment through resolution and enforcement.",
    Icon: Gavel,
  },
  {
    n: "04",
    title: "Compliance & Risk",
    desc: "Building compliance frameworks that anticipate regulatory change rather than react to it.",
    Icon: ShieldCheck,
  },
  {
    n: "05",
    title: "Governance & Documentation",
    desc: "Corporate governance, board reporting, and the documentation discipline that keeps it defensible.",
    Icon: Scale,
  },
  {
    n: "06",
    title: "Legal Research & Strategy",
    desc: "Deep research translated into strategic positions — for litigation, for the business, for the board.",
    Icon: BookOpenText,
  },
];

const TIMELINE = [
    {
        org:"Profand Vayalat Marine Exports Pvt. Ltd. | Vayalat Mahindra Automobiles | Vayalat HondaMotors",
        role:"Organizational Development & Legal Advisor",
        period:"January 2026 – Present",
        detail:"Serving as Legal Advisor across a group of companies operating in the automotive and marinesectors."
    },
  {
    org: "P&B Legal",
    role: "Associate",
    period: "Oct 2024 — Dec 2025",
    detail:
      "Advised on commercial matters and dispute resolution, building the litigation-management discipline that now underpins her in-house work.",
  },
  {
    org: "BJ Law Offices LLP",
    role: "Legal Associate",
    period: "Jan 2023 — Jun 2023",
    detail:
      "Supported corporate and commercial casework across contract review, negotiation, and client advisory.",
  },
  {
    org: "Faisal Chambers",
    role: "Paralegal",
    period: "Nov 2021 — Dec 2022",
    detail:
      "Grounded early practice in case preparation, legal research, and chambers-level litigation support.",
  },
  {
    org: "Lancaster University Law Society",
    role: "Student Legal Advisor",
    period: "Sep 2020 — Jul 2021",
    detail:
      "Provided peer legal guidance while reading Commercial Law, the first step toward a dual-qualified practice.",
  },
];

const EDUCATION = [
  {
    n: "01",
    title: "LLM Legal Practice (Bar)",
    sub: "Merit — BPP University",
  },
  {
    n: "02",
    title: "LLB (Hons) Commercial Law",
    sub: "Upper Second Class (2:1) — Lancaster University",
  },
  {
    n: "03",
    title: "PG Diploma, Law Bridge Course",
    sub: "India International University of Legal Research & Education",
  },
  {
    n: "04",
    title: "Barrister-at-Law",
    sub: "England & Wales (Unregistered)",
  },
  {
    n: "05",
    title: "Advocate",
    sub: "India",
  },
];

const PUBLICATIONS = [
  {
    year: "2023",
    title: "White Paper — G20 Y20: The Future of Work 2.0",
    subtitle: "Contract Law, Intellectual Property Law, and Data Privacy in AI Disputes",
  },
  {
    year: "2024",
    title:
      "Article (2024)",
    subtitle: "Borrowers' Right of Redemption under the SARFAESI Act, 2002"
  },
];

const RECOGNITION = [
  "Lancaster Gold Award",
  "Gold Standard Student Representative — Lancaster University Law School",
];

/* ============================================================
   SHARED UI ATOMS
============================================================ */

function Eyebrow({ children }) {
  return (
    <span className="inline-flex items-center gap-2 text-[11px] sm:text-xs uppercase tracking-[0.35em] text-orange-400/80 font-medium">
      <span className="h-px w-6 bg-orange-500/70" />
      {children}
    </span>
  );
}

function SectionNumber({ children }) {
  return (
    <span
      className="font-black leading-none text-transparent select-none"
      style={{
        WebkitTextStroke: "1px rgba(255,122,0,0.35)",
        fontSize: "clamp(3rem, 9vw, 7rem)",
      }}
    >
      {children}
    </span>
  );
}

function GrainOverlay() {
  return (
    <svg
      className="pointer-events-none fixed inset-0 z-[60] h-full w-full opacity-[0.05] mix-blend-overlay"
      aria-hidden="true"
    >
      <filter id="grainFilter">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.9"
          numOctaves="2"
          stitchTiles="stitch"
        />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#grainFilter)" />
    </svg>
  );
}

function Embers({ count = 14 }) {
  const particles = Array.from({ length: count });
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {particles.map((_, i) => {
        const left = (i * 137.5) % 100;
        const delay = (i % 7) * 1.3;
        const duration = 9 + (i % 5) * 2.4;
        const size = 2 + (i % 3);
        return (
          <span
            key={i}
            className="absolute rounded-full bg-orange-400/70 shadow-[0_0_8px_2px_rgba(255,122,0,0.55)] animate-ember"
            style={{
              left: `${left}%`,
              bottom: "-5%",
              width: size,
              height: size,
              animationDelay: `${delay}s`,
              animationDuration: `${duration}s`,
            }}
          />
        );
      })}
    </div>
  );
}

function GlowLine({ className = "" }) {
  return (
    <motion.div
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      className={`h-px w-full origin-left bg-gradient-to-r from-transparent via-orange-500 to-transparent shadow-[0_0_20px_2px_rgba(255,90,0,0.6)] ${className}`}
    />
  );
}

/* ============================================================
   HERO
============================================================ */

function Hero() {
  const ref = useRef(null);
  const prefersReduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const handleMouseMove = (e) => {
    if (prefersReduced) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: px * 10, y: py * 10 });
  };

  const keywords = ["Contracts", "Governance", "Compliance", "Advisory", "Disputes"];

  return (
    <header
      ref={ref}
      onMouseMove={handleMouseMove}
      className="relative flex min-h-[100svh] w-full flex-col overflow-hidden bg-[#050505]"
    >
      {/* background outlined typography */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center select-none">
        <span
          className="font-black leading-none tracking-tighter text-transparent"
          style={{
            WebkitTextStroke: "1.5px rgba(255,90,0,0.16)",
            fontSize: "clamp(6rem, 26vw, 22rem)",
          }}
        >
          POOJA
        </span>
      </div>

      <Embers />

      {/* warm horizon glow */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-orange-600/25 via-orange-500/5 to-transparent" />
      <div className="pointer-events-none absolute bottom-[18%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/80 to-transparent shadow-[0_0_40px_6px_rgba(255,90,0,0.5)]" />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-6 pt-28 sm:px-10 lg:px-16">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Text column */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <Eyebrow>Ernakulam, Kerala · India</Eyebrow>
            </motion.div>

            <motion.h1
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
              }}
              className="mt-6 font-black leading-[0.95] tracking-tight text-[#f5f2ec]"
              style={{ fontSize: "clamp(2.5rem, 6.5vw, 5.5rem)" }}
            >
              {["Corporate Legal", "Advisor."].map((line, i) => (
                <motion.span
                  key={i}
                  variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="block"
                >
                  {line}
                </motion.span>
              ))}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55 }}
              className="mt-3 text-lg font-medium uppercase tracking-[0.25em] text-orange-400"
            >
              Barrister <span className="text-[#f5f2ec]/30">•</span> Advocate
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7 }}
              className="mt-6 max-w-md text-base leading-relaxed text-[#f5f2ec]/60"
            >
              Dual-qualified across England &amp; Wales and India, working at
              the intersection of commercial law and business strategy —
              where contracts, compliance, and governance decide what a
              company can actually do.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.85 }}
              className="mt-8 flex flex-wrap items-center gap-6"
            >
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 border border-orange-500/60 px-6 py-3 text-sm font-semibold uppercase tracking-widest text-[#f5f2ec] transition-colors hover:bg-orange-500/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400"
              >
                Get in touch
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              <span className="inline-flex items-center gap-2 text-sm text-[#f5f2ec]/50">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-500 opacity-60" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-orange-500" />
                </span>
                Available for select advisory work
              </span>
            </motion.div>

            <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2">
              {keywords.map((k, i) => (
                <motion.span
                  key={k}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1 + i * 0.08 }}
                  className="text-[11px] uppercase tracking-[0.3em] text-[#f5f2ec]/30"
                >
                  {k}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Portrait column */}
          <motion.div
            style={{ y: prefersReduced ? 0 : y, opacity }}
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="relative mx-auto aspect-[4/5] w-full max-w-sm lg:max-w-none"
          >
            <div
              className="absolute -inset-4 rounded-none border border-orange-500/20"
              aria-hidden="true"
            />
            <div
              className="relative h-full w-full overflow-hidden"
              style={{
                transform: `perspective(1000px) rotateY(${tilt.x}deg) rotateX(${-tilt.y}deg)`,
                transition: "transform 0.2s ease-out",
                clipPath:
                  "polygon(4% 0%, 100% 0%, 100% 96%, 96% 100%, 0% 100%, 0% 4%)",
              }}
            >
              <img
                src="https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/images/Team/d73fe7ce-993c-48c4-80e4-ce23f4ea9398.png"
                alt="Portrait of Pooja Nathanvalappil Sathish Kumar, Corporate Legal Advisor"
                className="h-full w-full object-cover"
                style={{
                  filter: "grayscale(15%) contrast(1.08) brightness(0.92)",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-orange-500/10" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/40 via-transparent to-transparent" />
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="relative z-10 mx-auto mb-8 flex flex-col items-center gap-2 text-[#f5f2ec]/40"
      >
        <span className="text-[10px] uppercase tracking-[0.4em]">Scroll</span>
        <motion.div
          animate={prefersReduced ? {} : { y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        >
          <ChevronDown className="h-4 w-4" />
        </motion.div>
      </motion.div>
    </header>
  );
}

/* ============================================================
   PROFESSIONAL IDENTITY
============================================================ */

function IdentitySection() {
  const words = ["LEGAL.", "BUSINESS.", "STRATEGY."];
  return (
    <section
      id="identity"
      className="relative border-t border-white/5 bg-[#050505] px-6 py-28 sm:px-10 lg:px-16"
      aria-label="Professional identity"
    >
      <div className="mx-auto max-w-7xl">
        <Eyebrow>Professional identity</Eyebrow>

        <div className="mt-8 grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            {words.map((w, i) => (
              <motion.div
                key={w}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="font-black leading-[0.92] tracking-tight text-[#f5f2ec]"
                style={{ fontSize: "clamp(2.4rem, 7vw, 6rem)" }}
              >
                {w.split("").map((char, j) => (
                  <span
                    key={j}
                    className={i === 1 ? "text-orange-500" : ""}
                  >
                    {char}
                  </span>
                ))}
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7 }}
            className="max-w-md text-base leading-relaxed text-[#f5f2ec]/60"
          >
            A dual-qualified legal professional who moves fluidly between
            courtroom and boardroom — reading commercial risk the way a
            barrister reads a case, and building governance the way a
            business leader builds a company.
          </motion.p>
        </div>

        <div className="mt-16 flex flex-wrap gap-3">
          {IDENTITY_TAGS.map((tag, i) => (
            <motion.span
              key={tag}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="rounded-none border border-orange-500/30 bg-orange-500/[0.04] px-4 py-2 text-xs uppercase tracking-wider text-[#f5f2ec]/80 transition-colors hover:border-orange-500/70 hover:bg-orange-500/10"
            >
              {tag}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   FEATURED ROLE
============================================================ */

function FeaturedRole() {
  return (
    <section
      id="featured-role"
      className="relative overflow-hidden border-t border-white/5 bg-[#050505] py-28"
      aria-label="Current role"
    >
      <div className="mx-auto grid max-w-7xl gap-0 px-6 sm:px-10 lg:grid-cols-2 lg:px-16">
        
          <img
            src="https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/images/Team/956830cc-bc1d-4a6f-81d3-d3d464beea86.png"
            alt="Cinematic editorial portrait of Pooja Nathanvalappil Sathish Kumar as Legal Advisor"
            className="h-auto w-full"
          />

        <div className="relative order-1 flex flex-col justify-center py-14 lg:order-2 lg:pl-16">
          <Eyebrow>Featured role — Present</Eyebrow>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7 }}
            className="mt-6 font-black leading-[1.02] tracking-tight text-[#f5f2ec]"
            style={{ fontSize: "clamp(1.9rem, 4vw, 3.1rem)" }}
          >
            Organizational Development
            <span className="text-orange-500"> &amp; Legal Advisor</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-4 text-sm leading-relaxed text-[#f5f2ec]/50"
          >
            Profand Vayalat Marine Exports Pvt. Ltd. · Vayalat Mahindra
            Automobiles · Vayalat Honda Motors
            <br />
            <span className="text-orange-400/80">January 2026 — Present</span>
          </motion.p>

          <GlowLine className="mt-8" />

          <ul className="mt-8 grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
            {FEATURED_HIGHLIGHTS.map((h, i) => (
              <motion.li
                key={h}
                initial={{ opacity: 0, x: -14 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="flex items-start gap-2 text-sm text-[#f5f2ec]/70"
              >
                <Plus className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-orange-500" aria-hidden="true" />
                {h}
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   EXPERTISE GRID
============================================================ */

function ExpertiseSection() {
  return (
    <section
      id="expertise"
      className="relative border-t border-white/5 bg-[#050505] px-6 py-28 sm:px-10 lg:px-16"
      aria-label="Areas of expertise"
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <Eyebrow>Areas of practice</Eyebrow>
            <h2
              className="mt-4 font-black leading-none tracking-tight text-[#f5f2ec]"
              style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
            >
              Expertise
            </h2>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden border border-white/10 bg-white/5 sm:grid-cols-2 lg:grid-cols-3">
          {EXPERTISE.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.08 }}
              className="group relative flex min-h-[220px] flex-col justify-between bg-[#050505] p-7 transition-colors hover:bg-orange-500/[0.04]"
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  boxShadow: "inset 0 0 0 1px rgba(255,122,0,0.5)",
                }}
                aria-hidden="true"
              />
              <div className="flex items-start justify-between">
                <span
                  className="font-black leading-none text-transparent"
                  style={{
                    WebkitTextStroke: "1px rgba(255,122,0,0.4)",
                    fontSize: "2.75rem",
                  }}
                >
                  {item.n}
                </span>
                <item.Icon
                  className="h-5 w-5 text-orange-500/70 transition-transform duration-500 group-hover:-translate-y-1 group-hover:text-orange-400"
                  aria-hidden="true"
                />
              </div>

              <div>
                <h3 className="text-base font-semibold text-[#f5f2ec]">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#f5f2ec]/50">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   EXPERIENCE TIMELINE
============================================================ */

function TimelineSection() {
  const [open, setOpen] = useState(null);
  return (
    <section
      id="experience"
      className="relative border-t border-white/5 bg-[#050505] px-6 py-28 sm:px-10 lg:px-16"
      aria-label="Experience timeline"
    >
      <div className="mx-auto max-w-5xl">
        <Eyebrow>Career path</Eyebrow>
        <h2
          className="mt-4 font-black leading-none tracking-tight text-[#f5f2ec]"
          style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
        >
          Experience
        </h2>

        <div className="relative mt-16 pl-8 sm:pl-12">
          <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-orange-500/60 via-orange-500/20 to-transparent sm:left-0" />

          {TIMELINE.map((role, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={role.org}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
                className="relative mb-10 last:mb-0"
              >
                <span className="absolute -left-8 top-1.5 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-orange-500 shadow-[0_0_10px_2px_rgba(255,122,0,0.6)] sm:-left-12" />

                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full flex-col gap-1 border border-transparent py-4 pl-4 text-left transition-colors hover:border-orange-500/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
                >
                  <span>
                    <span className="block text-lg font-semibold text-[#f5f2ec]">
                      {role.role}
                      <span className="text-[#f5f2ec]/40"> · {role.org}</span>
                    </span>
                  </span>
                  <span className="flex items-center gap-3 text-xs uppercase tracking-widest text-orange-400/80">
                    {role.period}
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
                      aria-hidden="true"
                    />
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden pl-4"
                    >
                      <p className="max-w-xl pb-2 text-sm leading-relaxed text-[#f5f2ec]/55">
                        {role.detail}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   EDUCATION
============================================================ */

function EducationSection() {
  return (
    <section
      id="education"
      className="relative border-t border-white/5 bg-[#050505] px-6 py-28 sm:px-10 lg:px-16"
      aria-label="Education and qualifications"
    >
      <div className="mx-auto max-w-7xl">
        <Eyebrow>Education &amp; qualifications</Eyebrow>
        <h2
          className="mt-4 font-black leading-none tracking-tight text-[#f5f2ec]"
          style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
        >
          Grounded in rigor.
        </h2>

        <GlowLine className="mt-12" />

        <div className="mt-4 divide-y divide-white/5">
          {EDUCATION.map((ed, i) => (
            <motion.div
              key={ed.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: i * 0.06 }}
              className="flex flex-col gap-2 py-6 sm:flex-row sm:items-center sm:gap-8"
            >
              <span
                className="font-black leading-none text-transparent"
                style={{
                  WebkitTextStroke: "1px rgba(255,122,0,0.4)",
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                  minWidth: "3.5rem",
                }}
              >
                {ed.n}
              </span>
              <div>
                <h3 className="text-lg font-semibold text-[#f5f2ec]">
                  {ed.title}
                </h3>
                <p className="text-sm text-[#f5f2ec]/50">{ed.sub}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   PUBLICATIONS
============================================================ */

function PublicationsSection() {
  return (
    <section
      id="publications"
      className="relative border-t border-white/5 bg-[#050505] px-6 py-28 sm:px-10 lg:px-16"
      aria-label="Selected writing"
    >
      <div className="mx-auto max-w-5xl">
        <Eyebrow>Selected writing</Eyebrow>
        <h2
          className="mt-4 font-black leading-none tracking-tight text-[#f5f2ec]"
          style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
        >
          Publications
        </h2>

        <div className="mt-14 divide-y divide-white/5 border-y border-white/5">
          {PUBLICATIONS.map((p, i) => (
            <motion.a
              key={p.title}
              href="#"
              onClick={(e) => e.preventDefault()}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group flex items-center justify-between gap-6 py-7 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400"
            >
              <div>
                <span className="text-xs uppercase tracking-widest text-orange-400/70">
                  {p.year}
                </span>
                <p className="mt-2 max-w-xl text-lg font-medium leading-snug text-[#f5f2ec] transition-colors group-hover:text-orange-300">
                  {p.title}
                </p>
                <p className="mt-2 max-w-xl text-lg font-small leading-snug text-[#aca9a9] transition-colors group-hover:text-orange-100">
                  {p.subtitle}
                </p>
              </div>
              <span className="flex-shrink-0 text-[#f5f2ec]/40 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-orange-400">
                <ArrowUpRight className="h-6 w-6" aria-hidden="true" />
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   RECOGNITION
============================================================ */

function RecognitionSection() {
  return (
    <section
      id="recognition"
      className="relative border-t border-white/5 bg-[#050505] px-6 py-24 sm:px-10 lg:px-16"
      aria-label="Recognition"
    >
      <div className="mx-auto max-w-5xl">
        <Eyebrow>Recognition</Eyebrow>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {RECOGNITION.map((r, i) => (
            <motion.div
              key={r}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="flex items-center gap-4 border-l border-orange-500/40 pl-5 py-1"
            >
              <Circle className="h-1.5 w-1.5 flex-shrink-0 fill-orange-500 text-orange-500" aria-hidden="true" />
              <p className="text-base text-[#f5f2ec]/80">{r}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   FINAL CTA
============================================================ */

function FinalCTA() {
  return (
    <section
      id="contact"
      className="relative flex min-h-[85svh] w-full flex-col items-center justify-center overflow-hidden border-t border-white/5 bg-[#050505] px-6 py-28 text-center sm:px-10"
      aria-label="Contact"
    >
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-orange-600/30 via-orange-500/5 to-transparent" />
      <Embers count={10} />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8 }}
        className="relative z-10"
      >
        <Eyebrow>Get in touch</Eyebrow>

        <h2
          className="mx-auto mt-6 max-w-4xl font-black leading-[1.02] tracking-tight text-[#f5f2ec]"
          style={{ fontSize: "clamp(2.2rem, 6.5vw, 5rem)" }}
        >
          Let&rsquo;s talk law,
          <br />
          <span className="text-orange-500">business &amp; strategy.</span>
        </h2>

        <p className="mx-auto mt-8 flex items-center justify-center gap-2 text-sm text-[#f5f2ec]/50">
          <MapPin className="h-4 w-4 text-orange-500" aria-hidden="true" />
          Ernakulam, Kerala, India
        </p>

        <div className="mt-10 flex flex-col items-center gap-6">
          <a
            href="mailto:pooja.sathishkn@gmail.com"
            className="group inline-flex items-center gap-3 border border-orange-500 bg-orange-500/10 px-8 py-4 text-sm font-semibold uppercase tracking-widest text-[#f5f2ec] transition-colors hover:bg-orange-500 hover:text-[#050505] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-300"
          >
            <Mail className="h-4 w-4" aria-hidden="true" />
            pooja.sathishkn@gmail.com
          </a>

          <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-[#f5f2ec]/40">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-500 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-orange-500" />
            </span>
            Currently open to select advisory engagements
          </span>
        </div>
      </motion.div>
    </section>
  );
}

/* ============================================================
   ROOT PAGE
============================================================ */

export default function Pooja() {
  // Inject keyframes for the ember drift animation and set the
  // page font-family once, without requiring a separate CSS file.
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      @keyframes emberDrift {
        0% { transform: translateY(0) translateX(0); opacity: 0; }
        10% { opacity: 0.9; }
        100% { transform: translateY(-110vh) translateX(20px); opacity: 0; }
      }
      .animate-ember { animation-name: emberDrift; animation-timing-function: ease-in; animation-iteration-count: infinite; }
      @media (prefers-reduced-motion: reduce) {
        .animate-ember { animation: none !important; }
        * { scroll-behavior: auto !important; }
      }
      html { scroll-behavior: smooth; }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-[#050505] font-sans text-[#f5f2ec] antialiased selection:bg-orange-500/30">
      <GrainOverlay />
      <main>
        <Hero />
        <IdentitySection />
        <FeaturedRole />
        <ExpertiseSection />
        <TimelineSection />
        <EducationSection />
        <PublicationsSection />
        <RecognitionSection />
        <FinalCTA />
      </main>
    </div>
  );
}