import React, { useState, useMemo, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { blogAPI } from "@/services/blogServices";
import { getUserData, isAdmin } from "@/utils/authUtils";
import { useNavigate, Link } from "react-router-dom";
import { 
  FaPlus, FaEdit, FaTrash, FaEye, FaChartBar, FaRegFileAlt, 
  FaRegHeart, FaRegComment, FaSearch, FaFilter, FaArrowLeft,
  FaCalendarAlt, FaUserEdit
} from "react-icons/fa";
import Footer from "@/components/Footer";
import Toast from "@/components/Toast";

export default function BlogDashboard() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const currentUser = getUserData();
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [toast, setToast] = useState(null);

  // Categories same as in SubmitBlog
  const categories = ["All", "Marketing", "Creatives", "Case Studies", "Technology", "Advertisement", "AI Marketing", "Performance Marketing", "Content Marketing", "Data Analysis"];

  // Fetch blogs
  const { data: blogsData, isLoading } = useQuery({
    queryKey: ["allBlogs", currentUser?.id],
    queryFn: () => blogAPI.getBlogs({ limit: 100, published: 'all' }),
    enabled: !!currentUser,
  });

  const myBlogs = useMemo(() => {
    if (!blogsData || !currentUser) return [];
    const blogs = Array.isArray(blogsData) ? blogsData : (blogsData.data || []);
    
    const userId = currentUser.id || currentUser._id;
    const filtered = isAdmin() ? blogs : blogs.filter(blog => {
      const blogUserId = blog.user?._id || blog.user;
      return blogUserId?.toString() === userId?.toString();
    });

    return filtered.filter(blog => {
      const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter === "All" || blog.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [blogsData, currentUser, searchTerm, categoryFilter]);

  // Stats calculation
  const stats = useMemo(() => {
    if (!myBlogs.length) return { total: 0, views: 0, likes: 0, comments: 0 };
    return myBlogs.reduce((acc, blog) => ({
      total: acc.total + 1,
      views: acc.views + (blog.meta?.views || 0),
      likes: acc.likes + (blog.meta?.likes || 0),
      comments: acc.comments + (blog.comments?.length || 0),
    }), { total: 0, views: 0, likes: 0, comments: 0 });
  }, [myBlogs]);

  // Delete Mutation
  const deleteMutation = useMutation({
    mutationFn: (slug) => blogAPI.deleteBlog(slug),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allBlogs"] });
      setToast({ type: "success", message: "Blog deleted successfully" });
    },
    onError: (error) => {
      setToast({ type: "error", message: error.response?.data?.message || 'Failed to delete blog' });
    }
  });

  const handleDelete = (slug) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      deleteMutation.mutate(slug);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-red-600/30 border-t-red-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-red-500/30">
      {toast && <Toast type={toast.type} message={toast.message} onClose={() => setToast(null)} />}
      
      {/* Hero Section */}
      <div className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.15)_0,transparent_70%)] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
            <div>
              <Link to="/blog" className="inline-flex items-center gap-2 text-gray-400 hover:text-red-500 transition-colors mb-4 group">
                <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Back to Blogs
              </Link>
              <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4">
                BLOG <span className="text-red-600">DASHBOARD</span>
              </h1>
              <p className="text-gray-400 text-lg max-w-2xl">
                Manage your articles, track performance metrics, and engage with your readers from one central hub.
              </p>
            </div>
            
            <Link 
              to="/blog/submit"
              className="flex items-center gap-2 px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-2xl transition-all shadow-xl shadow-red-900/20 hover:scale-[1.02] active:scale-[0.98]"
            >
              <FaPlus /> CREATE NEW POST
            </Link>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-16">
            {[
              { label: "Total Posts", value: stats.total, icon: FaRegFileAlt, color: "blue" },
              { label: "Total Views", value: stats.views, icon: FaEye, color: "red" },
              { label: "Total Likes", value: stats.likes, icon: FaRegHeart, color: "pink" },
              { label: "Comments", value: stats.comments, icon: FaRegComment, color: "green" },
            ].map((stat, i) => (
              <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-sm hover:border-red-500/50 transition-all group">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-2xl bg-${stat.color}-500/10 text-${stat.color}-500 group-hover:scale-110 transition-transform`}>
                    <stat.icon size={24} />
                  </div>
                </div>
                <div className="text-3xl font-black mb-1">{stat.value}</div>
                <div className="text-gray-500 text-sm font-medium uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Main Content Area */}
          <div className="bg-white/5 border border-white/10 rounded-[2.5rem] overflow-hidden backdrop-blur-md">
            {/* Toolbar */}
            <div className="p-6 md:p-8 border-b border-white/10 flex flex-col lg:flex-row gap-6 justify-between items-center bg-white/[0.02]">
              <div className="relative w-full lg:max-w-md">
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input 
                  type="text" 
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-black/40 border border-white/10 rounded-2xl focus:outline-none focus:border-red-600 transition-all text-white placeholder-gray-600"
                />
              </div>
              
              <div className="flex items-center gap-4 w-full lg:w-auto">
                <div className="flex items-center gap-2 text-gray-400 whitespace-nowrap hidden sm:flex">
                  <FaFilter /> <span className="text-sm font-bold uppercase tracking-widest">Category:</span>
                </div>
                <select 
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="flex-1 lg:flex-none px-6 py-4 bg-black/40 border border-white/10 rounded-2xl focus:outline-none focus:border-red-600 transition-all text-white appearance-none cursor-pointer"
                >
                  {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>
            </div>

            {/* Blogs List */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-gray-500 text-xs font-bold uppercase tracking-[0.2em] border-b border-white/5">
                    <th className="px-8 py-6">Article</th>
                    <th className="px-8 py-6">Status</th>
                    <th className="px-8 py-6">Category</th>
                    <th className="px-8 py-6">Performance</th>
                    <th className="px-8 py-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {myBlogs.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="px-8 py-20 text-center text-gray-500 italic">
                        No articles found matching your criteria.
                      </td>
                    </tr>
                  ) : (
                    myBlogs.map((blog) => (
                      <tr key={blog._id} className="hover:bg-white/[0.02] transition-colors group">
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-4">
                            <div className="w-16 h-12 rounded-xl overflow-hidden bg-gray-900 border border-white/5 flex-shrink-0">
                              <img src={blog.image} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                            </div>
                            <div>
                              <div className="text-white font-bold mb-1 line-clamp-1 group-hover:text-red-500 transition-colors">{blog.title}</div>
                              <div className="text-xs text-gray-500 flex items-center gap-2">
                                <FaCalendarAlt size={10} /> {new Date(blog.createdAt).toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${blog.published ? 'bg-green-500/10 text-green-500' : 'bg-amber-500/10 text-amber-500'}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${blog.published ? 'bg-green-500 animate-pulse' : 'bg-amber-500'}`}></span>
                            {blog.published ? 'Published' : 'Draft'}
                          </span>
                        </td>
                        <td className="px-8 py-6">
                          <span className="text-sm text-gray-400 bg-white/5 px-3 py-1 rounded-lg border border-white/5">{blog.category}</span>
                        </td>
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-6">
                            <div className="flex flex-col">
                              <span className="text-white font-bold">{blog.meta?.views || 0}</span>
                              <span className="text-[10px] text-gray-600 uppercase tracking-tighter">Views</span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-white font-bold">{blog.meta?.likes || 0}</span>
                              <span className="text-[10px] text-gray-600 uppercase tracking-tighter">Likes</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-6 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Link 
                              to={`/blogs/${blog.slug}`}
                              className="p-3 bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white rounded-xl transition-all"
                              title="View Article"
                            >
                              <FaEye size={16} />
                            </Link>
                            <button 
                              onClick={() => navigate('/blog/submit', { state: { editBlog: blog } })}
                              className="p-3 bg-red-600/10 text-red-500 hover:bg-red-600 hover:text-white rounded-xl transition-all"
                              title="Edit Article"
                            >
                              <FaEdit size={16} />
                            </button>
                            <button 
                              onClick={() => handleDelete(blog.slug)}
                              className="p-3 bg-white/5 text-gray-500 hover:bg-red-600/20 hover:text-red-500 rounded-xl transition-all"
                              title="Delete Article"
                            >
                              <FaTrash size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            
            {/* Footer Pagination/Info */}
            <div className="p-6 border-t border-white/5 bg-white/[0.01] text-center">
              <p className="text-xs text-gray-600 uppercase tracking-widest font-bold">
                Showing {myBlogs.length} of {blogsData?.data?.length || 0} articles
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
