import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {
    CheckCircle,
    HelpCircle,
    XCircle,
    ChevronLeft,
    Download,
    Mail,
    Phone,
    MapPin,
    ExternalLink,
    FileText,
    TrendingUp,
    ShieldCheck,
    AlertTriangle,
    MessageSquare,
    Send,
    RotateCcw
} from "lucide-react";
import { getApplicationById, updateApplicationStatus, getScoreColor } from "../../../services/hrforumService.js";

export default function CandidateProfile() {
    const { applicationId } = useParams();
    const [application, setApplication] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [toast, setToast] = useState(null);
    const [isUpdating, setIsUpdating] = useState(false);
    const [showClarifyModal, setShowClarifyModal] = useState(false);
    const [msgText, setMsgText] = useState("");
    const [previewAction, setPreviewAction] = useState(null); // 'shortlist' | 'clarify' | 'reject'

    useEffect(() => {
        fetchApplicationData();
    }, [applicationId]);

    const fetchApplicationData = async () => {
        try {
            setLoading(true);
            const res = await getApplicationById(applicationId);
            setApplication(res.data);
            setError(null);
        } catch (err) {
            console.error("Error fetching application:", err);
            setError("Failed to load candidate profile. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const showToast = (message, type) => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 4000);
    };

    const handleAction = async (status, customMessage = "") => {
        try {
            setIsUpdating(true);
            const res = await updateApplicationStatus(applicationId, status, customMessage);
            setApplication(res.data);
            showToast(
                status === 'shortlisted' ? "Candidate Shortlisted! ✓" :
                    status === 'rejected' ? "Application Marked as Rejected" :
                        "Clarification Request Sent",
                status === 'shortlisted' ? "success" : status === 'rejected' ? "error" : "warning"
            );
            setShowClarifyModal(false);
            setMsgText("");
        } catch (err) {
            showToast("Failed to update status", "error");
        } finally {
            setIsUpdating(false);
        }
    };

    if (loading) return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-gray-500 font-medium tracking-wide">Analysing Candidate Profile...</p>
            </div>
        </div>
    );

    if (error) return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
            <div className="bg-white border border-red-200 p-8 rounded-2xl shadow-xl max-w-md text-center">
                <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Something went wrong</h3>
                <p className="text-gray-600 mb-6">{error}</p>
                <Link to="/hr-dashboard" className="inline-flex items-center gap-2 text-blue-600 font-bold hover:underline">
                    <ChevronLeft className="w-4 h-4" /> Back to Applicants
                </Link>
            </div>
        </div>
    );

    const { jobId: job, atsResult } = application;

    // Dynamic styles based on status or preview
    const currentStatus = application.status;
    const activeView = previewAction || currentStatus;

    const getDynamicBg = () => {
        switch (activeView) {
            case 'shortlisted': return 'bg-green-50/70';
            case 'rejected': return 'bg-red-50/70';
            case 'clarification': return 'bg-amber-50/70';
            default: return 'bg-slate-50';
        }
    };

    const getStatusStyles = () => {
        switch (currentStatus) {
            case 'shortlisted': return 'bg-green-100 border-green-200 text-green-700 ring-4 ring-green-500/10 shadow-sm';
            case 'rejected': return 'bg-red-100 border-red-200 text-red-700 ring-4 ring-red-500/10 shadow-sm';
            case 'clarification': return 'bg-amber-100 border-amber-200 text-amber-700 ring-4 ring-amber-500/10 shadow-sm';
            default: return 'bg-blue-50 border-blue-100 text-blue-600';
        }
    };

    return (
        <div className={`min-h-screen transition-all duration-700 ease-in-out pb-20 font-sans ${getDynamicBg()}`}>
            <div className="max-w-7xl mx-auto px-6 pt-12">
                <div className="mb-10 flex items-center justify-between">
                    <Link
                        to={`/job-applicants/${job?._id}`}
                        className="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors group font-semibold"
                    >
                        <div className="p-2 bg-white rounded-lg shadow-sm group-hover:bg-blue-50 transition-colors">
                            <ChevronLeft className="w-5 h-5" />
                        </div>
                        <span className="tracking-tight uppercase text-[11px] font-black">Back to Applicants</span>
                    </Link>
                    <div className="flex items-center gap-3">
                        <span className="text-gray-400 text-sm italic">Applied on {new Date(application.appliedAt).toLocaleDateString()}</span>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto grid grid-cols-12 gap-8">

                {/* LEFT COLUMN - Job Details & Skills */}
                <aside className="col-span-12 lg:col-span-3 space-y-6">
                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 sticky top-24">
                        <div className="mb-6 pb-6 border-b border-gray-100">
                            <h2 className="text-xl font-black text-gray-900 leading-tight mb-2 uppercase tracking-tight">
                                {job?.title}
                            </h2>
                            <p className="text-blue-600 font-bold text-sm flex items-center gap-1">
                                {job?.company}
                            </p>
                        </div>

                        <div className="space-y-4 mb-8">
                            <div className="flex items-center gap-3 text-sm text-gray-600">
                                <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400">
                                    <MapPin className="w-4 h-4" />
                                </div>
                                <span>{job?.location}</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-gray-600">
                                <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400">
                                    <FileText className="w-4 h-4" />
                                </div>
                                <span className="capitalize">{job?.employmentType || 'Full-time'}</span>
                            </div>
                        </div>

                        <div className="mb-8">
                            <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Required Skills</h3>
                            <div className="flex flex-wrap gap-2">
                                {(job?.skills || ['SEO', 'Content writing']).map((skill, i) => (
                                    <span key={i} className="px-3 py-1 bg-blue-50 text-blue-700 text-[11px] font-bold rounded-full uppercase">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <Link to={`/hr-jobs/${job?._id}`}>
                            <button className="w-full py-3 bg-gray-900 text-white rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-black transition-all shadow-lg hover:shadow-black/20">
                                View Job Post
                            </button>
                        </Link>
                    </div>
                </aside>

                {/* CENTER COLUMN - Candidate Bio & Resume */}
                <main className="col-span-12 lg:col-span-6 space-y-8">
                    {/* Bio Card */}
                    <div className="bg-white rounded-3xl p-10 shadow-sm border border-gray-100">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                            <div>
                                <h1 className="text-4xl font-black text-gray-900 mb-2 uppercase tracking-tighter">{application.candidateName}</h1>
                                <div className="flex flex-wrap gap-4 text-sm text-gray-500 font-medium">
                                    <span className="flex items-center gap-1.5"><Mail className="w-4 h-4 text-blue-500" /> {application.candidateEmail}</span>
                                    <span className="flex items-center gap-1.5"><Phone className="w-4 h-4 text-green-500" /> +91 945 678 1230</span>
                                </div>
                            </div>
                            <div className="flex flex-col items-end gap-2">
                                <div className={`px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest border-2 transition-all flex items-center gap-2 ${getStatusStyles()}`}>
                                    <div className={`w-2 h-2 rounded-full animate-pulse ${
                                        currentStatus === 'shortlisted' ? 'bg-green-500' :
                                        currentStatus === 'rejected' ? 'bg-red-500' :
                                        currentStatus === 'clarification' ? 'bg-amber-500' : 'bg-blue-500'
                                    }`}></div>
                                    {currentStatus}
                                </div>
                                {currentStatus !== 'applied' && currentStatus !== 'pending' && (
                                    <button 
                                        onClick={() => handleAction('applied')}
                                        className="text-[10px] font-black text-gray-400 hover:text-red-500 uppercase tracking-widest flex items-center gap-1 transition-colors"
                                    >
                                        <RotateCcw className="w-3 h-3" /> Clear Decision
                                    </button>
                                )}
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-4 mb-10 pb-8 border-b border-gray-50">
                            <button
                                onClick={() => handleAction('shortlisted')}
                                onMouseEnter={() => setPreviewAction('shortlisted')}
                                onMouseLeave={() => setPreviewAction(null)}
                                disabled={isUpdating}
                                className={`flex-1 min-w-[140px] flex items-center justify-center gap-2 py-4 rounded-2xl border-2 font-black text-[10px] uppercase tracking-widest transition-all group scale-100 active:scale-95 ${
                                    currentStatus === 'shortlisted' 
                                    ? 'bg-green-500 border-green-500 text-white shadow-xl shadow-green-200' 
                                    : 'border-green-500 text-green-600 hover:bg-green-500 hover:text-white shadow-none hover:shadow-xl hover:shadow-green-200'
                                }`}
                            >
                                <CheckCircle className="w-5 h-5 group-hover:scale-110 transition-transform" /> Shortlist
                            </button>
                            <button
                                onClick={() => setShowClarifyModal(true)}
                                onMouseEnter={() => setPreviewAction('clarification')}
                                onMouseLeave={() => setPreviewAction(null)}
                                className={`flex-1 min-w-[140px] flex items-center justify-center gap-2 py-4 rounded-2xl border-2 font-black text-[10px] uppercase tracking-widest transition-all group scale-100 active:scale-95 ${
                                    currentStatus === 'clarification'
                                    ? 'bg-amber-500 border-amber-500 text-white shadow-xl shadow-amber-200'
                                    : 'border-amber-500 text-amber-600 hover:bg-amber-500 hover:text-white shadow-none hover:shadow-xl hover:shadow-amber-200'
                                }`}
                            >
                                <HelpCircle className="w-5 h-5 group-hover:rotate-12 transition-transform" /> Clarify
                            </button>
                            <button
                                onClick={() => handleAction('rejected')}
                                onMouseEnter={() => setPreviewAction('rejected')}
                                onMouseLeave={() => setPreviewAction(null)}
                                disabled={isUpdating}
                                className={`flex-1 min-w-[140px] flex items-center justify-center gap-2 py-4 rounded-2xl border-2 font-black text-[10px] uppercase tracking-widest transition-all group scale-100 active:scale-95 ${
                                    currentStatus === 'rejected'
                                    ? 'bg-red-500 border-red-500 text-white shadow-xl shadow-red-200'
                                    : 'border-red-500 text-red-600 hover:bg-red-500 hover:text-white shadow-none hover:shadow-xl hover:shadow-red-200'
                                }`}
                            >
                                <XCircle className="w-5 h-5 group-hover:scale-90 transition-transform" /> Reject
                            </button>
                        </div>

                        <section className="mb-10">
                            <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Cover Letter</h3>
                            <div className="bg-gray-50/50 rounded-2xl p-6 border border-gray-50">
                                <p className="text-gray-700 text-[15px] leading-relaxed italic">
                                    "{application.coverLetter || "No cover letter provided by candidate."}"
                                </p>
                            </div>
                        </section>

                        <section>
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">Resume Preview</h3>
                                <button className="flex items-center gap-2 text-xs font-bold text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-all uppercase">
                                    <Download className="w-4 h-4" /> Download PDF
                                </button>
                            </div>
                            <div className="relative group">
                                <div className="absolute inset-x-0 bottom-0 py-8 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-b-2xl pointer-events-none"></div>
                                <img
                                    src="/assets/hr/resume-placeholder.png"
                                    alt="Resume Preview"
                                    className="w-full rounded-2xl border border-gray-100 shadow-sm"
                                    onError={(e) => e.target.src = "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=1000"}
                                />
                                <div className="absolute inset-x-0 bottom-6 flex justify-center opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                                    <button className="bg-white/95 backdrop-blur-sm px-6 py-2 rounded-full font-black text-[10px] uppercase tracking-widest text-gray-900 shadow-xl border border-gray-200 flex items-center gap-2">
                                        <ExternalLink className="w-3 h-3" /> Open in Fullscreen
                                    </button>
                                </div>
                            </div>
                        </section>
                    </div>
                </main>

                {/* RIGHT COLUMN - ATS Analysis */}
                <aside className="col-span-12 lg:col-span-3 space-y-8">
                    {/* ATS Score Card */}
                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-3xl -z-10 -mr-16 -mt-16"></div>

                        <div className="flex items-center gap-3 mb-8">
                            <div className="p-3 bg-gray-900 text-white rounded-xl shadow-lg shadow-black/10">
                                <ShieldCheck className="w-5 h-5" />
                            </div>
                            <h2 className="text-sm font-black text-gray-900 uppercase tracking-widest leading-none">ATS Metrics</h2>
                        </div>

                        {atsResult ? (
                            <div className="space-y-10">
                                {/* Score Meter */}
                                <div className="text-center">
                                    <div className="relative inline-flex items-center justify-center mb-6">
                                        <svg className="w-32 h-32 transform -rotate-90">
                                            <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-gray-100" />
                                            <circle
                                                cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="12" fill="transparent"
                                                strokeDasharray={351.8}
                                                strokeDashoffset={351.8 - (351.8 * atsResult.score) / 100}
                                                strokeLinecap="round"
                                                className={`transition-all duration-1000 ease-out ${atsResult.score >= 80 ? 'text-green-500' :
                                                        atsResult.score >= 50 ? 'text-amber-500' : 'text-red-500'
                                                    }`}
                                            />
                                        </svg>
                                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                                            <span className="text-3xl font-black text-gray-900 leading-none">{atsResult.score}</span>
                                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">%</span>
                                        </div>
                                    </div>
                                    <p className={`text-xs font-black uppercase tracking-widest ${atsResult.score >= 80 ? 'text-green-600' :
                                            atsResult.score >= 50 ? 'text-amber-600' : 'text-red-600'
                                        }`}>
                                        {atsResult.score >= 80 ? 'Strong Match' : atsResult.score >= 50 ? 'Fair Match' : 'Weak Match'}
                                    </p>
                                </div>

                                {/* Matching Stats */}
                                <div className="space-y-4">
                                    <div className="p-4 bg-gray-50 rounded-2xl flex items-center justify-between group hover:bg-blue-50 transition-all cursor-default">
                                        <div className="flex items-center gap-3">
                                            <div className="w-2 h-2 bg-green-500 rounded-full group-hover:scale-150 transition-transform"></div>
                                            <span className="text-xs font-bold text-gray-600 uppercase tracking-wider">Matched</span>
                                        </div>
                                        <span className="text-sm font-black text-gray-900 uppercase">{atsResult.matchedKeywords?.length || 0}</span>
                                    </div>
                                    <div className="p-4 bg-gray-50 rounded-2xl flex items-center justify-between group hover:bg-red-50 transition-all cursor-default">
                                        <div className="flex items-center gap-3">
                                            <div className="w-2 h-2 bg-red-400 rounded-full group-hover:scale-150 transition-transform"></div>
                                            <span className="text-xs font-bold text-gray-600 uppercase tracking-wider">Gaps</span>
                                        </div>
                                        <span className="text-sm font-black text-gray-900 uppercase">{atsResult.missingKeywords?.length || 0}</span>
                                    </div>
                                </div>

                                {/* Matched Keywords */}
                                <div>
                                    <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                                        <TrendingUp className="w-3 h-3 text-green-500" />
                                        Found Keywords
                                    </h3>
                                    <div className="flex flex-wrap gap-1.5">
                                        {(atsResult.matchedKeywords || []).slice(0, 10).map((kw, idx) => (
                                            <span key={idx} className="px-2 py-1 bg-green-50 text-[10px] font-bold text-green-700 rounded-md border border-green-100">
                                                {kw}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Missing / Missing Skills */}
                                <div>
                                    <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                                        <XCircle className="w-3 h-3 text-red-400" />
                                        Missing High-Priority
                                    </h3>
                                    <div className="flex flex-wrap gap-1.5">
                                        {(atsResult.missingKeywords || []).slice(0, 5).map((kw, idx) => (
                                            <span key={idx} className="px-2 py-1 bg-red-50 text-[10px] font-bold text-red-700 rounded-md border border-red-100">
                                                {kw}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-64 text-center">
                                <HelpCircle className="w-10 h-10 text-gray-200 mb-4" />
                                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest uppercase">No Analysis Available</p>
                            </div>
                        )}
                    </div>

                    {/* Suggestions Box */}
                    {atsResult?.suggestions && atsResult.suggestions.length > 0 && (
                        <div className="bg-gradient-to-br from-gray-900 to-black rounded-3xl p-8 shadow-xl text-white">
                            <h3 className="text-xs font-black text-blue-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                                <TrendingUp className="w-4 h-4" /> Intelligent Summary
                            </h3>
                            <div className="space-y-4 text-xs font-medium text-gray-300 leading-relaxed">
                                {atsResult.suggestions.slice(0, 3).map((s, i) => (
                                    <p key={i} className="flex gap-3">
                                        <span className="text-blue-500">◆</span>
                                        {s}
                                    </p>
                                ))}
                            </div>
                        </div>
                    )}
                </aside>
            </div>

            {/* Clarification Modal */}
            {showClarifyModal && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-gray-900/60 backdrop-blur-sm animate-in fade-in duration-300"
                    onClick={() => setShowClarifyModal(false)}
                >
                    <div
                        className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden transform transition-all animate-in zoom-in-95"
                        onClick={e => e.stopPropagation()}
                    >
                        <div className="p-8 pb-0">
                            <h3 className="text-2xl font-black text-gray-900 mb-2 uppercase tracking-tight">Request Info</h3>
                            <p className="text-sm text-gray-500 font-medium">Message will be sent to <span className="text-blue-600 font-bold">{application.candidateName}</span></p>
                        </div>
                        <div className="p-8">
                            <textarea
                                value={msgText}
                                onChange={e => setMsgText(e.target.value)}
                                placeholder="Example: Could you share more details about your Google Ads experience or provide your portfolio link?"
                                className="w-full h-40 p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all outline-none text-sm font-medium"
                            />
                            <div className="flex gap-4 mt-8">
                                <button
                                    onClick={() => handleAction('clarification', msgText)}
                                    disabled={!msgText.trim() || isUpdating}
                                    className="flex-1 py-4 bg-gray-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-black transition-all shadow-xl disabled:bg-gray-300 flex items-center justify-center gap-2"
                                >
                                    <Send className="w-4 h-4" /> Send Request
                                </button>
                                <button
                                    onClick={() => setShowClarifyModal(false)}
                                    className="px-8 py-4 bg-white text-gray-500 border border-gray-100 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-gray-50 transition-all"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Toast System */}
            {toast && (
                <div className={`fixed bottom-10 right-10 z-[60] px-8 py-5 rounded-3xl shadow-2xl border-2 flex items-center gap-4 animate-in slide-in-from-right-10 duration-500 ${toast.type === "success" ? "bg-green-50 border-green-200 text-green-700" :
                        toast.type === "error" ? "bg-red-50 border-red-200 text-red-700" :
                            "bg-amber-50 border-amber-200 text-amber-700"
                    }`}>
                    {toast.type === 'success' && <CheckCircle className="w-6 h-6" />}
                    {toast.type === 'error' && <XCircle className="w-6 h-6" />}
                    {toast.type === 'warning' && <MessageSquare className="w-6 h-6" />}
                    <div className="flex flex-col">
                        <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Success</span>
                        <p className="font-bold tracking-tight">{toast.message}</p>
                    </div>
                </div>
            )}
        </div>
    );
}
