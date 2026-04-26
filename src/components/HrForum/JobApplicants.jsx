import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import * as hrforumService from "@/services/hrforumService.js";
import { getUserData } from "@/utils/authUtils";
import { 
    Users, 
    ChevronLeft, 
    Search,
    Filter,
    CheckCircle,
    XCircle,
    Clock,
    Briefcase,
    Mail,
    Phone,
    ArrowUpRight,
    Star,
    MoreHorizontal,
    FileText,
    TrendingUp,
    Zap,
    MessageSquare,
    Send,
    AlertCircle,
    Info,
    X
} from "lucide-react";
import HrNavbar from "./HrNavbar";

export default function JobApplicants() {
    const { jobId } = useParams();
    const navigate = useNavigate();
    const [applicants, setApplicants] = useState([]);
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [showBulkMsgModal, setShowBulkMsgModal] = useState(false);
    const [bulkMsg, setBulkMsg] = useState("");
    const [isBulkSending, setIsBulkSending] = useState(false);
    const currentUser = getUserData();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [jobRes, appsRes] = await Promise.all([
                    hrforumService.getJobById(jobId),
                    hrforumService.getJobApplicants(jobId)
                ]);
                setJob(jobRes.data);
                setApplicants(appsRes.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [jobId]);

    const handleBulkMessage = async (e) => {
        e.preventDefault();
        if (!bulkMsg.trim()) return;
        try {
            setIsBulkSending(true);
            await hrforumService.bulkMessage({
                jobId,
                content: bulkMsg,
                senderId: currentUser?._id || currentUser?.id
            });
            alert(`Message sent to ${applicants.length} applicants successfully! ✓`);
            setBulkMsg("");
            setShowBulkMsgModal(false);
        } catch (err) {
            alert("Bulk transmission failed.");
        } finally {
            setIsBulkSending(false);
        }
    };

    const filteredApplicants = applicants.filter(app => {
        const matchesSearch = (app.candidateName || "").toLowerCase().includes(searchTerm.toLowerCase()) || 
                             (app.candidateEmail || "").toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === "all" || app.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    if (loading) return (
        <div className="min-h-screen bg-[#F5F7FB] flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0e686eff]"></div>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#F5F7FB] font-sans antialiased text-[#2d2d2d] selection:bg-[#0099a7d7] selection:text-white">
            <HrNavbar />

            <div className="max-w-[1700px] mx-auto p-8 lg:p-12 flex flex-col lg:flex-row gap-12">
                
                {/* LEFT: JOB CONTEXT */}
                <aside className="lg:w-[400px] space-y-8 lg:sticky lg:top-28 h-fit">
                    <div className="bg-white rounded-[3rem] p-10 shadow-sm border border-gray-100 overflow-hidden relative group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#0e686eff]/5 rounded-full blur-2xl -mr-16 -mt-16 group-hover:bg-[#0099a7d7]/10 transition-all"></div>
                        
                        <div className="flex items-center gap-6 mb-10">
                            <div className="w-16 h-16 bg-[#0e686eff] rounded-2xl flex items-center justify-center text-white text-2xl font-black shadow-xl">
                                <Briefcase size={28} />
                            </div>
                            <div>
                                <h2 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em] mb-1">Job Details</h2>
                                <p className="text-2xl font-black text-gray-900 leading-none uppercase tracking-tighter">{job?.jobTitle}</p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="p-6 bg-[#f8fafc] rounded-2xl border border-gray-100">
                                <h3 className="text-[9px] font-black text-[#0099a7d7] uppercase tracking-widest mb-3 flex items-center gap-2"><Info size={14}/> Description</h3>
                                <p className="text-xs text-gray-500 font-bold leading-relaxed line-clamp-4 italic border-l-4 border-[#0099a7d7]/10 pl-4">
                                    "{job?.description}"
                                </p>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 bg-white border border-gray-100 rounded-xl">
                                    <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1">Budget</p>
                                    <p className="text-lg font-black text-gray-800 leading-none">₹{job?.payRange?.max?.toLocaleString() || "N/A"}</p>
                                </div>
                                <div className="p-4 bg-white border border-gray-100 rounded-xl">
                                    <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1">Location</p>
                                    <p className="text-lg font-black text-gray-800 leading-none">{job?.location}</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="mt-10 pt-10 border-t border-gray-50 flex flex-col gap-4">
                            <button 
                                onClick={() => setShowBulkMsgModal(true)}
                                className="w-full bg-[#0e686eff] hover:bg-[#0099a7d7] text-white font-black uppercase tracking-widest text-[10px] py-5 rounded-2xl shadow-xl shadow-teal-900/10 transition-all flex items-center justify-center gap-3 active:scale-95"
                            >
                                <MessageSquare size={18} /> Message All
                            </button>
                            <Link to={`/job-details/${jobId}`} className="text-center text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-[#0099a7d7] py-2">View Job Details</Link>
                        </div>
                    </div>

                    <div className="bg-[#0099a7d7]/5 rounded-[3rem] p-10 border border-[#0099a7d7]/10">
                        <h3 className="text-[10px] font-black text-[#0099a7d7] uppercase tracking-[0.4em] mb-6 flex items-center gap-3"><Zap size={16} className="fill-current"/> Applicant Insights</h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center text-xs font-black uppercase tracking-widest">
                                <span className="text-gray-400">Total Applicants</span>
                                <span className="text-gray-900">{applicants.length}</span>
                            </div>
                            <div className="flex justify-between items-center text-xs font-black uppercase tracking-widest">
                                <span className="text-gray-400">Strong Matches (80%+)</span>
                                <span className="text-emerald-500">{applicants.filter(a => (a.atsResult?.score || 0) >= 80).length}</span>
                            </div>
                            <div className="flex justify-between items-center text-xs font-black uppercase tracking-widest">
                                <span className="text-gray-400">Shortlisted</span>
                                <span className="text-[#0e686eff]">{applicants.filter(a => a.status === 'shortlisted').length}</span>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* RIGHT: APPLICANT LIST */}
                <main className="flex-1 space-y-10">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-10 border-b border-gray-200">
                        <div className="flex-1 max-w-xl relative group">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-[#0099a7d7] group-focus-within:text-[#0e686eff] transition-colors" size={20} />
                            <input 
                                type="text"
                                placeholder="Search applicants by name..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-16 pr-8 py-5 bg-white border border-gray-100 rounded-2xl text-[10px] font-black uppercase tracking-widest focus:ring-8 focus:ring-[#0099a7d7]/5 focus:border-[#0099a7d7] shadow-sm outline-none transition-all placeholder:text-gray-300"
                            />
                        </div>
                        <div className="flex gap-2 p-2 bg-white rounded-2xl border border-gray-100 shadow-sm scroll-x-auto">
                            {["all", "shortlisted", "selected", "rejected"].map(s => (
                                <button 
                                    key={s} 
                                    onClick={() => setStatusFilter(s)}
                                    className={`px-6 py-3 rounded-[1.2rem] text-[9px] font-black uppercase tracking-widest transition-all ${
                                        statusFilter === s 
                                        ? 'bg-[#0e686eff] text-white shadow-xl shadow-teal-900/10' 
                                        : 'text-gray-400 hover:bg-gray-50'
                                    }`}
                                >
                                    {s}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {filteredApplicants.length === 0 ? (
                            <div className="col-span-full py-32 text-center bg-white rounded-[3rem] border border-dashed border-gray-200 opacity-20">
                                <Users size={64} className="mx-auto mb-6" />
                                <p className="text-xl font-black uppercase tracking-[0.4em]">No applicants found.</p>
                            </div>
                        ) : (
                            filteredApplicants.map(app => (
                                <div key={app._id} className="bg-white rounded-[3rem] border border-gray-100 p-10 shadow-sm hover:shadow-2xl hover:border-[#0099a7d7]/20 transition-all group relative overflow-hidden flex flex-col">
                                    <div className="absolute top-0 right-0 w-48 h-48 bg-[#0099a7d7]/5 rounded-full blur-[60px] -z-10 -mr-24 -mt-24 group-hover:bg-[#0e686eff]/10 transition-all"></div>
                                    
                                    <div className="flex justify-between items-start mb-10">
                                        <div className="w-20 h-20 bg-[#f8fafc] border-2 border-gray-50 rounded-[1.5rem] flex items-center justify-center text-[#0e686eff] text-3xl font-black group-hover:bg-[#0e686eff] group-hover:text-white transition-all shadow-inner group-hover:shadow-2xl group-hover:scale-105">
                                            {app.candidateName.charAt(0)}
                                        </div>
                                        <div className="text-right">
                                            <div className={`text-[9px] font-black uppercase tracking-widest px-4 py-1.5 rounded-xl mb-3 inline-block border ${
                                                app.status === 'shortlisted' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                                                app.status === 'rejected' ? 'bg-red-50 text-red-600 border-red-100' : 'bg-blue-50 text-blue-700 border-blue-100'
                                            }`}>
                                                {app.status}
                                            </div>
                                            <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest flex items-center justify-end gap-1"><Clock size={12} /> {new Date(app.createdAt || app.appliedAt).toLocaleDateString()}</p>
                                        </div>
                                    </div>

                                    <div className="flex-1">
                                        <h3 className="text-3xl font-black text-gray-900 mb-2 uppercase tracking-tighter leading-none group-hover:text-[#0e686eff] transition-colors">{app.candidateName}</h3>
                                        <div className="flex flex-col gap-1 mb-8">
                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2 truncate"><Mail size={16} className="text-[#0099a7d7]" /> {app.candidateEmail}</p>
                                        </div>

                                        {app.atsResult && (
                                            <div className="mb-10 p-6 bg-[#f8fafc] rounded-3xl border border-gray-100 flex items-center justify-between group-hover:bg-white transition-all shadow-inner group-hover:shadow-sm">
                                                <div>
                                                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1 leading-none">Match Score</p>
                                                    <p className="text-2xl font-black text-[#0e686eff] tracking-tighter">{app.atsResult.score}%</p>
                                                </div>
                                                <div className="flex gap-1">
                                                    {[1,2,3,4,5].map(s => (
                                                        <Star key={s} size={14} className={s <= Math.round(app.atsResult.score / 20) ? "fill-[#0099a7d7] text-[#0099a7d7]" : "text-gray-200"} />
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex gap-3 mt-auto">
                                        <Link 
                                            to={`/candidate-profile/${app._id}`}
                                            className="flex-1 flex items-center justify-center gap-3 py-5 bg-[#0e686eff] hover:bg-[#0099a7d7] text-white rounded-[1.5rem] font-black uppercase tracking-widest text-[10px] transition-all shadow-xl active:scale-95 group shadow-teal-900/10"
                                        >
                                            View Profile <ArrowUpRight size={18} />
                                        </Link>
                                        <button className="p-5 bg-white border border-gray-100 rounded-[1.5rem] text-gray-300 hover:text-[#0e686eff] hover:bg-white hover:border-[#0e686eff]/20 transition-all shadow-sm">
                                            <MessageSquare size={22} />
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </main>
            </div>

            {/* Broadcast Comms Modal */}
            {showBulkMsgModal && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="bg-white rounded-[3.5rem] p-12 max-w-xl w-full shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-48 h-48 bg-[#0099a7d7]/5 rounded-full blur-[60px] -z-10"></div>
                        <button onClick={() => setShowBulkMsgModal(false)} className="absolute top-8 right-8 text-gray-300 hover:text-red-500 transition-colors"><X size={24}/></button>
                        
                        <div className="flex items-center gap-6 mb-10">
                            <div className="w-16 h-16 bg-[#0e686eff] rounded-2xl flex items-center justify-center text-white shadow-xl">
                                <Zap size={32} className="fill-current" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tighter">Send Message</h2>
                                <p className="text-[10px] font-black text-[#0099a7d7] uppercase tracking-widest">To {applicants.length} Applicants</p>
                            </div>
                        </div>

                        <form onSubmit={handleBulkMessage} className="space-y-8">
                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Message Content</label>
                                <textarea
                                    required
                                    value={bulkMsg}
                                    onChange={(e) => setBulkMsg(e.target.value)}
                                    placeholder="Enter your message here..."
                                    className="w-full h-48 p-8 bg-[#f8fafc] border border-gray-100 rounded-[2.5rem] focus:outline-none focus:ring-8 focus:ring-[#0099a7d7]/5 focus:border-[#0099a7d7] text-sm font-bold resize-none transition-all placeholder:text-gray-300"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isBulkSending}
                                className="w-full py-6 bg-[#0e686eff] hover:bg-[#0099a7d7] text-white rounded-[2rem] font-black uppercase tracking-widest text-[11px] transition-all flex items-center justify-center gap-4 disabled:opacity-50 shadow-2xl shadow-teal-900/10 active:scale-95"
                            >
                                {isBulkSending ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><Send size={22} /> Send to All</>}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}



