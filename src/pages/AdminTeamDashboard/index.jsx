import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  Shield,
  Settings,
  Search,
  Edit2,
  CheckCircle2,
  XCircle,
  ChevronRight,
  Layout,
  ExternalLink,
  Filter,
  Loader2,
  Save,
  X,
  Trash2,
  UserCircle,
  UserPlus,
  Image as ImageIcon,
  Camera,
  Upload,
  Link as LinkIcon,
  Instagram,
  Twitter,
  Linkedin,
  Tag,
  Hash,
  Briefcase,
  Cpu,
  Eye,
  EyeOff,
  Globe,
  Plus,
  ArrowLeft,
  Award,
  GraduationCap,
  Heart,
  Mic,
  Calendar,
  Sparkles,
} from "lucide-react";
import teamService from "../TeamDashboard/teamService";
import clientService from "../../services/clientService";
import { toast } from "react-toastify";

const AdminTeamDashboard = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingMember, setEditingMember] = useState(null);
  const [saving, setSaving] = useState(false);
  const [tagInput, setTagInput] = useState("");
  const [hobbyInput, setHobbyInput] = useState("");
  const [newMemberHobbyInput, setNewMemberHobbyInput] = useState("");
  const [showAddPassword, setShowAddPassword] = useState(false);
  const [showEditPassword, setShowEditPassword] = useState(false);

  const fileInputRef = useRef(null);
  const [activeUploadField, setActiveUploadField] = useState(null);
  const [uploading, setUploading] = useState({
    image: false,
    cardImage: false,
    image1: false,
    coverImage: false,
    idCard: false,
  });

  const [activeView, setActiveView] = useState("roster");
  const [availableClients, setAvailableClients] = useState([]);
  const [clientsLoading, setClientsLoading] = useState(false);
  const [showClientDropdown, setShowClientDropdown] = useState(false);
  const [showEditClientDropdown, setShowEditClientDropdown] = useState(false);
  const [newMember, setNewMember] = useState({
    name: "",
    email: "",
    password: "",
    emp_id: "",
    phone: "",
    doj: "",
    role: "",
    bgText: "",
    description: "",
    image: "",
    cardImage: "",
    image1: "",
    tags: [],
    category: [],
    bgColor: "#ff3358",
    hasBakedText: true,
    socials: {
      linkedin: "",
      instagram: "",
      twitter: "",
    },
    consultations: {
      price30Min: "",
      price60Min: "",
      priceFullDay: "",
    },
    isPublic: false,
    clickupId: "",
    rate: "",
    isEmployee: true,
    coverImage: "",
    idCard: "",
    tools: [],
    clients: [],
    achievements: [],
    hobbies: [],
    education: [],
    certifications: [],
    podcasts: [],
    events: [],
    innovations: [],
    workShowcase: [],
    slug: "",
  });

  const [selectedEmployeePage, setSelectedEmployeePage] = useState(null);
  const [savingPageConfig, setSavingPageConfig] = useState(false);
  const [pageConfigForm, setPageConfigForm] = useState({
    slug: "",
    bgText: "",
    description: "",
    isPublic: false,
    clickupId: "",
    tools: [],
    clients: [],
    achievements: [],
    workShowcase: [],
  });

  useEffect(() => {
    if (selectedEmployeePage) {
      setPageConfigForm({
        slug: selectedEmployeePage.slug || "",
        bgText: selectedEmployeePage.bgText || "",
        description: selectedEmployeePage.description || "",
        isPublic: selectedEmployeePage.isPublic || false,
        clickupId: selectedEmployeePage.user?.clickupId || "",
        tools: selectedEmployeePage.user?.tools || [],
        clients: selectedEmployeePage.user?.clients || [],
        achievements: selectedEmployeePage.user?.achievements || [],
        workShowcase: selectedEmployeePage.user?.workShowcase || [],
      });
    }
  }, [selectedEmployeePage]);

  const renderEmployeePagesView = () => {
    const filtered = members.filter(member => 
      member.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.role?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleCopyLink = (slug) => {
      const fullUrl = `${window.location.origin}/team/${slug}`;
      navigator.clipboard.writeText(fullUrl);
      toast.success("Page link copied to clipboard!");
    };

    return (
      <div className="max-w-7xl mx-auto pb-24">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div>
            <span className="text-[10px] font-black tracking-[0.3em] text-[#ff3358] uppercase mb-2 block">
              Employee Page Hub
            </span>
            <h1 className="text-5xl font-black tracking-tighter uppercase font-roboto scale-y-[1.2]">
              Employee <span className="text-[#ff3358]">Pages</span>
            </h1>
            <p className="text-white/40 text-xs mt-2 uppercase tracking-widest font-medium">
              Manage custom employee profile pages, ClickUp synchronization & visibility.
            </p>
          </div>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input
              type="text"
              placeholder="Search employee pages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-6 py-4 focus:border-[#ff3358] focus:bg-white/10 outline-none transition-all font-medium text-sm text-white placeholder-white/20"
            />
          </div>
        </header>

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white/5 border border-white/10 rounded-[2.5rem] backdrop-blur-3xl">
            <Globe className="w-12 h-12 text-white/20 mb-4 animate-bounce" />
            <p className="text-white/40 font-bold uppercase tracking-widest text-sm">No employee pages found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((member) => {
              const profileLink = `/team/${member.slug || ""}`;
              const isLive = member.isPublic;
              const hasClickUp = member.user?.clickupId;

              return (
                <motion.div
                  key={member._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 flex flex-col justify-between hover:border-[#ff3358]/50 hover:shadow-[0_20px_50px_rgba(255,51,88,0.1)] transition-all duration-500 group/card relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#ff3358]/5 blur-[40px] rounded-full group-hover/card:bg-[#ff3358]/10 transition-all duration-500" />
                  
                  <div>
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 overflow-hidden relative flex-shrink-0 flex items-center justify-center">
                          {member.image ? (
                            <img src={member.image} alt={member.name} className="w-full h-full object-cover group-hover/card:scale-110 transition-transform duration-500" />
                          ) : (
                            <Users className="w-6 h-6 text-white/20" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-black text-lg tracking-tight uppercase group-hover/card:text-[#ff3358] transition-colors line-clamp-1">{member.name}</h3>
                          <p className="text-[10px] text-white/40 uppercase tracking-widest font-black line-clamp-1">{member.role}</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4 my-6 bg-white/5 rounded-2xl p-4 border border-white/5">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-white/30 uppercase font-bold tracking-widest text-[9px]">Visibility:</span>
                        <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${isLive ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'}`}>
                          {isLive ? 'Live' : 'Draft'}
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-white/30 uppercase font-bold tracking-widest text-[9px]">ClickUp Integration:</span>
                        {hasClickUp ? (
                          <span className="text-green-400 font-bold font-mono text-[10px] bg-green-500/10 px-2 py-0.5 rounded border border-green-500/10 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-ping" />
                            ID: {hasClickUp}
                          </span>
                        ) : (
                          <span className="text-white/20 uppercase font-black tracking-widest text-[9px] bg-white/5 px-2 py-0.5 rounded">Not Linked</span>
                        )}
                      </div>

                      <div className="flex flex-col gap-2 pt-2 border-t border-white/5">
                        <span className="text-white/30 uppercase font-bold tracking-widest text-[9px]">Page Slug:</span>
                        <div className="flex items-center justify-between bg-black/30 rounded-xl px-4 py-2.5 font-mono text-[11px] text-white/80 border border-white/5 w-full overflow-hidden">
                          <span className="truncate max-w-[150px]">/{member.slug || "no-slug"}</span>
                          {member.slug && (
                            <button 
                              onClick={() => handleCopyLink(member.slug)} 
                              className="text-[#ff3358] hover:text-white transition-colors"
                              title="Copy Full Page URL"
                            >
                              <LinkIcon className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 mt-6 pt-6 border-t border-white/5 w-full">
                    {member.slug ? (
                      <a
                        href={profileLink}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 bg-white/5 hover:bg-white/10 text-white font-bold text-[10px] uppercase tracking-widest py-3.5 rounded-xl border border-white/10 hover:border-white/20 transition-all flex items-center justify-center gap-2"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        Live Page
                      </a>
                    ) : (
                      <button
                        disabled
                        className="flex-1 bg-white/5 text-white/10 font-bold text-[10px] uppercase tracking-widest py-3.5 rounded-xl border border-white/5 cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        Live Page
                      </button>
                    )}
                    <button
                      onClick={() => {
                        setSelectedEmployeePage(member);
                        setActiveView("manage-employee-page");
                      }}
                      className="flex-1 bg-gradient-to-r from-[#ff3358] to-[#ff5c7a] hover:from-white hover:to-white hover:text-[#ff3358] text-white font-black text-[10px] uppercase tracking-widest py-3.5 rounded-xl transition-all shadow-[0_10px_20px_rgba(255,51,88,0.2)] flex items-center justify-center gap-2"
                    >
                      <Settings className="w-3.5 h-3.5" />
                      Manage Page
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  const renderManageEmployeePageView = () => {
    if (!selectedEmployeePage) return null;

    const handleAddField = (field, defaultObj) => {
      setPageConfigForm(prev => ({
        ...prev,
        [field]: [...(prev[field] || []), defaultObj]
      }));
    };

    const handleRemoveField = (field, index) => {
      setPageConfigForm(prev => ({
        ...prev,
        [field]: (prev[field] || []).filter((_, i) => i !== index)
      }));
    };

    const handleUpdateFieldItem = (field, index, key, value) => {
      setPageConfigForm(prev => {
        const updatedList = [...(prev[field] || [])];
        updatedList[index] = { ...updatedList[index], [key]: value };
        return { ...prev, [field]: updatedList };
      });
    };

    const handleSavePageConfig = async (e) => {
      e.preventDefault();
      setSavingPageConfig(true);
      try {
        const response = await fetch(`http://localhost:5000/team-v2/admin/member/${selectedEmployeePage._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token") || ""}`
          },
          body: JSON.stringify({
            slug: pageConfigForm.slug,
            bgText: pageConfigForm.bgText,
            description: pageConfigForm.description,
            isPublic: pageConfigForm.isPublic,
            clickupId: pageConfigForm.clickupId ? Number(pageConfigForm.clickupId) : null
          })
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || "Failed to save page configuration");
        }

        toast.success("Employee portfolio page saved successfully!");
        fetchMembers();
        setActiveView("employee-pages");
        setSelectedEmployeePage(null);
      } catch (err) {
        toast.error(err.message || "An error occurred while saving.");
      } finally {
        setSavingPageConfig(false);
      }
    };

    return (
      <div className="max-w-6xl mx-auto pb-24">
        {/* Back and Title Row */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                setActiveView("employee-pages");
                setSelectedEmployeePage(null);
              }}
              className="p-3 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 hover:border-white/20 text-white/70 hover:text-white transition-all flex items-center justify-center"
              title="Back to Employee Hub"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <span className="text-[10px] font-black tracking-[0.3em] text-[#ff3358] uppercase mb-1 block">
                Portfolio Builder
              </span>
              <h1 className="text-4xl font-black tracking-tighter uppercase font-roboto scale-y-[1.2] flex items-center gap-3">
                Manage Page <span className="text-[#ff3358]">Details</span>
              </h1>
            </div>
          </div>
          
          <div className="flex gap-4 w-full md:w-auto">
            <button
              type="button"
              onClick={() => {
                setActiveView("employee-pages");
                setSelectedEmployeePage(null);
              }}
              className="flex-1 md:flex-none px-6 py-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 text-white text-xs font-black uppercase tracking-widest transition-all"
            >
              Cancel
            </button>
            <button
              onClick={handleSavePageConfig}
              disabled={savingPageConfig}
              className="flex-1 md:flex-none px-8 py-4 bg-gradient-to-r from-[#ff3358] to-[#ff5c7a] hover:from-white hover:to-white hover:text-[#ff3358] text-white text-xs font-black uppercase tracking-widest rounded-2xl transition-all shadow-[0_15px_30px_rgba(255,51,88,0.25)] flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {savingPageConfig ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              {savingPageConfig ? "Saving..." : "Save Page Config"}
            </button>
          </div>
        </header>

        {/* Profile Card Header */}
        <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 mb-8 backdrop-blur-3xl relative overflow-hidden flex flex-col md:flex-row items-center gap-6 shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#ff3358]/5 blur-[70px] rounded-full pointer-events-none" />
          <div className="w-20 h-20 rounded-[1.8rem] bg-white/5 border border-white/10 overflow-hidden relative flex-shrink-0 flex items-center justify-center">
            {selectedEmployeePage.image ? (
              <img src={selectedEmployeePage.image} alt={selectedEmployeePage.name} className="w-full h-full object-cover" />
            ) : (
              <Users className="w-10 h-10 text-white/20" />
            )}
          </div>
          <div className="text-center md:text-left flex-grow">
            <h2 className="text-3xl font-black tracking-tight uppercase text-white font-roboto scale-y-[1.1]">{selectedEmployeePage.name}</h2>
            <p className="text-[#ff3358] text-xs font-black tracking-widest uppercase mt-1">{selectedEmployeePage.role}</p>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-3 text-xs text-white/50">
              <span className="bg-white/5 border border-white/5 px-3 py-1 rounded-full uppercase tracking-wider text-[9px] font-bold">
                Emp ID: {selectedEmployeePage.user?.emp_id || "N/A"}
              </span>
              <span className="bg-white/5 border border-white/5 px-3 py-1 rounded-full uppercase tracking-wider text-[9px] font-bold">
                Email: {selectedEmployeePage.user?.email || "N/A"}
              </span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSavePageConfig} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Columns - Detailed Inputs */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* 1. Page Configuration Settings */}
            <section className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 backdrop-blur-3xl shadow-2xl relative">
              <div className="flex items-center gap-3 mb-8 border-b border-white/10 pb-6">
                <Globe className="text-[#ff3358] w-6 h-6" />
                <h3 className="text-lg font-black tracking-tight uppercase">PAGE SETTINGS & METADATA</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] text-white/40 uppercase font-black tracking-wider">Page Slug URL</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 font-mono text-xs text-white/20">/team/</span>
                    <input
                      type="text"
                      placeholder="e.g. john-doe"
                      value={pageConfigForm.slug}
                      onChange={(e) => setPageConfigForm({ ...pageConfigForm, slug: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl pl-16 pr-6 py-4 focus:border-[#ff3358] outline-none text-sm transition-all font-mono"
                    />
                  </div>
                  <span className="text-[9px] text-white/30 uppercase">Creates URL: {window.location.origin}/team/{pageConfigForm.slug || "slug"}</span>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[10px] text-white/40 uppercase font-black tracking-wider">Visual Background Text</label>
                  <input
                    type="text"
                    placeholder="e.g. DEVELOPER, WRITER"
                    value={pageConfigForm.bgText}
                    onChange={(e) => setPageConfigForm({ ...pageConfigForm, bgText: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-[#ff3358] outline-none text-sm transition-all font-bold uppercase tracking-widest placeholder-white/25"
                  />
                  <span className="text-[9px] text-white/30 uppercase">Massive background glowing lettering behind portfolio.</span>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[10px] text-white/40 uppercase font-black tracking-wider">ClickUp ID</label>
                  <input
                    type="number"
                    placeholder="e.g. 95096925"
                    value={pageConfigForm.clickupId}
                    onChange={(e) => setPageConfigForm({ ...pageConfigForm, clickupId: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-[#ff3358] outline-none text-sm transition-all font-mono"
                  />
                  <span className="text-[9px] text-white/30 uppercase">Binds real-time deliverables and logging automatically.</span>
                </div>

                <div className="flex flex-col gap-3 justify-center">
                  <label className="text-[10px] text-white/40 uppercase font-black tracking-wider block">Visibility Status</label>
                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      onClick={() => setPageConfigForm({ ...pageConfigForm, isPublic: !pageConfigForm.isPublic })}
                      className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors outline-none ${pageConfigForm.isPublic ? 'bg-green-500' : 'bg-white/10 border border-white/5'}`}
                    >
                      <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${pageConfigForm.isPublic ? 'translate-x-8' : 'translate-x-1'}`} />
                    </button>
                    <span className="text-xs uppercase tracking-widest font-black text-white">
                      {pageConfigForm.isPublic ? "Live (Publicly visible)" : "Draft (Hidden)"}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-2 md:col-span-2">
                  <label className="text-[10px] text-white/40 uppercase font-black tracking-wider">Portfolio Description / Bio</label>
                  <textarea
                    placeholder="Describe their strategic role, major focus, and professional style..."
                    rows={4}
                    value={pageConfigForm.description}
                    onChange={(e) => setPageConfigForm({ ...pageConfigForm, description: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-[#ff3358] outline-none text-sm transition-all placeholder-white/20 resize-none font-medium leading-relaxed"
                  />
                </div>
              </div>
            </section>


          </div>

          {/* Right Column - Preview Box */}
          <div className="space-y-8">
            <section className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 backdrop-blur-3xl shadow-2xl relative sticky top-6 overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#ff3358]/5 blur-[40px] rounded-full pointer-events-none" />
              
              <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
                <Eye className="text-[#ff3358] w-5 h-5" />
                <h3 className="text-sm font-black tracking-tight uppercase">LIVE PAGE PREVIEW</h3>
              </div>

              {/* Mini Glassmorphic Card Preview */}
              <div className="bg-black/40 border border-white/10 rounded-[2rem] p-6 relative overflow-hidden group shadow-2xl">
                {/* Watermark Watermark background preview */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-[0.03] overflow-hidden">
                  <span className="text-8xl font-black tracking-tighter uppercase font-roboto text-white rotate-12 scale-150">
                    {pageConfigForm.bgText || "OUTSIDE"}
                  </span>
                </div>

                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 overflow-hidden flex items-center justify-center flex-shrink-0">
                      {selectedEmployeePage.image ? (
                        <img src={selectedEmployeePage.image} alt="Preview Avatar" className="w-full h-full object-cover" />
                      ) : (
                        <Users className="w-6 h-6 text-white/20" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-black text-sm uppercase tracking-tight text-white line-clamp-1">{selectedEmployeePage.name}</h4>
                      <p className="text-[9px] text-[#ff3358] uppercase font-black tracking-widest mt-0.5 line-clamp-1">{selectedEmployeePage.role}</p>
                    </div>
                  </div>

                  <p className="text-[10px] text-white/50 leading-relaxed font-medium line-clamp-3 mb-4 bg-white/5 rounded-xl p-3 border border-white/5">
                    {pageConfigForm.description || "No biography or strategic focus text written yet. Customize it on the left."}
                  </p>

                  <div className="space-y-2 border-t border-white/5 pt-4">
                    <div className="flex justify-between items-center text-[9px] font-bold text-white/40">
                      <span>VISIBILITY:</span>
                      <span className={`px-2 py-0.5 rounded-full ${pageConfigForm.isPublic ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'} uppercase tracking-widest font-black`}>
                        {pageConfigForm.isPublic ? 'Live' : 'Draft'}
                      </span>
                    </div>

                    <div className="flex justify-between items-center text-[9px] font-bold text-white/40">
                      <span>SLUG ROUTE:</span>
                      <span className="text-white/60 font-mono">/team/{pageConfigForm.slug || "no-slug"}</span>
                    </div>

                    <div className="flex justify-between items-center text-[9px] font-bold text-white/40">
                      <span>CLICKUP LINK:</span>
                      <span className="text-white/60 font-mono">ID: {pageConfigForm.clickupId || "None"}</span>
                    </div>
                  </div>

                  {/* Tiny Arsenal preview */}
                  <div className="mt-4 pt-4 border-t border-white/5">
                    <span className="text-[8px] font-black text-white/30 tracking-widest block uppercase mb-2">TECHNICAL ARSENAL ({ (pageConfigForm.tools || []).length })</span>
                    <div className="flex flex-wrap gap-1.5">
                      {(pageConfigForm.tools || []).map((t, i) => t.toolName && (
                        <span key={i} className="text-[8px] font-bold uppercase tracking-wider bg-white/5 border border-white/5 px-2 py-0.5 rounded text-white/60">
                          {t.icon || "🛠️"} {t.toolName}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Tiny achievements preview */}
                  <div className="mt-3">
                    <span className="text-[8px] font-black text-white/30 tracking-widest block uppercase mb-2">MILESTONES ({ (pageConfigForm.achievements || []).length })</span>
                    <div className="flex flex-wrap gap-1.5">
                      {(pageConfigForm.achievements || []).map((a, i) => a.title && (
                        <span key={i} className="text-[8px] font-bold uppercase tracking-wider bg-[#ff3358]/10 border border-[#ff3358]/20 px-2 py-0.5 rounded text-[#ff3358]">
                          🏆 {a.title}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-white/5 border border-white/5 rounded-2xl text-[10px] text-white/40 leading-relaxed uppercase tracking-wider font-semibold">
                <span className="text-[#ff3358] font-black block mb-1">PRO-TIP:</span>
                Changes saved here will propagate instantly in real-time across your live public portfolio pages.
              </div>
            </section>
          </div>
        </form>
      </div>
    );
  };

  useEffect(() => {
    fetchMembers();
    fetchAvailableClients();
  }, []);

  const fetchAvailableClients = async () => {
    try {
      setClientsLoading(true);
      const response = await clientService.getAllClients();
      if (response.success && Array.isArray(response.data)) {
        setAvailableClients(response.data);
      } else if (Array.isArray(response)) {
        setAvailableClients(response);
      }
    } catch (err) {
      console.error('Error fetching clients:', err);
      toast.error('Failed to load clients');
    } finally {
      setClientsLoading(false);
    }
  };

  useEffect(() => {
    if (editingMember) {
      document.body.style.overflow = "hidden";
      const mainEl = document.querySelector("main");
      if (mainEl) {
        mainEl.style.overflow = "hidden";
      }
    } else {
      document.body.style.overflow = "";
      const mainEl = document.querySelector("main");
      if (mainEl) {
        mainEl.style.overflow = "";
      }
    }
    return () => {
      document.body.style.overflow = "";
      const mainEl = document.querySelector("main");
      if (mainEl) {
        mainEl.style.overflow = "";
      }
    };
  }, [editingMember]);

  const fetchMembers = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await teamService.getAllMembers(token);
      if (response.success) {
        setMembers(response.data);
      }
    } catch (error) {
      toast.error("Failed to fetch team members");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateMember = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const token = localStorage.getItem("token");
      const response = await teamService.updateMemberById(
        editingMember._id,
        editingMember,
        token,
      );
      if (response.success) {
        toast.success("Member updated successfully");
        setMembers((prev) =>
          prev.map((m) => (m._id === editingMember._id ? response.data : m)),
        );
        setEditingMember(null);
      }
    } catch (error) {
      toast.error("Update failed");
    } finally {
      setSaving(false);
    }
  };

  const [sectionSaving, setSectionSaving] = useState("");

  const handleSaveSection = async (sectionKey) => {
    try {
      setSectionSaving(sectionKey);
      const token = localStorage.getItem("token");
      const response = await teamService.updateMemberById(
        editingMember._id,
        editingMember,
        token,
      );
      if (response.success) {
        toast.success("Section saved successfully");
        setMembers((prev) =>
          prev.map((m) => (m._id === editingMember._id ? response.data : m)),
        );
        const member = response.data;
        setEditingMember({
          ...member,
          email: member.user?.email || "",
          emp_id: member.user?.emp_id || "",
          phone: member.user?.phone || "",
          clickupId: member.user?.clickupId || "",
          rate: member.user?.rate || "",
          doj: member.user?.doj ? member.user.doj.split('T')[0] : "",
          isEmployee: member.user?.isEmployee || false,
          coverImage: member.user?.coverImage || "",
          idCard: member.user?.idCard || "",
          tools: member.user?.tools || [],
          clients: member.user?.clients || [],
          achievements: member.user?.achievements || [],
          hobbies: member.user?.hobbies || [],
          education: member.user?.education || [],
          certifications: member.user?.certifications || [],
          podcasts: member.user?.podcasts || [],
          events: member.user?.events || [],
          innovations: member.user?.innovations || [],
          workShowcase: member.user?.workShowcase || [],
          tags: member.tags || [],
          category: member.category || [],
          socials: member.socials || {
            linkedin: "",
            instagram: "",
            twitter: "",
          },
          consultations: member.consultations || {
            price30Min: "",
            price60Min: "",
            priceFullDay: "",
          },
        });
      }
    } catch (err) {
      toast.error("Failed to save section");
    } finally {
      setSectionSaving("");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingMember((prev) => ({ ...prev, [name]: value }));
  };

  const handleSocialChange = (e) => {
    const { name, value } = e.target;
    setEditingMember((prev) => ({
      ...prev,
      socials: { ...prev.socials, [name]: value },
    }));
  };

  const handleConsultationChange = (e) => {
    const { name, value } = e.target;
    setEditingMember((prev) => ({
      ...prev,
      consultations: { ...prev.consultations, [name]: value },
    }));
  };

  const handleTagAdd = (e) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      const tags = editingMember.tags || [];
      if (!tags.includes(tagInput.trim().toUpperCase())) {
        setEditingMember((prev) => ({
          ...prev,
          tags: [...tags, tagInput.trim().toUpperCase()],
        }));
      }
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove) => {
    setEditingMember((prev) => ({
      ...prev,
      tags: (prev.tags || []).filter((t) => t !== tagToRemove),
    }));
  };

  const toggleCategory = (cat) => {
    const category = editingMember.category || [];
    setEditingMember((prev) => ({
      ...prev,
      category: category.includes(cat)
        ? category.filter((c) => c !== cat)
        : [...category, cat],
    }));
  };

  const handleNewMemberChange = (e) => {
    const { name, value } = e.target;
    setNewMember((prev) => ({ ...prev, [name]: value }));
  };

  const handleNewMemberSocialChange = (e) => {
    const { name, value } = e.target;
    setNewMember((prev) => ({
      ...prev,
      socials: { ...prev.socials, [name]: value },
    }));
  };

  const handleNewMemberConsultationChange = (e) => {
    const { name, value } = e.target;
    setNewMember((prev) => ({
      ...prev,
      consultations: { ...prev.consultations, [name]: value },
    }));
  };

  const handleNewMemberTagAdd = (e) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      const tags = newMember.tags || [];
      if (!tags.includes(tagInput.trim().toUpperCase())) {
        setNewMember((prev) => ({
          ...prev,
          tags: [...tags, tagInput.trim().toUpperCase()],
        }));
      }
      setTagInput("");
    }
  };

  const removeNewMemberTag = (tagToRemove) => {
    setNewMember((prev) => ({
      ...prev,
      tags: (prev.tags || []).filter((t) => t !== tagToRemove),
    }));
  };

  const toggleNewMemberCategory = (cat) => {
    const category = newMember.category || [];
    setNewMember((prev) => ({
      ...prev,
      category: category.includes(cat)
        ? category.filter((c) => c !== cat)
        : [...category, cat],
    }));
  };

  const handleCreateMember = async (e) => {
    e.preventDefault();
    if (!newMember.name || !newMember.email || !newMember.password || !newMember.role) {
      toast.error("Name, email, password, and role are required!");
      return;
    }
    if (newMember.password.length < 5) {
      toast.error("Password must be at least 5 characters!");
      return;
    }
    setSaving(true);
    try {
      const token = localStorage.getItem("token");
      const response = await teamService.createMember(newMember, token);
      if (response.success) {
        toast.success("Employee created successfully!");
        setNewMember({
          name: "",
          email: "",
          password: "",
          emp_id: "",
          phone: "",
          doj: "",
          role: "",
          bgText: "",
          description: "",
          image: "",
          cardImage: "",
          image1: "",
          tags: [],
          category: [],
          bgColor: "#ff3358",
          hasBakedText: true,
          socials: {
            linkedin: "",
            instagram: "",
            twitter: "",
          },
          isPublic: false,
          clickupId: "",
          rate: "",
          isEmployee: true,
          coverImage: "",
          idCard: "",
          tools: [],
          clients: [],
          achievements: [],
          hobbies: [],
          education: [],
          certifications: [],
          podcasts: [],
          events: [],
          innovations: [],
        });
        fetchMembers();
        setActiveView("roster");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create employee");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteMember = async (id, name) => {
    if (!window.confirm(`Are you absolutely sure you want to delete employee "${name}"? This will permanently delete their profile and associated user account.`)) {
      return;
    }
    try {
      const token = localStorage.getItem("token");
      const response = await teamService.deleteMember(id, token);
      if (response.success) {
        toast.success("Employee deleted successfully!");
        fetchMembers();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete employee");
    }
  };

  const handleAddToolField = () => {
    setNewMember((prev) => ({
      ...prev,
      tools: [...(prev.tools || []), { toolName: "", url: "", icon: "", description: "" }]
    }));
  };

  const handleToolFieldChange = (index, field, value) => {
    setNewMember((prev) => {
      const tools = [...(prev.tools || [])];
      tools[index] = { ...tools[index], [field]: value };
      return { ...prev, tools };
    });
  };

  const handleRemoveToolField = (index) => {
    setNewMember((prev) => ({
      ...prev,
      tools: (prev.tools || []).filter((_, i) => i !== index)
    }));
  };

  const handleAddClientField = () => {
    setNewMember((prev) => ({
      ...prev,
      clients: [...(prev.clients || []), { name: "", logo: "", website: "", status: "active" }]
    }));
  };

  const handleClientFieldChange = (index, field, value) => {
    setNewMember((prev) => {
      const clients = [...(prev.clients || [])];
      clients[index] = { ...clients[index], [field]: value };
      return { ...prev, clients };
    });
  };

  const handleRemoveClientField = (index) => {
    setNewMember((prev) => ({
      ...prev,
      clients: (prev.clients || []).filter((_, i) => i !== index)
    }));
  };

  const handleEditClientFieldAdd = () => {
    setEditingMember((prev) => ({
      ...prev,
      clients: [...(prev.clients || []), { name: "", logo: "", website: "", status: "active" }]
    }));
  };

  const handleEditToolFieldAdd = () => {
    setEditingMember((prev) => ({
      ...prev,
      tools: [...(prev.tools || []), { toolName: "", url: "", icon: "", description: "" }]
    }));
  };

  const handleEditToolFieldChange = (index, field, value) => {
    setEditingMember((prev) => {
      const tools = [...(prev.tools || [])];
      tools[index] = { ...tools[index], [field]: value };
      return { ...prev, tools };
    });
  };

  const handleEditToolFieldRemove = (index) => {
    setEditingMember((prev) => ({
      ...prev,
      tools: (prev.tools || []).filter((_, i) => i !== index)
    }));
  };

  const handleEditClientFieldChange = (index, field, value) => {
    setEditingMember((prev) => {
      const clients = [...(prev.clients || [])];
      clients[index] = { ...clients[index], [field]: value };
      return { ...prev, clients };
    });
  };

  const handleEditClientFieldRemove = (index) => {
    setEditingMember((prev) => ({
      ...prev,
      clients: (prev.clients || []).filter((_, i) => i !== index)
    }));
  };

  // --- NEW FIELD HELPERS (Achievements/Milestones) ---
  const handleAddAchievementField = () => {
    setNewMember((prev) => ({
      ...prev,
      achievements: [...(prev.achievements || []), { title: "", description: "", image: "MILESTONE", date: "" }]
    }));
  };

  const handleAchievementFieldChange = (index, field, value) => {
    setNewMember((prev) => {
      const achievements = [...(prev.achievements || [])];
      achievements[index] = { ...achievements[index], [field]: value };
      return { ...prev, achievements };
    });
  };

  const handleRemoveAchievementField = (index) => {
    setNewMember((prev) => ({
      ...prev,
      achievements: (prev.achievements || []).filter((_, i) => i !== index)
    }));
  };

  const handleEditAchievementFieldAdd = () => {
    setEditingMember((prev) => ({
      ...prev,
      achievements: [...(prev.achievements || []), { title: "", description: "", image: "MILESTONE", date: "" }]
    }));
  };

  const handleEditAchievementFieldChange = (index, field, value) => {
    setEditingMember((prev) => {
      const achievements = [...(prev.achievements || [])];
      achievements[index] = { ...achievements[index], [field]: value };
      return { ...prev, achievements };
    });
  };

  const handleEditAchievementFieldRemove = (index) => {
    setEditingMember((prev) => ({
      ...prev,
      achievements: (prev.achievements || []).filter((_, i) => i !== index)
    }));
  };

  // --- NEW FIELD HELPERS (Hobbies) ---
  const handleHobbyAdd = (e) => {
    if (e.key === "Enter" && hobbyInput.trim()) {
      e.preventDefault();
      const hobbies = editingMember.hobbies || [];
      if (!hobbies.includes(hobbyInput.trim().toUpperCase())) {
        setEditingMember((prev) => ({
          ...prev,
          hobbies: [...hobbies, hobbyInput.trim().toUpperCase()],
        }));
      }
      setHobbyInput("");
    }
  };

  const removeHobby = (hobbyToRemove) => {
    setEditingMember((prev) => ({
      ...prev,
      hobbies: (prev.hobbies || []).filter((h) => h !== hobbyToRemove),
    }));
  };

  const handleNewMemberHobbyAdd = (e) => {
    if (e.key === "Enter" && newMemberHobbyInput.trim()) {
      e.preventDefault();
      const hobbies = newMember.hobbies || [];
      if (!hobbies.includes(newMemberHobbyInput.trim().toUpperCase())) {
        setNewMember((prev) => ({
          ...prev,
          hobbies: [...hobbies, newMemberHobbyInput.trim().toUpperCase()],
        }));
      }
      setNewMemberHobbyInput("");
    }
  };

  const removeNewMemberHobby = (hobbyToRemove) => {
    setNewMember((prev) => ({
      ...prev,
      hobbies: (prev.hobbies || []).filter((h) => h !== hobbyToRemove),
    }));
  };

  // --- NEW FIELD HELPERS (Education & Certifications) ---
  const handleAddEducation = () => {
    setEditingMember((prev) => ({
      ...prev,
      education: [...(prev.education || []), { degree: '', institution: '', year: '', grade: '' }]
    }));
  };
  const handleEducationChange = (idx, field, value) => {
    setEditingMember((prev) => {
      const updated = [...(prev.education || [])];
      updated[idx] = { ...updated[idx], [field]: value };
      return { ...prev, education: updated };
    });
  };
  const removeEducation = (idx) => {
    setEditingMember((prev) => ({
      ...prev,
      education: (prev.education || []).filter((_, i) => i !== idx)
    }));
  };

  const handleAddCertification = () => {
    setEditingMember((prev) => ({
      ...prev,
      certifications: [...(prev.certifications || []), { name: '', issuedBy: '', year: '', credentialUrl: '' }]
    }));
  };
  const handleCertificationChange = (idx, field, value) => {
    setEditingMember((prev) => {
      const updated = [...(prev.certifications || [])];
      updated[idx] = { ...updated[idx], [field]: value };
      return { ...prev, certifications: updated };
    });
  };
  const removeCertification = (idx) => {
    setEditingMember((prev) => ({
      ...prev,
      certifications: (prev.certifications || []).filter((_, i) => i !== idx)
    }));
  };

  // --- NEW FIELD HELPERS (Voices Podcasts) ---
  const handleAddPodcastField = () => {
    setNewMember((prev) => ({
      ...prev,
      podcasts: [...(prev.podcasts || []), { episodeNo: (prev.podcasts?.length || 0) + 1, title: "", duration: "", url: "", host: "Sham SK" }]
    }));
  };

  const handlePodcastFieldChange = (index, field, value) => {
    setNewMember((prev) => {
      const podcasts = [...(prev.podcasts || [])];
      podcasts[index] = { ...podcasts[index], [field]: value };
      return { ...prev, podcasts };
    });
  };

  const handleRemovePodcastField = (index) => {
    setNewMember((prev) => ({
      ...prev,
      podcasts: (prev.podcasts || []).filter((_, i) => i !== index)
    }));
  };

  const handleEditPodcastFieldAdd = () => {
    setEditingMember((prev) => ({
      ...prev,
      podcasts: [...(prev.podcasts || []), { episodeNo: (prev.podcasts?.length || 0) + 1, title: "", duration: "", url: "", host: "Sham SK" }]
    }));
  };

  const handleEditPodcastFieldChange = (index, field, value) => {
    setEditingMember((prev) => {
      const podcasts = [...(prev.podcasts || [])];
      podcasts[index] = { ...podcasts[index], [field]: value };
      return { ...prev, podcasts };
    });
  };

  const handleEditPodcastFieldRemove = (index) => {
    setEditingMember((prev) => ({
      ...prev,
      podcasts: (prev.podcasts || []).filter((_, i) => i !== index)
    }));
  };

  // --- NEW FIELD HELPERS (Event Portal) ---
  const handleAddEventField = () => {
    setNewMember((prev) => ({
      ...prev,
      events: [...(prev.events || []), { date: "", month: "", title: "", details: "", category: "purple" }]
    }));
  };

  const handleEventFieldChange = (index, field, value) => {
    setNewMember((prev) => {
      const events = [...(prev.events || [])];
      events[index] = { ...events[index], [field]: value };
      return { ...prev, events };
    });
  };

  const handleRemoveEventField = (index) => {
    setNewMember((prev) => ({
      ...prev,
      events: (prev.events || []).filter((_, i) => i !== index)
    }));
  };

  const handleEditEventFieldAdd = () => {
    setEditingMember((prev) => ({
      ...prev,
      events: [...(prev.events || []), { date: "", month: "", title: "", details: "", category: "purple" }]
    }));
  };

  const handleEditEventFieldChange = (index, field, value) => {
    setEditingMember((prev) => {
      const events = [...(prev.events || [])];
      events[index] = { ...events[index], [field]: value };
      return { ...prev, events };
    });
  };

  const handleEditEventFieldRemove = (index) => {
    setEditingMember((prev) => ({
      ...prev,
      events: (prev.events || []).filter((_, i) => i !== index)
    }));
  };

  // --- NEW FIELD HELPERS (Innovation Feed) ---
  const handleAddInnovationField = () => {
    setNewMember((prev) => ({
      ...prev,
      innovations: [...(prev.innovations || []), { type: "INNOVATION", date: "", title: "", content: "", url: "", likes: 0, comments: 0 }]
    }));
  };

  const handleInnovationFieldChange = (index, field, value) => {
    setNewMember((prev) => {
      const innovations = [...(prev.innovations || [])];
      innovations[index] = { ...innovations[index], [field]: value };
      return { ...prev, innovations };
    });
  };

  const handleRemoveInnovationField = (index) => {
    setNewMember((prev) => ({
      ...prev,
      innovations: (prev.innovations || []).filter((_, i) => i !== index)
    }));
  };

  const handleEditInnovationFieldAdd = () => {
    setEditingMember((prev) => ({
      ...prev,
      innovations: [...(prev.innovations || []), { type: "INNOVATION", date: "", title: "", content: "", url: "", likes: 0, comments: 0 }]
    }));
  };

  const handleEditInnovationFieldChange = (index, field, value) => {
    setEditingMember((prev) => {
      const innovations = [...(prev.innovations || [])];
      innovations[index] = { ...innovations[index], [field]: value };
      return { ...prev, innovations };
    });
  };

  const handleEditInnovationFieldRemove = (index) => {
    setEditingMember((prev) => ({
      ...prev,
      innovations: (prev.innovations || []).filter((_, i) => i !== index)
    }));
  };

  // --- NEW FIELD HELPERS (Work Showcase) ---
  const handleAddWorkShowcaseField = () => {
    setNewMember((prev) => ({
      ...prev,
      workShowcase: [...(prev.workShowcase || []), { category: "", title: "", description: "", images: [], link: "" }]
    }));
  };

  const handleWorkShowcaseFieldChange = (index, field, value) => {
    setNewMember((prev) => {
      const workShowcase = [...(prev.workShowcase || [])];
      workShowcase[index] = { ...workShowcase[index], [field]: value };
      return { ...prev, workShowcase };
    });
  };

  const handleRemoveWorkShowcaseField = (index) => {
    setNewMember((prev) => ({
      ...prev,
      workShowcase: (prev.workShowcase || []).filter((_, i) => i !== index)
    }));
  };

  const handleEditWorkShowcaseFieldAdd = () => {
    setEditingMember((prev) => ({
      ...prev,
      workShowcase: [...(prev.workShowcase || []), { category: "", title: "", description: "", images: [], link: "" }]
    }));
  };

  const handleEditWorkShowcaseFieldChange = (index, field, value) => {
    setEditingMember((prev) => {
      const workShowcase = [...(prev.workShowcase || [])];
      workShowcase[index] = { ...workShowcase[index], [field]: value };
      return { ...prev, workShowcase };
    });
  };

  const handleEditWorkShowcaseFieldRemove = (index) => {
    setEditingMember((prev) => ({
      ...prev,
      workShowcase: (prev.workShowcase || []).filter((_, i) => i !== index)
    }));
  };

  const handleWorkShowcaseImageUpload = async (e, index, isEdit = false) => {
    const file = e.target.files[0];
    if (!file) return;

    toast.info("Uploading showcase image to Cloudflare...");
    try {
      const token = localStorage.getItem("token");
      const response = await teamService.uploadImage(file, token);
      if (response && response.success) {
        if (isEdit) {
          const currentImages = editingMember.workShowcase[index].images || [];
          handleEditWorkShowcaseFieldChange(index, "images", [...currentImages, response.url]);
        } else {
          const currentImages = newMember.workShowcase[index].images || [];
          handleWorkShowcaseFieldChange(index, "images", [...currentImages, response.url]);
        }
        toast.success("Showcase image uploaded successfully!");
      } else {
        toast.error("Upload failed.");
      }
    } catch (error) {
      toast.error("Upload failed: " + error.message);
    }
  };


  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file || !activeUploadField) return;

    setUploading((prev) => ({ ...prev, [activeUploadField]: true }));
    try {
      const token = localStorage.getItem("token");
      const response = await teamService.uploadImage(file, token);
      if (response.success) {
        if (activeView === "add") {
          setNewMember((prev) => ({
            ...prev,
            [activeUploadField]: response.url,
          }));
        } else {
          setEditingMember((prev) => ({
            ...prev,
            [activeUploadField]: response.url,
          }));
        }
        toast.success(`${activeUploadField} uploaded successfully!`);
      }
    } catch (error) {
      toast.error("Upload failed. Please try again.");
    } finally {
      setUploading((prev) => ({ ...prev, [activeUploadField]: false }));
      setActiveUploadField(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const triggerUpload = (fieldName) => {
    setActiveUploadField(fieldName);
    fileInputRef.current?.click();
  };

  const handleClientLogoUpload = async (e, index, isEdit = false) => {
    const file = e.target.files[0];
    if (!file) return;

    toast.info("Uploading client logo to Cloudflare...");
    try {
      const token = localStorage.getItem("token");
      const response = await teamService.uploadImage(file, token);
      if (response && response.success) {
        if (isEdit) {
          handleEditClientFieldChange(index, "logo", response.url);
        } else {
          handleClientFieldChange(index, "logo", response.url);
        }
        toast.success("Client logo uploaded successfully!");
      } else {
        toast.error("Upload failed.");
      }
    } catch (error) {
      toast.error("Upload failed: " + error.message);
    }
  };

  const categories = [
    "LEADERSHIP",
    "TECHNOLOGY",
    "OPERATIONS",
    "STRATEGY",
    "CREATIVE",
    "PERFORMANCE",
    "FINANCE",
    "CONTENT",
  ];

  const filteredMembers = members.filter(
    (m) =>
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (m.role && m.role.toLowerCase().includes(searchQuery.toLowerCase())),
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-dark flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-[#ff3358] animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-dark selection:bg-brand-pink selection:text-white text-white flex relative">
      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        className="hidden"
        accept="image/png, image/jpeg, image/webp"
      />

      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-brand-purple/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-brand-pink/5 blur-[150px] rounded-full" />

        {/* Subtle grid line effect */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "100px 100px",
          }}
        />
      </div>

      {/* Sidebar */}
      <div className="w-64 border-r border-white/5 p-6 flex flex-col gap-8 fixed left-0 top-12 h-[calc(100vh-3rem)] z-20 bg-brand-dark/95 backdrop-blur-sm flex-shrink-0">
        <div className="flex items-center gap-3 px-2">
          <div className="w-8 h-8 bg-gradient-to-br from-[#ff3358] to-[#ff5c7a] rounded-lg flex items-center justify-center">
            <Shield className="w-4 h-4 text-white" />
          </div>
          <span className="font-black tracking-tighter text-lg uppercase">
            Admin Panel
          </span>
        </div>

        <nav className="flex flex-col gap-2">
          <button 
            onClick={() => setActiveView("roster")}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
              activeView === "roster"
                ? "bg-white/5 border border-white/10 text-[#ff3358]"
                : "text-white/40 hover:text-white"
            }`}
          >
            <Users className="w-4 h-4" /> Team Management
          </button>
          <button 
            onClick={() => setActiveView("add")}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
              activeView === "add"
                ? "bg-white/5 border border-white/10 text-[#ff3358]"
                : "text-white/40 hover:text-white"
            }`}
          >
            <UserPlus className="w-4 h-4" /> Add a new employee
          </button>
          <button 
            onClick={() => setActiveView("employee-pages")}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
              activeView === "employee-pages"
                ? "bg-white/5 border border-white/10 text-[#ff3358]"
                : "text-white/40 hover:text-white"
            }`}
          >
            <Globe className="w-4 h-4" /> Employee page
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-12 pt-16 overflow-y-auto relative z-10">
        {activeView === "roster" ? (
          <>
            <header className="flex justify-between items-end mb-12">
              <div>
                <span className="text-[10px] font-black tracking-[0.3em] text-white/30 uppercase mb-2 block">
                  Management Hub
                </span>
                <h1 className="text-5xl font-black tracking-tighter uppercase font-roboto scale-y-[1.2]">
                  Team <span className="text-[#ff3358]">Roster</span>
                </h1>
              </div>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <input
                  type="text"
                  placeholder="Search members..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-6 text-sm outline-none focus:border-[#ff3358] transition-all w-80"
                />
              </div>
            </header>

            <div className="grid gap-4">
              {filteredMembers.map((member) => (
                <motion.div
                  key={member._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white/5 border border-white/10 rounded-2xl p-6 flex items-center justify-between hover:border-white/20 transition-all group"
                >
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-white/10 relative">
                      <img
                        src={member.image}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                      {member.isPublic ? (
                        <div className="absolute top-1 right-1 w-2 h-2 bg-green-500 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.8)]" />
                      ) : (
                        <div className="absolute top-1 right-1 w-2 h-2 bg-white/20 rounded-full" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-black text-lg uppercase tracking-tight">
                        {member.name}
                      </h3>
                      <p className="text-xs font-bold text-white/40 uppercase tracking-widest">
                        {member.role}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-12">
                    <div className="flex flex-col items-end">
                      <span className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-1">
                        Status
                      </span>
                      <span
                        className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest ${member.isPublic ? "bg-green-500/10 text-green-500" : "bg-white/10 text-white/30"}`}
                      >
                        {member.isPublic ? "Public" : "Hidden"}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() =>
                          setEditingMember({
                            ...member,
                            email: member.user?.email || "",
                            emp_id: member.user?.emp_id || "",
                            phone: member.user?.phone || "",
                            clickupId: member.user?.clickupId || "",
                            rate: member.user?.rate || "",
                            doj: member.user?.doj ? member.user.doj.split('T')[0] : "",
                            isEmployee: member.user?.isEmployee || false,
                            coverImage: member.user?.coverImage || "",
                            idCard: member.user?.idCard || "",
                            tools: member.user?.tools || [],
                            clients: member.user?.clients || [],
                            achievements: member.user?.achievements || [],
                            hobbies: member.user?.hobbies || [],
                            podcasts: member.user?.podcasts || [],
                            events: member.user?.events || [],
                            innovations: member.user?.innovations || [],
                            workShowcase: member.user?.workShowcase || [],
                            tags: member.tags || [],
                            category: member.category || [],
                            socials: member.socials || {
                              linkedin: "",
                              instagram: "",
                              twitter: "",
                            },
                            consultations: member.consultations || {
                              price30Min: "",
                              price60Min: "",
                              priceFullDay: "",
                            },
                          })
                        }
                        className="p-3 bg-white/5 rounded-xl hover:bg-[#ff3358] hover:text-white transition-all text-white/40"
                        title="Edit Employee"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => handleDeleteMember(member._id, member.name)}
                        className="p-3 bg-white/5 rounded-xl hover:bg-red-500 hover:text-white transition-all text-white/40"
                        title="Delete Employee"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        ) : activeView === "employee-pages" ? (
          renderEmployeePagesView()
        ) : activeView === "manage-employee-page" ? (
          renderManageEmployeePageView()
        ) : (
          <div className="max-w-5xl mx-auto pb-24">
            <header className="mb-12">
              <span className="text-[10px] font-black tracking-[0.3em] text-white/30 uppercase mb-2 block">
                Management Hub
              </span>
              <h1 className="text-5xl font-black tracking-tighter uppercase font-roboto scale-y-[1.2]">
                Add New <span className="text-[#ff3358]">Employee</span>
              </h1>
            </header>

            <form onSubmit={handleCreateMember} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column */}
              <div className="lg:col-span-2 space-y-8">
                {/* Authentication & HR Details */}
                <section className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 backdrop-blur-3xl shadow-2xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Shield size={80} />
                  </div>

                  <div className="flex items-center gap-3 mb-10 border-b border-white/10 pb-8">
                    <Shield className="text-brand-pink" size={28} />
                    <h2 className="text-2xl font-black tracking-tight uppercase">
                      AUTHENTICATION & HR DETAILS
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase ml-1">
                        ClickUp ID
                      </label>
                      <input
                        type="number"
                        name="clickupId"
                        value={newMember.clickupId}
                        onChange={handleNewMemberChange}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm outline-none focus:border-[#ff3358] transition-all"
                        placeholder="123456"
                      />
                    </div>

                    <div className="space-y-3">
                      <label className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase ml-1">
                        Employee ID
                      </label>
                      <input
                        type="text"
                        name="emp_id"
                        value={newMember.emp_id}
                        onChange={handleNewMemberChange}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm outline-none focus:border-[#ff3358] transition-all"
                        placeholder="sb-web-01"
                      />
                    </div>

                    <div className="space-y-3">
                      <label className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase ml-1">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={newMember.email}
                        onChange={handleNewMemberChange}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm outline-none focus:border-[#ff3358] transition-all"
                        placeholder="employee@socialbureau.in"
                      />
                    </div>

                    <div className="space-y-3">
                      <label className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase ml-1">
                        Password (min 5 chars) *
                      </label>
                      
                      <div className="relative">
                        <input
                        type={showAddPassword ? "text" : "password"}
                        name="password"
                        required
                        value={newMember.password}
                        onChange={handleNewMemberChange}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm outline-none focus:border-[#ff3358] transition-all"
                        placeholder="••••••••"
                      />
                        <button
                          type="button"
                          onClick={() => setShowAddPassword(!showAddPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                        >
                          {showAddPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase ml-1">
                        Phone Number
                      </label>
                      <input
                        type="number"
                        name="phone"
                        value={newMember.phone || ""}
                        onChange={handleNewMemberChange}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm outline-none focus:border-[#ff3358] transition-all"
                        placeholder="9876543210"
                      />
                    </div>

                    <div className="space-y-3">
                      <label className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase ml-1">
                        Date of Joining (DOJ)
                      </label>
                      <input
                        type="date"
                        name="doj"
                        value={newMember.doj}
                        onChange={handleNewMemberChange}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm outline-none focus:border-[#ff3358] transition-all text-white/40"
                      />
                    </div>

                    <div className="space-y-3">
                      <label className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase ml-1">
                        Rate (per hour / monthly)
                      </label>
                      <input
                        type="number"
                        name="rate"
                        value={newMember.rate}
                        onChange={handleNewMemberChange}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm outline-none focus:border-[#ff3358] transition-all"
                        placeholder="50"
                      />
                    </div>

                    <div className="flex items-center space-x-3 pt-6">
                      <input
                        type="checkbox"
                        name="isEmployee"
                        id="isEmployee"
                        checked={newMember.isEmployee}
                        onChange={(e) => setNewMember(prev => ({ ...prev, isEmployee: e.target.checked }))}
                        className="w-5 h-5 rounded border-white/10 bg-white/5 text-[#ff3358] focus:ring-0 focus:ring-offset-0 transition-all cursor-pointer"
                      />
                      <label htmlFor="isEmployee" className="text-sm font-bold text-white cursor-pointer select-none">
                        Is Employee?
                      </label>
                    </div>
                  </div>
                </section>

                {/* Personal Identity */}
                <section className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 backdrop-blur-3xl shadow-2xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                    <UserCircle size={80} />
                  </div>

                  <div className="flex items-center gap-3 mb-10 border-b border-white/10 pb-8">
                    <UserCircle className="text-brand-pink" size={28} />
                    <h2 className="text-2xl font-black tracking-tight uppercase">
                      PERSONAL IDENTITY
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase ml-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={newMember.name}
                        onChange={handleNewMemberChange}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-brand-pink outline-none transition-all font-bold"
                        placeholder="John Doe"
                      />
                    </div>

                    <div className="space-y-3">
                      <label className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase ml-1">
                        Job Title / Role *
                      </label>
                      <input
                        type="text"
                        name="role"
                        required
                        value={newMember.role}
                        onChange={handleNewMemberChange}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-brand-pink outline-none transition-all font-bold"
                        placeholder="Senior Web Developer"
                      />
                    </div>

                    <div className="space-y-3 md:col-span-1">
                      <label className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase ml-1">
                        Baked Background Text
                      </label>
                      <input
                        type="text"
                        name="bgText"
                        value={newMember.bgText}
                        onChange={handleNewMemberChange}
                        maxLength={15}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-brand-pink outline-none transition-all font-mono tracking-[0.2em] text-sm"
                        placeholder="DEVELOPER"
                      />
                    </div>

                    <div className="space-y-3 md:col-span-1">
                      <label className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase ml-1">
                        Employee Page Slug (URL Path)
                      </label>
                      <input
                        type="text"
                        name="slug"
                        value={newMember.slug || ""}
                        onChange={handleNewMemberChange}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-brand-pink outline-none transition-all font-mono tracking-[0.2em] text-sm"
                        placeholder="john-doe"
                      />
                    </div>

                    <div className="space-y-3 md:col-span-2">
                      <label className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase ml-1">
                        Professional Description / Bio
                      </label>
                      <textarea
                        name="description"
                        value={newMember.description}
                        onChange={handleNewMemberChange}
                        rows={3}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 focus:border-brand-pink focus:bg-white/10 outline-none transition-all font-medium tracking-wide resize-none"
                        placeholder="Write a short professional bio..."
                      />
                    </div>

                    <div className="space-y-3">
                      <label className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase ml-1">
                        Card Glow Color
                      </label>
                      <div className="flex gap-4 items-center">
                        <input
                          type="color"
                          name="bgColor"
                          value={newMember.bgColor}
                          onChange={handleNewMemberChange}
                          className="w-16 h-16 bg-transparent border-none cursor-pointer rounded-xl overflow-hidden"
                        />
                        <input
                          type="text"
                          name="bgColor"
                          value={newMember.bgColor}
                          onChange={handleNewMemberChange}
                          className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-brand-pink outline-none transition-all font-mono text-sm"
                          placeholder="#HEXCODE"
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between bg-white/5 border border-white/10 rounded-2xl p-6 mt-6">
                        <div>
                          <h3 className="text-sm font-bold tracking-widest uppercase mb-1">
                            Baked Text Toggle
                          </h3>
                          <p className="text-[10px] text-white/30 uppercase tracking-widest">
                            Enable floating background text
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() =>
                            setNewMember((prev) => ({
                              ...prev,
                              hasBakedText: !prev.hasBakedText,
                            }))
                          }
                          className={`w-14 h-8 rounded-full transition-all relative ${newMember.hasBakedText ? "bg-brand-pink" : "bg-white/10"}`}
                        >
                          <motion.div
                            animate={{
                              x: newMember.hasBakedText ? 28 : 4,
                            }}
                            className="absolute top-1 w-6 h-6 bg-white rounded-full shadow-lg"
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Media Assets */}
                <section className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 backdrop-blur-3xl shadow-2xl">
                  <div className="flex items-center gap-3 mb-10 border-b border-white/10 pb-8">
                    <ImageIcon className="text-brand-pink" size={28} />
                    <h2 className="text-2xl font-black tracking-tight uppercase">
                      MEDIA ASSETS
                    </h2>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {/* Hero Portrait */}
                    <div className="space-y-2">
                      <label className="text-[9px] font-bold tracking-[0.2em] text-white/40 uppercase ml-1 block">
                        HERO
                      </label>
                      <div className="relative aspect-[4/5] rounded-2xl bg-white/5 border border-white/10 overflow-hidden group/img flex items-center justify-center">
                        {uploading.image ? (
                          <Loader2 className="animate-spin text-brand-pink" size={20} />
                        ) : newMember.image ? (
                          <>
                            <img
                              src={newMember.image}
                              className="w-full h-full object-cover"
                              alt="Hero"
                            />
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center gap-2">
                              <button
                                type="button"
                                onClick={() => triggerUpload("image")}
                                className="p-2 bg-brand-pink rounded-full hover:scale-110 transition-transform"
                              >
                                <Camera size={16} />
                              </button>
                              <button
                                type="button"
                                onClick={() => setNewMember((prev) => ({ ...prev, image: "" }))}
                                className="p-2 bg-white/10 rounded-full hover:bg-red-500 transition-colors"
                              >
                                <X size={16} />
                              </button>
                            </div>
                          </>
                        ) : (
                          <button
                            type="button"
                            onClick={() => triggerUpload("image")}
                            className="flex flex-col items-center gap-2 group/btn w-full h-full justify-center"
                          >
                            <Upload className="text-white/40 group-hover/btn:text-brand-pink" size={18} />
                            <span className="text-[7px] font-black tracking-widest text-white/20 text-center">UPLOAD</span>
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Card Background */}
                    <div className="space-y-2">
                      <label className="text-[9px] font-bold tracking-[0.2em] text-white/40 uppercase ml-1 block">
                        CARD BG
                      </label>
                      <div className="relative aspect-square rounded-2xl bg-white/5 border border-white/10 overflow-hidden group/card flex items-center justify-center">
                        {uploading.cardImage ? (
                          <Loader2 className="animate-spin text-brand-pink" size={20} />
                        ) : newMember.cardImage ? (
                          <>
                            <img src={newMember.cardImage} className="w-full h-full object-cover" alt="Card" />
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/card:opacity-100 transition-opacity flex items-center justify-center gap-2">
                              <button type="button" onClick={() => triggerUpload("cardImage")} className="p-2 bg-brand-pink rounded-full hover:scale-110 transition-transform">
                                <Camera size={16} />
                              </button>
                              <button type="button" onClick={() => setNewMember((prev) => ({ ...prev, cardImage: "" }))} className="p-2 bg-white/10 rounded-full hover:bg-red-500 transition-colors">
                                <X size={16} />
                              </button>
                            </div>
                          </>
                        ) : (
                          <button type="button" onClick={() => triggerUpload("cardImage")} className="flex flex-col items-center gap-2 group/btn w-full h-full justify-center">
                            <Upload className="text-white/40 group-hover/btn:text-brand-pink" size={18} />
                            <span className="text-[7px] font-black tracking-widest text-white/20 text-center">UPLOAD</span>
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Profile Image */}
                    <div className="space-y-2">
                      <label className="text-[9px] font-bold tracking-[0.2em] text-white/40 uppercase ml-1 block">
                        PROFILE
                      </label>
                      <div className="relative aspect-square rounded-2xl bg-white/5 border border-white/10 overflow-hidden group/card flex items-center justify-center">
                        {uploading.image1 ? (
                          <Loader2 className="animate-spin text-brand-pink" size={20} />
                        ) : newMember.image1 ? (
                          <>
                            <img src={newMember.image1} className="w-full h-full object-cover" alt="Profile" />
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/card:opacity-100 transition-opacity flex items-center justify-center gap-2">
                              <button type="button" onClick={() => triggerUpload("image1")} className="p-2 bg-brand-pink rounded-full hover:scale-110 transition-transform">
                                <Camera size={16} />
                              </button>
                              <button type="button" onClick={() => setNewMember((prev) => ({ ...prev, image1: "" }))} className="p-2 bg-white/10 rounded-full hover:bg-red-500 transition-colors">
                                <X size={16} />
                              </button>
                            </div>
                          </>
                        ) : (
                          <button type="button" onClick={() => triggerUpload("image1")} className="flex flex-col items-center gap-2 group/btn w-full h-full justify-center">
                            <Upload className="text-white/40 group-hover/btn:text-brand-pink" size={18} />
                            <span className="text-[7px] font-black tracking-widest text-white/20 text-center">UPLOAD</span>
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Cover Image */}
                    <div className="space-y-2">
                      <label className="text-[9px] font-bold tracking-[0.2em] text-white/40 uppercase ml-1 block">
                        COVER
                      </label>
                      <div className="relative aspect-square rounded-2xl bg-white/5 border border-white/10 overflow-hidden group/card flex items-center justify-center">
                        {uploading.coverImage ? (
                          <Loader2 className="animate-spin text-brand-pink" size={20} />
                        ) : newMember.coverImage ? (
                          <>
                            <img src={newMember.coverImage} className="w-full h-full object-cover" alt="Cover" />
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/card:opacity-100 transition-opacity flex items-center justify-center gap-2">
                              <button type="button" onClick={() => triggerUpload("coverImage")} className="p-2 bg-brand-pink rounded-full hover:scale-110 transition-transform">
                                <Camera size={16} />
                              </button>
                              <button type="button" onClick={() => setNewMember((prev) => ({ ...prev, coverImage: "" }))} className="p-2 bg-white/10 rounded-full hover:bg-red-500 transition-colors">
                                <X size={16} />
                              </button>
                            </div>
                          </>
                        ) : (
                          <button type="button" onClick={() => triggerUpload("coverImage")} className="flex flex-col items-center gap-2 group/btn w-full h-full justify-center">
                            <Upload className="text-white/40 group-hover/btn:text-brand-pink" size={18} />
                            <span className="text-[7px] font-black tracking-widest text-white/20 text-center">UPLOAD</span>
                          </button>
                        )}
                      </div>
                    </div>

                    {/* ID Card / Certificate */}
                    <div className="space-y-2">
                      <label className="text-[9px] font-bold tracking-[0.2em] text-white/40 uppercase ml-1 block">
                        ID CARD
                      </label>
                      <div className="relative aspect-square rounded-2xl bg-white/5 border border-white/10 overflow-hidden group/card flex items-center justify-center">
                        {uploading.idCard ? (
                          <Loader2 className="animate-spin text-brand-pink" size={20} />
                        ) : newMember.idCard ? (
                          <>
                            <img src={newMember.idCard} className="w-full h-full object-cover" alt="ID Card" />
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/card:opacity-100 transition-opacity flex items-center justify-center gap-2">
                              <button type="button" onClick={() => triggerUpload("idCard")} className="p-2 bg-brand-pink rounded-full hover:scale-110 transition-transform">
                                <Camera size={16} />
                              </button>
                              <button type="button" onClick={() => setNewMember((prev) => ({ ...prev, idCard: "" }))} className="p-2 bg-white/10 rounded-full hover:bg-red-500 transition-colors">
                                <X size={16} />
                              </button>
                            </div>
                          </>
                        ) : (
                          <button type="button" onClick={() => triggerUpload("idCard")} className="flex flex-col items-center gap-2 group/btn w-full h-full justify-center">
                            <Upload className="text-white/40 group-hover/btn:text-brand-pink" size={18} />
                            <span className="text-[7px] font-black tracking-widest text-white/20 text-center">UPLOAD</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </section>

                <section className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 backdrop-blur-3xl shadow-2xl">
                  <div className="flex items-center gap-3 mb-10 border-b border-white/10 pb-8">
                    <LinkIcon className="text-brand-pink" size={28} />
                    <h2 className="text-2xl font-black tracking-tight uppercase">
                      SOCIAL NETWORKS
                    </h2>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 text-white/40">
                        <Linkedin size={20} />
                      </div>
                      <input
                        type="text"
                        name="linkedin"
                        value={newMember.socials.linkedin}
                        onChange={handleNewMemberSocialChange}
                        className="flex-1 bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:border-brand-pink outline-none transition-all text-sm font-medium"
                        placeholder="LinkedIn Profile URL"
                      />
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 text-white/40">
                        <Instagram size={20} />
                      </div>
                      <input
                        type="text"
                        name="instagram"
                        value={newMember.socials.instagram}
                        onChange={handleNewMemberSocialChange}
                        className="flex-1 bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:border-brand-pink outline-none transition-all text-sm font-medium"
                        placeholder="Instagram Profile URL"
                      />
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 text-white/40">
                        <Twitter size={20} />
                      </div>
                      <input
                        type="text"
                        name="twitter"
                        value={newMember.socials.twitter}
                        onChange={handleNewMemberSocialChange}
                        className="flex-1 bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:border-brand-pink outline-none transition-all text-sm font-medium"
                        placeholder="Twitter Profile URL"
                      />
                    </div>
                  </div>
                </section>

                {/* Book Consultation Cost for Add New Employee */}
                <section className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 backdrop-blur-3xl shadow-2xl">
                  <div className="flex items-center gap-3 mb-10 border-b border-white/10 pb-8">
                    <Calendar className="text-brand-pink" size={28} />
                    <h2 className="text-2xl font-black tracking-tight uppercase">
                      BOOK CONSULTATION COST (₹)
                    </h2>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-48 text-[11px] font-black text-white/40 uppercase tracking-wider">
                        30 Min Session Cost
                      </div>
                      <input
                        type="text"
                        name="price30Min"
                        value={newMember.consultations?.price30Min || ""}
                        onChange={handleNewMemberConsultationChange}
                        className="flex-1 bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:border-brand-pink outline-none transition-all text-sm font-medium"
                        placeholder="e.g., ₹500"
                      />
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-48 text-[11px] font-black text-white/40 uppercase tracking-wider">
                        60 Min Session Cost
                      </div>
                      <input
                        type="text"
                        name="price60Min"
                        value={newMember.consultations?.price60Min || ""}
                        onChange={handleNewMemberConsultationChange}
                        className="flex-1 bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:border-brand-pink outline-none transition-all text-sm font-medium"
                        placeholder="e.g., ₹1000"
                      />
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-48 text-[11px] font-black text-white/40 uppercase tracking-wider">
                        Full Day Session Cost
                      </div>
                      <input
                        type="text"
                        name="priceFullDay"
                        value={newMember.consultations?.priceFullDay || ""}
                        onChange={handleNewMemberConsultationChange}
                        className="flex-1 bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:border-brand-pink outline-none transition-all text-sm font-medium"
                        placeholder="e.g., ₹5000"
                      />
                    </div>
                  </div>
                </section>


                {/* Tools Section */}
                <section className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 backdrop-blur-3xl shadow-2xl relative overflow-hidden group">
                  <div className="flex items-center gap-3 mb-10 border-b border-white/10 pb-8 justify-between">
                    <div className="flex items-center gap-3">
                      <Cpu className="text-brand-pink" size={28} />
                      <h2 className="text-2xl font-black tracking-tight uppercase">
                        Tools
                      </h2>
                    </div>
                    <button
                      type="button"
                      onClick={handleAddToolField}
                      className="px-4 py-2 bg-brand-pink/10 hover:bg-brand-pink/20 border border-brand-pink/20 rounded-xl text-xs font-bold text-brand-pink transition-all flex items-center gap-2 animate-pulse hover:animate-none"
                    >
                      + Add Tool
                    </button>
                  </div>

                  <div className="space-y-6">
                    {(!newMember.tools || newMember.tools.length === 0) ? (
                      <p className="text-sm text-white/30 text-center py-6 font-medium italic">
                        No tools added yet. Click "+ Add Tool" to define professional expertise.
                      </p>
                    ) : (
                      <div className="grid grid-cols-1 gap-6">
                        {(newMember.tools || []).map((tool, idx) => (
                          <div key={idx} className="bg-white/5 border border-white/10 rounded-2xl p-6 relative group/item">
                            <button
                              type="button"
                              onClick={() => handleRemoveToolField(idx)}
                              className="absolute top-4 right-4 text-white/30 hover:text-[#ff3358] transition-colors p-1"
                            >
                              <X size={16} />
                            </button>

                            <div className="grid grid-cols-1 gap-6">
                              <div className="space-y-2">
                                <label className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase ml-1">
                                  Tool Name *
                                </label>
                                <input
                                  type="text"
                                  required
                                  value={tool.toolName}
                                  onChange={(e) => handleToolFieldChange(idx, "toolName", e.target.value)}
                                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-brand-pink transition-all text-white font-bold"
                                  placeholder="e.g. Photoshop, VS Code, Figma"
                                />
                              </div>

                              <div className="space-y-2">
                                <label className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase ml-1">
                                  Proficiency Level ({tool.level !== undefined ? tool.level : 85}%)
                                </label>
                                <input
                                  type="range"
                                  min="0"
                                  max="100"
                                  value={tool.level !== undefined ? tool.level : 85}
                                  onChange={(e) => handleToolFieldChange(idx, "level", parseInt(e.target.value))}
                                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-brand-pink animate-pulse hover:animate-none"
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </section>
              </div>

              {/* Right Column */}
              <div className="space-y-8">
                {/* Status Toggle */}
                <section className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 backdrop-blur-3xl shadow-2xl relative overflow-hidden">
                  <div className="flex items-center justify-between border-b border-white/10 pb-8 mb-8">
                    <div>
                      <h2 className="text-xl font-black tracking-tight uppercase mb-1">
                        Roster Status
                      </h2>
                      <p className="text-[9px] text-white/30 uppercase tracking-widest">
                        Toggle public visibility on /team
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        setNewMember((prev) => ({
                          ...prev,
                          isPublic: !prev.isPublic,
                        }))
                      }
                      className={`w-16 h-10 rounded-full transition-all relative ${newMember.isPublic ? "bg-green-500 shadow-[0_0_20px_rgba(34,197,94,0.4)]" : "bg-white/10"}`}
                    >
                      <motion.div
                        animate={{ x: newMember.isPublic ? 28 : 4 }}
                        className="absolute top-1 w-8 h-8 bg-white rounded-full shadow-lg"
                      />
                    </button>
                  </div>

                  <div className="flex items-center gap-3 justify-center px-4 py-3 bg-white/5 rounded-2xl border border-white/5">
                    {newMember.isPublic ? (
                      <>
                        <CheckCircle2 className="text-green-500 w-5 h-5" />
                        <span className="text-[10px] font-black tracking-widest text-green-500 uppercase">
                          VISIBLE ON PUBLIC ROSTER
                        </span>
                      </>
                    ) : (
                      <>
                        <XCircle className="text-white/20 w-5 h-5" />
                        <span className="text-[10px] font-black tracking-widest text-white/30 uppercase">
                          HIDDEN FROM PUBLIC
                        </span>
                      </>
                    )}
                  </div>
                </section>

                {/* Expertise/Tags */}
                <section className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 backdrop-blur-3xl shadow-2xl">
                  <div className="flex items-center gap-3 mb-10 border-b border-white/10 pb-8">
                    <Tag className="text-brand-pink" size={28} />
                    <h2 className="text-2xl font-black tracking-tight uppercase">
                      EXPERTISE / TAGS
                    </h2>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <input
                        type="text"
                        placeholder="Add tag and press Enter"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyDown={handleNewMemberTagAdd}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-brand-pink outline-none transition-all text-sm font-semibold"
                      />
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {(newMember.tags || []).map((tag) => (
                        <motion.span
                          key={tag}
                          layout
                          className="px-4 py-2 bg-[#ff3358]/10 border border-[#ff3358]/30 rounded-xl text-xs font-bold text-brand-pink flex items-center gap-2"
                        >
                          {tag}
                          <button
                            type="button"
                            onClick={() => removeNewMemberTag(tag)}
                            className="hover:text-white transition-colors opacity-60 hover:opacity-100"
                          >
                            <X size={12} />
                          </button>
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </section>

                {/* Department Categories */}
                <section className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 backdrop-blur-3xl shadow-2xl">
                  <div className="flex items-center gap-3 mb-10 border-b border-white/10 pb-8">
                    <Hash className="text-brand-pink" size={28} />
                    <h2 className="text-2xl font-black tracking-tight uppercase">
                      DEPARTMENT
                    </h2>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => toggleNewMemberCategory(cat)}
                        className={`px-4 py-4 rounded-2xl text-[10px] font-black tracking-widest transition-all border ${
                          (newMember.category || []).includes(cat)
                            ? "bg-brand-pink border-brand-pink text-white shadow-[0_10px_20px_rgba(255,51,88,0.3)]"
                            : "bg-white/5 border-white/10 text-white/40 hover:border-white/30 hover:bg-white/10"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </section>

                {/* Clients Handled Section */}
                <section className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 backdrop-blur-3xl shadow-2xl relative overflow-hidden group">
                  <div className="flex items-center gap-3 mb-10 border-b border-white/10 pb-8 justify-between">
                    <div className="flex items-center gap-3">
                      <Briefcase className="text-brand-pink" size={28} />
                      <h2 className="text-2xl font-black tracking-tight uppercase">
                        Clients Handled
                      </h2>
                    </div>
                    <button
                      type="button"
                      onClick={handleAddClientField}
                      className="px-4 py-2 bg-brand-pink/10 hover:bg-brand-pink/20 border border-brand-pink/20 rounded-xl text-xs font-bold text-brand-pink transition-all flex items-center gap-2 animate-pulse hover:animate-none"
                    >
                      <Plus size={14} /> + Add Client
                    </button>
                  </div>

                  <div className="space-y-6">
                    {(!newMember.clients || newMember.clients.length === 0) ? (
                      <p className="text-sm text-white/30 text-center py-6 font-medium italic">
                        No clients added yet. Click "+ Add Client" to link client portfolios.
                      </p>
                    ) : (
                      <div className="grid grid-cols-1 gap-4">
                        {(newMember.clients || []).map((client, idx) => (
                          <div key={idx} className="bg-white/5 border border-white/10 rounded-2xl p-4 relative group/item">
                            <button
                              type="button"
                              onClick={() => handleRemoveClientField(idx)}
                              className="absolute top-4 right-4 text-white/30 hover:text-[#ff3358] transition-colors p-1"
                            >
                              <X size={16} />
                            </button>

                            <div className="space-y-2">
                              <label className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase ml-1">
                                Client Name *
                              </label>
                              <input
                                type="text"
                                required
                                value={client.name}
                                onChange={(e) => handleClientFieldChange(idx, "name", e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-brand-pink transition-all text-white font-bold"
                                placeholder="e.g. Nike, Google, Ajnora"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </section>

                {/* Career Timeline Section */}
                <section className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 backdrop-blur-3xl shadow-2xl relative overflow-hidden group">
                  <div className="flex items-center gap-3 mb-10 border-b border-white/10 pb-8 justify-between">
                    <div className="flex items-center gap-3">
                      <Award className="text-brand-pink" size={28} />
                      <h2 className="text-2xl font-black tracking-tight uppercase">
                        Career Timeline (Achievements)
                      </h2>
                    </div>
                    <button
                      type="button"
                      onClick={handleAddAchievementField}
                      className="px-4 py-2 bg-brand-pink/10 hover:bg-brand-pink/20 border border-brand-pink/20 rounded-xl text-xs font-bold text-brand-pink transition-all flex items-center gap-2 animate-pulse hover:animate-none"
                    >
                      + Add Milestone
                    </button>
                  </div>

                  <div className="space-y-6">
                    {(!newMember.achievements || newMember.achievements.length === 0) ? (
                      <p className="text-sm text-white/30 text-center py-6 font-medium italic">
                        No milestones added yet. Click "+ Add Milestone" to construct the career timeline.
                      </p>
                    ) : (
                      <div className="grid grid-cols-1 gap-6">
                        {(newMember.achievements || []).map((ach, idx) => (
                          <div key={idx} className="bg-white/5 border border-white/10 rounded-2xl p-6 relative group/item">
                            <button
                              type="button"
                              onClick={() => handleRemoveAchievementField(idx)}
                              className="absolute top-4 right-4 text-white/30 hover:text-[#ff3358] transition-colors p-1"
                            >
                              <X size={16} />
                            </button>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div className="space-y-2">
                                <label className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase ml-1">
                                  Milestone Title *
                                </label>
                                <input
                                  type="text"
                                  required
                                  value={ach.title}
                                  onChange={(e) => handleAchievementFieldChange(idx, "title", e.target.value)}
                                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-brand-pink transition-all text-white font-bold"
                                  placeholder="e.g. Lead Developer, Raised Seed Round"
                                />
                              </div>

                              <div className="space-y-2">
                                <label className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase ml-1">
                                  Milestone Date/Year (Custom)
                                </label>
                                <input
                                  type="text"
                                  value={ach.date || ""}
                                  onChange={(e) => handleAchievementFieldChange(idx, "date", e.target.value)}
                                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-brand-pink transition-all text-white"
                                  placeholder="e.g. JAN 2019, 2024"
                                />
                              </div>

                              <div className="space-y-2">
                                <label className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase ml-1">
                                  Badge Category
                                </label>
                                <select
                                  value={ach.image || "MILESTONE"}
                                  onChange={(e) => handleAchievementFieldChange(idx, "image", e.target.value)}
                                  className="w-full bg-[#16161a] border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-brand-pink transition-all text-white font-bold appearance-none"
                                >
                                  <option value="MILESTONE">Milestone</option>
                                  <option value="INNOVATION">Innovation</option>
                                  <option value="CLIENT WIN">Client Win</option>
                                  <option value="PARTNERSHIP">Partnership</option>
                                  <option value="ACHIEVEMENT">Achievement</option>
                                  <option value="LAUNCH">Launch</option>
                                </select>
                              </div>

                              <div className="space-y-2 md:col-span-2">
                                <label className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase ml-1">
                                  Description
                                </label>
                                <textarea
                                  value={ach.description || ""}
                                  onChange={(e) => handleAchievementFieldChange(idx, "description", e.target.value)}
                                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-brand-pink transition-all text-white h-20 resize-none"
                                  placeholder="Provide short details about this milestone..."
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </section>

                {/* Hobbies & Interests Section */}
                <section className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 backdrop-blur-3xl shadow-2xl relative overflow-hidden group">
                  <div className="flex items-center gap-3 mb-10 border-b border-white/10 pb-8">
                    <Heart className="text-brand-pink" size={28} />
                    <h2 className="text-2xl font-black tracking-tight uppercase">
                      Hobbies & Interests
                    </h2>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase ml-1">
                        Add Hobby (Press Enter)
                      </label>
                      <input
                        type="text"
                        value={newMemberHobbyInput}
                        onChange={(e) => setNewMemberHobbyInput(e.target.value)}
                        onKeyDown={handleNewMemberHobbyAdd}
                        placeholder="e.g. GAMING, HIKING, TRAVELING"
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 focus:border-brand-pink outline-none transition-all font-medium"
                      />
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {(!newMember.hobbies || newMember.hobbies.length === 0) ? (
                        <p className="text-xs text-white/30 italic">No hobbies added yet.</p>
                      ) : (
                        newMember.hobbies.map((hobby) => (
                          <motion.span
                            layout
                            key={hobby}
                            className="flex items-center gap-2 px-4 py-2 bg-brand-pink/10 border border-brand-pink/20 rounded-xl text-[10px] font-black text-brand-pink uppercase tracking-widest"
                          >
                            {hobby}
                            <button
                              type="button"
                              onClick={() => removeNewMemberHobby(hobby)}
                              className="hover:text-white transition-colors opacity-60 hover:opacity-100"
                            >
                              <X size={12} />
                            </button>
                          </motion.span>
                        ))
                      )}
                    </div>
                  </div>
                </section>

                {/* Innovation Feed Section */}
                <section className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 backdrop-blur-3xl shadow-2xl relative overflow-hidden group">
                  <div className="flex items-center gap-3 mb-10 border-b border-white/10 pb-8 justify-between">
                    <div className="flex items-center gap-3">
                      <Sparkles className="text-brand-pink" size={28} />
                      <h2 className="text-2xl font-black tracking-tight uppercase">
                        Innovation Feed
                      </h2>
                    </div>
                    <button
                      type="button"
                      onClick={handleAddInnovationField}
                      className="px-4 py-2 bg-brand-pink/10 hover:bg-brand-pink/20 border border-brand-pink/20 rounded-xl text-xs font-bold text-brand-pink transition-all flex items-center gap-2 animate-pulse hover:animate-none"
                    >
                      + Add Entry
                    </button>
                  </div>

                  <div className="space-y-6">
                    {(!newMember.innovations || newMember.innovations.length === 0) ? (
                      <p className="text-sm text-white/30 text-center py-6 font-medium italic">
                        No innovation feed entries added yet. Click "+ Add Entry" to add innovations.
                      </p>
                    ) : (
                      <div className="grid grid-cols-1 gap-6">
                        {(newMember.innovations || []).map((inn, idx) => (
                          <div key={idx} className="bg-white/5 border border-white/10 rounded-2xl p-6 relative group/item">
                            <button
                              type="button"
                              onClick={() => handleRemoveInnovationField(idx)}
                              className="absolute top-4 right-4 text-white/30 hover:text-[#ff3358] transition-colors p-1"
                            >
                              <X size={16} />
                            </button>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div className="space-y-2">
                                <label className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase ml-1">
                                  Type
                                </label>
                                <select
                                  value={inn.type || "INNOVATION"}
                                  onChange={(e) => handleInnovationFieldChange(idx, "type", e.target.value)}
                                  className="w-full bg-[#16161a] border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-brand-pink transition-all text-white font-bold appearance-none"
                                >
                                  <option value="INNOVATION">Innovation</option>
                                  <option value="CASE STUDY">Case Study</option>
                                  <option value="INSIGHT">Insight</option>
                                </select>
                              </div>

                              <div className="space-y-2">
                                <label className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase ml-1">
                                  Date
                                </label>
                                <input
                                  type="text"
                                  value={inn.date || ""}
                                  onChange={(e) => handleInnovationFieldChange(idx, "date", e.target.value)}
                                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-brand-pink transition-all text-white font-bold"
                                  placeholder="e.g. May 2026"
                                />
                              </div>

                              <div className="space-y-2 md:col-span-2">
                                <label className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase ml-1">
                                  Title *
                                </label>
                                <input
                                  type="text"
                                  required
                                  value={inn.title || ""}
                                  onChange={(e) => handleInnovationFieldChange(idx, "title", e.target.value)}
                                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-brand-pink transition-all text-white font-bold"
                                  placeholder="e.g. Next-Gen AI Agent Framework"
                                />
                              </div>

                              <div className="space-y-2 md:col-span-2">
                                <label className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase ml-1">
                                  Content / Description *
                                </label>
                                <textarea
                                  required
                                  value={inn.content || ""}
                                  onChange={(e) => handleInnovationFieldChange(idx, "content", e.target.value)}
                                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-brand-pink transition-all text-white h-24 resize-none"
                                  placeholder="Provide description of this innovation entry..."
                                />
                              </div>

                              <div className="space-y-2 md:col-span-2">
                                <label className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase ml-1">
                                  Attachment Link / URL
                                </label>
                                <input
                                  type="text"
                                  value={inn.url || ""}
                                  onChange={(e) => handleInnovationFieldChange(idx, "url", e.target.value)}
                                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-brand-pink transition-all text-white"
                                  placeholder="e.g. https://github.com/... or https://medium.com/..."
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </section>

                {/* Work Showcase Section */}
                <section className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 backdrop-blur-3xl shadow-2xl relative overflow-hidden group">
                  <div className="flex items-center gap-3 mb-10 border-b border-white/10 pb-8 justify-between">
                    <div className="flex items-center gap-3">
                      <Layout className="text-brand-pink" size={28} />
                      <h2 className="text-2xl font-black tracking-tight uppercase">
                        Work Showcase
                      </h2>
                    </div>
                    <button
                      type="button"
                      onClick={handleAddWorkShowcaseField}
                      className="px-4 py-2 bg-brand-pink/10 hover:bg-brand-pink/20 border border-brand-pink/20 rounded-xl text-xs font-bold text-brand-pink transition-all flex items-center gap-2 animate-pulse hover:animate-none"
                    >
                      + Add Showcase
                    </button>
                  </div>

                  <div className="space-y-6">
                    {(!newMember.workShowcase || newMember.workShowcase.length === 0) ? (
                      <p className="text-sm text-white/30 text-center py-6 font-medium italic">
                        No work showcase entries added yet. Click "+ Add Showcase" to add items.
                      </p>
                    ) : (
                      <div className="grid grid-cols-1 gap-6">
                        {(newMember.workShowcase || []).map((work, idx) => (
                          <div key={idx} className="bg-white/5 border border-white/10 rounded-2xl p-6 relative group/item">
                            <button
                              type="button"
                              onClick={() => handleRemoveWorkShowcaseField(idx)}
                              className="absolute top-4 right-4 text-white/30 hover:text-[#ff3358] transition-colors p-1"
                            >
                              <X size={16} />
                            </button>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div className="space-y-2">
                                <label className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase ml-1">
                                  Category (e.g. CONTENT CAMPAIGN)
                                </label>
                                <input
                                  type="text"
                                  required
                                  value={work.category || ""}
                                  onChange={(e) => handleWorkShowcaseFieldChange(idx, "category", e.target.value)}
                                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-brand-pink transition-all text-white font-bold"
                                  placeholder="e.g. CONTENT CAMPAIGN"
                                />
                              </div>

                              <div className="space-y-2">
                                <label className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase ml-1">
                                  Title *
                                </label>
                                <input
                                  type="text"
                                  required
                                  value={work.title || ""}
                                  onChange={(e) => handleWorkShowcaseFieldChange(idx, "title", e.target.value)}
                                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-brand-pink transition-all text-white font-bold"
                                  placeholder="e.g. E-Commerce Brand Growth"
                                />
                              </div>

                              <div className="space-y-2 md:col-span-2">
                                <label className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase ml-1">
                                  Website Link (Optional - for Developers)
                                </label>
                                <input
                                  type="text"
                                  value={work.link || ""}
                                  onChange={(e) => handleWorkShowcaseFieldChange(idx, "link", e.target.value)}
                                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-brand-pink transition-all text-white"
                                  placeholder="e.g. https://myproject.com"
                                />
                              </div>

                              <div className="space-y-2 md:col-span-2">
                                <label className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase ml-1">
                                  Content / Description *
                                </label>
                                <textarea
                                  required
                                  value={work.description || ""}
                                  onChange={(e) => handleWorkShowcaseFieldChange(idx, "description", e.target.value)}
                                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-brand-pink transition-all text-white h-24 resize-none"
                                  placeholder="Provide description of this showcase entry..."
                                />
                              </div>

                              {/* Upload Showcase Images */}
                              <div className="space-y-2 md:col-span-2">
                                <label className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase ml-1 block">
                                  Showcase Images (Max 3, Square placeholders)
                                </label>
                                <div className="grid grid-cols-3 gap-4">
                                  {(work.images || []).map((imgUrl, imgIdx) => (
                                    <div key={imgIdx} className="relative aspect-square bg-white/5 border border-white/10 rounded-2xl overflow-hidden group">
                                      <img src={imgUrl} className="w-full h-full object-cover" alt="" />
                                      <button
                                        type="button"
                                        onClick={() => {
                                          const newImages = work.images.filter((_, i) => i !== imgIdx);
                                          handleWorkShowcaseFieldChange(idx, "images", newImages);
                                        }}
                                        className="absolute top-2 right-2 p-1.5 bg-red-500 hover:bg-red-600 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                                      >
                                        <X size={12} />
                                      </button>
                                    </div>
                                  ))}
                                  {(!work.images || work.images.length < 3) && (
                                    <div className="aspect-square bg-white/5 border border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center relative hover:bg-white/[0.08] transition-all">
                                      <label className="flex flex-col items-center gap-2 text-white/30 hover:text-white/60 transition-colors cursor-pointer w-full h-full justify-center">
                                        <Upload size={20} />
                                        <span className="text-[8px] font-black tracking-widest uppercase text-center">Upload Square</span>
                                        <input
                                          type="file"
                                          accept="image/*"
                                          className="hidden"
                                          onChange={(e) => handleWorkShowcaseImageUpload(e, idx, false)}
                                        />
                                      </label>
                                    </div>
                                  )}
                                </div>
                              </div>

                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </section>

                {/* Voices Podcasts Section */}
                <section className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 backdrop-blur-3xl shadow-2xl relative overflow-hidden group">
                  <div className="flex items-center gap-3 mb-10 border-b border-white/10 pb-8 justify-between">
                    <div className="flex items-center gap-3">
                      <Mic className="text-brand-pink" size={28} />
                      <h2 className="text-2xl font-black tracking-tight uppercase">
                        Bureau - Voices Podcasts
                      </h2>
                    </div>
                    <button
                      type="button"
                      onClick={handleAddPodcastField}
                      className="px-4 py-2 bg-brand-pink/10 hover:bg-brand-pink/20 border border-brand-pink/20 rounded-xl text-xs font-bold text-brand-pink transition-all flex items-center gap-2 animate-pulse hover:animate-none"
                    >
                      + Add Episode
                    </button>
                  </div>

                  <div className="space-y-6">
                    {(!newMember.podcasts || newMember.podcasts.length === 0) ? (
                      <p className="text-sm text-white/30 text-center py-6 font-medium italic">
                        No episodes added yet. Click "+ Add Episode" to add podcasts.
                      </p>
                    ) : (
                      <div className="grid grid-cols-1 gap-6">
                        {(newMember.podcasts || []).map((podcast, idx) => (
                          <div key={idx} className="bg-white/5 border border-white/10 rounded-2xl p-6 relative group/item">
                            <button
                              type="button"
                              onClick={() => handleRemovePodcastField(idx)}
                              className="absolute top-4 right-4 text-white/30 hover:text-[#ff3358] transition-colors p-1"
                            >
                              <X size={16} />
                            </button>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div className="space-y-2">
                                <label className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase ml-1">
                                  Episode No
                                </label>
                                <input
                                  type="number"
                                  required
                                  value={podcast.episodeNo || (idx + 1)}
                                  onChange={(e) => handlePodcastFieldChange(idx, "episodeNo", parseInt(e.target.value) || (idx + 1))}
                                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-brand-pink transition-all text-white font-bold"
                                  placeholder="e.g. 1"
                                />
                              </div>

                              <div className="space-y-2">
                                <label className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase ml-1">
                                  Episode Title *
                                </label>
                                <input
                                  type="text"
                                  required
                                  value={podcast.title}
                                  onChange={(e) => handlePodcastFieldChange(idx, "title", e.target.value)}
                                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-brand-pink transition-all text-white font-bold"
                                  placeholder="e.g. Building Social Bureau V2"
                                />
                              </div>

                              <div className="space-y-2">
                                <label className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase ml-1">
                                  Duration
                                </label>
                                <input
                                  type="text"
                                  value={podcast.duration || ""}
                                  onChange={(e) => handlePodcastFieldChange(idx, "duration", e.target.value)}
                                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-brand-pink transition-all text-white"
                                  placeholder="e.g. 45:20"
                                />
                              </div>

                              <div className="space-y-2">
                                <label className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase ml-1">
                                  Host Name
                                </label>
                                <input
                                  type="text"
                                  value={podcast.host || ""}
                                  onChange={(e) => handlePodcastFieldChange(idx, "host", e.target.value)}
                                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-brand-pink transition-all text-white"
                                  placeholder="e.g. Sham SK"
                                />
                              </div>

                              <div className="space-y-2 md:col-span-2">
                                <label className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase ml-1">
                                  Audio/Video URL
                                </label>
                                <input
                                  type="text"
                                  value={podcast.url || ""}
                                  onChange={(e) => handlePodcastFieldChange(idx, "url", e.target.value)}
                                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-brand-pink transition-all text-white"
                                  placeholder="e.g. https://youtube.com/... or soundcloud.com/..."
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </section>

                {/* Event Portal Section */}
                <section className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 backdrop-blur-3xl shadow-2xl relative overflow-hidden group">
                  <div className="flex items-center gap-3 mb-10 border-b border-white/10 pb-8 justify-between">
                    <div className="flex items-center gap-3">
                      <Calendar className="text-brand-pink" size={28} />
                      <h2 className="text-2xl font-black tracking-tight uppercase">
                        Event Portal
                      </h2>
                    </div>
                    <button
                      type="button"
                      onClick={handleAddEventField}
                      className="px-4 py-2 bg-brand-pink/10 hover:bg-brand-pink/20 border border-brand-pink/20 rounded-xl text-xs font-bold text-brand-pink transition-all flex items-center gap-2 animate-pulse hover:animate-none"
                    >
                      + Add Event
                    </button>
                  </div>

                  <div className="space-y-6">
                    {(!newMember.events || newMember.events.length === 0) ? (
                      <p className="text-sm text-white/30 text-center py-6 font-medium italic">
                        No events added yet. Click "+ Add Event" to publish schedule.
                      </p>
                    ) : (
                      <div className="grid grid-cols-1 gap-6">
                        {(newMember.events || []).map((evt, idx) => (
                          <div key={idx} className="bg-white/5 border border-white/10 rounded-2xl p-6 relative group/item">
                            <button
                              type="button"
                              onClick={() => handleRemoveEventField(idx)}
                              className="absolute top-4 right-4 text-white/30 hover:text-[#ff3358] transition-colors p-1"
                            >
                              <X size={16} />
                            </button>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                              <div className="space-y-2">
                                <label className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase ml-1">
                                  Day/Date *
                                </label>
                                <input
                                  type="text"
                                  required
                                  value={evt.date}
                                  onChange={(e) => handleEventFieldChange(idx, "date", e.target.value)}
                                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-brand-pink transition-all text-white font-bold"
                                  placeholder="e.g. 24"
                                />
                              </div>

                              <div className="space-y-2">
                                <label className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase ml-1">
                                  Month Abbreviation *
                                </label>
                                <input
                                  type="text"
                                  required
                                  value={evt.month}
                                  onChange={(e) => handleEventFieldChange(idx, "month", e.target.value)}
                                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-brand-pink transition-all text-white font-bold"
                                  placeholder="e.g. OCT"
                                />
                              </div>

                              <div className="space-y-2">
                                <label className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase ml-1">
                                  Color Category
                                </label>
                                <select
                                  value={evt.category || "purple"}
                                  onChange={(e) => handleEventFieldChange(idx, "category", e.target.value)}
                                  className="w-full bg-[#16161a] border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-brand-pink transition-all text-white font-bold appearance-none"
                                >
                                  <option value="purple">Purple</option>
                                  <option value="yellow">Yellow</option>
                                  <option value="red">Red</option>
                                  <option value="green">Green</option>
                                </select>
                              </div>

                              <div className="space-y-2 md:col-span-3">
                                <label className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase ml-1">
                                  Event Title *
                                </label>
                                <input
                                  type="text"
                                  required
                                  value={evt.title}
                                  onChange={(e) => handleEventFieldChange(idx, "title", e.target.value)}
                                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-brand-pink transition-all text-white font-bold"
                                  placeholder="e.g. Hackathon Kickoff"
                                />
                              </div>

                              <div className="space-y-2 md:col-span-3">
                                <label className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase ml-1">
                                  Details
                                </label>
                                <textarea
                                  value={evt.details || ""}
                                  onChange={(e) => handleEventFieldChange(idx, "details", e.target.value)}
                                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-brand-pink transition-all text-white h-20 resize-none"
                                  placeholder="Provide short details about this event..."
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </section>



                {/* Action Buttons */}
                <div className="flex flex-col gap-4 pt-4">
                  <button
                    type="submit"
                    disabled={saving}
                    className="w-full bg-brand-pink text-white py-6 rounded-[2rem] font-black uppercase tracking-widest hover:bg-white hover:text-brand-pink shadow-[0_20px_40px_rgba(255,51,88,0.3)] transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                  >
                    {saving ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <Save className="w-5 h-5" />
                    )}
                    Create Employee
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveView("roster")}
                    className="w-full bg-white/5 text-white py-6 rounded-[2rem] font-black uppercase tracking-widest hover:bg-white/10 transition-all border border-white/5"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}
      </main>

        {/* Edit Modal */}
        <AnimatePresence>
          {editingMember && (
            <div 
              className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm pointer-events-auto"
              onWheel={(e) => e.stopPropagation()}
            >
              <div className="min-h-full p-1 sm:p-2 md:p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-[#0b0a0f] border border-white/10 rounded-3xl w-full max-w-full shadow-2xl relative mx-auto my-4 overflow-hidden"
              >
                {/* Background Decor */}
                <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden rounded-3xl">
                  <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-brand-purple/10 blur-[150px] rounded-full" />
                  <div className="absolute bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-[#ff3358]/5 blur-[150px] rounded-full" />
                  
                  {/* Subtle grid line effect */}
                  <div className="absolute inset-0 opacity-[0.03]" 
                       style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '100px 100px' }} 
                  />
                </div>

                <div className="px-4 md:px-5 py-3 md:py-4 border-b border-white/5 flex justify-between items-center bg-[#0b0a0f]/90 backdrop-blur-md sticky top-0 z-10 relative">
                  <h2 className="text-lg md:text-xl font-black uppercase tracking-tight">
                    Edit Member Profile
                  </h2>
                  <button
                    onClick={() => setEditingMember(null)}
                    className="p-1.5 hover:bg-white/10 rounded-full transition-colors ml-4 flex-shrink-0"
                  >
                    <X className="w-5 h-5 md:w-6 md:h-6" />
                  </button>
                </div>

                <div className="px-3 md:px-5 py-3 md:py-4 max-h-[calc(100vh-140px)] overflow-y-auto relative z-10">
                  <form
                    onSubmit={handleUpdateMember}
                    className="grid grid-cols-1 lg:grid-cols-6 gap-3 md:gap-4"
                  >
                    {/* Left Column */}
                    <div className="lg:col-span-3 space-y-2.5 md:space-y-3">
                      {/* Authentication & HR Details */}
                <section className="bg-white/5 border border-white/10 rounded-2xl p-5 md:p-6 backdrop-blur-3xl shadow-xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-3 group-hover:opacity-5 transition-opacity">
                    <Shield size={60} />
                  </div>

                  <div className="flex items-center gap-2 mb-4 md:mb-5 border-b border-white/10 pb-4">
                    <Shield className="text-brand-pink" size={20} />
                    <h2 className="text-sm md:text-base font-black tracking-tight uppercase">
                      Authentication & HR
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                    <div className="space-y-1.5 md:space-y-2">
                      <label className="text-[8px] md:text-[9px] font-bold tracking-[0.15em] text-white/40 uppercase ml-0.5">
                        ClickUp ID
                      </label>
                      <input
                        type="number"
                        name="clickupId"
                        value={editingMember.clickupId || ""}
                        onChange={handleInputChange}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-xs outline-none focus:border-[#ff3358] transition-all"
                        placeholder="123456"
                      />
                    </div>

                    <div className="space-y-1.5 md:space-y-2">
                      <label className="text-[8px] md:text-[9px] font-bold tracking-[0.15em] text-white/40 uppercase ml-0.5">
                        Employee ID
                      </label>
                      <input
                        type="text"
                        name="emp_id"
                        value={editingMember.emp_id || ""}
                        onChange={handleInputChange}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-xs outline-none focus:border-[#ff3358] transition-all"
                        placeholder="sb-web-01"
                      />
                    </div>

                    <div className="space-y-1.5 md:space-y-2">
                      <label className="text-[8px] md:text-[9px] font-bold tracking-[0.15em] text-white/40 uppercase ml-0.5">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={editingMember.email || ""}
                        onChange={handleInputChange}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-xs outline-none focus:border-[#ff3358] transition-all"
                        placeholder="employee@socialbureau.in"
                      />
                    </div>

                    <div className="space-y-1.5 md:space-y-2">
                      <label className="text-[8px] md:text-[9px] font-bold tracking-[0.15em] text-white/40 uppercase ml-0.5">
                        Password (5+ chars) *
                      </label>
                      
                      <div className="relative">
                        <input
                        type={showEditPassword ? "text" : "password"}
                        name="password"
                        value={editingMember.password || ""}
                        onChange={handleInputChange}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-xs outline-none focus:border-[#ff3358] transition-all pr-9"
                        placeholder="••••••••"
                      />
                        <button
                          type="button"
                          onClick={() => setShowEditPassword(!showEditPassword)}
                          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors p-0.5"
                        >
                          {showEditPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-1.5 md:space-y-2">
                      <label className="text-[8px] md:text-[9px] font-bold tracking-[0.15em] text-white/40 uppercase ml-0.5">
                        Phone Number
                      </label>
                      <input
                        type="number"
                        name="phone"
                        value={editingMember.phone || ""}
                        onChange={handleInputChange}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-xs outline-none focus:border-[#ff3358] transition-all"
                        placeholder="9876543210"
                      />
                    </div>

                    <div className="space-y-1.5 md:space-y-2">
                      <label className="text-[8px] md:text-[9px] font-bold tracking-[0.15em] text-white/40 uppercase ml-0.5">
                        Date of Joining (DOJ)
                      </label>
                      <input
                        type="date"
                        name="doj"
                        value={editingMember.doj || ""}
                        onChange={handleInputChange}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-xs outline-none focus:border-[#ff3358] transition-all text-white/40"
                      />
                    </div>

                    <div className="space-y-1.5 md:space-y-2">
                      <label className="text-[8px] md:text-[9px] font-bold tracking-[0.15em] text-white/40 uppercase ml-0.5">
                        Rate (hourly/monthly)
                      </label>
                      <input
                        type="number"
                        name="rate"
                        value={editingMember.rate || ""}
                        onChange={handleInputChange}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-xs outline-none focus:border-[#ff3358] transition-all"
                        placeholder="50"
                      />
                    </div>

                    <div className="flex items-center space-x-2 md:space-x-3 pt-3 md:pt-4 col-span-full">
                      <input
                        type="checkbox"
                        name="isEmployee"
                        id="isEmployee"
                        checked={editingMember.isEmployee}
                        onChange={(e) => setEditingMember(prev => ({ ...prev, isEmployee: e.target.checked }))}
                        className="w-4 h-4 rounded border-white/10 bg-white/5 text-[#ff3358] focus:ring-0 focus:ring-offset-0 transition-all cursor-pointer"
                      />
                      <label htmlFor="isEmployee" className="text-xs md:text-sm font-bold text-white cursor-pointer select-none">
                        Is Employee?
                      </label>
                    </div>
                    <div className="flex justify-end mt-3 md:mt-4 col-span-full">
                      <button
                        type="button"
                        onClick={() => handleSaveSection('auth')}
                        disabled={sectionSaving === 'auth'}
                        className="px-4 py-2 bg-brand-pink text-white rounded-lg text-xs md:text-sm font-bold disabled:opacity-50 flex items-center gap-2"
                      >
                        {sectionSaving === 'auth' ? (
                          <Loader2 className="w-3 h-3 animate-spin" />
                        ) : (
                          <Save className="w-3 h-3" />
                        )}
                        Save
                      </button>
                    </div>
                  </div>
                </section>

                      <section className="bg-white/5 border border-white/10 rounded-2xl p-5 md:p-6 backdrop-blur-3xl shadow-xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-3 group-hover:opacity-5 transition-opacity">
                          <UserCircle size={60} />
                        </div>

                        <div className="flex items-center gap-2 mb-4 md:mb-5 border-b border-white/10 pb-4">
                          <UserCircle className="text-brand-pink" size={20} />
                          <h2 className="text-sm md:text-base font-black tracking-tight uppercase">
                            Personal Identity
                          </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                          <div className="space-y-1.5 md:space-y-2">
                            <label className="text-[8px] md:text-[9px] font-bold tracking-[0.15em] text-white/40 uppercase ml-0.5">
                              Full Name
                            </label>
                            <input
                              type="text"
                              name="name"
                              value={editingMember.name || ""}
                              onChange={handleInputChange}
                              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 focus:border-brand-pink focus:bg-white/10 outline-none transition-all font-medium text-xs"
                              placeholder="Enter name"
                              required
                            />
                          </div>
                          <div className="space-y-1.5 md:space-y-2">
                            <label className="text-[8px] md:text-[9px] font-bold tracking-[0.15em] text-white/40 uppercase ml-0.5">
                              Professional Role
                            </label>
                            <input
                              type="text"
                              name="role"
                              value={editingMember.role || ""}
                              onChange={handleInputChange}
                              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 focus:border-brand-pink focus:bg-white/10 outline-none transition-all font-medium text-xs"
                              placeholder="e.g. Senior Developer"
                              required
                            />
                          </div>
                          <div className="space-y-1.5 md:space-y-2">
                            <label className="text-[8px] md:text-[9px] font-bold tracking-[0.15em] text-white/40 uppercase ml-0.5">
                              Visual Background Text
                            </label>
                            <input
                              type="text"
                              name="bgText"
                              value={editingMember.bgText || ""}
                              onChange={handleInputChange}
                              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 focus:border-brand-pink focus:bg-white/10 outline-none transition-all font-medium text-xs"
                              placeholder="e.g. TECHNOLOGY"
                            />
                          </div>
                          <div className="space-y-1.5 md:space-y-2">
                            <label className="text-[8px] md:text-[9px] font-bold tracking-[0.15em] text-white/40 uppercase ml-0.5">
                              Page Slug (URL)
                            </label>
                            <input
                              type="text"
                              name="slug"
                              value={editingMember.slug || ""}
                              onChange={handleInputChange}
                              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 focus:border-brand-pink focus:bg-white/10 outline-none transition-all font-medium text-xs font-mono"
                              placeholder="john-doe"
                            />
                          </div>
                          <div className="space-y-1.5 md:space-y-2 md:col-span-2">
                            <label className="text-[8px] md:text-[9px] font-bold tracking-[0.15em] text-white/40 uppercase ml-0.5">
                              Bio
                            </label>
                            <textarea
                              name="description"
                              value={editingMember.description || ""}
                              onChange={handleInputChange}
                              rows={2}
                              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 focus:border-brand-pink focus:bg-white/10 outline-none transition-all font-medium text-xs resize-none"
                              placeholder="Professional bio..."
                            />
                          </div>
                          <div className="space-y-1.5 md:space-y-2">
                            <label className="text-[8px] md:text-[9px] font-bold tracking-[0.15em] text-white/40 uppercase ml-0.5">
                              Card Color
                            </label>
                            <div className="flex gap-2 items-center">
                              <input
                                type="color"
                                name="bgColor"
                                value={editingMember.bgColor || "#ff3358"}
                                onChange={handleInputChange}
                                className="w-12 h-12 bg-transparent border-none cursor-pointer rounded-lg overflow-hidden"
                              />
                              <input
                                type="text"
                                name="bgColor"
                                value={editingMember.bgColor || ""}
                                onChange={handleInputChange}
                                className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 focus:border-brand-pink outline-none transition-all font-mono text-xs"
                                placeholder="#HEXCODE"
                              />
                            </div>
                          </div>
                          <div className="space-y-1.5 md:space-y-2 md:col-span-2">
                            <div className="flex items-center justify-between bg-white/5 border border-white/10 rounded-lg p-3 md:p-4">
                              <div className="flex-1">
                                <h3 className="text-xs font-bold tracking-widest uppercase mb-0.5">
                                  Baked Text
                                </h3>
                                <p className="text-[8px] text-white/30 uppercase tracking-widest">
                                  Show background text
                                </p>
                              </div>
                              <button
                                type="button"
                                onClick={() =>
                                  setEditingMember((prev) => ({
                                    ...prev,
                                    hasBakedText: !prev.hasBakedText,
                                  }))
                                }
                                className={`w-12 h-6 rounded-full transition-all relative flex-shrink-0 ${editingMember.hasBakedText ? "bg-brand-pink" : "bg-white/10"}`}
                              >
                                <motion.div
                                  animate={{
                                    x: editingMember.hasBakedText ? 24 : 3,
                                  }}
                                  className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-lg"
                                />
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-end mt-6">
                          <button
                            type="button"
                            onClick={() => handleSaveSection('identity')}
                            disabled={sectionSaving === 'identity'}
                            className="px-5 py-3 bg-brand-pink text-white rounded-xl font-bold disabled:opacity-50 flex items-center gap-2"
                          >
                            {sectionSaving === 'identity' ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <Save className="w-4 h-4" />
                            )}
                            Save
                          </button>
                        </div>
                      </section>

                      <section className="bg-white/5 border border-white/10 rounded-2xl p-4 md:p-5 backdrop-blur-3xl shadow-xl lg:col-span-3">
                        <div className="flex items-center gap-2 mb-3 md:mb-4 border-b border-white/10 pb-3">
                          <ImageIcon className="text-brand-pink" size={18} />
                          <h2 className="text-xs md:text-sm font-black tracking-tight uppercase">
                            Media Assets
                          </h2>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
                          <div className="space-y-1.5 md:space-y-2">
                            <label className="text-[7px] md:text-[8px] font-bold tracking-[0.12em] text-white/40 uppercase ml-0.5">
                              Hero
                            </label>
                            <div className="relative h-32 md:h-48 rounded-lg bg-white/5 border border-white/10 overflow-hidden flex flex-col items-center justify-center p-1 group/img">
                              {uploading.image ? (
                                <Loader2
                                  className="animate-spin text-brand-pink"
                                  size={20}
                                />
                              ) : editingMember.image ? (
                                <>
                                  <img
                                    src={editingMember.image}
                                    className="w-full h-full object-contain"
                                    alt="Hero"
                                  />
                                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center gap-1">
                                    <button
                                      type="button"
                                      onClick={() => triggerUpload("image")}
                                      className="p-1 bg-brand-pink rounded-full hover:scale-105 transition-transform"
                                    >
                                      <Camera size={12} />
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() =>
                                        setEditingMember((prev) => ({
                                          ...prev,
                                          image: "",
                                        }))
                                      }
                                      className="p-1 bg-white/10 rounded-full hover:bg-red-500 transition-colors"
                                    >
                                      <X size={12} />
                                    </button>
                                  </div>
                                </>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => triggerUpload("image")}
                                  className="flex flex-col items-center gap-1 group/btn text-center"
                                >
                                  <div className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center group-hover/btn:bg-brand-pink/20 transition-colors">
                                    <Upload
                                      className="text-white/40 group-hover/btn:text-brand-pink"
                                      size={12}
                                    />
                                  </div>
                                  <span className="text-[6px] font-black tracking-widest text-white/20">
                                    ADD
                                  </span>
                                </button>
                              )}
                            </div>
                          </div>

                          <div className="space-y-1.5 md:space-y-2">
                            <label className="text-[7px] md:text-[8px] font-bold tracking-[0.12em] text-white/40 uppercase ml-0.5">
                              Card BG
                            </label>
                            <div className="relative aspect-[3/4] rounded-lg bg-white/5 border border-white/10 overflow-hidden group/card flex items-center justify-center">
                              {uploading.cardImage ? (
                                <Loader2
                                  className="animate-spin text-brand-pink"
                                  size={20}
                                />
                              ) : editingMember.cardImage ? (
                                <>
                                  <img
                                    src={editingMember.cardImage}
                                    className="w-full h-full object-cover"
                                    alt="Card"
                                  />
                                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/card:opacity-100 transition-opacity flex items-center justify-center gap-1">
                                    <button
                                      type="button"
                                      onClick={() =>
                                        triggerUpload("cardImage")
                                      }
                                      className="p-1 bg-brand-pink rounded-full"
                                    >
                                      <Upload size={10} />
                                    </button>
                                  </div>
                                </>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => triggerUpload("cardImage")}
                                  className="text-[6px] font-black tracking-widest text-white/20 uppercase text-center"
                                >
                                  Upload
                                </button>
                              )}
                            </div>
                          </div>

                          <div className="space-y-1.5 md:space-y-2">
                            <label className="text-[7px] md:text-[8px] font-bold tracking-[0.12em] text-white/40 uppercase ml-0.5">
                              Profile
                            </label>
                            <div className="relative aspect-[3/4] rounded-lg bg-white/5 border border-white/10 overflow-hidden group/full flex items-center justify-center">
                              {uploading.image1 ? (
                                <Loader2
                                  className="animate-spin text-brand-pink"
                                  size={20}
                                />
                              ) : editingMember.image1 ? (
                                <>
                                  <img
                                    src={editingMember.image1}
                                    className="w-full h-full object-cover"
                                    alt="Profile"
                                  />
                                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/full:opacity-100 transition-opacity flex items-center justify-center gap-1">
                                    <button
                                      type="button"
                                      onClick={() => triggerUpload("image1")}
                                      className="p-1 bg-brand-pink rounded-full"
                                    >
                                      <Upload size={10} />
                                    </button>
                                  </div>
                                </>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => triggerUpload("image1")}
                                  className="text-[6px] font-black tracking-widest text-white/20 uppercase text-center"
                                >
                                  Upload
                                </button>
                              )}
                            </div>
                          </div>

                          <div className="space-y-1.5 md:space-y-2">
                            <label className="text-[7px] md:text-[8px] font-bold tracking-[0.12em] text-white/40 uppercase ml-0.5">
                              Cover
                            </label>
                            <div className="relative h-32 md:h-48 rounded-lg bg-white/5 border border-white/10 overflow-hidden group/cover flex items-center justify-center">
                              {uploading.coverImage ? (
                                <Loader2
                                  className="animate-spin text-brand-pink"
                                  size={20}
                                />
                              ) : editingMember.coverImage ? (
                                <>
                                  <img
                                    src={editingMember.coverImage}
                                    className="w-full h-full object-cover"
                                    alt="Cover"
                                  />
                                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/cover:opacity-100 transition-opacity flex items-center justify-center gap-1">
                                    <button
                                      type="button"
                                      onClick={() => triggerUpload("coverImage")}
                                      className="p-1 bg-brand-pink rounded-full"
                                    >
                                      <Upload size={10} />
                                    </button>
                                  </div>
                                </>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => triggerUpload("coverImage")}
                                  className="text-[6px] font-black tracking-widest text-white/20 uppercase text-center"
                                >
                                  Upload
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </section>
                      
                      {/* ID Card / Certificate Section */}
                      <section className="space-y-1.5 md:space-y-2 max-w-xs">
                        <label className="text-[7px] md:text-[8px] font-bold tracking-[0.12em] text-white/40 uppercase ml-0.5">
                          ID Card / Certificate
                        </label>
                        <div className="relative aspect-square rounded-lg bg-white/5 border border-white/10 overflow-hidden group/idcard flex items-center justify-center">
                          {uploading.idCard ? (
                            <Loader2 className="animate-spin text-brand-pink" size={20} />
                          ) : editingMember.idCard ? (
                            <>
                              <img
                                src={editingMember.idCard}
                                className="w-full h-full object-cover"
                                alt="ID Card"
                              />
                              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/idcard:opacity-100 transition-opacity flex items-center justify-center gap-1">
                                <button
                                  type="button"
                                  onClick={() => triggerUpload("idCard")}
                                  className="p-1 bg-brand-pink rounded-full"
                                >
                                  <Upload size={10} />
                                </button>
                              </div>
                            </>
                          ) : (
                            <button
                              type="button"
                              onClick={() => triggerUpload("idCard")}
                              className="text-[6px] font-black tracking-widest text-white/20 uppercase text-center"
                            >
                              Upload
                            </button>
                          )}
                        </div>
                      </section>
                      
                      {/* Education Section */}
                      <section className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 backdrop-blur-3xl shadow-2xl">
                        <div className="flex items-center gap-3 mb-10 border-b border-white/10 pb-8 justify-between">
                          <div className="flex items-center gap-3">
                            <GraduationCap className="text-brand-pink" size={28} />
                            <h2 className="text-2xl font-black tracking-tight uppercase">Education</h2>
                          </div>
                          <button type="button" onClick={handleAddEducation} className="px-4 py-2 bg-brand-pink/10 hover:bg-brand-pink/20 border border-brand-pink/20 rounded-xl text-xs font-bold text-brand-pink transition-all flex items-center gap-2">
                            <Plus size={14} /> Add Entry
                          </button>
                        </div>
                        <div className="space-y-6">
                          {(!editingMember.education || editingMember.education.length === 0) ? (
                            <p className="text-xs text-white/30 italic text-center py-6">No education entries added yet. Click "+ Add Entry" to begin.</p>
                          ) : (
                            editingMember.education.map((edu, idx) => (
                              <div key={idx} className="relative bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
                                <button type="button" onClick={() => removeEducation(idx)} className="absolute top-4 right-4 p-1 hover:bg-red-500/20 rounded-lg transition-colors text-white/40 hover:text-red-400">
                                  <X size={14} />
                                </button>
                                <div className="grid grid-cols-2 gap-4">
                                  <div className="space-y-1">
                                    <label className="text-[9px] font-bold tracking-widest text-white/40 uppercase">Degree / Qualification</label>
                                    <input type="text" value={edu.degree || ''} onChange={(e) => handleEducationChange(idx, 'degree', e.target.value)} placeholder="e.g. B.Tech Computer Science" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-brand-pink outline-none transition-all" />
                                  </div>
                                  <div className="space-y-1">
                                    <label className="text-[9px] font-bold tracking-widest text-white/40 uppercase">Institution</label>
                                    <input type="text" value={edu.institution || ''} onChange={(e) => handleEducationChange(idx, 'institution', e.target.value)} placeholder="e.g. IIT Delhi" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-brand-pink outline-none transition-all" />
                                  </div>
                                  <div className="space-y-1">
                                    <label className="text-[9px] font-bold tracking-widest text-white/40 uppercase">Year (Graduation)</label>
                                    <input type="text" value={edu.year || ''} onChange={(e) => handleEducationChange(idx, 'year', e.target.value)} placeholder="e.g. 2020" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-brand-pink outline-none transition-all" />
                                  </div>
                                  <div className="space-y-1">
                                    <label className="text-[9px] font-bold tracking-widest text-white/40 uppercase">Grade / GPA</label>
                                    <input type="text" value={edu.grade || ''} onChange={(e) => handleEducationChange(idx, 'grade', e.target.value)} placeholder="e.g. 8.5 CGPA / First Class" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-brand-pink outline-none transition-all" />
                                  </div>
                                </div>
                              </div>
                            ))
                          )}
                        </div>
                        <div className="flex justify-end mt-6">
                          <button type="button" onClick={() => handleSaveSection('education')} disabled={sectionSaving === 'education'} className="px-5 py-3 bg-brand-pink text-white rounded-xl font-bold disabled:opacity-50 flex items-center gap-2">
                            {sectionSaving === 'education' ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                            Save
                          </button>
                        </div>
                      </section>

                      {/* Certifications Section */}
                      <section className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 backdrop-blur-3xl shadow-2xl">
                        <div className="flex items-center gap-3 mb-10 border-b border-white/10 pb-8 justify-between">
                          <div className="flex items-center gap-3">
                            <Award className="text-brand-pink" size={28} />
                            <h2 className="text-2xl font-black tracking-tight uppercase">Certifications</h2>
                          </div>
                          <button type="button" onClick={handleAddCertification} className="px-4 py-2 bg-brand-pink/10 hover:bg-brand-pink/20 border border-brand-pink/20 rounded-xl text-xs font-bold text-brand-pink transition-all flex items-center gap-2">
                            <Plus size={14} /> Add Certification
                          </button>
                        </div>
                        <div className="space-y-6">
                          {(!editingMember.certifications || editingMember.certifications.length === 0) ? (
                            <p className="text-xs text-white/30 italic text-center py-6">No certifications added yet. Click "+ Add Certification" to begin.</p>
                          ) : (
                            editingMember.certifications.map((cert, idx) => (
                              <div key={idx} className="relative bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
                                <button type="button" onClick={() => removeCertification(idx)} className="absolute top-4 right-4 p-1 hover:bg-red-500/20 rounded-lg transition-colors text-white/40 hover:text-red-400">
                                  <X size={14} />
                                </button>
                                <div className="grid grid-cols-2 gap-4">
                                  <div className="space-y-1">
                                    <label className="text-[9px] font-bold tracking-widest text-white/40 uppercase">Certification Name</label>
                                    <input type="text" value={cert.name || ''} onChange={(e) => handleCertificationChange(idx, 'name', e.target.value)} placeholder="e.g. AWS Solutions Architect" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-brand-pink outline-none transition-all" />
                                  </div>
                                  <div className="space-y-1">
                                    <label className="text-[9px] font-bold tracking-widest text-white/40 uppercase">Issued By</label>
                                    <input type="text" value={cert.issuedBy || ''} onChange={(e) => handleCertificationChange(idx, 'issuedBy', e.target.value)} placeholder="e.g. Amazon Web Services" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-brand-pink outline-none transition-all" />
                                  </div>
                                  <div className="space-y-1">
                                    <label className="text-[9px] font-bold tracking-widest text-white/40 uppercase">Year Issued</label>
                                    <input type="text" value={cert.year || ''} onChange={(e) => handleCertificationChange(idx, 'year', e.target.value)} placeholder="e.g. 2023" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-brand-pink outline-none transition-all" />
                                  </div>
                                  <div className="space-y-1">
                                    <label className="text-[9px] font-bold tracking-widest text-white/40 uppercase">Credential URL</label>
                                    <input type="text" value={cert.credentialUrl || ''} onChange={(e) => handleCertificationChange(idx, 'credentialUrl', e.target.value)} placeholder="https://credential.link..." className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-brand-pink outline-none transition-all" />
                                  </div>
                                </div>
                              </div>
                            ))
                          )}
                        </div>
                        <div className="flex justify-end mt-6">
                          <button type="button" onClick={() => handleSaveSection('certifications')} disabled={sectionSaving === 'certifications'} className="px-5 py-3 bg-brand-pink text-white rounded-xl font-bold disabled:opacity-50 flex items-center gap-2">
                            {sectionSaving === 'certifications' ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                            Save
                          </button>
                        </div>
                      </section>

                      {/* Career Timeline Section */}
                      <section className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 backdrop-blur-3xl shadow-2xl relative overflow-hidden group">
                        <div className="flex items-center gap-3 mb-10 border-b border-white/10 pb-8 justify-between">
                          <div className="flex items-center gap-3">
                            <Award className="text-brand-pink" size={28} />
                            <h2 className="text-2xl font-black tracking-tight uppercase">
                              Career Timeline (Achievements)
                            </h2>
                          </div>
                          <button
                            type="button"
                            onClick={handleEditAchievementFieldAdd}
                            className="px-4 py-2 bg-brand-pink/10 hover:bg-brand-pink/20 border border-brand-pink/20 rounded-xl text-xs font-bold text-brand-pink transition-all flex items-center gap-2 animate-pulse hover:animate-none"
                          >
                            + Add Milestone
                          </button>
                        </div>

                        <div className="space-y-6">
                          {(!editingMember.achievements || editingMember.achievements.length === 0) ? (
                            <p className="text-sm text-white/30 text-center py-6 font-medium italic">
                              No milestones added yet. Click "+ Add Milestone" to construct the career timeline.
                            </p>
                          ) : (
                            <div className="grid grid-cols-1 gap-6">
                              {(editingMember.achievements || []).map((ach, idx) => (
                                <div key={idx} className="bg-white/5 border border-white/10 rounded-2xl p-6 relative group/item">
                                  <button
                                    type="button"
                                    onClick={() => handleEditAchievementFieldRemove(idx)}
                                    className="absolute top-4 right-4 text-white/30 hover:text-[#ff3358] transition-colors p-1"
                                  >
                                    <X size={16} />
                                  </button>

                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                      <label className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase ml-1">
                                        Milestone Title *
                                      </label>
                                      <input
                                        type="text"
                                        required
                                        value={ach.title}
                                        onChange={(e) => handleEditAchievementFieldChange(idx, "title", e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-brand-pink transition-all text-white font-bold"
                                        placeholder="e.g. Lead Developer, Raised Seed Round"
                                      />
                                    </div>

                                    <div className="space-y-2">
                                      <label className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase ml-1">
                                        Milestone Date/Year (Custom)
                                      </label>
                                      <input
                                        type="text"
                                        value={ach.date || ""}
                                        onChange={(e) => handleEditAchievementFieldChange(idx, "date", e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-brand-pink transition-all text-white"
                                        placeholder="e.g. JAN 2019, 2024"
                                      />
                                    </div>

                                    <div className="space-y-2">
                                      <label className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase ml-1">
                                        Badge Category
                                      </label>
                                      <select
                                        value={ach.image || "MILESTONE"}
                                        onChange={(e) => handleEditAchievementFieldChange(idx, "image", e.target.value)}
                                        className="w-full bg-[#16161a] border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-brand-pink transition-all text-white font-bold appearance-none"
                                      >
                                        <option value="MILESTONE">Milestone</option>
                                        <option value="INNOVATION">Innovation</option>
                                        <option value="CLIENT WIN">Client Win</option>
                                        <option value="PARTNERSHIP">Partnership</option>
                                        <option value="ACHIEVEMENT">Achievement</option>
                                        <option value="LAUNCH">Launch</option>
                                      </select>
                                    </div>

                                    <div className="space-y-2 md:col-span-2">
                                      <label className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase ml-1">
                                        Description
                                      </label>
                                      <textarea
                                        value={ach.description || ""}
                                        onChange={(e) => handleEditAchievementFieldChange(idx, "description", e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-brand-pink transition-all text-white h-20 resize-none"
                                        placeholder="Provide short details about this milestone..."
                                      />
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                        <div className="flex justify-end mt-6">
                          <button
                            type="button"
                            onClick={() => handleSaveSection('timeline')}
                            disabled={sectionSaving === 'timeline'}
                            className="px-5 py-3 bg-brand-pink text-white rounded-xl font-bold disabled:opacity-50 flex items-center gap-2"
                          >
                            {sectionSaving === 'timeline' ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <Save className="w-4 h-4" />
                            )}
                            Save
                          </button>
                        </div>
                      </section>

                      {/* Voices Podcasts Section */}
                      <section className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 backdrop-blur-3xl shadow-2xl relative overflow-hidden group">
                        <div className="flex items-center gap-3 mb-10 border-b border-white/10 pb-8 justify-between">
                          <div className="flex items-center gap-3">
                            <Mic className="text-brand-pink" size={28} />
                            <h2 className="text-2xl font-black tracking-tight uppercase">
                              Bureau - Voices Podcasts
                            </h2>
                          </div>
                          <button
                            type="button"
                            onClick={handleEditPodcastFieldAdd}
                            className="px-4 py-2 bg-brand-pink/10 hover:bg-brand-pink/20 border border-brand-pink/20 rounded-xl text-xs font-bold text-brand-pink transition-all flex items-center gap-2 animate-pulse hover:animate-none"
                          >
                            + Add Episode
                          </button>
                        </div>

                        <div className="space-y-6">
                          {(!editingMember.podcasts || editingMember.podcasts.length === 0) ? (
                            <p className="text-sm text-white/30 text-center py-6 font-medium italic">
                              No episodes added yet. Click "+ Add Episode" to add podcasts.
                            </p>
                          ) : (
                            <div className="grid grid-cols-1 gap-6">
                              {(editingMember.podcasts || []).map((podcast, idx) => (
                                <div key={idx} className="bg-white/5 border border-white/10 rounded-2xl p-6 relative group/item">
                                  <button
                                    type="button"
                                    onClick={() => handleEditPodcastFieldRemove(idx)}
                                    className="absolute top-4 right-4 text-white/30 hover:text-[#ff3358] transition-colors p-1"
                                  >
                                    <X size={16} />
                                  </button>

                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                      <label className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase ml-1">
                                        Episode No
                                      </label>
                                      <input
                                        type="number"
                                        required
                                        value={podcast.episodeNo || (idx + 1)}
                                        onChange={(e) => handleEditPodcastFieldChange(idx, "episodeNo", parseInt(e.target.value) || (idx + 1))}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-brand-pink transition-all text-white font-bold"
                                        placeholder="e.g. 1"
                                      />
                                    </div>

                                    <div className="space-y-2">
                                      <label className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase ml-1">
                                        Episode Title *
                                      </label>
                                      <input
                                        type="text"
                                        required
                                        value={podcast.title}
                                        onChange={(e) => handleEditPodcastFieldChange(idx, "title", e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-brand-pink transition-all text-white font-bold"
                                        placeholder="e.g. Building Social Bureau V2"
                                      />
                                    </div>

                                    <div className="space-y-2">
                                      <label className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase ml-1">
                                        Duration
                                      </label>
                                      <input
                                        type="text"
                                        value={podcast.duration || ""}
                                        onChange={(e) => handleEditPodcastFieldChange(idx, "duration", e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-brand-pink transition-all text-white"
                                        placeholder="e.g. 45:20"
                                      />
                                    </div>

                                    <div className="space-y-2">
                                      <label className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase ml-1">
                                        Host Name
                                      </label>
                                      <input
                                        type="text"
                                        value={podcast.host || ""}
                                        onChange={(e) => handleEditPodcastFieldChange(idx, "host", e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-brand-pink transition-all text-white"
                                        placeholder="e.g. Sham SK"
                                      />
                                    </div>

                                    <div className="space-y-2 md:col-span-2">
                                      <label className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase ml-1">
                                        Audio/Video URL
                                      </label>
                                      <input
                                        type="text"
                                        value={podcast.url || ""}
                                        onChange={(e) => handleEditPodcastFieldChange(idx, "url", e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-brand-pink transition-all text-white"
                                        placeholder="e.g. https://youtube.com/... or soundcloud.com/..."
                                      />
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                        <div className="flex justify-end mt-6">
                          <button
                            type="button"
                            onClick={() => handleSaveSection('podcasts')}
                            disabled={sectionSaving === 'podcasts'}
                            className="px-5 py-3 bg-brand-pink text-white rounded-xl font-bold disabled:opacity-50 flex items-center gap-2"
                          >
                            {sectionSaving === 'podcasts' ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <Save className="w-4 h-4" />
                            )}
                            Save
                          </button>
                        </div>
                      </section>


                      {/* Core Expertise (Tools & Sliders) */}
                      <section className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 backdrop-blur-3xl shadow-2xl relative overflow-hidden group">
                        <div className="flex items-center gap-3 mb-10 border-b border-white/10 pb-8 justify-between">
                          <div className="flex items-center gap-3">
                            <Cpu className="text-brand-pink" size={28} />
                            <h2 className="text-2xl font-black tracking-tight uppercase">
                              Core Expertise
                            </h2>
                          </div>
                          <button
                            type="button"
                            onClick={handleEditToolFieldAdd}
                            className="px-4 py-2 bg-brand-pink/10 hover:bg-brand-pink/20 border border-brand-pink/20 rounded-xl text-xs font-bold text-brand-pink transition-all flex items-center gap-2 animate-pulse hover:animate-none"
                          >
                            + Add Tool
                          </button>
                        </div>

                        <div className="space-y-6">
                          {(!editingMember.tools || editingMember.tools.length === 0) ? (
                            <p className="text-sm text-white/30 text-center py-6 font-medium italic">
                              No tools added yet. Click "+ Add Tool" to define professional expertise.
                            </p>
                          ) : (
                            <div className="grid grid-cols-1 gap-6">
                              {(editingMember.tools || []).map((tool, idx) => (
                                <div key={idx} className="bg-white/5 border border-white/10 rounded-2xl p-6 relative group/item">
                                  <button
                                    type="button"
                                    onClick={() => handleEditToolFieldRemove(idx)}
                                    className="absolute top-4 right-4 text-white/30 hover:text-[#ff3358] transition-colors p-1"
                                  >
                                    <X size={16} />
                                  </button>

                                  <div className="grid grid-cols-1 gap-6">
                                    <div className="space-y-2">
                                      <label className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase ml-1">
                                        Tool Name *
                                      </label>
                                      <input
                                        type="text"
                                        required
                                        value={tool.toolName}
                                        onChange={(e) => handleEditToolFieldChange(idx, "toolName", e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-brand-pink transition-all text-white font-bold"
                                        placeholder="e.g. Photoshop, VS Code, Figma"
                                      />
                                    </div>

                                    <div className="space-y-2">
                                      <label className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase ml-1">
                                        Proficiency Level ({tool.level !== undefined ? tool.level : 85}%)
                                      </label>
                                      <input
                                        type="range"
                                        min="0"
                                        max="100"
                                        value={tool.level !== undefined ? tool.level : 85}
                                        onChange={(e) => handleEditToolFieldChange(idx, "level", parseInt(e.target.value))}
                                        className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-brand-pink animate-pulse hover:animate-none"
                                      />
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        <div className="flex justify-end mt-6">
                          <button
                            type="button"
                            onClick={() => handleSaveSection('tools')}
                            disabled={sectionSaving === 'tools'}
                            className="px-5 py-3 bg-brand-pink text-white rounded-xl font-bold disabled:opacity-50 flex items-center gap-2"
                          >
                            {sectionSaving === 'tools' ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <Save className="w-4 h-4" />
                            )}
                            Save
                          </button>
                        </div>
                      </section>

                    </div>

                    {/* Right Column */}
                    <div className="lg:col-span-3 space-y-6 md:space-y-8">
                      <section className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 backdrop-blur-3xl shadow-2xl">
                        <div className="flex items-center justify-between mb-8">
                          <div>
                            <h3 className="text-sm font-bold tracking-widest uppercase mb-1">
                              Public Visibility
                            </h3>
                            <p className="text-[10px] text-white/30 uppercase tracking-widest">
                              Show this member on the team page
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() =>
                              setEditingMember((prev) => ({
                                ...prev,
                                isPublic: !prev.isPublic,
                              }))
                            }
                            className={`w-14 h-8 rounded-full transition-all relative ${editingMember.isPublic ? "bg-green-500" : "bg-white/10"}`}
                          >
                            <motion.div
                              animate={{ x: editingMember.isPublic ? 28 : 4 }}
                              className="absolute top-1 w-6 h-6 bg-white rounded-full shadow-lg"
                            />
                          </button>
                        </div>
                      </section>

                      <section className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 backdrop-blur-3xl shadow-2xl">
                        <div className="flex items-center gap-3 mb-10 border-b border-white/10 pb-8">
                          <LinkIcon className="text-brand-pink" size={28} />
                          <h2 className="text-2xl font-black tracking-tight uppercase">
                            NETWORKS
                          </h2>
                        </div>

                        <div className="space-y-6">
                          <div className="space-y-2">
                            <label className="flex items-center gap-2 text-[10px] font-bold tracking-widest text-white/40 uppercase">
                              <Linkedin size={14} className="text-brand-pink" />{" "}
                              LinkedIn
                            </label>
                            <input
                              type="text"
                              name="linkedin"
                              value={editingMember.socials.linkedin}
                              onChange={handleSocialChange}
                              className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:border-brand-pink outline-none transition-all font-medium text-sm"
                              placeholder="linkedin.com/in/..."
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="flex items-center gap-2 text-[10px] font-bold tracking-widest text-white/40 uppercase">
                              <Instagram
                                size={14}
                                className="text-brand-pink"
                              />{" "}
                              Instagram
                            </label>
                            <input
                              type="text"
                              name="instagram"
                              value={editingMember.socials.instagram}
                              onChange={handleSocialChange}
                              className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:border-brand-pink outline-none transition-all font-medium text-sm"
                              placeholder="@username"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="flex items-center gap-2 text-[10px] font-bold tracking-widest text-white/40 uppercase">
                              <Twitter size={14} className="text-brand-pink" />{" "}
                              Twitter
                            </label>
                            <input
                              type="text"
                              name="twitter"
                              value={editingMember.socials.twitter}
                              onChange={handleSocialChange}
                              className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:border-brand-pink outline-none transition-all font-medium text-sm"
                              placeholder="@handle"
                            />
                          </div>
                        </div>
                      </section>

                      {/* EDIT FORM Booking Consultation Cost */}
                      <section className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 backdrop-blur-3xl shadow-2xl">
                        <div className="flex items-center gap-3 mb-10 border-b border-white/10 pb-8">
                          <Calendar className="text-brand-pink" size={28} />
                          <h2 className="text-2xl font-black tracking-tight uppercase">
                            BOOK CONSULTATION COST (₹)
                          </h2>
                        </div>

                        <div className="space-y-6">
                          <div className="space-y-2">
                            <label className="flex items-center gap-2 text-[10px] font-bold tracking-widest text-white/40 uppercase">
                              30 Min Strategy Session Cost
                            </label>
                            <input
                              type="text"
                              name="price30Min"
                              value={editingMember.consultations?.price30Min || ""}
                              onChange={handleConsultationChange}
                              className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:border-brand-pink outline-none transition-all font-medium text-sm"
                              placeholder="e.g., ₹500"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="flex items-center gap-2 text-[10px] font-bold tracking-widest text-white/40 uppercase">
                              60 Min Strategy Session Cost
                            </label>
                            <input
                              type="text"
                              name="price60Min"
                              value={editingMember.consultations?.price60Min || ""}
                              onChange={handleConsultationChange}
                              className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:border-[#ff3358] outline-none transition-all font-medium text-sm"
                              placeholder="e.g., ₹1000"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="flex items-center gap-2 text-[10px] font-bold tracking-widest text-white/40 uppercase">
                              Full Day Strategy Session Cost
                            </label>
                            <input
                              type="text"
                              name="priceFullDay"
                              value={editingMember.consultations?.priceFullDay || ""}
                              onChange={handleConsultationChange}
                              className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:border-brand-pink outline-none transition-all font-medium text-sm"
                              placeholder="e.g., ₹5000"
                            />
                          </div>
                        </div>
                      </section>

                      {/* Hobbies & Interests Section */}
                      <section className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 backdrop-blur-3xl shadow-2xl relative overflow-hidden group">
                        <div className="flex items-center gap-3 mb-10 border-b border-white/10 pb-8">
                          <Heart className="text-brand-pink" size={28} />
                          <h2 className="text-2xl font-black tracking-tight uppercase">
                            Hobbies & Interests
                          </h2>
                        </div>

                        <div className="space-y-6">
                          <div className="space-y-2">
                            <label className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase ml-1">
                              Add Hobby (Press Enter)
                            </label>
                            <input
                              type="text"
                              value={hobbyInput}
                              onChange={(e) => setHobbyInput(e.target.value)}
                              onKeyDown={handleHobbyAdd}
                              placeholder="e.g. GAMING, HIKING, TRAVELING"
                              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 focus:border-brand-pink outline-none transition-all font-medium"
                            />
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {(!editingMember.hobbies || editingMember.hobbies.length === 0) ? (
                              <p className="text-xs text-white/30 italic">No hobbies added yet.</p>
                            ) : (
                              editingMember.hobbies.map((hobby) => (
                                <motion.span
                                  layout
                                  key={hobby}
                                  className="flex items-center gap-2 px-4 py-2 bg-brand-pink/10 border border-brand-pink/20 rounded-xl text-[10px] font-black text-brand-pink uppercase tracking-widest"
                                >
                                  {hobby}
                                  <button
                                    type="button"
                                    onClick={() => removeHobby(hobby)}
                                    className="hover:text-white transition-colors opacity-60 hover:opacity-100"
                                  >
                                    <X size={12} />
                                  </button>
                                </motion.span>
                              ))
                            )}
                          </div>
                        </div>

                        <div className="flex justify-end mt-6">
                          <button
                            type="button"
                            onClick={() => handleSaveSection('hobbies')}
                            disabled={sectionSaving === 'hobbies'}
                            className="px-5 py-3 bg-brand-pink text-white rounded-xl font-bold disabled:opacity-50 flex items-center gap-2"
                          >
                            {sectionSaving === 'hobbies' ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <Save className="w-4 h-4" />
                            )}
                            Save
                          </button>
                        </div>
                      </section>



                      <section className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 backdrop-blur-3xl shadow-2xl">
                        <div className="flex items-center gap-3 mb-10 border-b border-white/10 pb-8">
                          <Tag className="text-brand-pink" size={28} />
                          <h2 className="text-2xl font-black tracking-tight uppercase">
                            EXPERTISE
                          </h2>
                        </div>

                        <div className="space-y-6">
                          <input
                            type="text"
                            value={tagInput}
                            onChange={(e) => setTagInput(e.target.value)}
                            onKeyDown={handleTagAdd}
                            placeholder="Add skill (Enter)..."
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 focus:border-brand-pink outline-none transition-all font-medium"
                          />
                          <div className="flex flex-wrap gap-2">
                            {editingMember.tags.map((tag) => (
                              <motion.span
                                layout
                                key={tag}
                                className="flex items-center gap-2 px-4 py-2 bg-brand-pink/10 border border-brand-pink/20 rounded-xl text-[10px] font-black text-brand-pink uppercase tracking-widest"
                              >
                                {tag}
                                <button
                                  type="button"
                                  onClick={() => removeTag(tag)}
                                  className="hover:text-white transition-colors opacity-60 hover:opacity-100"
                                >
                                  <X size={12} />
                                </button>
                              </motion.span>
                            ))}
                          </div>
                        </div>
                      </section>

                      <section className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 backdrop-blur-3xl shadow-2xl">
                        <div className="flex items-center gap-3 mb-10 border-b border-white/10 pb-8">
                          <Hash className="text-brand-pink" size={28} />
                          <h2 className="text-2xl font-black tracking-tight uppercase">
                            DEPARTMENT
                          </h2>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          {categories.map((cat) => (
                            <button
                              key={cat}
                              type="button"
                              onClick={() => toggleCategory(cat)}
                              className={`px-4 py-4 rounded-2xl text-[10px] font-black tracking-widest transition-all border ${
                                editingMember.category.includes(cat)
                                  ? "bg-brand-pink border-brand-pink text-white shadow-[0_10px_20px_rgba(255,51,88,0.3)]"
                                  : "bg-white/5 border-white/10 text-white/40 hover:border-white/30 hover:bg-white/10"
                              }`}
                            >
                              {cat}
                            </button>
                          ))}
                        </div>
                      </section>

                      {/* Clients Handled Section */}
                      <section className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 backdrop-blur-3xl shadow-2xl relative overflow-hidden group">
                        <div className="flex items-center gap-3 mb-10 border-b border-white/10 pb-8 justify-between">
                          <div className="flex items-center gap-3">
                            <Briefcase className="text-brand-pink" size={28} />
                            <h2 className="text-2xl font-black tracking-tight uppercase">
                              Clients Handled
                            </h2>
                          </div>
                          <button
                            type="button"
                            onClick={handleEditClientFieldAdd}
                            className="px-4 py-2 bg-brand-pink/10 hover:bg-brand-pink/20 border border-brand-pink/20 rounded-xl text-xs font-bold text-brand-pink transition-all flex items-center gap-2 animate-pulse hover:animate-none"
                          >
                            <Plus size={14} /> + Add Client
                          </button>
                        </div>

                        <div className="space-y-6">
                          {(!editingMember.clients || editingMember.clients.length === 0) ? (
                            <p className="text-sm text-white/30 text-center py-6 font-medium italic">
                              No clients added yet. Click "+ Add Client" to link client portfolios.
                            </p>
                          ) : (
                            <div className="grid grid-cols-1 gap-4">
                              {(editingMember.clients || []).map((client, idx) => (
                                <div key={idx} className="bg-white/5 border border-white/10 rounded-2xl p-4 relative group/item">
                                  <button
                                    type="button"
                                    onClick={() => handleEditClientFieldRemove(idx)}
                                    className="absolute top-4 right-4 text-white/30 hover:text-[#ff3358] transition-colors p-1"
                                  >
                                    <X size={16} />
                                  </button>

                                  <div className="space-y-2">
                                    <label className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase ml-1">
                                      Client Name *
                                    </label>
                                    <input
                                      type="text"
                                      required
                                      value={client.name}
                                      onChange={(e) => handleEditClientFieldChange(idx, "name", e.target.value)}
                                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-brand-pink transition-all text-white font-bold"
                                      placeholder="e.g. Nike, Google, Ajnora"
                                    />
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        <div className="flex justify-end mt-6">
                          <button
                            type="button"
                            onClick={() => handleSaveSection('clients')}
                            disabled={sectionSaving === 'clients'}
                            className="px-5 py-3 bg-brand-pink text-white rounded-xl font-bold disabled:opacity-50 flex items-center gap-2"
                          >
                            {sectionSaving === 'clients' ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <Save className="w-4 h-4" />
                            )}
                            Save
                          </button>
                        </div>
                      </section>

                      {/* Event Portal Section */}
                      <section className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 backdrop-blur-3xl shadow-2xl relative overflow-hidden group">
                        <div className="flex items-center gap-3 mb-10 border-b border-white/10 pb-8 justify-between">
                          <div className="flex items-center gap-3">
                            <Calendar className="text-brand-pink" size={28} />
                            <h2 className="text-2xl font-black tracking-tight uppercase">
                              Event Portal
                            </h2>
                          </div>
                          <button
                            type="button"
                            onClick={handleEditEventFieldAdd}
                            className="px-4 py-2 bg-brand-pink/10 hover:bg-brand-pink/20 border border-brand-pink/20 rounded-xl text-xs font-bold text-brand-pink transition-all flex items-center gap-2 animate-pulse hover:animate-none"
                          >
                            + Add Event
                          </button>
                        </div>

                        <div className="space-y-6">
                          {(!editingMember.events || editingMember.events.length === 0) ? (
                            <p className="text-sm text-white/30 text-center py-6 font-medium italic">
                              No events added yet. Click "+ Add Event" to publish schedule.
                            </p>
                          ) : (
                            <div className="grid grid-cols-1 gap-6">
                              {(editingMember.events || []).map((evt, idx) => (
                                <div key={idx} className="bg-white/5 border border-white/10 rounded-2xl p-6 relative group/item">
                                  <button
                                    type="button"
                                    onClick={() => handleEditEventFieldRemove(idx)}
                                    className="absolute top-4 right-4 text-white/30 hover:text-[#ff3358] transition-colors p-1"
                                  >
                                    <X size={16} />
                                  </button>

                                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="space-y-2">
                                      <label className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase ml-1">
                                        Day/Date *
                                      </label>
                                      <input
                                        type="text"
                                        required
                                        value={evt.date}
                                        onChange={(e) => handleEditEventFieldChange(idx, "date", e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-brand-pink transition-all text-white font-bold"
                                        placeholder="e.g. 24"
                                      />
                                    </div>

                                    <div className="space-y-2">
                                      <label className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase ml-1">
                                        Month Abbreviation *
                                      </label>
                                      <input
                                        type="text"
                                        required
                                        value={evt.month}
                                        onChange={(e) => handleEditEventFieldChange(idx, "month", e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-brand-pink transition-all text-white font-bold"
                                        placeholder="e.g. OCT"
                                      />
                                    </div>

                                    <div className="space-y-2">
                                      <label className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase ml-1">
                                        Color Category
                                      </label>
                                      <select
                                        value={evt.category || "purple"}
                                        onChange={(e) => handleEditEventFieldChange(idx, "category", e.target.value)}
                                        className="w-full bg-[#16161a] border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-brand-pink transition-all text-white font-bold appearance-none"
                                      >
                                        <option value="purple">Purple</option>
                                        <option value="yellow">Yellow</option>
                                        <option value="red">Red</option>
                                        <option value="green">Green</option>
                                      </select>
                                    </div>

                                    <div className="space-y-2 md:col-span-3">
                                      <label className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase ml-1">
                                        Event Title *
                                      </label>
                                      <input
                                        type="text"
                                        required
                                        value={evt.title}
                                        onChange={(e) => handleEditEventFieldChange(idx, "title", e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-brand-pink transition-all text-white font-bold"
                                        placeholder="e.g. Hackathon Kickoff"
                                      />
                                    </div>

                                    <div className="space-y-2 md:col-span-3">
                                      <label className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase ml-1">
                                        Details
                                      </label>
                                      <textarea
                                        value={evt.details || ""}
                                        onChange={(e) => handleEditEventFieldChange(idx, "details", e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-brand-pink transition-all text-white h-20 resize-none"
                                        placeholder="Provide short details about this event..."
                                      />
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                        <div className="flex justify-end mt-6">
                          <button
                            type="button"
                            onClick={() => handleSaveSection('events')}
                            disabled={sectionSaving === 'events'}
                            className="px-5 py-3 bg-brand-pink text-white rounded-xl font-bold disabled:opacity-50 flex items-center gap-2"
                          >
                            {sectionSaving === 'events' ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <Save className="w-4 h-4" />
                            )}
                            Save
                          </button>
                        </div>
                      </section>

                      {/* Innovation Feed Section */}
                      <section className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 backdrop-blur-3xl shadow-2xl relative overflow-hidden group">
                        <div className="flex items-center gap-3 mb-10 border-b border-white/10 pb-8 justify-between">
                          <div className="flex items-center gap-3">
                            <Sparkles className="text-brand-pink" size={28} />
                            <h2 className="text-2xl font-black tracking-tight uppercase">
                              Innovation Feed
                            </h2>
                          </div>
                          <button
                            type="button"
                            onClick={handleEditInnovationFieldAdd}
                            className="px-4 py-2 bg-brand-pink/10 hover:bg-brand-pink/20 border border-brand-pink/20 rounded-xl text-xs font-bold text-brand-pink transition-all flex items-center gap-2 animate-pulse hover:animate-none"
                          >
                            + Add Entry
                          </button>
                        </div>

                        <div className="space-y-6">
                          {(!editingMember.innovations || editingMember.innovations.length === 0) ? (
                            <p className="text-sm text-white/30 text-center py-6 font-medium italic">
                              No innovation feed entries added yet. Click "+ Add Entry" to add innovations.
                            </p>
                          ) : (
                            <div className="grid grid-cols-1 gap-6">
                              {(editingMember.innovations || []).map((inn, idx) => (
                                <div key={idx} className="bg-white/5 border border-white/10 rounded-2xl p-6 relative group/item">
                                  <button
                                    type="button"
                                    onClick={() => handleEditInnovationFieldRemove(idx)}
                                    className="absolute top-4 right-4 text-white/30 hover:text-[#ff3358] transition-colors p-1"
                                  >
                                    <X size={16} />
                                  </button>

                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                      <label className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase ml-1">
                                        Type
                                      </label>
                                      <select
                                        value={inn.type || "INNOVATION"}
                                        onChange={(e) => handleEditInnovationFieldChange(idx, "type", e.target.value)}
                                        className="w-full bg-[#16161a] border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-brand-pink transition-all text-white font-bold appearance-none"
                                      >
                                        <option value="INNOVATION">Innovation</option>
                                        <option value="CASE STUDY">Case Study</option>
                                        <option value="INSIGHT">Insight</option>
                                      </select>
                                    </div>

                                    <div className="space-y-2">
                                      <label className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase ml-1">
                                        Date
                                      </label>
                                      <input
                                        type="text"
                                        value={inn.date || ""}
                                        onChange={(e) => handleEditInnovationFieldChange(idx, "date", e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-brand-pink transition-all text-white font-bold"
                                        placeholder="e.g. May 2026"
                                      />
                                    </div>

                                    <div className="space-y-2 md:col-span-2">
                                      <label className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase ml-1">
                                        Title *
                                      </label>
                                      <input
                                        type="text"
                                        required
                                        value={inn.title || ""}
                                        onChange={(e) => handleEditInnovationFieldChange(idx, "title", e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-brand-pink transition-all text-white font-bold"
                                        placeholder="e.g. Next-Gen AI Agent Framework"
                                      />
                                    </div>

                                    <div className="space-y-2 md:col-span-2">
                                      <label className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase ml-1">
                                        Content / Description *
                                      </label>
                                      <textarea
                                        required
                                        value={inn.content || ""}
                                        onChange={(e) => handleEditInnovationFieldChange(idx, "content", e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-brand-pink transition-all text-white h-24 resize-none"
                                        placeholder="Provide description of this innovation entry..."
                                      />
                                    </div>

                                    <div className="space-y-2 md:col-span-2">
                                      <label className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase ml-1">
                                        Attachment Link / URL
                                      </label>
                                      <input
                                        type="text"
                                        value={inn.url || ""}
                                        onChange={(e) => handleEditInnovationFieldChange(idx, "url", e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-brand-pink transition-all text-white"
                                        placeholder="e.g. https://github.com/... or https://medium.com/..."
                                      />
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                        <div className="flex justify-end mt-6">
                          <button
                            type="button"
                            onClick={() => handleSaveSection('innovations')}
                            disabled={sectionSaving === 'innovations'}
                            className="px-5 py-3 bg-brand-pink text-white rounded-xl font-bold disabled:opacity-50 flex items-center gap-2"
                          >
                            {sectionSaving === 'innovations' ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <Save className="w-4 h-4" />
                            )}
                            Save
                          </button>
                        </div>
                      </section>

                      {/* Work Showcase Section */}
                      <section className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 backdrop-blur-3xl shadow-2xl mt-8">
                        <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-6">
                          <div className="flex items-center gap-3">
                            <Layout className="text-[#ff3358] w-6 h-6" />
                            <h3 className="text-lg font-black tracking-tight uppercase">WORK SHOWCASE</h3>
                          </div>
                          <button
                            type="button"
                            onClick={handleEditWorkShowcaseFieldAdd}
                            className="px-4 py-2 bg-brand-pink/10 hover:bg-brand-pink/20 border border-brand-pink/20 rounded-xl text-xs font-bold text-brand-pink transition-all flex items-center gap-2 animate-pulse hover:animate-none"
                          >
                            + Add Showcase
                          </button>
                        </div>

                        <div className="space-y-6">
                          {(!editingMember.workShowcase || editingMember.workShowcase.length === 0) ? (
                            <p className="text-sm text-white/30 text-center py-6 font-medium italic">
                              No work showcase entries added yet. Click "+ Add Showcase" to add items.
                            </p>
                          ) : (
                            <div className="grid grid-cols-1 gap-6">
                              {(editingMember.workShowcase || []).map((work, idx) => (
                                <div key={idx} className="bg-white/5 border border-white/10 rounded-2xl p-6 relative group/item">
                                  <button
                                    type="button"
                                    onClick={() => handleEditWorkShowcaseFieldRemove(idx)}
                                    className="absolute top-4 right-4 text-white/30 hover:text-[#ff3358] transition-colors p-1"
                                  >
                                    <X size={16} />
                                  </button>

                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                      <label className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase ml-1">
                                        Category (e.g. CONTENT CAMPAIGN)
                                      </label>
                                      <input
                                        type="text"
                                        required
                                        value={work.category || ""}
                                        onChange={(e) => handleEditWorkShowcaseFieldChange(idx, "category", e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-brand-pink transition-all text-white font-bold"
                                        placeholder="e.g. CONTENT CAMPAIGN"
                                      />
                                    </div>

                                    <div className="space-y-2">
                                      <label className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase ml-1">
                                        Title *
                                      </label>
                                      <input
                                        type="text"
                                        required
                                        value={work.title || ""}
                                        onChange={(e) => handleEditWorkShowcaseFieldChange(idx, "title", e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-brand-pink transition-all text-white font-bold"
                                        placeholder="e.g. E-Commerce Brand Growth"
                                      />
                                    </div>

                                    <div className="space-y-2 md:col-span-2">
                                      <label className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase ml-1">
                                        Website Link (Optional - for Developers)
                                      </label>
                                      <input
                                        type="text"
                                        value={work.link || ""}
                                        onChange={(e) => handleEditWorkShowcaseFieldChange(idx, "link", e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-brand-pink transition-all text-white"
                                        placeholder="e.g. https://myproject.com"
                                      />
                                    </div>

                                    <div className="space-y-2 md:col-span-2">
                                      <label className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase ml-1">
                                        Content / Description *
                                      </label>
                                      <textarea
                                        required
                                        value={work.description || ""}
                                        onChange={(e) => handleEditWorkShowcaseFieldChange(idx, "description", e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-brand-pink transition-all text-white h-24 resize-none"
                                        placeholder="Provide description of this showcase entry..."
                                      />
                                    </div>

                                    {/* Upload Showcase Images */}
                                    <div className="space-y-2 md:col-span-2">
                                      <label className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase ml-1 block">
                                        Showcase Images (Max 3, Square placeholders)
                                      </label>
                                      <div className="grid grid-cols-3 gap-4">
                                        {(work.images || []).map((imgUrl, imgIdx) => (
                                          <div key={imgIdx} className="relative aspect-square bg-white/5 border border-white/10 rounded-2xl overflow-hidden group">
                                            <img src={imgUrl} className="w-full h-full object-cover" alt="" />
                                            <button
                                              type="button"
                                              onClick={() => {
                                                const newImages = work.images.filter((_, i) => i !== imgIdx);
                                                handleEditWorkShowcaseFieldChange(idx, "images", newImages);
                                              }}
                                              className="absolute top-2 right-2 p-1.5 bg-red-500 hover:bg-red-600 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                              <X size={12} />
                                            </button>
                                          </div>
                                        ))}
                                        {(!work.images || work.images.length < 3) && (
                                          <div className="aspect-square bg-white/5 border border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center relative hover:bg-white/[0.08] transition-all">
                                            <label className="flex flex-col items-center gap-2 text-white/30 hover:text-white/60 transition-colors cursor-pointer w-full h-full justify-center">
                                              <Upload size={20} />
                                              <span className="text-[8px] font-black tracking-widest uppercase text-center">Upload Square</span>
                                              <input
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={(e) => handleWorkShowcaseImageUpload(e, idx, true)}
                                              />
                                            </label>
                                          </div>
                                        )}
                                      </div>
                                    </div>

                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                        <div className="flex justify-end mt-6">
                          <button
                            type="button"
                            onClick={() => handleSaveSection('workShowcase')}
                            disabled={sectionSaving === 'workShowcase'}
                            className="px-5 py-3 bg-brand-pink text-white rounded-xl font-bold disabled:opacity-50 flex items-center gap-2"
                          >
                            {sectionSaving === 'workShowcase' ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <Save className="w-4 h-4" />
                            )}
                            Save
                          </button>
                        </div>
                      </section>

                      {/* Action Buttons */}
                      <div className="flex flex-col gap-2.5 lg:col-span-3">
                        <button
                          type="button"
                          onClick={() => {
                            handleDeleteMember(editingMember._id, editingMember.name);
                            setEditingMember(null);
                          }}
                          className="w-full bg-red-500/10 hover:bg-red-500 border border-red-500/20 hover:border-red-500 text-red-500 hover:text-white py-2.5 md:py-3 rounded-lg font-bold text-xs md:text-sm uppercase tracking-widest transition-all flex items-center justify-center gap-2"
                        >
                          <Trash2 className="w-4 h-4" />
                          Delete
                        </button>
                        <button
                          type="submit"
                          disabled={saving}
                          className="w-full bg-brand-pink text-white py-2.5 md:py-3 rounded-lg font-bold text-xs md:text-sm uppercase tracking-widest hover:bg-white hover:text-brand-pink shadow-[0_10px_30px_rgba(255,51,88,0.2)] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                          {saving ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Save className="w-4 h-4" />
                          )}
                          Save
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditingMember(null)}
                          className="w-full bg-white/5 hover:bg-white/10 text-white py-2.5 md:py-3 rounded-lg font-bold text-xs md:text-sm uppercase tracking-widest transition-all flex items-center justify-center gap-2"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </motion.div>
              </div>
            </div>
          )}
        </AnimatePresence>
    </div>
  );
};

export default AdminTeamDashboard;
