import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import localJobs from "../../data/jobs";
import { getUserData } from "@/utils/authUtils";
import { getUserApplicationsAPI, getUserSavedJobsAPI } from "@/services/userServices";
import { Briefcase, Bookmark, CheckCircle, ExternalLink, Loader, Send, BookmarkCheck, Info, Zap, Search, MapPin, Clock } from "lucide-react";
import { BASE_URL } from "@/utils/urls";
import HrNavbar from "./HrNavbar";
import ApplyModal from "./ApplyModal";
import * as hrforumService from "@/services/hrforumService";

export default function HRForum() {
    const [jobs, setJobs] = useState([]);
    const [selectedJob, setSelectedJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [locationTerm, setLocationTerm] = useState("");

    // Auth & Activity State
    const [currentUser, setCurrentUser] = useState(null);
    const [userApplications, setUserApplications] = useState([]);
    const [savedJobIds, setSavedJobIds] = useState([]);
    const [showLoginPrompt, setShowLoginPrompt] = useState(false);
    const [showApplyModal, setShowApplyModal] = useState(false);
    const [activeApplicationId, setActiveApplicationId] = useState(null);
    const [isApplying, setIsApplying] = useState(false);

    // Refs for smooth scrolling
    const jobListRef = useRef(null);
    const jobDetailsRef = useRef(null);
    const selectedJobRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            const user = getUserData();
            if (user) {
                setCurrentUser(user);
                try {
                    const userId = user._id || user.id;
                    const [apps, saved] = await Promise.all([
                        getUserApplicationsAPI(userId),
                        getUserSavedJobsAPI(userId)
                    ]);
                    setUserApplications(apps || []);
                    setSavedJobIds(saved ? saved.map(j => j._id || j.id) : []);
                } catch (err) {
                    console.error("Error fetching user activity:", err);
                }
            }
        };

        const fetchJobsList = async () => {
            setLoading(true);
            try {
                const [hrRes, extRes] = await Promise.all([
                    axios.get(`${BASE_URL}/hr-jobs`),
                    axios.get(`${BASE_URL}/hr-external-jobs`)
                ]);
                
                const apiJobs = hrRes.data || [];
                const extJobs = extRes.data || [];

                // Map backend fields to the format used in Home.jsx
                const mappedApiJobs = apiJobs.map(j => ({
                    id: j._id,
                    title: j.jobTitle,
                    company: j.companyName,
                    location: j.location,
                    description: j.description,
                    salary: j.payRange ? `₹${j.payRange.min.toLocaleString()} - ₹${j.payRange.max.toLocaleString()} / ${j.payRange.period}` : "Competitive",
                    posted: new Date(j.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
                    department: j.jobTypes?.length > 0 ? j.jobTypes[0] : "General",
                    about: j.about || `About ${j.companyName}`,
                    link: j.applicationLink || j.companyWebsite || "#",
                    applicationLink: j.applicationLink,
                    status: j.status,
                    isBackend: true,
                    isExternal: false,
                    badge: "Direct"
                }));

                const mappedExtJobs = extJobs.map(j => ({
                    id: j._id,
                    title: j.jobTitle,
                    company: j.companyName,
                    location: j.location,
                    description: j.description,
                    salary: j.salary || "Competitive",
                    posted: new Date(j.postedAt || j.createdAt || Date.now()).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
                    department: j.category || "External",
                    about: j.companyDescription || `External opportunity at ${j.companyName}`,
                    link: j.applyUrl || "#",
                    applicationLink: j.applyUrl,
                    status: "active",
                    isBackend: true,
                    isExternal: true,
                    badge: "External"
                }));

                const mappedLocalJobs = localJobs.map(j => ({
                    ...j,
                    id: j.slug,
                    isBackend: false,
                    isExternal: false
                }));

                // Combine: Direct jobs, External jobs, then Static jobs
                const combinedJobs = [...mappedApiJobs, ...mappedExtJobs, ...mappedLocalJobs];
                setJobs(combinedJobs);

                if (combinedJobs.length > 0) {
                    setSelectedJob(combinedJobs[0]);
                }
            } catch (err) {
                console.error("Error fetching jobs from HR API:", err);
                const mappedLocalJobs = localJobs.map(j => ({
                    ...j,
                    id: j.slug,
                    isBackend: false
                }));
                setJobs(mappedLocalJobs);
                if (mappedLocalJobs.length > 0) setSelectedJob(mappedLocalJobs[0]);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
        fetchJobsList();
    }, []);

    // Smooth scroll observers
    useEffect(() => {
        if (selectedJobRef.current && jobListRef.current) {
            selectedJobRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }, [selectedJob]);

    useEffect(() => {
        if (jobDetailsRef.current && selectedJob) {
            jobDetailsRef.current.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [selectedJob]);

    const handleJobSelect = (job) => {
        setSelectedJob(job);
        if (window.innerWidth < 1024 && jobDetailsRef.current) {
            setTimeout(() => {
                jobDetailsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        }
    };

    const handleApply = async (formData) => {
        if (!currentUser) {
            setShowLoginPrompt(true);
            return;
        }
        try {
            setIsApplying(true);
            const userId = currentUser._id || currentUser.id;
            const res = await hrforumService.submitApplication(selectedJob.id, userId, formData);
            
            // Set active application ID so the modal can show chat
            if (res.data?.application?._id) {
                setActiveApplicationId(res.data.application._id);
            } else {
                alert("Application submitted successfully! ✓");
                setShowApplyModal(false);
            }

            // Refresh applications
            const apps = await getUserApplicationsAPI(userId);
            setUserApplications(apps || []);
        } catch (error) {
            alert(error.response?.data?.message || "Application failed.");
        } finally {
            setIsApplying(false);
        }
    };

    const getLinkedInUrl = (job) => {
        const title = encodeURIComponent(job?.title || "");
        const location = encodeURIComponent(job?.location || "");
        return `https://www.linkedin.com/jobs/search/?keywords=${title}&location=${location}`;
    };

    const getIndeedUrl = (job) => {
        const title = encodeURIComponent(job?.title || "");
        const location = encodeURIComponent(job?.location || "");
        return `https://www.indeed.com/jobs?q=${title}&l=${location}`;
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#F5F7FB] flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0e686eff]"></div>
            </div>
        );
    }

    const filteredJobs = jobs.filter(job =>
        (job.title || "").toLowerCase().includes(searchTerm.toLowerCase()) &&
        (job.location || "").toLowerCase().includes(locationTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-[#F5F7FB] font-sans antialiased text-[#2d2d2d] selection:bg-[#0099a7d7] selection:text-white">
            <HrNavbar 
                showSearch={true}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                locationTerm={locationTerm}
                setLocationTerm={setLocationTerm}
            />

            {/* ========== MAIN CONTENT ========== */}
            <div className="flex flex-col lg:flex-row w-full mx-auto px-4 sm:px-6 py-6 gap-6 min-h-screen">
                {/* LEFT PANEL - Job Listings */}
                <div className="lg:w-2/5 xl:w-[35%] bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden flex flex-col lg:sticky lg:top-24 lg:h-[calc(100vh-120px)] h-[600px]">
                    <div className="p-6 border-b border-gray-50 bg-[#f8fafc]">
                        <div className="flex items-center justify-between">
                            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 flex items-center gap-2">
                                <span className="bg-[#0099a7d7] text-white px-2 py-0.5 rounded-lg">{filteredJobs.length}</span> Job Openings
                            </h2>
                            <div className="flex items-center gap-4">
                                <Link to="/apply-job" className="text-[10px] font-black text-[#0099a7d7] uppercase tracking-widest hover:underline flex items-center gap-2">
                                    <Zap size={14} className="fill-current" /> Post Job
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div ref={jobListRef} className="flex-1 overflow-y-auto divide-y divide-gray-50 scroll-smooth custom-scrollbar">
                        {filteredJobs.length === 0 ? (
                            <div className="flex flex-col items-center justify-center p-10 text-center h-full opacity-30 italic">
                                <Search className="w-16 h-16 text-gray-300 mb-4" />
                                <p className="text-sm font-black uppercase tracking-widest">No jobs found.</p>
                            </div>
                        ) : (
                            filteredJobs.map((job) => {
                                const isApplied = userApplications.some(app => (app.jobId?._id === job.id) || (app.jobId === job.id));
                                const isSaved = savedJobIds.includes(job.id);

                                return (
                                    <div
                                        key={job.id}
                                        ref={selectedJob?.id === job.id ? selectedJobRef : null}
                                        onClick={() => handleJobSelect(job)}
                                        className={`p-6 cursor-pointer transition-all duration-500 relative group ${selectedJob?.id === job.id
                                            ? 'bg-gradient-to-br from-[#0e686eff]/5 to-transparent border-l-8 border-[#0099a7d7] shadow-xl'
                                            : 'hover:bg-gray-50 border-l-8 border-transparent'
                                            }`}
                                    >
                                        <div className="absolute top-6 right-6 flex gap-2 scale-0 group-hover:scale-100 transition-transform">
                                            {isApplied && <div className="bg-emerald-500 text-white p-1 rounded-lg"><CheckCircle size={12} /></div>}
                                            {isSaved && <div className="bg-amber-500 text-white p-1 rounded-lg"><BookmarkCheck size={12} /></div>}
                                        </div>
                                        <div className="mb-2">
                                            <h3 className={`font-black text-xl leading-none uppercase tracking-tighter transition-colors ${selectedJob?.id === job.id ? 'text-[#0e686eff]' : 'text-gray-900'}`}>
                                                {job.title}
                                            </h3>
                                            <div className="flex items-center gap-2 mt-2">
                                                <p className="text-[10px] font-black text-[#0099a7d7] uppercase tracking-[0.2em]">
                                                    {job.company} — {job.location}
                                                </p>
                                                {job.badge && (
                                                    <span className={`text-[7px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded border ${
                                                        job.badge === 'Direct' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                                                        job.badge === 'External' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                                                        'bg-blue-50 text-blue-600 border-blue-100'
                                                    }`}>
                                                        {job.badge}
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-3">
                                            {job.salary}
                                        </p>
                                        <p className="text-xs text-gray-400 font-bold uppercase tracking-tight line-clamp-2 leading-relaxed opacity-60">
                                            {job.description}
                                        </p>
                                        
                                        <div className="mt-4 flex items-center justify-between gap-3">
                                            <div className="flex items-center gap-3">
                                                {job.isBackend && (
                                                    <span className="bg-blue-50 text-blue-600 text-[8px] px-2 py-1 rounded-md font-black border border-blue-100 uppercase tracking-widest flex items-center gap-1">
                                                        <Zap size={10} className="fill-current" /> AI Scored
                                                    </span>
                                                )}
                                                <span className="text-[8px] font-black text-gray-300 uppercase tracking-widest flex items-center gap-1">
                                                    <Clock size={10} /> {job.posted}
                                                </span>
                                            </div>
                                            {!isApplied && (
                                                <button 
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleJobSelect(job);
                                                        if (job.isExternal && job.applicationLink) {
                                                            window.open(job.applicationLink, '_blank');
                                                        } else {
                                                            if (!currentUser) {
                                                                setShowLoginPrompt(true);
                                                                return;
                                                            }
                                                            setShowApplyModal(true);
                                                        }
                                                    }}
                                                    className="bg-[#0e686eff] text-white text-[9px] font-black uppercase tracking-widest px-4 py-2 rounded-xl opacity-0 group-hover:opacity-100 transition-all hover:bg-[#0099a7d7]"
                                                >
                                                    Apply Now
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>

                {/* RIGHT PANEL - Job Details */}
                <div ref={jobDetailsRef} className="lg:w-3/5 xl:w-[65%] bg-white rounded-[2.5rem] shadow-xl border border-gray-100 overflow-y-auto lg:h-[calc(100vh-120px)] custom-scrollbar">
                    {selectedJob ? (
                        <div className="animate-in fade-in slide-in-from-bottom-5 duration-700">
                            <div className="p-10 md:p-16 border-b border-gray-50 bg-gradient-to-br from-[#f8fafc] to-white items-start">
                                <div className="flex flex-col md:flex-row justify-between items-start gap-10">
                                    <div className="flex-1">
                                        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 uppercase tracking-tighter leading-none">
                                            {selectedJob.title}
                                        </h1>
                                        <div className="flex flex-col gap-2">
                                            <p className="text-2xl font-bold text-[#0e686eff] tracking-tight">{selectedJob.company}</p>
                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] flex items-center gap-2">
                                                <MapPin size={16} className="text-[#0099a7d7]" /> {selectedJob.location}
                                            </p>
                                        </div>
                                        <div className="flex flex-wrap gap-3 mt-8">
                                            <DetailBadge icon={<Zap size={10} />} label={selectedJob.salary} />
                                            <DetailBadge icon={<Clock size={10} />} label={selectedJob.posted} />
                                            <DetailBadge icon={<Briefcase size={10} />} label={selectedJob.department} />
                                        </div>
                                    </div>
                                    <div className="bg-[#0e686eff] w-24 h-24 rounded-[2rem] flex items-center justify-center text-white font-black text-4xl shadow-2xl border border-white/20 shrink-0">
                                        {selectedJob.company?.charAt(0) || 'C'}
                                    </div>
                                </div>

                                <div className="flex flex-wrap mt-12 gap-4">
                                    {selectedJob.isExternal && selectedJob.applicationLink ? (
                                        <a
                                            href={selectedJob.applicationLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="bg-[#0e686eff] hover:bg-[#0099a7d7] text-white font-black uppercase tracking-widest text-[10px] px-10 py-5 rounded-[1.5rem] shadow-2xl shadow-teal-900/10 transition-all active:scale-95 flex items-center gap-3"
                                        >
                                            Apply Externally <ExternalLink className="w-4 h-4" />
                                        </a>
                                    ) : (
                                        <button
                                            onClick={() => {
                                                if (!currentUser) {
                                                    setShowLoginPrompt(true);
                                                    return;
                                                }
                                                setShowApplyModal(true);
                                            }}
                                            className="bg-[#0e686eff] hover:bg-[#0099a7d7] text-white font-black uppercase tracking-widest text-[10px] px-10 py-5 rounded-[1.5rem] shadow-2xl shadow-teal-900/10 transition-all active:scale-95 flex items-center gap-3"
                                        >
                                            Apply Now <Send className="w-4 h-4" />
                                        </button>
                                    )}

                                    <button
                                        onClick={async () => {
                                            if (!currentUser) {
                                                setShowLoginPrompt(true);
                                                return;
                                            }
                                            try {
                                                const userId = currentUser._id || currentUser.id;
                                                const isCurrentlySaved = savedJobIds.includes(selectedJob.id);
                                                
                                                if (isCurrentlySaved) {
                                                    await hrforumService.unsaveJob(selectedJob.id, userId);
                                                    setSavedJobIds(prev => prev.filter(id => id !== selectedJob.id));
                                                } else {
                                                    await hrforumService.saveJob(selectedJob.id, userId);
                                                    setSavedJobIds(prev => [...prev, selectedJob.id]);
                                                }
                                            } catch (err) { console.error(err); }
                                        }}
                                        className={`px-8 py-5 border rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-3 ${savedJobIds.includes(selectedJob.id)
                                            ? "bg-amber-50 border-amber-200 text-amber-700"
                                            : "bg-white border-gray-100 text-gray-400 hover:bg-gray-50 shadow-sm"
                                            }`}
                                    >
                                        <Bookmark size={16} className={savedJobIds.includes(selectedJob.id) ? "fill-amber-500 text-amber-500" : ""} />
                                        {savedJobIds.includes(selectedJob.id) ? "Saved" : "Save"}
                                    </button>

                                    <div className="flex items-center gap-2 ml-auto">
                                        <a href={getLinkedInUrl(selectedJob)} target="_blank" rel="noopener noreferrer" className="p-4 bg-[#0077b5] text-white rounded-[1.2rem] hover:scale-110 mb-transition shadow-lg shadow-blue-900/10"><ExternalLink size={18} /></a>
                                        <a href={getIndeedUrl(selectedJob)} target="_blank" rel="noopener noreferrer" className="p-4 bg-[#0e686eff] text-white rounded-[1.2rem] hover:scale-110 mb-transition shadow-lg shadow-teal-900/10 leading-none flex items-center"><Zap size={18} /></a>
                                    </div>
                                </div>
                            </div>

                            <div className="p-10 md:p-16 space-y-16">
                                <section>
                                    <h2 className="text-2xl font-black text-gray-900 mb-8 uppercase tracking-tighter flex items-center gap-3">
                                        <Info size={24} className="text-[#0099a7d7]" /> Job Description
                                    </h2>
                                    <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed font-bold italic border-l-4 border-[#0e686eff]/10 pl-10">
                                        "{selectedJob.description}"
                                    </div>
                                </section>

                                {selectedJob.about && (
                                    <section className="bg-gray-50 p-10 rounded-[2.5rem] border border-gray-100">
                                        <h3 className="text-[10px] font-black text-[#0099a7d7] mb-4 uppercase tracking-[0.4em]">About Company</h3>
                                        <p className="text-gray-500 text-sm font-medium leading-relaxed">{selectedJob.about}</p>
                                    </section>
                                )}

                                <div className="bg-blue-50 border border-blue-100 p-8 rounded-[2rem] flex items-center gap-6">
                                    <Zap size={32} className="text-blue-600 fill-current opacity-20" />
                                    <p className="text-[10px] font-black text-blue-800 uppercase tracking-widest leading-relaxed">
                                        Status: <span className="text-[#0e686eff]">Hiring Now</span> — This company is actively recruiting for multiple positions.
                                    </p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center p-16 text-center opacity-30 italic">
                            <Briefcase className="w-24 h-24 text-gray-200 mb-6" />
                            <p className="text-xl font-black uppercase tracking-[0.4em]">Select a job to view details</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Apply Modal Popup */}
            <ApplyModal 
                isOpen={showApplyModal}
                jobTitle={selectedJob?.title}
                onClose={() => { setShowApplyModal(false); setActiveApplicationId(null); }}
                onSubmit={handleApply}
                isSubmitting={isApplying}
                applicationId={activeApplicationId}
            />

            {/* Login Prompt Modal */}
            {showLoginPrompt && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="bg-white rounded-[3rem] p-16 max-w-sm w-full shadow-2xl text-center">
                        <div className="w-20 h-20 bg-blue-50 text-[#0e686eff] rounded-[2rem] flex items-center justify-center mx-auto mb-8 border border-blue-100 shadow-inner">
                            <Info size={40} />
                        </div>
                        <h2 className="text-3xl font-black text-gray-900 mb-4 uppercase tracking-tighter">Login Required</h2>
                        <p className="text-gray-500 font-bold mb-10 text-xs uppercase tracking-widest leading-relaxed">Please login to apply for this job.</p>
                        <div className="flex flex-col gap-4">
                            <Link to="/login" className="w-full py-5 bg-[#0e686eff] text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-[#0099a7d7] transition-all shadow-xl shadow-teal-900/10">Login</Link>
                            <button onClick={() => setShowLoginPrompt(false)} className="w-full py-5 bg-gray-50 text-gray-400 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-white transition-all">Close</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

const DetailBadge = ({ icon, label }) => (
    <div className="bg-white px-5 py-2.5 rounded-xl border border-gray-100 flex items-center gap-2 shadow-sm">
        <span className="text-[#0e686eff]">{icon}</span>
        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{label}</span>
    </div>
);



