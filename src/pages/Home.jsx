import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useSpring, useInView, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import Seo from "../components/Seo";
import SchemaMarkup from "../components/SchemaMarkup";
import AnniversaryCountdown from '../components/AnniversaryCountdown/AnniversaryCountdown';
import { generateHomepageSchemas } from "@/utils/schema";
import Testimonials from '@/components/Testimonials';
import mediaWaitlistService from "@/services/mediaWaitlistService";
import Toast from "../components/Toast";
import PortfolioPopup from '../components/PortfolioPopup';
import Popup from '@/components/Popup';
import HintCard from './TreasureHunt/HintCard';
import { startTreasureHunt, startTreasureHuntTimer } from "../utils/treasureHunt";

const handleJoinWaitingList = async ({ onResult } = {}) => {
  let email = null;
  let name = null;
  const storedUser = localStorage.getItem('user');
  const token = localStorage.getItem('token');

  if (storedUser) {
    try {
      const parsed = JSON.parse(storedUser);
      // Try to extract from common payload structures
      const userObj = parsed?.user || parsed?.data || parsed;
      email = userObj?.email;
      name = userObj?.name;
    } catch (e) {
      console.error('Error parsing stored user', e);
    }
  }

  if (!email && token) {
    email = localStorage.getItem('email') || null;
  }

  if (email) {
    try {
      await mediaWaitlistService.joinWaitlist({ name: name || 'Logged In User', email });
      onResult?.({ type: 'success', message: 'You are added to the Media Waiting List. We will notify you when we launch!' });
      return { success: true };
    } catch (err) {
      console.error('waitlist error', err);
      onResult?.({ type: 'error', message: 'Could not save your invitation. Please try again.' });
      return { success: false };
    }
  }

  const promptEmail = window.prompt('Enter your email to join the waiting list (you will be redirected to login):');
  if (promptEmail) {
    const next = window.location.pathname + window.location.search;
    const loginUrl = `/login?email=${encodeURIComponent(promptEmail)}&next=${encodeURIComponent(next)}`;
    window.location.href = loginUrl;
  }
  return { success: false };
};

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
  <section id={id} className={`py-12 sm:py-20 lg:py-32 relative overflow-hidden ${className}`}>
    <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-14">
      {children}
    </div>
  </section>
);

