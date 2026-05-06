import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, Save, Upload, Plus, Trash2, 
  Instagram, Youtube, Twitter, Linkedin, 
  Globe, Sparkles, Image as ImageIcon, 
  Check, X, MessageSquare, Briefcase, 
  TrendingUp, Users, Layout
} from "lucide-react";
import { BASE_URL } from "@/utils/urls";
import { toast } from "react-toastify";
import LoadingSpinner from "../../../components/LoadingSpinner";

const InfluencerDataForm = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const templateId = searchParams.get("template") || "influencer";
  
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    param: "",
    email: "",
    subtitle: "",
    image: "",
    templateId: templateId,
    details: {
      bio: "",
      heroDescription: "",
      socialLinks: [
        { platform: "Instagram", url: "", followers: "" },
        { platform: "YouTube", url: "", followers: "" }
      ],
      services: [
        { title: "Brand Collaboration", description: "" },
        { title: "Content Creation", description: "" }
      ],
      projects: [
        { title: "", description: "", image: "" }
      ],
      blogPosts: [
        { title: "", description: "", image: "", date: "", category: "" }
      ],
      testimonials: [
        { quote: "", author: "" }
      ],
      ctaTitle: "Ready to Scale Your Brand?",
      ctaSubtitle: "Let's create viral content together.",
      stats: {
        followers: "100K+",
        engagement: "5.2%"
      }
    }
  });

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (!userStr) {
      navigate("/partners/register");
      return;
    }
    const user = JSON.parse(userStr);
    setFormData(prev => ({ ...prev, email: user.email }));
  }, [navigate]);

  const [checkingSlug, setCheckingSlug] = useState(false);
  const [slugAvailable, setSlugAvailable] = useState(null);
  const [paramError, setParamError] = useState("");

  const checkSlugAvailability = async (slug) => {
    if (window.slugCheckTimeout) clearTimeout(window.slugCheckTimeout);

    window.slugCheckTimeout = setTimeout(async () => {
      setCheckingSlug(true);
      try {
        const response = await fetch(`${BASE_URL}/partners/p/${slug}`);
        const data = await response.json();
        
        if (data.success && data.data) {
          setSlugAvailable(false);
          setParamError("This URL is already taken. Please try another one.");
        } else {
          setSlugAvailable(true);
          setParamError("");
        }
      } catch (err) {
        console.error("Error checking slug:", err);
      } finally {
        setCheckingSlug(false);
      }
    }, 600);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    if (field === "param") {
      const sanitized = value.toLowerCase().replace(/[^a-z0-9-]/g, "");
      if (sanitized.length > 2) {
        checkSlugAvailability(sanitized);
      } else {
        setSlugAvailable(null);
        setParamError(sanitized.length > 0 ? "URL is too short" : "");
      }
    }
  };

  const handleDetailsChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      details: { ...prev.details, [field]: value }
    }));
  };

  const handleArrayChange = (arrayField, index, field, value) => {
    const newArray = [...formData.details[arrayField]];
    newArray[index] = { ...newArray[index], [field]: value };
    handleDetailsChange(arrayField, newArray);
  };

  const addArrayItem = (arrayField, emptyItem) => {
    handleDetailsChange(arrayField, [...formData.details[arrayField], emptyItem]);
  };

  const removeArrayItem = (arrayField, index) => {
    const newArray = formData.details[arrayField].filter((_, i) => i !== index);
    handleDetailsChange(arrayField, newArray);
  };

  const handleFileUpload = async (e, type, index = null) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const data = new FormData();
    data.append("image", file);

    try {
      const response = await fetch(`${BASE_URL}/partners/upload`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: data,
      });
      const res = await response.json();
      if (res.success) {
        if (type === "hero") {
          handleInputChange("image", res.url);
        } else if (type === "project") {
          handleArrayChange("projects", index, "image", res.url);
        } else if (type === "blog") {
          handleArrayChange("blogPosts", index, "image", res.url);
        }
        toast.success("Image uploaded!");
      }
    } catch (err) {
      toast.error("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.param) {
      toast.error("Name and URL are required");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/partners/my-partnership`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success) {
        toast.success("Portfolio created successfully!");
        navigate(`/partnership/${formData.param}`);
      } else {
        toast.error(data.message || "Failed to create portfolio");
      }
    } catch (err) {
      toast.error("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white selection:bg-yellow-500 font-sans p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="flex justify-between items-center mb-16">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate(-1)} className="p-3 bg-zinc-900 rounded-2xl hover:bg-zinc-800 transition-all">
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="text-3xl font-black uppercase italic tracking-tighter">Creator Studio</h1>
              <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Influencer Digital Architecture</p>
            </div>
          </div>
          <button 
            onClick={handleSubmit}
            disabled={loading}
            className="px-8 py-4 bg-yellow-500 text-black font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-yellow-400 transition-all flex items-center gap-3 shadow-xl shadow-yellow-500/20 disabled:opacity-50"
          >
            {loading ? <LoadingSpinner size="xs" /> : <><Save size={16} /> Deploy Portfolio</>}
          </button>
        </header>

        <form className="space-y-24 pb-24">
          {/* Identity Section */}
          <section className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-12">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-1 bg-yellow-500" />
                  <span className="text-yellow-500 font-black uppercase tracking-widest text-sm italic">01. Identity</span>
                </div>
                <h2 className="text-5xl font-black uppercase leading-none">Who Are You?</h2>
              </div>

              <div className="space-y-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-1">Full Name</label>
                  <input 
                    type="text" 
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="e.g. Lara Elizabeth"
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-6 py-5 text-white focus:border-yellow-500 outline-none font-bold italic text-lg transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-1">Portfolio URL Identifier</label>
                  <div className="relative">
                    <span className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-600 font-bold italic">socialbureau.com/partnership/</span>
                    <input 
                      type="text" 
                      value={formData.param}
                      onChange={(e) => handleInputChange("param", e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))}
                      placeholder="lara-official"
                      className={`w-full bg-zinc-900 border ${paramError ? 'border-red-500/50' : slugAvailable ? 'border-green-500/50' : 'border-zinc-800'} rounded-2xl pl-[230px] pr-12 py-5 text-white focus:border-yellow-500 outline-none font-bold italic transition-all`}
                    />
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 flex items-center">
                      {checkingSlug && <div className="w-4 h-4 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin" />}
                      {!checkingSlug && slugAvailable && <Check size={16} className="text-green-500" />}
                      {!checkingSlug && slugAvailable === false && <X size={16} className="text-red-500" />}
                    </div>
                  </div>
                  {paramError && <p className="text-[10px] font-black uppercase tracking-widest text-red-500 ml-1 mt-1">{paramError}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-1">Headline / Primary Role</label>
                  <input 
                    type="text" 
                    value={formData.subtitle}
                    onChange={(e) => handleInputChange("subtitle", e.target.value)}
                    placeholder="Web Designer & Developer"
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-6 py-5 text-white focus:border-yellow-500 outline-none font-medium italic transition-all"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-1">CTA Headline (Bottom Section)</label>
                    <input 
                      type="text" 
                      value={formData.details.ctaTitle}
                      onChange={(e) => handleDetailsChange("ctaTitle", e.target.value)}
                      placeholder="Ready to Scale Your Brand?"
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-6 py-5 text-white focus:border-yellow-500 outline-none font-medium italic transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-1">CTA Subtitle</label>
                    <input 
                      type="text" 
                      value={formData.details.ctaSubtitle}
                      onChange={(e) => handleDetailsChange("ctaSubtitle", e.target.value)}
                      placeholder="Let's create viral content together."
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-6 py-5 text-white focus:border-yellow-500 outline-none font-medium italic transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="relative group">
              <div className="aspect-[4/5] bg-zinc-900 rounded-[40px] overflow-hidden border-4 border-zinc-800 relative shadow-2xl transition-all group-hover:border-yellow-500/50">
                {formData.image ? (
                  <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center gap-4 text-zinc-700">
                    <ImageIcon size={64} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Identity Visual</span>
                  </div>
                )}
                <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center cursor-pointer gap-2">
                  <Upload size={32} />
                  <span className="text-[10px] font-black uppercase tracking-widest italic">Change Portrait</span>
                  <input type="file" className="hidden" onChange={(e) => handleFileUpload(e, "hero")} accept="image/*" />
                </label>
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-yellow-500 rounded-3xl flex items-center justify-center text-black shadow-2xl z-20 group-hover:scale-110 transition-transform">
                <Sparkles size={40} />
              </div>
            </div>
          </section>

          {/* Social Presence Section */}
          <section className="space-y-12">
            <div className="flex items-center gap-3">
              <div className="w-12 h-1 bg-yellow-500" />
              <span className="text-yellow-500 font-black uppercase tracking-widest text-sm italic">02. Digital Footprint</span>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {formData.details.socialLinks.map((link, i) => (
                <div key={i} className="bg-zinc-900 border border-zinc-800 p-8 rounded-[32px] space-y-6 relative group transition-all hover:border-yellow-500/30">
                  <button onClick={() => removeArrayItem("socialLinks", i)} className="absolute top-4 right-4 text-zinc-700 hover:text-red-500"><Trash2 size={16} /></button>
                  <div className="w-12 h-12 bg-zinc-800 rounded-2xl flex items-center justify-center text-yellow-500 group-hover:bg-yellow-500 group-hover:text-black transition-all">
                    {link.platform === "Instagram" ? <Instagram size={24} /> : 
                     link.platform === "YouTube" ? <Youtube size={24} /> : 
                     link.platform === "Twitter" ? <Twitter size={24} /> : <Globe size={24} />}
                  </div>
                  <div className="space-y-4">
                    <select 
                      value={link.platform}
                      onChange={(e) => handleArrayChange("socialLinks", i, "platform", e.target.value)}
                      className="w-full bg-transparent border-b border-zinc-800 pb-2 text-xs font-black uppercase tracking-widest focus:border-yellow-500 outline-none"
                    >
                      <option className="bg-zinc-900">Instagram</option>
                      <option className="bg-zinc-900">YouTube</option>
                      <option className="bg-zinc-900">Twitter</option>
                      <option className="bg-zinc-900">LinkedIn</option>
                      <option className="bg-zinc-900">TikTok</option>
                    </select>
                    <input 
                      type="text"
                      value={link.url}
                      onChange={(e) => handleArrayChange("socialLinks", i, "url", e.target.value)}
                      placeholder="Profile URL"
                      className="w-full bg-transparent text-xs font-medium text-zinc-400 outline-none"
                    />
                    <input 
                      type="text"
                      value={link.followers}
                      onChange={(e) => handleArrayChange("socialLinks", i, "followers", e.target.value)}
                      placeholder="Followers (e.g. 100K)"
                      className="w-full bg-transparent text-xl font-black italic outline-none text-yellow-500"
                    />
                  </div>
                </div>
              ))}
              <button 
                type="button"
                onClick={() => addArrayItem("socialLinks", { platform: "Instagram", url: "", followers: "" })}
                className="bg-zinc-900/50 border-2 border-dashed border-zinc-800 rounded-[32px] flex flex-col items-center justify-center gap-4 hover:border-yellow-500/50 hover:bg-zinc-900 transition-all group p-8"
              >
                <div className="w-12 h-12 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-700 group-hover:text-yellow-500 transition-colors">
                  <Plus size={24} />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-700 group-hover:text-zinc-400">Add Platform</span>
              </button>
            </div>
          </section>

          {/* Gallery Section */}
          <section className="space-y-12">
            <div className="flex justify-between items-end">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-1 bg-yellow-500" />
                  <span className="text-yellow-500 font-black uppercase tracking-widest text-sm italic">03. Visual Narrative</span>
                </div>
                <h2 className="text-5xl font-black uppercase leading-none">The Gallery</h2>
              </div>
              <button 
                type="button"
                onClick={() => addArrayItem("projects", { title: "", description: "", image: "" })}
                className="px-6 py-3 bg-zinc-900 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-zinc-800 transition-all flex items-center gap-2"
              >
                <Plus size={14} /> Add Artifact
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {formData.details.projects.map((project, i) => (
                <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-[40px] p-8 flex flex-col md:flex-row gap-8 relative transition-all hover:border-yellow-500/20 group">
                  <button onClick={() => removeArrayItem("projects", i)} className="absolute top-6 right-6 text-zinc-700 hover:text-red-500"><Trash2 size={16} /></button>
                  <div className="w-full md:w-1/3 aspect-square bg-black rounded-3xl overflow-hidden relative border border-zinc-800 group-hover:border-yellow-500/30">
                    {project.image ? (
                      <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-zinc-800">
                        <ImageIcon size={32} />
                      </div>
                    )}
                    <label className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                      <Upload size={20} />
                      <input type="file" className="hidden" onChange={(e) => handleFileUpload(e, "project", i)} accept="image/*" />
                    </label>
                  </div>
                  <div className="flex-1 space-y-4 pt-4">
                    <input 
                      type="text"
                      value={project.title}
                      onChange={(e) => handleArrayChange("projects", i, "title", e.target.value)}
                      placeholder="Artifact Title"
                      className="w-full bg-transparent text-xl font-black italic uppercase tracking-tight outline-none focus:text-yellow-500 transition-colors"
                    />
                    <textarea 
                      value={project.description}
                      onChange={(e) => handleArrayChange("projects", i, "description", e.target.value)}
                      placeholder="Brief narrative of this project..."
                      className="w-full bg-transparent text-xs text-zinc-500 h-24 outline-none resize-none"
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Blog Section */}
          <section className="space-y-12 bg-zinc-950 p-12 rounded-[50px] border border-zinc-900">
            <div className="flex justify-between items-end">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-1 bg-yellow-500" />
                  <span className="text-yellow-500 font-black uppercase tracking-widest text-sm italic">04. Insights</span>
                </div>
                <h2 className="text-5xl font-black uppercase leading-none text-zinc-200">The Feed</h2>
              </div>
              <button 
                type="button"
                onClick={() => addArrayItem("blogPosts", { title: "", description: "", image: "", date: "", category: "" })}
                className="px-6 py-3 bg-zinc-900 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-yellow-500 hover:text-black transition-all flex items-center gap-2 border border-zinc-800"
              >
                <Plus size={14} /> New Post
              </button>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {formData.details.blogPosts.map((post, i) => (
                <div key={i} className="bg-zinc-900 rounded-[32px] overflow-hidden border border-zinc-800 hover:border-yellow-500/20 transition-all group">
                  <div className="aspect-video bg-black relative">
                    {post.image ? <img src={post.image} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-zinc-800"><ImageIcon size={24} /></div>}
                    <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                      <Upload size={20} />
                      <input type="file" className="hidden" onChange={(e) => handleFileUpload(e, "blog", i)} accept="image/*" />
                    </label>
                  </div>
                  <div className="p-8 space-y-4">
                    <div className="flex justify-between items-center">
                      <input 
                        type="text" 
                        value={post.category} 
                        onChange={(e) => handleArrayChange("blogPosts", i, "category", e.target.value)}
                        placeholder="Category"
                        className="bg-transparent text-[8px] font-black uppercase tracking-[0.3em] text-yellow-500 outline-none w-1/2"
                      />
                      <input 
                        type="text" 
                        value={post.date} 
                        onChange={(e) => handleArrayChange("blogPosts", i, "date", e.target.value)}
                        placeholder="Date"
                        className="bg-transparent text-[8px] font-black uppercase tracking-widest text-zinc-600 outline-none text-right w-1/2"
                      />
                    </div>
                    <input 
                      type="text" 
                      value={post.title} 
                      onChange={(e) => handleArrayChange("blogPosts", i, "title", e.target.value)}
                      placeholder="Post Headline"
                      className="w-full bg-transparent text-lg font-black italic tracking-tighter outline-none focus:text-white transition-colors"
                    />
                    <textarea 
                      value={post.description} 
                      onChange={(e) => handleArrayChange("blogPosts", i, "description", e.target.value)}
                      placeholder="Post excerpt..."
                      className="w-full bg-transparent text-[10px] text-zinc-500 h-20 outline-none resize-none leading-relaxed"
                    />
                    <button type="button" onClick={() => removeArrayItem("blogPosts", i)} className="text-[8px] font-black uppercase tracking-widest text-red-500/50 hover:text-red-500 transition-colors">Delete Post</button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Testimonials & Services */}
          <section className="grid lg:grid-cols-2 gap-16">
            <div className="space-y-12">
               <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-1 bg-yellow-500" />
                  <span className="text-yellow-500 font-black uppercase tracking-widest text-sm italic">05. Authority</span>
                </div>
                <h2 className="text-4xl font-black uppercase">Services</h2>
              </div>
              <div className="space-y-6">
                {formData.details.services.map((service, i) => (
                  <div key={i} className="flex gap-6 items-start">
                    <div className="w-12 h-12 bg-zinc-900 rounded-2xl flex items-center justify-center text-yellow-500 shrink-0 italic font-black">S{i+1}</div>
                    <div className="flex-1 space-y-2">
                      <input 
                        type="text" 
                        value={service.title} 
                        onChange={(e) => handleArrayChange("services", i, "title", e.target.value)}
                        className="bg-transparent text-xl font-black italic uppercase tracking-tight outline-none focus:text-yellow-500 w-full"
                      />
                      <input 
                        type="text" 
                        value={service.description} 
                        onChange={(e) => handleArrayChange("services", i, "description", e.target.value)}
                        placeholder="Brief description of this service"
                        className="bg-transparent text-xs text-zinc-500 outline-none w-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-12">
               <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-1 bg-yellow-500" />
                  <span className="text-yellow-500 font-black uppercase tracking-widest text-sm italic">06. Proof</span>
                </div>
                <h2 className="text-4xl font-black uppercase">Feedback</h2>
              </div>
              <div className="space-y-6">
                {formData.details.testimonials.map((t, i) => (
                  <div key={i} className="bg-zinc-900 p-8 rounded-[32px] space-y-4">
                    <textarea 
                      value={t.quote} 
                      onChange={(e) => handleArrayChange("testimonials", i, "quote", e.target.value)}
                      placeholder="Greatest feedback ever received..."
                      className="w-full bg-transparent text-sm italic text-zinc-400 outline-none h-24 resize-none"
                    />
                    <input 
                      type="text" 
                      value={t.author} 
                      onChange={(e) => handleArrayChange("testimonials", i, "author", e.target.value)}
                      placeholder="Author Name"
                      className="bg-transparent text-[10px] font-black uppercase tracking-widest text-yellow-500 outline-none"
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        </form>
      </div>

      <style>{`
        input::placeholder, textarea::placeholder {
          color: #27272a;
          text-transform: uppercase;
          font-weight: 900;
          letter-spacing: 0.1em;
          font-size: 0.7rem;
          font-style: normal;
        }
      `}</style>
    </div>
  );
};

export default InfluencerDataForm;
