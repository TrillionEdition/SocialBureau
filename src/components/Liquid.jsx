import React, { useRef, useEffect } from "react";


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
  <i className="fas fa-code text-[#ffffffff] text-2xl"></i>,
  <i className="fas fa-comments text-[#ffffffff] text-2xl"></i>,
  <i className="fas fa-globe text-[#ffffffff] text-2xl"></i>,
  <i className="fas fa-cogs text-[#ffffffff] text-2xl"></i>,
  <i className="fas fa-crosshairs text-[#ffffffff] text-2xl"></i>,
  <i className="fas fa-users text-[#ffffffff] text-2xl"></i>,
  <i className="fas fa-envelope text-[#ffffffff] text-2xl"></i>,
  <i className="fas fa-rocket text-[#ffffffff] text-2xl"></i>,
  <i className="fas fa-bullseye text-[#ffffffff] text-2xl"></i>,
  <i className="fas fa-drafting-compass text-[#ffffffff] text-2xl"></i>,
  <i className="fas fa-bullseye text-[#ffffffff] text-2xl"></i>,
  <i className="fas fa-map-marker-alt text-[#ffffffff] text-2xl"></i>,
  <i className="fas fa-search text-[#ffffffff] text-2xl"></i>,
  <i className="fas fa-robot text-[#ffffffff] text-2xl"></i>,
];
const cards = [
  {
    title: "API Marketing",
    slug: "API-Marketing",
    content: "Integrate platforms using API automation. No manual campaign handling.",
    bg: "to-teal-700",
  },
  {
    title: "Performance Marketing",
    slug: "Performance-Marketing",
    content: "Full-funnel, ROI-driven performance systems engineered for conversion.",
    bg: "to-purple-700",
  },
  {
    title: "Platform Prompting™",
    slug: "Platform-Prompting",
    content: "Teach algorithms (Meta, Google, TikTok) to understand your brand.",
    bg: "to-red-800",
  },
  {
    title: "GEO — Generative Engine Optimization",
    slug: "geo",
    content: "Generative search-optimised content, entity building and API-driven data to get your brand surfaced in AI-generated answers.",
    bg: "to-green-700",
  },
  {
    title: "SEO — Search Engine Optimization",
    slug: "seo",
    content: "Technical SEO, content & backlink systems plus API-driven monitoring to grow organic traffic.",
    bg: "to-blue-700",
  },
  {
    title: "AEO — Answer Engine Optimization",
    slug: "aeo",
    content: "Make your brand the default answer across AI assistants via schema, knowledge graphs and LLM-ready content.",
    bg: "to-purple-700",
  },
  {
    title: "Multi-Platform Ad Management",
    slug: "Multi-Platform-Ad-Management",
    content: "Meta, Google, TikTok, LinkedIn managed from one unified system.",
    bg: "to-slate-700",
  },
  {
    title: "Content & Niche Marketing",
    slug: "Content-Niche-Marketing",
    content: "Industry-specific content that aligns with niche psychology + culture.",
    bg: "to-yellow-700",
  },
  {
    title: "SEO & Influencer",
    slug: "SEO-Influencer",
    content: "Demand capturing + demand influencing. Full spectrum visibility.",
    bg: "to-rose-700",
  },
  {
    title: "Analytics",
    slug: "Analytics",
    content: "Dashboards + attribution + predictive insights using AI + API data.",
    bg: "to-sky-800",
  },
  {
    title: "MarTech Integration",
    slug: "MarTech",
    content: "CRM automation, tracking, CDP integration, server-side setup.",
    bg: "to-indigo-800",
  },
  {
    title: "Global Media Buying",
    slug: "Global-Media-Buying",
    content: "DV360, Amazon DSP, Programmatic OTT. Buy media worldwide.",
    bg: "to-cyan-700",
  },
  {
    title: "Third-Party App Ads",
    slug: "Third-Party-App-Ads",
    content: "Ads inside apps like Swiggy, Zomato, Meesho, ShareChat, DailyHunt.",
    bg: "to-lime-700",
  },
  {
    title: "Innovation & R&D",
    slug: "Innovation-R&D",
    content: "Experimentation, predictive modeling, beta ad platforms & API products.",
    bg: "to-orange-700",
  },
];

export default function Liquid() {
  return (
    <div className="w-full flex justify-center items-center p-6 pl-10">
      {/* Inline styles injected into DOM so no external CSS file is required */}
      <StyleBlock />
      <div className="max-w-6xl w-full grid grid-cols-1 sm:grid-cols-3 gap-6">
        {cards?.map((card, i) => (
          <a key={card.slug} href={`/services/${encodeURIComponent(card.slug)}`}>
            <LiquidCard
              title={card.title}
              className="h-[350px] flex flex-col justify-between"
            >
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