// // // import React, { useEffect, useState } from "react";
// // // import {BASE_URL} from '../../utils/urls';

// // // export default function DynamicLeaderboard() {
// // //   const [leaderboard, setLeaderboard] = useState([]);
// // //   const [currentUser, setCurrentUser] = useState(null);
// // //   const [loading, setLoading] = useState(true);
// // //   const [error, setError] = useState(null);
// // //   const [refreshing, setRefreshing] = useState(false);

// // //   // Get current user ID from localStorage
// // //   const getCurrentUserId = () => {
// // //     try {
// // //       const user = localStorage.getItem("user");
// // //       return user ? JSON.parse(user).id : null;
// // //     } catch (err) {
// // //       return null;
// // //     }
// // //   };

// // //   // Fetch leaderboard data
// // //   const fetchLeaderboard = async () => {
// // //     try {
// // //       setRefreshing(true);
// // //       const response = await fetch(`${BASE_URL}/user/leaderboard`, {
// // //         method: "GET",
// // //         credentials: "include",
// // //         headers: {
// // //           "Content-Type": "application/json",
// // //         },
// // //       });

// // //       if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

// // //       const data = await response.json();

// // //       if (data?.success && Array.isArray(data.data)) {
// // //         const users = data.data;
// // //         setLeaderboard(users);

// // //         // Find current user in leaderboard
// // //         const userId = getCurrentUserId();
// // //         const userIndex = users.findIndex((u) => u._id === userId);
// // //         if (userIndex !== -1) {
// // //           setCurrentUser({
// // //             rank: userIndex + 1,
// // //             ...users[userIndex],
// // //           });
// // //         }
// // //       }
// // //       setError(null);
// // //     } catch (err) {
// // //       console.error("Error fetching leaderboard:", err);
// // //       setError("Failed to load leaderboard. Please try again.");
// // //     } finally {
// // //       setLoading(false);
// // //       setRefreshing(false);
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     fetchLeaderboard();
// // //     // Refresh every 30 seconds
// // //     const interval = setInterval(fetchLeaderboard, 30000);
// // //     return () => clearInterval(interval);
// // //   }, []);

// // //   const targets = [20, 50, 100, 250];
// // //   const maxTarget = targets[targets.length - 1];
  
// // //   const myStats = currentUser
// // //     ? {
// // //         totalPoints: currentUser.points || 0,
// // //         likes: currentUser.engagement?.likes || 0,
// // //         comments: currentUser.engagement?.comments || 0,
// // //         shares: currentUser.engagement?.shares || 0,
// // //       }
// // //     : { totalPoints: 0, likes: 0, comments: 0, shares: 0 };

// // //   const progressPercent = Math.min((myStats.totalPoints / maxTarget) * 100, 100);

// // //   const getRankIcon = (index) => {
// // //     const icons = ["👑", "🥈", "🥉", "✨", "🌟", "💫", "⭐", "🌠"];
// // //     return icons[index] || "🎯";
// // //   };


// // //   const getRankColor = (index) => {
// // //     const colors = [
// // //       "bg-gradient-to-br from-yellow-300 via-yellow-400 to-yellow-500",
// // //       "bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400",
// // //       "bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600",
// // //       "bg-gradient-to-br from-pink-300 via-pink-400 to-pink-500",
// // //       "bg-gradient-to-br from-blue-300 via-blue-400 to-blue-500",
// // //       "bg-gradient-to-br from-purple-300 via-purple-400 to-purple-500",
// // //       "bg-gradient-to-br from-green-300 via-green-400 to-green-500",
// // //       "bg-gradient-to-br from-indigo-300 via-indigo-400 to-indigo-500",
// // //     ];
// // //     return colors[index] || "bg-gradient-to-br from-gray-100 to-gray-300";
// // //   };

// // //   if (loading) {
// // //     return (
// // //       <div className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-purple-50 flex items-center justify-center">
// // //         <div className="text-center">
// // //           <div className="inline-block">
// // //             <div className="animate-spin text-4xl mb-4">⚙️</div>
// // //             <p className="text-gray-600 font-medium">Loading leaderboard...</p>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <div className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-purple-50 px-4 py-8">
// // //       <div className="max-w-4xl mx-auto">
// // //         {/* Header */}
// // //         <div className="text-center mb-10 relative">
// // //           <div className="inline-block relative">
// // //             <div className="absolute -inset-4 bg-gradient-to-r from-pink-200 to-purple-200 rounded-full blur-xl opacity-60" />
// // //             <h1 className="relative text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent pb-2">
// // //               🏆 Leaderboard
// // //             </h1>
// // //           </div>
// // //           <p className="text-gray-600 mt-4 text-lg">Climb the ranks and compete! 🎮</p>
          
// // //           <div className="absolute top-0 right-4 animate-bounce text-2xl">✨</div>
// // //           <div className="absolute top-4 left-4 animate-bounce text-2xl" style={{ animationDelay: "0.3s" }}>🎀</div>
// // //         </div>

// // //         {/* Stats Cards */}
// // //         {currentUser && (
// // //           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
// // //             <CuteCard 
// // //               title="Your Points" 
// // //               value={myStats.totalPoints}
// // //               icon="💎"
// // //               color="pink"
// // //             />
// // //             <CuteCard
// // //               title="Rank"
// // //               value={`#${currentUser.rank}`}
// // //               icon="👑"
// // //               color="purple"
// // //               sub={`${leaderboard.length} participants`}
// // //             />
// // //             <CuteCard 
// // //               title="Engagement" 
// // //               value={myStats.likes + myStats.comments + myStats.shares}
// // //               icon="❤️"
// // //               color="blue"
// // //               sub="Likes & Comments"
// // //             />
// // //           </div>
// // //         )}

// // //         {/* Progress Section */}
// // //         {currentUser && (
// // //           <div className="bg-white rounded-2xl p-6 mb-10 shadow-lg border border-pink-100 relative overflow-hidden">
// // //             <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-pink-100 to-transparent rounded-bl-full" />
            
// // //             <div className="relative">
// // //               <div className="flex items-center justify-between mb-6">
// // //                 <div>
// // //                   <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
// // //                     <span className="text-yellow-500">⭐</span> Your Journey
// // //                   </h2>
// // //                   <p className="text-gray-600">Complete milestones to earn rewards!</p>
// // //                 </div>
// // //                 <div className="text-right">
// // //                   <div className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
// // //                     {myStats.totalPoints}
// // //                   </div>
// // //                   <div className="text-sm text-gray-500">current points</div>
// // //                 </div>
// // //               </div>

// // //               <div className="mb-8">
// // //                 <div className="flex justify-between items-center mb-3">
// // //                   <span className="text-gray-700 font-medium">Milestone Progress</span>
// // //                   <span className="text-pink-500 font-semibold">{progressPercent.toFixed(1)}%</span>
// // //                 </div>
// // //                 <div className="relative h-6 bg-gradient-to-r from-pink-100 to-purple-100 rounded-full overflow-hidden border-2 border-white shadow-inner">
// // //                   <div
// // //                     className="absolute h-6 bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 rounded-full transition-all duration-1000 ease-out"
// // //                     style={{ width: `${progressPercent}%` }}
// // //                   >
// // //                     <div className="absolute right-2 top-1/2 transform -translate-y-1/2 animate-pulse">✨</div>
// // //                   </div>
                  
