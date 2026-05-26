import React, { useEffect, useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { jobService } from "@/services/jobService";
import { isAdmin, canManageJobs } from "@/utils/authUtils";
import { Plus, Pencil, Trash2, EyeOff, Eye, Loader2 } from "lucide-react";
import { toast } from "react-toastify";

export default function CareersPost() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const data = await jobService.getJobs();
      // Ensure data is an array
      setJobs(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching careers:", error.message);
      toast.error("Failed to load jobs from database");
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleDelete = async (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    if (!window.confirm("Are you sure you want to delete this job?")) return;

    try {
      setProcessingId(id);
      await jobService.deleteJob(id);
      toast.success("Job deleted successfully");
      // Filter out locally for instant feedback
      setJobs(prev => prev.filter(j => j._id !== id));
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete job");
    } finally {
      setProcessingId(null);
    }
  };

  const handleToggleStatus = async (e, id, currentStatus) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Optimistic Update
    const previousJobs = [...jobs];
    setJobs(prev => prev.map(j => j._id === id ? { ...j, isActive: !j.isActive } : j));
    setProcessingId(id);

    try {
      await jobService.toggleJobStatus(id);
      toast.success(`Job ${currentStatus ? 'hidden' : 'visible'} successfully`);
    } catch (err) {
      // Revert on error
      setJobs(previousJobs);
      toast.error(err.response?.data?.message || `Failed to update status`);
    } finally {
      setProcessingId(null);
    }
  };

  const handleEdit = (e, job) => {
    e.preventDefault();
    e.stopPropagation();
    // Redirect to create page with job data in state
    navigate("/jobs/create", { state: { editJob: job } });
  };

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) =>
      job && job.title && job.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, jobs]);

  return (
    <section className="py-24 bg-[#fafafa] text-[#1a1a1a]">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header & Search - More compact */}
        <div className="flex flex-col md:flex-row justify-between items-baseline gap-8 mb-12 border-b border-gray-100 pb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between w-full gap-6">
            <div>
              <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-5xl font-medium mb-2">
                Open Roles
              </h2>
              <p className="text-gray-400 text-xs uppercase tracking-widest">Select a path to architect the future</p>
            </div>

            {canManageJobs() && (
              <Link
                to="/jobs/create"
                className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all shadow-lg shadow-red-500/20 active:scale-95"
              >
                <Plus size={16} />
                Post a New Job
              </Link>
            )}
          </div>
          <input
            type="text"
            placeholder="Search roles..."
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent border-b border-gray-300 py-2 outline-none focus:border-red-600 w-full md:w-80 text-xs uppercase tracking-[0.2em] placeholder:text-gray-300 transition-colors"
          />
        </div>

        {/* Jobs Grid / Loading / Empty State */}
        {loading ? (
          <div className="py-32 flex flex-col items-center justify-center gap-6">
            <div className="relative">
              <Loader2 size={48} className="text-red-600 animate-spin" />
              <div className="absolute inset-0 blur-xl bg-red-500/20 rounded-full animate-pulse" />
            </div>
            <div className="text-center">
              <p className="text-gray-900 font-serif italic text-xl mb-1">Architecting the feed...</p>
              <p className="text-gray-400 text-[10px] uppercase tracking-[0.3em]">Synchronizing with global database</p>
            </div>
          </div>
        ) : filteredJobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredJobs.map((job, index) => (
              <motion.div
                key={job.slug || job._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.05,
                  ease: [0.22, 1, 0.36, 1]
                }}
                className={!job.isActive ? "opacity-60 grayscale-[0.5]" : ""}
              >
                <Link
                  to={`/careers/${job.slug}`}
                  className={`group relative block bg-white h-full p-8 border transition-all duration-700 overflow-hidden ${!job.isActive ? "border-amber-200" : "border-gray-100 hover:border-red-500"
                    }`}
                >
                  {/* Background Accent on Hover */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-red-50 opacity-[0.03] -mr-12 -mt-12 rounded-full group-hover:scale-[10] transition-transform duration-1000" />

                  <div className="relative z-10 flex flex-col h-full justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-6">
                        <div className="flex flex-col gap-2">
                          <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-red-600 px-3 py-1 border border-red-50 bg-red-50/30 w-fit">
                            {job.department}
                          </span>
                          {!job.isActive && (
                            <span className="text-[8px] font-black uppercase tracking-[0.2em] bg-amber-100 text-amber-700 px-2 py-0.5 rounded">
                              Hidden
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-3">
                          {canManageJobs() && (
                            <div className="flex items-center gap-2 mr-4 bg-white/50 backdrop-blur-sm p-1 rounded-lg">
                              <button
                                onClick={(e) => handleEdit(e, job)}
                                className="p-1.5 hover:text-blue-600 transition-colors"
                                title="Edit Job"
                                disabled={processingId === job._id}
                              >
                                <Pencil size={14} />
                              </button>
                              <button
                                onClick={(e) => handleToggleStatus(e, job._id, job.isActive)}
                                className={`p-1.5 transition-colors ${!job.isActive ? "text-green-600 hover:text-green-700" : "text-amber-600 hover:text-amber-700"} ${processingId === job._id ? "animate-pulse opacity-50" : ""}`}
                                title={job.isActive ? "Hide Job" : "Unhide Job"}
                                disabled={processingId === job._id}
                              >
                                {processingId === job._id ? <Loader2 size={14} className="animate-spin" /> : (job.isActive ? <EyeOff size={14} /> : <Eye size={14} />)}
                              </button>
                              <button
                                onClick={(e) => handleDelete(e, job._id)}
                                className={`p-1.5 hover:text-red-600 transition-colors ${processingId === job._id ? "animate-pulse opacity-50" : ""}`}
                                title="Delete Job"
                                disabled={processingId === job._id}
                              >
                                {processingId === job._id ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                              </button>
                            </div>
                          )}
                          <span className="text-gray-200 group-hover:text-red-600 transition-colors duration-500">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                              <path d="M7 17L17 7M17 7H7M17 7V17" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </span>
                        </div>
                      </div>

                      <h3 className="text-2xl font-medium font-serif leading-tight group-hover:text-red-700 transition-colors">
                        {job.title}
                      </h3>
                    </div>

                    <div className="mt-12 flex items-center justify-between">
                      <span className="text-[10px] uppercase tracking-widest text-gray-400">{job.location || 'Kochi'}</span>
                      <span className="text-[9px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-500 text-red-600">
                        Explore Role
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="py-24 text-center border border-dashed border-gray-200 rounded-3xl bg-white/50">
            <div className="max-w-xs mx-auto">
              <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <EyeOff size={20} className="text-gray-300" />
              </div>
              <p className="text-gray-500 font-serif italic text-lg mb-2">
                {search ? "No roles match your search." : "No open roles at the moment."}
              </p>
              <p className="text-[10px] uppercase tracking-widest text-gray-400">
                {search ? "Try adjusting your keywords" : "Check back later for new opportunities"}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

