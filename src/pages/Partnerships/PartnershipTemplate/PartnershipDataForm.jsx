import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { User, Briefcase, Globe, Share2, Image as ImageIcon, Save, CheckCircle, Upload, Loader2, Trash2, Link as LinkIcon, MessageSquare, Layout, Sparkles, X, Plus, Linkedin, Twitter, Instagram, Github, ChevronDown } from "lucide-react";
import { BASE_URL } from "@/utils/urls";
import { toast } from "react-toastify";
import Logout from "../../../components/Logout";

const PartnershipDataForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [fetchingData, setFetchingData] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [paramError, setParamError] = useState("");
  const [checkingSlug, setCheckingSlug] = useState(false);
  const [slugAvailable, setSlugAvailable] = useState(null);
  
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
      socialLinks: [{ platform: "LinkedIn", url: "" }],
      heroDescription: "",
      blogPosts: [{ title: "", description: "", image: "", date: "" }],
    },
  });

  const wordLimit = { name: 8, subtitle: 15, bio: 150 };
  const getWordCount = (str) => str.trim() === "" ? 0 : str.trim().split(/\s+/).length;

  useEffect(() => {
    const checkAuth = () => {
      const user = localStorage.getItem("user");
      const token = localStorage.getItem("token");
      if (!user || !token) {
        navigate("/partners/login?redirect=/partners/create-portfolio");
      }
    };
    checkAuth();
  }, [navigate]);

  useEffect(() => {
    const fetchExistingData = async () => {
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const isAdmin = user.role === "admin";
      const params = new URLSearchParams(location.search);
      const targetId = params.get("id");

      if (!token) { 
        console.log("[PORTFOLIO_FETCH] No token found");
        setFetchingData(false); 
        return; 
      }
      
      try {
        let endpoint = `${BASE_URL}/partners/my-partnership`;
        
        if (isAdmin && targetId) {
          endpoint = `${BASE_URL}/partners/admin/${targetId}`;
          console.log(`[PORTFOLIO_FETCH] Admin fetching target ID: ${targetId}`);
        } else {
          console.log("[PORTFOLIO_FETCH] Fetching own partnership");
        }

        const response = await fetch(endpoint, {
          headers: { "Authorization": `Bearer ${token}` }
        });
        const data = await response.json();
        
        if (data.success && data.data) {
          console.log("[PORTFOLIO_FETCH] Success: Data received", data.data.name);
          setFormData(prev => ({
            ...prev,
            ...data.data,
            details: { 
              ...prev.details, 
              ...(data.data.details || {}) 
            }
          }));
        } else {
          console.log("[PORTFOLIO_FETCH] No data found or error", data.message);
        }
      } catch (err) {
        console.error("[PORTFOLIO_FETCH] Critical error", err);
      } finally { setFetchingData(false); }
    };
    fetchExistingData();
  }, [location.search]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "param") {
      if (/\s/.test(value)) {
        setParamError("Spaces are not allowed. Auto-replacing with underscore (_)");
      } else {
        setParamError("");
      }
      const sanitizedValue = value.replace(/\s/g, "_");
      setFormData((prev) => ({ ...prev, [name]: sanitizedValue }));
      
      // Real-time uniqueness check
      if (sanitizedValue.length > 2) {
        checkSlugAvailability(sanitizedValue);
      } else {
        setSlugAvailable(null);
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const checkSlugAvailability = async (slug) => {
    // Clear any existing timeout
    if (window.slugCheckTimeout) clearTimeout(window.slugCheckTimeout);

    window.slugCheckTimeout = setTimeout(async () => {
      setCheckingSlug(true);
      try {
        const response = await fetch(`${BASE_URL}/partners/p/${slug}`);
        const data = await response.json();
        
        // If found and it's not our own portfolio, it's taken
        if (data.success && data.data) {
          if (formData._id && data.data._id === formData._id) {
            setSlugAvailable(true);
            setParamError("");
          } else {
            setSlugAvailable(false);
            setParamError("This URL is already taken. Please try another one.");
          }
        } else {
          setSlugAvailable(true);
          // Only clear error if it was "taken" error, not space error
          if (paramError === "This URL is already taken. Please try another one.") {
            setParamError("");
          }
        }
      } catch (err) {
        console.error("Slug check failed", err);
      } finally {
        setCheckingSlug(false);
      }
    }, 600);
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
    
    if (file.size > 3 * 1024 * 1024) {
      toast.warning("File size too big! Please upload an image smaller than 3MB.");
      return;
    }

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

    if (file.size > 3 * 1024 * 1024) {
      toast.warning("File size too big! Please upload an image smaller than 3MB.");
      return;
    }

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

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const isAdmin = user.role === "admin";
      const params = new URLSearchParams(location.search);
      const targetId = params.get("id");

      let endpoint = `${BASE_URL}/partners/my-partnership`;
      let method = "POST";

      if (isAdmin && targetId) {
        endpoint = `${BASE_URL}/partners/${targetId}`;
        method = "PUT";
      }

      const response = await fetch(endpoint, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({ ...formData, isFree: true }),
      });
      const data = await response.json();
      if (data.success) {
        toast.success("Portfolio saved!");
        navigate("/partners/dashboard");
      } else { toast.error(data.message); }
    } catch (err) { toast.error("Error saving portfolio"); } finally { setLoading(false); }
  };

  if (fetchingData) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-6 font-sans">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-10 h-10 text-zinc-900 animate-spin" />
          <p className="text-sm font-medium text-zinc-500">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-zinc-900 font-sans selection:bg-zinc-900 selection:text-white">
      {/* Header Bar */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-zinc-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate("/partners/dashboard")} className="p-2 hover:bg-zinc-100 rounded-full transition-colors">
              <X size={20} className="text-zinc-500" />
            </button>
            <div>
              <h1 className="text-lg font-bold tracking-tight">Edit Portfolio</h1>
              <p className="text-xs text-zinc-500">All fields are updated in real-time</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Logout />
            <button
              onClick={handleSubmit}
              disabled={loading || !!paramError || checkingSlug}
              className={`px-6 py-2.5 rounded-full text-white text-sm font-bold transition-all flex items-center gap-2 shadow-sm ${
                loading || !!paramError || checkingSlug ? "bg-zinc-300 cursor-not-allowed" : "bg-zinc-900 hover:bg-zinc-800"
              }`}
            >
              {loading ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
              Save Changes
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 md:px-6 pb-24 space-y-16 md:space-y-24">
        {/* Section: Basic Info */}
        <section className="space-y-12 pb-12 border-b border-zinc-100">
          <div className="flex items-center gap-3">
            <User size={20} className="text-zinc-400" />
            <h2 className="text-xl font-bold tracking-tight">Personal Information</h2>
          </div>
          
          <div className="space-y-12">
            {/* Full Name Field */}
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your name"
                    className="w-full bg-white border border-zinc-200 rounded-xl px-5 py-3 text-base focus:ring-2 focus:ring-zinc-900/5 focus:border-zinc-900 outline-none transition-all placeholder:text-zinc-300 shadow-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Hero Description</label>
                  <input
                    type="text"
                    value={formData.details.heroDescription || ""}
                    onChange={(e) => handleDetailChange("heroDescription", e.target.value)}
                    placeholder="Short tagline (e.g. Based in London, UK)"
                    className="w-full bg-white border border-zinc-200 rounded-xl px-5 py-3 text-sm focus:ring-2 focus:ring-zinc-900/5 focus:border-zinc-900 outline-none transition-all placeholder:text-zinc-300 shadow-sm"
                  />
                </div>
              </div>
              <div className="hidden lg:block h-px bg-zinc-100 w-full mt-10" />
            </div>

            {/* URL Field */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Portfolio URL</label>
                <div className="flex items-center bg-zinc-50 border border-zinc-200 rounded-xl px-5 overflow-hidden group focus-within:border-zinc-900 transition-all">
                  <span className="text-zinc-400 text-sm whitespace-nowrap">socialbureau.in/</span>
                  <input
                    type="text"
                    name="param"
                    value={formData.param}
                    onChange={handleInputChange}
                    placeholder="your_name"
                    className="w-full bg-transparent py-3 pl-1 text-base outline-none font-medium"
                  />
                  {checkingSlug && <Loader2 size={14} className="animate-spin text-zinc-400 ml-2" />}
                  {slugAvailable && !paramError && !checkingSlug && <CheckCircle size={14} className="text-green-500 ml-2" />}
                </div>
                {paramError && (
                  <p className="text-[10px] font-bold text-red-500 mt-2 italic flex items-center gap-1">
                    <X size={10} /> {paramError}
                  </p>
                )}
                {slugAvailable && !paramError && !checkingSlug && (
                  <p className="text-[10px] font-bold text-green-600 mt-2 italic flex items-center gap-1">
                    <CheckCircle size={10} /> This URL is available!
                  </p>
                )}
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-zinc-900" />
                  <span className="text-[11px] font-black text-zinc-900 uppercase tracking-[0.2em]">Live URL Preview</span>
                </div>
                <div className="rounded-xl overflow-hidden border border-zinc-100 shadow-sm">
                  <img src="/assets/Partnerships/Student/Form/field2.png" alt="URL Preview" className="w-full h-auto" />
                </div>
              </div>
            </div>

            {/* Banner Field */}
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Profile Banner</label>
                <div className="relative group">
                  {formData.image ? (
                    <div className="relative rounded-2xl overflow-hidden aspect-[21/9] border border-zinc-200 group">
                      <img src={formData.image} alt="Banner" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                        <label className="p-3 bg-white rounded-full cursor-pointer hover:scale-110 transition-transform">
                          <Upload size={18} className="text-zinc-900" />
                          <input type="file" className="hidden" accept="image/*" onChange={handleFileSelect} />
                        </label>
                        <button onClick={() => setFormData(p => ({...p, image: ""}))} className="p-3 bg-white rounded-full hover:scale-110 transition-transform text-red-500">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center aspect-[21/9] border-2 border-dashed border-zinc-200 rounded-2xl cursor-pointer hover:bg-zinc-50 hover:border-zinc-300 transition-all group p-6">
                      {uploading ? <Loader2 className="w-8 h-8 text-zinc-300 animate-spin" /> : (
                        <div className="flex flex-col items-center gap-2">
                          <ImageIcon size={32} className="text-zinc-300 group-hover:text-zinc-400 transition-colors" />
                          <p className="text-sm font-medium text-zinc-400">Upload cover image</p>
                        </div>
                      )}
                      <input type="file" className="hidden" accept="image/*" onChange={handleFileSelect} />
                    </label>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-zinc-900" />
                    <span className="text-[11px] font-black text-zinc-900 uppercase tracking-[0.2em]">Landscape Preview</span>
                  </div>
                  <div className="rounded-xl overflow-hidden border border-zinc-100 shadow-md transition-transform hover:scale-[1.02]">
                    <img src="/assets/Partnerships/Student/Form/field3_landscape.png" alt="Landscape Preview" className="w-full h-auto" />
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-zinc-900" />
                    <span className="text-[11px] font-black text-zinc-900 uppercase tracking-[0.2em]">Portrait Preview</span>
                  </div>
                  <div className="rounded-xl overflow-hidden border border-zinc-100 shadow-md transition-transform hover:scale-[1.02]">
                    <img src="/assets/Partnerships/Student/Form/field3_potrait.png" alt="Portrait Preview" className="w-full h-auto" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Headline & Bio */}
        <section className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-8">
            <div className="flex items-center gap-3 border-b border-zinc-100 pb-4">
              <Briefcase size={20} className="text-zinc-400" />
              <h2 className="text-xl font-bold tracking-tight">Experience & Bio</h2>
            </div>
            <div className="grid gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Professional Headline</label>
                <input
                  type="text"
                  name="subtitle"
                  value={formData.subtitle}
                  onChange={handleInputChange}
                  placeholder="e.g. Graphic Designer or Full Stack Developer"
                  className="w-full bg-white border border-zinc-200 rounded-xl px-5 py-3 text-base focus:border-zinc-900 outline-none transition-all shadow-sm"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">About You</label>
                <textarea
                  value={formData.details.bio}
                  onChange={(e) => handleDetailChange("bio", e.target.value)}
                  placeholder="Describe your background, skills and what you're passionate about..."
                  className="w-full bg-white border border-zinc-200 rounded-2xl px-5 py-4 h-48 text-base focus:border-zinc-900 outline-none transition-all resize-none shadow-sm font-light leading-relaxed"
                />
              </div>
            </div>
          </div>
          <div className="space-y-4 lg:mt-12">
             <div className="flex items-center gap-2">
               <div className="w-1.5 h-1.5 rounded-full bg-zinc-900" />
               <span className="text-[11px] font-black text-zinc-900 uppercase tracking-[0.2em]">Story Preview</span>
             </div>
             <div className="rounded-2xl overflow-hidden border border-zinc-100 shadow-xl shadow-zinc-200/50">
                <img src="/assets/Partnerships/Student/Form/experience_Bio.png" alt="Bio Preview" className="w-full h-auto" />
             </div>
             <p className="text-xs text-zinc-400 italic">Your bio helps employers understand your journey and unique personality.</p>
          </div>
        </section>

        {/* Section: Skills */}
        <section className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-8">
            <div className="flex justify-between items-center border-b border-zinc-100 pb-4">
              <div className="flex items-center gap-3">
                <Globe size={20} className="text-zinc-400" />
                <h2 className="text-xl font-bold tracking-tight">Skills & Services</h2>
              </div>
              <div className="flex items-center gap-4">
                <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-blue-50 rounded-full border border-blue-100">
                  <Sparkles size={12} className="text-blue-500" />
                  <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">Pro Tip: 3+ Skills look best</span>
                </div>
                <button onClick={() => addArrayItem("services", { title: "", description: "" })} className="flex items-center gap-2 px-4 py-2 bg-zinc-900 text-white rounded-lg text-xs font-bold hover:bg-zinc-800 transition-all shadow-sm">
                  <Plus size={14} /> Add Skill
                </button>
              </div>
            </div>
            <div className="grid gap-4">
              {formData.details.services.map((s, i) => (
                <div key={i} className="group relative bg-white border border-zinc-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all">
                  <button onClick={() => removeArrayItem("services", i)} className="absolute top-4 right-4 text-zinc-200 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                  <div className="space-y-4">
                    <input
                      value={s.title}
                      onChange={(e) => handleArrayChange("services", i, "title", e.target.value)}
                      placeholder="Skill name (e.g. Web Design)"
                      className="w-full bg-transparent border-b border-zinc-100 py-2 text-lg font-bold outline-none focus:border-zinc-900 transition-all"
                    />
                    <textarea
                      value={s.description}
                      onChange={(e) => handleArrayChange("services", i, "description", e.target.value)}
                      placeholder="Describe what you do in this area..."
                      className="w-full bg-transparent text-sm text-zinc-500 h-20 outline-none resize-none"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-4 lg:mt-12">
             <div className="flex items-center gap-2">
               <div className="w-1.5 h-1.5 rounded-full bg-zinc-900" />
               <span className="text-[11px] font-black text-zinc-900 uppercase tracking-[0.2em]">Services Preview</span>
             </div>
             <div className="rounded-2xl overflow-hidden border border-zinc-100 shadow-xl shadow-zinc-200/50">
                <img src="/assets/Partnerships/Student/Form/skills$services.png" alt="Skills Preview" className="w-full h-auto" />
             </div>
          </div>
        </section>

        {/* Section: Projects */}
        <section className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-8">
            <div className="flex justify-between items-center border-b border-zinc-100 pb-4">
              <div className="flex items-center gap-3">
                <Layout size={20} className="text-zinc-400" />
                <h2 className="text-xl font-bold tracking-tight">Key Projects</h2>
              </div>
              <div className="flex items-center gap-4">
                <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-amber-50 rounded-full border border-amber-100">
                  <Sparkles size={12} className="text-amber-500" />
                  <span className="text-[10px] font-bold text-amber-600 uppercase tracking-wider">Pro Tip: 2+ Projects recommended</span>
                </div>
                <button onClick={() => addArrayItem("projects", { title: "", description: "", image: "" })} className="flex items-center gap-2 px-4 py-2 bg-zinc-900 text-white rounded-lg text-xs font-bold hover:bg-zinc-800 transition-all shadow-sm">
                  <Plus size={14} /> Add Project
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
              {formData.details.projects.map((p, i) => (
                <div key={i} className="bg-white border border-zinc-200 p-5 rounded-2xl relative shadow-sm hover:shadow-md transition-all">
                  <button onClick={() => removeArrayItem("projects", i)} className="absolute top-3 right-3 z-10 p-2 bg-white/80 backdrop-blur shadow-sm rounded-full text-zinc-300 hover:text-red-500 transition-colors"><Trash2 size={14} /></button>
                  <div className="aspect-[4/3] rounded-xl overflow-hidden bg-zinc-50 mb-4 relative group">
                    {p.image ? <img src={p.image} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-zinc-200 text-sm font-medium">No image</div>}
                    <label className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/20 transition-opacity cursor-pointer">
                      <Upload size={24} className="text-white" />
                      <input type="file" className="hidden" accept="image/*" onChange={(e) => handleProjectFileUpload(e, i)} />
                    </label>
                  </div>
                  <input
                    value={p.title}
                    onChange={(e) => handleArrayChange("projects", i, "title", e.target.value)}
                    placeholder="Project Name"
                    className="w-full bg-transparent border-b border-zinc-100 pb-2 mb-3 text-base font-bold outline-none focus:border-zinc-900"
                  />
                  <textarea
                    value={p.description}
                    onChange={(e) => handleArrayChange("projects", i, "description", e.target.value)}
                    placeholder="Describe your work..."
                    className="w-full bg-transparent text-xs text-zinc-500 h-16 outline-none resize-none"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-4 lg:mt-12">
             <div className="flex items-center gap-2">
               <div className="w-1.5 h-1.5 rounded-full bg-zinc-900" />
               <span className="text-[11px] font-black text-zinc-900 uppercase tracking-[0.2em]">Portfolio Gallery</span>
             </div>
             <div className="rounded-2xl overflow-hidden border border-zinc-100 shadow-xl shadow-zinc-200/50">
                <img src="/assets/Partnerships/Student/Form/key_projects.png" alt="Projects Preview" className="w-full h-auto" />
             </div>
          </div>
        </section>

        {/* Section: Blog Posts */}
        <section className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-8">
            <div className="flex justify-between items-center border-b border-zinc-100 pb-4">
              <div className="flex items-center gap-3">
                <MessageSquare size={20} className="text-zinc-400" />
                <h2 className="text-xl font-bold tracking-tight">Blog Posts / News</h2>
              </div>
              <button onClick={() => addArrayItem("blogPosts", { title: "", description: "", image: "", date: "" })} className="flex items-center gap-2 px-4 py-2 bg-zinc-900 text-white rounded-lg text-xs font-bold hover:bg-zinc-800 transition-all shadow-sm">
                <Plus size={14} /> Add Post
              </button>
            </div>
            <div className="grid gap-6">
              {(formData.details.blogPosts || []).map((post, i) => (
                <div key={i} className="bg-white border border-zinc-200 p-5 rounded-2xl relative shadow-sm hover:shadow-md transition-all">
                  <button onClick={() => removeArrayItem("blogPosts", i)} className="absolute top-3 right-3 z-10 p-2 bg-white/80 backdrop-blur shadow-sm rounded-full text-zinc-300 hover:text-red-500 transition-colors"><Trash2 size={14} /></button>
                  <div className="aspect-video rounded-xl overflow-hidden bg-zinc-50 mb-4 relative group">
                    {post.image ? <img src={post.image} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-zinc-200 text-sm font-medium">No image</div>}
                    <label className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/20 transition-opacity cursor-pointer">
                      <Upload size={24} className="text-white" />
                      <input type="file" className="hidden" accept="image/*" onChange={async (e) => {
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
                          if (res.success) handleArrayChange("blogPosts", i, "image", res.url);
                        } catch (err) { toast.error("Upload failed"); } finally { setUploading(false); }
                      }} />
                    </label>
                  </div>
                  <div className="grid gap-4">
                    <input
                      value={post.title}
                      onChange={(e) => handleArrayChange("blogPosts", i, "title", e.target.value)}
                      placeholder="Post Title"
                      className="w-full bg-transparent border-b border-zinc-100 pb-2 text-base font-bold outline-none focus:border-zinc-900"
                    />
                    <div className="flex gap-4">
                      <input
                        value={post.date}
                        onChange={(e) => handleArrayChange("blogPosts", i, "date", e.target.value)}
                        placeholder="Date (e.g. 12 Jan 2024)"
                        className="flex-1 bg-transparent border-b border-zinc-100 pb-2 text-xs outline-none focus:border-zinc-900"
                      />
                      <input
                        value={post.category}
                        onChange={(e) => handleArrayChange("blogPosts", i, "category", e.target.value)}
                        placeholder="Category"
                        className="flex-1 bg-transparent border-b border-zinc-100 pb-2 text-xs outline-none focus:border-zinc-900"
                      />
                    </div>
                    <textarea
                      value={post.description}
                      onChange={(e) => handleArrayChange("blogPosts", i, "description", e.target.value)}
                      placeholder="Post excerpt..."
                      className="w-full bg-transparent text-xs text-zinc-500 h-16 outline-none resize-none"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-4 lg:mt-12">
             <div className="flex items-center gap-2">
               <div className="w-1.5 h-1.5 rounded-full bg-zinc-900" />
               <span className="text-[11px] font-black text-zinc-900 uppercase tracking-[0.2em]">Blog Feed Preview</span>
             </div>
             <div className="rounded-2xl overflow-hidden border border-zinc-100 shadow-xl shadow-zinc-200/50">
                <img src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070&auto=format&fit=crop" alt="Blog Preview" className="w-full h-auto" />
             </div>
          </div>
        </section>

        {/* Section: Testimonials */}
        <section className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-8">
            <div className="flex justify-between items-center border-b border-zinc-100 pb-4">
              <div className="flex items-center gap-3">
                <MessageSquare size={20} className="text-zinc-400" />
                <h2 className="text-xl font-bold tracking-tight">Testimonials</h2>
              </div>
              <div className="flex items-center gap-4">
                <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-emerald-50 rounded-full border border-emerald-100">
                  <Sparkles size={12} className="text-emerald-500" />
                  <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">Pro Tip: 2+ reviews build trust</span>
                </div>
                <button onClick={() => addArrayItem("testimonials", { quote: "", author: "" })} className="flex items-center gap-2 px-4 py-2 bg-zinc-900 text-white rounded-lg text-xs font-bold hover:bg-zinc-800 transition-all shadow-sm">
                  <Plus size={14} /> Add Testimonial
                </button>
              </div>
            </div>
            <div className="space-y-4">
              {formData.details.testimonials.map((t, i) => (
                <div key={i} className="p-6 bg-white border border-zinc-200 rounded-2xl relative shadow-sm">
                  <button onClick={() => removeArrayItem("testimonials", i)} className="absolute top-4 right-4 text-zinc-200 hover:text-red-500"><Trash2 size={16} /></button>
                  <textarea
                    value={t.quote}
                    onChange={(e) => handleArrayChange("testimonials", i, "quote", e.target.value)}
                    placeholder="What did they say about your work?"
                    className="w-full bg-transparent text-base font-light italic text-zinc-600 h-24 outline-none resize-none mb-4"
                  />
                  <input
                    value={t.author}
                    onChange={(e) => handleArrayChange("testimonials", i, "author", e.target.value)}
                    placeholder="Author name (e.g. Manager at XYZ)"
                    className="w-full bg-transparent border-t border-zinc-50 pt-4 text-xs font-bold uppercase tracking-widest text-zinc-400 outline-none focus:text-zinc-900 transition-colors"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-4 lg:mt-12">
             <div className="flex items-center gap-2">
               <div className="w-1.5 h-1.5 rounded-full bg-zinc-900" />
               <span className="text-[11px] font-black text-zinc-900 uppercase tracking-[0.2em]">Social Proof</span>
             </div>
             <div className="rounded-2xl overflow-hidden border border-zinc-100 shadow-xl shadow-zinc-200/50">
                <img src="/assets/Partnerships/Student/Form/testimonials.png" alt="Testimonials Preview" className="w-full h-auto" />
             </div>
          </div>
        </section>

        {/* Section: Social Links */}
        <section className="grid lg:grid-cols-2 gap-12 items-start pb-32">
          <div className="space-y-8">
            <div className="flex justify-between items-center border-b border-zinc-100 pb-4">
              <div className="flex items-center gap-3">
                <Share2 size={20} className="text-zinc-400" />
                <h2 className="text-xl font-bold tracking-tight">Social Media</h2>
              </div>
              <div className="flex items-center gap-4">
                <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-indigo-50 rounded-full border border-indigo-100">
                  <Sparkles size={12} className="text-indigo-500" />
                  <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider">Pro Tip: 2+ links for reach</span>
                </div>
                <button onClick={() => addArrayItem("socialLinks", { platform: "LinkedIn", url: "" })} className="flex items-center gap-2 px-4 py-2 bg-zinc-900 text-white rounded-lg text-xs font-bold hover:bg-zinc-800 transition-all shadow-sm">
                  <Plus size={14} /> Add Social Link
                </button>
              </div>
            </div>
            <div className="grid gap-4">
              {formData.details.socialLinks.map((link, i) => {
                const Icon = {
                  LinkedIn: Linkedin,
                  Twitter: Twitter,
                  Instagram: Instagram,
                  GitHub: Github,
                  Website: Globe
                }[link.platform] || Globe;

                return (
                  <div key={i} className="flex gap-4 items-center p-4 bg-white border border-zinc-100 rounded-2xl group transition-all hover:shadow-sm focus-within:border-zinc-300 relative">
                    <div className="flex-shrink-0 w-12 h-12 bg-zinc-50 rounded-xl flex items-center justify-center text-zinc-400 transition-colors">
                      <Icon size={20} />
                    </div>
                    
                    {/* Custom Dropdown */}
                    <div className="relative">
                      <button
                        type="button"
                        onClick={(e) => {
                          const dropdown = e.currentTarget.nextElementSibling;
                          dropdown.classList.toggle('hidden');
                        }}
                        className="flex items-center gap-2 min-w-[140px] px-2 py-2 hover:bg-zinc-50 rounded-lg transition-colors text-left"
                      >
                        <span className="text-[11px] font-black text-zinc-900 uppercase tracking-widest">{link.platform}</span>
                        <ChevronDown size={14} className="text-zinc-400 ml-auto" />
                      </button>
                      
                      <div className="hidden absolute top-full left-0 mt-1 w-48 bg-white border border-zinc-100 rounded-xl shadow-xl z-50 py-2">
                        {["LinkedIn", "Twitter", "Instagram", "GitHub", "Website"].map(p => (
                          <button
                            key={p}
                            type="button"
                            onClick={(e) => {
                              handleArrayChange("socialLinks", i, "platform", p);
                              e.currentTarget.parentElement.classList.add('hidden');
                            }}
                            className={`w-full text-left px-4 py-2.5 text-[11px] font-bold uppercase tracking-widest transition-colors hover:bg-zinc-50 ${link.platform === p ? 'text-zinc-900 bg-zinc-50/50' : 'text-zinc-400'}`}
                          >
                            {p}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex-1">
                      <input
                        type="text"
                        value={link.url}
                        onChange={(e) => handleArrayChange("socialLinks", i, "url", e.target.value)}
                        placeholder={`Link to your ${link.platform} profile...`}
                        className="w-full bg-transparent py-2 text-sm text-zinc-600 outline-none transition-all placeholder:text-zinc-300"
                      />
                    </div>

                    <button onClick={() => removeArrayItem("socialLinks", i)} className="p-2 text-zinc-200 hover:text-red-500 transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="space-y-4 lg:mt-12">
             <div className="flex items-center gap-2">
               <div className="w-1.5 h-1.5 rounded-full bg-zinc-900" />
               <span className="text-[11px] font-black text-zinc-900 uppercase tracking-[0.2em]">Connect Preview</span>
             </div>
             <div className="rounded-2xl overflow-hidden border border-zinc-100 shadow-xl shadow-zinc-200/50">
                <img src="/assets/Partnerships/Student/Form/social_medialinks.png" alt="Social Media Preview" className="w-full h-auto" />
             </div>
          </div>
        </section>

        {/* Bottom Action Button */}
        <div className="flex flex-col items-center gap-6 pt-12 pb-24 border-t border-zinc-100">
          <div className="text-center space-y-2">
            <h3 className="text-xl font-bold text-zinc-900">Ready to launch?</h3>
            <p className="text-zinc-500 text-sm">Review your details above and launch your professional portfolio.</p>
          </div>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="group relative flex items-center gap-3 px-12 py-5 bg-zinc-900 text-white rounded-2xl font-bold text-lg hover:bg-zinc-800 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-2xl shadow-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
          >
            {loading ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : (
              <>
                <Sparkles size={20} className="text-yellow-400" />
                <span>Create Portfolio</span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </>
            )}
          </button>
        </div>
      </main>

      {/* Save Button for Mobile */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 md:hidden">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="flex items-center gap-2 px-8 py-4 bg-zinc-900 text-white rounded-full font-bold shadow-2xl hover:scale-105 active:scale-95 transition-all"
        >
          {loading ? <Loader2 size={18} className="animate-spin" /> : <Sparkles size={18} />}
          Publish Portfolio
        </button>
      </div>

      <style>{`
        body { background-color: #F9FAFB; }
      `}</style>
    </div>
  );
};

export default PartnershipDataForm;