// // //                   <div
// // //                     className="absolute -top-2 transition-all duration-1000 ease-out"
// // //                     style={{ left: `calc(${progressPercent}% - 16px)` }}
// // //                   >
// // //                     <div className="relative">
// // //                       <div className="w-8 h-8 bg-white rounded-full border-4 border-pink-400 shadow-lg flex items-center justify-center">
// // //                         <span className="text-pink-500">👉</span>
// // //                       </div>
// // //                     </div>
// // //                   </div>
// // //                 </div>
// // //               </div>

// // //               <div className="grid grid-cols-4 gap-4">
// // //                 {targets.map((target) => (
// // //                   <div key={target} className="text-center">
// // //                     <div className={`relative w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-2 shadow-lg transition-transform hover:scale-110
// // //                       ${myStats.totalPoints >= target 
// // //                         ? "bg-gradient-to-br from-yellow-300 to-yellow-400 border-4 border-yellow-200" 
// // //                         : "bg-gradient-to-br from-gray-100 to-gray-200 border-4 border-gray-200"
// // //                       }`}
// // //                     >
// // //                       <span className={`text-2xl ${myStats.totalPoints >= target ? "text-yellow-700" : "text-gray-400"}`}>
// // //                         {myStats.totalPoints >= target ? "🏆" : "🎯"}
// // //                       </span>
// // //                       {myStats.totalPoints >= target && (
// // //                         <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-br from-pink-500 to-red-500 rounded-full flex items-center justify-center">
// // //                           <span className="text-white text-xs">✓</span>
// // //                         </div>
// // //                       )}
// // //                     </div>
// // //                     <span className={`font-bold ${myStats.totalPoints >= target ? "text-yellow-600" : "text-gray-500"}`}>
// // //                       {target}
// // //                     </span>
// // //                   </div>
// // //                 ))}
// // //               </div>
// // //             </div>
// // //           </div>
// // //         )}

// // //         {/* Leaderboard List */}
// // //         <div className="bg-white rounded-2xl p-6 shadow-lg border border-purple-100">
// // //           <div className="flex items-center justify-between mb-8">
// // //             <div>
// // //               <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
// // //                 <span className="text-purple-500">👑</span> Top Players
// // //               </h2>
// // //               <p className="text-gray-600">See where you stand!</p>
// // //             </div>
// // //             <div className="px-4 py-2 bg-gradient-to-r from-pink-50 to-purple-50 rounded-full border border-pink-200 flex items-center gap-2">
// // //               <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
// // //               <span className="text-sm text-purple-600 font-medium">
// // //                 {refreshing ? "Updating..." : "Live"}
// // //               </span>
// // //             </div>
// // //           </div>

// // //           {error && (
// // //             <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
// // //               {error}
// // //             </div>
// // //           )}

// // //           {leaderboard.length === 0 ? (
// // //             <p className="text-center text-gray-500 py-8">No leaderboard data available yet</p>
// // //           ) : (
// // //             <div className="space-y-4">
// // //               {leaderboard.map((user, index) => (
// // //                 <div
// // //                   key={user._id}
// // //                   className={`group relative overflow-hidden rounded-xl p-4 transition-all duration-300 hover:shadow-xl
// // //                     ${user._id === currentUser?._id
// // //                       ? "bg-gradient-to-r from-pink-50 to-purple-50 border-2 border-pink-300 shadow-md" 
// // //                       : "bg-gradient-to-r from-gray-50 to-white border border-gray-100"
// // //                     }
// // //                     hover:scale-[1.02] hover:-translate-y-1
// // //                   `}
// // //                 >
// // //                   <div className="absolute right-0 top-0 w-24 h-24 opacity-10 text-4xl">
// // //                     {user.name.charAt(0).toUpperCase()}
// // //                   </div>

// // //                   <div className="relative flex items-center">
// // //                     {/* Rank Badge */}
// // //                     <div className="mr-4">
// // //                       <div className={`relative w-12 h-12 rounded-full flex items-center justify-center shadow-lg ${getRankColor(index)}`}>
// // //                         <span className="text-xl">{getRankIcon(index)}</span>
// // //                         <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full border-2 border-pink-300 flex items-center justify-center">
// // //                           <span className="text-xs font-bold text-gray-700">#{index + 1}</span>
// // //                         </div>
// // //                       </div>
// // //                     </div>

// // //                     {/* User Info */}
// // //                     <div className="flex-1">
// // //                       <div className="flex items-center gap-3 mb-1">
// // //                         <span className={`text-lg font-semibold ${user._id === currentUser?._id ? "text-pink-600" : "text-gray-800"}`}>
// // //                           {user.name}
// // //                         </span>
// // //                         {user._id === currentUser?._id && (
// // //                           <span className="px-3 py-1 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs rounded-full font-medium shadow-sm">
// // //                             You 🎉
// // //                           </span>
// // //                         )}
// // //                         {index < 3 && user._id !== currentUser?._id && (
// // //                           <span className="px-2 py-1 bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-700 text-xs rounded-full font-medium">
// // //                             Top {index + 1} 🏅
// // //                           </span>
// // //                         )}
// // //                       </div>
// // //                       <div className="flex items-center gap-4 text-sm text-gray-600">
// // //                         <span className="flex items-center gap-1">
// // //                           <span className="text-yellow-500">⭐</span>
// // //                           Level {Math.floor((user.points || 0) / 20) + 1}
// // //                         </span>
// // //                         <span>•</span>
// // //                         <span className="flex items-center gap-1">
// // //                           <span className="text-blue-500">💎</span>
// // //                           {user.points || 0} points
// // //                         </span>
// // //                       </div>
// // //                     </div>

// // //                     {/* Points */}
// // //                     <div className="text-right">
// // //                       <div className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
// // //                         {user.points || 0}
// // //                       </div>
// // //                       <div className="text-xs text-gray-500 mt-1">
// // //                         +{Math.floor((user.points || 0) / 20)} today
// // //                       </div>
// // //                     </div>
// // //                   </div>

// // //                   {/* Progress Bar */}
// // //                   <div className="mt-3">
// // //                     <div className="flex justify-between text-xs text-gray-500 mb-1">
// // //                       <span>Progress to next level</span>
// // //                       <span>{Math.min(((user.points || 0) % 20) * 5, 100)}%</span>
// // //                     </div>
// // //                     <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
// // //                       <div 
// // //                         className="h-2 bg-gradient-to-r from-pink-300 to-purple-400 rounded-full transition-all duration-1000"
// // //                         style={{ width: `${Math.min(((user.points || 0) % 20) * 5, 100)}%` }}
// // //                       />
// // //                     </div>
// // //                   </div>
// // //                 </div>
// // //               ))}
// // //             </div>
// // //           )}

