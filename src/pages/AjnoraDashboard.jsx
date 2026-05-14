import React, { useEffect, useState, useMemo } from "react";
import ajnoraService from "@/services/ajnoraService";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
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
  HelpCircle,
  RefreshCw,
  Layout,
  Layers,
  ArrowRight
} from 'lucide-react';

const FIELD_LABELS = {
  legalName: "Legal Name of the Company",
  brandName: "Brand Name",
  brandTagline: "Brand Tagline / Slogan",
  companyType: "Company Type",
  incYear: "Incorporation Year",
  cin: "CIN / Registration Number",
  gst: "GST Number",
  regAddress: "Registered Office Address",
  regCity: "City",
  regDistrict: "District",
  regPin: "PIN Code",
  svcAddress: "Service Address",
  svcCity: "Service City",
  svcDistrict: "Service District",
  svcPin: "Service PIN",
  contactName: "Primary Contact Person",
  contactDesig: "Designation",
  contactPhone: "Contact Phone",
  contactEmail: "Contact Email",
  brandFace: "Brand Face / Spokesperson",
  brandFaceLink: "Brand Face Portfolio Link",
  legalChecks: "Legal Compliance Checks",
  legalPending: "Pending Legal Issues",
  legalQuery: "Legal Consultation Required?",
  coreOffering: "Core Business Offering",
  serviceCategories: "Service Categories",
  otherServices: "Other Services",
  customServices: "Manually Added Services",
  targetAudience: "Primary Target Audience",
  targetAudienceOther: "Specific Target Audience (Other)",
  ageGroup: "Target Age Group",
  geoExpansion: "Geographic Expansion Plans",
  currentOps: "Current Operational Zones",
  expansionTarget: "Target Expansion Zones",
  mktFocus: "Marketing Focus Areas",
  usp: "Unique Selling Proposition (USP)",
  enrolled: "Number of Enrolled Clients",
  successRate: "Current Success Rate",
  website: "Official Website",
  webStatus: "Website Status",
  socialMedia: "Social Media Footprint",
  igFollowers: "Instagram Followers",
  fbFollowers: "Facebook Followers",
  ytSubs: "YouTube Subscribers",
  gmb: "Google My Business Link",
  gmbReviews: "GMB Review Count",
  assetOwnership: "Ownership of Digital Assets",
  accessIssues: "Access or Administrative Issues",
  hasAgency: "Currently Working with Agency?",
  agencyName: "Agency Name",
  currentMktActivities: "Current Marketing Activities",
  leadVolume: "Monthly Lead Volume",
  leadConversion: "Lead Conversion Rate",
  leadSources: "Primary Lead Genesis Sources",
  engRate: "Average Engagement Rate",
  postFreq: "Social Media Posting Frequency",
  mktChallenges: "Primary Marketing Challenges",
  servicesNeeded: "Services Needed from Social Bureau",
  mktGoals: "Primary Marketing Goals",
  selectedBudget: "Allocated Monthly Budget",
  adSpend: "Ad Spend Portion",
  contractDur: "Preferred Contract Duration",
  startDate: "Project Target Start Date",
  milestone: "First Priority Milestone",
  decisionProcess: "Internal Decision Making Process",
  anythingElse: "Additional Intelligence / Requirements",
  referralSource: "Referral Source",
  referredBy: "Referred By"
};

const INTERNAL_FIELDS = ['_id', '__v', 'createdAt', 'updatedAt', 'status', 'project', 'uploadedFiles'];

