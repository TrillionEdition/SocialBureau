import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "@/utils/urls";
import { FileText, Mail, Phone, Calendar, Search, Filter, Trash2, User, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";

const AllApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/hr-applications/all-applications`, {
        withCredentials: true,
      });
      setApplications(res.data);
    } catch (err) {
      console.error("Error fetching applications:", err);
      toast.error("Failed to load applications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this application? This will also remove the resume file.")) return;
    
    try {
      setProcessingId(id);
      await axios.delete(`${BASE_URL}/hr-applications/${id}`, { withCredentials: true });
      toast.success("Application deleted");
      setApplications(prev => prev.filter(app => app._id !== id));
    } catch (err) {
      toast.error("Failed to delete application");
    } finally {
      setProcessingId(null);
    }
  };

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      setProcessingId(id);
      await axios.put(`${BASE_URL}/hr-applications/update-status/${id}`, { status: newStatus }, { withCredentials: true });
      toast.success(`Status updated to ${newStatus}`);
      setApplications(prev => prev.map(app => app._id === id ? { ...app, status: newStatus } : app));
    } catch (err) {
      toast.error("Failed to update status");
    } finally {
      setProcessingId(null);
    }
  };

  const filteredApps = applications.filter((app) => {
    const matchesSearch = 
      app.candidateName?.toLowerCase().includes(search.toLowerCase()) ||
      app.candidateEmail?.toLowerCase().includes(search.toLowerCase()) ||
      app.jobId?.title?.toLowerCase().includes(search.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || app.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Pagination Logic
  const totalPages = Math.ceil(filteredApps.length / itemsPerPage);
  const paginatedApps = filteredApps.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const getStatusColor = (status) => {
    switch (status) {
      case "pending": return "bg-amber-100 text-amber-700 border-amber-200";
      case "reviewed": return "bg-blue-100 text-blue-700 border-blue-200";
      case "shortlisted": return "bg-green-100 text-green-700 border-green-200";
      case "rejected": return "bg-red-100 text-red-700 border-red-200";
      default: return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] text-[#1a1a1a] pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <header className="mb-12 flex flex-col md:flex-row justify-between items-baseline gap-4">
          <div>
            <h1 className="text-5xl font-black tracking-tight mb-4">Talent Pool.</h1>
            <p className="text-gray-400 text-xl font-medium">Review and manage candidate applications</p>
          </div>
          <div className="bg-white px-6 py-3 rounded-2xl border border-gray-100 shadow-sm text-sm font-bold uppercase tracking-widest text-red-600">
            {filteredApps.length} Total Candidates
          </div>
        </header>

        {/* Filters & Search */}
        <div className="bg-white p-6 rounded-[32px] shadow-sm border border-gray-100 mb-8 flex flex-col md:flex-row gap-6 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by name, email or role..." 
              value={search}
              onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
              className="w-full bg-gray-50 border border-gray-100 rounded-2xl pl-12 pr-6 py-4 text-sm outline-none focus:border-red-500/30 transition-all"
            />
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto">
            <Filter className="text-gray-400" size={18} />
            <select 
              value={statusFilter}
              onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
              className="bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-sm font-bold uppercase tracking-widest outline-none focus:border-red-500/30 transition-all cursor-pointer"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="reviewed">Reviewed</option>
              <option value="shortlisted">Shortlisted</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>

        {/* Applications List */}
        {loading ? (
          <div className="py-32 flex flex-col items-center justify-center gap-6">
            <div className="w-12 h-12 border-4 border-red-600/20 border-t-red-600 rounded-full animate-spin" />
            <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Scanning database...</p>
          </div>
        ) : paginatedApps.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            <AnimatePresence mode="wait">
              {paginatedApps.map((app, index) => (
                <motion.div
                  key={app._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className={`bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-xl transition-all group ${processingId === app._id ? 'opacity-50 pointer-events-none' : ''}`}
                >
                  <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
                    
                    {/* Candidate Info */}
                    <div className="flex items-start gap-6">
                      <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center shrink-0">
                        <User className="text-red-600 w-8 h-8" />
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-3 mb-1">
                          <h3 className="text-2xl font-bold tracking-tight">{app.candidateName}</h3>
                          <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${getStatusColor(app.status)}`}>
                            {app.status}
                          </span>
                        </div>
                        <p className="text-red-600 font-black text-xs uppercase tracking-widest mb-4">
                          Applied for: {app.jobId?.title || "Unknown Role"}
                        </p>
                        
                        <div className="flex flex-wrap gap-6 text-sm font-medium text-gray-500">
                          <span className="flex items-center gap-2">
                            <Mail size={16} className="text-gray-300" /> {app.candidateEmail}
                          </span>
                          <span className="flex items-center gap-2">
                            <Phone size={16} className="text-gray-300" /> {app.candidatePhone}
                          </span>
                          <span className="flex items-center gap-2">
                            <Calendar size={16} className="text-gray-300" /> 
                            {new Date(app.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto border-t lg:border-t-0 pt-6 lg:pt-0">
                      <a 
                        href={app.resumeUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex-1 lg:flex-none inline-flex items-center justify-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-black transition-all active:scale-95"
                      >
                        <FileText size={16} />
                        Resume
                      </a>
                      
                      <div className="flex-1 lg:flex-none relative">
                        <select 
                          value={app.status}
                          onChange={(e) => handleUpdateStatus(app._id, e.target.value)}
                          className="w-full lg:w-auto bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-[10px] font-black uppercase tracking-widest outline-none focus:border-red-500/30 transition-all cursor-pointer appearance-none"
                        >
                          <option value="pending">Set Pending</option>
                          <option value="reviewed">Mark Reviewed</option>
                          <option value="shortlisted">Shortlist</option>
                          <option value="rejected">Reject</option>
                        </select>
                      </div>

                      <button 
                        onClick={() => handleDelete(app._id)}
                        className="flex-1 lg:flex-none p-4 rounded-2xl bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-all active:scale-95"
                        title="Delete Application"
                      >
                        {processingId === app._id ? <Loader2 className="animate-spin" size={18} /> : <Trash2 size={18} />}
                      </button>
                    </div>
                  </div>

                  {app.coverLetter && (
                    <div className="mt-8 pt-8 border-t border-gray-50">
                      <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Cover Letter</p>
                      <p className="text-gray-600 text-sm leading-relaxed italic">
                        "{app.coverLetter}"
                      </p>
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-12 flex items-center justify-center gap-4">
                <button 
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="p-4 rounded-2xl bg-white border border-gray-100 shadow-sm disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50 transition-all"
                >
                  <ChevronLeft size={20} />
                </button>
                
                <div className="flex gap-2">
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`w-12 h-12 rounded-2xl font-black text-xs transition-all ${
                        currentPage === i + 1 
                          ? "bg-red-600 text-white shadow-lg shadow-red-600/20" 
                          : "bg-white border border-gray-100 text-gray-400 hover:border-red-500/30"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>

                <button 
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="p-4 rounded-2xl bg-white border border-gray-100 shadow-sm disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50 transition-all"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="py-32 text-center bg-white rounded-[32px] border border-dashed border-gray-200">
            <div className="max-w-xs mx-auto">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="text-gray-200 w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold mb-2">No applications found</h3>
              <p className="text-gray-400 text-sm">
                Try adjusting your search or filters to find what you're looking for.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllApplications;