// // //           {/* Footer */}
// // //           <div className="mt-8 pt-6 border-t border-gray-100">
// // //             <div className="flex flex-col md:flex-row justify-between items-center gap-4">
// // //               <div className="flex items-center gap-2">
// // //                 <span className="text-2xl">🎁</span>
// // //                 <span className="text-gray-700">Rewards refresh every Monday!</span>
// // //               </div>
// // //               <div className="flex items-center gap-2">
// // //                 <div className="flex">
// // //                   {[1, 2, 3].map((i) => (
// // //                     <div 
// // //                       key={i} 
// // //                       className="w-2 h-2 rounded-full bg-gradient-to-r from-pink-400 to-purple-400 mx-1 animate-bounce" 
// // //                       style={{ animationDelay: `${i * 0.2}s` }} 
// // //                     />
// // //                   ))}
// // //                 </div>
// // //                 <span className="text-gray-600 text-sm">
// // //                   {refreshing ? "Updating..." : "Updated just now"}
// // //                 </span>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         </div>

// // //         {/* Encouragement */}
// // //         <div className="mt-10 text-center">
// // //           <div className="inline-flex items-center gap-3 bg-gradient-to-r from-pink-50 to-purple-50 px-6 py-4 rounded-2xl border border-pink-200 shadow-sm">
// // //             <span className="text-3xl">🎉</span>
// // //             <div className="text-left">
// // //               <p className="font-medium text-gray-800">Keep going! You're doing amazing!</p>
// // //               <p className="text-sm text-gray-600">Keep earning points and climb the leaderboard!</p>
// // //             </div>
// // //             <span className="text-3xl">✨</span>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // function CuteCard({ title, value, icon, color = "pink", sub }) {
// // //   const colorClasses = {
// // //     pink: "from-pink-400 to-pink-500",
// // //     purple: "from-purple-400 to-purple-500",
// // //     blue: "from-blue-400 to-blue-500",
// // //   };

// // //   const bgClasses = {
// // //     pink: "bg-gradient-to-br from-pink-50 to-pink-100",
// // //     purple: "bg-gradient-to-br from-purple-50 to-purple-100",
// // //     blue: "bg-gradient-to-br from-blue-50 to-blue-100",
// // //   };

// // //   return (
// // //     <div className={`relative overflow-hidden rounded-2xl p-6 shadow-lg transition-all duration-300 hover:scale-[1.03] ${bgClasses[color]}`}>
// // //       <div className="absolute -top-6 -right-6 w-20 h-20 bg-gradient-to-br from-white/20 to-transparent rounded-full" />
      
// // //       <div className="relative">
// // //         <div className="flex items-start justify-between mb-4">
// // //           <div>
// // //             <p className="text-gray-600 text-sm font-medium mb-2">{title}</p>
// // //             <p className="text-3xl font-bold text-gray-800">{value}</p>
// // //           </div>
// // //           <div className="text-3xl">{icon}</div>
// // //         </div>
        
// // //         {sub && (
// // //           <div className="pt-3 border-t border-white/50">
// // //             <span className="text-sm text-gray-600">{sub}</span>
// // //           </div>
// // //         )}
        
// // //         <div className="flex gap-1 mt-4">
// // //           {[1, 2, 3].map((i) => (
// // //             <div key={i} className={`w-2 h-2 rounded-full bg-gradient-to-br ${colorClasses[color]} opacity-40`} />
// // //           ))}
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }



// // import React, { useEffect, useState } from "react";
// // import { BASE_URL } from "../../utils/urls";

// // export default function DynamicLeaderboard() {
// //   const [leaderboard, setLeaderboard] = useState([]);
// //   const [currentUser, setCurrentUser] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState("");
// //   const [refreshing, setRefreshing] = useState(false);

// //   const getCurrentUserId = () => {
// //     try {
// //       const user = localStorage.getItem("user");
// //       return user ? JSON.parse(user).id : null;
// //     } catch {
// //       return null;
// //     }
// //   };

// //   const fetchLeaderboard = async () => {
// //     try {
// //       setRefreshing(true);
// //       const res = await fetch(`${BASE_URL}/user/leaderboard`, {
// //         credentials: "include",
// //       });

// //       if (!res.ok) throw new Error("Failed to load leaderboard");

// //       const data = await res.json();

// //       if (data?.success && Array.isArray(data.data)) {
// //         setLeaderboard(data.data);

// //         const uid = getCurrentUserId();
// //         const index = data.data.findIndex((u) => u._id === uid);
// //         if (index !== -1) {
// //           setCurrentUser({ ...data.data[index], rank: index + 1 });
// //         }
// //       }

// //       setError("");
// //     } catch (err) {
// //       setError(err.message);
// //     } finally {
// //       setLoading(false);
// //       setRefreshing(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchLeaderboard();
// //     const interval = setInterval(fetchLeaderboard, 30000);
// //     return () => clearInterval(interval);
// //   }, []);

// //   if (loading) {
// //     return (
// //       <div className="min-h-screen bg-black flex items-center justify-center text-gray-400">
// //         <div className="animate-spin text-3xl">⚙️</div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen bg-black text-white px-4 py-12">
// //       {/* Background glow */}
// //       <div
// //         className="absolute inset-0 -z-10"
// //         style={{
// //           backgroundImage:
// //             "radial-gradient(circle at 70% 0%, rgba(255,0,0,0.15) 0%, transparent 45%)",
// //         }}
// //       />

// //       <div className="max-w-5xl mx-auto space-y-10">
// //         {/* Header */}
// //         <div className="text-center">
// //           <h1 className="text-3xl md:text-4xl font-bold tracking-wide">
// //             LEADERBOARD
// //           </h1>
// //           <p className="text-gray-400 mt-2">
// //             Performance ranking across the platform
// //           </p>
// //         </div>

// //         {/* My Stats */}
// //         {currentUser && (
// //           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
// //             <StatCard title="Your Rank" value={`#${currentUser.rank}`} />
// //             <StatCard title="Total Points" value={currentUser.points || 0} />
// //             <StatCard
// //               title="Engagement"
// //               value={
// //                 (currentUser.engagement?.likes || 0) +
// //                 (currentUser.engagement?.comments || 0) +
// //                 (currentUser.engagement?.shares || 0)
// //               }
// //             />
// //           </div>
// //         )}

// //         {/* Leaderboard */}
// //         <div className="bg-neutral-950/80 backdrop-blur-xl rounded-3xl shadow-2xl ring-1 ring-red-900/30 p-6">
// //           <div className="flex items-center justify-between mb-6">
// //             <h2 className="text-xl font-semibold tracking-wide">
// //               Top Contributors
// //             </h2>
// //             <span className="text-sm text-gray-400">
// //               {refreshing ? "Updating..." : "Live"}
// //             </span>
// //           </div>

// //           {error && (
// //             <div className="p-4 mb-6 bg-red-950/30 border border-red-700/50 rounded-lg text-red-400">
// //               {error}
// //             </div>
// //           )}

// //           <div className="space-y-4">
// //             {leaderboard.map((user, index) => {
// //               const isMe = user._id === currentUser?._id;
// //               const progress = Math.min(((user.points || 0) % 20) * 5, 100);

