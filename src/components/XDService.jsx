import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiBarChart2, FiPlay, FiDownload } from 'react-icons/fi';
import Footer from './Footer';
import Navbar from './Navbar';
import Seo from './Seo';

// ExperienceDesignPage.jsx
// Interactive React + Tailwind component showcasing Experience Design services

export default function XDService() {
  const [beforeAfter, setBeforeAfter] = useState(40);
  const [showPrototype, setShowPrototype] = useState(false);
  const services = [
    'UI/UX Strategy & Prototyping',
    'Web & Mobile Interface Design',
    'Conversion Rate Optimization (CRO)',
    'Interactive Content & Micro Animations',
    'Creative Motion Design for Ads',
    'Customer Journey Mapping',
    'Human-Algorithm Experience Integration (HAEI™)',
  ];

  const seoKeywords = 'experience design, ui ux design agency, xd design, conversion optimization, website experience design, human centered design, ux research, cro agency, digital experience, socialbureau design';

  function downloadReport() {
    const payload = {
      title: 'SocialBureau Experience Design — Snapshot',
      beforeAfter,
      services,
      seoKeywords,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'experience-design-snapshot.json';
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
<>    <Navbar />
<Seo
                    title="SocialBureau Design | Experience Design & UI/UX Agency in India"
description="SocialBureau specializes in human-centered experience design, UI/UX strategy, CRO, and digital experience optimization. From UX research to XD design and conversion-focused interfaces, we craft high-performing websites and digital products that deliver results."
keywords="experience design, ui ux design agency, xd design, conversion optimization, website experience design, human centered design, ux research, cro agency, digital experience, socialbureau design"
image="/assets/socialbureau.png"
                    url="https://www.socialbureau.in/services/experience-design"
                  />
    <div className="min-h-screen bg-gradient-to-b from-[#071025] via-[#071029] to-[#04050a] text-slate-100 p-6">
      <div className="max-w-6xl mx-auto">
        <header className="grid md:grid-cols-2 gap-8 items-center py-12">
          <div>
            <p className="uppercase text-sm text-teal-300 tracking-wide">Experience Design</p>
            <h1 className="text-3xl md:text-4xl font-extrabold mt-3">Design experiences that feel natural — and convert instantly.</h1>
            <p className="mt-4 text-slate-300/90">Your user experience isn’t just visual — it’s emotional, behavioral, and algorithmic. Our Experience Design team creates digital environments that align with user intent, platform logic, and your business goals.</p>

            <div className="mt-6 flex gap-3">
              <button onClick={() => setShowPrototype(true)} className="px-4 py-2 bg-teal-500 text-black rounded-md inline-flex items-center gap-2"><FiPlay /> View prototype</button>
              <button onClick={downloadReport} className="px-4 py-2 border border-slate-700 rounded-md">Download snapshot</button>
            </div>

            <div className="mt-6 text-sm text-slate-400">SEO keywords: <span className="italic">{seoKeywords}</span></div>
          </div>

          <div className="relative">
            <div className="bg-slate-900/40 p-4 rounded-2xl shadow-lg">
              <div className="flex items-center justify-between mb-3">
                <div className="text-sm text-slate-400">Interactive visuals</div>
                <div className="text-xs text-slate-500">UX mockups • Wireframes</div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg overflow-hidden h-44 bg-gradient-to-b from-slate-800 to-black flex items-center justify-center">
                  <div className="text-center">
                    <div className="font-semibold">Mobile prototype</div>
                    <div className="text-slate-400 text-sm mt-2">Tap to animate</div>
                  </div>
                </div>

                <div className="rounded-lg overflow-hidden h-44 bg-gradient-to-b from-slate-800 to-black flex items-center justify-center">
                  <div className="text-center">
                    <div className="font-semibold">Web wireframe</div>
                    <div className="text-slate-400 text-sm mt-2">Hover interactions</div>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <div className="text-sm text-slate-400 mb-2">Micro animations</div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="h-10 rounded-md bg-slate-800/60 grid place-items-center">Button ripple</div>
                  <div className="h-10 rounded-md bg-slate-800/60 grid place-items-center">Menu morph</div>
                  <div className="h-10 rounded-md bg-slate-800/60 grid place-items-center">Loading UX</div>
                </div>
              </div>
            </div>

            {/* Prototype modal */}
            {showPrototype && (
              <div className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4" onClick={() => setShowPrototype(false)}>
                <motion.div className="bg-white rounded-lg w-full max-w-3xl overflow-hidden" initial={{scale:0.95, opacity:0}} animate={{scale:1, opacity:1}} onClick={e=>e.stopPropagation()}>
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="font-semibold">Prototype — Mobile flow</div>
                      <button onClick={() => setShowPrototype(false)} className="text-slate-600">Close</button>
                    </div>
                    <div className="mt-4 text-slate-700 text-sm">(Interactive prototype placeholder — embed your Figma/Proto.io link here.)</div>
                    <div className="mt-4 grid grid-cols-3 gap-2">
                      <div className="h-36 bg-slate-200 rounded-md"></div>
                      <div className="h-36 bg-slate-200 rounded-md"></div>
                      <div className="h-36 bg-slate-200 rounded-md"></div>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}

          </div>
        </header>

        {/* Services + Before/After slider */}
        <section className="mt-6 bg-slate-900/30 rounded-2xl p-6 shadow-inner">
          <div className="md:flex gap-8">
            <div className="md:w-1/2">
              <h2 className="text-2xl font-bold">Our Experience Design Services Include</h2>
              <ul className="mt-4 space-y-2">
                {services.map((s, i) => (
                  <li key={s} className="bg-slate-800/40 p-3 rounded-md flex items-start gap-3">
                    <div className="text-teal-300 font-semibold mt-0.5">{i+1}.</div>
                    <div className="flex-1">
                      <div className="font-medium">{s}</div>
                      <div className="text-slate-400 text-sm mt-1">{i===0 && 'Define product UX that reduces friction and increases retention.'}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:w-1/2 mt-6 md:mt-0">
              <h3 className="text-xl font-semibold">Before vs After — example case study</h3>
              <p className="text-slate-300/80 mt-2">A redesign focused on funnel clarity and microcopy improved conversions and reduced drop-offs.</p>

              <div className="mt-4">
                <div className="bg-slate-800/50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-slate-400">Conversion uplift</div>
                    <div className="text-lg font-bold">+{Math.round(20 + beforeAfter/5)}% CTR</div>
                  </div>

                  <div className="mt-4">
                    <input type="range" min="0" max="100" value={beforeAfter} onChange={(e)=>setBeforeAfter(Number(e.target.value))} className="w-full" />
                    <div className="mt-3 text-sm text-slate-400">Drag to reveal more "After" (higher values show improved conversion).</div>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="p-3 bg-gradient-to-br from-red-900/30 to-black/20 rounded-md">
                      <div className="font-semibold">Before</div>
                      <div className="text-slate-400 text-sm mt-2">Bounce: 68% • Avg time: 56s • CTOR: 2.4%</div>
                    </div>
                    <div className="p-3 bg-gradient-to-br from-green-900/30 to-black/20 rounded-md">
                      <div className="font-semibold">After</div>
                      <div className="text-slate-400 text-sm mt-2">Bounce: {Math.max(20, 68 - Math.round(beforeAfter/2))}% • Avg time: {Math.round(56 + beforeAfter/10)}s • CTOR: {Math.round(24 + beforeAfter/3)/10}%</div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 text-sm text-slate-400">Note: numbers are illustrative. For real case studies we provide tracked analytics and AB test results.</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA strip */}
        <section className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-slate-900/40 to-black/30 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <div className="text-sm text-slate-300">Ready to improve conversions without compromising experience?</div>
            <div className="text-xl font-bold">Put human-first design at the center of your product.</div>
          </div>
          <div className="flex gap-3">
            <button onClick={()=>alert('Booked — thanks!')} className="px-4 py-2 bg-teal-500 rounded-md text-black font-medium inline-flex items-center gap-2"><FiBarChart2/> Book a CRO review</button>
            <button onClick={()=>alert('Brief sent')} className="px-4 py-2 border border-slate-700 rounded-md">Send brief</button>
          </div>
        </section>

        <footer className="mt-10 text-slate-500 text-sm text-center pb-8">© {new Date().getFullYear()} SocialBureau — Experience design, UX research, and growth.</footer>
      </div>
    </div>
    <Footer />
    </>
  );
}
