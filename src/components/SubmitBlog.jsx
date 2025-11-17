import React, { useState, useMemo, useRef } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { blogAPI } from "../../services/blogServices";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import JoditEditor from "jodit-react";

export default function SubmitBlog() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const editor = useRef(null);

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

  // Fetch all published blogs for child blog selection
  const { data: blogsData } = useQuery({
    queryKey: ["allBlogs"],
    queryFn: () => blogAPI.getBlogs({ limit: 100, published: true }),
  });

  const availableBlogs = blogsData?.data || [];

  // Calculate word count from HTML content
  const wordCount = useMemo(() => {
    if (!content) return 0;
    const plain = content.replace(/<[^>]*>/g, ' ').replace(/&nbsp;|\u200B/g, ' ').trim();
    if (!plain) return 0;
    return plain.split(/\s+/).filter(Boolean).length;
  }, [content]);

  const createMutation = useMutation({
    mutationFn: (data) => blogAPI.createBlog(data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      alert('Blog submitted successfully!');
      navigate(`/blogs/${response.data.slug}`);
    },
    onError: (error) => {
      alert(error.response?.data?.message || 'Failed to submit blog');
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size must be less than 5MB');
        return;
      }
      if (!['image/jpeg', 'image/png', 'image/jpg', 'image/webp'].includes(file.type)) {
        alert('Only JPEG, PNG, and WEBP images are allowed');
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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      alert('Title is required');
      return;
    }
    if (!formData.excerpt.trim()) {
      alert('Excerpt is required');
      return;
    }
    if (!imageFile) {
      alert('Featured image is required');
      return;
    }
    // Ensure content isn't empty (strip tags and check length)
    const plainContent = content.replace(/<[^>]*>/g, '').trim();
    if (!plainContent) {
      alert('Content is required');
      return;
    }
    if (wordCount > 2000) {
      alert(`Content exceeds maximum word limit. Current: ${wordCount} words, Maximum: 2000 words`);
      return;
    }

    // Convert single HTML content to section format expected by backend
    const contentSection = [{
      type: 'text',
      text: content,
      heading: 'none',
    }];

    const blogData = {
      ...formData,
      image: imageFile,
      content: contentSection, // Send as array with single section
      keywords,
      childBlogs: selectedChildBlogs,
      author: formData.author.trim() || 'SocialBureau Team',
    };

    createMutation.mutate(blogData);
  };

  return (
    <>
      <Navbar />
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
                  onChange={handleInputChange}
                  placeholder="Enter blog title..."
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:outline-none focus:border-red-600 text-white placeholder-gray-500"
                  required
                />
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
                  maxLength={60}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:outline-none focus:border-red-600 text-white placeholder-gray-500"
                />
                <p className="text-xs text-gray-500 mt-1">
                  {formData.seoTitle.length}/60 characters - Optimized for search engines
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
                  maxLength={160}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:outline-none focus:border-red-600 text-white placeholder-gray-500 resize-none"
                />
                <p className="text-xs text-gray-500 mt-1">
                  {formData.seoDescription.length}/160 characters - Appears in search results
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
                      required={!imageFile}
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
                </div>

                <div className="bg-gray-900 border border-gray-700 rounded-lg p-2">
                  <JoditEditor
                    ref={editor}
                    value={content}
                    onBlur={newContent => setContent(newContent)}
                    config={{
                      height: 420,
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
                        "fontsize", "paragraph", "|",
                        "link", "image", "table", "|",
                        "align", "undo", "redo", "|",
                        "hr", "eraser", "copyformat"
                      ]
                    }}
                  />
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
              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  disabled={createMutation.isPending || wordCount > 2000}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 rounded-lg font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {createMutation.isPending ? 'Submitting...' : 'Submit Blog Post'}
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/blog')}
                  className="px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg font-semibold transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
