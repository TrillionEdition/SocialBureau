import React, { useState, useEffect, useMemo, useRef } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import {
  FileText, Combine, Scissors, ArchiveRestore, FileImage, FileType, FileSymlink,
  Crop, ImageDown, ImagePlus, RotateCw, Contrast, Sparkles, Wand2,
  Upload, Trash2, Download, Copy, Play, Loader2, FileCheck, CheckCircle, File
} from "lucide-react";
import { BASE_URL } from "@/utils/urls";

// Hide scrollbar but keep scroll functionality
const scrollbarHideStyle = `
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;

const PRESETS = [
  { key: "blueprint", label: "Blueprint", value: "technical blueprint drawing on cyan paper, line art" },
  { key: "factory", label: "Factory Floor", value: "wide shot industrial factory floor, dramatic lighting, photorealistic" },
  { key: "product", label: "Product Mock", value: "industrial product photography, studio lighting, minimal background" },
  { key: "isometric", label: "Isometric CAD", value: "isometric CAD render, clean white background, technical illustration" },
  { key: "machinery", label: "Heavy Machinery", value: "close-up of industrial machinery, hyper-detailed, cinematic" },
];

const USE_CASES = [
  { value: "industrial_marketing", label: "Marketing Copy" },
  { value: "technical_spec", label: "Technical Spec" },
  { value: "factory_image_prompt", label: "Factory Image Prompt" },
  { value: "product_image_prompt", label: "Product Image Prompt" },
  { value: "safety_notice", label: "Safety Notice" },
  { value: "social_post", label: "Social Post" },
];

const TONES = ["technical", "persuasive", "formal", "concise"];

const TOOL_CATEGORIES = [
  {
    key: "pdf",
    label: "PDF Toolkit",
    icon: FileText,
    urlPrefix: "pdf-tools",
    tools: [
      {
        slug: "merge",
        urlSlug: "merge-pdf",
        name: "Merge PDF",
        desc: "Combine multiple PDFs into one production-ready file.",
        icon: Combine,
        endpoint: "/pdf/merge",
        multi: true,
        accept: "application/pdf",
        params: [],
      },
      {
        slug: "split",
        urlSlug: "split-pdf",
        name: "Split PDF",
        desc: "Extract specific pages or ranges (e.g. 1-3,5,7-9).",
        icon: Scissors,
        endpoint: "/pdf/split",
        multi: false,
        accept: "application/pdf",
        params: [
          {
            key: "ranges",
            label: "Page Ranges",
            placeholder: "1-3,5,7-9",
            type: "text",
            default: "",
          },
        ],
      },
      {
        slug: "compress",
        urlSlug: "compress-pdf",
        name: "Compress PDF",
        desc: "Optimize PDF streams and reduce file size.",
        icon: ArchiveRestore,
        endpoint: "/pdf/compress",
        multi: false,
        accept: "application/pdf",
        params: [],
      },
      {
        slug: "to-images",
        urlSlug: "pdf-to-images",
        name: "PDF → Images",
        desc: "Render each PDF page to a high-DPI PNG, packaged in ZIP.",
        icon: FileImage,
        endpoint: "/pdf/to-images",
        multi: false,
        accept: "application/pdf",
        params: [
          {
            key: "dpi",
            label: "DPI",
            type: "number",
            default: 150,
          },
        ],
      },
      {
        slug: "from-images",
        urlSlug: "images-to-pdf",
        name: "Images → PDF",
        desc: "Compile a sequence of images into a single PDF.",
        icon: FileSymlink,
        endpoint: "/pdf/from-images",
        multi: true,
        accept: "image/*",
        params: [],
      },
      {
        slug: "to-word",
        urlSlug: "pdf-to-word",
        name: "PDF → Word",
        desc: "Convert PDF to an editable .docx document.",
        icon: FileType,
        endpoint: "/pdf/to-word",
        multi: false,
        accept: "application/pdf",
        params: [],
      },
      {
        slug: "from-word",
        urlSlug: "word-to-pdf",
        name: "Word → PDF",
        desc: "Convert a Microsoft Word .docx file into a standard PDF.",
        icon: FileSymlink,
        endpoint: "/pdf/from-word",
        multi: false,
        accept: ".docx, application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        params: [],
      },
      {
        slug: "to-text",
        urlSlug: "pdf-to-text",
        name: "PDF → Text",
        desc: "Extract raw text from a PDF (no download).",
        icon: FileText,
        endpoint: "/pdf/to-text",
        multi: false,
        accept: "application/pdf",
        params: [],
        textOutput: true,
      },
    ],
  },
  {
    key: "image",
    label: "Image Toolkit",
    icon: Crop,
    urlPrefix: "image-tools",
    tools: [
      {
        slug: "resize",
        urlSlug: "resize-image",
        name: "Resize",
        desc: "Set exact width and height in pixels.",
        icon: Crop,
        endpoint: "/image/resize",
        multi: false,
        accept: "image/*",
        params: [
          { key: "width", label: "Width (px)", type: "number", default: 1280 },
          { key: "height", label: "Height (px)", type: "number", default: 720 },
        ],
      },
      {
        slug: "compress",
        urlSlug: "compress-image",
        name: "Compress",
        desc: "Reduce image size with JPEG quality control.",
        icon: ImageDown,
        endpoint: "/image/compress",
        multi: false,
        accept: "image/*",
        params: [
          { key: "quality", label: "Quality (1-95)", type: "number", default: 70 },
        ],
      },
      {
        slug: "convert",
        urlSlug: "convert-image-format",
        name: "Convert Format",
        desc: "Convert between PNG, JPG, WEBP, BMP.",
        icon: ImagePlus,
        endpoint: "/image/convert",
        multi: false,
        accept: "image/*",
        params: [
          {
            key: "target",
            label: "Target Format",
            type: "select",
            options: ["png", "jpg", "webp", "bmp"],
            default: "png",
          },
        ],
      },
      {
        slug: "rotate",
        urlSlug: "rotate-image",
        name: "Rotate",
        desc: "Rotate image by any degree (positive = clockwise).",
        icon: RotateCw,
        endpoint: "/image/rotate",
        multi: false,
        accept: "image/*",
        params: [
          { key: "angle", label: "Angle (°)", type: "number", default: 90 },
        ],
      },
      {
        slug: "grayscale",
        urlSlug: "grayscale-image",
        name: "Grayscale",
        desc: "Strip color and output a monochrome PNG.",
        icon: Contrast,
        endpoint: "/image/grayscale",
        multi: false,
        accept: "image/*",
        params: [],
      },
    ],
  },
  {
    key: "ai",
    label: "AI Studio",
    icon: Sparkles,
    urlPrefix: "ai-studio",
    tools: [
      {
        slug: "image",
        urlSlug: "ai-image-generator",
        name: "AI Industrial Image",
        desc: "Generate factory, machinery, blueprint and product visuals.",
        icon: Sparkles,
        endpoint: "/ai/image",
        isCustomAi: true,
      },
      {
        slug: "prompt",
        urlSlug: "ai-prompt-engineer",
        name: "AI Prompt Engineer",
        desc: "Generate optimized prompts and industrial copy.",
        icon: Wand2,
        endpoint: "/ai/prompt",
        isCustomAi: true,
      },
    ],
  },
];

export default function Solutions() {
  const { toolUrl } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // Derive active category from URL path prefix (e.g. /pdf-tools/merge-pdf)
  const currentCategory = useMemo(() => {
    const prefix = location.pathname.split('/')[1];
    return TOOL_CATEGORIES.find(c => c.urlPrefix === prefix) || TOOL_CATEGORIES[0];
  }, [location.pathname]);

  const activeCategory = currentCategory.key;

  // Derive active tool from URL path segment
  const activeToolSlug = useMemo(() => {
    const tool = currentCategory.tools.find(t => t.urlSlug === toolUrl);
    return tool ? tool.slug : currentCategory.tools[0]?.slug || 'merge';
  }, [currentCategory, toolUrl]);

  const [files, setFiles] = useState([]);
  const [busy, setBusy] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  // Standard Tool Parameters
  const [params, setParams] = useState({});

  // AI Image Parameters
  const [aiPrompt, setAiPrompt] = useState("Robotic assembly arm in a clean automotive factory, motion blur, cinematic 35mm");
  const [aiStyle, setAiStyle] = useState(PRESETS[1].value);

  // AI Prompt Parameters
  const [aiTopic, setAiTopic] = useState("CNC milling machine for aerospace parts");
  const [aiUseCase, setAiUseCase] = useState(USE_CASES[0].value);
  const [aiTone, setAiTone] = useState("technical");
  const [aiDetails, setAiDetails] = useState("");

  // Outputs
  const [textResult, setTextResult] = useState("");
  const [doneFile, setDoneFile] = useState(null);
  const [aiImageResult, setAiImageResult] = useState(null);

  const fileInputRef = useRef(null);

  const currentTool = useMemo(() => {
    return currentCategory.tools.find(t => t.slug === activeToolSlug) || currentCategory.tools[0];
  }, [currentCategory, activeToolSlug]);

  // Reset tool-specific states on tab change
  useEffect(() => {
    setFiles([]);
    setTextResult("");
    setDoneFile(null);
    setAiImageResult(null);

    // Initialize params
    const init = {};
    if (currentTool?.params) {
      currentTool.params.forEach(p => {
        init[p.key] = p.default ?? "";
      });
    }
    setParams(init);
  }, [activeCategory, activeToolSlug, currentTool]);

  // Change category helper
  const handleCategoryChange = (catKey) => {
    const cat = TOOL_CATEGORIES.find(c => c.key === catKey);
    if (cat && cat.tools.length > 0) {
      navigate(`/${cat.urlPrefix}/${cat.tools[0].urlSlug}`);
    }
  };

  // Drag & drop handlers
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      addFiles(Array.from(e.dataTransfer.files));
    }
  };

  const fileSelected = (e) => {
    if (e.target.files && e.target.files[0]) {
      addFiles(Array.from(e.target.files));
    }
  };

  const addFiles = (newFiles) => {
    const accept = currentTool.accept || "*";
    let filtered = newFiles;
    if (accept !== "*") {
      const allowedTargets = accept.split(",").map(s => s.trim().toLowerCase()).filter(Boolean);
      filtered = newFiles.filter(f => {
        const fileType = (f.type || "").toLowerCase();
        const fileName = (f.name || "").toLowerCase();
        return allowedTargets.some(target => {
          if (target.startsWith(".")) {
            return fileName.endsWith(target);
          } else if (target.endsWith("/*")) {
            const prefix = target.replace("*", "");
            return fileType.startsWith(prefix);
          } else {
            return fileType === target;
          }
        });
      });
    }

    if (currentTool.multi) {
      setFiles(prev => [...prev, ...filtered]);
    } else {
      setFiles(filtered.slice(0, 1));
    }
  };

  const removeFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const triggerDownload = (blob, filename) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Run the job
  const handleRun = async () => {
    if (currentTool.isCustomAi) {
      if (currentTool.slug === "image") {
        await handleGenerateAiImage();
      } else {
        await handleGenerateAiPrompt();
      }
      return;
    }

    if (!files.length) {
      toast.error("Please upload a file first");
      return;
    }

    setBusy(true);
    setTextResult("");
    setDoneFile(null);

    try {
      const fd = new FormData();
      if (currentTool.multi) {
        files.forEach(f => fd.append("files", f));
      } else {
        fd.append("file", files[0]);
      }

      // Add extra parameters
      Object.entries(params).forEach(([k, v]) => {
        if (v !== "" && v !== null && v !== undefined) {
          fd.append(k, v);
        }
      });

      const url = `${BASE_URL}/api${currentTool.endpoint}`;

      if (currentTool.textOutput) {
        const res = await axios.post(url, fd, {
          headers: { "Content-Type": "multipart/form-data" }
        });
        setTextResult(res.data.text || "");
        toast.success("Text extracted successfully!");
      } else {
        const res = await axios.post(url, fd, {
          responseType: "blob",
          headers: { "Content-Type": "multipart/form-data" }
        });
        const disposition = res.headers["content-disposition"] || "";
        const match = disposition.match(/filename="?([^";]+)"?/);
        let filename = match ? match[1] : "";
        if (!filename) {
          const blobType = res.data.type || "";
          let ext = "pdf";
          if (blobType.includes("zip")) ext = "zip";
          else if (blobType.includes("jpeg") || blobType.includes("jpg")) ext = "jpg";
          else if (blobType.includes("png")) ext = "png";
          else if (blobType.includes("webp")) ext = "webp";
          else if (blobType.includes("bmp")) ext = "bmp";
          else if (blobType.includes("word") || blobType.includes("wordprocessingml") || currentTool.slug === "to-word") ext = "docx";
          else if (currentCategory.key === "image") {
            ext = params.target || "png";
          }
          filename = `result_${Date.now()}.${ext}`;
        }
        
        setDoneFile({ blob: res.data, filename, size: res.data.size });
        toast.success("Job completed successfully!");
      }
    } catch (e) {
      console.error(e);
      // Read blob error response if returned as blob
      if (e.response?.data instanceof Blob) {
        const text = await e.response.data.text();
        try {
          const parsed = JSON.parse(text);
          toast.error(parsed.message || parsed.error || "Job failed");
        } catch {
          toast.error("Job failed. Check inputs.");
        }
      } else {
        const msg = e?.response?.data?.message || e?.message || "Job failed";
        toast.error(typeof msg === "string" ? msg : "Job failed");
      }
    } finally {
      setBusy(false);
    }
  };

  // Generate AI Image
  const handleGenerateAiImage = async () => {
    if (!aiPrompt.trim()) {
      toast.error("Please enter a description for the image");
      return;
    }
    setBusy(true);
    setAiImageResult(null);

    try {
      const res = await axios.post(`${BASE_URL}/api/ai/image`, {
        prompt: aiPrompt,
        style: aiStyle
      });
      setAiImageResult(res.data);
      toast.success("Image generated successfully!");
    } catch (e) {
      const msg = e?.response?.data?.message || e?.message || "Generation failed";
      toast.error(typeof msg === "string" ? msg : "Generation failed");
    } finally {
      setBusy(false);
    }
  };

  // Generate AI Prompt
  const handleGenerateAiPrompt = async () => {
    if (!aiTopic.trim()) {
      toast.error("Please enter a topic");
      return;
    }
    setBusy(true);
    setTextResult("");

    try {
      const res = await axios.post(`${BASE_URL}/api/ai/prompt`, {
        topic: aiTopic,
        use_case: aiUseCase,
        tone: aiTone,
        details: aiDetails
      });
      setTextResult(res.data.output || "");
      toast.success("Prompt drafted successfully!");
    } catch (e) {
      const msg = e?.response?.data?.message || e?.message || "Drafting failed";
      toast.error(typeof msg === "string" ? msg : "Drafting failed");
    } finally {
      setBusy(false);
    }
  };

  // Copy AI Prompt Output
  const copyOutput = () => {
    if (!textResult) return;
    navigator.clipboard.writeText(textResult);
    toast.success("Copied prompt to clipboard!");
  };

  // Download AI Image
  const downloadAiImage = () => {
    if (!aiImageResult?.image_base64) return;
    const byteString = atob(aiImageResult.image_base64);
    const bytes = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
      bytes[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([bytes], { type: aiImageResult.mime_type || "image/png" });
    triggerDownload(blob, "industrial-visual.png");
  };

  return (
    <div className="w-full min-h-screen bg-[#0A0A0A] pt-20 pb-8 px-4 sm:px-6 lg:px-8 text-white flex flex-col transition-all duration-300">
      <style>{scrollbarHideStyle}</style>
      <div className="max-w-7xl w-full mx-auto flex-1 flex flex-col min-h-0">
        
        {/* Title Header */}
        <div className="flex flex-col items-center text-center mb-6 sm:mb-8 shrink-0">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight uppercase mb-2 bg-gradient-to-r from-[#E8001A] to-[#FF3333] bg-clip-text text-transparent">
            Solutions Suite
          </h1>
          <p className="text-sm sm:text-base text-white/60 font-medium">
            Professional Tools & AI-Powered Studio
          </p>
        </div>

        {/* Categories Tab Navigation - Horizontal Scroll on Mobile */}
        <div className="mb-4 sm:mb-6 shrink-0">
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 md:flex-wrap md:justify-center scrollbar-hide">
            {TOOL_CATEGORIES.map((cat) => {
              const CatIcon = cat.icon;
              const isActive = activeCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  onClick={() => handleCategoryChange(cat.key)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-bold text-xs sm:text-sm uppercase tracking-wider transition-all whitespace-nowrap flex-shrink-0 ${
                    isActive
                      ? "bg-[#E8001A] text-white shadow-lg shadow-[#E8001A]/30 border border-[#E8001A]"
                      : "bg-white/5 text-white/70 border border-white/10 hover:bg-white/10 hover:text-white hover:border-[#E8001A]/50"
                  }`}
                >
                  <CatIcon size={16} />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tools Sub Navigation - Horizontal Scroll on Mobile */}
        <div className="flex gap-2 overflow-x-auto pb-3 md:pb-0 md:flex-wrap md:justify-center mb-4 sm:mb-6 shrink-0 scrollbar-hide">
          {currentCategory.tools.map((tool) => {
            const ToolIcon = tool.icon;
            const isActive = activeToolSlug === tool.slug;
            return (
              <button
                key={tool.slug}
                onClick={() => navigate(`/${currentCategory.urlPrefix}/${tool.urlSlug}`)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-[11px] sm:text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer flex-shrink-0 ${
                  isActive
                    ? "bg-[#E8001A] text-white shadow-md shadow-[#E8001A]/20 border border-[#E8001A]"
                    : "bg-white/5 text-white/60 border border-white/10 hover:bg-white/10 hover:text-white/80"
                }`}
              >
                <ToolIcon size={14} />
                <span className="hidden sm:inline">{tool.name}</span>
              </button>
            );
          })}
        </div>

        {/* Main Workspace Card */}
        <div className="flex-1 bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/10 shadow-2xl rounded-2xl p-4 sm:p-6 min-h-0 flex flex-col overflow-hidden backdrop-blur-lg">
          
          {/* Active Tool Summary */}
          <div className="mb-4 border-b border-white/10 pb-3 shrink-0 flex items-start sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white uppercase tracking-tight flex items-center gap-2 mb-1">
                <span className="p-1.5 bg-[#E8001A]/20 text-[#E8001A] rounded-lg shrink-0">
                  {React.createElement(currentTool.icon, { size: 16 })}
                </span>
                {currentTool.name}
              </h2>
              <p className="text-xs sm:text-sm text-white/50">{currentTool.desc}</p>
            </div>
          </div>

          {/* Render Tool Interface */}
          {currentTool.isCustomAi ? (
            /* AI TOOL LAYOUT */
            <div className="flex-1 min-h-0 grid md:grid-cols-12 gap-4 sm:gap-6 overflow-hidden">
              {/* Inputs */}
              <div className="md:col-span-5 flex flex-col justify-between overflow-y-auto pr-1 pb-1">
                <div className="space-y-4">
                  {currentTool.slug === "image" ? (
                    /* AI Image Inputs */
                    <>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-white/80 tracking-wider uppercase block">
                          Describe Your Scene
                        </label>
                        <textarea
                          value={aiPrompt}
                          onChange={(e) => setAiPrompt(e.target.value)}
                          rows={3}
                          className="w-full bg-white/[0.03] border border-white/10 rounded-xl p-3 text-sm text-white placeholder-white/30 focus:border-[#E8001A] focus:bg-white/[0.05] focus:outline-none leading-relaxed transition-all"
                          placeholder="Provide details about machinery, automotive factory floor, layout..."
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-white/80 tracking-wider uppercase block">
                          Select Preset Style
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {PRESETS.map((p) => (
                            <button
                              key={p.key}
                              onClick={() => setAiStyle(p.value)}
                              className={`px-3 py-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-wider rounded-lg border transition-all cursor-pointer ${
                                aiStyle === p.value
                                  ? "border-[#E8001A] text-[#E8001A] bg-[#E8001A]/20"
                                  : "border-white/10 text-white/60 bg-white/[0.03] hover:bg-white/[0.08] hover:border-white/20"
                              }`}
                            >
                              {p.label}
                            </button>
                          ))}
                        </div>
                        <input
                          value={aiStyle}
                          onChange={(e) => setAiStyle(e.target.value)}
                          className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-3 py-1.5 text-xs font-mono text-white/60 focus:border-[#E8001A] focus:outline-none"
                        />
                      </div>
                    </>
                  ) : (
                    /* AI Prompt Inputs */
                    <>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-white/80 tracking-wider uppercase block">
                          Topic / Subject
                        </label>
                        <input
                          value={aiTopic}
                          onChange={(e) => setAiTopic(e.target.value)}
                          className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white placeholder-white/30 focus:border-[#E8001A] focus:bg-white/[0.05] focus:outline-none transition-all"
                          placeholder="CNC machine, metal lathe..."
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-white/80 tracking-wider uppercase block">
                          Use Case
                        </label>
                        <select
                          value={aiUseCase}
                          onChange={(e) => setAiUseCase(e.target.value)}
                          className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white focus:border-[#E8001A] focus:bg-white/[0.05] focus:outline-none transition-all"
                        >
                          {USE_CASES.map((u) => (
                            <option key={u.value} value={u.value}>
                              {u.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-white/80 tracking-wider uppercase block">
                          Tone
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {TONES.map((t) => (
                            <button
                              key={t}
                              onClick={() => setAiTone(t)}
                              className={`px-3 py-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-wider rounded-lg border transition-all cursor-pointer ${
                                aiTone === t
                                  ? "border-[#E8001A] text-[#E8001A] bg-[#E8001A]/20"
                                  : "border-white/10 text-white/60 bg-white/[0.03] hover:bg-white/[0.08] hover:border-white/20"
                              }`}
                            >
                              {t}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-white/80 tracking-wider uppercase block">
                          Extra Constraints (Optional)
                        </label>
                        <textarea
                          value={aiDetails}
                          onChange={(e) => setAiDetails(e.target.value)}
                          rows={2}
                          className="w-full bg-white/[0.03] border border-white/10 rounded-xl p-3 text-sm text-white placeholder-white/30 focus:border-[#E8001A] focus:bg-white/[0.05] focus:outline-none leading-relaxed transition-all"
                          placeholder="Audience parameters, keywords..."
                        />
                      </div>
                    </>
                  )}
                </div>

                <button
                  onClick={handleRun}
                  disabled={busy}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-[#E8001A] to-[#FF3333] text-white rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider hover:from-[#E8001A]/90 hover:to-[#FF3333]/90 disabled:opacity-50 transition-all shadow-lg shadow-[#E8001A]/30 cursor-pointer mt-4"
                >
                  {busy ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    currentTool.slug === "image" ? <Sparkles size={16} /> : <Wand2 size={16} />
                  )}
                  {busy ? "Drafting..." : (currentTool.slug === "image" ? "Generate Image" : "Generate Prompt")}
                </button>
              </div>

              {/* Outputs */}
              <div className="md:col-span-7 border-l border-white/10 md:pl-6 flex flex-col overflow-hidden">
                <div className="flex items-center justify-between mb-3 shrink-0">
                  <span className="text-xs font-bold text-white/70 tracking-wider uppercase">
                    Result Output
                  </span>
                  {textResult && currentTool.slug === "prompt" && (
                    <button
                      onClick={copyOutput}
                      className="flex items-center gap-1 text-xs text-[#E8001A] font-bold uppercase hover:text-[#FF3333] transition-colors cursor-pointer"
                    >
                      <Copy size={14} />
                      Copy Output
                    </button>
                  )}
                </div>

                <div className="flex-1 bg-white/[0.02] rounded-2xl border border-white/10 flex flex-col justify-center items-center overflow-hidden p-4 relative min-h-0">
                  {!busy && !aiImageResult && !textResult && (
                    <div className="text-center text-white/40">
                      <div className="w-10 h-10 bg-white/[0.05] shadow-sm border border-white/10 rounded-2xl flex items-center justify-center mx-auto mb-3 text-white/30">
                        {currentTool.slug === "image" ? <Sparkles size={20} /> : <Wand2 size={20} />}
                      </div>
                      <p className="text-xs font-bold uppercase tracking-wider">Awaiting Execution Input</p>
                    </div>
                  )}

                  {busy && (
                    <div className="text-center text-white/60">
                      <Loader2 size={32} className="animate-spin text-[#E8001A] mx-auto mb-3" />
                      <p className="text-xs font-bold uppercase tracking-wider">Rendering Industrial Workspace...</p>
                    </div>
                  )}

                  {/* Render Base64 Image */}
                  {!busy && aiImageResult?.image_base64 && (
                    <div className="w-full h-full flex flex-col relative min-h-0 overflow-hidden">
                      <img
                        src={`data:${aiImageResult.mime_type};base64,${aiImageResult.image_base64}`}
                        alt="Generated Industrial Visual"
                        className="w-full h-full object-contain rounded-xl"
                      />
                      <button
                        onClick={downloadAiImage}
                        className="absolute bottom-2.5 right-2.5 flex items-center gap-1.5 bg-[#E8001A]/90 hover:bg-[#E8001A] text-white rounded-lg px-3 py-1.5 text-xs font-bold uppercase transition-colors shadow-lg cursor-pointer"
                      >
                        <Download size={12} />
                        Download Visual
                      </button>
                    </div>
                  )}

                  {/* Render Extracted Text / Prompts */}
                  {!busy && textResult && (
                    <div className="w-full h-full flex flex-col min-h-0">
                      <pre className="flex-1 whitespace-pre-wrap font-mono text-xs sm:text-sm text-white/80 bg-white/[0.02] border border-white/10 rounded-xl p-3 overflow-y-auto leading-relaxed text-left">
                        {textResult}
                      </pre>
                      {currentTool.slug === "prompt" && (
                        <button
                          onClick={() => triggerDownload(new Blob([textResult], { type: "text/plain" }), "engineered-prompt.txt")}
                          className="mt-2.5 self-end flex items-center gap-1 text-xs text-[#E8001A] font-bold uppercase hover:text-[#FF3333] transition-colors cursor-pointer"
                        >
                          <Download size={12} />
                          Download as Text File
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            /* STANDARD FILE CONVERTERS LAYOUT */
            <div className="flex-1 min-h-0 grid md:grid-cols-12 gap-4 sm:gap-6 overflow-hidden">
              {/* Inputs & Parameters */}
              <div className="md:col-span-7 flex flex-col justify-between overflow-y-auto pr-1 pb-1">
                <div className="space-y-4">
                  {/* Drag and drop zone */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-white/80 tracking-wider uppercase block">
                      Upload Input File
                    </label>
                    <div
                      onDragEnter={handleDrag}
                      onDragOver={handleDrag}
                      onDragLeave={handleDrag}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                      className={`border-2 border-dashed rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ${
                        dragActive
                          ? "border-[#E8001A] bg-[#E8001A]/10"
                          : "border-white/20 hover:border-[#E8001A]/50 bg-white/[0.02] hover:bg-white/[0.05]"
                      }`}
                    >
                      <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        onChange={fileSelected}
                        multiple={currentTool.multi}
                        accept={currentTool.accept}
                      />
                      <Upload size={28} className="text-white/50 mb-2" />
                      <p className="text-sm font-bold text-white/80">
                        Drag & Drop your file here
                      </p>
                      <p className="text-xs text-white/50 mt-0.5">
                        Or click to browse (Supports {currentTool.multi ? "multiple files" : "single file"})
                      </p>
                    </div>
                  </div>

                  {/* Parameters inputs */}
                  {currentTool.params && currentTool.params.length > 0 && (
                    <div className="space-y-3 bg-white/[0.02] p-4 rounded-xl border border-white/10">
                      <h3 className="text-xs font-bold text-white/80 tracking-wider uppercase">
                        Configuration Controls
                      </h3>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {currentTool.params.map((p) => (
                          <div key={p.key} className="space-y-1">
                            <label className="text-[11px] font-bold text-white/60 tracking-wider uppercase block">
                              {p.label}
                            </label>
                            {p.type === "select" ? (
                              <select
                                value={params[p.key] || ""}
                                onChange={(e) => setParams({ ...params, [p.key]: e.target.value })}
                                className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:border-[#E8001A] focus:outline-none"
                              >
                                {p.options.map((opt) => (
                                  <option key={opt} value={opt}>
                                    {opt.toUpperCase()}
                                  </option>
                                ))}
                              </select>
                            ) : (
                              <input
                                type={p.type}
                                value={params[p.key] ?? ""}
                                placeholder={p.placeholder || ""}
                                onChange={(e) => setParams({
                                  ...params,
                                  [p.key]: p.type === "number" ? (e.target.value === "" ? "" : Number(e.target.value)) : e.target.value
                                })}
                                className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-3 py-2 text-xs text-white font-mono focus:border-[#E8001A] focus:outline-none"
                              />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <button
                  onClick={handleRun}
                  disabled={busy}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-[#E8001A] to-[#FF3333] text-white rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider hover:from-[#E8001A]/90 hover:to-[#FF3333]/90 disabled:opacity-50 transition-all shadow-lg shadow-[#E8001A]/30 cursor-pointer mt-4"
                >
                  {busy ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <Play size={16} />
                  )}
                  {busy ? "Processing Pipeline..." : "Execute Tool"}
                </button>
              </div>

              {/* Uploaded Files & Output result */}
              <div className="md:col-span-5 border-l border-white/10 md:pl-6 flex flex-col min-h-0 justify-between overflow-hidden">
                {/* Uploaded files section */}
                <div className="flex flex-col min-h-0 max-h-[160px] mb-4 shrink-0">
                  <h3 className="text-xs font-bold text-white/80 tracking-wider uppercase mb-2">
                    Uploaded Files ({files.length})
                  </h3>

                  {files.length === 0 ? (
                    <div className="text-center py-4 bg-white/[0.02] rounded-xl border border-white/10 text-white/40 text-xs">
                      No files selected
                    </div>
                  ) : (
                    <div className="space-y-1.5 overflow-y-auto flex-1 pr-1">
                      {files.map((file, idx) => (
                        <div key={idx} className="flex items-center justify-between p-2.5 bg-white/[0.03] border border-white/10 rounded-xl text-xs">
                          <div className="flex items-center gap-2 min-w-0">
                            <File size={14} className="text-white/40 shrink-0" />
                            <span className="font-medium text-white/80 truncate max-w-[150px]">
                              {file.name}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] text-white/40 font-mono">
                              {(file.size / 1024).toFixed(1)} KB
                            </span>
                            <button
                              onClick={() => removeFile(idx)}
                              className="text-[#E8001A]/70 hover:text-[#E8001A] cursor-pointer transition-colors"
                            >
                              <Trash2 size={12} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Processing Outputs */}
                <div className="flex-1 min-h-0 border border-white/10 bg-white/[0.02] rounded-2xl p-4 flex flex-col justify-center items-center overflow-hidden relative">
                  {!busy && !textResult && !doneFile && (
                    <div className="text-center text-white/40">
                      <div className="w-10 h-10 bg-white/[0.05] shadow-sm border border-white/10 rounded-2xl flex items-center justify-center mx-auto mb-2.5">
                        <FileCheck size={18} className="text-white/30" />
                      </div>
                      <p className="text-xs font-bold uppercase tracking-wider">Awaiting pipeline run</p>
                    </div>
                  )}

                  {busy && (
                    <div className="text-center text-white/50">
                      <Loader2 size={32} className="animate-spin text-[#E8001A] mx-auto mb-2.5" />
                      <p className="text-xs font-bold uppercase tracking-wider">Executing in memory...</p>
                    </div>
                  )}

                  {!busy && textResult && (
                    <div className="w-full h-full flex flex-col min-h-0">
                      <div className="flex items-center gap-1.5 text-[#E8001A] mb-1.5 shrink-0">
                        <CheckCircle size={14} />
                        <span className="text-[10px] font-bold uppercase tracking-wider">Text Extracted</span>
                      </div>
                      <pre className="flex-1 whitespace-pre-wrap font-mono text-xs text-white/80 bg-white/[0.02] border border-white/10 rounded-xl p-2.5 overflow-y-auto text-left leading-normal">
                        {textResult}
                      </pre>
                      <div className="flex gap-1.5 mt-2 self-end shrink-0">
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(textResult);
                            toast.success("Text copied!");
                          }}
                          className="flex items-center gap-1 px-3 py-1.5 border border-white/10 hover:bg-white/[0.08] text-white/80 rounded-lg text-xs font-bold uppercase transition-all cursor-pointer"
                        >
                          <Copy size={10} />
                          Copy
                        </button>
                        <button
                          onClick={() => triggerDownload(new Blob([textResult], { type: "text/plain" }), "extracted-content.txt")}
                          className="flex items-center gap-1 px-3 py-1.5 bg-[#E8001A] text-white rounded-lg text-xs font-bold uppercase hover:bg-[#FF3333] transition-all cursor-pointer"
                        >
                          <Download size={10} />
                          Download
                        </button>
                      </div>
                    </div>
                  )}

                  {!busy && doneFile && (
                    <div className="w-full space-y-3 shrink-0">
                      <div className="flex items-center gap-1.5 text-[#E8001A]">
                        <CheckCircle size={16} />
                        <span className="text-xs font-bold uppercase tracking-wider">Pipeline complete</span>
                      </div>
                      <div className="bg-white/[0.03] p-3 border border-white/10 rounded-xl">
                        <p className="font-mono text-xs text-white/80 break-all leading-normal">
                          {doneFile.filename}
                        </p>
                        <p className="font-mono text-[10px] text-white/40 mt-0.5">
                          {(doneFile.size / 1024).toFixed(1)} KB
                        </p>
                      </div>
                      <button
                        onClick={() => triggerDownload(doneFile.blob, doneFile.filename)}
                        className="w-full flex items-center justify-center gap-1.5 py-2.5 bg-[#E8001A] text-white rounded-lg text-xs font-bold uppercase hover:bg-[#FF3333] transition-colors shadow-lg shadow-[#E8001A]/30 cursor-pointer"
                      >
                        <Download size={14} /> Download Output File
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
