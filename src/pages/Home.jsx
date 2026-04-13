import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useSpring, useInView, AnimatePresence } from 'framer-motion';
import Seo from "../components/Seo";
import SchemaMarkup from "../components/SchemaMarkup";
import { generateHomepageSchemas } from "../../utils/schema";

// --- Sub-components ---


const FadeUp = ({ children, delay = 0, duration = 0.8, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-10% 0px" }}
    transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

const Section = ({ id, className = "", children }) => (
  <section id={id} className={`py-20 sm:py-32 relative overflow-hidden ${className}`}>
    <div className="max-w-7xl mx-auto px-4 sm:px-14">
      {children}
    </div>
  </section>
);

const MarqueeSection = () => {
  const words = ['API Marketing', 'Performance Marketing', 'ClickUp India Partner', 'Social Media Management', 'Influencer Marketing', 'Brand Strategy'];
  return (
    <div className="border-y border-[#D2D2D7] bg-[#F5F5F7] py-6 overflow-hidden relative">
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="flex whitespace-nowrap gap-12"
      >
        {[1, 2].map((group) => (
          <div key={group} className="flex items-center gap-12">
            {words.map((text) => (
              <div key={text} className="flex items-center gap-12 text-[12px] font-bold text-[#6E6E73] uppercase tracking-[0.2em]">
                <span>{text}</span>
                <div className="w-1.5 h-1.5 bg-[#E8001A] rounded-full" />
              </div>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

const PlatformDetailSection = () => (
  <Section id="platforms" className="bg-white border-t border-[#D2D2D7]">
    <div className="flex flex-col lg:flex-row justify-between items-center lg:items-end gap-10 mb-16 md:mb-20">
      <FadeUp className="flex-1 text-center lg:text-left">
        <span className="text-[13px] font-black text-[#E8001A] uppercase tracking-[0.3em] mb-4 block underline decoration-2 underline-offset-8">Official Partnerships</span>
        <h2 className="text-[clamp(2.5rem,7vw,5rem)] font-black tracking-tighter text-[#0A0A0A] leading-[1.1]">Partners that<br /><span className="bg-gradient-to-tr from-[#E8001A] via-[#FF5C35] to-[#FF1493] bg-clip-text text-transparent italic">Power Our Work.</span></h2>
      </FadeUp>
      <FadeUp delay={0.2} className="text-center lg:text-right">
        <p className="text-lg md:text-xl font-light text-[#6E6E73] max-w-md italic antialiased">Certified by the software giants that define the modern internet.</p>
      </FadeUp>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
      {[
        { t: 'Google Partner', d: 'Certified Google Partner with advanced access to Google Ads & Analytics — delivering precision targeting and transparent reporting.', b: '✓ Official Google Partner', c: 'Google', g: 'white', icon: 'google' },
        { t: 'Meta Business Partner', d: 'Official Meta Business Partner with exclusive access to advanced audience targeting and direct support.', b: '✓ Official Meta Partner', c: 'Meta', g: 'white', icon: 'meta' },
        { t: 'ClickUp India Partner', d: 'Official ClickUp reseller for India. Get licensed subscriptions with full onboarding, team training, and INR invoicing.', b: '✓ Verified Reseller Partner', c: 'ClickUp', g: 'white', icon: 'clickup' },
        { t: 'YouTube Certified', d: 'managing video strategy, monetisation, advertising, and channel growth for Kerala\'s leading content creators.', b: '✓ Certified YouTube Partner', c: 'YouTube', g: 'white', icon: 'youtube' }
      ].map((plat, i) => (
        <FadeUp key={plat.t} delay={i * 0.1} className="rounded-[40px] overflow-hidden border border-[#D2D2D7] group hover:shadow-2xl transition-all duration-700 bg-white">
          <div className={`h-64 bg-gradient-to-br ${plat.g} flex flex-col items-center justify-center relative overflow-hidden`}>
            <div className="absolute inset-0 bg-white/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10 transform group-hover:scale-110 transition-transform duration-700 flex flex-col items-center gap-4">
              {/* Simplified Logo Represenation */}
              <a href='google.com/partners/become-a-partner/' target='_blank'>
                {plat.icon === 'google' && (
                  <img src="assets/home/google.png" alt="Google" className="w-60 h-auto" />
                )}
              </a>
              {plat.icon === 'meta' && (
                <div className="flex items-center gap-3">
                  <a href='https://www.facebook.com/business/marketing-partners' target='_blank'>
                    <img src="assets/home/meta.png" alt="Meta" className="w-60 h-auto" />
                  </a>
                </div>
              )}
              {plat.icon === 'clickup' && (
                <div className="flex items-center gap-4">
                  <a href='https://www.clickup.com' target='_blank'>
                    <img src="assets/home/clickup.jpg" alt="ClickUp" className="w-60 h-auto" />
                  </a>
                </div>
              )}
              {plat.icon === 'youtube' && (
                <div className="flex items-center gap-3">
                  <a href='https://www.youtube.com/creators/partner-program/' target='_blank'>
                    <img src="assets/home/youtube.png" alt="YouTube" className="w-60 h-auto" />
                  </a>
                </div>
              )}
            </div>
          </div>
          <div className="p-12">
            <h4 className="text-2xl font-black text-[#0A0A0A] mb-3 tracking-tighter">{plat.t}</h4>
            <p className="text-[16px] font-light text-[#6E6E73] leading-relaxed mb-8">{plat.d}</p>
            <div className="inline-flex items-center gap-3 text-[11px] font-black text-[#E8001A] bg-[#E8001A]/[0.08] px-5 py-2 rounded-full uppercase tracking-widest border border-[#E8001A]/20">
              {plat.b}
            </div>
          </div>
        </FadeUp>
      ))}
    </div>
  </Section>
);

const GallerySection = () => (
  <Section id="gallery" className="bg-[#F5F5F7]">
    <FadeUp>
      <span className="text-[13px] font-black text-[#E8001A] uppercase tracking-[0.3em] mb-6 block opacity-70 italic text-center underline underline-offset-8 decoration-2">Our Work</span>
      <h2 className="text-[clamp(2.5rem,8vw,7rem)] font-black tracking-tighter text-[#0A0A0A] text-center leading-[0.9] mb-16 md:mb-20 italic antialiased">Growing brands,<br /><span className="bg-gradient-to-tr from-[#E8001A] via-[#FF5C35] to-[#FF1493] bg-clip-text text-transparent italic">one campaign at a time.</span></h2>
    </FadeUp>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <FadeUp className="lg:col-span-2 lg:row-span-2 rounded-[40px] overflow-hidden group shadow-2xl relative">
        <a href='https://www.instagram.com/p/DVdlqEkAd78/?igsh=MXJieGg0YWNheGN3Mw=='>
          <img src="https://res.cloudinary.com/dtwcgfmar/image/upload/q_auto/f_auto/v1776057987/suntips_fwlcy9.jpg" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt="Strategy" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-10">
            <span className="text-white font-black text-2xl tracking-tighter">SunTips</span>
          </div>
        </a>
      </FadeUp>
      <FadeUp delay={0.1} className="rounded-[40px] overflow-hidden group shadow-2xl aspect-square relative">
        <a href='https://www.instagram.com/p/DN5XbS9AUnU/?igsh=MW95bXM4OGhuMjZrbg=='>
          <img src="https://res.cloudinary.com/dtwcgfmar/image/upload/q_auto/f_auto/v1776057987/Parle_ovp0yu.jpg" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt="Social" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
            <span className="text-white font-black text-xl tracking-tighter">Parle-G</span>
          </div>
        </a>
      </FadeUp>
      <FadeUp delay={0.2} className="rounded-[40px] overflow-hidden group shadow-2xl aspect-square relative">
        <a href='https://www.instagram.com/p/DUiYb2MAYee/?igsh=MWQ1djYxM2tyYTNwag=='>
          <img src="https://res.cloudinary.com/dtwcgfmar/image/upload/q_auto/f_auto/v1776057987/sb_dd4gwn.jpg" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt="Performance" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
            <span className="text-white font-black text-xl tracking-tighter">SocialBureau</span>
          </div>
        </a>
      </FadeUp>
      <FadeUp delay={0.3} className="rounded-[40px] overflow-hidden group shadow-2xl aspect-video lg:aspect-auto relative min-h-[240px]">
        <a href='https://www.instagram.com/p/DWMEVPOgVcN/?igsh=MXAxbHB4dms2YWlzbg=='>
          <img src="https://res.cloudinary.com/dtwcgfmar/image/upload/q_auto/f_auto/v1776057987/suntip_ubjuoy.jpg" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt="Brand" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
            <span className="text-white font-black text-xl tracking-tighter">SunTips</span>
          </div>
        </a>
      </FadeUp>
      <FadeUp delay={0.4} className="rounded-[40px] overflow-hidden group shadow-2xl aspect-video lg:aspect-auto relative min-h-[240px]">
        <a href='https://www.instagram.com/p/DQJzWY4jFlG/?igsh=bm01c2Z6YXdrdXRy'>
          <img src="https://res.cloudinary.com/dtwcgfmar/image/upload/q_auto/f_auto/v1776057986/trillion_nj7q09.jpg" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt="Collaboration" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
            <span className="text-white font-black text-xl tracking-tighter">TrillionEdition</span>
          </div>
        </a>
      </FadeUp>
    </div>
  </Section>
);

const FounderSection = () => (
  <Section id="founder" className="bg-[#F5F5F7] border-y border-[#D2D2D7]">
    <div className="grid lg:grid-cols-2 gap-24 items-start">
      <FadeUp className="relative max-w-[480px] mx-auto lg:ml-0">
        <div className="rounded-[44px] overflow-hidden border border-black/5 bg-gradient-to-br from-[#FFF0F2] via-[#FFE5EA] to-[#F5E5FF] aspect-[0.82] relative group shadow-2xl">
          <img
            src="https://res.cloudinary.com/dtwcgfmar/image/upload/q_auto/f_auto/v1773048754/Adobe_Express_-_file_1_s8y5h5.webp"
            alt="Founder Sham SK"
            className="w-full h-full object-cover object-top transition-transform duration-1000 group-hover:scale-110"
          />
          <div className="absolute inset-x-5 bottom-5 bg-white/94 backdrop-blur-2xl border border-black/5 rounded-[24px] p-8 shadow-xl">
            <div className="text-3xl font-black tracking-tighter text-[#0A0A0A]">Sham SK</div>
            <div className="text-[13px] font-bold text-[#E8001A] mt-2 uppercase tracking-wide">World's First API Marketing Consultant</div>
            <div className="text-[12px] font-medium text-[#6E6E73] mt-1.5 italic font-serif">Founder & CEO · Social Bureau</div>
          </div>
        </div>
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-8 -right-8 bg-gradient-to-br from-[#E8001A] to-[#FF4444] rounded-2xl p-6 text-center shadow-2xl border border-white/20 z-[10]"
        >
          <div className="text-4xl font-black text-white leading-none tracking-tighter italic">#1</div>
          <div className="text-[10px] font-bold text-white/80 uppercase tracking-widest mt-1.5">World First</div>
        </motion.div>
      </FadeUp>

      <div className="space-y-16">
        <FadeUp delay={0.2} className="text-center lg:text-left">
          <span className="text-[13px] font-black text-[#E8001A] uppercase tracking-[0.4em] mb-6 block opacity-80 underline underline-offset-8 decoration-2">The Visionary</span>
          <h2 className="text-[clamp(3rem,8vw,6.5rem)] font-black tracking-tighter leading-[0.85] text-[#0A0A0A] italic antialiased">
            Meet<br /><span className="bg-gradient-to-tr from-[#E8001A] via-[#FF5C35] to-[#FF1493] bg-clip-text text-transparent">Sham SK.</span>
          </h2>
          <p className="text-xl md:text-2xl lg:text-3xl font-light text-[#6E6E73] leading-relaxed italic mt-10 max-w-xl mx-auto lg:mx-0">
            The architect who built the world's first API Marketing engine. A strategist who turns niche brands into market leaders.
          </p>
        </FadeUp>

        <div className="grid gap-6">
          {[
            { n: '01', t: 'Creator of API Marketing', d: 'Pioneered the world\'s first Attract → Pull → Influence framework, adopted by brands across India.' },
            { n: '02', t: 'Platform Partner Strategist', d: 'Direct partner consultant for Google, Meta, and ClickUp — the gatekeepers of the digital economy.' },
            { n: '03', t: '50+ Scale Operations', d: 'Engineered growth for fifty+ niche brands across Kerala and India through clinical precision.' }
          ].map((ach, i) => (
            <FadeUp key={ach.n} delay={0.1 * i + 0.3} className="flex gap-10 p-10 bg-white border border-[#D2D2D7] rounded-[36px] border-l-[8px] border-l-[#E8001A] hover:shadow-2xl hover:translate-x-2 transition-all duration-700 bg-white shadow-lg">
              <div className="text-6xl font-black text-[#E8001A] leading-none opacity-20 italic">{ach.n}</div>
              <div className="pt-2">
                <h4 className="text-2xl font-black text-[#0A0A0A] mb-3 tracking-tighter">{ach.t}</h4>
                <p className="text-[16px] font-light text-[#6E6E73] leading-relaxed italic">{ach.d}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </div>
  </Section>
);

const SoftwareSection = () => (
  <section id="software" className="py-32 sm:py-64 bg-[#0A0A0A] text-white relative overflow-hidden">
    {/* Animated background elements */}
    <div className="absolute inset-0 -z-10 bg-black">
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
          x: [0, 50, 0],
          y: [0, -50, 0]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[10%] left-[10%] w-[80%] h-[80%] bg-gradient-to-br from-[#E8001A]/20 to-transparent blur-[160px] rounded-full"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
          x: [0, -80, 0],
          y: [0, 80, 0]
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-0 right-[10%] w-[60%] h-[60%] bg-[#7B68EE]/15 blur-[150px] rounded-full"
      />
    </div>

    <div className="max-w-7xl mx-auto px-4 sm:px-14 grid lg:grid-cols-2 gap-20 lg:gap-32 items-center relative z-10">
      <FadeUp className="text-center lg:text-left">
        <span className="text-[13px] font-black text-[#E8001A] uppercase tracking-[0.4em] mb-8 block opacity-80 decoration-2 underline underline-offset-8 italic">Engineering the Future</span>
        <h2 className="text-[clamp(3.5rem,10vw,8.5rem)] font-black tracking-tighter leading-[0.8] mb-12 italic antialiased">
          The<br />
          <span className="bg-gradient-to-tr from-[#FF8A80] via-[#FF5C35] to-[#FF6FCF] bg-clip-text text-transparent underline decoration-[#E8001A]/30">Future</span><br />
          Of Media.
        </h2>
        <p className="text-xl md:text-2xl lg:text-3xl font-light text-white/60 mb-16 leading-tight italic max-w-lg mx-auto lg:mx-0">
          Social Bureau is engineering a first-of-its-kind software platform to transform how the creator economy and media operate.
        </p>
        <a href="mailto:info@gmail.com?subject=req%20for%20joining%20in%20waiting%20list%20for%20api%20marketing&body=i%20would%20like%20to%20get%20a%20short%20list%20in%20api%20marketing%20in%20here" className="inline-block px-14 py-6 bg-white text-[#0A0A0A] rounded-full font-black text-xl hover:bg-[#E8001A] hover:text-white transition-all hover:scale-105 shadow-[0_20px_60px_rgba(232,0,26,0.3)]">
          Join the waitlist
        </a>
      </FadeUp>

      <div className="grid gap-8">
        {[
          { t: 'Creator Intelligence Engine', d: 'AI-powered real-time audience analytics, content forecasting, and monetisation optimisation in one command centre.', s: 'In Development' },
          { t: 'Media Workflow OS', d: 'End-to-end production management — scripting to global distribution, built for the next generation of media hubs.', s: 'Coming 2025' },
          { t: 'API Marketing Dashboard', d: 'The first dedicated tool to execute our proprietary framework — track A, P, and I metrics with clinical accuracy.', s: 'Beta Early 2026' }
        ].map((feat, i) => (
          <FadeUp key={feat.t} delay={0.1 * i} className="bg-white/[0.04] backdrop-blur-3xl border border-white/10 rounded-[44px] p-12 hover:bg-white/[0.08] transition-all duration-700 hover:-translate-x-4 group">
            <div className="text-[12px] font-black text-[#E8001A] uppercase tracking-[0.25em] mb-6 opacity-60 group-hover:opacity-100 transition-opacity italic">Feature Module 0{i + 1}</div>
            <h4 className="text-3xl font-black mb-4 tracking-tighter text-white/90">{feat.t}</h4>
            <p className="text-white/40 text-[17px] leading-relaxed mb-10 font-light italic">{feat.d}</p>
            <div className="flex items-center gap-4 text-[12px] font-black text-white/20 uppercase tracking-widest group-hover:text-[#E8001A] transition-colors">
              <span className="w-2.5 h-2.5 bg-[#E8001A] rounded-full animate-ping" />
              {feat.s}
            </div>
          </FadeUp>
        ))}
      </div>
    </div>
  </section>
);

const BottomStatsSection = () => (
  <section className="bg-gradient-to-br from-[#0A0A0A] to-[#1A0008] border-y border-white/5 overflow-hidden">
    <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4">
      {[
        { n: '50+', l: 'Brands Scaled' },
        { n: '4×', l: 'Average ROAS' },
        { n: '₹10Cr', l: 'Ad Spend Managed' },
        { n: '#1', l: 'API Marketing' }
      ].map((stat, i) => (
        <FadeUp key={stat.l} delay={i * 0.15} className="py-12 md:py-24 px-4 md:px-8 text-center border-r border-white/5 last:border-r-0 hover:bg-[#E8001A]/[0.05] transition-all duration-700 group cursor-default">
          <span className="block text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter bg-gradient-to-br from-[#FF8A80] via-[#E8001A] to-[#FF1493] bg-clip-text text-transparent mb-4 md:mb-6 italic transform group-hover:scale-110 transition-transform duration-500">{stat.n}</span>
          <span className="text-[11px] md:text-[14px] font-black text-white/40 uppercase tracking-[0.3em] italic opacity-60 group-hover:opacity-100 group-hover:text-white/80 transition-all">{stat.l}</span>
        </FadeUp>
      ))}
    </div>
  </section>
);

// --- Main Home Component ---

export const Home = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const homepageSchemas = generateHomepageSchemas();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-white text-[#1D1D1F] selection:bg-[#E8001A] selection:text-white font-sans antialiased">
      <Seo
        title="Social Bureau — World's First API Marketing Agency"
        description="Official partner of Google, Meta & ClickUp. We help brands attract, pull, and influence at scale with our unique API Marketing framework."
        keywords="api marketing, social bureau, performance marketing kochi, clickup india reseller, digital strategy kochi"
        image="/assets/socialbureau.png"
        canonicalUrl="https://www.socialbureau.in"
      />
      <SchemaMarkup data={homepageSchemas} />



      {/* --- HERO SECTION --- */}
      <section className="min-h-screen flex flex-col justify-center pt-20 relative overflow-hidden">
        {/* Hero Background Gradient Mesh */}
        <div className="absolute inset-0 -z-10 bg-white">
          <div className="absolute top-[15%] right-[-5%] w-[60%] h-[60%] bg-gradient-to-br from-[#E8001A]/10 to-transparent blur-[120px] opacity-60 rounded-full" />
          <div className="absolute bottom-[20%] left-[-10%] w-[50%] h-[50%] bg-gradient-to-tr from-[#4285F4]/8 to-transparent blur-[110px] opacity-50 rounded-full" />
          <div className="absolute bottom-[-10%] right-[10%] w-[45%] h-[40%] bg-gradient-to-tl from-[#7B68EE]/6 to-transparent blur-[120px] opacity-50 rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-14 grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative z-10 text-center lg:text-left pt-12 lg:pt-0">
            <FadeUp delay={0.1}>
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-[#E8001A]/22 bg-[#E8001A]/[0.07] text-[#E8001A] text-[12.5px] font-bold tracking-widest uppercase mb-8">
                <span className="w-1.5 h-1.5 bg-[#E8001A] rounded-full animate-ping" />
                World's First API Marketing Agency
              </div>
            </FadeUp>

            <FadeUp delay={0.25}>
              <h1 className="text-[clamp(3rem,9vw,7rem)] font-black leading-[0.92] tracking-tighter text-[#0A0A0A] mb-8">
                Scale<br />
                <span className="bg-gradient-to-tr from-[#E8001A] via-[#FF5C35] to-[#FF1493] bg-clip-text text-transparent italic">Smarter.</span><br />
                Win Bigger
              </h1>
            </FadeUp>

            <FadeUp delay={0.4}>
              <p className="text-xl lg:text-2xl font-light leading-relaxed text-[#6E6E73] max-w-[500px] mb-12 mx-auto lg:mx-0">
                Kerala's first and the world's first data-driven API Marketing agency. We help brands attract, pull, and influence at scale.
              </p>
            </FadeUp>

            <FadeUp delay={0.55}>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
                <a href="#contact" className="px-10 py-4.5 bg-[#0A0A0A] text-white rounded-full font-bold text-lg hover:bg-[#E8001A] transition-all hover:scale-105 shadow-xl shadow-black/10">
                  Start your growth →
                </a>
                <a href="#api" className="px-10 py-4.5 border border-[#D2D2D7] text-[#1D1D1F] rounded-full font-bold text-lg hover:border-[#E8001A] hover:text-[#E8001A] transition-all bg-white/50 backdrop-blur-md">
                  Our framework
                </a>
              </div>
            </FadeUp>

            <FadeUp delay={0.7}>
              <div className="flex justify-center lg:justify-start gap-16 mt-20 pt-12 border-t border-[#D2D2D7]">

                {/* ITEM */}
                <div className="text-center lg:text-left">
                  <div className="text-5xl lg:text-6xl font-black tracking-[-2px] text-[#0A0A0A] leading-none">
                    50<span className="text-[#E8001A] font-extrabold">+</span>
                  </div>
                  <div className="text-[13px] font-bold text-[#6E6E73] uppercase tracking-[2px] mt-3">
                    Brands Scaled
                  </div>
                </div>

                {/* ITEM */}
                <div className="text-center lg:text-left">
                  <div className="text-5xl lg:text-6xl font-black tracking-[-2px] text-[#0A0A0A] leading-none">
                    4<span className="text-[#E8001A] font-extrabold">×</span>
                  </div>
                  <div className="text-[13px] font-bold text-[#6E6E73] uppercase tracking-[2px] mt-3">
                    Average ROAS
                  </div>
                </div>

                {/* ITEM */}
                <div className="text-center lg:text-left">
                  <div className="text-5xl lg:text-6xl font-black tracking-[-2px] text-[#0A0A0A] leading-none">
                    ₹10<span className="text-[#E8001A] font-extrabold">Cr</span>
                  </div>
                  <div className="text-[13px] font-bold text-[#6E6E73] uppercase tracking-[2px] mt-3">
                    Ad Spend
                  </div>
                </div>

              </div>
            </FadeUp>
          </div>

          <div className="hidden lg:block relative max-w-[480px] ml-auto">
            <FadeUp delay={0.4}>
              <div className="rounded-[36px] overflow-hidden border border-black/5 bg-[#F0F0F2] aspect-[0.82] relative group shadow-2xl">
                <img
                  src="https://res.cloudinary.com/dtwcgfmar/image/upload/q_auto/f_auto/v1776074252/DSC01171_hsyqoo.jpg"
                  alt="Sham SK"
                  className="w-full h-full duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-x-5 bottom-5 bg-white/90 backdrop-blur-2xl border border-black/5 rounded-[24px] p-6 shadow-xl">
                  <div className="text-2xl font-black tracking-tighter text-[#0A0A0A]">Sham SK</div>
                  <div className="text-[13px] font-bold text-[#E8001A] mt-1.5 uppercase tracking-wide">World's First API Marketing Consultant</div>
                  <div className="text-[12px] font-medium text-[#6E6E73] mt-1 italic">Founder & CEO · Social Bureau</div>
                </div>
              </div>

              {/* Floating Stat Cards */}
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-10 -left-10 bg-white/95 backdrop-blur-2xl border border-black/5 rounded-2xl p-5 shadow-2xl z-10"
              >
                <div className="text-[11px] font-black text-[#6E6E73] tracking-widest uppercase mb-1.5 opacity-60">ROAS Delivered</div>
                <div className="text-[28px] font-black text-[#0A0A0A] leading-none">4<span className="text-[#E8001A] italic">×</span></div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[45%] -right-10 bg-white/95 backdrop-blur-2xl border border-black/5 rounded-2xl p-5 shadow-2xl z-10 flex items-center gap-3"
              >
                <div className="w-2.5 h-2.5 bg-[#30D158] rounded-full animate-pulse shadow-[0_0_12px_#30D158]" />
                <div className="text-[15px] font-extrabold text-[#0A0A0A] tracking-tight">Campaigns Live</div>
              </motion.div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* --- MARQUEE --- */}
      <MarqueeSection />

      {/* --- PARTNERS SECTION --- */}
      <Section id="partners" className="bg-[#F5F5F7]">
        <FadeUp>
          <div className="text-center mb-16">
            <h3 className="text-[12px] font-black text-[#6E6E73] uppercase tracking-[0.2em] mb-4 opacity-70">Global Partnerships</h3>
            <p className="text-2xl font-light text-[#1D1D1F] max-w-2xl mx-auto">Official Partner of the World's Leading Platforms</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
            {/* GOOGLE */}
            <motion.div whileHover={{ y: -8 }} className="bg-white rounded-[28px] border border-[#D2D2D7] overflow-hidden group hover:shadow-2xl transition-all duration-500">
              <div className="h-32 flex items-center justify-center p-8 transition-colors">
                <img className='w-30' src='assets/home/google.png' />
              </div>
              <div className="p-6 pt-0 text-center">
                <div className="text-[15px] font-black text-[#0A0A0A] mb-1.5 tracking-tight">Google Advertising</div>
                <div className="inline-block text-[10px] font-black text-[#E8001A] bg-[#E8001A]/[0.08] px-3 py-1 rounded-full uppercase tracking-widest">Official Partner</div>
              </div>
            </motion.div>

            {/* META */}
            <motion.div whileHover={{ y: -8 }} className="bg-white rounded-[28px] border border-[#D2D2D7] overflow-hidden group hover:shadow-2xl transition-all duration-500">
              <div className="h-32 flex items-center justify-center p-8 transition-colors">
                <img className='w-20' src='assets/home/meta.png' />
              </div>
              <div className="p-6 pt-0 text-center">
                <div className="text-[15px] font-black text-[#0A0A0A] mb-1.5 tracking-tight">Meta Business</div>
                <div className="inline-block text-[10px] font-black text-[#E8001A] bg-[#E8001A]/[0.08] px-3 py-1 rounded-full uppercase tracking-widest">Business Partner</div>
              </div>
            </motion.div>

            {/* CLICKUP */}
            <motion.div whileHover={{ y: -8 }} className="bg-white rounded-[28px] border border-[#D2D2D7] overflow-hidden group hover:shadow-2xl transition-all duration-500">
              <div className="h-32 flex items-center justify-center p-8 transition-colors">
                <div className="flex flex-col items-center gap-2 transform scale-75">
                  <img className='w-25' src='assets/home/clickup.jpg' />
                </div>
              </div>
              <div className="p-6 pt-0 text-center">
                <div className="text-[15px] font-black text-[#0A0A0A] mb-1.5 tracking-tight">ClickUp Software</div>
                <div className="inline-block text-[10px] font-black text-[#E8001A] bg-[#E8001A]/[0.08] px-3 py-1 rounded-full uppercase tracking-widest">Reseller Partner</div>
              </div>
            </motion.div>

            {/* YOUTUBE */}
            <motion.div whileHover={{ y: -8 }} className="bg-white rounded-[28px] border border-[#D2D2D7] overflow-hidden group hover:shadow-2xl transition-all duration-500">
              <div className="h-32 flex items-center justify-center p-8 transition-colors">
                <img className='w-30' src='assets/home/youtube.png' />
              </div>
              <div className="p-6 pt-0 text-center">
                <div className="text-[15px] font-black text-[#0A0A0A] mb-1.5 tracking-tight">YouTube Ads</div>
                <div className="inline-block text-[10px] font-black text-[#E8001A] bg-[#E8001A]/[0.08] px-3 py-1 rounded-full uppercase tracking-widest">Certified Partner</div>
              </div>
            </motion.div>

            {/* INSTAGRAM */}
            <motion.div whileHover={{ y: -8 }} className="bg-white rounded-[28px] border border-[#D2D2D7] overflow-hidden group hover:shadow-2xl transition-all duration-500">
              <div className="h-32 flex items-center justify-center p-8 transition-colors">
                <img className='w-22' src='assets/home/insta.jpg' />
              </div>
              <div className="p-6 pt-0 text-center">
                <div className="text-[15px] font-black text-[#0A0A0A] mb-1.5 tracking-tight">Social Content</div>
                <div className="inline-block text-[10px] font-black text-[#E8001A] bg-[#E8001A]/[0.08] px-3 py-1 rounded-full uppercase tracking-widest">Certified Partner</div>
              </div>
            </motion.div>

            <motion.div whileHover={{ y: -8 }} className="bg-white rounded-[28px] border border-[#D2D2D7] overflow-hidden group hover:shadow-2xl transition-all duration-500">
              <div className="h-32 flex items-center justify-center p-8 transition-colors">
                <img className='w-22' src='assets/home/tick.png' />
              </div>
              <div className="p-6 pt-0 text-center">
                <div className="text-[15px] font-black text-[#0A0A0A] mb-1.5 tracking-tight">Tick tok</div>
                <div className="inline-block text-[10px] font-black text-[#E8001A] bg-[#E8001A]/[0.08] px-3 py-1 rounded-full uppercase tracking-widest">Certified Partner</div>
              </div>
            </motion.div>

            <motion.div whileHover={{ y: -8 }} className="bg-white rounded-[28px] border border-[#D2D2D7] overflow-hidden group hover:shadow-2xl transition-all duration-500">
              <div className="h-32 flex items-center justify-center p-8 transition-colors">
                <img className='w-27' src='assets/home/redis.jpg' />
              </div>
              <div className="p-6 pt-0 text-center">
                <div className="text-[15px] font-black text-[#0A0A0A] mb-1.5 tracking-tight">Reddit</div>
                <div className="inline-block text-[10px] font-black text-[#E8001A] bg-[#E8001A]/[0.08] px-3 py-1 rounded-full uppercase tracking-widest">Certified Partner</div>
              </div>
            </motion.div>

            <motion.div whileHover={{ y: -8 }} className="bg-white rounded-[28px] border border-[#D2D2D7] overflow-hidden group hover:shadow-2xl transition-all duration-500">
              <div className="h-32 flex items-center justify-center p-8 transition-colors">
                <img className='w-18' src='assets/home/linked.png' />
              </div>
              <div className="p-6 pt-0 text-center">
                <div className="text-[15px] font-black text-[#0A0A0A] mb-1.5 tracking-tight">LinkedIn</div>
                <div className="inline-block text-[10px] font-black text-[#E8001A] bg-[#E8001A]/[0.08] px-3 py-1 rounded-full uppercase tracking-widest">Certified Partner</div>
              </div>
            </motion.div>
            <motion.div whileHover={{ y: -8 }} className="bg-white rounded-[28px] border border-[#D2D2D7] overflow-hidden group hover:shadow-2xl transition-all duration-500">
              <div className="h-32 flex items-center justify-center p-8 transition-colors">
                <img className='w-17' src='assets/home/x.png' />
              </div>
              <div className="p-6 pt-0 text-center">
                <div className="text-[15px] font-black text-[#0A0A0A] mb-1.5 tracking-tight">X</div>
                <div className="inline-block text-[10px] font-black text-[#E8001A] bg-[#E8001A]/[0.08] px-3 py-1 rounded-full uppercase tracking-widest">Certified Partner</div>
              </div>
            </motion.div>
          </div>
        </FadeUp>
      </Section>

      {/* --- API FRAMEWORK SECTION --- */}
      <Section id="api" className="bg-white">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <div className="relative w-[500px] h-[500px] flex items-center justify-center rounded-[40px] overflow-hidden bg-gradient-to-br from-[#FFF5F5] via-[#FFF0F8] to-[#F5F0FF] border border-[#D2D2D7] shadow-inner">

            {/* Glow Background FIX */}
            <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(232,0,26,0.15),_transparent)] blur-3xl opacity-40" />

            {/* Orbit 1 */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute w-[240px] h-[240px] border border-dashed border-[#E8001A]/30 rounded-full flex items-start justify-center"
            >
              {/* DOT */}
              <div className="w-3 h-3 bg-red-500 rounded-full shadow-[0_0_12px_red]" />
            </motion.div>

            {/* Orbit 2 */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="absolute w-[360px] h-[360px] border border-dashed border-[#E8001A]/20 rounded-full flex items-end justify-center"
            >
              {/* DOT */}
              <div className="w-3 h-3 bg-red-500 rounded-full shadow-[0_0_12px_red]" />
            </motion.div>

            {/* CENTER HEX */}
            <div
              className="relative z-10 w-44 h-44 bg-gradient-to-br from-[#E8001A] to-[#FF4444] shadow-[0_24px_64px_rgba(232,0,26,0.35)] flex flex-col items-center justify-center transform hover:scale-110 transition-transform duration-500"
              style={{
                clipPath:
                  "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
              }}
            >
              <div className="text-5xl font-black text-white tracking-widest italic">
                API
              </div>
              <div className="text-[10px] font-bold text-white/90 uppercase tracking-[0.25em] mt-2 border-t border-white/20 pt-2">
                Framework
              </div>
            </div>

            {/* FLOATING TAGS */}
            {["Attract", "Pull", "Influence"].map((tag, i) => (
              <motion.div
                key={tag}
                animate={{ y: [0, -6, 0] }}
                transition={{
                  duration: 3 + i,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className={`absolute ${i === 0
                  ? "top-12"
                  : i === 1
                    ? "bottom-16 left-10"
                    : "bottom-16 right-10"
                  } px-6 py-2 bg-white/90 backdrop-blur-xl border border-[#D2D2D7] rounded-full text-sm font-black shadow-xl`}
              >
                {tag}
              </motion.div>
            ))}
          </div>

          <div>
            <FadeUp>
              <span className="text-[13px] font-black text-[#E8001A] uppercase tracking-[0.2em] mb-6 block opacity-80">Scientific Growth Framework</span>
              <h2 className="text-6xl lg:text-8xl font-black tracking-tighter leading-[0.9] mb-10 text-[#0A0A0A]">
                The World's First<br />
                <span className="bg-gradient-to-tr from-[#E8001A] via-[#FF5C35] to-[#FF1493] bg-clip-text text-transparent italic">API Marketing</span><br />
                Method.
              </h2>
              <p className="text-xl lg:text-2xl font-light text-[#6E6E73] mb-12 leading-relaxed">
                Pioneered by Sham SK — a systematic engine that warms audiences before scaling ad spend, ensuring maximum ROAS.
              </p>

              <div className="space-y-2">
                {[
                  { l: 'A', t: 'Attract', d: 'Draw in your exact audience through high-intent content and discovery.' },
                  { l: 'P', t: 'Pull', d: 'Engage prospects deeply within a curated brand ecosystem.' },
                  { l: 'I', t: 'Influence', d: 'Convert warm traffic using data-driven social proof and creative strategy.' }
                ].map((item, i) => (
                  <motion.div
                    key={item.t}
                    whileHover={{ x: 12 }}
                    className="flex gap-8 py-10 border-b border-[#D2D2D7] group first:border-t hover:bg-[#F5F5F7]/30 transition-colors px-6 -mx-6 rounded-2xl"
                  >
                    <div className="text-7xl font-black text-[#E8001A] leading-none transition-transform duration-500 group-hover:scale-125 italic">{item.l}</div>
                    <div className="pt-2">
                      <h4 className="text-2xl font-black text-[#0A0A0A] mb-2 tracking-tighter">{item.t}</h4>
                      <p className="text-[16px] font-light text-[#6E6E73] leading-relaxed max-w-md">{item.d}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </FadeUp>
          </div>
        </div>
      </Section>

      {/* --- SERVICES SECTION --- */}
      <Section id="services" className="bg-[#F5F5F7]">
        <div className="flex flex-col lg:flex-row justify-between items-end gap-12 mb-20">
          <FadeUp className="flex-1">
            <span className="text-[13px] font-black text-[#E8001A] uppercase tracking-[0.2em] mb-4 block underline decoration-2 underline-offset-8">Capabilities</span>
            <h2 className="text-6xl lg:text-8xl font-black tracking-tighter text-[#0A0A0A]">Our <span className="text-[#E8001A] italic">Services</span></h2>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="text-xl font-light text-[#6E6E73] max-w-md mb-8 lg:text-right italic">Bespoke marketing solutions engineered for performance and scale.</p>
          </FadeUp>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0.5 bg-[#D2D2D7] border border-[#D2D2D7] rounded-[40px] overflow-hidden shadow-2xl">
          {[
            { t: 'API Marketing', d: 'The world\'s first Attract → Pull → Influence framework. Organic-first growth built for niche brands.', b: 'World First', s: 'lg:col-span-2' },
            { t: 'ClickUp Reselling', d: 'Official India reseller. Licensed ClickUp at the best INR pricing with full local onboarding.', b: 'New' },
            { t: 'Performance Marketing', d: 'ROI-obsessed Meta, Google & YouTube campaigns. Every rupee tracked and optimized.', b: 'Certified' },
            { t: 'Social Media', d: 'Full-service strategy, content creation and community management across all major platforms.' },
            { t: 'Influencer Marketing', d: 'High-impact micro-to-macro campaigns with precision audience matching.' },
            { t: 'Brand Strategy', d: 'Positioning, identity, and messaging that ensures market dominance.' }
          ].map((s, i) => (
            <motion.div
              key={s.t}
              whileHover={{ backgroundColor: '#FAFAFA' }}
              className={`bg-white p-14 relative group ${s.s || ''}`}
            >
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#E8001A] via-[#FF5C35] to-[#FF1493] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
              <div className="text-[14px] font-black text-[#6E6E73] mb-8 opacity-40">0{i + 1}</div>
              <h3 className="text-3xl font-black text-[#0A0A0A] mb-5 tracking-tighter flex items-center gap-4">
                {s.t}
                {s.b && <span className="text-[10px] font-black px-3 py-1 rounded bg-[#E8001A] text-white uppercase tracking-widest">{s.b}</span>}
              </h3>
              <p className="text-[17px] font-light text-[#6E6E73] leading-relaxed mb-10 antialiased font-serif italic">{s.d}</p>
              <a href="#" className="inline-flex items-center gap-3 text-[15px] font-black text-[#E8001A] group-hover:gap-6 transition-all tracking-tighter">
                Explore The Service <span className="text-lg">→</span>
              </a>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* --- PLATFORM DETAIL SECTION --- */}
      <PlatformDetailSection />

      {/* --- CLICKUP PARTNER SECTION --- */}
      <Section id="clickup" className="bg-white">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          <FadeUp className="order-2 lg:order-1">
            <div className="rounded-[32px] md:rounded-[44px] overflow-hidden border border-black/5 shadow-[0_32px_80px_rgba(0,0,0,0.1)] bg-white group hover:shadow-[0_40px_100px_rgba(123,104,238,0.15)] transition-all duration-700">
              <div className="flex flex-col items-center">

                {/* IMAGE */}
                <img
                  src="assets/home/clickup.jpg"
                  alt="ClickUp"
                  className="w-full max-w-[320px] object-contain mb-6"
                />

                {/* CONTENT */}
                <div className="p-6 sm:p-12 w-full">

                  <div className="flex flex-wrap gap-2 sm:gap-2.5 mb-8 sm:mb-10 justify-center">
                    {['Automations', 'Dashboards', 'Docs', 'Tasks', 'Goals'].map((tag) => (
                      <span key={tag} className="px-4 sm:px-5 py-1.5 sm:py-2 bg-[#F5F5F7] text-[10px] sm:text-[12px] font-black text-[#3A3A3C] rounded-full border border-black/5 transform hover:scale-110 transition-transform cursor-default italic">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="space-y-3 sm:space-y-4">
                    {[
                      'Licensed ClickUp for India — best price guaranteed',
                      'Dedicated onboarding, setup & team training',
                      'Ongoing support & workflow customisation',
                      'INR invoicing — no forex complications'
                    ].map((feat) => (
                      <div key={feat} className="flex items-center gap-4 sm:gap-5 p-4 sm:p-5 bg-[#F5F5F7]/50 rounded-xl sm:rounded-2xl group-hover:translate-x-2 transition-transform duration-500 shadow-sm">
                        <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-[#7B68EE] via-[#2EBCE8] to-[#FF5E5B] rounded-lg flex items-center justify-center flex-shrink-0 text-white shadow-lg">
                          <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4">
                            <path d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-[13px] sm:text-[15px] font-extrabold text-[#3A3A3C] tracking-tight italic leading-tight">
                          {feat}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 sm:mt-10 flex items-center justify-center gap-3 text-[#7B68EE] font-black uppercase text-[10px] sm:text-[12px] tracking-widest pt-6 sm:pt-8 border-t border-black/5 opacity-60">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M8 12l3 3 5-5" />
                    </svg>
                    Official India Reseller
                  </div>

                </div>
              </div>
            </div>
          </FadeUp>

          <div className="order-1 lg:order-2">
            <FadeUp>
              <span className="text-[13px] font-black text-[#7B68EE] uppercase tracking-[0.4em] mb-4 sm:mb-6 block opacity-80 decoration-2 underline underline-offset-8">Licensed Solutions</span>
              <h2 className="text-4xl sm:text-6xl lg:text-8xl font-black tracking-tighter leading-[0.9] mb-8 sm:mb-10 text-[#0A0A0A]">
                Work<br /><span className="text-[#E8001A] italic">Smarter.</span><br /><span className="text-transparent italic" style={{ WebkitTextStroke: '1.5px #D2D2D7' }}>Not Harder.</span>
              </h2>
              <p className="text-lg lg:text-3xl font-light text-[#6E6E73] mb-10 sm:mb-12 leading-relaxed italic antialiased font-serif">
                Social Bureau brings the world's most powerful productivity platform to your team with full local support and INR pricing.
              </p>
              <div className="flex flex-wrap gap-4 sm:gap-5">
                <a href="/clickup" className="w-full sm:w-auto text-center px-10 sm:px-12 py-4 sm:py-5 bg-[#0A0A0A] text-white rounded-full font-black text-base sm:text-lg hover:bg-[#E8001A] transition-all hover:scale-105 shadow-2xl shadow-[#7B68EE]/20">
                  Get ClickUp India
                </a>
                <a href="mailto:info@gmail.com?subject=I%20would%20like%20to%20book%20a%20demo&body=I%20would%20like%20to%20book%20a%20demo" className="w-full sm:w-auto text-center px-10 sm:px-12 py-4 sm:py-5 border border-[#D2D2D7] text-[#1D1D1F] rounded-full font-black text-base sm:text-lg hover:border-[#7B68EE] hover:text-[#7B68EE] transition-all bg-white/50 backdrop-blur-md italic font-bold">
                  Book a demo
                </a>
              </div>
            </FadeUp>
          </div>
        </div>
      </Section>

      {/* --- GALLERY SECTION --- */}
      <GallerySection />

      {/* --- CLIENTS SECTION --- */}
      <Section id="clients" className="bg-[#F5F5F7]">
        <div className="flex flex-col items-center text-center mb-20">
          <FadeUp>
            <span className="text-[13px] font-black text-[#E8001A] uppercase tracking-[0.4em] mb-6 block opacity-70 italic">Industry Leaders</span>
            <h2 className="text-6xl lg:text-[clamp(60px,10vw,140px)] font-black tracking-tighter text-[#0A0A0A] leading-none mb-10 italic antialiased">Trusted by Kerala's<br /><span className="bg-gradient-to-tr from-[#E8001A] via-[#FF5C35] to-[#FF1493] bg-clip-text text-transparent">Media Giants.</span></h2>
            <p className="text-xl lg:text-3xl font-light text-[#6E6E73] max-w-3xl leading-relaxed italic antialiased font-serif">Powering the digital strategy of India's most-watched news networks.</p>
          </FadeUp>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-0.5 bg-[#D2D2D7] border border-[#D2D2D7] rounded-[44px] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.15)] bg-white">
          {/* big tv telungu */}
          <motion.div whileHover={{ backgroundColor: '#FAFAFA' }} className="bg-white p-10 flex flex-col items-center justify-center gap-6 min-h-[220px] relative group border-transparent transition-all duration-300">
            <img src="assets/home/bigtv.jpg" alt="" />
            <div className="text-[12px] font-black text-[#0A0A0A] uppercase tracking-widest italic antialiased">Big TV</div>
            <div className="absolute bottom-0 inset-x-0 h-1.5 bg-[#E8001A] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
          </motion.div>

          {/*news malayalm */}
          {/* <motion.div whileHover={{ backgroundColor: '#FAFAFA' }} className="bg-white p-10 flex flex-col items-center justify-center gap-6 min-h-[220px] relative group border-transparent transition-all duration-300"> */}
          {/* <img src="assets/home/newsmal.jpg" alt="" />
            <div className="text-[12px] font-black text-[#0A0A0A] uppercase tracking-widest italic antialiased">News Malayalam</div>
            <div className="absolute bottom-0 inset-x-0 h-1.5 bg-[#1D1D1F] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
          </motion.div> */}

          {/* reporter */}
          <motion.div whileHover={{ backgroundColor: '#FAFAFA' }} className="bg-white p-10 flex flex-col items-center justify-center gap-6 min-h-[220px] relative group border-transparent transition-all duration-300">
            <img src="assets/home/reporter.png" alt="" />
            <div className="text-[12px] font-black text-[#0A0A0A] uppercase tracking-widest italic antialiased">Reporter Tv</div>
            <div className="absolute bottom-0 inset-x-0 h-1.5 bg-[#FFA500] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
          </motion.div>

          {/* newstamil */}
          <motion.div whileHover={{ backgroundColor: '#FAFAFA' }} className="bg-white p-10 flex flex-col items-center justify-center gap-6 min-h-[220px] relative group border-transparent transition-all duration-300">
            <img src="assets/home/newstam.webp" alt="" />
            <div className="text-[12px] font-black text-[#0A0A0A] uppercase tracking-widest italic antialiased">News Tamil</div>
            <div className="absolute bottom-0 inset-x-0 h-1.5 bg-[#E5001A] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
          </motion.div>


          {/* <motion.div whileHover={{ backgroundColor: '#FAFAFA' }} className="bg-white p-10 flex flex-col items-center justify-center gap-6 min-h-[220px] relative group border-transparent transition-all duration-300">
            <svg viewBox="0 0 150 42" className="w-[130px] h-[36px]" fill="none">
              <circle cx="21" cy="21" r="17" fill="#006CB8" />
              <text x="11" y="27" fontFamily="-apple-system,sans-serif" fontWeight="900" fontSize="13" fill="white">M1</text>
              <text x="46" y="25" fontFamily="-apple-system,sans-serif" fontWeight="800" fontSize="15" fill="#1D1D1F">MEDIA</text>
              <text x="46" y="39" fontFamily="-apple-system,sans-serif" fontWeight="800" fontSize="12" fill="#006CB8">ONE</text>
            </svg>
            <div className="text-[12px] font-black text-[#0A0A0A] uppercase tracking-widest italic antialiased">Media One</div>
            <div className="absolute bottom-0 inset-x-0 h-1.5 bg-[#006CB8] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
          </motion.div>

          <motion.div whileHover={{ backgroundColor: '#FAFAFA' }} className="bg-white p-10 flex flex-col items-center justify-center gap-6 min-h-[220px] relative group border-transparent transition-all duration-300">
            <svg viewBox="0 0 150 42" className="w-[130px] h-[36px]" fill="none">
              <text x="0" y="26" fontFamily="-apple-system,sans-serif" fontWeight="900" fontSize="20" fill="#1D1D1F" letterSpacing="-.3">KAIRALI</text>
              <text x="0" y="40" fontFamily="-apple-system,sans-serif" fontWeight="500" fontSize="10" fill="#00A651" letterSpacing="3">NEWS TV</text>
            </svg>
            <div className="text-[12px] font-black text-[#0A0A0A] uppercase tracking-widest italic antialiased">Kairali TV</div>
            <div className="absolute bottom-0 inset-x-0 h-1.5 bg-[#00A651] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
          </motion.div>

          <motion.div whileHover={{ backgroundColor: '#FAFAFA' }} className="bg-white p-10 flex flex-col items-center justify-center gap-6 min-h-[220px] relative group border-transparent transition-all duration-300">
            <svg viewBox="0 0 150 42" className="w-[130px] h-[36px]" fill="none">
              <rect x="0" y="5" width="65" height="28" rx="4" fill="#E5001A" />
              <text x="7" y="25" fontFamily="-apple-system,sans-serif" fontWeight="900" fontSize="13" fill="white">NEWS18</text>
              <text x="73" y="24" fontFamily="-apple-system,sans-serif" fontWeight="600" fontSize="12" fill="#555" letterSpacing=".2">KERALA</text>
            </svg>
            <div className="text-[12px] font-black text-[#0A0A0A] uppercase tracking-widest italic antialiased">News18 Kerala</div>
            <div className="absolute bottom-0 inset-x-0 h-1.5 bg-[#E5001A] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
          </motion.div>

          <motion.div whileHover={{ backgroundColor: '#FAFAFA' }} className="bg-white p-10 flex flex-col items-center justify-center gap-6 min-h-[220px] relative group border-transparent transition-all duration-300">
            <svg viewBox="0 0 150 42" className="w-[130px] h-[36px]" fill="none">
              <text x="0" y="26" fontFamily="-apple-system,sans-serif" fontWeight="900" fontSize="20" fill="#1D1D1F" letterSpacing="1">JANAM</text>
              <text x="0" y="40" fontFamily="-apple-system,sans-serif" fontWeight="400" fontSize="10" fill="#888" letterSpacing="3">TV</text>
            </svg>
            <div className="text-[12px] font-black text-[#0A0A0A] uppercase tracking-widest italic antialiased">Janam TV</div>
            <div className="absolute bottom-0 inset-x-0 h-1.5 bg-[#1D1D1F] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
          </motion.div> */}

        </div>
      </Section>

      {/* --- FOUNDER SECTION --- */}
      <FounderSection />

      {/* --- SOFTWARE SECTION --- */}
      <SoftwareSection />

      {/* --- STATS SECTION --- */}
      <BottomStatsSection />

      {/* --- CTA SECTION --- */}
      <section id="contact" className="py-24 sm:py-48 bg-white text-center relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-radial-gradient from-[#E8001A]/5 to-transparent blur-[160px] opacity-40" />
        </div>
        <div className="max-w-5xl mx-auto px-4 sm:px-14">
          <FadeUp>
            <span className="text-[13px] font-black text-[#E8001A] uppercase tracking-[0.3em] mb-8 block opacity-80">Launch Your Growth Engine</span>
            <h2 className="text-[clamp(3.5rem,9vw,8rem)] font-black tracking-tighter leading-[0.85] mb-12 text-[#0A0A0A] italic antialiased">
              Ready to <span className="bg-gradient-to-tr from-[#E8001A] via-[#FF5C35] to-[#FF1493] bg-clip-text text-transparent pr-8">Win?</span>
            </h2>
            <p className="text-xl md:text-2xl lg:text-3xl font-light text-[#6E6E73] mb-16 md:mb-20 leading-tight max-w-3xl mx-auto italic">
              Tell us your ambitions. Sham's team responds within 24 hours with a ruthless growth strategy.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6 group">
              <a href="mailto:admin@socialbureau.in" className="w-full sm:w-auto px-10 md:px-16 py-5 md:py-6 bg-[#0A0A0A] text-white rounded-full font-black text-xl md:text-2xl hover:bg-[#E8001A] transition-all duration-500 shadow-2xl shadow-black/20">
                Propose A Project
              </a>
              <a href="#" className="w-full sm:w-auto px-10 md:px-16 py-5 md:py-6 border-b-4 border-[#0A0A0A] text-[#1D1D1F] font-black text-xl md:text-2xl hover:text-[#E8001A] transition-all duration-300 transform active:translate-y-1">
                WhatsApp Direct <span className="text-[#E8001A]">→</span>
              </a>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* --- FOOTER --- */}
      {/* <footer className="bg-[#F5F5F7] border-t border-[#D2D2D7] py-20 md:py-28 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-14">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-20 mb-20 md:mb-32">
            <div className="col-span-1">
              <div className="font-black text-[28px] tracking-tighter text-[#0A0A0A] mb-6 italic">Social<span className="text-[#E8001A]">Bureau</span></div>
              <p className="text-[16px] font-light text-[#6E6E73] leading-relaxed max-w-[300px] italic">Kerala's first and the world's first data-driven API Marketing Agency. Official partner of Google, Meta, and ClickUp.</p>
            </div>
            {[
              { title: 'Services', links: ['API Marketing', 'Performance', 'Social Media', 'ClickUp Reselling'] },
              { title: 'Agency', links: ['About Sham SK', 'Case Studies', 'Software Tech', 'Careers'] },
              { title: 'Connect', links: ['hello@socialbureau.in', 'Instagram', 'LinkedIn', 'WhatsApp'] }
            ].map((col) => (
              <div key={col.title}>
                <h6 className="text-[13px] font-black text-[#0A0A0A] uppercase tracking-[0.3em] mb-8 opacity-70">{col.title}</h6>
                <ul className="space-y-4">
                  {col.links.map((link) => (
                    <li key={link}><a href="#" className="text-[15px] font-medium text-[#6E6E73] hover:text-[#E8001A] transition-colors">{link}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="pt-12 border-t border-[#D2D2D7] flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
            <div className="text-[14px] font-medium text-[#6E6E73]">© 2026 Social Bureau Agency. Scaled in Kochi.</div>
            <div className="text-[12px] font-black text-[#E8001A]/40 uppercase tracking-[0.4em] italic antialiased hidden lg:block">World's First API Marketing Agency</div>
            <div className="flex gap-10 text-[14px] font-black uppercase tracking-widest text-[#6E6E73]">
              <a href="#" className="hover:text-[#E8001A] transition-colors">Privacy</a>
              <a href="#" className="hover:text-[#E8001A] transition-colors">Terms</a>
            </div>
          </div>
        </div>
      </footer> */}
    </div>
  );
};

export default Home;