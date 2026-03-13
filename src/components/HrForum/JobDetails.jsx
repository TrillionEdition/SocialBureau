import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import * as hrforumService from "../../../services/hrforumService.js";
import { getUserData } from "../../../utils/authUtils";
import { 
    Briefcase, 
    MapPin, 
    Clock, 
    ChevronLeft, 
    Send, 
    ExternalLink,
    AlertCircle,
    Info,
    MessageSquare,
    Bookmark,
    ArrowLeft,
    Share2,
    DollarSign,
    Zap,
    Shield,
    CheckCircle,
    X,
    TrendingUp
} from "lucide-react";
import ApplyModal from "./ApplyModal";
import HrNavbar from "./HrNavbar";

export default function JobDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [job, setJob] = useState(null);
    const [userApplication, setUserApplication] = useState(null);
    const [isSaved, setIsSaved] = useState(false);
    const [loading, setLoading] = useState(true);
    const [showApplyModal, setShowApplyModal] = useState(false);
    const [isApplying, setIsApplying] = useState(false);
    const [chatMsg, setChatMsg] = useState("");
    const [showLoginPrompt, setShowLoginPrompt] = useState(false);
    const chatEndRef = useRef(null);
    const currentUser = getUserData();

    useEffect(() => {
        if (id) {
            fetchJobDetails();
        }
    }, [id]);

    useEffect(() => {
        scrollToBottom();
    }, [userApplication?.messages]);

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const fetchJobDetails = async () => {
        try {
            setLoading(true);
            const response = await hrforumService.getJobById(id);
            setJob(response.data);
            
            if (currentUser) {
                const userId = currentUser._id || currentUser.id;
                const [app, saved] = await Promise.all([
                    hrforumService.getUserApplicationForJob(userId, id),
                    hrforumService.checkIfJobSaved(userId, id)
                ]);
                setUserApplication(app);
                setIsSaved(saved);
            }
        } catch (error) {
            console.error("Error fetching job details:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!chatMsg.trim() || !userApplication) return;
        try {
            await hrforumService.addMessage(userApplication._id, chatMsg, 'candidate', currentUser?._id || currentUser?.id);
            setChatMsg("");
            fetchJobDetails();
        } catch (err) {
            console.error("Chat error:", err);
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
            await hrforumService.submitApplication(id, userId, formData);
            setShowApplyModal(false);
            fetchJobDetails();
        } catch (error) {
            alert(error.response?.data?.message || "Deployment failed");
        } finally {
            setIsApplying(false);
        }
    };

    const handleSave = async () => {
        if (!currentUser) {
            setShowLoginPrompt(true);
            return;
        }
        try {
            const userId = currentUser._id || currentUser.id;
            await hrforumService.saveJob(id, userId);
            setIsSaved(true);
        } catch (error) {
            console.error("Save error:", error);
        }
    };

    if (loading) return (
        <div className="min-h-screen bg-[#F5F7FB] flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0e686eff]"></div>
        </div>
    );

    if (!job) return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center p-10">
            <AlertCircle size={64} className="text-red-500 mb-6" />
            <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tighter">Mission Not Detected</h2>
            <button onClick={() => navigate(-1)} className="mt-8 text-[#0099a7d7] font-black uppercase tracking-widest text-xs hover:underline">Return to Hub</button>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#F5F7FB] font-sans antialiased text-[#2d2d2d] selection:bg-[#0099a7d7] selection:text-white">
            <HrNavbar />

            {/* Sub-Header */}
            <div className="bg-white border-b border-gray-100 px-8 py-5 flex items-center justify-between sticky top-16 z-40 shadow-sm">
                <div className="flex items-center gap-6">
                    <button onClick={() => navigate(-1)} className="w-12 h-12 bg-[#f8fafc] hover:bg-white rounded-2xl flex items-center justify-center transition-all border border-gray-100 shadow-sm text-gray-400 hover:text-[#0099a7d7]">
                        <ChevronLeft size={24} />
                    </button>
                    <div>
                        <h1 className="text-xl font-black uppercase tracking-tight text-gray-900">Mission Intelligence</h1>
                        <p className="text-[10px] font-black text-[#0099a7d7] uppercase tracking-[0.2em]">{job.jobTitle}</p>
                    </div>
                </div>
                <div className="flex gap-4">
                    <button className="flex items-center gap-2 text-gray-400 hover:text-[#0099a7d7] font-black text-[10px] uppercase tracking-widest transition-all">
                        <Share2 size={18} /> Protocol Share
                    </button>
                </div>
            </div>

            <main className="max-w-[1200px] mx-auto px-8 py-16 pb-32">
                <div className="bg-white rounded-[4rem] border border-gray-100 shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-700">
                    {/* Header Section */}
                    <div className="p-16 border-b border-gray-50 bg-gradient-to-br from-[#0e686eff]/5 to-transparent relative">
                        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#0099a7d7]/5 rounded-full blur-[100px] -z-10 -mr-48 -mt-48"></div>
                        
                        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-12">
                            <div className="flex-1">
                                <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-6 uppercase tracking-tighter leading-none">{job.jobTitle}</h1>
                                <div className="flex flex-col gap-3">
                                    <p className="text-3xl font-bold text-[#0e686eff] hover:underline cursor-pointer tracking-tight leading-none mb-2">{job.companyName}</p>
                                    <p className="text-gray-400 flex items-center gap-2 font-black uppercase tracking-widest text-[10px]">
                                        <MapPin size={18} className="text-[#0099a7d7]" /> {job.location} | <Clock size={18} className="text-[#0099a7d7]" /> {new Date(job.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                            <div className="bg-[#0e686eff] w-28 h-28 rounded-[2rem] flex items-center justify-center text-white text-5xl font-black shadow-2xl border border-white/20 shrink-0">
                                {job.companyName?.charAt(0) || 'C'}
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-4">
                            {userApplication ? (
                                <div className="bg-emerald-50 text-emerald-700 font-black px-12 py-6 rounded-[2rem] border-2 border-emerald-100 flex items-center gap-4 text-[10px] uppercase tracking-widest shadow-xl shadow-emerald-900/5">
                                    <CheckCircle size={22} /> Signal Synchronized ({userApplication.status})
                                </div>
                            ) : (
                                <button 
                                    onClick={() => setShowApplyModal(true)}
                                    className="bg-[#0e686eff] hover:bg-[#0099a7d7] text-white font-black uppercase tracking-widest text-[11px] px-14 py-6 rounded-[2rem] transition-all active:scale-95 shadow-2xl shadow-teal-900/10 flex items-center gap-4 group"
                                >
                                    Initialize Deployment <Zap size={22} className="group-hover:fill-current" />
                                </button>
                            )}
                            <button 
                                onClick={handleSave}
                                className={`px-10 py-6 border rounded-[2rem] font-black uppercase tracking-widest text-[10px] flex items-center gap-4 transition-all shadow-xl active:scale-95 ${
                                    isSaved ? 'bg-amber-50 border-amber-200 text-amber-600' : 'bg-white border-gray-100 text-gray-400 hover:text-[#0099a7d7] hover:border-[#0099a7d7]/20 shadow-sm'
                                }`}
                            >
                                <Bookmark size={20} className={isSaved ? "fill-current" : ""} /> {isSaved ? 'Archived' : 'Archive Mission'}
                            </button>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-16 space-y-24">
                        {/* Job Details Grid */}
                        <section>
                            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em] mb-12">Deployment Parameters</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                                <DetailItem 
                                    icon={<DollarSign size={28} className="text-[#0e686eff]" />} 
                                    label="Budget Uplink" 
                                    value={job.payRange ? `₹${job.payRange.max.toLocaleString()} / mo` : "Competitive"} 
                                />
                                <DetailItem 
                                    icon={<Briefcase size={28} className="text-[#0e686eff]" />} 
                                    label="Sector Type" 
                                    value={job.jobTypes?.[0] || "Strategic"} 
                                />
                                <DetailItem 
                                    icon={<MapPin size={28} className="text-[#0e686eff]" />} 
                                    label="Node Protocol" 
                                    value={job.locationType || "In Situ"} 
                                />
                                <DetailItem 
                                    icon={<TrendingUp size={28} className="text-[#0e686eff]" />} 
                                    label="Fidelity" 
                                    value="High Priority" 
                                />
                            </div>
                        </section>

                        {/* Full Description */}
                        <section className="bg-[#f8fafc] rounded-[4rem] p-16 border border-gray-50 relative group overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-[#0e686eff]/5 rounded-full blur-[80px] -z-10 -mr-32 -mt-32"></div>
                            <h2 className="text-3xl font-black text-gray-900 mb-10 uppercase tracking-tighter flex items-center gap-4 leading-none">
                                <Info size={32} className="text-[#0099a7d7]" /> Full Tactical Brief
                            </h2>
                            <div className="prose prose-xl max-w-none text-gray-600 leading-relaxed font-bold italic border-l-8 border-[#0e686eff]/10 pl-12 whitespace-pre-wrap">
                                "{job.description}"
                            </div>
                            {job.about && (
                                <div className="mt-16 pt-16 border-t border-gray-100">
                                    <h3 className="text-[10px] font-black text-[#0099a7d7] uppercase tracking-[0.4em] mb-4">Corporate Entity</h3>
                                    <p className="text-gray-400 text-sm font-bold leading-relaxed">{job.about}</p>
                                </div>
                            )}
                        </section>

                        {/* Communication for Applicants */}
                        {userApplication && (
                            <section>
                                <div className="bg-white rounded-[4rem] border border-gray-100 overflow-hidden flex flex-col h-[700px] shadow-[0_40px_100px_rgba(0,0,0,0.08)]">
                                    <div className="p-10 bg-[#0e686eff] text-white flex items-center justify-between">
                                        <div className="flex items-center gap-6">
                                            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center border border-white/5 shadow-inner"><MessageSquare size={28} /></div>
                                            <div>
                                                <h3 className="text-xl font-black uppercase tracking-tight leading-none mb-1">Secure Signal Channel</h3>
                                                <p className="text-[9px] font-black text-[#0099a7d7] uppercase tracking-widest flex items-center gap-2">
                                                    <div className="w-2 h-2 bg-[#0099a7d7] rounded-full animate-pulse"></div> Encrypted Link Transmitting
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex-1 overflow-y-auto p-12 space-y-10 custom-scrollbar bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]">
                                        {userApplication.messages?.length === 0 ? (
                                            <div className="h-full flex flex-col items-center justify-center text-center opacity-10 py-20">
                                                <Zap size={100} className="mb-8" />
                                                <p className="font-black uppercase tracking-[0.6em] text-xs">Waiting for Signal Receipt.</p>
                                            </div>
                                        ) : (
                                            userApplication.messages.map((m, i) => (
                                                <div key={i} className={`flex ${m.senderRole === 'candidate' ? 'justify-end' : 'justify-start'}`}>
                                                    <div className={`max-w-[85%] p-10 rounded-[3rem] shadow-2xl text-sm border relative ${
                                                        m.senderRole === 'candidate' 
                                                        ? 'bg-[#0e686eff] border-[#0099a7d7]/10 text-white rounded-tr-none' 
                                                        : 'bg-white text-gray-600 border-gray-100 rounded-tl-none shadow-sm'
                                                    }`}>
                                                        <p className="font-bold leading-relaxed text-sm mb-4">{m.content}</p>
                                                        <span className={`text-[9px] font-black uppercase tracking-widest block ${
                                                            m.senderRole === 'candidate' ? 'text-[#0099a7d7]' : 'text-gray-400'
                                                        }`}>
                                                            {new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                        </span>
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                        <div ref={chatEndRef} />
                                    </div>
                                    <form onSubmit={handleSendMessage} className="p-12 bg-white border-t border-gray-50 flex gap-6 items-center">
                                        <input 
                                            type="text"
                                            value={chatMsg}
                                            onChange={(e) => setChatMsg(e.target.value)}
                                            placeholder="Transmit signal update node..."
                                            className="flex-1 px-10 py-8 bg-[#f8fafc] border-none rounded-[2.5rem] focus:ring-8 focus:ring-[#0099a7d7]/5 outline-none font-black text-gray-800 placeholder-gray-300 transition-all font-mono text-[11px] uppercase"
                                        />
                                        <button type="submit" className="bg-[#0e686eff] hover:bg-[#0099a7d7] text-white p-8 rounded-[2rem] shadow-2xl shadow-teal-900/10 active:scale-95 transition-all">
                                            <Send size={32} />
                                        </button>
                                    </form>
                                </div>
                            </section>
                        )}
                    </div>
                </div>
            </main>

            {showApplyModal && (
                <ApplyModal 
                    isOpen={showApplyModal}
                    jobTitle={job.jobTitle}
                    onClose={() => setShowApplyModal(false)}
                    onSubmit={handleApply}
                    isSubmitting={isApplying}
                />
            )}

            {showLoginPrompt && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="bg-white rounded-[4rem] p-16 max-w-sm w-full shadow-2xl text-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#0099a7d7]/5 rounded-full blur-2xl"></div>
                        <div className="w-24 h-24 bg-blue-50 text-[#0e686eff] rounded-[2rem] flex items-center justify-center mx-auto mb-10 border border-blue-100 shadow-inner">
                            <Shield size={48} />
                        </div>
                        <h2 className="text-3xl font-black text-gray-900 mb-4 uppercase tracking-tighter leading-none">Auth Uplink Required</h2>
                        <p className="text-gray-400 font-bold mb-12 text-xs uppercase tracking-widest leading-relaxed">Establish identification profile to synchronize with mission deployment.</p>
                        <div className="flex flex-col gap-4">
                            <Link to="/login" className="w-full py-6 bg-[#0e686eff] text-white rounded-[1.5rem] font-black uppercase tracking-widest text-[11px] hover:bg-[#0099a7d7] transition-all shadow-2xl shadow-teal-900/10">Initialize Sync</Link>
                            <button onClick={() => setShowLoginPrompt(false)} className="w-full py-6 bg-gray-50 text-gray-400 rounded-[1.5rem] font-black uppercase tracking-widest text-[11px] hover:bg-white transition-all">Standby</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

const DetailItem = ({ icon, label, value }) => (
    <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm flex flex-col gap-6 group hover:shadow-xl hover:border-[#0099a7d7]/20 transition-all">
        <div className="w-20 h-20 bg-[#f8fafc] rounded-[1.8rem] flex items-center justify-center shrink-0 border border-gray-100 shadow-inner group-hover:bg-[#0e686eff] group-hover:text-white transition-all">
            {icon}
        </div>
        <div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em] mb-2">{label}</p>
            <p className="text-xl font-black text-gray-900 leading-tight uppercase tracking-tight">{value}</p>
        </div>
    </div>
);

