import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as hrforumService from "../../../services/hrforumService.js";
import { getUserData } from "../../../utils/authUtils";
import {
    ChevronLeft,
    ArrowRight,
    CheckCircle,
    Briefcase,
    MapPin,
    DollarSign,
    Info,
    Upload,
    X,
    ShieldCheck,
    Zap,
    Layout,
    Clock,
    User,
    Building,
    Check
} from "lucide-react";
import HrNavbar from "./HrNavbar";

export default function JobPostingForm() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState(1);
    const [currentUser, setCurrentUser] = useState(null);
    const [formData, setFormData] = useState({
        companyName: "",
        companyWebsite: "",
        employerFirstName: "",
        employerLastName: "",
        jobTitle: "",
        location: "",
        locationType: "In person",
        jobTypes: ["Full-time"],
        payRange: { min: "", max: "", period: "per month" },
        description: "",
        responsibilities: [""],
        benefits: [""]
    });

    useEffect(() => {
        const user = getUserData();
        if (user) {
            setCurrentUser(user);
            setFormData(prev => ({
                ...prev,
                employerFirstName: user.name?.split(' ')[0] || "",
                employerLastName: user.name?.split(' ')[1] || ""
            }));
        } else {
            navigate('/login');
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.includes(".")) {
            const [parent, child] = name.split(".");
            setFormData(prev => ({
                ...prev,
                [parent]: { ...prev[parent], [child]: value }
            }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleListChange = (index, value, type) => {
        const newList = [...formData[type]];
        newList[index] = value;
        setFormData(prev => ({ ...prev, [type]: newList }));
    };

    const addItem = (type) => {
        setFormData(prev => ({ ...prev, [type]: [...prev[type], ""] }));
    };

    const removeItem = (index, type) => {
        const newList = formData[type].filter((_, i) => i !== index);
        setFormData(prev => ({ ...prev, [type]: newList }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const payload = {
                ...formData,
                employerId: currentUser?._id || currentUser?.id
            };
            await hrforumService.postJob(payload);
            alert("Job Posted Successfully! ✓");
            navigate("/job-listing");
        } catch (error) {
            console.error(error);
            alert("Posting failed. Please check the details.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#F5F7FB] font-sans antialiased text-[#2d2d2d] selection:bg-[#0099a7d7] selection:text-white">
            <HrNavbar />

            {/* Sub-Header with Progress */}
            <div className="bg-white border-b border-gray-100 px-8 py-5 flex items-center justify-between sticky top-16 z-40 shadow-sm transition-all duration-300">
                <div className="flex items-center gap-6">
                    <Link to="/job-listing" className="w-12 h-12 bg-[#f8fafc] hover:bg-white rounded-2xl flex items-center justify-center transition-all border border-gray-100 shadow-sm text-gray-400 hover:text-[#0e686eff]">
                        <ChevronLeft size={24} />
                    </Link>
                    <div>
                        <h1 className="text-xl font-black uppercase tracking-tight text-gray-900 leading-none mb-1">Post a New Job</h1>
                        <p className="text-[9px] font-black text-[#0099a7d7] uppercase tracking-widest">Step 0{step} of 3</p>
                    </div>
                </div>
                <div className="flex gap-4">
                    {[1, 2, 3].map(s => (
                        <div key={s} className={`h-2.5 w-16 rounded-full transition-all duration-700 ${s <= step ? 'bg-[#0e686eff] shadow-[0_0_15px_rgba(14,104,110,0.3)]' : 'bg-gray-100'}`}></div>
                    ))}
                </div>
            </div>

            <main className="max-w-[1000px] mx-auto py-16 px-8 pb-32">
                <form onSubmit={handleSubmit} className="space-y-12">

                    {step === 1 && (
                        <Card title="Company Details" icon={<Building className="text-[#0e686eff]" />}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                <Input label="Company Name" name="companyName" value={formData.companyName} onChange={handleChange} required placeholder="Enterprise name..." />
                                <Input label="Company Website" name="companyWebsite" value={formData.companyWebsite} onChange={handleChange} placeholder="https://..." />
                                <Input label="Contact Person (First Name)" name="employerFirstName" value={formData.employerFirstName} onChange={handleChange} required />
                                <Input label="Contact Person (Last Name)" name="employerLastName" value={formData.employerLastName} onChange={handleChange} required />
                            </div>
                            <div className="mt-16 flex justify-end">
                                <button type="button" onClick={() => setStep(2)} className="bg-[#0e686eff] hover:bg-[#0099a7d7] text-white font-black uppercase tracking-widest text-[11px] px-14 py-6 rounded-[2rem] flex items-center gap-4 transition-all shadow-2xl shadow-teal-900/10 active:scale-95 group">
                                    Next Step <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </Card>
                    )}

                    {step === 2 && (
                        <Card title="Job Details" icon={<Briefcase className="text-[#0e686eff]" />}>
                            <div className="space-y-12">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                    <Input label="Job Title" name="jobTitle" value={formData.jobTitle} onChange={handleChange} required placeholder="Job title..." />
                                    <Input label="Location" name="location" value={formData.location} onChange={handleChange} required placeholder="City or Remote..." />
                                </div>

                                <div className="space-y-4">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block ml-1">Workplace Type</label>
                                    <div className="grid grid-cols-3 gap-6">
                                        {['In person', 'Hybrid', 'Remote'].map(type => (
                                            <button
                                                key={type}
                                                type="button"
                                                onClick={() => setFormData(prev => ({ ...prev, locationType: type }))}
                                                className={`py-6 rounded-[1.8rem] text-[10px] font-black uppercase tracking-widest border-2 transition-all flex items-center justify-center gap-3 ${formData.locationType === type
                                                        ? 'bg-[#0099a7d7]/10 border-[#0099a7d7] text-[#0e686eff] shadow-inner font-black'
                                                        : 'bg-[#f8fafc] border-transparent text-gray-400 hover:border-gray-200'
                                                    }`}
                                            >
                                                {formData.locationType === type && <Check size={16} />} {type}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-end">
                                    <Input label="Salary (Min)" name="payRange.min" value={formData.payRange.min} onChange={handleChange} type="number" />
                                    <Input label="Salary (Max)" name="payRange.max" value={formData.payRange.max} onChange={handleChange} type="number" />
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block ml-1">Frequency</label>
                                        <select
                                            name="payRange.period"
                                            value={formData.payRange.period}
                                            onChange={handleChange}
                                            className="w-full h-[75px] bg-[#f8fafc] border-none rounded-[1.8rem] text-[10px] font-black uppercase tracking-widest focus:ring-8 focus:ring-[#0099a7d7]/5 focus:border-[#0099a7d7] outline-none px-10 transition-all shadow-inner appearance-none cursor-pointer"
                                        >
                                            <option value="per month">per month</option>
                                            <option value="per year">per year</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-16 flex justify-between items-center">
                                <button type="button" onClick={() => setStep(1)} className="px-8 py-4 text-gray-400 font-black uppercase tracking-widest text-[10px] hover:text-[#0e686eff] transition-colors rounded-2xl bg-[#f8fafc]">Back</button>
                                <button type="button" onClick={() => setStep(3)} className="bg-[#0e686eff] hover:bg-[#0099a7d7] text-white font-black uppercase tracking-widest text-[11px] px-14 py-6 rounded-[2rem] flex items-center gap-4 transition-all shadow-2xl shadow-teal-900/10 active:scale-95">
                                    Next Step <ArrowRight size={22} />
                                </button>
                            </div>
                        </Card>
                    )}

                    {step === 3 && (
                        <Card title="Job Description" icon={<Layout className="text-[#0e686eff]" />}>
                            <div className="space-y-12">
                                <div className="space-y-4">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block ml-1">Description</label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        className="w-full h-72 bg-[#f8fafc] border-none rounded-[3rem] text-sm font-bold focus:ring-8 focus:ring-[#0099a7d7]/5 focus:border-[#0099a7d7] outline-none p-12 leading-relaxed placeholder:text-gray-200 transition-all shadow-inner resize-none mb-4 italic"
                                        placeholder="Explain the role and requirements..."
                                        required
                                    />
                                    <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest text-right">Detailed descriptions help find better matches.</p>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex justify-between items-center mb-6">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Responsibilities</label>
                                        <button type="button" onClick={() => addItem('responsibilities')} className="text-[#0e686eff] font-black text-[9px] uppercase tracking-widest border-2 border-[#0e686eff]/10 bg-white px-6 py-3 rounded-2xl hover:bg-[#0e686eff] hover:text-white transition-all shadow-sm">Add Responsibility</button>
                                    </div>
                                    <div className="space-y-4">
                                        {formData.responsibilities.map((r, i) => (
                                            <div key={i} className="flex gap-4 animate-in slide-in-from-right-3 duration-300">
                                                <input
                                                    value={r}
                                                    onChange={(e) => handleListChange(i, e.target.value, 'responsibilities')}
                                                    className="flex-1 bg-[#f8fafc] border-none rounded-[1.8rem] text-[10px] font-black uppercase tracking-widest focus:ring-8 focus:ring-[#0099a7d7]/5 focus:border-[#0099a7d7] outline-none px-10 py-6 transition-all shadow-inner"
                                                    placeholder={`Responsibility 0${i + 1}...`}
                                                />
                                                {formData.responsibilities.length > 1 && (
                                                    <button type="button" onClick={() => removeItem(i, 'responsibilities')} className="w-16 h-16 flex items-center justify-center text-gray-300 hover:text-red-500 transition-all bg-[#f8fafc] rounded-[1.2rem]"><X size={24} /></button>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="mt-20 flex justify-between items-center">
                                <button type="button" onClick={() => setStep(2)} className="px-8 py-4 text-gray-400 font-black uppercase tracking-widest text-[10px] hover:text-[#0e686eff] transition-colors rounded-2xl bg-[#f8fafc]">Back</button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="bg-[#0e686eff] hover:bg-[#0099a7d7] text-white font-black uppercase tracking-[0.2em] text-[12px] px-20 py-8 rounded-[3rem] shadow-[0_40px_80px_rgba(14,104,110,0.3)] transition-all active:scale-95 disabled:opacity-50 flex items-center gap-6 group overflow-hidden relative"
                                >
                                    <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                                    {loading ? 'Posting...' : 'Post Job Now'} <ShieldCheck size={32} />
                                </button>
                            </div>
                        </Card>
                    )}
                </form>
            </main>
        </div>
    );
}

const Card = ({ children, title, icon }) => (
    <div className="bg-white rounded-[4rem] p-20 shadow-[0_40px_100px_rgba(0,0,0,0.08)] border border-gray-100 animate-in fade-in slide-in-from-bottom-5 duration-1000 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#0e686eff]/2 rounded-full blur-[120px] -z-10 -mr-64 -mt-64"></div>
        <div className="flex items-center gap-8 mb-16">
            <div className="w-24 h-24 bg-white rounded-[2.2rem] flex items-center justify-center text-[#0e686eff] shadow-[inset_0_5px_15px_rgba(0,0,0,0.05)] border border-gray-50">{icon}</div>
            <h2 className="text-4xl font-black text-gray-900 uppercase tracking-tighter">{title}</h2>
        </div>
        {children}
    </div>
);

const Input = ({ label, ...props }) => (
    <div className="space-y-4">
        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block cursor-default ml-1">{label}</label>
        <input
            {...props}
            className="w-full h-[75px] bg-[#f8fafc] border-none rounded-[1.8rem] text-[10px] font-black uppercase tracking-widest focus:ring-8 focus:ring-[#0099a7d7]/5 focus:border-[#0099a7d7] transition-all outline-none px-10 placeholder:text-gray-200 shadow-inner"
        />
    </div>
);

