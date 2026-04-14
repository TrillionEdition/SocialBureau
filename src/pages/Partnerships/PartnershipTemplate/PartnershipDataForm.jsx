import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { User, Briefcase, Globe, Share2, Image as ImageIcon, Save, ArrowRight, ArrowLeft, CheckCircle, Upload, Loader2, X, Plus, Trash2, Link as LinkIcon, MessageSquare, Layout } from "lucide-react";
import { BASE_URL } from "../../../../utils/urls";
import { getUserData } from "../../../../utils/authUtils";
import { toast } from "react-toastify";

const PartnershipDataForm = ({ initialData, onSave }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [fetchingData, setFetchingData] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  
  // Initialize from props or fetch from API
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

  const wordLimit = {
    name: 8,
    subtitle: 15,
    bio: 150,
  };

  const getWordCount = (str) => str.trim() === "" ? 0 : str.trim().split(/\s+/).length;

  useEffect(() => {
    const fetchExistingData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setFetchingData(false);
        return;
      }

      try {
        const response = await fetch(`${BASE_URL}/partners/my-partnership`, {
          headers: { "Authorization": `Bearer ${token}` }
        });
        const data = await response.json();
        if (data.success && data.data) {
          // Merge existing data into state
          setFormData({
            ...data.data,
            details: {
              ...formData.details,
              ...(data.data.details || {})
            }
          });
        }
      } catch (err) {
        console.error("Failed to fetch existing data", err);
      } finally {
        setFetchingData(false);
      }
    };

    fetchExistingData();
  }, []);

  React.useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        details: initialData.details || formData.details,
      });
    }
  }, [initialData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDetailChange = (path, value) => {
    const newDetails = { ...formData.details };
    const keys = path.split(".");
    let current = newDetails;
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;
    setFormData((prev) => ({ ...prev, details: newDetails }));
  };

  const handleArrayChange = (field, index, subfield, value) => {
    const newArray = [...formData.details[field]];
    newArray[index][subfield] = value;
    handleDetailChange(field, newArray);
  };

  // Check authentication on mount
  React.useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/partners/login?redirect=/partners/create-portfolio");
    }
  }, [navigate]);

  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setError("Image size must be less than 5MB");
      return;
    }

    setUploading(true);
    setError("");

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch(`${BASE_URL}/partners/upload`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        setFormData(prev => ({ ...prev, image: data.url }));
      } else {
        setError(data.message || "Failed to upload image");
      }
    } catch (err) {
      setError("An error occurred during upload");
    } finally {
      setUploading(false);
    }
  };

  const removeImage = () => {
    setFormData(prev => ({ ...prev, image: "" }));
  };

  const handleProjectFileUpload = async (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    setError("");

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

      const result = await response.json();
      if (result.success) {
        handleArrayChange("projects", index, "image", result.url);
      } else {
        setError(result.message || "Upload failed");
      }
    } catch (err) {
      setError("Upload error occurred");
    } finally {
      setUploading(false);
    }
  };

  const addArrayItem = (field, item) => {
    handleDetailChange(field, [...formData.details[field], item]);
  };

  const removeArrayItem = (field, index) => {
    const newArray = formData.details[field].filter((_, i) => i !== index);
    handleDetailChange(field, newArray);
  };

  const steps = [
    { title: "Identity", icon: User },
    { title: "Vision", icon: Briefcase },
    { title: "Core", icon: Globe },
    { title: "Projects", icon: Layout },
    { title: "Verified", icon: MessageSquare },
    { title: "Connect", icon: Share2 },
  ];
  const WordCounter = ({ current, limit, label }) => {
    const count = getWordCount(current);
    const isOver = count > limit;
    return (
      <div className="flex justify-between items-center mb-2">
        <label className="text-sm font-medium text-gray-400">{label}</label>
        <span className={`text-[10px] font-black px-2 py-0.5 rounded ${isOver ? "bg-red-500 text-white" : "bg-zinc-800 text-zinc-500"}`}>
          {count}/{limit} WORDS
        </span>
      </div>
    );
  };

  const handleFillSampleData = () => {
    setFormData((prev) => ({
      ...prev,
      name: "ALEX RIVERA",
      subtitle: "Creative Technologist & Digital Architect",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2574&auto=format&fit=crop",
      details: {
        bio: "Crafting digital experiences at the intersection of design and code. I specialize in building high-performance, visually stunning applications that push the boundaries of the web.",
        services: [
          { title: "Digital Architecture", description: "Designing scalable, robust systems that form the backbone of modern web applications." },
          { title: "Interactive Design", description: "Creating fluid, responsive interfaces that engage users and tell compelling stories." },
          { title: "Technical Strategy", description: "Consulting on the best technologies and practices to achieve your business goals." }
        ],
        projects: [
          { title: "Aether Platform", description: "A next-generation cloud management interface with real-time data visualization.", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop" },
          { title: "Lumina Brand", description: "Complete digital identity for a sustainable fashion house, focusing on minimalism.", image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2670&auto=format&fit=crop" },
          { title: "Nexus Core", description: "High-performance API gateway with advanced security and monitoring features.", image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2668&auto=format&fit=crop" },
          { title: "Vortex UI", description: "A comprehensive design system built for speed and accessibility.", image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2670&auto=format&fit=crop" }
        ],
        testimonials: [
          { quote: "Alex transformed our vision into a reality that exceeded our wildest expectations. The attention to detail is unmatched.", author: "Sarah Jenkins, CEO at TechFlow" },
          { quote: "Working with Alex was a game-changer for our product. The technical expertise and design sensibility are a rare combination.", author: "Marcus Thorne, Head of Product at Innovate" }
        ],
        socialLinks: [
          { platform: "linkedin", url: "https://linkedin.com" },
          { platform: "twitter", url: "https://twitter.com" },
          { platform: "github", url: "https://github.com" },
          { platform: "instagram", url: "https://instagram.com" }
        ]
      }
    }));
    toast.info("Form filled with sample portfolio data!");
  };

  const handleSubmit = async () => {
    if (getWordCount(formData.name) > wordLimit.name) {
      toast.error(`Name exceeds limit (${wordLimit.name} words)`);
      return;
    }
    if (getWordCount(formData.subtitle) > wordLimit.subtitle) {
      toast.error(`Subtitle exceeds limit (${wordLimit.subtitle} words)`);
      return;
    }
    if (getWordCount(formData.details.bio) > wordLimit.bio) {
      toast.error(`Vision/Bio exceeds limit (${wordLimit.bio} words)`);
      return;
    }

    setLoading(true);
    setError("");
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
        toast.success("Portfolio updated successfully!");
        navigate("/partners/dashboard");
      } else {
        setError(data.message || "Failed to save");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (fetchingData) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
           <Loader2 className="w-12 h-12 text-lime-400 animate-spin" />
           <p className="text-zinc-500 font-bold uppercase tracking-widest text-xs">Syncing existing content...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4 tracking-tight">Create Your Portfolio</h1>
          <div className="flex gap-4">
            {steps.map((s, i) => (
              <div key={i} className={`flex-1 h-1 rounded-full ${i <= step ? "bg-lime-400" : "bg-zinc-800"}`} />
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {success ? (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-20">
              <CheckCircle className="w-20 h-20 text-lime-400 mx-auto mb-6" />
              <h2 className="text-3xl font-bold mb-2">Portfolio Generated!</h2>
              <p className="text-gray-400">Redirecting to your new page...</p>
            </motion.div>
          ) : (
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8 bg-zinc-900/50 border border-zinc-800 p-8 rounded-3xl backdrop-blur-xl"
            >
              {step === 0 && (
                <div className="space-y-6">
                  <div>
                    <WordCounter current={formData.name} limit={wordLimit.name} label="Display Name" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g. John Doe Consulting"
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-lime-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">URL Slug (socialbureau.in/partnership/your-slug)</label>
                    <input
                      type="text"
                      name="param"
                      value={formData.param}
                      onChange={handleInputChange}
                      placeholder="e.g. john-doe"
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-lime-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-4">Hero Image</label>
                    <div className="space-y-4">
                      {formData.image ? (
                        <div className="flex items-center justify-between px-6 py-3 bg-zinc-900/50 border border-zinc-800 rounded-2xl group">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-lg overflow-hidden border border-zinc-700">
                              <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                            </div>
                            <div>
                              <p className="text-white text-xs font-bold">Hero Image Selected</p>
                              <p className="text-zinc-500 text-[10px] uppercase">Upload a new one to replace</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <label className="p-2 bg-zinc-800 hover:bg-lime-400/10 hover:text-lime-400 rounded-xl transition-colors cursor-pointer">
                              <Upload size={16} />
                              <input type="file" className="hidden" accept="image/*" onChange={handleFileSelect} disabled={uploading} />
                            </label>
                            <button onClick={removeImage} className="p-2 bg-zinc-800 hover:bg-red-400/10 hover:text-red-400 rounded-xl transition-colors">
                              <X size={16} />
                            </button>
                          </div>
                        </div>
                      ) : (
                        <label className="flex items-center justify-between px-6 py-4 border-2 border-dashed border-zinc-800 rounded-2xl cursor-pointer hover:border-lime-400 hover:bg-zinc-900/50 transition-all group">
                          {uploading ? (
                            <div className="flex items-center gap-3">
                              <Loader2 className="w-5 h-5 text-lime-400 animate-spin" />
                              <span className="text-zinc-500 font-medium text-sm">Uploading...</span>
                            </div>
                          ) : (
                            <>
                              <div className="flex items-center gap-4">
                                <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 group-hover:border-lime-400 group-hover:bg-lime-400/10 transition-colors">
                                  <Upload size={18} className="text-zinc-500 group-hover:text-lime-400" />
                                </div>
                                <div className="text-left">
                                  <p className="text-white font-bold text-sm">Upload Hero Image</p>
                                  <p className="text-zinc-500 text-[10px] uppercase tracking-widest">PNG, JPG or WEBP</p>
                                </div>
                              </div>
                              <span className="text-zinc-600 text-[10px] font-black border border-zinc-800 px-2 py-1 rounded-md group-hover:text-lime-400 group-hover:border-lime-400 transition-colors uppercase">Select File</span>
                            </>
                          )}
                          <input type="file" className="hidden" accept="image/*" onChange={handleFileSelect} disabled={uploading} />
                        </label>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {step === 1 && (
                <div className="space-y-6">
                  <div>
                    <WordCounter current={formData.subtitle} limit={wordLimit.subtitle} label="Professional Headline" />
                    <input
                      type="text"
                      name="subtitle"
                      value={formData.subtitle}
                      onChange={handleInputChange}
                      placeholder="e.g. Strategic Advisor & Growth Specialist"
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-lime-400"
                    />
                  </div>
                  <div>
                    <WordCounter current={formData.details.bio} limit={wordLimit.bio} label="Biography / Vision Statement" />
                    <textarea
                      value={formData.details.bio}
                      onChange={(e) => handleDetailChange("bio", e.target.value)}
                      placeholder="Share your story and vision..."
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 h-48 outline-none focus:ring-2 focus:ring-lime-400 resize-none leading-relaxed"
                    />
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <label className="block text-sm font-medium text-gray-400">Core Services</label>
                    <button onClick={() => addArrayItem("services", { title: "", description: "" })} className="text-lime-400 text-sm font-bold flex items-center gap-2">
                       <Plus size={16} /> Add Service
                    </button>
                  </div>
                  <div className="grid grid-cols-1 gap-4">
                    {formData.details.services.map((s, i) => (
                      <div key={i} className="p-6 bg-zinc-800/50 rounded-2xl border border-zinc-700 space-y-4 relative group">
                        <button onClick={() => removeArrayItem("services", i)} className="absolute top-4 right-4 text-zinc-600 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100">
                          <Trash2 size={18} />
                        </button>
                        <input
                          value={s.title}
                          onChange={(e) => handleArrayChange("services", i, "title", e.target.value)}
                          placeholder="Service Name (e.g. Strategic Advisory)"
                          className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-lime-400"
                        />
                        <textarea
                          value={s.description}
                          onChange={(e) => handleArrayChange("services", i, "description", e.target.value)}
                          placeholder="What do you deliver?"
                          className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 h-24 outline-none focus:ring-2 focus:ring-lime-400 resize-none"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <label className="block text-sm font-medium text-gray-400">Selected Projects</label>
                    <button onClick={() => addArrayItem("projects", { title: "", description: "", image: "" })} className="text-lime-400 text-sm font-bold flex items-center gap-2">
                      <Plus size={16} /> Add Project
                    </button>
                  </div>
                  <div className="grid grid-cols-1 gap-4">
                    {formData.details.projects.map((p, i) => (
                      <div key={i} className="p-6 bg-zinc-800/50 rounded-2xl border border-zinc-700 space-y-4 relative group">
                        <button onClick={() => removeArrayItem("projects", i)} className="absolute top-4 right-4 text-zinc-600 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100">
                          <Trash2 size={18} />
                        </button>
                        <input
                          value={p.title}
                          onChange={(e) => handleArrayChange("projects", i, "title", e.target.value)}
                          placeholder="Project Title"
                          className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-lime-400"
                        />
                        <div className="flex items-center gap-3">
                           <div className="relative flex-1">
                             <input
                               value={p.image}
                               onChange={(e) => handleArrayChange("projects", i, "image", e.target.value)}
                               placeholder="Project image URL"
                               className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-lime-400 text-sm"
                             />
                           </div>
                           <label className="p-3 bg-zinc-900 hover:bg-lime-400/10 hover:text-lime-400 border border-zinc-800 rounded-xl transition-all cursor-pointer">
                              <Upload size={18} />
                              <input type="file" className="hidden" accept="image/*" onChange={(e) => handleProjectFileUpload(e, i)} disabled={uploading} />
                           </label>
                           {p.image && (
                              <div className="w-12 h-11 rounded-xl overflow-hidden border border-zinc-700">
                                <img src={p.image} alt="Prev" className="w-full h-full object-cover" />
                              </div>
                           )}
                        </div>
                        <textarea
                          value={p.description}
                          onChange={(e) => handleArrayChange("projects", i, "description", e.target.value)}
                          placeholder="Describe the impact..."
                          className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 h-24 outline-none focus:ring-2 focus:ring-lime-400 resize-none"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <label className="block text-sm font-medium text-gray-400">Client Testimonials</label>
                    <button onClick={() => addArrayItem("testimonials", { quote: "", author: "" })} className="text-lime-400 text-sm font-bold flex items-center gap-2">
                       <Plus size={16} /> Add Testimonial
                    </button>
                  </div>
                  {formData.details.testimonials.map((t, i) => (
                    <div key={i} className="p-6 bg-zinc-800/50 rounded-2xl border border-zinc-700 space-y-4 relative group">
                       <button onClick={() => removeArrayItem("testimonials", i)} className="absolute top-4 right-4 text-zinc-600 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100">
                          <Trash2 size={18} />
                        </button>
                       <textarea
                         value={t.quote}
                         onChange={(e) => handleArrayChange("testimonials", i, "quote", e.target.value)}
                         placeholder="The work was exceptional..."
                         className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 h-24 outline-none focus:ring-2 focus:ring-lime-400 resize-none italic"
                       />
                       <input
                          value={t.author}
                          onChange={(e) => handleArrayChange("testimonials", i, "author", e.target.value)}
                          placeholder="Author Name & Company"
                          className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-lime-400"
                        />
                    </div>
                  ))}
                </div>
              )}

              {step === 5 && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <label className="block text-sm font-medium text-gray-400 px-1">Connect Channels (Optional)</label>
                    <button 
                      onClick={() => addArrayItem("socialLinks", { platform: "LinkedIn", url: "" })} 
                      className="text-lime-400 text-sm font-bold flex items-center gap-2"
                    >
                      <Plus size={16} /> Add Link
                    </button>
                  </div>
                  <div className="grid grid-cols-1 gap-3">
                    {formData.details.socialLinks.map((link, i) => (
                      <div key={i} className="flex gap-3 items-center group">
                        <select
                          value={link.platform}
                          onChange={(e) => handleArrayChange("socialLinks", i, "platform", e.target.value)}
                          className="bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-lime-400 text-sm min-w-[140px]"
                        >
                          <option>LinkedIn</option>
                          <option>Twitter</option>
                          <option>Instagram</option>
                          <option>GitHub</option>
                          <option>Behance</option>
                          <option>Dribbble</option>
                          <option>Website</option>
                        </select>
                        <div className="relative flex-1">
                          <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
                          <input
                            type="text"
                            value={link.url}
                            onChange={(e) => handleArrayChange("socialLinks", i, "url", e.target.value)}
                            placeholder="https://..."
                            className="w-full bg-zinc-800 border border-zinc-700 rounded-xl pl-11 pr-4 py-3 outline-none focus:ring-2 focus:ring-lime-400 text-sm"
                          />
                        </div>
                        <button 
                          onClick={() => removeArrayItem("socialLinks", i)} 
                          className="p-3 text-zinc-500 hover:text-red-400 transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    ))}
                    {formData.details.socialLinks.length === 0 && (
                      <div className="text-center py-10 border-2 border-dashed border-zinc-800 rounded-2xl">
                        <p className="text-zinc-600 text-sm">No social links added. These are optional.</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <div className="flex justify-between pt-8">
                <button
                  disabled={step === 0}
                  onClick={() => setStep(s => s - 1)}
                  className="px-6 py-3 rounded-full border border-zinc-700 disabled:opacity-30 flex items-center gap-2 hover:bg-zinc-800 transition"
                >
                  <ArrowLeft size={18} /> Back
                </button>
                {step < steps.length - 1 ? (
                  <button
                    onClick={() => setStep(s => s + 1)}
                    className="px-8 py-3 rounded-full bg-white text-black font-bold flex items-center gap-2 hover:bg-gray-200 transition"
                  >
                    Continue <ArrowRight size={18} />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="px-8 py-3 rounded-full bg-lime-400 text-black font-bold flex items-center gap-2 hover:bg-lime-500 transition disabled:opacity-50"
                  >
                    {loading ? "Saving..." : "Create Portfolio"} <Save size={18} />
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default PartnershipDataForm;
