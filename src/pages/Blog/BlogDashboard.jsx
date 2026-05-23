import React, { useState, useMemo, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { blogAPI } from "@/services/blogServices";
import Footer from "@/components/Footer";
import Toast from "@/components/Toast";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { getUserData, isAdmin } from "@/utils/authUtils";
import { 
  FaEye, 
  FaEdit, 
  FaTrash, 
  FaPlus, 
  FaSearch, 
  FaFilter, 
  FaCalendarAlt, 
  FaUser, 
  FaChartBar, 
  FaBookOpen, 
  FaCheckCircle, 
  FaExclamationCircle, 
  FaSpinner 
} from "react-icons/fa";

export default function BlogDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();
  const [toast, setToast] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  // Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");

  // Validate Authentication & Fetch Session
  useEffect(() => {
    const userData = getUserData();
    if (!userData) {
      setToast({ type: "error", message: "Please login to view dashboard" });
      setTimeout(() => {
        navigate("/login", { state: { from: location } });
      }, 2000);
      return;
    }
    setCurrentUser(userData);
  }, [navigate, location]);

  // Fetch blogs using react-query
  const { data: blogsData, isLoading, isError, error } = useQuery({
    queryKey: ["allBlogs", currentUser?.role, currentUser?.email],
    queryFn: () => blogAPI.getBlogs({
      limit: 100,
      published: "all"
    }),
    enabled: !!currentUser,
  });

  // Delete Mutation
  const deleteMutation = useMutation({
    mutationFn: (slug) => blogAPI.deleteBlog(slug),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allBlogs"] });
      setToast({ type: "success", message: "Blog deleted successfully!" });
    },
    onError: (err) => {
      console.error("❌ Delete failed:", err);
      setToast({ type: "error", message: err.response?.data?.message || "Failed to delete blog" });
    }
  });

  // Calculate Blogs available to this user (Admins see all, Users see their own)
  const availableBlogs = useMemo(() => {
    if (!blogsData || !currentUser) return [];
    const blogs = Array.isArray(blogsData) ? blogsData : (blogsData.data || []);

    if (isAdmin()) {
      return blogs;
    }

    const userId = currentUser.id || currentUser._id;
    return blogs.filter(blog => {
      const blogUserId = blog.user?._id || blog.user || blog.authorId;
      return blogUserId?.toString() === userId?.toString();
    });
  }, [blogsData, currentUser]);

  // Compute Statistics
  const stats = useMemo(() => {
    const total = availableBlogs.length;
    const published = availableBlogs.filter(blog => blog.published === true || blog.published === "true").length;
    const drafts = total - published;
    const totalViews = availableBlogs.reduce((sum, blog) => sum + (Number(blog.views) || 0), 0);

    return { total, published, drafts, totalViews };
  }, [availableBlogs]);

  // Handle Filtering & Search
  const filteredBlogs = useMemo(() => {
    return availableBlogs.filter(blog => {
      const matchesSearch = 
        blog.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.excerpt?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.author?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = selectedCategory === "All" || blog.category === selectedCategory;
      
      const isPublished = blog.published === true || blog.published === "true";
      const matchesStatus = 
        selectedStatus === "All" ||
        (selectedStatus === "Published" && isPublished) ||
        (selectedStatus === "Draft" && !isPublished);

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [availableBlogs, searchQuery, selectedCategory, selectedStatus]);

  // Actions
  const handleEdit = (blog) => {
    navigate("/blog/submit", { state: { editBlog: blog } });
  };

  const handleDelete = (blog) => {
    if (window.confirm(`Are you sure you want to delete "${blog.title}"?`)) {
      deleteMutation.mutate(blog.slug);
    }
  };

  if (isLoading || !currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-red-950 text-gray-100 flex items-center justify-center">
        <div className="text-center">
          <FaSpinner className="w-12 h-12 text-red-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-400 animate-pulse text-lg font-medium">Securing session and loading analytics...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-red-950 text-gray-100 flex items-center justify-center px-4">
        <div className="bg-black/40 backdrop-blur-xl border border-red-900/40 rounded-2xl p-8 max-w-md w-full text-center shadow-2xl">
          <FaExclamationCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Failed to Load Dashboard</h2>
          <p className="text-gray-400 mb-6">{error?.message || "An unexpected error occurred while fetching blogs."}</p>
          <button 
            onClick={() => queryClient.invalidateQueries({ queryKey: ["allBlogs"] })}
            className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-all"
          >
            Try Again
          </button>
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
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-red-950 text-gray-100 font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          
          {/* Header section with CTA */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12">
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-2">
                Blog Management
              </h1>
              <p className="text-gray-400 text-base md:text-lg">
                Create, edit, and organize community articles for SocialBureau.
              </p>
            </div>
            <Link
              to="/blog/submit"
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-bold rounded-xl shadow-lg shadow-red-950/40 transition-all duration-300 hover:scale-[1.03]"
            >
              <FaPlus /> Write New Post
            </Link>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {/* Stat Item 1 */}
            <div className="bg-black/45 backdrop-blur-xl border border-white/5 rounded-2xl p-6 shadow-xl relative overflow-hidden group transition-all duration-300 hover:border-red-900/30 hover:scale-[1.02]">
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-900/10 rounded-full blur-3xl group-hover:bg-red-800/15 transition-all duration-500" />
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-semibold tracking-wider text-gray-400 uppercase">Total Articles</span>
                <div className="p-3 bg-red-950/40 rounded-xl border border-red-900/30 text-red-500">
                  <FaBookOpen className="w-5 h-5" />
                </div>
              </div>
              <h3 className="text-4xl font-bold text-white mb-1">{stats.total}</h3>
              <p className="text-xs text-gray-500">Across all categories</p>
            </div>

            {/* Stat Item 2 */}
            <div className="bg-black/45 backdrop-blur-xl border border-white/5 rounded-2xl p-6 shadow-xl relative overflow-hidden group transition-all duration-300 hover:border-red-900/30 hover:scale-[1.02]">
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-900/10 rounded-full blur-3xl group-hover:bg-green-800/15 transition-all duration-500" />
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-semibold tracking-wider text-gray-400 uppercase">Live / Published</span>
                <div className="p-3 bg-green-950/40 rounded-xl border border-green-900/30 text-green-400">
                  <FaCheckCircle className="w-5 h-5" />
                </div>
              </div>
              <h3 className="text-4xl font-bold text-white mb-1">{stats.published}</h3>
              <p className="text-xs text-gray-500">Active and read-ready</p>
            </div>

            {/* Stat Item 3 */}
            <div className="bg-black/45 backdrop-blur-xl border border-white/5 rounded-2xl p-6 shadow-xl relative overflow-hidden group transition-all duration-300 hover:border-red-900/30 hover:scale-[1.02]">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-900/10 rounded-full blur-3xl group-hover:bg-amber-800/15 transition-all duration-500" />
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-semibold tracking-wider text-gray-400 uppercase">Saved Drafts</span>
                <div className="p-3 bg-amber-950/40 rounded-xl border border-amber-900/30 text-amber-500">
                  <FaEdit className="w-5 h-5" />
                </div>
              </div>
              <h3 className="text-4xl font-bold text-white mb-1">{stats.drafts}</h3>
              <p className="text-xs text-gray-500">Awaiting your approval</p>
            </div>

            {/* Stat Item 4 */}
            <div className="bg-black/45 backdrop-blur-xl border border-white/5 rounded-2xl p-6 shadow-xl relative overflow-hidden group transition-all duration-300 hover:border-red-900/30 hover:scale-[1.02]">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-900/10 rounded-full blur-3xl group-hover:bg-purple-800/15 transition-all duration-500" />
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-semibold tracking-wider text-gray-400 uppercase">Accumulated Views</span>
                <div className="p-3 bg-purple-950/40 rounded-xl border border-purple-900/30 text-purple-400">
                  <FaChartBar className="w-5 h-5" />
                </div>
              </div>
              <h3 className="text-4xl font-bold text-white mb-1">{stats.totalViews.toLocaleString()}</h3>
              <p className="text-xs text-gray-500">Total reader interactions</p>
            </div>
          </div>

          {/* Interactive Filters Bar */}
          <div className="bg-black/35 backdrop-blur-md border border-white/5 rounded-2xl p-5 mb-8 shadow-md">
            <div className="flex flex-col lg:flex-row gap-4 items-center">
              
              {/* Search Field */}
              <div className="relative flex-1 w-full">
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search articles by title, summary, or author..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-gray-900/40 border border-gray-700/80 rounded-xl focus:outline-none focus:border-red-500 text-white placeholder-gray-500 transition-all text-sm"
                />
              </div>

              {/* Filtering Controls */}
              <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                {/* Category Select */}
                <div className="flex items-center gap-2 bg-gray-900/40 border border-gray-700/80 rounded-xl px-3 py-1.5 w-full sm:w-auto">
                  <FaFilter className="text-gray-500 text-xs" />
                  <span className="text-xs text-gray-400 select-none">Category:</span>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="bg-transparent text-white text-xs font-semibold focus:outline-none cursor-pointer pr-4 py-1.5"
                  >
                    <option value="All" className="bg-gray-900 text-white">All Categories</option>
                    <option value="Marketing" className="bg-gray-900 text-white">Marketing</option>
                    <option value="Creatives" className="bg-gray-900 text-white">Creatives</option>
                    <option value="Case Studies" className="bg-gray-900 text-white">Case Studies</option>
                    <option value="Technology" className="bg-gray-900 text-white">Technology</option>
                    <option value="Advertisement" className="bg-gray-900 text-white">Advertisement</option>
                  </select>
                </div>

                {/* Status Select */}
                <div className="flex items-center gap-2 bg-gray-900/40 border border-gray-700/80 rounded-xl px-3 py-1.5 w-full sm:w-auto">
                  <FaFilter className="text-gray-500 text-xs" />
                  <span className="text-xs text-gray-400 select-none">Status:</span>
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="bg-transparent text-white text-xs font-semibold focus:outline-none cursor-pointer pr-4 py-1.5"
                  >
                    <option value="All" className="bg-gray-900 text-white">All Status</option>
                    <option value="Published" className="bg-gray-900 text-white">Published</option>
                    <option value="Draft" className="bg-gray-900 text-white">Draft</option>
                  </select>
                </div>
              </div>

            </div>
          </div>

          {/* Table Container with Glassmorphism */}
          <div className="bg-black/30 backdrop-blur-xl border border-white/5 rounded-2xl shadow-xl overflow-hidden mb-8">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="border-b border-white/5 bg-white/[0.02]">
                    <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-widest">Article</th>
                    <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-widest">Category</th>
                    <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-widest text-center">Status</th>
                    <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-widest">Created Date</th>
                    <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-widest text-center">Views</th>
                    <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-widest text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredBlogs.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-16 px-6 text-center text-gray-500">
                        <div className="max-w-md mx-auto">
                          <FaBookOpen className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                          <h3 className="text-lg font-bold text-white mb-1">No Articles Found</h3>
                          <p className="text-sm text-gray-400 mb-6">
                            We couldn't find any articles matching your search query or filters.
                          </p>
                          <Link
                            to="/blog/submit"
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-all"
                          >
                            <FaPlus size={12} /> Create First Post
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredBlogs.map((blog) => {
                      const isPublished = blog.published === true || blog.published === "true";
                      const dateObj = blog.createdAt ? new Date(blog.createdAt) : new Date();
                      
                      return (
                        <tr 
                          key={blog._id || blog.slug}
                          className="hover:bg-white/[0.02] transition-colors group"
                        >
                          {/* Title / Thumbnail */}
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-4">
                              <div className="w-16 h-10 rounded-lg overflow-hidden border border-white/10 shrink-0 bg-gray-900/50">
                                {blog.image ? (
                                  <img 
                                    src={blog.image} 
                                    alt={blog.title} 
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                  />
                                ) : (
                                  <div className="w-full h-full bg-gradient-to-br from-red-950 to-black flex items-center justify-center text-[10px] text-red-500 font-bold">
                                    SB
                                  </div>
                                )}
                              </div>
                              <div className="min-w-0">
                                <h4 className="text-sm font-bold text-white truncate max-w-xs md:max-w-md leading-snug group-hover:text-red-500 transition-colors">
                                  {blog.title}
                                </h4>
                                <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                                  <span className="flex items-center gap-1"><FaUser className="w-2.5 h-2.5" /> {blog.author || "SocialBureau Team"}</span>
                                </div>
                              </div>
                            </div>
                          </td>

                          {/* Category */}
                          <td className="py-4 px-6 whitespace-nowrap">
                            <span className="px-2.5 py-1 text-xs font-semibold rounded-full border border-red-900/30 bg-red-950/20 text-red-400">
                              {blog.category || "Marketing"}
                            </span>
                          </td>

                          {/* Status */}
                          <td className="py-4 px-6 text-center whitespace-nowrap">
                            {isPublished ? (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full bg-green-500/10 text-green-400 border border-green-500/20">
                                <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                                Live
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/20">
                                <span className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
                                Draft
                              </span>
                            )}
                          </td>

                          {/* Date */}
                          <td className="py-4 px-6 text-sm text-gray-400 whitespace-nowrap">
                            <div className="flex items-center gap-1.5">
                              <FaCalendarAlt className="w-3.5 h-3.5 text-gray-500" />
                              {dateObj.toLocaleDateString(undefined, {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              })}
                            </div>
                          </td>

                          {/* Views */}
                          <td className="py-4 px-6 text-center text-sm font-semibold text-white whitespace-nowrap">
                            {(Number(blog.views) || 0).toLocaleString()}
                          </td>

                          {/* Action Buttons */}
                          <td className="py-4 px-6 text-right whitespace-nowrap">
                            <div className="flex items-center justify-end gap-2">
                              {isPublished && (
                                <Link
                                  to={`/blogs/${blog.slug}`}
                                  target="_blank"
                                  title="View Live Article"
                                  className="p-2 bg-gray-900 hover:bg-gray-800 text-gray-400 hover:text-white border border-gray-700/50 rounded-lg transition-all"
                                >
                                  <FaEye size={14} />
                                </Link>
                              )}
                              <button
                                onClick={() => handleEdit(blog)}
                                title="Edit Article"
                                className="p-2 bg-gray-900 hover:bg-gray-800 text-gray-400 hover:text-red-500 border border-gray-700/50 rounded-lg transition-all"
                              >
                                <FaEdit size={14} />
                              </button>
                              <button
                                onClick={() => handleDelete(blog)}
                                title="Delete Article"
                                className="p-2 bg-gray-900 hover:bg-red-950/40 text-gray-400 hover:text-red-500 border border-gray-700/50 hover:border-red-900/40 rounded-lg transition-all"
                              >
                                <FaTrash size={14} />
                              </button>
                            </div>
                          </td>

                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
      <Footer />
    </>
  );
}
