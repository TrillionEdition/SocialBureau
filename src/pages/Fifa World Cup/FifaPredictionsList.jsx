import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BASE_URL } from "@/utils/urls";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

export default function FifaPredictionsList() {
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all"); // all, pending, correct, incorrect

  useEffect(() => {
    fetchAllPredictions();
  }, []);

  const fetchAllPredictions = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/fifa/all-predictions`);
      setPredictions(res.data || []);
    } catch (error) {
      console.error("Failed to load predictions list:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredPredictions = predictions.filter((pred) => {
    const userName = pred.user?.name || "";
    const matchesSearch = userName.toLowerCase().includes(searchQuery.toLowerCase());

    if (statusFilter === "all") return matchesSearch;
    if (statusFilter === "pending") return matchesSearch && pred.isCorrect === null;
    if (statusFilter === "correct") return matchesSearch && pred.isCorrect === true;
    if (statusFilter === "incorrect") return matchesSearch && pred.isCorrect === false;

    return matchesSearch;
  });

  return (
    <div className="fifa-body font-sans overflow-x-hidden relative bg-[#111415] text-[#e1e3e4] min-h-screen pb-20">
      
      {/* Stitch Design styles inject */}
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,700;0,800;0,900;1,700;1,800;1,900&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@500;600&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');
        
        .fifa-body {
          font-family: 'Inter', sans-serif;
          background-color: #111415;
        }
        
        .font-display-xl {
          font-family: 'Montserrat', sans-serif;
        }
        
        .glass-card {
          background: rgba(255, 255, 255, 0.04) !important;
          backdrop-filter: blur(40px) !important;
          border: 1px solid rgba(255, 255, 255, 0.08) !important;
          box-shadow: 0 24px 64px 0 rgba(0, 0, 0, 0.5) !important;
        }
        
        .stadium-mesh {
          background-image: radial-gradient(circle at 2px 2px, rgba(255,255,255,0.03) 1px, transparent 0);
          background-size: 24px 24px;
        }
      `}} />

      {/* Background elements */}
      <div className="absolute inset-0 stadium-mesh opacity-20 pointer-events-none z-0"></div>
      <div className="absolute top-0 left-0 w-full h-[400px] bg-gradient-to-b from-[#001f3f]/10 to-transparent pointer-events-none z-0"></div>

      <main className="relative z-10 max-w-7xl mx-auto px-4 md:px-12 pt-12 space-y-12">
        
        {/* Navigation & Header */}
        <div className="space-y-6">
          <Link 
            to="/fifa-world-cup" 
            className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white transition duration-300 group"
          >
            <span className="material-symbols-outlined text-sm transform group-hover:-translate-x-1 transition-transform">arrow_back</span>
            RETURN TO ARENA
          </Link>

          <div className="flex flex-col md:flex-row justify-between md:items-end gap-6 border-b border-white/5 pb-8">
            <div>
              <h1 className="font-display-xl text-3xl md:text-5xl font-black tracking-tight text-white uppercase italic">
                FORECAST DIRECTORY
              </h1>
              <p className="text-xs text-slate-450 mt-2 max-w-2xl leading-relaxed">
                Live registry of all tactical predictions placed by the global predictor hub community.
              </p>
            </div>
            <div className="font-mono text-[10px] text-slate-450 uppercase bg-white/5 border border-white/5 px-4 py-1.5 rounded-lg flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#ffdb3c] animate-pulse"></span>
              GLOBAL TRACKING ACTIVE
            </div>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white/[0.01] border border-white/5 p-4 rounded-3xl">
          {/* Search bar */}
          <div className="w-full md:max-w-md relative flex items-center">
            <span className="material-symbols-outlined absolute left-4 text-slate-500 text-lg">search</span>
            <input
              type="text"
              placeholder="Search by forecaster name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-[#171a1b] border border-white/5 hover:border-white/10 focus:border-[#4da3ff]/50 rounded-2xl text-xs text-white placeholder-slate-500 focus:outline-none transition duration-300"
            />
          </div>

          {/* Filter Buttons */}
          <div className="flex gap-2 w-full md:w-auto overflow-x-auto scrollbar-none pb-1 md:pb-0">
            {[
              { id: "all", label: "All Forecasts", icon: "widgets" },
              { id: "pending", label: "Pending", icon: "pending" },
              { id: "correct", label: "Correct", icon: "check_circle" },
              { id: "incorrect", label: "Incorrect", icon: "cancel" }
            ].map((btn) => (
              <button
                key={btn.id}
                type="button"
                onClick={() => setStatusFilter(btn.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold cursor-pointer border transition duration-300 whitespace-nowrap ${
                  statusFilter === btn.id
                    ? "bg-[#0c1926] border-[#4da3ff] text-white"
                    : "bg-[#171a1b] border-white/5 text-slate-400 hover:border-white/10"
                }`}
              >
                <span className="material-symbols-outlined text-sm">{btn.icon}</span>
                {btn.label}
              </button>
            ))}
          </div>
        </div>

        {/* Predictions List Grid */}
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center text-white">
            <div className="w-10 h-10 border-3 border-[#4da3ff] border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="font-mono text-[10px] text-slate-500 uppercase tracking-widest">Retrieving ledger details...</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredPredictions.map((pred, index) => {
                const isCorrect = pred.isCorrect;
                const match = pred.match;
                const user = pred.user;

                if (!match || !user) return null;

                // Predict Choice Team Name
                const predictedTeamName = 
                  pred.predictedWinner === "TeamA" ? match.teamA 
                  : pred.predictedWinner === "TeamB" ? match.teamB 
                  : "Draw Match";

                // Flag icon for predicted winner
                const predictedTeamCrest = 
                  pred.predictedWinner === "TeamA" ? match.teamACrest
                  : pred.predictedWinner === "TeamB" ? match.teamBCrest
                  : null;

                return (
                  <motion.div
                    key={pred._id || index}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.3, delay: Math.min(index * 0.05, 0.4) }}
                    className="glass-card rounded-[2rem] p-6 flex flex-col justify-between gap-6 hover:border-white/10 transition-colors duration-300 relative overflow-hidden group"
                  >
                    {/* Glowing side accent line based on status */}
                    <div className={`absolute top-0 left-0 w-1.5 h-full ${
                      isCorrect === null ? "bg-amber-500/40" 
                      : isCorrect ? "bg-green-500/60" 
                      : "bg-red-500/60"
                    }`}></div>

                    {/* Card Header (User profile card) */}
                    <div className="flex items-center gap-3 pl-2.5">
                      <div className="w-9 h-9 rounded-full overflow-hidden border border-white/10 bg-[#1d1f20] flex items-center justify-center font-bold text-xs">
                        {user.avatar ? (
                          <img src={user.avatar} alt="" className="w-full h-full object-cover" />
                        ) : (
                          user.name.slice(0, 2).toUpperCase()
                        )}
                      </div>
                      <div>
                        <div className="font-bold text-xs text-white max-w-[150px] truncate">{user.name}</div>
                        <div className="text-[8px] font-mono text-slate-500 uppercase tracking-wider mt-0.5">{user.role || "Diamond - Gold"}</div>
                      </div>
                    </div>

                    {/* Card Body (Match information) */}
                    <div className="bg-[#141617]/70 border border-white/5 rounded-2xl p-4 space-y-3 pl-4 relative">
                      <div className="flex justify-between items-center text-[9px] font-mono text-slate-500 uppercase">
                        <span>{match.status}</span>
                        <span>{new Date(match.date).toLocaleDateString([], { month: "short", day: "numeric" })}</span>
                      </div>
                      
                      <div className="flex items-center justify-between gap-3 pt-1">
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                          <div className="w-5 h-5 rounded-full overflow-hidden bg-black/20 flex items-center justify-center p-0.5 border border-white/5">
                            {match.teamACrest ? (
                              <img src={match.teamACrest} alt="" className="w-full h-full object-cover" />
                            ) : (
                              <span className="text-[8px] font-mono">{match.teamA.slice(0,2)}</span>
                            )}
                          </div>
                          <span className="text-xs font-bold text-white uppercase truncate">{match.teamA}</span>
                        </div>
                        <span className="font-mono text-[9px] text-slate-500 font-bold">vs</span>
                        <div className="flex items-center gap-2 flex-1 justify-end min-w-0">
                          <span className="text-xs font-bold text-white uppercase truncate text-right">{match.teamB}</span>
                          <div className="w-5 h-5 rounded-full overflow-hidden bg-black/20 flex items-center justify-center p-0.5 border border-white/5">
                            {match.teamBCrest ? (
                              <img src={match.teamBCrest} alt="" className="w-full h-full object-cover" />
                            ) : (
                              <span className="text-[8px] font-mono">{match.teamB.slice(0,2)}</span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Score values if Completed/Live */}
                      {(match.status === "Live" || match.status === "Completed") && (
                        <div className="pt-2 border-t border-white/[0.03] text-center font-mono text-[10px] text-[#ffdb3c]">
                          Match Score: <span className="font-black">{match.scores?.home ?? 0} - {match.scores?.away ?? 0}</span>
                        </div>
                      )}
                    </div>

                    {/* Card Footer (Prediction status details) */}
                    <div className="pt-4 border-t border-white/5 pl-2.5 flex flex-col gap-3">
                      <div>
                        <div className="text-[9px] font-mono text-slate-550 uppercase tracking-widest">Forecast Choice:</div>
                        <div className="flex items-center gap-2 mt-1.5">
                          {predictedTeamCrest ? (
                            <div className="w-4 h-4 rounded-full overflow-hidden bg-black/25 flex items-center justify-center p-0.5 border border-white/10">
                              <img src={predictedTeamCrest} alt="" className="w-full h-full object-cover" />
                            </div>
                          ) : (
                            pred.predictedWinner === "Draw" && (
                              <span className="material-symbols-outlined text-slate-550 text-xs">handshake</span>
                            )
                          )}
                          <span className="text-xs font-bold text-white uppercase">{predictedTeamName}</span>
                        </div>
                      </div>

                      <div className="flex justify-between items-center pt-2">
                        {/* Status Badge */}
                        {isCorrect === null ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#2e1d0c] text-amber-500 border border-amber-500/20 text-[8px] font-bold uppercase tracking-wider">
                            <span className="material-symbols-outlined text-[9px]">hourglass_empty</span>
                            Pending fixture
                          </span>
                        ) : isCorrect ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#0b2812] text-green-500 border border-green-500/20 text-[8px] font-bold uppercase tracking-wider">
                            <span className="material-symbols-outlined text-[9px]">check_circle</span>
                            Correct (+1 Pt)
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#2b0d0c] text-red-500 border border-red-500/20 text-[8px] font-bold uppercase tracking-wider">
                            <span className="material-symbols-outlined text-[9px]">cancel</span>
                            Incorrect (0 Pts)
                          </span>
                        )}

                        <span className="text-[8px] font-mono text-slate-500 uppercase">
                          {new Date(pred.createdAt).toLocaleDateString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {filteredPredictions.length === 0 && (
              <div className="md:col-span-2 lg:col-span-3 text-center py-24 bg-white/[0.01] border border-dashed border-white/10 rounded-[2rem]">
                <span className="material-symbols-outlined text-slate-600 text-3xl mb-3">grid_off</span>
                <p className="text-xs text-slate-500 italic">No matching forecasts found in this directory ledger.</p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
