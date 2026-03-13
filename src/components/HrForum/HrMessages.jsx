import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import * as hrforumService from "../../../services/hrforumService";
import { getUserData } from "../../../utils/authUtils";
import { 
    MessageSquare, 
    Send, 
    Briefcase, 
    User, 
    Zap, 
    Search, 
    ChevronLeft,
    Clock,
    MoreVertical,
    CheckCircle2
} from "lucide-react";
import HrNavbar from "./HrNavbar";

export default function HrMessages() {
    const navigate = useNavigate();
    const [conversations, setConversations] = useState([]);
    const [selectedConv, setSelectedConv] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const chatEndRef = useRef(null);
    const pollInterval = useRef(null);

    useEffect(() => {
        const userData = getUserData();
        if (!userData) {
            navigate('/login');
            return;
        }
        setUser(userData);
        fetchConversations(userData._id || userData.id);

        return () => {
            if (pollInterval.current) clearInterval(pollInterval.current);
        };
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        if (pollInterval.current) clearInterval(pollInterval.current);
        
        if (selectedConv) {
            pollMessages();
            pollInterval.current = setInterval(pollMessages, 5000); 
        }

        return () => {
            if (pollInterval.current) clearInterval(pollInterval.current);
        };
    }, [selectedConv]);

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const fetchConversations = async (userId) => {
        try {
            setLoading(true);
            const res = await hrforumService.getUserConversations(userId);
            setConversations(res.data || []);
            if (res.data?.length > 0 && !selectedConv) {
                setSelectedConv(res.data[0]);
                setMessages(res.data[0].messages || []);
            }
        } catch (err) {
            console.error("Error fetching conversations:", err);
        } finally {
            setLoading(false);
        }
    };

    const pollMessages = async () => {
        if (!selectedConv) return;
        try {
            const res = await hrforumService.getApplicationById(selectedConv._id);
            if (res.data.messages.length !== messages.length) {
                setMessages(res.data.messages || []);
            }
        } catch (err) {
            console.error("Polling error:", err);
        }
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim() || !selectedConv) return;

        try {
            const role = (user?._id || user?.id) === selectedConv.userId ? 'candidate' : 'employer';
            await hrforumService.addMessage(selectedConv._id, newMessage, role, user?._id || user?.id);
            setNewMessage("");
            pollMessages();
        } catch (err) {
            console.error("Send error:", err);
        }
    };

    if (loading && conversations.length === 0) return (
        <div className="min-h-screen bg-[#F5F7FB] flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0e686eff]"></div>
        </div>
    );

    return (
        <div className="h-screen flex flex-col bg-[#F5F7FB] overflow-hidden">
            <HrNavbar />
            
            <div className="flex-1 flex overflow-hidden">
                {/* Conversations Sidebar */}
                <div className="w-full md:w-[400px] bg-white border-r border-gray-100 flex flex-col h-full z-10 transition-all">
                    <div className="p-8 border-b border-gray-50 bg-[#f8fafc]/50">
                        <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tighter mb-6 flex items-center gap-3">
                            <MessageSquare className="text-[#0e686eff]" /> Messages
                        </h2>
                        <div className="relative group">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 group-focus-within:text-[#0099a7d7] transition-colors" />
                            <input 
                                type="text" 
                                placeholder="Search messages..."
                                className="w-full bg-white border border-gray-100 rounded-2xl py-4 pl-14 pr-6 text-xs font-black uppercase tracking-widest focus:ring-4 focus:ring-[#0099a7d7]/5 focus:border-[#0099a7d7] outline-none transition-all"
                            />
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto custom-scrollbar bg-white">
                        {conversations.length === 0 ? (
                            <div className="p-20 text-center opacity-20">
                                <MessageSquare size={60} className="mx-auto mb-6" />
                                <p className="font-black uppercase tracking-[0.4em] text-[10px]">No messages found.</p>
                            </div>
                        ) : (
                            conversations.map((conv) => {
                                const isSelected = selectedConv?._id === conv._id;
                                const isCandidate = (user?._id || user?.id) === conv.userId;
                                const otherPartyName = isCandidate ? conv.jobId?.companyName : conv.candidateName;
                                const lastMsg = conv.messages[conv.messages.length - 1];

                                return (
                                    <div 
                                        key={conv._id}
                                        onClick={() => setSelectedConv(conv)}
                                        className={`p-8 cursor-pointer border-b border-gray-50 transition-all hover:bg-gray-50 group relative ${isSelected ? 'bg-gray-50 shadow-inner' : ''}`}
                                    >
                                        {isSelected && <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#0099a7d7] rounded-r-full"></div>}
                                        <div className="flex gap-5">
                                            <div className="w-16 h-16 bg-[#0e686eff] rounded-[1.5rem] flex items-center justify-center text-white font-black text-2xl shadow-xl shadow-teal-900/10 border border-white/10 shrink-0">
                                                {otherPartyName?.charAt(0)}
                                            </div>
                                            <div className="flex-1 overflow-hidden">
                                                <div className="flex justify-between items-start mb-2">
                                                    <h3 className={`font-black uppercase tracking-tight truncate transition-colors ${isSelected ? 'text-[#0e686eff]' : 'text-gray-900'}`}>{otherPartyName}</h3>
                                                    <span className="text-[9px] font-black text-gray-300 uppercase tracking-widest">{lastMsg ? new Date(lastMsg.timestamp).toLocaleDateString() : ''}</span>
                                                </div>
                                                <p className="text-[10px] font-black text-[#0099a7d7] uppercase tracking-widest mb-3 flex items-center gap-2">
                                                    <Briefcase size={12} /> {conv.jobId?.jobTitle}
                                                </p>
                                                <p className="text-[11px] font-bold text-gray-400 truncate italic">
                                                    {lastMsg ? `"${lastMsg.content}"` : 'No messages yet.'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>

                {/* Main Chat Interface */}
                <div className="flex-1 flex flex-col bg-white relative">
                    {selectedConv ? (
                        <>
                            {/* Chat Header */}
                            <div className="p-8 border-b border-gray-50 flex items-center justify-between bg-white z-20">
                                <div className="flex items-center gap-6">
                                    <div className="w-16 h-16 bg-gray-50 rounded-[1.5rem] flex items-center justify-center border border-gray-100 shadow-inner">
                                        <User size={32} className="text-gray-300" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-black uppercase tracking-tighter text-gray-900 leading-none mb-2">
                                            {(user?._id || user?.id) === selectedConv.userId ? selectedConv.jobId?.companyName : selectedConv.candidateName}
                                        </h3>
                                        <div className="flex items-center gap-4">
                                            <p className="text-[10px] font-black text-[#0099a7d7] uppercase tracking-widest flex items-center gap-2">
                                                <div className="w-2 h-2 bg-[#0099a7d7] rounded-full animate-pulse"></div> Chat Active
                                            </p>
                                            <span className="w-1 h-1 bg-gray-200 rounded-full"></span>
                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest italic">{selectedConv.jobId?.jobTitle}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <button 
                                        onClick={() => navigate((user?._id || user?.id) === selectedConv.userId ? `/job-details/${selectedConv.jobId._id || selectedConv.jobId}` : `/candidate-profile/${selectedConv._id}`)}
                                        className="p-4 bg-[#f8fafc] hover:bg-white border border-gray-100 rounded-2xl text-gray-400 hover:text-[#0e686eff] transition-all shadow-sm group"
                                    >
                                        <MoreVertical size={20} className="group-hover:rotate-90 transition-transform" />
                                    </button>
                                </div>
                            </div>

                            {/* Messages Area */}
                            <div className="flex-1 overflow-y-auto p-12 space-y-10 custom-scrollbar bg-slate-50/30">
                                {messages.length === 0 ? (
                                    <div className="h-full flex flex-col items-center justify-center text-center opacity-10">
                                        <MessageSquare size={100} className="mb-8" />
                                        <p className="font-black uppercase tracking-[0.8em] text-xs">Waiting for messages.</p>
                                    </div>
                                ) : (
                                    messages.map((m, i) => {
                                        const currentIsEmployer = (user?._id || user?.id) === selectedConv.jobId?.employerId;
                                        const actualIsMine = m.senderRole === (currentIsEmployer ? 'employer' : 'candidate');

                                        return (
                                            <div key={i} className={`flex ${actualIsMine ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2 duration-300`}>
                                                <div className={`max-w-[70%] p-8 rounded-[3rem] shadow-sm border transition-all ${
                                                    actualIsMine 
                                                    ? 'bg-[#0e686eff] border-[#0099a7d7]/10 text-white rounded-tr-none shadow-xl shadow-teal-900/10' 
                                                    : 'bg-white text-gray-600 border-gray-100 rounded-tl-none'
                                                }`}>
                                                    <p className="font-bold leading-relaxed text-sm mb-4">{m.content}</p>
                                                    <div className="flex items-center justify-between gap-6">
                                                        <span className={`text-[9px] font-black uppercase tracking-widest ${
                                                            actualIsMine ? 'text-white/40' : 'text-gray-300'
                                                        }`}>
                                                            {new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                        </span>
                                                        {actualIsMine && <CheckCircle2 size={12} className="text-[#0099a7d7]" />}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })
                                )}
                                <div ref={chatEndRef} />
                            </div>

                            {/* Compose Area */}
                            <form onSubmit={handleSendMessage} className="p-10 bg-white border-t border-gray-50 flex gap-6 items-end">
                                <textarea 
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    placeholder="Type a message..."
                                    className="flex-1 px-10 py-8 bg-[#f8fafc] border-none rounded-[3rem] focus:ring-8 focus:ring-[#0099a7d7]/5 outline-none font-bold text-gray-800 placeholder:text-gray-200 transition-all text-xs uppercase resize-none h-32 custom-scrollbar shadow-inner"
                                />
                                <button 
                                    type="submit" 
                                    disabled={!newMessage.trim()}
                                    className="bg-[#0e686eff] hover:bg-[#0099a7d7] text-white p-10 rounded-[2.5rem] shadow-2xl transition-all active:scale-95 disabled:opacity-50 group overflow-hidden relative"
                                >
                                    <Send size={32} className="group-hover:rotate-12 transition-transform" />
                                </button>
                            </form>
                        </>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center p-20 text-center">
                            <div className="w-40 h-40 bg-[#f8fafc] rounded-[4rem] flex items-center justify-center text-[#0e686eff] mb-12 shadow-inner">
                                <MessageSquare size={80} />
                            </div>
                            <h3 className="text-4xl font-black text-gray-900 uppercase tracking-tighter mb-4">Chat Standby</h3>
                            <p className="text-gray-400 font-black uppercase tracking-widest text-[10px] max-w-sm leading-relaxed">
                                Select a conversation to start chatting with candidates or employers.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
