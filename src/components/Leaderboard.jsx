import React, { useEffect, useState } from "react";
import { Trophy, Clock, User, Award } from "lucide-react";
import { BASE_URL } from "@/utils/urls";
import Footer from "./Footer";
import TreasureHuntSound from "@/utils/treasureHuntSound";

export default function DynamicLeaderboard() {
  const [activeTab, setActiveTab] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    const tabParam = params.get("tab");
    const loggedIn = localStorage.getItem("userData") || localStorage.getItem("user");
    if (tabParam === "community" && loggedIn) {
      return "community";
    }
    return "treasure-hunt";
  }); // "treasure-hunt" or "community"
  const [leaderboard, setLeaderboard] = useState([]); // Community Points list
  const [thLeaderboard, setThLeaderboard] = useState([]); // Treasure Hunt completions list
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [timeRange, setTimeRange] = useState("monthly");

  // Function to get user profile image
  const getUserProfileImage = (user) => {
    if (!user) return `https://ui-avatars.com/api/?name=User&background=0A1221&color=fff`;
    if (user?.profilePicture) return user.profilePicture;
    if (user?.avatar) return user.avatar;
    if (user?.photo) return user.photo;
    if (user?.image) return user.image;

    // Custom gold theme for Treasure Hunt users
    if (activeTab === "treasure-hunt") {
      return `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'Hunter')}&background=1e150f&color=d4af37&bold=true`;
    }

    return `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'User')}&background=0D1527&color=fff`;
  };

  const getCurrentUserId = () => {
    try {
      const user = localStorage.getItem("user");
      return user ? JSON.parse(user).id : null;
    } catch {
      return null;
    }
  };

  // Fetch Community Engagement Leaderboard
  const fetchCommunityLeaderboard = async () => {
    try {
      setLoading(true);
      setError("");
      const param = timeRange === "daily";

      const res = await fetch(`${BASE_URL}/user/leaderboard?range=${param}`, {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const teamRes = await fetch(`${BASE_URL}/user/team`, {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error(`Failed to load leaderboard: ${res.statusText}`);
      }

      const lbData = await res.json();
      const teamData = await teamRes.json();

      const teamUsers = Array.isArray(teamData) ? teamData : (teamData.data || []);
      const lbUsers = lbData.success && Array.isArray(lbData.data) ? lbData.data : [];

      const teamMap = new Map();
      teamUsers.forEach(u => {
        const id = (u._id || u.id)?.toString();
        if (id) teamMap.set(id, u);
      });

      const mergedList = lbUsers.map(lbUser => {
        const userId = (lbUser._id || lbUser.id)?.toString();
        const teamProfile = teamMap.get(userId);
        return {
          ...lbUser,
          ...teamProfile,
          points: lbUser.points || 0,
          id: userId
        };
      });

      const lbUserIds = new Set(lbUsers.map(u => (u._id || u.id)?.toString()));
      teamUsers.forEach(tUser => {
        const tId = (tUser._id || tUser.id)?.toString();
        if (tId && !lbUserIds.has(tId)) {
          mergedList.push({
            ...tUser,
            points: 0,
            id: tId
          });
        }
      });

      mergedList.sort((a, b) => (b.points || 0) - (a.points || 0));
      setLeaderboard(mergedList);

      const uid = getCurrentUserId();
      const index = mergedList.findIndex((u) => u.id === uid);
      if (index !== -1) {
        setCurrentUser({ ...mergedList[index], rank: index + 1 });
      } else {
        setCurrentUser(null);
      }
    } catch (err) {
      setError(err.message);
      console.error("Leaderboard fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch Public Treasure Hunt Leaderboard
  const fetchTreasureHuntLeaderboard = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await fetch(`${BASE_URL}/lottery/public-leaderboard`);
      if (!res.ok) {
        throw new Error(`Failed to load Treasure Hunt completions: ${res.statusText}`);
      }
      const data = await res.json();
      setThLeaderboard(data);
    } catch (err) {
      setError(err.message);
      console.error("Treasure Hunt fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Play winning sound if they just completed and redirected here
    const playWin = localStorage.getItem("treasure_hunt_play_winning_sound");
    if (playWin === "true") {
      TreasureHuntSound.playWinningSound();
      localStorage.removeItem("treasure_hunt_play_winning_sound");
    }
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tabParam = params.get("tab");
    const loggedIn = localStorage.getItem("userData") || localStorage.getItem("user");
    if (tabParam === "community" && !loggedIn) {
      window.location.href = `/login?redirect=${encodeURIComponent("/leaderboard?tab=community")}`;
    }
  }, []);

  useEffect(() => {
    if (activeTab === "treasure-hunt") {
      fetchTreasureHuntLeaderboard();
    } else {
      fetchCommunityLeaderboard();
    }
  }, [activeTab, timeRange]);

  const getTopThree = () => {
    return [leaderboard[0] || null, leaderboard[1] || null, leaderboard[2] || null];
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  const [first, second, third] = getTopThree();

  // Render Medal for Treasure Hunt Board
  const renderMedal = (rank) => {
    if (rank === 1) {
      return (
        <div className="relative flex flex-col items-center justify-center select-none scale-[0.85] sm:scale-100 h-10 sm:h-12 w-full">
          {/* Gold Crown */}
          <div className="text-[10px] sm:text-xs text-yellow-400 absolute -top-3.5 z-20">👑</div>
          {/* Laurel Medal Circle */}
          <div className="w-9 h-9 rounded-full bg-gradient-to-b from-[#ffd700] via-[#d4af37] to-[#aa7c11] border border-[#ffe57f] flex items-center justify-center text-[#2b1d0c] font-black text-sm shadow-[0_0_12px_rgba(212,175,55,0.7)] z-10">
            1
          </div>
          {/* Ribbon tails */}
          <div className="absolute top-5 flex gap-1 z-0">
            <div className="w-2 h-4 bg-yellow-600 transform -rotate-12 rounded-b-sm border-r border-yellow-700" />
            <div className="w-2 h-4 bg-yellow-600 transform rotate-12 rounded-b-sm border-l border-yellow-700" />
          </div>
        </div>
      );
    }
    if (rank === 2) {
      return (
        <div className="relative flex flex-col items-center justify-center select-none scale-[0.85] sm:scale-100 h-10 sm:h-12 w-full">
          <div className="w-9 h-9 rounded-full bg-gradient-to-b from-[#ffffff] via-[#cbd5e1] to-[#64748b] border border-[#f8fafc] flex items-center justify-center text-[#1e293b] font-black text-sm shadow-[0_0_10px_rgba(255,255,255,0.4)] z-10">
            2
          </div>
          <div className="absolute top-5 flex gap-1 z-0">
            <div className="w-2 h-4 bg-blue-500 transform -rotate-12 rounded-b-sm border-r border-blue-600" />
            <div className="w-2 h-4 bg-blue-500 transform rotate-12 rounded-b-sm border-l border-blue-600" />
          </div>
        </div>
      );
    }
    if (rank === 3) {
      return (
        <div className="relative flex flex-col items-center justify-center select-none scale-[0.85] sm:scale-100 h-10 sm:h-12 w-full">
          <div className="w-9 h-9 rounded-full bg-gradient-to-b from-[#f59e0b] via-[#b45309] to-[#78350f] border border-[#fbbf24] flex items-center justify-center text-[#fff] font-black text-sm shadow-[0_0_10px_rgba(217,119,6,0.5)] z-10">
            3
          </div>
          <div className="absolute top-5 flex gap-1 z-0">
            <div className="w-2 h-4 bg-red-600 transform -rotate-12 rounded-b-sm border-r border-red-700" />
            <div className="w-2 h-4 bg-red-600 transform rotate-12 rounded-b-sm border-l border-red-700" />
          </div>
        </div>
      );
    }
    return (
      <div className="w-7 h-7 rounded-full border border-[#5c3e26] flex items-center justify-center text-[#ecd292]/70 font-bold text-sm mx-auto">
        {rank}
      </div>
    );
  };

  // Render Stars based on Rank
  const renderStars = (rank) => {
    let filledCount = 3;
    if (rank === 1) filledCount = 5;
    else if (rank === 2) filledCount = 5;
    else if (rank === 3) filledCount = 4;
    else if (rank === 4) filledCount = 3;

    return (
      <div className="flex justify-center gap-1 select-none">
        {[...Array(5)].map((_, i) => (
          <span
            key={i}
            className={`text-base sm:text-lg ${
              i < filledCount 
                ? "text-yellow-400 drop-shadow-[0_0_5px_rgba(234,179,8,0.7)]" 
                : "text-stone-700"
            }`}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#050B14] to-[#0A1221] flex items-center justify-center p-4">
        <div className="text-center max-w-sm sm:max-w-md">
          <p className="text-red-400 mb-2 text-sm sm:text-base">❌ Error: {error}</p>
          <p className="text-gray-400 mb-4 text-xs sm:text-sm break-all">
            Endpoint: <code className="bg-black/50 px-2 py-1 rounded inline-block">{BASE_URL}/lottery/public-leaderboard</code>
          </p>
          <p className="text-gray-400 mb-6 text-xs sm:text-sm">Make sure your backend is running</p>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center">
            <button
              onClick={() => activeTab === "treasure-hunt" ? fetchTreasureHuntLeaderboard() : fetchCommunityLeaderboard()}
              className="px-4 sm:px-6 py-2 bg-[#d4af37] hover:bg-[#aa7c11] text-black font-black uppercase tracking-wider rounded-lg transition text-sm sm:text-base"
            >
              Try Again
            </button>
            <button
              onClick={() => setError("")}
              className="px-4 sm:px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white font-medium transition text-sm sm:text-base"
            >
              Dismiss
            </button>
          </div>
        </div>
      </div>
    );
  }

  const activeList = activeTab === "treasure-hunt" ? thLeaderboard : leaderboard;

  const isTreasure = activeTab === "treasure-hunt";

  return (
    <div className={`relative transition-colors duration-500 text-white ${
      isTreasure 
        ? "h-screen overflow-hidden flex flex-col parchment-bg treasure-font-sans" 
        : "min-h-screen overflow-x-hidden bg-gradient-to-b from-[#050B14] to-[#0A1221]"
    }`}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700;900&family=Cinzel:wght@400;600;700;900&family=EB+Garamond:ital,wght@0,600;0,800;1,700&family=Outfit:wght@300;400;500;600;700&display=swap');
        
        .parchment-bg {
          background-color: #0d0805;
          background-image: 
            radial-gradient(circle at 50% 50%, rgba(29, 19, 12, 0.45) 0%, rgba(5, 3, 2, 0.95) 100%),
            url("https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/leaderboardTreasureHunt.webp");
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          background-attachment: fixed;
        }
        
        .treasure-font-serif {
          font-family: 'EB Garamond', Georgia, serif;
        }
        
        .treasure-font-title {
          font-family: 'Cinzel Decorative', 'Cinzel', Georgia, serif;
        }

        .treasure-font-sans {
          font-family: 'Outfit', system-ui, sans-serif;
        }

        .treasure-font-title-gilded {
          font-family: 'Cinzel Decorative', 'Cinzel', Georgia, serif;
          font-weight: 900;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          background: linear-gradient(
            to bottom, 
            #fffde8 0%, 
            #f7d054 20%, 
            #dca622 45%, 
            #a57613 70%, 
            #ffe378 100%
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          -webkit-text-stroke: 1px rgba(10, 8, 4, 0.7);
          filter: 
            drop-shadow(0px 3px 2px rgba(0, 0, 0, 0.95))
            drop-shadow(0px 0px 12px rgba(212, 175, 55, 0.5));
        }

        .animate-spin-slow {
          animation: spin 18s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        /* Custom scrollbar styling for tables */
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.15);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: ${isTreasure ? "rgba(212, 175, 55, 0.45)" : "rgba(59, 130, 246, 0.45)"};
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: ${isTreasure ? "rgba(212, 175, 55, 0.75)" : "rgba(59, 130, 246, 0.75)"};
        }
      `}</style>

      {/* Background glowing overlays */}
      {isTreasure ? (
        <>
          {/* Decorative study lantern glow on the side */}
          <div className="absolute right-0 top-1/4 w-[350px] h-[350px] bg-yellow-600/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute left-0 bottom-1/4 w-[350px] h-[350px] bg-amber-700/10 rounded-full blur-[100px] pointer-events-none" />
        </>
      ) : (
        <>
          <div className="absolute right-0 top-1/4 w-[400px] h-[400px] bg-blue-900/5 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute left-0 bottom-1/4 w-[400px] h-[400px] bg-indigo-950/5 rounded-full blur-[120px] pointer-events-none" />
        </>
      )}

      <div className={`relative z-10 w-full px-3 sm:px-4 max-w-5xl mx-auto ${
        isTreasure 
          ? "flex-1 flex flex-col min-h-0 pb-4 sm:pb-6 pt-12 sm:pt-12 md:pt-12" 
          : "pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-20"
      }`}>
        
        {/* Tab Switcher */}
        <div className={`flex justify-center flex-shrink-0 ${isTreasure ? "mb-4 sm:mb-6" : "mb-6 sm:mb-10"}`}>
          <div className={
            isTreasure 
              ? "bg-[#1b120c] border border-[#d4af37]/30 rounded-full p-1.5 flex gap-1 shadow-[0_10px_30px_rgba(0,0,0,0.6)]"
              : "bg-[#0E1521] border border-white/5 rounded-xl p-1 flex gap-1 shadow-lg"
          }>
            <button
              onClick={() => setActiveTab("treasure-hunt")}
              className={`px-5 sm:px-8 py-2.5 uppercase tracking-wide transition-all duration-300 flex items-center gap-2 ${
                isTreasure
                  ? "bg-gradient-to-r from-[#ffe57f] to-[#d4af37] text-[#120c08] shadow-[0_0_15px_rgba(234,179,8,0.45)] font-black rounded-full text-xs sm:text-sm"
                  : "text-gray-400 hover:text-white rounded-lg text-xs sm:text-sm font-semibold"
              }`}
            >
              🏆 Treasure Hunt
            </button>
            <button
              onClick={() => {
                const loggedIn = localStorage.getItem("userData") || localStorage.getItem("user");
                if (!loggedIn) {
                  window.location.href = `/login?redirect=${encodeURIComponent("/leaderboard?tab=community")}`;
                } else {
                  setActiveTab("community");
                }
              }}
              className={`px-5 sm:px-8 py-2.5 uppercase tracking-wide transition-all duration-300 flex items-center gap-2 ${
                !isTreasure
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/20 font-semibold rounded-lg text-xs sm:text-sm"
                  : "text-gray-400 hover:text-white rounded-full text-xs sm:text-sm font-extrabold"
              }`}
            >
              💎 Community Points
            </button>
          </div>
        </div>

        {/* Title Section */}
        {isTreasure ? (
          /* carved Wood Title Banner */
          <div className="relative w-full max-w-xl mx-auto mb-6 mt-1 flex-shrink-0">
            {/* Wooden Banner Body */}
            <div className="bg-gradient-to-b from-[#2a1b12] to-[#120c08] border-2 border-[#d4af37] px-8 py-2.5 rounded-lg shadow-[0_15px_30px_rgba(0,0,0,0.8)] relative z-10 max-w-xs sm:max-w-md mx-auto">
              {/* Gold side brackets */}
              <div className="absolute left-2.5 top-1/2 -translate-y-1/2 w-1 h-5 bg-[#d4af37] rounded-sm" />
              <div className="absolute right-2.5 top-1/2 -translate-y-1/2 w-1 h-5 bg-[#d4af37] rounded-sm" />

              <h1 className="text-center select-none treasure-font-title-gilded text-xl sm:text-3xl tracking-widest">
                LEADERBOARD
              </h1>
            </div>
          </div>
        ) : (
          /* Clean Modern Title Section */
          <div className="text-center mb-6 sm:mb-8 mt-2 flex-shrink-0">
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight mb-2 sm:mb-3 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
              LEADERBOARD
            </h1>
            <p className="text-[#64748B] text-xs sm:text-sm md:text-base max-w-md mx-auto">
              Top contributors driving engagement in the ecosystem
            </p>
          </div>
        )}

        {/* Time Range Filter (Only for Community tab) */}
        {!isTreasure && (
          <div className="flex justify-center gap-3 mb-6 flex-shrink-0">
            <button
              onClick={() => setTimeRange("daily")}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors ${
                timeRange === "daily" ? "bg-white/10 text-white border border-white/20" : "text-gray-400 hover:text-white border border-transparent"
              }`}
            >
              Daily
            </button>
            <button
              onClick={() => setTimeRange("monthly")}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors ${
                timeRange === "monthly" ? "bg-white/10 text-white border border-white/20" : "text-gray-400 hover:text-white border border-transparent"
              }`}
            >
              Monthly
            </button>
          </div>
        )}

        {/* Podium Section - Only for Community Tab */}
        {!isTreasure && (
          <div className="flex items-end justify-center gap-2 sm:gap-3 lg:gap-8 mb-8 w-full px-2 sm:px-4 flex-shrink-0">
            {/* 2nd Place */}
            <div className="flex flex-col items-center flex-1 sm:flex-none">
              <div className="mb-2 sm:mb-4 text-center w-full">
                <div className="w-12 sm:w-16 h-12 sm:h-16 rounded-lg sm:rounded-2xl bg-gradient-to-br from-[#2D394F] to-[#1A2333] p-[1px] mx-auto mb-1 sm:mb-2 shadow-lg">
                  <div className="w-full h-full bg-[#1e293b] rounded-lg sm:rounded-2xl overflow-hidden">
                    <img
                      src={getUserProfileImage(second)}
                      alt={second?.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(second?.name || 'User')}&background=0A1221&color=fff`;
                      }}
                    />
                  </div>
                </div>
                <h3 className="font-bold text-xs sm:text-base text-gray-200 truncate px-1">{second?.name || "Runner-Up"}</h3>
              </div>

              <div className="w-full sm:w-56 bg-gradient-to-b from-[#111927] to-[#0B1019] rounded-t-lg border-t border-white/10 shadow-lg p-2 sm:p-4">
                <div className="flex flex-col items-center gap-1 sm:gap-2">
                  <div className="p-1 sm:p-2 bg-white/5 rounded-full">
                    <Trophy className="w-4 sm:w-6 h-4 sm:h-6 text-gray-400" />
                  </div>
                  <span className="text-gray-400 text-[9px] sm:text-xs font-medium text-center">
                    Earn {formatNumber(second?.points || 0)} pts
                  </span>
                  <div className="text-center">
                    <div className="flex items-center gap-1 justify-center text-blue-400 text-xs sm:text-lg font-bold">
                      <span className="text-blue-400">💎</span> <span className="text-xs sm:text-lg text-blue-400">{formatNumber((second?.points || 0) * 10)}</span>
                    </div>
                    <span className="text-gray-600 text-[8px] sm:text-[9px] uppercase tracking-wider mt-0.5 block">
                      Prize
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* 1st Place */}
            <div className="flex flex-col items-center flex-1 sm:flex-none">
              <div className="mb-2 sm:mb-5 text-center w-full">
                <div className="w-16 sm:w-24 h-16 sm:h-24 rounded-lg sm:rounded-2xl bg-gradient-to-br from-white/20 to-white/5 p-[1px] mx-auto mb-1 sm:mb-3 shadow-[0_0_40px_rgba(255,255,255,0.1)]">
                  <div className="w-full h-full rounded-lg sm:rounded-2xl overflow-hidden bg-[#2A3347]">
                    <img
                      src={getUserProfileImage(first)}
                      alt={first?.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(first?.name || 'User')}&background=0A1221&color=fff`;
                      }}
                    />
                  </div>
                </div>
                <h3 className="font-bold text-sm sm:text-xl text-white truncate px-1">{first?.name || "Champion"}</h3>
              </div>

              <div className="w-full sm:w-64 bg-gradient-to-b from-[#1A2436] to-[#0B1019] rounded-t-lg border-t border-blue-500/30 shadow-[0_-10px_50px_rgba(37,99,235,0.15)] p-2.5 sm:p-5">
                <div className="flex flex-col items-center gap-1 sm:gap-3">
                  <div className="p-1.5 sm:p-3 bg-yellow-500/10 rounded-full border border-yellow-500/20 shadow-[0_0_20px_rgba(234,179,8,0.2)]">
                    <Trophy className="w-5 sm:w-8 h-5 sm:h-8 text-yellow-400 fill-yellow-400" />
                  </div>
                  <span className="text-gray-300 text-[9px] sm:text-sm font-medium text-center">
                    Earn {formatNumber(first?.points || 0)} pts
                  </span>

                  <div className="text-center">
                    <div className="flex items-center gap-1 justify-center text-white text-sm sm:text-2xl font-bold drop-shadow-md">
                      <span className="text-blue-400">💎</span> <span className="text-sm sm:text-2xl text-blue-400">{formatNumber((first?.points || 0) * 10)}</span>
                    </div>
                    <span className="text-gray-500 text-[8px] sm:text-[9px] uppercase tracking-wider mt-0.5 block">
                      Prize
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* 3rd Place */}
            <div className="flex flex-col items-center flex-1 sm:flex-none">
              <div className="mb-2 sm:mb-6 text-center w-full">
                <div className="w-12 sm:w-16 h-12 sm:h-16 rounded-lg sm:rounded-2xl bg-gradient-to-br from-[#2D394F] to-[#1A2333] p-[1px] mx-auto mb-1 sm:mb-2 shadow-lg">
                  <div className="w-full h-full bg-[#1e293b] rounded-lg sm:rounded-2xl overflow-hidden">
                    <img
                      src={getUserProfileImage(third)}
                      alt={third?.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(third?.name || 'User')}&background=0A1221&color=fff`;
                      }}
                    />
                  </div>
                </div>
                <h3 className="font-bold text-xs sm:text-base text-gray-200 truncate px-1">{third?.name || "3rd Place"}</h3>
              </div>

              <div className="w-full sm:w-56 bg-gradient-to-b from-[#111927] to-[#0B1019] rounded-t-lg border-t border-white/10 shadow-lg p-2 sm:p-4">
                <div className="flex flex-col items-center gap-1 sm:gap-2">
                  <div className="p-1 sm:p-2 bg-white/5 rounded-full">
                    <Trophy className="w-4 sm:w-6 h-4 sm:h-6 text-amber-700" />
                  </div>
                  <span className="text-gray-400 text-[9px] sm:text-xs font-medium text-center">
                    Earn {formatNumber(third?.points || 0)} pts
                  </span>
                  <div className="text-center">
                    <div className="flex items-center gap-1 justify-center text-blue-400 text-xs sm:text-lg font-bold">
                      <span className="text-blue-400">💎</span> <span className="text-xs sm:text-lg text-blue-400">{formatNumber((third?.points || 0) * 10)}</span>
                    </div>
                    <span className="text-gray-600 text-[8px] sm:text-[9px] uppercase tracking-wider mt-0.5 block">
                      Prize
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Floating User Bar (Only for Community tab) */}
        {!isTreasure && currentUser && (
          <div className="mb-4 mx-2 sm:mx-0 flex-shrink-0">
            <div className="bg-[#182030]/95 backdrop-blur-xl border border-blue-500/20 rounded-xl sm:rounded-2xl px-3 sm:px-8 py-2.5 sm:py-3 flex flex-col gap-1 sm:gap-2 shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4 text-xs sm:text-sm">
                <div className="flex items-center gap-2 text-gray-300">
                  <span>You earned</span>
                  <span className="text-blue-400 font-bold">💎 {formatNumber(currentUser.points || 0)}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <span>Rank</span>
                  <span className="text-white font-bold bg-white/10 px-3 py-1 rounded">#{currentUser.rank || "-"}</span>
                  <span className="hidden sm:inline">of {formatNumber(leaderboard.length)}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Ranking Tables based on Active Tab */}
        {isTreasure ? (
          /* main wooden board container (Treasure Hunt) */
          <div className="bg-gradient-to-b from-[#20140c] via-[#150d08] to-[#0c0704] rounded-2xl border-4 border-[#3e291b] p-3 sm:p-6 relative shadow-[0_25px_60px_rgba(0,0,0,0.95),_inset_0_0_50px_rgba(0,0,0,0.85)] max-w-4xl mx-auto overflow-hidden flex flex-col flex-1 min-h-0 w-full">
            
            {/* Gold Rivets at the corners */}
            <div className="absolute top-3.5 left-3.5 w-2.5 h-2.5 rounded-full bg-gradient-to-b from-[#ffe57f] to-[#aa7c11] border border-[#5c3e26] shadow-md" />
            <div className="absolute top-3.5 right-3.5 w-2.5 h-2.5 rounded-full bg-gradient-to-b from-[#ffe57f] to-[#aa7c11] border border-[#5c3e26] shadow-md" />
            <div className="absolute bottom-3.5 left-3.5 w-2.5 h-2.5 rounded-full bg-gradient-to-b from-[#ffe57f] to-[#aa7c11] border border-[#5c3e26] shadow-md" />
            <div className="absolute bottom-3.5 right-3.5 w-2.5 h-2.5 rounded-full bg-gradient-to-b from-[#ffe57f] to-[#aa7c11] border border-[#5c3e26] shadow-md" />

            {/* Table Headers */}
            <div className="grid grid-cols-12 gap-0 px-4 sm:px-6 py-3 text-[#ffe57f] text-xs uppercase tracking-widest font-black border-b border-[#4d3221] bg-[#120a06]/75 rounded-t-lg select-none treasure-font-title flex-shrink-0">
              <div className="col-span-2 text-center">Rank</div>
              <div className="col-span-6 sm:col-span-5 flex items-center pl-2">Player Name</div>
              <div className="col-span-3 text-center hidden sm:block">Achievements</div>
              <div className="col-span-4 sm:col-span-2 text-right">Score</div>
            </div>

            {/* List Items */}
            <div data-lenis-prevent className="flex flex-col gap-3.5 mt-4 overflow-y-auto flex-1 pr-1.5 custom-scrollbar">
              {activeList.length > 0 ? (
                activeList.map((user, index) => {
                  const rank = index + 1;
                  const isMe = user._id === currentUser?._id || user.id === currentUser?.id;

                  return (
                    <div
                      key={user._id}
                      className={`grid grid-cols-12 gap-0 px-4 sm:px-6 py-4 items-center bg-gradient-to-r from-[#170e0a] via-[#241710] to-[#170e0a] border border-[#482d1c] hover:border-[#aa7c11]/80 rounded-xl transition-all duration-300 hover:scale-[1.015] hover:shadow-[0_8px_20px_rgba(0,0,0,0.5),_0_0_12px_rgba(170,124,17,0.15)]
                        ${isMe ? "border-[#aa7c11]" : ""}
                      `}
                    >
                      {/* Rank */}
                      <div className="col-span-2 flex justify-center items-center font-bold text-white text-sm sm:text-base">
                        {renderMedal(rank)}
                      </div>

                      {/* Player Name */}
                      <div className="col-span-6 sm:col-span-5 flex items-center gap-2 sm:gap-4.5">
                        <div className="w-8 h-8 sm:w-11 h-11 rounded-full bg-gradient-to-br from-[#aa7c11] via-[#ffe57f] to-[#aa7c11] p-[1.5px] flex-shrink-0 shadow-md">
                          <div className="w-full h-full rounded-full overflow-hidden bg-[#100a06]">
                            <img
                              src={getUserProfileImage(user)}
                              alt={user.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'User')}&background=1e150f&color=d4af37`;
                              }}
                            />
                          </div>
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="font-bold text-xs sm:text-lg text-stone-100 truncate treasure-font-serif tracking-normal">
                            {user.name}
                          </div>
                          <div className="text-[7.5px] sm:text-xs text-[#aa7c11] font-semibold uppercase tracking-wider mt-0.5">
                            Hunter Complete
                          </div>
                        </div>
                      </div>

                      {/* Achievements */}
                      <div className="col-span-3 text-center hidden sm:block">
                        {renderStars(rank)}
                      </div>

                      {/* Score */}
                      <div className="col-span-4 sm:col-span-2 text-right">
                        <span className="font-bold text-sm sm:text-2xl text-yellow-400 tracking-wide font-mono drop-shadow-[0_1.5px_2px_rgba(0,0,0,0.8)]">
                          {user.totalTime}
                        </span>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="p-16 text-center text-stone-500 border border-dashed border-[#482d1c] rounded-xl my-auto">
                  <Clock className="w-14 h-14 mx-auto mb-4 opacity-25 text-[#aa7c11]" />
                  <p className="text-xs sm:text-base font-bold treasure-font-title tracking-wider uppercase text-[#aa7c11]/60">
                    No completions registered yet
                  </p>
                  <p className="text-[10px] sm:text-xs text-stone-600 mt-1">
                    Be the first adventurer to complete the hunt and claim the gold!
                  </p>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* previous design for the ranking table (Community Points) */
          <div className="bg-[#0E1521] rounded-xl sm:rounded-2xl border border-white/5 overflow-hidden mx-2 sm:mx-0 shadow-2xl">
            {/* Headers */}
            <div className="hidden sm:grid grid-cols-12 gap-0 px-4 sm:px-6 lg:px-8 py-4 text-gray-500 text-xs uppercase tracking-wider font-medium border-b border-white/5 bg-[#131B2C]/50 select-none">
              <div className="col-span-1">Rank</div>
              <div className="col-span-7">User</div>
              <div className="col-span-2 text-center">Points</div>
              <div className="col-span-2 text-right">Reward</div>
            </div>

            {/* List Items */}
            <div className="divide-y divide-white/5">
              {activeList.length > 0 ? (
                activeList.map((user, index) => {
                  const rank = index + 1;
                  const isMe = user._id === currentUser?._id || user.id === currentUser?.id;

                  return (
                    <div
                      key={user._id || user.id}
                      className={`grid grid-cols-12 gap-2 sm:gap-0 px-3 sm:px-6 lg:px-8 py-3 sm:py-4 items-center hover:bg-white/[0.02] transition-colors
                        ${isMe ? "bg-blue-500/5 hover:bg-blue-500/10 border-y border-blue-500/10" : ""}
                      `}
                    >
                      {/* Rank */}
                      <div className="col-span-1 font-bold text-white text-xs sm:text-lg">#{rank}</div>

                      {/* User Info */}
                      <div className="col-span-6 sm:col-span-7 flex items-center gap-2 sm:gap-4">
                        <div className="w-7 sm:w-10 h-7 sm:h-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-600 p-[1px] flex-shrink-0">
                          <div className="w-full h-full rounded-full overflow-hidden bg-[#0B121E]">
                            <img
                              src={getUserProfileImage(user)}
                              alt={user.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'User')}&background=0A1221&color=fff`;
                              }}
                            />
                          </div>
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className={`font-semibold text-xs sm:text-base truncate ${isMe ? "text-blue-400" : "text-white"}`}>
                            {user.name}
                          </div>
                          <div className="text-[8px] sm:text-xs text-gray-500 truncate">
                            @{user.name.split(' ')[0].toLowerCase()}
                          </div>
                        </div>
                      </div>

                      {/* Points */}
                      <div className="col-span-2 text-white font-medium text-xs sm:text-base text-center">
                        <div className="text-[7px] sm:text-xs text-gray-500 uppercase tracking-wider mb-0.5 sm:hidden">
                          Points
                        </div>
                        {formatNumber(user.points || 0)}
                      </div>

                      {/* Reward */}
                      <div className="col-span-3 sm:col-span-2 text-right">
                        <div>
                          <div className="text-[7px] sm:text-xs text-gray-500 uppercase tracking-wider mb-0.5 block sm:hidden">Reward</div>
                          <div className="inline-flex items-center gap-0.5 sm:gap-2 px-1.5 sm:px-4 py-0.5 sm:py-2 rounded text-[8px] sm:text-sm bg-[#151E2E] border border-white/5 hover:bg-[#1A253A] transition-colors float-right">
                            <span>💎</span>
                            <span className="text-white font-bold text-[7px] sm:text-sm">{formatNumber((user.points || 0) * 10)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="p-12 text-center text-gray-500 my-auto">
                  <Trophy className="w-12 h-12 mx-auto mb-4 opacity-20" />
                  <p className="text-xs sm:text-base">No community points registered yet.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {!isTreasure && <Footer />}
    </div>
  );
}
