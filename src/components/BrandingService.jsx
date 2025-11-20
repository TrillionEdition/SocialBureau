import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiCopy, FiDownload, FiInfo } from "react-icons/fi";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Seo from "./Seo";

// BrandingPage.jsx
// Single-file React component using Tailwind + Framer Motion
// Default export a component you can drop into a page. Images are placeholders.

export default function BrandingService() {
  const logos = [
    "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?w=1200&q=80",
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&q=80",
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&q=80",
    "https://images.unsplash.com/photo-1508873699372-7ae56f8a5d2b?w=1200&q=80",
  ];

  const palette = [
    { name: "Primary", hex: "#0EA5A4" },
    { name: "Accent", hex: "#7C3AED" },
    { name: "Warm", hex: "#F97316" },
    { name: "Neutral", hex: "#111827" },
  ];

  const [activeLogo, setActiveLogo] = useState(0);
  const [copied, setCopied] = useState(null);
  const [openMood, setOpenMood] = useState(null);
  const [activeService, setActiveService] = useState(null);

  function copyHex(hex) {
    if (!navigator?.clipboard) return;
    navigator.clipboard.writeText(hex).then(() => {
      setCopied(hex);
      setTimeout(() => setCopied(null), 1500);
    });
  }

  function downloadAssets() {
    const data = {
      title: "SocialBureau Branding Kit",
      palette,
      logo: logos[activeLogo],
      quote: "We design brands that connect both people and platforms.",
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "branding-kit.json";
    a.click();
    URL.revokeObjectURL(url);
  }

  const services = [
    "Brand Strategy & Positioning",
    "Visual Identity Design (Logo, Color, Typography)",
    "Brand Voice & Messaging Framework",
    "Rebranding & Brand Audits",
    "Marketing Collateral Design",
    "Product Launch Branding",
    "Brand Asset Management (global campaigns)",
  ];

  const serviceDetails = [
    {
      title: 'Brand Strategy & Positioning',
      detail:
        'Define market territory, audience archetypes, and the positioning that lets your brand own a clear space.',
      bullets: ['Audience mapping', 'Value proposition', 'Competitive edge'],
    },
    {
      title: 'Visual Identity Design',
      detail:
        'Logos, color systems and typography that scale across platforms and are algorithm-friendly.',
      bullets: ['Logo systems', 'Color & typography', 'Brand guidelines'],
    },
    {
      title: 'Brand Voice & Messaging Framework',
      detail:
        "A replicable tone, messaging hierarchy and content templates so your voice is consistent everywhere.",
      bullets: ['Tone guide', 'Key messages', 'Content templates'],
    },
    {
      title: 'Rebranding & Brand Audits',
      detail: 'Audit brand assets and lead structured rebrands with minimal operational friction.',
      bullets: ['Audit reports', 'Transition plan', 'Stakeholder workshops'],
    },
    {
      title: 'Marketing Collateral Design',
      detail: 'High-conversion creatives, templates and sales enablement kits.',
      bullets: ['Pitch decks', 'Social templates', 'Print & digital assets'],
    },
    {
      title: 'Product Launch Branding',
      detail: 'End-to-end launch identity that ties product story to market demand.',
      bullets: ['Launch kits', 'Go-to-market assets', 'Campaign creatives'],
    },
    {
      title: 'Brand Asset Management',
      detail: 'Systems and repos that keep assets consistent across regions and platforms.',
      bullets: ['CDP & repo setup', 'Access controls', 'Localization workflows'],
    },
  ];

  return (
    <>
    <Navbar />
    <Seo
        title="SocialBureau Branding | Brand Identity & Strategy Agency in India"
        description="Build a powerful brand with SocialBureau. We specialize in brand identity design, visual branding, rebranding, logo design, brand guidelines, brand positioning, and complete digital brand presence for businesses across India."
        keywords="branding agency india, socialbureau branding, brand identity design, visual branding, brand strategy, rebranding, brand guidelines, logo design, brand positioning, digital brand presence"
        image="/assets/socialbureau.png"
        url="https://www.socialbureau.in/services/branding"
      />
    <div className="min-h-screen bg-gradient-to-b from-[#0f172a] via-[#071129] to-[#071023] text-slate-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header / Hero */}
        <header className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center py-12">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="space-y-6"
          >
            <p className="uppercase text-sm tracking-wider text-teal-300">Branding</p>
            <h1 className="text-3xl md:text-4xl font-extrabold leading-tight">
              Build a brand that algorithms and audiences remember.
            </h1>
            <blockquote className="text-slate-300/90 italic border-l-4 border-slate-700 pl-4 py-2">
              “We design brands that connect both people and platforms.”
            </blockquote>

            <p className="text-slate-300/80">
              Your brand is more than a logo — it’s your language, tone, color logic,
              and content DNA. At <strong>SocialBureau</strong>, we combine
              psychology, design systems, and data to create brand identities that
              perform across every platform — from Meta to Google to your website.
            </p>

            <div className="flex gap-3 flex-wrap">
              <button
                onClick={downloadAssets}
                className="inline-flex items-center gap-2 px-4 py-2 bg-teal-500/90 hover:bg-teal-400 rounded-md text-black font-medium shadow-md"
              >
                <FiDownload />
                Download branding kit
              </button>

              <button
                onClick={() => window.scrollTo({ top: 800, behavior: "smooth" })}
                className="px-4 py-2 border border-slate-700 rounded-md text-slate-200 hover:bg-slate-800/60"
              >
                Explore services
              </button>
            </div>
          </motion.div>

          {/* Right - Logos carousel + palettes */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.12 }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-slate-800/50 to-black/40 rounded-2xl p-4 shadow-2xl">
              <div className="flex items-center justify-between mb-3">
                <div className="text-sm text-slate-400">Hero image — Brand logos</div>
                <div className="text-xs text-slate-500">Moodboard</div>
              </div>

              <div className="grid grid-cols-2 gap-3 md:grid-cols-2 lg:grid-cols-2">
                <div className="col-span-1">
                  <div className="rounded-lg overflow-hidden shadow-inner h-48 md:h-56">
                    <img
                      src={logos[activeLogo]}
                      alt={`brand sample ${activeLogo + 1}`}
                      className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-105"
                    />
                  </div>

                  <div className="flex gap-2 mt-3">
                    {logos.map((l, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveLogo(idx)}
                        aria-label={`Show logo ${idx + 1}`}
                        className={`w-12 h-12 rounded-md overflow-hidden border-2 ${
                          idx === activeLogo
                            ? "border-teal-300/90 scale-105"
                            : "border-transparent"
                        } transform transition-all`}
                      >
                        <img src={l} alt={`thumb ${idx + 1}`} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="col-span-1 pt-1">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      {palette.map((p) => (
                        <div key={p.hex} className="flex items-center gap-2">
                          <button
                            onClick={() => copyHex(p.hex)}
                            className="w-12 h-12 rounded-lg shadow-inner border-2 border-slate-800"
                            style={{ background: p.hex }}
                            aria-label={`Copy ${p.name} color ${p.hex}`}
                          />
                          <div className="text-sm">
                            <div className="font-medium">{p.name}</div>
                            <div className="text-slate-400 text-xs flex items-center gap-2">
                              <span>{p.hex}</span>
                              {copied === p.hex && (
                                <span className="text-teal-300 text-xs">copied</span>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-2">
                      <div className="text-sm text-slate-400 mb-2">Moodboards</div>
                      <div className="grid grid-cols-3 gap-2">
                        {["/", "//", "/"].map((_, i) => (
                          <button
                            key={i}
                            onClick={() => setOpenMood(i)}
                            className="rounded-md overflow-hidden h-20 md:h-24 border-2 border-transparent hover:border-teal-400/60"
                          >
                            <img
                              src={`https://images.unsplash.com/photo-1503602642458-232111445657?w=800&q=60&auto=format&fit=crop&crop=entropy&sat=-20&exp=15&blend=000000`}
                              alt={`mood ${i}`}
                              className="w-full h-full object-cover"
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="text-xs text-slate-500 mt-3">Tip: click swatches to copy hex code</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal for moodboard */}
            {openMood !== null && (
              <div
                className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4"
                onClick={() => setOpenMood(null)}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring" }}
                  className="bg-white rounded-lg overflow-hidden max-w-3xl w-full shadow-2xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  <img
                    src={`https://images.unsplash.com/photo-1503602642458-232111445657?w=1600&q=70&auto=format&fit=crop&crop=entropy&sat=-20&exp=15&blend=000000`}
                    alt="Moodboard large"
                    className="w-full h-96 object-cover"
                  />
                  <div className="p-4">
                    <div className="flex justify-between items-center">
                      <div className="text-lg font-semibold">Moodboard</div>
                      <button
                        onClick={() => setOpenMood(null)}
                        className="text-slate-600 hover:text-black"
                        aria-label="Close moodboard"
                      >
                        Close
                      </button>
                    </div>
                    <p className="text-sm text-slate-600 mt-2">Use these visual clues to shape your
                      brand's tone and imagery.</p>
                  </div>
                </motion.div>
              </div>
            )}
          </motion.div>
        </header>

        {/* Services & Why it matters */}
        <section id="services" className="mt-6 bg-slate-900/30 rounded-2xl p-6 shadow-inner">
          <div className="md:flex md:gap-8">
            <div className="md:w-1/2">
              <h2 className="text-2xl font-bold">Our Branding Services Include</h2>
              <ul className="mt-4 space-y-2">
                {services.map((s, idx) => (
                  <li
                    key={s}
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') setActiveService(idx);
                    }}
                    onClick={() => setActiveService(idx)}
                    className={`bg-slate-800/40 p-3 rounded-md flex items-start gap-3 cursor-pointer focus:outline-none focus:ring-2 focus:ring-teal-400/40 transition ${
                      activeService === idx ? 'ring-2 ring-teal-300/30 scale-[1.01]' : ''
                    }`}
                    aria-pressed={activeService === idx}
                  >
                    <div className="text-teal-300 font-semibold mt-0.5">{idx + 1}.</div>
                    <div className="flex-1">
                      <div className="font-medium">{s}</div>
                      <div className="text-slate-400 text-sm mt-1">
                        {idx === 0 && 'Position your brand to own a clear market territory and emotional space.'}
                        {idx === 1 && 'Logos, color systems, and typography that scale across platforms.'}
                        {idx === 2 && "A tone-of-voice guide so your content sounds like you — everywhere."}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-6">
                <button
                  onClick={() => setActiveService(0)}
                  className="px-4 py-2 bg-teal-500/90 rounded-md font-medium text-black"
                >
                  Start a brand audit
                </button>
              </div>
            </div>

            <div className="md:w-1/2 mt-6 md:mt-0">
              <h3 className="text-xl font-semibold">Why It Matters</h3>
              <p className="text-slate-300/80 mt-3">
                We create brands built for both human emotion and machine interpretation — so your
                identity performs better across all algorithms and search systems.
              </p>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-slate-800/60 to-black/40 p-4 rounded-xl">
                  <div className="font-semibold">Human-first emotion</div>
                  <div className="text-slate-400 text-sm mt-2">Design that moves people to act.</div>
                </div>
                <div className="bg-gradient-to-br from-slate-800/60 to-black/40 p-4 rounded-xl">
                  <div className="font-semibold">Search and algorithm ready</div>
                  <div className="text-slate-400 text-sm mt-2">Structured assets and naming that help
                    discoverability.</div>
                </div>
              </div>

              <div className="mt-6">
                <details className="bg-slate-800/30 p-3 rounded-md">
                  <summary className="cursor-pointer font-medium">How we measure impact</summary>
                  <div className="mt-3 text-slate-400 text-sm">
                    Brand equity metrics, CTR uplift on creatives, improved search impressions,
                    and consistent cross-platform conversion benchmarks.
                  </div>
                </details>
              </div>

              {/* Interactive service detail panel */}
              <div className="mt-6">
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: activeService !== null ? 1 : 0.5, y: activeService !== null ? 0 : 6 }}
                  transition={{ duration: 0.35 }}
                  className="bg-gradient-to-br from-slate-800/50 to-black/30 p-4 rounded-xl border border-slate-700"
                >
                  {activeService === null ? (
                    <div className="text-slate-300">Select a service to see details and quick actions.</div>
                  ) : (
                    <div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-semibold">{serviceDetails[activeService].title}</div>
                          <div className="text-slate-400 text-sm mt-1">{serviceDetails[activeService].detail}</div>
                        </div>
                        <div>
                          <button
                            onClick={() => downloadAssets()}
                            className="px-3 py-2 bg-teal-500 text-black rounded-md font-medium"
                          >
                            Download brief
                          </button>
                        </div>
                      </div>

                      <ul className="mt-3 text-slate-400 text-sm space-y-1">
                        {serviceDetails[activeService].bullets.map((b) => (
                          <li key={b}>• {b}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive FAQ / CTA strip */}
        <section className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-slate-900/40 to-black/30 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <div className="text-sm text-slate-300">Ready to make a memorable brand?</div>
            <div className="text-xl font-bold">Let's design something the algorithm and people love.</div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => alert('Thanks — we will reach out!')}
              className="px-4 py-2 bg-teal-500 rounded-md text-black font-medium"
            >
              Book a call
            </button>
            <button
              onClick={() => alert('Sent a quick brief.')}
              className="px-4 py-2 border border-slate-700 rounded-md text-slate-200"
            >
              Send brief
            </button>
          </div>
        </section>
      </div>
    </div>
    <Footer />
    </>
  );
}
