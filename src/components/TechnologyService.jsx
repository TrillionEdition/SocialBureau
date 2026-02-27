import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiDownload, FiPlay } from 'react-icons/fi';
import { FaGoogle, FaFacebookF } from 'react-icons/fa';
import { SiTiktok } from 'react-icons/si';
import Seo from './Seo';
import Footer from './Footer';

export default function TechnologyService() {
  const [showFlow, setShowFlow] = useState(true);

  const services = [
    'API Integration & Marketing Automation',
    'Web & App Development (React, Next.js, Node.js)',
    'CRM, Pixel, and Event Tracking Setup',
    'Custom Dashboard & Analytics Solutions',
    'Marketing API Connectors (Meta, Google, Taboola, etc.)',
    'AI & Data Automation Tools',
    'SEO Tech Architecture (Schema, JSON-LD, Crawl Optimization)'
  ];

  function downloadSpec() {
    const payload = { title: 'Technology — SocialBureau', services };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'technology-spec.json';
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
     <>
        <Seo
            title="SocialBureau Tech | Marketing Technology & API Automation Agency"
            description="SocialBureau Tech helps brands automate and scale using marketing technology, API integrations, CRM setup, data tracking, Next.js websites, digital transformation workflows, and custom marketing dashboards. Power your growth with seamless automation and advanced marketing tech."
            keywords="branding agency india, socialbureau branding, brand identity design, visual branding, brand strategy, rebranding, brand guidelines, logo design, brand positioning, digital brand presence"
            image="/assets/socialbureau.png"
            url="https://www.socialbureau.intechnology"
        canonicalUrl="https://www.socialbureau.intechnology"
          />
    <div className="min-h-screen bg-gradient-to-b from-[#071022] to-[#02030a] text-slate-100 p-6">
      <div className="max-w-6xl mx-auto">
        <header className="grid md:grid-cols-2 gap-8 items-center py-12">
          <div>
            <p className="uppercase text-sm text-cyan-300 tracking-wide">Technology</p>
            <h1 className="text-3xl md:text-4xl font-extrabold mt-3">Connecting marketing, data, and automation through code.</h1>
            <p className="mt-4 text-slate-300/90">The future of marketing is technical — and SocialBureau is built on it. Our Technology division develops API marketing systems, data automation tools, and custom digital platforms that make marketing smarter, faster, and measurable.</p>

            <div className="mt-6 flex gap-3">
              <button onClick={downloadSpec} className="px-4 py-2 bg-cyan-500 text-black rounded-md inline-flex items-center gap-2"><FiDownload/> Download spec</button>
              <button onClick={()=>setShowFlow(s=>!s)} className="px-4 py-2 border border-slate-700 rounded-md inline-flex items-center gap-2"><FiPlay/> Toggle flow</button>
            </div>

            <div className="mt-6 text-sm text-slate-400">Why it matters: We merge engineering with creativity — so your brand doesn’t just look great, it performs perfectly across every marketing platform.</div>
          </div>

          <div className="relative">
            <div className="bg-slate-900/40 p-4 rounded-2xl shadow-lg">
              <div className="flex items-center justify-between mb-3">
                <div className="text-sm text-slate-400">Animated tech flow</div>
                <div className="text-xs text-slate-500">Website → API → Ads → Dashboard</div>
              </div>

              <div className="p-4 rounded-lg bg-gradient-to-br from-slate-800/60 to-black/20">
                <div className="flex items-center justify-between gap-3">
                  <motion.div animate={{ x: showFlow ? [ -10, 0, 10, 0 ] : 0 }} transition={{ repeat: Infinity, duration: 3 }} className="flex-1 grid place-items-center p-4 rounded-lg bg-slate-800/30">
                    <div className="text-sm font-semibold">Website</div>
                  </motion.div>

                  <motion.div animate={{ x: showFlow ? [ -8, 0, 8, 0 ] : 0 }} transition={{ repeat: Infinity, duration: 3, delay: 0.2 }} className="w-36 grid place-items-center p-3 rounded-lg bg-slate-800/30">
                    <div className="text-sm font-semibold">API</div>
                  </motion.div>

                  <motion.div animate={{ x: showFlow ? [ -6, 0, 6, 0 ] : 0 }} transition={{ repeat: Infinity, duration: 3, delay: 0.4 }} className="w-36 grid place-items-center p-3 rounded-lg bg-slate-800/30">
                    <div className="text-sm font-semibold">Ads</div>
                  </motion.div>

                  <motion.div animate={{ x: showFlow ? [ -4, 0, 4, 0 ] : 0 }} transition={{ repeat: Infinity, duration: 3, delay: 0.6 }} className="w-48 grid place-items-center p-3 rounded-lg bg-slate-800/30">
                    <div className="text-sm font-semibold">Dashboard</div>
                  </motion.div>
                </div>

                <div className="mt-4 flex items-center justify-center gap-6">
                  <div className="text-xs text-slate-400">Integrations</div>
                  <div className="flex items-center gap-3">
                    <div className="grid place-items-center w-10 h-10 rounded-md bg-white/5"><FaFacebookF/></div>
                    <div className="grid place-items-center w-10 h-10 rounded-md bg-white/5"><FaGoogle/></div>
                    <div className="grid place-items-center w-10 h-10 rounded-md bg-white/5"><SiTiktok/></div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </header>

        <section className="mt-6 bg-slate-900/30 rounded-2xl p-6 shadow-inner">
          <h2 className="text-2xl font-bold">Our Technology Services Include</h2>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            {services.map((s, i) => (
              <div key={s} className="p-4 bg-slate-800/40 rounded-md">
                <div className="font-semibold">{s}</div>
                <div className="text-slate-400 text-sm mt-2">{i===0 && 'Automate campaign delivery, attribution and reporting using robust APIs.'}</div>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <div className="text-xl font-semibold">Why It Matters</div>
            <p className="text-slate-300/80 mt-2">We merge engineering with creativity — so your brand doesn’t just look great, it performs perfectly across every marketing platform.</p>
          </div>
        </section>

        <section className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-slate-900/40 to-black/30 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <div className="text-sm text-slate-300">Ready to scale marketing with tech?</div>
            <div className="text-xl font-bold">Let’s build the systems that run your growth.</div>
          </div>
          <div className="flex gap-3">
            <button onClick={()=>alert('Request received')} className="px-4 py-2 bg-cyan-500 rounded-md text-black font-medium">Request a tech audit</button>
            <button onClick={()=>alert('Connector sent')} className="px-4 py-2 border border-slate-700 rounded-md">Send brief</button>
          </div>
        </section>

      </div>
    </div>
    </>
  );
}
