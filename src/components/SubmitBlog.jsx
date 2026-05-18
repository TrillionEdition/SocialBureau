import React, { useState, useMemo, useRef, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { blogAPI } from "@/services/blogServices";
import Footer from "./Footer";
import Toast from "./Toast";
import { useNavigate, useLocation, Link } from "react-router-dom";
import JoditEditor from "jodit-react";
import { getUserData, isAdmin } from "@/utils/authUtils";
import { FaEye, FaArrowLeft, FaEdit, FaTrash, FaCheck, FaTimes, FaCalendarAlt, FaUser, FaUndo, FaRedo, FaChartBar } from "react-icons/fa";

export default function SubmitBlog() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();
  const editor = useRef(null);
  const [toast, setToast] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [isPreviewEditing, setIsPreviewEditing] = useState(false);
  const [isLivePreview, setIsLivePreview] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editSlug, setEditSlug] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const previewEditRef = useRef(null);

  const applyFormat = (command, value = null) => {
    document.execCommand(command, false, value);
    if (previewEditRef.current) {
      setContent(previewEditRef.current.innerHTML);
    }
  };

  // Helper to process content styles similar to BlogDetail.jsx
  const processPreviewContent = (html) => {
    if (!html) return html;
    let processedHtml = html;
    
    // Remove excessive line breaks
    processedHtml = processedHtml.replace(/(?:<br\s*\/?>\s*){2,}/gi, '<br/>');
    
    // Process headings with same classes as BlogDetail
    processedHtml = processedHtml.replace(/<h([1-6])(?:\s+[^>]*)?>(.*?)<\/h\1>/gi, (match, level, content) => {
      let headingClasses = "font-medium text-gray-900 mt-8 mb-4 leading-tight";
      if (level === "1") headingClasses += " text-3xl md:text-4xl";
      else if (level === "2") headingClasses += " text-2xl md:text-3xl";
      else if (level === "3") headingClasses += " text-xl md:text-2xl";
      else headingClasses += " text-lg md:text-xl";
      
      return `<h${level} class="${headingClasses}">${content}</h${level}>`;
    });

    // Process paragraphs
    processedHtml = processedHtml.replace(/<p(?:\s+[^>]*)?>(.*?)<\/p>/gi, (match, content) => {
      return `<p class="text-xl text-gray-700 mb-6 leading-relaxed">${content}</p>`;
    });

    // Process lists
    processedHtml = processedHtml.replace(/<ul(?:\s+[^>]*)?>(.*?)<\/ul>/gi, (match, content) => {
      return `<ul class="text-xl text-gray-700 mb-6 leading-relaxed list-disc pl-6 space-y-2">${content}</ul>`;
    });
    
    return processedHtml;
  };

  // Frontend upload removed in favor of secure backend upload via multipart/form-data

  useEffect(() => {
    const userData = getUserData();
    if (!userData) {
      setToast({ type: "error", message: "Please login to submit a blog" });
      setTimeout(() => {
        navigate("/login", { state: { from: location } });
      }, 2000);
      return;
    }
    setCurrentUser(userData);
  }, [navigate, location]);

  // Replaced multiple content sections with a single full-featured editor content
  const [content, setContent] = useState("");

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [keywords, setKeywords] = useState([]);
  const [keywordInput, setKeywordInput] = useState('');
  const [selectedChildBlogs, setSelectedChildBlogs] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    category: 'Marketing',
    author: '',
    customUrl: '',
    seoTitle: '',
    seoDescription: '',
  });

  // Fetch all blogs for management - admins see everything, users see published (plus their own drafts if API supports)
  const { data: blogsData } = useQuery({
    queryKey: ["allBlogs", currentUser?.role, currentUser?.email],
    queryFn: () => blogAPI.getBlogs({ 
      limit: 100, 
      published: 'all' 
    }),
    enabled: !!currentUser,
  });

  const availableBlogs = useMemo(() => {
    if (!blogsData || !currentUser) return [];
    const blogs = Array.isArray(blogsData) ? blogsData : (blogsData.data || []);
    
    // Filter by ownership: only show blogs where blog.user matches current user ID
    // Admins can see everything, others only see their own
    if (isAdmin()) {
      console.log(`📊 Admin view: Showing all ${blogs.length} blogs`);
      return blogs;
    }
    
    const userId = currentUser.id || currentUser._id;
    const filtered = blogs.filter(blog => {
      // Check if the blog's user field matches the current user's ID
      const blogUserId = blog.user?._id || blog.user;
      return blogUserId?.toString() === userId?.toString();
    });

    console.log(`📊 User view: Showing ${filtered.length} own blogs out of ${blogs.length} total`);
    return filtered;
  }, [blogsData, currentUser]);

  // Calculate word count from HTML content
  const wordCount = useMemo(() => {
    if (!content) return 0;
    const plain = content.replace(/<[^>]*>/g, ' ').replace(/&nbsp;|\u200B/g, ' ').trim();
    if (!plain) return 0;
    return plain.split(/\s+/).filter(Boolean).length;
  }, [content]);

  // HANDLE EXTERNAL EDIT REQUESTS (from BlogDetail page)
  useEffect(() => {
    if (location.state?.editBlog) {
      console.log('📝 Initializing external edit request for:', location.state.editBlog.title);
      handleEdit(location.state.editBlog);
      // Clear state after reading to prevent re-initializing on refreshes
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const createMutation = useMutation({
    mutationFn: (data) => blogAPI.createBlog(data),
    onSuccess: (response) => {
      console.log('✅ Blog created successfully:', response);
      queryClient.invalidateQueries({ queryKey: ["allBlogs"] });
      setToast({ type: "success", message: "Blog submitted successfully!" });
      setIsUploading(false);
      setIsEditing(false);
      setEditSlug(null);
      
      const slug = response?.data?.slug || response?.slug;
      if (slug) {
        setTimeout(() => {
          navigate(`/blogs/${slug}`);
        }, 1500);
      }
    },
    onError: (error) => {
      console.error('❌ Blog creation failed:', error);
      setIsUploading(false);
      const errorMsg = error.response?.data?.message || error.message || 'Failed to process blog';
      setToast({ type: "error", message: `Creation Error: ${errorMsg}` });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ slug, data }) => blogAPI.updateBlog(slug, data),
    onSuccess: (response) => {
      console.log('✅ Blog updated successfully:', response);
      queryClient.invalidateQueries({ queryKey: ["allBlogs"] });
      setToast({ type: "success", message: "Blog updated successfully!" });
      setIsUploading(false);
      setIsEditing(false);
      setEditSlug(null);

      const slug = response?.data?.slug || response?.slug;
      if (slug) {
        setTimeout(() => {
          navigate(`/blogs/${slug}`);
        }, 1500);
      }
    },
    onError: (error) => {
      console.error('❌ Blog update failed:', error);
      setIsUploading(false);
      const errorMsg = error.response?.data?.message || error.message || 'Failed to update blog';
      setToast({ type: "error", message: `Update Error: ${errorMsg}` });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (slug) => blogAPI.deleteBlog(slug),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allBlogs"] });
      setToast({ type: "success", message: "Blog deleted successfully" });
    },
    onError: (error) => {
      setToast({ type: "error", message: error.response?.data?.message || 'Failed to delete blog' });
    },
  });

  const handleEdit = (blog) => {
    setFormData({
      title: blog.title,
      excerpt: blog.excerpt,
      category: blog.category,
      author: blog.author || '',
      customUrl: blog.slug,
      seoTitle: blog.seo?.title || blog.seoTitle || '',
      seoDescription: blog.seo?.description || blog.seoDescription || '',
    });
    
    setContent(blog.content[0]?.text || '');
    setImagePreview(blog.image);
    setKeywords(blog.keywords || []);
    setSelectedChildBlogs(blog.childBlogs?.map(cb => typeof cb === 'object' ? cb._id : cb) || []);
    setIsEditing(true);
    setEditSlug(blog.slug);
    setImageFile(null); // Clear any pending file upload when editing a new blog
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (slug) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      deleteMutation.mutate(slug);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setToast({ type: "error", message: "Image size must be less than 5MB" });
        return;
      }
      if (!['image/jpeg', 'image/png', 'image/jpg', 'image/webp'].includes(file.type)) {
        setToast({ type: "error", message: "Only JPEG, PNG, and WEBP images are allowed" });
        return;
      }
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleAddKeyword = () => {
    if (keywordInput.trim() && !keywords.includes(keywordInput.trim())) {
      setKeywords([...keywords, keywordInput.trim()]);
      setKeywordInput('');
    }
  };

  const handleRemoveKeyword = (keyword) => {
    setKeywords(keywords.filter(k => k !== keyword));
  };

  const handleChildBlogToggle = (blogId) => {
    setSelectedChildBlogs(prev =>
      prev.includes(blogId)
        ? prev.filter(id => id !== blogId)
        : [...prev, blogId]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('📝 Submitting blog form...', { formData, keywords, selectedChildBlogs });

    if (!formData.title.trim()) {
      console.warn('❌ Submission failed: Title is empty');
      setToast({ type: "error", message: "Title is required" });
      return;
    }
    if (!formData.excerpt.trim()) {
      console.warn('❌ Submission failed: Excerpt is empty');
      setToast({ type: "error", message: "Excerpt is required" });
      return;
    }
    if (!imageFile && !imagePreview) {
      console.warn('❌ Submission failed: Image is missing');
      setToast({ type: "error", message: "Featured image is required" });
      return;
    }

    if (imageFile) {
      const fileSizeInMB = imageFile.size / (1024 * 1024);
      if (fileSizeInMB > 5) {
        console.warn(`❌ Submission failed: Image too large (${fileSizeInMB.toFixed(2)}MB)`);
        setToast({ type: "error", message: "Featured image is too large. Maximum size allowed is 5MB." });
        return;
      }
    }

    // Sync content from on-page editor if in preview mode OR from Jodit ref if in normal mode
    let currentContent = content;
    if (showPreview && previewEditRef.current) {
      currentContent = previewEditRef.current.innerHTML;
      console.log('🔄 Synced content from preview editor ref');
      setContent(currentContent);
    } else if (!showPreview) {
      // In normal mode, we rely on the state updated by Jodit's onBlur.
      // Direct instance sync via ref is removed to avoid internal Jodit getter crashes.
      console.log('📝 Using content from state (normal mode)');
    }

    const plainContent = currentContent.replace(/<[^>]*>/g, '').trim();
    if (!plainContent) {
      console.warn('❌ Submission failed: Content is empty');
      setToast({ type: "error", message: "Content is required" });
      return;
    }
    
    // Recalculate word count for validation
    const currentWordCount = currentContent.replace(/<[^>]*>/g, ' ').replace(/&nbsp;|\u200B/g, ' ').trim().split(/\s+/).filter(Boolean).length;
    if (currentWordCount > 2000) {
      console.warn(`❌ Submission failed: Word count too high (${currentWordCount})`);
      setToast({ type: "error", message: `Content exceeds maximum word limit. Current: ${currentWordCount} words, Maximum: 2000 words` });
      return;
    }

    console.log('✅ Validation passed. Starting upload...', { currentWordCount });
    setIsUploading(true);
    setToast({ type: "loading", message: isEditing ? "Updating blog..." : "Publishing blog and securing assets..." });

    try {
      const contentSection = [{
        type: 'text',
        text: currentContent,
        heading: 'none',
      }];

      const blogData = {
        ...formData,
        image: imageFile || imagePreview,
        content: contentSection,
        keywords,
        childBlogs: selectedChildBlogs,
        author: formData.author.trim() || currentUser?.name || 'SocialBureau Team',
        seoTitle: formData.seoTitle,
        seoDescription: formData.seoDescription,
      };

      if (isEditing) {
        updateMutation.mutate({ slug: editSlug, data: blogData });
      } else {
        createMutation.mutate(blogData);
      }
    } catch (err) {
      console.error('🔥 CRITICAL ERROR in handleSubmit:', err);
      setToast({ type: "error", message: err.message || "An unexpected error occurred" });
      setIsUploading(false);
    }
  };

  if (showPreview) {
    return (
      <div className="bg-gray-50 min-h-screen font-sans text-gray-900 flex relative">
        <style>{`
          .blog-content[contenteditable="true"] {
            user-select: text !important;
            -webkit-user-select: text !important;
            cursor: text;
            line-height: 1.6;
          }
          .blog-content[contenteditable="true"] h1 {
            font-size: 2.5rem !important;
            font-weight: 800 !important;
            color: #111827 !important;
            margin-top: 2rem !important;
            margin-bottom: 1rem !important;
            display: block !important;
          }
          .blog-content[contenteditable="true"] h2 {
            font-size: 2rem !important;
            font-weight: 700 !important;
            color: #111827 !important;
            margin-top: 1.5rem !important;
            margin-bottom: 0.75rem !important;
            display: block !important;
          }
          .blog-content[contenteditable="true"] h3 {
            font-size: 1.5rem !important;
            font-weight: 600 !important;
            color: #111827 !important;
            margin-top: 1.25rem !important;
            margin-bottom: 0.5rem !important;
            display: block !important;
          }
          .blog-content[contenteditable="true"] p {
            font-size: 1.25rem !important;
            color: #374151 !important;
            margin-bottom: 1.25rem !important;
            line-height: 1.8 !important;
          }
          .blog-content[contenteditable="true"] ul {
            list-style-type: disc !important;
            padding-left: 1.5rem !important;
            margin-bottom: 1.25rem !important;
          }
          .blog-content[contenteditable="true"] ol {
            list-style-type: decimal !important;
            padding-left: 1.5rem !important;
            margin-bottom: 1.25rem !important;
          }
          ::selection {
            background-color: #fee2e2 !important;
            color: #b91c1c !important;
          }
        `}</style>

        {/* Sidebar Tools - Fixed on the right */}
        {isPreviewEditing && (
          <div className="fixed right-0 top-0 bottom-0 w-72 bg-white border-l border-gray-200 shadow-2xl p-6 z-50 overflow-y-auto animate-in slide-in-from-right duration-300">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <FaEdit className="text-red-600" /> Tools
              </h3>
              <button
                onClick={() => setIsPreviewEditing(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <FaTimes className="text-gray-400" />
              </button>
            </div>

            <div className="space-y-8">
              {/* Headings */}
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 block">Structure</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: 'H1 Title', cmd: 'formatBlock', val: 'H1', class: 'text-lg font-bold' },
                    { label: 'H2 Sub', cmd: 'formatBlock', val: 'H2', class: 'text-md font-bold' },
                    { label: 'H3 Sec', cmd: 'formatBlock', val: 'H3', class: 'text-sm font-bold' },
                    { label: 'Para', cmd: 'formatBlock', val: 'P', class: 'text-sm' },
                  ].map((item, i) => (
                    <button
                      key={i}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        applyFormat(item.cmd, item.val);
                      }}
                      className="flex flex-col items-center justify-center p-3 border border-gray-100 rounded-xl hover:border-red-200 hover:bg-red-50 transition-all text-center group"
                    >
                      <span className={`text-gray-900 group-hover:text-red-600 ${item.class}`}>{item.val === 'P' ? '¶' : item.val}</span>
                      <span className="text-[9px] text-gray-400 mt-1">{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Font Size */}
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 block">Text Size</label>
                <div className="flex items-center gap-2">
                  {[
                    { label: 'L', val: '6' },
                    { label: 'M', val: '4' },
                    { label: 'S', val: '3' },
                  ].map((size, i) => (
                    <button
                      key={i}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        applyFormat('fontSize', size.val);
                      }}
                      className="flex-1 py-2 border border-gray-100 rounded-lg hover:border-red-200 hover:bg-red-50 transition-all font-bold text-gray-700"
                    >
                      {size.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Spacing */}
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 block">Spacing</label>
                <button
                  onMouseDown={(e) => {
                    e.preventDefault();
                    applyFormat('insertHTML', '<br/><br/>');
                  }}
                  className="w-full py-3 border border-dashed border-gray-200 rounded-xl hover:border-red-300 hover:bg-red-50 transition-all text-sm text-gray-600 flex items-center justify-center gap-2"
                >
                  <span>Add Extra Space</span>
                </button>
              </div>

              {/* Actions & History */}
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 block">Actions</label>
                <div className="flex gap-2 mb-3">
                  <button onMouseDown={(e) => { e.preventDefault(); applyFormat('bold'); }} className="flex-1 p-2 border border-gray-100 rounded-lg hover:bg-gray-50 font-bold">B</button>
                  <button onMouseDown={(e) => { e.preventDefault(); applyFormat('italic'); }} className="flex-1 p-2 border border-gray-100 rounded-lg hover:bg-gray-50 italic">I</button>
                  <button onMouseDown={(e) => { e.preventDefault(); applyFormat('underline'); }} className="flex-1 p-2 border border-gray-100 rounded-lg hover:bg-gray-50 underline">U</button>
                </div>
                <div className="flex gap-2">
                  <button
                    onMouseDown={(e) => { e.preventDefault(); applyFormat('undo'); }}
                    className="flex-1 py-2 border border-gray-100 rounded-lg hover:bg-gray-50 text-xs flex items-center justify-center gap-1.5 text-gray-600"
                  >
                    <FaUndo size={10} /> Undo
                  </button>
                  <button
                    onMouseDown={(e) => { e.preventDefault(); applyFormat('redo'); }}
                    className="flex-1 py-2 border border-gray-100 rounded-lg hover:bg-gray-50 text-xs flex items-center justify-center gap-1.5 text-gray-600"
                  >
                    <FaRedo size={10} /> Redo
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-6 border-t border-gray-100 space-y-3">
              <button
                onClick={() => setIsPreviewEditing(false)}
                className="w-full py-3 bg-red-600 text-white rounded-xl font-bold shadow-lg shadow-red-200 hover:bg-red-700 transition-colors"
              >
                Done Editing
              </button>
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <div className={`flex-1 transition-all duration-500 ease-in-out ${isPreviewEditing ? 'pr-72' : ''}`}>
          <div className="max-w-4xl mx-auto px-4 pt-12">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <button
                onClick={() => {
                  setShowPreview(false);
                  setIsPreviewEditing(false);
                }}
                className="flex items-center gap-2 text-gray-500 hover:text-red-600 transition-colors group"
              >
                <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                <span>Back to Editor</span>
              </button>

              <div className="flex items-center gap-3">
                {!isPreviewEditing && (
                  <button
                    onClick={() => setIsPreviewEditing(true)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-700 font-medium hover:bg-gray-50 transition-all shadow-sm"
                  >
                    <FaEdit /> Edit on Page
                  </button>
                )}
                <button
                  onClick={handleSubmit}
                  disabled={isUploading}
                  className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors font-medium shadow-md flex items-center gap-2"
                >
                  {isUploading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <FaCheck />}
                  {isEditing ? "Update Blog" : "Publish Blog"}
                </button>
              </div>
            </div>

            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-red-600 bg-red-50 px-3 py-1.5 rounded-full border border-red-100">
                  {formData.category}
                </span>
                <div className="flex items-center gap-6 text-sm text-gray-500">
                  <span className="flex items-center gap-1.5"><FaCalendarAlt className="w-3.5 h-3.5" /> {new Date().toLocaleDateString()}</span>
                  <span className="flex items-center gap-1.5"><FaUser className="w-3.5 h-3.5" /> {formData.author || 'SocialBureau Team'}</span>
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                {formData.title || 'Your Blog Title'}
              </h1>
              <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                {formData.excerpt || 'Your blog excerpt will appear here...'}
              </p>
            </div>

            {imagePreview && (
              <div className="mb-10 rounded-2xl overflow-hidden shadow-xl">
                <img src={imagePreview} alt="Preview" className="w-full h-auto aspect-video object-cover" />
              </div>
            )}

            <div className="prose prose-lg max-w-none mb-12">
              <div
                ref={previewEditRef}
                contentEditable={isPreviewEditing}
                onBlur={(e) => setContent(e.currentTarget.innerHTML)}
                className={`blog-content min-h-[300px] transition-all duration-300 outline-none ${isPreviewEditing
                    ? 'bg-white p-8 rounded-2xl ring-4 ring-red-50 shadow-2xl shadow-red-100/20'
                    : ''
                  }`}
                dangerouslySetInnerHTML={{ __html: content || '<p>Your blog content will appear here...</p>' }}
              />
              {isPreviewEditing && (
                <p className="text-center text-xs text-gray-400 mt-4 animate-pulse">
                  Click anywhere in the text above to start typing. Use the tools on the right for formatting.
                </p>
              )}
            </div>

            {keywords.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-10">
                {keywords.map((keyword, idx) => (
                  <span key={idx} className="text-sm bg-gray-200 text-gray-700 px-3 py-1.5 rounded-full">{keyword}</span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-red-950 text-gray-100 py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="bg-black/40 backdrop-blur-xl border border-red-900/30 rounded-2xl p-8 shadow-2xl">
            <h1 className="text-4xl font-bold text-white mb-2">Submit a Blog Post</h1>
            <p className="text-gray-400 mb-8">Share your insights with the SocialBureau community</p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Blog Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  maxLength={60}
                  onChange={handleInputChange}
                  placeholder="Enter blog title..."
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:outline-none focus:border-red-600 text-white placeholder-gray-500"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  {formData.title.length}/60 characters
                </p>
              </div>

              {/* Custom URL */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Custom URL (Optional)
                </label>
                <input
                  type="text"
                  name="customUrl"
                  value={formData.customUrl}
                  onChange={handleInputChange}
                  placeholder="custom-blog-path (leave empty to auto-generate from title)"
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:outline-none focus:border-red-600 text-white placeholder-gray-500"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Custom URL path for this blog. If left empty, will be auto-generated from title.
                </p>
              </div>

              {/* SEO Title */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  SEO Title (Optional)
                </label>
                <input
                  type="text"
                  name="seoTitle"
                  value={formData.seoTitle}
                  onChange={handleInputChange}
                  placeholder="SEO optimized title (leave empty to use blog title)"
                  maxLength={200}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:outline-none focus:border-red-600 text-white placeholder-gray-500"
                />
                <p className="text-xs text-gray-500 mt-1">
                  {formData.seoTitle.length}/200 characters - Optimized for search engines
                </p>
              </div>

              {/* SEO Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  SEO Description (Optional)
                </label>
                <textarea
                  name="seoDescription"
                  value={formData.seoDescription}
                  onChange={handleInputChange}
                  placeholder="SEO meta description (leave empty to use excerpt)"
                  rows={3}
                  maxLength={500}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:outline-none focus:border-red-600 text-white placeholder-gray-500 resize-none"
                />
                <p className="text-xs text-gray-500 mt-1">
                  {formData.seoDescription.length}/500 characters - Appears in search results
                </p>
              </div>

              {/* Category & Author */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:outline-none focus:border-red-600 text-white"
                    required
                  >
                    <option value="Marketing">Marketing</option>
                    <option value="Creatives">Creatives</option>
                    <option value="Case Studies">Case Studies</option>
                    <option value="Technology">Technology</option>
                    <option value="Advertisement">Advertisement</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Author Name
                  </label>
                  <input
                    type="text"
                    name="author"
                    value={formData.author}
                    onChange={handleInputChange}
                    placeholder="Your name (optional)"
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:outline-none focus:border-red-600 text-white placeholder-gray-500"
                  />
                </div>
              </div>

              {/* Excerpt */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Excerpt <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleInputChange}
                  placeholder="Brief summary (max 500 characters)..."
                  rows={3}
                  maxLength={500}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:outline-none focus:border-red-600 text-white placeholder-gray-500 resize-none"
                  required
                />
                <div className="text-xs text-gray-500 mt-1">
                  {formData.excerpt.length}/500 characters
                </div>
              </div>

              {/* Keywords */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  SEO Keywords
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={keywordInput}
                    onChange={(e) => setKeywordInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddKeyword())}
                    placeholder="Add keyword..."
                    className="flex-1 px-4 py-2 bg-gray-900/50 border border-gray-700 rounded-lg focus:outline-none focus:border-red-600 text-white placeholder-gray-500"
                  />
                  <button
                    type="button"
                    onClick={handleAddKeyword}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {keywords.map((keyword, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm flex items-center gap-2"
                    >
                      {keyword}
                      <button
                        type="button"
                        onClick={() => handleRemoveKeyword(keyword)}
                        className="text-red-400 hover:text-red-300"
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Featured Image */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Featured Image <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center gap-4">
                  <label className="cursor-pointer px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg hover:border-red-600 transition flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>{imageFile ? 'Change Image' : 'Choose Image'}</span>
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/jpg,image/webp"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                  {imageFile && (
                    <span className="text-sm text-gray-400">{imageFile.name}</span>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Max 5MB. Supported: JPEG, PNG, WEBP
                </p>
                {imagePreview && (
                  <div className="mt-3 relative">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-48 object-cover rounded-lg border border-gray-700"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setImageFile(null);
                        setImagePreview('');
                      }}
                      className="absolute top-2 right-2 p-2 bg-red-600 hover:bg-red-700 rounded-full text-white"
                      title="Remove image"
                    >
                      ✕
                    </button>
                  </div>
                )}
              </div>

              {/* Rich Text Editor (Jodit) */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-semibold text-gray-300">
                    Content <span className="text-red-500">*</span>
                    <span className={`ml-3 text-xs ${wordCount > 2000 ? 'text-red-500' : 'text-gray-500'}`}>
                      {wordCount}/2000 words
                    </span>
                  </label>
                  <button
                    type="button"
                    onClick={() => setIsLivePreview(!isLivePreview)}
                    className={`text-xs px-3 py-1 rounded border transition-colors ${isLivePreview ? 'bg-red-600 border-red-600 text-white' : 'border-gray-600 text-gray-400 hover:text-white'}`}
                  >
                    {isLivePreview ? 'Hide Live Preview' : 'Show Live Preview'}
                  </button>
                </div>

                <div className={`grid gap-4 ${isLivePreview ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'}`}>
                  <div className="bg-gray-900 border border-gray-700 rounded-lg p-2">
                    <JoditEditor
                      ref={editor}
                      value={content}
                      onBlur={newContent => setContent(newContent)}
                      config={{
                        height: 500,
                        uploader: { insertImageAsBase64URI: true },
                        toolbarAdaptive: false,
                        askBeforePasteFromWord: false,
                        toolbarSticky: true,
                        readonly: false,
                        style: {
                          color: '#ffffff',
                          background: '#1f2937'
                        },
                        editorCssClass: 'jodit-wysiwyg-custom',
                        buttons: [
                          "bold", "italic", "underline", "|",
                          "ul", "ol", "|",
                          "fontsize", "paragraph", "lineheight", "|",
                          "link", "image", "table", "|",
                          "align", "undo", "redo", "|",
                          "hr", "eraser", "copyformat"
                        ]
                      }}
                    />
                  </div>

                  {isLivePreview && (
                    <div className="bg-white rounded-lg p-6 overflow-y-auto max-h-[518px] border border-gray-700 shadow-inner">
                      <div className="mb-4 pb-2 border-b border-gray-100 flex items-center justify-between">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Live Preview</span>
                        <span className="text-[10px] text-gray-300 italic">Matches actual blog style</span>
                      </div>
                      <div
                        className="blog-content"
                        dangerouslySetInnerHTML={{ __html: processPreviewContent(content) || '<p class="text-gray-400 italic">Content preview will appear here...</p>' }}
                      />
                    </div>
                  )}
                </div>
                  <style>{`
                    .jodit-wysiwyg {
                      color: #ffffff !important;
                      background: #1f2937 !important;
                      padding: 1rem !important;
                    }
                    .jodit-wysiwyg h1 {
                      font-size: 2em !important;
                      font-weight: bold !important;
                      color: #ffffff !important;
                      margin: 0.67em 0 !important;
                    }
                    .jodit-wysiwyg h2 {
                      font-size: 1.5em !important;
                      font-weight: bold !important;
                      color: #ffffff !important;
                      margin: 0.75em 0 !important;
                    }
                    .jodit-wysiwyg h3 {
                      font-size: 1.25em !important;
                      font-weight: bold !important;
                      color: #ffffff !important;
                      margin: 0.83em 0 !important;
                    }
                    .jodit-wysiwyg h4 {
                      font-size: 1.1em !important;
                      font-weight: bold !important;
                      color: #ffffff !important;
                      margin: 1em 0 !important;
                    }
                    .jodit-wysiwyg h5 {
                      font-size: 1em !important;
                      font-weight: bold !important;
                      color: #ffffff !important;
                      margin: 1em 0 !important;
                    }
                    .jodit-wysiwyg h6 {
                      font-size: 0.875em !important;
                      font-weight: bold !important;
                      color: #ffffff !important;
                      margin: 1em 0 !important;
                    }
                    .jodit-wysiwyg p {
                      color: #ffffff !important;
                      margin: 1em 0 !important;
                    }
                    .jodit-wysiwyg strong {
                      font-weight: bold !important;
                      color: #ffffff !important;
                    }
                    .jodit-wysiwyg em {
                      font-style: italic !important;
                      color: #ffffff !important;
                    }
                    .jodit-wysiwyg a {
                      color: #ef4444 !important;
                      text-decoration: underline !important;
                    }
                    .jodit-wysiwyg ul, .jodit-wysiwyg ol {
                      color: #ffffff !important;
                      padding-left: 2em !important;
                      margin: 1em 0 !important;
                    }
                    .jodit-wysiwyg li {
                      color: #ffffff !important;
                      margin: 0.5em 0 !important;
                    }
                    .jodit-toolbar-button {
                      color: #ffffff !important;
                    }
                    .jodit-container {
                      border-color: #374151 !important;
                    }
                  `}</style>
                </div>

              {/* Related/Child Blogs */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Related Blogs (Optional)
                </label>
                <div className="max-h-48 overflow-y-auto border border-gray-700 rounded-lg p-3 bg-gray-900/30">
                  {availableBlogs.length === 0 ? (
                    <p className="text-sm text-gray-500">No blogs available</p>
                  ) : (
                    <div className="space-y-2">
                      {availableBlogs.map(blog => (
                        <label key={blog._id} className="flex items-center gap-2 cursor-pointer hover:bg-gray-800/50 p-2 rounded">
                          <input
                            type="checkbox"
                            checked={selectedChildBlogs.includes(blog._id)}
                            onChange={() => handleChildBlogToggle(blog._id)}
                            className="w-4 h-4 text-red-600 bg-gray-800 border-gray-700 rounded focus:ring-red-600"
                          />
                          <span className="text-sm text-gray-300">{blog.title}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Select related blog posts to show at the end of this article.
                </p>
              </div>

              {/* Submit Buttons */}
              <div className="flex flex-wrap gap-4 pt-4">
                <button
                  type="submit"
                  disabled={createMutation.isPending || updateMutation.isPending || isUploading || wordCount > 2000}
                  className="flex-1 min-w-[200px] px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 rounded-lg font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-red-900/20"
                >
                  {createMutation.isPending || updateMutation.isPending || isUploading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      {isUploading ? 'Processing...' : 'Saving...'}
                    </div>
                  ) : isEditing ? 'Update Blog Post' : 'Submit Blog Post'}
                </button>

                <button
                  type="button"
                  onClick={() => setShowPreview(true)}
                  className="px-6 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg font-semibold transition flex items-center gap-2"
                >
                  <FaEye /> Preview
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (isEditing) {
                      setIsEditing(false);
                      setEditSlug(null);
                      setFormData({ title: '', excerpt: '', category: 'Marketing', author: '', customUrl: '', seoTitle: '', seoDescription: '' });
                      setContent('');
                      setImagePreview('');
                      setImageFile(null);
                    } else {
                      navigate('/blog');
                    }
                  }}
                  className="px-6 py-3 bg-gray-900 hover:bg-gray-800 border border-gray-700 rounded-lg font-semibold transition"
                >
                  {isEditing ? 'Cancel Edit' : 'Cancel'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}


