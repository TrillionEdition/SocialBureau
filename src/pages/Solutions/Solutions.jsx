import React, { useState, useEffect, useMemo, useRef } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import {
  FileText, Combine, Scissors, ArchiveRestore, FileImage, FileType, FileSymlink,
  Crop, ImageDown, ImagePlus, RotateCw, Contrast, Sparkles, Wand2,
  Upload, Trash2, Download, Copy, Play, Loader2, FileCheck, CheckCircle, File,
  Edit3, PenTool
} from "lucide-react";
import { BASE_URL } from "@/utils/urls";
import { Helmet } from "react-helmet-async";

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
      {
        slug: "edit",
        urlSlug: "edit-pdf",
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
        urlSlug: "sign-pdf",
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

const InteractivePdfPreview = ({ 
  previewUrl, 
  onCoordsSelected, 
  selectedPage, 
  selectedX, 
  selectedY, 
  overlayText, 
  overlayColor,
  overlayFontSize,
  overlaySignature,
  sigType,
  sigWidth,
  sigHeight
}) => {
  const [pdfDoc, setPdfDoc] = useState(null);
  const [numPages, setNumPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [scale, setScale] = useState(1.0);
  const [viewportSize, setViewportSize] = useState({ width: 0, height: 0, pdfWidth: 0, pdfHeight: 0 });
  const [pdfjsLoaded, setPdfjsLoaded] = useState(!!window.pdfjsLib);

  useEffect(() => {
    if (window.pdfjsLib) {
      setPdfjsLoaded(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
    script.onload = () => {
      window.pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
      setPdfjsLoaded(true);
    };
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    if (!pdfjsLoaded || !previewUrl || !window.pdfjsLib) return;
    const loadingTask = window.pdfjsLib.getDocument(previewUrl);
    loadingTask.promise.then((pdf) => {
      setPdfDoc(pdf);
      setNumPages(pdf.numPages);
      setCurrentPage(1);
    }).catch((err) => {
      console.error("Error loading PDF with PDF.js:", err);
    });
  }, [pdfjsLoaded, previewUrl]);

  useEffect(() => {
    if (!pdfDoc || !canvasRef.current) return;
    pdfDoc.getPage(currentPage).then((page) => {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      
      const containerWidth = containerRef.current?.clientWidth || 400;
      const unscaledViewport = page.getViewport({ scale: 1.0 });
      const computedScale = Math.max(0.4, (containerWidth - 32) / unscaledViewport.width);
      const viewport = page.getViewport({ scale: computedScale });
      
      setScale(computedScale);
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      setViewportSize({ 
        width: viewport.width, 
        height: viewport.height, 
        pdfWidth: unscaledViewport.width, 
        pdfHeight: unscaledViewport.height 
      });

      const renderContext = {
        canvasContext: context,
        viewport: viewport,
      };
      page.render(renderContext);
    });
  }, [pdfDoc, currentPage]);

  const handleCanvasClick = (e) => {
    const canvas = canvasRef.current;
    if (!canvas || !viewportSize.pdfWidth) return;
    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const pdfX = (clickX / canvas.width) * viewportSize.pdfWidth;
    const pdfY = (1 - (clickY / canvas.height)) * viewportSize.pdfHeight;

    onCoordsSelected(currentPage, Math.round(pdfX), Math.round(pdfY));
  };

  const overlayLeft = viewportSize.pdfWidth 
    ? (selectedX / viewportSize.pdfWidth) * viewportSize.width 
    : 0;
  const overlayTop = viewportSize.pdfHeight 
    ? (1 - (selectedY / viewportSize.pdfHeight)) * viewportSize.height 
    : 0;

  const fs = overlayText 
    ? Math.max(8, Math.round(overlayFontSize * scale))
    : (overlaySignature && (sigType !== "draw" && sigType !== "upload"))
      ? Math.max(8, Math.round((overlayFontSize || 20) * scale))
      : 0;

  // Helvetica descender is roughly 22% of font size.
  // Add 3px for the bottom border (1px) and padding py-0.5 (2px).
  const offsetY = fs > 0 ? (fs * 0.22) + 3 : 0;

  return (
    <div ref={containerRef} className="w-full h-full flex flex-col items-center justify-between min-h-0">
      {numPages > 1 && (
        <div className="flex items-center gap-4 mb-2 shrink-0 bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl text-xs">
          <button
            type="button"
            onClick={() => {
              const prev = Math.max(1, currentPage - 1);
              setCurrentPage(prev);
              onCoordsSelected(prev, selectedX, selectedY);
            }}
            disabled={currentPage === 1}
            className="px-2 py-0.5 bg-white/10 rounded disabled:opacity-30 cursor-pointer font-bold hover:bg-white/20 transition-all text-white"
          >
            Prev
          </button>
          <span className="font-semibold text-white/85 font-mono">Page {currentPage} of {numPages}</span>
          <button
            type="button"
            onClick={() => {
              const next = Math.min(numPages, currentPage + 1);
              setCurrentPage(next);
              onCoordsSelected(next, selectedX, selectedY);
            }}
            disabled={currentPage === numPages}
            className="px-2 py-0.5 bg-white/10 rounded disabled:opacity-30 cursor-pointer font-bold hover:bg-white/20 transition-all text-white"
          >
            Next
          </button>
        </div>
      )}

      <div className="flex-1 w-full flex items-center justify-center min-h-0 overflow-y-auto relative p-2 scrollbar-hide">
        {!pdfjsLoaded ? (
          <div className="text-white/40 text-xs font-mono">Loading PDF library...</div>
        ) : !pdfDoc ? (
          <div className="text-white/40 text-xs font-mono">Rendering page...</div>
        ) : (
          <div className="relative border border-white/20 shadow-xl" style={{ width: viewportSize.width, height: viewportSize.height }}>
            <canvas 
              ref={canvasRef} 
              onClick={handleCanvasClick}
              className="cursor-crosshair block bg-white"
            />
            {selectedPage === currentPage && (
              <div 
                className="absolute pointer-events-none select-none"
                style={{ 
                  left: overlayLeft, 
                  top: overlayTop,
                  transform: `translate(0, calc(-100% + ${offsetY}px))`,
                }}
              >
                {overlayText ? (
                  <span 
                    style={{ 
                      color: overlayColor || "black", 
                      fontSize: `${fs}px`,
                      lineHeight: 1,
                      textShadow: "0 0 2px rgba(255,255,255,0.8)"
                    }}
                    className="font-bold whitespace-nowrap bg-yellow-400/20 px-1.5 py-0.5 rounded border border-yellow-400/40"
                  >
                    {overlayText}
                  </span>
                ) : overlaySignature ? (
                  sigType === "draw" || sigType === "upload" ? (
                    <img 
                      src={overlaySignature} 
                      style={{ 
                        width: `${Math.max(20, Math.round((sigWidth || 120) * scale))}px`, 
                        height: `${Math.max(10, Math.round((sigHeight || 40) * scale))}px`, 
                        objectFit: "contain",
                        filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))" 
                      }} 
                      alt="Signature Overlay" 
                    />
                  ) : (
                    <span 
                      className="font-serif italic text-black font-bold whitespace-nowrap bg-white/90 border border-slate-350 rounded px-1.5 py-0.5 shadow-md"
                      style={{ 
                        fontSize: `${fs}px`,
                        lineHeight: 1 
                      }}
                    >
                      {overlaySignature}
                    </span>
                  )
                ) : (
                  <div className="w-4 h-4 rounded-full bg-red-650 border-2 border-white animate-ping" />
                )}
              </div>
            )}
          </div>
        )}
      </div>
      <p className="text-[10px] text-white/40 mt-2 shrink-0">
        💡 Click directly on the PDF preview to set the placement coordinates instantly!
      </p>
    </div>
  );
};

const TOOL_SEO = {
  "merge-pdf": {
    title: "Merge PDF Online Free – Combine PDF Files Instantly | SocialBureau",
    h1: "Merge PDF Files Online",
    description: "Merge multiple PDF files into one document online for free. Fast, secure PDF merger with no signup, no limits and no watermark. Works on desktop and mobile.",
    keywords: "merge pdf, combine pdf files, join pdf online, free pdf merger, merge pdf files free, merge pdf files online, concatenate pdf, combine documents free, pdf joiner, combine pdfs, how to merge pdf files, combine pdf files free, merge pdf documents",
    body: [
      "Merge PDF Files Online is a free tool from SocialBureau that allows you to combine multiple PDF documents into a single, production-ready file within seconds. Simply upload your PDFs and click Merge — no registration, no installation, and no watermark, just a clean merged output ready for download.",
      "The merged file preserves all original formatting, fonts, embedded images, and page layouts without quality loss. This tool is ideal for businesses consolidating contracts, invoices, or reports; students compiling multi-part assignments; and designers assembling multi-page documents from separate exports.",
      "Your files are processed securely within your browser session. No data is stored permanently on our servers and the merged PDF is available for immediate download.",
    ],
    faqs: [
      { q: "Can I merge PDFs for free?", a: "Yes, SocialBureau's PDF merger is completely free with no signup required." },
      { q: "Is there a file size limit?", a: "You can merge multiple files up to the supported upload size per session." },
      { q: "Is my data secure?", a: "Files are processed securely and deleted after your session ends." },
      { q: "Does it work on mobile?", a: "Yes, fully responsive and works on all modern mobile browsers." },
      { q: "Will the merged PDF lose quality?", a: "No, original formatting, fonts, and images are fully preserved in the merged output." },
    ],
  },
  "split-pdf": {
    title: "Split PDF Online Free – Separate and Extract PDF Pages | SocialBureau",
    h1: "Split PDF Files Online",
    description: "Split a PDF into specific pages or custom page ranges online for free. Highly secure, no installation needed. Extract pages from PDF instantly.",
    keywords: "split pdf, extract pages from pdf, split pdf pages, divide pdf online, free pdf splitter, cut pdf, separate pdf pages, pdf page extractor, split pdf documents, pdf range splitter, extract pdf pages free, how to separate pages in pdf",
    body: [
      "Split PDF Files Online lets you extract any pages or custom page ranges from a PDF document instantly. Enter your desired ranges — for example 1-3, 5, 7-9 — and download the trimmed output in seconds.",
      "This is ideal for extracting invoice pages from a batch file, sharing specific sections of a report, or separating chapters from a long document. No account or software installation is needed — everything runs directly in your browser.",
      "The resulting PDF contains only the pages you selected, with all original formatting and content intact. Files are processed securely within your browser session and are not stored on our servers.",
    ],
    faqs: [
      { q: "Can I split a PDF for free?", a: "Yes, the tool is completely free with no login required." },
      { q: "What range format should I use?", a: "Use comma-separated ranges such as 1-3,5,7-9 to select specific pages." },
      { q: "Will splitting affect the original file?", a: "No, a new file is created. Your uploaded original is not modified." },
      { q: "Can I extract a single page?", a: "Yes, simply enter a single page number like 3 to extract that one page." },
      { q: "Does it work on mobile?", a: "Yes, fully compatible with all modern mobile browsers." },
    ],
  },
  "compress-pdf": {
    title: "Compress PDF Online Free – Reduce PDF File Size | SocialBureau",
    h1: "Compress PDF Online",
    description: "Reduce PDF file size online for free without losing quality. Optimize PDFs instantly for email, web, and storage. Safe and secure, no signup required.",
    keywords: "compress pdf, reduce pdf size, shrink pdf online, optimize pdf size, free pdf compressor, make pdf smaller, decrease pdf file size, compress pdf document, pdf optimizer free, online pdf size reducer, compress pdf quality, how to make a pdf smaller",
    body: [
      "Compress PDF Online reduces your PDF file size by optimizing internal streams and removing redundant data — without visually degrading your content. This is particularly useful when you need to email a large document, upload a PDF to a portal with strict size limits, or save storage space.",
      "Our compression engine works across all types of PDFs including text-heavy reports, image-rich brochures, and scanned documents. The output file retains all content, fonts, and structure while achieving a meaningfully smaller file size.",
      "No account or software installation required. Simply upload your PDF, click Compress, and download the optimized file instantly. Files are processed securely in your session and are not retained on our servers.",
    ],
    faqs: [
      { q: "Will compression reduce quality?", a: "Our tool optimizes file structure and streams. Visible content quality is typically fully preserved." },
      { q: "How much can a PDF be compressed?", a: "Results vary based on content type. PDFs with large images generally compress the most." },
      { q: "Is it free?", a: "Yes, completely free with no registration required." },
      { q: "Is my file secure?", a: "Files are processed in your session and deleted immediately after download." },
      { q: "Does it work on all devices?", a: "Yes, it works on desktop and mobile browsers without any installation." },
    ],
  },
  "pdf-to-images": {
    title: "Convert PDF to Images Online Free – Export PDF to PNG | SocialBureau",
    h1: "Convert PDF to Images Online",
    description: "Convert every page of a PDF to high-resolution PNG images online for free. Set custom DPI and download as a ZIP archive instantly. No signup needed.",
    keywords: "convert pdf to png, pdf to images, export pdf to image, pdf pages to png, high-dpi pdf to images, extract images from pdf, pdf converter, pdf to image zip, free online pdf to png, convert pdf to jpg, render pdf pages to images",
    body: [
      "Convert PDF to Images Online renders every page of your PDF document into high-resolution PNG images, packaged neatly into a ZIP archive for easy download. Choose your preferred DPI setting to balance output resolution against file size — higher DPI values produce sharper images suitable for print, while lower values are ideal for web or screen use.",
      "This tool is useful for extracting diagrams, sharing individual document pages as images, creating presentation slide assets, or archiving document content visually. It handles both text-heavy and image-rich PDFs with equal reliability.",
      "No software installation or account is needed. Upload your PDF, set the DPI, and the packaged images are ready for download within moments.",
    ],
    faqs: [
      { q: "What image format is the output?", a: "Each page is exported as a high-resolution PNG image." },
      { q: "How are the images delivered?", a: "All page images are packaged into a single ZIP file for easy download." },
      { q: "Can I control image quality?", a: "Yes, set the DPI to control output resolution. Higher DPI produces sharper images." },
      { q: "Is there a page limit?", a: "There is no strict page limit, but very large PDFs may take longer to process." },
      { q: "Is it free?", a: "Yes, completely free with no registration required." },
    ],
  },
  "images-to-pdf": {
    title: "Convert Images to PDF Online Free – Combine Photos into PDF | SocialBureau",
    h1: "Convert Images to PDF Online",
    description: "Combine multiple images into a single PDF online for free. Upload JPG, PNG, or WEBP files and download your PDF instantly. No registration required.",
    keywords: "convert images to pdf, jpg to pdf, png to pdf, combine photos to pdf, image to pdf converter, create pdf from images, online image to pdf, compile jpg to pdf, make pdf from png, multi image to pdf, free image to pdf converter",
    body: [
      "Convert Images to PDF Online compiles multiple image files into a single, shareable PDF document in seconds. Upload your JPG, PNG, BMP, or WEBP images, and the tool will arrange them one per page into a clean, standard PDF file.",
      "This is perfect for creating photo portfolios, scanned document archives, assignment submissions, product catalogues, or image-based presentations. Images are embedded at their original resolution to ensure the output PDF looks as sharp as your source files.",
      "No account or software installation is needed. Your files are processed securely within your session and the resulting PDF is available for immediate download.",
    ],
    faqs: [
      { q: "What image formats are supported?", a: "JPG, PNG, WEBP, and BMP images are all supported." },
      { q: "Can I upload multiple images?", a: "Yes, upload multiple images and they will all be compiled into a single PDF." },
      { q: "Will image quality be preserved?", a: "Yes, images are embedded at full resolution in the resulting PDF." },
      { q: "Is there a limit on the number of images?", a: "There is no strict limit, though very large batches may take more time to process." },
      { q: "Is it free?", a: "Yes, completely free with no registration needed." },
    ],
  },
  "pdf-to-word": {
    title: "Convert PDF to Word Online Free – Editable DOCX Converter | SocialBureau",
    h1: "Convert PDF to Word Online",
    description: "Convert PDF to editable Word (.docx) online for free. Highly accurate layout preservation. Fast, secure, and no watermark.",
    keywords: "convert pdf to word, pdf to docx, convert pdf to doc, free pdf to word converter, editable word document, pdf to docx online free, convert pdf to word docx, pdf to doc converter online free, convert pdf into editable document",
    body: [
      "Convert PDF to Word Online transforms your PDF documents into fully editable Microsoft Word (.docx) files in seconds. This is ideal when you need to edit, update, or reformat a document that only exists in PDF form — saving you hours of manual re-typing.",
      "Our converter attempts to preserve headings, paragraphs, tables, bullet points, and formatting as closely as possible in the Word output. The resulting .docx file is fully compatible with Microsoft Word, Google Docs, LibreOffice, and all major word processors.",
      "No account or installation required. Simply upload your PDF and download the DOCX file instantly. Files are processed securely and are not stored on our servers after your session ends.",
    ],
    faqs: [
      { q: "Is PDF to Word conversion free?", a: "Yes, completely free with no account required." },
      { q: "Will formatting be preserved?", a: "We preserve headings, paragraphs, and tables as closely as possible, though complex layouts may vary slightly." },
      { q: "What format is the output?", a: "The output is a text-based editable Word .docx file." },
      { q: "Does it work with scanned PDFs?", a: "Scanned PDFs contain images rather than text and may produce limited results without OCR." },
      { q: "Is my file secure?", a: "Files are processed in your session and are not stored after your download." },
    ],
  },
  "word-to-pdf": {
    title: "Convert Word to PDF Online Free – DOCX to PDF | SocialBureau",
    h1: "Convert Word to PDF Online",
    description: "Convert Microsoft Word (.docx) files to PDF online for free. Fast, accurate Word to PDF converter with no signup and no watermark.",
    keywords: "convert word to pdf, docx to pdf, convert doc to pdf, free word to pdf converter, docx to pdf converter online, Microsoft Word to PDF, docx to pdf free, convert word document to pdf online free",
    body: [
      "Convert Word to PDF Online transforms your Microsoft Word .docx documents into universally compatible PDF files in seconds. This ensures your document's formatting, fonts, tables, images, and layout look exactly as intended on any device, operating system, or screen size.",
      "PDF is the standard format for sharing final documents, submitting forms, and distributing reports professionally. Our converter maintains all content fidelity during the conversion process — no watermarks, no data loss.",
      "No account creation or software installation required. Upload your .docx file, and your PDF will be ready to download immediately. Files are processed securely and are not retained on our servers.",
    ],
    faqs: [
      { q: "Is Word to PDF conversion free?", a: "Yes, completely free with no login required." },
      { q: "Does it support .doc files?", a: "Currently only .docx format is supported. Please save your file as .docx before uploading." },
      { q: "Will my formatting be preserved?", a: "Yes, fonts, tables, images, and layout are faithfully preserved in the PDF output." },
      { q: "Does it work on mobile?", a: "Yes, fully compatible with all modern mobile browsers." },
      { q: "Is my file secure?", a: "Files are processed securely and deleted after your session ends." },
    ],
  },
  "pdf-to-text": {
    title: "Extract Text from PDF Online Free – PDF to TXT Converter | SocialBureau",
    h1: "Extract Text from PDF Online",
    description: "Extract raw text from any PDF document online for free. Copy to clipboard or download as a plain text file instantly. No signup required.",
    keywords: "extract text from pdf, pdf to txt, convert pdf to text, copy text from pdf, read pdf text online, pdf text extractor free, extract text from pdf file, pdf to text converter online, extract text from scanned pdf",
    body: [
      "Extract Text from PDF Online pulls all readable text content out of any PDF document and displays it as plain, copyable text — directly in your browser. This is useful for searching document content, feeding text into writing or translation tools, and extracting data from reports without re-typing.",
      "The tool works on PDFs with embedded text layers. All extracted text is presented in reading order across all pages, ready to copy to clipboard or download as a .txt file.",
      "No account or software needed. Simply upload your PDF and the full extracted text appears within seconds. Files are processed securely in your session and are not stored on our servers.",
    ],
    faqs: [
      { q: "Does it work with scanned PDFs?", a: "Scanned PDFs contain images rather than text layers, so text extraction will not work on them." },
      { q: "Can I download the extracted text?", a: "Yes, a download button allows you to save the extracted content as a .txt file." },
      { q: "Is it free?", a: "Yes, completely free with no registration needed." },
      { q: "Will all pages be extracted?", a: "Yes, text from all pages is extracted and displayed in reading order." },
      { q: "Is my file secure?", a: "Files are processed in your session and are not stored on our servers." },
    ],
  },
  "edit-pdf": {
    title: "Edit PDF Online Free – Add Text and Annotate PDFs | SocialBureau",
    h1: "Edit PDF Files Online",
    description: "Overlay custom text annotations on any page of your PDF file online for free. Easy click-to-place editor with font size and color controls.",
    keywords: "edit pdf online, annotate pdf, add text to pdf, overlay text on pdf, free pdf editor, write on pdf, write text on pdf document free, insert text in pdf, online pdf writer, annotate pdf online free, customize pdf text",
    body: [
      "Edit PDF Online is a free tool from SocialBureau that allows you to easily add custom text overlays and annotations directly onto your PDF documents. Simply upload your PDF, click anywhere on the page layout preview to place your text, and download your updated PDF instantly.",
      "You can configure font size, text alignment, and colors (black, blue, red, green) for the overlay. This tool is perfect for filling out forms, adding notes to designs, grading papers, or adding custom disclaimers to documents.",
      "Everything runs securely inside your web browser. No permanent copy of your uploaded or annotated file is stored on our servers.",
    ],
    faqs: [
      { q: "Can I edit PDF text for free?", a: "Yes, our tool lets you overlay text onto any PDF page completely free of charge." },
      { q: "How do I position the text?", a: "Click directly on the PDF preview layout to instantly place the text box where you want it." },
      { q: "Can I choose text colors?", a: "Yes, choose from black, blue, red, green, or input custom hex colors." },
      { q: "Is my data secure?", a: "Yes, files are processed dynamically in your browser memory and never stored." },
    ],
  },
  "sign-pdf": {
    title: "Sign PDF Online Free – Add Digital Signatures to PDF | SocialBureau",
    h1: "Sign PDF Files Online",
    description: "Add a secure digital signature to your PDF online for free. Draw, type, or upload an image signature and position it on any page instantly.",
    keywords: "sign pdf online, digital signature pdf, sign document free, sign pdf free, insert signature in pdf, sign contract online, write signature on pdf, draw signature online, typed signature creator, upload signature image, sign document electronically",
    body: [
      "Sign PDF Files Online is a free utility to overlay custom electronic signatures on your PDF. You can draw your signature using a mouse or touch screen, type your name to auto-generate a calligraphic signature, or upload a PNG signature image.",
      "Once created, click anywhere on the PDF page layout to place and size your signature. The backend burns the signature exactly onto the PDF canvas without altering structural metadata.",
      "Sign contracts, invoices, and agreements securely in seconds. No login or signup required, and your private files are processed securely in real-time.",
    ],
    faqs: [
      { q: "Is it free to sign a PDF?", a: "Yes, our electronic signature tool is completely free with no limits." },
      { q: "What signature types are supported?", a: "You can draw a signature, type your name, or upload an image (PNG/JPG)." },
      { q: "Can I size the signature?", a: "Yes, adjust the Width and Height inputs in real-time to fit signature areas." },
      { q: "Can I place it on any page?", a: "Yes, select the page number and click on the PDF preview to position it." },
    ],
  },
  "resize-image": {
    title: "Resize Image Online Free – Set Width & Height in Pixels | SocialBureau",
    h1: "Resize Image Online",
    description: "Resize JPG, PNG, and WEBP images to exact pixel dimensions online for free. Scale width and height with ease. No signup required.",
    keywords: "resize image online, change image dimensions, scale image px, resize jpg, resize png, free image resizer, image scale width height, crop image online, scale png, photo resizer online free, image pixel changer",
    body: [
      "Resize Image Online lets you scale any image to precise pixel dimensions in seconds. Enter your desired width and height in pixels, upload your image, and download the perfectly resized result immediately.",
      "This is useful for preparing images for websites with specific dimension requirements, social media platforms, product listings, print templates, and presentations. Supports JPG, PNG, WEBP, and BMP image formats.",
      "No account or software installation required. Enlarging an image beyond its original resolution may reduce sharpness, while downsizing generally produces clean, crisp results. Files are processed securely in your session.",
    ],
    faqs: [
      { q: "Can I resize without losing quality?", a: "Downsizing generally preserves quality. Enlarging beyond the original resolution may reduce sharpness." },
      { q: "What formats are supported?", a: "JPG, PNG, WEBP, and BMP images are all supported." },
      { q: "Can I set completely custom dimensions?", a: "Yes, enter any width and height in pixels for a fully custom result." },
      { q: "Is it free?", a: "Yes, completely free with no signup required." },
    ],
  },
  "compress-image": {
    title: "Compress Image Online Free – Optimize Image File Size | SocialBureau",
    h1: "Compress Image Online",
    description: "Reduce image file size online for free using quality control. Compress JPG, PNG, and WEBP images instantly. No signup or watermark.",
    keywords: "compress image online, reduce image size, compress png, compress jpg, shrink image file size, image optimizer, free image compressor, compress image online without losing quality, make image file smaller",
    body: [
      "Compress Image Online reduces your image file size by adjusting the JPEG quality level, making files significantly smaller for faster web page loading, leaner email attachments, or efficient cloud storage.",
      "Set the quality value between 1 (maximum compression, smallest file) and 95 (near-original quality, larger file) to find the right balance for your use case. A quality of 70–80 is typically the sweet spot for web images. Supports JPG, PNG, and WEBP input formats.",
      "No account or software required. Upload your image, adjust the quality, and download your compressed file instantly. No watermarks are added to compressed images.",
    ],
    faqs: [
      { q: "What quality setting should I use?", a: "A quality of 70–80 is a good balance between file size reduction and visual quality for most uses." },
      { q: "What formats are supported?", a: "JPG, PNG, and WEBP images are supported as inputs." },
      { q: "Is it free?", a: "Yes, completely free with no login required." },
      { q: "Will there be a watermark?", a: "No, there are no watermarks on compressed output images." },
    ],
  },
  "convert-image-format": {
    title: "Convert Image Format Online Free – PNG, JPG, WEBP | SocialBureau",
    h1: "Convert Image Format Online",
    description: "Convert images between PNG, JPG, WEBP, and BMP formats online for free. Fast, instant image conversion with no signup required.",
    keywords: "convert image format, png to jpg, jpg to webp, png to webp, webp to png, image converter online, change image file type free, png to jpg converter online free, convert photo to webp",
    body: [
      "Convert Image Format Online lets you instantly switch your image between PNG, JPG, WEBP, and BMP formats with a single click. Whether you need a PNG for transparent backgrounds, a WEBP for faster web loading, a JPG for universal compatibility, or a BMP for legacy software requirements — our converter handles all combinations.",
      "WEBP offers excellent compression with high visual quality and is ideal for web use. PNG supports transparency and is best for graphics. JPG is the most universally supported format for photos. BMP is an uncompressed format required by some older applications.",
      "No software installation or account required. Upload your image, choose the target format, and download the converted file instantly.",
    ],
    faqs: [
      { q: "Which formats are supported?", a: "Convert between PNG, JPG, WEBP, and BMP in any combination." },
      { q: "Does PNG to JPG conversion remove transparency?", a: "Yes, JPG does not support transparency. Transparent areas will be filled with a white background." },
      { q: "Is WEBP good for websites?", a: "Yes, WEBP offers excellent compression with high quality, making it ideal for web images." },
      { q: "Is it free?", a: "Yes, completely free with no signup required." },
    ],
  },
  "rotate-image": {
    title: "Rotate Image Online Free – Flip and Align Pictures | SocialBureau",
    h1: "Rotate Image Online",
    description: "Rotate images by any degree online for free. Clockwise, counterclockwise, or custom angle rotation. Supports JPG, PNG, WEBP. No signup.",
    keywords: "rotate image online, flip image, rotate picture, rotate jpg, rotate png, flip picture vertically, rotate image custom degree free, straighten photo online, horizontal image flip, image orientator",
    body: [
      "Rotate Image Online lets you rotate any image to any angle you choose. Enter a positive degree value to rotate clockwise, or a negative value for counterclockwise rotation. Common values like 90°, 180°, and 270° work perfectly for quick orientation fixes, while custom angles allow creative or precise adjustments.",
      "This tool is useful for correcting the orientation of photos taken at an angle, preparing design assets, adjusting scanned documents that came out sideways, or creating rotated versions for presentations. Supports JPG, PNG, WEBP, and BMP image formats.",
      "No account or software installation needed. Upload your image, enter the desired angle, and download the rotated result instantly.",
    ],
    faqs: [
      { q: "Can I rotate by any angle?", a: "Yes, enter any degree value — positive for clockwise, negative for counterclockwise rotation." },
      { q: "What formats are supported?", a: "JPG, PNG, WEBP, and BMP images are all supported." },
      { q: "Does rotation affect image quality?", a: "Rotation at non-right-angle values may introduce minor anti-aliasing at image edges, which is normal." },
      { q: "Is it free?", a: "Yes, completely free with no registration required." },
    ],
  },
  "grayscale-image": {
    title: "Convert Image to Grayscale Online Free – Black & White | SocialBureau",
    h1: "Convert Image to Grayscale Online",
    description: "Convert any image to grayscale (black and white) online for free. Lossless monochrome PNG output. Supports JPG, PNG, WEBP. No signup.",
    keywords: "convert image to grayscale, black and white image, make photo b&w, monochrome image converter, grayscale photo converter free, b&w filter online, remove color from picture online free",
    body: [
      "Convert Image to Grayscale Online strips all colour information from your image and outputs a clean, high-contrast monochrome PNG. This is useful for preparing print-ready designs, creating artistic black-and-white effects, meeting document requirements that call for grayscale images, or reducing the colour complexity of assets.",
      "The conversion retains full detail, shading, and tonal contrast while removing all colour channels. The output is always a PNG file to ensure lossless quality in the grayscale result. Supports JPG, PNG, WEBP, and BMP as input formats.",
      "No account or software installation required. Upload your image and the grayscale version is ready for download in seconds.",
    ],
    faqs: [
      { q: "What does grayscale mean?", a: "Grayscale converts a colour image to shades of black, white, and grey only — removing all colour information." },
      { q: "What format is the output?", a: "The output is always a PNG file to preserve lossless quality." },
      { q: "What input formats are supported?", a: "JPG, PNG, WEBP, and BMP images are all supported as inputs." },
      { q: "Is it free?", a: "Yes, completely free with no signup required." },
    ],
  },
  "ai-image-generator": {
    title: "AI Industrial Image Generator Free – Render Factory & CAD | SocialBureau",
    h1: "AI Industrial Image Generator",
    description: "Generate factory floors, machinery blueprints, and isometric CAD renders using AI. Free industrial image generator online. No signup required.",
    keywords: "ai industrial image generator, generate blueprint online, CAD layout generator, factory layout maker, industrial design ai, generate factory visual free, machinery layout ai, isometric blueprint generator",
    body: [
      "AI Industrial Image Generator uses advanced artificial intelligence to create photorealistic and stylised visuals of factory floors, industrial machinery, technical blueprints, and product mockups from a simple text description.",
      "Choose from preset styles — Blueprint, Factory Floor, Isometric CAD, Product Mock, and Heavy Machinery — or write a fully custom prompt to describe your scene in detail. The AI generates a high-quality image within seconds, ready to download as a PNG file.",
      "This tool is ideal for marketing materials, pitch decks, technical presentations, concept visualisation, and social media content — without the cost or logistics of a professional photography shoot.",
    ],
    faqs: [
      { q: "What types of images can it generate?", a: "Factory floors, machinery close-ups, technical blueprints, isometric CAD renders, and industrial product mockups." },
      { q: "Can I write a custom prompt?", a: "Yes, describe your scene in detail and the AI will generate a matching image." },
      { q: "What are preset styles?", a: "Presets are curated style guides that shape the visual output — e.g. Blueprint, Factory Floor, Isometric CAD." },
      { q: "Is it free?", a: "Yes, completely free to use with no account required." },
    ],
  },
  "ai-prompt-engineer": {
    title: "AI Prompt Engineer for Industrial Content – Free Online | SocialBureau",
    h1: "AI Prompt Engineer Online",
    description: "Optimize AI prompts and generate technical specifications, safety notices, marketing copy, or social posts for industrial topics. Free AI prompt writer.",
    keywords: "ai prompt engineer, write prompts online, industrial safety writer, technical specification generator, copywriter generator, prompt optimizer free, engineering copy writer ai",
    body: [
      "AI Prompt Engineer Online uses AI to generate high-quality, purpose-built text content for industrial and manufacturing topics. Provide a subject, choose your use case — marketing copy, technical specification, safety notice, or social media post — select a tone, and receive a fully drafted output in seconds.",
      "This tool is especially useful for creating content ready to feed into AI image generators, or for directly using in marketing campaigns, product catalogues, internal documents, and training materials. The tone options — technical, persuasive, formal, concise — let you tailor the output precisely.",
      "All generated content can be copied to clipboard or downloaded as a plain text file for use anywhere.",
    ],
    faqs: [
      { q: "What content types can it generate?", a: "Marketing copy, technical specifications, factory image prompts, product image prompts, safety notices, and social media posts." },
      { q: "Can I customise the tone?", a: "Yes, choose from technical, persuasive, formal, or concise tones to match your audience." },
      { q: "Can I copy the output?", a: "Yes, use the Copy button to copy the full generated output to your clipboard." },
      { q: "Can I download the output?", a: "Yes, download the generated content as a plain text .txt file." },
      { q: "Is it free?", a: "Yes, completely free with no registration required." },
    ],
  },
  "solutions-landing": {
    title: "Free PDF Tools, Image Converter & AI Solutions | SocialBureau",
    h1: "Solutions Suite",
    description: "Explore our collection of free, secure online document, image processing, and AI tools. Built for speed, quality, and complete browser-level privacy.",
    keywords: "free online pdf tools, image converter tools, industrial ai studio, merge pdf, convert docx to pdf, compress images free, edit pdf online, digital signature maker, text extractor, image resizer online",
    body: [
      "The SocialBureau Solutions Suite offers a comprehensive set of free, fast, and completely secure online tools. Our utilities run locally in your browser, ensuring that your confidential documents, private photos, and sensitive data are processed with complete privacy.",
      "Whether you need to merge or compress business PDF reports, scale and convert image files for web development, or harness generative AI to create high-quality factory layouts and engineering prompts, the Solutions Suite provides a professional-grade workspace with no signup required.",
    ],
    faqs: [
      { q: "Are the tools free to use?", a: "Yes, all tools in the SocialBureau Solutions Suite are completely free with no registration or signup required." },
      { q: "Is my data secure?", a: "Absolutely. Your files are processed securely in your browser session and are not stored permanently on our servers." },
      { q: "Do I need to install any software?", a: "No. All tools are fully web-based and work instantly on desktop and mobile browsers." },
    ],
  },
  "pdf-landing": {
    title: "Online PDF Toolkit – Free PDF Editor, Merger & Converter | SocialBureau",
    h1: "PDF Toolkit",
    description: "Free, secure, and fast online PDF tools. Merge multiple PDFs, split page ranges, compress file size, convert to/from Word and images, sign and edit PDFs.",
    keywords: "online pdf toolkit, free pdf editor, pdf merger, pdf page splitter, compress pdf free, convert pdf to word, docx to pdf converter, sign contract pdf online, annotate pdf file online free",
    body: [
      "Optimize your document workflows with SocialBureau's PDF Toolkit. Our suite of PDF utilities allows you to organize, compress, and edit PDF files online without compromising on layout quality or security.",
      "From splitting long manuals to signing official contracts or converting DOCX documents into standard PDFs, everything is executed securely in real-time.",
    ],
    faqs: [
      { q: "Can I merge multiple PDFs at once?", a: "Yes, our Merge PDF tool supports uploading and combining multiple documents in one pipeline." },
      { q: "Can I sign documents electronically?", a: "Yes, the Sign PDF tool allows you to draw, type, or upload an image of your signature." },
    ],
  },
  "image-landing": {
    title: "Online Image Toolkit – Free Image Resizer, Compressor & Converter | SocialBureau",
    h1: "Image Toolkit",
    description: "Optimize and edit your images online for free. Resize to exact dimensions, compress with JPG quality control, convert formats (PNG, JPG, WEBP), and rotate.",
    keywords: "online image toolkit, free image resizer, image compressor online, convert png to jpg, convert jpg to webp, rotate photo online, grayscale converter free, image optimizer for websites",
    body: [
      "Process and optimize graphics instantly with the SocialBureau Image Toolkit. Designed for web designers, content creators, and developers, this suite makes image manipulation fast and effortless.",
      "Quickly scale image widths, reduce file sizes for web load-time optimizations, and convert between popular formats including PNG, JPG, WEBP, and BMP.",
    ],
    faqs: [
      { q: "Which image formats are supported?", a: "We support PNG, JPG, WEBP, and BMP image formats for resizing, compression, and format conversions." },
      { q: "Will image quality degrade after compression?", a: "Our Compress Image tool provides a quality slider (1-95) so you can control the exact compression level." },
    ],
  },
  "ai-landing": {
    title: "AI Studio – Free Factory Image Generator & Prompt Optimizer | SocialBureau",
    h1: "AI Studio",
    description: "Harness artificial intelligence to generate photorealistic industrial visuals, blueprint layouts, CAD-style renders, and draft professional technical copy or prompts.",
    keywords: "ai studio free, factory image generator, prompt optimizer online, generate blueprint online, industrial safety writer, CAD layout generator, copywriter generator, AI prompt engineer",
    body: [
      "Step into the future of industrial design and content creation with SocialBureau's AI Studio. Using advanced neural generation models, we make it easy to draft high-quality copy and render stunning technical visuals.",
      "Generate custom blueprint styles, factory floors, CAD renders, or use the Prompt Engineer to draft highly persuasive safety manuals, technical specifications, and marketing posts.",
    ],
    faqs: [
      { q: "How long does AI image generation take?", a: "Typically, generating a custom photorealistic or CAD industrial visual takes between 5 to 10 seconds." },
      { q: "Can I download the AI-drafted prompts?", a: "Yes, you can copy the drafted prompts directly to your clipboard or download them as a standard text file." },
    ],
  },
};

export default function Solutions() {
  const { toolUrl } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // Derive path-based category
  const pathCategory = useMemo(() => {
    const segments = location.pathname.split("/").filter(Boolean);
    const prefix = segments[0] || "";
    if (prefix === "pdf-tools") return "pdf";
    if (prefix === "image-tools") return "image";
    if (prefix === "ai-studio") return "ai";
    return "all";
  }, [location.pathname]);

  const isWorkspaceMode = !!toolUrl;

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

  // Flatten tools with tag mapping
  const flatToolsList = useMemo(() => {
    const list = [];
    TOOL_CATEGORIES.forEach((cat) => {
      cat.tools.forEach((tool) => {
        let tags = [];
        if (cat.key === "pdf") {
          if (tool.slug === "merge" || tool.slug === "split") {
            tags = ["workflows", "organize"];
          } else if (tool.slug === "compress") {
            tags = ["workflows", "optimize"];
          } else if (["to-images", "from-images", "to-word", "from-word"].includes(tool.slug)) {
            tags = ["convert"];
          } else if (tool.slug === "to-text") {
            tags = ["convert", "intelligence"];
          } else if (tool.slug === "edit") {
            tags = ["edit"];
          } else if (tool.slug === "sign") {
            tags = ["edit", "security"];
          }
        } else if (cat.key === "image") {
          if (tool.slug === "resize") {
            tags = ["resize"];
          } else if (tool.slug === "compress") {
            tags = ["compress"];
          } else if (tool.slug === "convert") {
            tags = ["convert"];
          } else if (tool.slug === "rotate" || tool.slug === "grayscale") {
            tags = ["adjust"];
          }
        } else if (cat.key === "ai") {
          tags = ["ai", "intelligence"];
        }

        list.push({
          ...tool,
          category: cat.key,
          urlPrefix: cat.urlPrefix,
          tags,
        });
      });
    });
    return list;
  }, []);

  const [activeFilter, setActiveFilter] = useState("all");

  // Reset active filter when category path changes
  useEffect(() => {
    setActiveFilter("all");
  }, [pathCategory]);

  // Filtered tools for directory view
  const filteredTools = useMemo(() => {
    let result = flatToolsList;
    if (pathCategory !== "all") {
      result = result.filter((t) => t.category === pathCategory);
    }
    if (activeFilter !== "all") {
      result = result.filter((t) => t.tags.includes(activeFilter));
    }
    return result;
  }, [flatToolsList, pathCategory, activeFilter]);

  const [files, setFiles] = useState([]);
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    if (files && files[0]) {
      const file = files[0];
      const isImage = file.type.startsWith("image/") || file.name.toLowerCase().match(/\.(jpe?g|png|gif|webp|bmp)$/i);
      const isPdf = file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
      if (isImage || isPdf) {
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
        return () => {
          URL.revokeObjectURL(url);
        };
      }
    }
    setPreviewUrl(null);
  }, [files]);

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

  const [donePreviewUrl, setDonePreviewUrl] = useState(null);

  useEffect(() => {
    if (doneFile && doneFile.blob) {
      const url = URL.createObjectURL(doneFile.blob);
      setDonePreviewUrl(url);
      return () => {
        URL.revokeObjectURL(url);
      };
    } else {
      setDonePreviewUrl(null);
    }
  }, [doneFile]);

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
  const [sigFontSize, setSigFontSize] = useState(20);

  const currentTool = useMemo(() => {
    return currentCategory.tools.find(t => t.slug === activeToolSlug) || currentCategory.tools[0];
  }, [currentCategory, activeToolSlug]);

  const toolSeo = TOOL_SEO[currentTool?.urlSlug] || {};

  const seo = useMemo(() => {
    if (isWorkspaceMode) return toolSeo;
    if (pathCategory === "pdf") return TOOL_SEO["pdf-landing"];
    if (pathCategory === "image") return TOOL_SEO["image-landing"];
    if (pathCategory === "ai") return TOOL_SEO["ai-landing"];
    return TOOL_SEO["solutions-landing"];
  }, [isWorkspaceMode, toolSeo, pathCategory]);

  const getBadgeStyle = (category) => {
    switch (category) {
      case "pdf":
        return {
          bg: "bg-red-500/10 border border-red-500/20",
          text: "text-[#E8001A]"
        };
      case "image":
        return {
          bg: "bg-emerald-500/10 border border-emerald-500/20",
          text: "text-emerald-400"
        };
      case "ai":
        return {
          bg: "bg-violet-500/10 border border-violet-500/20",
          text: "text-violet-400"
        };
      default:
        return {
          bg: "bg-white/10 border border-white/20",
          text: "text-white"
        };
    }
  };

  // Backwards compatibility for query parameter links from Navbar
  const queryParams = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const categoryParam = queryParams.get("category");
  const toolParam = queryParams.get("tool");

  useEffect(() => {
    if (categoryParam && toolParam) {
      const cat = TOOL_CATEGORIES.find((c) => c.key === categoryParam);
      if (cat) {
        const tool = cat.tools.find((t) => t.slug === toolParam);
        if (tool) {
          navigate(`/${cat.urlPrefix}/${tool.urlSlug}`, { replace: true });
        }
      }
    }
  }, [categoryParam, toolParam, navigate]);

  const seoDummyPlaceholder = {};

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
    setSigFontSize(20);

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

  const handleCoordsSelectedForEdit = React.useCallback((page, x, y) => {
    setParams((prev) => ({
      ...prev,
      page,
      x,
      y,
    }));
  }, []);

  const handleCoordsSelectedForSign = React.useCallback((page, x, y) => {
    setSigPage(page);
    setSigX(x);
    setSigY(y);
  }, []);

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
      fd.append("fontSize", sigFontSize);

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

  const currentSubFilters = useMemo(() => {
    if (pathCategory === "pdf") {
      return [
        { key: "all", label: "All" },
        { key: "workflows", label: "Workflows" },
        { key: "organize", label: "Organize PDF" },
        { key: "optimize", label: "Optimize PDF" },
        { key: "convert", label: "Convert PDF" },
        { key: "edit", label: "Edit PDF" },
        { key: "security", label: "PDF Security" },
        { key: "intelligence", label: "PDF Intelligence" },
      ];
    }
    if (pathCategory === "image") {
      return [
        { key: "all", label: "All" },
        { key: "resize", label: "Resize" },
        { key: "compress", label: "Compress" },
        { key: "convert", label: "Convert" },
        { key: "adjust", label: "Adjust" },
      ];
    }
    return [];
  }, [pathCategory]);

  return (
    <div className="w-full min-h-screen bg-[#0A0A0A] pt-20 pb-8 px-4 sm:px-6 lg:px-8 text-white flex flex-col transition-all duration-300">
      <Helmet>
        <title>{seo.title || (isWorkspaceMode ? `${currentTool?.name} | SocialBureau` : "Solutions Suite | SocialBureau")}</title>
        <meta name="description" content={seo.description || (isWorkspaceMode ? currentTool?.desc : "Explore SocialBureau's comprehensive toolkit of document, image, and AI utilities.")} />
        {seo.keywords && <meta name="keywords" content={seo.keywords} />}
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content={seo.title || (isWorkspaceMode ? `${currentTool?.name} | SocialBureau` : "Solutions Suite | SocialBureau")} />
        <meta property="og:description" content={seo.description || (isWorkspaceMode ? currentTool?.desc : "Explore SocialBureau's comprehensive toolkit of document, image, and AI utilities.")} />
        <meta property="og:type" content="website" />
        <meta 
          property="og:url" 
          content={isWorkspaceMode 
            ? `https://www.socialbureau.in/${currentCategory.urlPrefix}/${currentTool?.urlSlug}` 
            : `https://www.socialbureau.in/${pathCategory === "all" ? "solutions" : currentCategory.urlPrefix}`
          } 
        />
        <meta property="og:image" content="https://www.socialbureau.in/og-image.png" />
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seo.title || (isWorkspaceMode ? `${currentTool?.name} | SocialBureau` : "Solutions Suite | SocialBureau")} />
        <meta name="twitter:description" content={seo.description || (isWorkspaceMode ? currentTool?.desc : "Explore SocialBureau's comprehensive toolkit of document, image, and AI utilities.")} />
        <meta name="twitter:image" content="https://www.socialbureau.in/og-image.png" />

        <link 
          rel="canonical" 
          href={isWorkspaceMode 
            ? `https://www.socialbureau.in/${currentCategory.urlPrefix}/${currentTool?.urlSlug}` 
            : `https://www.socialbureau.in/${pathCategory === "all" ? "solutions" : currentCategory.urlPrefix}`
          } 
        />
      </Helmet>
      <style>{scrollbarHideStyle}</style>
      <div className="max-w-7xl w-full mx-auto flex-1 flex flex-col min-h-0">
        
        {/* Title Header */}
        <div className="flex flex-col items-center text-center mb-6 sm:mb-8 shrink-0">
          <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-1">
            {isWorkspaceMode ? "Tool Workspace" : "Solutions Suite"}
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight uppercase mb-2 bg-gradient-to-r from-[#E8001A] to-[#FF3333] bg-clip-text text-transparent">
            {seo.h1 || "Solutions Suite"}
          </h1>
          <p className="text-sm sm:text-base text-white/60 font-medium max-w-2xl">
            {isWorkspaceMode ? currentTool?.desc : (seo.description || "Fast, secure, and production-ready toolkits for your documents and assets.")}
          </p>
        </div>

        {/* Categories Tab Navigation */}
        <div className="mb-4 sm:mb-6 shrink-0">
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 md:flex-wrap md:justify-center scrollbar-hide">
            {!isWorkspaceMode && (
              <button
                onClick={() => navigate("/solutions")}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-bold text-xs sm:text-sm uppercase tracking-wider transition-all whitespace-nowrap flex-shrink-0 ${
                  pathCategory === "all"
                    ? "bg-[#E8001A] text-white shadow-lg shadow-[#E8001A]/30 border border-[#E8001A]"
                    : "bg-white/5 text-white/70 border border-white/10 hover:bg-white/10 hover:text-white hover:border-[#E8001A]/50"
                }`}
              >
                <FileText size={16} />
                <span>All Tools</span>
              </button>
            )}
            {TOOL_CATEGORIES.map((cat) => {
              const CatIcon = cat.icon;
              const isActive = pathCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  onClick={() => navigate(isWorkspaceMode ? `/${cat.urlPrefix}/${cat.tools[0].urlSlug}` : `/${cat.urlPrefix}`)}
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

        {/* Horizontal Sub-Filters or Tool Selection */}
        {!isWorkspaceMode ? (
          currentSubFilters.length > 0 && (
            <div className="flex gap-2 overflow-x-auto pb-3 md:pb-0 md:flex-wrap md:justify-center mb-6 shrink-0 scrollbar-hide">
              {currentSubFilters.map((filter) => {
                const isActive = activeFilter === filter.key;
                return (
                  <button
                    key={filter.key}
                    onClick={() => setActiveFilter(filter.key)}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex-shrink-0 border ${
                      isActive
                        ? "bg-white text-black border-white shadow-md"
                        : "bg-white/5 text-white/60 border-white/10 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <span>{filter.label}</span>
                  </button>
                );
              })}
            </div>
          )
        ) : (
          <div className="flex gap-2 overflow-x-auto pb-3 md:pb-0 md:flex-wrap md:justify-center mb-4 sm:mb-6 shrink-0 scrollbar-hide">
            <button
              onClick={() => navigate("/solutions")}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-all bg-white/10 text-white border border-white/20 hover:bg-white/20 hover:border-white/30 cursor-pointer flex-shrink-0"
            >
              <span>← Back</span>
            </button>
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
        )}

        {isWorkspaceMode ? (
          /* Main Workspace Card */
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
            {currentTool.isCustomSign ? (
            /* SIGN PDF CUSTOM LAYOUT */
            <div className="flex-1 min-h-0 grid md:grid-cols-12 gap-6 overflow-hidden">
              {/* Left Side: Inputs & Signature pad */}
              <div className="md:col-span-7 flex flex-col justify-between overflow-y-auto pr-1 pb-1">
                <div className="space-y-4">
                  {/* PDF Upload */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-white/50 tracking-wider uppercase block">
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
                          ? "border-indigo-500 bg-indigo-500/10"
                          : "border-white/10 hover:border-indigo-500/50 bg-white/[0.02] hover:bg-white/[0.05]"
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
                      <Upload size={24} className="text-white/40 mb-2" />
                      <p className="text-xs font-bold text-white/80">
                        Drag & Drop your PDF file here
                      </p>
                      <p className="text-[10px] text-white/40 mt-0.5">
                        Or click to browse
                      </p>
                    </div>
                  </div>

                  {/* Signature Type Selection Tabs */}
                  <div className="space-y-2 bg-white/[0.02] p-3.5 rounded-xl border border-white/10">
                    <label className="text-[10px] font-bold text-white/50 tracking-wider uppercase block">
                      Choose Signature Type
                    </label>
                    <div className="grid grid-cols-3 gap-1 p-1 bg-white/[0.04] rounded-lg">
                      {["draw", "text", "upload"].map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setSigType(type)}
                          className={`py-1.5 text-[10px] font-bold uppercase rounded-md transition-all cursor-pointer ${
                            sigType === type
                              ? "bg-indigo-650 text-white shadow-sm"
                              : "text-white/60 hover:text-white"
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
                            className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-3 py-2 text-xs font-semibold text-white placeholder-white/30 focus:border-indigo-500 focus:outline-none"
                          />
                          <p className="text-[9px] text-white/40">
                            Your signature will be styled in a beautiful dark-blue calligraphic script.
                          </p>
                        </div>
                      )}
                      {sigType === "upload" && (
                        <div className="space-y-2">
                          <div className="flex items-center justify-center border border-dashed border-white/15 rounded-lg p-4 bg-white/[0.01] hover:bg-white/[0.03] transition-colors relative cursor-pointer">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleSigImageUpload}
                              className="absolute inset-0 opacity-0 cursor-pointer"
                            />
                            <div className="text-center">
                              <FileImage size={20} className="text-white/40 mx-auto mb-1" />
                              <span className="text-[10px] text-indigo-400 font-bold uppercase">
                                {sigUploadedFile ? "Change Image" : "Select PNG/JPG Signature"}
                              </span>
                            </div>
                          </div>
                          {sigUploadedFile && (
                            <div className="border border-white/10 rounded-lg p-2 bg-white/[0.02] flex justify-center items-center h-20 overflow-hidden">
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
                  <div className="space-y-3 bg-white/[0.02] p-3.5 rounded-xl border border-white/10">
                    <h3 className="text-[10px] font-bold text-white/50 tracking-wider uppercase">
                      Signature Placement & Size
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold text-white/40 tracking-wider uppercase block">
                          Page Number
                        </label>
                        <input
                          type="number"
                          value={sigPage}
                          onChange={(e) => setSigPage(Math.max(1, parseInt(e.target.value) || 1))}
                          className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white font-mono focus:border-indigo-500 focus:outline-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold text-white/40 tracking-wider uppercase block">
                          X (from Left)
                        </label>
                        <input
                          type="number"
                          value={sigX}
                          onChange={(e) => setSigX(parseInt(e.target.value) || 0)}
                          className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white font-mono focus:border-indigo-500 focus:outline-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold text-white/40 tracking-wider uppercase block">
                          Y (from Bottom)
                        </label>
                        <input
                          type="number"
                          value={sigY}
                          onChange={(e) => setSigY(parseInt(e.target.value) || 0)}
                          className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white font-mono focus:border-indigo-500 focus:outline-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold text-white/40 tracking-wider uppercase block">
                          {sigType === "text" ? "Font Size" : "Width"}
                        </label>
                        <input
                          type="number"
                          value={sigType === "text" ? sigFontSize : sigWidth}
                          onChange={(e) => {
                            const val = parseInt(e.target.value) || 0;
                            if (sigType === "text") {
                              setSigFontSize(val);
                            } else {
                              setSigWidth(val);
                            }
                          }}
                          className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white font-mono focus:border-indigo-500 focus:outline-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold text-white/40 tracking-wider uppercase block">
                          Height
                        </label>
                        <input
                          type="number"
                          value={sigHeight}
                          disabled={sigType === "text"}
                          placeholder={sigType === "text" ? "Auto" : ""}
                          onChange={(e) => setSigHeight(parseInt(e.target.value) || 0)}
                          className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white font-mono focus:border-indigo-500 focus:outline-none disabled:opacity-30"
                        />
                      </div>
                    </div>
                    <p className="text-[10px] text-indigo-400 bg-indigo-500/10 p-2 rounded-lg leading-normal">
                      💡 <strong>Pro Tip:</strong> PDF coordinates start from the bottom-left corner of the page.
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleRun}
                  disabled={busy}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-[#E8001A] to-[#FF3333] hover:from-[#E8001A]/90 hover:to-[#FF3333]/90 text-white rounded-xl font-bold text-xs uppercase tracking-wider disabled:opacity-50 transition-all shadow-lg shadow-[#E8001A]/30 cursor-pointer mt-4"
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
              <div className="md:col-span-5 border-l border-white/10 md:pl-6 flex flex-col min-h-0 justify-between overflow-hidden">
                {/* Uploaded PDF info */}
                <div className="flex flex-col min-h-0 max-h-[160px] mb-4 shrink-0">
                  <h3 className="text-[10px] font-bold text-white/50 tracking-wider uppercase mb-2">
                    Uploaded PDF File ({files.length})
                  </h3>
                  {files.length === 0 ? (
                    <div className="text-center py-4 bg-white/[0.02] rounded-xl border border-white/10 text-white/40 text-[10px]">
                      No PDF uploaded
                    </div>
                  ) : (
                    <div className="flex items-center justify-between p-2.5 bg-white/[0.03] border border-white/10 rounded-xl text-[11px]">
                      <div className="flex items-center gap-2 min-w-0">
                        <File size={14} className="text-white/40 shrink-0" />
                        <span className="font-medium text-white/80 truncate max-w-[150px]">
                          {files[0].name}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] text-white/40 font-mono">
                          {(files[0].size / 1024).toFixed(1)} KB
                        </span>
                        <button
                          onClick={() => removeFile(0)}
                          className="text-red-500 hover:text-red-400 cursor-pointer"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Outputs */}
                <div className={`flex-1 min-h-[350px] border border-white/10 bg-white/[0.02] rounded-2xl p-4 flex flex-col overflow-hidden relative ${
                  (!busy && !doneFile && !previewUrl) ? "justify-center items-center" : ""
                }`}>
                  {!busy && !doneFile && (
                    files.length > 0 && previewUrl ? (
                      <InteractivePdfPreview
                        previewUrl={previewUrl}
                        onCoordsSelected={handleCoordsSelectedForSign}
                        selectedPage={sigPage}
                        selectedX={sigX}
                        selectedY={sigY}
                        sigType={sigType}
                        overlayFontSize={sigType === "text" ? sigFontSize : undefined}
                        sigWidth={sigWidth}
                        sigHeight={sigHeight}
                        overlaySignature={
                          sigType === "draw"
                            ? sigDrawData
                            : sigType === "text"
                            ? sigText
                            : sigUploadedFile
                        }
                      />
                    ) : (
                      <div className="text-center text-slate-400">
                        <div className="w-10 h-10 bg-white shadow-sm border border-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-2.5">
                          <FileCheck size={18} className="text-slate-350" />
                        </div>
                        <p className="text-[10px] font-bold uppercase tracking-wider">Awaiting Signature Application</p>
                      </div>
                    )
                  )}

                  {busy && (
                    <div className="text-center text-slate-550">
                      <Loader2 size={28} className="animate-spin text-indigo-650 mx-auto mb-2.5" />
                      <p className="text-[10px] font-bold uppercase tracking-wider">Rendering signature in memory...</p>
                    </div>
                  )}

                  {!busy && doneFile && donePreviewUrl && (
                    <div className="w-full h-full flex flex-col min-h-0">
                      {/* Top Bar with download button */}
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-3 bg-white/[0.03] border border-white/10 rounded-xl mb-3 shrink-0">
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5 text-emerald-500 font-bold text-xs uppercase tracking-wider mb-1">
                            <CheckCircle size={14} />
                            <span>PDF Signed Successfully</span>
                          </div>
                          <p className="font-mono text-xs text-white/80 truncate max-w-[180px] sm:max-w-[250px]">
                            {doneFile.filename} ({(doneFile.size / 1024).toFixed(1)} KB)
                          </p>
                        </div>
                        <button
                          onClick={() => triggerDownload(doneFile.blob, doneFile.filename)}
                          className="flex items-center justify-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold uppercase transition-colors shadow-md shadow-emerald-950/20 cursor-pointer shrink-0"
                        >
                          <Download size={14} /> Download Signed PDF
                        </button>
                      </div>
                      
                      {/* Live Preview of the completed PDF */}
                      <div className="flex-1 min-h-0 bg-white rounded-xl overflow-hidden shadow-inner">
                        <iframe
                          src={`${donePreviewUrl}#toolbar=0`}
                          className="w-full h-full border-0"
                          title="Signed PDF Preview"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : currentTool.isCustomAi ? (
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
                            <option key={u.value} value={u.value} className="bg-[#1A1A1A] text-white">
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

                <div className={`flex-1 bg-white/[0.02] rounded-2xl border border-white/10 flex flex-col overflow-hidden p-4 relative min-h-0 ${
                  (!busy && !aiImageResult && !textResult) ? "justify-center items-center" : ""
                }`}>
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
                        className="absolute bottom-2.5 right-2.5 flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg px-3 py-1.5 text-xs font-bold uppercase transition-colors shadow-lg shadow-emerald-950/20 cursor-pointer"
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
                          className="mt-2.5 self-end flex items-center gap-1 text-xs text-emerald-500 font-bold uppercase hover:text-emerald-400 transition-colors cursor-pointer"
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
                      {currentTool.slug === "edit" && (
                        <p className="text-[10px] text-indigo-650 bg-indigo-50/50 p-2 rounded-lg leading-normal">
                          💡 <strong>Pro Tip:</strong> PDF coordinates start from the bottom-left corner of the page.
                          A4 standard height is 842 points, width is 595. Letter standard height is 792, width is 612.
                        </p>
                      )}
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
                                  <option key={opt} value={opt} className="bg-[#1A1A1A] text-white">
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
                <div className={`flex-1 min-h-[350px] border border-white/10 bg-white/[0.02] rounded-2xl p-4 flex flex-col overflow-hidden relative ${
                  (!busy && !textResult && !doneFile && !previewUrl) ? "justify-center items-center" : ""
                }`}>
                  {!busy && !textResult && !doneFile && (
                    files.length > 0 ? (
                      (() => {
                        const file = files[0];
                        const isImage = file.type.startsWith("image/") || file.name.toLowerCase().match(/\.(jpe?g|png|gif|webp|bmp)$/i);
                        const isPdf = file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
                        if (isImage && previewUrl) {
                          return (
                            <img
                              src={previewUrl}
                              className="max-h-full max-w-full object-contain rounded-lg shadow-sm border border-white/10"
                              alt="Uploaded Preview"
                            />
                          );
                        } else if (isPdf && previewUrl) {
                          return currentTool.slug === "edit" ? (
                            <InteractivePdfPreview
                              previewUrl={previewUrl}
                              onCoordsSelected={handleCoordsSelectedForEdit}
                              selectedPage={params.page || 1}
                              selectedX={params.x || 0}
                              selectedY={params.y || 0}
                              overlayText={params.text || ""}
                              overlayColor={params.color || "black"}
                              overlayFontSize={params.fontSize || 12}
                            />
                          ) : (
                            <iframe
                              src={`${previewUrl}#toolbar=0`}
                              className="w-full h-full rounded-xl border-0 bg-white"
                              title="PDF Preview"
                            />
                          );
                        } else {
                          const isWord = file.name.toLowerCase().match(/\.(docx?)$/i);
                          return (
                            <div className="text-center text-white/60 p-4 border border-dashed border-white/10 rounded-xl bg-white/[0.01]">
                              <FileText size={48} className={isWord ? "text-blue-500 mx-auto mb-3" : "text-white/30 mx-auto mb-3"} />
                              <p className="text-xs font-bold text-white/80 max-w-[200px] truncate mx-auto">{file.name}</p>
                              <p className="text-[10px] text-white/40 mt-1 uppercase tracking-wider">Ready for Pipeline Execution</p>
                            </div>
                          );
                        }
                      })()
                    ) : (
                      <div className="text-center text-white/40">
                        <div className="w-10 h-10 bg-white/[0.05] shadow-sm border border-white/10 rounded-2xl flex items-center justify-center mx-auto mb-2.5">
                          <FileCheck size={18} className="text-white/30" />
                        </div>
                        <p className="text-xs font-bold uppercase tracking-wider">Awaiting pipeline run</p>
                      </div>
                    )
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
                          className="flex items-center gap-1 px-3 py-1.5 bg-emerald-600 text-white rounded-lg text-xs font-bold uppercase hover:bg-emerald-700 transition-all cursor-pointer"
                        >
                          <Download size={10} />
                          Download
                        </button>
                      </div>
                    </div>
                  )}

                  {!busy && doneFile && donePreviewUrl && (
                    <div className="w-full h-full flex flex-col min-h-0">
                      {/* Top Bar with download button */}
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-3 bg-white/[0.03] border border-white/10 rounded-xl mb-3 shrink-0">
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5 text-emerald-500 font-bold text-xs uppercase tracking-wider mb-1">
                            <CheckCircle size={14} />
                            <span>Pipeline Complete</span>
                          </div>
                          <p className="font-mono text-xs text-white/80 truncate max-w-[180px] sm:max-w-[250px]">
                            {doneFile.filename} ({(doneFile.size / 1024).toFixed(1)} KB)
                          </p>
                        </div>
                        <button
                          onClick={() => triggerDownload(doneFile.blob, doneFile.filename)}
                          className="flex items-center justify-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold uppercase transition-colors shadow-md shadow-emerald-950/20 cursor-pointer shrink-0"
                        >
                          <Download size={14} /> Download Output File
                        </button>
                      </div>
                      
                      {/* Live Preview of the completed PDF / Image */}
                      <div className={`flex-1 min-h-0 rounded-xl overflow-hidden shadow-inner ${
                        (doneFile.blob.type.startsWith("image/") || 
                         doneFile.filename.toLowerCase().match(/\.(jpe?g|png|gif|webp|bmp)$/i) || 
                         doneFile.blob.type === "application/pdf" || 
                         doneFile.filename.toLowerCase().endsWith(".pdf")) 
                          ? "bg-white" 
                          : "bg-white/[0.02] border border-white/5"
                      }`}>
                        {doneFile.blob.type.startsWith("image/") || doneFile.filename.toLowerCase().match(/\.(jpe?g|png|gif|webp|bmp)$/i) ? (
                          <img
                            src={donePreviewUrl}
                            className="w-full h-full object-contain mx-auto"
                            alt="Completed Preview"
                          />
                        ) : doneFile.blob.type === "application/pdf" || doneFile.filename.toLowerCase().endsWith(".pdf") ? (
                          <iframe
                            src={`${donePreviewUrl}#toolbar=0`}
                            className="w-full h-full border-0"
                            title="Completed PDF Preview"
                          />
                        ) : (
                          <div className="w-full h-full flex flex-col justify-center items-center text-white/40 p-6 text-center">
                            <FileText size={44} className="mb-2.5 text-white/30 animate-pulse" />
                            <p className="text-xs font-bold uppercase tracking-wider text-white/80 mb-1">
                              {doneFile.filename.toLowerCase().endsWith(".docx") ? "Word Document Ready" : "Document Ready"}
                            </p>
                            <p className="text-[10px] text-white/50 max-w-[200px] leading-relaxed">
                              Preview is not supported for this file format. Click download to access your file.
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          </div>
        ) : (
          /* DIRECTORY CARD GRID */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
            {filteredTools.map((tool) => {
              const ToolIcon = tool.icon;
              const badgeStyle = getBadgeStyle(tool.category);
              return (
                <div
                  key={`${tool.category}-${tool.slug}`}
                  onClick={() => navigate(`/${tool.urlPrefix}/${tool.urlSlug}`)}
                  className="group relative flex flex-col justify-between p-6 bg-gradient-to-b from-white/[0.04] to-white/[0.01] border border-white/10 hover:border-[#E8001A]/30 rounded-2xl transition-all duration-300 cursor-pointer shadow-lg hover:shadow-2xl hover:shadow-[#E8001A]/5 hover:-translate-y-1 backdrop-blur-md"
                >
                  <div className="flex flex-col items-start text-left">
                    {/* Badge Icon */}
                    <div className={`p-3 rounded-xl mb-4 ${badgeStyle.bg} ${badgeStyle.text} group-hover:scale-110 transition-transform duration-300`}>
                      <ToolIcon size={20} />
                    </div>
                    {/* Title */}
                    <h3 className="text-base font-bold text-white mb-2 group-hover:text-[#E8001A] transition-colors uppercase tracking-tight">
                      {tool.name}
                    </h3>
                    {/* Description */}
                    <p className="text-xs text-white/50 leading-relaxed font-medium">
                      {tool.desc}
                    </p>
                  </div>
                  
                  {/* Subtle indicator arrow */}
                  <div className="mt-5 flex items-center text-[10px] font-bold text-[#E8001A] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Open Tool <span className="ml-1">→</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* SEO Content: Description & FAQs */}
        {seo.body && (
          <div className="mt-10 space-y-8 shrink-0">
            <div className="space-y-3">
              {seo.body.map((para, i) => (
                <p key={i} className="text-sm text-white/55 leading-relaxed">{para}</p>
              ))}
            </div>
            {seo.faqs && seo.faqs.length > 0 && (
              <div>
                <h2 className="text-base font-black text-white uppercase tracking-tight mb-4">Frequently Asked Questions</h2>
                <div className="space-y-2">
                  {seo.faqs.map((faq, i) => (
                    <details key={i} className="group bg-white/[0.02] border border-white/10 rounded-xl overflow-hidden">
                      <summary className="px-4 py-3 text-sm font-semibold text-white/80 cursor-pointer list-none flex items-center justify-between hover:bg-white/[0.03] transition-colors">
                        {faq.q}
                        <span className="text-white/40 ml-3 shrink-0 group-open:hidden">+</span>
                        <span className="text-white/40 ml-3 shrink-0 hidden group-open:inline">−</span>
                      </summary>
                      <p className="px-4 pb-3 pt-1 text-sm text-white/50 leading-relaxed border-t border-white/5">{faq.a}</p>
                    </details>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
