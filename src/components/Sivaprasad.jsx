import React, { useEffect, useRef, useState } from 'react';
import { X } from "lucide-react";
const inlineStyles = `
/* Small supplemental styles not covered by Tailwind */
.noise { background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E"); opacity: .03; }
.hero-bg { background: radial-gradient(circle at 30% 50%, rgba(102,126,234,0.06), transparent 40%), radial-gradient(circle at 70% 50%, rgba(118,75,162,0.06), transparent 40%); animation: float 20s ease-in-out infinite; }
@keyframes float { 0%,100%{ transform: translateY(0);} 50%{ transform: translateY(-20px);} }
.reveal { opacity: 0; transform: translateY(40px); transition: all 0.8s cubic-bezier(.22,1,.36,1); }
.reveal.in-view { opacity: 1; transform: translateY(0); }
.in-view { opacity: 1 !important; transform: none !important; }
.timeline-year { box-shadow: 0 0 0 8px rgba(26,26,26,0.8), 0 0 30px rgba(212,175,55,0.25); }
.venture-card { transition: transform .45s ease, box-shadow .3s ease; }
.venture-card:hover { transform: translateY(-8px); box-shadow: 0 20px 40px rgba(0,0,0,0.5); }
.stat-item { transition: all .6s cubic-bezier(.22,1,.36,1); }
.scroll-indicator { animation: fadeIn .8s ease .6s forwards; }
@keyframes fadeIn { to { opacity: 1; } }
.animate-fadeIn { animation: fadeIn .8s ease .6s forwards; }
.animate-bounce { animation: bounce 2s ease-in-out 2s infinite; }
@keyframes bounce { 0%,100%{ transform: translateY(0);} 50%{ transform: translateY(10px);} }

/* Reels styles */
.reels-container { overflow: hidden; }
.reels-track { display: block; white-space: nowrap; }
.reels-track-inner { display:flex; gap:1rem; align-items:stretch; animation: scroll-left 28s linear infinite; }
.reel-card { background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01)); border-radius: 12px; overflow: hidden; box-shadow: 0 6px 18px rgba(0,0,0,0.6); border: 1px solid rgba(255,255,255,0.03); display:inline-block; vertical-align:top; flex: 0 0 240px; width: 240px; height: 426px; position: relative; }
.reel-media { width: 100%; height: 100%; object-fit: cover; display:block; }
.reel-overlay { position: absolute; inset: 0; display:flex; align-items:flex-end; padding:10px; pointer-events:none; }
.reel-meta { pointer-events:auto; color:#fff; font-weight:600; text-shadow:0 4px 20px rgba(0,0,0,0.6); }
.reel-card:hover { transform: translateY(-6px); transition: transform .25s ease; }

/* Pause animation on hover */
.reels-track-inner:hover { animation-play-state: paused; }

/* Modal */
.reel-modal { position:fixed; inset:0; background: rgba(0,0,0,0.85); display:flex; align-items:center; justify-content:center; z-index:60; }
.reel-modal-content { width: min(720px, 95%); border-radius:12px; overflow:hidden; }
.reel-modal video { width:100%; height:100%; display:block; background:#000; }

@keyframes scroll-left { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }

@media (max-width:900px) { .reel-media { width:160px; height:280px; } }
/* Mobile: switch reels to vertical swipe layout using native scroll-snap */
@media (max-width:900px) {
  .reels-container { height: 72vh; overflow-y: auto; -webkit-overflow-scrolling: touch; scroll-snap-type: y mandatory; touch-action: pan-y; }
  .reels-track { white-space: normal; }
  .reels-track-inner { display:block; gap:0; animation: none; }
  .reel-card { width: 100%; height: 60vh; flex: none; margin-bottom: 1rem; scroll-snap-align: start; }
  .reel-media { width:100%; height:100%; object-fit:cover; }
  /* pause hover-based playback on mobile (no hover) and keep tap to open */
  .reel-card:hover { transform: none; }
}
/* Additional on-scroll animation helpers */
.fade-left { transform: translateX(-30px); }
.fade-right { transform: translateX(30px); }
.fade-up { transform: translateY(30px); }
.zoom-in { transform: scale(.96); opacity: 0; }
.reveal { opacity: 0; }
.reveal.in-view { opacity: 1; transform: none; }

/* Staggered delays for grid children */
.ventures-grid > *:nth-child(1) { transition-delay: 120ms; }
.ventures-grid > *:nth-child(2) { transition-delay: 240ms; }
.ventures-grid > *:nth-child(3) { transition-delay: 360ms; }
.stats-grid .stat-item:nth-child(1) { transition-delay: 120ms; }
.stats-grid .stat-item:nth-child(2) { transition-delay: 240ms; }
.stats-grid .stat-item:nth-child(3) { transition-delay: 360ms; }
.stats-grid .stat-item:nth-child(4) { transition-delay: 480ms; }

/* Gallery stagger */
.image-grid .carousel-slide { transition-delay: 160ms; }
.collage-grid .collage-item:nth-child(1){ transition-delay: 120ms; }
.collage-grid .collage-item:nth-child(2){ transition-delay: 220ms; }
.collage-grid .collage-item:nth-child(3){ transition-delay: 320ms; }
.collage-grid .collage-item:nth-child(4){ transition-delay: 420ms; }

/* Simple utility classes used from original design */
.font-playfair { font-family: 'Playfair Display', serif; }
.font-bebas { font-family: 'Bebas Neue', sans-serif; }

/* Responsive tweaks */
@media (max-width: 900px) {
  .hero { padding: 4rem 0; }
}
`;