export default function AjnoraDashboard() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [entries, setEntries] = useState([]);
  const [stats, setStats] = useState({ total: 0, newLeads: 0, converted: 0, conversionRate: 0 });
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEntry, setSelectedEntry] = useState(null);

  useEffect(() => {
    if (selectedEntry || id) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      document.body.classList.add('ajnora-dossier-active');
    } else {
      document.body.style.overflow = "unset";
      document.documentElement.style.overflow = "unset";
      document.body.classList.remove('ajnora-dossier-active');
    }
    return () => { 
      document.body.style.overflow = "unset"; 
      document.documentElement.style.overflow = "unset";
      document.body.classList.remove('ajnora-dossier-active');
    };
  }, [selectedEntry, id]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (id && entries.length > 0) {
      const entry = entries.find(e => e._id === id);
      if (entry) setSelectedEntry(entry);
    } else if (!id) {
      setSelectedEntry(null);
    }
  }, [id, entries]);

  const fetchData = async () => {
    try {
      setLoading(true);
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

  const handleStatusUpdate = async (entryId, statusToUpdate) => {
    try {
      await ajnoraService.updateEntry(entryId, { status: statusToUpdate });
      setEntries(entries.map(e => e._id === entryId ? { ...e, status: statusToUpdate } : e));
      if (selectedEntry?._id === entryId) setSelectedEntry({ ...selectedEntry, status: statusToUpdate });
    } catch (error) {
      alert("Update failed: " + error.message);
    }
  };

  const handleDelete = async (entryId) => {
    if (!window.confirm("Are you sure you want to delete this record?")) return;
    try {
      await ajnoraService.deleteEntry(entryId);
      setEntries(entries.filter(e => e._id !== entryId));
      if (id === entryId) navigate('/ajnoradashboard');
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

  const renderAnswer = (key, value) => {
    if (!value && value !== 0) return <p className="text-[14px] text-white/20 font-medium italic">— No data provided —</p>;

    if (Array.isArray(value)) {
      if (value.length === 0) return <p className="text-[14px] text-white/20 font-medium italic">— No entries —</p>;
      return (
        <div className="flex flex-wrap gap-3 mt-3">
          {value.map((item, i) => {
            if (typeof item === 'object' && item !== null) {
              const label = item.label || item.service || item.name || '';
              const detail = item.link || (item.subServices ? item.subServices.join(', ') : '') || item.role || item.description || '';
              return (
                <div key={i} className="px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-xs shadow-xl group/item hover:border-red-600/40 transition-all min-w-[200px]">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                        <span className="text-white font-black uppercase tracking-tight text-[13px]">{label}</span>
                        {item.link && <ExternalLink size={12} className="text-red-600/40" />}
                    </div>
                    {detail && <p className="text-red-500 font-bold text-[10px] uppercase tracking-[0.2em] leading-relaxed">{detail}</p>}
                    {item.link && (
                      <a href={item.link} target="_blank" rel="noreferrer" className="text-blue-400 hover:underline flex items-center gap-1.5 mt-1 font-mono text-[9px] break-all">
                        {item.link}
                      </a>
                    )}
                  </div>
                </div>
              );
            }
            return (
              <span key={i} className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white/80 font-bold shadow-lg">
                {String(item)}
              </span>
            );
          })}
        </div>
      );
    }

    if (typeof value === 'object' && value !== null) {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {Object.entries(value).filter(([_, v]) => !!v).map(([k, v]) => (
            <div key={k} className="flex flex-col gap-2 p-5 bg-white/5 rounded-2xl border border-white/10 hover:border-red-600/30 transition-all group/sub">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] group-hover/sub:text-red-600/60 transition-all">{k}</span>
                {String(v).startsWith('http') ? <Globe size={12} className="text-red-600/20" /> : <Hash size={12} className="text-white/5" />}
              </div>
              <span className="text-[14px] font-bold text-white/90 break-all leading-tight">{String(v)}</span>
              {String(v).startsWith('http') && (
                <a href={String(v)} target="_blank" rel="noreferrer" className="text-red-600 hover:underline text-[9px] font-black uppercase tracking-[0.4em] flex items-center gap-2 mt-2">
                  Launch URL <ArrowRight size={10} />
                </a>
              )}
            </div>
          ))}
        </div>
      );
    }

    const stringValue = String(value);
    if (stringValue.startsWith('http')) {
        return (
            <a href={stringValue} target="_blank" rel="noreferrer" className="inline-flex items-center gap-4 px-6 py-4 bg-red-600/10 border border-red-600/20 rounded-2xl text-red-500 hover:bg-red-600 hover:text-white transition-all font-black text-[10px] uppercase tracking-[0.3em] mt-3 group">
                Access Intelligence Asset <ExternalLink size={14} className="group-hover:rotate-45 transition-transform" />
            </a>
        );
    }

    return <p className="text-[15px] font-bold text-white/90 leading-relaxed bg-white/5 px-6 py-5 rounded-3xl border border-white/5 mt-3 shadow-inner">{stringValue}</p>;
  };

  if (loading && entries.length === 0) {
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

        body.ajnora-dossier-active {
            overflow: hidden !important;
            height: 100vh !important;
        }
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
            <button 
                onClick={fetchData} 
                className="px-8 py-4 bg-red-600 text-white font-bold uppercase text-[10px] tracking-widest hover:bg-white hover:text-black transition-all rounded-full shadow-lg shadow-red-600/20 flex items-center gap-2"
            >
                <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
                Sync Data
            </button>
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
                <button onClick={() => navigate(`/ajnoradashboard/${entry._id}`)} className="px-6 h-10 flex items-center justify-center bg-white/5 hover:bg-red-600 transition-all border border-white/10 rounded-full text-[10px] font-black uppercase tracking-widest gap-2">
                  <Target size={14} /> Open Dossier
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedEntry && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }} 
            animate={{ opacity: 1, scale: 1 }} 
            exit={{ opacity: 0, scale: 0.98 }} 
            data-lenis-prevent
            className="fixed inset-0 z-[200] bg-[#050505] overflow-y-auto"
          >
            {/* HEADER */}
            <div className="sticky top-0 z-[210] bg-[#050505]/95 backdrop-blur-2xl border-b border-white/5 px-8 py-6 flex justify-between items-center">
              <div className="flex items-center gap-6">
                <button onClick={() => navigate('/ajnoradashboard')} className="flex items-center gap-2 text-white hover:text-red-600 transition-all font-black uppercase text-[10px] tracking-[0.4em] group">
                  <div className="p-3 rounded-full bg-white/10 group-hover:bg-red-600 group-hover:text-white transition-all shadow-xl">
                    <X size={20} />
                  </div>
                  CLOSE DOSSIER
                </button>
                <div className="h-8 w-px bg-white/10 mx-2" />
                <div>
                  <h2 className="text-[9px] font-black text-red-600 uppercase tracking-[0.3em] mb-1">Dossier ID: {selectedEntry._id.slice(-8)}</h2>
                  <h3 className="text-3xl font-['Bebas_Neue'] tracking-wide uppercase">{selectedEntry.brandName || selectedEntry.name}</h3>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex flex-col items-end mr-4">
                    <span className="text-[8px] font-black text-white/20 uppercase tracking-widest mb-1">Operational Status</span>
                    <select 
                      defaultValue={selectedEntry.status} 
                      onChange={(e) => handleStatusUpdate(selectedEntry._id, e.target.value)} 
                      className="bg-white/5 border border-white/10 text-white font-bold text-[10px] px-6 py-2 rounded-full outline-none focus:border-red-600 appearance-none uppercase tracking-widest cursor-pointer hover:bg-white/10 transition-all"
                    >
                      {["new", "contacted", "qualified", "converted", "lost"].map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                </div>
                <button onClick={() => navigate('/ajnoradashboard')} className="p-3 bg-white/5 text-white/40 hover:bg-red-600 hover:text-white rounded-full transition-all"><X size={20} /></button>
              </div>
            </div>

            <div className="max-w-6xl mx-auto py-20 px-8 grid grid-cols-1 lg:grid-cols-3 gap-16">
              {/* LEFT COLUMN: PRIMARY INFO */}
              <div className="lg:col-span-2 space-y-16">
                <section>
                  <SectionTitle num="01" title="Company Dossier" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white/5 border border-white/5 p-8 rounded-3xl backdrop-blur-sm">
                    <DataPoint label="Legal Name" value={selectedEntry.legalName || selectedEntry.name} />
                    <DataPoint label="Brand Name" value={selectedEntry.brandName || '—'} />
                    <DataPoint label="Brand Tagline / Slogan" value={selectedEntry.brandTagline || '—'} full />
                    <DataPoint label="Company Type" value={selectedEntry.companyType} />
                    <DataPoint label="Inc. Year" value={selectedEntry.incYear} />
                    <DataPoint label="CIN" value={selectedEntry.cin} />
                    <DataPoint label="GST" value={selectedEntry.gst} />
                    
                    <div className="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-white/5">
                        <DataPoint label="Registered Address" value={`${selectedEntry.regAddress || ''}, ${selectedEntry.regCity || ''} ${selectedEntry.regPin || ''}`} full />
                    </div>

                    <div className="col-span-2 space-y-4 pt-6 border-t border-white/5">
                        <p className="text-[9px] text-white/20 uppercase font-black tracking-widest">Legal Compliance Status</p>
                        <div className="flex flex-wrap gap-2">
                           {(Array.isArray(selectedEntry.legalChecks) ? selectedEntry.legalChecks : []).map((check, i) => (
                             <span key={i} className="px-4 py-2 bg-green-600/10 border border-green-600/20 text-green-500 text-[10px] font-bold rounded-full flex items-center gap-1.5 shadow-lg shadow-green-600/5">
                               <CheckCircle2 size={10} /> {check}
                             </span>
                           ))}
                           {(!selectedEntry.legalChecks || selectedEntry.legalChecks.length === 0) && <span className="text-xs text-white/20">No specific checks documented</span>}
                        </div>
                    </div>
                    
                    <div className="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-white/5">
                        <DataPoint label="Brand Face / Spokesperson" value={selectedEntry.brandFace} />
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 bg-white/5 rounded-2xl border border-white/10 overflow-hidden flex items-center justify-center group/img">
                            {selectedEntry.uploadedFiles?.brand_face_img?.[0]?.url ? (
                              <img src={selectedEntry.uploadedFiles.brand_face_img[0].url} className="w-full h-full object-cover transition-transform group-hover/img:scale-110" alt="Spokesperson" />
                            ) : (
                              <User size={24} className="text-white/10" />
                            )}
                          </div>
                          <div className="flex-1">
                            <p className="text-[9px] text-white/20 uppercase font-black tracking-widest mb-1">Portfolio Link</p>
                            {selectedEntry.brandFaceLink ? (
                                <a href={selectedEntry.brandFaceLink} target="_blank" rel="noreferrer" className="text-red-600 hover:underline text-xs font-black uppercase tracking-widest flex items-center gap-1">
                                    Open Portfolio <ExternalLink size={10} />
                                </a>
                            ) : <p className="text-xs text-white/40">Not provided</p>}
                          </div>
                        </div>
                    </div>

                    <div className="col-span-2 pt-6 border-t border-white/5">
                        <p className="text-[9px] text-white/20 uppercase font-black tracking-widest mb-4">Board of Directors / Partners</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {(Array.isArray(selectedEntry.partnersList) ? selectedEntry.partnersList : []).map((p, i) => (
                                <div key={i} className="bg-black/40 p-5 rounded-2xl border border-white/5 flex items-center gap-5 hover:border-red-600/30 transition-all group/partner">
                                    <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex-shrink-0 flex-shrink-0 flex items-center justify-center overflow-hidden">
                                        {p.photo?.url ? (
                                            <img src={p.photo.url} alt={p.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <User size={18} className="text-white/20" />
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-[13px] font-bold text-white truncate">{p.name || 'Unnamed Partner'}</p>
                                        <p className="text-[10px] text-red-500 font-bold uppercase truncate tracking-widest mt-1">{p.role || 'Partner'}</p>
                                    </div>
                                    {p.photo?.url && (
                                        <a href={p.photo.url} target="_blank" className="p-2 text-white/10 hover:text-red-600 transition-all bg-white/5 rounded-lg group-hover/partner:bg-red-600 group-hover/partner:text-white">
                                            <ExternalLink size={14} />
                                        </a>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                  </div>
                </section>

                <section>
                  <SectionTitle num="02" title="Intelligence Questionnaire" />
                  <div className="bg-white/5 border border-white/5 p-10 rounded-3xl backdrop-blur-sm space-y-12">
                    <div className="grid grid-cols-1 gap-y-12">
                      {/* Dynamically render ALL fields except internal ones */}
                      {Object.keys(selectedEntry)
                        .filter(key => !INTERNAL_FIELDS.includes(key))
                        .map(key => {
                          const question = FIELD_LABELS[key] || key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1');
                          const answer = selectedEntry[key];

                          return (
                            <div key={key} className="space-y-4 pb-8 border-b border-white/5 group/q last:border-none last:pb-0">
                              <p className="text-[10px] font-black text-red-600 uppercase tracking-[0.3em] flex items-center gap-2 transition-all">
                                <HelpCircle size={10} className="text-red-600/40" /> {question}
                              </p>
                              {renderAnswer(key, answer)}
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </section>

                <section>
                  <SectionTitle num="03" title="Digital Presence Analysis" />
                  <div className="space-y-8 bg-white/5 border border-white/5 p-8 rounded-3xl">
                    <div className="flex items-center gap-6 border-b border-white/5 pb-8">
                      <div className="p-4 bg-red-600 rounded-2xl shadow-lg shadow-red-600/20">
                        <Globe className="text-white" size={24} />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] mb-1">Official Hub</p>
                        <a href={selectedEntry.website} target="_blank" className="text-2xl font-['Bebas_Neue'] tracking-wide hover:text-red-600 transition-all flex items-center gap-3">
                          {selectedEntry.website || 'No website documented'} <ExternalLink size={16} className="text-white/20" />
                        </a>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                       <Metric label="IG Community" value={selectedEntry.igFollowers} />
                       <Metric label="FB Reach" value={selectedEntry.fbFollowers} />
                       <Metric label="YT Influence" value={selectedEntry.ytSubs} />
                       <Metric label="GMB Standing" value={selectedEntry.gmbReviews} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-white/5">
                        <DataPoint label="Asset Stewardship" value={selectedEntry.assetOwnership} />
                        <DataPoint label="Administrative Obstacles" value={selectedEntry.accessIssues} />
                    </div>
                  </div>
                </section>
              </div>

              {/* RIGHT COLUMN: CONTACT & ASSETS */}
              <div className="space-y-12">
                <section className="bg-gradient-to-br from-red-600 to-red-800 p-8 rounded-3xl text-white shadow-2xl shadow-red-600/20 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-12 opacity-10">
                    <Building2 size={120} />
                  </div>
                  <h4 className="text-[10px] font-black uppercase tracking-[0.4em] mb-8 opacity-60 relative z-10">Intelligence Liaison</h4>
                  <div className="space-y-8 relative z-10">
                    <div className="flex items-center gap-5">
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-white/30 shadow-xl"><User size={32} /></div>
                      <div>
                        <p className="text-2xl font-bold leading-tight">{selectedEntry.contactName}</p>
                        <p className="text-[11px] font-black uppercase tracking-widest opacity-60 mt-1">{selectedEntry.contactDesig}</p>
                      </div>
                    </div>
                    <div className="space-y-5 pt-8 border-t border-white/20">
                       <a href={`mailto:${selectedEntry.contactEmail}`} className="flex items-center gap-4 hover:translate-x-1 transition-transform group">
                          <div className="p-2.5 bg-white/10 rounded-xl group-hover:bg-white group-hover:text-red-600 transition-all">
                            <Mail size={18} />
                          </div>
                          <span className="text-sm font-bold tracking-tight">{selectedEntry.contactEmail}</span>
                       </a>
                       <a href={`tel:${selectedEntry.contactPhone}`} className="flex items-center gap-4 hover:translate-x-1 transition-transform group">
                          <div className="p-2.5 bg-white/10 rounded-xl group-hover:bg-white group-hover:text-red-600 transition-all">
                            <Phone size={18} />
                          </div>
                          <span className="text-sm font-bold tracking-tight">{selectedEntry.contactPhone}</span>
                       </a>
                    </div>
                  </div>
                </section>

                <section className="bg-white/5 border border-white/5 p-8 rounded-3xl backdrop-blur-sm">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.4em] mb-8 text-red-600">Financial Profile</h4>
                  <div className="space-y-6">
                    <div className="p-6 bg-black/40 rounded-2xl border border-white/5 shadow-inner">
                       <p className="text-[9px] text-white/20 uppercase font-black tracking-widest mb-3">Allocated Resource Buffer</p>
                       <p className="text-4xl font-['Bebas_Neue'] text-red-600 tracking-wider leading-none">{selectedEntry.selectedBudget || 'TBD'}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                       <div className="p-5 bg-black/40 rounded-2xl border border-white/5">
                          <p className="text-[9px] text-white/20 uppercase font-black mb-2">Ad Velocity</p>
                          <p className="text-sm font-bold text-white/80">{selectedEntry.adSpend || '—'}</p>
                       </div>
                       <div className="p-5 bg-black/40 rounded-2xl border border-white/5">
                          <p className="text-[9px] text-white/20 uppercase font-black mb-2">Cycle Time</p>
                          <p className="text-sm font-bold text-white/80">{selectedEntry.contractDur || '—'}</p>
                       </div>
                    </div>
                    <div className="p-5 bg-black/40 rounded-2xl border border-white/5">
                       <p className="text-[9px] text-white/20 uppercase font-black mb-2">Target Activation</p>
                       <p className="text-sm font-bold text-red-500 tracking-widest uppercase">{selectedEntry.startDate || 'No date set'}</p>
                    </div>
                  </div>
                </section>

                <section className="bg-white/5 border border-white/5 p-8 rounded-3xl backdrop-blur-sm">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.4em] mb-8 text-red-600">Secure Assets</h4>
                  <div className="space-y-6">
                    {Object.entries(selectedEntry.uploadedFiles || {}).filter(([_, files]) => Array.isArray(files) ? files.length > 0 : !!files).length > 0 ? (
                      Object.entries(selectedEntry.uploadedFiles || {})
                        .filter(([_, files]) => Array.isArray(files) ? files.length > 0 : !!files)
                        .map(([key, files]) => {
                          const fileList = Array.isArray(files) ? files : [files];
                          return (
                            <div key={key} className="space-y-4">
                               <div className="flex items-center gap-3">
                                  <p className="text-[9px] text-white/20 uppercase font-black tracking-[0.2em]">{key.replace('_', ' ')}</p>
                                  <div className="h-[1px] flex-1 bg-white/5"></div>
                               </div>
                               <div className="grid grid-cols-1 gap-3">
                                 {fileList.map((file, i) => {
                                   const fileUrl = typeof file === 'string' ? file : file?.url;
                                   const fileName = (typeof file === 'object' && file?.name) ? file.name : `Asset ${i+1}`;
                                   if (!fileUrl) return null;
                                   
                                   return (
                                     <a 
                                       key={i} 
                                       href={fileUrl} 
                                       target="_blank" 
                                       className="group/asset flex items-center gap-4 p-4 bg-black/40 rounded-2xl border border-white/5 hover:border-red-600/50 transition-all"
                                     >
                                       <div className="w-12 h-12 bg-black/60 rounded-xl border border-white/10 flex items-center justify-center overflow-hidden flex-shrink-0 shadow-lg">
                                         {fileUrl?.match(/\.(jpg|jpeg|png|gif|webp)$/i) ? (
                                           <img src={fileUrl} className="w-full h-full object-cover group-hover/asset:scale-110 transition-transform" alt="Asset" />
                                         ) : (
                                           <FileText size={20} className="text-red-600/30" />
                                         )}
                                       </div>
                                       <div className="flex-1 min-w-0">
                                         <span className="text-[11px] font-bold text-white block truncate uppercase tracking-tight">{fileName}</span>
                                         <span className="text-[8px] text-green-500 font-black uppercase tracking-widest mt-1 block">Secured</span>
                                       </div>
                                       <div className="p-2 bg-white/5 rounded-lg group-hover/asset:bg-red-600 group-hover/asset:text-white transition-all text-white/20">
                                          <ExternalLink size={12} />
                                       </div>
                                     </a>
                                   );
                                 })}
                               </div>
                            </div>
                          );
                        })
                    ) : (
                      <div className="py-16 border border-dashed border-white/5 rounded-3xl flex flex-col items-center justify-center text-center bg-black/20">
                         <FileText size={32} className="text-white/5 mb-4" />
                         <p className="text-[10px] text-white/20 uppercase font-black tracking-widest">No Intelligence Assets</p>
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

const SectionTitle = ({ num, title }) => (
  <div className="flex items-center gap-5 mb-8">
    <span className="text-5xl font-['Bebas_Neue'] text-white/5 italic leading-none">{num}</span>
    <h3 className="text-base font-black uppercase tracking-[0.4em] text-red-600 border-b-2 border-red-600/20 pb-2">{title}</h3>
  </div>
);

const DataPoint = ({ label, value, full }) => (
  <div className={full ? "col-span-2" : ""}>
    <p className="text-[9px] text-white/20 uppercase font-black tracking-[0.2em] mb-2">{label}</p>
    <div className="text-[14px] font-bold text-white/90 leading-relaxed bg-white/5 px-4 py-3 rounded-xl border border-white/5 shadow-inner">
        {value || "—"}
    </div>
  </div>
);

const Metric = ({ label, value }) => (
  <div className="text-center p-5 bg-black/40 rounded-2xl border border-white/5 shadow-inner">
    <p className="text-[8px] text-white/20 uppercase font-black tracking-widest mb-2">{label}</p>
    <p className="text-xl font-['Bebas_Neue'] text-red-600 tracking-widest">{value || "0"}</p>
  </div>
);


