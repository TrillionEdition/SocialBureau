import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSmartphone, FiPlay, FiTarget, FiTrendingUp, FiDownload } from 'react-icons/fi';

import Seo from './Seo';
import Footer from './Footer';

export default function AppAdvertisingService() {
  const [activeFormat, setActiveFormat] = useState(0);
  const [showMetrics, setShowMetrics] = useState(true);

  const appNetworks = [
    { name: 'Unity Ads', desc: 'In-game advertising network', color: 'from-gray-700 to-gray-900' },
    { name: 'IronSource / AppLovin', desc: 'Performance-based app advertising', color: 'from-blue-600 to-indigo-700' },
    { name: 'Chartboost', desc: 'Mobile gaming app ads', color: 'from-green-600 to-emerald-700' },
    { name: 'Vungle / Liftoff', desc: 'Video & rewarded ad delivery', color: 'from-purple-600 to-pink-600' },
    { name: 'AdColony', desc: 'High-engagement video ads', color: 'from-red-600 to-orange-600' },
    { name: 'InMobi', desc: 'Mobile-first global ad network', color: 'from-cyan-600 to-blue-600' },
    { name: 'MoPub (X Ads)', desc: 'Programmatic app ad exchange', color: 'from-sky-600 to-blue-700' },
    { name: 'Tapjoy / Fyber', desc: 'Rewarded engagement ads', color: 'from-yellow-600 to-orange-600' },
  ];

  const adFormats = [
    { name: 'Native Ads', icon: '📱', desc: 'App-Integrated seamless placements' },
    { name: 'Rewarded Video', icon: '🎁', desc: 'Engagement-driven video rewards' },
    { name: 'Playable Ads', icon: '🎮', desc: 'Interactive mini-game experiences' },
    { name: 'Interstitial & Banner', icon: '🖼️', desc: 'Full-screen and banner placements' },
    { name: 'Audio Ads', icon: '🎵', desc: 'Spotify, Radio Apps integration' },
    { name: 'OTT/CTV Ads', icon: '📺', desc: 'Smart TV & Streaming networks' },
  ];

  const capabilities = [
    'App Audience Targeting',
    'Automated Bidding',
    'Real-Time Analytics',
    'Cross-App Retargeting',
    'Global Delivery (180+ countries)',
  ];

  function downloadReport() {
    const data = {
      title: 'SocialBureau App Advertising Report',
      networks: appNetworks.map(n => n.name),
      formats: adFormats.map(f => f.name),
      capabilities,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'app-advertising-report.json';
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <>
      <Seo
        title="SocialBureau App Advertising | In-App Ads & Mobile Marketing Agency"
        description="Reach users inside the apps they use every day. SocialBureau specializes in third-party app advertising, mobile app marketing, in-app ads, SDK integrations, Unity Ads, IronSource, InMobi, rewarded video ads, and programmatic mobile DSP campaigns."
        keywords="app advertising, mobile app marketing, in-app advertising, app sdk ads, unity ads agency, ironSource ads, inmobi advertising, programmatic mobile ads, api app marketing, game ads network, 3rd party app advertising, rewarded video ads, mobile dsp, app marketing automation, socialbureau, trillionedition llp"
        image="/assets/socialbureau.png"
        url="https://www.socialbureau.in/services/app-advertising"
      />
        <style>{`.no-scrollbar::-webkit-scrollbar{display:none}.no-scrollbar{-ms-overflow-style:none;scrollbar-width:none;}`}</style>
      <div className="min-h-screen bg-gradient-to-b from-[#0a0118] via-[#1a0b2e] to-[#16213e] text-slate-100 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <header className="grid md:grid-cols-2 gap-12 items-center py-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/30 rounded-full mb-6">
                <FiSmartphone className="text-purple-400" />
                <span className="text-sm text-purple-300 uppercase tracking-wide">Third-Party App Advertising</span>
              </div>

              <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
                Advertise Inside the Apps Your Audience Uses Every Day
              </h1>

              <p className="mt-6 text-xl text-slate-300/90 leading-relaxed">
                At <a style={{ fontFamily: "MyFont, sans-serif" }} href='https://socialbureau.in'>
              Social<span className="text-[#ff0000]">B</span>ureau
            </a>, we extend your brand's visibility beyond traditional ad platforms. Through API integrations and SDK networks, we connect your campaigns directly into 3rd-party apps, games, and digital ecosystems — reaching users where they spend most of their mobile time.
              </p>

              <div className="mt-8 flex gap-4 flex-wrap">
                <button
                  onClick={() => setShowMetrics(!showMetrics)}
                  className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg font-semibold inline-flex items-center gap-2 hover:scale-105 transition-transform shadow-lg shadow-purple-500/30"
                >
                  <FiPlay />
                  View Campaign Metrics
                </button>
                <button
                  onClick={downloadReport}
                  className="px-6 py-3 border-2 border-slate-600 rounded-lg hover:border-purple-500 hover:bg-slate-800/50 transition-all inline-flex items-center gap-2"
                >
                  <FiDownload />
                  Download Report
                </button>
              </div>

              <div className="mt-8 p-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl border border-purple-500/20">
                <div className="text-sm text-purple-300 mb-3">Why App Advertising?</div>
                <p className="text-slate-300 leading-relaxed">
                  Our 3rd-Party Application Advertising connects your brand with millions of daily active users across gaming, lifestyle, utility, and entertainment apps worldwide.
                </p>
              </div>
            </motion.div>

            {/* App Networks Visualization */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 shadow-2xl no-scrollbar">
                <h3 className="text-lg font-semibold mb-6">Active App Networks</h3>

                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {appNetworks.map((network, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ scale: 1.03, x: 5 }}
                      className={`bg-gradient-to-r ${network.color} p-4 rounded-xl cursor-pointer`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <div className="font-bold text-white">{network.name}</div>
                      <div className="text-sm text-slate-200 mt-1">{network.desc}</div>
                    </motion.div>
                  ))}
                </div>

                {showMetrics && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl border border-green-500/20"
                  >
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-green-400">50M+</div>
                        <div className="text-xs text-slate-400">Daily impressions</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-cyan-400">180+</div>
                        <div className="text-xs text-slate-400">Countries</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-purple-400">98.5%</div>
                        <div className="text-xs text-slate-400">Fill rate</div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"
              />
            </motion.div>
          </header>

          {/* Ad Formats */}
          <section className="mt-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">Ad Formats We Support</h2>
              <p className="text-slate-400 text-lg">Creative ad solutions for app ecosystems</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {adFormats.map((format, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05, y: -8 }}
                  onClick={() => setActiveFormat(i)}
                  className={`p-8 rounded-3xl cursor-pointer relative overflow-hidden ${
                    activeFormat === i
                      ? 'bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-2 border-purple-500'
                      : 'bg-slate-800/40 border border-slate-700/50'
                  }`}
                >
                  <div className="text-5xl mb-4">{format.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{format.name}</h3>
                  <p className="text-slate-400">{format.desc}</p>

                  {activeFormat === i && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-purple-500/10"
                    />
                  )}
                </motion.div>
              ))}
            </div>
          </section>

          {/* Capabilities */}
          <section className="mt-20 bg-slate-900/40 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-10">
            <h2 className="text-3xl font-bold mb-8">Our Capabilities</h2>
            <p className="text-slate-300 mb-8 text-lg">
              Smart API Infrastructure for App Campaigns — We manage every layer of your app advertising through our integrated API framework:
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {capabilities.map((cap, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05, backgroundColor: 'rgba(168, 85, 247, 0.1)' }}
                  className="p-6 bg-gradient-to-br from-slate-800/60 to-black/40 rounded-xl border border-slate-700/50 flex items-start gap-4"
                >
                  <div className="text-2xl">
                    {i === 0 && '🎯'}
                    {i === 1 && '🤖'}
                    {i === 2 && '📊'}
                    {i === 3 && '🔄'}
                    {i === 4 && '🌍'}
                  </div>
                  <div>
                    <p className="font-semibold text-white">{cap}</p>
                    <p className="text-sm text-slate-400 mt-1">
                      {i === 0 && 'Behavior-based segmentation using SDK data'}
                      {i === 1 && 'Programmatic cost optimization powered by ML'}
                      {i === 2 && 'Track conversions and engagement directly'}
                      {i === 3 && 'Re-engage users across multiple apps'}
                      {i === 4 && 'Reach audiences via app partners and DSPs'}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Why Choose Us */}
          <section className="mt-20">
            <div className="bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-purple-500/10 border border-purple-500/30 rounded-3xl p-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Choose <a style={{ fontFamily: "MyFont, sans-serif" }} href='https://socialbureau.in'>
              Social<span className="text-[#ff0000]">B</span>ureau
            </a> for App Advertising</h2>
              <h3 className="text-2xl font-semibold text-purple-300 mb-4">
                Unified App + Platform Advertising Under One Roof
              </h3>

              <p className="text-xl text-slate-300 leading-relaxed mb-6">
                Unlike traditional agencies that treat app ads as separate silos, we integrate them directly into your API marketing architecture.
              </p>

              <div className="grid md:grid-cols-2 gap-6 mt-8">
                {[
                  'Unified conversion tracking',
                  'Budget allocation AI',
                  'Platform learning synchronization',
                  'End-to-end automation from one dashboard',
                ].map((benefit, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 bg-white/5 rounded-xl">
                    <div className="text-2xl text-green-400">✓</div>
                    <p className="text-lg font-medium">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="mt-20 p-10 rounded-3xl bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-purple-600/20 border border-purple-500/30 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Reach Millions Through In-App Advertising?</h2>
            <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
              Connect your brand to the apps where your audience spends their time. Start your app advertising campaign today.
            </p>

            <div className="flex gap-4 justify-center flex-wrap">
              <button
                onClick={() => alert('Campaign started!')}
                className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg font-bold hover:scale-105 transition-transform shadow-lg"
              >
                <FiTarget className="inline mr-2" />
                Start App Campaign
              </button>
              <button
                onClick={() => alert('Strategy booked!')}
                className="px-8 py-4 border-2 border-purple-500 rounded-lg hover:bg-purple-500/10 transition-all font-semibold"
              >
                Book Strategy Call
              </button>
            </div>
          </section>
        </div>
      </div>

    </>
  );
}
