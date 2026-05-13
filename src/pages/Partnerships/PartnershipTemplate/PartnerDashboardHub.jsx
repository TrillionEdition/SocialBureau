import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Users, Sparkles, ArrowRight, Layout, ShieldCheck, TrendingUp, GraduationCap } from "lucide-react";
import Logout from "../../../components/Logout";

const PartnerDashboardHub = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({ studentCount: 0, influencerCount: 0 });

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      navigate("/partners/login?redirect=/partners/dashboard");
      return;
    }
    const parsedUser = JSON.parse(userData);
    setUser(parsedUser);

    if (parsedUser.role !== "admin") {
      navigate("/partners/manage");
      return;
    }

    // Fetch live counts
    fetch(`${import.meta.env.VITE_API_URL}/partners/dashboard-stats`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setStats({
            studentCount: data.studentCount,
            influencerCount: data.influencerCount
          });
        }
      })
      .catch(err => console.error("Error fetching stats:", err));
  }, [navigate]);

  if (!user) return null;

  const isAdmin = user.role === "admin";

  const cards = [
    {
      title: "Student Ecosystem",
      description: "Manage professional academic portfolios, resumes, and career legacies.",
      icon: GraduationCap,
      path: "/partners/manage?type=student",
      color: "from-blue-600 to-indigo-600",
      accent: "blue",
      stat: `${stats.studentCount.toLocaleString()} Active`
    },
    {
      title: "Influencer Hub",
      description: "Control high-impact digital presence, social metrics, and brand narratives.",
      icon: Sparkles,
      path: "/partners/manage?type=influencer",
      color: "from-yellow-500 to-orange-600",
      accent: "yellow",
      stat: `${stats.influencerCount.toLocaleString()} Active`
    }
  ];

  return (
    <div className="min-h-screen lg:h-screen bg-[#050505] text-white selection:bg-red-500 font-sans lg:overflow-hidden flex flex-col">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_20%,_rgba(232,0,26,0.05),transparent_50%)]" />
        <div className="absolute bottom-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_80%,_rgba(255,255,255,0.02),transparent_40%)]" />
      </div>

      <nav className="w-full p-6 md:p-10 flex justify-between items-center z-[110] mix-blend-difference shrink-0">
        <div className="flex items-center gap-4">
           <div className="w-12 h-[1px] bg-white/20" />
           <span className="text-[10px] font-black uppercase tracking-[0.4em] italic text-white/40">Network Control</span>
        </div>
        <div className="flex items-center gap-6">
           <Logout />
        </div>
      </nav>

      <main className="relative z-10 max-w-7xl mx-auto px-6 py-12 lg:py-0 flex-1 flex flex-col justify-center w-full">
        <header className="mb-10 md:mb-16 space-y-3 shrink-0">
           <motion.div
             initial={{ opacity: 0, x: -20 }}
             animate={{ opacity: 1, x: 0 }}
             className="flex items-center gap-3 text-red-500"
           >
             <ShieldCheck size={16} />
             <span className="text-[10px] font-black uppercase tracking-[0.3em] italic">System Administrator</span>
           </motion.div>
           <motion.h1 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.1 }}
             className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter leading-[0.95] pt-4 uppercase italic"
           >
             Partner<br />
             <span className="bg-gradient-to-tr from-white via-white/80 to-white/40 bg-clip-text text-transparent">Dashboards.</span>
           </motion.h1>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:max-h-[60vh] mb-12">
          {cards.map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + idx * 0.1 }}
              onClick={() => navigate(card.path)}
              className="group relative cursor-pointer h-full"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-10 transition-opacity duration-700 blur-3xl rounded-[40px]`} />
              
              <div className="relative bg-white/[0.03] border border-white/10 rounded-[32px] md:rounded-[48px] p-8 md:p-12 h-full flex flex-col justify-between hover:border-white/20 transition-all duration-700 overflow-hidden">
                {/* Decorative Pattern */}
                <div className="absolute top-0 right-0 p-8 opacity-[0.01] group-hover:opacity-[0.03] transition-opacity duration-700">
                   <card.icon size={150} />
                </div>

                <div className="space-y-4 md:space-y-6 relative z-10">
                  <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl md:rounded-3xl bg-gradient-to-br ${card.color} flex items-center justify-center text-white shadow-2xl shadow-black/50 group-hover:scale-110 transition-transform duration-700`}>
                    <card.icon size={28} />
                  </div>
                  
                  <div className="space-y-2 md:space-y-3">
                    <h2 className="text-3xl md:text-4xl font-black uppercase italic tracking-tighter group-hover:text-red-500 transition-colors leading-none">{card.title}</h2>
                    <p className="text-white/40 text-sm md:text-base font-light leading-snug max-w-xs italic">
                      {card.description}
                    </p>
                  </div>
                </div>

                <div className="mt-8 flex items-center justify-between relative z-10">
                   <div className="flex flex-col">
                      <span className="text-[9px] font-black uppercase tracking-widest text-white/20">Metric Status</span>
                      <span className="text-lg font-black italic">{card.stat}</span>
                   </div>
                   <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500">
                      <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                   </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <footer className="mt-8 md:mt-12 py-6 border-t border-white/5 flex justify-between items-center opacity-30 shrink-0">
           <div className="text-[9px] font-black uppercase tracking-widest">© 2024 SocialBureau Ecosystem</div>
           <div className="text-[9px] font-black uppercase tracking-widest italic">Secure Access Layer 01</div>
        </footer>
      </main>
    </div>
  );
};

export default PartnerDashboardHub;
