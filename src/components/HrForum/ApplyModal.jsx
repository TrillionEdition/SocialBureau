import React, { useState, useEffect, useRef } from 'react';
import { X, Upload, Send, AlertCircle, FileText, CheckCircle, Zap, Phone, MessageSquare, User, Clock, CheckCircle2 } from 'lucide-react';
import * as hrforumService from "../../../services/hrforumService";
import { getUserData } from "../../../utils/authUtils";

export default function ApplyModal({ isOpen, onClose, onSubmit, jobTitle, isSubmitting: parentSubmitting, applicationId }) {
    const [formData, setFormData] = useState({
        candidateName: '',
        candidateEmail: '',
        candidatePhone: '',
        coverLetter: '',
        resume: null,
        relocationInterest: false
    });
    const [dragActive, setDragActive] = useState(false);

    // Chat inside modal state
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [isSending, setIsSending] = useState(false);
    const chatEndRef = useRef(null);
    const pollInterval = useRef(null);

    useEffect(() => {
        if (applicationId && isOpen) {
            fetchMessages();
            pollInterval.current = setInterval(fetchMessages, 5000);
        }
        return () => {
            if (pollInterval.current) clearInterval(pollInterval.current);
        };
    }, [applicationId, isOpen]);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const fetchMessages = async () => {
        if (!applicationId) return;
        try {
            const res = await hrforumService.getApplicationById(applicationId);
            if (res.data?.messages) {
                setMessages(res.data.messages);
            }
        } catch (err) {
            console.error("Scale Chat Error:", err);
        }
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim() || !applicationId || isSending) return;

        try {
            setIsSending(true);
            const user = getUserData();
            await hrforumService.addMessage(applicationId, newMessage, 'candidate', user?._id || user?.id);
            setNewMessage("");
            fetchMessages();
        } catch (err) {
            console.error("Send Error:", err);
        } finally {
            setIsSending(false);
        }
    };

    if (!isOpen) return null;

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) setFormData({ ...formData, resume: file });
    };

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
        else if (e.type === "dragleave") setDragActive(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setFormData({ ...formData, resume: e.dataTransfer.files[0] });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.resume) {
            alert("Please upload your resume to apply.");
            return;
        }
        onSubmit(formData);
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white rounded-[3rem] shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col max-h-[95vh] animate-in zoom-in-95 duration-300 border border-white/20">
                {/* Header */}
                <div className="p-10 border-b bg-[#f8fafc] relative">
                    <button
                        onClick={onClose}
                        className="absolute top-8 right-8 p-3 hover:bg-gray-100 rounded-2xl transition-all border border-gray-100 text-gray-400 hover:text-red-500"
                    >
                        <X size={24} />
                    </button>
                    <div className="flex items-center gap-6 mb-2">
                        <div className="w-16 h-16 bg-[#0e686eff] rounded-[1.5rem] flex items-center justify-center text-white shadow-xl shadow-teal-900/10 border border-white/10">
                            {applicationId ? <MessageSquare size={32} /> : <Zap size={32} className="fill-current" />}
                        </div>
                        <div>
                            <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tighter">
                                {applicationId ? "Application Submitted" : "Apply for Job"}
                            </h2>
                            <p className="text-[#0099a7d7] font-black text-[10px] uppercase tracking-widest">{jobTitle}</p>
                        </div>
                    </div>
                </div>

                {applicationId ? (
                    
                    <div className="flex-1 overflow-hidden flex flex-col h-[500px]">
                        <div className="p-10 bg-emerald-50 border-b border-emerald-100 flex items-center gap-4">
                            <CheckCircle2 className="text-emerald-500" size={24} />
                            <div>
                                <p className="text-xs font-black text-emerald-800 uppercase tracking-widest leading-none mb-1">Success!</p>
                                <p className="text-[10px] text-emerald-600 font-bold">Your application has been delivered. You can now chat with the employer below.</p>
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto p-10 space-y-6 custom-scrollbar bg-slate-50/50">
                            {messages.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center opacity-20 py-20">
                                    <MessageSquare size={60} className="mb-4" />
                                    <p className="font-black uppercase tracking-[0.2em] text-[10px]">No messages yet. Send a greeting!</p>
                                </div>
                            ) : (
                                messages.map((m, i) => {
                                    const isMine = m.senderRole === 'candidate';
                                    return (
                                        <div key={i} className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}>
                                            <div className={`max-w-[80%] p-6 rounded-[2rem] shadow-sm text-sm font-bold ${isMine
                                                    ? 'bg-[#0e686eff] text-white rounded-tr-none'
                                                    : 'bg-white text-gray-600 border border-gray-100 rounded-tl-none'
                                                }`}>
                                                <p>{m.content}</p>
                                                <span className={`text-[8px] mt-2 block opacity-40 uppercase tracking-widest ${isMine ? 'text-right' : ''}`}>
                                                    {new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </span>
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                            <div ref={chatEndRef} />
                        </div>

                        <form onSubmit={handleSendMessage} className="p-8 bg-white border-t border-gray-100 flex gap-4 items-center">
                            <input
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                placeholder="Type a message to the employer..."
                                className="flex-1 px-8 py-5 bg-[#f8fafc] border border-gray-100 rounded-2xl focus:ring-4 focus:ring-[#0099a7d7]/5 outline-none font-bold text-gray-800 placeholder-gray-300 text-xs"
                            />
                            <button
                                type="submit"
                                disabled={!newMessage.trim() || isSending}
                                className="bg-[#0e686eff] hover:bg-[#0099a7d7] text-white p-5 rounded-2xl shadow-xl transition-all active:scale-95 disabled:opacity-50"
                            >
                                <Send size={24} />
                            </button>
                        </form>
                    </div>
                ) : (
                    /* Initial Application Form */
                    <>
                        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-12 space-y-10 custom-scrollbar">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                                {/* Left Side: Contact Info */}
                                <div className="space-y-8">
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Full Name</label>
                                        <input
                                            required
                                            type="text"
                                            placeholder="Enter your name"
                                            className="w-full px-8 py-5 bg-[#f8fafc] border border-gray-100 rounded-2xl focus:ring-4 focus:ring-[#0099a7d7]/10 focus:border-[#0099a7d7] transition-all outline-none font-bold text-gray-800 placeholder-gray-300 text-sm uppercase tracking-tight"
                                            value={formData.candidateName}
                                            onChange={(e) => setFormData({ ...formData, candidateName: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Email Address</label>
                                        <input
                                            required
                                            type="email"
                                            placeholder="name@example.com"
                                            className="w-full px-8 py-5 bg-[#f8fafc] border border-gray-100 rounded-2xl focus:ring-4 focus:ring-[#0099a7d7]/10 focus:border-[#0099a7d7] transition-all outline-none font-bold text-gray-800 placeholder-gray-300 text-sm uppercase tracking-tight"
                                            value={formData.candidateEmail}
                                            onChange={(e) => setFormData({ ...formData, candidateEmail: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Phone Number</label>
                                        <div className="relative">
                                            <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300"><Phone size={18} /></div>
                                            <input
                                                required
                                                type="tel"
                                                placeholder="+91 XXXXX XXXXX"
                                                className="w-full pl-16 pr-8 py-5 bg-[#f8fafc] border border-gray-100 rounded-2xl focus:ring-4 focus:ring-[#0099a7d7]/10 focus:border-[#0099a7d7] transition-all outline-none font-bold text-gray-800 placeholder-gray-300 text-sm uppercase tracking-tight"
                                                value={formData.candidatePhone}
                                                onChange={(e) => setFormData({ ...formData, candidatePhone: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Cover Letter (Optional)</label>
                                        <textarea
                                            placeholder="Tell the employer why you are a good fit..."
                                            className="w-full h-40 px-8 py-6 bg-[#f8fafc] border border-gray-100 rounded-[2rem] focus:ring-4 focus:ring-[#0099a7d7]/10 focus:border-[#0099a7d7] transition-all outline-none font-bold text-gray-800 placeholder-gray-300 text-sm resize-none"
                                            value={formData.coverLetter}
                                            onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                                        />
                                    </div>
                                </div>

                                {/* Right Side: Resume Upload & Info */}
                                <div className="space-y-8 flex flex-col justify-between">
                                    <div className="space-y-3 flex-1 flex flex-col">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Resume</label>
                                        <div
                                            className={`relative flex-1 border-2 border-dashed rounded-[3rem] p-12 transition-all flex flex-col items-center justify-center text-center cursor-pointer ${dragActive ? 'border-[#0099a7d7] bg-[#0099a7d7]/5' : 'border-gray-100 bg-[#f8fafc] hover:border-[#0099a7d7]/30'
                                                } ${formData.resume ? 'border-emerald-400 bg-emerald-50/30' : ''}`}
                                            onDragEnter={handleDrag}
                                            onDragLeave={handleDrag}
                                            onDragOver={handleDrag}
                                            onDrop={handleDrop}
                                            onClick={() => document.getElementById('resume-upload').click()}
                                        >
                                            <input
                                                id="resume-upload"
                                                type="file"
                                                className="hidden"
                                                accept=".pdf,.doc,.docx"
                                                onChange={handleFileChange}
                                            />
                                            {formData.resume ? (
                                                <>
                                                    <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-[2rem] flex items-center justify-center mb-6 shadow-inner border border-emerald-200/50">
                                                        <FileText size={48} />
                                                    </div>
                                                    <p className="text-emerald-700 font-black text-sm uppercase tracking-widest">{formData.resume.name}</p>
                                                    <p className="text-emerald-600/40 text-[10px] mt-2 font-black uppercase tracking-widest">Resume Uploaded ✓</p>
                                                </>
                                            ) : (
                                                <>
                                                    <div className="w-24 h-24 bg-white border border-gray-100 text-gray-300 rounded-[2rem] flex items-center justify-center mb-8 shadow-sm group-hover:text-[#0099a7d7] transition-all">
                                                        <Upload size={48} />
                                                    </div>
                                                    <p className="text-gray-900 font-black text-sm uppercase tracking-widest">Click to upload your resume</p>
                                                    <p className="text-gray-400 text-[10px] mt-2 font-black uppercase tracking-widest">PDF, DOC, DOCX up to 10MB</p>
                                                </>
                                            )}
                                        </div>
                                    </div>

                                    <div className="bg-blue-50 border border-blue-100 p-8 rounded-[2.5rem] flex gap-6 items-start italic">
                                        <div className="p-4 bg-white rounded-2xl h-fit shadow-sm"><AlertCircle className="w-6 h-6 text-blue-500" /></div>
                                        <div>
                                            <p className="text-xs font-black text-blue-700 uppercase tracking-widest mb-2">ATS Optimization</p>
                                            <p className="text-[12px] text-blue-800/60 font-black uppercase tracking-tight leading-relaxed">
                                                Your resume will be automatically analyzed to calculate your matching score.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>

                        <div className="p-10 border-t bg-[#f8fafc] flex gap-4">
                            <button
                                onClick={onClose}
                                className="px-10 py-5 bg-white text-gray-400 border border-gray-100 rounded-[1.5rem] font-black uppercase tracking-widest text-[10px] hover:bg-gray-50 transition-all"
                            >
                                Close
                            </button>
                            <button
                                type="submit"
                                onClick={handleSubmit}
                                disabled={parentSubmitting}
                                className="flex-1 py-5 bg-[#0e686eff] hover:bg-[#0099a7d7] text-white rounded-[1.5rem] font-black uppercase tracking-widest text-[10px] transition-all shadow-xl shadow-teal-900/10 disabled:opacity-50 flex items-center justify-center gap-3 active:scale-95 group"
                            >
                                {parentSubmitting ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>
                                        <CheckCircle size={18} />
                                        <span>Apply</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
