import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ExternalLink, Copy, Layout, User, Plus, CheckCircle, Globe, Briefcase, LogOut, Edit3 } from "lucide-react";
import { BASE_URL } from "@/utils/urls";
import LoadingSpinner from "../../../components/LoadingSpinner";
import Logout from "../../../components/Logout";

const PartnerDashboard = () => {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [copiedId, setCopiedId] = useState(null);
  const [prevCount, setPrevCount] = useState(null);
  const [notificationSound] = useState(new Audio("https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3"));
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/partners/login?redirect=/partners/dashboard");
      return;
    }

    const fetchPartners = async (isInitial = true) => {
      try {
        const token = localStorage.getItem("token");
        const userData = JSON.parse(localStorage.getItem("user") || "{}");
        const isAdmin = userData.role === "admin";
        
        // Admins see everything, students see only their own
        const endpoint = isAdmin ? `${BASE_URL}/partners` : `${BASE_URL}/partners/my-partnership`;
        
        const response = await fetch(endpoint, {
          headers: { "Authorization": `Bearer ${token}` }
        });
        const data = await response.json();
        
        if (data.success) {
          let portfolioList = [];
          if (isAdmin) {
            portfolioList = data.data;
          } else if (data.data) {
            portfolioList = [data.data];
          }

          const templatePortfolios = portfolioList.filter(p => 
            p.details && 
            p.details.bio && 
            !p.param.startsWith("partnership/")
          ).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          
          setPartners(templatePortfolios);

          // Play sound if new portfolios added (for admins)
          if (isAdmin && !isInitial && prevCount !== null && templatePortfolios.length > prevCount) {
            notificationSound.play().catch(e => console.log("Sound play blocked by browser", e));
          }
          setPrevCount(templatePortfolios.length);
        }
      } catch (err) {
        console.error("Failed to fetch portfolios", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPartners(true);

    // Setup polling for real-time updates (every 30 seconds)
    const pollInterval = setInterval(() => {
      fetchPartners(false);
    }, 30000);

    return () => clearInterval(pollInterval);
  }, [prevCount, notificationSound]);

  const handleCopy = (slug) => {
    const url = `${window.location.origin}/partnership/${slug}`;
    navigator.clipboard.writeText(url);
    setCopiedId(slug);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredPartners = partners.filter(p => 
    p.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.param?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white p-6 md:p-12 selection:bg-[#E8001A] selection:text-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6 border-b border-white/5 pb-8">
          <div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-[0.9] italic">Portfolio<br /><span className="bg-gradient-to-tr from-[#E8001A] via-[#FF5C35] to-[#FF1493] bg-clip-text text-transparent">Management.</span></h1>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-6 w-full md:w-auto">
            <div className="relative flex-1 md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
              <input 
                type="text" 
                placeholder="Search portfolios..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl pl-12 pr-4 py-5 text-sm focus:border-[#E8001A]/50 outline-none transition-all"
              />
            </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => navigate("/partners/select-template")} 
                className="flex items-center justify-center gap-3 px-8 py-5 bg-white text-black font-black rounded-2xl hover:bg-[#E8001A] hover:text-white transition-all transform hover:scale-105 shadow-2xl shadow-white/5 uppercase text-[10px] tracking-widest"
              >
                <Plus size={18} /> Create Portfolio
              </button>
              <div className="pl-6 border-l border-white/10 group">
                <div className="p-1 rounded-xl group-hover:bg-red-500/10 transition-all border border-transparent group-hover:border-red-500/20">
                  <Logout />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Portfolios Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredPartners.map((item, idx) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.6, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="group relative bg-white/[0.02] border border-white/5 rounded-[40px] overflow-hidden hover:border-[#E8001A]/30 transition-all duration-700 p-2"
              >
                <div className="bg-[#0F0F0F] rounded-[36px] p-6 h-full flex flex-col">
                  {/* Header/Badge */}
                  <div className="flex justify-between items-start mb-6">
                      <div className="px-3 py-1 bg-[#E8001A]/5 border border-[#E8001A]/20 rounded-full text-[8px] font-black tracking-[0.2em] text-[#E8001A] uppercase italic">
                        {item.templateId || "Modern Template"}
                      </div>
                      <div className="text-[8px] font-black text-white/20 uppercase tracking-widest">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </div>
                  </div>

                  {/* Title & Info */}
                  <div className="mb-6 flex-1">
                     <h3 className="text-2xl font-black tracking-tighter mb-3 uppercase italic group-hover:text-[#E8001A] transition-colors break-words leading-none">{item.name}</h3>
                     <div className="flex items-center gap-2 text-white/20 text-[9px] font-medium tracking-tight italic">
                        <Globe size={11} />
                        <span className="truncate">socialbureau.in/partnership/{item.param}</span>
                     </div>
                  </div>

                  {/* Details */}
                  <div className="space-y-2 mb-6 pb-6 border-b border-white/5">
                      <div className="flex items-center gap-3 text-white/40">
                          <User size={12} className="text-[#E8001A]/40" />
                          <span className="text-[10px] font-light italic">{item.subtitle || "Portfolio Profile"}</span>
                      </div>
                      <div className="flex items-center gap-3 text-white/40">
                          <Briefcase size={12} className="text-[#E8001A]/40" />
                          <span className="text-[10px] font-light italic">{item.isFree ? "Partner Network" : "Standard Page"}</span>
                      </div>
                  </div>

                  {/* Actions */}
                  <div className="grid grid-cols-2 gap-3 mb-3">
                      <button 
                        onClick={() => handleCopy(item.param)}
                        className={`flex items-center justify-center gap-2 py-4 rounded-2xl text-[9px] font-black uppercase tracking-[0.2em] transition-all ${
                          copiedId === item.param ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-white/5 text-white/40 hover:bg-white/10 hover:text-white"
                        }`}
                      >
                        {copiedId === item.param ? <CheckCircle size={14} /> : <Copy size={14} />}
                        {copiedId === item.param ? "Link" : "Link"}
                      </button>
                      <button 
                        onClick={() => navigate(`/partners/create-portfolio?id=${item._id}`)}
                        className="flex items-center justify-center gap-2 py-4 bg-white/5 text-white/40 rounded-2xl text-[9px] font-black uppercase tracking-[0.2em] hover:bg-[#E8001A] hover:text-white transition-all italic border border-white/5"
                      >
                        <Edit3 size={14} /> Edit Portfolio
                      </button>
                  </div>
                  <a 
                    href={`/partnership/${item.param}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-4 bg-[#E8001A] text-white rounded-2xl text-[9px] font-black uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all shadow-xl shadow-[#E8001A]/20 italic"
                  >
                    <ExternalLink size={14} /> View Live
                  </a>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredPartners.length === 0 && (
            <div className="col-span-full py-32 text-center border-2 border-dashed border-white/5 rounded-[40px]">
               <div className="text-white/20 mb-8 italic text-lg font-light">No active portfolios found in your module.</div>
               <a href="/partners/select-template" className="px-10 py-4 bg-white text-black rounded-full text-xs font-black uppercase tracking-widest hover:bg-[#E8001A] hover:text-white transition-all transform hover:scale-110 inline-block">Create Digital Legacy</a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PartnerDashboard;


