import React, { useEffect, useState, useRef } from "react";
import { useAuth } from "@/utils/authUtils";
import { BASE_URL } from "@/utils/urls";
import axios from "axios";
import { motion, AnimatePresence, useScroll, useTransform, useInView } from "framer-motion";
import { toast } from "react-toastify";

/* ─────────────────────────────────────────────────────
   Animation Variants
───────────────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: (delay = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay } }),
};
const scaleIn = {
  hidden: { opacity: 0, scale: 0.88 },
  show: (delay = 0) => ({ opacity: 1, scale: 1, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay } }),
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.09 } } };
const childItem = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

/* ─────────────────────────────────────────────────────
   ScrollReveal
───────────────────────────────────────────────────── */
function ScrollReveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} initial="hidden" animate={inView ? "show" : "hidden"} custom={delay} variants={fadeUp} className={className}>
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────
   Shimmer
───────────────────────────────────────────────────── */
function Shimmer({ className = "" }) {
  return (
    <div className={`relative overflow-hidden rounded-2xl ${className}`} style={{ background: "rgba(26,111,255,0.05)" }}>
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.4s_infinite] bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />
    </div>
  );
}

/* ─────────────────────────────────────────────────────
   AnimatedNumber
───────────────────────────────────────────────────── */
function AnimatedNumber({ value, duration = 1 }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    let start = 0;
    const end = parseInt(value, 10);
    if (start === end) return;
    const step = Math.ceil(end / (duration * 40));
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setDisplay(end); clearInterval(timer); }
      else setDisplay(start);
    }, 1000 / 40);
    return () => clearInterval(timer);
  }, [value]);
  return <>{display}</>;
}

