
import React, { useEffect, useState } from "react";
import { Trophy, Clock } from "lucide-react";
import { BASE_URL } from "../../utils/urls";

export default function DynamicLeaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [timeRange, setTimeRange] = useState("monthly");
  const [timeLeft, setTimeLeft] = useState("");

  const getCurrentUserId = () => {
    try {
      const user = localStorage.getItem("user");
      return user ? JSON.parse(user).id : null;
    } catch {
      return null;
    }
  };

  const fetchLeaderboard = async () => {
    try {
      setLoading(true);
      setError("");
      const param = timeRange === "daily" ? "daily" : "monthly";

      console.log(`Fetching leaderboard with range: ${param}`);

      const res = await fetch(`${BASE_URL}/user/leaderboard?range=${param}`, {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error(`Failed to load leaderboard: ${res.statusText}`);
      }

      const data = await res.json();
      console.log("Leaderboard data received:", data);

      if (data?.success && Array.isArray(data.data) && data.data.length > 0) {
        setLeaderboard(data.data);

        const uid = getCurrentUserId();
        const index = data.data.findIndex((u) => u._id === uid);
        if (index !== -1) {
          setCurrentUser({ ...data.data[index], rank: index + 1 });
        } else {
          // User not in leaderboard, reset current user
          setCurrentUser(null);
        }
      } else if (data?.success && Array.isArray(data.data)) {
        // Empty leaderboard
        setLeaderboard([]);
        setCurrentUser(null);
      } else {
        throw new Error("Invalid data format from server");
      }
    } catch (err) {
      setError(err.message);
      console.error("Leaderboard fetch error:", err);
      console.log(`Check if your backend supports the '${timeRange}' range parameter`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
    const interval = setInterval(fetchLeaderboard, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, [timeRange]);

  // Countdown timer
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
    return [leaderboard[0] || null, leaderboard[1] || null, leaderboard[2] || null];
  };

  const getFollowers = (user) => {
    if (!user) return 0;
    return (user.engagement?.likes || 0) * 12 + 500;
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  const [first, second, third] = getTopThree();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#050B14] to-[#0A1221] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin text-4xl mb-4">⚙️</div>
          <p className="text-gray-400">Loading leaderboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#050B14] to-[#0A1221] flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <p className="text-red-400 mb-2">❌ Error: {error}</p>
          <p className="text-gray-400 mb-4 text-sm">
            Endpoint: <code className="bg-black/50 px-2 py-1 rounded">{BASE_URL}/user/leaderboard?range={timeRange}</code>
          </p>
          <p className="text-gray-400 mb-6 text-sm">Make sure your backend is running and the endpoint supports the '{timeRange}' range parameter</p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => fetchLeaderboard()}
              className="px-6 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg text-white font-medium transition"
            >
              Try Again
            </button>
            <button
              onClick={() => setError("")}
              className="px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white font-medium transition"
            >
              Dismiss
            </button>
          </div>
          <p className="text-gray-500 text-xs mt-6">Check browser console (F12) for detailed logs</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#050B14] to-[#0A1221] text-white font-sans overflow-x-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none">
        {/* Violet border glow */}
        <div
          className="
      absolute
      top-0
      left-1/2
      -translate-x-1/2
      w-[140vw]
      h-[70vw]
      max-w-[820px]
      max-h-[320px]
      rounded-b-full
      bg-gradient-to-b
      from-violet-400/40
      via-fuchsia-400/25
      to-transparent
      blur-[12px]
    "
        />

        {/* Main gray semicircle */}
        <div
          className="
      relative
      w-[140vw]
      h-[70vw]
      max-w-[800px]
      max-h-[300px]
      rounded-b-full
      bg-gradient-to-b
      from-white/40
      via-white/25
      to-transparent
      blur-[2px]
    "
        />
      </div>



      {/* Background Glows */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[80%] md:w-[60%] h-[300px] md:h-[400px] bg-blue-600/20 rounded-[100%] blur-[100px]" />
        <div className="absolute top-0 inset-x-0 h-[600px] bg-gradient-to-b from-[#0A1221] to-transparent opacity-80" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 pb-12 pt-6 md:pt-8">
        {/* Tabs */}
        <div className="flex justify-center mb-8 md:mb-12">
          <div className="bg-[#131B2C] border border-white/5 p-1 rounded-full flex gap-1">
            {["daily", "monthly"].map((tab) => (
              <button
                key={tab}
                onClick={() => setTimeRange(tab)}
                className={`px-6 md:px-10 py-2 md:py-2.5 rounded-full text-xs md:text-sm font-medium transition-all duration-300 capitalize
                  ${timeRange === tab
                    ? "bg-[#2A354D] text-white shadow-lg"
                    : "text-gray-400 hover:text-white"
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Podium Section */}
        <div className="flex flex-col md:flex-row items-end justify-center gap-3 md:gap-4 lg:gap-8 mb-16 md:mb-24 mt-12 md:mt-20">
          {/* 2nd Place */}
          <div className="flex flex-col items-center order-2 md:order-1 w-full md:w-auto">
            <div className="mb-4 md:mb-6 text-center group">
              <div className="w-16 md:w-20 h-16 md:h-20 rounded-2xl bg-gradient-to-br from-[#2D394F] to-[#1A2333] p-[2px] mx-auto mb-2 md:mb-3 shadow-lg">
                <div className="w-full h-full bg-[#1e293b] rounded-2xl overflow-hidden">
                  <img
                    src={second?.avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=player2"}
                    alt={second?.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <h3 className="font-bold text-sm md:text-lg text-gray-200">{second?.name || "Player 2"}</h3>
            </div>

            <div className="w-full md:w-64 md:h-[300px] bg-gradient-to-b from-[#111927] to-[#0B1019] rounded-t-lg border-t border-white/10 shadow-lg p-4 md:py-8">
              <div className="flex flex-col items-center gap-3 md:gap-4">
                <div className="p-2 md:p-3 bg-white/5 rounded-full">
                  <Trophy className="w-6 md:w-8 h-6 md:h-8 text-gray-400" />
                </div>
                <span className="text-gray-400 text-xs md:text-sm font-medium text-center">Earn {formatNumber(second?.points || 0)} points</span>
                <div className="mt-2 md:mt-4 text-center">
                  <div className="flex items-center gap-2 justify-center text-blue-400 text-xl md:text-2xl font-bold">
                    <span>💎</span> 50,000
                  </div>
                  <span className="text-gray-600 text-[10px] uppercase tracking-widest mt-1 block">Prize</span>
                </div>
              </div>
            </div>
          </div>

          {/* 1st Place */}
          <div className="flex flex-col items-center order-1 md:order-2 relative -top-4 md:-top-8 w-full md:w-auto">
            <div className="mb-4 md:mb-8 text-center group">
              <div className="w-24 md:w-28 h-24 md:h-28 rounded-2xl bg-gradient-to-br from-white/20 to-white/5 p-[1px] mx-auto mb-3 md:mb-4 shadow-[0_0_40px_rgba(255,255,255,0.1)]">
                <div className="w-full h-full rounded-2xl overflow-hidden bg-[#2A3347]">
                  <img
                    src={first?.avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=champion"}
                    alt={first?.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <h3 className="font-bold text-lg md:text-2xl text-white">{first?.name || "Champion"}</h3>
            </div>

            <div className="w-full md:w-72 md:h-[380px] bg-gradient-to-b from-[#1A2436] to-[#0B1019] rounded-t-lg border-t border-blue-500/30 shadow-[0_-10px_50px_rgba(37,99,235,0.15)] p-4 md:py-10">
              <div className="flex flex-col items-center gap-3 md:gap-5">
                <div className="p-3 md:p-4 bg-yellow-500/10 rounded-full border border-yellow-500/20 shadow-[0_0_20px_rgba(234,179,8,0.2)]">
                  <Trophy className="w-8 md:w-10 h-8 md:h-10 text-yellow-400 fill-yellow-400" />
                </div>
                <span className="text-gray-300 text-xs md:text-base font-medium text-center">Earn {formatNumber(first?.points || 0)} points</span>

                <div className="text-center my-2">
                  <div className="flex items-center gap-2 justify-center text-white text-2xl md:text-3xl font-bold drop-shadow-md">
                    <span className="text-blue-400">💎</span> 100,000
                  </div>
                  <span className="text-gray-500 text-[10px] uppercase tracking-widest mt-1 block">Prize</span>
                </div>

                <div className="flex flex-col items-center gap-1 mt-3 md:mt-4">
                  <Clock className="w-4 md:w-5 h-4 md:h-5 text-blue-400 mb-1" />
                  <span className="text-[10px] text-gray-500 uppercase tracking-widest">Ends in</span>
                  <span className="text-white font-mono text-xs md:text-sm tracking-wide">{timeLeft}</span>
                </div>
              </div>
            </div>
          </div>

          {/* 3rd Place */}
          <div className="flex flex-col items-center order-3 w-full md:w-auto">
            <div className="mb-4 md:mb-6 text-center group">
              <div className="w-16 md:w-20 h-16 md:h-20 rounded-2xl bg-gradient-to-br from-[#2D394F] to-[#1A2333] p-[2px] mx-auto mb-2 md:mb-3 shadow-lg">
                <div className="w-full h-full bg-[#1e293b] rounded-2xl overflow-hidden">
                  <img
                    src={third?.avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=player3"}
                    alt={third?.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <h3 className="font-bold text-sm md:text-lg text-gray-200">{third?.name || "Player 3"}</h3>
            </div>

            <div className="w-full md:w-64 md:h-[300px] bg-gradient-to-b from-[#111927] to-[#0B1019] rounded-t-lg border-t border-white/10 shadow-lg p-4 md:py-8">
              <div className="flex flex-col items-center gap-3 md:gap-4">
                <div className="p-2 md:p-3 bg-white/5 rounded-full">
                  <Trophy className="w-6 md:w-8 h-6 md:h-8 text-amber-700" />
                </div>
                <span className="text-gray-400 text-xs md:text-sm font-medium text-center">Earn {formatNumber(third?.points || 0)} points</span>
                <div className="mt-2 md:mt-4 text-center">
                  <div className="flex items-center gap-2 justify-center text-blue-400 text-xl md:text-2xl font-bold">
                    <span>💎</span> 20,000
                  </div>
                  <span className="text-gray-600 text-[10px] uppercase tracking-widest mt-1 block">Prize</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating User Bar */}
        {currentUser && (
          <div className="mb-8 md:mb-12">
            <div className="bg-[#182030]/95 backdrop-blur-xl border border-blue-500/20 rounded-2xl px-4 md:px-8 py-4 flex flex-col gap-3 md:gap-4 shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-4 text-xs md:text-sm">
                <div className="flex items-center gap-2 text-gray-300">
                  <span>You earned</span>
                  <span className="text-blue-400 font-bold">💎 {formatNumber(currentUser.points || 0)}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <span>Rank</span>
                  <span className="text-white font-bold bg-white/10 px-3 py-1 rounded">#{currentUser.rank || "-"}</span>
                  <span>of {formatNumber(leaderboard.length)} users</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Leaderboard Table */}
        <div className="bg-[#0E1521] rounded-2xl border border-white/5 overflow-hidden">
          {/* Headers */}
          <div className="grid grid-cols-4 md:grid-cols-12 gap-2 md:gap-0 px-3 md:px-8 py-3 md:py-6 text-gray-500 text-[10px] md:text-xs uppercase tracking-wider font-medium border-b border-white/5 bg-[#131B2C]/50">
            <div className="col-span-1">Rank</div>
            <div className="col-span-2 md:col-span-5">User</div>
            <div className="col-span-1 md:col-span-3 text-center">Followers</div>
            <div className="col-span-1 md:col-span-1 text-center">Points</div>
            <div className="col-span-1 md:col-span-2 text-right">Reward</div>
          </div>

          {/* List Items */}
          <div className="divide-y divide-white/5">
            {leaderboard.length > 0 ? (
              leaderboard.map((user, index) => {
                const rank = index + 1;
                const isMe = user._id === currentUser?._id;

                return (
                  <div
                    key={user._id}
                    className={`grid grid-cols-4 md:grid-cols-12 gap-2 md:gap-0 px-3 md:px-8 py-3 md:py-5 items-center hover:bg-white/[0.02] transition-colors
                      ${isMe ? "bg-blue-500/5 hover:bg-blue-500/10" : ""}
                    `}
                  >
                    <div className="col-span-1 font-bold text-white text-sm md:text-lg">#{rank}</div>

                    <div className="col-span-2 md:col-span-5 flex items-center gap-2 md:gap-4">
                      <div className="w-8 md:w-10 h-8 md:h-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-600 p-[1px] flex-shrink-0">
                        <div className="w-full h-full rounded-full overflow-hidden bg-[#0B121E]">
                          <img
                            src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`}
                            alt={user.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      <div className="min-w-0">
                        <div className={`font-semibold text-xs md:text-base truncate ${isMe ? "text-blue-400" : "text-white"}`}>
                          {user.name}
                        </div>
                        <div className="text-[10px] text-gray-500 truncate">@{user.name.split(' ')[0].toLowerCase()}</div>
                      </div>
                    </div>

                    <div className="col-span-1 md:col-span-3 text-white font-medium text-xs md:text-base text-center">
                      {formatNumber(getFollowers(user))}
                    </div>

                    <div className="col-span-1 md:col-span-1 text-white font-medium text-xs md:text-base text-center">
                      {formatNumber(user.points || 0)}
                    </div>

                    <div className="col-span-1 md:col-span-2 text-right">
                      <div className="inline-flex items-center gap-1 md:gap-2 px-2 md:px-4 py-1 md:py-2 rounded-lg bg-[#151E2E] border border-white/5 hover:bg-[#1A253A] transition-colors text-xs md:text-sm">
                        <span>💎</span>
                        <span className="text-white font-bold">1K</span>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="p-8 md:p-12 text-center text-gray-500">
                <Trophy className="w-12 h-12 mx-auto mb-4 opacity-20" />
                <p>More players joining soon to fill the ranks!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}