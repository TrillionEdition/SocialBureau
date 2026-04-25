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
    if (selectedEntry) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [selectedEntry]);

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

  const handleStatusUpdate = async (id, statusToUpdate) => {
    try {
      await ajnoraService.updateEntry(id, { status: statusToUpdate });
      setEntries(entries.map(e => e._id === id ? { ...e, status: statusToUpdate } : e));
      if (selectedEntry?._id === id) setSelectedEntry({ ...selectedEntry, status: statusToUpdate });
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

      {/* FULL PAGE INTELLIGENCE VIEW */}
      <AnimatePresence>
        {selectedEntry && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: 50 }} 
            data-lenis-prevent
            className="fixed inset-0 z-[100] bg-white text-black font-roboto overflow-y-auto"
          >
            {/* STICKY CONTROL BAR */}
            <div className="sticky top-0 z-[110] bg-white/90 backdrop-blur-md border-b border-gray-100 px-6 py-4 flex justify-between items-center shadow-sm">
                <div className="flex items-center gap-4">
                    <button onClick={() => setSelectedEntry(null)} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 text-black transition-all">
                        <i className="fas fa-arrow-left"></i>
                    </button>
                    <div>
                        <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#ff0000]">Registry View</h2>
                        <h3 className="text-lg font-bold truncate max-w-[200px] md:max-w-md">{selectedEntry.name}</h3>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <select 
                        defaultValue={selectedEntry.status} 
                        onChange={(e) => handleStatusUpdate(selectedEntry._id, e.target.value)} 
                        className="bg-gray-50 border border-gray-200 text-black font-bold text-[10px] px-6 py-2.5 rounded-full outline-none focus:border-[#ff0000] appearance-none uppercase tracking-widest cursor-pointer"
                    >
                        {["new", "contacted", "qualified", "converted", "lost"].map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                    <button onClick={() => setSelectedEntry(null)} className="w-10 h-10 flex items-center justify-center rounded-full bg-black text-white hover:bg-[#ff0000] transition-all">
                        <i className="fas fa-times text-sm"></i>
                    </button>
                </div>
            </div>

            {/* FORM CONTENT */}
            <div className="max-w-5xl mx-auto py-12 px-6 md:px-12">
                <header className="mb-12 border-b border-gray-100 pb-8">
                    <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-black uppercase">
                        Client Requirement <span className="italic text-[#ff0000]">Dossier</span>
                    </h1>
                    <div className="mt-6 flex flex-wrap gap-6 text-gray-400 font-bold text-xs uppercase tracking-widest">
                        <span className="flex items-center gap-2"><i className="fas fa-envelope text-[#ff0000]"></i> {selectedEntry.email}</span>
                        <span className="flex items-center gap-2"><i className="fas fa-phone text-[#ff0000]"></i> {selectedEntry.phone || "N/A"}</span>
                        <span className="flex items-center gap-2"><i className="fas fa-clock text-[#ff0000]"></i> {new Date(selectedEntry.createdAt).toLocaleDateString()}</span>
                    </div>
                </header>

                <div className="space-y-16">
                    <DataSection title="01: Business Snapshot">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                            <DisplayField label="Principal Name" value={selectedEntry.name} />
                            <DisplayField label="Email Address" value={selectedEntry.email} />
                            <DisplayField label="1. Business Description" value={selectedEntry.businessDescription} fullWidth />
                            <DisplayField label="2. Priority Services" value={selectedEntry.priorityServices} fullWidth />
                        </div>
                    </DataSection>

                    <DataSection title="02: Goals & Growth">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                            <div className="space-y-3 md:col-span-2">
                                <p className="text-xs font-black text-[#ff0000] uppercase tracking-widest">3. Main marketing goals</p>
                                <div className="flex flex-wrap gap-2">
                                    {selectedEntry.goals?.map((g, i) => (
                                        <span key={i} className="px-4 py-1.5 bg-black text-white text-[10px] font-bold uppercase rounded-full">
                                            {g === "Others" && selectedEntry.goalsOther ? `OTHER: ${selectedEntry.goalsOther}` : g}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <DisplayField label="4. Target locations" value={selectedEntry.expansionPlans} />
                            <DisplayField label="5. Success in 6 months" value={selectedEntry.successVision} />
                            <DisplayField label="6. Ideal customer" value={selectedEntry.targetAudience} fullWidth />
                        </div>
                    </DataSection>

                    <DataSection title="03: Performance & Sales">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                            <div className="space-y-3 md:col-span-2">
                                <p className="text-xs font-black text-[#ff0000] uppercase tracking-widest">7. Current activities</p>
                                <div className="flex flex-wrap gap-2">
                                    {selectedEntry.currentActivities?.map((a, i) => (
                                        <span key={i} className="px-4 py-1.5 bg-gray-100 text-black border border-gray-200 text-[10px] font-bold uppercase rounded-full">
                                            {a === "Others" && selectedEntry.currentActivitiesOther ? `OTHER: ${selectedEntry.currentActivitiesOther}` : a}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <DisplayField label="8. History (Worked/Not worked)" value={selectedEntry.performanceHistory} />
                            <DisplayField label="9. Lead handling process" value={selectedEntry.leadHandling} />
                            <DisplayField label="10. Main competitors" value={selectedEntry.competitors || "None Provided"} fullWidth />
                        </div>
                    </DataSection>

                    <DataSection title="04: Strategy & Budget">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                            <DisplayField label="11. Growth challenges" value={selectedEntry.challenges} />
                            <DisplayField label="12. Monthly budget" value={selectedEntry.budget} highlight />
                            <DisplayField label="13. Additional notes" value={selectedEntry.notes} fullWidth />
                        </div>
                    </DataSection>
                </div>

                <footer className="mt-24 pt-12 border-t border-gray-100 text-center">
                    <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.5em] mb-4">Ajnora Intelligence System — Secure Dossier</p>
                    <button 
                        onClick={() => setSelectedEntry(null)}
                        className="px-12 py-4 bg-[#ff0000] text-white font-bold uppercase text-xs tracking-widest rounded-full hover:bg-black transition-all"
                    >
                        Back to Registry
                    </button>
                </footer>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* SUB-COMPONENTS */

function DataSection({ title, children }) {
    return (
        <div className="border-l-2 border-[#ff0000]/10 pl-8">
            <h4 className="text-xs font-black uppercase tracking-[0.3em] text-[#ff0000] mb-8">{title}</h4>
            <div className="space-y-10">{children}</div>
        </div>
    );
}

function DisplayField({ label, value, fullWidth = false, highlight = false }) {
    return (
        <div className={`${fullWidth ? "md:col-span-2" : ""} space-y-3`}>
            <p className="text-xs font-black text-gray-400 uppercase tracking-widest">{label}</p>
            <div className={`p-5 rounded-3xl border-2 transition-all ${highlight ? "bg-red-50 border-[#ff0000]/20 text-[#ff0000] font-black" : "bg-gray-50 border-gray-100 text-black font-medium"} text-base leading-relaxed`}>
                {value || "Not Provided"}
            </div>
        </div>
    );
}

function StatCard({ label, value, icon, color = "#fff" }) {
  return (
    <div className="bg-white/5 border-2 border-white/5 p-10 flex items-center justify-between group hover:border-[#C5A059]/40 transition-all backdrop-blur-md rounded-3xl">
      <div>
        <p className="text-[11px] font-black text-white/40 uppercase tracking-[0.3em] mb-4">{label}</p>
        <p className="text-5xl font-black tracking-tighter" style={{ color }}>{value}</p>
      </div>
      <i className={`fas ${icon} text-4xl text-white/5 group-hover:text-[#C5A059]/20 transition-all`}></i>
    </div>
  );
}
