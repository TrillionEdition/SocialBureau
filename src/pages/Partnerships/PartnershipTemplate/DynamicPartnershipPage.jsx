import React, { useEffect, useState, useCallback, useRef } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "@/utils/urls";
import LoadingSpinner from "../../../components/LoadingSpinner";
import ModernTemplate from "./ModernTemplate";
import { Edit3, X, Save, Palette, Type, Maximize2, Check, Layout, Sparkles, Image as ImageIcon, Trash2 } from "lucide-react";
import { useAuth, fetchWithAuth } from "@/utils/authUtils";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";

// Add other templates here as they are created
const templates = {
  template1: ModernTemplate,
  modern: ModernTemplate,
};

const DynamicPartnershipPage = () => {
  const { slug } = useParams();
  const [partner, setPartner] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editableData, setEditableData] = useState(null);
  const [activeTab, setActiveTab] = useState("styles");
  const [saving, setSaving] = useState(false);
  const { isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (
      !window.confirm(
        "Are you sure you want to delete this portfolio and the associated user? This action cannot be undone."
      )
    ) {
      return;
    }

    try {
      const delRes = await fetchWithAuth(
        `${BASE_URL}/partners/${partner._id}`,
        {
          method: "DELETE",
        }
      );
      const delData = await delRes.json();

      if (delData.success) {
        toast.success("Portfolio and user deleted successfully");
        navigate("/partners/dashboard");
      } else {
        toast.error(delData.message || "Failed to delete");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error deleting portfolio");
    }
  };
  const scrollTimeout = useRef(null);

  const sectionMapping = {
    // Styles
    heroBg: 'hero-section',
    heroNameFontSize: 'hero-section',
    heroSubtitleFontSize: 'hero-section',
    heroFont: 'hero-section',
    heroImageScale: 'hero-section',
    
    bioBg: 'narrative-section',
    bioFontSize: 'narrative-section',
    bioFont: 'narrative-section',
    
    projectsBg: 'projects-section',
    projectTitleFontSize: 'projects-section',
    projectBodyFontSize: 'projects-section',
    sectionTitleFontSize: 'projects-section',
    projectImageScale: 'projects-section',
    
    servicesBg: 'expertise-section',
    serviceTitleFontSize: 'expertise-section',
    serviceBodyFontSize: 'expertise-section',
    
    testimonialsBg: 'testimonials-section',
    testimonialQuoteFontSize: 'testimonials-section',
    testimonialAuthorFontSize: 'testimonials-section',
    testimonialFont: 'testimonials-section',
    
    footerBg: 'footer-section',
    footerTitleFontSize: 'footer-section',
    footerFont: 'footer-section',
    moduleFont: 'projects-section',
    cardFont: 'expertise-section',

    // Content
    name: 'hero-section',
    subtitle: 'hero-section',
    image: 'hero-section',
    bio: 'narrative-section',
    projects: 'projects-section',
    services: 'expertise-section',
    testimonials: 'testimonials-section',
    socialLinks: 'footer-section',
  };

  const scrollToSection = (sectionId) => {
    if (!sectionId) return;
    
    // Use a small timeout to ensure DOM is ready or to debounce
    if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    
    scrollTimeout.current = setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  useEffect(() => {
    const fetchPartner = async () => {
      try {
        const response = await fetch(`${BASE_URL}/partners/${slug}`);
        const data = await response.json();
        if (data.success) {
          setPartner(data.data);
          setEditableData(data.data);
          
          // Check ownership
          const storedUser = localStorage.getItem("user");
          if (storedUser) {
            const user = JSON.parse(storedUser);
            if (user._id === data.data.user || user.id === data.data.user) {
              setIsOwner(true);
            }
          }
        } else {
          setError(data.message || "Portfolio not found");
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to load portfolio. Please check your connection.");
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(() => {
      if (loading) {
        setLoading(false);
        setError("Request timed out. The server might be slow or unreachable.");
      }
    }, 12000); // 12 second timeout

    fetchPartner();
    return () => clearTimeout(timeoutId);
  }, [slug]);

  const handleUpdate = useCallback((updates) => {
    setEditableData((prev) => ({
      ...prev,
      ...updates,
      details: {
        ...prev.details,
        ...(updates.details || {}),
      },
    }));
  }, []);

  const handleFileUpload = async (e, type, index = null) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      setSaving(true);
      const response = await fetch(`${BASE_URL}/partners/upload`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: formData,
      });
      const data = await response.json();

      if (data.success) {
        if (type === "hero") {
          handleUpdate({ image: data.url });
        } else if (type === "project" && index !== null) {
          const newProjects = [...editableData.details.projects];
          newProjects[index].image = data.url;
          handleUpdate({ details: { ...editableData.details, projects: newProjects } });
        }
        toast.success("Media updated successfully");
      } else {
        toast.error(data.message || "Upload failed");
      }
    } catch (err) {
      toast.error("Network error during upload");
    } finally {
      setSaving(false);
    }
  };

  const handleStyleChange = (key, value) => {
    setEditableData((prev) => ({
      ...prev,
      details: {
        ...prev.details,
        styles: {
          ...(prev.details.styles || {}),
          [key]: value,
        },
      },
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      let endpoint = `${BASE_URL}/partners/my-partnership`;
      let method = "POST";

      // If admin is editing, use the specific partner ID
      if (isAdmin && partner?._id) {
        endpoint = `${BASE_URL}/partners/${partner._id}`;
        method = "PUT";
      }

      const response = await fetch(endpoint, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(editableData),
      });
      const data = await response.json();
      if (data.success) {
        toast.success("Portfolio updated successfully!");
        setPartner(editableData);
        setIsEditing(false);
      } else {
        toast.error(data.message || "Update failed");
      }
    } catch (err) {
      toast.error("Error saving changes");
    } finally {
      setSaving(false);
    }
  };

  if (loading || error) return (
    <div className="relative">
      <LoadingSpinner />
      {error && (
        <div className="absolute bottom-10 left-0 w-full text-center text-white/40 text-xs tracking-widest uppercase animate-pulse">
          {error}
        </div>
      )}
    </div>
  );

  const TemplateComponent = templates[editableData.templateId] || ModernTemplate;
  
  // Combine top-level fields with details for the template
  const templateProps = {
    ...editableData.details,
    name: editableData.name,
    subtitle: editableData.subtitle,
    image: editableData.image,
    styles: editableData.details?.styles || {},
  };

  return (
    <div className={`relative min-h-screen transition-all duration-500 ease-in-out ${isEditing ? "md:pr-[448px]" : ""}`}>
      <style>
        {`
          .custom-scrollbar::-webkit-scrollbar {
            width: 4px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: rgba(0, 0, 0, 0.2);
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: rgba(255, 255, 255, 0.2);
          }
        `}
      </style>
      {/* Edit Trigger - For Owner or Admin */}
      {(isOwner || isAdmin) && !isEditing && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={() => setIsEditing(true)}
          className="fixed top-8 right-8 z-[9999] bg-[var(--primary-color, #E8001A)] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center gap-3 group overflow-hidden"
          style={{ backgroundColor: editableData.details?.styles?.primaryColor || "#E8001A" }}
        >
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          <Edit3 size={20} className="relative z-10" />
          <span className="text-[10px] font-black uppercase tracking-widest relative z-10 pr-2">Customize</span>
        </motion.button>
      )}

      {/* Admin Delete Option */}
      {isAdmin && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={handleDelete}
          className="fixed top-24 right-8 z-[9998] bg-red-600/20 text-red-500 hover:bg-red-600 hover:text-white p-4 rounded-full shadow-2xl transition-all flex items-center gap-3 backdrop-blur-md border border-red-500/20"
          title="Delete Portfolio & User"
        >
          <Trash2 size={20} />
          <span className="text-[10px] font-black uppercase tracking-widest pr-2">Delete</span>
        </motion.button>
      )}

      {/* Editing Overlay/Sidebar */}
      <AnimatePresence>
        {isEditing && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/5 z-[10000] cursor-pointer"
              onClick={() => setIsEditing(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full md:w-[448px] bg-[#0A0A0A] border-l border-zinc-800 z-[10001] shadow-[-20px_0_60px_rgba(0,0,0,0.5)] flex flex-col font-sans"
            >
              {/* Header */}
              <div className="p-8 border-b border-zinc-800 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-black italic uppercase tracking-tight">Studio</h2>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 mt-1">Refining Your Legacy</p>
                </div>
                <button 
                  onClick={() => setIsEditing(false)}
                  className="p-3 bg-zinc-900 rounded-full hover:bg-white hover:text-black transition-all"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Tabs */}
              <div className="flex px-4 pt-4">
                {[
                  { id: "styles", icon: Palette, label: "Visuals" },
                  { id: "content", icon: Type, label: "Text" },
                  { id: "layout", icon: Layout, label: "Elements" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 py-4 flex flex-col items-center gap-2 border-b-2 transition-all ${activeTab === tab.id ? "border-[#E8001A] text-white" : "border-transparent text-zinc-600 hover:text-zinc-400"}`}
                    style={{ borderBottomColor: activeTab === tab.id ? (editableData.details?.styles?.primaryColor || "#E8001A") : "transparent" }}
                  >
                    <tab.icon size={18} />
                    <span className="text-[9px] font-black uppercase tracking-widest">{tab.label}</span>
                  </button>
                ))}
              </div>

              {/* Scrollable Content */}
              <div 
                className="flex-1 overflow-y-auto p-8 space-y-10 custom-scrollbar overscroll-contain"
                data-lenis-prevent
              >
                {activeTab === "styles" && (
                  <div className="space-y-8">
                    <div className="space-y-4">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">Global Aesthetics</label>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-3">
                          <span className="text-[10px] font-bold text-zinc-600 block uppercase">Primary Hue</span>
                          <div className="flex items-center gap-3 bg-zinc-900 p-2 rounded-xl border border-zinc-800">
                            <input 
                              type="color" 
                              value={editableData.details?.styles?.primaryColor || "#E8001A"}
                              onChange={(e) => handleStyleChange("primaryColor", e.target.value)}
                              onFocus={() => scrollToSection('hero-section')}
                              className="w-8 h-8 rounded-lg cursor-pointer border-none p-0 overflow-hidden"
                            />
                            <span className="text-xs font-mono uppercase text-zinc-400">
                              {(editableData.details?.styles?.primaryColor || "#E8001A").toUpperCase()}
                            </span>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <span className="text-[10px] font-bold text-zinc-600 block uppercase">Background</span>
                          <div className="flex items-center gap-3 bg-zinc-900 p-2 rounded-xl border border-zinc-800">
                            <input 
                              type="color" 
                              value={editableData.details?.styles?.backgroundColor || "#0A0A0A"}
                              onChange={(e) => handleStyleChange("backgroundColor", e.target.value)}
                              onFocus={() => scrollToSection('hero-section')}
                              className="w-8 h-8 rounded-lg cursor-pointer border-none p-0 overflow-hidden"
                            />
                            <span className="text-xs font-mono uppercase text-zinc-400">
                              {(editableData.details?.styles?.backgroundColor || "#0A0A0A").toUpperCase()}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-3">
                          <span className="text-[10px] font-bold text-zinc-600 block uppercase">Heading Color</span>
                          <div className="flex items-center gap-3 bg-zinc-900 p-2 rounded-xl border border-zinc-800">
                            <input 
                              type="color" 
                              value={editableData.details?.styles?.headingColor || "#FFFFFF"}
                              onChange={(e) => handleStyleChange("headingColor", e.target.value)}
                              onFocus={() => scrollToSection('hero-section')}
                              className="w-8 h-8 rounded-lg cursor-pointer border-none p-0 overflow-hidden"
                            />
                            <span className="text-xs font-mono uppercase text-zinc-400">
                              {(editableData.details?.styles?.headingColor || "#FFFFFF").toUpperCase()}
                            </span>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <span className="text-[10px] font-bold text-zinc-600 block uppercase">Paragraph Color</span>
                          <div className="flex items-center gap-3 bg-zinc-900 p-2 rounded-xl border border-zinc-800">
                            <input 
                              type="color" 
                              value={editableData.details?.styles?.paragraphColor || "#FFFFFF"}
                              onChange={(e) => handleStyleChange("paragraphColor", e.target.value)}
                              onFocus={() => scrollToSection('narrative-section')}
                              className="w-8 h-8 rounded-lg cursor-pointer border-none p-0 overflow-hidden"
                            />
                            <span className="text-xs font-mono uppercase text-zinc-400">
                              {(editableData.details?.styles?.paragraphColor || "#FFFFFF").toUpperCase()}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-6 bg-zinc-900/30 p-5 rounded-2xl border border-zinc-800/50">
                        <div className="grid grid-cols-2 gap-8">
                          <div className="space-y-3">
                            <div className="flex justify-between items-center">
                              <span className="text-[10px] font-bold text-zinc-400 uppercase">Noise Intensity</span>
                              <span className="text-[10px] font-mono text-[#E8001A]">{Math.round((parseFloat(editableData.details?.styles?.noiseOpacity) || 0) * 100)}%</span>
                            </div>
                            <input 
                              type="range" min="0" max="0.2" step="0.01"
                              value={parseFloat(editableData.details?.styles?.noiseOpacity) || 0}
                              onChange={(e) => handleStyleChange("noiseOpacity", e.target.value)}
                              onFocus={() => scrollToSection('hero-section')}
                              className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-[#E8001A]"
                            />
                          </div>
                          <div className="space-y-3">
                           <div className="grid grid-cols-2 gap-4">
                             <div className="space-y-3">
                               <div className="flex justify-between items-center">
                                 <span className="text-[10px] font-bold text-zinc-400 uppercase">Grid Intensity</span>
                                 <span className="text-[10px] font-mono text-[#E8001A]">{Math.round((parseFloat(editableData.details?.styles?.gridOpacity) || 0) * 100)}%</span>
                               </div>
                               <input 
                                 type="range" min="0" max="1" step="0.05"
                                 value={parseFloat(editableData.details?.styles?.gridOpacity) || 0}
                                 onChange={(e) => handleStyleChange("gridOpacity", e.target.value)}
                                 onFocus={() => scrollToSection('hero-section')}
                                 className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-[#E8001A]"
                               />
                             </div>
                             <div className="space-y-3">
                               <span className="text-[10px] font-bold text-zinc-400 uppercase block">Grid Color</span>
                               <div className="flex items-center gap-3 bg-zinc-900 p-2 rounded-xl border border-zinc-800">
                                 <input 
                                   type="color" 
                                   value={editableData.details?.styles?.gridColor || "#FFFFFF"}
                                   onChange={(e) => handleStyleChange("gridColor", e.target.value)}
                                   className="w-8 h-8 rounded-lg cursor-pointer border-none p-0 overflow-hidden"
                                 />
                                 <span className="text-[9px] font-mono uppercase text-zinc-500">
                                   {(editableData.details?.styles?.gridColor || "#FFFFFF").toUpperCase()}
                                 </span>
                               </div>
                             </div>
                           </div>
                         </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">Section Aesthetics (Backgrounds)</label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 bg-zinc-900/30 p-5 rounded-2xl border border-zinc-800/50">
                        {[
                          { id: "heroBg", label: "Hero" },
                          { id: "bioBg", label: "Narrative" },
                          { id: "projectsBg", label: "Portfolio" },
                          { id: "servicesBg", label: "Expertise" },
                          { id: "testimonialsBg", label: "Voices" },
                          { id: "footerBg", label: "Final Call" },
                        ].map((sec) => (
                          <div key={sec.id} className="space-y-2">
                            <span className="text-[9px] font-bold text-zinc-500 block uppercase">{sec.label}</span>
                            <div className="flex items-center gap-2 bg-zinc-900 p-1.5 rounded-lg border border-zinc-800">
                              <input 
                                type="color" 
                                value={editableData.details?.styles?.[sec.id] || editableData.details?.styles?.backgroundColor || "#0A0A0A"}
                                onChange={(e) => handleStyleChange(sec.id, e.target.value)}
                                onFocus={() => scrollToSection(sec.id === 'heroBg' ? 'hero-section' : sec.id === 'bioBg' ? 'narrative-section' : sec.id === 'projectsBg' ? 'projects-section' : sec.id === 'servicesBg' ? 'expertise-section' : sec.id === 'testimonialsBg' ? 'testimonials-section' : 'footer-section')}
                                className="w-6 h-6 rounded bg-transparent border-none cursor-pointer"
                              />
                              <span className="text-[9px] font-mono uppercase text-zinc-400">
                                {(editableData.details?.styles?.[sec.id] || editableData.details?.styles?.backgroundColor || "#0A0A0A").toUpperCase()}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-6">
                      {/* Hero Section Typography */}
                      <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">Section: Hero (Identity)</label>
                        <div className="space-y-6 bg-zinc-900/30 p-5 rounded-2xl border border-zinc-800/50">
                          <div className="space-y-3">
                            <div className="flex justify-between items-center">
                              <span className="text-[10px] font-bold text-zinc-400 uppercase">Primary Name Size</span>
                              <span className="text-[10px] font-mono text-[#E8001A]">{Math.round((parseFloat(editableData.details?.styles?.heroNameFontSize) || 1) * 100)}%</span>
                            </div>
                            <input 
                              type="range" min="0.5" max="2" step="0.05"
                              value={parseFloat(editableData.details?.styles?.heroNameFontSize) || 1}
                              onChange={(e) => handleStyleChange("heroNameFontSize", e.target.value)}
                              onFocus={() => scrollToSection('hero-section')}
                              className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-[#E8001A]"
                            />
                          </div>
                          <div className="space-y-3">
                            <div className="flex justify-between items-center">
                              <span className="text-[10px] font-bold text-zinc-400 uppercase">Subtitle Badge</span>
                              <span className="text-[10px] font-mono text-[#E8001A]">{Math.round((parseFloat(editableData.details?.styles?.heroSubtitleFontSize) || 1) * 100)}%</span>
                            </div>
                            <input 
                              type="range" min="0.5" max="2" step="0.05"
                              value={parseFloat(editableData.details?.styles?.heroSubtitleFontSize) || 1}
                              onChange={(e) => handleStyleChange("heroSubtitleFontSize", e.target.value)}
                              onFocus={() => scrollToSection('hero-section')}
                              className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-[#E8001A]"
                            />
                          </div>
                          <div className="space-y-3">
                            <span className="text-[10px] font-bold text-zinc-600 block uppercase">Section Font</span>
                            <div className="flex flex-wrap gap-2">
                              {["Inter, sans-serif", "'Outfit', sans-serif", "'Space Grotesk', sans-serif", "'Playfair Display', serif", "monospace"].map((f) => (
                                <button 
                                  key={f}
                                  onClick={() => {
                                    handleStyleChange("heroFont", f);
                                    scrollToSection('hero-section');
                                  }}
                                  className={`px-3 py-1.5 rounded-lg text-[9px] font-bold border transition-all ${editableData.details?.styles?.heroFont === f ? "bg-white text-black border-white" : "bg-zinc-800 text-zinc-400 border-zinc-700 hover:border-zinc-500"}`}
                                  style={{ fontFamily: f }}
                                >
                                  {f.split(",")[0].replace(/'/g, "")}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Narrative Section Typography */}
                      <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">Section: Narrative (Bio)</label>
                        <div className="space-y-6 bg-zinc-900/30 p-5 rounded-2xl border border-zinc-800/50">
                          <div className="space-y-3">
                            <div className="flex justify-between items-center">
                              <span className="text-[10px] font-bold text-zinc-400 uppercase">Bio Font Size</span>
                              <span className="text-[10px] font-mono text-[#E8001A]">{Math.round((parseFloat(editableData.details?.styles?.bioFontSize) || 1) * 100)}%</span>
                            </div>
                            <input 
                              type="range" min="0.5" max="2" step="0.05"
                              value={parseFloat(editableData.details?.styles?.bioFontSize) || 1}
                              onChange={(e) => handleStyleChange("bioFontSize", e.target.value)}
                              onFocus={() => scrollToSection('narrative-section')}
                              className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-[#E8001A]"
                            />
                          </div>
                          <div className="space-y-3">
                            <span className="text-[10px] font-bold text-zinc-600 block uppercase">Section Font</span>
                            <div className="flex flex-wrap gap-2">
                              {["Inter, sans-serif", "'Outfit', sans-serif", "'Space Grotesk', sans-serif", "'Playfair Display', serif", "monospace"].map((f) => (
                                <button 
                                  key={f}
                                  onClick={() => {
                                    handleStyleChange("bioFont", f);
                                    scrollToSection('narrative-section');
                                  }}
                                  className={`px-3 py-1.5 rounded-lg text-[9px] font-bold border transition-all ${editableData.details?.styles?.bioFont === f ? "bg-white text-black border-white" : "bg-zinc-800 text-zinc-400 border-zinc-700 hover:border-zinc-500"}`}
                                  style={{ fontFamily: f }}
                                >
                                  {f.split(",")[0].replace(/'/g, "")}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Global Modules Typography */}
                    <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">Global Section Titles</label>
                        <div className="space-y-6 bg-zinc-900/30 p-5 rounded-2xl border border-zinc-800/50">
                          <div className="space-y-3">
                            <div className="flex justify-between items-center">
                              <span className="text-[10px] font-bold text-zinc-400 uppercase">Text Size</span>
                              <span className="text-[10px] font-mono text-[#E8001A]">{Math.round((parseFloat(editableData.details?.styles?.sectionTitleFontSize) || 1) * 100)}%</span>
                            </div>
                            <input 
                              type="range" min="0.5" max="2" step="0.05"
                              value={parseFloat(editableData.details?.styles?.sectionTitleFontSize) || 1}
                              onChange={(e) => handleStyleChange("sectionTitleFontSize", e.target.value)}
                              onFocus={() => scrollToSection('projects-section')}
                              className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-[#E8001A]"
                            />
                          </div>
                          <div className="space-y-3">
                            <span className="text-[10px] font-bold text-zinc-600 block uppercase">Section Font</span>
                            <div className="flex flex-wrap gap-2">
                              {["Inter, sans-serif", "'Outfit', sans-serif", "'Space Grotesk', sans-serif", "'Playfair Display', serif", "monospace"].map((f) => (
                                <button 
                                  key={f}
                                  onClick={() => {
                                    handleStyleChange("moduleFont", f);
                                    scrollToSection('projects-section');
                                  }}
                                  className={`px-3 py-1.5 rounded-lg text-[9px] font-bold border transition-all ${editableData.details?.styles?.moduleFont === f ? "bg-white text-black border-white" : "bg-zinc-800 text-zinc-400 border-zinc-700 hover:border-zinc-500"}`}
                                  style={{ fontFamily: f }}
                                >
                                  {f.split(",")[0].replace(/'/g, "")}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      {/* Services & Projects Typography */}
                      <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">Skills & Projects (Cards)</label>
                        <div className="space-y-6 bg-zinc-900/30 p-5 rounded-2xl border border-zinc-800/50">
                          <div className="space-y-3">
                            <div className="flex justify-between items-center">
                              <span className="text-[10px] font-bold text-zinc-400 uppercase">Card Title Size</span>
                              <span className="text-[10px] font-mono text-[#E8001A]">{Math.round((parseFloat(editableData.details?.styles?.serviceTitleFontSize) || 1) * 100)}%</span>
                            </div>
                            <input 
                              type="range" min="0.5" max="2" step="0.05"
                              value={parseFloat(editableData.details?.styles?.serviceTitleFontSize) || 1}
                              onChange={(e) => {
                                handleStyleChange("serviceTitleFontSize", e.target.value);
                                handleStyleChange("projectTitleFontSize", e.target.value);
                              }}
                              onFocus={() => scrollToSection('expertise-section')}
                              className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-[#E8001A]"
                            />
                          </div>
                          <div className="space-y-3">
                            <div className="flex justify-between items-center">
                              <span className="text-[10px] font-bold text-zinc-400 uppercase">Card Detail Size</span>
                              <span className="text-[10px] font-mono text-[#E8001A]">{Math.round((parseFloat(editableData.details?.styles?.serviceBodyFontSize) || 1) * 100)}%</span>
                            </div>
                            <input 
                              type="range" min="0.5" max="2" step="0.05"
                              value={parseFloat(editableData.details?.styles?.serviceBodyFontSize) || 1}
                              onChange={(e) => {
                                handleStyleChange("serviceBodyFontSize", e.target.value);
                                handleStyleChange("projectBodyFontSize", e.target.value);
                              }}
                              onFocus={() => scrollToSection('expertise-section')}
                              className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-[#E8001A]"
                            />
                          </div>
                          <div className="space-y-3">
                            <span className="text-[10px] font-bold text-zinc-600 block uppercase">Section Font</span>
                            <div className="flex flex-wrap gap-2">
                              {["Inter, sans-serif", "'Outfit', sans-serif", "'Space Grotesk', sans-serif", "'Playfair Display', serif", "monospace"].map((f) => (
                                <button 
                                  key={f}
                                  onClick={() => {
                                    handleStyleChange("cardFont", f);
                                    scrollToSection('expertise-section');
                                  }}
                                  className={`px-3 py-1.5 rounded-lg text-[9px] font-bold border transition-all ${editableData.details?.styles?.cardFont === f ? "bg-white text-black border-white" : "bg-zinc-800 text-zinc-400 border-zinc-700 hover:border-zinc-500"}`}
                                  style={{ fontFamily: f }}
                                >
                                  {f.split(",")[0].replace(/'/g, "")}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Testimonials Typography */}
                      <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">Testimonials (Feedback)</label>
                        <div className="space-y-6 bg-zinc-900/30 p-5 rounded-2xl border border-zinc-800/50">
                          <div className="space-y-3">
                            <div className="flex justify-between items-center">
                              <span className="text-[10px] font-bold text-zinc-400 uppercase">Quote Size</span>
                              <span className="text-[10px] font-mono text-[#E8001A]">{Math.round((parseFloat(editableData.details?.styles?.testimonialQuoteFontSize) || 1) * 100)}%</span>
                            </div>
                            <input 
                              type="range" min="0.5" max="2" step="0.05"
                              value={parseFloat(editableData.details?.styles?.testimonialQuoteFontSize) || 1}
                              onChange={(e) => handleStyleChange("testimonialQuoteFontSize", e.target.value)}
                              onFocus={() => scrollToSection('testimonials-section')}
                              className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-[#E8001A]"
                            />
                          </div>
                          <div className="space-y-3">
                            <div className="flex justify-between items-center">
                              <span className="text-[10px] font-bold text-zinc-400 uppercase">Author Name</span>
                              <span className="text-[10px] font-mono text-[#E8001A]">{Math.round((parseFloat(editableData.details?.styles?.testimonialAuthorFontSize) || 1) * 100)}%</span>
                            </div>
                            <input 
                              type="range" min="0.5" max="2" step="0.05"
                              value={parseFloat(editableData.details?.styles?.testimonialAuthorFontSize) || 1}
                              onChange={(e) => handleStyleChange("testimonialAuthorFontSize", e.target.value)}
                              onFocus={() => scrollToSection('testimonials-section')}
                              className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-[#E8001A]"
                            />
                          </div>
                          <div className="space-y-3">
                            <span className="text-[10px] font-bold text-zinc-600 block uppercase">Section Font</span>
                            <div className="flex flex-wrap gap-2">
                              {["Inter, sans-serif", "'Outfit', sans-serif", "'Space Grotesk', sans-serif", "'Playfair Display', serif", "monospace"].map((f) => (
                                <button 
                                  key={f}
                                  onClick={() => {
                                    handleStyleChange("testimonialFont", f);
                                    scrollToSection('testimonials-section');
                                  }}
                                  className={`px-3 py-1.5 rounded-lg text-[9px] font-bold border transition-all ${editableData.details?.styles?.testimonialFont === f ? "bg-white text-black border-white" : "bg-zinc-800 text-zinc-400 border-zinc-700 hover:border-zinc-500"}`}
                                  style={{ fontFamily: f }}
                                >
                                  {f.split(",")[0].replace(/'/g, "")}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Footer Typography */}
                      <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">Section: Final Call (Footer)</label>
                        <div className="space-y-6 bg-zinc-900/30 p-5 rounded-2xl border border-zinc-800/50">
                          <div className="space-y-3">
                            <div className="flex justify-between items-center">
                              <span className="text-[10px] font-bold text-zinc-400 uppercase">Footer Headline</span>
                              <span className="text-[10px] font-mono text-[#E8001A]">{Math.round((parseFloat(editableData.details?.styles?.footerTitleFontSize) || 1) * 100)}%</span>
                            </div>
                            <input 
                              type="range" min="0.5" max="2" step="0.05"
                              value={parseFloat(editableData.details?.styles?.footerTitleFontSize) || 1}
                              onChange={(e) => handleStyleChange("footerTitleFontSize", e.target.value)}
                              onFocus={() => scrollToSection('footer-section')}
                              className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-[#E8001A]"
                            />
                          </div>
                          <div className="space-y-3">
                            <span className="text-[10px] font-bold text-zinc-600 block uppercase">Section Font</span>
                            <div className="flex flex-wrap gap-2">
                              {["Inter, sans-serif", "'Outfit', sans-serif", "'Space Grotesk', sans-serif", "'Playfair Display', serif", "monospace"].map((f) => (
                                <button 
                                  key={f}
                                  onClick={() => {
                                    handleStyleChange("footerFont", f);
                                    scrollToSection('footer-section');
                                  }}
                                  className={`px-3 py-1.5 rounded-lg text-[9px] font-bold border transition-all ${editableData.details?.styles?.footerFont === f ? "bg-white text-black border-white" : "bg-zinc-800 text-zinc-400 border-zinc-700 hover:border-zinc-500"}`}
                                  style={{ fontFamily: f }}
                                >
                                  {f.split(",")[0].replace(/'/g, "")}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "content" && (
                  <div className="space-y-8">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-1">Your Full Name</label>
                      <input 
                        type="text" 
                        value={editableData.name}
                        onChange={(e) => handleUpdate({ name: e.target.value })}
                        onFocus={() => scrollToSection('hero-section')}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-6 py-4 text-white focus:border-[#E8001A] outline-none font-bold italic"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-1">Your Headline / Role</label>
                      <input 
                        type="text" 
                        value={editableData.subtitle}
                        onChange={(e) => handleUpdate({ subtitle: e.target.value })}
                        onFocus={() => scrollToSection('hero-section')}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-6 py-4 text-white focus:border-[#E8001A] outline-none font-medium italic"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-1">About Me (Bio)</label>
                      <textarea 
                        value={editableData.details.bio}
                        onChange={(e) => handleUpdate({ details: { ...editableData.details, bio: e.target.value } })}
                        onFocus={() => scrollToSection('narrative-section')}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-6 py-6 text-white focus:border-[#E8001A] outline-none h-48 resize-none italic font-light leading-relaxed"
                      />
                    </div>
                  </div>
                )}

                {activeTab === "layout" && (
                  <div className="space-y-10">
                    <div className="p-6 bg-zinc-900/50 rounded-[32px] border border-zinc-800 text-center">
                        <Sparkles className="mx-auto mb-4 text-[#E8001A]" size={32} />
                        <h3 className="text-sm font-black uppercase italic tracking-tighter mb-2">Adaptive Architecture</h3>
                        <p className="text-[10px] text-zinc-500 leading-relaxed uppercase tracking-widest font-medium">Layout adjustments are automatically calculated for peak performance.</p>
                    </div>

                     {/* Global Imagery */}
                    <div className="space-y-4">
                       <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-1">Identity Visual (Hero)</label>
                       <div className="space-y-6 bg-zinc-900/30 p-5 rounded-2xl border border-zinc-800/50">
                         <div className="flex gap-4">
                           <div 
                             className="w-20 h-20 bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 shrink-0 relative group cursor-pointer"
                             onClick={() => document.getElementById('hero-upload').click()}
                           >
                              <img src={editableData.image || "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop"} className="w-full h-full object-cover" />
                              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                 <ImageIcon size={20} className="text-white" />
                               </div>
                               <input 
                                 id="hero-upload"
                                 type="file" 
                                 className="hidden" 
                                 accept="image/*"
                                 onChange={(e) => handleFileUpload(e, 'hero')}
                               />
                            </div>
                            <input 
                              type="text" 
                              value={editableData.image}
                              onChange={(e) => handleUpdate({ image: e.target.value })}
                             className="flex-1 bg-zinc-900 border border-zinc-800 rounded-2xl px-4 py-2 text-xs text-white focus:border-[#E8001A] outline-none h-fit self-center"
                           />
                         </div>
                         <div className="space-y-3">
                            <div className="flex justify-between items-center">
                              <span className="text-[10px] font-bold text-zinc-400 uppercase">Visual Zoom</span>
                              <span className="text-[10px] font-mono text-[#E8001A]">{Math.round((parseFloat(editableData.details?.styles?.heroImageScale) || 1) * 100)}%</span>
                            </div>
                            <input 
                              type="range" min="0.2" max="3" step="0.05"
                              value={parseFloat(editableData.details?.styles?.heroImageScale) || 1}
                              onChange={(e) => handleStyleChange("heroImageScale", e.target.value)}
                              onFocus={() => scrollToSection('hero-section')}
                              className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-[#E8001A]"
                            />
                          </div>

                          <div className="space-y-3">
                            <div className="flex justify-between items-center">
                              <span className="text-[10px] font-bold text-zinc-400 uppercase">Hero Text Y-Position</span>
                              <span className="text-[10px] font-mono text-[#E8001A]">{Math.round((parseFloat(editableData.details?.styles?.heroTextY) || 0))}px</span>
                            </div>
                            <input 
                              type="range" min="-400" max="400" step="10"
                              value={parseFloat(editableData.details?.styles?.heroTextY) || 0}
                              onChange={(e) => handleStyleChange("heroTextY", e.target.value)}
                              onFocus={() => scrollToSection('hero-section')}
                              className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-[#E8001A]"
                            />
                          </div>
                       </div>
                    </div>

                    {/* Artifact Imagery Scale */}
                    <div className="space-y-4">
                       <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-1">Artifact Media (Global)</label>
                       <div className="bg-zinc-900/30 p-5 rounded-2xl border border-zinc-800/50 space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-[10px] font-bold text-zinc-400 uppercase">Media Resize</span>
                            <span className="text-[10px] font-mono text-[#E8001A]">{Math.round((parseFloat(editableData.details?.styles?.projectImageScale) || 1) * 100)}%</span>
                          </div>
                          <input 
                            type="range" min="1" max="1.5" step="0.05"
                            value={parseFloat(editableData.details?.styles?.projectImageScale) || 1}
                            onChange={(e) => handleStyleChange("projectImageScale", e.target.value)}
                            className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-[#E8001A]"
                          />
                       </div>
                    </div>

                    {/* Services */}
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-1">Expertise Units</label>
                        <button 
                          onClick={() => handleUpdate({ details: { ...editableData.details, services: [...(editableData.details.services || []), { title: "New Skill", description: "Description here..." }] } })}
                          className="text-[9px] font-black uppercase text-[#E8001A] hover:text-white transition-colors"
                        >
                          + Add Unit
                        </button>
                      </div>
                      <div className="space-y-3">
                        {(editableData.details.services || []).map((service, idx) => (
                          <div key={idx} className="p-4 bg-zinc-900 rounded-2xl border border-zinc-800 space-y-3">
                            <div className="flex justify-between items-center">
                              <input 
                                type="text" 
                                value={service.title}
                                onChange={(e) => {
                                  const newServices = [...editableData.details.services];
                                  newServices[idx].title = e.target.value;
                                  handleUpdate({ details: { ...editableData.details, services: newServices } });
                                }}
                                className="bg-transparent text-sm font-black uppercase italic focus:text-[#E8001A] outline-none w-full"
                              />
                              <button 
                                onClick={() => {
                                  const newServices = editableData.details.services.filter((_, i) => i !== idx);
                                  handleUpdate({ details: { ...editableData.details, services: newServices } });
                                }}
                                className="text-zinc-600 hover:text-red-500"
                              >
                                <X size={14} />
                              </button>
                            </div>
                            <textarea 
                              value={service.description}
                              onChange={(e) => {
                                const newServices = [...editableData.details.services];
                                newServices[idx].description = e.target.value;
                                handleUpdate({ details: { ...editableData.details, services: newServices } });
                              }}
                              className="w-full bg-transparent text-[10px] text-zinc-500 italic h-12 resize-none outline-none"
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Projects */}
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-1">Artifacts / Projects</label>
                        <button 
                          onClick={() => handleUpdate({ details: { ...editableData.details, projects: [...(editableData.details.projects || []), { title: "New Project", description: "Brief overview...", image: "" }] } })}
                          className="text-[9px] font-black uppercase text-[#E8001A] hover:text-white transition-colors"
                        >
                          + Add Artifact
                        </button>
                      </div>
                      <div className="space-y-3">
                        {(editableData.details.projects || []).map((project, idx) => (
                          <div key={idx} className="p-4 bg-zinc-900 rounded-2xl border border-zinc-800 space-y-3">
                            <div className="flex gap-3">
                                <div 
                                  className="w-12 h-12 bg-black rounded-lg overflow-hidden border border-zinc-800 shrink-0 relative group cursor-pointer"
                                  onClick={() => document.getElementById(`project-upload-${idx}`).click()}
                                >
                                   {project.image ? (
                                     <img src={project.image} className="w-full h-full object-cover" />
                                   ) : (
                                     <div className="w-full h-full flex items-center justify-center text-[8px] text-zinc-800">
                                       <ImageIcon size={12} />
                                     </div>
                                   )}
                                   <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                      <ImageIcon size={14} className="text-white" />
                                   </div>
                                   <input 
                                     id={`project-upload-${idx}`}
                                     type="file" 
                                     className="hidden" 
                                     accept="image/*"
                                     onChange={(e) => handleFileUpload(e, 'project', idx)}
                                   />
                                </div>
                                <div className="flex-1 space-y-2">
                                   <div className="flex justify-between items-center">
                                     <input 
                                       type="text" 
                                       value={project.title}
                                       onChange={(e) => {
                                         const newProjects = [...editableData.details.projects];
                                         newProjects[idx].title = e.target.value;
                                         handleUpdate({ details: { ...editableData.details, projects: newProjects } });
                                       }}
                                       className="bg-transparent text-sm font-black uppercase italic focus:text-[#E8001A] outline-none w-full"
                                     />
                                     <button 
                                       onClick={() => {
                                         const newProjects = editableData.details.projects.filter((_, i) => i !== idx);
                                         handleUpdate({ details: { ...editableData.details, projects: newProjects } });
                                       }}
                                       className="text-zinc-600 hover:text-red-500 ml-2"
                                     >
                                       <X size={14} />
                                     </button>
                                   </div>
                                   <input 
                                     type="text" 
                                     value={project.image}
                                     onChange={(e) => {
                                       const newProjects = [...editableData.details.projects];
                                       newProjects[idx].image = e.target.value;
                                       handleUpdate({ details: { ...editableData.details, projects: newProjects } });
                                     }}
                                     placeholder="Or paste URL..."
                                     className="w-full bg-transparent text-[8px] text-zinc-600 outline-none"
                                   />
                                </div>
                            </div>
                            <textarea 
                              value={project.description}
                              onChange={(e) => {
                                const newProjects = [...editableData.details.projects];
                                newProjects[idx].description = e.target.value;
                                handleUpdate({ details: { ...editableData.details, projects: newProjects } });
                              }}
                              className="w-full bg-transparent text-[10px] text-zinc-500 italic h-12 resize-none outline-none"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer Actions */}
              <div className="p-8 border-t border-zinc-800 bg-[#0A0A0A]/80 backdrop-blur-xl">
                <button 
                  onClick={handleSave}
                  disabled={saving}
                  className="w-full bg-white text-black py-5 rounded-[24px] font-black uppercase tracking-[0.2em] italic flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all shadow-[0_20px_40px_rgba(255,255,255,0.1)] disabled:opacity-50"
                >
                  {saving ? (
                    <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Save size={18} />
                      Save Legacy
                    </>
                  )}
                </button>
                <button 
                  onClick={() => setIsEditing(false)}
                  className="w-full mt-4 text-[10px] font-black uppercase tracking-widest text-zinc-600 hover:text-white transition-colors py-2"
                >
                  Discard Changes
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <TemplateComponent data={templateProps} isEditing={isEditing} onUpdate={handleUpdate} />
    </div>
  );
};

export default DynamicPartnershipPage;


