import React, { useEffect, useState } from "react";
import { Trophy, Clock, User, ShieldAlert } from "lucide-react";
import { BASE_URL } from "@/utils/urls";

export default function DynamicLeaderboard() {
  const [activeTab, setActiveTab] = useState("treasure-hunt"); // "treasure-hunt" or "community"
  const [leaderboard, setLeaderboard] = useState([]); // Community Points list
  const [thLeaderboard, setThLeaderboard] = useState([]); // Treasure Hunt completions list
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [timeRange, setTimeRange] = useState("monthly");
  const [timeLeft, setTimeLeft] = useState("");

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

    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        return parsedUser?.profilePicture || parsedUser?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'User')}&background=0A1221&color=fff`;
      }
    } catch (err) {
      console.error("Error getting user from localStorage:", err);
    }

    return `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'User')}&background=0A1221&color=fff`;
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
    if (activeTab === "treasure-hunt") {
      fetchTreasureHuntLeaderboard();
    } else {
      fetchCommunityLeaderboard();
    }
  }, [activeTab, timeRange]);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      const diff = end - now;

      if (diff > 0) {
        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const m = Math.floor((diff / 1000 / 60) % 60);
        const s = Math.floor((diff / 1000) % 60);
        setTimeLeft(`${d}d ${h}h ${m}m ${s}s`);
      }
    };

    const timer = setInterval(calculateTimeLeft, 1000);
    calculateTimeLeft();
    return () => clearInterval(timer);
  }, []);

  const getTopThree = () => {
    const list = activeTab === "treasure-hunt" ? thLeaderboard : leaderboard;
    return [list[0] || null, list[1] || null, list[2] || null];
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  const [first, second, third] = getTopThree();

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
              className="px-4 sm:px-6 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg text-white font-medium transition text-sm sm:text-base"
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#050B14] to-[#0A1221] text-white font-sans overflow-x-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120vw] sm:w-[140vw] h-[60vw] sm:h-[70vw] max-w-[600px] sm:max-w-[820px] max-h-[250px] sm:max-h-[320px] rounded-b-full bg-gradient-to-b from-violet-400/40 via-fuchsia-400/25 to-transparent blur-[12px]" />
        <div className="relative w-[120vw] sm:w-[140vw] h-[60vw] sm:h-[70vw] max-w-[600px] sm:max-w-[800px] max-h-[250px] sm:max-h-[300px] rounded-b-full bg-gradient-to-b from-white/40 via-white/25 to-transparent blur-[2px]" />
      </div>

      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[90%] sm:w-[80%] md:w-[60%] h-[250px] sm:h-[300px] md:h-[400px] bg-blue-600/20 rounded-[100%] blur-[100px]" />
        <div className="absolute top-0 inset-x-0 h-[400px] sm:h-[600px] bg-gradient-to-b from-[#0A1221] to-transparent opacity-80" />
      </div>

      <div className="relative z-10 w-full px-3 sm:px-4 pb-8 sm:pb-12 pt-24 sm:pt-28 md:pt-32">
        {/* Title */}
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight mb-3 uppercase italic">
            SocialBureau <span className={activeTab === "treasure-hunt" ? "text-yellow-500" : "text-blue-500"}>Leaderboard</span>
          </h1>
          <p className="text-gray-400 text-xs sm:text-sm italic">
            {activeTab === "treasure-hunt" 
              ? "The fastest adventurers to complete the grand Treasure Hunt challenge." 
              : "Tracking active achievements and community engagement statistics."}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-12">
          <div className="bg-[#101726] border border-white/10 rounded-full p-1.5 flex gap-1 shadow-[0_4px_20px_rgba(0,0,0,0.4)]">
            <button
              onClick={() => setActiveTab("treasure-hunt")}
              className={`px-5 sm:px-8 py-2.5 rounded-full text-xs sm:text-sm font-extrabold uppercase tracking-wide transition-all duration-300 flex items-center gap-2 ${
                activeTab === "treasure-hunt"
                  ? "bg-yellow-500 text-black shadow-[0_0_15px_rgba(234,179,8,0.4)]"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              🏆 Treasure Hunt
            </button>
            <button
              onClick={() => setActiveTab("community")}
              className={`px-5 sm:px-8 py-2.5 rounded-full text-xs sm:text-sm font-extrabold uppercase tracking-wide transition-all duration-300 flex items-center gap-2 ${
                activeTab === "community"
                  ? "bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              💎 Community Points
            </button>
          </div>
        </div>

        {/* Time Range Filter (Only for Community tab) */}
        {activeTab === "community" && (
          <div className="flex justify-center gap-3 mb-10">
            <button
              onClick={() => setTimeRange("daily")}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors ${
                timeRange === "daily" ? "bg-white/15 text-white border border-white/20" : "text-gray-400 hover:text-white border border-transparent"
              }`}
            >
              Daily
            </button>
            <button
              onClick={() => setTimeRange("monthly")}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors ${
                timeRange === "monthly" ? "bg-white/15 text-white border border-white/20" : "text-gray-400 hover:text-white border border-transparent"
              }`}
            >
              Monthly
            </button>
          </div>
        )}

        {/* Podium Section - Always Horizontal */}
        <div className="flex items-end justify-center gap-2 sm:gap-3 lg:gap-8 mb-10 sm:mb-16 md:mb-24 w-full px-2 sm:px-4">
          {/* 2nd Place */}
          <div className="flex flex-col items-center flex-1 sm:flex-none">
            <div className="mb-2 sm:mb-6 text-center w-full">
              <div className={`w-12 sm:w-20 h-12 sm:h-20 rounded-lg sm:rounded-2xl bg-gradient-to-br p-[1px] mx-auto mb-1 sm:mb-3 shadow-lg ${activeTab === "treasure-hunt" ? "from-[#b8860b] to-[#1e150f]" : "from-[#2D394F] to-[#1A2333]"}`}>
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
              <h3 className="font-bold text-xs sm:text-lg text-gray-200 truncate px-1">{second?.name || "Runner-Up"}</h3>
            </div>

            <div className="w-full sm:w-64 bg-gradient-to-b from-[#111927] to-[#0B1019] rounded-t-lg border-t border-white/10 shadow-lg p-2 sm:p-8">
              <div className="flex flex-col items-center gap-1.5 sm:gap-4">
                <div className="p-1.5 sm:p-3 bg-white/5 rounded-full">
                  {activeTab === "treasure-hunt" ? (
                    <Clock className="w-4 sm:w-8 h-4 sm:h-8 text-yellow-500/70" />
                  ) : (
                    <Trophy className="w-4 sm:w-8 h-4 sm:h-8 text-gray-400" />
                  )}
                </div>
                <span className="text-gray-400 text-[9px] sm:text-sm font-medium text-center">
                  {activeTab === "treasure-hunt" 
                    ? `Time: ${second?.totalTime || "--:--"}`
                    : `Earn ${formatNumber(second?.points || 0)} pts`}
                </span>
                <div className="text-center">
                  <div className="flex items-center gap-1 sm:gap-2 justify-center text-yellow-500 text-sm sm:text-2xl font-bold">
                    {activeTab === "treasure-hunt" ? (
                      <><span>⏱️</span> <span className="text-xs sm:text-2xl font-mono text-yellow-400">{second?.totalTime || "--:--"}</span></>
                    ) : (
                      <><span className="text-blue-400">💎</span> <span className="text-xs sm:text-2xl text-blue-400">{formatNumber((second?.points || 0) * 10)}</span></>
                    )}
                  </div>
                  <span className="text-gray-600 text-[8px] sm:text-[10px] uppercase tracking-wider mt-0.5 sm:mt-1 block">
                    {activeTab === "treasure-hunt" ? "Time Taken" : "Prize"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 1st Place */}
          <div className="flex flex-col items-center flex-1 sm:flex-none">
            <div className="mb-2 sm:mb-8 text-center w-full">
              <div className={`w-16 sm:w-28 h-16 sm:h-28 rounded-lg sm:rounded-2xl bg-gradient-to-br p-[1px] mx-auto mb-1.5 sm:mb-4 shadow-[0_0_40px_rgba(255,255,255,0.1)] ${activeTab === "treasure-hunt" ? "from-[#ffd700] via-[#d4af37] to-transparent" : "from-white/20 to-white/5"}`}>
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
              <h3 className="font-bold text-sm sm:text-2xl text-white truncate px-1">{first?.name || "Champion"}</h3>
            </div>

            <div className="w-full sm:w-72 bg-gradient-to-b from-[#1A2436] to-[#0B1019] rounded-t-lg border-t border-yellow-500/30 shadow-[0_-10px_50px_rgba(234,179,8,0.15)] p-2.5 sm:p-10">
              <div className="flex flex-col items-center gap-2 sm:gap-5">
                <div className="p-2 sm:p-4 bg-yellow-500/10 rounded-full border border-yellow-500/20 shadow-[0_0_20px_rgba(234,179,8,0.2)]">
                  {activeTab === "treasure-hunt" ? (
                    <Clock className="w-5 sm:w-10 h-5 sm:h-10 text-yellow-400 fill-yellow-400/20" />
                  ) : (
                    <Trophy className="w-5 sm:w-10 h-5 sm:h-10 text-yellow-400 fill-yellow-400" />
                  )}
                </div>
                <span className="text-gray-300 text-[9px] sm:text-base font-medium text-center">
                  {activeTab === "treasure-hunt" 
                    ? `Time: ${first?.totalTime || "--:--"}`
                    : `Earn ${formatNumber(first?.points || 0)} pts`}
                </span>

                <div className="text-center">
                  <div className="flex items-center gap-1 sm:gap-2 justify-center text-white text-base sm:text-3xl font-bold drop-shadow-md">
                    {activeTab === "treasure-hunt" ? (
                      <><span>🏆</span> <span className="text-base sm:text-3xl font-mono text-yellow-400">{first?.totalTime || "--:--"}</span></>
                    ) : (
                      <><span className="text-blue-400">💎</span> <span className="text-base sm:text-3xl text-blue-400">{formatNumber((first?.points || 0) * 10)}</span></>
                    )}
                  </div>
                  <span className="text-gray-500 text-[8px] sm:text-[10px] uppercase tracking-wider mt-0.5 sm:mt-1 block">
                    {activeTab === "treasure-hunt" ? "Fastest Run" : "Prize"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 3rd Place */}
          <div className="flex flex-col items-center flex-1 sm:flex-none">
            <div className="mb-2 sm:mb-6 text-center w-full">
              <div className={`w-12 sm:w-20 h-12 sm:h-20 rounded-lg sm:rounded-2xl bg-gradient-to-br p-[1px] mx-auto mb-1 sm:mb-3 shadow-lg ${activeTab === "treasure-hunt" ? "from-[#aa7c11] to-[#1e150f]" : "from-[#2D394F] to-[#1A2333]"}`}>
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
              <h3 className="font-bold text-xs sm:text-lg text-gray-200 truncate px-1">{third?.name || "3rd Place"}</h3>
            </div>

            <div className="w-full sm:w-64 bg-gradient-to-b from-[#111927] to-[#0B1019] rounded-t-lg border-t border-white/10 shadow-lg p-2 sm:p-8">
              <div className="flex flex-col items-center gap-1.5 sm:gap-4">
                <div className="p-1.5 sm:p-3 bg-white/5 rounded-full">
                  {activeTab === "treasure-hunt" ? (
                    <Clock className="w-4 sm:w-8 h-4 sm:h-8 text-[#aa7c11]" />
                  ) : (
                    <Trophy className="w-4 sm:w-8 h-4 sm:h-8 text-amber-700" />
                  )}
                </div>
                <span className="text-gray-400 text-[9px] sm:text-sm font-medium text-center">
                  {activeTab === "treasure-hunt" 
                    ? `Time: ${third?.totalTime || "--:--"}`
                    : `Earn ${formatNumber(third?.points || 0)} pts`}
                </span>
                <div className="text-center">
                  <div className="flex items-center gap-1 sm:gap-2 justify-center text-yellow-600 text-sm sm:text-2xl font-bold">
                    {activeTab === "treasure-hunt" ? (
                      <><span>⏱️</span> <span className="text-xs sm:text-2xl font-mono text-yellow-500">{third?.totalTime || "--:--"}</span></>
                    ) : (
                      <><span className="text-blue-400">💎</span> <span className="text-xs sm:text-2xl text-blue-400">{formatNumber((third?.points || 0) * 10)}</span></>
                    )}
                  </div>
                  <span className="text-gray-600 text-[8px] sm:text-[10px] uppercase tracking-wider mt-0.5 sm:mt-1 block">
                    {activeTab === "treasure-hunt" ? "Time Taken" : "Prize"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating User Bar (Only for Community tab) */}
        {activeTab === "community" && currentUser && (
          <div className="mb-6 sm:mb-8 md:mb-12 mx-2 sm:mx-0">
            <div className="bg-[#182030]/95 backdrop-blur-xl border border-blue-500/20 rounded-xl sm:rounded-2xl px-3 sm:px-8 py-2.5 sm:py-4 flex flex-col gap-2 sm:gap-4 shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 text-xs sm:text-sm">
                <div className="flex items-center gap-2 text-gray-300">
                  <span>You earned</span>
                  <span className="text-blue-400 font-bold">💎 {formatNumber(currentUser.points || 0)}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <span>Rank</span>
                  <span className="text-white font-bold bg-white/10 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded text-xs sm:text-sm">#{currentUser.rank || "-"}</span>
                  <span className="hidden sm:inline">of {formatNumber(leaderboard.length)}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Leaderboard Table */}
        <div className="bg-[#0E1521] rounded-xl sm:rounded-2xl border border-white/5 overflow-hidden mx-2 sm:mx-0 shadow-2xl">
          {/* Headers */}
          <div className="hidden sm:grid grid-cols-12 gap-0 px-4 sm:px-6 lg:px-8 py-4 sm:py-6 text-gray-500 text-xs uppercase tracking-wider font-medium border-b border-white/5 bg-[#131B2C]/50">
            <div className="col-span-1">Rank</div>
            <div className="col-span-7">User</div>
            <div className="col-span-2 text-center">{activeTab === "treasure-hunt" ? "Time Taken" : "Points"}</div>
            <div className="col-span-2 text-right">{activeTab === "treasure-hunt" ? "Completed Date" : "Reward"}</div>
          </div>

          {/* List Items */}
          <div className="divide-y divide-white/5">
            {activeList.length > 0 ? (
              activeList.map((user, index) => {
                const rank = index + 1;
                const isMe = activeTab === "community" && user._id === currentUser?._id;

                return (
                  <div
                    key={user._id}
                    className={`grid grid-cols-12 gap-2 sm:gap-0 px-3 sm:px-6 lg:px-8 py-3.5 sm:py-5 items-center hover:bg-white/[0.02] transition-colors
                      ${isMe ? "bg-blue-500/5 hover:bg-blue-500/10" : ""}
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
                          {activeTab === "treasure-hunt" 
                            ? `Completed Hunter`
                            : `@${user.name.split(' ')[0].toLowerCase()}`}
                        </div>
                      </div>
                    </div>

                    {/* Points / Time */}
                    <div className="col-span-2 text-white font-medium text-xs sm:text-base text-center">
                      <div className="text-[7px] sm:text-xs text-gray-500 uppercase tracking-wider mb-0.5 sm:hidden">
                        {activeTab === "treasure-hunt" ? "Time taken" : "Points"}
                      </div>
                      {activeTab === "treasure-hunt" ? (
                        <span className="font-mono text-yellow-400 font-bold">{user.totalTime}</span>
                      ) : (
                        formatNumber(user.points || 0)
                      )}
                    </div>

                    {/* Reward / Completed Date */}
                    <div className="col-span-3 sm:col-span-2 text-right">
                      {activeTab === "treasure-hunt" ? (
                        <div>
                          <div className="text-[7px] sm:text-xs text-gray-500 uppercase tracking-wider mb-0.5 sm:hidden block">Date</div>
                          <span className="text-gray-400 text-[9px] sm:text-sm">
                            {new Date(user.createdAt).toLocaleDateString(undefined, {
                              month: "short",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit"
                            })}
                          </span>
                        </div>
                      ) : (
                        <div>
                          <div className="text-[7px] sm:text-xs text-gray-500 uppercase tracking-wider mb-0.5 block">Reward</div>
                          <div className="inline-flex items-center gap-0.5 sm:gap-2 px-1.5 sm:px-4 py-0.5 sm:py-2 rounded text-[8px] sm:text-sm bg-[#151E2E] border border-white/5 hover:bg-[#1A253A] transition-colors float-right">
                            <span>💎</span>
                            <span className="text-white font-bold text-[7px] sm:text-sm">{formatNumber((user.points || 0) * 10)}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="p-12 text-center text-gray-500">
                <Trophy className="w-12 h-12 mx-auto mb-4 opacity-20" />
                <p className="text-xs sm:text-base">No completions registered yet. Be the first to claim!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
