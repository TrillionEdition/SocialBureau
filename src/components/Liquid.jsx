import React, { useRef, useEffect } from "react";

/**
 * LiquidCards.jsx
 *
 * Self-contained React + Tailwind component that renders 3 cards in a row.
 * All non-Tailwind CSS is injected inline (no external CSS file required).
 *
 * Usage:
 *  - Place this file in src/components and import: import LiquidCards from './components/LiquidCards'
 *  - Tailwind must be configured in your project (the component uses Tailwind for layout/spacing/typography).
 */

function useLiquidPointer(ref) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let targetX = 50;
    let targetY = 50;
    let currentX = 50;
    let currentY = 50;
    let rafId = null;
    let running = false;

    const rect = () => el.getBoundingClientRect();

    function onMove(e) {
      const r = rect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      targetX = ((clientX - r.left) / r.width) * 100;
      targetY = ((clientY - r.top) / r.height) * 100;
      if (!running) {
        running = true;
        loop();
      }
    }

    function onEnter() {
      el.classList.add("liquid-hover");
      if (!running) {
        running = true;
        loop();
      }
    }

    function onLeave() {
      targetX = 50;
      targetY = 50;
      el.classList.remove("liquid-hover");
    }

    function loop() {
      // smooth interpolation
      currentX += (targetX - currentX) * 0.12;
      currentY += (targetY - currentY) * 0.12;

      el.style.setProperty("--mx", `${currentX}%`);
      el.style.setProperty("--my", `${currentY}%`);
      el.style.setProperty("--mx-2", `${currentX + 12}%`);
      el.style.setProperty("--my-2", `${currentY - 12}%`);
      el.style.setProperty("--mx-3", `${currentX - 18}%`);
      el.style.setProperty("--my-3", `${currentY + 18}%`);

      rafId = requestAnimationFrame(loop);
    }

    el.addEventListener("mousemove", onMove);
    el.addEventListener("touchmove", onMove, { passive: true });
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("touchstart", onEnter, { passive: true });
    el.addEventListener("mouseleave", onLeave);
    el.addEventListener("touchend", onLeave);

    // initial css variables
    el.style.setProperty("--mx", "50%");
    el.style.setProperty("--my", "50%");
    el.style.setProperty("--mx-2", "62%");
    el.style.setProperty("--my-2", "38%");
    el.style.setProperty("--mx-3", "32%");
    el.style.setProperty("--my-3", "68%");

    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("touchmove", onMove);
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("touchstart", onEnter);
      el.removeEventListener("mouseleave", onLeave);
      el.removeEventListener("touchend", onLeave);
      cancelAnimationFrame(rafId);
    };
  }, [ref]);
}

const icons = [
  <i className="fas fa-chart-line text-[#ffffffff] text-2xl"></i>,
  <i className="fas fa-sitemap text-[#ffffffff] text-2xl"></i>,
  <i className="fas fa-bullseye text-[#ffffffff] text-2xl"></i>,
  <i className="fas fa-comments text-[#ffffffff] text-2xl"></i>,
  <i className="fas fa-globe text-[#ffffffff] text-2xl"></i>,
  <i className="fas fa-cogs text-[#ffffffff] text-2xl"></i>,
  <i className="fas fa-crosshairs text-[#ffffffff] text-2xl"></i>,
  <i className="fas fa-users text-[#ffffffff] text-2xl"></i>,
  <i className="fas fa-envelope text-[#ffffffff] text-2xl"></i>,
  <i className="fas fa-rocket text-[#ffffffff] text-2xl"></i>,
];

const cards = [
  {
    title: 'API-Driven-Growth-Automated-Distribution',
    content: 'Eliminate friction. Merge engineering + marketing for compounding growth loops.',
    bg: "to-teal-700"
  },
  {
    title: 'Full-Funnel-Performance-Marketing',
    content: 'Click costs don\'t matter if they don\'t convert. We deploy vertical-informed models and 14-day sprint cycles tied to LTV, not vanity ROAS.',
    bg: "to-purple-700"
  },
  {
    title: 'Funnel-Architecture-Growth-Pathways',
    content: 'Stop leaking revenue. We map awareness to LTV with customized, P&L-aligned blueprints.',
    bg: "to-amber-700"
  },
  {
    title: 'Conversion-Rate-Optimization-Landing-Systems',
    content: 'Built with psychology, tested with micro-experiments. Bounce less. Convert more.',
    bg: "to-indigo-700"
  },
  {
    title: 'Messaging-Positioning-for-Niche-Brands',
    content: 'Generic messaging kills growth. We uncover category-specific codes using ethnographic and linguistic analysis.',
    bg: "to-rose-700"
  },
  {
    title: 'Web-Development',
    content: 'From MVPs to scalable platforms, we design, develop, and deploy web apps that are fast, secure, and user-centric.',
    bg: "to-orange-700"
  },
  {
    title: 'Niche-Market-Penetration-Strategy',
    content: 'We speak fluent healthtech, crypto, fintech, and more. Penetrate with precision.',
    bg: "to-sky-700"
  },
  {
    title: 'Influencer-UGC-Growth-Engines',
    content: 'No vanity metrics. Just creator content built for performance and attribution.',
    bg: "to-yellow-700"
  },
  {
    title: 'Lifecycle-Email-Automation-Strategy',
    content: 'Trigger behavior-based flows that drive revenue, measured on 30-day impact.',
    bg: "to-gray-700"
  },
  {
    title: 'Software-GTM-Growth-Architecture',
    content: 'PLG meets sales-assist in a system that converts trials and grows MRR.',
    bg: "to-fuchsia-700"
  }
];