// //               return (
// //                 <div
// //                   key={user._id}
// //                   className={`relative rounded-xl p-4 transition
// //                     ${
// //                       isMe
// //                         ? "border border-red-500 bg-red-950/20"
// //                         : "border border-neutral-800 bg-neutral-900/60"
// //                     }
// //                   `}
// //                 >
// //                   <div className="flex items-center justify-between">
// //                     {/* Left */}
// //                     <div>
// //                       <div className="flex items-center gap-3">
// //                         <span className="text-sm text-gray-400">
// //                           #{index + 1}
// //                         </span>
// //                         <span className="font-medium">
// //                           {user.name}
// //                         </span>
// //                         {isMe && (
// //                           <span className="text-xs px-2 py-1 rounded-full bg-red-600">
// //                             You
// //                           </span>
// //                         )}
// //                       </div>

// //                       <div className="text-sm text-gray-400 mt-1">
// //                         Level {Math.floor((user.points || 0) / 20) + 1}
// //                       </div>
// //                     </div>

// //                     {/* Right */}
// //                     <div className="text-right">
// //                       <div className="text-xl font-semibold text-red-500">
// //                         {user.points || 0}
// //                       </div>
// //                       <div className="text-xs text-gray-500">points</div>
// //                     </div>
// //                   </div>

// //                   {/* Progress */}
// //                   <div className="mt-3">
// //                     <div className="h-2 bg-neutral-800 rounded-full overflow-hidden">
// //                       <div
// //                         className="h-2 bg-gradient-to-r from-red-500 to-red-700 transition-all duration-700"
// //                         style={{ width: `${progress}%` }}
// //                       />
// //                     </div>
// //                   </div>
// //                 </div>
// //               );
// //             })}
// //           </div>
// //         </div>

// //         {/* Footer */}
// //         <div className="text-center text-gray-500 text-sm">
// //           Rankings refresh automatically every 30 seconds
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // function StatCard({ title, value }) {
// //   return (
// //     <div className="relative bg-neutral-950/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl ring-1 ring-red-900/30">
// //       <div className="text-sm text-gray-400">{title}</div>
// //       <div className="text-3xl font-bold mt-2 text-red-500">
// //         {value}
// //       </div>
// //     </div>
// //   );
// // }


// import React, { useEffect, useState } from "react";
// import { BASE_URL } from "../../utils/urls";
// import { 
//   Trophy, 
//   Target, 
//   TrendingUp, 
//   RefreshCw, 
//   Star, 
//   Medal,
//   Crown,
//   Zap,
//   Flame,
//   Users
// } from "lucide-react";
// import Footer from "../components/Footer"
// import Navbar from "../components/Navbar"

// export default function DynamicLeaderboard() {
//   const [leaderboard, setLeaderboard] = useState([]);
//   const [currentUser, setCurrentUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [refreshing, setRefreshing] = useState(false);
//   const [viewMode, setViewMode] = useState("all"); // "all", "top3", "nearby"
//   const [timeRange, setTimeRange] = useState("all"); // "all", "weekly", "monthly"

//   const getCurrentUserId = () => {
//     try {
//       const user = localStorage.getItem("user");
//       return user ? JSON.parse(user).id : null;
//     } catch {
//       return null;
//     }
//   };

//   const fetchLeaderboard = async () => {
//     try {
//       setRefreshing(true);
//       const res = await fetch(
//         `${BASE_URL}/user/leaderboard?range=${timeRange}`, 
//         {
//           credentials: "include",
//         }
//       );

//       if (!res.ok) throw new Error("Failed to load leaderboard");

//       const data = await res.json();

//       if (data?.success && Array.isArray(data.data)) {
//         setLeaderboard(data.data);

//         const uid = getCurrentUserId();
//         const index = data.data.findIndex((u) => u._id === uid);
//         if (index !== -1) {
//           setCurrentUser({ ...data.data[index], rank: index + 1 });
//         }
//       }

//       setError("");
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//       setRefreshing(false);
//     }
//   };

//   useEffect(() => {
//     fetchLeaderboard();
//     const interval = setInterval(fetchLeaderboard, 30000);
//     return () => clearInterval(interval);
//   }, [timeRange]);

//   const getTopThree = () => leaderboard.slice(0, 3);
//   const getFilteredLeaderboard = () => {
//     if (viewMode === "top3") return getTopThree();
//     if (viewMode === "nearby" && currentUser) {
//       const userIndex = leaderboard.findIndex(u => u._id === currentUser._id);
//       const start = Math.max(0, userIndex - 2);
//       const end = Math.min(leaderboard.length, userIndex + 3);
//       return leaderboard.slice(start, end);
//     }
//     return leaderboard;
//   };

//   const getRankIcon = (rank) => {
//     switch(rank) {
//       case 1: return <Crown className="w-6 h-6 text-yellow-400" />;
//       case 2: return <Medal className="w-6 h-6 text-gray-300" />;
//       case 3: return <Medal className="w-6 h-6 text-amber-600" />;
//       default: return null;
//     }
//   };

//   const getLevelBadge = (points) => {
//     const level = Math.floor(points / 20) + 1;
//     if (level >= 10) return <Flame className="w-4 h-4 text-orange-500" />;
//     if (level >= 5) return <Zap className="w-4 h-4 text-yellow-500" />;
//     return <Star className="w-4 h-4 text-blue-400" />;
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 flex items-center justify-center">
//         <div className="relative">
//           <div className="absolute inset-0 animate-ping bg-red-500/20 rounded-full"></div>
//           <div className="relative animate-spin text-4xl">⚡</div>
//         </div>
//         <span className="ml-4 text-gray-300 text-lg">Loading Leaderboard...</span>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white px-4 py-8 md:py-12">
//       {/* Animated Background */}
//       <Navbar/>
//       <div className="fixed inset-0 -z-10 overflow-hidden">
//         <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse"></div>
//         <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
//         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/5 rounded-full blur-2xl animate-pulse delay-500"></div>
//       </div>

//       <div className="max-w-6xl mx-auto space-y-8">
//         {/* Header Section */}
//         <div className="text-center space-y-4">
//           <div className="inline-flex items-center gap-3 bg-gradient-to-r from-red-600/20 to-purple-600/20 px-6 py-3 rounded-2xl border border-white/10 backdrop-blur-sm">
//             <Trophy className="w-8 h-8 text-yellow-400" />
//             <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
//               LEADERBOARD
//             </h1>
//             <Trophy className="w-8 h-8 text-yellow-400" />
//           </div>
//           <p className="text-gray-300 text-lg">
//             Real-time ranking of top performers across the platform
//           </p>
//         </div>

//         {/* Controls */}
//         <div className="flex flex-col md:flex-row justify-between items-center gap-4 p-4 bg-black/40 backdrop-blur-sm rounded-2xl border border-white/10">
//           <div className="flex flex-wrap gap-2">
//             {["all", "top3", "nearby"].map((mode) => (
//               <button
//                 key={mode}
//                 onClick={() => setViewMode(mode)}
//                 className={`px-4 py-2 rounded-lg transition-all ${
//                   viewMode === mode
//                     ? "bg-gradient-to-r from-red-600 to-orange-600 text-white"
//                     : "bg-white/5 hover:bg-white/10 text-gray-300"
//                 }`}
//               >
//                 {mode === "all" && <Users className="inline w-4 h-4 mr-2" />}
//                 {mode === "top3" && <Medal className="inline w-4 h-4 mr-2" />}
//                 {mode === "nearby" && <Target className="inline w-4 h-4 mr-2" />}
//                 {mode.charAt(0).toUpperCase() + mode.slice(1)}
//               </button>
//             ))}
//           </div>

