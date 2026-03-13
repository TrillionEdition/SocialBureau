import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Search, MapPin, MessageSquare, Bell, User, Menu, X, Briefcase, Zap } from "lucide-react";
import { getUserData } from "../../../utils/authUtils";
import { getUserConversations } from "../../../services/hrforumService";

export default function HrNavbar({ 
    showSearch = false, 
    searchTerm, 
    setSearchTerm, 
    locationTerm, 
    setLocationTerm 
}) {
    const navigate = useNavigate();
    const location = useLocation();
    const [user, setUser] = useState(null);
    const [conversations, setConversations] = useState([]);
    const [showMessages, setShowMessages] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const userData = getUserData();
        if (userData) {
            setUser(userData);
            fetchConversations(userData._id || userData.id);
        }
    }, []);

    const fetchConversations = async (userId) => {
        try {
            const res = await getUserConversations(userId);
            setConversations(res.data || []);
        } catch (err) {
            console.error("Error fetching conversations:", err);
        }
    };

    const unreadCount = conversations.length; // Placeholder: in real app we'd track seen/unseen

    return (
        <header className="bg-[#0e686eff] text-white px-4 md:px-8 py-3 flex flex-wrap items-center justify-between shadow-md sticky top-0 z-[100]">
            <div className="flex items-center gap-6">
                <Link to="/hr-forum" className="text-xl md:text-2xl font-black tracking-tighter flex items-center gap-2">
                    SOCIALBUREAU <span className="text-[#0099a7d7] font-bold text-lg md:text-xl">JOBS</span>
                </Link>
                
                {/* Desktop Nav Links */}
                <nav className="hidden lg:flex items-center gap-6 ml-4">
                    <Link to="/hr-forum" className={`text-sm font-bold uppercase tracking-widest hover:text-[#0099a7d7] transition-all ${location.pathname === '/hr-forum' ? 'text-[#0099a7d7]' : 'text-white/70'}`}>Find Jobs</Link>
                    <Link to="/job-listing" className={`text-sm font-bold uppercase tracking-widest hover:text-[#0099a7d7] transition-all ${location.pathname.startsWith('/job-listing') ? 'text-[#0099a7d7]' : 'text-white/70'}`}>Employers</Link>
                </nav>
            </div>

            {/* Search Bar - Conditional */}
            {showSearch && (
                <div className="hidden xl:flex flex-grow max-w-2xl mx-8">
                    <div className="flex w-full bg-white rounded-xl overflow-hidden shadow-2xl border-2 border-white/10 group focus-within:border-[#0099a7d7]/30 transition-all">
                        <div className="flex-1 flex items-center px-4 py-2 text-gray-800">
                            <Search className="w-4 h-4 text-[#0e686eff] mr-3" />
                            <input
                                type="text"
                                placeholder="Job title, keywords, or company"
                                className="w-full bg-transparent border-none focus:outline-none text-sm font-bold uppercase tracking-tight placeholder-gray-400"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm?.(e.target.value)}
                            />
                        </div>
                        <div className="w-px bg-gray-100 my-2"></div>
                        <div className="flex-1 flex items-center px-4 py-2 text-gray-800">
                            <MapPin className="w-4 h-4 text-[#0e686eff] mr-3" />
                            <input
                                type="text"
                                placeholder="City or remote"
                                className="w-full bg-transparent border-none focus:outline-none text-sm font-bold uppercase tracking-tight placeholder-gray-400"
                                value={locationTerm}
                                onChange={(e) => setLocationTerm?.(e.target.value)}
                            />
                        </div>
                        <button className="bg-[#0e686eff] hover:bg-[#0099a7d7] text-white px-8 font-black uppercase tracking-widest text-[10px] transition-all">
                            Find
                        </button>
                    </div>
                </div>
            )}

            {/* Right Icons */}
            <div className="flex items-center gap-2 md:gap-4 relative">
                {/* Messages Icon */}
                <button 
                    onClick={() => setShowMessages(!showMessages)}
                    className={`p-3 bg-white/10 hover:bg-white/20 rounded-2xl transition-all relative border border-white/5 shadow-inner ${location.pathname === '/hr-messages' ? 'bg-white/20 ring-2 ring-[#0099a7d7]/50' : ''}`}
                >
                    <MessageSquare size={20} className={showMessages || location.pathname === '/hr-messages' ? "text-[#0099a7d7]" : "text-white"} />
                    {unreadCount > 0 && (
                        <span className="absolute -top-1 -right-1 bg-[#0099a7d7] text-white text-[8px] font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-[#0e686eff] shadow-lg">
                            {unreadCount}
                        </span>
                    )}
                </button>

                {/* Notifications */}
                <button className="hidden sm:flex p-3 bg-white/10 hover:bg-white/20 rounded-2xl transition-all border border-white/5">
                    <Bell size={20} />
                </button>

                <div className="w-px h-6 bg-white/10 mx-1 hidden sm:block"></div>

                {/* User / Login */}
                {user ? (
                    <button 
                        onClick={() => navigate('/profile')}
                        className="flex items-center gap-3 p-1.5 pr-4 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/5 transition-all shadow-sm group"
                    >
                        <div className="w-8 h-8 rounded-xl bg-[#0099a7d7] flex items-center justify-center text-white font-black text-xs shadow-lg group-hover:scale-105 transition-transform">
                            {user.name?.charAt(0) || 'U'}
                        </div>
                        <span className="hidden md:block text-[10px] font-black uppercase tracking-widest">{user.name?.split(' ')[0]}</span>
                    </button>
                ) : (
                    <Link to="/login" className="px-6 py-2.5 bg-[#0099a7d7] hover:bg-white hover:text-[#0e686eff] text-white rounded-xl font-black uppercase tracking-widest text-[10px] transition-all shadow-xl shadow-teal-900/10 active:scale-95">
                        Log In
                    </Link>
                )}

                {/* Mobile Menu */}
                <button 
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="lg:hidden p-3 bg-white/10 rounded-2xl border border-white/5"
                >
                    {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
                </button>

                {/* Messages Dropdown */}
                {showMessages && (
                    <div className="absolute top-16 right-0 w-[350px] md:w-[450px] bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-top-3 duration-300 z-[110]">
                        <div className="p-6 bg-[#0e686eff] text-white flex items-center justify-between">
                            <h3 className="font-black uppercase tracking-widest text-xs flex items-center gap-2">
                                <MessageSquare size={16} /> Messages
                            </h3>
                            <button onClick={() => setShowMessages(false)} className="opacity-50 hover:opacity-100"><X size={18} /></button>
                        </div>
                        <div className="max-h-[500px] overflow-y-auto custom-scrollbar">
                            {conversations.length === 0 ? (
                                <div className="p-16 text-center">
                                    <MessageSquare size={40} className="mx-auto text-gray-200 mb-4" />
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">No messages yet.</p>
                                </div>
                            ) : (
                                conversations.map((conv) => (
                                    <div 
                                        key={conv._id}
                                        onClick={() => {
                                            setShowMessages(false);
                                            // Redirect based on role
                                            if (user?._id === conv.userId || user?.id === conv.userId) {
                                                navigate(`/job-details/${conv.jobId?._id || conv.jobId}`);
                                            } else {
                                                navigate(`/candidate-profile/${conv._id}`);
                                            }
                                        }}
                                        className="p-6 hover:bg-gray-50 border-b border-gray-50 transition-all cursor-pointer flex gap-4 group"
                                    >
                                        <div className="w-12 h-12 bg-[#0e686eff]/5 rounded-xl flex flex-col items-center justify-center shrink-0 border border-gray-100 group-hover:bg-[#0099a7d7]/10 transition-colors">
                                            <Briefcase size={16} className="text-[#0e686eff]" />
                                            <span className="text-[8px] font-black text-[#0099a7d7] uppercase tracking-tighter mt-1">{conv.jobId?.jobTitle?.charAt(0)}</span>
                                        </div>
                                        <div className="flex-1 overflow-hidden">
                                            <div className="flex justify-between items-start mb-1">
                                                <h4 className="font-black text-[11px] text-gray-900 uppercase tracking-tight truncate">
                                                    {user?._id === conv.userId || user?.id === conv.userId ? conv.jobId?.companyName : conv.candidateName}
                                                </h4>
                                                <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest">
                                                    {new Date(conv.updatedAt).toLocaleDateString()}
                                                </span>
                                            </div>
                                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest truncate mb-2">{conv.jobId?.jobTitle}</p>
                                            <p className="text-[10px] font-medium text-gray-600 truncate italic">
                                                "{conv.messages[conv.messages.length - 1]?.content}"
                                            </p>
                                        </div>
                                        <div className="flex-col justify-center gap-1 hidden group-hover:flex animate-in fade-in slide-in-from-right-2">
                                            <div className="w-1.5 h-1.5 bg-[#0099a7d7] rounded-full"></div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                        <div className="p-4 bg-gray-50 text-center border-t border-gray-100">
                            <button 
                                onClick={() => { setShowMessages(false); navigate('/hr-messages'); }}
                                className="text-[10px] font-black text-[#0099a7d7] uppercase tracking-[0.3em] hover:underline"
                            >
                                View All Conversations
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}

