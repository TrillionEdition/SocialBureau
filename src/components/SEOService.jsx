import React from "react";
import Seo from "./Seo";
import Footer from "./Footer";
import { motion } from "framer-motion";
import { FaSearch, FaChartLine, FaTools, FaLink, FaCogs } from "react-icons/fa";

export default function SEOService() {
  const features = [
    { icon: <FaTools />, title: "Technical SEO", desc: "Site health, crawl efficiency, speed and structured data fixes." },
    { icon: <FaSearch />, title: "On-Page Content", desc: "Topic clusters, intent mapping and high-impact content optimisation." },
    { icon: <FaLink />, title: "Authority Building", desc: "Strategic backlink acquisition and content partnerships." },
    { icon: <FaChartLine />, title: "Performance Monitoring", desc: "API-driven dashboards and rank signal tracking." },
    { icon: <FaCogs />, title: "Automation", desc: "Automated audits, remediation workflows and prioritized fixes." },
  ];

  return (
    <>
      <Seo
        title="SEO — Search Engine Optimization | SocialBureau"
        description="Rank higher, drive organic traffic and convert better with our API-driven SEO: technical audits, on-page & off-page, content optimization, backlink building and performance monitoring."
        keywords="SEO, technical SEO, on-page SEO, off-page SEO, backlink building, content optimization, site audits, organic traffic, search engine optimization"
        image="/assets/socialbureau.png"
        url="https://www.socialbureau.inseo"
        canonicalUrl="https://www.socialbureau.inseo"
      />

      <header className="bg-gradient-to-b from-black via-zinc-900 to-black text-white py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">Search Engine<br /><span className="text-[#f2c402]">Optimization</span></h1>
              <p className="mt-4 text-gray-300 max-w-xl">Rank higher, increase qualified traffic and convert more with a combination of technical rigor and content intelligence.</p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a href="/contact" className="inline-flex items-center gap-3 px-6 py-3 bg-[#f2c402] hover:bg-[#f2c402] rounded-full font-semibold shadow-lg transition text-black">Schedule an Audit</a>
                <a href="#" className="px-4 py-3 border border-zinc-800 rounded-full text-sm text-gray-300 hover:bg-zinc-800 transition bg-gray-900">See Services</a>
              </div>

              <div className="mt-8 flex gap-6 text-gray-300">
                <div>
                  <div className="text-2xl font-bold text-white">+120</div>
                  <div className="text-sm">Audits Completed</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">+68%</div>
                  <div className="text-sm">Avg Organic Growth</div>
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="flex justify-center md:justify-end">
              <div className="bg-gradient-to-tr from-zinc-800/60 to-transparent rounded-2xl p-3 shadow-2xl">
                <img src="https://i.pinimg.com/1200x/fe/c7/ab/fec7ab1ff19b7574b48c08ae58c5ea2a.jpg" alt="SEO dashboard" className="w-full max-w-md rounded-xl" />
              </div>
            </motion.div>
          </div>
        </div>
      </header>

      <main className="bg-black text-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <section className="grid md:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.article key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="bg-gray-900 rounded-2xl p-6 border border-gray-800 hover:scale-[1.02] transition-transform">
                <div className="flex items-center gap-4">
                  <div className="text-[#f2c402] text-2xl">{f.icon}</div>
                  <h3 className="text-lg font-semibold">{f.title}</h3>
                </div>
                <p className="mt-3 text-gray-300 text-sm">{f.desc}</p>
              </motion.article>
            ))}
          </section>

          <section className="mt-12 bg-gray-900 rounded-2xl p-6 border border-gray-800 text-center">
            <h3 className="text-2xl font-semibold">How we measure success</h3>
            <p className="mt-3 text-gray-300 max-w-3xl mx-auto">We track rankings, organic traffic, click-through-rate and conversion impact — feeding results back into automated workflows for continual improvement.</p>
            <div className="mt-6">
              <a href="/contact" className="inline-block px-8 py-3 bg-[#f2c402] rounded-full font-semibold hover:bg-[#f2c402] transition text-black">Start with an Audit</a>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