//           <div className="flex items-center gap-3">
//             <select
//               value={timeRange}
//               onChange={(e) => setTimeRange(e.target.value)}
//               className="bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
//             >
//               <option value="all">All Time</option>
//               <option value="weekly">This Week</option>
//               <option value="monthly">This Month</option>
//             </select>

//             <button
//               onClick={fetchLeaderboard}
//               disabled={refreshing}
//               className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-700/30 to-purple-700/30 rounded-lg hover:from-red-600/40 hover:to-purple-600/40 transition-all disabled:opacity-50"
//             >
//               <RefreshCw className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`} />
//               {refreshing ? "Refreshing..." : "Refresh"}
//             </button>
//           </div>
//         </div>

//         {/* Current User Stats */}
//         {currentUser && (
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             <StatCard 
//               title="Your Rank" 
//               value={`#${currentUser.rank}`}
//               icon={<Target className="w-6 h-6" />}
//               gradient="from-red-500 to-orange-500"
//               subtitle={currentUser.rank <= 10 ? "Top Tier" : "Keep Going!"}
//             />
//             <StatCard 
//               title="Total Points" 
//               value={currentUser.points || 0}
//               icon={<TrendingUp className="w-6 h-6" />}
//               gradient="from-blue-500 to-cyan-500"
//               subtitle={`Level ${Math.floor((currentUser.points || 0) / 20) + 1}`}
//             />
//             <StatCard 
//               title="Engagement Score" 
//               value={
//                 (currentUser.engagement?.likes || 0) +
//                 (currentUser.engagement?.comments || 0) +
//                 (currentUser.engagement?.shares || 0)
//               }
//               icon={<Zap className="w-6 h-6" />}
//               gradient="from-purple-500 to-pink-500"
//               subtitle="Total Interactions"
//             />
//           </div>
//         )}

//         {/* Top 3 Podium */}
//         {viewMode === "all" && (
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//             {getTopThree().map((user, index) => (
//               <div
//                 key={user._id}
//                 className={`relative rounded-2xl p-6 backdrop-blur-sm transform transition-all hover:scale-105 ${
//                   index === 0
//                     ? "md:order-2 bg-gradient-to-b from-yellow-900/30 to-amber-900/10 border-2 border-yellow-500/50"
//                     : index === 1
//                     ? "md:order-1 bg-gradient-to-b from-gray-800/30 to-gray-900/10 border border-gray-700/50"
//                     : "md:order-3 bg-gradient-to-b from-amber-900/30 to-orange-900/10 border border-amber-700/50"
//                 }`}
//               >
//                 <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
//                   {getRankIcon(index + 1)}
//                 </div>
//                 <div className="text-center space-y-4">
//                   <div className="h-20 w-20 mx-auto rounded-full bg-gradient-to-br from-red-500/20 to-purple-500/20 flex items-center justify-center border-2 border-white/10">
//                     <span className="text-2xl font-bold">
//                       {user.name.charAt(0).toUpperCase()}
//                     </span>
//                   </div>
//                   <div>
//                     <h3 className="text-xl font-bold truncate">{user.name}</h3>
//                     <div className="flex items-center justify-center gap-2 mt-2">
//                       {getLevelBadge(user.points)}
//                       <span className="text-sm text-gray-300">
//                         Level {Math.floor((user.points || 0) / 20) + 1}
//                       </span>
//                     </div>
//                   </div>
//                   <div className="text-3xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
//                     {user.points || 0}
//                   </div>
//                   <div className="text-sm text-gray-400">points</div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* Leaderboard List */}
//         <div className="bg-black/40 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 overflow-hidden">
//           <div className="p-6 border-b border-white/10">
//             <div className="flex items-center justify-between">
//               <h2 className="text-2xl font-bold flex items-center gap-3">
//                 <TrendingUp className="w-6 h-6 text-red-400" />
//                 Global Rankings
//                 <span className="text-sm px-3 py-1 bg-red-500/20 rounded-full">
//                   {leaderboard.length} Players
//                 </span>
//               </h2>
//               <div className="flex items-center gap-2 text-sm text-gray-300">
//                 <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
//                 {refreshing ? "Updating..." : "Live"}
//               </div>
//             </div>
//           </div>

//           {error && (
//             <div className="m-6 p-4 bg-red-950/30 border border-red-700/50 rounded-xl text-red-400 animate-pulse">
//               ⚠️ {error}
//             </div>
//           )}

//           <div className="p-6 space-y-3">
//             {getFilteredLeaderboard().map((user, index) => {
//               const isMe = user._id === currentUser?._id;
//               const rank = leaderboard.findIndex(u => u._id === user._id) + 1;
//               const progress = Math.min(((user.points || 0) % 20) * 5, 100);
//               const level = Math.floor((user.points || 0) / 20) + 1;

//               return (
//                 <div
//                   key={user._id}
//                   className={`group relative rounded-xl p-4 transition-all duration-300 hover:bg-white/5 ${
//                     isMe
//                       ? "bg-gradient-to-r from-red-900/20 to-red-950/10 border-l-4 border-red-500"
//                       : "border-l-4 border-transparent"
//                   }`}
//                 >
//                   {/* Background Glow for Top 3 */}
//                   {rank <= 3 && (
//                     <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/5 to-transparent rounded-xl -z-10"></div>
//                   )}

//                   <div className="flex items-center justify-between">
//                     {/* Left Section */}
//                     <div className="flex items-center gap-4">
//                       <div className="relative">
//                         <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold
//                           ${rank === 1 ? 'bg-gradient-to-br from-yellow-400 to-amber-600 text-black' :
//                             rank === 2 ? 'bg-gradient-to-br from-gray-300 to-gray-500 text-black' :
//                             rank === 3 ? 'bg-gradient-to-br from-amber-700 to-orange-800 text-white' :
//                             'bg-gradient-to-br from-gray-700 to-gray-900 text-white'}`}>
//                           {rank}
//                         </div>
//                         {rank <= 3 && (
//                           <div className="absolute -top-1 -right-1">
//                             {getRankIcon(rank)}
//                           </div>
//                         )}
//                       </div>

//                       <div className="flex items-center gap-3">
//                         <div className="h-10 w-10 rounded-full bg-gradient-to-br from-red-500/30 to-purple-500/30 flex items-center justify-center">
//                           <span className="font-bold">{user.name.charAt(0).toUpperCase()}</span>
//                         </div>
//                         <div>
//                           <div className="flex items-center gap-2">
//                             <span className="font-medium">{user.name}</span>
//                             {isMe && (
//                               <span className="text-xs px-2 py-1 rounded-full bg-gradient-to-r from-red-600 to-pink-600">
//                                 You
//                               </span>
//                             )}
//                           </div>
//                           <div className="flex items-center gap-2 text-sm text-gray-400">
//                             {getLevelBadge(user.points)}
//                             <span>Level {level}</span>
//                             <span className="text-xs px-2 py-0.5 bg-white/5 rounded">
//                               {user.department || "General"}
//                             </span>
//                           </div>
//                         </div>
//                       </div>
//                     </div>

