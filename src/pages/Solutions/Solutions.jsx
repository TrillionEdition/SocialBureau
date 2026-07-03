import React, { useState, useEffect, useMemo, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  FileText, Combine, Scissors, ArchiveRestore, FileImage, FileType, FileSymlink,
  Crop, ImageDown, ImagePlus, RotateCw, Contrast, Sparkles, Wand2,
  Upload, Trash2, Download, Copy, Play, Loader2, FileCheck, CheckCircle, File,
  Edit3, PenTool
} from "lucide-react";
import { BASE_URL } from "@/utils/urls";

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
    tools: [
      {
        slug: "merge",
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
        name: "PDF → Text",
        desc: "Extract raw text from a PDF (no download).",
        icon: FileText,
        endpoint: "/pdf/to-text",
        multi: false,
        accept: "application/pdf",
        params: [],
        textOutput: true,
      },
      {
        slug: "edit",
        name: "Edit PDF",
        desc: "Overlay custom text annotation on a specific page.",
        icon: Edit3,
        endpoint: "/pdf/edit",
        multi: false,
        accept: "application/pdf",
        params: [
          { key: "text", label: "Text to Add", type: "text", default: "Approved by SocialBureau" },
          { key: "page", label: "Page Number", type: "number", default: 1 },
          { key: "x", label: "X Coordinate (from left)", type: "number", default: 100 },
          { key: "y", label: "Y Coordinate (from bottom)", type: "number", default: 700 },
          { key: "fontSize", label: "Font Size", type: "number", default: 12 },
          {
            key: "color",
            label: "Color",
            type: "select",
            options: ["black", "blue", "red", "green"],
            default: "black",
          },
        ],
      },
      {
        slug: "sign",
        name: "Sign PDF",
        desc: "Add a digital signature (drawn, typed, or image) to a PDF.",
        icon: PenTool,
        endpoint: "/pdf/sign",
        multi: false,
        accept: "application/pdf",
        isCustomSign: true,
      },
    ],
  },
  {
    key: "image",
    label: "Image Toolkit",
    icon: Crop,
    tools: [
      {
        slug: "resize",
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
    tools: [
      {
        slug: "image",
        name: "AI Industrial Image",
        desc: "Generate factory, machinery, blueprint and product visuals.",
        icon: Sparkles,
        endpoint: "/ai/image",
        isCustomAi: true,
      },
      {
        slug: "prompt",
        name: "AI Prompt Engineer",
        desc: "Generate optimized prompts and industrial copy.",
        icon: Wand2,
        endpoint: "/ai/prompt",
        isCustomAi: true,
      },
    ],
  },
];

const SignaturePad = ({ onChange, onClear }) => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.strokeStyle = "#1e1b4b"; // Indigo-950
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
  }, []);

  const getCoordinates = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    
    // Support mouse and touch events
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    
    // Account for styling scaling if different from internal canvas size
    const x = ((clientX - rect.left) / rect.width) * canvas.width;
    const y = ((clientY - rect.top) / rect.height) * canvas.height;
    
    return { x, y };
  };

  const startDrawing = (e) => {
    e.preventDefault();
    const { x, y } = getCoordinates(e);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    e.preventDefault();
    const { x, y } = getCoordinates(e);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (canvas) {
      onChange(canvas.toDataURL("image/png"));
    }
  };

  const clear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    onClear();
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="border border-slate-200 rounded-xl overflow-hidden bg-slate-50 relative h-32">
        <canvas
          ref={canvasRef}
          width={400}
          height={128}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          className="w-full h-full cursor-crosshair touch-none"
        />
        <button
          type="button"
          onClick={clear}
          className="absolute bottom-2 right-2 px-2 py-1 bg-white hover:bg-slate-100 text-slate-500 rounded text-[9px] font-bold uppercase border border-slate-200 cursor-pointer shadow-sm"
        >
          Clear
        </button>
      </div>
      <p className="text-[9px] text-slate-400">
        Draw your signature inside the box using mouse or touch.
      </p>
    </div>
  );
};

