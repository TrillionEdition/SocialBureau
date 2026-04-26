import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import * as hrforumService from "@/services/hrforumService.js";
import { BASE_URL } from "@/utils/urls.js"
import { getUserData } from "@/utils/authUtils";
import {
    CheckCircle,
    XCircle,
    ChevronLeft,
    Download,
    Mail,
    Phone,
    MapPin,
    ExternalLink,
    FileText,
    MessageSquare,
    Send,
    Star,
    AlertTriangle,
    Clock,
    User,
    Briefcase,
    Zap,
    ShieldCheck,
    SearchCode,
    HelpCircle,
    Layout,
    ArrowUpRight,
    TrendingUp,
    Shield,
    X,
    Info,
    Eye,
    ZoomIn,
    ZoomOut,
    RotateCw
} from "lucide-react";
import HrNavbar from "./HrNavbar";
import StatusModal from "./StatusModal";

export default function CandidateProfile() {
    const { applicationId } = useParams();
    const navigate = useNavigate();
    const [application, setApplication] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isUpdating, setIsUpdating] = useState(false);
    const [chatMsg, setChatMsg] = useState("");
    const [showChat, setShowChat] = useState(false);

    // Status Modal State
    const [statusModalOpen, setStatusModalOpen] = useState(false);
    const [statusAction, setStatusAction] = useState(null);

    // Resume Viewer State
    const [resumeLoading, setResumeLoading] = useState(true);
    const [resumeError, setResumeError] = useState(false);

    const chatEndRef = useRef(null);
    const iframeRef = useRef(null);
    const currentUser = getUserData();

    useEffect(() => {
        if (applicationId) {
            fetchApplicationData();
        }
    }, [applicationId]);

    useEffect(() => {
        if (showChat) {
            scrollToBottom();
        }
    }, [application?.messages, showChat]);

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const fetchApplicationData = async () => {
        try {
            setLoading(true);
            const res = await hrforumService.getApplicationById(applicationId);
            console.log("Application Data:", res.data);
            setApplication(res.data);
            setError(null);
        } catch (err) {
            console.error("Error fetching application:", err);
            setError("Failed to load application profile.");
        } finally {
            setLoading(false);
        }
    };

    const handleAction = async (status, message = "") => {
        try {
            setIsUpdating(true);
            await hrforumService.updateApplicationStatus(applicationId, status, message);
            fetchApplicationData();
        } catch (err) {
            console.error("Action error:", err);
            alert("Action failed.");
        } finally {
            setIsUpdating(false);
        }
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!chatMsg.trim()) return;
        try {
            await hrforumService.addMessage(
                applicationId,
                chatMsg,
                'employer',
                currentUser?._id || currentUser?.id
            );
            setChatMsg("");
            fetchApplicationData();
        } catch (err) {
            console.error("Chat error:", err);
        }
    };

    // ✅ FIXED: Proper URL construction for resume
    const getResumeUrl = (rawUrl) => {
        if (!rawUrl) return null;

        // Already a full URL (starts with http/https)
        if (rawUrl.startsWith('http://') || rawUrl.startsWith('https://')) {
            return rawUrl;
        }

        // Remove "Upload:" prefix if present
        let fileName = rawUrl;
        if (rawUrl.includes('Upload:')) {
            fileName = rawUrl.replace('Upload:', '').trim();
        }

               return `${BASE_URL}/uploads/${fileName}`;
    };

    const downloadResume = (resumeUrl) => {
        if (resumeUrl) {
            const link = document.createElement('a');
            link.href = resumeUrl;
            link.download = `${application.candidateName}-resume.pdf`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    const openResumeExternal = (resumeUrl) => {
        if (resumeUrl) {
            window.open(resumeUrl, '_blank', 'noopener,noreferrer');
        }
    };

    const isPdfResume = (url) => {
        if (!url) return false;
        return /\.(pdf)$/i.test(url) || url.includes('pdf');
    };

    const isImageResume = (url) => {
        if (!url) return false;
        return /\.(jpg|jpeg|png|gif|webp)$/i.test(url);
    };

    if (loading) return (
        <div className="min-h-screen bg-[#F5F7FB] flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0e686eff]"></div>
        </div>
    );

    if (error || !application) return (
        <div className="min-h-screen bg-[#F5F7FB] flex flex-col items-center justify-center p-10 text-center">
            <AlertTriangle size={64} className="text-red-500 mb-8" />
            <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tighter mb-4">
                {error || "Access Denied"}
            </h2>
            <button
                onClick={() => navigate(-1)}
                className="bg-[#0e686eff] text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-[#0099a7d7] shadow-xl transition active:scale-95"
            >
                Go Back
            </button>
        </div>
    );

    const {
        candidateName,
        candidateEmail,
        candidatePhone,
        coverLetter,
        atsResult,
        status,
        jobId,
        messages = [],
        resumeUrl,
        resumeFile
    } = application;

    // ✅ Get the actual resume URL using the fixed function
    const actualResumeUrl = getResumeUrl(resumeUrl || resumeFile);

    return (
        <div className="min-h-screen bg-[#F5F7FB] text-[#2d2d2d] font-sans selection:bg-[#0099a7d7] selection:text-white">
            <HrNavbar />

            {/* Sub-Header for Profile Actions */}
            <div className="bg-white border-b border-gray-100 px-8 py-6 flex items-center justify-between sticky top-16 z-40 shadow-sm">
                <div className="flex items-center gap-6">
                    <button
                        onClick={() => navigate(-1)}
                        className="w-12 h-12 bg-[#f8fafc] hover:bg-white rounded-2xl flex items-center justify-center transition-all border border-gray-100 shadow-sm text-gray-400 hover:text-[#0e686eff]"
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <div>
                        <h1 className="text-3xl font-black uppercase tracking-tighter text-gray-900 mb-1 leading-none">
                            {candidateName}
                        </h1>
                        <p className="text-[10px] font-black text-[#0099a7d7] uppercase tracking-[0.2em] flex items-center gap-2">
                            Applied for <span className="text-gray-900">{jobId?.jobTitle}</span>
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setShowChat(!showChat)}
                        className={`px-8 py-4 rounded-[1.5rem] font-black uppercase tracking-widest text-[10px] transition-all flex items-center gap-3 border shadow-xl ${showChat
                            ? 'bg-[#0099a7d7] border-[#0099a7d7] text-white'
                            : 'bg-white border-gray-100 text-gray-400 hover:text-[#0099a7d7] hover:border-[#0099a7d7]/20'
                            }`}
                    >
                        <MessageSquare size={18} /> Chat
                    </button>

                    <div className="w-px h-8 bg-gray-100 mx-2"></div>

                    <div className="flex gap-2">
                        <button
                            disabled={isUpdating || status === 'rejected'}
                            onClick={() => {
                                setStatusAction('reject');
                                setStatusModalOpen(true);
                            }}
                            className={`px-6 py-4 bg-white border border-gray-100 rounded-[1.2rem] text-[9px] font-black uppercase tracking-widest text-gray-400 hover:bg-red-50 hover:text-white hover:border-red-500 transition-all flex items-center gap-2 ${status === 'rejected' ? 'bg-red-50 text-red-500 border-red-200' : ''
                                }`}
                        >
                            <XCircle size={18} /> {status === 'rejected' ? 'Rejected' : 'Reject'}
                        </button>
                        <button
                            disabled={isUpdating || status === 'shortlisted'}
                            onClick={() => {
                                setStatusAction('shortlist');
                                setStatusModalOpen(true);
                            }}
                            className={`px-6 py-4 bg-white border border-gray-100 rounded-[1.2rem] text-[9px] font-black uppercase tracking-widest text-gray-400 hover:bg-[#0099a7d7] hover:border-[#0099a7d7] hover:text-white transition-all flex items-center gap-2 ${status === 'shortlisted' ? 'bg-[#0099a7d7] text-white' : ''
                                }`}
                        >
                            <CheckCircle size={18} /> {status === 'shortlisted' ? 'Shortlisted' : 'Shortlist'}
                        </button>
                        <button
                            disabled={isUpdating || status === 'selected'}
                            onClick={() =>
                                handleAction(
                                    'selected',
                                    'Congratulations! You have been selected for this position.'
                                )
                            }
                            className={`px-8 py-4 bg-[#0e686eff] text-white rounded-[1.2rem] text-[9px] font-black uppercase tracking-widest hover:bg-[#0099a7d7] shadow-xl transition-all flex items-center gap-2 active:scale-95 shadow-teal-900/10 ${status === 'selected' ? 'ring-4 ring-[#0099a7d7]/50' : ''
                                }`}
                        >
                            <ShieldCheck size={18} /> {status === 'selected' ? 'Hired ✓' : 'Accept'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Split Comparison View */}
            <div className="max-w-[1800px] mx-auto p-12 grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* LEFT: JOB SPECIFICATIONS */}
                <div className="space-y-12 h-screen sticky top-48 overflow-y-auto custom-scrollbar pb-12 pr-4">
                    <div className="bg-white rounded-[4rem] border border-gray-100 shadow-2xl p-16 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#0e686eff]/5 rounded-full blur-[80px] -z-10"></div>

                        <div className="mb-12">
                            <h2 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em] mb-4">
                                Target Position
                            </h2>
                            <h3 className="text-5xl font-black uppercase tracking-tighter text-gray-900 leading-none mb-4">
                                {jobId?.jobTitle}
                            </h3>
                            <div className="flex gap-4">
                                <span className="px-4 py-2 bg-[#0e686eff]/5 text-[#0e686eff] rounded-xl text-[10px] font-black uppercase tracking-widest border border-[#0e686eff]/10">
                                    {jobId?.companyName}
                                </span>
                                <span className="px-4 py-2 bg-gray-50 text-gray-400 rounded-xl text-[10px] font-black uppercase tracking-widest border border-gray-100">
                                    {jobId?.location} ({jobId?.locationType})
                                </span>
                            </div>
                        </div>

                        <div className="space-y-12">
                            {jobId?.about && (
                                <section>
                                    <h4 className="text-[9px] font-black text-[#0099a7d7] uppercase tracking-widest mb-4">
                                        About Company
                                    </h4>
                                    <p className="text-sm font-bold text-gray-500 leading-relaxed">{jobId.about}</p>
                                </section>
                            )}

                            {jobId?.roleSummary?.length > 0 && (
                                <section>
                                    <h4 className="text-[9px] font-black text-[#0099a7d7] uppercase tracking-widest mb-4">
                                        Role Summary
                                    </h4>
                                    <ul className="space-y-3">
                                        {jobId.roleSummary.map((s, i) => (
                                            <li key={i} className="text-sm font-bold text-gray-600 flex gap-3">
                                                <div className="w-1.5 h-1.5 bg-[#0099a7d7]/30 rounded-full mt-2 shrink-0"></div>
                                                {s}
                                            </li>
                                        ))}
                                    </ul>
                                </section>
                            )}

                            {jobId?.responsibilities?.length > 0 && (
                                <section>
                                    <h4 className="text-[9px] font-black text-[#0099a7d7] uppercase tracking-widest mb-4">
                                        Key Responsibilities
                                    </h4>
                                    <ul className="space-y-3">
                                        {jobId.responsibilities.map((r, i) => (
                                            <li key={i} className="text-sm font-bold text-gray-600 flex gap-3">
                                                <CheckCircle size={14} className="text-emerald-500 mt-1 shrink-0" /> {r}
                                            </li>
                                        ))}
                                    </ul>
                                </section>
                            )}

                            <section>
                                <h4 className="text-[9px] font-black text-[#0099a7d7] uppercase tracking-widest mb-4">
                                    Detailed Description
                                </h4>
                                <div className="text-sm font-bold text-gray-500 leading-relaxed whitespace-pre-wrap bg-[#f8fafc] p-8 rounded-[2rem] border border-gray-50">
                                    {jobId?.description}
                                </div>
                            </section>
                        </div>
                    </div>
                </div>

                {/* RIGHT: CANDIDATE & RESUME */}
                <div className="space-y-12 pb-12">
                    {/* Resume Viewer Header */}
                    <div className="bg-white rounded-[4rem] border border-gray-100 shadow-2xl overflow-hidden">
                        <div className="p-12 border-b border-gray-50 bg-[#f8fafc] flex justify-between items-center">
                            <div>
                                <h2 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em] mb-2">
                                    Candidate Resume
                                </h2>
                                <h3 className="text-3xl font-black uppercase tracking-tighter text-gray-900 leading-none">
                                    {candidateName}
                                </h3>
                            </div>
                            <div className="flex gap-3">
                                {actualResumeUrl && (
                                    <>
                                        <button
                                            onClick={() => downloadResume(actualResumeUrl)}
                                            className="w-12 h-12 bg-white hover:bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-2xl flex items-center justify-center transition-all shadow-sm"
                                            title="Download Resume"
                                        >
                                            <Download size={20} />
                                        </button>
                                        <button
                                            onClick={() => openResumeExternal(actualResumeUrl)}
                                            className="w-12 h-12 bg-white hover:bg-blue-50 text-blue-600 border border-blue-100 rounded-2xl flex items-center justify-center transition-all shadow-sm"
                                            title="Open in New Tab"
                                        >
                                            <ExternalLink size={20} />
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Resume Viewer */}
                        <div className="p-8">
                            {actualResumeUrl ? (
                                <div className="w-full h-[1200px] bg-gray-50 rounded-[2rem] border-4 border-white shadow-inner overflow-hidden relative group">
                                    {/* PDF Viewer using PDF.js */}
                                    {isPdfResume(actualResumeUrl) && (
                                        <>
                                            <iframe
                                                ref={iframeRef}
                                                src={`https://mozilla.github.io/pdf.js/web/viewer.html?file=${encodeURIComponent(actualResumeUrl)}`}
                                                title="Resume PDF Viewer"
                                                className="w-full h-full rounded-[1.5rem]"
                                                onLoad={() => setResumeLoading(false)}
                                                onError={() => {
                                                    console.error("PDF viewer failed to load");
                                                    setResumeError(true);
                                                }}
                                                allow="fullscreen"
                                            />
                                            {resumeLoading && (
                                                <div className="absolute inset-0 flex items-center justify-center bg-gray-100/50 backdrop-blur-sm">
                                                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0e686eff]"></div>
                                                </div>
                                            )}
                                            {resumeError && (
                                                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100/80 backdrop-blur-sm">
                                                    <AlertTriangle size={64} className="text-red-500 mb-4" />
                                                    <p className="text-gray-700 font-bold mb-4">PDF failed to load</p>
                                                    <button
                                                        onClick={() => openResumeExternal(actualResumeUrl)}
                                                        className="bg-[#0e686eff] text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-[#0099a7d7] transition-all"
                                                    >
                                                        <ExternalLink size={18} /> Open in Browser
                                                    </button>
                                                </div>
                                            )}
                                        </>
                                    )}

                                    {/* Image Viewer */}
                                    {isImageResume(actualResumeUrl) && (
                                        <img
                                            src={actualResumeUrl}
                                            alt="Resume"
                                            className="w-full h-full object-contain"
                                            onLoad={() => setResumeLoading(false)}
                                            onError={() => setResumeError(true)}
                                        />
                                    )}

                                    {/* Fallback: Embed */}
                                    {!isPdfResume(actualResumeUrl) && !isImageResume(actualResumeUrl) && (
                                        <embed
                                            src={actualResumeUrl}
                                            type="application/pdf"
                                            width="100%"
                                            height="100%"
                                            onLoad={() => setResumeLoading(false)}
                                            onError={() => setResumeError(true)}
                                        />
                                    )}

                                    {/* Link overlay in case viewer is blocked */}
                                    <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={() => openResumeExternal(actualResumeUrl)}
                                            className="bg-black/60 backdrop-blur-md text-white px-6 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-black/80 transition-all"
                                        >
                                            Open External <ExternalLink size={14} />
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="p-24 bg-[#f8fafc] rounded-[2rem] border-2 border-dashed border-gray-200 text-center">
                                    <FileText size={80} className="mx-auto text-gray-200 mb-8" />
                                    <p className="font-black uppercase tracking-widest text-gray-400 mb-2">
                                        Resume Not Found
                                    </p>
                                    <p className="text-[10px] font-bold text-gray-300 mb-6">
                                        The resume file could not be located.
                                    </p>
                                    {/* Debug Info */}
                                    <div className="text-left bg-yellow-50 p-4 rounded-lg text-[9px] font-mono text-yellow-900 max-h-40 overflow-y-auto border border-yellow-200">
                                        <p className="font-bold mb-2">⚠️ Debug Information:</p>
                                        <p className="mb-1"><span className="font-bold">Raw resumeUrl:</span> {resumeUrl || 'null'}</p>
                                        <p className="mb-1"><span className="font-bold">resumeFile:</span> {resumeFile || 'null'}</p>
                                        <p className="mb-1"><span className="font-bold">Constructed URL:</span> {actualResumeUrl || 'null'}</p>
                                        <p className="mb-1"><span className="font-bold">BASE_URL:</span> {BASE_URL}</p>
                                        <p className="mt-2 text-yellow-700"><span className="font-bold">FIX:</span> Ensure your BASE_URL in urls.js matches your backend (usually http://localhost:5000)</p>
                                    </div>
                                    <button
                                        onClick={() => {
                                            console.log("Resume URL:", actualResumeUrl);
                                            console.log("Application:", application);
                                            alert("Check console for debug info");
                                        }}
                                        className="mt-4 bg-[#0e686eff] text-white px-4 py-2 rounded-lg text-[9px] font-bold uppercase"
                                    >
                                        Log to Console
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* MATCH STATS & ANALYSIS */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Match Score */}
                        <div className="bg-white rounded-[4rem] p-12 border border-gray-100 shadow-2xl flex flex-col items-center">
                            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em] mb-8">
                                Match score
                            </h3>
                            <div className="relative w-40 h-40 flex items-center justify-center mb-6">
                                <svg className="w-full h-full transform -rotate-90">
                                    <circle
                                        cx="80"
                                        cy="80"
                                        r="70"
                                        className="stroke-[#f8fafc] fill-none"
                                        strokeWidth="12"
                                    />
                                    <circle
                                        cx="80"
                                        cy="80"
                                        r="70"
                                        className="stroke-[#0e686eff] fill-none transition-all duration-1000"
                                        strokeWidth="12"
                                        strokeDasharray={439.8}
                                        strokeDashoffset={439.8 - (439.8 * (atsResult?.score || 0)) / 100}
                                        strokeLinecap="round"
                                    />
                                </svg>
                                <span className="absolute text-4xl font-black tracking-tighter text-gray-900">
                                    {atsResult?.score || 0}%
                                </span>
                            </div>
                        </div>

                        {/* Quick Contact */}
                        <div className="bg-white rounded-[4rem] p-12 border border-gray-100 shadow-2xl">
                            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em] mb-8">
                                Contact info
                            </h3>
                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
                                        <Mail size={18} />
                                    </div>
                                    <span className="text-[11px] font-black text-gray-600 truncate">{candidateEmail}</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                                        <Phone size={18} />
                                    </div>
                                    <span className="text-[11px] font-black text-gray-600">
                                        {candidatePhone || "N/A"}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* COVER LETTER & ATS DETAILS */}
                    <div className="bg-white rounded-[4rem] p-16 border border-gray-100 shadow-2xl space-y-12">
                        <section>
                            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em] mb-8">
                                Cover Letter
                            </h3>
                            <div className="p-10 bg-[#f8fafc] rounded-[2rem] border-l-8 border-[#0099a7d7]/20">
                                <p className="text-xl font-medium text-gray-500 italic leading-relaxed">
                                    "{coverLetter || 'Candidate has not provided a cover letter.'}"
                                </p>
                            </div>
                        </section>

                        <section>
                            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em] mb-8">
                                ATS Details
                            </h3>
                            <div className="space-y-8">
                                <div>
                                    <h4 className="text-[9px] font-black text-emerald-600 uppercase tracking-widest mb-4 flex items-center gap-2">
                                        <CheckCircle size={14} /> Skills Matched
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {(atsResult?.matchedSkills || atsResult?.keywordMatches)?.map((s, i) => (
                                            <span
                                                key={i}
                                                className="px-4 py-2 bg-emerald-50 text-emerald-700 rounded-xl text-[9px] font-black uppercase tracking-widest border border-emerald-100"
                                            >
                                                {s}
                                            </span>
                                        )) || (
                                                <span className="text-[10px] text-gray-400 font-bold italic">
                                                    No skills match perfectly.
                                                </span>
                                            )}
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-[9px] font-black text-red-600 uppercase tracking-widest mb-4 flex items-center gap-2">
                                        <AlertTriangle size={14} /> Missing Keywords
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {atsResult?.missingKeywords?.map((s, i) => (
                                            <span
                                                key={i}
                                                className="px-4 py-2 bg-red-50 text-red-800 rounded-xl text-[9px] font-black uppercase tracking-widest border border-red-100"
                                            >
                                                {s}
                                            </span>
                                        )) || (
                                                <span className="text-[10px] text-gray-400 font-bold italic">
                                                    No major gaps identified.
                                                </span>
                                            )}
                                    </div>
                                </div>

                                <div className="p-8 bg-[#0e686eff]/5 rounded-[2rem] border border-[#0e686eff]/10">
                                    <h4 className="text-[9px] font-black text-[#0e686eff] uppercase tracking-widest mb-3">
                                        AI Summary
                                    </h4>
                                    <p className="text-xs font-bold text-gray-500 leading-relaxed italic">
                                        {atsResult?.summary || "Automated summary calculation complete."}
                                    </p>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>

            {/* Sidebar Chat */}
            <div
                className={`fixed inset-y-0 right-0 w-full md:w-[600px] bg-white z-[100] transform transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] border-l border-gray-50 flex flex-col shadow-[0_0_100px_rgba(0,0,0,0.1)] ${showChat ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                <div className="p-12 border-b border-gray-50 flex items-center justify-between bg-white relative">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#0099a7d7]/5 rounded-full blur-[80px] -z-10"></div>
                    <div className="flex items-center gap-6">
                        <div className="w-20 h-20 bg-[#0e686eff] rounded-[1.8rem] flex items-center justify-center text-white text-3xl font-black shadow-2xl">
                            {candidateName.charAt(0)}
                        </div>
                        <div>
                            <h3 className="font-black uppercase tracking-tight text-gray-900 text-2xl">
                                {candidateName}
                            </h3>
                            <div className="text-[10px] font-black text-[#0099a7d7] uppercase tracking-widest flex items-center gap-3">
                                <div className="w-2.5 h-2.5 bg-[#0099a7d7] rounded-full animate-pulse shadow-[0_0_15px_rgba(0,153,167,0.6)]"></div>{' '}
                                Online
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={() => setShowChat(false)}
                        className="w-16 h-16 bg-[#f8fafc] hover:bg-white rounded-2xl flex items-center justify-center transition-all border border-gray-100 text-gray-300 hover:text-red-500 shadow-inner"
                    >
                        <X size={32} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-12 space-y-10 custom-scrollbar bg-slate-50/50">
                    {messages.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center opacity-10 mt-20">
                            <MessageSquare size={100} className="mb-8" />
                            <p className="font-black uppercase tracking-[0.6em] text-xs">No messages yet.</p>
                        </div>
                    ) : (
                        messages.map((m, i) => (
                            <div key={i} className={`flex ${m.senderRole === 'employer' ? 'justify-end' : 'justify-start'}`}>
                                <div
                                    className={`max-w-[85%] p-10 rounded-[3rem] shadow-2xl border relative ${m.senderRole === 'employer'
                                        ? 'bg-[#0e686eff] border-[#0099a7d7]/10 text-white rounded-tr-none'
                                        : 'bg-white text-gray-600 border-gray-100 rounded-tl-none shadow-sm'
                                        }`}
                                >
                                    <p className="font-bold leading-relaxed text-sm">{m.content}</p>
                                    <span
                                        className={`text-[9px] font-black uppercase tracking-widest mt-6 block ${m.senderRole === 'employer' ? 'text-white/40' : 'text-gray-300'
                                            }`}
                                    >
                                        {new Date(m.timestamp).toLocaleTimeString([], {
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </span>
                                </div>
                            </div>
                        ))
                    )}
                    <div ref={chatEndRef} />
                </div>

                <form
                    onSubmit={handleSendMessage}
                    className="p-12 bg-white border-t border-gray-50 flex gap-6 items-end shadow-inner"
                >
                    <textarea
                        value={chatMsg}
                        onChange={(e) => setChatMsg(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-1 px-10 py-8 bg-[#f8fafc] border-none rounded-[2.5rem] focus:ring-8 focus:ring-[#0099a7d7]/5 outline-none font-bold text-gray-800 placeholder-gray-300 transition-all text-xs uppercase resize-none h-24"
                    />
                    <button
                        type="submit"
                        className="bg-[#0e686eff] hover:bg-[#0099a7d7] text-white p-8 rounded-[2rem] transition-all shadow-2xl shadow-teal-900/10 active:scale-95 group"
                    >
                        <Send size={32} className="group-hover:rotate-12 transition-transform" />
                    </button>
                </form>
            </div>

            <StatusModal
                isOpen={statusModalOpen}
                applicant={application}
                onClose={() => setStatusModalOpen(false)}
                actionType={statusAction}
                onConfirm={(id, status, msg) => handleAction(status, msg)}
            />
        </div>
    );
}