//                     {/* Right Section */}
//                     <div className="text-right">
//                       <div className="text-2xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
//                         {user.points || 0}
//                       </div>
//                       <div className="text-xs text-gray-400 flex items-center justify-end gap-1">
//                         <TrendingUp className="w-3 h-3" />
//                         points
//                       </div>
//                     </div>
//                   </div>

//                   {/* Progress Bar */}
//                   <div className="mt-4">
//                     <div className="flex justify-between text-xs text-gray-400 mb-1">
//                       <span>Progress to Level {level + 1}</span>
//                       <span>{progress}%</span>
//                     </div>
//                     <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
//                       <div
//                         className="h-full bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 transition-all duration-1000"
//                         style={{ width: `${progress}%` }}
//                       />
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>

//         {/* Footer */}
//         <div className="text-center space-y-2">
//           <div className="inline-flex items-center gap-2 text-gray-400 text-sm">
//             <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
//             Live updates every 30 seconds
//           </div>
//           <p className="text-gray-500 text-sm">
//             Rankings are based on total points earned through activities
//           </p>
//         </div>
//       </div>
//       <Footer/>


//     </div>
//   );
// }

// function StatCard({ title, value, icon, gradient, subtitle }) {
//   return (
//     <div className="relative group">
//       <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-purple-500/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
//       <div className="relative bg-black/40 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all">
//         <div className="flex items-center justify-between">
//           <div>
//             <div className="text-sm text-gray-400 flex items-center gap-2">
//               {icon}
//               {title}
//             </div>
//             <div className={`text-3xl font-bold mt-2 bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>
//               {value}
//             </div>
//             {subtitle && (
//               <div className="text-xs text-gray-500 mt-1">{subtitle}</div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }




