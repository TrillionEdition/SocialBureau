import React, { useEffect, useState, useMemo } from "react";
import ajnoraService from "../../services/ajnoraService";
import { motion, AnimatePresence } from "framer-motion";

export default function AjnoraDashboard() {
  const [entries, setEntries] = useState([]);
  const [stats, setStats] = useState({ total: 0, newLeads: 0, converted: 0, conversionRate: 0 });
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [newStatus, setNewStatus] = useState("");

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchData = async () => {
    try {
      if (entries.length === 0) setLoading(true);
      const [entriesRes, statsRes] = await Promise.all([
        ajnoraService.getAllEntries(),
        ajnoraService.getStats()
      ]);
      setEntries(entriesRes.data || []);
      setStats(statsRes.stats || { total: 0, newLeads: 0, converted: 0, conversionRate: 0 });
    } catch (error) {
      console.error("Failed to fetch Ajnora data:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredEntries = useMemo(() => {
    return entries.filter(entry => {
      const matchesFilter = filter === "all" || entry.status === filter;
      const matchesSearch = 
        entry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (entry.project && entry.project.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchesFilter && matchesSearch;
    });
  }, [entries, filter, searchTerm]);

  const handleStatusUpdate = async (id) => {
    try {
      await ajnoraService.updateEntry(id, { status: newStatus });
      setEntries(entries.map(e => e._id === id ? { ...e, status: newStatus } : e));
      if (selectedEntry?._id === id) setSelectedEntry({ ...selectedEntry, status: newStatus });
      alert("Status updated successfully.");
    } catch (error) {
      alert("Update failed: " + error.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this record?")) return;
    try {
      await ajnoraService.deleteEntry(id);
      setEntries(entries.filter(e => e._id !== id));
      if (selectedEntry?._id === id) setSelectedEntry(null);
    } catch (error) {
      alert("Delete failed: " + error.message);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      new: "bg-blue-500/10 text-blue-500 border-blue-500/20",
      contacted: "bg-amber-500/10 text-amber-500 border-amber-500/20",
      qualified: "bg-indigo-500/10 text-indigo-500 border-indigo-500/20",
      converted: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
      lost: "bg-rose-500/10 text-rose-500 border-rose-500/20"
    };
    return colors[status] || "bg-gray-500/10 text-gray-500 border-gray-500/20";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-[#C5A059] border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-[#C5A059] font-sans font-bold uppercase text-xs tracking-widest">Ajnora Intelligence</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans p-6 lg:p-12 relative overflow-x-hidden">
      
      {/* GLOBAL SCROLLER STYLES */}
      <style>{`
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #0a0a0a;
        }
        ::-webkit-scrollbar-thumb {
          background: #C5A059;
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #fff;
        }
        .custom-scroller {
          scrollbar-width: thin;
          scrollbar-color: #C5A059 #0a0a0a;
        }
      `}</style>

      <div className="max-w-7xl mx-auto mb-20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
          <div>
            <h2 className="text-[#C5A059] text-xs font-black uppercase tracking-[0.6em] mb-6">Operational Control Hub</h2>
            <h1 className="text-6xl lg:text-9xl font-black tracking-tighter text-white uppercase leading-none">
              Ajnora <span className="italic text-[#C5A059]">Registry</span>
            </h1>
          </div>
          <div className="flex flex-col sm:flex-row gap-6 w-full md:w-auto">
            <div className="relative">
              <input 
                type="text" 
                placeholder="SEARCH DOSSIERS..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-white/5 border-2 border-white/10 px-8 py-5 text-sm focus:outline-none focus:border-[#C5A059] w-full sm:w-96 transition-all placeholder:text-white/20 font-bold"
              />
            </div>
            <button onClick={fetchData} className="px-10 py-5 bg-[#C5A059] text-black font-black uppercase text-[11px] tracking-widest hover:bg-white transition-all shadow-lg shadow-[#C5A059]/10">Sync Intelligence</button>
          </div>
        </div>
      </div>

      {/* STATS */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
        <StatCard label="Total Acquisitions" value={stats.total} icon="fa-building" />
        <StatCard label="Critical Leads" value={stats.newLeads} icon="fa-fire" color="#C5A059" />
        <StatCard label="Transmuted" value={stats.converted} icon="fa-dna" color="#10b981" />
        <StatCard label="Conversion Efficiency" value={stats.conversionRate + "%"} icon="fa-chart-line" />
      </div>

      {/* FILTERS */}
      <div className="max-w-7xl mx-auto flex gap-6 mb-12 overflow-x-auto pb-4 scrollbar-hide border-b-2 border-white/5">
        {["all", "new", "contacted", "qualified", "converted", "lost"].map(s => (
          <button key={s} onClick={() => setFilter(s)} className={`px-8 py-3 text-[11px] font-black uppercase tracking-[0.3em] transition-all whitespace-nowrap ${filter === s ? "text-[#C5A059] border-b-4 border-[#C5A059]" : "text-white/30 hover:text-white"}`}>{s}</button>
        ))}
      </div>

      {/* REGISTRY LIST */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 gap-6">
        {filteredEntries.map((entry) => (
          <motion.div layout key={entry._id} className="group bg-white/5 border-2 border-white/5 hover:border-[#C5A059]/40 p-8 flex flex-col md:flex-row justify-between items-center gap-10 transition-all backdrop-blur-sm">
            <div className="flex items-center gap-10 w-full md:w-auto">
               <div className="w-16 h-16 flex items-center justify-center bg-[#C5A059]/10 border-2 border-[#C5A059]/20 text-[#C5A059] font-black text-2xl italic">{entry.name[0]}</div>
               <div>
                 <h3 className="text-2xl font-black group-hover:text-[#C5A059] transition-colors tracking-tight uppercase">{entry.name}</h3>
                 <p className="text-sm text-white/40 font-medium">{entry.email}</p>
               </div>
            </div>
            <div className="flex-1 text-center md:text-left">
              <p className="text-[10px] text-[#C5A059] uppercase tracking-widest font-black mb-2 opacity-50">Operational Project</p>
              <p className="text-lg font-bold text-white/80">{entry.project || "INTERNAL OPS"}</p>
            </div>
            <div className="flex items-center gap-8 w-full md:w-auto justify-between md:justify-end">
              <span className={`px-6 py-2 text-[10px] font-black uppercase tracking-widest border-2 ${getStatusColor(entry.status)}`}>{entry.status}</span>
              <div className="flex gap-4">
                <button onClick={() => setSelectedEntry(entry)} className="w-12 h-12 flex items-center justify-center bg-white/5 hover:bg-[#C5A059] hover:text-black transition-all border-2 border-white/10 rounded-full"><i className="fas fa-expand-alt"></i></button>
                <button onClick={() => handleDelete(entry._id)} className="w-12 h-12 flex items-center justify-center bg-white/5 hover:bg-rose-500 hover:text-white transition-all border-2 border-white/10 rounded-full"><i className="fas fa-trash-alt"></i></button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* INTELLIGENCE DOSSIER MODAL */}
      <AnimatePresence>
        {selectedEntry && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-12">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedEntry(null)} className="absolute inset-0 bg-black/98 backdrop-blur-2xl" />
            <motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 100, opacity: 0 }} className="relative bg-[#070707] border-2 border-[#C5A059]/40 w-full max-w-6xl h-full max-h-[92vh] flex flex-col overflow-hidden shadow-2xl shadow-[#C5A059]/20">
              
              {/* FIXED HEADER */}
              <div className="flex justify-between items-start p-10 lg:p-16 pb-8 border-b-2 border-white/5 bg-gradient-to-b from-[#0a0a0a] to-[#070707]">
                <div>
                  <h2 className="text-[#C5A059] text-[12px] font-black uppercase tracking-[0.6em] mb-6">Strategic Asset Dossier</h2>
                  <h3 className="text-5xl lg:text-7xl font-black tracking-tighter uppercase leading-none mb-4">{selectedEntry.name}</h3>
                  <div className="flex flex-wrap gap-8 text-white/40 font-bold text-sm">
                    <span className="flex items-center gap-3"><i className="fas fa-envelope text-[#C5A059]"></i> {selectedEntry.email}</span>
                    <span className="flex items-center gap-3"><i className="fas fa-phone text-[#C5A059]"></i> {selectedEntry.phone || "VOICE LINE SECURE"}</span>
                    <span className="flex items-center gap-3"><i className="fas fa-map-marker-alt text-[#C5A059]"></i> {selectedEntry.project || "GENERAL REGISTRY"}</span>
                  </div>
                </div>
                <button onClick={() => setSelectedEntry(null)} className="w-16 h-16 flex items-center justify-center bg-white/5 hover:bg-white hover:text-black transition-all rounded-full border-2 border-white/10"><i className="fas fa-times text-2xl"></i></button>
              </div>

              {/* SCROLLABLE DOSSIER CONTENT */}
              <div className="flex-1 overflow-y-auto p-10 lg:p-16 pt-16 custom-scroller bg-[#070707]">
                <div className="space-y-24 max-w-5xl">
                  
                  <DataSection title="SECTION 01: Business Snapshot">
                    <QuestionItem question="1. Briefly describe your business, key services, and what you are known for." answer={selectedEntry.businessDescription} />
                    <QuestionItem question="2. What are your top 3 priority services/programs you want to grow right now?" answer={selectedEntry.priorityServices} />
                  </DataSection>

                  <DataSection title="SECTION 02: Goals & Growth Direction">
                    <div className="mb-10">
                      <p className="text-[12px] font-black text-[#C5A059] uppercase tracking-widest mb-6 border-l-4 border-[#C5A059] pl-4">3. What are your main goals from digital marketing?</p>
                      <div className="flex flex-wrap gap-3">
                        {selectedEntry.goals?.map((g, i) => (
                          <span key={i} className="px-5 py-2 bg-[#C5A059] text-black text-[12px] font-black uppercase tracking-widest">
                            {g === "Others" && selectedEntry.goalsOther ? `OTHER: ${selectedEntry.goalsOther}` : g}
                          </span>
                        ))}
                      </div>
                    </div>
                    <QuestionItem question="4. Which locations are you currently operating in, and where do you want to expand next?" answer={selectedEntry.expansionPlans} />
                    <QuestionItem question="5. What does success look like for you in the next 6 months?" answer={selectedEntry.successVision} />
                  </DataSection>

                  <DataSection title="SECTION 03: Target Audience">
                    <QuestionItem question="6. Who is your ideal customer and what is their main goal?" answer={selectedEntry.targetAudience} />
                  </DataSection>

                  <DataSection title="SECTION 04: Current Marketing & Performance">
                    <div className="mb-10">
                      <p className="text-[12px] font-black text-[#C5A059] uppercase tracking-widest mb-6 border-l-4 border-[#C5A059] pl-4">7. What marketing activities are you currently doing?</p>
                      <div className="flex flex-wrap gap-3">
                        {selectedEntry.currentActivities?.map((a, i) => (
                          <span key={i} className="px-5 py-2 bg-white/10 border-2 border-white/10 text-white text-[12px] font-black uppercase tracking-widest">
                            {a === "Others" && selectedEntry.currentActivitiesOther ? `OTHER: ${selectedEntry.currentActivitiesOther}` : a}
                          </span>
                        ))}
                      </div>
                    </div>
                    <QuestionItem question="8. What has worked well so far, and what has not worked?" answer={selectedEntry.performanceHistory} />
                  </DataSection>

                  <DataSection title="SECTION 05: Sales & Conversion">
                    <QuestionItem question="9. How do you currently handle leads after they come in?" answer={selectedEntry.leadHandling} />
                  </DataSection>

                  <DataSection title="SECTION 06: Brand & Competition">
                    <QuestionItem question="10. Who are your main competitors, and what do they do better or differently?" answer={selectedEntry.competitors || "INTEL NOT PROVIDED (OPTIONAL)"} />
                  </DataSection>

                  <DataSection title="SECTION 07: Challenges & Expectations">
                    <QuestionItem question="11. What are the biggest challenges you are facing in marketing or growth right now?" answer={selectedEntry.challenges} />
                  </DataSection>

                  <DataSection title="SECTION 08: Budget & Collaboration">
                    <QuestionItem question="12. What is your approximate monthly marketing budget?" answer={selectedEntry.budget} color="#C5A059" />
                  </DataSection>

                  <DataSection title="SECTION 09: Additional Inputs">
                    <QuestionItem question="13. Anything else you would like us to know (ideas, expectations, concerns)?" answer={selectedEntry.notes} />
                  </DataSection>

                </div>
              </div>

              {/* FIXED MODAL FOOTER */}
              <div className="p-10 lg:p-12 border-t-2 border-white/5 bg-[#0a0a0a] flex flex-col md:flex-row justify-between items-center gap-10">
                 <div className="flex-1 w-full md:w-auto">
                   <p className="text-[10px] text-[#C5A059] font-black uppercase tracking-widest mb-4">Command Engagement Status</p>
                   <div className="flex gap-4">
                      <select defaultValue={selectedEntry.status} onChange={(e) => setNewStatus(e.target.value)} className="bg-white/5 border-2 border-white/10 text-white font-bold text-xs px-8 py-4 flex-1 outline-none focus:border-[#C5A059] appearance-none uppercase tracking-widest cursor-pointer">
                        {["new", "contacted", "qualified", "converted", "lost"].map(o => <option key={o} value={o} className="bg-[#0a0a0a]">{o}</option>)}
                      </select>
                      <button onClick={() => handleStatusUpdate(selectedEntry._id)} className="bg-[#C5A059] text-black text-[12px] font-black px-12 py-4 uppercase tracking-[0.2em] shadow-lg shadow-[#C5A059]/20 hover:scale-105 transition-all">Update Status</button>
                   </div>
                 </div>
                 <div className="text-right w-full md:w-auto">
                   <p className="text-[10px] text-white/30 font-black uppercase tracking-widest mb-2">Registry Assigned To</p>
                   <p className="text-2xl font-black text-white uppercase tracking-tighter italic">{selectedEntry.assignedTo || "GENERAL POOL"}</p>
                 </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function DataSection({ title, index, children }) {
  return (
    <div className="space-y-12">
      <h4 className="text-[14px] font-black uppercase tracking-[0.4em] text-white border-b-4 border-[#C5A059] pb-4 inline-block">{title}</h4>
      <div className="space-y-12 pl-8 md:pl-12 border-l-4 border-white/5">{children}</div>
    </div>
  );
}

function QuestionItem({ question, answer, color = "white" }) {
  return (
    <div className="group">
      <p className="text-[12px] font-black text-[#C5A059] uppercase tracking-[0.1em] mb-6 group-hover:text-white transition-colors leading-relaxed border-l-4 border-[#C5A059]/20 pl-4">{question}</p>
      <div className="text-xl md:text-2xl font-bold leading-relaxed bg-white/5 p-8 border-2 border-white/5 group-hover:border-[#C5A059]/30 transition-all text-white/90 shadow-xl" style={{ color: color === "white" ? "" : color }}>
        {answer || "NO INTEL LOGGED"}
      </div>
    </div>
  );
}

function StatCard({ label, value, icon, color = "#fff" }) {
  return (
    <div className="bg-white/5 border-2 border-white/5 p-10 flex items-center justify-between group hover:border-[#C5A059]/40 transition-all backdrop-blur-md">
      <div>
        <p className="text-[11px] font-black text-white/40 uppercase tracking-[0.3em] mb-4">{label}</p>
        <p className="text-5xl font-black tracking-tighter" style={{ color }}>{value}</p>
      </div>
      <i className={`fas ${icon} text-4xl text-white/5 group-hover:text-[#C5A059]/20 transition-all`}></i>
    </div>
  );
}
