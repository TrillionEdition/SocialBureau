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

const TOOL_SEO = {
  "merge-pdf": {
    title: "Merge PDF Online Free – Combine PDF Files Instantly | SocialBureau",
    h1: "Merge PDF Files Online",
    description: "Merge multiple PDF files into one document online for free. Fast, secure PDF merger with no signup and no watermark. Works on desktop and mobile.",
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
    title: "Split PDF Online – Separate PDF Pages Instantly | SocialBureau",
    h1: "Split PDF Files Online",
    description: "Split a PDF into specific pages or custom page ranges online for free. No installation needed. Fast, secure, and works on all devices.",
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
    title: "Compress PDF Online Free Without Losing Quality | SocialBureau",
    h1: "Compress PDF Online",
    description: "Reduce PDF file size online for free without losing quality. Optimize PDFs instantly for email, web, and storage. No signup required.",
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
    title: "Convert PDF to Images Online Free – High-DPI PNG Export | SocialBureau",
    h1: "Convert PDF to Images Online",
    description: "Convert every page of a PDF to high-resolution PNG images online for free. Download as a ZIP archive instantly. No signup needed.",
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
    description: "Combine multiple images into a single PDF online for free. Upload JPG, PNG, or WEBP files and download your PDF instantly. No signup required.",
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
    title: "Convert PDF to Word Online Free – Editable DOCX | SocialBureau",
    h1: "Convert PDF to Word Online",
    description: "Convert PDF to editable Word (.docx) online for free. Fast, accurate PDF to Word conversion with no signup and no watermark.",
    body: [
      "Convert PDF to Word Online transforms your PDF documents into fully editable Microsoft Word (.docx) files in seconds. This is ideal when you need to edit, update, or reformat a document that only exists in PDF form — saving you hours of manual re-typing.",
      "Our converter attempts to preserve headings, paragraphs, tables, bullet points, and formatting as closely as possible in the Word output. The resulting .docx file is fully compatible with Microsoft Word, Google Docs, LibreOffice, and all major word processors.",
      "No account or installation required. Simply upload your PDF and download the DOCX file instantly. Files are processed securely and are not stored on our servers after your session ends.",
    ],
    faqs: [
      { q: "Is PDF to Word conversion free?", a: "Yes, completely free with no account required." },
      { q: "Will formatting be preserved?", a: "We preserve headings, paragraphs, and tables as closely as possible, though complex layouts may vary slightly." },
      { q: "What format is the output?", a: "The output is a standard .docx file compatible with Microsoft Word and Google Docs." },
      { q: "Does it work with scanned PDFs?", a: "Scanned PDFs contain images rather than text and may produce limited results." },
      { q: "Is my file secure?", a: "Files are processed in your session and are not stored after your download." },
    ],
  },
  "word-to-pdf": {
    title: "Convert Word to PDF Online Free | SocialBureau",
    h1: "Convert Word to PDF Online",
    description: "Convert Microsoft Word (.docx) files to PDF online for free. Fast, accurate Word to PDF conversion with no signup and no watermark.",
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
    title: "Extract Text from PDF Online Free | SocialBureau",
    h1: "Extract Text from PDF Online",
    description: "Extract raw text from any PDF document online for free. Copy or download the extracted text instantly. No signup required.",
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
  "resize-image": {
    title: "Resize Image Online Free – Set Exact Width & Height | SocialBureau",
    h1: "Resize Image Online",
    description: "Resize images to exact pixel dimensions online for free. Set width and height instantly. Supports JPG, PNG, WEBP. No signup required.",
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
      { q: "Does it preserve the aspect ratio?", a: "The tool resizes to your exact dimensions. Calculate proportional values first if you need to preserve the ratio." },
    ],
  },
  "compress-image": {
    title: "Compress Image Online Free Without Losing Quality | SocialBureau",
    h1: "Compress Image Online",
    description: "Reduce image file size online for free using quality control. Compress JPG and PNG images instantly. No signup or watermark.",
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
      { q: "How much will the file size be reduced?", a: "Results vary. Lower quality values produce smaller files. Typical reductions range from 20% to 70%." },
    ],
  },
  "convert-image-format": {
    title: "Convert Image Format Online Free – PNG, JPG, WEBP, BMP | SocialBureau",
    h1: "Convert Image Format Online",
    description: "Convert images between PNG, JPG, WEBP, and BMP formats online for free. Fast, instant image conversion with no signup required.",
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
      { q: "Is there a file size limit?", a: "Standard web image sizes are fully supported. Very large files may take a moment longer to process." },
    ],
  },
  "rotate-image": {
    title: "Rotate Image Online Free – Any Angle | SocialBureau",
    h1: "Rotate Image Online",
    description: "Rotate images by any degree online for free. Clockwise, counterclockwise, or custom angle rotation. Supports JPG, PNG, WEBP. No signup.",
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
      { q: "Can I rotate a PDF instead?", a: "This tool is for images only. Use the PDF Toolkit for PDF-related operations." },
    ],
  },
  "grayscale-image": {
    title: "Convert Image to Grayscale Online Free | SocialBureau",
    h1: "Convert Image to Grayscale Online",
    description: "Convert any image to grayscale (black and white) online for free. Instant monochrome conversion. Supports JPG, PNG, WEBP. No signup.",
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
      { q: "Can the grayscale be reversed?", a: "No, colour information is permanently removed during the conversion process." },
    ],
  },
  "ai-image-generator": {
    title: "AI Industrial Image Generator Online – Factory & Machinery Visuals | SocialBureau",
    h1: "AI Industrial Image Generator",
    description: "Generate factory floors, machinery, blueprints, and product visuals using AI. Free industrial image generator online. No signup required.",
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
      { q: "What format is the generated image?", a: "Generated images are provided as PNG files ready for immediate download." },
    ],
  },
  "ai-prompt-engineer": {
    title: "AI Prompt Engineer for Industrial Content – Free Online Tool | SocialBureau",
    h1: "AI Prompt Engineer Online",
    description: "Generate optimised AI prompts, marketing copy, technical specs, and social posts for industrial topics. Free AI prompt writer. No signup.",
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
};

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

  const currentTool = useMemo(() => {
    return currentCategory.tools.find(t => t.slug === activeToolSlug) || currentCategory.tools[0];
  }, [currentCategory, activeToolSlug]);

  const seo = TOOL_SEO[currentTool?.urlSlug] || {};

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
    <div className="w-full min-h-screen bg-[#0A0A0A] pt-20 pb-8 px-4 sm:px-6 lg:px-8 text-white flex flex-col transition-all duration-300">
      <Helmet>
        <title>{seo.title || `${currentTool.name} | SocialBureau`}</title>
        <meta name="description" content={seo.description || currentTool.desc} />
        <link rel="canonical" href={`https://www.socialbureau.in/${currentCategory.urlPrefix}/${currentTool.urlSlug}`} />
      </Helmet>
      <style>{scrollbarHideStyle}</style>
      <div className="max-w-7xl w-full mx-auto flex-1 flex flex-col min-h-0">
        
        {/* Title Header */}
        <div className="flex flex-col items-center text-center mb-6 sm:mb-8 shrink-0">
          <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-1">Solutions Suite</p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight uppercase mb-2 bg-gradient-to-r from-[#E8001A] to-[#FF3333] bg-clip-text text-transparent">
            {seo.h1 || currentTool.name}
          </h1>
          <p className="text-sm sm:text-base text-white/60 font-medium">
            {currentTool.desc}
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