import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../utils/urls";
import { 
  Trophy, 
  Target, 
  TrendingUp, 
  RefreshCw, 
  Star, 
  Medal,
  Crown,
  Zap,
  Flame,
  Users,
  Award,
  ChevronRight,
  Sparkles,
  TrendingDown,
  TrendingUp as ArrowUp,
  Clock,
  Calendar,
  Filter,
  Eye,
  Search,
  Hash,
  Coins
} from "lucide-react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function DynamicLeaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [viewMode, setViewMode] = useState("all");
  const [timeRange, setTimeRange] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [stats, setStats] = useState({
    totalPlayers: 0,
    averagePoints: 0,
    topScore: 0
  });

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
      setRefreshing(true);
      const res = await fetch(
        `${BASE_URL}/user/leaderboard?range=${timeRange}`, 
        {
          credentials: "include",
        }
      );

      if (!res.ok) throw new Error("Failed to load leaderboard");

      const data = await res.json();

      if (data?.success && Array.isArray(data.data)) {
        setLeaderboard(data.data);
        
        // Calculate stats
        const totalPoints = data.data.reduce((sum, user) => sum + (user.points || 0), 0);
        setStats({
          totalPlayers: data.data.length,
          averagePoints: Math.round(totalPoints / data.data.length),
          topScore: Math.max(...data.data.map(u => u.points || 0))
        });

        const uid = getCurrentUserId();
        const index = data.data.findIndex((u) => u._id === uid);
        if (index !== -1) {
          setCurrentUser({ ...data.data[index], rank: index + 1 });
        }
      }

      setError("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
    const interval = setInterval(fetchLeaderboard, 30000);
    return () => clearInterval(interval);
  }, [timeRange]);

  const getTopThree = () => leaderboard.slice(0, 3);
  
  const getFilteredLeaderboard = () => {
    let filtered = leaderboard;
    
    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(user => 
        user.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply view mode filter
    if (viewMode === "top3") return getTopThree();
    if (viewMode === "nearby" && currentUser) {
      const userIndex = filtered.findIndex(u => u._id === currentUser._id);
      const start = Math.max(0, userIndex - 2);
      const end = Math.min(filtered.length, userIndex + 3);
      return filtered.slice(start, end);
    }
    return filtered;
  };

  const getRankIcon = (rank) => {
    switch(rank) {
      case 1: return <Crown className="w-8 h-8 text-yellow-400" />;
      case 2: return <Medal className="w-8 h-8 text-gray-300" />;
      case 3: return <Medal className="w-8 h-8 text-amber-600" />;
      default: return null;
    }
  };

  const getLevelBadge = (points) => {
    const level = Math.floor(points / 20) + 1;
    if (level >= 10) return <Flame className="w-5 h-5 text-orange-500" />;
    if (level >= 5) return <Zap className="w-5 h-5 text-yellow-500" />;
    return <Star className="w-5 h-5 text-blue-400" />;
  };

  const getProgressColor = (progress) => {
    if (progress >= 80) return "from-emerald-500 to-green-400";
    if (progress >= 60) return "from-blue-500 to-cyan-400";
    if (progress >= 40) return "from-purple-500 to-pink-400";
    return "from-red-500 to-orange-400";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 flex flex-col items-center justify-center">
        <div className="relative">
          <div className="absolute inset-0 animate-ping bg-gradient-to-r from-red-500/30 to-purple-500/30 rounded-full blur-xl"></div>
          <div className="relative">
            <div className="w-20 h-20 border-4 border-transparent border-t-red-500 border-r-purple-500 rounded-full animate-spin"></div>
            <Sparkles className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-yellow-400 animate-pulse" />
          </div>
        </div>
        <span className="mt-8 text-xl font-medium bg-gradient-to-r from-gray-300 to-gray-100 bg-clip-text text-transparent">
          Loading Leaderboard...
        </span>
        <p className="mt-2 text-gray-400">Preparing your competitive dashboard</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white">
      <Navbar />
      
      {/* Animated Background Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-10 w-72 h-72 bg-gradient-to-br from-red-500/10 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-gradient-to-bl from-purple-500/10 to-transparent rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-500/5 via-transparent to-cyan-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px),
                            linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 md:py-12 max-w-7xl">
        {/* Hero Header */}
        <div className="text-center mb-12 relative">
          <div className="inline-block relative mb-6">
            <div className="absolute -inset-6 bg-gradient-to-r from-red-500/20 via-purple-500/20 to-blue-500/20 rounded-full blur-3xl"></div>
            <div className="relative bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl border border-white/10 rounded-3xl px-10 py-8">
              <div className="flex items-center justify-center gap-4 mb-4">
                <Trophy className="w-12 h-12 text-yellow-400 animate-bounce" />
                <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-red-400 via-orange-300 to-yellow-300 bg-clip-text text-transparent">
                  LEADERBOARD
                </h1>
                <Sparkles className="w-12 h-12 text-yellow-400 animate-pulse" />
              </div>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Compete with the best and climb your way to the top
              </p>
            </div>
          </div>

          {/* Stats Banner */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-r from-gray-900/50 to-black/50 backdrop-blur-sm rounded-2xl p-6 border border-white/5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Players</p>
                  <p className="text-3xl font-bold text-white">{stats.totalPlayers}</p>
                </div>
                <Users className="w-10 h-10 text-blue-400" />
              </div>
            </div>
            <div className="bg-gradient-to-r from-gray-900/50 to-black/50 backdrop-blur-sm rounded-2xl p-6 border border-white/5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Average Points</p>
                  <p className="text-3xl font-bold text-white">{stats.averagePoints}</p>
                </div>
                <Target className="w-10 h-10 text-green-400" />
              </div>
            </div>
            <div className="bg-gradient-to-r from-gray-900/50 to-black/50 backdrop-blur-sm rounded-2xl p-6 border border-white/5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Top Score</p>
                  <p className="text-3xl font-bold text-white">{stats.topScore}</p>
                </div>
                <Award className="w-10 h-10 text-yellow-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Control Panel */}
        <div className="bg-gradient-to-r from-gray-900/60 to-black/60 backdrop-blur-xl rounded-3xl p-6 mb-8 border border-white/10 shadow-2xl">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            {/* View Mode Toggle */}
            <div className="flex items-center gap-4">
              <div className="flex bg-gray-900/50 rounded-xl p-1">
                {["all", "top3", "nearby"].map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setViewMode(mode)}
                    className={`px-6 py-3 rounded-lg transition-all flex items-center gap-2 ${
                      viewMode === mode
                        ? "bg-gradient-to-r from-red-600 to-orange-600 text-white shadow-lg"
                        : "text-gray-300 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {mode === "all" && <Users className="w-4 h-4" />}
                    {mode === "top3" && <Medal className="w-4 h-4" />}
                    {mode === "nearby" && <Eye className="w-4 h-4" />}
                    {mode.charAt(0).toUpperCase() + mode.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
              {/* Search Bar */}
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search players..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-black/50 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-red-500/50 focus:ring-2 focus:ring-red-500/20 transition-all"
                />
              </div>

              {/* Time Range Selector */}
              <div className="flex items-center gap-2 bg-black/50 border border-white/10 rounded-xl p-1">
                <Filter className="w-4 h-4 text-gray-400 ml-2" />
                <select
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="bg-transparent border-none py-2 pl-2 pr-6 text-white focus:outline-none focus:ring-0"
                >
                  <option value="all" className="bg-black">All Time</option>
                  <option value="weekly" className="bg-black">This Week</option>
                  <option value="monthly" className="bg-black">This Month</option>
                </select>
              </div>

              {/* Refresh Button */}
              <button
                onClick={fetchLeaderboard}
                disabled={refreshing}
                className="px-6 py-3 bg-gradient-to-r from-red-700/80 to-purple-700/80 hover:from-red-600 hover:to-purple-600 rounded-xl font-medium transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                <RefreshCw className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`} />
                {refreshing ? "Refreshing..." : "Refresh"}
                <Sparkles className="w-4 h-4 text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            </div>
          </div>
        </div>

        {/* Current User Highlight */}
        {currentUser && (
          <div className="mb-10">
            <div className="bg-gradient-to-r from-red-900/20 via-purple-900/20 to-blue-900/20 backdrop-blur-xl rounded-3xl p-8 border-2 border-red-500/30 relative overflow-hidden">
              {/* Animated Border */}
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 via-purple-500/10 to-blue-500/10 animate-pulse rounded-3xl"></div>
              
              <div className="relative">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-red-500 to-purple-500 p-0.5">
                      <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                        <span className="text-2xl font-bold bg-gradient-to-r from-red-400 to-purple-400 bg-clip-text text-transparent">
                          #{currentUser.rank}
                        </span>
                      </div>
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                        {currentUser.name}
                        <span className="text-xs px-3 py-1 bg-gradient-to-r from-red-600 to-pink-600 rounded-full">
                          You
                        </span>
                      </h2>
                      <p className="text-gray-300">Current standing in the leaderboard</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-4xl font-bold bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
                      {currentUser.points || 0}
                    </div>
                    <div className="text-gray-400">Total Points</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <StatCard 
                    title="Current Rank" 
                    value={`#${currentUser.rank}`}
                    icon={<Hash className="w-6 h-6" />}
                    gradient="from-red-400 to-pink-500"
                    trend={currentUser.rank <= 10 ? "Top 10%" : "Keep going!"}
                    trendUp={currentUser.rank <= 10}
                  />
                  <StatCard 
                    title="Level Progress" 
                    value={`Level ${Math.floor((currentUser.points || 0) / 20) + 1}`}
                    icon={<TrendingUp className="w-6 h-6" />}
                    gradient="from-blue-400 to-cyan-500"
                    trend={`${Math.min(((currentUser.points || 0) % 20) * 5, 100)}% to next`}
                  />
                  <StatCard 
                    title="Engagement" 
                    value={(
                      (currentUser.engagement?.likes || 0) +
                      (currentUser.engagement?.comments || 0) +
                      (currentUser.engagement?.shares || 0)
                    ).toString()}
                    icon={<Coins className="w-6 h-6" />}
                    gradient="from-emerald-400 to-green-500"
                    trend="Total interactions"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Top 3 Podium */}
        {viewMode === "all" && getTopThree().length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Crown className="w-6 h-6 text-yellow-400" />
              Top Performers
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {getTopThree().map((user, index) => (
                <div
                  key={user._id}
                  className={`relative transform transition-all duration-500 hover:scale-105 ${
                    index === 0 ? "md:order-2 -mt-8" :
                    index === 1 ? "md:order-1" :
                    "md:order-3"
                  }`}
                >
                  <div className={`relative rounded-3xl overflow-hidden backdrop-blur-xl
                    ${index === 0 ? 
                      "bg-gradient-to-b from-yellow-900/40 to-amber-900/20 border-2 border-yellow-500/50 shadow-2xl shadow-yellow-500/20" :
                      index === 1 ?
                      "bg-gradient-to-b from-gray-800/40 to-gray-900/20 border border-gray-700/50 shadow-xl" :
                      "bg-gradient-to-b from-amber-900/40 to-orange-900/20 border border-amber-700/50 shadow-xl"
                    }`}
                  >
                    {/* Rank Badge */}
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold shadow-2xl
                        ${index === 0 ? "bg-gradient-to-br from-yellow-400 to-amber-600 text-black" :
                          index === 1 ? "bg-gradient-to-br from-gray-300 to-gray-500 text-black" :
                          "bg-gradient-to-br from-amber-700 to-orange-800 text-white"
                        }`}
                      >
                        #{index + 1}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-8 pt-12">
                      <div className="text-center mb-6">
                        <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-red-500/20 to-purple-500/20 border-4 border-white/10 flex items-center justify-center mb-4">
                          <span className="text-3xl font-bold bg-gradient-to-r from-red-400 to-purple-400 bg-clip-text text-transparent">
                            {user.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold truncate mb-2">{user.name}</h3>
                        <div className="flex items-center justify-center gap-2 text-gray-300">
                          {getLevelBadge(user.points)}
                          <span>Level {Math.floor((user.points || 0) / 20) + 1}</span>
                        </div>
                      </div>

                      <div className="text-center">
                        <div className="text-4xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent mb-2">
                          {user.points || 0}
                        </div>
                        <div className="text-sm text-gray-400">Total Points</div>
                      </div>

                      {/* Mini Progress */}
                      <div className="mt-6">
                        <div className="h-2 bg-black/30 rounded-full overflow-hidden">
                          <div
                            className={`h-2 bg-gradient-to-r ${getProgressColor(Math.min(((user.points || 0) % 20) * 5, 100))} transition-all duration-1000`}
                            style={{ width: `${Math.min(((user.points || 0) % 20) * 5, 100)}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Leaderboard Table */}
        <div className="bg-gradient-to-br from-gray-900/60 to-black/60 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="p-6 border-b border-white/10">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div>
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <TrendingUp className="w-6 h-6 text-red-400" />
                  Global Rankings
                  <span className="text-sm px-3 py-1 bg-gradient-to-r from-red-500/20 to-purple-500/20 rounded-full">
                    {getFilteredLeaderboard().length} Players
                  </span>
                </h2>
                <p className="text-gray-400 mt-1">Live ranking based on performance</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 px-3 py-2 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm">{refreshing ? "Updating..." : "Live"}</span>
                </div>
                <Clock className="w-5 h-5 text-gray-400" />
                <span className="text-sm text-gray-400">Updated every 30s</span>
              </div>
            </div>
          </div>

          {/* Error Display */}
          {error && (
            <div className="m-6 p-4 bg-gradient-to-r from-red-900/30 to-pink-900/30 border border-red-700/50 rounded-xl text-red-300 flex items-center gap-3">
              <span className="text-xl">⚠️</span>
              <span>{error}</span>
            </div>
          )}

          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 p-6 pb-4 border-b border-white/5 text-gray-400 text-sm font-medium">
            <div className="col-span-1 text-center">Rank</div>
            <div className="col-span-5">Player</div>
            <div className="col-span-3">Level & Progress</div>
            <div className="col-span-3 text-right">Points</div>
          </div>

          {/* Leaderboard Items */}
          <div className="p-4 space-y-3 max-h-[500px] overflow-y-auto custom-scrollbar">
            {getFilteredLeaderboard().map((user, index) => {
              const isMe = user._id === currentUser?._id;
              const rank = leaderboard.findIndex(u => u._id === user._id) + 1;
              const progress = Math.min(((user.points || 0) % 20) * 5, 100);
              const level = Math.floor((user.points || 0) / 20) + 1;

              return (
                <div
                  key={user._id}
                  className={`group relative rounded-2xl p-4 transition-all duration-300 hover:bg-white/5 hover:scale-[1.02] border border-transparent hover:border-white/10
                    ${isMe ? "bg-gradient-to-r from-red-900/20 to-red-950/10 border-red-500/20" : ""}
                    ${rank <= 3 ? "border-yellow-500/20" : ""}
                  `}
                >
                  <div className="grid grid-cols-12 gap-4 items-center">
                    {/* Rank */}
                    <div className="col-span-1">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold transition-all group-hover:scale-110
                        ${rank === 1 ? "bg-gradient-to-br from-yellow-400 to-amber-600 text-black" :
                          rank === 2 ? "bg-gradient-to-br from-gray-300 to-gray-500 text-black" :
                          rank === 3 ? "bg-gradient-to-br from-amber-700 to-orange-800 text-white" :
                          "bg-gradient-to-br from-gray-800 to-gray-900 text-white"
                        }`}
                      >
                        {rank <= 3 && getRankIcon(rank)}
                        {rank > 3 && `#${rank}`}
                      </div>
                    </div>

                    {/* Player Info */}
                    <div className="col-span-5">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500/20 to-purple-500/20 flex items-center justify-center border border-white/10">
                          <span className="font-bold text-lg">{user.name.charAt(0).toUpperCase()}</span>
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{user.name}</span>
                            {isMe && (
                              <span className="text-xs px-2 py-1 bg-gradient-to-r from-red-600 to-pink-600 rounded-full">
                                You
                              </span>
                            )}
                            {rank <= 3 && !isMe && (
                              <span className="text-xs px-2 py-1 bg-gradient-to-r from-yellow-600 to-amber-600 rounded-full">
                                Top {rank}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-3 text-sm text-gray-400 mt-1">
                            <span className="flex items-center gap-1">
                              {getLevelBadge(user.points)}
                              <span>Level {level}</span>
                            </span>
                            <span>•</span>
                            <span>{user.department || "General User"}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Level Progress */}
                    <div className="col-span-3">
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-400">Progress</span>
                          <span className="text-white">{progress}%</span>
                        </div>
                        <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                          <div
                            className={`h-2 bg-gradient-to-r ${getProgressColor(progress)} transition-all duration-1000`}
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Points */}
                    <div className="col-span-3 text-right">
                      <div className="text-3xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                        {user.points || 0}
                      </div>
                      <div className="flex items-center justify-end gap-2 text-sm text-gray-400">
                        <Coins className="w-4 h-4" />
                        <span>points</span>
                        <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-white/10 bg-gradient-to-r from-black/30 to-transparent">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-2 text-gray-400">
                <Sparkles className="w-4 h-4" />
                <span>Keep competing! Rewards are updated weekly</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-sm text-gray-400">
                  Showing {getFilteredLeaderboard().length} of {leaderboard.length} players
                </div>
                <button 
                  onClick={fetchLeaderboard}
                  className="text-sm text-red-400 hover:text-red-300 transition-colors flex items-center gap-1"
                >
                  <RefreshCw className="w-3 h-3" />
                  Refresh now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm rounded-2xl p-6 border border-white/5">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-500/10 rounded-lg">
                <Clock className="w-6 h-6 text-red-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Last Updated</p>
                <p className="text-lg font-semibold">Just now</p>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm rounded-2xl p-6 border border-white/5">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <Calendar className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Next Reset</p>
                <p className="text-lg font-semibold">Monday 00:00</p>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm rounded-2xl p-6 border border-white/5">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500/10 rounded-lg">
                <ArrowUp className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Active Players</p>
                <p className="text-lg font-semibold">{leaderboard.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm rounded-2xl p-6 border border-white/5">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-500/10 rounded-lg">
                <Zap className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Total Points</p>
                <p className="text-lg font-semibold">
                  {leaderboard.reduce((sum, user) => sum + (user.points || 0), 0).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      
      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #ef4444, #8b5cf6);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #dc2626, #7c3aed);
        }
      `}</style>
    </div>
  );
}

function StatCard({ title, value, icon, gradient, trend, trendUp = true }) {
  return (
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-purple-500/5 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300 -z-10"></div>
      <div className="relative bg-gradient-to-br from-gray-900/40 to-black/40 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-sm text-gray-400 flex items-center gap-2 mb-2">
              {icon}
              {title}
            </div>
            <div className={`text-3xl font-bold bg-gradient-to-r ${gradient} bg-clip-text text-transparent mb-2`}>
              {value}
            </div>
            {trend && (
              <div className={`flex items-center gap-1 text-sm ${trendUp ? 'text-green-400' : 'text-gray-400'}`}>
                {trendUp ? <ArrowUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                {trend}
              </div>
            )}
          </div>
          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
        </div>
      </div>
    </div>
  );
}