import React, { useEffect, useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { jobService } from "@/services/jobService";
import { isAdmin, canManageJobs } from "@/utils/authUtils";
import { Plus, Pencil, Trash2, EyeOff, Eye } from "lucide-react";
import { toast } from "react-toastify";

export default function CareersPost() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  // Safety fallback roles so the page is never empty
  const fallbackJobs = [
    { _id: 'f1', title: 'SEO Expert', department: 'Growth', location: 'Remote', employment: 'Full-time', slug: 'seo-expert', isActive: true, company: 'SocialBureau' },
    { _id: 'f2', title: 'UI/UX Designer', department: 'Design', location: 'Kochi', employment: 'Full-time', slug: 'ui-ux-designer', isActive: true, company: 'SocialBureau' },
    { _id: 'f3', title: 'Video Editor', department: 'Content', location: 'Remote', employment: 'Contract', slug: 'video-editor', isActive: true, company: 'SocialBureau' },
    { _id: 'f4', title: 'Backend Developer', department: 'Engineering', location: 'Kochi', employment: 'Full-time', slug: 'backend-developer', isActive: true, company: 'SocialBureau' },
  ];

  const fetchJobs = () => {
    jobService.getJobs()
      .then((data) => {
        if (data && data.length > 0) {
          setJobs(data);
        } else {
          setJobs(fallbackJobs);
        }
      })
      .catch((error) => {
        console.error("Error fetching careers:", error.message);
        setJobs(fallbackJobs);
      });
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleDelete = async (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    if (!window.confirm("Are you sure you want to delete this job?")) return;

    try {
      await jobService.deleteJob(id);
      toast.success("Job deleted successfully");
      fetchJobs();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete job");
    }
  };

  const handleToggleStatus = async (e, id, currentStatus) => {
    e.preventDefault();
    e.stopPropagation();
    const action = currentStatus ? "Hide" : "Unhide";
    if (!window.confirm(`${action} this job?`)) return;

    try {
      await jobService.toggleJobStatus(id);
      toast.success(`Job ${currentStatus ? 'hidden' : 'visible'} successfully`);
      fetchJobs();
    } catch (err) {
      toast.error(err.response?.data?.message || `Failed to ${action.toLowerCase()} job`);
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
      job.title.toLowerCase().includes(search.toLowerCase())
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

        {/* Grid Layout: Displays more cards in a single viewport */}
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
                            >
                              <Pencil size={14} />
                            </button>
                            <button
                              onClick={(e) => handleToggleStatus(e, job._id, job.isActive)}
                              className={`p-1.5 transition-colors ${!job.isActive ? "text-green-600 hover:text-green-700" : "text-amber-600 hover:text-amber-700"}`}
                              title={job.isActive ? "Hide Job" : "Unhide Job"}
                            >
                              {job.isActive ? <EyeOff size={14} /> : <Eye size={14} />}
                            </button>
                            <button
                              onClick={(e) => handleDelete(e, job._id)}
                              className="p-1.5 hover:text-red-600 transition-colors"
                              title="Delete Job"
                            >
                              <Trash2 size={14} />
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

        {/* Empty State */}
        {filteredJobs.length === 0 && (
          <div className="py-20 text-center border border-dashed border-gray-200">
            <p className="text-gray-400 font-serif italic text-xl">No roles found matching your search.</p>
          </div>
        )}
      </div>
    </section>
  );
}

