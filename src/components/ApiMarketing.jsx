import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler
} from 'chart.js';
import { Bar, Line, Doughnut } from 'react-chartjs-2';
import AdChart from './AdChart';
import apiLeadService from '../../services/apiLeadService';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler
);

/**
 * ApiMarketing Component
 * A high-conversion landing page for SocialBureau's API Marketing services.
 * Converted from HTML/CSS to React with Tailwind CSS.
 */
const ApiMarketing = () => {
  const [activePlatform, setActivePlatform] = useState('instagram');

  // Platforms data for the breakdown section
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    businessName: '',
    category: 'Real Estate',
    monthlySpend: 'Under ₹50K',
    challenge: ''
  });

  const [activeSubCat, setActiveSubCat] = useState('all');
  const [expandedSvc, setExpandedSvc] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmission = async (e) => {
    if (e) e.preventDefault();

    if (!formData.name || !formData.phone || !formData.businessName) {
      alert("Please fill in your name, phone, and business name.");
      return;
    }

    setSubmitting(true);
    try {
      await apiLeadService.createLead(formData);
      setSubmitted(true);

      // Still allow opening mailto if preferred, or just show success
      const subject = encodeURIComponent(`New Strategy Call Request - ${formData.businessName}`);
      const body = encodeURIComponent(
        `Name: ${formData.name}\r\n` +
        `Phone/WhatsApp: ${formData.phone}\r\n` +
        `Business: ${formData.businessName}\r\n` +
        `Category: ${formData.category}\r\n` +
        `Monthly Spend: ${formData.monthlySpend}\r\n\r\n` +
        `Biggest Challenge:\r\n${formData.challenge}`
      );
      // window.location.href = `mailto:info@socialbureau.in?subject=${subject}&body=${body}`;

      alert("Strategy call requested successfully! We'll contact you within 12 hours.");

    } catch (error) {
      console.error("Submission error:", error);
      alert("Failed to submit request. Please try again or use WhatsApp.");
    } finally {
      setSubmitting(false);
    }
  };

  const platforms = {
    instagram: {
      title: "Instagram Algorithm Engineering",
      desc: "Instagram's algorithm prioritises content based on relationships, interest signals, timeliness, and content format. Through API access, we configure your content distribution to mirror these signals precisely — ensuring reels, stories, and posts reach your exact niche buyers across India and globally.",
      metrics: [
        { num: "800M+", lbl: "Indian Monthly Users" },
        { num: "4.2%", lbl: "Avg. Engagement (API optimised)" },
        { num: "Reels", lbl: "Highest Algorithm Amplification" },
        { num: "18–34", lbl: "Core Buying Demographic" }
      ],
      rules: [
        { id: "R1", title: "Interest Graph Targeting", text: "We program your campaign to follow users who engage with content in your exact business category, not just generic demographics." },
        { id: "R2", title: "Location Precision", text: "We configure campaigns to reach users within specific cities, zones, or even a 2km radius of your business location." },
        { id: "R3", title: "Behaviour Signals", text: "We instruct the algorithm to show content to users who have recently interacted with competitor brands or shown purchase intent." },
        { id: "R4", title: "Feed Timing API", text: "Content is published at the precise time your audience is most active — not when it's convenient for you." },
        { id: "R5", title: "Exclusion Rules", text: "We exclude irrelevant audiences from your budget — eliminating waste and ensuring every impression is valuable." }
      ],
      chartData: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
          { label: 'API Optimised', data: [2.1, 2.8, 3.4, 3.9, 4.0, 4.2], borderColor: '#C8102E', backgroundColor: 'rgba(200,16,46,0.1)', tension: 0.4, fill: true, borderWidth: 2, pointRadius: 3, pointBackgroundColor: '#C8102E' },
          { label: 'Standard', data: [0.8, 0.9, 0.85, 0.9, 0.92, 0.95], borderColor: 'rgba(0,0,0,0.2)', backgroundColor: 'transparent', tension: 0.4, borderWidth: 1.5, pointRadius: 2 }
        ]
      }
    },
    facebook: {
      title: "Facebook Algorithm Engineering",
      desc: "Facebook's algorithm is the most powerful audience targeting infrastructure ever built. With API access, we utilise Custom Audiences, Lookalike Audience modelling, and conversion event optimisation to engineer your campaigns for maximum qualified reach.",
      metrics: [
        { num: "370M+", lbl: "Indian Active Users" },
        { num: "2.5×", lbl: "Higher Lead Quality vs. Boosted Posts" },
        { num: "Custom", lbl: "Audience Modelling via API" },
        { num: "₹12", lbl: "Avg. Cost Per Lead (API optimised)" }
      ],
      rules: [
        { id: "R1", title: "Lookalike Audience API", text: "We upload your existing customer data and Facebook's API builds a model of 1–2 million people who think, behave, and buy exactly like your current customers." },
        { id: "R2", title: "Conversion Event Optimisation", text: "We configure the API to optimise delivery toward users who are most likely to complete your specific conversion goal — enquiry, call, purchase." },
        { id: "R3", title: "Detailed Interest Stacking", text: "We stack multiple interest layers via API to create a hyper-specific audience that matches your exact buyer persona." },
        { id: "R4", title: "Retargeting Rules", text: "We configure sequential retargeting that shows different messages to people at different stages of their buying journey." },
        { id: "R5", title: "Budget Allocation API", text: "Dynamic budget shifting across ad sets based on real-time performance — the algorithm automatically follows the best-performing audience segment." }
      ],
      chartData: {
        labels: ['Wk1', 'Wk2', 'Wk3', 'Wk4', 'Wk5', 'Wk6'],
        datasets: [
          { label: 'API Optimised', data: [8, 14, 22, 28, 35, 42], borderColor: '#C8102E', backgroundColor: 'rgba(200,16,46,0.1)', tension: 0.4, fill: true, borderWidth: 2, pointRadius: 3, pointBackgroundColor: '#C8102E' },
          { label: 'Standard', data: [3, 4, 3, 5, 4, 5], borderColor: 'rgba(255,255,255,0.25)', backgroundColor: 'transparent', tension: 0.4, borderWidth: 1.5, pointRadius: 2 }
        ]
      }
    },
    youtube: {
      title: "YouTube Algorithm Engineering",
      desc: "YouTube is the world's second largest search engine and India's most-watched video platform. Through API configuration, we engineer your video content and ads to appear exactly when a user searches for, watches, or shows intent around topics connected to your business.",
      metrics: [
        { num: "462M+", lbl: "Indian Monthly Users" },
        { num: "40 Min", lbl: "Avg. Daily Watch Time India" },
        { num: "In-Stream", lbl: "Best Format for Niche Targeting" },
        { num: "3.2×", lbl: "Brand Recall vs. Social Ads" }
      ],
      rules: [
        { id: "R1", title: "Channel Placement Targeting", text: "We configure your ads to appear on specific YouTube channels that your exact target audience watches regularly." },
        { id: "R2", title: "Search Intent Targeting", text: "We match your ad delivery to users who are actively searching for keywords related to your product or service." },
        { id: "R3", title: "Custom Intent Audiences", text: "We build audiences based on recent Google and YouTube search behaviour — reaching users in active buying mode." },
        { id: "R4", title: "Frequency Cap API", text: "We control exactly how many times the same user sees your ad, preventing fatigue and protecting your brand perception." },
        { id: "R5", title: "View-Through Attribution", text: "API tracking connects video views to downstream enquiries so you know exactly which content drives business results." }
      ],
      chartData: {
        labels: ['M1', 'M2', 'M3', 'M4', 'M5', 'M6'],
        datasets: [
          { label: 'API Optimised', data: [0.8, 1.4, 2.1, 2.8, 3.4, 4.0], borderColor: '#C8102E', backgroundColor: 'rgba(200,16,46,0.1)', tension: 0.4, fill: true, borderWidth: 2, pointRadius: 3, pointBackgroundColor: '#C8102E' },
          { label: 'Standard', data: [0.2, 0.25, 0.28, 0.3, 0.32, 0.35], borderColor: 'rgba(255,255,255,0.25)', backgroundColor: 'transparent', tension: 0.4, borderWidth: 1.5, pointRadius: 2 }
        ]
      }
    },
    linkedin: {
      title: "LinkedIn Algorithm Engineering",
      desc: "For B2B businesses, LinkedIn is the single most powerful platform to reach decision-makers, founders, and enterprise buyers. API Marketing on LinkedIn means your content and campaigns reach the exact job title, company size, industry, and seniority level of your ideal client.",
      metrics: [
        { num: "101M+", lbl: "Indian Professionals" },
        { num: "B2B", lbl: "Highest Decision-Maker Concentration" },
        { num: "6×", lbl: "Higher B2B Conversion vs. Other Platforms" },
        { num: "CXO", lbl: "Reachable Directly via API Rules" }
      ],
      rules: [
        { id: "R1", title: "Job Title & Seniority Rules", text: "We configure campaigns to reach only specific job titles — e.g., Founder, Marketing Head, Purchase Manager — eliminating irrelevant clicks." },
        { id: "R2", title: "Company Size Targeting", text: "Reach businesses of the exact size that can afford and benefit from your offer — from 50-person SMEs to 5,000-person enterprises." },
        { id: "R3", title: "Thought Leadership Feed Injection", text: "We engineer your organic posts to be distributed by the algorithm to professionals outside your network who match your buyer profile." },
        { id: "R4", title: "Lead Gen Form API", text: "Integrated lead forms pre-fill with LinkedIn profile data, creating a one-tap enquiry flow for your business." },
        { id: "R5", title: "Account-Based Targeting", text: "We upload a list of target companies and LinkedIn's API delivers your content directly to decision-makers inside those organisations." }
      ],
      chartData: {
        labels: ['Wk1', 'Wk2', 'Wk3', 'Wk4', 'Wk5', 'Wk6'],
        datasets: [
          { label: 'API Optimised', data: [42, 55, 65, 72, 80, 88], borderColor: '#C8102E', backgroundColor: 'rgba(200,16,46,0.1)', tension: 0.4, fill: true, borderWidth: 2, pointRadius: 3, pointBackgroundColor: '#C8102E' },
          { label: 'Standard', data: [18, 22, 20, 24, 22, 25], borderColor: 'rgba(255,255,255,0.25)', backgroundColor: 'transparent', tension: 0.4, borderWidth: 1.5, pointRadius: 2 }
        ]
      }
    },
    google: {
      title: "Google Algorithm Engineering",
      desc: "Google processes 8.5 billion searches per day. API Marketing on Google means your business appears with surgical precision at the exact moment a potential customer is actively searching for what you offer — with rules that control budget, geography, device, and intent.",
      metrics: [
        { num: "95%", lbl: "Search Market Share India" },
        { num: "High", lbl: "Purchase Intent vs. Social Platforms" },
        { num: "₹8", lbl: "Avg. Cost Per Click (API managed)" },
        { num: "Smart", lbl: "Bidding API for Auto-Optimisation" }
      ],
      rules: [
        { id: "R1", title: "Search Query Intent Rules", text: "We configure exact, phrase, and broad match parameters to ensure your ads appear only on highly relevant searches with buying intent." },
        { id: "R2", title: "Geo-Targeting API", text: "We restrict ad delivery to specific cities, districts, or radius around your location — with bid modifiers based on geographic performance data." },
        { id: "R3", title: "Negative Keyword Architecture", text: "We build extensive exclusion rules preventing your budget from being spent on irrelevant queries — saving up to 40% of ad spend." },
        { id: "R4", title: "Smart Bidding Configuration", text: "We programme Google's AI bidding system with your specific conversion goal — maximising enquiries within your target cost." },
        { id: "R5", title: "Performance Max Orchestration", text: "We configure cross-network delivery across Search, Display, YouTube, Gmail, and Maps through a single API-controlled campaign." }
      ],
      chartData: {
        labels: ['M1', 'M2', 'M3', 'M4', 'M5', 'M6'],
        datasets: [
          { label: 'API Optimised', data: [18, 15, 13, 11, 9.5, 8], borderColor: '#C8102E', backgroundColor: 'rgba(200,16,46,0.1)', tension: 0.4, fill: true, borderWidth: 2, pointRadius: 3, pointBackgroundColor: '#C8102E' },
          { label: 'Standard', data: [28, 27, 27, 26, 26, 26], borderColor: 'rgba(0,0,0,0.2)', backgroundColor: 'transparent', tension: 0.4, borderWidth: 1.5, pointRadius: 2 }
        ]
      }
    }
  };

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="font-['Syne'] bg-white text-[#080808] overflow-x-hidden selection:bg-[#C8102E] selection:text-white">
      {/* Custom Global Styles Injection */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=Syne:wght@300;400;500&display=swap');
        
        :root {
          --brand-red: #C8102E;
          --brand-red-bright: #FF2244;
          --brand-black: #080808;
          --bebas: 'Bebas Neue', sans-serif;
          --cormorant: 'Cormorant Garamond', serif;
          --syne: 'Syne', sans-serif;
        }

        .font-bebas { font-family: var(--bebas); }
        .font-cormorant { font-family: var(--cormorant); }
        .font-syne { font-family: var(--syne); }

        .text-stroke {
          -webkit-text-stroke: 1.5px rgba(255,255,255,0.25);
          color: transparent;
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.2; }
        }
        .animate-blink { animation: blink 1.4s infinite; }

        @keyframes ticker-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-ticker { animation: ticker-scroll 30s linear infinite; }
      `}} />


      {/* HERO SECTION */}
      <section className="relative min-h-screen bg-[#080808] flex flex-col justify-end px-4 sm:px-14 pb-12 md:pb-20 pt-32 overflow-hidden" id="home">
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.06] overflow-hidden">
          <svg width="100%" height="100%" viewBox="0 0 1400 900" preserveAspectRatio="xMidYMid slice" className="min-w-[1400px]">
            <defs>
              <pattern id="hg" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M60 0L0 0L0 60" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="1400" height="900" fill="url(#hg)" />
          </svg>
        </div>

        {/* Glowing Radial Gradient */}
        <div className="absolute -right-[150px] top-[20%] w-[100vw] h-[100vw] max-w-[700px] max-h-[700px] bg-[radial-gradient(circle,rgba(200,16,46,0.22)_0%,transparent_65%)] pointer-events-none" />

        <div className="max-w-6xl mx-auto w-full relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4 mb-6"
          >
            <div className="w-12 h-[1px] bg-[#C8102E]" />
            <div className="text-[#C8102E] text-[0.65rem] md:text-[0.75rem] font-syne tracking-[4px] uppercase font-bold animate-pulse">
              India's First Algorithm Performance Agency
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-bebas text-[clamp(2rem,8vw,9rem)] leading-[0.9] tracking-tight text-white mb-6 sm:mb-8 text-center lg:text-left"
          >
            ALGORITHM<br />
            <span className="text-[#C8102E]">POWERED</span><br />
            <span className="text-stroke whitespace-nowrap">MARKETING</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="font-cormorant italic text-base sm:text-lg md:text-xl lg:text-2xl text-white/40 mb-10 sm:mb-12 max-w-2xl leading-relaxed mx-auto lg:mx-0 text-center lg:text-left px-2 sm:px-4 lg:px-0"
          >
            Most Indian businesses advertise. Very few <em className="text-white/60">engineer</em> their audience. API Marketing is the infrastructure that makes the difference.
          </motion.p>

          <div className="flex flex-col sm:flex-row gap-4 mb-20 justify-center lg:justify-start px-4">
            <button
              onClick={() => scrollTo('what')}
              className="bg-[#C8102E] text-white px-8 md:px-10 py-4 text-[0.7rem] md:text-[0.75rem] tracking-[2px] uppercase transition-all hover:bg-[#FF2244] hover:-translate-y-0.5"
            >
              Understand the System
            </button>
            <button
              onClick={() => scrollTo('contact')}
              className="border border-white/20 text-white px-8 md:px-10 py-4 text-[0.7rem] md:text-[0.75rem] tracking-[2px] uppercase hover:border-[#C8102E] hover:text-[#C8102E] transition-all"
            >
              Talk to Our Team
            </button>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-0 border-t border-white/10 pt-6 sm:pt-10">
            {[
              { val: "93", unit: "%", lbl: "Ads lost audience" },
              { val: "₹2.3", unit: "L Cr", lbl: "Spend wasted" },
              { val: "6", unit: "×", lbl: "ROI Advantage" },
              { val: "0", unit: "%", lbl: "API Adoption" }
            ].map((stat, i) => (
              <div key={i} className={`pb-2 sm:pb-0 ${i !== 3 ? 'lg:border-r lg:border-white/10' : ''} text-center lg:text-left ${i % 2 !== 0 ? 'pl-2 sm:pl-4 lg:pl-10' : 'pr-2 sm:pr-4 lg:pr-10'}`}>
                <div className="font-bebas text-xl sm:text-2xl md:text-4xl lg:text-5xl text-white tracking-widest leading-none">
                  {stat.val}<b className="text-[#C8102E] font-normal">{stat.unit}</b>
                </div>
                <div className="text-[0.50rem] sm:text-[0.60rem] md:text-[0.68rem] tracking-[0.5px] sm:tracking-[1px] md:tracking-[2px] uppercase text-white/30 mt-1 sm:mt-2 leading-tight">
                  {stat.lbl}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DATA INSIGHTS SECTION */}
      <section className="bg-[#f7f7f5] py-12 sm:py-20 md:py-28 px-4 sm:px-8 lg:px-14" id="insights">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-0">
          <div className="text-[#C8102E] text-[0.60rem] sm:text-[0.68rem] tracking-[2px] sm:tracking-[3px] uppercase mb-3 sm:mb-5 text-center lg:text-left">Data Insights</div>
          <h2 className="font-bebas text-[clamp(1.8rem,6vw,3.8rem)] leading-none tracking-tight mb-4 sm:mb-6 text-center lg:text-left">
            The Numbers That Prove<br />Why This Matters
          </h2>
          <p className="text-[#555550] text-xs sm:text-sm md:text-base lg:text-lg max-w-2xl mb-8 sm:mb-12 md:mb-16 text-center lg:text-left leading-relaxed">
            Hard data from the Indian digital marketing landscape — showing exactly where the opportunity is and what API Marketing delivers.
          </p>

          <div className="grid lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mb-6 sm:mb-8">
            {/* Chart 1: ROI Comparison */}
            <div className="bg-white p-4 sm:p-6 md:p-8 border border-[#ebebea] shadow-sm">
              <h3 className="font-bebas text-base sm:text-lg md:text-xl lg:text-2xl tracking-wider mb-1 sm:mb-2">API Marketing vs Conventional Ads</h3>
              <p className="text-[#b0b0ab] text-[0.60rem] sm:text-[0.70rem] uppercase tracking-widest mb-4 sm:mb-6">Average ROAS Comparison (6 Months)</p>
              <div className="h-[200px] sm:h-[250px] w-full">
                <Bar
                  data={{
                    labels: ['Conventional', 'Boosted Posts', 'Basic Targeting', 'SocialBureau API'],
                    datasets: [{
                      label: 'ROAS (×)',
                      data: [1.4, 1.8, 2.6, 6.8],
                      backgroundColor: ['rgba(170,170,170,0.2)', 'rgba(170,170,170,0.2)', 'rgba(170,170,170,0.2)', '#C8102E'],
                      borderWidth: 0
                    }]
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false } },
                    scales: { y: { beginAtZero: true, grid: { color: 'rgba(0,0,0,0.05)' } }, x: { grid: { display: false } } }
                  }}
                />
              </div>
            </div>

            {/* Chart 2: Platform Reach */}
            <div className="bg-[#080808] p-4 sm:p-6 md:p-8 border border-white/5 shadow-sm">
              <h3 className="font-bebas text-base sm:text-lg md:text-xl lg:text-2xl tracking-wider text-white mb-1 sm:mb-2">Monthly Active Users in India</h3>
              <p className="text-white/20 text-[0.60rem] sm:text-[0.70rem] uppercase tracking-widest mb-4 sm:mb-6">Reach Across Key Platforms (Millions)</p>
              <div className="h-[200px] sm:h-[250px] w-full">
                <Bar
                  data={{
                    labels: ['Instagram', 'Facebook', 'YouTube', 'LinkedIn', 'Google'],
                    datasets: [{
                      label: 'Users (M)',
                      data: [800, 370, 462, 101, 900],
                      backgroundColor: ['#C8102E', 'rgba(200,16,46,0.6)', 'rgba(200,16,46,0.45)', 'rgba(200,16,46,0.3)', 'rgba(200,16,46,0.18)'],
                      borderWidth: 0
                    }]
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false } },
                    scales: {
                      y: { beginAtZero: true, grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: 'rgba(255,255,255,0.4)' } },
                      x: { grid: { display: false }, ticks: { color: 'rgba(255,255,255,0.4)' } }
                    }
                  }}
                />
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {/* Chart 3: Budget Utilisation */}
            <div className="bg-white p-4 sm:p-6 md:p-8 border border-[#ebebea] shadow-sm">
              <h3 className="font-bebas text-base sm:text-lg md:text-xl lg:text-2xl tracking-wider mb-1 sm:mb-2">Ad Budget Utilisation</h3>
              <p className="text-[#b0b0ab] text-[0.60rem] sm:text-[0.70rem] uppercase tracking-widest mb-4 sm:mb-6">Spend vs Conversion Reality</p>
              <div className="h-[160px] sm:h-[180px] w-full">
                <Doughnut
                  data={{
                    labels: ['Wasted', 'Correct Audience', 'Converted'],
                    datasets: [{
                      data: [63, 29, 8],
                      backgroundColor: ['rgba(170,170,170,0.1)', 'rgba(200,16,46,0.3)', '#C8102E'],
                      borderWidth: 0
                    }]
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    cutout: '70%',
                    plugins: { legend: { position: 'bottom', labels: { boxWidth: 10, font: { size: 10 } } } }
                  }}
                />
              </div>
            </div>

            {/* Chart 4: Lead Quality */}
            <div className="bg-[#080808] p-4 sm:p-6 md:p-8 border border-white/5 shadow-sm">
              <h3 className="font-bebas text-base sm:text-lg md:text-xl lg:text-2xl tracking-wider text-white mb-1 sm:mb-2">Lead Quality Over Time</h3>
              <p className="text-white/20 text-[0.60rem] sm:text-[0.70rem] uppercase tracking-widest mb-4 sm:mb-6">API Evolution (8 Weeks)</p>
              <div className="h-[160px] sm:h-[180px] w-full">
                <Line
                  data={{
                    labels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8'],
                    datasets: [
                      { label: 'API Campaign', data: [32, 45, 58, 67, 74, 81, 87, 92], borderColor: '#C8102E', tension: 0.4, fill: true, backgroundColor: 'rgba(200,16,46,0.1)', borderWidth: 2, pointRadius: 0 },
                      { label: 'Conventional', data: [28, 30, 29, 31, 32, 30, 33, 31], borderColor: 'rgba(255,255,255,0.2)', tension: 0.4, borderWidth: 1.5, pointRadius: 0 }
                    ]
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { position: 'bottom', labels: { color: 'rgba(255,255,255,0.4)', boxWidth: 10, font: { size: 10 } } } },
                    scales: {
                      y: { beginAtZero: true, grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: 'rgba(255,255,255,0.2)', font: { size: 9 } } },
                      x: { grid: { display: false }, ticks: { color: 'rgba(255,255,255,0.2)', font: { size: 9 } } }
                    }
                  }}
                />
              </div>
            </div>

            {/* Chart 5: Cost Per Lead */}
            <div className="bg-white p-4 sm:p-6 md:p-8 border border-[#ebebea] shadow-sm">
              <h3 className="font-bebas text-base sm:text-lg md:text-xl lg:text-2xl tracking-wider mb-1 sm:mb-2">Cost Per Lead (INR)</h3>
              <p className="text-[#b0b0ab] text-[0.60rem] sm:text-[0.70rem] uppercase tracking-widest mb-4 sm:mb-6">Before vs After API</p>
              <div className="h-[160px] sm:h-[180px] w-full">
                <Bar
                  data={{
                    labels: ['Real Estate', 'Ed-Tech', 'Health', 'Fashion', 'B2B'],
                    datasets: [
                      { label: 'Before', data: [820, 280, 450, 190, 680], backgroundColor: 'rgba(170,170,170,0.25)' },
                      { label: 'After API', data: [185, 31, 89, 38, 112], backgroundColor: '#C8102E' }
                    ]
                  }}
                  options={{
                  }}
                />
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mt-6 sm:mt-8">
            {/* Chart 6: Community Growth */}
            <div className="bg-[#080808] p-4 sm:p-6 md:p-8 border border-white/5 shadow-sm">
              <h3 className="font-bebas text-base sm:text-lg md:text-xl lg:text-2xl tracking-wider text-white mb-1 sm:mb-2">Audience Community Growth</h3>
              <p className="text-white/20 text-[0.60rem] sm:text-[0.70rem] uppercase tracking-widest mb-4 sm:mb-6">Organic Followers (90 Days)</p>
              <div className="h-[200px] sm:h-[250px] w-full">
                <Line
                  data={{
                    labels: ['D1', 'D15', 'D30', 'D45', 'D60', 'D75', 'D90'],
                    datasets: [
                      { label: 'API Strategy', data: [4200, 6800, 10500, 15200, 21800, 28400, 34000], borderColor: '#C8102E', backgroundColor: 'rgba(200,16,46,0.1)', tension: 0.4, fill: true, borderWidth: 2.5, pointRadius: 4, pointBackgroundColor: '#C8102E' },
                      { label: 'Non-API', data: [4200, 4500, 4800, 5100, 5300, 5600, 5900], borderColor: 'rgba(255,255,255,0.2)', tension: 0.4, borderWidth: 1.5, pointRadius: 0 }
                    ]
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { position: 'bottom', labels: { color: 'rgba(255,255,255,0.4)', boxWidth: 10, font: { size: 10 } } } },
                    scales: {
                      y: { beginAtZero: false, grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: 'rgba(255,255,255,0.2)', callback: v => (v / 1000).toFixed(0) + 'K' } },
                      x: { grid: { display: false }, ticks: { color: 'rgba(255,255,255,0.2)' } }
                    }
                  }}
                />
              </div>
            </div>

            {/* Chart 7: Funnel Chart */}
            <div className="bg-white p-4 sm:p-6 md:p-8 border border-[#ebebea] shadow-sm">
              <h3 className="font-bebas text-base sm:text-lg md:text-xl lg:text-2xl tracking-wider mb-1 sm:mb-2">Enquiry Conversion Funnel</h3>
              <p className="text-[#b0b0ab] text-[0.60rem] sm:text-[0.70rem] uppercase tracking-widest mb-4 sm:mb-6">10,000 Impressions Outcome</p>
              <div className="h-[200px] sm:h-[250px] w-full">
                <Bar
                  data={{
                    labels: ['10k Impr.', 'Correct Aud.', 'Engaged', 'Clicked', 'Enquiry'],
                    datasets: [
                      { label: 'SocialBureau API', data: [10000, 8700, 3200, 980, 215], backgroundColor: '#C8102E' },
                      { label: 'Conventional', data: [10000, 2800, 480, 112, 18], backgroundColor: 'rgba(170,170,170,0.25)' }
                    ]
                  }}
                  options={{
                    indexAxis: 'y',
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { position: 'bottom', labels: { boxWidth: 10, font: { size: 10 } } } },
                    scales: {
                      x: { beginAtZero: true, grid: { color: 'rgba(0,0,0,0.05)' }, ticks: { callback: v => v >= 1000 ? (v / 1000).toFixed(0) + 'K' : v } },
                      y: { grid: { display: false } }
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SUB-SERVICES & DEFINITIONS */}
      <section className="bg-[#080808] py-12 sm:py-16 md:py-20 px-4 sm:px-8 lg:px-14 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-[#C8102E] text-[0.55rem] sm:text-[0.62rem] tracking-[2px] sm:tracking-[3px] uppercase flex items-center gap-2 sm:gap-2.5 mb-3 sm:mb-4 before:content-[''] before:w-4 sm:before:w-6 before:h-[1px] before:bg-[#C8102E]">
            SocialBureau API Marketing
          </div>
          <h2 className="text-white font-bebas text-[clamp(1.8rem,5vw,3.5rem)] leading-none tracking-[0.5px] sm:tracking-[1px] mb-2 sm:mb-3">
            Sub-Services & <span className="text-[#C8102E]">Definitions</span>
          </h2>
          <p className="text-white/70 text-[0.75rem] sm:text-[0.88rem] max-w-[700px] leading-[1.75] sm:leading-[1.85] mb-8 sm:mb-12">
            Every service SocialBureau delivers under the API Marketing umbrella — explained point by point. Click any service card to read its full definition, what it does, and what outcome it drives for your business.
          </p>

          {/* Category Navigation */}
          <div className="flex flex-wrap gap-2 sm:gap-3 mb-8 sm:mb-12">
            {[
              { id: 'all', l: 'All Services' },
              { id: 'algorithm', l: 'Algorithm Prompting' },
              { id: 'audience', l: 'Audience Engineering' },
              { id: 'campaign', l: 'Campaign Management' },
              { id: 'content', l: 'Content & Feed' },
              { id: 'data', l: 'Data & Analytics' },
              { id: 'community', l: 'Community Growth' }
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveSubCat(cat.id)}
                className={`px-3 sm:px-5 py-1.5 sm:py-2 text-[0.55rem] sm:text-[0.68rem] tracking-[1.5px] sm:tracking-[2px] uppercase transition-all border text-nowrap ${activeSubCat === cat.id
                  ? 'bg-[#C8102E] border-[#C8102E] text-white'
                  : 'bg-white/10 border-white/20 text-white/70 hover:border-[#C8102E] hover:text-white font-bold'
                  }`}
              >
                {cat.l}
              </button>
            ))}
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.05]">
            {[
              {
                id: "01", cat: "algorithm", catLabel: "Algorithm Prompting", title: "Social Media Algorithm Prompting",
                short: "Directly instructing platform algorithms using API-level signals to control who sees your content, when, and how often.",
                full: "Social Media Algorithm Prompting is the practice of communicating precise instructions to platform algorithms — Instagram, Facebook, YouTube, LinkedIn, Google — through their official API layer. Instead of hoping the algorithm distributes your content to the right people, we program it with structured data signals that tell it exactly who your buyer is, where they are, and what triggers their engagement. This is the core differentiator of SocialBureau's approach.",
                points: ["API signal configuration", "Interest graph mapping", "Engagement triggers", "Time-of-delivery sync", "Cross-platform consistency", "Continuous refinement"],
                outcome: "Your content reaches the right niche audience every time it is published — not just your existing followers — generating organic discovery."
              },
              {
                id: "02", cat: "campaign", catLabel: "Campaign Management", title: "Campaign Algorithm Configuration",
                short: "Engineering the precise rules, restrictions, and parameters for every paid campaign through direct API access.",
                full: "Campaign Algorithm Configuration means we do not simply create an ad and press boost. We architect the entire campaign structure at API level — defining who sees the ad, who is excluded, under what conditions the ad is served, and what conversion event the algorithm should optimise toward.",
                points: ["Custom parameter configuration", "Exclusion rule architecture", "Conversion event setup", "Budget allocation logic", "Device & placement config", "A/B testing framework"],
                outcome: "Campaigns that generate qualified enquiries at 3–8× lower cost per lead compared to conventional boosted posts."
              },
              {
                id: "03", cat: "audience", catLabel: "Audience Engineering", title: "Niche Audience Architecture",
                short: "Building a precise multi-layer audience model based on your exact buyer profile — interest, behaviour, and intent.",
                full: "Niche Audience Architecture is the process of constructing a detailed, multi-dimensional model of your ideal customer and translating it into API-readable audience parameters. We go beyond basic demographics to map behavioural patterns and platform activity.",
                points: ["Buyer persona translation", "Interest stacking (10–30 signals)", "Behavioural audience mapping", "Geographic segmentation", "Life-stage intent layers", "Lookalike modelling"],
                outcome: "Your marketing budget reaches only the people who are statistically most likely to buy from you — eliminating waste."
              },
              {
                id: "04", cat: "content", catLabel: "Content & Feed", title: "Social Feed Engineering",
                short: "Configuring how, when, and to whom organic content is distributed by the platform's feed algorithm.",
                full: "Social Feed Engineering is the discipline of programming the platform's organic distribution engine. We override defaults with structured feed signals — hashtags, engagement velocity, and format signals — that instruct the algorithm to push content efficiently.",
                points: ["Hashtag taxonomy architecture", "Publishing time optimisation", "Content format selection", "Engagement velocity seeding", "Caption signal structure", "Cross-platform adaptation"],
                outcome: "Organic content reaches new niche audiences outside your follower base with every publish — growing brand discovery."
              },
              {
                id: "05", cat: "audience", catLabel: "Audience Engineering", title: "Geo-Targeted Audience Mapping",
                short: "Identifying exactly where your buyers are located across India — city, district, PIN code, or radius.",
                full: "Geo-Targeted Audience Mapping uses location intelligence data from platform APIs to identify where your niche buyers are geographically concentrated and restricts campaign delivery precisely to those zones for maximum leverage.",
                points: ["PIN code level targeting", "Radius targeting (500m – 50km)", "Geographic bid modifiers", "Location exclusion rules", "Multi-region architecture", "Tier-specific strategies"],
                outcome: "Your ad budget is concentrated only in locations where your real buyers are — dramatically reducing wasted spend."
              },
              {
                id: "06", cat: "campaign", catLabel: "Retargeting & Funnel Sequencing",
                short: "Programmatically re-engaging people who have already shown interest with stage-specific messaging.",
                full: "Retargeting & Funnel Sequencing uses API-level pixel and event tracking to identify previous interactions and delivers a sequenced series of messages designed to move users toward a purchase decision.",
                points: ["Pixel & Tag setup", "Watch time segmentation", "Engagement-based pools", "Sequential ad delivery", "Cart abandonment flows", "Frequency cap config"],
                outcome: "Converts warm audiences into buyers — typically delivering 2–4× higher conversion rate compared to cold campaigns."
              },
              {
                id: "07", cat: "data", catLabel: "Data & Analytics", title: "API Performance Analytics",
                short: "Real-time tracking, attribution, and reporting of every campaign parameter for full visibility.",
                full: "API Performance Analytics is the live intelligence layer tracking the complete conversion journey from first impression to business enquiry using API-connected tracking across every platform.",
                points: ["Cross-platform dashboards", "Conversion attribution", "Cost per enquiry tracking", "Audience quality scoring", "Weekly impact reports", "Anomaly alerts"],
                outcome: "Complete transparency over every rupee spent — ensuring you know exactly what is working and where to invest."
              },
              {
                id: "08", cat: "community", catLabel: "Community Growth", title: "Niche Audience Community Building",
                short: "Systematically growing a loyal, engaged follower community of people who genuinely match your buyer profile.",
                full: "Niche Audience Community Building creates a permanently growing owned audience. Using API-engineered distribution, we attract real followers in your niche who are potential buyers or referral sources.",
                points: ["Niche follower acquisition", "Authority-building strategy", "Community engagement loops", "Audience health monitoring", "Referral trigger design", "Brand voice consistency"],
                outcome: "A growing, engaged niche community that generates organic enquiries and long-term brand referrals."
              },
              {
                id: "09", cat: "algorithm", catLabel: "Algorithm Prompting", title: "Lookalike Audience Modelling",
                short: "Using your existing best customers as a data seed to build a mirror audience of millions of followers.",
                full: "Lookalike Audience Modelling analyses hundreds of behavioural signals to identify millions of people across India who closely resemble your existing customers for statistically validated targeting.",
                points: ["Secure data hashing", "Precision-level modelling", "Purchase-event lookalikes", "Engagement-based mirrors", "Cross-platform strategy", "Automatic data refreshing"],
                outcome: "Typically delivers 40–70% lower cost per acquisition compared to broad targeting campaigns."
              },
              {
                id: "10", cat: "content", catLabel: "Content & Feed", title: "Content Performance Optimisation",
                short: "Analysing and refining every piece of content using real platform API data to understand exactly what drives reach.",
                full: "Content Performance Optimisation uses API-level content analytics data to understand why some content reaches thousands while other content reaches hundreds. We track reach velocity and engagement depth to build a performance map.",
                points: ["Deep content analytics", "Reach velocity analysis", "Engagement depth scoring", "Hook performance analysis", "Format comparison", "Retention data"],
                outcome: "Your content strategy becomes data-driven and continuously improving — each month producing higher reach than the last."
              },
              {
                id: "11", cat: "campaign", catLabel: "Campaign Management", title: "Smart Budget Allocation",
                short: "Programmatically managing how your ad budget is distributed across audiences, platforms, and creatives.",
                full: "Smart Budget Allocation uses API-level campaign budget optimisation rules to ensure your money is always flowing toward high-performing segments. Automated logic shifts spend every few hours based on live signals.",
                points: ["CBO configuration", "Automated shifting rules", "Dayparting & timing", "Auto-scaling thresholds", "Pause rules for fatigue", "Cross-platform balancing"],
                outcome: "Your budget works at maximum efficiency every day — automatically concentrating spend on what converts."
              },
              {
                id: "12", cat: "data", catLabel: "Data & Analytics", title: "Conversion Tracking Setup",
                short: "Installing and configuring the complete tracking infrastructure that connects marketing touchpoints to enquiries.",
                full: "Conversion Tracking & Attribution Setup is the technical foundation. We install the complete tracking stack — Pixel, Google Tag, Conversions API — so every rupee spent is connected to a measurable output.",
                points: ["Meta Pixel & CAPI", "GA4 conversion events", "GTM implementation", "WhatsApp conversion tracking", "UTM parameter architecture", "Custom event flows"],
                outcome: "Complete visibility over where every enquiry comes from — allowing confident budget decisions and clear ROI measurement."
              },
              {
                id: "13", cat: "algorithm", catLabel: "Algorithm Prompting", title: "Platform-Specific Strategy",
                short: "A unique, tailored algorithm engagement strategy for each platform based on how they actually work.",
                full: "Every social media platform runs a fundamentally different algorithm. We build bespoke strategies for each — with different signals, content formats, and optimisation goals specifically for each platform's reward system.",
                points: ["Instagram Relationship signals", "FB Conversion lookalikes", "YouTube Intent targeting", "LinkedIn Relevance rules", "Google Query matching", "Platform-native formats"],
                outcome: "Maximum performance from every platform because the strategy is designed for that specific algorithm."
              },
              {
                id: "14", cat: "community", catLabel: "Community Growth", title: "Brand Authority Building",
                short: "Establishing your brand as the dominant, trusted voice in your niche through consistent, amplified content.",
                full: "Brand Positioning & Authority Building makes your brand the obvious first choice. Through high-quality content distributed with API precision, we build a category authority signal that builds trust and organic discovery.",
                points: ["Authority pillar strategy", "Thought leadership calendar", "Organic SEO signal building", "Social proof amplification", "Industry conversation lead", "Competitor gap analysis"],
                outcome: "Your brand becomes the automatic first reference point — generating organic enquiries that cost nothing to acquire."
              },
              {
                id: "15", cat: "data", catLabel: "Data & Analytics", title: "Audience Market Intelligence",
                short: "Extracting deep intelligence about your audience's behaviour and preferences from platform API data.",
                full: "Audience Insight & Market Intelligence uses API extraction to reveal who your audience actually is and how they behave. This intelligence informs product development, pricing, and business positioning.",
                points: ["Demographic deep-dive", "Psychographic profiling", "Content preference analysis", "Competitor overlap data", "Geographic demand mapping", "Seasonal trend analysis"],
                outcome: "Deep, data-validated understanding of your customer — enabling smarter business decisions grounded in real behaviour."
              },
              {
                id: "16", cat: "campaign", catLabel: "Campaign Management", title: "Lead Funnel Design",
                short: "Designing and building the complete technical pathway from first ad impression to qualified enquiry.",
                full: "Lead Generation & Enquiry Funnel Design is the architecture of the complete conversion pathway — from interest to contact. We remove all friction from the pathway to contact using frictionless enquiry funnels.",
                points: ["Native lead form design", "WhatsApp API integration", "Landing page optimisation", "Click-to-action config", "A/B lead form testing", "CRM automated delivery"],
                outcome: "A higher percentage of interested people actually complete an enquiry — increasing qualified business opportunities."
              },
              {
                id: "17", cat: "audience", catLabel: "Audience Engineering", title: "Intent-Based Targeting",
                short: "Targeting people who are actively in a buying mindset using real-time search and purchase signals.",
                full: "Intent-Based Audience Targeting reaches people not just based on who they are, but what they are actively trying to do. We target search intent and in-market signals to catch buyers in their decision window.",
                points: ["Google Custom Intent", "Meta in-market signals", "YouTube search targeting", "Keyword intent mapping", "Competitor brand intent", "Life event triggers"],
                outcome: "Your ads reach people at the highest-intent moment — when they are actively looking for what you offer."
              },
              {
                id: "18", cat: "content", catLabel: "Content & Feed", title: "Multi-Platform Distribution",
                short: "Orchestrating how, where, and in what format your content is published across all platforms for max reach.",
                full: "Multi-Platform Content Distribution Strategy orchestrates your presence simultaneously across all channels. Each piece is adapted for platform-native requirements, creating a surround-sound presence for your brand.",
                points: ["Native format strategy", "Cross-platform calendars", "Brief-to-adaptation logs", "Specific caption optimisation", "Coordinated publishing", "Content repurposing plans"],
                outcome: "Your brand is visible wherever your audience spends time — building familiarity and purchase intent without extra load."
              }
            ]
              .filter(svc => activeSubCat === 'all' || svc.cat === activeSubCat)
              .map((svc, i) => (
                <div
                  key={svc.id}
                  onClick={() => setExpandedSvc(expandedSvc === svc.id ? null : svc.id)}
                  className={`bg-[#080808] p-8 border-t-2 transition-all cursor-pointer group flex flex-col ${expandedSvc === svc.id ? 'border-[#C8102E] bg-[#C8102E]/10' : 'border-white/10 hover:border-[#C8102E] hover:bg-white/[0.03]'
                    }`}
                >
                  <div className="text-[#C8102E] text-[0.58rem] tracking-[2.5px] uppercase mb-3 font-bold">{svc.catLabel}</div>
                  <div className="font-bebas text-5xl leading-none mb-2 transition-all duration-300 group-hover:scale-110 text-[#C8102E] italic">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <h4 className="text-white text-xl tracking-[1px] mb-3 leading-tight font-bold">{svc.title || svc.catLabel}</h4>
                  <p className="text-white/70 text-[0.78rem] leading-relaxed mb-6 font-medium">{svc.short}</p>

                  <div className="mt-auto pt-4 border-t border-white/10 flex items-center gap-2 text-[0.62rem] tracking-[2px] uppercase text-[#C8102E] font-bold group-hover:text-white transition-colors">
                    <div className={`w-4 h-4 border border-[#C8102E] flex items-center justify-center text-[10px] transition-all ${expandedSvc === svc.id ? 'bg-[#C8102E] text-white' : 'text-[#C8102E]'}`}>
                      {expandedSvc === svc.id ? '−' : '+'}
                    </div>
                    {expandedSvc === svc.id ? 'Close Definition' : 'Read Full Definition'}
                  </div>

                  <AnimatePresence>
                    {expandedSvc === svc.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden mt-6 pt-6 border-t border-white/10"
                      >
                        <p className="text-white/80 text-[0.8rem] leading-relaxed mb-6">
                          {svc.full}
                        </p>
                        <ul className="space-y-2 mb-6">
                          {svc.points.map((p, i) => (
                            <li key={i} className="text-white/60 text-[0.75rem] flex items-start gap-2">
                              <span className="text-[#C8102E] font-bold">→</span> {p}
                            </li>
                          ))}
                        </ul>
                        <div className="bg-[#C8102E]/10 border-l-2 border-[#C8102E] p-4">
                          <div className="text-[#C8102E] text-[0.58rem] tracking-[2px] uppercase mb-1 font-black">Business Outcome</div>
                          <p className="text-white/90 text-[0.76rem] leading-relaxed font-semibold">{svc.outcome}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
          </div>

          {/* Summary Bar */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.05] mt-12">
            {[
              { n: '18', l: 'Total Sub-Services' },
              { n: '06', l: 'Service Categories' },
              { n: '05', l: 'Platforms Covered' },
              { n: '01', l: 'Goal — Your Business Growth' }
            ].map((item, i) => (
              <div key={i} className="bg-[#0f0f0d] p-6 text-center">
                <div className="font-bebas text-4xl text-[#C8102E] tracking-wider">{item.n}</div>
                <div className="text-white/[0.22] text-[0.62rem] tracking-[2px] uppercase mt-1">{item.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <AdChart />

      {/* WHAT IS IT SECTION */}
      <section className="py-12 sm:py-20 md:py-28 px-4 sm:px-8 lg:px-14 overflow-hidden" id="what">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center lg:justify-start gap-2 sm:gap-3 text-[#C8102E] text-[0.55rem] sm:text-[0.68rem] tracking-[2px] sm:tracking-[3px] uppercase mb-4 sm:mb-5">
            <div className="w-5 sm:w-7 h-[1px] bg-[#C8102E]" /> Education First
          </div>
          <h2 className="font-bebas text-[clamp(1.8rem,6vw,4rem)] leading-none tracking-tight mb-8 sm:mb-12 md:mb-16 text-center lg:text-left">
            What Exactly Is<br />API Marketing?
          </h2>

          <div className="grid lg:grid-cols-2 gap-12 md:gap-20">
            <div className="space-y-6">
              <p className="font-cormorant text-lg md:text-xl text-[#555550] leading-relaxed text-center lg:text-left">
                Most businesses think marketing means <strong className="text-[#080808] font-semibold">posting content and running ads</strong>. That's only the surface. Beneath every social media platform — Instagram, Facebook, YouTube, LinkedIn — there is a complex <strong className="text-[#080808] font-semibold">algorithm engine</strong> that decides who sees what, when, and why.
              </p>
              <p className="font-cormorant text-lg md:text-xl text-[#555550] leading-relaxed text-center lg:text-left">
                <strong className="text-[#080808] font-semibold">API Marketing</strong> means we communicate directly with that engine. We speak its language. We set precise rules, triggers, and parameters so your content and campaigns reach exactly the people who are most likely to buy from you — not just a random audience.
              </p>
              <div className="bg-[#080808] p-8 md:p-10 border-l-4 border-[#C8102E] mt-8 text-center lg:text-left">
                <p className="font-cormorant italic text-base md:text-lg text-white/65 leading-relaxed">
                  "SocialBureau uses <span className="text-[#FF2244] font-semibold not-italic">API-level access</span> to social media platforms to engineer the algorithm — not just follow it."
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              {[
                { id: "API", title: "Application Programming Interface", sub: "The technical bridge between our system and platforms like Meta, Google, and LinkedIn." },
                { id: "ALG", title: "Algorithm Prompting", sub: "We configure the platform's algorithm with your exact audience signals — niche, location, behaviour, intent." },
                { id: "AUD", title: "Audience Engineering", sub: "We build a custom audience architecture around your business niche — defining who they are." },
                { id: "ROI", title: "Enquiry-First Growth", sub: "The entire system is built to generate real business enquiries from real buyers." },
                { id: "COM", title: "Community Expansion", sub: "Beyond campaigns — API marketing builds wider, loyal audience communities over time." }
              ].map((concept, i) => (
                <div key={i} className="flex flex-row items-center gap-4 p-4 md:p-6 border border-[#ebebea] hover:border-[#C8102E] hover:bg-[#f7f7f5] transition-all group cursor-default">
                  <div className={`w-10 h-10 shrink-0 flex items-center justify-center font-bebas text-lg tracking-wider text-white bg-[#080808] group-hover:bg-[#C8102E]`}>
                    {concept.id}
                  </div>
                  <div>
                    <div className="font-medium text-xs md:text-sm mb-1">{concept.title}</div>
                    <div className="text-[0.65rem] md:text-xs text-[#b0b0ab] leading-relaxed line-clamp-2">{concept.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ALGORITHM FLOW */}
      <section className="bg-[#080808] py-28 px-4 sm:px-14 overflow-hidden" id="algorithm">
        <div className="max-w-7xl mx-auto">
          <div className="text-[#C8102E]/70 text-[0.68rem] tracking-[3px] uppercase mb-5 text-center lg:text-left">
            The System Explained
          </div>
          <h2 className="font-bebas text-[clamp(2rem,5vw,4.5rem)] text-white leading-none tracking-tight mb-6 text-center lg:text-left">
            How We Engineer<br />The Algorithm
          </h2>
          <p className="text-white/45 text-sm md:text-lg max-w-2xl leading-relaxed mb-16 md:mb-20 text-center lg:text-left">
            Step-by-step process SocialBureau uses to turn social media into precision machines.
          </p>

          <div className="relative">
            {/* Center Track Line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#C8102E]/40 to-transparent -translate-x-1/2" />

            <div className="flex flex-col gap-12 md:gap-0">
              {[
                { phase: "01", label: "Discovery", title: "Business Niche Mapping", desc: "We translate your product into a precise niche taxonomy." },
                { phase: "02", label: "Intelligence", title: "Behaviour Profiling", desc: "Identifying where your target customers are located — city, region, PIN code." },
                { phase: "03", label: "Architecture", title: "Rules Configuration", desc: "We program exact rules into the platform API — who sees your campaign." },
                { phase: "04", label: "Feed Engineering", title: "Algorithm Prompting", desc: "We configure distribution algorithm with engagement signals." },
                { phase: "05", label: "Activation", title: "Campaign Launch", desc: "Campaigns go live with every parameter engineered." },
                { phase: "06", label: "Results", title: "Targeted Enquiries", desc: "Real people, who genuinely need your product, take action." }
              ].map((step, i) => (
                <div key={i} className={`flex flex-col md:grid md:grid-cols-[1fr_80px_1fr] items-center gap-0 group`}>
                  {/* Left Content (Odd) */}
                  <div className={`order-2 md:order-1 ${i % 2 === 0 ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12 md:order-3'} text-center md:text-left`}>
                    <div className="text-[#C8102E]/70 text-[0.6rem] md:text-[0.65rem] tracking-[3px] uppercase mb-2">Phase {step.phase} — {step.label}</div>
                    <div className="text-white font-bebas text-xl md:text-2xl tracking-wider mb-3 leading-tight group-hover:text-[#C8102E] transition-colors">{step.title}</div>
                    <div className="text-white/40 text-xs md:text-sm leading-relaxed max-w-[280px] md:max-w-sm mx-auto md:ml-auto md:mr-0 md:group-odd:mr-0 md:group-even:ml-0">{step.desc}</div>
                  </div>

                  {/* Mid Circle */}
                  <div className="order-1 md:order-2 relative flex justify-center py-4 md:py-12">
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-[#080808] border-2 border-[#C8102E]/30 flex items-center justify-center font-bebas text-lg md:text-2xl text-[#C8102E] z-10 group-hover:bg-[#C8102E] group-hover:text-white transition-all duration-300 transform group-hover:scale-110">
                      {step.phase}
                    </div>
                  </div>

                  {/* Empty Spacer */}
                  <div className={`hidden md:block ${i % 2 === 0 ? 'order-3' : 'order-1'}`} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PLATFORM BREAKDOWN */}
      <section className="bg-[#f7f7f5] py-28 px-4 sm:px-14 overflow-hidden" id="platforms">
        <div className="max-w-7xl mx-auto">
          <div className="text-[#C8102E] text-[0.68rem] tracking-[3px] uppercase mb-5 text-center lg:text-left">Platform Intelligence</div>
          <h2 className="font-bebas text-[clamp(2rem,6vw,4.5rem)] leading-none tracking-tight mb-6 text-center lg:text-left">
            How API Marketing Works<br />On Each Platform
          </h2>
          <p className="text-[#555550] text-sm md:text-lg max-w-2xl mb-12 italic text-center lg:text-left">
            Each social media platform has a different algorithm brain. We speak all of them fluently.
          </p>

          {/* TABS */}
          <div className="flex flex-nowrap overflow-x-auto pb-4 border-b-2 border-[#ebebea] scrollbar-hide">
            {Object.keys(platforms).map(key => (
              <button
                key={key}
                onClick={() => setActivePlatform(key)}
                className={`px-6 md:px-8 py-4 text-[0.65rem] md:text-[0.75rem] tracking-[2px] uppercase transition-all duration-300 border-b-2 -mb-[2px] whitespace-nowrap ${activePlatform === key
                  ? 'border-[#C8102E] text-[#080808] font-semibold'
                  : 'border-transparent text-[#b0b0ab] hover:text-[#080808]'
                  }`}
              >
                {key}
              </button>
            ))}
          </div>

          <div className="mt-12 md:mt-16">
            <AnimatePresence mode="wait">
              <motion.div
                key={activePlatform}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="grid lg:grid-cols-[1.2fr_1fr] gap-10 md:gap-12 lg:gap-20 items-start"
              >
                <div>
                  <h3 className="font-bebas text-2xl sm:text-3xl md:text-4xl tracking-wider mb-6 leading-tight text-center lg:text-left">
                    {platforms[activePlatform].title}
                  </h3>
                  <p className="text-[#555550] text-sm md:text-[0.95rem] leading-relaxed mb-10 text-center lg:text-left">
                    {platforms[activePlatform].desc}
                  </p>
                  <div className="grid grid-cols-2 gap-4 mb-10">
                    {platforms[activePlatform].metrics.map((m, i) => (
                      <div key={i} className="bg-white p-4 sm:p-5 border-t-2 border-[#C8102E] shadow-sm">
                        <div className="font-bebas text-xl sm:text-2xl md:text-3xl mb-1 leading-none">{m.num}</div>
                        <div className="text-[0.5rem] sm:text-[0.6rem] font-syne tracking-widest text-[#b0b0ab] uppercase">{m.lbl}</div>
                      </div>
                    ))}
                  </div>

                  <div className={`p-4 sm:p-6 ${['facebook', 'youtube', 'linkedin'].includes(activePlatform) ? 'bg-[#080808]/5' : 'bg-white'} border border-[#ebebea] shadow-sm`}>
                    <div className="text-[#C8102E] text-[0.6rem] font-syne tracking-[2px] uppercase mb-4">Engagement Trends</div>
                    <div className="h-[200px] w-full">
                      <Line
                        data={platforms[activePlatform].chartData}
                        options={{
                          responsive: true,
                          maintainAspectRatio: false,
                          plugins: { legend: { position: 'bottom', labels: { boxWidth: 8, font: { size: 9 }, color: ['facebook', 'youtube', 'linkedin'].includes(activePlatform) ? 'rgba(0,0,0,0.45)' : '#555' } } },
                          scales: {
                            y: { beginAtZero: true, grid: { color: 'rgba(0,0,0,0.04)' }, ticks: { font: { size: 8 } } },
                            x: { grid: { display: false }, ticks: { font: { size: 8 } } }
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-[#080808] p-6 md:p-10 w-full overflow-hidden">
                  <div className="text-[#C8102E] text-[0.6rem] md:text-[0.68rem] tracking-[3px] uppercase mb-8 text-center lg:text-left">Algorithm Rules Configured</div>
                  <div className="space-y-4">
                    {platforms[activePlatform].rules.map((rule, i) => (
                      <div key={i} className="group p-4 border border-white/5 hover:bg-[#C8102E]/5 transition-colors">
                        <div className="flex gap-4 items-start">
                          <span className="font-bebas text-[#C8102E] text-sm md:text-base shrink-0">{rule.id}</span>
                          <div>
                            <strong className="text-white/85 font-medium text-xs md:text-sm block mb-1">{rule.title}</strong>
                            <p className="text-white/40 text-[0.7rem] leading-relaxed">{rule.text}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* AUDIENCE ENGINE SECTION */}
      <section className="py-20 md:py-28 px-4 sm:px-14 max-w-7xl mx-auto overflow-hidden" id="audience">
        <div className="text-[#C8102E] text-[0.68rem] tracking-[3px] uppercase mb-5 text-center lg:text-left">Audience Intelligence</div>
        <h2 className="font-bebas text-[clamp(2.2rem,5vw,4.5rem)] leading-none tracking-tight mb-12 md:mb-16 uppercase text-center lg:text-left">
          We Find Your Exact<br />Buyer — Anywhere In India
        </h2>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Visual Diagram */}
          <div className="bg-[#080808] p-6 sm:p-12 relative overflow-hidden border border-[#C8102E]/10">
            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 19px, rgba(255,255,255,0.05) 20px), repeating-linear-gradient(90deg, transparent, transparent 19px, rgba(255,255,255,0.05) 20px)' }} />

            <div className="relative z-10 text-center">
              <div className="text-[0.55rem] tracking-[2px] uppercase text-white/20 mb-6">Audience Signals</div>

              <div className="flex justify-around mb-6">
                {['Location', 'Behaviour', 'Intent'].map((node, i) => (
                  <div key={i} className="bg-white/5 border border-white/10 px-3 py-2 text-[0.6rem] text-white/40 min-w-[70px]">
                    {node}
                  </div>
                ))}
              </div>

              <div className="flex justify-center mb-6">
                <div className="w-px h-8 bg-[#C8102E]/30" />
              </div>

              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-[#C8102E]/90 flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(200,16,46,0.2)]">
                <div className="font-bebas text-[0.65rem] md:text-xs text-white leading-tight uppercase tracking-widest">Social<br />Bureau<br />API</div>
              </div>

              <div className="flex justify-center mb-6">
                <div className="w-px h-8 bg-[#C8102E]/30" />
              </div>

              <div className="flex flex-col items-center gap-3">
                <div className="bg-[#C8102E]/10 border border-[#C8102E]/30 px-4 py-2 text-[#FF2244] text-[0.6rem] tracking-wider uppercase font-semibold w-fit">Qualified Enquiry</div>
                <div className="bg-[#C8102E]/10 border border-[#C8102E]/30 px-4 py-2 text-[#FF2244] text-[0.6rem] tracking-wider uppercase font-semibold w-fit">Revenue Growth</div>
              </div>
            </div>
          </div>

          {/* Steps List */}
          <div className="space-y-4 md:space-y-6">
            {[
              { num: "01", title: "Niche Buyer Profile", desc: "Understanding age, profession, income, and buying triggers." },
              { num: "02", title: "Locate Them Across India", desc: "Pinpointing where buyers are concentrated — metro to towns." },
              { num: "03", title: "Exact Rules Configuration", desc: "Filtering only the right profile sees your content." },
              { num: "04", title: "Deliver Conversions", desc: "Feeding algorithm with precision intent instructions." }
            ].map((step, i) => (
              <div key={i} className="flex gap-4 md:gap-8 items-start p-5 md:p-8 border border-[#ebebea] hover:border-[#C8102E] transition-all group bg-white shadow-sm">
                <div className="font-bebas text-3xl md:text-5xl text-[#ebebea] group-hover:text-[#C8102E] shrink-0 leading-none transition-colors">{step.num}</div>
                <div>
                  <h4 className="font-medium text-sm md:text-base mb-1">{step.title}</h4>
                  <p className="text-[#555550] text-xs md:text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROI ENGINE */}
      <section className="bg-[#080808] py-20 md:py-28 px-4 sm:px-14 overflow-hidden" id="roi">
        <div className="max-w-7xl mx-auto">
          <div className="text-[#C8102E]/70 text-[0.68rem] tracking-[3px] uppercase mb-5 text-center lg:text-left">Business Impact</div>
          <h2 className="font-bebas text-[clamp(2.2rem,5vw,4.5rem)] text-white leading-none tracking-tight mb-8 text-center lg:text-left">
            What Your Business<br />Actually Gains
          </h2>
          <p className="text-white/45 text-sm md:text-lg max-w-2xl mb-16 md:mb-20 text-center lg:text-left">
            Every element of SocialBureau's API marketing system is designed around one outcome: measurable business growth.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
            {[
              { icon: "◎", title: "Qualified Enquiries Only", desc: "You stop receiving random DMs and start receiving enquiries from people who already need your product. The algorithm pre-qualifies them.", stat: "3–8×", lbl: "Higher lead quality" },
              { icon: "↗", title: "Lower Cost Per Enquiry", desc: "By eliminating wasted impressions, every rupee of your budget works harder. Precision targeting means far more conversions for less money.", stat: "60%", lbl: "Avg. cost reduction" },
              { icon: "⬡", title: "Wider Audience Community", desc: "As campaigns run, the algorithm learns and expands your niche community — finding new buyers who match your profile across regions.", stat: "5×", lbl: "Community growth (90D)" },
              { icon: "▣", title: "Brand Authority in Your Niche", desc: "Consistent algorithm-engineered content builds your brand as the dominant voice in your specific category — increasing trust and recall.", stat: "72%", lbl: "Increase in brand search" },
              { icon: "◈", title: "Predictable Revenue Flow", desc: "Unlike ad-hoc campaigns, API marketing creates a systematic engine. Once calibrated, it generates consistent leads your team can rely on.", stat: "4.2×", lbl: "Average ROI (6 months)" },
              { icon: "◉", title: "Full Transparency & Data", desc: "Every rule, parameter, and rupee spent is tracked and reported. You see exactly what is working and where growth is coming from.", stat: "100%", lbl: "Data transparency" }
            ].map((card, i) => (
              <div key={i} className="bg-[#080808] p-10 hover:bg-[#C8102E]/10 transition-all cursor-pointer border-t border-[#C8102E]/25">
                <div className="w-12 h-12 bg-[#C8102E]/10 border border-[#C8102E]/25 text-[#C8102E] text-2xl flex items-center justify-center mb-8">
                  {card.icon}
                </div>
                <h4 className="font-bebas text-2xl text-white tracking-wider mb-4">{card.title}</h4>
                <p className="text-white/35 text-sm leading-relaxed mb-10">{card.desc}</p>
                <div className="font-bebas text-4xl text-[#C8102E] mb-1">{card.stat}</div>
                <div className="text-[0.6rem] font-syne tracking-[2px] uppercase text-white/20">{card.lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DATA INSIGHT STRIP */}
      <div className="bg-[#C8102E] py-16 px-6 md:px-14">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-px bg-white/15">
          {[
            { n: "900M+", l: "Internet Users in India" },
            { n: "₹2.3L Cr", l: "Annual Digital Ad Spend" },
            { n: "78%", l: "Brands Wasting Budget" },
            { n: "6–8×", l: "ROI with API Marketing" },
            { n: "0%", l: "Tier 2–3 India Adoption" }
          ].map((item, i) => (
            <div key={i} className="bg-[#C8102E] py-10 px-6 text-center hover:bg-[#8B0000] transition-colors">
              <div className="font-bebas text-4xl md:text-5xl text-white tracking-widest mb-2">{item.n}</div>
              <div className="text-[0.62rem] text-white/60 tracking-widest uppercase leading-tight">{item.l}</div>
            </div>
          ))}
        </div>
      </div>

      <section className="py-20 md:py-28 px-4 sm:px-14 bg-white overflow-hidden" id="system">
        <div className="max-w-7xl mx-auto">
          <div className="text-[#C8102E] text-[0.68rem] tracking-[3px] uppercase mb-5 text-center lg:text-left">Campaign System</div>
          <h2 className="font-bebas text-[clamp(2.5rem,5vw,4.5rem)] leading-none mb-6 uppercase text-center lg:text-left break-words">
            The Complete Campaign<br />Delivery Framework
          </h2>
          <p className="text-[#555550] text-lg max-w-3xl mb-12 md:mb-16 text-center lg:text-left font-light leading-relaxed italic">
            Here is exactly how a SocialBureau API Marketing campaign is structured from niche definition to final enquiry.
          </p>

          <div className="relative group">
            <div className="overflow-x-auto scrollbar-hide -mx-4 px-4 pb-6">
              <div className="min-w-[1100px] border border-black/5 shadow-2xl">
                {/* Header */}
                <div className="grid grid-cols-5 bg-[#080808] text-white/35 uppercase text-[0.55rem] tracking-[2px] mb-[1px]">
                  {['Business Input', 'API Configuration', 'Algorithm Instruction', 'Platform Action', 'Business Result'].map((h, i) => (
                    <div key={i} className={`p-4 text-center ${i === 2 ? 'text-[#C8102E] bg-white/5' : ''}`}>{h}</div>
                  ))}
                </div>

                {/* Rows */}
                {[
                  ["Your product, service, and target customer brief provided to SocialBureau", "Niche taxonomy built, audience parameters defined in API dashboard", "Algorithm receives exact buyer persona — interest, intent, and location rules", "Platform identifies and pools matching audience segments across its network", "Your brand is now visible only to people who match your exact buyer profile"],
                  ["Content and creative assets designed for your niche audience's language and culture", "Feed distribution rules set — timing, format, hashtag signals, engagement triggers", "Algorithm distributes content at optimal time to highest-intent audience segment", "Content appears in target audience's organic feed — not just to existing followers", "New niche audience engages with your content, brand trust begins to build"],
                  ["Campaign objective defined — enquiry, website visit, call, DM, form submission", "Conversion event configured, budget rules set, exclusion filters applied via API", "Algorithm optimises delivery toward users most likely to complete the conversion goal", "Ads delivered to maximum-intent users, budget auto-shifts to best-performing segment", "Qualified enquiries arrive directly to your business — WhatsApp, form, call, or DM"],
                  ["Performance data reviewed — which audience, location, and content drives most enquiries", "API rules updated in real-time based on performance signals and new data inputs", "Algorithm learns your best-converting audience and continuously refines targeting", "Campaign becomes more efficient each week — lower cost, higher quality audience", "Business grows with a self-improving enquiry engine that gets smarter over time"]
                ].map((row, rIdx) => (
                  <div key={rIdx} className="grid grid-cols-5 bg-[#ebebea] mb-[1px] group/row">
                    {row.map((cell, cIdx) => (
                      <div key={cIdx} className={`p-6 text-black flex flex-col bg-white transition-all group-hover/row:bg-[#f7f7f5] ${cIdx === 2 ? 'bg-[#fcfcfc]' : ''}`}>
                        <div className={`font-bebas text-sm mb-3 ${cIdx === 4 ? 'text-green-600' : 'text-[#C8102E]'}`}>
                          {cIdx === 0 ? `0${rIdx + 1}` : cIdx === 2 ? ['SIGNAL', 'FEED', 'RULES', 'LEARN'][rIdx] : cIdx === 4 ? '✓' : '→'}
                        </div>
                        <div className="text-[0.8rem] font-medium leading-relaxed pr-2">{cell}</div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
            {/* Scroll Hint Mobile */}
            <div className="md:hidden flex items-center justify-center gap-2 mt-2 text-[#b0b0ab] text-[0.6rem] uppercase tracking-[3px] animate-pulse">
              <span>Swipe left for detail →</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12 mt-12 md:mt-16 p-8 md:p-12 bg-[#f7f7f5] border-l-4 border-[#C8102E] shadow-sm">
            <div>
              <div className="font-bebas text-2xl md:text-3xl mb-4 tracking-wider text-[#080808]">Why Most Indian Brands Get This Wrong</div>
              <p className="text-[#555550] text-[0.85rem] md:text-[0.9rem] leading-relaxed italic opacity-80">
                The majority of businesses in India boost posts, run generic ads, and wonder why they get no enquiries. The truth is — they're speaking to an algorithm in the wrong language. The algorithm doesn't care about beautiful creatives. It cares about structured data signals, conversion events, and audience parameters. That's what SocialBureau configures. That's why our clients get results that feel impossible with conventional marketing.
              </p>
            </div>
            <div>
              <div className="font-bebas text-2xl md:text-3xl mb-4 tracking-wider text-[#080808]">The Community Multiplier Effect</div>
              <p className="text-[#555550] text-[0.85rem] md:text-[0.9rem] leading-relaxed italic opacity-80">
                Once your algorithm is correctly configured and your niche audience community begins to grow, something powerful happens: organic reach expands, referrals increase, and your brand becomes the natural first choice in your category. This is not just campaign ROI — this is long-term market ownership. SocialBureau builds both the immediate enquiry engine and the long-term brand community simultaneously.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHY INDIA NEEDS THIS */}
      <section className="bg-[#1c1c1a] py-20 md:py-28 px-4 sm:px-14 overflow-hidden" id="india">
        <div className="max-w-7xl mx-auto">
          <div className="text-[#C8102E]/70 text-[0.68rem] tracking-[3px] uppercase mb-5 text-center lg:text-left">India Market Reality</div>
          <h2 className="font-bebas text-[clamp(2.2rem,5vw,4.5rem)] text-white leading-none tracking-tight mb-16 md:mb-20 uppercase text-center lg:text-left">
            Why This Is The<br />Biggest Opportunity In India
          </h2>

          <div className="grid lg:grid-cols-2 gap-20">
            <div className="space-y-0 text-white/40">
              {[
                { val: "900M", sub: "Internet users in India by 2025", desc: "The world's largest online consumer market — yet most brands reach less than 1% of their potential audience." },
                { val: "78%", sub: "Brands spending on wrong audiences", desc: "Digital ad budgets are wasted because campaigns are set up without API-level precision targeting." },
                { val: "₹0", sub: "Spent on API Marketing in Tier 2–3 India", desc: "This technology is virtually unknown outside major metros, giving early adopters an enormous advantage." },
                { val: "6×", sub: "ROI gap vs conventional marketing", desc: "Data show businesses using API-engineered campaigns consistently outperform conventional advertisers." }
              ].map((stat, i) => (
                <div key={i} className={`flex gap-10 py-10 border-b border-white/5 ${i === 0 ? 'pt-0' : ''}`}>
                  <div className="font-bebas text-5xl text-[#C8102E] shrink-0 min-w-[120px]">{stat.val}</div>
                  <div>
                    <strong className="text-white/75 block text-lg mb-1 font-syne">{stat.sub}</strong>
                    <p className="text-[0.85rem] leading-relaxed">{stat.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-6">
              {[
                { q: "Why doesn't boosting posts work?", a: "Boosted posts give the algorithm almost no useful info. You're paying to reach random people. API Marketing gives precise instruction sets that perform 4–8× better." },
                { q: "Is this only for large budgets?", a: "No. API Marketing is actually more powerful for small businesses because it eliminates waste. A ₹20K budget configured correctly outperforms a ₹1L conventional spend." },
                { q: "How long before results?", a: "Most see improvement within 2–4 weeks. The targeting begins working from day one, but the algorithm needs learning time for peak efficiency." }
              ].map((faq, i) => (
                <div key={i} className="bg-white/5 border border-white/5 p-8 transition-colors hover:border-[#C8102E]/40 group cursor-default">
                  <div className="flex gap-4 items-start mb-4">
                    <span className="font-bebas text-[#C8102E] text-xl">Q</span>
                    <h4 className="text-white/80 font-medium text-sm pt-1">{faq.q}</h4>
                  </div>
                  <div className="text-white/30 text-[0.82rem] leading-relaxed pl-8 group-hover:text-white/50 transition-colors">
                    {faq.a}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* RESULTS TICKER */}
      <section className="py-28 px-6 md:px-14 bg-white" id="results">
        <div className="bg-[#080808] py-5 overflow-hidden relative mb-20 -mx-6 md:-mx-14">
          <div className="flex whitespace-nowrap animate-ticker group">
            <div className="flex gap-16 px-8">
              {[
                { i: "Real Estate", r: "420% enquiry increase" },
                { i: "Education", r: "CPL dropped ₹280 to ₹31" },
                { i: "Fashion D2C", r: "4K to 38K community in 4M" },
                { i: "Healthcare", r: "6× appointment bookings" },
                { i: "B2B Services", r: "18 enterprise clients in 90D" },
                { i: "Restaurant", r: "₹8 cost per table booking" }
              ].map((item, i) => (
                <span key={i} className="text-white/25 text-[0.7rem] tracking-[3px] uppercase">
                  {item.i} — <strong className="text-[#C8102E] font-normal">{item.r}</strong>
                </span>
              ))}
            </div>
            {/* Duplicate for seamless loop */}
            <div className="flex gap-16 px-8">
              {[
                { i: "Real Estate", r: "420% enquiry increase" },
                { i: "Education", r: "CPL dropped ₹280 to ₹31" },
                { i: "Fashion D2C", r: "4K to 38K community in 4M" },
                { i: "Healthcare", r: "6× appointment bookings" },
                { i: "B2B Services", r: "18 enterprise clients in 90D" },
                { i: "Restaurant", r: "₹8 cost per table booking" }
              ].map((item, i) => (
                <span key={i + 10} className="text-white/25 text-[0.7rem] tracking-[3px] uppercase">
                  {item.i} — <strong className="text-[#C8102E] font-normal">{item.r}</strong>
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="text-[#C8102E] text-[0.68rem] tracking-[3px] uppercase mb-5">Impact Data</div>
          <h2 className="font-bebas text-[clamp(2.5rem,5vw,4.5rem)] leading-none mb-16 uppercase">
            When The Algorithm<br />Is Engineered Right
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { industry: "Real Estate", res: "420%", before: "Bengaluru developer spending ₹80K/mo with 12 enquiries/mo.", after: "62 qualified enquiries/mo at same budget via API lifecycle signals." },
              { industry: "Education / Ed-Tech", res: "₹31 CPL", before: "Hyderabad coaching generating leads at ₹280/enquiry via conventional Facebook ads.", after: "API audience engineering reduced enrolled-student cost to ₹31 — a 9× improvement." },
              { industry: "D2C Fashion Brand", res: "34K → Community", before: "Delhi startup with 4,200 followers and zero organic community engagement.", after: "120 days of algorithm distribution: 34K active members with 8-12% engagement." }
            ].map((card, i) => (
              <div key={i} className="border border-[#ebebea] p-10 hover:border-[#C8102E] transition-all cursor-pointer group">
                <div className="flex items-center gap-4 mb-8">
                  <div className="bg-[#f7f7f5] px-3 py-1.5 text-[0.65rem] text-[#b0b0ab] tracking-widest uppercase">Before</div>
                  <div className="text-[#C8102E]">→</div>
                  <div className="bg-[#080808] px-3 py-1.5 text-[0.65rem] text-white tracking-widest uppercase">After API</div>
                </div>
                <div className="text-[#C8102E] text-[0.65rem] tracking-[2px] uppercase mb-2">{card.industry}</div>
                <div className="font-bebas text-6xl tracking-widest mb-6 transition-transform group-hover:scale-105 duration-500">{card.res}</div>
                <p className="text-[#555550] text-[0.82rem] leading-relaxed italic opacity-60">“ {card.before || card.after} ”</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="bg-[#1c1c1a] py-20 md:py-28 px-4 sm:px-14 overflow-hidden" id="contact">
        <div className="max-w-7xl mx-auto">
          <div className="text-[#C8102E]/70 text-[0.68rem] tracking-[3px] uppercase mb-5 text-center lg:text-left">Start Your Journey</div>
          <h2 className="font-bebas text-[clamp(2rem,5vw,4.5rem)] text-white leading-none tracking-tight mb-16 md:mb-20 uppercase text-center lg:text-left">
            Let's Engineer Your<br className="lg:block hidden" />Algorithm Advantage
          </h2>

          <div className="grid lg:grid-cols-2 gap-16 lg:gap-20">
            <div className="space-y-6 order-2 lg:order-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-white/25 text-[0.6rem] uppercase tracking-[2px]">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Rajesh Kumar"
                    className="w-full bg-white/5 border border-white/10 p-4 text-white text-sm outline-none focus:border-[#C8102E] transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-white/25 text-[0.6rem] uppercase tracking-[2px]">Mobile / WhatsApp</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+91 8714952665"
                    className="w-full bg-white/5 border border-white/10 p-4 text-white text-sm outline-none focus:border-[#C8102E] transition-colors"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-white/25 text-[0.6rem] uppercase tracking-[2px]">Business Name</label>
                <input
                  type="text"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleInputChange}
                  placeholder="Your Company Name"
                  className="w-full bg-white/5 border border-white/10 p-4 text-white text-sm outline-none focus:border-[#C8102E] transition-colors"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-white/25 text-[0.6rem] uppercase tracking-[2px]">Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full bg-white/5 border border-white/10 p-4 text-white/50 text-xs sm:text-sm outline-none focus:border-[#C8102E] appearance-none cursor-pointer"
                  >
                    <option className="bg-[#1c1c1a]">Real Estate</option>
                    <option className="bg-[#1c1c1a]">Education</option>
                    <option className="bg-[#1c1c1a]">E-commerce</option>
                    <option className="bg-[#1c1c1a]">Other</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-white/25 text-[0.6rem] uppercase tracking-[2px]">Monthly Spend</label>
                  <select
                    name="monthlySpend"
                    value={formData.monthlySpend}
                    onChange={handleInputChange}
                    className="w-full bg-white/5 border border-white/10 p-4 text-white/50 text-xs sm:text-sm outline-none focus:border-[#C8102E] appearance-none cursor-pointer"
                  >
                    <option className="bg-[#1c1c1a]">Under ₹50K</option>
                    <option className="bg-[#1c1c1a]">₹50K - ₹5L</option>
                    <option className="bg-[#1c1c1a]">₹5L+</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-white/25 text-[0.6rem] uppercase tracking-[2px]">Biggest Challenge</label>
                <textarea
                  name="challenge"
                  value={formData.challenge}
                  onChange={handleInputChange}
                  placeholder="Tell us what's not working..."
                  className="w-full bg-white/5 border border-white/10 p-4 text-white text-sm min-h-[120px] outline-none focus:border-[#C8102E] transition-colors resize-none"
                />
              </div>
              <button
                onClick={handleSubmission}
                disabled={submitting}
                className={`w-full bg-[#C8102E] text-white px-10 py-5 uppercase text-[0.7rem] tracking-[3px] hover:bg-[#FF2244] transition-colors font-semibold ${submitting ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {submitting ? 'Submitting...' : 'Request Strategy Call →'}
              </button>
            </div>

            <div className="space-y-10 md:space-y-12 order-1 lg:order-2">
              <div className="font-cormorant italic text-xl md:text-2xl text-white/50 leading-relaxed text-center lg:text-left break-words px-4">
                "Most brands don't have a <strong className="text-white not-italic underline decoration-[#C8102E] underline-offset-8">content problem</strong>. They have a <strong className="text-white not-italic underline decoration-[#C8102E] underline-offset-8">targeting problem</strong>."
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 md:gap-6">
                {[
                  { lbl: "Email", val: "info@socialbureau.in", icon: "✉" },
                  { lbl: "WhatsApp Direct", val: "+91 8714952665", icon: "◎" },
                  { lbl: "Response Time", val: "Within 12 hours", icon: "⊙" },
                  { lbl: "Free Audit", val: "30-min strategy call", icon: "▣" }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 sm:gap-5 p-4 sm:p-5 border border-white/5 hover:border-[#C8102E]/30 transition-all group bg-white/[0.02]">
                    <div className="w-10 h-10 bg-[#C8102E] flex items-center justify-center text-white shrink-0">
                      {item.icon}
                    </div>
                    <div className="overflow-hidden">
                      <div className="text-[#C8102E] text-[0.55rem] uppercase tracking-[2px] mb-1 font-bold">{item.lbl}</div>
                      <div className="text-white/70 text-[0.75rem] sm:text-[0.85rem] font-syne truncate">{item.val}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ApiMarketing;
