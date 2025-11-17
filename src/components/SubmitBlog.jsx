import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { blogAPI } from "../../services/blogServices";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";

export default function SubmitBlog() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [contentSections, setContentSections] = useState(['']);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    category: 'Marketing',
    author: '',
  });

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

  const handleContentChange = (index, value) => {
    const newSections = [...contentSections];
    newSections[index] = value;
    setContentSections(newSections);
  };

  const addContentSection = () => {
    setContentSections([...contentSections, '']);
  };

  const removeContentSection = (index) => {
    setContentSections(contentSections.filter((_, i) => i !== index));
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
      alert('Image is required');
      return;
    }
    if (contentSections.filter(s => s.trim()).length === 0) {
      alert('At least one content section is required');
      return;
    }

    const blogData = {
      ...formData,
      image: imageFile,
      content: contentSections.filter(s => s.trim()),
      author: formData.author.trim() || 'SocialBureau Team',
    };

    createMutation.mutate(blogData);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-red-950 text-gray-100 py-12 px-4">
        <div className="max-w-4xl mx-auto">
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

              {/* Image Upload */}
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

              {/* Content Sections */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-semibold text-gray-300">
                    Content Sections <span className="text-red-500">*</span>
                  </label>
                  <button
                    type="button"
                    onClick={addContentSection}
                    className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded-lg text-sm font-medium transition"
                  >
                    + Add Section
                  </button>
                </div>
                <p className="text-xs text-gray-500 mb-3">
                  Support Markdown formatting. Each section will be rendered separately.
                </p>

                <div className="space-y-4">
                  {contentSections.map((section, index) => (
                    <div key={index} className="relative">
                      <div className="flex items-start gap-2">
                        <div className="flex-1">
                          <div className="text-xs text-gray-500 mb-1">Section {index + 1}</div>
                          <textarea
                            value={section}
                            onChange={(e) => handleContentChange(index, e.target.value)}
                            placeholder="Write your content here (Markdown supported)..."
                            rows={6}
                            className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:outline-none focus:border-red-600 text-white placeholder-gray-500 resize-none font-mono text-sm"
                          />
                        </div>
                        {contentSections.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeContentSection(index)}
                            className="mt-7 px-3 py-2 bg-gray-800 hover:bg-red-900 rounded-lg text-red-400 transition"
                            title="Remove section"
                          >
                            ✕
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  disabled={createMutation.isPending}
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
