import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { 
    ChevronLeft, CheckCircle, HelpCircle, XCircle, MapPin, 
    Building, Calendar, DollarSign, Clock, Send, Bookmark, 
    BookmarkCheck, Edit2, ExternalLink, Loader, FileText, Zap,
    Mail, Download, User
} from "lucide-react";
import { getUserData } from "../../../utils/authUtils";
import { jobService } from "../../../services/jobService";
import { BASE_URL } from "../../../utils/urls";

const ACTION_CONFIGS = {
    interested: {
        icon: CheckCircle,
        title: "Mark as Shortlisted",
        color: "green",
        description: "Candidate will be notified they are shortlisted.",
        confirmText: "Shortlist",
        bgClass: "bg-green-50 border-green-200",
        iconClass: "text-green-600",
        buttonClass: "bg-green-600 hover:bg-green-700",
        statusKey: "shortlisted"
    },
    clarify: {
        icon: HelpCircle,
        title: "Need Clarification",
        color: "amber",
        description: "Request more info. They will see this status.",
        confirmText: "Request Info",
        bgClass: "bg-amber-50 border-amber-200",
        iconClass: "text-amber-600",
        buttonClass: "bg-amber-600 hover:bg-amber-700",
        statusKey: "pending"
    },
    rejected: {
        icon: XCircle,
        title: "Reject Candidate",
        color: "red",
        description: "Mark as not suitable for this role.",
        confirmText: "Reject",
        bgClass: "bg-red-50 border-red-200",
        iconClass: "text-red-600",
        buttonClass: "bg-red-600 hover:bg-red-700",
        statusKey: "rejected"
    },
};

function StatusModal({ isOpen, applicant, actionType, onClose, onConfirm }) {
    const [message, setMessage] = useState("");
    if (!isOpen) return null;

    const config = ACTION_CONFIGS[actionType];
    const IconComponent = config.icon;

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
                <div className={`${config.bgClass} border-b px-6 py-4`}>
                    <div className="flex items-center gap-3">
                        <IconComponent className={`w-6 h-6 ${config.iconClass}`} />
                        <h2 className="text-xl font-semibold text-gray-900">{config.title}</h2>
                    </div>
                </div>
                <div className="px-6 py-6 space-y-4">
                    <p className="text-gray-700">Update status for <span className="font-bold">{applicant?.candidateName}</span></p>
                    <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Message to candidate (optional)</label>
                        <textarea
                            className="w-full border rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                            rows="3"
                            placeholder="e.g. We loved your portfolio!"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                    </div>
                </div>
                <div className="bg-gray-50 px-6 py-4 flex gap-3 border-t">
                    <button onClick={onClose} className="flex-1 px-4 py-2 rounded-lg border text-gray-700 font-medium hover:bg-gray-100">Cancel</button>
                    <button onClick={() => onConfirm(config.statusKey, message)} className={`flex-1 px-4 py-2 rounded-lg text-white font-medium ${config.buttonClass}`}>{config.confirmText}</button>
                </div>
            </div>
        </div>
    );
}

