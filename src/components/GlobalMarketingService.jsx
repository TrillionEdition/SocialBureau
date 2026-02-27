import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiGlobe, FiTrendingUp, FiZap, FiDownload } from 'react-icons/fi';
import { FaFacebookF, FaGoogle, FaLinkedinIn, FaTwitter, FaAmazon, FaPinterest, FaSpotify, FaReddit, FaSnapchat } from 'react-icons/fa';
import { SiTiktok } from 'react-icons/si';
import Seo from './Seo';
import Footer from './Footer';

export default function GlobalMarketingService() {
  const [activeService, setActiveService] = useState(0);
  const [showDashboard, setShowDashboard] = useState(false);

  const platforms = [
    { name: 'Meta', icon: <FaFacebookF />, color: 'bg-blue-500' },
    { name: 'Google', icon: <FaGoogle />, color: 'bg-red-500' },
    { name: 'TikTok', icon: <SiTiktok />, color: 'bg-pink-500' },
    { name: 'LinkedIn', icon: <FaLinkedinIn />, color: 'bg-blue-700' },
    { name: 'Twitter', icon: <FaTwitter />, color: 'bg-sky-400' },
    { name: 'Amazon', icon: <FaAmazon />, color: 'bg-orange-500' },
    { name: 'Pinterest', icon: <FaPinterest />, color: 'bg-red-600' },
    { name: 'Spotify', icon: <FaSpotify />, color: 'bg-green-500' },
    { name: 'Reddit', icon: <FaReddit />, color: 'bg-orange-600' },
    { name: 'Snapchat', icon: <FaSnapchat />, color: 'bg-yellow-400' },
  ];

  const services = [
    {
      title: 'API Marketing & Automation',
      subtitle: 'Integrate. Automate. Scale.',
      desc: 'We connect your brand directly to the world\'s top marketing platforms using API technology. No manual work - pure machine-to-machine communication for faster, data-driven campaign management.',
      gradient: 'from-blue-500/20 to-cyan-500/20',
    },
    {
      title: 'Performance Marketing',
      subtitle: 'Measurable Results. Global Reach.',
      desc: 'Our performance campaigns are built to convert powered by AI + API automation and real-time analytics.',
      gradient: 'from-green-500/20 to-emerald-500/20',
    },
    {
      title: 'Platform Prompting™',
      subtitle: 'Teach Every Platform to Understand Your Brand',
      desc: 'We are the pioneers of Platform Prompting™ the process of training algorithms on Meta, Google, TikTok, and others to recognize your brand identity, audience, and business goals.',
      gradient: 'from-purple-500/20 to-pink-500/20',
    },
    {
      title: 'Global Ad Management',
      subtitle: 'One Agency. Every Platform.',
      desc: 'We run high-performance campaigns across all major platforms, synced through a centralized API dashboard.',
      gradient: 'from-orange-500/20 to-red-500/20',
    },
  ];

  const niches = [
    'Health & Wellness',
    'Education & EdTech',
    'FinTech & Banking',
    'E-Commerce & Retail',
    'Real Estate & Architecture',
    'SaaS & Tech Products',
    'Fashion & Lifestyle',
    'Automotive & Travel',
    'Entertainment & Media',
  ];

  function downloadDeck() {
    const payload = {
      title: 'SocialBureau Global Marketing Services',
      services: services.map(s => s.title),
      platforms: platforms.map(p => p.name),
      niches,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'global-marketing-deck.json';
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <>
      <Seo
        title="SocialBureau Global Marketing | API Marketing & Multi-Platform Ad Agency"
        description="SocialBureau offers global marketing services powered by API automation across Meta, Google, TikTok, LinkedIn, Amazon Ads, and more. We specialize in API marketing, performance marketing, platform prompting, SEO, content marketing, and AI analytics for worldwide brand growth."
        keywords="global marketing agency, api marketing agency, platform prompting, ai marketing, multi-platform ad agency, meta ads, google ads api, tiktok marketing experts, snapchat ads, taboola marketing, programmatic dsp agency, content marketing, seo agency, performance marketing, global media buying, marketing automation api, adtech platform, socialbureau, trillionedition llp"
        image="/assets/socialbureau.png"
        url="https://www.socialbureau.inglobal-marketing"
        canonicalUrl="https://www.socialbureau.inglobal-marketing"
      />

      <div className="min-h-screen bg-gradient-to-b from-[#020817] via-[#0f172a] to-[#1e293b] text-slate-100 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <header className="grid md:grid-cols-2 gap-12 items-center py-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full mb-6">
                <FiGlobe className="text-cyan-400" />
                <span className="text-sm text-cyan-300 uppercase tracking-wide">Global Marketing Services</span>
              </div>

              <h1 className="text-4xl md:text-6xl font-extrabold leading-tight bg-gradient-to-r from-white via-cyan-200 to-blue-300 bg-clip-text text-transparent">
                Connect Every Platform to Your Brand
              </h1>

              <p className="mt-6 text-xl text-slate-300/90 leading-relaxed">
                API-driven marketing across Meta, Google, TikTok, LinkedIn, Amazon, and 50+ global platforms managed from one intelligent dashboard.
              </p>

              <div className="mt-8 flex gap-4 flex-wrap">
                <button
                  onClick={() => setShowDashboard(true)}
                  className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-semibold inline-flex items-center gap-2 hover:scale-105 transition-transform shadow-lg shadow-cyan-500/30"
                >
                  <FiZap />
                  View Live Dashboard
                </button>
                <button
                  onClick={downloadDeck}
                  className="px-6 py-3 border-2 border-slate-600 rounded-lg hover:border-cyan-500 hover:bg-slate-800/50 transition-all inline-flex items-center gap-2"
                >
                  <FiDownload />
                  Download Deck
                </button>
              </div>

              <div className="mt-8 text-sm text-slate-400">
                <span className="font-semibold text-cyan-400">50+ platforms</span> · <span className="font-semibold text-cyan-400">180 countries</span> · <span className="font-semibold text-cyan-400">Real-time automation</span>
              </div>
            </motion.div>

            {/* Platform Grid */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold">Integrated Platforms</h3>
                  <div className="text-xs text-slate-500">API Connected</div>
                </div>

                <div className="grid grid-cols-5 gap-4">
                  {platforms.map((platform, i) => (
                    <motion.div
                      key={platform.name}
                      whileHover={{ scale: 1.15, rotate: 5 }}
                      className={`${platform.color} w-12 h-12 rounded-xl grid place-items-center text-white text-xl shadow-lg cursor-pointer`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      {platform.icon}
                    </motion.div>
                  ))}
                </div>

                <div className="mt-8 p-4 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-xl border border-cyan-500/20">
                  <div className="text-sm text-slate-300 mb-2">Live Campaign Status</div>
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <div className="text-2xl font-bold text-cyan-400">247</div>
                      <div className="text-xs text-slate-400">Active campaigns</div>
                    </div>
                    <div className="flex-1">
                      <div className="text-2xl font-bold text-green-400">94.2%</div>
                      <div className="text-xs text-slate-400">Uptime</div>
                    </div>
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-3 h-3 bg-green-500 rounded-full"
                    />
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full blur-2xl"
              />
            </motion.div>
          </header>

          {/* Services Grid */}
          <section className="mt-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">🌍 Our Global Marketing Services</h2>
              <p className="text-slate-400 text-lg max-w-3xl mx-auto">
                End-to-end marketing solutions powered by API automation and AI intelligence
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {services.map((service, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.03, y: -8 }}
                  className={`bg-gradient-to-br ${service.gradient} border border-white/10 p-8 rounded-3xl cursor-pointer relative overflow-hidden group`}
                  onClick={() => setActiveService(i)}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    animate={{ x: [-1000, 1000] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />

                  <div className="relative z-10">
                    <div className="text-4xl mb-4">{i + 1}</div>
                    <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                    <p className="text-cyan-300 font-semibold mb-3">{service.subtitle}</p>
                    <p className="text-slate-300 leading-relaxed">{service.desc}</p>

                    {i === 2 && (
                      <div className="mt-4 p-4 bg-white/5 rounded-lg border border-white/10">
                        <p className="text-sm italic text-slate-300">
                          "Every platform is a machine we teach it your language."
                        </p>
                      </div>
                    )}
                  </div>

                  <motion.div
                    className="absolute -bottom-4 -right-4 w-32 h-32 bg-cyan-500/20 rounded-full blur-3xl"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  />
                </motion.div>
              ))}
            </div>
          </section>

          {/* API Benefits */}
          <section className="mt-20 bg-slate-900/40 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-10">
            <h2 className="text-3xl font-bold mb-8">Key Benefits of API Marketing</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {['Real-time campaign syncing', 'Predictive optimization', 'Multi-platform audience automation', 'Unified reporting dashboard'].map((benefit, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  className="p-6 bg-gradient-to-br from-slate-800/60 to-black/40 rounded-xl border border-slate-700/50"
                >
                  <div className="text-3xl mb-3">
                    {i === 0 && '⚡'}
                    {i === 1 && '🤖'}
                    {i === 2 && '🎯'}
                    {i === 3 && '📊'}
                  </div>
                  <p className="font-semibold text-white">{benefit}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Niches */}
          <section className="mt-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Precision Marketing for Every Industry</h2>
              <p className="text-slate-400">We specialize in niche audience segmentation powered by machine learning</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {niches.map((niche, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05, backgroundColor: 'rgba(6, 182, 212, 0.1)' }}
                  className="p-6 bg-slate-800/40 rounded-xl border border-slate-700/50 text-center cursor-pointer transition-all"
                >
                  <p className="font-semibold text-white">{niche}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="mt-20 p-10 rounded-3xl bg-gradient-to-r from-cyan-600/20 via-blue-600/20 to-purple-600/20 border border-cyan-500/30 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Connect Every Platform to Your Brand?</h2>
            <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
              Join global businesses using SocialBureau's API-driven marketing technology to automate and expand their growth worldwide.
            </p>

            <div className="flex gap-4 justify-center flex-wrap">
              <button
                onClick={() => alert('Demo requested!')}
                className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-bold hover:scale-105 transition-transform shadow-lg"
              >
                Request Global Demo
              </button>
              <button
                onClick={() => alert('Consultation booked!')}
                className="px-8 py-4 border-2 border-cyan-500 rounded-lg hover:bg-cyan-500/10 transition-all font-semibold"
              >
                Book a Consultation
              </button>
              <button
                onClick={() => alert('Access granted!')}
                className="px-8 py-4 border-2 border-slate-600 rounded-lg hover:border-cyan-500 hover:bg-slate-800/50 transition-all"
              >
                Get Platform Access
              </button>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
