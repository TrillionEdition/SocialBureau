import React, { useState, useMemo, useRef, useEffect, useCallback } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { blogAPI } from "@/services/blogServices";
import Footer from "./Footer";
import Toast from "./Toast";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { getUserData, isAdmin } from "@/utils/authUtils";
import {
  FaEye, FaArrowLeft, FaEdit, FaTrash, FaCheck, FaTimes,
  FaCalendarAlt, FaUser, FaUndo, FaRedo,
  FaBold, FaItalic, FaUnderline, FaStrikethrough,
  FaListUl, FaListOl, FaLink, FaImage,
  FaAlignLeft, FaAlignCenter, FaAlignRight,
  FaQuoteRight, FaCode, FaMinus
} from "react-icons/fa";

// ─── Rich Text Editor ──────────────────────────────────────────────────────────
function RichEditor({ value, onChange }) {
  const editorRef = useRef(null);
  const isInternalChange = useRef(false);

  // Sync external value into DOM only on first mount or when value is cleared
  useEffect(() => {
    if (!editorRef.current) return;
    if (editorRef.current.innerHTML !== value && !isInternalChange.current) {
      editorRef.current.innerHTML = value || "";
    }
    isInternalChange.current = false;
  }, [value]);

  const exec = useCallback((cmd, val = null) => {
    editorRef.current?.focus();
    document.execCommand(cmd, false, val);
    syncContent();
  }, []);

  const syncContent = useCallback(() => {
    if (!editorRef.current) return;
    isInternalChange.current = true;
    onChange(editorRef.current.innerHTML);
  }, [onChange]);

  const handlePaste = useCallback((e) => {
    e.preventDefault();
    // Prefer HTML paste so formatting (h1, bold, links) is preserved
    const html = e.clipboardData.getData("text/html");
    const text = e.clipboardData.getData("text/plain");

    if (html) {
      // Sanitise: strip scripts but keep structure
      const clean = html
        .replace(/<script[\s\S]*?<\/script>/gi, "")
        .replace(/ style="[^"]*"/gi, "") // strip inline styles so our CSS controls look
        .replace(/ class="[^"]*"/gi, "");
      document.execCommand("insertHTML", false, clean);
    } else {
      // Plain text fallback – wrap paragraphs
      const paragraphs = text.split(/\n\n+/).filter(Boolean);
      const wrapped = paragraphs.length > 1
        ? paragraphs.map(p => `<p>${p.replace(/\n/g, "<br>")}</p>`).join("")
        : text.replace(/\n/g, "<br>");
      document.execCommand("insertHTML", false, wrapped);
    }
    syncContent();
  }, [syncContent]);

  const handleKeyDown = useCallback((e) => {
    // Tab → indent list, or insert 4 spaces
    if (e.key === "Tab") {
      e.preventDefault();
      exec(e.shiftKey ? "outdent" : "indent");
    }
    // Ctrl/Cmd shortcuts
    if (e.ctrlKey || e.metaKey) {
      if (e.key === "b") { e.preventDefault(); exec("bold"); }
      if (e.key === "i") { e.preventDefault(); exec("italic"); }
      if (e.key === "u") { e.preventDefault(); exec("underline"); }
      if (e.key === "z") { e.preventDefault(); exec(e.shiftKey ? "redo" : "undo"); }
    }
  }, [exec]);

  const insertLink = useCallback(() => {
    const url = window.prompt("Enter URL (include https://):", "https://");
    if (url) exec("createLink", url);
  }, [exec]);

  const insertImage = useCallback(() => {
    const url = window.prompt("Enter image URL:", "https://");
    if (url) exec("insertImage", url);
  }, [exec]);

  const ToolBtn = ({ onClick, icon: Icon, title, active }) => (
    <button
      type="button"
      onMouseDown={(e) => { e.preventDefault(); onClick(); }}
      title={title}
      className={`p-2 rounded transition-colors ${
        active
          ? "bg-red-600 text-white"
          : "text-gray-300 hover:bg-gray-700 hover:text-white"
      }`}
    >
      {Icon && <Icon size={13} />}
    </button>
  );

  const ToolSelect = ({ onChange: onSel, children, title }) => (
    <select
      onMouseDown={(e) => e.stopPropagation()}
      onChange={(e) => { exec("formatBlock", e.target.value); e.target.value = ""; }}
      defaultValue=""
      title={title}
      className="bg-gray-800 text-gray-300 text-xs px-2 py-1 rounded border border-gray-700 focus:outline-none focus:border-red-500 cursor-pointer h-[30px]"
    >
      {children}
    </select>
  );

  const Divider = () => <div className="w-px h-5 bg-gray-700 mx-1 self-center" />;

  return (
    <div className="rounded-xl overflow-hidden border border-gray-700 bg-gray-900 focus-within:border-red-600 transition-colors">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 px-3 py-2 bg-gray-800/80 border-b border-gray-700">
        {/* Block format */}
        <ToolSelect title="Paragraph style">
          <option value="" disabled>Format</option>
          <option value="p">Paragraph</option>
          <option value="h1">H1 – Title</option>
          <option value="h2">H2 – Section</option>
          <option value="h3">H3 – Sub-section</option>
          <option value="h4">H4</option>
          <option value="blockquote">Blockquote</option>
          <option value="pre">Code block</option>
        </ToolSelect>

        {/* Font size */}
        <select
          onMouseDown={(e) => e.stopPropagation()}
          onChange={(e) => { exec("fontSize", e.target.value); e.target.value = ""; }}
          defaultValue=""
          title="Font size"
          className="bg-gray-800 text-gray-300 text-xs px-2 py-1 rounded border border-gray-700 focus:outline-none focus:border-red-500 cursor-pointer h-[30px] ml-1"
        >
          <option value="" disabled>Size</option>
          <option value="1">XS</option>
          <option value="2">S</option>
          <option value="3">M</option>
          <option value="4">L</option>
          <option value="5">XL</option>
          <option value="6">2XL</option>
          <option value="7">3XL</option>
        </select>

        <Divider />

        {/* Text style */}
        <ToolBtn icon={FaBold}          title="Bold (Ctrl+B)"      onClick={() => exec("bold")} />
        <ToolBtn icon={FaItalic}        title="Italic (Ctrl+I)"    onClick={() => exec("italic")} />
        <ToolBtn icon={FaUnderline}     title="Underline (Ctrl+U)" onClick={() => exec("underline")} />
        <ToolBtn icon={FaStrikethrough} title="Strikethrough"      onClick={() => exec("strikeThrough")} />
        <ToolBtn icon={FaCode}          title="Inline code"        onClick={() => exec("insertHTML", "<code>code</code>")} />

        <Divider />

        {/* Alignment */}
        <ToolBtn icon={FaAlignLeft}   title="Align left"   onClick={() => exec("justifyLeft")} />
        <ToolBtn icon={FaAlignCenter} title="Align center" onClick={() => exec("justifyCenter")} />
        <ToolBtn icon={FaAlignRight}  title="Align right"  onClick={() => exec("justifyRight")} />

        <Divider />

        {/* Lists */}
        <ToolBtn icon={FaListUl} title="Bullet list"   onClick={() => exec("insertUnorderedList")} />
        <ToolBtn icon={FaListOl} title="Numbered list" onClick={() => exec("insertOrderedList")} />
        <ToolBtn icon={FaQuoteRight} title="Blockquote" onClick={() => exec("formatBlock", "blockquote")} />

        <Divider />

        {/* Insert */}
        <ToolBtn icon={FaLink}  title="Insert link"  onClick={insertLink} />
        <ToolBtn icon={FaImage} title="Insert image" onClick={insertImage} />
        <ToolBtn icon={FaMinus} title="Horizontal rule" onClick={() => exec("insertHorizontalRule")} />

        <Divider />

        {/* History */}
        <ToolBtn icon={FaUndo} title="Undo (Ctrl+Z)" onClick={() => exec("undo")} />
        <ToolBtn icon={FaRedo} title="Redo (Ctrl+Shift+Z)" onClick={() => exec("redo")} />

        {/* Erase formatting */}
        <button
          type="button"
          onMouseDown={(e) => { e.preventDefault(); exec("removeFormat"); }}
          title="Remove formatting"
          className="ml-1 text-xs text-gray-400 hover:text-white px-2 py-1 rounded hover:bg-gray-700 transition-colors"
        >
          Clear
        </button>
      </div>

      {/* Editable area */}
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={syncContent}
        onPaste={handlePaste}
        onKeyDown={handleKeyDown}
        className="rich-editor min-h-[420px] max-h-[620px] overflow-y-auto p-5 text-gray-100 outline-none leading-relaxed"
        data-placeholder="Start writing, or paste content with formatting (headings, bold, links) — it all comes through..."
      />

      <style>{`
        .rich-editor:empty:before {
          content: attr(data-placeholder);
          color: #6b7280;
          pointer-events: none;
        }
        .rich-editor h1 { font-size: 2em; font-weight: 800; color: #fff; margin: 0.6em 0 0.3em; }
        .rich-editor h2 { font-size: 1.5em; font-weight: 700; color: #f3f4f6; margin: 0.7em 0 0.3em; }
        .rich-editor h3 { font-size: 1.25em; font-weight: 600; color: #e5e7eb; margin: 0.8em 0 0.3em; }
        .rich-editor h4 { font-size: 1.1em; font-weight: 600; color: #d1d5db; margin: 0.9em 0 0.3em; }
        .rich-editor p  { margin: 0.6em 0; color: #d1d5db; line-height: 1.8; }
        .rich-editor a  { color: #ef4444; text-decoration: underline; }
        .rich-editor a:hover { color: #fca5a5; }
        .rich-editor strong, .rich-editor b { font-weight: 700; color: #fff; }
        .rich-editor em, .rich-editor i { font-style: italic; color: #e5e7eb; }
        .rich-editor u { text-decoration: underline; }
        .rich-editor s { text-decoration: line-through; color: #9ca3af; }
        .rich-editor ul { list-style: disc; padding-left: 1.75em; margin: 0.5em 0; color: #d1d5db; }
        .rich-editor ol { list-style: decimal; padding-left: 1.75em; margin: 0.5em 0; color: #d1d5db; }
        .rich-editor li { margin: 0.25em 0; }
        .rich-editor blockquote {
          border-left: 3px solid #ef4444;
          padding: 0.5em 1em;
          margin: 1em 0;
          color: #9ca3af;
          font-style: italic;
          background: rgba(239,68,68,0.05);
          border-radius: 0 8px 8px 0;
        }
        .rich-editor pre, .rich-editor code {
          background: #111827;
          color: #86efac;
          padding: 0.15em 0.4em;
          border-radius: 4px;
          font-family: 'Fira Mono', 'Consolas', monospace;
          font-size: 0.9em;
        }
        .rich-editor pre { display: block; padding: 1em; margin: 1em 0; overflow-x: auto; }
        .rich-editor hr { border: none; border-top: 1px solid #374151; margin: 1.5em 0; }
        .rich-editor img { max-width: 100%; border-radius: 8px; margin: 0.5em 0; }
      `}</style>
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────
export default function SubmitBlog() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();
  const previewEditRef = useRef(null);
  const [toast, setToast] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [isPreviewEditing, setIsPreviewEditing] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editSlug, setEditSlug] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  const applyFormat = (command, value = null) => {
    document.execCommand(command, false, value);
    if (previewEditRef.current) {
      setContent(previewEditRef.current.innerHTML);
    }
  };

  const processPreviewContent = (html) => {
    if (!html) return html;
    let p = html;
    p = p.replace(/(?:<br\s*\/?>\s*){2,}/gi, "<br/>");
    p = p.replace(/<h([1-6])(?:\s+[^>]*)?>(.*?)<\/h\1>/gi, (_, level, content) => {
      let cls = "font-medium text-gray-900 mt-8 mb-4 leading-tight";
      if (level === "1") cls += " text-3xl md:text-4xl";
      else if (level === "2") cls += " text-2xl md:text-3xl";
      else if (level === "3") cls += " text-xl md:text-2xl";
      else cls += " text-lg md:text-xl";
      return `<h${level} class="${cls}">${content}</h${level}>`;
    });
    p = p.replace(/<p(?:\s+[^>]*)?>(.*?)<\/p>/gi, (_, c) =>
      `<p class="text-xl text-gray-700 mb-6 leading-relaxed">${c}</p>`
    );
    p = p.replace(/<ul(?:\s+[^>]*)?>(.*?)<\/ul>/gi, (_, c) =>
      `<ul class="text-xl text-gray-700 mb-6 leading-relaxed list-disc pl-6 space-y-2">${c}</ul>`
    );
    return p;
  };

  useEffect(() => {
    const userData = getUserData();
    if (!userData) {
      setToast({ type: "error", message: "Please login to submit a blog" });
      setTimeout(() => navigate("/login", { state: { from: location } }), 2000);
      return;
    }
    setCurrentUser(userData);
  }, [navigate, location]);

  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [keywords, setKeywords] = useState([]);
  const [keywordInput, setKeywordInput] = useState("");
  const [selectedChildBlogs, setSelectedChildBlogs] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    category: "Marketing",
    author: "",
    customUrl: "",
    seoTitle: "",
    seoDescription: "",
  });

  const { data: blogsData } = useQuery({
    queryKey: ["allBlogs", currentUser?.role, currentUser?.email],
    queryFn: () => blogAPI.getBlogs({ limit: 100, published: "all" }),
    enabled: !!currentUser,
  });

  const availableBlogs = useMemo(() => {
    if (!blogsData || !currentUser) return [];
    const blogs = Array.isArray(blogsData) ? blogsData : blogsData.data || [];
    if (isAdmin()) return blogs;
    const userId = currentUser.id || currentUser._id;
    return blogs.filter((blog) => {
      const blogUserId = blog.user?._id || blog.user;
      return blogUserId?.toString() === userId?.toString();
    });
  }, [blogsData, currentUser]);

  const wordCount = useMemo(() => {
    if (!content) return 0;
    const plain = content.replace(/<[^>]*>/g, " ").replace(/&nbsp;|\u200B/g, " ").trim();
    return plain ? plain.split(/\s+/).filter(Boolean).length : 0;
  }, [content]);

  useEffect(() => {
    if (location.state?.editBlog) {
      handleEdit(location.state.editBlog);
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const createMutation = useMutation({
    mutationFn: (data) => blogAPI.createBlog(data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["allBlogs"] });
      setToast({ type: "success", message: "Blog submitted successfully!" });
      setIsUploading(false);
      setIsEditing(false);
      setEditSlug(null);
      const slug = response?.data?.slug || response?.slug;
      if (slug) setTimeout(() => navigate(`/blogs/${slug}`), 1500);
    },
    onError: (error) => {
      setIsUploading(false);
      setToast({ type: "error", message: `Creation Error: ${error.response?.data?.message || error.message}` });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ slug, data }) => blogAPI.updateBlog(slug, data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["allBlogs"] });
      setToast({ type: "success", message: "Blog updated successfully!" });
      setIsUploading(false);
      setIsEditing(false);
      setEditSlug(null);
      const slug = response?.data?.slug || response?.slug;
      if (slug) setTimeout(() => navigate(`/blogs/${slug}`), 1500);
    },
    onError: (error) => {
      setIsUploading(false);
      setToast({ type: "error", message: `Update Error: ${error.response?.data?.message || error.message}` });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (slug) => blogAPI.deleteBlog(slug),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allBlogs"] });
      setToast({ type: "success", message: "Blog deleted successfully" });
    },
    onError: (error) => {
      setToast({ type: "error", message: error.response?.data?.message || "Failed to delete blog" });
    },
  });

  const handleEdit = (blog) => {
    setFormData({
      title: blog.title,
      excerpt: blog.excerpt,
      category: blog.category,
      author: blog.author || "",
      customUrl: blog.slug,
      seoTitle: blog.seo?.title || blog.seoTitle || "",
      seoDescription: blog.seo?.description || blog.seoDescription || "",
    });
    setContent(blog.content[0]?.text || "");
    setImagePreview(blog.image);
    setKeywords(blog.keywords || []);
    setSelectedChildBlogs(blog.childBlogs?.map((cb) => (typeof cb === "object" ? cb._id : cb)) || []);
    setIsEditing(true);
    setEditSlug(blog.slug);
    setImageFile(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (slug) => {
    if (window.confirm("Are you sure you want to delete this blog?")) deleteMutation.mutate(slug);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { setToast({ type: "error", message: "Image must be under 5MB" }); return; }
    if (!["image/jpeg", "image/png", "image/jpg", "image/webp"].includes(file.type)) {
      setToast({ type: "error", message: "Only JPEG, PNG, and WEBP images are allowed" });
      return;
    }
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleAddKeyword = () => {
    if (keywordInput.trim() && !keywords.includes(keywordInput.trim())) {
      setKeywords([...keywords, keywordInput.trim()]);
      setKeywordInput("");
    }
  };

  const handleRemoveKeyword = (keyword) => setKeywords(keywords.filter((k) => k !== keyword));

  const handleChildBlogToggle = (blogId) => {
    setSelectedChildBlogs((prev) =>
      prev.includes(blogId) ? prev.filter((id) => id !== blogId) : [...prev, blogId]
    );
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    if (!formData.title.trim()) { setToast({ type: "error", message: "Title is required" }); return; }
    if (!formData.excerpt.trim()) { setToast({ type: "error", message: "Excerpt is required" }); return; }
    if (!imageFile && !imagePreview) { setToast({ type: "error", message: "Featured image is required" }); return; }
    if (imageFile && imageFile.size > 5 * 1024 * 1024) {
      setToast({ type: "error", message: "Featured image must be under 5MB" }); return;
    }

    let currentContent = content;
    if (showPreview && previewEditRef.current) {
      currentContent = previewEditRef.current.innerHTML;
      setContent(currentContent);
    }

    if (!currentContent.replace(/<[^>]*>/g, "").trim()) {
      setToast({ type: "error", message: "Content is required" }); return;
    }

    const wc = currentContent.replace(/<[^>]*>/g, " ").replace(/&nbsp;|\u200B/g, " ").trim()
      .split(/\s+/).filter(Boolean).length;
    if (wc > 2000) {
      setToast({ type: "error", message: `Content exceeds 2000 words (current: ${wc})` }); return;
    }

    setIsUploading(true);
    setToast({ type: "loading", message: isEditing ? "Updating blog…" : "Publishing blog…" });

    try {
      const blogData = {
        ...formData,
        image: imageFile || imagePreview,
        content: [{ type: "text", text: currentContent, heading: "none" }],
        keywords,
        childBlogs: selectedChildBlogs,
        author: formData.author.trim() || currentUser?.name || "SocialBureau Team",
        seoTitle: formData.seoTitle,
        seoDescription: formData.seoDescription,
      };
      if (isEditing) updateMutation.mutate({ slug: editSlug, data: blogData });
      else createMutation.mutate(blogData);
    } catch (err) {
      setToast({ type: "error", message: err.message || "An unexpected error occurred" });
      setIsUploading(false);
    }
  };

  // ── Preview mode ──────────────────────────────────────────────────────────────
  if (showPreview) {
    return (
      <div className="bg-gray-50 min-h-screen font-sans text-gray-900 flex relative">
        <style>{`
          .blog-content[contenteditable="true"] { user-select: text !important; -webkit-user-select: text !important; cursor: text; line-height: 1.6; }
          .blog-content[contenteditable="true"] h1 { font-size: 2.5rem !important; font-weight: 800 !important; color: #111827 !important; margin-top: 2rem !important; margin-bottom: 1rem !important; display: block !important; }
          .blog-content[contenteditable="true"] h2 { font-size: 2rem !important; font-weight: 700 !important; color: #111827 !important; margin-top: 1.5rem !important; margin-bottom: 0.75rem !important; display: block !important; }
          .blog-content[contenteditable="true"] h3 { font-size: 1.5rem !important; font-weight: 600 !important; color: #111827 !important; margin-top: 1.25rem !important; margin-bottom: 0.5rem !important; display: block !important; }
          .blog-content[contenteditable="true"] p { font-size: 1.25rem !important; color: #374151 !important; margin-bottom: 1.25rem !important; line-height: 1.8 !important; }
          .blog-content[contenteditable="true"] ul { list-style-type: disc !important; padding-left: 1.5rem !important; margin-bottom: 1.25rem !important; }
          .blog-content[contenteditable="true"] ol { list-style-type: decimal !important; padding-left: 1.5rem !important; margin-bottom: 1.25rem !important; }
          ::selection { background-color: #fee2e2 !important; color: #b91c1c !important; }
        `}</style>

        {isPreviewEditing && (
          <div className="fixed right-0 top-0 bottom-0 w-72 bg-white border-l border-gray-200 shadow-2xl p-6 z-50 overflow-y-auto">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <FaEdit className="text-red-600" /> Tools
              </h3>
              <button onClick={() => setIsPreviewEditing(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <FaTimes className="text-gray-400" />
              </button>
            </div>
            <div className="space-y-8">
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 block">Structure</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: "H1 Title", cmd: "formatBlock", val: "H1", class: "text-lg font-bold" },
                    { label: "H2 Sub", cmd: "formatBlock", val: "H2", class: "text-md font-bold" },
                    { label: "H3 Sec", cmd: "formatBlock", val: "H3", class: "text-sm font-bold" },
                    { label: "Para", cmd: "formatBlock", val: "P", class: "text-sm" },
                  ].map((item, i) => (
                    <button key={i} onMouseDown={(e) => { e.preventDefault(); applyFormat(item.cmd, item.val); }}
                      className="flex flex-col items-center justify-center p-3 border border-gray-100 rounded-xl hover:border-red-200 hover:bg-red-50 transition-all text-center group">
                      <span className={`text-gray-900 group-hover:text-red-600 ${item.class}`}>{item.val === "P" ? "¶" : item.val}</span>
                      <span className="text-[9px] text-gray-400 mt-1">{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 block">Actions</label>
                <div className="flex gap-2 mb-3">
                  <button onMouseDown={(e) => { e.preventDefault(); applyFormat("bold"); }} className="flex-1 p-2 border border-gray-100 rounded-lg hover:bg-gray-50 font-bold">B</button>
                  <button onMouseDown={(e) => { e.preventDefault(); applyFormat("italic"); }} className="flex-1 p-2 border border-gray-100 rounded-lg hover:bg-gray-50 italic">I</button>
                  <button onMouseDown={(e) => { e.preventDefault(); applyFormat("underline"); }} className="flex-1 p-2 border border-gray-100 rounded-lg hover:bg-gray-50 underline">U</button>
                </div>
                <div className="flex gap-2">
                  <button onMouseDown={(e) => { e.preventDefault(); applyFormat("undo"); }} className="flex-1 py-2 border border-gray-100 rounded-lg hover:bg-gray-50 text-xs flex items-center justify-center gap-1.5 text-gray-600"><FaUndo size={10} /> Undo</button>
                  <button onMouseDown={(e) => { e.preventDefault(); applyFormat("redo"); }} className="flex-1 py-2 border border-gray-100 rounded-lg hover:bg-gray-50 text-xs flex items-center justify-center gap-1.5 text-gray-600"><FaRedo size={10} /> Redo</button>
                </div>
              </div>
            </div>
            <div className="mt-12 pt-6 border-t border-gray-100">
              <button onClick={() => setIsPreviewEditing(false)} className="w-full py-3 bg-red-600 text-white rounded-xl font-bold shadow-lg shadow-red-200 hover:bg-red-700 transition-colors">Done Editing</button>
            </div>
          </div>
        )}

        <div className={`flex-1 transition-all duration-500 ${isPreviewEditing ? "pr-72" : ""}`}>
          <div className="max-w-4xl mx-auto px-4 pt-12">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <button onClick={() => { setShowPreview(false); setIsPreviewEditing(false); }}
                className="flex items-center gap-2 text-gray-500 hover:text-red-600 transition-colors group">
                <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                <span>Back to Editor</span>
              </button>
              <div className="flex items-center gap-3">
                {!isPreviewEditing && (
                  <button onClick={() => setIsPreviewEditing(true)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-700 font-medium hover:bg-gray-50 transition-all shadow-sm">
                    <FaEdit /> Edit on Page
                  </button>
                )}
                <button onClick={handleSubmit} disabled={isUploading}
                  className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors font-medium shadow-md flex items-center gap-2">
                  {isUploading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <FaCheck />}
                  {isEditing ? "Update Blog" : "Publish Blog"}
                </button>
              </div>
            </div>

            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-red-600 bg-red-50 px-3 py-1.5 rounded-full border border-red-100">{formData.category}</span>
                <div className="flex items-center gap-6 text-sm text-gray-500">
                  <span className="flex items-center gap-1.5"><FaCalendarAlt className="w-3.5 h-3.5" /> {new Date().toLocaleDateString()}</span>
                  <span className="flex items-center gap-1.5"><FaUser className="w-3.5 h-3.5" /> {formData.author || "SocialBureau Team"}</span>
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">{formData.title || "Your Blog Title"}</h1>
              <p className="text-xl text-gray-700 mb-8 leading-relaxed">{formData.excerpt || "Your blog excerpt will appear here…"}</p>
            </div>

            {imagePreview && (
              <div className="mb-10 rounded-2xl overflow-hidden shadow-xl">
                <img src={imagePreview} alt="Preview" className="w-full h-auto aspect-video object-cover" />
              </div>
            )}

            <div className="prose prose-lg max-w-none mb-12">
              <div ref={previewEditRef} contentEditable={isPreviewEditing}
                onBlur={(e) => setContent(e.currentTarget.innerHTML)}
                className={`blog-content min-h-[300px] transition-all duration-300 outline-none ${isPreviewEditing ? "bg-white p-8 rounded-2xl ring-4 ring-red-50 shadow-2xl shadow-red-100/20" : ""}`}
                dangerouslySetInnerHTML={{ __html: content || "<p>Your blog content will appear here…</p>" }}
              />
              {isPreviewEditing && (
                <p className="text-center text-xs text-gray-400 mt-4 animate-pulse">Click anywhere in the text to start typing. Use the tools on the right for formatting.</p>
              )}
            </div>

            {keywords.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-10">
                {keywords.map((kw, i) => (
                  <span key={i} className="text-sm bg-gray-200 text-gray-700 px-3 py-1.5 rounded-full">{kw}</span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ── Editor mode ───────────────────────────────────────────────────────────────
  return (
    <>
      {toast && <Toast type={toast.type} message={toast.message} onClose={() => setToast(null)} />}
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-red-950 text-gray-100 py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="bg-black/40 backdrop-blur-xl border border-red-900/30 rounded-2xl p-8 shadow-2xl">
            <h1 className="text-4xl font-bold text-white mb-2">{isEditing ? "Edit Blog Post" : "Submit a Blog Post"}</h1>
            <p className="text-gray-400 mb-8">Share your insights with the SocialBureau community</p>

            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Title */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Blog Title <span className="text-red-500">*</span>
                </label>
                <input type="text" name="title" value={formData.title} maxLength={100} onChange={handleInputChange}
                  placeholder="Enter blog title…"
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:outline-none focus:border-red-600 text-white placeholder-gray-500" required />
                <p className={`text-xs mt-1 ${formData.title.length > 90 ? "text-yellow-400" : "text-gray-500"}`}>
                  {formData.title.length}/100 characters
                </p>
              </div>

              {/* Custom URL */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Custom URL (Optional)</label>
                <input type="text" name="customUrl" value={formData.customUrl} onChange={handleInputChange}
                  placeholder="custom-blog-path (auto-generated from title if empty)"
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:outline-none focus:border-red-600 text-white placeholder-gray-500" />
              </div>

              {/* SEO Title */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">SEO Title (Optional)</label>
                <input type="text" name="seoTitle" value={formData.seoTitle} onChange={handleInputChange}
                  placeholder="SEO optimized title (defaults to blog title)" maxLength={200}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:outline-none focus:border-red-600 text-white placeholder-gray-500" />
                <p className="text-xs text-gray-500 mt-1">{formData.seoTitle.length}/200 characters</p>
              </div>

              {/* SEO Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">SEO Description (Optional)</label>
                <textarea name="seoDescription" value={formData.seoDescription} onChange={handleInputChange}
                  placeholder="SEO meta description (defaults to excerpt)" rows={3} maxLength={500}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:outline-none focus:border-red-600 text-white placeholder-gray-500 resize-none" />
                <p className="text-xs text-gray-500 mt-1">{formData.seoDescription.length}/500 characters</p>
              </div>

              {/* Category & Author */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Category <span className="text-red-500">*</span></label>
                  <select name="category" value={formData.category} onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:outline-none focus:border-red-600 text-white" required>
                    <option value="Marketing">Marketing</option>
                    <option value="Creatives">Creatives</option>
                    <option value="Case Studies">Case Studies</option>
                    <option value="Technology">Technology</option>
                    <option value="Advertisement">Advertisement</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Author Name</label>
                  <input type="text" name="author" value={formData.author} onChange={handleInputChange}
                    placeholder="Your name (optional)"
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:outline-none focus:border-red-600 text-white placeholder-gray-500" />
                </div>
              </div>

              {/* Excerpt */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Excerpt <span className="text-red-500">*</span></label>
                <textarea name="excerpt" value={formData.excerpt} onChange={handleInputChange}
                  placeholder="Brief summary (max 500 characters)…" rows={3} maxLength={500}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:outline-none focus:border-red-600 text-white placeholder-gray-500 resize-none" required />
                <div className="text-xs text-gray-500 mt-1">{formData.excerpt.length}/500 characters</div>
              </div>

              {/* Keywords */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">SEO Keywords</label>
                <div className="flex gap-2 mb-2">
                  <input type="text" value={keywordInput} onChange={(e) => setKeywordInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddKeyword())}
                    placeholder="Type a keyword and press Enter or Add…"
                    className="flex-1 px-4 py-2 bg-gray-900/50 border border-gray-700 rounded-lg focus:outline-none focus:border-red-600 text-white placeholder-gray-500" />
                  <button type="button" onClick={handleAddKeyword}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition font-medium">Add</button>
                </div>
                {keywords.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {keywords.map((kw, i) => (
                      <span key={i} className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm flex items-center gap-2">
                        {kw}
                        <button type="button" onClick={() => handleRemoveKeyword(kw)} className="text-red-400 hover:text-red-300 leading-none">✕</button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Featured Image */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Featured Image <span className="text-red-500">*</span></label>
                <div className="flex items-center gap-4">
                  <label className="cursor-pointer px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg hover:border-red-600 transition flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>{imageFile ? "Change Image" : "Choose Image"}</span>
                    <input type="file" accept="image/jpeg,image/png,image/jpg,image/webp" onChange={handleImageChange} className="hidden" />
                  </label>
                  {imageFile && <span className="text-sm text-gray-400">{imageFile.name}</span>}
                </div>
                <p className="text-xs text-gray-500 mt-1">Max 5MB · JPEG, PNG, WEBP</p>
                {imagePreview && (
                  <div className="mt-3 relative">
                    <img src={imagePreview} alt="Preview" className="w-full h-48 object-cover rounded-lg border border-gray-700" />
                    <button type="button" onClick={() => { setImageFile(null); setImagePreview(""); }}
                      className="absolute top-2 right-2 p-2 bg-red-600 hover:bg-red-700 rounded-full text-white" title="Remove image">✕</button>
                  </div>
                )}
              </div>

              {/* ── Rich Text Editor ── */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-semibold text-gray-300">
                    Content <span className="text-red-500">*</span>
                  </label>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded ${wordCount > 2000 ? "bg-red-900/60 text-red-300" : "bg-gray-800 text-gray-400"}`}>
                    {wordCount} / 2000 words
                  </span>
                </div>

                <RichEditor value={content} onChange={setContent} />

                <p className="text-xs text-gray-500 mt-2">
                  Tip: Paste content from Google Docs, Word, or any web page — headings, bold, links, and lists are all preserved.
                  Use <kbd className="bg-gray-800 px-1 rounded text-gray-300">Ctrl+B</kbd> <kbd className="bg-gray-800 px-1 rounded text-gray-300">Ctrl+I</kbd> <kbd className="bg-gray-800 px-1 rounded text-gray-300">Ctrl+Z</kbd> as shortcuts.
                </p>
              </div>

              {/* Related Blogs */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Related Blogs (Optional)</label>
                <div className="max-h-48 overflow-y-auto border border-gray-700 rounded-lg p-3 bg-gray-900/30">
                  {availableBlogs.length === 0 ? (
                    <p className="text-sm text-gray-500">No blogs available</p>
                  ) : (
                    <div className="space-y-2">
                      {availableBlogs.map((blog) => (
                        <label key={blog._id} className="flex items-center gap-2 cursor-pointer hover:bg-gray-800/50 p-2 rounded">
                          <input type="checkbox" checked={selectedChildBlogs.includes(blog._id)}
                            onChange={() => handleChildBlogToggle(blog._id)}
                            className="w-4 h-4 text-red-600 bg-gray-800 border-gray-700 rounded focus:ring-red-600" />
                          <span className="text-sm text-gray-300">{blog.title}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-1">Select related blog posts to show at the end of this article.</p>
              </div>

              {/* Submit Buttons */}
              <div className="flex flex-wrap gap-4 pt-4">
                <button type="submit"
                  disabled={createMutation.isPending || updateMutation.isPending || isUploading || wordCount > 2000}
                  className="flex-1 min-w-[200px] px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 rounded-lg font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-red-900/20">
                  {createMutation.isPending || updateMutation.isPending || isUploading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      {isUploading ? "Processing…" : "Saving…"}
                    </div>
                  ) : isEditing ? "Update Blog Post" : "Submit Blog Post"}
                </button>

                <button type="button" onClick={() => setShowPreview(true)}
                  className="px-6 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg font-semibold transition flex items-center gap-2">
                  <FaEye /> Preview
                </button>

                <button type="button"
                  onClick={() => {
                    if (isEditing) {
                      setIsEditing(false); setEditSlug(null);
                      setFormData({ title: "", excerpt: "", category: "Marketing", author: "", customUrl: "", seoTitle: "", seoDescription: "" });
                      setContent(""); setImagePreview(""); setImageFile(null);
                    } else {
                      navigate("/blog");
                    }
                  }}
                  className="px-6 py-3 bg-gray-900 hover:bg-gray-800 border border-gray-700 rounded-lg font-semibold transition">
                  {isEditing ? "Cancel Edit" : "Cancel"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}