export default function Liquid() {
  return (
    <div className="w-full flex justify-center items-center p-6 pl-10">
      {/* Inline styles injected into DOM so no external CSS file is required */}
      <StyleBlock />
      <div className="max-w-6xl w-full grid grid-cols-1 sm:grid-cols-3 gap-6">
        {cards?.map((card, i) => (
             <a href={`/services/${encodeURIComponent(card.title)}`}>
        <LiquidCard key={i} title={card.title}>
            
                  
            <p className="text-md text-gray-200 md:h-[25vh] h-[12vh]">{card.content}</p>
            <div className="flex items-center justify-between">                    
                    {icons[i]}
                    <span className="text-neutral-400">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </span>
                  </div>
        </LiquidCard>
        </a>
        ))}
      </div>
    </div>
  );
}

function LiquidCard({ title, children }) {
  const ref = useRef(null);
  useLiquidPointer(ref);

  return (
    <div
      ref={ref}
      className="liquid-card relative rounded-2xl overflow-hidden p-10 shadow-lg transform transition-transform duration-300 hover:scale-[1.01] focus:scale-[1.01] bg-gradient-to-b from-white/3 to-black/3"
      tabIndex={0}
      aria-label={`${title} card`}
    >
      <div className="liquid-bg" aria-hidden="true" />
      <div className="liquid-bg layer-2" aria-hidden="true" />
      <div className="liquid-bg layer-3" aria-hidden="true" />

      <div className="content relative z-10  ">
        <h3 className="text-white text-xl font-semibold mb-3">{title}</h3>
        <div className="text-md">{children}</div>
      </div>
    </div>
  );
}

/* Injected style block component (keeps everything inside the same file, no external CSS) */
function StyleBlock() {
  const css = `
/* Liquid card base variables */
.liquid-card {
  --mx: 50%;
  --my: 50%;
  --mx-2: 62%;
  --my-2: 38%;
  --mx-3: 32%;
  --my-3: 68%;
}

/* background blobs */
.liquid-card .liquid-bg {
  position: absolute;
  inset: -30%;
  pointer-events: none;
  z-index: 0;
  mix-blend-mode: screen;
  transition: opacity 0.45s ease, transform 0.6s cubic-bezier(.2,.9,.2,1);
  will-change: transform, opacity;
  filter: blur(34px);
  opacity: 0.95;
  background-image:
    radial-gradient(600px circle at var(--mx) var(--my), rgba(99,102,241,0.24) 0%, rgba(99,102,241,0.06) 40%, transparent 60%),
    radial-gradient(420px circle at var(--mx-2) var(--my-2), rgba(236,72,153,0.18) 0%, rgba(236,72,153,0.03) 35%, transparent 55%),
    radial-gradient(320px circle at var(--mx-3) var(--my-3), rgba(34,211,238,0.12) 0%, rgba(34,211,238,0.02) 40%, transparent 60%);
  background-repeat: no-repeat;
  transform: translateZ(0);
}

/* layer variations for depth */
.liquid-card .liquid-bg.layer-2 {
  filter: blur(26px);
  opacity: 0.9;
  transform: scale(1.02);
}
.liquid-card .liquid-bg.layer-3 {
  filter: blur(46px);
  opacity: 0.85;
  transform: scale(0.98);
}

/* subtle overlay so text stays readable */
.liquid-card::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(0,0,0,0.06));
  z-index: 1;
  pointer-events: none;
}

/* hover/focus state */
.liquid-card.liquid-hover {
  box-shadow: 0 12px 30px rgba(2,6,23,0.45);
}
.liquid-card.liquid-hover .liquid-bg {
  filter: blur(28px);
  opacity: 1;
  transform: translateY(0);
}

/* accessibility: reduce motion */
@media (prefers-reduced-motion: reduce) {
  .liquid-card .liquid-bg { transition: none; animation: none; }
}
  `;
  return <style dangerouslySetInnerHTML={{ __html: css }} />;
}