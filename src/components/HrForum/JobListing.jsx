import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as hrforumService from "../../../services/hrforumService.js";
import { getUserData } from "../../../utils/authUtils";
import {
    Briefcase,
    Search,
    MoreVertical,
    Plus,
    Users,
    Zap,
    LayoutDashboard,
    Settings,
    FileText,
    TrendingUp,
    MessageSquare,
    ExternalLink,
    MapPin,
    ArrowUpRight,
    Filter,
    Clock,
    CheckCircle,
    X
} from "lucide-react";
import HrNavbar from "./HrNavbar";

export default function JobsDashboard() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const user = getUserData();
        if (user) {
            setCurrentUser(user);
            fetchEmployerJobs(user._id || user.id);
        } else {
            navigate('/login');
        }
    }, []);

    const fetchEmployerJobs = async (userId) => {
        try {
            setLoading(true);
            const response = await hrforumService.getEmployerJobs(userId);
            setJobs(response.data);
            setError(null);
        } catch (err) {
            console.error("Error fetching employer jobs:", err);
            setError("Failed to load your jobs.");
        } finally {
            setLoading(false);
        }
    };

    const filteredJobs = jobs.filter(j =>
        (j.jobTitle || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (j.companyName || "").toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading) return (
        <div className="min-h-screen bg-[#F5F7FB] flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0e686eff]"></div>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#F5F7FB] font-sans antialiased text-[#2d2d2d] selection:bg-[#0099a7d7] selection:text-white">
            <HrNavbar />

            <div className="max-w-[1600px] mx-auto px-8 py-12">
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Sidebar Nav */}
                    <div className="w-full lg:w-[300px] space-y-3">
                        <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100 overflow-hidden relative group mb-8">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-[#0e686eff]/5 rounded-full blur-2xl -mr-12 -mt-12 group-hover:bg-[#0099a7d7]/10 transition-all"></div>
                            <h2 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em] mb-6">Employer Actions</h2>
                            <Link to="/apply-job" className="w-full bg-[#0e686eff] hover:bg-[#0099a7d7] text-white font-black uppercase tracking-widest text-[10px] py-5 rounded-2xl shadow-xl shadow-teal-900/10 transition-all flex items-center justify-center gap-3 active:scale-95 group">
                                <Plus size={18} /> Post a Job
                            </Link>
                        </div>

                        <div className="bg-white rounded-[2.5rem] p-4 shadow-sm border border-gray-100 space-y-1">
                            {[
                                { icon: <LayoutDashboard size={20} />, label: "Dashboard", active: true },
                                { icon: <Briefcase size={20} />, label: "My Jobs", active: false },
                                { icon: <Users size={20} />, label: "Applicants", active: false },
                                { icon: <MessageSquare size={20} />, label: "Messages", active: false },
                                { icon: <TrendingUp size={20} />, label: "Analytics", active: false }
                            ].map((item, i) => (
                                <button key={i} className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${item.active ? 'bg-[#0e686eff] text-white shadow-xl shadow-teal-900/10' : 'text-gray-400 hover:bg-[#0099a7d7]/5 hover:text-[#0099a7d7]'
                                    }`}>
                                    {item.icon} {item.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 space-y-10">
                        {/* Summary Block */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                { label: "Total Jobs", value: jobs.length, icon: <Briefcase size={28} className="text-[#0e686eff]" />, color: "bg-[#0e686eff]/5" },
                                { label: "Total Applicants", value: jobs.reduce((acc, current) => acc + (current.applicantsCount || 0), 0), icon: <Users size={28} className="text-[#0099a7d7]" />, color: "bg-[#0099a7d7]/5" },
                                { label: "Messages", value: "0", icon: <MessageSquare size={28} className="text-emerald-500" />, color: "bg-emerald-50" }
                            ].map((stat, i) => (
                                <div key={i} className="bg-white p-10 rounded-[3rem] shadow-sm border border-gray-100 flex items-center justify-between group hover:border-[#0099a7d7]/20 transition-all">
                                    <div>
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">{stat.label}</p>
                                        <p className="text-5xl font-black text-gray-900 leading-none tracking-tighter">{stat.value}</p>
                                    </div>
                                    <div className={`p-6 ${stat.color} rounded-[1.5rem] group-hover:scale-110 transition-transform`}>{stat.icon}</div>
                                </div>
                            ))}
                        </div>

                        {/* Search & Deployments Table */}
                        <div className="bg-white rounded-[3.5rem] shadow-2xl border border-gray-100 overflow-hidden">
                            <div className="p-10 border-b border-gray-50 flex flex-col md:flex-row items-center justify-between bg-[#f8fafc] gap-6">
                                <div className="relative w-full max-w-lg">
                                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-[#0099a7d7]" size={20} />
                                    <input
                                        type="text"
                                        placeholder="Search jobs by title..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full pl-16 pr-8 py-5 bg-white border border-gray-200 rounded-2xl text-xs font-black uppercase tracking-widest focus:ring-8 focus:ring-[#0e686eff]/5 focus:border-[#0e686eff] transition-all outline-none"
                                    />
                                </div>
                                <div className="flex gap-4 w-full md:w-auto">
                                    <button className="flex-1 md:flex-none flex items-center justify-center gap-3 px-8 py-5 bg-white border border-gray-200 rounded-2xl text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-[#0099a7d7] hover:border-[#0099a7d7] transition-all">
                                        <Filter size={18} /> Filter
                                    </button>
                                </div>
                            </div>

                            <div className="overflow-x-auto custom-scrollbar">
                                <table className="w-full text-left">
                                    <thead className="bg-[#f8fafc] border-b border-gray-50">
                                        <tr>
                                            <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Job Details</th>
                                            <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Location</th>
                                            <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Applicants</th>
                                            <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {filteredJobs.length === 0 ? (
                                            <tr>
                                                <td colSpan="4" className="px-10 py-24 text-center">
                                                    <div className="opacity-20 flex flex-col items-center">
                                                        <Zap size={64} className="mb-6" />
                                                        <p className="text-xl font-black uppercase tracking-[0.4em]">No jobs found.</p>
                                                    </div>
                                                </td>
                                            </tr>
                                        ) : (
                                            filteredJobs.map(job => (
                                                <tr key={job._id} className="hover:bg-gray-50/50 transition-all cursor-default group">
                                                    <td className="px-10 py-10">
                                                        <p className="font-black text-[#0e686eff] text-2xl uppercase tracking-tighter mb-2 leading-none group-hover:text-[#0099a7d7] transition-colors">{job.jobTitle}</p>
                                                        <div className="flex items-center gap-4">
                                                            <span className="text-[9px] font-black text-[#0099a7d7] uppercase tracking-widest border border-[#0099a7d7]/20 px-2 py-0.5 rounded-lg">{job.companyName}</span>
                                                            <span className="text-[9px] text-gray-400 font-bold uppercase tracking-widest flex items-center gap-1"><Clock size={12} /> {new Date(job.createdAt).toLocaleDateString()}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-10 py-10">
                                                        <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-3">
                                                            <MapPin size={18} className="text-[#0099a7d7]" /> {job.location}
                                                        </p>
                                                    </td>
                                                    <td className="px-10 py-10">
                                                        <Link
                                                            to={`/job-applicants/${job._id}`}
                                                            className="inline-flex items-center gap-4 bg-[#0e686eff]/5 text-[#0e686eff] px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-[#0e686eff] hover:text-white transition-all shadow-sm border border-[#0e686eff]/10"
                                                        >
                                                            <Users size={18} /> View Applicants
                                                        </Link>
                                                    </td>
                                                    <td className="px-10 py-10 text-right">
                                                        <div className="flex items-center justify-end gap-3 opacity-40 group-hover:opacity-100 transition-opacity">
                                                            <button
                                                                onClick={() => navigate(`/job-details/${job._id}`)}
                                                                className="w-12 h-12 bg-white border border-gray-100 rounded-xl flex items-center justify-center text-gray-400 hover:text-[#0099a7d7] hover:border-[#0099a7d7] transition-all shadow-sm"
                                                                title="View Details"
                                                            >
                                                                <ArrowUpRight size={22} />
                                                            </button>
                                                            <button className="w-12 h-12 bg-white border border-gray-100 rounded-xl flex items-center justify-center text-gray-400 hover:text-red-500 transition-all shadow-sm">
                                                                <MoreVertical size={22} />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