export default function Solutions() {
  const [activeCategory, setActiveCategory] = useState("pdf");
  const [activeToolSlug, setActiveToolSlug] = useState("merge");
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

  // Sign PDF specific states
  const [sigType, setSigType] = useState("draw"); // draw, text, upload
  const [sigText, setSigText] = useState("John Doe");
  const [sigDrawData, setSigDrawData] = useState("");
  const [sigUploadedFile, setSigUploadedFile] = useState(null);
  const [sigPage, setSigPage] = useState(1);
  const [sigX, setSigX] = useState(100);
  const [sigY, setSigY] = useState(100);
  const [sigWidth, setSigWidth] = useState(120);
  const [sigHeight, setSigHeight] = useState(40);

  // Active category & tool config
  const currentCategory = useMemo(() => {
    return TOOL_CATEGORIES.find(c => c.key === activeCategory) || TOOL_CATEGORIES[0];
  }, [activeCategory]);

  const currentTool = useMemo(() => {
    return currentCategory.tools.find(t => t.slug === activeToolSlug) || currentCategory.tools[0];
  }, [currentCategory, activeToolSlug]);

  // Reset tool-specific states on tab change
  useEffect(() => {
    setFiles([]);
    setTextResult("");
    setDoneFile(null);
    setAiImageResult(null);

    // Reset signature fields
    setSigType("draw");
    setSigText("John Doe");
    setSigDrawData("");
    setSigUploadedFile(null);
    setSigPage(1);
    setSigX(100);
    setSigY(100);
    setSigWidth(120);
    setSigHeight(40);

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
    setActiveCategory(catKey);
    const cat = TOOL_CATEGORIES.find(c => c.key === catKey);
    if (cat && cat.tools.length > 0) {
      setActiveToolSlug(cat.tools[0].slug);
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

  // Signature image file upload handler
  const handleSigImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSigUploadedFile(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Sign PDF job execution
  const handleSignPdf = async () => {
    if (!files.length) {
      toast.error("Please upload a PDF file first");
      return;
    }

    let signatureData = "";
    if (sigType === "draw") {
      if (!sigDrawData) {
        toast.error("Please draw a signature first");
        return;
      }
      signatureData = sigDrawData;
    } else if (sigType === "text") {
      if (!sigText.trim()) {
        toast.error("Please enter a signature text");
        return;
      }
      signatureData = sigText;
    } else if (sigType === "upload") {
      if (!sigUploadedFile) {
        toast.error("Please upload a signature image first");
        return;
      }
      signatureData = sigUploadedFile;
    }

    setBusy(true);
    setDoneFile(null);
    setTextResult("");

    try {
      const fd = new FormData();
      fd.append("file", files[0]);
      fd.append("signatureType", sigType);
      fd.append("signatureData", signatureData);
      fd.append("x", sigX);
      fd.append("y", sigY);
      fd.append("page", sigPage);
      fd.append("width", sigWidth);
      fd.append("height", sigHeight);

      const url = `${BASE_URL}/api/pdf/sign`;
      const res = await axios.post(url, fd, {
        responseType: "blob",
        headers: { "Content-Type": "multipart/form-data" }
      });

      const disposition = res.headers["content-disposition"] || "";
      const match = disposition.match(/filename="?([^";]+)"?/);
      let filename = match ? match[1] : `signed_${Date.now()}.pdf`;

      setDoneFile({ blob: res.data, filename, size: res.data.size });
      toast.success("PDF signed successfully!");
    } catch (e) {
      console.error(e);
      if (e.response?.data instanceof Blob) {
        const text = await e.response.data.text();
        try {
          const parsed = JSON.parse(text);
          toast.error(parsed.message || parsed.error || "Signing failed");
        } catch {
          toast.error("Signing failed. Check inputs.");
        }
      } else {
        const msg = e?.response?.data?.message || e?.message || "Signing failed";
        toast.error(typeof msg === "string" ? msg : "Signing failed");
      }
    } finally {
      setBusy(false);
    }
  };

  // Run the job
  const handleRun = async () => {
    if (currentTool.isCustomSign) {
      await handleSignPdf();
      return;
    }

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
    <div className="w-full h-screen bg-slate-50 pt-16 pb-4 px-4 md:px-6 text-slate-800 flex flex-col overflow-hidden transition-all duration-300">
      <div className="max-w-7xl w-full mx-auto flex-1 flex flex-col min-h-0">
        
        {/* Title Header Inline with Categories (Row 1 - Canva / Ezgif Style) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200 pb-2 mb-2.5 shrink-0 gap-3">
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-black text-slate-900 tracking-tight uppercase whitespace-nowrap">
              Solutions Suite
            </h1>
            <span className="text-[9px] font-bold tracking-wider text-indigo-600 uppercase bg-indigo-50 px-2 py-0.5 rounded-full shrink-0">
              In-Memory Engine
            </span>
          </div>
          
          {/* Categories Tab Navigation */}
          <div className="flex gap-1 overflow-x-auto pb-px">
            {TOOL_CATEGORIES.map((cat) => {
              const CatIcon = cat.icon;
              const isActive = activeCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  onClick={() => handleCategoryChange(cat.key)}
                  className={`flex items-center gap-1.5 px-4 py-2 border-b-2 font-bold text-xs uppercase transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? "border-indigo-600 text-indigo-600 bg-white"
                      : "border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-100/50"
                  }`}
                >
                  <CatIcon size={14} />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tools Sub Navigation (Row 2 - Ezgif Style) */}
        <div className="flex flex-wrap gap-1.5 mb-3.5 bg-white p-1.5 rounded-xl border border-slate-100 shadow-sm shrink-0">
          {currentCategory.tools.map((tool) => {
            const ToolIcon = tool.icon;
            const isActive = activeToolSlug === tool.slug;
            return (
              <button
                key={tool.slug}
                onClick={() => setActiveToolSlug(tool.slug)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-100"
                    : "text-slate-500 hover:text-slate-800 hover:bg-slate-100"
                }`}
              >
                <ToolIcon size={12} />
                <span>{tool.name}</span>
              </button>
            );
          })}
        </div>

        {/* Main Workspace Card */}
        <div className="flex-1 bg-white border border-slate-100 shadow-[0_4px_25px_rgba(0,0,0,0.015)] rounded-2xl p-4 md:p-5 min-h-0 flex flex-col overflow-hidden">
          
          {/* Active Tool Summary */}
          <div className="mb-4 border-b border-slate-100 pb-3 shrink-0 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-tight flex items-center gap-2">
                <span className="p-1.5 bg-indigo-50 text-indigo-600 rounded-lg shrink-0">
                  {React.createElement(currentTool.icon, { size: 14 })}
                </span>
                {currentTool.name}
              </h2>
              <p className="text-[11px] text-slate-400 mt-0.5">{currentTool.desc}</p>
            </div>
          </div>

          {/* Render Tool Interface */}
          {currentTool.isCustomSign ? (
            /* SIGN PDF CUSTOM LAYOUT */
            <div className="flex-1 min-h-0 grid md:grid-cols-12 gap-6 overflow-hidden">
              {/* Left Side: Inputs & Signature pad */}
              <div className="md:col-span-7 flex flex-col justify-between overflow-y-auto pr-1 pb-1">
                <div className="space-y-4">
                  {/* PDF Upload */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-700 tracking-wider uppercase block">
                      Upload PDF to Sign
                    </label>
                    <div
                      onDragEnter={handleDrag}
                      onDragOver={handleDrag}
                      onDragLeave={handleDrag}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                      className={`border-2 border-dashed rounded-2xl p-5 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ${
                        dragActive
                          ? "border-indigo-600 bg-indigo-50/20"
                          : "border-slate-200 hover:border-indigo-400 bg-slate-50/50 hover:bg-slate-50"
                      }`}
                    >
                      <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        onChange={fileSelected}
                        multiple={false}
                        accept="application/pdf"
                      />
                      <Upload size={24} className="text-slate-400 mb-2" />
                      <p className="text-xs font-bold text-slate-700">
                        Drag & Drop your PDF file here
                      </p>
                      <p className="text-[10px] text-slate-400 mt-0.5">
                        Or click to browse
                      </p>
                    </div>
                  </div>

                  {/* Signature Type Selection Tabs */}
                  <div className="space-y-2 bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                    <label className="text-[10px] font-bold text-slate-700 tracking-wider uppercase block">
                      Choose Signature Type
                    </label>
                    <div className="grid grid-cols-3 gap-1 p-1 bg-slate-200/50 rounded-lg">
                      {["draw", "text", "upload"].map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setSigType(type)}
                          className={`py-1.5 text-[10px] font-bold uppercase rounded-md transition-all cursor-pointer ${
                            sigType === type
                              ? "bg-white text-indigo-600 shadow-sm"
                              : "text-slate-500 hover:text-slate-800"
                          }`}
                        >
                          {type === "draw" && "Draw"}
                          {type === "text" && "Type"}
                          {type === "upload" && "Upload Image"}
                        </button>
                      ))}
                    </div>

                    {/* Conditional Signature Inputs */}
                    <div className="mt-3">
                      {sigType === "draw" && (
                        <SignaturePad
                          onChange={(base64) => setSigDrawData(base64)}
                          onClear={() => setSigDrawData("")}
                        />
                      )}
                      {sigType === "text" && (
                        <div className="space-y-1.5">
                          <input
                            type="text"
                            value={sigText}
                            onChange={(e) => setSigText(e.target.value)}
                            placeholder="Enter signature text"
                            className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs font-semibold text-slate-800 focus:border-indigo-500 focus:outline-none"
                          />
                          <p className="text-[9px] text-slate-400">
                            Your signature will be styled in a beautiful dark-blue calligraphic script.
                          </p>
                        </div>
                      )}
                      {sigType === "upload" && (
                        <div className="space-y-2">
                          <div className="flex items-center justify-center border border-dashed border-slate-300 rounded-lg p-4 bg-white hover:bg-slate-50 transition-colors relative cursor-pointer">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleSigImageUpload}
                              className="absolute inset-0 opacity-0 cursor-pointer"
                            />
                            <div className="text-center">
                              <FileImage size={20} className="text-slate-400 mx-auto mb-1" />
                              <span className="text-[10px] text-indigo-650 font-bold uppercase">
                                {sigUploadedFile ? "Change Image" : "Select PNG/JPG Signature"}
                              </span>
                            </div>
                          </div>
                          {sigUploadedFile && (
                            <div className="border border-slate-100 rounded-lg p-2 bg-slate-100/50 flex justify-center items-center h-20 overflow-hidden">
                              <img
                                src={sigUploadedFile}
                                alt="Uploaded Signature Preview"
                                className="max-h-full max-w-full object-contain"
                              />
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Positioning Coordinates Controls */}
                  <div className="space-y-3 bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                    <h3 className="text-[10px] font-bold text-slate-700 tracking-wider uppercase">
                      Signature Placement & Size
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold text-slate-500 tracking-wider uppercase block">
                          Page Number
                        </label>
                        <input
                          type="number"
                          value={sigPage}
                          onChange={(e) => setSigPage(Math.max(1, parseInt(e.target.value) || 1))}
                          className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-750 font-mono focus:border-indigo-500 focus:outline-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold text-slate-500 tracking-wider uppercase block">
                          X (from Left)
                        </label>
                        <input
                          type="number"
                          value={sigX}
                          onChange={(e) => setSigX(parseInt(e.target.value) || 0)}
                          className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-750 font-mono focus:border-indigo-500 focus:outline-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold text-slate-500 tracking-wider uppercase block">
                          Y (from Bottom)
                        </label>
                        <input
                          type="number"
                          value={sigY}
                          onChange={(e) => setSigY(parseInt(e.target.value) || 0)}
                          className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-750 font-mono focus:border-indigo-500 focus:outline-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold text-slate-500 tracking-wider uppercase block">
                          Width
                        </label>
                        <input
                          type="number"
                          value={sigWidth}
                          disabled={sigType === "text"}
                          placeholder={sigType === "text" ? "Auto" : ""}
                          onChange={(e) => setSigWidth(parseInt(e.target.value) || 0)}
                          className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-750 font-mono focus:border-indigo-500 focus:outline-none disabled:opacity-50"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold text-slate-500 tracking-wider uppercase block">
                          Height
                        </label>
                        <input
                          type="number"
                          value={sigHeight}
                          disabled={sigType === "text"}
                          placeholder={sigType === "text" ? "Auto" : ""}
                          onChange={(e) => setSigHeight(parseInt(e.target.value) || 0)}
                          className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-750 font-mono focus:border-indigo-500 focus:outline-none disabled:opacity-50"
                        />
                      </div>
                    </div>
                    <p className="text-[10px] text-indigo-650 bg-indigo-50/50 p-2 rounded-lg leading-normal">
                      💡 <strong>Pro Tip:</strong> PDF coordinates start from the bottom-left corner of the page.
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleRun}
                  disabled={busy}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-indigo-600 text-white rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-indigo-700 disabled:opacity-50 transition-all shadow-md shadow-indigo-50 cursor-pointer mt-4"
                >
                  {busy ? (
                    <Loader2 size={14} className="animate-spin" />
                  ) : (
                    <PenTool size={14} />
                  )}
                  {busy ? "Applying Signature..." : "Sign PDF"}
                </button>
              </div>

              {/* Right Side: Uploaded file list & result download */}
              <div className="md:col-span-5 border-l border-slate-100 md:pl-6 flex flex-col min-h-0 justify-between overflow-hidden">
                {/* Uploaded PDF info */}
                <div className="flex flex-col min-h-0 max-h-[160px] mb-4 shrink-0">
                  <h3 className="text-[10px] font-bold text-slate-700 tracking-wider uppercase mb-2">
                    Uploaded PDF File ({files.length})
                  </h3>
                  {files.length === 0 ? (
                    <div className="text-center py-4 bg-slate-50/50 rounded-xl border border-slate-100 text-slate-400 text-[10px]">
                      No PDF uploaded
                    </div>
                  ) : (
                    <div className="flex items-center justify-between p-2.5 bg-slate-50 border border-slate-100 rounded-xl text-[11px]">
                      <div className="flex items-center gap-2 min-w-0">
                        <File size={14} className="text-slate-400 shrink-0" />
                        <span className="font-medium text-slate-700 truncate max-w-[150px]">
                          {files[0].name}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] text-slate-400 font-mono">
                          {(files[0].size / 1024).toFixed(1)} KB
                        </span>
                        <button
                          onClick={() => removeFile(0)}
                          className="text-red-500 hover:text-red-650 cursor-pointer"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Outputs */}
                <div className="flex-1 min-h-0 border border-slate-100 bg-slate-50 rounded-2xl p-4 flex flex-col justify-center items-center overflow-hidden relative">
                  {!busy && !doneFile && (
                    <div className="text-center text-slate-400">
                      <div className="w-10 h-10 bg-white shadow-sm border border-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-2.5">
                        <FileCheck size={18} className="text-slate-350" />
                      </div>
                      <p className="text-[10px] font-bold uppercase tracking-wider">Awaiting Signature Application</p>
                    </div>
                  )}

                  {busy && (
                    <div className="text-center text-slate-550">
                      <Loader2 size={28} className="animate-spin text-indigo-650 mx-auto mb-2.5" />
                      <p className="text-[10px] font-bold uppercase tracking-wider">Rendering signature in memory...</p>
                    </div>
                  )}

                  {!busy && doneFile && (
                    <div className="w-full space-y-3 shrink-0">
                      <div className="flex items-center gap-1.5 text-emerald-600">
                        <CheckCircle size={14} />
                        <span className="text-[10px] font-bold uppercase tracking-wider">PDF Signed Successfully</span>
                      </div>
                      <div className="bg-white p-3 border border-slate-100 rounded-xl">
                        <p className="font-mono text-[11px] text-slate-700 break-all leading-normal">
                          {doneFile.filename}
                        </p>
                        <p className="font-mono text-[9px] text-slate-400 mt-0.5">
                          {(doneFile.size / 1024).toFixed(1)} KB
                        </p>
                      </div>
                      <button
                        onClick={() => triggerDownload(doneFile.blob, doneFile.filename)}
                        className="w-full flex items-center justify-center gap-1.5 py-2 bg-emerald-600 text-white rounded-lg text-[10px] font-bold uppercase hover:bg-emerald-700 transition-colors shadow-md shadow-emerald-50 cursor-pointer"
                      >
                        <Download size={12} /> Download Signed PDF
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : currentTool.isCustomAi ? (
            /* AI TOOL LAYOUT */
            <div className="flex-1 min-h-0 grid md:grid-cols-12 gap-6 overflow-hidden">
              {/* Inputs */}
              <div className="md:col-span-5 flex flex-col justify-between overflow-y-auto pr-1 pb-1">
                <div className="space-y-4">
                  {currentTool.slug === "image" ? (
                    /* AI Image Inputs */
                    <>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-slate-700 tracking-wider uppercase block">
                          Describe Your Scene
                        </label>
                        <textarea
                          value={aiPrompt}
                          onChange={(e) => setAiPrompt(e.target.value)}
                          rows={3}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 focus:border-indigo-500 focus:bg-white focus:outline-none leading-relaxed transition-all"
                          placeholder="Provide details about machinery, automotive factory floor, layout..."
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-slate-700 tracking-wider uppercase block">
                          Select Preset Style
                        </label>
                        <div className="flex flex-wrap gap-1">
                          {PRESETS.map((p) => (
                            <button
                              key={p.key}
                              onClick={() => setAiStyle(p.value)}
                              className={`px-2 py-1 text-[9px] font-bold uppercase tracking-wider rounded-lg border transition-all cursor-pointer ${
                                aiStyle === p.value
                                  ? "border-indigo-600 text-indigo-600 bg-indigo-50"
                                  : "border-slate-200 text-slate-655 hover:border-slate-350"
                              }`}
                            >
                              {p.label}
                            </button>
                          ))}
                        </div>
                        <input
                          value={aiStyle}
                          onChange={(e) => setAiStyle(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-[10px] font-mono text-slate-500 focus:border-indigo-500 focus:outline-none"
                        />
                      </div>
                    </>
                  ) : (
                    /* AI Prompt Inputs */
                    <>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-slate-700 tracking-wider uppercase block">
                          Topic / Subject
                        </label>
                        <input
                          value={aiTopic}
                          onChange={(e) => setAiTopic(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-800 focus:border-indigo-500 focus:bg-white focus:outline-none transition-all"
                          placeholder="CNC machine, metal lathe..."
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-slate-700 tracking-wider uppercase block">
                          Use Case
                        </label>
                        <select
                          value={aiUseCase}
                          onChange={(e) => setAiUseCase(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-800 focus:border-indigo-500 focus:bg-white focus:outline-none transition-all"
                        >
                          {USE_CASES.map((u) => (
                            <option key={u.value} value={u.value}>
                              {u.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-slate-700 tracking-wider uppercase block">
                          Tone
                        </label>
                        <div className="flex flex-wrap gap-1">
                          {TONES.map((t) => (
                            <button
                              key={t}
                              onClick={() => setAiTone(t)}
                              className={`px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider rounded-lg border transition-all cursor-pointer ${
                                aiTone === t
                                  ? "border-indigo-600 text-indigo-600 bg-indigo-50"
                                  : "border-slate-200 text-slate-650 hover:border-slate-350"
                              }`}
                            >
                              {t}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-slate-700 tracking-wider uppercase block">
                          Extra Constraints (Optional)
                        </label>
                        <textarea
                          value={aiDetails}
                          onChange={(e) => setAiDetails(e.target.value)}
                          rows={2}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 focus:border-indigo-500 focus:bg-white focus:outline-none leading-relaxed transition-all"
                          placeholder="Audience parameters, keywords..."
                        />
                      </div>
                    </>
                  )}
                </div>

                <button
                  onClick={handleRun}
                  disabled={busy}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-indigo-600 text-white rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-indigo-700 disabled:opacity-50 transition-all shadow-md shadow-indigo-50 cursor-pointer mt-4"
                >
                  {busy ? (
                    <Loader2 size={14} className="animate-spin" />
                  ) : (
                    currentTool.slug === "image" ? <Sparkles size={14} /> : <Wand2 size={14} />
                  )}
                  {busy ? "Drafting..." : (currentTool.slug === "image" ? "Generate Image" : "Generate Prompt")}
                </button>
              </div>

              {/* Outputs */}
              <div className="md:col-span-7 border-l border-slate-100 md:pl-6 flex flex-col overflow-hidden">
                <div className="flex items-center justify-between mb-3 shrink-0">
                  <span className="text-[10px] font-bold text-slate-700 tracking-wider uppercase">
                    Result Output
                  </span>
                  {textResult && currentTool.slug === "prompt" && (
                    <button
                      onClick={copyOutput}
                      className="flex items-center gap-1 text-[10px] text-indigo-600 font-bold uppercase hover:text-indigo-700 transition-colors cursor-pointer"
                    >
                      <Copy size={12} />
                      Copy Output
                    </button>
                  )}
                </div>

                <div className="flex-1 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col justify-center items-center overflow-hidden p-4 relative min-h-0">
                  {!busy && !aiImageResult && !textResult && (
                    <div className="text-center text-slate-400">
                      <div className="w-10 h-10 bg-white shadow-sm border border-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-3 text-slate-350">
                        {currentTool.slug === "image" ? <Sparkles size={20} /> : <Wand2 size={20} />}
                      </div>
                      <p className="text-[10px] font-bold uppercase tracking-wider">Awaiting Execution Input</p>
                    </div>
                  )}

                  {busy && (
                    <div className="text-center text-slate-550">
                      <Loader2 size={30} className="animate-spin text-indigo-650 mx-auto mb-3" />
                      <p className="text-[10px] font-bold uppercase tracking-wider">Rendering Industrial Workspace...</p>
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
                        className="absolute bottom-2.5 right-2.5 flex items-center gap-1.5 bg-slate-900/90 hover:bg-slate-800 text-white rounded-lg px-3 py-1.5 text-[10px] font-bold uppercase transition-colors shadow-lg cursor-pointer"
                      >
                        <Download size={12} />
                        Download Visual
                      </button>
                    </div>
                  )}

                  {/* Render Extracted Text / Prompts */}
                  {!busy && textResult && (
                    <div className="w-full h-full flex flex-col min-h-0">
                      <pre className="flex-1 whitespace-pre-wrap font-mono text-[11px] text-slate-700 bg-white border border-slate-200/60 rounded-xl p-3.5 overflow-y-auto leading-relaxed text-left">
                        {textResult}
                      </pre>
                      {currentTool.slug === "prompt" && (
                        <button
                          onClick={() => triggerDownload(new Blob([textResult], { type: "text/plain" }), "engineered-prompt.txt")}
                          className="mt-2.5 self-end flex items-center gap-1 text-[10px] text-indigo-600 font-bold uppercase hover:text-indigo-700 transition-colors cursor-pointer"
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
            <div className="flex-1 min-h-0 grid md:grid-cols-12 gap-6 overflow-hidden">
              {/* Inputs & Parameters */}
              <div className="md:col-span-7 flex flex-col justify-between overflow-y-auto pr-1 pb-1">
                <div className="space-y-4">
                  {/* Drag and drop zone */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-700 tracking-wider uppercase block">
                      Upload Input File
                    </label>
                    <div
                      onDragEnter={handleDrag}
                      onDragOver={handleDrag}
                      onDragLeave={handleDrag}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                      className={`border-2 border-dashed rounded-2xl p-5 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ${
                        dragActive
                          ? "border-indigo-600 bg-indigo-50/20"
                          : "border-slate-200 hover:border-indigo-400 bg-slate-50/50 hover:bg-slate-50"
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
                      <Upload size={24} className="text-slate-400 mb-2" />
                      <p className="text-xs font-bold text-slate-700">
                        Drag & Drop your file here
                      </p>
                      <p className="text-[10px] text-slate-400 mt-0.5">
                        Or click to browse (Supports {currentTool.multi ? "multiple files" : "single file"})
                      </p>
                    </div>
                  </div>

                  {/* Parameters inputs */}
                  {currentTool.params && currentTool.params.length > 0 && (
                    <div className="space-y-3 bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                      <h3 className="text-[10px] font-bold text-slate-700 tracking-wider uppercase">
                        Configuration Controls
                      </h3>
                      {currentTool.slug === "edit" && (
                        <p className="text-[10px] text-indigo-650 bg-indigo-50/50 p-2 rounded-lg leading-normal">
                          💡 <strong>Pro Tip:</strong> PDF coordinates start from the bottom-left corner of the page.
                          A4 standard height is 842 points, width is 595. Letter standard height is 792, width is 612.
                        </p>
                      )}
                      <div className="grid sm:grid-cols-2 gap-3">
                        {currentTool.params.map((p) => (
                          <div key={p.key} className="space-y-1">
                            <label className="text-[9px] font-bold text-slate-500 tracking-wider uppercase block">
                              {p.label}
                            </label>
                            {p.type === "select" ? (
                              <select
                                value={params[p.key] || ""}
                                onChange={(e) => setParams({ ...params, [p.key]: e.target.value })}
                                className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 focus:border-indigo-500 focus:outline-none"
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
                                className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 font-mono focus:border-indigo-500 focus:outline-none"
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
                  className="w-full flex items-center justify-center gap-2 py-3 bg-indigo-600 text-white rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-indigo-700 disabled:opacity-50 transition-all shadow-md shadow-indigo-50 cursor-pointer mt-4"
                >
                  {busy ? (
                    <Loader2 size={14} className="animate-spin" />
                  ) : (
                    <Play size={14} />
                  )}
                  {busy ? "Processing Pipeline..." : "Execute Tool"}
                </button>
              </div>

              {/* Uploaded Files & Output result */}
              <div className="md:col-span-5 border-l border-slate-100 md:pl-6 flex flex-col min-h-0 justify-between overflow-hidden">
                {/* Uploaded files section */}
                <div className="flex flex-col min-h-0 max-h-[160px] mb-4 shrink-0">
                  <h3 className="text-[10px] font-bold text-slate-700 tracking-wider uppercase mb-2">
                    Uploaded Files ({files.length})
                  </h3>

                  {files.length === 0 ? (
                    <div className="text-center py-4 bg-slate-50/50 rounded-xl border border-slate-100 text-slate-400 text-[10px]">
                      No files selected
                    </div>
                  ) : (
                    <div className="space-y-1.5 overflow-y-auto flex-1 pr-1">
                      {files.map((file, idx) => (
                        <div key={idx} className="flex items-center justify-between p-2.5 bg-slate-50 border border-slate-100 rounded-xl text-[11px]">
                          <div className="flex items-center gap-2 min-w-0">
                            <File size={14} className="text-slate-400 shrink-0" />
                            <span className="font-medium text-slate-700 truncate max-w-[150px]">
                              {file.name}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-[9px] text-slate-400 font-mono">
                              {(file.size / 1024).toFixed(1)} KB
                            </span>
                            <button
                              onClick={() => removeFile(idx)}
                              className="text-red-500 hover:text-red-650 cursor-pointer"
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
                <div className="flex-1 min-h-0 border border-slate-100 bg-slate-50 rounded-2xl p-4 flex flex-col justify-center items-center overflow-hidden relative">
                  {!busy && !textResult && !doneFile && (
                    <div className="text-center text-slate-400">
                      <div className="w-10 h-10 bg-white shadow-sm border border-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-2.5">
                        <FileCheck size={18} className="text-slate-350" />
                      </div>
                      <p className="text-[10px] font-bold uppercase tracking-wider">Awaiting pipeline run</p>
                    </div>
                  )}

                  {busy && (
                    <div className="text-center text-slate-500">
                      <Loader2 size={28} className="animate-spin text-indigo-650 mx-auto mb-2.5" />
                      <p className="text-[10px] font-bold uppercase tracking-wider">Executing in memory...</p>
                    </div>
                  )}

                  {!busy && textResult && (
                    <div className="w-full h-full flex flex-col min-h-0">
                      <div className="flex items-center gap-1.5 text-emerald-600 mb-1.5 shrink-0">
                        <CheckCircle size={12} />
                        <span className="text-[9px] font-bold uppercase tracking-wider">Text Extracted</span>
                      </div>
                      <pre className="flex-1 whitespace-pre-wrap font-mono text-[10px] text-slate-700 bg-white border border-slate-200 rounded-xl p-2.5 overflow-y-auto text-left leading-normal">
                        {textResult}
                      </pre>
                      <div className="flex gap-1.5 mt-2 self-end shrink-0">
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(textResult);
                            toast.success("Text copied!");
                          }}
                          className="flex items-center gap-1 px-2.5 py-1 border border-slate-200 hover:bg-slate-100 text-slate-600 rounded-lg text-[9px] font-bold uppercase transition-all cursor-pointer"
                        >
                          <Copy size={10} />
                          Copy
                        </button>
                        <button
                          onClick={() => triggerDownload(new Blob([textResult], { type: "text/plain" }), "extracted-content.txt")}
                          className="flex items-center gap-1 px-2.5 py-1 bg-indigo-600 text-white rounded-lg text-[9px] font-bold uppercase hover:bg-indigo-700 transition-all cursor-pointer"
                        >
                          <Download size={10} />
                          Download
                        </button>
                      </div>
                    </div>
                  )}

                  {!busy && doneFile && (
                    <div className="w-full space-y-3 shrink-0">
                      <div className="flex items-center gap-1.5 text-emerald-600">
                        <CheckCircle size={14} />
                        <span className="text-[10px] font-bold uppercase tracking-wider">Pipeline complete</span>
                      </div>
                      <div className="bg-white p-3 border border-slate-100 rounded-xl">
                        <p className="font-mono text-[11px] text-slate-700 break-all leading-normal">
                          {doneFile.filename}
                        </p>
                        <p className="font-mono text-[9px] text-slate-400 mt-0.5">
                          {(doneFile.size / 1024).toFixed(1)} KB
                        </p>
                      </div>
                      <button
                        onClick={() => triggerDownload(doneFile.blob, doneFile.filename)}
                        className="w-full flex items-center justify-center gap-1.5 py-2 bg-emerald-600 text-white rounded-lg text-[10px] font-bold uppercase hover:bg-emerald-700 transition-colors shadow-md shadow-emerald-50 cursor-pointer"
                      >
                        <Download size={12} /> Download Output File
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