/* ─────────────────────────────────────────────────────
   Main Component
───────────────────────────────────────────────────── */
export default function FifaWorldcup() {
  const { currentUser, isAuthenticated } = useAuth();

  const [heroMatch, setHeroMatch] = useState(null);
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const [matches, setMatches] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [votesLeaderboard, setVotesLeaderboard] = useState([]);
  const [leaderboardSubTab, setLeaderboardSubTab] = useState("accuracy");
  const [userPredictions, setUserPredictions] = useState([]);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [predictionChoice, setPredictionChoice] = useState("");
  const [momentumChoice, setMomentumChoice] = useState("16'-30'");
  const [activeTab, setActiveTab] = useState("leaderboard");
  const [showTeamADropdown, setShowTeamADropdown] = useState(false);
  const [showTeamBDropdown, setShowTeamBDropdown] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [justSubmitted, setJustSubmitted] = useState(false);

  const [useLocalTimezone, setUseLocalTimezone] = useState(true);
  const [statusFilter, setStatusFilter] = useState("upcoming"); // "upcoming" or "completed"
  const [selectedDateFilter, setSelectedDateFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const formatMatchDateTime = (matchDateStr) => {
    const dateObj = new Date(matchDateStr);
    if (isNaN(dateObj.getTime())) {
      return { date: "Invalid Date", time: "00:00", timezone: "" };
    }
    
    if (useLocalTimezone) {
      const timeStr = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
      const dateStr = dateObj.toLocaleDateString([], { month: 'short', day: 'numeric' });
      let tzStr = "";
      try {
        const parts = new Intl.DateTimeFormat([], { timeZoneName: 'short' }).formatToParts(dateObj);
        const tzPart = parts.find(p => p.type === 'timeZoneName');
        tzStr = tzPart ? tzPart.value : "";
      } catch (e) {
        const offsetMinutes = dateObj.getTimezoneOffset();
        const absOffset = Math.abs(offsetMinutes);
        const hours = Math.floor(absOffset / 60);
        const minutes = absOffset % 60;
        const sign = offsetMinutes <= 0 ? "+" : "-";
        tzStr = `GMT${sign}${hours}:${String(minutes).padStart(2, '0')}`;
      }
      return {
        date: dateStr,
        time: timeStr,
        timezone: tzStr
      };
    } else {
      const hours = String(dateObj.getUTCHours()).padStart(2, '0');
      const minutes = String(dateObj.getUTCMinutes()).padStart(2, '0');
      const dateStr = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' });
      return {
        date: dateStr,
        time: `${hours}:${minutes}`,
        timezone: "UTC"
      };
    }
  };

  const heroRef = useRef(null);
  const { scrollY } = useScroll();
  const heroParallax = useTransform(scrollY, [0, 600], [0, 80]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0.3]);

  useEffect(() => {
    const handleGlobalClick = () => { setShowTeamADropdown(false); setShowTeamBDropdown(false); };
    window.addEventListener("click", handleGlobalClick);
    return () => window.removeEventListener("click", handleGlobalClick);
  }, []);

  useEffect(() => { fetchInitialData(); }, [isAuthenticated]);

  const fetchInitialData = async () => {
    try {
      setLoading(true);
      const [heroRes, matchesRes, leaderboardRes, votesLeaderboardRes] = await Promise.all([
        axios.get(`${BASE_URL}/fifa/hero-match`),
        axios.get(`${BASE_URL}/fifa/matches`),
        axios.get(`${BASE_URL}/fifa/leaderboard`),
        axios.get(`${BASE_URL}/fifa/votes-leaderboard`),
      ]);
      setHeroMatch(heroRes.data);
      setSelectedMatch(heroRes.data);
      setMatches(matchesRes.data || []);
      setLeaderboard(leaderboardRes.data || []);
      setVotesLeaderboard(votesLeaderboardRes.data || []);
      if (isAuthenticated) {
        const predRes = await axios.get(`${BASE_URL}/fifa/my-predictions`);
        const preds = predRes.data || [];
        setUserPredictions(preds);
        if (heroRes.data) {
          const existing = preds.find(p => p.match && (p.match._id === heroRes.data._id || p.match === heroRes.data._id));
          if (existing) setPredictionChoice(existing.predictedWinner);
        }
      }
    } catch (error) {
      console.error("Failed to load FIFA data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getExistingPrediction = (matchId) => {
    if (!matchId) return null;
    return userPredictions.find(p => p.match && (p.match._id === matchId || p.match === matchId));
  };

  const handleSelectMatch = (match) => {
    setSelectedMatch(match);
    const existing = getExistingPrediction(match._id);
    setPredictionChoice(existing ? existing.predictedWinner : "");
    const el = document.getElementById("predict-panel");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmitPrediction = async () => {
    if (!isAuthenticated) {
      toast.warn("Authentication required. Redirecting to login...");
      setTimeout(() => { window.location.href = `/login?redirect=${encodeURIComponent(window.location.pathname + window.location.search)}`; }, 1500);
      return;
    }
    if (!selectedMatch) return;
    if (!predictionChoice) { toast.error("Please choose a predicted winner (Team A, Team B, or Draw)."); return; }
    try {
      setSubmitting(true);
      const res = await axios.post(`${BASE_URL}/fifa/predict`, { matchId: selectedMatch._id, predictedWinner: predictionChoice });
      toast.success(res.data.message || "Forecast published successfully! ⚽");
      setJustSubmitted(true);
      setTimeout(() => setJustSubmitted(false), 2500);
      const updatedMatch = { ...selectedMatch, teamAVotes: res.data.votes.teamAVotes, teamBVotes: res.data.votes.teamBVotes, drawVotes: res.data.votes.drawVotes };
      if (heroMatch && heroMatch._id === selectedMatch._id) setHeroMatch(updatedMatch);
      setSelectedMatch(updatedMatch);
      setMatches(matches.map(m => m._id === selectedMatch._id ? updatedMatch : m));
      const predRes = await axios.get(`${BASE_URL}/fifa/my-predictions`);
      setUserPredictions(predRes.data || []);
      const [lbRes, vlbRes] = await Promise.all([axios.get(`${BASE_URL}/fifa/leaderboard`), axios.get(`${BASE_URL}/fifa/votes-leaderboard`)]);
      setLeaderboard(lbRes.data || []);
      setVotesLeaderboard(vlbRes.data || []);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to submit prediction.");
    } finally {
      setSubmitting(false);
    }
  };

  const getVotePercentages = (match) => {
    const total = (match.teamAVotes || 0) + (match.teamBVotes || 0) + (match.drawVotes || 0);
    if (total === 0) return { teamA: 33, teamB: 33, draw: 34 };
    return {
      teamA: Math.round(((match.teamAVotes || 0) / total) * 100),
      teamB: Math.round(((match.teamBVotes || 0) / total) * 100),
      draw: Math.round(((match.drawVotes || 0) / total) * 100),
    };
  };

  const isMatchLocked = (match) => {
    if (!match) return true;
    return match.status !== "Scheduled" || new Date(match.date) <= new Date();
  };

  const getTomorrowDateString = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    if (useLocalTimezone) {
      return tomorrow.toLocaleDateString([], { month: 'short', day: 'numeric' });
    } else {
      return tomorrow.toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' });
    }
  };

  const tomorrowDateStr = getTomorrowDateString();
  const tomorrowUpcomingMatches = matches
    .filter(m => {
      const isTomorrow = formatMatchDateTime(m.date).date === tomorrowDateStr;
      return isTomorrow && !isMatchLocked(m);
    })
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  useEffect(() => {
    if (tomorrowUpcomingMatches.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentHeroIndex((prev) => (prev + 1) % tomorrowUpcomingMatches.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [tomorrowUpcomingMatches.length]);

  /* ── LOADING ── */
  if (loading) {
    return (
      <div style={{ fontFamily: "'Roboto',sans-serif", backgroundColor: "#040d1a" }} className="min-h-screen flex flex-col items-center justify-center text-white gap-8 px-6">
        <style dangerouslySetInnerHTML={{ __html: `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Roboto:wght@300;400;500;700;900&family=Montserrat:ital,wght@0,700;0,800;0,900;1,700;1,800;1,900&display=swap'); @keyframes shimmer { to { transform: translateX(200%); } }` }} />
        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-14 h-14 rounded-full" style={{ border: "3px solid rgba(26,111,255,0.15)", borderTopColor: "#1a6fff" }}/>
        <div className="w-full max-w-md space-y-3">
          <Shimmer className="h-8 w-3/4 mx-auto" /><Shimmer className="h-4 w-1/2 mx-auto" />
          <div className="grid grid-cols-3 gap-3 mt-6"><Shimmer className="h-24" /><Shimmer className="h-24" /><Shimmer className="h-24" /></div>
        </div>
        <motion.p animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 2 }}
          style={{ fontFamily: "'Inter',sans-serif", color: "#4da3ff", fontSize: "10px", letterSpacing: "0.25em", textTransform: "uppercase" }}>
          Synchronizing Arena Data...
        </motion.p>
      </div>
    );
  }

  const activeHeroMatch = (tomorrowUpcomingMatches && tomorrowUpcomingMatches.length > 0)
    ? tomorrowUpcomingMatches[currentHeroIndex % tomorrowUpcomingMatches.length]
    : heroMatch;

  const heroVotes = activeHeroMatch ? getVotePercentages(activeHeroMatch) : { teamA: 33, teamB: 33, draw: 34 };
  const currentLeaderboard = leaderboardSubTab === "accuracy" ? leaderboard : votesLeaderboard;
  const isAccuracy = leaderboardSubTab === "accuracy";

  // Match filtering & grouping logic
  const statusFilteredMatches = matches.filter(match => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const teamAContains = match.teamA && match.teamA.toLowerCase().includes(q);
      const teamBContains = match.teamB && match.teamB.toLowerCase().includes(q);
      if (!teamAContains && !teamBContains) return false;
    }
    if (statusFilter === "upcoming") {
      return match.status === "Scheduled" || match.status === "Live";
    } else {
      return match.status === "Completed";
    }
  });

  const dateChips = ["All", ...new Set(statusFilteredMatches.map(match => {
    return formatMatchDateTime(match.date).date;
  }))];

  const activeDateFilter = dateChips.includes(selectedDateFilter) ? selectedDateFilter : "All";

  const finalFilteredMatches = statusFilteredMatches.filter(match => {
    if (activeDateFilter === "All") return true;
    return formatMatchDateTime(match.date).date === activeDateFilter;
  });

  return (
    <div style={{ fontFamily: "'Roboto',sans-serif", backgroundColor: "#040d1a", color: "#e1e3e4" }} className="overflow-x-hidden relative min-h-screen">

      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Roboto:wght@300;400;500;700;900&family=Montserrat:ital,wght@0,700;0,800;0,900;1,700;1,800;1,900&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');
        @keyframes shimmer { to { transform: translateX(200%); } }
        @keyframes floatY { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes gradientShift { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }
        .font-inter { font-family: 'Inter', sans-serif; }
        .font-display-xl { font-family: 'Montserrat', sans-serif; }
        .green-gradient-text { background: linear-gradient(135deg,#2ae500,#79ff5b,#2ae500); background-size:200% 200%; animation:gradientShift 2s ease infinite; -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
        .glass-card { background: rgba(5,15,38,0.72) !important; backdrop-filter: blur(32px) !important; border: 1px solid rgba(26,111,255,0.18) !important; box-shadow: 0 24px 64px rgba(0,0,0,0.55) !important; }
        .btn-vote:hover { box-shadow: 0 0 45px rgba(42,229,0,0.65), 0 0 90px rgba(42,229,0,0.22) !important; }
        .network-grid {
          background-image:
            linear-gradient(rgba(26,111,255,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(26,111,255,0.05) 1px, transparent 1px);
          background-size: 55px 55px;
        }
        .custom-scrollbar::-webkit-scrollbar { width:6px; height:6px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background:rgba(26,111,255,0.3); border-radius:4px; }
        .custom-scrollbar-h::-webkit-scrollbar { height: 6px; }
        .custom-scrollbar-h::-webkit-scrollbar-thumb { background: linear-gradient(90deg, rgba(26,111,255,0.5) 0%, rgba(77,163,255,0.7) 100%); border-radius: 4px; }
        .custom-scrollbar-h::-webkit-scrollbar-track { background: rgba(5,15,38,0.5); border-radius: 4px; }
        .fixture-card {
          background: rgba(6,18,42,0.55) !important;
          backdrop-filter: blur(20px) !important;
          border: 1px solid rgba(26,111,255,0.08) !important;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .fixture-card:hover {
          background: rgba(8,24,56,0.7) !important;
          border-color: rgba(26,111,255,0.3) !important;
          box-shadow: 0 12px 30px rgba(0,0,0,0.4), 0 0 15px rgba(26,111,255,0.1) !important;
          transform: translateY(-2px);
        }
        .fixture-card.is-hero {
          border-color: rgba(26,111,255,0.4) !important;
          box-shadow: 0 0 25px rgba(26,111,255,0.12) !important;
          background: rgba(10,25,58,0.6) !important;
        }
        .fixture-card.is-hero:hover {
          border-color: rgba(26,111,255,0.65) !important;
          box-shadow: 0 0 35px rgba(26,111,255,0.2) !important;
          background: rgba(12,32,74,0.75) !important;
        }
        .date-chip {
          background: rgba(6,18,42,0.6);
          border: 1px solid rgba(26,111,255,0.1);
          color: #64748b;
          transition: all 0.2s ease;
        }
        .date-chip:hover {
          background: rgba(26,111,255,0.08);
          border-color: rgba(26,111,255,0.25);
          color: #94a3b8;
        }
        .date-chip.active {
          background: rgba(26,111,255,0.18);
          border-color: rgba(26,111,255,0.45);
          color: #7eb8ff;
          box-shadow: 0 0 15px rgba(26,111,255,0.15);
        }
      `}} />

      <main>
        {/* ═══════════════════════════
            HERO
        ═══════════════════════════ */}
        {heroMatch && (
          <section ref={heroRef} className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-16 pb-10 px-4">
            {/* Deep blue base */}
            <div className="absolute inset-0 z-0" style={{ background: "linear-gradient(160deg,#040d1a 0%,#071530 40%,#030b1e 70%,#040d1a 100%)" }}/>
            {/* Network grid */}
            <div className="absolute inset-0 z-[1] network-grid opacity-70"/>
            {/* SVG diagonal network lines */}
            <div className="absolute inset-0 z-[2] pointer-events-none overflow-hidden">
              <svg width="100%" height="100%" className="absolute inset-0" preserveAspectRatio="none">
                <defs>
                  <radialGradient id="hg1" cx="50%" cy="52%" r="50%"><stop offset="0%" stopColor="#1a6fff" stopOpacity="0.22"/><stop offset="100%" stopColor="#1a6fff" stopOpacity="0"/></radialGradient>
                  <radialGradient id="hg2" cx="10%" cy="60%" r="35%"><stop offset="0%" stopColor="#1a6fff" stopOpacity="0.16"/><stop offset="100%" stopColor="#1a6fff" stopOpacity="0"/></radialGradient>
                  <radialGradient id="hg3" cx="90%" cy="60%" r="35%"><stop offset="0%" stopColor="#1a6fff" stopOpacity="0.16"/><stop offset="100%" stopColor="#1a6fff" stopOpacity="0"/></radialGradient>
                </defs>
                <line x1="0" y1="100%" x2="50%" y2="0" stroke="#1a6fff" strokeWidth="0.9" strokeOpacity="0.28"/>
                <line x1="100%" y1="100%" x2="50%" y2="0" stroke="#1a6fff" strokeWidth="0.9" strokeOpacity="0.28"/>
                <line x1="0" y1="40%" x2="100%" y2="70%" stroke="#1a6fff" strokeWidth="0.5" strokeOpacity="0.18"/>
                <line x1="0" y1="70%" x2="60%" y2="20%" stroke="#1a6fff" strokeWidth="0.5" strokeOpacity="0.15"/>
                <line x1="40%" y1="100%" x2="100%" y2="30%" stroke="#1a6fff" strokeWidth="0.5" strokeOpacity="0.15"/>
                <line x1="15%" y1="0" x2="0" y2="65%" stroke="#1a6fff" strokeWidth="0.6" strokeOpacity="0.2"/>
                <line x1="85%" y1="0" x2="100%" y2="65%" stroke="#1a6fff" strokeWidth="0.9" strokeOpacity="0.22"/>
                <line x1="50%" y1="52%" x2="5%" y2="62%" stroke="#2a7fff" strokeWidth="1.2" strokeOpacity="0.32"/>
                <line x1="50%" y1="52%" x2="95%" y2="62%" stroke="#2a7fff" strokeWidth="1.2" strokeOpacity="0.32"/>
                <line x1="50%" y1="52%" x2="22%" y2="18%" stroke="#2a7fff" strokeWidth="0.9" strokeOpacity="0.22"/>
                <line x1="50%" y1="52%" x2="78%" y2="18%" stroke="#2a7fff" strokeWidth="0.9" strokeOpacity="0.22"/>
                <ellipse cx="50%" cy="52%" rx="42%" ry="30%" fill="url(#hg1)"/>
                <ellipse cx="10%" cy="60%" rx="28%" ry="22%" fill="url(#hg2)"/>
                <ellipse cx="90%" cy="60%" rx="28%" ry="22%" fill="url(#hg3)"/>
                {[[5,62],[95,62],[22,18],[78,18],[10,38],[90,38],[50,8],[32,82],[68,82]].map(([x,y],i)=>(
                  <g key={i}>
                    <circle cx={`${x}%`} cy={`${y}%`} r="4" fill="none" stroke="#2a7fff" strokeWidth="0.8" strokeOpacity="0.28"/>
                    <circle cx={`${x}%`} cy={`${y}%`} r="2.2" fill="#3a8fff" fillOpacity="0.55"/>
                  </g>
                ))}
              </svg>
            </div>
            {/* Hero bg image — very subtle */}
            <motion.div className="absolute inset-0 z-[3] bg-cover bg-top"
              style={{ backgroundImage:`url('https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/FIFA%20World%20Cup/Please_create_a_hero_image_ple_1.jpg')`, opacity:0.1, y:heroParallax }}/>
            {/* Bottom fade */}
            <div className="absolute inset-0 z-[4]" style={{ background:"linear-gradient(to bottom,rgba(4,13,26,0) 0%,rgba(4,13,26,0.35) 55%,rgba(4,13,26,0.97) 92%,rgba(4,13,26,1) 100%)" }}/>

            {/* Content */}
            <motion.div style={{ opacity: heroOpacity }} className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center text-center gap-6">


              {/* Match Card */}
              <motion.div variants={scaleIn} initial="hidden" animate="show" custom={0.1}
                className="w-full rounded-3xl p-6 md:p-10 relative overflow-hidden"
                style={{ background:"rgba(4,12,34,0.82)", border:"1px solid rgba(26,111,255,0.22)", backdropFilter:"blur(40px)", boxShadow:"0 0 100px rgba(26,111,255,0.1),0 30px 80px rgba(0,0,0,0.7)" }}>
                {/* Top line glow */}
                <div className="absolute top-0 left-0 right-0 h-px" style={{ background:"linear-gradient(90deg,transparent,rgba(26,111,255,0.55),rgba(42,229,0,0.25),rgba(26,111,255,0.55),transparent)" }}/>
                <div className="absolute inset-0 rounded-3xl pointer-events-none" style={{ background:"radial-gradient(ellipse at 50% 0%,rgba(26,111,255,0.1) 0%,transparent 55%)" }}/>

                <AnimatePresence mode="wait">
                  {activeHeroMatch && (
                    <motion.div
                      key={activeHeroMatch._id}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    >
                      {/* Teams */}
                      <div className="relative z-10 grid grid-cols-7 items-center gap-4">

                        {/* Team A */}
                        <div className="col-span-3 flex flex-col items-center gap-4">
                          <motion.div whileHover={{ scale:1.08 }} transition={{ type:"spring",stiffness:280,damping:16 }} className="relative">
                            <div className="absolute inset-0 rounded-full" style={{ background:"radial-gradient(circle,rgba(26,111,255,0.35) 0%,transparent 65%)", transform:"scale(1.5)", filter:"blur(16px)" }}/>
                            <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full flex items-center justify-center"
                              style={{ background:"linear-gradient(135deg,rgba(18,45,105,0.96),rgba(6,18,52,0.98))", border:"2px solid rgba(26,111,255,0.45)", boxShadow:"0 0 35px rgba(26,111,255,0.28),inset 0 0 25px rgba(26,111,255,0.07)" }}>
                              {activeHeroMatch.teamACrest
                                ? <img className="w-16 h-16 md:w-24 md:h-24 object-contain p-2" src={activeHeroMatch.teamACrest} alt={activeHeroMatch.teamA}/>
                                : <span style={{ fontFamily:"'Montserrat',sans-serif", fontWeight:900, fontSize:"22px", color:"#4da3ff" }}>{activeHeroMatch.teamA.slice(0,3).toUpperCase()}</span>}
                            </div>
                          </motion.div>
                          <span style={{ fontFamily:"'Montserrat',sans-serif", fontSize:"clamp(18px,3vw,26px)", fontWeight:900, color:"white", textTransform:"uppercase", letterSpacing:"0.08em", textShadow:"0 0 28px rgba(255,255,255,0.18)" }}>
                            {activeHeroMatch.teamA}
                          </span>
                        </div>

                        {/* VS / Score */}
                        <div className="col-span-1 flex flex-col items-center gap-3">
                          {activeHeroMatch.status === "Live" || activeHeroMatch.status === "Completed" ? (
                            <motion.div animate={{ scale:[1,1.05,1] }} transition={{ repeat:Infinity, duration:2.5 }}
                              style={{ fontFamily:"'Montserrat',sans-serif", fontSize:"clamp(36px,5vw,56px)", fontWeight:900, color:"#2ae500", lineHeight:1, textShadow:"0 0 28px rgba(42,229,0,0.65),0 0 55px rgba(42,229,0,0.28)" }}>
                              {activeHeroMatch.scores?.home??0}:{activeHeroMatch.scores?.away??0}
                            </motion.div>
                          ) : (
                            <motion.div
                              animate={{ textShadow:["0 0 22px rgba(42,229,0,0.45)","0 0 55px rgba(42,229,0,0.88)","0 0 22px rgba(42,229,0,0.45)"] }}
                              transition={{ repeat:Infinity, duration:2.4 }}
                              style={{ fontFamily:"'Montserrat',sans-serif", fontSize:"clamp(42px,6vw,72px)", fontWeight:900, color:"#2ae500", lineHeight:1 }}>
                              VS
                            </motion.div>
                          )}
                          {(() => {
                            const formatted = formatMatchDateTime(activeHeroMatch.date);
                            return (
                              <div className="font-inter px-3 py-1.5 rounded-full" style={{ fontSize:"9px", fontWeight:700, color:"#7eb8ff", background:"rgba(26,111,255,0.15)", border:"1px solid rgba(26,111,255,0.35)", textTransform:"uppercase", letterSpacing:"0.15em" }}>
                                {formatted.time} {formatted.timezone} · {formatted.date}
                              </div>
                            );
                          })()}
                        </div>

                        {/* Team B */}
                        <div className="col-span-3 flex flex-col items-center gap-4">
                          <motion.div whileHover={{ scale:1.08 }} transition={{ type:"spring",stiffness:280,damping:16 }} className="relative">
                            <div className="absolute inset-0 rounded-full" style={{ background:"radial-gradient(circle,rgba(26,111,255,0.35) 0%,transparent 65%)", transform:"scale(1.5)", filter:"blur(16px)" }}/>
                            <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full flex items-center justify-center"
                              style={{ background:"linear-gradient(135deg,rgba(18,45,105,0.96),rgba(6,18,52,0.98))", border:"2px solid rgba(26,111,255,0.45)", boxShadow:"0 0 35px rgba(26,111,255,0.28),inset 0 0 25px rgba(26,111,255,0.07)" }}>
                              {activeHeroMatch.teamBCrest
                                ? <img className="w-16 h-16 md:w-24 md:h-24 object-contain p-2" src={activeHeroMatch.teamBCrest} alt={activeHeroMatch.teamB}/>
                                : <span style={{ fontFamily:"'Montserrat',sans-serif", fontWeight:900, fontSize:"22px", color:"#4da3ff" }}>{activeHeroMatch.teamB.slice(0,3).toUpperCase()}</span>}
                            </div>
                          </motion.div>
                          <span style={{ fontFamily:"'Montserrat',sans-serif", fontSize:"clamp(18px,3vw,26px)", fontWeight:900, color:"white", textTransform:"uppercase", letterSpacing:"0.08em", textShadow:"0 0 28px rgba(255,255,255,0.18)" }}>
                            {activeHeroMatch.teamB}
                          </span>
                        </div>
                      </div>

                      {/* Vote Bar */}
                      <div className="mt-8 space-y-3 max-w-xl mx-auto">
                        <div className="flex justify-between font-inter" style={{ fontSize:"10px" }}>
                          <span style={{ color:"#4da3ff", fontWeight:600, display:"flex", alignItems:"center", gap:"6px" }}>
                            <motion.span animate={{ opacity:[1,0.3,1] }} transition={{ repeat:Infinity, duration:1.5 }}
                              style={{ width:"6px", height:"6px", borderRadius:"50%", backgroundColor:"#4da3ff", display:"inline-block" }}/>
                            {activeHeroMatch.teamA} (<AnimatedNumber value={heroVotes.teamA}/>%)
                          </span>
                          <span style={{ color:"#475569", fontWeight:500, display:"flex", alignItems:"center", gap:"6px" }}>
                            <span style={{ width:"6px", height:"6px", borderRadius:"50%", backgroundColor:"#334155", display:"inline-block" }}/>
                            Draw (<AnimatedNumber value={heroVotes.draw}/>%)
                          </span>
                          <span style={{ color:"#2ae500", fontWeight:600, display:"flex", alignItems:"center", gap:"6px" }}>
                            <motion.span animate={{ opacity:[1,0.3,1] }} transition={{ repeat:Infinity, duration:1.5, delay:0.55 }}
                              style={{ width:"6px", height:"6px", borderRadius:"50%", backgroundColor:"#2ae500", display:"inline-block" }}/>
                            {activeHeroMatch.teamB} (<AnimatedNumber value={heroVotes.teamB}/>%)
                          </span>
                        </div>
                        <div className="w-full rounded-full overflow-hidden flex" style={{ height:"10px", background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.06)" }}>
                          <motion.div initial={{ width:0 }} animate={{ width:`${heroVotes.teamA}%` }} transition={{ duration:1.4, ease:[0.22,1,0.36,1], delay:0.6 }}
                            style={{ height:"100%", background:"linear-gradient(90deg,#003bb5,#4da3ff)", borderRadius:"9999px 0 0 9999px" }}/>
                          <motion.div initial={{ width:0 }} animate={{ width:`${heroVotes.draw}%` }} transition={{ duration:1.4, ease:[0.22,1,0.36,1], delay:0.85 }}
                            style={{ height:"100%", background:"linear-gradient(90deg,#1e293b,#334155)" }}/>
                          <motion.div initial={{ width:0 }} animate={{ width:`${heroVotes.teamB}%` }} transition={{ duration:1.4, ease:[0.22,1,0.36,1], delay:1.1 }}
                            style={{ height:"100%", background:"linear-gradient(90deg,#14600a,#2ae500)", borderRadius:"0 9999px 9999px 0" }}/>
                        </div>
                      </div>

                      {/* CTA */}
                      <div className="mt-8 flex justify-center">
                        {isMatchLocked(activeHeroMatch) ? (
                          <div className="font-inter px-10 py-3.5 rounded-xl" style={{ fontSize:"10px", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.2em", color:"#475569", background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.07)" }}>
                            {activeHeroMatch.status === "Completed" ? "🏆 Match Closed" : "🔒 Forecast Locked"}
                          </div>
                        ) : (
                          <motion.a href="#predict"
                            whileHover={{ scale:1.06 }} whileTap={{ scale:0.94 }}
                            transition={{ type:"spring", stiffness:400, damping:20 }}
                            onClick={(e)=>{
                              e.preventDefault();
                              handleSelectMatch(activeHeroMatch);
                              const el=document.getElementById("predict");
                              if(el) el.scrollIntoView({behavior:"smooth"});
                            }}
                            className="btn-vote inline-flex items-center justify-center gap-3 cursor-pointer rounded-xl"
                            style={{ fontFamily:"'Montserrat',sans-serif", fontWeight:900, fontSize:"13px", letterSpacing:"0.28em", textTransform:"uppercase", padding:"16px 64px", background:"linear-gradient(135deg,#2ae500 0%,#1db800 100%)", color:"#012806", boxShadow:"0 0 38px rgba(42,229,0,0.55),0 0 75px rgba(42,229,0,0.2),inset 0 1px 0 rgba(255,255,255,0.25)", border:"1px solid rgba(100,255,60,0.32)" }}>
                            <span className="material-symbols-outlined" style={{ fontSize:"16px", fontVariationSettings:'"FILL" 1' }}>sports_soccer</span>
                            VOTE NOW
                          </motion.a>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Carousel Indicators */}
                {tomorrowUpcomingMatches.length > 1 && (
                  <div className="flex justify-center gap-1.5 mt-6 relative z-10">
                    {tomorrowUpcomingMatches.map((_, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setCurrentHeroIndex(idx)}
                        className="w-1.5 h-1.5 rounded-full transition-all"
                        style={{
                          background: currentHeroIndex === idx ? "#4da3ff" : "rgba(255,255,255,0.15)",
                          boxShadow: currentHeroIndex === idx ? "0 0 8px #4da3ff" : "none",
                          width: currentHeroIndex === idx ? "12px" : "6px"
                        }}
                      />
                    ))}
                  </div>
                )}
              </motion.div>
            </motion.div>

          
          
          </section>
        )}

        {/* ═══════════════════════════
            PREDICTIONS HUB
        ═══════════════════════════ */}
        <section className="py-10 px-4 sm:px-6 md:px-10 lg:px-16 relative" id="predict" style={{ background:"linear-gradient(180deg,#040d1a 0%,#060f20 100%)" }}>
          <div className="max-w-7xl mx-auto space-y-8 md:space-y-12">

            <ScrollReveal>
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-6"
  style={{ borderBottom:"1px solid rgba(26,111,255,0.1)" }}>
                <div>
                  <h2 style={{ fontFamily:"'Montserrat',sans-serif", fontSize:"clamp(26px,4vw,38px)", fontWeight:900, color:"white", textTransform:"uppercase", fontStyle:"italic" }}>
                    YOUR <span className="green-gradient-text">PREDICTION</span>
                  </h2>
                  <p className="font-inter mt-2 max-w-2xl leading-relaxed" style={{ fontSize:"12px", color:"#475569" }}>
                    Configure your tactical forecast. Top predictors earn global rank and exclusive digital collectibles.
                  </p>
                </div>
                {selectedMatch && (
                  <div className="font-inter flex items-center gap-1.5 pb-1" style={{ fontSize:"10px", color:"#4da3ff", textTransform:"uppercase", letterSpacing:"0.2em" }}>
                    <span style={{ width:"4px", height:"4px", borderRadius:"50%", backgroundColor:"#4da3ff", display:"inline-block" }}/>
                    PHASE: {selectedMatch.stage?.toUpperCase() || "GROUP STAGE"} | MATCH #{
                      matches.findIndex(m => m._id === selectedMatch._id) !== -1
                        ? matches.findIndex(m => m._id === selectedMatch._id) + 1
                        : (selectedMatch.matchNumber || selectedMatch.apiMatchId || "42")
                    }
                  </div>
                )}
              </div>
            </ScrollReveal>

            <div className="grid lg:grid-cols-3 gap-8 items-start" id="predict-panel">

              {/* Predictor Slip */}
              <ScrollReveal delay={0.05} className="lg:col-span-2">
                <div className="glass-card rounded-2xl sm:rounded-[2rem] p-4 sm:p-6 md:p-8 space-y-6 md:space-y-8 relative overflow-hidden">

                  <AnimatePresence>
                    {!isAuthenticated && (
                      <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
                        className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center p-6 rounded-2xl sm:rounded-[2rem]"
                        style={{ background:"rgba(4,13,26,0.85)", backdropFilter:"blur(20px)" }}>
                        <motion.div animate={{ y:[0,-6,0] }} transition={{ repeat:Infinity, duration:3 }}
                          className="w-14 h-14 rounded-full flex items-center justify-center mb-5"
                          style={{ border:"1px solid rgba(26,111,255,0.2)", background:"rgba(26,111,255,0.08)" }}>
                          <span className="material-symbols-outlined text-white" style={{ fontSize:"24px" }}>lock</span>
                        </motion.div>
                        <h3 style={{ fontFamily:"'Montserrat',sans-serif", fontWeight:800, fontSize:"22px", color:"white", marginBottom:"8px", textTransform:"uppercase", fontStyle:"italic" }}>Access Denied</h3>
                        <p className="font-inter max-w-sm mb-6 leading-relaxed" style={{ fontSize:"12px", color:"#475569" }}>Sign in to access the Global Prediction Hub.</p>
                        <motion.a whileHover={{ scale:1.05 }} whileTap={{ scale:0.95 }}
                          href={`/login?redirect=${encodeURIComponent(window.location.pathname+window.location.search)}`}
                          className="font-inter rounded-full" style={{ padding:"12px 32px", background:"linear-gradient(135deg,#1a6fff,#4da3ff)", color:"#040d1a", fontWeight:700, fontSize:"11px", textTransform:"uppercase", letterSpacing:"0.2em", boxShadow:"0 0 25px rgba(26,111,255,0.4)", textDecoration:"none", display:"inline-block" }}>
                          Sign In Now
                        </motion.a>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {selectedMatch ? (
                    <div className="space-y-8">
                      <AnimatePresence>
                        {isMatchLocked(selectedMatch) && (
                          <motion.div initial={{ opacity:0, height:0 }} animate={{ opacity:1, height:"auto" }} exit={{ opacity:0, height:0 }}
                            className="p-4 rounded-xl flex items-center gap-2 font-inter overflow-hidden" style={{ background:"rgba(239,68,68,0.06)", border:"1px solid rgba(239,68,68,0.18)", color:"#f87171", fontSize:"12px" }}>
                            <span className="material-symbols-outlined flex-shrink-0" style={{ fontSize:"16px" }}>error</span>
                            Predictions are closed for this fixture. Match has started or completed.
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Upcoming Matches Quick Select / Next Match Option */}
                      {tomorrowUpcomingMatches.length > 0 && (
                        <div className="space-y-3 p-4 rounded-2xl" style={{ background: "rgba(26,111,255,0.04)", border: "1px solid rgba(26,111,255,0.1)" }}>
                          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                            <span className="font-inter text-[9px] uppercase tracking-widest font-bold" style={{ color: "#4da3ff" }}>
                              Matches for {tomorrowDateStr}
                            </span>
        
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {tomorrowUpcomingMatches.map(m => {
                              const isSelected = selectedMatch && selectedMatch._id === m._id;
                              const formatted = formatMatchDateTime(m.date);
                              return (
                                <button
                                  key={m._id}
                                  type="button"
                                  onClick={() => handleSelectMatch(m)}
                                  className={`w-full min-w-0 px-4 py-2.5 rounded-xl font-inter text-[10px] font-bold uppercase tracking-wider cursor-pointer border transition-all flex items-center justify-between gap-2.5 ${
                                    isSelected
                                      ? "bg-[rgba(26,111,255,0.18)] border-[rgba(26,111,255,0.45)] text-[#7eb8ff] shadow-[0_0_12px_rgba(26,111,255,0.15)]"
                                      : "bg-[rgba(6,18,42,0.4)] border-[rgba(26,111,255,0.08)] text-[#64748b] hover:bg-[rgba(26,111,255,0.05)] hover:text-[#94a3b8] hover:border-[rgba(26,111,255,0.2)]"
                                  }`}
                                >
                                  <span className="truncate flex-1 min-w-0 text-left">{m.teamA} vs {m.teamB}</span>
                                  <span style={{ color: isSelected ? "rgba(126,184,255,0.7)" : "rgba(100,116,139,0.5)", fontSize: "9px" }} className="flex-shrink-0">({formatted.time})</span>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* Team Selectors */}
                      <div className="flex flex-col lg:flex-row items-stretch lg:items-start gap-4 w-full min-w-0">

                        {/* Team A Selector */}
                        <div className="w-full flex-1 flex flex-col gap-2 min-w-0">
                          <label className="font-inter" style={{ fontSize:"10px", color:"#4da3ff", textTransform:"uppercase", letterSpacing:"0.18em", fontWeight:600 }}>Select Team A</label>
                          <div className="relative">
                            <motion.button type="button" whileTap={!isMatchLocked(selectedMatch)?{scale:0.98}:{}}
                              onClick={() => { if(!isMatchLocked(selectedMatch)) setPredictionChoice("TeamA"); }}
                              className="w-full p-4 sm:p-5 rounded-2xl text-left flex items-center justify-between cursor-pointer transition-all"
                              style={{ background:predictionChoice==="TeamA"?"rgba(26,111,255,0.12)":"rgba(5,15,38,0.7)", border:`1px solid ${predictionChoice==="TeamA"?"rgba(26,111,255,0.5)":"rgba(26,111,255,0.1)"}`, opacity:isMatchLocked(selectedMatch)?0.5:1, cursor:isMatchLocked(selectedMatch)?"not-allowed":"pointer" }}>
                              <div className="flex items-center gap-2.5 sm:gap-4 min-w-0">
                                <div style={{ width:"20px", height:"20px", borderRadius:"50%", border:`2px solid ${predictionChoice==="TeamA"?"#4da3ff":"#334155"}`, display:"flex", alignItems:"center", justifyContent:"center", transition:"all 0.2s", flexShrink:0 }}>
                                  <AnimatePresence>{predictionChoice==="TeamA"&&<motion.div initial={{scale:0}} animate={{scale:1}} exit={{scale:0}} style={{ width:"10px", height:"10px", borderRadius:"50%", backgroundColor:"#4da3ff" }}/>}</AnimatePresence>
                                </div>
                                <div style={{ width:"32px", height:"32px", borderRadius:"50%", overflow:"hidden", border:"1px solid rgba(26,111,255,0.2)", background:"rgba(0,0,0,0.3)", display:"flex", alignItems:"center", justifyContent:"center", padding:"2px", flexShrink:0 }}>
                                  {selectedMatch.teamACrest?<img src={selectedMatch.teamACrest} alt="" style={{ width:"100%", height:"100%", objectFit:"cover" }}/>:<span className="font-inter" style={{ fontSize:"9px", color:"rgba(255,255,255,0.5)" }}>{selectedMatch.teamA.slice(0,3).toUpperCase()}</span>}
                                </div>
                                <span className="truncate min-w-0 flex-1"
                                  style={{ fontFamily:"'Roboto',sans-serif", fontWeight:700, fontSize:"13px", color:"white", textTransform:"uppercase" }}>
                                  {selectedMatch.teamA}
                                </span>
                              </div>
                              <div onClick={(e)=>{e.stopPropagation();setShowTeamADropdown(!showTeamADropdown);setShowTeamBDropdown(false);}} style={{ padding:"6px", borderRadius:"8px", cursor:"pointer" }} className="hover:bg-white/10 transition-colors">
                                <motion.span animate={{ rotate:showTeamADropdown?180:0 }} transition={{ duration:0.2 }} className="material-symbols-outlined block" style={{ fontSize:"18px", color:"#4da3ff" }}>expand_more</motion.span>
                              </div>
                            </motion.button>
                            <AnimatePresence>
                              {showTeamADropdown && (
                                <motion.div initial={{opacity:0,y:-8,scale:0.97}} animate={{opacity:1,y:0,scale:1}} exit={{opacity:0,y:-8,scale:0.97}} transition={{duration:0.18}}
                                  className="absolute left-0 right-0 mt-2 rounded-2xl shadow-2xl z-30 max-h-64 overflow-y-auto custom-scrollbar"
                                  style={{ background:"#060f20", border:"1px solid rgba(26,111,255,0.2)" }}>
                                  <div className="font-inter px-4 py-2 border-b" style={{ fontSize:"9px", color:"#4da3ff", textTransform:"uppercase", letterSpacing:"0.2em", borderColor:"rgba(26,111,255,0.1)" }}>Switch Match</div>
                                  {tomorrowUpcomingMatches.length === 0 ? (
                                    <div className="font-inter px-4 py-6 text-center text-xs" style={{ color: "#475569" }}>
                                      No upcoming matches.
                                    </div>
                                  ) : (
                                    tomorrowUpcomingMatches.map(m=>(
                                      <button key={m._id} type="button" onClick={()=>{handleSelectMatch(m);setShowTeamADropdown(false);}}
                                        className="w-full px-4 py-3 text-left flex items-center gap-3 border-b last:border-b-0 hover:bg-white/5 transition"
                                        style={{ borderColor:"rgba(255,255,255,0.03)", opacity:isMatchLocked(m)?0.5:1 }}>
                                        <div style={{ width:"20px", height:"20px", borderRadius:"50%", overflow:"hidden", background:"rgba(0,0,0,0.3)", display:"flex", alignItems:"center", justifyContent:"center", padding:"2px", flexShrink:0 }}>
                                          {m.teamACrest?<img src={m.teamACrest} alt="" style={{ width:"100%", height:"100%", objectFit:"cover" }}/>:<span className="font-inter" style={{ fontSize:"8px", color:"rgba(255,255,255,0.4)" }}>{m.teamA.slice(0,2)}</span>}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                          <div style={{ fontFamily:"'Roboto',sans-serif", fontWeight:700, fontSize:"12px", color:"white", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{m.teamA} vs {m.teamB}</div>
                                          <div className="font-inter" style={{ fontSize:"8px", color:"#4da3ff" }}>{m.kickoffTime} · {new Date(m.date).toLocaleDateString([],{month:"short",day:"numeric"})}</div>
                                        </div>
                                        <span className="font-inter flex-shrink-0" style={{ fontSize:"8px", textTransform:"uppercase", letterSpacing:"0.12em", fontWeight:700, color:isMatchLocked(m)?"#ef4444":"#2ae500" }}>
                                          {isMatchLocked(m)?(m.status==="Completed"?"Ended":"Locked"):"Open"}
                                        </span>
                                      </button>
                                    ))
                                  )}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>

                        {/* Draw */}
                        <div className="flex items-center justify-center z-10 py-2 lg:py-0 lg:mt-6">
                          <motion.button type="button" whileHover={!isMatchLocked(selectedMatch)?{scale:1.1}:{}} whileTap={!isMatchLocked(selectedMatch)?{scale:0.9}:{}}
                            onClick={()=>{if(!isMatchLocked(selectedMatch)) setPredictionChoice("Draw");}}
                            className="w-12 h-12 rounded-full flex items-center justify-center transition-all cursor-pointer"
                            style={{ background:predictionChoice==="Draw"?"rgba(26,111,255,0.15)":"rgba(5,15,38,0.8)", border:`1px solid ${predictionChoice==="Draw"?"rgba(26,111,255,0.5)":"rgba(26,111,255,0.12)"}`, opacity:isMatchLocked(selectedMatch)?0.5:1 }}>
                            {!isAuthenticated||isMatchLocked(selectedMatch)
                              ? <span className="material-symbols-outlined" style={{ fontSize:"16px", color:"#4da3ff" }}>lock</span>
                              : <span className="font-inter" style={{ fontSize:"11px", fontWeight:900, color:predictionChoice==="Draw"?"#4da3ff":"#475569" }}>VS</span>}
                          </motion.button>
                        </div>

                        {/* Team B Selector */}
                        <div className="w-full flex-1 flex flex-col gap-2 min-w-0">
                          <label className="font-inter" style={{ fontSize:"10px", color:"#4da3ff", textTransform:"uppercase", letterSpacing:"0.18em", fontWeight:600 }}>Select Team B</label>
                          <div className="relative">
                            <motion.button type="button" whileTap={!isMatchLocked(selectedMatch)?{scale:0.98}:{}}
                              onClick={() => { if(!isMatchLocked(selectedMatch)) setPredictionChoice("TeamB"); }}
                              className="w-full p-4 sm:p-5 rounded-2xl text-left flex items-center justify-between cursor-pointer transition-all"
                              style={{ background:predictionChoice==="TeamB"?"rgba(26,111,255,0.12)":"rgba(5,15,38,0.7)", border:`1px solid ${predictionChoice==="TeamB"?"rgba(26,111,255,0.5)":"rgba(26,111,255,0.1)"}`, opacity:isMatchLocked(selectedMatch)?0.5:1, cursor:isMatchLocked(selectedMatch)?"not-allowed":"pointer" }}>
                              <div className="flex items-center gap-2.5 sm:gap-4 min-w-0">
                                <div style={{ width:"20px", height:"20px", borderRadius:"50%", border:`2px solid ${predictionChoice==="TeamB"?"#4da3ff":"#334155"}`, display:"flex", alignItems:"center", justifyContent:"center", transition:"all 0.2s", flexShrink:0 }}>
                                  <AnimatePresence>{predictionChoice==="TeamB"&&<motion.div initial={{scale:0}} animate={{scale:1}} exit={{scale:0}} style={{ width:"10px", height:"10px", borderRadius:"50%", backgroundColor:"#4da3ff" }}/>}</AnimatePresence>
                                </div>
                                <div style={{ width:"32px", height:"32px", borderRadius:"50%", overflow:"hidden", border:"1px solid rgba(26,111,255,0.2)", background:"rgba(0,0,0,0.3)", display:"flex", alignItems:"center", justifyContent:"center", padding:"2px", flexShrink:0 }}>
                                  {selectedMatch.teamBCrest?<img src={selectedMatch.teamBCrest} alt="" style={{ width:"100%", height:"100%", objectFit:"cover" }}/>:<span className="font-inter" style={{ fontSize:"9px", color:"rgba(255,255,255,0.5)" }}>{selectedMatch.teamB.slice(0,3).toUpperCase()}</span>}
                                </div>
                                <span className="truncate min-w-0 flex-1"
  style={{ fontFamily:"'Roboto',sans-serif", fontWeight:700, fontSize:"13px", color:"white", textTransform:"uppercase" }}>
  {selectedMatch.teamB}
</span>
                              </div>
                              <div onClick={(e)=>{e.stopPropagation();setShowTeamBDropdown(!showTeamBDropdown);setShowTeamADropdown(false);}} style={{ padding:"6px", borderRadius:"8px", cursor:"pointer" }} className="hover:bg-white/10 transition-colors">
                                <motion.span animate={{ rotate:showTeamBDropdown?180:0 }} transition={{ duration:0.2 }} className="material-symbols-outlined block" style={{ fontSize:"18px", color:"#4da3ff" }}>expand_more</motion.span>
                              </div>
                            </motion.button>
                            <AnimatePresence>
                              {showTeamBDropdown && (
                                <motion.div initial={{opacity:0,y:-8,scale:0.97}} animate={{opacity:1,y:0,scale:1}} exit={{opacity:0,y:-8,scale:0.97}} transition={{duration:0.18}}
                                  className="absolute left-0 right-0 mt-2 rounded-2xl shadow-2xl z-30 max-h-64 overflow-y-auto custom-scrollbar"
                                  style={{ background:"#060f20", border:"1px solid rgba(26,111,255,0.2)" }}>
                                  <div className="font-inter px-4 py-2 border-b" style={{ fontSize:"9px", color:"#4da3ff", textTransform:"uppercase", letterSpacing:"0.2em", borderColor:"rgba(26,111,255,0.1)" }}>Switch Match</div>
                                  {tomorrowUpcomingMatches.length === 0 ? (
                                    <div className="font-inter px-4 py-6 text-center text-xs" style={{ color: "#475569" }}>
                                      No upcoming matches.
                                    </div>
                                  ) : (
                                    tomorrowUpcomingMatches.map(m=>(
                                      <button key={m._id} type="button" onClick={()=>{handleSelectMatch(m);setShowTeamBDropdown(false);}}
                                        className="w-full px-4 py-3 text-left flex items-center gap-3 border-b last:border-b-0 hover:bg-white/5 transition"
                                        style={{ borderColor:"rgba(255,255,255,0.03)", opacity:isMatchLocked(m)?0.5:1 }}>
                                        <div style={{ width:"20px", height:"20px", borderRadius:"50%", overflow:"hidden", background:"rgba(0,0,0,0.3)", display:"flex", alignItems:"center", justifyContent:"center", padding:"2px", flexShrink:0 }}>
                                          {m.teamBCrest?<img src={m.teamBCrest} alt="" style={{ width:"100%", height:"100%", objectFit:"cover" }}/>:<span className="font-inter" style={{ fontSize:"8px", color:"rgba(255,255,255,0.4)" }}>{m.teamB.slice(0,2)}</span>}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                          <div style={{ fontFamily:"'Roboto',sans-serif", fontWeight:700, fontSize:"12px", color:"white", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{m.teamA} vs {m.teamB}</div>
                                          <div className="font-inter" style={{ fontSize:"8px", color:"#4da3ff" }}>{m.kickoffTime} · {new Date(m.date).toLocaleDateString([],{month:"short",day:"numeric"})}</div>
                                        </div>
                                        <span className="font-inter flex-shrink-0" style={{ fontSize:"8px", textTransform:"uppercase", letterSpacing:"0.12em", fontWeight:700, color:isMatchLocked(m)?"#ef4444":"#2ae500" }}>
                                          {isMatchLocked(m)?(m.status==="Completed"?"Ended":"Locked"):"Open"}
                                        </span>
                                      </button>
                                    ))
                                  )}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>
                      </div>

                      {/* Momentum */}
                      <div className="space-y-4 pt-2">
                        <label className="font-inter block leading-normal break-words" style={{ fontSize:"10px", color:"#4da3ff", textTransform:"uppercase", letterSpacing:"0.18em", fontWeight:600 }}>
                          Match Momentum — Expected Time of First Goal
                        </label>
                        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                              {["0'-15'","16'-30'","31'-45'","46'-60'","61'-75'","76'-90'"].map(slot=>(
                                <motion.button key={slot} type="button" disabled={isMatchLocked(selectedMatch)}
                                  whileHover={!isMatchLocked(selectedMatch)?{y:-2}:{}} whileTap={!isMatchLocked(selectedMatch)?{scale:0.94}:{}}
                                  onClick={()=>setMomentumChoice(slot)}
                                  className="font-inter rounded-xl transition-all text-center"
                                  style={{ padding:"10px 4px", fontSize:"11px", fontWeight:600,
                                    background:momentumChoice===slot?"rgba(26,111,255,0.15)":"rgba(5,15,38,0.6)",
                                    border:`1px solid ${momentumChoice===slot?"rgba(26,111,255,0.4)":"rgba(26,111,255,0.1)"}`,
                                    color:momentumChoice===slot?"#7eb8ff":"#475569" }}>
                                  {slot}
                                </motion.button>
                              ))}
                            </div>
                      </div>

                      {/* Submit */}
                      <div className="pt-6" style={{ borderTop:"1px solid rgba(26,111,255,0.08)" }}>
                        <motion.button type="button" disabled={isMatchLocked(selectedMatch)||submitting}
                          whileHover={!isMatchLocked(selectedMatch)&&!submitting?{scale:1.02,y:-1}:{}}
                          whileTap={!isMatchLocked(selectedMatch)&&!submitting?{scale:0.97}:{}}
                          onClick={handleSubmitPrediction}
                          className="relative w-full flex items-center justify-center gap-2 overflow-hidden cursor-pointer rounded-2xl font-display-xl transition-all duration-300 py-3.5 sm:py-4 px-4"
                          style={{ fontSize:"clamp(10px, 2.5vw, 12px)", fontWeight:900, textTransform:"uppercase", letterSpacing:"0.15em", background:isMatchLocked(selectedMatch)?"rgba(5,15,38,0.6)":"rgba(3,20,8,0.85)", border:`1px solid ${isMatchLocked(selectedMatch)?"rgba(255,255,255,0.05)":"rgba(42,229,0,0.28)"}`, color:isMatchLocked(selectedMatch)?"#334155":"#2ae500", boxShadow:isMatchLocked(selectedMatch)?"none":"0 0 22px rgba(42,229,0,0.1)", opacity:isMatchLocked(selectedMatch)?0.5:1 }}>
                          {submitting ? (
                            <><motion.div animate={{rotate:360}} transition={{repeat:Infinity,duration:0.8,ease:"linear"}} style={{ width:"14px",height:"14px",borderRadius:"50%",borderTop:"2px solid #2ae500",borderRight:"2px solid #2ae500",borderBottom:"2px solid transparent",borderLeft:"2px solid transparent" }}/> PUBLISHING FORECAST...</>
                          ) : justSubmitted ? (
                            <motion.span initial={{scale:0.8,opacity:0}} animate={{scale:1,opacity:1}} className="flex items-center gap-2">
                              <span className="material-symbols-outlined" style={{ fontSize:"14px", fontVariationSettings:'"FILL" 1' }}>check_circle</span>
                              PREDICTION RECORDED!
                            </motion.span>
                          ) : (
                            <><span className="material-symbols-outlined" style={{ fontSize:"14px", fontVariationSettings:'"FILL" 1' }}></span> PUBLISH PREDICTION </>
                          )}
                        </motion.button>
                        <AnimatePresence>
                          {getExistingPrediction(selectedMatch._id) && (
                            <motion.div initial={{opacity:0,y:6}} animate={{opacity:1,y:0}} exit={{opacity:0}}
                              className="mt-3 flex items-center justify-center gap-2 font-inter" style={{ fontSize:"10px", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.16em", color:"#2ae500" }}>
                              <span className="material-symbols-outlined" style={{ fontSize:"12px", fontVariationSettings:'"FILL" 1' }}>check_circle</span>
                              Prediction Locked 
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-16 font-roboto italic" style={{ color:"#334155" }}>Select a fixture to place forecasts.</div>
                  )}
                </div>
              </ScrollReveal>

              {/* Leaderboard Widget */}
              <ScrollReveal delay={0.12}>
                <div className="glass-card rounded-[2rem] p-6 space-y-6 relative overflow-hidden">
                  <div className="flex items-center justify-between pb-4" style={{ borderBottom:"1px solid rgba(26,111,255,0.1)" }}>
                    <div className="flex items-center gap-2">
                      <h3 style={{ fontFamily:"'Montserrat',sans-serif", fontSize:"14px", fontWeight:900, color:"white", textTransform:"uppercase", fontStyle:"italic", display:"flex", alignItems:"center", gap:"6px" }}>
                        <span className="material-symbols-outlined" style={{ fontSize:"18px", color:"#fbbf24", fontVariationSettings:'"FILL" 1' }}>emoji_events</span>
                        Top Predictors
                      </h3>
                      <motion.span animate={{opacity:[1,0.5,1]}} transition={{repeat:Infinity,duration:2}}
                        className="inline-flex items-center gap-1 font-inter"
                        style={{ padding:"2px 6px", borderRadius:"4px", background:"rgba(42,229,0,0.1)", border:"1px solid rgba(42,229,0,0.2)", color:"#2ae500", fontSize:"8px", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.15em" }}>
                        <span style={{ width:"4px",height:"4px",borderRadius:"50%",backgroundColor:"#2ae500",display:"inline-block" }}/>Live
                      </motion.span>
                    </div>
                    <div className="flex gap-1 p-0.5 rounded-lg" style={{ background:"rgba(0,0,0,0.35)", border:"1px solid rgba(26,111,255,0.1)" }}>
                      {["accuracy","votes"].map(t=>(
                        <button key={t} onClick={()=>setLeaderboardSubTab(t)}
                          className="font-inter rounded transition-all"
                          style={{ padding:"4px 10px", fontSize:"8px", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.12em", background:leaderboardSubTab===t?"rgba(26,111,255,0.2)":"transparent", color:leaderboardSubTab===t?"#7eb8ff":"#475569" }}>
                          {t==="accuracy"?"Acc":"Act"}
                        </button>
                      ))}
                    </div>
                  </div>
                  <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-2.5">
                    {currentLeaderboard.slice(0,5).map((user,idx)=>(
                      <motion.div key={user._id||idx} variants={childItem} whileHover={{x:3}}
                        className="flex items-center justify-between p-4 rounded-2xl transition-all cursor-default"
                        style={{ background:"rgba(5,15,38,0.65)", border:"1px solid rgba(26,111,255,0.08)" }}>
                        <div className="flex items-center gap-4">
                          <span style={{ fontFamily:"'Montserrat',sans-serif", fontSize:"18px", fontWeight:900, fontStyle:"italic", width:"16px", textAlign:"center", color:idx===0?"#fbbf24":idx===1?"#94a3b8":idx===2?"#b45309":"#334155" }}>{idx+1}</span>
                          <div style={{ width:"40px",height:"40px",borderRadius:"50%",overflow:"hidden",border:`1px solid ${idx===0?"rgba(251,191,36,0.3)":"rgba(26,111,255,0.15)"}`, background:"#060f20",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Roboto',sans-serif",fontWeight:700,fontSize:"13px",color:"white",boxShadow:idx===0?"0 0 12px rgba(251,191,36,0.12)":"none" }}>
                            {user.avatar?<img src={user.avatar} alt="" style={{ width:"100%",height:"100%",objectFit:"cover" }}/>:user.name.slice(0,2).toUpperCase()}
                          </div>
                          <div>
                            <div style={{ fontFamily:"'Roboto',sans-serif",fontWeight:700,fontSize:"12px",color:"white",maxWidth:"100px",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap" }}>{user.name}</div>
                            <div className="font-inter mt-0.5" style={{ fontSize:"9px",color:"#334155",textTransform:"uppercase",letterSpacing:"0.12em" }}>{user.role||"Forecaster"}</div>
                          </div>
                        </div>
                        <div style={{ fontFamily:"'Montserrat',sans-serif",fontSize:"16px",fontWeight:900,color:"#4da3ff" }}>{isAccuracy?user.fifaPoints||0:user.votesCount||0}</div>
                      </motion.div>
                    ))}
                    {currentLeaderboard.length===0&&<div className="text-center py-10 italic" style={{ fontFamily:"'Roboto',sans-serif",color:"#334155",fontSize:"12px" }}>No records available.</div>}
                  </motion.div>
                  <motion.button whileHover={{scale:1.02}} whileTap={{scale:0.97}}
                    onClick={()=>{ const el=document.getElementById("ranks-panel"); if(el) el.scrollIntoView({behavior:"smooth"}); setActiveTab("leaderboard"); }}
                    className="w-full rounded-xl font-inter flex items-center justify-center gap-2 transition duration-300"
                    style={{ padding:"14px",border:"1px solid rgba(26,111,255,0.2)",color:"#4da3ff",fontSize:"9px",fontWeight:600,textTransform:"uppercase",letterSpacing:"0.2em",background:"transparent" }}>
                    <span className="material-symbols-outlined" style={{ fontSize:"14px" }}>leaderboard</span>
                    VIEW FULL LEADERBOARD
                  </motion.button>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════
            RANKINGS & FIXTURES
        ═══════════════════════════ */}
        <section className="py-24 px-4 md:px-12 relative" id="ranks-panel" style={{ background:"linear-gradient(180deg,#060f20 0%,#040d1a 100%)" }}>
          <div className="max-w-5xl mx-auto space-y-12">

            <ScrollReveal>
              <div className="flex justify-center">
                <div className="flex p-1 gap-1 rounded-2xl" style={{ background:"rgba(0,0,0,0.4)",border:"1px solid rgba(26,111,255,0.12)" }}>
                  {["leaderboard","matches"].map(tab=>(
                    <motion.button key={tab} type="button" onClick={()=>setActiveTab(tab)} whileTap={{scale:0.96}}
                      className="relative font-inter transition-all"
                      style={{ padding:"10px 24px",borderRadius:"12px",fontSize:"10px",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.15em",color:activeTab===tab?"#7eb8ff":"#475569" }}>
                      {activeTab===tab&&<motion.div layoutId="tab-pill" className="absolute inset-0 rounded-xl" transition={{type:"spring",stiffness:400,damping:30}} style={{ background:"rgba(26,111,255,0.18)",border:"1px solid rgba(26,111,255,0.25)" }}/>}
                      <span className="relative z-10 flex items-center gap-2">
                        <span className="material-symbols-outlined" style={{ fontSize:"14px" }}>{tab==="leaderboard"?"leaderboard":"calendar_month"}</span>
                        {tab==="leaderboard"?"Rankings":"Matches"}
                      </span>
                    </motion.button>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            <AnimatePresence mode="wait">
              {activeTab==="leaderboard" && (
                <motion.div key="lb" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-20}} transition={{duration:0.35}}
                  className="glass-card rounded-[2rem] overflow-hidden">
                  <div className="overflow-x-auto custom-scrollbar-h">
                    <table className="w-full text-left min-w-[600px] md:min-w-0">
                      <thead className="font-inter" style={{ background:"rgba(4,13,26,0.85)",borderBottom:"1px solid rgba(26,111,255,0.1)" }}>
                        <tr style={{ fontSize:"9px",color:"#475569",textTransform:"uppercase",letterSpacing:"0.18em" }}>
                          <th className="p-5">Position</th><th className="p-5">Forecaster</th><th className="p-5">Tier</th>
                          <th className="p-5 text-right">{isAccuracy?"Correct Predictions":"Total Votes Cast"}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentLeaderboard.map((user,idx)=>(
                          <motion.tr key={user._id||idx} initial={{opacity:0,x:-12}} animate={{opacity:1,x:0}} transition={{delay:idx*0.04}}
                            className="transition" style={{ borderBottom:"1px solid rgba(26,111,255,0.04)" }}>
                            <td className="p-5 font-inter font-bold" style={{ color:"#334155" }}>#{idx+1}</td>
                            <td className="p-5">
                              <div className="flex items-center gap-2" style={{ fontFamily:"'Roboto',sans-serif",fontWeight:700,fontSize:"12px",color:"white" }}>
                                {user.name}
                                {idx===0&&<span className="font-inter" style={{ padding:"2px 6px",borderRadius:"4px",background:"rgba(251,191,36,0.12)",color:"#fbbf24",fontSize:"7px",textTransform:"uppercase",letterSpacing:"0.12em",fontWeight:700 }}>Leader</span>}
                              </div>
                            </td>
                            <td className="p-5 font-inter" style={{ color:"#475569",textTransform:"uppercase",letterSpacing:"0.12em",fontSize:"12px" }}>{user.role||"User"}</td>
                            <td className="p-5 text-right font-inter font-bold" style={{ color:"#4da3ff",fontSize:"12px" }}>{isAccuracy?user.fifaPoints||0:user.votesCount||0}</td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}

              {activeTab==="matches" && (
                <motion.div key="matches" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-20}} transition={{duration:0.35}}
                  className="space-y-6 max-w-4xl mx-auto">
                  
                  {/* Control Bar: Tabs, Search, and Timezone Toggle */}
                  <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center p-4 rounded-2xl" style={{ background: "rgba(5,15,38,0.4)", border: "1px solid rgba(26,111,255,0.08)" }}>
                    
                    {/* Left: Status Filter Tab Buttons */}
                    <div className="flex gap-2 p-1 rounded-xl" style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(26,111,255,0.06)", alignSelf: "flex-start" }}>
                      {[
                        { id: "upcoming", label: "Upcoming & Live", icon: "sports_soccer" },
                        { id: "completed", label: "Results / Ended", icon: "emoji_events" }
                      ].map(tab => (
                        <button
                          key={tab.id}
                          type="button"
                          onClick={() => { setStatusFilter(tab.id); setSelectedDateFilter("All"); }}
                          className="flex items-center gap-1.5 px-4 py-2 rounded-lg font-inter text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer font-semibold"
                          style={{
                            background: statusFilter === tab.id ? "rgba(26,111,255,0.18)" : "transparent",
                            border: `1px solid ${statusFilter === tab.id ? "rgba(26,111,255,0.25)" : "transparent"}`,
                            color: statusFilter === tab.id ? "#7eb8ff" : "#475569"
                          }}
                        >
                          <span className="material-symbols-outlined text-xs" style={{ fontSize: "14px" }}>{tab.icon}</span>
                          {tab.label}
                          {tab.id === "upcoming" && matches.some(m => m.status === "Live") && (
                            <span className="w-1.5 h-1.5 rounded-full bg-[#ef4444] animate-pulse inline-block" />
                          )}
                        </button>
                      ))}
                    </div>

                    {/* Middle: Search Input */}
                    <div className="relative flex-1 max-w-sm">
                      <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-xs" style={{ color: "#475569", fontSize: "16px" }}>search</span>
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search teams..."
                        className="w-full pl-10 pr-4 py-2 rounded-xl font-inter text-xs text-white placeholder-slate-600 outline-none transition-all"
                        style={{
                          background: "rgba(0,0,0,0.2)",
                          border: "1px solid rgba(26,111,255,0.1)",
                          boxShadow: "inset 0 1px 2px rgba(0,0,0,0.3)"
                        }}
                        onFocus={(e) => e.target.style.borderColor = "rgba(26,111,255,0.35)"}
                        onBlur={(e) => e.target.style.borderColor = "rgba(26,111,255,0.1)"}
                      />
                      {searchQuery && (
                        <button
                          type="button"
                          onClick={() => setSearchQuery("")}
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 hover:text-white transition-colors"
                          style={{ color: "#475569", background: "none", border: "none" }}
                        >
                          <span className="material-symbols-outlined text-xs" style={{ fontSize: "16px" }}>close</span>
                        </button>
                      )}
                    </div>

                    {/* Right: Timezone Toggle Switch */}
                    <div className="flex items-center gap-2">
                      <span className="font-inter text-[9px] uppercase tracking-wider font-semibold" style={{ color: "#475569" }}>Timezone</span>
                      <div className="flex p-0.5 rounded-lg" style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(26,111,255,0.06)" }}>
                        {[
                          { id: true, label: "Local" },
                          { id: false, label: "UTC" }
                        ].map(tz => (
                          <button
                            key={tz.id.toString()}
                            type="button"
                            onClick={() => setUseLocalTimezone(tz.id)}
                            className="px-2.5 py-1 font-inter text-[9px] font-bold uppercase tracking-wider rounded transition-all cursor-pointer"
                            style={{
                              background: useLocalTimezone === tz.id ? "rgba(26,111,255,0.18)" : "transparent",
                              color: useLocalTimezone === tz.id ? "#7eb8ff" : "#475569"
                            }}
                          >
                            {tz.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Date Filter Carousel */}
                  {dateChips.length > 1 && (
                    <div className="space-y-2">
                      <div className="flex justify-between items-center px-1">
                        <span className="font-inter text-[9px] uppercase tracking-widest font-bold" style={{ color: "#475569" }}>Filter by Date</span>
                        {activeDateFilter !== "All" && (
                          <button
                            type="button"
                            onClick={() => setSelectedDateFilter("All")}
                            className="font-inter text-[9px] uppercase tracking-wider font-semibold cursor-pointer text-[#4da3ff] hover:text-[#7eb8ff] transition-colors"
                          >
                            Clear Filter
                          </button>
                        )}
                      </div>
                      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin custom-scrollbar-h" style={{ scrollbarWidth: "thin" }}>
                        {dateChips.map(date => {
                          const isActive = activeDateFilter === date;
                          return (
                            <button
                              key={date}
                              type="button"
                              onClick={() => setSelectedDateFilter(date)}
                              className={`flex-none px-4 py-2 rounded-xl font-inter text-[10px] font-bold uppercase tracking-wider cursor-pointer date-chip ${isActive ? "active" : ""}`}
                            >
                              {date === "All" ? "All Days" : date}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Matches List */}
                  <div className="space-y-3">
                    {finalFilteredMatches.map((match, i) => {
                      const isHero = heroMatch && heroMatch._id === match._id;
                      const hasPred = getExistingPrediction(match._id);
                      const formatted = formatMatchDateTime(match.date);
                      
                      return (
                        <motion.div
                          key={match._id}
                          initial={{ opacity: 0, y: 16 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.04 }}
                          onClick={() => handleSelectMatch(match)}
                          className={`fixture-card p-4 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-4 cursor-pointer ${isHero ? "is-hero" : ""}`}
                        >
                          {/* Time & Date Column */}
                          <div className="w-full md:w-auto min-w-[130px] text-center md:text-left md:pr-4 flex flex-col items-center md:items-start gap-0.5 border-b md:border-b-0 md:border-r border-[rgba(26,111,255,0.08)] pb-3 md:pb-0">
                            <div className="flex items-center gap-1">
                              <span className="material-symbols-outlined text-[12px]" style={{ color: "rgba(255,255,255,0.4)" }}>schedule</span>
                              <span style={{ fontFamily: "'Roboto',sans-serif", fontWeight: 700, fontSize: "14px", color: "white" }}>
                                {formatted.time}
                              </span>
                            </div>
                            <div className="flex items-center gap-1 font-inter" style={{ fontSize: "9px", color: "#4da3ff", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                              <span>{formatted.timezone}</span>
                              <span style={{ color: "rgba(26,111,255,0.3)" }}>•</span>
                              <span>{formatted.date}</span>
                            </div>
                          </div>

                          {/* Matchup Teams Row */}
                          <div className="flex-1 flex items-center justify-center md:justify-start gap-3 sm:gap-6 w-full">
                            
                            {/* Team A */}
                            <div className="flex items-center gap-2.5 sm:gap-3 justify-end flex-1 md:flex-initial min-w-[90px] sm:min-w-[120px]">
                              <span className="truncate max-w-[70px] sm:max-w-[95px]" style={{ fontFamily: "'Roboto',sans-serif", fontWeight: 700, fontSize: "12px", color: "white", textTransform: "uppercase" }}>
                                {match.teamA}
                              </span>
                              <div style={{ width: "30px", height: "30px", borderRadius: "50%", overflow: "hidden", border: "1.5px solid rgba(26,111,255,0.25)", background: "rgba(0,0,0,0.35)", display: "flex", alignItems: "center", justifyContent: "center", padding: "3px", boxShadow: "0 4px 10px rgba(0,0,0,0.3)" }}>
                                {match.teamACrest ? (
                                  <img src={match.teamACrest} alt="" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                                ) : (
                                  <span className="font-inter" style={{ fontSize: "9px", color: "rgba(255,255,255,0.4)", fontWeight: 700 }}>
                                    {match.teamA.slice(0, 3).toUpperCase()}
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* VS / Score Badge */}
                            <div
                              className="font-inter text-center"
                              style={{
                                padding: "6px 12px",
                                borderRadius: "10px",
                                minWidth: "56px",
                                fontWeight: 900,
                                fontStyle: "italic",
                                fontSize: "12px",
                                background: match.status === "Live"
                                  ? "rgba(239,68,68,0.15)"
                                  : match.status === "Completed"
                                    ? "rgba(251,191,36,0.12)"
                                    : "rgba(26,111,255,0.1)",
                                border: `1.5px solid ${match.status === "Live"
                                  ? "rgba(239,68,68,0.45)"
                                  : match.status === "Completed"
                                    ? "rgba(251,191,36,0.4)"
                                    : "rgba(26,111,255,0.25)"
                                }`,
                                boxShadow: match.status === "Live"
                                  ? "0 0 15px rgba(239,68,68,0.2)"
                                  : match.status === "Completed"
                                    ? "0 0 15px rgba(251,191,36,0.15)"
                                    : "none"
                              }}
                            >
                              {match.status === "Live" || match.status === "Completed" ? (
                                <span style={{ color: match.status === "Live" ? "#ef4444" : "#fbbf24", textShadow: "0 0 8px rgba(0,0,0,0.5)" }}>
                                  {match.scores?.home ?? 0} - {match.scores?.away ?? 0}
                                </span>
                              ) : (
                                <span style={{ color: "rgba(255,255,255,0.2)" }}>VS</span>
                              )}
                            </div>

                            {/* Team B */}
                            <div className="flex items-center gap-2.5 sm:gap-3 justify-start flex-1 md:flex-initial min-w-[90px] sm:min-w-[120px]">
                              <div style={{ width: "30px", height: "30px", borderRadius: "50%", overflow: "hidden", border: "1.5px solid rgba(26,111,255,0.25)", background: "rgba(0,0,0,0.35)", display: "flex", alignItems: "center", justifyContent: "center", padding: "3px", boxShadow: "0 4px 10px rgba(0,0,0,0.3)" }}>
                                {match.teamBCrest ? (
                                  <img src={match.teamBCrest} alt="" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                                ) : (
                                  <span className="font-inter" style={{ fontSize: "9px", color: "rgba(255,255,255,0.4)", fontWeight: 700 }}>
                                    {match.teamB.slice(0, 3).toUpperCase()}
                                  </span>
                                )}
                              </div>
                              <span className="truncate max-w-[70px] sm:max-w-[95px]" style={{ fontFamily: "'Roboto',sans-serif", fontWeight: 700, fontSize: "12px", color: "white", textTransform: "uppercase" }}>
                                {match.teamB}
                              </span>
                            </div>
                          </div>

                          {/* Prediction Status & Metadata badges */}
                          <div className="flex items-center gap-2.5 justify-center md:justify-end w-full md:w-auto min-w-0 md:min-w-[140px]">
                            {hasPred && (
                              <span className="font-inter" style={{ padding: "2px 6px", borderRadius: "5px", background: "rgba(42,229,0,0.08)", border: "1px solid rgba(42,229,0,0.2)", color: "#2ae500", fontSize: "8px", textTransform: "uppercase", letterSpacing: "0.12em", fontWeight: 700 }}>
                                Voted
                              </span>
                            )}
                            
                            {match.status === "Live" ? (
                              <motion.span
                                animate={{ opacity: [1, 0.4, 1] }}
                                transition={{ repeat: Infinity, duration: 1.5 }}
                                className="font-inter flex items-center gap-1"
                                style={{ padding: "2px 6px", borderRadius: "5px", background: "rgba(239,68,68,0.15)", border: "1px solid rgba(239,68,68,0.3)", color: "#f87171", fontSize: "8px", textTransform: "uppercase", letterSpacing: "0.12em", fontWeight: 700 }}
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-[#ef4444]" />
                                Live
                              </motion.span>
                            ) : match.status === "Completed" ? (
                              <span className="font-inter flex items-center gap-1" style={{ padding: "2px 6px", borderRadius: "5px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", color: "#64748b", fontSize: "8px", textTransform: "uppercase", letterSpacing: "0.12em", fontWeight: 700 }}>
                                Ended
                              </span>
                            ) : (
                              <span className="font-inter flex items-center gap-1" style={{ padding: "2px 6px", borderRadius: "5px", background: "rgba(26,111,255,0.1)", border: "1px solid rgba(26,111,255,0.2)", color: "#4da3ff", fontSize: "8px", textTransform: "uppercase", letterSpacing: "0.12em", fontWeight: 700 }}>
                                Scheduled
                              </span>
                            )}

                            <span className="material-symbols-outlined hidden md:block" style={{ fontSize: "14px", color: "rgba(26,111,255,0.35)" }}>chevron_right</span>
                          </div>
                        </motion.div>
                      );
                    })}

                    {finalFilteredMatches.length === 0 && (
                      <div
                        className="text-center py-16 rounded-2xl flex flex-col items-center justify-center gap-2 p-6"
                        style={{ background: "rgba(5,15,38,0.25)", border: "1px dashed rgba(26,111,255,0.1)" }}
                      >
                        <span className="material-symbols-outlined text-[32px]" style={{ color: "#334155" }}>sports_soccer</span>
                        <div style={{ fontFamily: "'Roboto',sans-serif", fontWeight: 700, fontSize: "14px", color: "#64748b" }}>
                          No Fixtures Found
                        </div>
                        <div className="font-inter text-[11px]" style={{ color: "#475569" }}>
                          Try adjusting your date filters or team search query.
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>
      </main>

      {/* Mobile HUD Nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 py-3 rounded-t-2xl"
        style={{ background:"rgba(4,13,26,0.96)", backdropFilter:"blur(20px)", borderTop:"1px solid rgba(26,111,255,0.15)", boxShadow:"0 -4px 24px rgba(0,0,0,0.6)" }}>
        {[
          { href:"#predict", icon:"sports_soccer", label:"Predict", active:true },
          { onClick:()=>{ const el=document.getElementById("ranks-panel"); if(el) el.scrollIntoView({behavior:"smooth"}); setActiveTab("leaderboard"); }, icon:"leaderboard", label:"Rankings" },
          { onClick:()=>{ const el=document.getElementById("ranks-panel"); if(el) el.scrollIntoView({behavior:"smooth"}); setActiveTab("matches"); }, icon:"calendar_month", label:"Schedule" },
          { href:"/profile", icon:"person", label:"Profile" },
        ].map((item,i)=>{
          const Comp=item.href?"a":"button";
          return (
            <motion.div key={i} whileTap={{scale:0.88}}>
              <Comp href={item.href} onClick={item.onClick}
                className="flex flex-col items-center justify-center gap-0.5 cursor-pointer transition-colors"
                style={{ color:item.active?"#4da3ff":"#475569" }}>
                <span className="material-symbols-outlined" style={{ fontSize:"20px", fontVariationSettings:item.active?'"FILL" 1':undefined }}>{item.icon}</span>
                <span className="font-inter" style={{ fontSize:"8px",textTransform:"uppercase",letterSpacing:"0.15em",fontWeight:600 }}>{item.label}</span>
              </Comp>
            </motion.div>
          );
        })}
      </nav>
    </div>
  );
}