const StudentTicker = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/partners/student-stats`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setStudents(data.recentStudents);
        }
      })
      .catch(err => console.error("Ticker fetch error:", err));
  }, []);

  if (students.length === 0) return null;

  return (
    <div className="md:hidden bg-[#0A0A0A] py-3 overflow-hidden border-b border-white/5 relative">
       <div className="relative flex overflow-hidden">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
            className="flex gap-4 whitespace-nowrap pl-4"
          >
            {[...students, ...students, ...students].map((student, idx) => (
              <Link 
                key={`${student.id}-${idx}`}
                to={`/partnership/${student.param || student.id}`}
                className="flex items-center gap-3 bg-white/[0.03] backdrop-blur-md border border-white/10 pl-1.5 pr-4 py-1.5 rounded-[20px] shadow-2xl active:scale-95 transition-all hover:bg-white/[0.08] hover:border-[#E8001A]/30"
              >
                <div className="w-8 h-8 rounded-full overflow-hidden border border-white/10 shadow-lg flex-shrink-0">
                  <img src={student.image} alt={student.name} className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[12px] font-black text-white/90 tracking-tight">{student.name}</span>
                  <span className="text-[8px] font-bold text-white/30 uppercase tracking-widest italic group-hover:text-[#E8001A]">Portfolio</span>
                </div>
              </Link>
            ))}
          </motion.div>
          {/* Fades for smooth entry/exit */}
          <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#0A0A0A] to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#0A0A0A] to-transparent z-10 pointer-events-none" />
       </div>
    </div>
  );
};

const MarqueeSection = () => {
  const words = ['API Marketing', 'Performance Marketing', 'ClickUp India Partner', 'Social Media Management', 'Influencer Marketing', 'Brand Strategy'];
  return (
    <div className="border-y border-[#D2D2D7] bg-[#F5F5F7] py-3 sm:py-6 overflow-hidden relative">


      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="flex whitespace-nowrap gap-6 sm:gap-12"
      >
        {[1, 2].map((group) => (
          <div key={group} className="flex items-center gap-12">
            {words.map((text) => (
              <div key={text} className="flex items-center gap-6 sm:gap-12 text-[10px] sm:text-[12px] font-bold text-[#6E6E73] uppercase tracking-[0.15em] sm:tracking-[0.2em]">
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
        { t: 'Google Partner', d: 'Certified Google Partner with advanced access to Google Ads & Analytics — delivering precision targeting and transparent reporting.', b: '✓ Official Google Partner', c: 'Google', g: 'white', icon: 'google', href: 'https://partners.cloud.google.com' },
        { t: 'Meta Business Partner', d: 'Official Meta Business Partner with exclusive access to advanced audience targeting and direct support.', b: '✓ Official Meta Partner', c: 'Meta', g: 'white', icon: 'meta', href: 'https://www.facebook.com/business/marketing-partners' },
        { t: 'ClickUp India Partner', d: 'Official ClickUp reseller for India. Get licensed subscriptions with full onboarding, team training, and INR invoicing.', b: '✓ Verified Reseller Partner', c: 'ClickUp', g: 'white', icon: 'clickup', href: 'https://www.clickup.com' },
        { t: 'YouTube Certified', d: 'managing video strategy, monetisation, advertising, and channel growth for Kerala\'s leading content creators.', b: '✓ Certified YouTube Partner', c: 'YouTube', g: 'white', icon: 'youtube', href: 'https://www.youtube.com/creators/partner-program/' }
      ].map((plat, i) => (
        <FadeUp key={plat.t} delay={i * 0.1} className="rounded-[40px] overflow-hidden border border-[#D2D2D7] group hover:shadow-2xl transition-all duration-700 bg-white">
          <a href={plat.href} target="_blank" rel="noopener noreferrer" className="block w-full h-full">
            <div className={`h-64 bg-gradient-to-br ${plat.g} flex flex-col items-center justify-center relative overflow-hidden`}>
              <div className="absolute inset-0 bg-white/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10 transform group-hover:scale-110 transition-transform duration-700 flex flex-col items-center gap-4">
                {plat.icon === 'google' && (
                  <img src="assets/home/google.png" alt="Google" className="w-60 h-auto" />
                )}
                {plat.icon === 'meta' && (
                  <img src="assets/home/meta.png" alt="Meta" className="w-60 h-auto" />
                )}
                {plat.icon === 'clickup' && (
                  <img src="assets/home/clickup.jpg" alt="ClickUp" className="w-60 h-auto" />
                )}
                {plat.icon === 'youtube' && (
                  <img src="assets/home/youtube.png" alt="YouTube" className="w-60 h-auto" />
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
          </a>
        </FadeUp>
      ))}
    </div>
  </Section>
);

const GallerySection = () => (
  <Section id="gallery" className="bg-[#F5F5F7]">
    <FadeUp>
      <span className="text-[11px] sm:text-[13px] font-black text-[#E8001A] uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-4 sm:mb-6 block opacity-70 italic text-center underline underline-offset-8 decoration-2">Our Work</span>
      <h2 className="text-[clamp(1.75rem,8vw,7rem)] font-black tracking-tighter text-[#0A0A0A] text-center leading-[0.9] mb-10 sm:mb-16 lg:mb-20 italic antialiased px-2">Growing brands,<br /><span className="bg-gradient-to-tr from-[#E8001A] via-[#FF5C35] to-[#FF1493] bg-clip-text text-transparent italic">one campaign at a time.</span></h2>
    </FadeUp>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
      <FadeUp className="lg:col-span-2 lg:row-span-2 rounded-[24px] sm:rounded-[40px] overflow-hidden group shadow-2xl relative">
        <a href="https://www.instagram.com/socialbureau.in/">
          <img src="https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/1000094772.jpg_cpm1zi.jpg" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt="Strategy" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4 sm:p-10">
            <span className="text-white font-black text-lg sm:text-2xl tracking-tighter">SunTips</span>
          </div>
        </a>
      </FadeUp>
      <FadeUp delay={0.1} className="rounded-[24px] sm:rounded-[40px] overflow-hidden group shadow-2xl aspect-square relative">
        <a href="https://www.instagram.com/socialbureau.in/">
          <img src="https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/1000094774.jpg_tvc7le.jpg" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt="Social" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4 sm:p-6">
            <span className="text-white font-black text-base sm:text-xl tracking-tighter">SocialBureau</span>
          </div>
        </a>
      </FadeUp>
      <FadeUp delay={0.2} className="rounded-[24px] sm:rounded-[40px] overflow-hidden group shadow-2xl aspect-square relative">
        <a href="https://www.instagram.com/socialbureau.in/">
          <img src="https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/sb_dd4gwn.jpg" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt="Performance" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4 sm:p-6">
            <span className="text-white font-black text-base sm:text-xl tracking-tighter">SocialBureau</span>
          </div>
        </a>
      </FadeUp>
      <FadeUp delay={0.3} className="rounded-[24px] sm:rounded-[40px] overflow-hidden group shadow-2xl aspect-video lg:aspect-auto relative min-h-[180px] sm:min-h-[240px]">
        <a href="https://www.instagram.com/socialbureau.in/">
          <img src="https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/1000094773.jpg_lbz6ws.jpg" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt="Brand" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4 sm:p-6">
            <span className="text-white font-black text-base sm:text-xl tracking-tighter">SocialBureau</span>
          </div>
        </a>
      </FadeUp>
      <FadeUp delay={0.4} className="rounded-[24px] sm:rounded-[40px] overflow-hidden group shadow-2xl aspect-video lg:aspect-auto relative min-h-[180px] sm:min-h-[240px]">
        <a href="https://www.instagram.com/socialbureau.in/">
          <img src="https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/1000094771.jpg_hom8pa.jpg" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt="Collaboration" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4 sm:p-6">
            <span className="text-white font-black text-base sm:text-xl tracking-tighter">SocialBureau</span>
          </div>
        </a>
      </FadeUp>
      <FadeUp delay={0.4} className="rounded-[24px] sm:rounded-[40px] overflow-hidden group shadow-2xl aspect-video lg:aspect-auto relative min-h-[180px] sm:min-h-[240px]">
        <a href="https://www.instagram.com/socialbureau.in/">
          <img src="https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/1000094775.jpg_dxbmyx.jpg" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt="Collaboration" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4 sm:p-6">
            <span className="text-white font-black text-base sm:text-xl tracking-tighter">SocialBureau</span>
          </div>
        </a>
      </FadeUp>
    </div>
  </Section>
);

const FounderSection = () => (
  <Section id="founder" className="bg-[#F5F5F7] border-y border-[#D2D2D7]">
    <div className="grid lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-24 items-center">
      <FadeUp className="relative max-w-[480px] mx-auto lg:ml-0 w-full">
        <div className="rounded-[28px] sm:rounded-[44px] overflow-hidden border border-black/5 bg-gradient-to-br from-[#FFF0F2] via-[#FFE5EA] to-[#F5E5FF] aspect-[0.82] relative group shadow-2xl">
          <img
            src="https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/Adobe_Express_-_file_1_s8y5h5.webp"
            alt="Founder Sham SK"
            className="w-full h-full object-cover object-top transition-transform duration-1000 group-hover:scale-110"
          />
          <div className="absolute inset-x-3 sm:inset-x-5 bottom-3 sm:bottom-5 bg-white/94 backdrop-blur-2xl border border-black/5 rounded-[16px] sm:rounded-[24px] p-4 sm:p-8 shadow-xl">
            <div className="text-2xl sm:text-3xl font-black tracking-tighter text-[#0A0A0A]">Sham SK</div>
            <div className="text-[11px] sm:text-[13px] font-bold text-[#E8001A] mt-1.5 sm:mt-2 uppercase tracking-wide">World's First API Marketing Consultant</div>
            <div className="text-[10px] sm:text-[12px] font-medium text-[#6E6E73] mt-1 sm:mt-1.5 italic font-serif">Founder & CEO ·TrillionEdition ·SocialBureau</div>
          </div>
        </div>
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-4 sm:-top-8 -right-4 sm:-right-8 bg-gradient-to-br from-[#E8001A] to-[#FF4444] rounded-lg sm:rounded-2xl p-3 sm:p-6 text-center shadow-2xl border border-white/20 z-[10]"
        >
          <div className="text-2xl sm:text-4xl font-black text-white leading-none tracking-tighter italic">#1</div>
          <div className="text-[8px] sm:text-[10px] font-bold text-white/80 uppercase tracking-widest mt-1">World First</div>
        </motion.div>
      </FadeUp>

      <div className="space-y-8 sm:space-y-16">
        <FadeUp delay={0.2} className="text-center lg:text-left">
          <span className="text-[11px] sm:text-[13px] font-black text-[#E8001A] uppercase tracking-[0.25em] sm:tracking-[0.4em] mb-3 sm:mb-6 block opacity-80 underline underline-offset-8 decoration-2">The Visionary</span>
          <h2 className="text-[clamp(2rem,8vw,6.5rem)] font-black tracking-tighter leading-[0.85] text-[#0A0A0A] italic antialiased px-2 sm:px-0">
            Meet<br /><span className="bg-gradient-to-tr from-[#E8001A] via-[#FF5C35] to-[#FF1493] bg-clip-text text-transparent">Sham SK.</span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl font-light text-[#6E6E73] leading-relaxed italic mt-6 sm:mt-10 max-w-xl mx-auto lg:mx-0 px-2 sm:px-0">
            The architect who built the world's first API Marketing engine. A strategist who turns niche brands into market leaders.
          </p>
        </FadeUp>

        <div className="grid gap-4 sm:gap-6">
          {[
            { n: '01', t: 'Creator of API Marketing', d: 'Pioneered the world\'s first Attract → Pull → Influence framework, adopted by brands across India.' },
            { n: '02', t: 'Platform Partner Strategist', d: 'Direct partner consultant for Google, Meta, and ClickUp — the gatekeepers of the digital economy.' },
            { n: '03', t: '50+ Scale Operations', d: 'Engineered growth for fifty+ niche brands across Kerala and India through clinical precision.' }
          ].map((ach, i) => (
            <FadeUp key={ach.n} delay={0.1 * i + 0.3} className="flex gap-4 sm:gap-10 p-4 sm:p-10 bg-white border border-[#D2D2D7] rounded-[20px] sm:rounded-[36px] border-l-[4px] sm:border-l-[8px] border-l-[#E8001A] hover:shadow-2xl hover:translate-x-2 transition-all duration-700 shadow-lg">
              <div className="text-4xl sm:text-6xl font-black text-[#E8001A] leading-none opacity-20 italic flex-shrink-0">{ach.n}</div>
              <div className="pt-1 sm:pt-2">
                <h4 className="text-lg sm:text-2xl font-black text-[#0A0A0A] mb-2 sm:mb-3 tracking-tighter">{ach.t}</h4>
                <p className="text-[13px] sm:text-[16px] font-light text-[#6E6E73] leading-relaxed italic">{ach.d}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </div>
  </Section>
);

const SoftwareSection = () => {
  const [toast, setToast] = useState(null);
  return (
    <section id="software" className="py-16 sm:py-32 lg:py-64 bg-[#0A0A0A] text-white relative overflow-hidden">
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

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-14 grid lg:grid-cols-2 gap-8 sm:gap-16 lg:gap-20 xl:gap-32 items-center relative z-10">
        <FadeUp className="text-center lg:text-left">
          <span className="text-[11px] sm:text-[13px] font-black text-[#E8001A] uppercase tracking-[0.25em] sm:tracking-[0.4em] mb-6 sm:mb-8 block opacity-80 decoration-2 underline underline-offset-8 italic">Engineering the Future</span>
          <h2 className="text-[clamp(2.5rem,10vw,8.5rem)] font-black tracking-tighter leading-[0.9] mb-8 sm:mb-12 italic antialiased overflow-visible">          The<br />
            <span className="relative inline-block px-[6px] overflow-visible">
              <span className="bg-gradient-to-tr from-[#FF8A80] via-[#FF5C35] to-[#FF6FCF] bg-clip-text text-transparent">
                Future&nbsp;
              </span>

              <span className="absolute left-0 bottom-[-8px] w-full h-[2px] bg-[#E8001A]/40"></span>
            </span>
            <br />         Of Media.
          </h2>
          <p className="text-base sm:text-lg lg:text-2xl xl:text-3xl font-light text-white/60 mb-12 sm:mb-16 leading-tight italic max-w-lg mx-auto lg:mx-0">
            Social Bureau is engineering a first-of-its-kind software platform to transform how the creator economy and media operate.
          </p>
          <button onClick={() => handleJoinWaitingList({ onResult: setToast })} className="inline-block px-8 sm:px-14 py-4 sm:py-6 bg-white text-[#0A0A0A] rounded-full font-black text-base sm:text-xl hover:bg-[#E8001A] hover:text-white transition-all hover:scale-105 shadow-[0_20px_60px_rgba(232,0,26,0.3)]">
            Join the waiting List
          </button>
        </FadeUp>

        <div className="grid gap-6 sm:gap-8">
          {[
            { t: 'Creator Intelligence Engine', d: 'AI-powered real-time audience analytics, content forecasting, and monetisation optimisation in one command centre.', s: 'In Development' },
            { t: 'Media Workflow OS', d: 'End-to-end production management — scripting to global distribution, built for the next generation of media hubs.', s: 'Coming 2026' },
            { t: 'API Marketing Dashboard', d: 'The first dedicated tool to execute our proprietary framework — track A, P, and I metrics with clinical accuracy.', s: 'Beta Early 2026' }
          ].map((feat, i) => (
            <FadeUp key={feat.t} delay={0.1 * i} className="bg-white/[0.04] backdrop-blur-3xl border border-white/10 rounded-[28px] sm:rounded-[44px] p-6 sm:p-12 hover:bg-white/[0.08] transition-all duration-700 hover:-translate-x-4 group">
              <div className="text-[10px] sm:text-[12px] font-black text-[#E8001A] uppercase tracking-[0.25em] mb-4 sm:mb-6 opacity-60 group-hover:opacity-100 transition-opacity italic">Feature Module 0{i + 1}</div>
              <h4 className="text-xl sm:text-3xl font-black mb-3 sm:mb-4 tracking-tighter text-white/90">{feat.t}</h4>
              <p className="text-white/40 text-[14px] sm:text-[17px] leading-relaxed mb-8 sm:mb-10 font-light italic">{feat.d}</p>
              <div className="flex items-center gap-3 sm:gap-4 text-[10px] sm:text-[12px] font-black text-white/20 uppercase tracking-widest group-hover:text-[#E8001A] transition-colors">
                <span className="w-2.5 h-2.5 bg-[#E8001A] rounded-full animate-ping" />
                {feat.s}
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
      {toast && <Toast type={toast.type} message={toast.message} onClose={() => setToast(null)} />}
    </section>
  );
};

const BottomStatsSection = () => (
  <section className="bg-gradient-to-br from-[#0A0A0A] to-[#1A0008] border-y border-white/5 overflow-hidden">
    <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4">
      {[
        { n: '50+', l: 'Brands Scaled' },
        { n: '4×', l: 'Average ROAS' },
        { n: '₹10Cr', l: 'Ad Spend Managed' },
        { n: '#1', l: 'API Marketing' }
      ].map((stat, i) => (
        <FadeUp key={stat.l} delay={i * 0.15} className="py-8 sm:py-12 md:py-24 px-3 sm:px-4 md:px-8 text-center border-r border-white/5 last:border-r-0 hover:bg-[#E8001A]/[0.05] transition-all duration-700 group cursor-default">
          <span className="block text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter bg-gradient-to-br from-[#FF8A80] via-[#E8001A] to-[#FF1493] bg-clip-text text-transparent mb-2 sm:mb-4 md:mb-6 italic transform group-hover:scale-110 transition-transform duration-500">{stat.n}</span>
          <span className="text-[9px] sm:text-[11px] md:text-[14px] font-black text-white/40 uppercase tracking-[0.2em] sm:tracking-[0.3em] italic opacity-60 group-hover:opacity-100 group-hover:text-white/80 transition-all leading-tight">{stat.l}</span>
        </FadeUp>
      ))}
    </div>
  </section>
);

// --- Instagram Reels Section ---
const getReelShortcode = (url) => {
  if (!url) return null;
  try {
    const cleanUrl = url.split('?')[0];
    const match = cleanUrl.match(/\/(?:reel|p|tv)\/([A-Za-z0-9_-]+)/);
    if (match && match[1]) {
      return match[1];
    }
    const parts = cleanUrl.replace(/\/$/, "").split("/");
    return parts[parts.length - 1];
  } catch (err) {
    console.error("Error parsing shortcode:", err);
    return null;
  }
};

const InstagramReelsSection = () => {
  const [reels, setReels] = useState([]);
  const [activeIdx, setActiveIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const scrollRef = React.useRef(null);

  useEffect(() => {
    const fetchReels = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/reels?active=true`);
        const data = await res.json();
        if (data.success && data.data.length > 0) {
          setReels(data.data);
        }
      } catch (err) {
        console.error("Failed to load reels:", err);
      }
    };
    fetchReels();
  }, []);

  const scrollTo = (idx) => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const card = container.children[idx];
    if (card) {
      const cardOffsetLeft = card.offsetLeft;
      const cardWidth = card.clientWidth;
      const containerWidth = container.clientWidth;
      
      // Calculate target scrollLeft to center the card horizontally
      const targetScrollLeft = cardOffsetLeft - (containerWidth / 2) + (cardWidth / 2);
      
      container.scrollTo({
        left: targetScrollLeft,
        behavior: "smooth"
      });
    }
    setActiveIdx(idx);
  };

  // Auto-scroll loop
  useEffect(() => {
    if (reels.length <= 1 || isHovered) return;

    const interval = setInterval(() => {
      setActiveIdx((prevIdx) => {
        const nextIdx = (prevIdx + 1) % reels.length;
        scrollTo(nextIdx);
        return nextIdx;
      });
    }, 4500); // Cycle every 4.5 seconds

    return () => clearInterval(interval);
  }, [reels, isHovered]);
  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll <= 0) return;
    const idx = Math.round((scrollLeft / maxScroll) * (reels.length - 1));
    setActiveIdx(Math.max(0, Math.min(idx, reels.length - 1)));
  };

  if (reels.length === 0) return null;

  return (
    <section className="relative bg-[#060606] py-8 sm:py-20 lg:py-32 overflow-hidden">
      {/* Animated gradient mesh background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ x: [0, 60, 0], y: [0, -40, 0], opacity: [0.25, 0.45, 0.25] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-[-10%] left-[15%] w-[500px] h-[500px] rounded-full blur-[120px]"
          style={{ background: 'radial-gradient(circle, #f9ce3440, transparent)' }}
        />
        <motion.div
          animate={{ x: [0, -50, 0], y: [0, 60, 0], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
          className="absolute top-[20%] right-[5%] w-[400px] h-[400px] rounded-full blur-[100px]"
          style={{ background: 'radial-gradient(circle, #ee2a7b35, transparent)' }}
        />
        <motion.div
          animate={{ x: [0, 40, 0], y: [0, -30, 0], opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut', delay: 6 }}
          className="absolute bottom-0 left-[5%] w-[350px] h-[350px] rounded-full blur-[90px]"
          style={{ background: 'radial-gradient(circle, #6228d730, transparent)' }}
        />
        {/* Subtle grid overlay */}
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 lg:px-14">

        {/* ── Editorial Header ── */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-6 sm:mb-12 lg:mb-20">
          {/* Left: big number + label */}
          <FadeUp>
            <div className="flex items-end gap-5">
              <div
                className="text-[60px] sm:text-[120px] font-black leading-none tracking-tighter"
                style={{ background: 'linear-gradient(135deg, #f9ce34, #ee2a7b, #6228d7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
              >
                {String(reels.length).padStart(2, '0')}
              </div>
              <div className="pb-2 sm:pb-4">
                <div className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.4em] text-white/30 mb-1">Latest</div>
                <div className="text-lg sm:text-2xl font-black text-white/80 tracking-tighter leading-none">Reels</div>
              </div>
            </div>
          </FadeUp>

          {/* Right: headline + sub */}
          <FadeUp delay={0.15} className="lg:text-right max-w-xl">
            <div
              className="text-[11px] font-black uppercase tracking-[0.35em] mb-2 sm:mb-3"
              style={{ background: 'linear-gradient(to right, #f9ce34, #ee2a7b, #6228d7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
            >
              @socialbureau.in
            </div>
            <h2 className="text-2xl sm:text-5xl lg:text-6xl font-black tracking-tighter text-white leading-[0.9] mb-3 sm:mb-4">
              From the <span className="italic">Studio.</span>
            </h2>
            <p className="text-xs sm:text-base text-white/35 font-light max-w-sm lg:ml-auto">
              Behind-the-scenes moments, campaigns & ideas — straight from our world.
            </p>
          </FadeUp>
        </div>

        {/* ── Reels horizontal scroll ── */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="flex gap-5 sm:gap-7 overflow-x-auto pb-6 snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
        >
          {reels.map((reel, i) => {
            const shortcode = getReelShortcode(reel.url);
            return (
              <div
                key={reel._id}
                className="flex-shrink-0 snap-center w-[230px] sm:w-[320px] lg:w-[calc((100%-3*1.75rem)/4)]"
              >
                {/* Gradient border frame */}
                <div
                  className="relative rounded-[24px] p-[1.5px] transition-transform duration-500 hover:-translate-y-2 group/card"
                  style={{ background: 'linear-gradient(135deg, #f9ce34, #ee2a7b, #6228d7)' }}
                >
                  {/* Glow behind card */}
                  <div
                    className="absolute inset-0 rounded-[24px] blur-xl opacity-30 -z-10 group-hover/card:opacity-50 transition-opacity duration-500"
                    style={{ background: 'linear-gradient(135deg, #f9ce34, #ee2a7b, #6228d7)' }}
                  />

                  {/* The embed container */}
                  <div className="relative bg-[#0b0b0b] rounded-[22.5px] overflow-hidden flex flex-col h-full shadow-2xl">
                    {/* Floating account badge */}
                    <div className="flex items-center justify-between px-4 py-3 bg-black/40 border-b border-white/5 backdrop-blur-md">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full p-[1.5px]" style={{ background: 'linear-gradient(135deg, #f9ce34, #ee2a7b, #6228d7)' }}>
                          <div className="w-full h-full bg-[#0d0d0d] rounded-full flex items-center justify-center overflow-hidden">
                            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-white"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                          </div>
                        </div>
                        <div>
                          <span className="text-[11px] font-black text-white tracking-wide block leading-none">socialbureau.in</span>
                          <span className="text-[8px] font-bold text-white/30 uppercase tracking-widest mt-0.5 block leading-none">Official Reel</span>
                        </div>
                      </div>
                      <a href={reel.url} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-full hover:bg-white/10 transition-colors text-white/50 hover:text-white">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path d="M7 17L17 7M17 7H7M17 7v10" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </a>
                    </div>

                    {/* Instagram embed iframe */}
                    <div className="relative aspect-[9/16] bg-black overflow-hidden flex items-center justify-center">
                      {shortcode ? (
                        <iframe
                          src={`https://www.instagram.com/reel/${shortcode}/embed`}
                          className="absolute inset-0 w-full h-full border-0 rounded-none"
                          scrolling="no"
                          allowFullScreen
                          allowtransparency="true"
                          allow="encrypted-media"
                          title={reel.caption || "Instagram Reel"}
                        />
                      ) : (
                        <div className="text-white/40 text-xs py-10">Invalid Reel URL</div>
                      )}
                    </div>

                    {/* Custom glass caption footer if available */}
                    {reel.caption && (
                      <div className="p-4 bg-gradient-to-t from-black/80 to-[#121212]/95 border-t border-white/5 flex flex-col gap-2">
                        <p className="text-[12px] text-white/80 font-medium leading-relaxed italic line-clamp-2">
                          {reel.caption}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Scroll dots indicator ── */}
        {reels.length > 1 && (
          <div className="flex justify-center gap-2 mt-6">
            {reels.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollTo(i)}
                className="transition-all duration-300 rounded-full"
                style={{
                  width: activeIdx === i ? '28px' : '8px',
                  height: '8px',
                  background: activeIdx === i
                    ? 'linear-gradient(to right, #f9ce34, #ee2a7b, #6228d7)'
                    : 'rgba(255,255,255,0.2)',
                }}
              />
            ))}
          </div>
        )}

        {/* ── Full-width CTA bar ── */}
        <FadeUp className="mt-16 sm:mt-20">
          <a
            href="https://www.instagram.com/socialbureau.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center justify-between w-full rounded-[24px] px-8 sm:px-12 py-6 sm:py-8 overflow-hidden transition-transform duration-500 hover:scale-[1.01]"
            style={{ background: 'linear-gradient(135deg, #1a0a00, #1a001a)' }}
          >
            {/* Gradient border */}
            <div className="absolute inset-0 rounded-[24px] p-[1.5px]"
              style={{ background: 'linear-gradient(135deg, #f9ce34, #ee2a7b, #6228d7)', WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude' }} />

            {/* Animated glow on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-[24px] blur-3xl -z-10"
              style={{ background: 'linear-gradient(135deg, #f9ce3420, #ee2a7b20, #6228d720)' }} />

            <div className="flex items-center gap-4 sm:gap-6">
              {/* Instagram icon ring */}
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'linear-gradient(135deg, #f9ce34, #ee2a7b, #6228d7)' }}>
                <svg viewBox="0 0 24 24" className="w-6 h-6 sm:w-7 sm:h-7 fill-white">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </div>
              <div>
                <div className="text-xs sm:text-sm font-black uppercase tracking-[0.3em] text-white/40 mb-0.5">Follow Us</div>
                <div className="text-xl sm:text-2xl font-black text-white tracking-tight">@socialbureau.in</div>
              </div>
            </div>

            <div className="flex items-center gap-3 sm:gap-4">
              <span className="hidden sm:block text-sm font-bold text-white/50">Open Instagram</span>
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center border border-white/10 group-hover:border-white/30 transition-all group-hover:translate-x-1 duration-300">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path d="M7 17L17 7M17 7H7M17 7v10" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          </a>
        </FadeUp>
      </div>
    </section>
  );
};

// --- Main Home Component ---

export const Home = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activePoster, setActivePoster] = useState(null);
  const homepageSchemas = generateHomepageSchemas();
  const [showHintPopup, setShowHintPopup] = useState(false);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    if (queryParams.get("startHunt") === "true") {
      setShowHintPopup(true);
      startTreasureHunt();
      startTreasureHuntTimer();
      const newUrl = window.location.pathname;
      window.history.replaceState({}, document.title, newUrl);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const fetchActivePoster = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/posters?active=true`);
        const result = await response.json();
        if (result.success && result.data && result.data.length > 0) {
          setActivePoster(result.data[0]);
        }
      } catch (err) {
        console.error("Error fetching active poster:", err);
      }
    };
    fetchActivePoster();
  }, []);

  /*
  const HERO_SCHEDULE = [
    // {
    //   date: new Date("2026-05-10T00:00:00"),
    //   desktop: "https://res.cloudinary.com/dpfpenhqc/image/upload/q_auto/f_auto/v1778302961/mothers_day_final_ajbf8w.png",
    //   mobile: "https://res.cloudinary.com/dpfpenhqc/image/upload/q_auto/f_auto/v1778305472/ChatGPT_Image_May_9_2026_11_11_20_AM_c0vp41.png",
    //   alt: "Mother's Day Special"
    // },
    // {
    //   date: new Date("2024-01-01T00:00:00"), // Default/Current
    //   desktop: "https://res.cloudinary.com/dtwcgfmar/image/upload/v1777882017/ChatGPT_Image_May_4_2026_01_32_02_PM_lavtlu.png",
    //   mobile: "https://res.cloudinary.com/dtwcgfmar/image/upload/v1777882016/ChatGPT_Image_May_4_2026_01_31_52_PM_d3gsbh.png",
    //   alt: "HR Session Poster"
    // }
  ];

  // Default hero fallback when no schedule is active
  const defaultHero = {
    desktop: "https://res.cloudinary.com/dtwcgfmar/image/upload/v1777882017/ChatGPT_Image_May_4_2026_01_32_02_PM_lavtlu.png",
    mobile: "https://res.cloudinary.com/dtwcgfmar/image/upload/v1777882016/ChatGPT_Image_May_4_2026_01_31_52_PM_d3gsbh.png",
    alt: "Social Bureau"
  };

  // Find the current active hero based on date
  const now = new Date();
  const currentHero = HERO_SCHEDULE.find(h => now >= h.date) || defaultHero;
  */

  // Static Hero for Social Bureau
  const currentHero = {
    desktop: "https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/ChatGPT%20Image%20Jun%2011%2C%202026%2C%2006_27_01%20PM.png",
    mobile: "https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/ChatGPT%20Image%20Jun%2011%2C%202026%2C%2006_27_01%20PM.png",
    alt: "Social Bureau"
  };

  return (
    <div className="bg-white text-[#1D1D1F] selection:bg-[#E8001A] selection:text-white font-sans antialiased">
      <Seo
        title="Social Bureau — World's First API Marketing Agency"
        description="Official partner of Google, Meta & ClickUp. We help brands attract, pull, and influence at scale with our unique API Marketing framework."
        keywords="api marketing, social bureau, performance marketing kochi, clickup india reseller, digital strategy kochi"
        image="/assets/socialbureau.png"
        canonicalUrl="https://www.socialbureau.in"
      />
      <Popup/>
      <SchemaMarkup data={homepageSchemas} />
      {/* <AnniversaryCountdown /> */}
      <StudentTicker />

      {activePoster && (
        <section className="w-full px-0 border-b border-[#D2D2D7] bg-white">
          <div className="w-full flex justify-center items-center">
            {/* Desktop Image */}
            <img
              src={activePoster.image}
              alt={activePoster.title}
              className={`${activePoster.mobileImage ? 'hidden sm:block' : 'block'} w-full h-auto`}
            />
            {/* Mobile Image */}
            {activePoster.mobileImage && (
              <img
                src={activePoster.mobileImage}
                alt={activePoster.title}
                className="block sm:hidden w-full h-auto"
              />
            )}
          </div>
        </section>
      )}

      
      <section className="w-full px-0">
        <a href='/' target="_blank" rel="noopener noreferrer">
          <img
            src={currentHero.desktop}
            alt={currentHero.alt}
            className="hidden sm:block w-full h-full object-cover"
          />
          <img
            src={currentHero.mobile || currentHero.desktop}
            alt={currentHero.alt}
            className={`block sm:hidden w-full object-contain ${currentHero.mobile ? 'h-full' : 'h-auto'}`}
          />
        </a>
      </section>
      
      {/* <section className="w-full px-0"> <a href='https://www.instagram.com/reel/DXV3lbVCb77' target="_blank" rel="noopener noreferrer">
  <video
  className="block w-full h-auto object-cover"
  autoPlay
  loop
  muted
>
  <source src="https://res.cloudinary.com/dtwcgfmar/video/upload/v1777369437/3141211-uhd_3840_2160_25fps_1_hpggvl.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>
  </a>
</section> */}
      {/* ---- HERO SECTION ---- */}
      <section className="min-h-screen flex flex-col justify-center pt-2 sm:pt-20 relative overflow-hidden">
        {/* Hero Background Gradient Mesh */}
        <div className="absolute inset-0 -z-10 bg-white">
          <div className="absolute top-[15%] right-[-5%] w-[60%] h-[60%] bg-gradient-to-br from-[#E8001A]/10 to-transparent blur-[80px] sm:blur-[120px] opacity-60 rounded-full" />
          <div className="absolute bottom-[20%] left-[-10%] w-[50%] h-[50%] bg-gradient-to-tr from-[#4285F4]/8 to-transparent blur-[80px] sm:blur-[110px] opacity-50 rounded-full" />
          <div className="absolute bottom-[-10%] right-[10%] w-[45%] h-[40%] bg-gradient-to-tl from-[#7B68EE]/6 to-transparent blur-[80px] sm:blur-[120px] opacity-50 rounded-full" />

        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-14 grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          <div className="relative z-10 text-center lg:text-left pt-8 sm:pt-12 lg:pt-0">
            <FadeUp delay={0.1}>
              <div className="inline-flex items-center gap-2 sm:gap-2.5 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full border border-[#E8001A]/22 bg-[#E8001A]/[0.07] text-[#E8001A] text-[10px] sm:text-[12.5px] font-bold tracking-widest uppercase mb-6 sm:mb-8">
                <span className="w-1.5 h-1.5 bg-[#E8001A] rounded-full animate-ping" />
                World's First API Marketing Agency
              </div>
            </FadeUp>

            <FadeUp delay={0.25}>
              <h1 className="text-[clamp(2rem,8vw,7rem)] font-black leading-[0.92] tracking-tighter text-[#0A0A0A] mb-6 sm:mb-8">
                Scale<br />
                <span className="bg-gradient-to-tr from-[#E8001A] via-[#FF5C35] to-[#FF1493] bg-clip-text text-transparent italic">Smarter.</span><br />
                Win Bigger
              </h1>
            </FadeUp>

            <FadeUp delay={0.4}>
              <p className="text-base sm:text-lg lg:text-2xl font-light leading-relaxed text-[#6E6E73] max-w-[500px] mb-8 sm:mb-12 mx-auto lg:mx-0">
                Kerala's first and the world's first data-driven API Marketing agency. We help brands attract, pull, and influence at scale.
              </p>
            </FadeUp>
            <FadeUp delay={0.55}>
              <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4">
                <a href="#contact" className="w-full sm:w-auto px-6 sm:px-10 py-3 sm:py-4.5 bg-[#0A0A0A] text-white rounded-full font-bold text-sm sm:text-lg hover:bg-[#E8001A] transition-all hover:scale-105 shadow-xl shadow-black/10">
                  Start your growth →
                </a>
                <a href="#api" className="w-full sm:w-auto px-6 sm:px-10 py-3 sm:py-4.5 border border-[#D2D2D7] text-[#1D1D1F] rounded-full font-bold text-sm sm:text-lg hover:border-[#E8001A] hover:text-[#E8001A] transition-all bg-white/50 backdrop-blur-md">
                  Our framework
                </a>
              </div>
            </FadeUp>
            <FadeUp delay={0.7}>
              <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-6 sm:gap-12 lg:gap-16 mt-12 sm:mt-20 pt-8 sm:pt-12 border-t border-[#D2D2D7]">
                {/* ITEM */}
                <div className="text-center lg:text-left">
                  <div className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-[-2px] text-[#0A0A0A] leading-none">
                    50<span className="text-[#E8001A] font-extrabold">+</span>
                  </div>
                  <div className="text-[11px] sm:text-[13px] font-bold text-[#6E6E73] uppercase tracking-[1px] sm:tracking-[2px] mt-2 sm:mt-3">
                    Brands Scaled
                  </div>
                </div>
                {/* ITEM */}
                <div className="text-center lg:text-left">
                  <div className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-[-2px] text-[#0A0A0A] leading-none">
                    4<span className="text-[#E8001A] font-extrabold">×</span>
                  </div>
                  <div className="text-[11px] sm:text-[13px] font-bold text-[#6E6E73] uppercase tracking-[1px] sm:tracking-[2px] mt-2 sm:mt-3">
                    Average ROAS
                  </div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-[-2px] text-[#0A0A0A] leading-none">
                    ₹10<span className="text-[#E8001A] font-extrabold">Cr</span>
                  </div>
                  <div className="text-[11px] sm:text-[13px] font-bold text-[#6E6E73] uppercase tracking-[1px] sm:tracking-[2px] mt-2 sm:mt-3">
                    Ad Spend
                  </div>
                </div>
              </div>
            </FadeUp>

          </div>

          {/* Mobile image: show on small screens after the buttons/stats */}
          <div className="block lg:hidden w-full mt-8">
            <FadeUp delay={0.4}>
              <div className="rounded-[28px] sm:rounded-[36px] overflow-hidden border border-black/5 bg-[#F0F0F2] aspect-[0.82] relative group shadow-2xl">
                <img
                  src="https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/DSC01171_hsyqoo.jpg"
                  alt="Sham SK"
                  className="w-full h-full object-cover duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-x-5 bottom-5 bg-white/90 backdrop-blur-2xl border border-black/5 rounded-[24px] p-6 shadow-xl">
                  <div className="text-2xl font-black tracking-tighter text-[#0A0A0A]">Sham SK</div>
                  <div className="text-[13px] font-bold text-[#E8001A] mt-1.5 uppercase tracking-wide">World's First API Marketing Consultant</div>
                  <div className="text-[12px] font-medium text-[#6E6E73] mt-1 italic">Founder & CEO · Social Bureau</div>
                </div>
              </div>
            </FadeUp>
          </div>

          <div className="hidden lg:block relative max-w-[480px] ml-auto w-full">
            <FadeUp delay={0.4}>
              <div className="rounded-[28px] sm:rounded-[36px] overflow-hidden border border-black/5 bg-[#F0F0F2] aspect-[0.82] relative group shadow-2xl">
                <img
                  src="https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/DSC01171_hsyqoo.jpg"
                  alt="Sham SK"
                  className="w-full h-full duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-x-5 bottom-5 bg-white/90 backdrop-blur-2xl border border-black/5 rounded-[24px] p-6 shadow-xl">
                  <div className="text-2xl font-black tracking-tighter text-[#0A0A0A]">Sham SK</div>
                  <div className="text-[13px] font-bold text-[#E8001A] mt-1.5 uppercase tracking-wide">World's First API Marketing Consultant</div>
                  <div className="text-[12px] font-medium text-[#6E6E73] mt-1 italic">Founder & CEO · <a href="https://trillionedition.com" className="text-[#E8001A] ">TrillionEdition</a></div>
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
          <div className="text-center mb-12 sm:mb-16">
            <h3 className="text-[10px] sm:text-[12px] font-black text-[#6E6E73] uppercase tracking-[0.15em] sm:tracking-[0.2em] mb-3 sm:mb-4 opacity-70">Global Partnerships</h3>
            <p className="text-lg sm:text-2xl font-light text-[#1D1D1F] max-w-2xl mx-auto px-2">Official Partner of the World's Leading Platforms</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-6">
            {[
              {
                name: 'Google Advertising',
                img: 'assets/home/google.png',
                href: 'https://partners.cloud.google.com',
                status: 'Official Partner',
                imgClass: 'w-20 sm:w-30'
              },
              {
                name: 'Meta Business',
                img: 'assets/home/meta.png',
                href: 'https://www.facebook.com/business/marketing-partners/become-a-partner',
                status: 'Business Partner',
                imgClass: 'w-16 sm:w-20'
              },
              {
                name: 'ClickUp Software',
                img: 'assets/home/clickup.jpg',
                href: 'https://clickup.com',
                status: 'Reseller Partner',
                imgClass: 'w-25',
                isClickUp: true
              },
              {
                name: 'YouTube Ads',
                img: 'assets/home/youtube.png',
                href: 'https://ads.google.com/intl/en_in/start/campaigns/video-ads-gdn/?subid=in-en-adon-yt-sch-a-byb!o3~~1154489075500768~kwd-72156283195328:loc-90~627302844~&&msclkid=f56eafec5bff166b5de1c630b38506ac&gclid=f56eafec5bff166b5de1c630b38506ac&gclsrc=3p.ds&gad_source=7&gad_campaignid=21162634961',
                status: 'Certified Partner',
                imgClass: 'w-20 sm:w-30'
              },
              {
                name: 'Social Content',
                img: 'assets/home/insta.jpg',
                href: 'https://creators.instagram.com/earn-money/partnership-ads?locale=en_US',
                status: 'Certified Partner',
                imgClass: 'w-16 sm:w-22'
              },
              {
                name: 'TikTok',
                img: 'assets/home/tick.png',
                href: 'https://www.tiktok.com/business/',
                status: 'Certified Partner',
                imgClass: 'w-16 sm:w-22'
              },
              {
                name: 'Reddit',
                img: 'assets/home/redis.jpg',
                href: 'https://www.redditinc.com/advertising',
                status: 'Certified Partner',
                imgClass: 'w-16 sm:w-27'
              },
              {
                name: 'LinkedIn',
                img: 'assets/home/linked.png',
                href: 'https://business.linkedin.com/marketing-solutions',
                status: 'Certified Partner',
                imgClass: 'w-16 sm:w-18'
              },
              {
                name: 'X',
                img: 'assets/home/x.png',
                href: 'https://business.twitter.com/',
                status: 'Certified Partner',
                imgClass: 'w-16 sm:w-17'
              },
              {
                name: 'WhatsApp Business',
                img: 'https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/wb_jaisd2.jpg',
                href: 'https://business.whatsapp.com/',
                status: 'Certified Partner',
                imgClass: 'w-16 sm:w-17'
              }
            ].map((p, i) => (
              <motion.div
                key={p.name}
                whileHover={{ y: -8 }}
                className={`bg-white rounded-[20px] sm:rounded-[28px] border border-[#D2D2D7] overflow-hidden group hover:shadow-2xl transition-all duration-500 ${i >= 7 ? 'hidden sm:block' : ''}`}
              >
                <a href={p.href} target="_blank" rel="noopener noreferrer" className="block w-full h-full">
                  <div className="h-24 sm:h-32 flex items-center justify-center p-4 sm:p-8 transition-colors">
                    {p.isClickUp ? (
                      <div className="flex flex-col items-center gap-2 transform scale-50 sm:scale-75">
                        <img className={p.imgClass} src={p.img} alt={p.name} />
                      </div>
                    ) : (
                      <img className={p.imgClass} src={p.img} alt={p.name} />
                    )}
                  </div>
                  <div className="p-4 sm:p-6 pt-0 text-center">
                    <div className="text-[12px] sm:text-[15px] font-black text-[#0A0A0A] mb-1.5 tracking-tight">{p.name}</div>
                    <div className="inline-block text-[8px] sm:text-[10px] font-black text-[#E8001A] bg-[#E8001A]/[0.08] px-2 sm:px-3 py-0.5 sm:py-1 rounded-full uppercase tracking-widest">{p.status}</div>
                  </div>
                </a>
              </motion.div>
            ))}
          </div>
        </FadeUp>
      </Section>

      {/* --- API FRAMEWORK SECTION --- */}
      <Section id="api" className="bg-white">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-24 items-center">
          {/* LEFT COLUMN: upleft (top) + bottom-left (below) */}
          <div className="flex flex-col items-center lg:items-start gap-6 w-full">
            <div className="relative w-full sm:w-[400px] lg:w-[500px] aspect-square flex items-center justify-center mx-auto lg:mx-0 rounded-[32px] sm:rounded-[40px] overflow-hidden bg-gradient-to-br from-[#FFF5F5] via-[#FFF0F8] to-[#F5F0FF] border border-[#D2D2D7] shadow-inner">

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
                className="relative z-10 w-32 sm:w-40 lg:w-44 h-32 sm:h-40 lg:h-44 bg-gradient-to-br from-[#E8001A] to-[#FF4444] shadow-[0_24px_64px_rgba(232,0,26,0.35)] flex flex-col items-center justify-center transform hover:scale-110 transition-transform duration-500"
                style={{
                  clipPath:
                    "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                }}
              >
                <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-widest italic">
                  API
                </div>
                <div className="text-[8px] sm:text-[10px] font-bold text-white/90 uppercase tracking-[0.25em] mt-1.5 sm:mt-2 border-t border-white/20 pt-1.5 sm:pt-2">
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
                    ? "top-4 sm:top-12 text-[10px]"
                    : i === 1
                      ? "bottom-6 sm:bottom-16 left-2 sm:left-10 text-[10px]"
                      : "bottom-6 sm:bottom-16 right-2 sm:right-10 text-[10px]"
                    } px-3 sm:px-6 py-1 sm:py-2 bg-white/90 backdrop-blur-xl border border-[#D2D2D7] rounded-full font-black shadow-xl`}
                >
                  {tag}
                </motion.div>
              ))}
            </div>
            {/* bottom-left card (just below upleft) */}


            <div className="w-full flex justify-center lg:justify-start mt-14">
              <div className="w-full sm:w-[420px] lg:w-[480px] bg-white/90 backdrop-blur-2xl border border-[#D2D2D7] rounded-3xl shadow-[0_30px_80px_rgba(0,0,0,0.12)] p-6 sm:p-8 lg:p-10 relative overflow-hidden transition-all duration-500 hover:shadow-[0_40px_100px_rgba(232,0,26,0.15)]">

                {/* glow */}
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-[160px] h-[60px] bg-gradient-to-r from-[#E8001A]/30 to-[#FF1493]/30 blur-3xl rounded-full opacity-60" />

                {/* subtle border glow */}
                <div className="absolute inset-0 rounded-3xl border border-white/40 pointer-events-none" />

                {/* label */}
                <div className="text-[11px] uppercase tracking-[0.25em] text-[#6E6E73] font-bold mb-3">
                  API Module
                </div>

                {/* title */}
                <div className="text-2xl sm:text-3xl font-black text-[#0A0A0A] mb-3 tracking-tight leading-tight">
                  Activate Growth Flow
                </div>

                {/* description */}
                <div className="text-[14px] sm:text-[16px] text-[#6E6E73] mb-6 leading-relaxed">
                  Start your API Marketing engine and let your brand attract, engage, and convert high-intent audiences seamlessly.
                </div>

                {/* button */}
                <a href='https://docs.google.com/forms/d/e/1FAIpQLSdTQR9NJZMz3KYMwJSCow0EsGP8zUk_m79i4SqRzWVaHts6aA/viewform?usp=header' target="_blank" rel="noopener noreferrer" className="w-full">
                  <button className="w-full py-3 sm:py-3.5 rounded-2xl bg-gradient-to-r from-[#E8001A] to-[#FF4444] text-white font-bold text-[14px] sm:text-[15px] shadow-lg hover:scale-[1.04] hover:shadow-[0_10px_40px_rgba(232,0,26,0.4)] transition-all duration-300">
                    Join the API Revolution
                  </button>
                </a>

              </div>
            </div>


          </div>

          {/* section parallel (right column) */}
          <div>
            <FadeUp>
              <span className="text-[11px] sm:text-[13px] font-black text-[#E8001A] uppercase tracking-[0.15em] sm:tracking-[0.2em] mb-4 sm:mb-6 block opacity-80">Scientific Growth Framework</span>
              <h2 className="text-4xl sm:text-6xl lg:text-8xl font-black tracking-tighter leading-[0.9] mb-6 sm:mb-10 text-[#0A0A0A]">
                The World's First<br />
                <span className="bg-gradient-to-tr from-[#E8001A] via-[#FF5C35] to-[#FF1493] bg-clip-text text-transparent italic py-3 inline-block">
                  API Marketing
                </span>Method.

              </h2>
              <span className="text-base sm:text-lg lg:text-2xl font-light text-[#6E6E73] mb-8 sm:mb-12 leading-relaxed">
                Application Programming Interface
              </span>
              <p className="text-base sm:text-lg lg:text-2xl font-light text-[#6E6E73] mb-8 sm:mb-12 leading-relaxed">
                Pioneered by Sham SK — a systematic engine that warms audiences before scaling ad spend, ensuring maximum ROAS.
              </p>

              <div className="space-y-2 sm:space-y-3">
                {[
                  { l: 'A', t: 'Attract', d: 'Draw in your exact audience through high-intent content and discovery.' },
                  { l: 'P', t: 'Pull', d: 'Engage prospects deeply within a curated brand ecosystem.' },
                  { l: 'I', t: 'Influence', d: 'Convert warm traffic using data-driven social proof and creative strategy.' }
                ].map((item, i) => (
                  <motion.div
                    key={item.t}
                    whileHover={{ x: 12 }}
                    className="flex gap-4 sm:gap-8 py-6 sm:py-10 border-b border-[#D2D2D7] group first:border-t hover:bg-[#F5F5F7]/30 transition-colors px-3 sm:px-6 -mx-3 sm:-mx-6 rounded-2xl"
                  >
                    <div className="text-4xl sm:text-6xl lg:text-7xl font-black text-[#E8001A] leading-none transition-transform duration-500 group-hover:scale-125 italic flex-shrink-0">{item.l}</div>
                    <div className="pt-1 sm:pt-2">
                      <h4 className="text-lg sm:text-2xl font-black text-[#0A0A0A] mb-1 sm:mb-2 tracking-tighter">{item.t}</h4>
                      <p className="text-[13px] sm:text-[16px] font-light text-[#6E6E73] leading-relaxed max-w-md">{item.d}</p>
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
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-end gap-8 sm:gap-12 mb-16 sm:mb-20">          <FadeUp className="flex-1">
          <span className="text-[11px] sm:text-[13px] font-black text-[#E8001A] uppercase tracking-[0.15em] sm:tracking-[0.2em] mb-3 sm:mb-4 block underline decoration-2 underline-offset-8">Capabilities</span>
          <h2 className="text-center text-4xl sm:text-6xl lg:text-8xl font-black tracking-tighter text-[#0A0A0A]">
            Our <span className="text-[#E8001A] italic">Services</span>
          </h2>          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="text-center lg:text-right mx-auto lg:ml-auto text-base sm:text-lg lg:text-xl font-light text-[#6E6E73] max-w-md mb-6 sm:mb-8 italic">Bespoke marketing solutions engineered for performance and scale.</p>
          </FadeUp>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0.5 bg-[#D2D2D7] border border-[#D2D2D7] rounded-[32px] sm:rounded-[40px] overflow-hidden shadow-2xl">
          {[
            { t: 'API Marketing', d: 'The world\'s first Application Programming Interface-based marketing framework, built on an organic-first approach for scalable growth in niche brands.', b: 'World First', s: 'lg:col-span-2', link: '/api-marketing-agency-in-kochi' },
            { t: 'ClickUp Reselling', d: 'Official India reseller. Licensed ClickUp at the best INR pricing with full local onboarding.', b: 'New', link: '/clickup' },
            { t: 'Performance Marketing', d: 'ROI-obsessed Meta, Google & YouTube campaigns. Every rupee tracked and optimized.', b: 'Certified', link: '/performance-marketing-agency-in-kochi' },
            { t: 'Social Media Prompting', d: 'Full-service strategy, content creation and community management across all major platforms.', link: '/content-marketing-agency-in-kochi' },
            { t: 'Influencer Marketing', d: 'High-impact micro-to-macro campaigns with precision audience matching.', link: '/niche-marketing-agency-in-kochi' },
            { t: 'Brand Connect', d: 'Positioning, identity, and messaging that ensures market dominance.', link: '#' },
            { t: 'Content Marketing', d: 'Content that converts. We create high-quality, engaging content that attracts, engages, and converts your target audience.', link: '/content-marketing-agency-in-kochi' },
            { t: 'Web Development', d: 'We build fast, secure, and scalable websites that are designed to convert visitors into customers.', link: '/web-development-agency-in-kochi' }
          ].map((s, i) => (
            <motion.div
              key={s.t}
              whileHover={{ backgroundColor: '#FAFAFA' }}
              className={`bg-white p-6 sm:p-10 lg:p-14 relative group ${s.s || ''}`}
            >
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#E8001A] via-[#FF5C35] to-[#FF1493] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
              <div className="text-[12px] sm:text-[14px] font-black text-[#6E6E73] mb-6 sm:mb-8 opacity-40">0{i + 1}</div>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-[#0A0A0A] mb-3 sm:mb-5 tracking-tighter flex items-center gap-2 sm:gap-4">
                {s.t}
                {s.b && <span className="text-[8px] sm:text-[10px] font-black px-2 sm:px-3 py-0.5 sm:py-1 rounded bg-[#E8001A] text-white uppercase tracking-widest">{s.b}</span>}
              </h3>
              <p className="text-[14px] sm:text-[15px] lg:text-[17px] font-light text-[#6E6E73] leading-relaxed mb-8 sm:mb-10 antialiased font-serif italic">{s.d}</p>
              <Link to={s.link} className="inline-flex items-center gap-3 text-[13px] sm:text-[15px] font-black text-[#E8001A] group-hover:gap-6 transition-all tracking-tighter">
                Explore The Service <span className="text-lg">→</span>
              </Link>
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
                SocialBureau brings the world's most powerful productivity platform to your team with full local support and INR pricing.
              </p>
              <div className="flex flex-wrap gap-4 sm:gap-5">
                <a href="/clickup" className="w-full sm:w-auto text-center px-10 sm:px-12 py-4 sm:py-5 bg-[#0A0A0A] text-white rounded-full font-black text-base sm:text-lg hover:bg-[#E8001A] transition-all hover:scale-105 shadow-2xl shadow-[#7B68EE]/20">
                  Get ClickUp India
                </a>
                <a href="https://app.clickup.com/login?_gl=1*168xxy9*_gcl_aw*R0NMLjE3NzY0MzE2NjguQ2p3S0NBand0SWZQQmhBekVpd0F2OVJUSnZ0cFQycVhEUWhHQTFQeG5MbWJHNUN4YzJhTnI0RXdHem1QNGlQanBUM1U0bTBiQzVlOGJob0NRRklRQXZEX0J3RQ..*_gcl_au*NDYyMDc0NTkyLjE3NzE5MDc2NzM." className="w-full sm:w-auto text-center px-10 sm:px-12 py-4 sm:py-5 border border-[#D2D2D7] text-[#1D1D1F] rounded-full font-black text-base sm:text-lg hover:border-[#7B68EE] hover:text-[#7B68EE] transition-all bg-white/50 backdrop-blur-md italic font-bold">
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
        <div className="flex flex-col items-center text-center mb-12 sm:mb-20">
          <FadeUp>
            <span className="text-[11px] sm:text-[13px] font-black text-[#E8001A] uppercase tracking-[0.2em] sm:tracking-[0.4em] mb-4 sm:mb-6 block opacity-70 italic">Industry Leaders</span>
            <h2 className="text-4xl sm:text-6xl lg:text-[clamp(60px,10vw,140px)] font-black tracking-tighter text-[#0A0A0A] leading-none mb-6 sm:mb-10 italic antialiased px-2">Trusted by Kerala's<br /><span className="bg-gradient-to-tr from-[#E8001A] via-[#FF5C35] to-[#FF1493] bg-clip-text text-transparent">Media Giants.</span></h2>
            <p className="text-base sm:text-lg lg:text-3xl font-light text-[#6E6E73] leading-relaxed italic antialiased font-serif px-2">Powering the digital strategy of India's most-watched news networks.</p>
          </FadeUp>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-0.5 bg-[#D2D2D7] border border-[#D2D2D7] rounded-[28px] sm:rounded-[44px] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.15)] bg-white">
          {[
            {
              name: 'Big TV',
              img: 'https://images.bigtvlive.com/2026/03/BigTvLive-Telugu-Logo-1.png',
              href: 'https://www.bigtvlive.com',
              accent: 'bg-[#E8001A]'
            },
            {
              name: 'Reporter Tv',
              img: 'assets/home/reporter.png',
              href: 'https://www.reporterlive.com',
              accent: 'bg-[#FFA500]'
            },
            {
              name: 'News Tamil',
              img: 'assets/home/newstam.webp',
              href: 'https://newstamil.tv/',
              accent: 'bg-[#E5001A]'
            }
          ].map((client) => (
            <motion.div key={client.name} whileHover={{ backgroundColor: '#FAFAFA' }} className="bg-white relative group border-transparent transition-all duration-300">
              <a href={client.href} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center gap-3 sm:gap-6 p-4 sm:p-10 min-h-[160px] sm:min-h-[220px] w-full h-full block">
                <img src={client.img} alt={client.name} className="w-20 sm:w-28 object-contain" />
                <div className="text-[10px] sm:text-[12px] font-black text-[#0A0A0A] uppercase tracking-widest italic antialiased text-center">{client.name}</div>
                <div className={`absolute bottom-0 inset-x-0 h-1.5 ${client.accent} origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700`} />
              </a>
            </motion.div>
          ))}

          {/* Confidential Clients Message */}
          <motion.div whileHover={{ backgroundColor: '#FAFAFA' }} className="bg-white relative group border-transparent transition-all duration-300 p-6 sm:p-10 flex flex-col items-center justify-center text-center">
            <h4 className="text-[14px] sm:text-[18px] font-black text-[#0A0A0A] tracking-tighter mb-2 italic">Most of our clients<br />are confidential.</h4>
            <a href="/contact" className="text-[10px] sm:text-[12px] font-black text-[#E8001A] uppercase tracking-widest hover:underline decoration-2 underline-offset-4 mt-2 transition-all block">
              Contact us to know more →
            </a>
            <div className="absolute bottom-0 inset-x-0 h-1.5 bg-[#4285F4] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
          </motion.div>
        </div>
      </Section>

      {/* --- FOUNDER SECTION --- */}
      <FounderSection />

      {/* --- INSTAGRAM REELS SECTION --- */}
      <InstagramReelsSection />

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
              <a href="/client-form" className="w-full sm:w-auto px-10 md:px-16 py-5 md:py-6 border-b-4 border-[#0A0A0A] text-[#1D1D1F] font-black text-xl md:text-2xl hover:text-[#E8001A] transition-all duration-300 transform active:translate-y-1">
                CSM Integration <span className="text-[#E8001A]">→</span>
              </a>
            </div>
          </FadeUp>
        </div>
      </section>

      <Testimonials className="w-full" />
      <PortfolioPopup />

      {showHintPopup && (
        <HintCard 
          clueText="Behind every strategy stands a story. Meet the people behind the bureau." 
          hintNumber={1}
          onClose={() => setShowHintPopup(false)} 
        />
      )}
    </div>
  );
};

export default Home;

