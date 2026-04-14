import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ExternalLink, Copy, Layout, User, Plus, CheckCircle, Globe, Briefcase } from "lucide-react";
import { BASE_URL } from "../../../../utils/urls";
import LoadingSpinner from "../../../components/LoadingSpinner";

const PartnerDashboard = () => {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [copiedId, setCopiedId] = useState(null);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const response = await fetch(`${BASE_URL}/partners`);
        const data = await response.json();
        if (data.success) {
          // Filter out legacy partners (those with "partnership/" in param or no detail structure)
          // and sort by newest first
          const templatePortfolios = data.data.filter(p => 
            p.details && 
            p.details.bio && 
            !p.param.startsWith("partnership/")
          ).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          
          setPartners(templatePortfolios);
        }
      } catch (err) {
        console.error("Failed to fetch portfolios", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPartners();
  }, []);

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
    <div className="min-h-screen bg-black text-white p-6 md:p-12 selection:bg-lime-400 selection:text-black">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
               <div className="w-8 h-8 rounded-lg bg-lime-400 flex items-center justify-center text-black">
                  <Layout size={20} />
               </div>
               <span className="text-[10px] font-black tracking-[0.3em] uppercase text-zinc-500">Portfolio Hub</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-none">Management<br />Dashboard</h1>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-72">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
              <input 
                type="text" 
                placeholder="Search portfolios..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-zinc-900/50 border border-zinc-800 rounded-2xl pl-12 pr-4 py-4 text-sm focus:ring-2 focus:ring-lime-400 outline-none transition-all"
              />
            </div>
            <a 
              href="/partners/select-template" 
              className="flex items-center justify-center gap-2 px-8 py-4 bg-white text-black font-black rounded-2xl hover:bg-lime-400 transition-colors uppercase text-xs"
            >
              <Plus size={18} /> Create New
            </a>
          </div>
        </div>

        {/* Portfolios Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredPartners.map((item, idx) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="group bg-zinc-900/40 border border-zinc-800/50 rounded-[32px] overflow-hidden hover:border-lime-400/30 transition-all duration-500 hover:shadow-2xl hover:shadow-lime-400/5 p-2"
              >
                <div className="bg-zinc-900 rounded-[28px] p-6 h-full flex flex-col">
                  {/* Header/Badge */}
                  <div className="flex justify-between items-start mb-6">
                      <div className="px-3 py-1 bg-lime-400/10 border border-lime-400/20 rounded-full text-[10px] font-black tracking-widest text-lime-400 uppercase">
                        {item.templateId || "Modern Template"}
                      </div>
                      <div className="text-[10px] font-black text-zinc-600 uppercase">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </div>
                  </div>

                  {/* Title & Info */}
                  <div className="mb-8">
                     <h3 className="text-2xl font-black tracking-tight mb-2 uppercase break-words">{item.name}</h3>
                     <div className="flex items-center gap-2 text-zinc-500 text-xs italic">
                        <Globe size={12} />
                        <span>socialbureau.in/partnership/{item.param}</span>
                     </div>
                  </div>

                  <div className="space-y-4 mb-8 flex-1">
                      <div className="flex items-center gap-3 text-zinc-400">
                          <User size={14} className="text-zinc-600" />
                          <span className="text-xs">{item.subtitle || "Portfolio Profile"}</span>
                      </div>
                      <div className="flex items-center gap-3 text-zinc-400">
                          <Briefcase size={14} className="text-zinc-600" />
                          <span className="text-xs">{item.isFree ? "Partner Network" : "Standard Page"}</span>
                      </div>
                  </div>

                  {/* Actions */}
                  <div className="grid grid-cols-2 gap-3 pt-4 border-t border-zinc-800/50">
                      <button 
                        onClick={() => handleCopy(item.param)}
                        className={`flex items-center justify-center gap-2 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                          copiedId === item.param ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white"
                        }`}
                      >
                        {copiedId === item.param ? <CheckCircle size={14} /> : <Copy size={14} />}
                        {copiedId === item.param ? "Copied" : "Copy Link"}
                      </button>
                      <a 
                        href={`/partnership/${item.param}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 py-3 bg-lime-400 text-black rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white transition-all shadow-lg shadow-lime-400/10"
                      >
                        <ExternalLink size={14} /> View Live
                      </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredPartners.length === 0 && (
            <div className="col-span-full py-20 text-center">
               <div className="text-zinc-600 mb-4 italic">No portfolios found.</div>
               <a href="/partners/select-template" className="text-lime-400 font-bold border-b border-lime-400/30 hover:border-lime-400 transition-all">Create your first one</a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PartnerDashboard;
