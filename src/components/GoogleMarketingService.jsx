import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiZap, FiTrendingUp, FiCpu, FiDownload, FiPlay } from 'react-icons/fi';
import { FaGoogle, FaYoutube } from 'react-icons/fa';
import { SiGoogleads, SiGoogleanalytics } from 'react-icons/si';
import Navbar from './Navbar';
import Seo from './Seo';
import Footer from './Footer';

export default function GoogleMarketingService() {
  const [activeFeature, setActiveFeature] = useState(0);
  const [showAIDemo, setShowAIDemo] = useState(false);

  const tools2025 = [
    {
      title: 'AI-Powered Campaigns & Automation',
      icon: '🤖',
      desc: 'We deploy Google\'s latest "AI Max for Search" solutions — letting you activate advanced targeting and creative generation with a single toggle.',
      features: [
        'AI Max for Search with advanced targeting',
        'Performance Max with channel-level reporting',
        'Agentic AI assistants in Google Ads & Analytics',
      ],
      gradient: 'from-blue-500/20 to-indigo-500/20',
    },
    {
      title: 'Enhanced Creative & Asset-Generation',
      icon: '🎨',
      desc: 'Google\'s generative tools now allow images to video conversions, automatic reformatting, and auto-generation of visual assets.',
      features: [
        'Images to video conversion',
        'Multi-platform creative reformatting',
        'Product Studio auto-generation',
      ],
      gradient: 'from-purple-500/20 to-pink-500/20',
    },
    {
      title: 'Advanced Measurement & Attribution',
      icon: '📊',
      desc: 'Google\'s modern MMM tool called Meridian integrates first-party data, cross-channel insights, and scenario planning.',
      features: [
        'Meridian open-source MMM',
        'Attributed Brand Searches tracking',
        'Unified web + app conversion tracking',
      ],
      gradient: 'from-green-500/20 to-emerald-500/20',
    },
    {
      title: 'Shopping, Discovery & YouTube Innovations',
      icon: '🛍️',
      desc: 'Shoppable placements on YouTube and AI-driven 3D/Virtual Try-On integrations for product ads in Google Shopping.',
      features: [
        'YouTube Masthead shoppable placements',
        'Interactive CTV experiences',
        'AI-driven 3D/Virtual Try-On',
      ],
      gradient: 'from-red-500/20 to-orange-500/20',
    },
  ];

  const googlePlatforms = [
    { name: 'Google Ads', icon: <SiGoogleads />, color: 'bg-yellow-500' },
    { name: 'Google Analytics', icon: <SiGoogleanalytics />, color: 'bg-orange-500' },
    { name: 'YouTube', icon: <FaYoutube />, color: 'bg-red-600' },
    { name: 'Google Search', icon: <FaGoogle />, color: 'bg-blue-500' },
  ];

  const integrations = [
    'Google Analytics 4',
    'Meta Conversion API',
    'Data Studio / Looker API',
    'Custom AI Dashboards',
    'Server-Side Tracking',
  ];

  function downloadToolkit() {
    const data = {
      title: 'SocialBureau Google Marketing Tools 2025',
      tools: tools2025.map(t => t.title),
      platforms: googlePlatforms.map(p => p.name),
      integrations,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'google-marketing-toolkit-2025.json';
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <>
      <Navbar />
      <Seo
        title="SocialBureau Google Marketing | AI-Powered Google Ads & Analytics Agency 2025"
        description="Master Google's 2025 marketing tools with SocialBureau. We specialize in AI Max Search, Performance Max, Google Ads automation, YouTube shoppable ads, Google Analytics Agentic AI, Meridian MMM, and advanced measurement solutions for global campaigns."
        keywords="google marketing tools 2025, ai max search google, performance max channel reporting, google ads generative creative, google measurement mix model meridian, youtube shoppable ads, google shopping ai tools, google ads automation, google analytics agentic ai, socialbureau google marketing services"
        image="/assets/socialbureau.png"
        url="https://www.socialbureau.in/services/google-marketing"
      />

      <div className="min-h-screen bg-gradient-to-b from-[#0a0f1e] via-[#1a1f2e] to-[#0f1419] text-slate-100 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <header className="grid md:grid-cols-2 gap-12 items-center py-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full mb-6">
                <FiCpu className="text-blue-400" />
                <span className="text-sm text-blue-300 uppercase tracking-wide">Google Ecosystem Marketing</span>
              </div>

              <h1 className="text-4xl md:text-6xl font-extrabold leading-tight bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Cutting-Edge Google Marketing Tools for 2025 & Beyond
              </h1>

              <p className="mt-6 text-xl text-slate-300/90 leading-relaxed">
                At SocialBureau, we stay ahead of the curve by mastering the newest marketing tools from Google — ensuring your brand leverages every innovation in targeting, automation, creative, and measurement.
              </p>

              <div className="mt-8 flex gap-4 flex-wrap">
                <button
                  onClick={() => setShowAIDemo(true)}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg font-semibold inline-flex items-center gap-2 hover:scale-105 transition-transform shadow-lg shadow-blue-500/30"
                >
                  <FiPlay />
                  View AI Demo
                </button>
                <button
                  onClick={downloadToolkit}
                  className="px-6 py-3 border-2 border-slate-600 rounded-lg hover:border-blue-500 hover:bg-slate-800/50 transition-all inline-flex items-center gap-2"
                >
                  <FiDownload />
                  Download Toolkit
                </button>
              </div>

              <div className="mt-8 p-6 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-2xl border border-blue-500/20">
                <div className="flex items-center gap-3 mb-3">
                  <FiZap className="text-yellow-400 text-2xl" />
                  <span className="text-sm font-semibold text-blue-300">2025 Innovation Advantage</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  These tools give your campaigns precision, scale & future-proof performance across Search, YouTube, Display, Shopping, and beyond.
                </p>
              </div>
            </motion.div>

            {/* Google Platforms Visual */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 shadow-2xl">
                <h3 className="text-lg font-semibold mb-6">Google Marketing Ecosystem</h3>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  {googlePlatforms.map((platform, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className={`${platform.color} p-6 rounded-2xl text-white text-center cursor-pointer shadow-lg`}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.15 }}
                    >
                      <div className="text-4xl mb-2">{platform.icon}</div>
                      <div className="font-semibold text-sm">{platform.name}</div>
                    </motion.div>
                  ))}
                </div>

                <div className="p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl border border-green-500/20">
                  <div className="text-sm text-green-300 mb-3">Live Performance Metrics</div>
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div>
                      <div className="text-xl font-bold text-green-400">+156%</div>
                      <div className="text-xs text-slate-400">ROAS uplift</div>
                    </div>
                    <div>
                      <div className="text-xl font-bold text-blue-400">2.4M</div>
                      <div className="text-xs text-slate-400">Impressions/day</div>
                    </div>
                    <div>
                      <div className="text-xl font-bold text-purple-400">92%</div>
                      <div className="text-xs text-slate-400">Quality Score</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Animated glow */}
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-br from-blue-500/30 to-indigo-500/30 rounded-full blur-3xl"
              />
            </motion.div>
          </header>

          {/* 2025 Tools */}
          <section className="mt-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">🚀 Google Marketing Tools & Services 2025</h2>
              <p className="text-slate-400 text-lg max-w-3xl mx-auto">
                Leverage the latest innovations in AI, automation, measurement, and creative generation
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {tools2025.map((tool, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.03, y: -8 }}
                  onClick={() => setActiveFeature(i)}
                  className={`bg-gradient-to-br ${tool.gradient} border ${
                    activeFeature === i ? 'border-blue-500' : 'border-white/10'
                  } p-8 rounded-3xl cursor-pointer relative overflow-hidden group`}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/10 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    animate={{ x: [-1000, 1000] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />

                  <div className="relative z-10">
                    <div className="text-5xl mb-4">{tool.icon}</div>
                    <h3 className="text-2xl font-bold mb-3">{tool.title}</h3>
                    <p className="text-slate-300 mb-6 leading-relaxed">{tool.desc}</p>

                    <div className="space-y-2">
                      <div className="text-sm font-semibold text-blue-300 mb-2">Key Features:</div>
                      {tool.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <div className="text-green-400 mt-1">✓</div>
                          <span className="text-sm text-slate-300">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <motion.div
                    className="absolute -bottom-4 -right-4 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl"
                    animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.5, 0.2] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  />
                </motion.div>
              ))}
            </div>
          </section>

          {/* Strategic Integration */}
          <section className="mt-20 bg-slate-900/40 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-10">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-3xl font-bold mb-6">Strategic Platform Integration & Global Scaling</h2>
                <p className="text-slate-300 leading-relaxed mb-6">
                  We help brands activate Google tools globally, across regions and languages — while keeping control via centralized dashboards and API integrations.
                </p>
                <p className="text-slate-300 leading-relaxed">
                  From campaign set-up to asset generation, tracking to optimization — all elements of your Google marketing stack are supported by our team and technology infrastructure.
                </p>

                <div className="mt-6">
                  <button
                    onClick={() => alert('Global setup booked!')}
                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg font-semibold hover:scale-105 transition-transform"
                  >
                    <FiTrendingUp className="inline mr-2" />
                    Book Global Setup
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">Data & AI Analytics Integration</h3>
                <p className="text-slate-300 mb-6">
                  Our AI tools analyze billions of data points from your API-integrated platforms to provide predictive insights, audience learning, and budget intelligence.
                </p>

                <div className="space-y-3">
                  {integrations.map((integration, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ x: 5, backgroundColor: 'rgba(59, 130, 246, 0.1)' }}
                      className="p-4 bg-slate-800/40 rounded-xl border border-slate-700/50 flex items-center gap-3 cursor-pointer"
                    >
                      <div className="text-2xl">
                        {i === 0 && '📊'}
                        {i === 1 && '🔗'}
                        {i === 2 && '📈'}
                        {i === 3 && '🤖'}
                        {i === 4 && '🔒'}
                      </div>
                      <span className="font-medium">{integration}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* AI Demo Modal */}
          {showAIDemo && (
            <div
              className="fixed inset-0 z-50 grid place-items-center bg-black/80 p-4"
              onClick={() => setShowAIDemo(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-slate-900 rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl border border-blue-500/30"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold">AI Campaign Assistant Demo</h3>
                    <button
                      onClick={() => setShowAIDemo(false)}
                      className="text-slate-400 hover:text-white text-2xl"
                    >
                      ×
                    </button>
                  </div>

                  <div className="bg-slate-800/50 rounded-xl p-6 mb-6">
                    <p className="text-slate-300 mb-4">
                      Google's Agentic AI helps set up campaigns, optimize bids, identify opportunities, and streamline workflows automatically.
                    </p>
                    <div className="grid grid-cols-3 gap-4">
                      {['Campaign Setup', 'Bid Optimization', 'Performance Insights'].map((feature, i) => (
                        <div key={i} className="p-4 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-lg text-center border border-blue-500/20">
                          <div className="text-3xl mb-2">
                            {i === 0 && '⚙️'}
                            {i === 1 && '🎯'}
                            {i === 2 && '💡'}
                          </div>
                          <div className="text-sm font-semibold">{feature}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => setShowAIDemo(false)}
                    className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg font-semibold hover:scale-105 transition-transform"
                  >
                    Get Started with AI Campaigns
                  </button>
                </div>
              </motion.div>
            </div>
          )}

          {/* CTA */}
          <section className="mt-20 p-10 rounded-3xl bg-gradient-to-r from-blue-600/20 via-indigo-600/20 to-purple-600/20 border border-blue-500/30 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Dominate Google Marketing in 2025?</h2>
            <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
              Leverage cutting-edge Google tools and AI automation to scale your campaigns globally with precision and intelligence.
            </p>

            <div className="flex gap-4 justify-center flex-wrap">
              <button
                onClick={() => alert('Audit requested!')}
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg font-bold hover:scale-105 transition-transform shadow-lg"
              >
                Request Google Audit
              </button>
              <button
                onClick={() => alert('Strategy booked!')}
                className="px-8 py-4 border-2 border-blue-500 rounded-lg hover:bg-blue-500/10 transition-all font-semibold"
              >
                Book Strategy Session
              </button>
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </>
  );
}
