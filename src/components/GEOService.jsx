import React from "react";
import Seo from "./Seo";
import Footer from "./Footer";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaRobot, FaGlobe, FaCheckCircle } from "react-icons/fa";

export default function GEOService() {
  const features = [
    { icon: <FaGlobe />, title: "Generative Search–Optimised Content Creation", desc: "Create content specifically tailored for generative search outputs and LLM synthesis." },
    { icon: <FaMapMarkerAlt />, title: "Entity Building for Multi-Source AI Synthesis", desc: "Build and map entities so AIs consistently synthesize and reference your brand." },
    { icon: <FaRobot />, title: "API-Enhanced Data Accuracy for AI Platforms", desc: "Supply authoritative data via APIs so generative engines use accurate, current facts." },
    { icon: <FaCheckCircle />, title: "Topic Clusters & Authority Mapping for AI Retrieval", desc: "Organise topics and signals so models find authoritative brand answers." },
    { icon: <FaGlobe />, title: "Structured Content for SGE, Perplexity & LLM-Based Crawlers", desc: "Markup and structure content for better inclusion in generative summaries." },
    { icon: <FaCheckCircle />, title: "Technical Implementation for Generative Parsing & Indexing", desc: "Engineering to support generative parsing, schema and index-friendly formats." },
  ];

  return (
    <>
      <Seo
        title="GEO — Google Engine Optimization | SocialBureau"
        description="Increase your local & global visibility on Google with GEO: API-driven GBP, Maps ranking, AI review management, location keyword targeting and multi-location automation."
        keywords="local SEO, Google Business Profile, Google Maps ranking, AI review management, AEO, GEO, multi-location SEO"
        image="/assets/socialbureau.png"
        url="https://www.socialbureau.in/services/geo"
      />

      <header className="bg-gradient-to-b from-black via-gray-900 to-black text-white py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">GEO — Generative Engine<br /><span className="text-[#b2632c]">Optimization</span></h1>
              <p className="mt-4 text-gray-300 max-w-xl">Expanded your Reach Through AI-Generated Search Results</p>

              <p className="mt-6 text-gray-400 max-w-3xl">The goal of GEO is to build the brand image of your company on the face of Gen Search Engines. There AI generates the synthesis of the data instead of giving the traditional links. By using structured content, entity building, and API-driven precision, we create the scenario where your brand is not only the one which is included but also the most referenced and the one which is actually highlighted by AI in the generated results on the likes of Google SGE, Perplexity, Gemini, Copilot, Arc Search, etc.</p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a href="/contact" className="inline-flex items-center gap-3 px-6 py-3 bg-[#b2632c] hover:bg-[#b2632c] rounded-full font-semibold shadow-lg transition">Discuss GEO</a>
                <a href="/services" className="px-4 py-3 border border-zinc-800 rounded-full text-sm text-gray-300 hover:bg-zinc-800 transition bg-gray-900">All Services</a>
              </div>

              <div className="mt-8 flex gap-6 text-gray-300">
                <div>
                  <div className="text-2xl font-bold text-white">+32%</div>
                  <div className="text-sm">Avg Maps Visibility</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">1.8×</div>
                  <div className="text-sm">Local Leads Lift</div>
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="flex justify-center md:justify-end">
              <div className="bg-gradient-to-tr from-black/40 to-transparent rounded-2xl p-3 shadow-2xl">
                <img src="https://i.pinimg.com/736x/d7/6b/41/d76b41dc6f5311a59ddc51cf79ca9ff9.jpg" alt="GEO Services" className="w-full max-w-md rounded-xl" />
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
                  <div className="text-[#b2632c] text-2xl">{f.icon}</div>
                  <h3 className="text-lg font-semibold">{f.title}</h3>
                </div>
                <p className="mt-3 text-gray-300 text-sm">{f.desc}</p>
              </motion.article>
            ))}
          </section>

          <section className="mt-12 bg-gray-900 rounded-2xl p-6 border border-gray-800 text-center">
            <h3 className="text-2xl font-semibold">Result</h3>
            <p className="mt-3 text-gray-300 max-w-3xl mx-auto">More frequent mentions in AI-generated summaries of texts, elevated brand authority, and widened brand exposure due to the leverage of generative engines.</p>
            <div className="mt-6">
              <a href="/contact" className="inline-block px-8 py-3 bg-[#b2632c] rounded-full font-semibold hover:bg-[#b2632c] transition">Start GEO</a>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
