import React, { useEffect, useState, useMemo } from "react";
import ajnoraService from "../../services/ajnoraService";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Building2, 
  Mail, 
  Phone, 
  Calendar, 
  ArrowLeft, 
  X, 
  ExternalLink, 
  MapPin, 
  Globe, 
  Link as LinkIcon, 
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
  FileText,
  User,
  Zap,
  Target,
  BarChart3,
  ShieldCheck,
  Instagram,
  Facebook,
  Youtube,
  Linkedin,
  Twitter,
  MessageCircle,
  Hash,
  HelpCircle
} from 'lucide-react';

export default function AjnoraDashboard() {
  const [entries, setEntries] = useState([]);
  const [stats, setStats] = useState({ total: 0, newLeads: 0, converted: 0, conversionRate: 0 });
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEntry, setSelectedEntry] = useState(null);

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

  const handleStatusUpdate = async (id, statusToUpdate) => {
    try {
      await ajnoraService.updateEntry(id, { status: statusToUpdate });
      setEntries(entries.map(e => e._id === id ? { ...e, status: statusToUpdate } : e));
      if (selectedEntry?._id === id) setSelectedEntry({ ...selectedEntry, status: statusToUpdate });
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

  const filteredEntries = useMemo(() => {
    return entries.filter(entry => {
      const nameMatch = (entry.legalName || entry.brandName || entry.name || '').toLowerCase().includes(searchTerm.toLowerCase());
      const emailMatch = (entry.contactEmail || entry.email || '').toLowerCase().includes(searchTerm.toLowerCase());
      const projectMatch = (entry.project || '').toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSearch = nameMatch || emailMatch || projectMatch;
      const matchesFilter = filter === "all" || entry.status === filter;
      return matchesSearch && matchesFilter;
    });
  }, [entries, searchTerm, filter]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center font-['DM_Sans']">
        <div className="flex flex-col items-center">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 border-2 border-red-600 border-t-transparent rounded-full mb-6"
          />
          <p className="text-red-600 font-bold uppercase text-[10px] tracking-[0.4em]">Initializing Registry</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white font-['DM_Sans'] p-6 lg:p-12 relative overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');
        
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #0a0a0a; }
        ::-webkit-scrollbar-thumb { background: #e8242a; border-radius: 3px; }
      `}</style>

      <div className="max-w-7xl mx-auto mb-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
          <div>
            <h2 className="text-red-600 text-[10px] font-black uppercase tracking-[0.6em] mb-4">Phase 01 — Intel Center</h2>
            <h1 className="text-7xl lg:text-9xl font-['Bebas_Neue'] tracking-tighter text-white uppercase leading-none">
              Client <span className="text-red-600 italic">Registry</span>
            </h1>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <div className="relative group">
              <input 
                type="text" 
                placeholder="SEARCH DOSSIERS..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-white/5 border border-white/10 px-8 py-4 text-sm focus:outline-none focus:border-red-600 w-full sm:w-80 transition-all placeholder:text-white/20 font-bold rounded-full"
              />
            </div>
            <button onClick={fetchData} className="px-8 py-4 bg-red-600 text-white font-bold uppercase text-[10px] tracking-widest hover:bg-white hover:text-black transition-all rounded-full shadow-lg shadow-red-600/20">Sync Data</button>
          </div>
        </div>
      </div>

      {/* STATS */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {[
          { label: 'Total Acquisitions', value: stats.total, icon: Building2 },
          { label: 'Critical Leads', value: stats.newLeads, icon: Zap, color: '#e8242a' },
          { label: 'Transmuted', value: stats.converted, icon: ShieldCheck, color: '#10b981' },
          { label: 'Conversion Efficiency', value: stats.conversionRate + "%", icon: BarChart3 },
        ].map((stat, i) => (
          <div key={i} className="bg-white/5 border border-white/5 p-8 rounded-2xl flex items-center justify-between group hover:border-red-600/40 transition-all backdrop-blur-sm">
            <div>
              <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em] mb-3">{stat.label}</p>
              <p className="text-4xl font-['Bebas_Neue'] tracking-tight" style={{ color: stat.color || '#fff' }}>{stat.value}</p>
            </div>
            <stat.icon className="w-10 h-10 text-white/5 group-hover:text-red-600/20 transition-all" />
          </div>
        ))}
      </div>

      {/* FILTERS */}
      <div className="max-w-7xl mx-auto flex gap-6 mb-12 overflow-x-auto pb-4 border-b border-white/5 scrollbar-hide">
        {["all", "new", "contacted", "qualified", "converted", "lost"].map(s => (
          <button 
            key={s} 
            onClick={() => setFilter(s)} 
            className={`px-6 py-2 text-[10px] font-black uppercase tracking-[0.3em] transition-all whitespace-nowrap rounded-full border ${
              filter === s ? "bg-red-600 border-red-600 text-white" : "text-white/30 border-white/10 hover:text-white"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* LIST */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 gap-4">
        {filteredEntries.map((entry) => (
          <motion.div 
            layout 
            key={entry._id} 
            className="group bg-white/5 border border-white/5 hover:border-red-600/40 p-6 flex flex-col md:flex-row justify-between items-center gap-8 transition-all backdrop-blur-sm rounded-xl"
          >
            <div className="flex items-center gap-6 w-full md:w-auto">
               <div className="w-14 h-14 flex items-center justify-center bg-red-600/10 border border-red-600/20 text-red-600 font-['Bebas_Neue'] text-3xl italic rounded-lg">
                 {(entry.brandName || entry.legalName || entry.name || 'A')[0]}
               </div>
               <div>
                 <h3 className="text-xl font-bold group-hover:text-red-600 transition-colors tracking-tight uppercase">
                    {entry.brandName || entry.legalName || entry.name || 'Unknown Client'}
                 </h3>
                 <p className="text-xs text-white/40 font-medium">{entry.contactEmail || entry.email || 'No email provided'}</p>
               </div>
            </div>
            <div className="flex-1">
              <p className="text-[9px] text-red-600 uppercase tracking-widest font-black mb-1 opacity-50">Project Dossier</p>
              <p className="text-sm font-bold text-white/80">{entry.project || "Social Bureau Phase 01"}</p>
            </div>
            <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
              <span className={`px-4 py-1.5 text-[9px] font-black uppercase tracking-widest border rounded-full ${
                entry.status === 'converted' ? 'bg-green-600/10 text-green-500 border-green-600/20' :
                entry.status === 'lost' ? 'bg-red-600/10 text-red-500 border-red-600/20' :
                'bg-blue-600/10 text-blue-500 border-blue-600/20'
              }`}>{entry.status}</span>
              <div className="flex gap-2">
                <button onClick={() => setSelectedEntry(entry)} className="w-10 h-10 flex items-center justify-center bg-white/5 hover:bg-red-600 transition-all border border-white/10 rounded-full"><Target size={16} /></button>
                <button onClick={() => handleDelete(entry._id)} className="w-10 h-10 flex items-center justify-center bg-white/5 hover:bg-white hover:text-black transition-all border border-white/10 rounded-full"><X size={16} /></button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedEntry && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.98, y: 20 }} 
            animate={{ opacity: 1, scale: 1, y: 0 }} 
            exit={{ opacity: 0, scale: 0.98, y: 20 }} 
            className="fixed inset-0 z-[200] bg-[#050505] overflow-y-auto"
          >
            {/* HEADER */}
            <div className="sticky top-0 z-[210] bg-[#050505]/90 backdrop-blur-xl border-b border-white/5 px-8 py-4 flex justify-between items-center">
              <div className="flex items-center gap-6">
                <button onClick={() => setSelectedEntry(null)} className="flex items-center gap-2 text-white/40 hover:text-red-600 transition-all font-bold uppercase text-[10px] tracking-widest">
                  <ArrowLeft size={16} /> Close Dossier
                </button>
                <div className="h-4 w-px bg-white/10" />
                <div>
                  <h2 className="text-[9px] font-black text-red-600 uppercase tracking-[0.3em] mb-1">Dossier ID: {selectedEntry._id.slice(-8)}</h2>
                  <h3 className="text-xl font-['Bebas_Neue'] tracking-wide">{selectedEntry.brandName || selectedEntry.name}</h3>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <select 
                  defaultValue={selectedEntry.status} 
                  onChange={(e) => handleStatusUpdate(selectedEntry._id, e.target.value)} 
                  className="bg-white/5 border border-white/10 text-white font-bold text-[10px] px-6 py-2 rounded-full outline-none focus:border-red-600 appearance-none uppercase tracking-widest cursor-pointer"
                >
                  {["new", "contacted", "qualified", "converted", "lost"].map(o => <option key={o} value={o}>{o}</option>)}
                </select>
                <button onClick={() => handleDelete(selectedEntry._id)} className="p-2 text-white/20 hover:text-red-600 transition-all"><X size={20} /></button>
              </div>
            </div>

            <div className="max-w-6xl mx-auto py-16 px-8 grid grid-cols-1 lg:grid-cols-3 gap-16">
              {/* LEFT COLUMN: PRIMARY INFO */}
              <div className="lg:col-span-2 space-y-16">
                <section>
                  <SectionTitle num="01" title="Company Profile" />
                  <div className="grid grid-cols-2 gap-8 bg-white/5 border border-white/5 p-8 rounded-2xl">
                    <DataPoint label="Legal Name" value={selectedEntry.legalName || selectedEntry.name} />
                    <DataPoint label="Brand Name" value={selectedEntry.brandName || '—'} />
                    <DataPoint label="Company Type" value={selectedEntry.companyType} />
                    <DataPoint label="Inc. Year" value={selectedEntry.incYear} />
                    <DataPoint label="CIN" value={selectedEntry.cin} />
                    <DataPoint label="GST" value={selectedEntry.gst} />
                    <div className="col-span-2 space-y-4 pt-4 border-t border-white/5">
                        <p className="text-[9px] text-white/20 uppercase font-black tracking-widest">Legal Compliance Status</p>
                        <div className="flex flex-wrap gap-2">
                           {(selectedEntry.legalChecks || []).map((check, i) => (
                             <span key={i} className="px-3 py-1 bg-green-600/10 border border-green-600/20 text-green-500 text-[10px] font-bold rounded-full flex items-center gap-1.5">
                               <CheckCircle2 size={10} /> {check}
                             </span>
                           ))}
                           {(!selectedEntry.legalChecks || selectedEntry.legalChecks.length === 0) && <span className="text-xs text-white/20">—</span>}
                        </div>
                    </div>
                    <div className="col-span-2 grid grid-cols-2 gap-8 pt-4 border-t border-white/5">
                        <DataPoint label="Brand Face / Spokesperson" value={selectedEntry.brandFace} />
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-white/5 rounded-lg border border-white/10 overflow-hidden flex items-center justify-center">
                            {selectedEntry.uploadedFiles?.brand_face_img?.[0]?.url ? (
                              <img src={selectedEntry.uploadedFiles.brand_face_img[0].url} className="w-full h-full object-cover" alt="Spokesperson" />
                            ) : (
                              <User size={16} className="text-white/20" />
                            )}
                          </div>
                          <DataPoint label="Spokesperson Link" value={selectedEntry.brandFaceLink} />
                        </div>
                    </div>
                    <div className="col-span-2 pt-4 border-t border-white/5">
                        <p className="text-[9px] text-white/20 uppercase font-black tracking-widest mb-2">Directors / Partners</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {(selectedEntry.partnersList || []).map((p, i) => (
                                <div key={i} className="bg-black/40 p-4 rounded-xl border border-white/5 flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex-shrink-0 flex items-center justify-center overflow-hidden">
                                        {p.photo?.url ? (
                                            <img src={p.photo.url} alt={p.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <User size={16} className="text-white/20" />
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-[11px] font-bold text-white truncate">{p.name || 'Unnamed Partner'}</p>
                                        <p className="text-[9px] text-red-500 font-bold uppercase truncate">{p.role || 'Partner'}</p>
                                    </div>
                                    {p.photo?.url && (
                                        <a href={p.photo.url} target="_blank" className="p-1.5 text-white/20 hover:text-red-600 transition-all">
                                            <ExternalLink size={12} />
                                        </a>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                  </div>
                </section>

                <section>
                  <SectionTitle num="02" title="Service Architecture" />
                  <div className="space-y-8 bg-white/5 border border-white/5 p-8 rounded-2xl">
                    <DataPoint label="Core Offering" value={selectedEntry.coreOffering} full />
                    <div className="grid grid-cols-2 gap-8">
                       <DataPoint label="Target Audience" value={selectedEntry.targetAudience} />
                       <DataPoint label="Market Focus" value={selectedEntry.mktFocus} />
                       <DataPoint label="USP" value={selectedEntry.usp} />
                    </div>
                    <div className="space-y-4">
                       <p className="text-[9px] text-white/20 uppercase font-black tracking-widest">Market Focus Areas</p>
                       <div className="flex flex-wrap gap-2">
                          {(selectedEntry.serviceCategories || []).map((cat, i) => (
                            <span key={i} className="px-3 py-1 bg-red-600/10 text-red-500 border border-red-600/20 text-[10px] font-bold rounded">{cat}</span>
                          ))}
                       </div>
                    </div>
                    <div className="grid grid-cols-3 gap-6 pt-4 border-t border-white/5">
                        <DataPoint label="Age Group" value={selectedEntry.ageGroup} />
                        <DataPoint label="Enrolled Students" value={selectedEntry.enrolled} />
                        <DataPoint label="Success Metric" value={selectedEntry.successRate} />
                    </div>
                  </div>
                </section>

                <section>
                  <SectionTitle num="03" title="Digital Footprint" />
                  <div className="space-y-8 bg-white/5 border border-white/5 p-8 rounded-2xl">
                    <div className="flex items-center gap-4 border-b border-white/5 pb-6">
                      <Globe className="text-red-600" size={20} />
                      <a href={selectedEntry.website} target="_blank" className="text-xl font-['Bebas_Neue'] hover:text-red-600 transition-all flex items-center gap-2">
                        {selectedEntry.website || 'No website provided'} <ExternalLink size={14} />
                      </a>
                    </div>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                       <Metric label="IG Followers" value={selectedEntry.igFollowers} />
                       <Metric label="FB Followers" value={selectedEntry.fbFollowers} />
                       <Metric label="YT Subs" value={selectedEntry.ytSubs} />
                       <Metric label="GMB Reviews" value={selectedEntry.gmbReviews} />
                    </div>
                    <div className="grid grid-cols-2 gap-8 pt-4 border-t border-white/5">
                        <DataPoint label="Asset Ownership" value={selectedEntry.assetOwnership} />
                        <DataPoint label="Access/Admin Issues" value={selectedEntry.accessIssues} />
                    </div>
                  </div>
                </section>

                <section>
                  <SectionTitle num="04" title="Growth Strategy" />
                  <div className="space-y-8 bg-white/5 border border-white/5 p-8 rounded-2xl">
                    <div className="grid grid-cols-2 gap-8">
                       <DataList label="Operational Zones" items={selectedEntry.currentOps} />
                       <DataList label="Expansion Targets" items={selectedEntry.expansionTarget} />
                    </div>
                    <DataPoint label="Marketing Challenges" value={selectedEntry.mktChallenges} full />
                    <div className="grid grid-cols-2 gap-8 pt-4 border-t border-white/5">
                        <DataPoint label="Current Agency" value={selectedEntry.agencyName || (selectedEntry.hasAgency === 'Yes' ? 'Active' : 'No')} />
                        <DataPoint label="Mkt. Activities" value={selectedEntry.currentMktActivities} />
                    </div>
                    <div className="grid grid-cols-2 gap-8 pt-4 border-t border-white/5">
                        <DataPoint label="Engagement Rate" value={selectedEntry.engRate} />
                        <DataPoint label="Posting Freq." value={selectedEntry.postFreq} />
                    </div>
                    <div className="grid grid-cols-2 gap-8 pt-4 border-t border-white/5">
                        <DataPoint label="Lead Volume" value={selectedEntry.leadVolume} />
                        <DataPoint label="Conversion Rate" value={selectedEntry.leadConversion} />
                    </div>
                    <div className="space-y-4">
                       <p className="text-[9px] text-white/20 uppercase font-black tracking-widest">Lead Genesis — Sources & Links</p>
                       <div className="space-y-3">
                          {(selectedEntry.leadSources || []).map((source, i) => (
                            <div key={i} className="flex items-center justify-between bg-black/40 p-4 rounded-xl border border-white/5">
                               <div className="flex items-center gap-3">
                                  <div className="w-2 h-2 rounded-full bg-red-600" />
                                  <span className="text-sm font-bold">{source.label || source}</span>
                               </div>
                               {source.link && (
                                 <a href={source.link} target="_blank" className="text-[10px] text-red-600 hover:underline flex items-center gap-1 font-bold">
                                   Reference Link <ExternalLink size={10} />
                                 </a>
                               )}
                            </div>
                          ))}
                       </div>
                    </div>
                  </div>
                </section>

                <section>
                  <SectionTitle num="05" title="Execution Dynamics" />
                  <div className="space-y-8 bg-white/5 border border-white/5 p-8 rounded-2xl">
                     <div className="grid grid-cols-2 gap-8 pt-4 border-t border-white/5">
                        <DataPoint label="Target Goals" value={selectedEntry.mktGoals} />
                        <DataPoint label="Decision Process" value={selectedEntry.decisionProcess} />
                    </div>
                    <div className="grid grid-cols-2 gap-8 pt-4 border-t border-white/5">
                        <DataPoint label="Referral Source" value={selectedEntry.referralSource} />
                        <DataPoint label="Referred By" value={selectedEntry.referredBy} />
                    </div>
                  </div>
                </section>

                <section>
                  <SectionTitle num="06" title="Full Phase 01 Intelligence Questionnaire" />
                  <div className="space-y-6 bg-white/5 border border-white/5 p-8 rounded-2xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                      <QuestionBlock q="Legal Name of the Company?" a={selectedEntry.legalName} />
                      <QuestionBlock q="Brand Name?" a={selectedEntry.brandName} />
                      <QuestionBlock q="Company Type?" a={selectedEntry.companyType} />
                      <QuestionBlock q="Incorporation Year?" a={selectedEntry.incYear} />
                      <QuestionBlock q="CIN / Registration Number?" a={selectedEntry.cin} />
                      <QuestionBlock q="GST Number?" a={selectedEntry.gst} />
                      <QuestionBlock q="Registered Office Address?" a={`${selectedEntry.regAddress}, ${selectedEntry.regCity}, ${selectedEntry.regPin}`} />
                      <QuestionBlock q="Primary Contact Person?" a={selectedEntry.contactName} />
                      <QuestionBlock q="Designation?" a={selectedEntry.contactDesig} />
                      <QuestionBlock q="Contact Email?" a={selectedEntry.contactEmail} />
                      <QuestionBlock q="Contact Phone?" a={selectedEntry.contactPhone} />
                      <QuestionBlock q="Core Business Offering?" a={selectedEntry.coreOffering} />
                      <QuestionBlock q="Primary Target Audience?" a={selectedEntry.targetAudience} />
                      <QuestionBlock q="Unique Selling Proposition (USP)?" a={selectedEntry.usp} />
                      <QuestionBlock q="Number of Enrolled Clients?" a={selectedEntry.enrolled} />
                      <QuestionBlock q="Current Success Rate?" a={selectedEntry.successRate} />
                      <QuestionBlock q="Ownership of Digital Assets?" a={selectedEntry.assetOwnership} />
                      <QuestionBlock q="Monthly Lead Volume?" a={selectedEntry.leadVolume} />
                      <QuestionBlock q="Lead Conversion Rate?" a={selectedEntry.leadConversion} />
                      <QuestionBlock q="Average Engagement Rate?" a={selectedEntry.engRate} />
                      <QuestionBlock q="Social Media Posting Frequency?" a={selectedEntry.postFreq} />
                      <QuestionBlock q="Allocated Monthly Ad Spend?" a={selectedEntry.adSpend} />
                      <QuestionBlock q="Project Target Start Date?" a={selectedEntry.startDate} />
                      <QuestionBlock q="First Priority Milestone?" a={selectedEntry.milestone} />
                      <QuestionBlock q="Internal Decision Making Process?" a={selectedEntry.decisionProcess} />
                      <QuestionBlock q="Referral Source?" a={selectedEntry.referralSource} />
                    </div>
                  </div>
                </section>
              </div>

              {/* RIGHT COLUMN: CONTACT & ASSETS */}
              <div className="space-y-12">
                <section className="bg-red-600 p-8 rounded-2xl text-white">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.3em] mb-6 opacity-60">Primary Liaison</h4>
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center"><User size={24} /></div>
                      <div>
                        <p className="text-xl font-bold">{selectedEntry.contactName}</p>
                        <p className="text-[10px] font-bold uppercase opacity-60">{selectedEntry.contactDesig}</p>
                      </div>
                    </div>
                    <div className="space-y-4 pt-6 border-t border-white/10">
                       <a href={`mailto:${selectedEntry.contactEmail}`} className="flex items-center gap-3 hover:opacity-80 transition-all">
                          <Mail size={16} /> <span className="text-sm font-medium">{selectedEntry.contactEmail}</span>
                       </a>
                       <a href={`tel:${selectedEntry.contactPhone}`} className="flex items-center gap-3 hover:opacity-80 transition-all">
                          <Phone size={16} /> <span className="text-sm font-medium">{selectedEntry.contactPhone}</span>
                       </a>
                    </div>
                  </div>
                </section>

                <section className="bg-white/5 border border-white/5 p-8 rounded-2xl">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.3em] mb-6 text-red-600">Investment Profile</h4>
                  <div className="space-y-6">
                    <div className="p-4 bg-black/40 rounded-xl border border-white/5">
                       <p className="text-[9px] text-white/20 uppercase font-black mb-2">Monthly Budget</p>
                       <p className="text-3xl font-['Bebas_Neue'] text-red-600">{selectedEntry.selectedBudget || 'TBD'}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                       <div className="p-4 bg-black/40 rounded-xl border border-white/5">
                          <p className="text-[9px] text-white/20 uppercase font-black mb-1">Ad Spend</p>
                          <p className="text-sm font-bold">{selectedEntry.adSpend || '—'}</p>
                       </div>
                       <div className="p-4 bg-black/40 rounded-xl border border-white/5">
                          <p className="text-[9px] text-white/20 uppercase font-black mb-1">Duration</p>
                          <p className="text-sm font-bold">{selectedEntry.contractDur || '—'}</p>
                       </div>
                    </div>
                    <div className="p-4 bg-black/40 rounded-xl border border-white/5">
                       <p className="text-[9px] text-white/20 uppercase font-black mb-1">Target Start Date</p>
                       <p className="text-sm font-bold text-red-500">{selectedEntry.startDate || '—'}</p>
                    </div>
                    <DataPoint label="First Priority Milestone" value={selectedEntry.milestone} full />
                  </div>
                </section>

                <section className="bg-white/5 border border-white/5 p-8 rounded-2xl">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.3em] mb-6 text-red-600">Dossier Assets</h4>
                  <div className="space-y-8">
                    {Object.entries(selectedEntry.uploadedFiles || {}).filter(([_, files]) => Array.isArray(files) ? files.length > 0 : !!files).length > 0 ? (
                      Object.entries(selectedEntry.uploadedFiles || {})
                        .filter(([_, files]) => Array.isArray(files) ? files.length > 0 : !!files)
                        .map(([key, files]) => {
                          const fileList = Array.isArray(files) ? files : [files];
                          return (
                            <div key={key} className="space-y-4">
                               <div className="flex items-center gap-3">
                                  <div className="h-[1px] flex-1 bg-white/5"></div>
                                  <p className="text-[10px] text-white/40 uppercase font-black tracking-widest">{key.replace('_', ' ')}</p>
                                  <div className="h-[1px] flex-1 bg-white/5"></div>
                               </div>
                               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                 {fileList.map((file, i) => {
                                   const fileUrl = typeof file === 'string' ? file : file?.url;
                                   const fileName = (typeof file === 'object' && file?.name) ? file.name : `Secure Asset ${i+1}`;
                                   if (!fileUrl) return null;
                                   
                                   return (
                                     <a 
                                       key={i} 
                                       href={fileUrl} 
                                       target="_blank" 
                                       className="group/asset relative flex items-center gap-4 p-4 bg-black/40 rounded-2xl border border-white/5 hover:border-red-600/40 transition-all overflow-hidden"
                                     >
                                       <div className="absolute inset-0 bg-red-600/5 opacity-0 group-hover/asset:opacity-100 transition-opacity" />
                                       
                                       <div className="relative w-14 h-14 bg-black/60 rounded-xl border border-white/10 flex items-center justify-center overflow-hidden flex-shrink-0 shadow-lg">
                                         {fileUrl?.match(/\.(jpg|jpeg|png|gif|webp)$/i) ? (
                                           <img src={fileUrl} className="w-full h-full object-cover transition-transform group-hover/asset:scale-110" alt="Asset" />
                                         ) : (
                                           <FileText size={24} className="text-red-600/40" />
                                         )}
                                       </div>

                                       <div className="relative flex-1 min-w-0">
                                         <span className="text-[12px] font-black text-white block truncate uppercase tracking-tight">{fileName}</span>
                                         <div className="flex items-center gap-1.5 mt-2">
                                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_5px_rgba(34,197,94,0.5)]" />
                                            <span className="text-[9px] text-green-500 font-black uppercase tracking-widest">Link Secured</span>
                                         </div>
                                       </div>

                                       <div className="relative p-2.5 bg-white/5 rounded-xl group-hover/asset:bg-red-600 transition-all shadow-lg">
                                          <ExternalLink size={14} className="text-white/40 group-hover/asset:text-white" />
                                       </div>
                                     </a>
                                   );
                                 })}
                               </div>
                            </div>
                          );
                        })
                    ) : (
                      <div className="py-24 border border-dashed border-white/5 rounded-3xl flex flex-col items-center justify-center text-center bg-black/20">
                        <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6 shadow-inner">
                           <FileText size={36} className="text-white/5" />
                        </div>
                        <p className="text-[14px] text-white/20 uppercase font-black tracking-[0.3em]">Zero Intelligence Assets Secured</p>
                        <p className="text-[10px] text-white/10 uppercase mt-3 font-bold">Dossier requires manual asset transmission</p>
                      </div>
                    )}
                  </div>
                </section>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* SUB-COMPONENTS */

const QuestionBlock = ({ q, a }) => (
  <div className="space-y-2 pb-4 border-b border-white/5 last:border-none">
    <p className="text-[10px] font-black text-red-600 uppercase tracking-widest flex items-center gap-2">
      <HelpCircle size={10} /> {q}
    </p>
    <p className="text-sm text-white/60 font-medium italic">"{a || 'No specific input provided.'}"</p>
  </div>
);

const SectionTitle = ({ num, title }) => (
  <div className="flex items-center gap-4 mb-6">
    <span className="text-4xl font-['Bebas_Neue'] text-white/10 italic leading-none">{num}</span>
    <h3 className="text-sm font-black uppercase tracking-[0.4em] text-red-600 border-b border-red-600 pb-1">{title}</h3>
  </div>
);

const DataPoint = ({ label, value, full }) => (
  <div className={full ? "col-span-2" : ""}>
    <p className="text-[9px] text-white/20 uppercase font-black tracking-widest mb-1">{label}</p>
    <p className="text-[13px] font-bold text-white/90 leading-relaxed">{value || "—"}</p>
  </div>
);

const Metric = ({ label, value }) => (
  <div className="text-center p-4 bg-black/40 rounded-xl border border-white/5">
    <p className="text-[8px] text-white/20 uppercase font-bold mb-1">{label}</p>
    <p className="text-lg font-['Bebas_Neue'] text-red-600">{value || "0"}</p>
  </div>
);

const DataList = ({ label, items }) => (
  <div>
    <p className="text-[9px] text-white/20 uppercase font-black tracking-widest mb-3">{label}</p>
    <div className="flex flex-wrap gap-2">
      {(items || []).map((item, i) => (
        <span key={i} className="px-2 py-1 bg-white/5 text-[10px] font-bold rounded text-white/40 border border-white/5">{item}</span>
      ))}
      {(!items || items.length === 0) && <span className="text-xs text-white/20">—</span>}
    </div>
  </div>
);

const SocialIcon = ({ platform }) => {
  const logos = {
    ig: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
    fb: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
    yt: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
    li: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z",
    tw: "M18.244 2.25h3.308l-7227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.045 4.126H5.078z",
    wa: "M17.472 14.382c-.301-.149-1.767-.872-2.04-.971-.272-.099-.47-.149-.667.149-.198.298-.767.971-.941 1.171-.173.199-.347.224-.648.075-.301-.149-1.27-.468-2.42-1.493-.894-.798-1.498-1.784-1.673-2.083-.174-.299-.018-.46.132-.609.134-.134.301-.351.451-.527.149-.176.199-.299.299-.497.099-.199.049-.373-.025-.521-.075-.149-.667-1.611-.914-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.871 1.213 3.07c.149.199 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.767-.721 2.015-1.419.247-.698.247-1.291.173-1.418-.074-.128-.272-.204-.573-.353zm-5.467 7.426l-.004.001c-1.84 0-3.644-.496-5.215-1.434l-.374-.224-3.876 1.016 1.034-3.778-.246-.392c-.933-1.486-1.425-3.199-1.425-4.962 0-5.216 4.244-9.46 9.462-9.46 2.528 0 4.904.985 6.69 2.774a9.404 9.404 0 0 1 2.769 6.686c0 5.217-4.246 9.461-9.464 9.461zm0-21.053C5.558.755.004 6.31.004 13.165c0 2.19.573 4.329 1.659 6.213L0 23.245l3.982-1.044a12.355 12.355 0 0 0 6.183 1.654h.005c6.852 0 12.407-5.555 12.407-12.208 0-3.411-1.328-6.618-3.742-9.032C16.42 1.401 13.568.75 12.005.75z",
    tk: "M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.08 2.7 1.62 4.24 1.79v4.03c-1.44-.06-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.28-2.26.74-4.63 2.58-5.91 1.64-1.15 3.74-1.49 5.66-1.04v4.28c-.92-.26-1.91-.2-2.79.23-.82.4-1.49 1.09-1.81 1.93-.35.82-.39 1.75-.17 2.6.32 1.25 1.2 2.33 2.32 2.86.84.41 1.79.53 2.71.4.92-.13 1.79-.54 2.45-1.21.78-.81 1.19-1.92 1.2-3.05-.01-4.75.01-9.51-.01-14.26z"
  };
  return logos[platform] ? (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="#E8242A">
      <path d={logos[platform]} />
    </svg>
  ) : <LinkIcon className="text-red-600" size={16} />;
};
