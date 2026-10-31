import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, ArrowUpRight, BriefcaseBusiness, Eye, EyeOff, Loader2, MapPin, Pencil, Plus, Search, Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import { jobService } from "@/services/jobService";
import { canManageJobs } from "@/utils/authUtils";

export default function CareersPost() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null);
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All Roles");
  const navigate = useNavigate();

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const data = await jobService.getJobs();
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

  const departments = useMemo(
    () => [...new Set(jobs.filter(Boolean).map((job) => job.department).filter(Boolean))],
    [jobs],
  );

  const filteredJobs = useMemo(() => {
    const query = search.trim().toLowerCase();
    return jobs.filter((job) => {
      if (!job || !job.title) return false;
      const matchesDepartment = department === "All Roles" || job.department === department;
      const searchableText = `${job.title || ""} ${job.department || ""} ${job.location || ""}`.toLowerCase();
      return matchesDepartment && (!query || searchableText.includes(query));
    });
  }, [department, jobs, search]);

  const handleDelete = async (event, id) => {
    event.preventDefault();
    event.stopPropagation();
    if (!window.confirm("Are you sure you want to delete this job?")) return;

    try {
      setProcessingId(id);
      await jobService.deleteJob(id);
      toast.success("Job deleted successfully");
      setJobs((previousJobs) => previousJobs.filter((job) => job._id !== id));
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete job");
    } finally {
      setProcessingId(null);
    }
  };

  const handleToggleStatus = async (event, id, currentStatus) => {
    event.preventDefault();
    event.stopPropagation();
    const previousJobs = [...jobs];
    setJobs((currentJobs) => currentJobs.map((job) => job._id === id ? { ...job, isActive: !job.isActive } : job));
    setProcessingId(id);

    try {
      await jobService.toggleJobStatus(id);
      toast.success(`Job ${currentStatus ? "hidden" : "visible"} successfully`);
    } catch (error) {
      setJobs(previousJobs);
      toast.error(error.response?.data?.message || "Failed to update status");
    } finally {
      setProcessingId(null);
    }
  };

  const handleEdit = (event, job) => {
    event.preventDefault();
    event.stopPropagation();
    navigate("/jobs/create", { state: { editJob: job } });
  };

  return (
    <section className="careers-openings" id="opportunities">
      <div className="careers-container">
        <div className="careers-openings-heading">
          <div>
            <p className="careers-eyebrow">Open Roles</p>
            <h2>Current Opportunities</h2>
            <p className="careers-openings-lead">Be a part of a fast-growing team. Find the role that fits you.</p>
          </div>
          <label className="careers-search">
            <span className="sr-only">Search jobs, skills, or departments</span>
            <input
              type="search"
              placeholder="Search roles, skills or department..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
            <Search size={17} aria-hidden="true" />
          </label>
        </div>

        <div className="careers-role-filters" aria-label="Filter roles by department">
          {["All Roles", ...departments].map((item) => (
            <button
              className={department === item ? "active" : ""}
              key={item}
              onClick={() => setDepartment(item)}
              type="button"
            >
              {item}
            </button>
          ))}
        </div>

        {canManageJobs() && (
          <Link className="careers-admin-add" to="/jobs/create">
            <Plus size={15} /> Post a New Job
          </Link>
        )}

        {loading ? (
          <div className="careers-jobs-state" role="status">
            <Loader2 className="careers-loading-icon" size={30} />
            <span>Loading current opportunities…</span>
          </div>
        ) : filteredJobs.length ? (
          <div className="careers-job-grid">
            {filteredJobs.map((job) => (
              <article className={`careers-job-card${job.isActive ? "" : " is-hidden"}`} key={job.slug || job._id}>
                <Link className="careers-job-link" to={`/careers/${job.slug}`}>
                  <span className="careers-job-icon"><BriefcaseBusiness size={19} /></span>
                  <ArrowUpRight className="careers-job-arrow" size={17} />
                  <h3>{job.title}</h3>
                  <span className="careers-job-department">{job.department || "Opportunities"}</span>
                  <span className="careers-job-meta"><MapPin size={14} />{job.location || "Kochi / Remote"}</span>
                  <span className="careers-job-apply">Explore Role <ArrowRight size={14} /></span>
                </Link>

                {!job.isActive && <span className="careers-hidden-badge">Hidden</span>}
                {canManageJobs() && (
                  <div className="careers-job-admin">
                    <button aria-label={`Edit ${job.title}`} disabled={processingId === job._id} onClick={(event) => handleEdit(event, job)} type="button"><Pencil size={14} /></button>
                    <button aria-label={`${job.isActive ? "Hide" : "Show"} ${job.title}`} disabled={processingId === job._id} onClick={(event) => handleToggleStatus(event, job._id, job.isActive)} type="button">
                      {processingId === job._id ? <Loader2 className="careers-loading-icon" size={14} /> : job.isActive ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                    <button aria-label={`Delete ${job.title}`} disabled={processingId === job._id} onClick={(event) => handleDelete(event, job._id)} type="button"><Trash2 size={14} /></button>
                  </div>
                )}
              </article>
            ))}
          </div>
        ) : (
          <div className="careers-jobs-state">
            <BriefcaseBusiness size={26} />
            <strong>{search || department !== "All Roles" ? "No roles match your filters." : "No open roles at the moment."}</strong>
            <span>{search || department !== "All Roles" ? "Try another search or department." : "Check back soon for new opportunities."}</span>
          </div>
        )}
      </div>
    </section>
  );
}
