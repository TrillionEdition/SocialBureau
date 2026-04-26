import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { User, Briefcase, Globe, Share2, Image as ImageIcon, Save, ArrowRight, ArrowLeft, CheckCircle, Upload, Loader2, X, Plus, Trash2, Link as LinkIcon, MessageSquare, Layout, Sparkles, LogOut } from "lucide-react";
import { BASE_URL } from "@/utils/urls";
import { toast } from "react-toastify";
import Logout from "../../../components/Logout";

const PartnershipDataForm = ({ initialData, onSave }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [fetchingData, setFetchingData] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    param: "",
    email: "",
    subtitle: "",
    image: "",
    templateId: "template1",
    details: {
      bio: "",
      services: [{ title: "", description: "" }],
      projects: [{ title: "", description: "", image: "" }],
      testimonials: [{ quote: "", author: "" }],
      socialLinks: [],
    },
  });

  const wordLimit = { name: 8, subtitle: 15, bio: 150 };
  const getWordCount = (str) => str.trim() === "" ? 0 : str.trim().split(/\s+/).length;

  // Check authentication and redirect logic
  useEffect(() => {
    const checkAuth = () => {
      const user = localStorage.getItem("user");
      const token = localStorage.getItem("token");
      const searchParams = new URLSearchParams(window.location.search);
      const templateId = searchParams.get('template');
      
      if (!user || !token) {
        navigate("/partners/login?redirect=/partners/create-portfolio");
      } else if (!templateId && !location.pathname.includes("/partners/create-portfolio")) {
        // Only redirect to dashboard if not on the create page and missing templateId
        navigate("/partners/dashboard");
      }
    };

    checkAuth();
    window.addEventListener("authChange", checkAuth);
    return () => window.removeEventListener("authChange", checkAuth);
  }, [navigate]);

  useEffect(() => {
    const fetchExistingData = async () => {
      const token = localStorage.getItem("token");
      if (!token) { setFetchingData(false); return; }
      try {
        const response = await fetch(`${BASE_URL}/partners/my-partnership`, {
          headers: { "Authorization": `Bearer ${token}` }
        });
        const data = await response.json();
        if (data.success && data.data) {
          setFormData({
            ...data.data,
            details: { ...formData.details, ...(data.data.details || {}) }
          });
        }
      } catch (err) {
        console.error("Failed to fetch data", err);
      } finally { setFetchingData(false); }
    };
    fetchExistingData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDetailChange = (path, value) => {
    const newDetails = { ...formData.details };
    const keys = path.split(".");
    let current = newDetails;
    for (let i = 0; i < keys.length - 1; i++) { current = current[keys[i]]; }
    current[keys[keys.length - 1]] = value;
    setFormData((prev) => ({ ...prev, details: newDetails }));
  };

  const handleArrayChange = (field, index, subfield, value) => {
    const newArray = [...formData.details[field]];
    newArray[index][subfield] = value;
    handleDetailChange(field, newArray);
  };

  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { toast.error("Image too large"); return; }
    setUploading(true);
    const data = new FormData();
    data.append("image", file);
    try {
      const response = await fetch(`${BASE_URL}/partners/upload`, {
        method: "POST",
        headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` },
        body: data,
      });
      const res = await response.json();
      if (res.success) setFormData(prev => ({ ...prev, image: res.url }));
    } catch (err) { toast.error("Upload failed"); } finally { setUploading(false); }
  };

  const handleProjectFileUpload = async (e, index) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const data = new FormData();
    data.append("image", file);
    try {
      const response = await fetch(`${BASE_URL}/partners/upload`, {
        method: "POST",
        headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` },
        body: data,
      });
      const res = await response.json();
      if (res.success) handleArrayChange("projects", index, "image", res.url);
    } catch (err) { toast.error("Upload failed"); } finally { setUploading(false); }
  };

  const addArrayItem = (field, item) => handleDetailChange(field, [...formData.details[field], item]);
  const removeArrayItem = (field, index) => handleDetailChange(field, formData.details[field].filter((_, i) => i !== index));

  const steps = [
    { title: "Identity", icon: User },
    { title: "About You", icon: Briefcase },
    { title: "Skills", icon: Globe },
    { title: "Projects", icon: Layout },
    { title: "Reviews", icon: MessageSquare },
    { title: "Social", icon: Share2 },
  ];

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/partners/my-partnership`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({ ...formData, isFree: true }),
      });
      const data = await response.json();
      if (data.success) {
        toast.success("Portfolio published!");
        navigate("/partners/dashboard");
      } else { toast.error(data.message); }
    } catch (err) { toast.error("Error saving portfolio"); } finally { setLoading(false); }
  };

  const WordCounter = ({ current, limit, label }) => {
    const count = getWordCount(current);
    const isOver = count > limit;
    return (
      <div className="flex flex-wrap justify-between items-center mb-3 gap-2">
        <label className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] text-white/40">{label}</label>
        <div className={`px-2 md:px-3 py-1 rounded-full text-[8px] md:text-[9px] font-black tracking-widest ${isOver ? "bg-[#E8001A] text-white" : "bg-white/5 text-white/30"}`}>
          {count}/{limit} <span className="opacity-40 ml-1 hidden sm:inline">WORDS</span>
        </div>
      </div>
    );
  };

  if (fetchingData) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center p-6">
        <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 2, repeat: Infinity }} className="flex flex-col items-center gap-6 text-center">
          <div className="w-12 h-12 md:w-16 md:h-16 border-t-2 border-r-2 border-[#E8001A] rounded-full animate-spin" />
          <p className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] md:tracking-[0.4em] text-[#E8001A]">Synchronizing Creative Core</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-[#0A0A0A] text-white selection:bg-[#E8001A] selection:text-white font-sans antialiased overflow-hidden flex flex-col">
      <style>
        {`
          .custom-scrollbar::-webkit-scrollbar {
            width: 4px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.02);
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: rgba(232, 0, 26, 0.2);
            border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: rgba(232, 0, 26, 0.4);
          }
        `}
      </style>
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#E8001A]/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#E8001A]/5 blur-[100px] rounded-full" />
      </div>

      <div className="max-w-5xl w-full mx-auto px-4 md:px-6 py-6 md:py-10 relative z-10 flex-1 flex flex-col overflow-hidden">
        {/* Header Section */}
        <header className="mb-6 md:mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 md:gap-12 shrink-0">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
            <span className="text-[8px] md:text-[9px] font-black text-[#E8001A] uppercase tracking-[0.3em] md:tracking-[0.4em] mb-2 block underline underline-offset-4 decoration-1 italic">Portfolio Engine</span>
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-black tracking-tighter leading-[0.9] md:leading-[0.85] uppercase italic">
              Forge Your<br /><span className="bg-gradient-to-tr from-[#E8001A] via-[#FF5C35] to-[#FF1493] bg-clip-text text-transparent">Digital Legacy.</span>
            </h1>
          </motion.div>
          <div className="flex flex-col items-start md:items-end gap-4 md:gap-6 w-full md:w-auto">
            <div className="flex items-center justify-between md:justify-end gap-4 w-full md:w-auto">
              <div className="flex gap-1.5 md:gap-2">
                {steps.map((s, i) => (
                  <div key={i} className={`w-6 sm:w-8 h-1 transition-all duration-700 rounded-full ${i <= step ? "bg-[#E8001A]" : "bg-white/10"}`} />
                ))}
              </div>
              <div className="pl-4 border-l border-white/10">
                <Logout />
              </div>
            </div>
            <div className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] text-white/30">
              Module 0{step + 1} / <span className="text-white/60">{steps[step].title}</span>
            </div>
          </div>
        </header>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -40, scale: 0.98 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 overflow-hidden flex flex-col bg-white/[0.02] backdrop-blur-3xl border border-white/5 rounded-[24px] md:rounded-[32px] shadow-[0_40px_100px_rgba(0,0,0,0.4)]"
          >
            {/* Step Content */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-6 md:p-10 space-y-8 md:space-y-10 custom-scrollbar overscroll-contain" data-lenis-prevent>
              {step === 0 && (
                <div className="grid gap-8 md:gap-10">
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                    <WordCounter current={formData.name} limit={wordLimit.name} label="Your Full Name" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g. JOHN DOE"
                      className="w-full bg-white/[0.03] border border-white/10 rounded-[20px] md:rounded-[24px] px-6 md:px-8 py-4 md:py-5 text-lg md:text-xl font-black uppercase tracking-tight focus:outline-none focus:border-[#E8001A]/50 focus:bg-white/[0.06] transition-all"
                    />
                  </motion.div>
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                    <label className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] text-white/40 mb-3 block">Portfolio Web Address</label>
                    <div className="relative flex flex-col sm:block">
                      <span className="sm:absolute left-8 top-1/2 sm:-translate-y-1/2 text-white/20 text-[10px] sm:text-sm font-medium mb-2 sm:mb-0">socialbureau.in/partnership/</span>
                      <input
                        type="text"
                        name="param"
                        value={formData.param}
                        onChange={handleInputChange}
                        placeholder="your-custom-url"
                        className="w-full bg-white/[0.03] border border-white/10 rounded-[20px] md:rounded-[24px] sm:pl-[230px] px-6 md:px-8 py-4 md:py-5 text-sm font-bold text-[#E8001A] focus:outline-none focus:border-[#E8001A]/50 focus:bg-white/[0.06] transition-all"
                      />
                    </div>
                  </motion.div>
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                    <label className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] text-white/40 mb-5 block">Cover Photo / Profile Banner</label>
                    <div className="relative group">
                      {formData.image ? (
                        <div className="relative rounded-[24px] md:rounded-[32px] overflow-hidden aspect-[16/8] sm:aspect-[16/6] border border-white/10">
                          <img src={formData.image} alt="Identity" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-4">
                            <label className="p-3 md:p-4 bg-white text-black rounded-full cursor-pointer hover:bg-[#E8001A] hover:text-white transition-all transform hover:scale-110">
                              <Upload size={18} md:size={20} />
                              <input type="file" className="hidden" accept="image/*" onChange={handleFileSelect} />
                            </label>
                            <button onClick={() => setFormData(p => ({...p, image: ""}))} className="p-3 md:p-4 bg-white/10 backdrop-blur-md rounded-full hover:bg-red-500 transition-all transform hover:scale-110">
                              <Trash2 size={18} md:size={20} />
                            </button>
                          </div>
                        </div>
                      ) : (
                        <label className="flex flex-col items-center justify-center aspect-[16/8] sm:aspect-[16/6] border-2 border-dashed border-white/10 rounded-[24px] md:rounded-[32px] cursor-pointer hover:border-[#E8001A]/50 hover:bg-white/[0.02] transition-all group p-6 text-center">
                          {uploading ? <Loader2 className="w-8 h-8 md:w-10 md:h-10 text-[#E8001A] animate-spin" /> : (
                            <>
                              <div className="p-4 md:p-6 rounded-full bg-white/5 mb-4 group-hover:bg-[#E8001A]/10 transition-colors">
                                <ImageIcon size={24} md:size={32} className="text-white/20 group-hover:text-[#E8001A] transition-colors" />
                              </div>
                              <p className="text-[10px] md:text-sm font-black uppercase tracking-widest text-white/40 group-hover:text-white transition-colors px-4">Upload Your Header Image</p>
                            </>
                          )}
                          <input type="file" className="hidden" accept="image/*" onChange={handleFileSelect} />
                        </label>
                      )}
                    </div>
                  </motion.div>
                </div>
              )}

              {step === 1 && (
                <div className="grid gap-10 md:gap-12">
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                    <WordCounter current={formData.subtitle} limit={wordLimit.subtitle} label="Professional Headline" />
                    <input
                      type="text"
                      name="subtitle"
                      value={formData.subtitle}
                      onChange={handleInputChange}
                      placeholder="e.g. COMPUTER SCIENCE STUDENT & WEB DEVELOPER"
                      className="w-full bg-white/[0.03] border border-white/10 rounded-[20px] md:rounded-[24px] px-6 md:px-8 py-4 md:py-5 text-lg md:text-xl font-bold uppercase tracking-tight focus:outline-none focus:border-[#E8001A]/50 transition-all"
                    />
                  </motion.div>
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                    <WordCounter current={formData.details.bio} limit={wordLimit.bio} label="Your Story / About You" />
                    <textarea
                      value={formData.details.bio}
                      onChange={(e) => handleDetailChange("bio", e.target.value)}
                      placeholder="Share your journey, your passions, and what drives you to create..."
                      className="w-full bg-white/[0.03] border border-white/10 rounded-[24px] md:rounded-[32px] px-6 md:px-8 py-6 md:py-8 h-48 md:h-64 text-base md:text-lg font-light leading-relaxed italic focus:outline-none focus:border-[#E8001A]/50 transition-all resize-none"
                    />
                  </motion.div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-8 md:space-y-10">
                  <div className="flex justify-between items-center px-1">
                     <h3 className="text-xl md:text-2xl font-black uppercase tracking-tighter italic">Skills & Services</h3>
                     <button onClick={() => addArrayItem("services", { title: "", description: "" })} className="p-2.5 md:p-3 bg-[#E8001A] rounded-full hover:scale-110 transition-transform shadow-lg shadow-[#E8001A]/20">
                        <Plus size={18} md:size={20} />
                     </button>
                  </div>
                  <div className="grid gap-4 md:gap-6">
                    {formData.details.services.map((s, i) => (
                      <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} className="group relative bg-white/[0.03] border border-white/5 p-6 md:p-8 rounded-[24px] md:rounded-[32px] hover:bg-white/[0.05] transition-all">
                        <button onClick={() => removeArrayItem("services", i)} className="absolute top-4 md:top-6 right-4 md:right-6 text-white/10 hover:text-[#E8001A] transition-colors"><Trash2 size={14} md:size={16} /></button>
                        <div className="grid gap-3 md:gap-4">
                          <input
                            value={s.title}
                            onChange={(e) => handleArrayChange("services", i, "title", e.target.value)}
                            placeholder="Skill Title (e.g. UI/UX Design)"
                            className="bg-transparent border-b border-white/10 py-2 text-lg md:text-xl font-black uppercase tracking-tight focus:outline-none focus:border-[#E8001A] transition-all"
                          />
                          <textarea
                            value={s.description}
                            onChange={(e) => handleArrayChange("services", i, "description", e.target.value)}
                            placeholder="Briefly describe your experience or what you offer in this area..."
                            className="bg-transparent text-white/50 text-xs md:text-sm font-light h-16 md:h-20 focus:outline-none resize-none italic"
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-8 md:space-y-10">
                  <div className="flex justify-between items-center px-1">
                     <h3 className="text-xl md:text-2xl font-black uppercase tracking-tighter italic">Featured Projects</h3>
                     <button onClick={() => addArrayItem("projects", { title: "", description: "", image: "" })} className="p-2.5 md:p-3 bg-[#E8001A] rounded-full hover:scale-110 transition-transform">
                        <Plus size={18} md:size={20} />
                     </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
                    {formData.details.projects.map((p, i) => (
                      <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white/[0.03] border border-white/5 p-5 md:p-6 rounded-[24px] md:rounded-[32px] relative group flex flex-col">
                        <button onClick={() => removeArrayItem("projects", i)} className="absolute top-3 md:top-4 right-3 md:right-4 z-10 p-2 bg-black/40 backdrop-blur-md rounded-full text-white/20 hover:text-red-500 transition-colors"><Trash2 size={12} md:size={14} /></button>
                        <div className="aspect-square rounded-xl md:rounded-2xl overflow-hidden bg-white/5 mb-5 md:mb-6 relative">
                          {p.image ? <img src={p.image} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-white/10 uppercase text-[10px] font-black italic">Project Image</div>}
                          <label className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/40 backdrop-blur-sm transition-opacity cursor-pointer">
                            <Upload size={24} />
                            <input type="file" className="hidden" accept="image/*" onChange={(e) => handleProjectFileUpload(e, i)} />
                          </label>
                        </div>
                        <input
                          value={p.title}
                          onChange={(e) => handleArrayChange("projects", i, "title", e.target.value)}
                          placeholder="Project Name"
                          className="w-full bg-transparent border-b border-white/10 pb-2 mb-3 md:mb-4 text-base md:text-lg font-black uppercase tracking-tight focus:outline-none focus:border-[#E8001A]"
                        />
                        <textarea
                          value={p.description}
                          onChange={(e) => handleArrayChange("projects", i, "description", e.target.value)}
                          placeholder="Tell us what you did and the impact it had..."
                          className="w-full bg-transparent text-white/40 text-[10px] md:text-xs italic h-16 focus:outline-none resize-none flex-1"
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-8 md:space-y-10">
                  <div className="flex justify-between items-center px-1">
                     <h3 className="text-xl md:text-2xl font-black uppercase tracking-tighter italic">What People Say</h3>
                     <button onClick={() => addArrayItem("testimonials", { quote: "", author: "" })} className="p-2.5 md:p-3 bg-[#E8001A] rounded-full hover:scale-110 transition-transform">
                        <Plus size={18} md:size={20} />
                     </button>
                  </div>
                  <div className="grid gap-4 md:gap-6">
                    {formData.details.testimonials.map((t, i) => (
                      <motion.div key={i} className="p-6 md:p-10 bg-white/[0.03] border border-white/5 rounded-[32px] md:rounded-[40px] relative">
                         <button onClick={() => removeArrayItem("testimonials", i)} className="absolute top-6 md:top-8 right-6 md:right-8 text-white/10 hover:text-red-500"><Trash2 size={14} md:size={16} /></button>
                         <textarea
                           value={t.quote}
                           onChange={(e) => handleArrayChange("testimonials", i, "quote", e.target.value)}
                           placeholder="Share a recommendation or feedback you've received..."
                           className="w-full bg-transparent text-lg md:text-xl font-medium italic text-white/80 h-24 md:h-32 focus:outline-none resize-none mb-4 md:mb-6"
                         />
                         <input
                           value={t.author}
                           onChange={(e) => handleArrayChange("testimonials", i, "author", e.target.value)}
                           placeholder="WHO SAID THIS? (e.g. Professor, Manager, Client)"
                           className="w-full bg-transparent border-t border-white/5 pt-4 md:pt-6 text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-[#E8001A] focus:outline-none"
                         />
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {step === 5 && (
                <div className="space-y-8 md:space-y-10">
                  <div className="flex justify-between items-center px-1">
                     <h3 className="text-xl md:text-2xl font-black uppercase tracking-tighter italic">Social Media & Links</h3>
                     <button onClick={() => addArrayItem("socialLinks", { platform: "LinkedIn", url: "" })} className="p-2.5 md:p-3 bg-[#E8001A] rounded-full hover:scale-110 transition-transform">
                        <Plus size={18} md:size={20} />
                     </button>
                  </div>
                  <div className="grid gap-3 md:gap-4">
                    {formData.details.socialLinks.map((link, i) => (
                      <motion.div key={i} className="flex flex-col sm:flex-row gap-3 md:gap-4 sm:items-center p-4 bg-white/[0.03] border border-white/5 rounded-2xl">
                        <select
                          value={link.platform}
                          onChange={(e) => handleArrayChange("socialLinks", i, "platform", e.target.value)}
                          className="bg-black text-white/60 text-[9px] md:text-[10px] font-black uppercase tracking-widest px-3 md:px-4 py-2.5 md:py-3 rounded-xl border border-white/10 focus:border-[#E8001A] outline-none"
                        >
                          {["LinkedIn", "Twitter", "Instagram", "GitHub", "Website"].map(p => <option key={p} value={p}>{p}</option>)}
                        </select>
                        <div className="flex-1 relative">
                          <LinkIcon size={12} md:size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" />
                          <input
                            type="text"
                            value={link.url}
                            onChange={(e) => handleArrayChange("socialLinks", i, "url", e.target.value)}
                            placeholder="Connect URL..."
                            className="w-full bg-transparent border border-white/10 rounded-xl pl-10 md:pl-12 pr-4 py-2.5 md:py-3 text-xs md:text-sm focus:border-[#E8001A] outline-none transition-all"
                          />
                        </div>
                        <button onClick={() => removeArrayItem("socialLinks", i)} className="text-white/10 hover:text-red-500 transition-colors self-end sm:self-auto"><Trash2 size={16} /></button>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Navigation Controls */}
            <footer className="px-6 sm:px-8 md:px-12 py-6 md:py-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-6 sm:gap-4 bg-black/20 shrink-0">
              <button
                disabled={step === 0}
                onClick={() => setStep(s => s - 1)}
                className="flex items-center gap-3 text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-white/30 hover:text-white transition-colors disabled:opacity-0"
              >
                <ArrowLeft size={14} /> Previous Module
              </button>
              
              <div className="flex flex-wrap justify-center gap-3 md:gap-4 w-full sm:w-auto">
                <button onClick={() => navigate("/partners/dashboard")} className="px-6 md:px-8 py-3.5 md:py-4 rounded-full border border-white/10 text-[9px] md:text-[11px] font-black uppercase tracking-[0.2em] hover:bg-white/5 transition-all">Cancel</button>
                {step < steps.length - 1 ? (
                  <button
                    onClick={() => setStep(s => s + 1)}
                    className="flex-1 sm:flex-none px-8 md:px-12 py-3.5 md:py-4 rounded-full bg-white text-black text-[9px] md:text-[11px] font-black uppercase tracking-[0.2em] hover:bg-[#E8001A] hover:text-white transition-all transform hover:scale-105 shadow-2xl shadow-white/5"
                  >
                    Proceed <ArrowRight size={14} className="inline ml-1" />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="flex-1 sm:flex-none px-8 md:px-12 py-3.5 md:py-4 rounded-full bg-[#E8001A] text-white text-[9px] md:text-[11px] font-black uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all transform hover:scale-105 shadow-2xl shadow-[#E8001A]/30 flex items-center justify-center gap-2 md:gap-3"
                  >
                    {loading ? <Loader2 className="w-3 h-3 md:w-4 md:h-4 animate-spin" /> : <Sparkles size={14} />}
                    Initialize Portfolio
                  </button>
                )}
              </div>
            </footer>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default PartnershipDataForm;


