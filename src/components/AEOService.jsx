import React from "react";
import Seo from "./Seo";
import Footer from "./Footer";
import { motion } from "framer-motion";
import { FaRobot, FaDatabase, FaSitemap, FaComments, FaBrain } from "react-icons/fa";

export default function AEOService() {
  const features = [
    { icon: <FaBrain />, title: "AI Content Structuring", desc: "Transform knowledge into concise, model-friendly answers." },
    { icon: <FaRobot />, title: "LLM Answer Design", desc: "Craft result-ready snippets for Gemini, GPT, Claude and more." },
    { icon: <FaSitemap />, title: "Schema & Entities", desc: "Structured data and entity tuning for better retrieval." },
    { icon: <FaDatabase />, title: "Knowledge Graphs", desc: "Organise brand knowledge for consistent AI answers." },
    { icon: <FaComments />, title: "Conversational UX", desc: "Design dialogue-first answers for chatbots and assistants." },
  ];

  return (
    <>
      <Seo
        title="AEO — Answer Engine Optimization | SocialBureau"
        description="Be the default answer across AI assistants and chatbots through AEO: AI-Optimised content, schema & entity tuning, and knowledge-graph enhancements."
        keywords="AEO, answer engine optimization, AI search, schema markup, knowledge graph, conversational SEO, LLM optimization"
        image="/assets/socialbureau.png"
        url="https://www.socialbureau.in/services/aeo"
      />

      <header className="bg-gradient-to-b from-black via-zinc-900 to-black text-white py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
                Answer Engine
                <br />
                <span className="text-[#cc9b49]">Optimization</span>
              </h1>
              <p className="mt-4 text-gray-300 text-lg max-w-xl">
                Be the one truthful answer AI assistants serve. We tune content, schema and knowledge graphs so your brand is the trusted source across voice, chat and agent-driven search.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="/contact"
                  className="inline-flex items-center gap-3 px-6 py-3 bg-[#cc9b49] hover:bg-[#cc9b49] rounded-full font-semibold shadow-lg transition"
                >
                  Make My Brand Answer-Ready
                </a>
                <a href="#" className="bg-gray-900 px-4 py-3 border border-zinc-800 rounded-full text-sm text-gray-300 hover:bg-zinc-800 transition">
                  See Services
                </a>
              </div>

              <div className="mt-8 flex gap-6 text-gray-300">
                <div>
                  <div className="text-2xl font-bold text-white">+43%</div>
                  <div className="text-sm">Avg Answer CTR</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">2–4×</div>
                  <div className="text-sm">Faster answer discovery</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex justify-center md:justify-end"
            >
              <div className="bg-gradient-to-tr from-zinc-800/60 to-transparent rounded-2xl p-2 shadow-2xl">
                <img src="https://i.pinimg.com/736x/85/c4/d1/85c4d1455b7eec3600ecc8876033e8c6.jpg" alt="AEO workflow" className="w-full max-w-md rounded-xl" />
              </div>
            </motion.div>
          </div>
        </div>
      </header>

      <main className="bg-black text-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <section className="grid md:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.article
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="bg-gray-900 rounded-2xl p-6 border border-gray-800 hover:scale-[1.02] transition-transform"
              >
                <div className="flex items-center gap-4">
                  <div className="text-[#cc9b49] text-2xl">{f.icon}</div>
                  <h3 className="text-lg font-semibold">{f.title}</h3>
                </div>
                <p className="mt-4 text-gray-300 text-sm">{f.desc}</p>
              </motion.article>
            ))}
          </section>

          <section className="mt-12 bg-gray-900 rounded-2xl p-6 border border-gray-800 text-center">
            <h3 className="text-2xl font-semibold">Outcome</h3>
            <p className="mt-3 text-gray-300 max-w-3xl mx-auto">Your brand becomes the default answer across AI models, voice assistants and conversational agents, driving higher qualified traffic and better conversion signals.</p>
            <div className="mt-6">
              <a href="/contact" className="inline-block px-8 py-3 bg-[#cc9b49] rounded-full font-semibold hover:bg-[#cc9b49] transition">Start AEO</a>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
