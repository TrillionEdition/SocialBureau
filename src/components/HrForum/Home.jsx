import React, { useEffect, useState, useRef } from "react";
import { jobService } from "../../..jobService";
import localJobs from "../../data/jobs";

export default function HRForum() {
    const [jobs, setJobs] = useState([]);
    const [selectedJob, setSelectedJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [locationTerm, setLocationTerm] = useState("");

    // Refs for smooth scrolling
    const jobListRef = useRef(null);
    const jobDetailsRef = useRef(null);
    const selectedJobRef = useRef(null);

    useEffect(() => {
        setLoading(true);
        jobService
            .getJobs()
            .then((data) => {
                if (data && data.length > 0) {
                    setJobs(data);
                    setSelectedJob(data[0]);
                } else {
                    // Fallback to local data if API is empty
                    setJobs(localJobs);
                    if (localJobs.length > 0) {
                        setSelectedJob(localJobs[0]);
                    }
                }
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                // Even on error, try to show local jobs
                setJobs(localJobs);
                if (localJobs.length > 0) {
                    setSelectedJob(localJobs[0]);
                    setLoading(false);
                } else {
                    setError("Failed to load jobs. Please try again later.");
                    setLoading(false);
                }
            });
    }, []);

    // Smooth scroll to selected job in list
    useEffect(() => {
        if (selectedJobRef.current && jobListRef.current) {
            selectedJobRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'start'
            });
        }
    }, [selectedJob]);

    // Smooth scroll to top of job details when job changes
    useEffect(() => {
        if (jobDetailsRef.current && selectedJob) {
            jobDetailsRef.current.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    }, [selectedJob]);

    const handleJobSelect = (job) => {
        setSelectedJob(job);
        // On mobile, scroll to details when a job is clicked
        if (window.innerWidth < 1024 && jobDetailsRef.current) {
            setTimeout(() => {
                jobDetailsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        }
    };

    // Generate LinkedIn job search URL
    const getLinkedInUrl = (job) => {
        if (!job) return "#";
        const title = encodeURIComponent(job.title || "");
        const location = encodeURIComponent(job.location || "");
        return `https://www.linkedin.com/jobs/search/?keywords=${title}&location=${location}`;
    };

    // Generate Indeed job search URL
    const getIndeedUrl = (job) => {
        if (!job) return "#";
        const title = encodeURIComponent(job.title || "");
        const location = encodeURIComponent(job.location || "");
        return `https://www.indeed.com/jobs?q=${title}&l=${location}`;
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#F5F7FB] flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#003D5C] mx-auto"></div>
                    <p className="text-xl text-gray-600 mt-4">Loading jobs...</p>
                </div>
            </div>
        );
    }

    if (error && (!jobs || jobs.length === 0)) {
        return (
            <div className="min-h-screen bg-[#F5F7FB] flex items-center justify-center">
                <div className="text-center bg-white p-8 rounded-lg shadow-md">
                    <p className="text-xl text-red-600">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-4 bg-[#003D5C] text-white px-6 py-2 rounded-md hover:bg-[#002c44] transition"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    const filteredJobs = jobs.filter(job =>
        job.title?.toLowerCase().includes(searchTerm.toLowerCase()) &&
        job.location?.toLowerCase().includes(locationTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-[#F5F7FB] font-sans antialiased">
            {/* ========== HEADER ========== */}
            <header className="bg-[#0e686eff] text-white px-4 md:px-8 py-3 flex flex-wrap items-center justify-between shadow-md sticky top-0 z-50">
                {/* Search Bar */}
                <div className="flex flex-grow w-full max-w-7xl mx-auto px-4 mt-2 md:mt-0">
                    <div className="flex w-full bg-white rounded-md overflow-hidden shadow-sm">
                        <div className="flex-1 flex items-center px-3 py-1.5">
                            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <input
                                type="text"
                                placeholder="Job title, keywords, or company"
                                className="w-full px-2 py-1.5 text-gray-800 placeholder-gray-500 focus:outline-none text-sm md:text-base"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="w-px bg-gray-300"></div>
                        <div className="flex-1 flex items-center px-3 py-1.5">
                            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <input
                                type="text"
                                placeholder="City, state, zip, or remote"
                                className="w-full px-2 py-1.5 text-gray-800 placeholder-gray-500 focus:outline-none text-sm md:text-base"
                                value={locationTerm}
                                onChange={(e) => setLocationTerm(e.target.value)}
                            />
                        </div>
                        <button className="bg-[#0099a7d7] hover:bg-[#002c44] text-white font-semibold px-6 py-2 transition-colors border-l border-[#194a5c]">
                            Find jobs
                        </button>
                    </div>
                </div>
            </header>

            {/* ========== MAIN CONTENT ========== */}
            <div className="flex flex-col lg:flex-row w-full mx-auto px-4 sm:px-6 py-6 gap-6 min-h-screen">
                {/* LEFT PANEL - Job Listings */}
                <div className="lg:w-2/5 xl:w-[35%] bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden flex flex-col lg:sticky lg:top-24 lg:h-[calc(100vh-120px)] h-[600px]">
                    <div className="p-4 border-b border-gray-200 bg-gray-50">
                        <div className="flex items-center justify-between">
                            <h2 className="text-sm font-semibold text-gray-800">
                                <span className="bg-[#0099a7d7] text-white text-xs px-2 py-0.5 rounded-full mr-2">
                                    {filteredJobs.length}
                                </span>
                                {filteredJobs.length === 1 ? 'job' : 'jobs'}
                            </h2>
                            <div className="flex space-x-1 text-xs">
                                <button className="px-3 py-1.5 bg-white border border-gray-300 rounded-md shadow-sm text-gray-700 font-medium hover:bg-gray-100">
                                    Date posted
                                </button>
                                <button className="px-3 py-1.5 bg-white border border-gray-300 rounded-md shadow-sm text-gray-700 font-medium hover:bg-gray-100">
                                    Remote
                                </button>
                                <button className="px-3 py-1.5 bg-white border border-gray-300 rounded-md shadow-sm text-gray-700 font-medium hover:bg-gray-100">
                                    Salary
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Job List with smooth scroll */}
                    <div
                        ref={jobListRef}
                        className="flex-1 overflow-y-auto divide-y divide-gray-200 scroll-smooth"
                    >
                        {filteredJobs.length === 0 ? (
                            <div className="flex items-center justify-center p-6 text-center h-full">
                                <div>
                                    <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                    <p className="text-gray-600 text-lg mb-2">No jobs found</p>
                                    <p className="text-gray-500 text-sm">Try adjusting your search criteria</p>
                                </div>
                            </div>
                        ) : (
                            filteredJobs.map((job) => (
                                <div
                                    key={job.slug || job.id}
                                    ref={selectedJob?.id === job.id ? selectedJobRef : null}
                                    onClick={() => handleJobSelect(job)}
                                    className={`p-5 cursor-pointer transition-all duration-300 ${selectedJob?.id === job.id
                                        ? 'bg-[#E8F0FE] border-l-4 border-[#2557a0] shadow-md'
                                        : 'hover:bg-gray-50 border-l-4 border-transparent hover:border-l-4 hover:border-gray-300'
                                        }`}
                                >
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-semibold text-lg text-[#0099a7d7]">
                                                {job.title}
                                            </h3>
                                            <p className="text-sm text-gray-700 font-medium mt-0.5">
                                                {job.company} · {job.location}
                                            </p>
                                        </div>
                                        {job.badge && (
                                            <span className="bg-[#FFC107] text-xs px-2 py-0.5 rounded-full font-bold text-gray-800">
                                                {job.badge}
                                            </span>
                                        )}
                                    </div>

                                    {/* Icon from backend if exists */}
                                    {job.icon && (
                                        <i className={`${job.icon} text-red-600 text-sm inline-block mt-2`} />
                                    )}

                                    <p className="text-xs text-emerald-700 font-semibold mt-2">
                                        {job.salary}
                                    </p>
                                    <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                                        {job.description}
                                    </p>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* RIGHT PANEL - Job Details (Auto expansion) */}
                <div
                    ref={jobDetailsRef}
                    className="lg:w-3/5 xl:w-[65%] bg-white rounded-lg shadow-sm border border-gray-200 h-fit min-h-[500px]"
                >
                    {selectedJob ? (
                        <div className="animate-fadeIn">
                            {/* Job Header */}
                            <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-white to-gray-50">
                                <div className="flex flex-wrap justify-between items-start">
                                    <div>
                                        <h1 className="text-2xl font-bold text-[#0099a7d7]">
                                            {selectedJob.title}
                                        </h1>
                                        <p className="text-lg text-gray-700 mt-1">
                                            {selectedJob.company} · {selectedJob.location}
                                        </p>
                                        <div className="flex flex-wrap gap-2 mt-3">
                                            <span className="bg-gray-100 text-gray-800 text-xs px-2.5 py-1 rounded-full border border-gray-300">
                                                {selectedJob.salary}
                                            </span>
                                            <span className="bg-gray-100 text-gray-800 text-xs px-2.5 py-1 rounded-full border border-gray-300">
                                                {selectedJob.posted}
                                            </span>
                                            <span className="bg-gray-100 text-gray-800 text-xs px-2.5 py-1 rounded-full border border-gray-300">
                                                {selectedJob.department}
                                            </span>
                                            {selectedJob.icon && (
                                                <span className="bg-gray-100 text-gray-800 text-xs px-2.5 py-1 rounded-full border border-gray-300 flex items-center">
                                                    <i className={`${selectedJob.icon} mr-1 text-red-600`} />
                                                    Active
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="bg-gradient-to-br from-[#0099a7d7] to-[#0099a7d7] w-16 h-16 rounded-md flex items-center justify-center text-black-500 font-bold text-xl border shadow-sm">
                                        {selectedJob.company?.charAt(0) || 'C'}
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex mt-5 space-x-3">
                                    <button
                                        onClick={() => {
                                            const url = selectedJob?.link || getLinkedInUrl(selectedJob);
                                            window.open(url, "_blank");
                                        }}
                                        className="bg-[#0099a7d7] hover:bg-[#1e4682] text-white font-semibold px-8 py-2.5 rounded-md text-sm shadow-lg transition transform hover:scale-105 flex items-center gap-2"
                                    >
                                        <span>Apply now</span>
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                        </svg>
                                    </button>
                                    <button className="border border-gray-300 bg-white hover:bg-gray-100 px-6 py-2.5 rounded-md text-sm font-semibold text-gray-700 transition transform hover:scale-105">
                                        Save
                                    </button>

                                    {/* External Links in Job Details */}
                                    <div className="flex items-center space-x-2 ml-auto">
                                        <span className="text-xs text-gray-500">Find more:</span>
                                        <a
                                            href={getLinkedInUrl(selectedJob)}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="bg-[#0099a7d7] text-white p-2 rounded-md hover:bg-[#004182] transition transform hover:scale-110"
                                            title="Search on LinkedIn"
                                        >
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C0.792 0 0 0.774 0 1.729v20.542C0 23.227 0.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 0.774 23.2 0 22.222 0h.003z" />
                                            </svg>
                                        </a>
                                        <a
                                            href={getIndeedUrl(selectedJob)}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="bg-[#0099a7d7] text-white p-2 rounded-md hover:bg-[#002c44] transition transform hover:scale-110"
                                            title="Search on Indeed"
                                        >
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm.028 4.858c1.552 0 2.81 1.258 2.81 2.81 0 1.552-1.258 2.81-2.81 2.81-1.552 0-2.81-1.258-2.81-2.81 0-1.552 1.258-2.81 2.81-2.81zM12 19.5c-2.485 0-4.5-2.015-4.5-4.5s2.015-4.5 4.5-4.5 4.5 2.015 4.5 4.5-2.015 4.5-4.5 4.5z" />
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Job Description */}
                            <div className="p-6">
                                <h2 className="text-lg font-bold mb-3 text-gray-800">
                                    Full job description
                                </h2>
                                <div className="prose prose-sm max-w-none text-gray-700">
                                    {selectedJob.about && (
                                        <div className="mb-6">
                                            <h3 className="font-bold text-[#0099a7d7] mb-2 uppercase text-xs tracking-wider">About the Role</h3>
                                            <p className="text-gray-700 leading-relaxed">{selectedJob.about}</p>
                                        </div>
                                    )}

                                    <div className="mb-6">
                                        <h3 className="font-bold text-[#0099a7d7] mb-2 uppercase text-xs tracking-wider">Description</h3>
                                        <p className="text-gray-700 leading-relaxed">{selectedJob.description}</p>
                                    </div>

                                    {selectedJob.roleSummary && selectedJob.roleSummary.length > 0 && (
                                        <div className="mb-6">
                                            <h3 className="font-bold text-[#0099a7d7] mb-2 uppercase text-xs tracking-wider">Role Summary</h3>
                                            <ul className="list-disc pl-5 space-y-1 text-gray-700">
                                                {selectedJob.roleSummary.map((item, i) => (
                                                    <li key={i}>{item}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {selectedJob.responsibilities && selectedJob.responsibilities.length > 0 && (
                                        <div className="mb-6">
                                            <h3 className="font-bold text-[#0099a7d7] mb-2 uppercase text-xs tracking-wider">Responsibilities</h3>
                                            <ul className="list-disc pl-5 space-y-1 text-gray-700">
                                                {selectedJob.responsibilities.map((item, i) => (
                                                    <li key={i}>{item}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {selectedJob.qualifications && selectedJob.qualifications.length > 0 && (
                                        <div className="mb-6">
                                            <h3 className="font-bold text-[#0099a7d7] mb-2 uppercase text-xs tracking-wider">Qualifications</h3>
                                            <ul className="list-disc pl-5 space-y-1 text-gray-700">
                                                {selectedJob.qualifications.map((item, i) => (
                                                    <li key={i}>{item}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {selectedJob.experience && selectedJob.experience.length > 0 && (
                                        <div className="mb-6">
                                            <h3 className="font-bold text-[#0099a7d7] mb-2 uppercase text-xs tracking-wider">Experience</h3>
                                            <ul className="list-disc pl-5 space-y-1 text-gray-700">
                                                {selectedJob.experience.map((item, i) => (
                                                    <li key={i}>{item}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {selectedJob.nextSteps && (
                                        <div className="mt-6 p-4 bg-gray-50 rounded-lg border-l-4 border-[#0099a7d7]">
                                            <h3 className="font-bold text-[#0099a7d7] mb-1 text-sm">Next Steps</h3>
                                            <p className="text-sm text-gray-600 italic">{selectedJob.nextSteps}</p>
                                        </div>
                                    )}
                                </div>
                                <hr className="my-6" />
                                <div className="flex items-center justify-between text-sm text-gray-600">
                                    <div className="flex items-center">
                                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span>Posted {selectedJob.posted || 'Recent'}</span>
                                    </div>

                                    {/* Share buttons */}
                                    <div className="flex items-center space-x-3">
                                        <span className="text-gray-500">Share:</span>
                                        <button className="text-[#0099a7d7] hover:text-[#0099a7d7] transition">
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                                <div className="mt-4 bg-blue-50 border border-blue-200 p-4 rounded-lg">
                                    <p className="text-sm text-[#0099a7d7]">
                                        💼 <span className="font-semibold">Hiring multiple candidates</span> — This employer is actively seeking to fill this role.
                                    </p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="h-full flex items-center justify-center p-6 text-center">
                            <div className="animate-fadeIn">
                                <svg className="w-20 h-20 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <p className="text-gray-600 text-lg mb-2">Select a job to view details</p>
                                <p className="text-gray-500 text-sm">Click on any position from the left panel</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Add custom animation styles */}
            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.3s ease-out;
                }
                .scroll-smooth {
                    scroll-behavior: smooth;
                }
                /* Custom Scrollbar */
                ::-webkit-scrollbar {
                    width: 8px;
                    height: 8px;
                }
                ::-webkit-scrollbar-track {
                    background: #f1f1f1; 
                    border-radius: 4px;
                }
                ::-webkit-scrollbar-thumb {
                    background: #c1c1c1; 
                    border-radius: 4px;
                }
                ::-webkit-scrollbar-thumb:hover {
                    background: #a8a8a8; 
                }
            `}</style>
        </div>
    );
}