export default function Sivaprasad() {
  const navLinksRef = useRef(null);
  const [navOpen, setNavOpen] = useState(false);
  const [selectedReel, setSelectedReel] = useState(null);
  const reelSources = [
    'https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/AQOm9-TKSETF6u9l0nAQpjHsbAhXRYiNGURHO24GziELFESRAfPmZ3VX4ZBR9f688oXf0552oU3C64zxdTEwPX8NpN7LfDa0aMU0TaPDrQ_hncnv7.webm',
    'https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/2cbb-d78b-4b2d-8061-c34797622b99_ifkkfg.webm',
    'https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/images/sivaprasad/reel.webm',
    'https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/images/sivaprasad/reel%20(1).webm',
    'https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/images/sivaprasad/reel%20(2).webm',
    'https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/images/sivaprasad/reel%20(3).webm',
    'https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/images/sivaprasad/reel%20(4).webm',
    'https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/images/sivaprasad/reel%20(5).webm',
    'https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/images/sivaprasad/reel%20(6).webm',
    'https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/images/sivaprasad/reel%20(7).webm',
    'https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/images/sivaprasad/reel%20(8).webm',
  ];
  const baseCount = reelSources.length;
  const [slotIndices, setSlotIndices] = useState(() => Array.from({ length: baseCount }, (_, i) => i));
  const videoRefs = useRef([]);

  const collageSources = [
    "https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/images/sivaprasad/image1.webp",
    "https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/images/sivaprasad/image2.webp",
    "https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/images/sivaprasad/image3.webp",
    "https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/images/sivaprasad/image4.webp",
    "https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/images/sivaprasad/image5.webp",
    "https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/images/sivaprasad/image6.webp",
    "https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/images/sivaprasad/image7.webp",
    "https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/images/sivaprasad/image9.webp",
    "https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/images/sivaprasad/image10.webp"
  ];
  const [collageStart, setCollageStart] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create WhatsApp message
    const whatsappMessage = `
New Project Inquiry

Client Details:
• Name: ${form.name}
• Email: ${form.email}

Message:
${form.message}

--- 
Submitted via: Sivaprasad portfolio
    `.trim();

    // URL encode and open WhatsApp
    const encodedMessage = encodeURIComponent(whatsappMessage);
    window.open(`https://wa.me/918714952665?text=${encodedMessage}`, "_blank");

    // Reset form
    setForm({
      name: "",
      email: "",
      message: "",
    });
    setIsOpen(false);
  };

  useEffect(() => {
    // Smooth anchor scrolling
    const handler = (e) => {
      if (!e.target.matches('a[href^="#"]')) return;
      const href = e.target.getAttribute('href');
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setNavOpen(false);
      }
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);

  useEffect(() => {
    // Scroll reveal
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((en) => en.isIntersecting && en.target.classList.add('in-view')),
      { threshold: 0.2, rootMargin: '0px 0px -100px 0px' }
    );
    document.querySelectorAll('.reveal, .timeline-item, .venture-card, .stat-item').forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setSelectedReel(null); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  // Cycle each slot index periodically so each position auto-changes its media
  useEffect(() => {
    const interval = setInterval(() => {
      setSlotIndices((prev) => prev.map((idx) => (idx + 1) % reelSources.length));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Cycle collage images (image1..image10) across the four collage slots
  useEffect(() => {
    const interval = setInterval(() => {
      setCollageStart((s) => (s + 1) % collageSources.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [collageSources.length]);

  // When slotIndices change, reload videos in place so the new src is used
  useEffect(() => {
    videoRefs.current.forEach((v) => {
      try { if (v && typeof v.load === 'function') { v.load(); v.play().catch(() => { }); } } catch (e) { }
    });
  }, [slotIndices]);

  return (
    <div className="bg-black text-gray-100 font-sans">
      <style dangerouslySetInnerHTML={{ __html: inlineStyles }} />
      <div className="noise pointer-events-none opacity-5 fixed inset-0 -z-10" />

      {/* Hero */}
      <section className="hero min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="hero-bg absolute inset-0 -z-10" />
        <div className="container mx-auto max-w-6xl px-6">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div className="hero-content text-center lg:text-left">
              <h1 className="reveal fade-up font-playfair text-6xl md:text-8xl font-extrabold leading-tight bg-clip-text text-transparent bg-gradient-to-br from-yellow-400 to-yellow-200">Sivaprasad</h1>
              <p className="reveal fade-up uppercase tracking-widest mt-4 text-gray-400">Media Entrepreneur · Visionary Leader · Industry Pioneer</p>
              <a href="#journey" className="reveal fade-up inline-block mt-8 px-8 py-3 rounded-full bg-yellow-400 text-black font-semibold transform hover:-translate-y-1 transition">Explore My Journey</a>
            </div>
            <div className="hero-image reveal fade-left">
              <img src="https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/images/sivaprasad/Siva%20Prasad.webp" alt="Sivaprasad portrait" className="w-full rounded-xl shadow-2xl object-cover" loading="lazy" />
            </div>
          </div>
        </div>
        <div className="scroll-indicator absolute bottom-12 left-1/2 -translate-x-1/2 opacity-0 animate-fadeIn animate-bounce">
          <svg viewBox="0 0 30 50" className="w-8 h-12 stroke-yellow-400 fill-none"><rect x="1" y="1" width="28" height="48" rx="14" strokeWidth="2" /></svg>
        </div>
      </section>

      {/* Journey Timeline */}
      <section id="journey" className="journey bg-gray-900 py-24">
        <div className="container mx-auto px-6">
          <h2 className="section-title reveal font-bebas text-6xl md:text-8xl">The Journey</h2>
          <div className="timeline relative mt-12">
            {[
              { year: '2001', title: 'The Beginning', text: 'Started professional career with India TV...' },
              { year: '2004', title: 'Walt Disney', text: 'Joined Walt Disney when the media giant...' },
              { year: '2007', title: 'Sony Pictures Networks', text: 'Joined SET Discovery Private Limited...' },
              { year: '2017', title: 'e-Digital', text: 'Joined E Infrastructure and Entertainment India Pvt Ltd...' },
              { year: '2019', title: 'Historic Milestone', text: 'Acquired Global Distribution rights...' },
              { year: '2020', title: 'Asiasat Launch', text: 'Founded Asiasat Pvt Ltd in Trivandrum...' },
              { year: '2022', title: 'Crazzy Media Ventures', text: 'Became 1st Chairman and MD of Crazzy Media Ventures...' },
              { year: '2024', title: 'YELLOW CLOUD', text: 'Chairman and founder Director for Yellow Cloud...' },
            ].map((item, idx) => (
              <div key={idx} className="timeline-item reveal grid grid-cols-1 md:grid-cols-2 gap-6 my-12 items-center">
                <div className="md:col-start-1 md:col-end-2 text-right md:pr-10">
                  <h3 className="font-playfair text-2xl text-yellow-400">{item.title}</h3>
                  <p className="text-gray-400 mt-3">{item.text}</p>
                </div>
                <div className="md:col-start-2 md:col-end-3 flex justify-center">
                  <div className="timeline-year reveal fade-right w-24 h-24 rounded-full bg-yellow-400 text-black flex items-center justify-center font-bebas text-xl">{item.year}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cricket Section */}
      <section id="cricket-section" className="cricket-section bg-gradient-to-b from-gray-900 to-gray-800 py-20">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-8 items-start">
          <div>
            <img src="https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/images/sivaprasad/KBT.webp" alt="Kochin Blue Tigers" className="w-auto sm:h-50 md:w-50 md:h-auto rounded-lg shadow-lg mb-6" />
            <h3 className="text-yellow-400 font-playfair text-2xl">Co-owner & Director — Kochin Blue Tigers</h3>
            <p className="mt-3 text-gray-400">He is the co-owner and Director of Kochin Blue Tigers, champions of KCL Season 2...</p>
          </div>
          <div>
            <img src="https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/images/sivaprasad/ecl.webp" alt="ECL" className="w-auto h-50 rounded-lg shadow-lg mb-6" />
            <h3 className="text-yellow-400 font-playfair text-2xl">Owner — Trivandrum Franchise (ECL)</h3>
            <p className="mt-3 text-gray-400">Sivaprasad is the sole owner of the Trivandrum franchise in the Entrepreneurs Cricket League...</p>
          </div>
        </div>
      </section>

      {/* Ventures */}
      <section id="ventures" className="ventures py-20">
        <div className="container mx-auto px-6">
          <h2 className="section-title reveal font-bebas text-6xl md:text-7xl">Current Ventures</h2>
          <div className="ventures-grid grid md:grid-cols-3 gap-6 mt-12">
            <div className="venture-card bg-gray-800 p-6 rounded-2xl reveal">
              <div className="venture-icon w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center mb-4">C</div>
              <h3 className="font-playfair text-2xl">Crazzy Media Ventures</h3>
              <p className="text-gray-400 mt-2">Chairman & Managing Director of media investment company...</p>
              <span className="venture-tag inline-block mt-4 px-4 py-2 rounded-full text-yellow-300 border border-yellow-600/20 text-sm">Media Tech</span>
            </div>
            <a className="venture-card bg-gray-800 p-6 rounded-2xl reveal" href="https://www.yellowcloudonline.com">
              <div className="venture-icon w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center mb-4"><img src="https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/images/sivaprasad/yellow%20cloud.webp" alt="Yellow Cloud" className="w-16" /></div>
              <h3 className="font-playfair text-2xl">Yellow Cloud Mental Health</h3>
              <p className="text-gray-400 mt-2">Virtual mental health platform serving Global Malayalees...</p>
              <span className="venture-tag inline-block mt-4 px-4 py-2 rounded-full text-yellow-300 border border-yellow-600/20 text-sm">Healthcare</span>
            </a>
            <a className="venture-card bg-gray-800 p-6 rounded-2xl reveal" href="https://end2endsolutions.in">
              <div className="venture-icons flex gap-3 mb-4">
                <img src="https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/images/sivaprasad/E2E.webp" alt="E2E" className="w-20 rounded" />
                <img src="https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/images/sivaprasad/asiasat.webp" alt="Asiasat" className="w-20 rounded" />
              </div>
              <h3 className="font-playfair text-2xl">End2End Solutions & Asiasat</h3>
              <p className="text-gray-400 mt-2">Distribution contracts with BBC Global News, TV Today Network...</p>
              <span className="venture-tag inline-block mt-4 px-4 py-2 rounded-full text-yellow-300 border border-yellow-600/20 text-sm">Distribution</span>
            </a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="stats bg-black py-20">
        <div className="container mx-auto px-6">
          <div className="stats-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mt-10">
            <div className="stat-item reveal text-center">
              <span className="stat-number block font-bebas text-5xl text-yellow-400">24+</span>
              <span className="stat-label uppercase text-sm text-gray-400">Years in Media</span>
            </div>
            <div className="stat-item reveal text-center">
              <span className="stat-number block font-bebas text-5xl text-yellow-400">8+</span>
              <span className="stat-label uppercase text-sm text-gray-400">Active Ventures</span>
            </div>
            <div className="stat-item reveal text-center">
              <span className="stat-number block font-bebas text-5xl text-yellow-400">3x</span>
              <span className="stat-label uppercase text-sm text-gray-400">National Sales Awards</span>
            </div>
            <div className="stat-item reveal text-center">
              <span className="stat-number block font-bebas text-5xl text-yellow-400">1st</span>
              <span className="stat-label uppercase text-sm text-gray-400">Individual Channel Rights</span>
            </div>
          </div>
        </div>
      </section>

      {/* Reels */}
      <section id="reels" className="reels bg-gray-900 py-20">
        <div className="container mx-auto px-6">
          <h2 className="section-title reveal font-bebas text-6xl md:text-7xl">Gallery</h2>
          <div className="mt-8 reveal">
            <div className="reels-container">
              <div className="reels-track">
                <div className="reels-track-inner">
                  {/* Additional external carousel slides (converted to JSX) */}
                  <a className="reel-card carousel-slide" href="https://www.youtube.com/watch?v=xuFS7zkd_0g">
                    <video className="reel-media" autoPlay muted loop playsInline preload="metadata" aria-label="Siva video">
                      <source src="https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/videoplayback_yugfzu.webm" type="video/webm" />
                      Your browser does not support the video tag.
                    </video>
                  </a>



                  <a className="reel-card carousel-slide" href="https://www.facebook.com/share/v/1C2z6SJk47/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)', textDecoration: 'none', background: 'linear-gradient(135deg, rgba(10,10,10,0.06), rgba(26,26,26,0.04))' }}>
                    <video className="reel-media" autoPlay muted loop playsInline preload="none" aria-label="Siva video">
                      <source src="https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/2cbb-d78b-4b2d-8061-c34797622b99_ifkkfg.webm" type="video/webm" />
                      Your browser does not support the video tag.
                    </video>
                  </a>

                  <a className="reel-card carousel-slide" href="https://youtu.be/g6Owyh2-oRI?si=MKOnIpNgP8QzxKfG" style={{ width: '360px', flex: '0 0 360px' }}>
                    <video className="reel-media" autoPlay muted loop playsInline preload="metadata" aria-label="Siva video" style={{ width: '100%', height: '100%' }}>
                      <source src="https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/videoplayback_1_online-video-cutter.com_hgcdmu.webm" type="video/webm" />
                      Your browser does not support the video tag.
                    </video>
                  </a>
                  <a className="reel-card carousel-slide" href="https://www.instagram.com/reel/DVogZB9DwtS/?igsh=OXFnNmtiMm1lZnA3" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)', textDecoration: 'none', background: 'linear-gradient(135deg, rgba(10,10,10,0.06), rgba(26,26,26,0.04))' }}>
                    <video className="reel-media" autoPlay muted loop playsInline preload="none" aria-label="Siva video">
                      <source src="https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/AQOm9-TKSETF6u9l0nAQpjHsbAhXRYiNGURHO24GziELFESRAfPmZ3VX4ZBR9f688oXf0552oU3C64zxdTEwPX8NpN7LfDa0aMU0TaPDrQ_hncnv7.webm" type="video/webm" />
                      Your browser does not support the video tag.
                    </video>
                  </a>
                  {[
                    'https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/images/sivaprasad/reel.webm',
                    'https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/images/sivaprasad/reel%20(1).webm',
                    'https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/images/sivaprasad/reel%20(2).webm',
                    'https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/images/sivaprasad/reel%20(3).webm',
                    'https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/images/sivaprasad/reel%20(4).webm',
                    'https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/images/sivaprasad/reel%20(5).webm',
                    'https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/images/sivaprasad/reel%20(6).webm',
                    'https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/images/sivaprasad/reel%20(7).webm',
                    'https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/images/sivaprasad/reel%20(8).webm',
                  ].concat([
                    'https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/images/sivaprasad/reel.webm',
                    'https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/images/sivaprasad/reel%20(1).webm',
                    'https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/images/sivaprasad/reel%20(2).webm',
                    'https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/images/sivaprasad/reel%20(3).webm',
                    'https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/images/sivaprasad/reel%20(4).webm',
                    'https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/images/sivaprasad/reel%20(5).webm',
                    'https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/images/sivaprasad/reel%20(6).webm',
                    'https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/images/sivaprasad/reel%20(7).webm',
                    'https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/images/sivaprasad/reel%20(8).webm',
                  ]).map((src, i) => (
                    <div key={i} className="reel-card relative" onClick={() => setSelectedReel(src)}>
                      <video
                        src={src}
                        className="reel-media"
                        muted
                        loop
                        playsInline
                        onMouseEnter={(e) => { try { e.currentTarget.play(); } catch { } }}
                        onMouseLeave={(e) => { try { e.currentTarget.pause(); e.currentTarget.currentTime = 0; } catch { } }}
                        onClick={(e) => { e.stopPropagation(); setSelectedReel(src); }}
                        preload="metadata"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {selectedReel && (
          <div className="reel-modal" onClick={() => setSelectedReel(null)}>
            <div className="reel-modal-content" onClick={(e) => e.stopPropagation()}>
              <video src={selectedReel} controls autoPlay style={{ maxHeight: '85vh' }} />
            </div>
          </div>
        )}
      </section>


      {/* Images Gallery */}
      <section id="gallery" className="image-showcase bg-gray-900 py-20">
        <div className="container mx-auto px-6">
          <div className="image-grid grid md:grid-cols-3 gap-4 mt-8">
            <div className="collage-grid col-span-3 grid grid-cols-6 gap-2 mt-4">
              <div className="collage-item reveal fade-up col-span-4 row-span-2">
                <img src={collageSources[(collageStart + 0) % collageSources.length]} alt="c1" className="w-full h-full object-cover rounded" />
              </div>
              <div className="collage-item reveal fade-up">
                <img src={collageSources[(collageStart + 1) % collageSources.length]} alt="c2" className="w-full h-full object-cover rounded" />
              </div>
              <div className="collage-item reveal fade-up">
                <img src={collageSources[(collageStart + 2) % collageSources.length]} alt="c3" className="w-full h-full object-cover rounded" />
              </div>
              <div className="collage-item reveal fade-up">
                <img src={collageSources[(collageStart + 3) % collageSources.length]} alt="c4" className="w-full h-full object-cover rounded" />
              </div>
              <div className="collage-item reveal fade-up">
                <img src={collageSources[(collageStart + 4) % collageSources.length]} alt="c5" className="w-full h-full object-cover rounded" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      {/* <section id="contact" className="contact bg-gray-800 py-20 text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-5xl font-playfair bg-clip-text text-transparent bg-gradient-to-br from-yellow-400 to-yellow-200">Let's Connect</h2>
          <p className="text-gray-400 mt-4">Interested in collaboration or want to discuss opportunities?</p>
          <a className="contact-btn inline-block mt-6 px-8 py-3 rounded-full border border-yellow-500 text-yellow-300 hover:bg-yellow-400 hover:text-black transition" href="mailto:siva@sivaprasad.in">Get In Touch</a>
        </div>
      </section> */}


      {/* Contact Section */}
      <section id="contact" className="contact bg-gray-800 py-20 text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-5xl font-playfair bg-clip-text text-transparent bg-gradient-to-br from-yellow-400 to-yellow-200">
            Let's Connect
          </h2>
          <p className="text-gray-400 mt-4">
            Interested in collaboration or want to discuss opportunities?
          </p>
          <button
            onClick={() => setIsOpen(true)}
            className="contact-btn inline-block mt-6 px-8 py-3 rounded-full border border-yellow-500 text-yellow-300 hover:bg-yellow-400 hover:text-black transition"
          >
            Get In Touch
          </button>
        </div>
      </section>

      {/* Popup Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-2xl p-8 max-w-md w-full border border-yellow-500/20">
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
            >
              <X size={24} />
            </button>

            {/* Form Header */}
            <h3 className="text-2xl font-playfair text-yellow-300 mb-2">
              Get In Touch
            </h3>
            <p className="text-gray-400 text-sm mb-6">
              Tell us about your project and we'll be in touch soon.
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                required
              />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                required
              />

              <textarea
                name="message"
                rows={4}
                placeholder="Tell us about your project..."
                value={form.message}
                onChange={handleChange}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-sm text-white placeholder:text-gray-500 resize-none focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />

              <button
                type="submit"
                className="w-full bg-yellow-500 text-black font-semibold py-2 rounded-lg hover:bg-yellow-400 transition"
              >
                Send via WhatsApp
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