function ApplyModal({ isOpen, onClose, onSubmit, jobTitle }) {
    const user = getUserData() || {};
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [file, setFile] = useState(null);
    const [formData, setFormData] = useState({
        candidateName: user.name || "",
        candidateEmail: user.email || "",
        experience: "",
        relocation: "yes", // default
        coverLetter: ""
    });

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) return alert("Please upload your resume PDF.");
        if (!formData.experience) return alert("Please provide your years of experience.");

        setIsSubmitting(true);
        const data = new FormData();
        data.append("candidateName", formData.candidateName);
        data.append("candidateEmail", formData.candidateEmail);
        data.append("experience", formData.experience);
        data.append("relocation", formData.relocation);
        data.append("coverLetter", formData.coverLetter);
        data.append("resume", file);

        await onSubmit(data);
        setIsSubmitting(false);
    };

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-[2.5rem] shadow-2xl max-w-xl w-full overflow-hidden border border-white/20">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-10 py-8 text-white">
                    <h2 className="text-3xl font-black">Apply for {jobTitle}</h2>
                    <p className="text-blue-100 font-medium mt-1">Showcase your skills and land your dream role.</p>
                </div>
                <form className="p-10 space-y-6 max-h-[70vh] overflow-y-auto" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">Full Name</label>
                            <input required className="w-full bg-gray-50 border-gray-200 rounded-2xl px-5 py-4 text-gray-900 font-bold focus:ring-2 focus:ring-blue-500 outline-none transition-all" value={formData.candidateName} onChange={e => setFormData({ ...formData, candidateName: e.target.value })} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">Email Address</label>
                            <input readOnly type="email" className="w-full bg-gray-100 border-gray-200 rounded-2xl px-5 py-4 text-gray-500 font-bold focus:outline-none cursor-not-allowed" value={formData.candidateEmail} />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">Experience (Years)</label>
                            <input 
                                required 
                                type="number"
                                placeholder="e.g. 2"
                                className="w-full bg-gray-50 border-gray-200 rounded-2xl px-5 py-4 text-gray-900 font-bold focus:ring-2 focus:ring-blue-500 outline-none transition-all" 
                                value={formData.experience} 
                                onChange={e => setFormData({ ...formData, experience: e.target.value })} 
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">Willing to Relocate?</label>
                            <div className="flex flex-col gap-2 bg-gray-50 p-3 rounded-2xl border border-gray-100">
                                <label className="flex items-center gap-2 cursor-pointer text-sm font-bold text-gray-700">
                                    <input type="radio" name="relocation" value="yes" checked={formData.relocation === "yes"} onChange={e => setFormData({...formData, relocation: e.target.value})} className="w-4 h-4 text-blue-600" />
                                    Yes, I'm willing
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer text-sm font-bold text-gray-700">
                                    <input type="radio" name="relocation" value="no" checked={formData.relocation === "no"} onChange={e => setFormData({...formData, relocation: e.target.value})} className="w-4 h-4 text-blue-600" />
                                    No
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer text-sm font-bold text-gray-700">
                                    <input type="radio" name="relocation" value="native" checked={formData.relocation === "native"} onChange={e => setFormData({...formData, relocation: e.target.value})} className="w-4 h-4 text-blue-600" />
                                    It's my native place
                                </label>
                            </div>
                            <p className="text-[10px] text-gray-400 mt-2 italic font-medium leading-relaxed">
                                * Let us know if you're comfortable moving to the job location or if you already live there.
                            </p>
                        </div>
                    </div>

                    <div>
                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">Upload Resume (PDF only, max 4MB)</label>
                        <div
                            onClick={() => document.getElementById('apply-resume').click()}
                            className={`border-2 border-dashed rounded-[1.5rem] p-8 text-center cursor-pointer transition-all ${file ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200 hover:bg-gray-100 hover:border-blue-300'}`}
                        >
                            <input
                                id="apply-resume"
                                type="file"
                                accept=".pdf"
                                className="hidden"
                                onChange={e => setFile(e.target.files[0])}
                            />
                            {file ? (
                                <div className="flex items-center justify-center gap-3 text-green-700">
                                    <CheckCircle size={24} />
                                    <span className="font-bold">{file.name}</span>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center gap-2">
                                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm text-blue-600 mb-2">
                                        <FileText size={24} />
                                    </div>
                                    <p className="text-sm font-bold text-gray-600">Click to upload or drag & drop</p>
                                    <p className="text-xs text-gray-400">Your profile will be automatically analyzed by our ATS.</p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div>
                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">Cover Letter / Pitch</label>
                        <textarea
                            className="w-full bg-gray-50 border-gray-200 rounded-2xl px-5 py-4 text-gray-900 font-medium focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                            rows="4"
                            placeholder="Why are you a great fit?"
                            value={formData.coverLetter}
                            onChange={e => setFormData({ ...formData, coverLetter: e.target.value })}
                        />
                    </div>

                    <div className="flex gap-4 pt-6">
                        <button type="button" onClick={onClose} className="flex-1 px-8 py-4 rounded-2xl border-2 border-gray-100 text-gray-500 font-black uppercase tracking-widest hover:bg-gray-50 transition-all">Cancel</button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex-[2] px-8 py-4 rounded-2xl bg-blue-600 text-white font-black uppercase tracking-widest hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-200 transition-all disabled:opacity-50 flex items-center justify-center gap-3"
                        >
                            {isSubmitting ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Analyzing...
                                </>
                            ) : (
                                "Submit Application ✨"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

function CandidateProfile({ applicant, onClose, getScoreColor }) {
    if (!applicant) return null;

    // Helper to construct resume URL
    const getResumeUrl = (path) => {
        if (!path) return null;
        if (path.startsWith('http')) return path;
        return `${BASE_URL}${path.startsWith('/') ? '' : '/'}${path}`;
    };

    return (
         <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-200">
                <div className="bg-gradient-to-r from-slate-800 to-slate-900 px-8 py-6 text-white flex justify-between items-center">
                    <div>
                         <h2 className="text-2xl font-bold flex items-center gap-2">
                            <User className="w-6 h-6" />
                            {applicant.candidateName}
                         </h2>
                         <p className="text-slate-300 flex items-center gap-2 text-sm mt-1">
                            <Mail size={14}/> {applicant.candidateEmail}
                         </p>
                    </div>
                    <button onClick={onClose} className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                        <XCircle className="w-6 h-6" />
                    </button>
                </div>

                <div className="p-8 space-y-8">
                     {/* Quick Info */}
                     <div className="grid grid-cols-2 gap-4">
                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Experience</p>
                            <p className="font-bold text-slate-700">{applicant.experience ? `${applicant.experience} Years` : "Not specified"}</p>
                        </div>
                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Relocation</p>
                            <p className="font-bold text-slate-700">
                                {applicant.relocation === 'yes' ? "Willing to relocate" : 
                                 applicant.relocation === 'no' ? "Not willing" : 
                                 applicant.relocation === 'native' ? "Native place" : "Not specified"}
                            </p>
                        </div>
                     </div>

                     {/* ATS Score */}
                     {applicant.atsResult && (
                         <div className="bg-slate-50 rounded-xl p-5 border border-slate-100 shadow-sm">
                            <div className="flex items-center gap-3 mb-3">
                                <Zap className={`w-5 h-5 ${applicant.atsResult.score >= 70 ? 'text-green-500' : 'text-amber-500'}`} />
                                <h3 className="font-bold text-gray-900 text-lg">ATS Analysis</h3>
                                <span className={`ml-auto px-4 py-1.5 rounded-full text-sm font-bold shadow-sm ${getScoreColor(applicant.atsResult.score)}`}>
                                    {applicant.atsResult.score}% Match
                                </span>
                            </div>
                            <p className="text-gray-700 leading-relaxed bg-white p-4 rounded-lg border border-gray-100">
                                {applicant.atsResult.analysis || "No detailed analysis available."}
                            </p>
                         </div>
                     )}

                     {/* Cover Letter */}
                     <div>
                        <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                            <FileText size={14}/> Cover Letter
                        </h3>
                        <div className="bg-gray-50 rounded-xl p-6 text-gray-700 text-sm leading-relaxed border border-gray-100 shadow-sm whitespace-pre-wrap">
                            {applicant.coverLetter || "No cover letter provided."}
                        </div>
                     </div>

                     {/* Resume Action */}
                     <div className="flex gap-4 pt-4 border-t border-gray-100">
                        {applicant.resume ? (
                            <a
                                href={getResumeUrl(applicant.resume)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-4 rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
                            >
                                <Download size={18} />
                                Download Resume
                            </a>
                        ) : (
                            <div className="flex-1 text-center py-4 text-gray-400 italic bg-gray-50 rounded-xl border border-dashed">
                                No resume attached
                            </div>
                        )}
                     </div>
                </div>
            </div>
         </div>
    );
}

const RenderJobField = ({ title, content }) => {
    if (!content) return null;

    const items = Array.isArray(content) 
        ? content 
        : typeof content === 'string' 
            ? content.split('\n').filter(line => line.trim() !== '')
            : [];

    if (items.length === 0) return null;

    return (
        <div className="mb-6">
            <h4 className="font-semibold text-gray-900 mt-4 mb-2">{title}:</h4>
            {items.length === 1 && typeof content === 'string' && !content.includes('\n') ? (
                <p className="text-gray-700">{items[0]}</p>
            ) : (
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    {items.map((item, i) => (
                        <li key={i}>{item.trim()}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default function JobDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const currentUser = getUserData();
    const isAdmin = currentUser?.role?.toLowerCase() === "admin";
    const [job, setJob] = useState(null);
    const [applicants, setApplicants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userApplication, setUserApplication] = useState(null);
    const [isSaved, setIsSaved] = useState(false);
    const [selectedApplicant, setSelectedApplicant] = useState(null);
    const [modals, setModals] = useState({ apply: false, status: false, actionType: null, profile: false });
    const [notification, setNotification] = useState(null);

    // Fetch all data
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Get job details
                const jobRes = await jobService.getJobById(id);
                setJob(jobRes.data);

                if (currentUser) {
                    // Check user's application
                    const userApp = await jobService.getUserApplicationForJob(currentUser._id || currentUser.id, id);
                    if (userApp) setUserApplication(userApp);

                    // Check if saved
                    const isSavedStatus = await jobService.checkIfJobSaved(currentUser._id || currentUser.id, id);
                    setIsSaved(isSavedStatus);

                    // Fetch applicants (if employer)
                    if (isAdmin) {
                        try {
                            const appRes = await jobService.getJobApplicants(id);
                            setApplicants(appRes.data);
                        } catch (err) {
                            // Silently fail or log
                        }
                    }
                }
            } catch (err) {
                console.error("Fetch error:", err);
                setError("Could not load job data.");
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchData();
    }, [id, currentUser]);

    const handleApply = async (formData) => {
        if (!currentUser) return alert("Please login to apply");
        try {
            const res = await jobService.submitApplication(id, currentUser._id || currentUser.id, formData);
            setUserApplication(res.data);
            setModals({ ...modals, apply: false });
            showNotify("Application submitted successfully! Your ATS score has been calculated. ✨");

            // Refresh applicants if viewing as employer
            try {
                const appRes = await jobService.getJobApplicants(id);
                setApplicants(appRes.data);
            } catch (err) {
                // Not an employer
            }
        } catch (err) {
            alert(err.response?.data?.message || "Failed to apply");
        }
    };

    const handleSaveToggle = async () => {
        if (!currentUser) return alert("Please login to save jobs");
        try {
            await jobService.saveJob(id, currentUser._id || currentUser.id);
            setIsSaved(true);
            showNotify("Job saved to your profile! 🔖");
        } catch (err) {
            alert(err.response?.data?.message || "Already saved");
        }
    };

    const handleUpdateStatus = async (status, message) => {
        if (!selectedApplicant) return;
        try {
            const res = await jobService.updateApplicationStatus(
                selectedApplicant._id,
                status,
                message
            );
            setApplicants(applicants.map(a => a._id === res.data._id ? res.data : a));
            setModals({ ...modals, status: false });
            setSelectedApplicant(null);
            showNotify("Status updated successfully! ✓");
        } catch (err) {
            alert("Failed to update status");
        }
    };

    const showNotify = (msg) => {
        setNotification(msg);
        setTimeout(() => setNotification(null), 3000);
    };

    const getScoreColor = (score) => {
        if (score >= 80) return "text-green-600 bg-green-50 border-green-200";
        if (score >= 50) return "text-amber-600 bg-amber-50 border-amber-200";
        return "text-red-600 bg-red-50 border-red-200";
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader className="w-12 h-12 text-blue-600 animate-spin" /></div>;
    if (error || !job) return <div className="min-h-screen flex flex-col items-center justify-center"><h2 className="text-2xl font-bold mb-4">{error || "Job not found"}</h2><Link to="/hr-forum" className="text-blue-600 hover:underline">Back to listings</Link></div>;

    return (
        <div className="min-h-screen bg-gray-50 flex gap-6 p-6">
            {/* LEFT – Job Summary (Sticky, navbar-safe) */}
            <aside className="w-1/4 bg-white border rounded-lg p-5 h-fit sticky top-[80px]">
                <Link to="/hr-forum" className="inline-flex items-center gap-2 text-blue-600 font-medium mb-6 hover:translate-x-[-4px] transition-transform">
                    <ChevronLeft className="w-4 h-4" /> Back to Search
                </Link>
                
                <h2 className="text-lg font-semibold mb-2">{job.jobTitle}</h2>

                <p className="text-sm text-gray-600 mb-4 flex items-center gap-2">
                    <MapPin className="w-4 h-4" /> {job.location} · {job.companyName}
                </p>

                <div className="space-y-2 text-sm mb-4">
                    <p><strong>Job type:</strong> {job.jobTypes?.join(", ") || "N/A"}</p>
                    <p><strong>Experience:</strong> {job.experienceRequired || "N/A"}</p>
                    <p><strong>Salary:</strong> ₹{job.payRange?.min?.toLocaleString()} – ₹{job.payRange?.max?.toLocaleString()}</p>
                    <p><strong>Status:</strong> <span className="text-green-600">Open</span></p>
                </div>

                {/* Required Skills */}
                {job.requiredSkills && job.requiredSkills.length > 0 && (
                    <div className="mb-5">
                        <p className="text-sm font-medium mb-2">Required Skills</p>
                        <div className="flex flex-wrap gap-2">
                            {job.requiredSkills.map((skill) => (
                                <span
                                    key={skill}
                                    className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Buttons */}
                <div className="flex flex-col gap-3">
                    {!userApplication ? (
                        <button
                            onClick={() => setModals({ ...modals, apply: true })}
                            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                        >
                            <Send className="w-4 h-4" /> Apply Now
                        </button>
                    ) : (
                        <div className="w-full bg-green-50 text-green-700 border border-green-200 py-3 px-4 rounded-lg font-bold text-center flex flex-col items-center">
                            <span className="flex items-center gap-2"><CheckCircle className="w-5 h-5" /> Applied</span>
                            <span className="text-xs font-normal mt-1 text-green-600">
                                Status: {userApplication.status.charAt(0).toUpperCase() + userApplication.status.slice(1)}
                            </span>
                            {userApplication.message && (
                                <p className="mt-2 text-[10px] font-medium text-slate-500 bg-white/50 p-2 rounded-md border border-green-100 italic">
                                    "{userApplication.message}"
                                </p>
                            )}
                        </div>
                    )}

                    <button
                        onClick={handleSaveToggle}
                        className={`w-full border py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${isSaved ? "bg-blue-50 text-blue-600 border-blue-200" : "hover:bg-gray-50 text-gray-700"}`}
                    >
                        {isSaved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                        {isSaved ? "Saved" : "Save Job"}
                    </button>
                </div>
            </aside>

            {/* MAIN – Details & Applicants */}
            <main className="flex-1 space-y-6">
                {/* Description */}
                <section className="bg-white border rounded-lg p-6">
                    <h3 className="text-lg font-bold mb-4">About the Job</h3>
                    <div className="prose prose-sm max-w-none text-gray-700 space-y-4">
                        <p>{job.description}</p>
                        
                        <RenderJobField title="Key Responsibilities" content={job.responsibilities} />
                        <RenderJobField title="Role Summary" content={job.roleSummary} />
                        <RenderJobField title="Qualifications" content={job.qualifications} />
                        <RenderJobField title="About the Role" content={job.about} />
                    </div>
                </section>

                {/* Applicants Section (Only for Employer/Admin) */}
                {isAdmin && applicants.length > 0 && (
                    <section>
                        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                            Applicants <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">{applicants.length}</span>
                        </h3>
                        <div className="grid grid-cols-1 gap-3">
                            {applicants.map((app) => (
                                <Link
                                    to={`/candidate-profile/${app._id}`}
                                    key={app._id}
                                    className="bg-white border rounded-lg p-4 flex items-center justify-between hover:shadow-md transition-shadow cursor-pointer group"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                                            app.atsResult?.score >= 80 ? 'bg-green-500' : 
                                            app.atsResult?.score >= 50 ? 'bg-amber-500' : 'bg-red-500'
                                        }`}>
                                            {app.atsResult?.score || 0}%
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{app.candidateName}</p>
                                            <p className="text-xs text-gray-500 mt-1">
                                                {app.atsResult && (
                                                    <span className={`px-2 py-0.5 rounded-full border text-[10px] font-bold ${getScoreColor(app.atsResult.score)}`}>
                                                        {app.atsResult.score}% Match
                                                    </span>
                                                )}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <span className={`text-[10px] font-bold px-3 py-1 rounded-full border ${app.status === 'shortlisted'
                                                ? 'bg-green-50 text-green-700 border-green-200'
                                                : app.status === 'rejected'
                                                    ? 'bg-red-50 text-red-700 border-red-200'
                                                    : 'bg-amber-50 text-amber-700 border-amber-200'
                                            }`}>
                                            {app.status}
                                        </span>
                                        <div className="flex items-center gap-1 ml-2">
                                            <button
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    setSelectedApplicant(app);
                                                    setModals({ ...modals, status: true, actionType: 'interested' });
                                                }}
                                                className="p-2 border rounded-lg hover:bg-green-50 hover:border-green-300 group/btn transition-all"
                                                title="Shortlist Candidate"
                                            >
                                                <CheckCircle className="w-4 h-4 text-gray-400 group-hover/btn:text-green-600" />
                                            </button>
                                            <button
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    setSelectedApplicant(app);
                                                    setModals({ ...modals, status: true, actionType: 'clarify' });
                                                }}
                                                className="p-2 border rounded-lg hover:bg-amber-50 hover:border-amber-300 group/btn transition-all"
                                                title="Need Clarification"
                                            >
                                                <HelpCircle className="w-4 h-4 text-gray-400 group-hover/btn:text-amber-600" />
                                            </button>
                                            <button
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    setSelectedApplicant(app);
                                                    setModals({ ...modals, status: true, actionType: 'rejected' });
                                                }}
                                                className="p-2 border rounded-lg hover:bg-red-50 hover:border-red-300 group/btn transition-all"
                                                title="Reject Candidate"
                                            >
                                                <XCircle className="w-4 h-4 text-gray-400 group-hover/btn:text-red-600" />
                                            </button>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}
            </main>

            {/* Modals */}
            <ApplyModal
                isOpen={modals.apply}
                onClose={() => setModals({ ...modals, apply: false })}
                onSubmit={handleApply}
                jobTitle={job.jobTitle}
            />
            <StatusModal
                isOpen={modals.status}
                applicant={selectedApplicant}
                actionType={modals.actionType}
                onClose={() => setModals({ ...modals, status: false })}
                onConfirm={handleUpdateStatus}
            />
            
            <CandidateProfile 
                applicant={modals.profile ? selectedApplicant : null}
                onClose={() => setModals({ ...modals, profile: false })}
                getScoreColor={getScoreColor}
            />

            {/* Notification */}
            {notification && (
                <div className="fixed bottom-8 right-8 bg-gray-900 border border-gray-700 text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 z-50">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <p className="font-bold">{notification}</p>
                </div>
            )}
        </div>
    );
}
