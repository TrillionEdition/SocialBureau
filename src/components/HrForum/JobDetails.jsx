// // import React, { useEffect, useState } from "react";
// // import { Link, useParams } from "react-router-dom";
// // import axios from "axios";
// // import { ChevronLeft, CheckCircle, HelpCircle, XCircle, MapPin, Building, Calendar, DollarSign, Clock, Send, Bookmark, BookmarkCheck, Edit2, ExternalLink, Loader, FileText, Zap } from "lucide-react";
// // import { getUserData } from "../../../utils/authUtils";

// // const API_BASE_URL = "http://localhost:5000/hr-jobs";
// // const APPLICATIONS_URL = "http://localhost:5000/hr-applications";

// // const ACTION_CONFIGS = {
// //     interested: {
// //         icon: CheckCircle,
// //         title: "Mark as Shortlisted",
// //         color: "green",
// //         description: "Candidate will be notified they are shortlisted.",
// //         confirmText: "Shortlist",
// //         bgClass: "bg-green-50 border-green-200",
// //         iconClass: "text-green-600",
// //         buttonClass: "bg-green-600 hover:bg-green-700",
// //         statusKey: "shortlisted"
// //     },
// //     clarify: {
// //         icon: HelpCircle,
// //         title: "Need Clarification",
// //         color: "amber",
// //         description: "Request more info. They will see this status.",
// //         confirmText: "Request Info",
// //         bgClass: "bg-amber-50 border-amber-200",
// //         iconClass: "text-amber-600",
// //         buttonClass: "bg-amber-600 hover:bg-amber-700",
// //         statusKey: "pending"
// //     },
// //     rejected: {
// //         icon: XCircle,
// //         title: "Reject Candidate",
// //         color: "red",
// //         description: "Mark as not suitable for this role.",
// //         confirmText: "Reject",
// //         bgClass: "bg-red-50 border-red-200",
// //         iconClass: "text-red-600",
// //         buttonClass: "bg-red-600 hover:bg-red-700",
// //         statusKey: "rejected"
// //     },
// // };

// // function StatusModal({ isOpen, applicant, actionType, onClose, onConfirm }) {
// //     const [message, setMessage] = useState("");
// //     if (!isOpen) return null;

// //     const config = ACTION_CONFIGS[actionType];
// //     const IconComponent = config.icon;

// //     return (
// //         <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
// //             <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
// //                 <div className={`${config.bgClass} border-b px-6 py-4`}>
// //                     <div className="flex items-center gap-3">
// //                         <IconComponent className={`w-6 h-6 ${config.iconClass}`} />
// //                         <h2 className="text-xl font-semibold text-gray-900">{config.title}</h2>
// //                     </div>
// //                 </div>
// //                 <div className="px-6 py-6 space-y-4">
// //                     <p className="text-gray-700">Update status for <span className="font-bold">{applicant.candidateName}</span></p>
// //                     <div>
// //                         <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Message to candidate (optional)</label>
// //                         <textarea
// //                             className="w-full border rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
// //                             rows="3"
// //                             placeholder="e.g. We loved your portfolio!"
// //                             value={message}
// //                             onChange={(e) => setMessage(e.target.value)}
// //                         />
// //                     </div>
// //                 </div>
// //                 <div className="bg-gray-50 px-6 py-4 flex gap-3 border-t">
// //                     <button onClick={onClose} className="flex-1 px-4 py-2 rounded-lg border text-gray-700 font-medium hover:bg-gray-100">Cancel</button>
// //                     <button onClick={() => onConfirm(config.statusKey, message)} className={`flex-1 px-4 py-2 rounded-lg text-white font-medium ${config.buttonClass}`}>{config.confirmText}</button>
// //                 </div>
// //             </div>
// //         </div>
// //     );
// // }

// // function ApplyModal({ isOpen, onClose, onSubmit, jobTitle }) {
// //     const user = getUserData() || {};
// //     const [isSubmitting, setIsSubmitting] = useState(false);
// //     const [file, setFile] = useState(null);
// //     const [relocationInterest, setRelocationInterest] = useState(false);
// //     const [formData, setFormData] = useState({
// //         candidateName: user.name || "",
// //         candidateEmail: user.email || "",
// //         coverLetter: ""
// //     });

// //     if (!isOpen) return null;

// //     const handleSubmit = async (e) => {
// //         e.preventDefault();
// //         if (!file) return alert("Please upload your resume PDF.");

// //         setIsSubmitting(true);
// //         const data = new FormData();
// //         data.append("candidateName", formData.candidateName);
// //         data.append("candidateEmail", formData.candidateEmail);
// //         data.append("coverLetter", formData.coverLetter);
// //         data.append("relocationInterest", relocationInterest);
// //         data.append("resume", file);

// //         await onSubmit(data);
// //         setIsSubmitting(false);
// //     };

// //     return (
// //         <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
// //             <div className="bg-white rounded-[2.5rem] shadow-2xl max-w-xl w-full overflow-hidden border border-white/20">
// //                 <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-10 py-8 text-white">
// //                     <h2 className="text-3xl font-black">Apply for {jobTitle}</h2>
// //                     <p className="text-blue-100 font-medium mt-1">Showcase your skills and land your dream role.</p>
// //                 </div>
// //                 <form className="p-10 space-y-6" onSubmit={handleSubmit}>
// //                     <div className="grid grid-cols-2 gap-6">
// //                         <div>
// //                             <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">Full Name</label>
// //                             <input required className="w-full bg-gray-50 border-gray-200 rounded-2xl px-5 py-4 text-gray-900 font-bold focus:ring-2 focus:ring-blue-500 outline-none transition-all" value={formData.candidateName} onChange={e => setFormData({ ...formData, candidateName: e.target.value })} />
// //                         </div>
// //                         <div>
// //                             <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">Email Address</label>
// //                             <input readOnly type="email" className="w-full bg-gray-100 border-gray-200 rounded-2xl px-5 py-4 text-gray-500 font-bold focus:outline-none cursor-not-allowed" value={formData.candidateEmail} />
// //                         </div>
// //                     </div>

// //                     <div>
// //                         <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">Upload Resume (PDF only, max 4MB)</label>
// //                         <div
// //                             onClick={() => document.getElementById('apply-resume').click()}
// //                             className={`border-2 border-dashed rounded-[1.5rem] p-8 text-center cursor-pointer transition-all ${file ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200 hover:bg-gray-100 hover:border-blue-300'}`}
// //                         >
// //                             <input
// //                                 id="apply-resume"
// //                                 type="file"
// //                                 accept=".pdf"
// //                                 className="hidden"
// //                                 onChange={e => setFile(e.target.files[0])}
// //                             />
// //                             {file ? (
// //                                 <div className="flex items-center justify-center gap-3 text-green-700">
// //                                     <CheckCircle size={24} />
// //                                     <span className="font-bold">{file.name}</span>
// //                                 </div>
// //                             ) : (
// //                                 <div className="flex flex-col items-center gap-2">
// //                                     <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm text-blue-600 mb-2">
// //                                         <FileText size={24} />
// //                                     </div>
// //                                     <p className="text-sm font-bold text-gray-600">Click to upload or drag & drop</p>
// //                                     <p className="text-xs text-gray-400">Your profile will be automatically analyzed by our ATS.</p>
// //                                 </div>
// //                             )}
// //                         </div>
// //                     </div>

// //                     <div>
// //                         <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">Cover Letter / Pitch</label>
// //                         <textarea
// //                             className="w-full bg-gray-50 border-gray-200 rounded-2xl px-5 py-4 text-gray-900 font-medium focus:ring-2 focus:ring-blue-500 outline-none transition-all"
// //                             rows="4"
// //                             placeholder="Why are you a great fit?"
// //                             value={formData.coverLetter}
// //                             onChange={e => setFormData({ ...formData, coverLetter: e.target.value })}
// //                         />
// //                     </div>

// //                     <div className="flex gap-4 pt-6">
// //                         <button type="button" onClick={onClose} className="flex-1 px-8 py-4 rounded-2xl border-2 border-gray-100 text-gray-500 font-black uppercase tracking-widest hover:bg-gray-50 transition-all">Cancel</button>
// //                         <button
// //                             type="submit"
// //                             disabled={isSubmitting}
// //                             className="flex-[2] px-8 py-4 rounded-2xl bg-blue-600 text-white font-black uppercase tracking-widest hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-200 transition-all disabled:opacity-50 flex items-center justify-center gap-3"
// //                         >
// //                             {isSubmitting ? (
// //                                 <>
// //                                     <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
// //                                     Analyzing...
// //                                 </>
// //                             ) : (
// //                                 "Submit Application ✨"
// //                             )}
// //                         </button>
// //                     </div>
// //                 </form>
// //             </div>
// //         </div>
// //     );
// // }

// // export default function JobDetails() {
// //     const { id } = useParams();
// //     const currentUser = getUserData();
// //     const [job, setJob] = useState(null);
// //     const [applicants, setApplicants] = useState([]);
// //     const [loading, setLoading] = useState(true);
// //     const [applying, setApplying] = useState(false);
// //     const [error, setError] = useState(null);
// //     const [userApplication, setUserApplication] = useState(null);
// //     const [isSaved, setIsSaved] = useState(false);

// //     const [modals, setModals] = useState({ apply: false, status: false, targetApplicant: null, actionType: null });
// //     const [notification, setNotification] = useState(null);

// //     useEffect(() => {
// //         const fetchData = async () => {
// //             try {
// //                 const jobRes = await axios.get(`${API_BASE_URL}/${id}`);
// //                 setJob(jobRes.data);

// //                 if (currentUser) {
// //                     // Check if user already applied
// //                     const appsRes = await axios.get(`${APPLICATIONS_URL}/user-applications/${currentUser._id || currentUser.id}`);
// //                     const existingApp = appsRes.data.find(a => a.jobId._id === id);
// //                     if (existingApp) setUserApplication(existingApp);

// //                     // Check if saved
// //                     const savedRes = await axios.get(`${APPLICATIONS_URL}/user-saved-jobs/${currentUser._id || currentUser.id}`);
// //                     setIsSaved(savedRes.data.some(s => s._id === id));

// //                     // IF EMPLOYER (Simple check: if job has employer info that matches, or just show if admin)
// //                     // For now, let's just fetch applicants to show the flow
// //                     const applicantsRes = await axios.get(`${APPLICATIONS_URL}/job-applicants/${id}`);
// //                     setApplicants(applicantsRes.data);
// //                 }
// //             } catch (err) {
// //                 console.error("Fetch error:", err);
// //                 setError("Could not load job data.");
// //             } finally {
// //                 setLoading(false);
// //             }
// //         };
// //         if (id) fetchData();
// //     }, [id]);

// //     const handleApply = async (formData) => {
// //         if (!currentUser) return alert("Please login to apply");
// //         try {
// //             formData.append("jobId", id);
// //             formData.append("userId", currentUser._id || currentUser.id);

// //             const res = await axios.post(`${APPLICATIONS_URL}/apply`, formData, {
// //                 headers: { "Content-Type": "multipart/form-data" }
// //             });
// //             setUserApplication(res.data);
// //             setModals({ ...modals, apply: false });
// //             showNotify("Application submitted successfully! Your ATS score has been calculated. ✨");
// //             // Refresh applicants if we are also employer
// //             const applicantsRes = await axios.get(`${APPLICATIONS_URL}/job-applicants/${id}`);
// //             setApplicants(applicantsRes.data);
// //         } catch (err) {
// //             alert(err.response?.data?.message || "Failed to apply");
// //         }
// //     };

// //     const getScoreColor = (score) => {
// //         if (score >= 80) return "text-green-600 bg-green-50 border-green-200";
// //         if (score >= 50) return "text-amber-600 bg-amber-50 border-amber-200";
// //         return "text-red-600 bg-red-50 border-red-200";
// //     };

// //     const handleSaveToggle = async () => {
// //         if (!currentUser) return alert("Please login to save jobs");
// //         try {
// //             await axios.post(`${APPLICATIONS_URL}/save`, { jobId: id, userId: currentUser._id || currentUser.id });
// //             setIsSaved(true);
// //             showNotify("Job saved to your profile! 🔖");
// //         } catch (err) {
// //             alert(err.response?.data?.message || "Already saved");
// //         }
// //     };

// //     const handleUpdateStatus = async (status, message) => {
// //         try {
// //             const res = await axios.put(`${APPLICATIONS_URL}/update-status/${modals.targetApplicant._id}`, { status, message });
// //             setApplicants(applicants.map(a => a._id === res.data._id ? res.data : a));
// //             setModals({ ...modals, status: false });
// //             showNotify("Status updated successfully! ✓");
// //         } catch (err) {
// //             alert("Failed to update status");
// //         }
// //     };

// //     const showNotify = (msg) => {
// //         setNotification(msg);
// //         setTimeout(() => setNotification(null), 3000);
// //     };

// //     if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>;
// //     if (error || !job) return <div className="min-h-screen flex flex-col items-center justify-center"><h2 className="text-2xl font-bold mb-4">{error || "Job not found"}</h2><Link to="/job-listing" className="text-blue-600 hover:underline">Back to listings</Link></div>;

// //     return (
// //         <div className="min-h-screen bg-gray-50 pb-12">
// //             <main className="max-w-6xl mx-auto px-4 py-8">
// //                 <Link to="/hr-forum" className="inline-flex items-center gap-2 text-blue-600 font-medium mb-6 hover:translate-x-[-4px] transition-transform">
// //                     <ChevronLeft className="w-4 h-4" /> Back to Search
// //                 </Link>

// //                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
// //                     <div className="lg:col-span-2 space-y-8">
// //                         <section className="bg-white rounded-3xl shadow-sm border p-8">
// //                             <div className="flex justify-between items-start mb-6">
// //                                 <div>
// //                                     <h1 className="text-4xl font-black text-gray-900 mb-2">{job.jobTitle}</h1>
// //                                     <div className="flex flex-wrap gap-4 text-gray-500 font-medium">
// //                                         <div className="flex items-center gap-1.5"><Building className="w-4 h-4" /> {job.companyName}</div>
// //                                         <div className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {job.location} · {job.locationType}</div>
// //                                     </div>
// //                                 </div>
// //                                 <div className="flex gap-2">
// //                                     <button onClick={handleSaveToggle} className={`p-3 rounded-2xl border transition-all ${isSaved ? "bg-amber-50 border-amber-200 text-amber-600" : "bg-white border-gray-200 text-gray-400 hover:text-amber-500"}`}>
// //                                         {isSaved ? <BookmarkCheck className="w-6 h-6 fill-current" /> : <Bookmark className="w-6 h-6" />}
// //                                     </button>
// //                                 </div>
// //                             </div>

// //                             <div className="grid grid-cols-2 gap-4 py-6 border-y border-gray-100 mb-8">
// //                                 <div className="p-4 bg-gray-50 rounded-2xl">
// //                                     <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Monthly Pay</p>
// //                                     <p className="text-xl font-bold text-gray-900">₹{job.payRange?.min?.toLocaleString()} - ₹{job.payRange?.max?.toLocaleString()}</p>
// //                                 </div>
// //                                 <div className="p-4 bg-gray-50 rounded-2xl">
// //                                     <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Employment</p>
// //                                     <p className="text-xl font-bold text-gray-900">{job.jobTypes?.join(", ")}</p>
// //                                 </div>
// //                             </div>

// //                             <div className="prose prose-blue max-w-none">
// //                                 <h3 className="text-xl font-bold text-gray-900 mb-4">The Role</h3>
// //                                 <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">{job.description}</p>

// //                                 {job.benefits?.length > 0 && (
// //                                     <div className="mt-8">
// //                                         <h3 className="text-xl font-bold text-gray-900 mb-4">Perks & Benefits</h3>
// //                                         <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
// //                                             {job.benefits.map((b, i) => (
// //                                                 <div key={i} className="flex items-center gap-3 p-3 border rounded-xl bg-blue-50/30 text-blue-700 font-medium">
// //                                                     <CheckCircle className="w-5 h-5 flex-shrink-0" /> {b}
// //                                                 </div>
// //                                             ))}
// //                                         </div>
// //                                     </div>
// //                                 )}
// //                             </div>
// //                         </section>

// //                         {/* APPLICANT QUEUE (FOR EMPLOYER/ADMIN) */}
// //                         {currentUser && (
// //                             <section className="bg-white rounded-3xl shadow-sm border overflow-hidden">
// //                                 <div className="p-6 border-b flex justify-between items-center bg-gray-50/50">
// //                                     <h3 className="text-xl font-bold text-gray-900">Active Applicants</h3>
// //                                     <span className="bg-blue-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">{applicants.length} Total</span>
// //                                 </div>
// //                                 <div className="divide-y">
// //                                     {applicants.length === 0 ? (
// //                                         <div className="p-12 text-center text-gray-400 font-medium">No applications yet.</div>
// //                                     ) : (
// //                                         applicants.map(app => (
// //                                             <div key={app._id} className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors">
// //                                                 <div className="flex items-center gap-4">
// //                                                     <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
// //                                                         {app.candidateName.charAt(0)}
// //                                                     </div>
// //                                                     <div>
// //                                                         <p className="font-bold text-gray-900">{app.candidateName}</p>
// //                                                         <div className="flex items-center gap-3">
// //                                                             <a href={app.resumeUrl} target="_blank" rel="noreferrer" className="text-xs text-blue-600 hover:underline font-bold">View Portfolio</a>
// //                                                             {app.atsResult && (
// //                                                                 <span className={`text-[10px] font-black px-2 py-0.5 rounded-full border ${getScoreColor(app.atsResult.score)}`}>
// //                                                                     {app.atsResult.score}% Match
// //                                                                 </span>
// //                                                             )}
// //                                                         </div>
// //                                                     </div>
// //                                                 </div>
// //                                                 <div className="flex items-center gap-3">
// //                                                     <span className={`text-[10px] font-black uppercase px-3 py-1.5 rounded-lg border tracking-wider ${app.status === 'shortlisted' ? 'bg-green-50 text-green-700 border-green-200' :
// //                                                         app.status === 'rejected' ? 'bg-red-50 text-red-700 border-red-200' : 'bg-amber-50 text-amber-700 border-amber-200'
// //                                                         }`}>
// //                                                         {app.status}
// //                                                     </span>
// //                                                     <button onClick={() => setModals({ ...modals, status: true, targetApplicant: app, actionType: 'interested' })} className="p-2 border rounded-xl hover:bg-gray-100 transition-colors">
// //                                                         <Edit2 className="w-4 h-4 text-gray-500" />
// //                                                     </button>
// //                                                 </div>
// //                                             </div>
// //                                         ))
// //                                     )}
// //                                 </div>
// //                             </section>
// //                         )}
// //                     </div>

// //                     <div className="space-y-6">
// //                         <div className="bg-white rounded-3xl shadow-sm border p-6 sticky top-8">
// //                             {userApplication ? (
// //                                 <div className="space-y-4">
// //                                     <div className={`p-6 rounded-2xl border-2 text-center ${userApplication.status === 'shortlisted' ? 'bg-green-50 border-green-200 text-green-800' :
// //                                         userApplication.status === 'rejected' ? 'bg-red-50 border-red-200 text-red-800' : 'bg-blue-50 border-blue-200 text-blue-800'
// //                                         }`}>
// //                                         <p className="text-xs font-black uppercase tracking-widest mb-2">Application Status</p>
// //                                         <p className="text-xl font-black capitalize mb-2">{userApplication.status}</p>

// //                                         {userApplication.atsResult && (
// //                                             <div className={`mt-3 px-3 py-1 rounded-full border inline-block text-[10px] font-black uppercase tracking-wider ${getScoreColor(userApplication.atsResult.score)}`}>
// //                                                 Match Score: {userApplication.atsResult.score}%
// //                                             </div>
// //                                         )}

// //                                         {userApplication.employerMessage && (
// //                                             <div className="mt-4 p-3 bg-white/50 rounded-xl text-sm italic border border-white/20">
// //                                                 "{userApplication.employerMessage}"
// //                                             </div>
// //                                         )}
// //                                     </div>
// //                                     <p className="text-xs text-center text-gray-400 font-medium">Applied on {new Date(userApplication.appliedAt).toLocaleDateString()}</p>
// //                                 </div>
// //                             ) : (
// //                                 <div className="space-y-4">
// //                                     {(job.applicationLink || job.companyWebsite) ? (
// //                                         <a
// //                                             href={job.applicationLink || job.companyWebsite}
// //                                             target="_blank"
// //                                             rel="noopener noreferrer"
// //                                             className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black text-lg hover:bg-indigo-700 hover:shadow-xl hover:shadow-indigo-200 transition-all flex items-center justify-center gap-3"
// //                                         >
// //                                             <Send className="w-5 h-5" /> Apply on External Site
// //                                         </a>
// //                                     ) : (
// //                                         <button onClick={() => setModals({ ...modals, apply: true })} className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black text-lg hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-200 transition-all flex items-center justify-center gap-3">
// //                                             <Send className="w-5 h-5" /> Apply Now
// //                                         </button>
// //                                     )}
// //                                     <p className="text-center text-xs text-gray-400 font-medium">No account required to browse, but login to track applications.</p>
// //                                 </div>
// //                             )}

// //                             <div className="mt-8 pt-8 border-t border-gray-100">
// //                                 <h4 className="font-black text-sm text-gray-900 mb-4 uppercase tracking-widest">About the Company</h4>
// //                                 <div className="flex items-center gap-3 mb-4">
// //                                     <div className="w-10 h-10 rounded-xl bg-gray-900 flex items-center justify-center text-white font-bold">{job.companyName.charAt(0)}</div>
// //                                     <div>
// //                                         <p className="font-bold text-sm">{job.companyName}</p>
// //                                         <p className="text-xs text-gray-500">Multinational Creative Agency</p>
// //                                     </div>
// //                                 </div>
// //                                 <p className="text-xs text-gray-500 leading-relaxed italic">"SocialBureau is a high-performance ecosystem for high-growth brands. We don’t just build campaigns; we architect results."</p>
// //                             </div>
// //                         </div>
// //                     </div>
// //                 </div>
// //             </main>

// //             <ApplyModal isOpen={modals.apply} onClose={() => setModals({ ...modals, apply: false })} onSubmit={handleApply} jobTitle={job.jobTitle} />
// //             <StatusModal
// //                 isOpen={modals.status}
// //                 applicant={modals.targetApplicant}
// //                 actionType={modals.actionType}
// //                 onClose={() => setModals({ ...modals, status: false })}
// //                 onConfirm={handleUpdateStatus}
// //             />

// //             {notification && (
// //                 <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-gray-900 border border-gray-700 text-white px-6 py-4 rounded-3xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-bottom-5 duration-300 z-[100]">
// //                     <CheckCircle className="w-5 h-5 text-green-400" />
// //                     <p className="font-bold text-sm">{notification}</p>
// //                 </div>
// //             )}
// //         </div>
// //     );
// // }


// import React, { useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import { ChevronLeft, CheckCircle, HelpCircle, XCircle, MapPin, Building, DollarSign, FileText, Bookmark, BookmarkCheck, Edit2, Send, Loader } from "lucide-react";
// import { getUserData } from "../../../utils/authUtils";
// import * as jobService from "../../../services/jobService";

// const ACTION_CONFIGS = {
//     interested: {
//         icon: CheckCircle,
//         title: "Mark as Shortlisted",
//         color: "green",
//         confirmText: "Shortlist",
//         bgClass: "bg-green-50 border-green-200",
//         iconClass: "text-green-600",
//         buttonClass: "bg-green-600 hover:bg-green-700",
//     },
//     clarify: {
//         icon: HelpCircle,
//         title: "Need Clarification",
//         color: "amber",
//         confirmText: "Request Info",
//         bgClass: "bg-amber-50 border-amber-200",
//         iconClass: "text-amber-600",
//         buttonClass: "bg-amber-600 hover:bg-amber-700",
//     },
//     rejected: {
//         icon: XCircle,
//         title: "Reject Candidate",
//         color: "red",
//         confirmText: "Reject",
//         bgClass: "bg-red-50 border-red-200",
//         iconClass: "text-red-600",
//         buttonClass: "bg-red-600 hover:bg-red-700",
//     },
// };

// function StatusModal({ isOpen, applicant, actionType, onClose, onConfirm }) {
//     const [message, setMessage] = useState("");
//     if (!isOpen) return null;

//     const config = ACTION_CONFIGS[actionType];
//     const IconComponent = config.icon;

//     return (
//         <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//             <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
//                 <div className={`${config.bgClass} border-b px-6 py-4`}>
//                     <div className="flex items-center gap-3">
//                         <IconComponent className={`w-6 h-6 ${config.iconClass}`} />
//                         <h2 className="text-xl font-semibold text-gray-900">{config.title}</h2>
//                     </div>
//                 </div>
//                 <div className="px-6 py-6 space-y-4">
//                     <p className="text-gray-700">Update status for <span className="font-bold">{applicant?.candidateName}</span></p>
//                     <div>
//                         <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Message to candidate (optional)</label>
//                         <textarea
//                             className="w-full border rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
//                             rows="3"
//                             placeholder="e.g. We'd love to chat!"
//                             value={message}
//                             onChange={(e) => setMessage(e.target.value)}
//                         />
//                     </div>
//                 </div>
//                 <div className="bg-gray-50 px-6 py-4 flex gap-3 border-t">
//                     <button onClick={onClose} className="flex-1 px-4 py-2 rounded-lg border text-gray-700 font-medium hover:bg-gray-100">Cancel</button>
//                     <button onClick={() => onConfirm(message)} className={`flex-1 px-4 py-2 rounded-lg text-white font-medium ${config.buttonClass}`}>{config.confirmText}</button>
//                 </div>
//             </div>
//         </div>
//     );
// }

// function ApplyModal({ isOpen, onClose, onSubmit, jobTitle }) {
//     const user = getUserData() || {};
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [file, setFile] = useState(null);
//     const [relocationInterest, setRelocationInterest] = useState(false);
//     const [formData, setFormData] = useState({
//         candidateName: user.name || "",
//         candidateEmail: user.email || "",
//         coverLetter: ""
//     });

//     if (!isOpen) return null;

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (!file) return alert("Please upload your resume PDF.");

//         setIsSubmitting(true);
//         await onSubmit({
//             candidateName: formData.candidateName,
//             candidateEmail: formData.candidateEmail,
//             coverLetter: formData.coverLetter,
//             relocationInterest,
//             resume: file
//         });
//         setIsSubmitting(false);
//     };

//     return (
//         <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//             <div className="bg-white rounded-[2.5rem] shadow-2xl max-w-xl w-full overflow-hidden border border-white/20">
//                 <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-10 py-8 text-white">
//                     <h2 className="text-3xl font-black">Apply for {jobTitle}</h2>
//                     <p className="text-blue-100 font-medium mt-1">Showcase your skills and land your dream role.</p>
//                 </div>
//                 <form className="p-10 space-y-6" onSubmit={handleSubmit}>
//                     <div className="grid grid-cols-2 gap-6">
//                         <div>
//                             <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">Full Name</label>
//                             <input required className="w-full bg-gray-50 border-gray-200 rounded-2xl px-5 py-4 text-gray-900 font-bold focus:ring-2 focus:ring-blue-500 outline-none transition-all border" value={formData.candidateName} onChange={e => setFormData({ ...formData, candidateName: e.target.value })} />
//                         </div>
//                         <div>
//                             <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">Email Address</label>
//                             <input readOnly type="email" className="w-full bg-gray-100 border-gray-200 rounded-2xl px-5 py-4 text-gray-500 font-bold focus:outline-none cursor-not-allowed border" value={formData.candidateEmail} />
//                         </div>
//                     </div>

//                     <div>
//                         <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">Upload Resume (PDF only, max 4MB)</label>
//                         <div
//                             onClick={() => document.getElementById('apply-resume').click()}
//                             className={`border-2 border-dashed rounded-[1.5rem] p-8 text-center cursor-pointer transition-all ${file ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200 hover:bg-gray-100 hover:border-blue-300'}`}
//                         >
//                             <input
//                                 id="apply-resume"
//                                 type="file"
//                                 accept=".pdf"
//                                 className="hidden"
//                                 onChange={e => setFile(e.target.files[0])}
//                             />
//                             {file ? (
//                                 <div className="flex items-center justify-center gap-3 text-green-700">
//                                     <CheckCircle size={24} />
//                                     <span className="font-bold">{file.name}</span>
//                                 </div>
//                             ) : (
//                                 <div className="flex flex-col items-center gap-2">
//                                     <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm text-blue-600 mb-2">
//                                         <FileText size={24} />
//                                     </div>
//                                     <p className="text-sm font-bold text-gray-600">Click to upload or drag & drop</p>
//                                     <p className="text-xs text-gray-400">Your profile will be automatically analyzed by our ATS.</p>
//                                 </div>
//                             )}
//                         </div>
//                     </div>

//                     <div>
//                         <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">Cover Letter / Pitch</label>
//                         <textarea
//                             className="w-full bg-gray-50 border-gray-200 rounded-2xl px-5 py-4 text-gray-900 font-medium focus:ring-2 focus:ring-blue-500 outline-none transition-all border"
//                             rows="4"
//                             placeholder="Why are you a great fit?"
//                             value={formData.coverLetter}
//                             onChange={e => setFormData({ ...formData, coverLetter: e.target.value })}
//                         />
//                     </div>

//                     <div className="flex gap-4 pt-6">
//                         <button type="button" onClick={onClose} className="flex-1 px-8 py-4 rounded-2xl border-2 border-gray-100 text-gray-500 font-black uppercase tracking-widest hover:bg-gray-50 transition-all">Cancel</button>
//                         <button
//                             type="submit"
//                             disabled={isSubmitting}
//                             className="flex-[2] px-8 py-4 rounded-2xl bg-blue-600 text-white font-black uppercase tracking-widest hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-200 transition-all disabled:opacity-50 flex items-center justify-center gap-3"
//                         >
//                             {isSubmitting ? (
//                                 <>
//                                     <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
//                                     Analyzing...
//                                 </>
//                             ) : (
//                                 "Submit Application ✨"
//                             )}
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// }

// export default function JobDetails() {
//     const { id } = useParams();
//     const currentUser = getUserData();
//     const [job, setJob] = useState(null);
//     const [applicants, setApplicants] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [userApplication, setUserApplication] = useState(null);
//     const [isSaved, setIsSaved] = useState(false);
//     const [selectedApplicant, setSelectedApplicant] = useState(null);
//     const [modals, setModals] = useState({ apply: false, status: false, actionType: null });
//     const [notification, setNotification] = useState(null);

//     // Fetch all data
//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 // Get job details
//                 const jobRes = await jobService.getJobById(id);
//                 setJob(jobRes.data);

//                 if (currentUser) {
//                     // Check user's application
//                     const userApp = await jobService.getUserApplicationForJob(currentUser._id || currentUser.id, id);
//                     if (userApp) setUserApplication(userApp);

//                     // Check if saved
//                     const isSavedStatus = await jobService.checkIfJobSaved(currentUser._id || currentUser.id, id);
//                     setIsSaved(isSavedStatus);

//                     // Fetch applicants (if employer)
//                     try {
//                         const appRes = await jobService.getJobApplicants(id);
//                         setApplicants(appRes.data);
//                     } catch (err) {
//                         // User may not be employer, silently fail
//                     }
//                 }
//             } catch (err) {
//                 console.error("Fetch error:", err);
//                 setError("Could not load job data.");
//             } finally {
//                 setLoading(false);
//             }
//         };

//         if (id) fetchData();
//     }, [id, currentUser]);

//     const handleApply = async (formData) => {
//         if (!currentUser) return alert("Please login to apply");
//         try {
//             const res = await jobService.submitApplication(id, currentUser._id || currentUser.id, formData);
//             setUserApplication(res.data);
//             setModals({ ...modals, apply: false });
//             showNotify("Application submitted successfully! Your ATS score has been calculated. ✨");

//             // Refresh applicants if viewing as employer
//             try {
//                 const appRes = await jobService.getJobApplicants(id);
//                 setApplicants(appRes.data);
//             } catch (err) {
//                 // Not an employer
//             }
//         } catch (err) {
//             alert(err.response?.data?.message || "Failed to apply");
//         }
//     };

//     const handleSaveToggle = async () => {
//         if (!currentUser) return alert("Please login to save jobs");
//         try {
//             await jobService.saveJob(id, currentUser._id || currentUser.id);
//             setIsSaved(true);
//             showNotify("Job saved to your profile! 🔖");
//         } catch (err) {
//             alert(err.response?.data?.message || "Already saved");
//         }
//     };

//     const handleUpdateStatus = async (message) => {
//         if (!selectedApplicant) return;
//         try {
//             const res = await jobService.updateApplicationStatus(
//                 selectedApplicant._id,
//                 modals.actionType,
//                 message
//             );
//             setApplicants(applicants.map(a => a._id === res.data._id ? res.data : a));
//             setModals({ ...modals, status: false });
//             setSelectedApplicant(null);
//             showNotify("Status updated successfully! ✓");
//         } catch (err) {
//             alert("Failed to update status");
//         }
//     };

//     const showNotify = (msg) => {
//         setNotification(msg);
//         setTimeout(() => setNotification(null), 3000);
//     };

//     if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader className="w-12 h-12 text-blue-600 animate-spin" /></div>;
//     if (error || !job) return <div className="min-h-screen flex flex-col items-center justify-center"><h2 className="text-2xl font-bold mb-4">{error || "Job not found"}</h2><Link to="/hr-forum" className="text-blue-600 hover:underline">Back to listings</Link></div>;

//     return (
//         <div className="min-h-screen bg-gray-50 flex gap-6 p-6">
//             {/* LEFT – Job Summary (Sticky, navbar-safe) */}
//             <aside className="w-1/4 bg-white border rounded-lg p-5 h-fit sticky top-[80px]">
//                 <h2 className="text-lg font-semibold mb-2">{job.jobTitle}</h2>

//                 <p className="text-sm text-gray-600 mb-4 flex items-center gap-2">
//                     <MapPin className="w-4 h-4" /> {job.location} · {job.companyName}
//                 </p>

//                 <div className="space-y-2 text-sm mb-4">
//                     <p><strong>Job type:</strong> {job.jobTypes?.join(", ") || "N/A"}</p>
//                     <p><strong>Experience:</strong> {job.experienceRequired || "N/A"}</p>
//                     <p><strong>Salary:</strong> ₹{job.payRange?.min?.toLocaleString()} – ₹{job.payRange?.max?.toLocaleString()}</p>
//                     <p><strong>Status:</strong> <span className="text-green-600">Open</span></p>
//                 </div>

//                 {/* Required Skills */}
//                 {job.requiredSkills && job.requiredSkills.length > 0 && (
//                     <div className="mb-5">
//                         <p className="text-sm font-medium mb-2">Required Skills</p>
//                         <div className="flex flex-wrap gap-2">
//                             {job.requiredSkills.map((skill) => (
//                                 <span
//                                     key={skill}
//                                     className="px-3 py-1 text-xs rounded-full bg-blue-50 text-blue-700"
//                                 >
//                                     {skill}
//                                 </span>
//                             ))}
//                         </div>
//                     </div>
//                 )}

//                 {/* Benefits */}
//                 {job.benefits && job.benefits.length > 0 && (
//                     <div className="mb-5">
//                         <p className="text-sm font-medium mb-2">Benefits</p>
//                         <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
//                             {job.benefits.map((b, i) => (
//                                 <li key={i}>{b}</li>
//                             ))}
//                         </ul>
//                     </div>
//                 )}

//                 <Link to="/hr-forum">
//                     <button className="w-full border px-4 py-2 rounded-md hover:bg-gray-50">
//                         ← Back to jobs
//                     </button>
//                 </Link>
//             </aside>

//             {/* CENTER – Job Details */}
//             <main className="flex-1 border rounded-lg p-6 bg-white space-y-6">
//                 {/* Header */}
//                 <div className="flex justify-between items-start">
//                     <div>
//                         <h1 className="text-4xl font-bold text-gray-900">{job.jobTitle}</h1>
//                         <p className="text-gray-600 text-lg mt-1">
//                             {job.companyName} · {job.location}
//                         </p>
//                         <div className="flex gap-4 mt-3 text-sm text-gray-500">
//                             <span className="flex items-center gap-1"><DollarSign className="w-4 h-4" /> ₹{job.payRange?.min?.toLocaleString()} - ₹{job.payRange?.max?.toLocaleString()}</span>
//                             <span className="flex items-center gap-1"><Building className="w-4 h-4" /> {job.jobTypes?.join(", ")}</span>
//                         </div>
//                     </div>

//                     {/* Save Button */}
//                     <button
//                         onClick={handleSaveToggle}
//                         className={`p-3 rounded-lg border transition-all ${isSaved
//                             ? "bg-amber-50 border-amber-200 text-amber-600"
//                             : "bg-white border-gray-200 text-gray-400 hover:text-amber-500"
//                             }`}
//                     >
//                         {isSaved ? <BookmarkCheck className="w-6 h-6 fill-current" /> : <Bookmark className="w-6 h-6" />}
//                     </button>
//                 </div>

//                 <hr className="my-4" />

//                 {/* Job Description */}
//                 <section>
//                     <h2 className="text-xl font-bold text-gray-900 mb-4">About the Role</h2>
//                     <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{job.description}</p>
//                 </section>

//                 {/* Application Status or Apply Button */}
//                 {userApplication ? (
//                     <section className={`p-6 rounded-lg border-2 ${userApplication.status === 'shortlisted'
//                         ? 'bg-green-50 border-green-200'
//                         : userApplication.status === 'rejected'
//                             ? 'bg-red-50 border-red-200'
//                             : 'bg-blue-50 border-blue-200'
//                         }`}>
//                         <p className="font-bold text-lg capitalize">{userApplication.status}</p>
//                         {userApplication.atsResult && (
//                             <p className="text-sm mt-2">Match Score: <span className="font-bold">{userApplication.atsResult.score}%</span></p>
//                         )}
//                         {userApplication.employerMessage && (
//                             <p className="text-sm mt-2 italic">"{userApplication.employerMessage}"</p>
//                         )}
//                     </section>
//                 ) : (
//                     <section>
//                         <button
//                             onClick={() => setModals({ ...modals, apply: true })}
//                             className="w-full py-4 bg-blue-600 text-white rounded-lg font-bold text-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
//                         >
//                             <Send className="w-5 h-5" /> Apply Now
//                         </button>
//                     </section>
//                 )}

//                 {/* Applicants List (For Employers) */}
//                 {applicants.length > 0 && (
//                     <section className="mt-8">
//                         <h2 className="text-xl font-bold text-gray-900 mb-4">Applicants ({applicants.length})</h2>
//                         <div className="space-y-3">
//                             {applicants.map(app => (
//                                 <div
//                                     key={app._id}
//                                     className="p-4 border rounded-lg flex items-center justify-between hover:bg-gray-50 transition-colors"
//                                 >
//                                     <div className="flex items-center gap-4">
//                                         <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold">
//                                             {app.candidateName.charAt(0)}
//                                         </div>
//                                         <div>
//                                             <p className="font-bold text-gray-900">{app.candidateName}</p>
//                                             <p className="text-xs text-gray-500 mt-1">
//                                                 {app.atsResult && (
//                                                     <span className={`px-2 py-0.5 rounded-full border text-[10px] font-bold ${jobService.getScoreColor(app.atsResult.score)}`}>
//                                                         {app.atsResult.score}% Match
//                                                     </span>
//                                                 )}
//                                             </p>
//                                         </div>
//                                     </div>

//                                     <div className="flex items-center gap-2">
//                                         <span className={`text-[10px] font-bold px-3 py-1 rounded-full border ${app.status === 'shortlisted'
//                                             ? 'bg-green-50 text-green-700 border-green-200'
//                                             : app.status === 'rejected'
//                                                 ? 'bg-red-50 text-red-700 border-red-200'
//                                                 : 'bg-amber-50 text-amber-700 border-amber-200'
//                                             }`}>
//                                             {app.status}
//                                         </span>
//                                         <button
//                                             onClick={() => {
//                                                 setSelectedApplicant(app);
//                                                 setModals({ ...modals, status: true, actionType: 'interested' });
//                                             }}
//                                             className="p-2 border rounded-lg hover:bg-gray-100"
//                                         >
//                                             <Edit2 className="w-4 h-4 text-gray-500" />
//                                         </button>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     </section>
//                 )}
//             </main>

//             {/* Modals */}
//             <ApplyModal
//                 isOpen={modals.apply}
//                 onClose={() => setModals({ ...modals, apply: false })}
//                 onSubmit={handleApply}
//                 jobTitle={job.jobTitle}
//             />
//             <StatusModal
//                 isOpen={modals.status}
//                 applicant={selectedApplicant}
//                 actionType={modals.actionType}
//                 onClose={() => setModals({ ...modals, status: false })}
//                 onConfirm={handleUpdateStatus}
//             />

//             {/* Notification */}
//             {notification && (
//                 <div className="fixed bottom-8 right-8 bg-gray-900 border border-gray-700 text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 z-50">
//                     <CheckCircle className="w-5 h-5 text-green-400" />
//                     <p className="font-bold">{notification}</p>
//                 </div>
//             )}
//         </div>
//     );
// }



export default function JobDetails() {
    const { id } = useParams();
    const currentUser = getUserData();
    const [job, setJob] = useState(null);
    const [applicants, setApplicants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userApplication, setUserApplication] = useState(null);
    const [isSaved, setIsSaved] = useState(false);
    const [selectedApplicant, setSelectedApplicant] = useState(null);
    const [modals, setModals] = useState({ apply: false, status: false, actionType: null });
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
                    try {
                        const appRes = await jobService.getJobApplicants(id);
                        setApplicants(appRes.data);
                    } catch (err) {
                        // User may not be employer, silently fail
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

    const handleUpdateStatus = async (message) => {
        if (!selectedApplicant) return;
        try {
            const res = await jobService.updateApplicationStatus(
                selectedApplicant._id,
                modals.actionType,
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

    if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader className="w-12 h-12 text-blue-600 animate-spin" /></div>;
    if (error || !job) return <div className="min-h-screen flex flex-col items-center justify-center"><h2 className="text-2xl font-bold mb-4">{error || "Job not found"}</h2><Link to="/hr-forum" className="text-blue-600 hover:underline">Back to listings</Link></div>;

    return (
        <div className="min-h-screen bg-gray-50 flex gap-6 p-6">
            {/* LEFT – Job Summary (Sticky, navbar-safe) */}
            <aside className="w-1/4 bg-white border rounded-lg p-5 h-fit sticky top-[80px]">
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
                                    className="px-3 py-1 text-xs rounded-full bg-blue-50 text-blue-700"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Benefits */}
                {job.benefits && job.benefits.length > 0 && (
                    <div className="mb-5">
                        <p className="text-sm font-medium mb-2">Benefits</p>
                        <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                            {job.benefits.map((b, i) => (
                                <li key={i}>{b}</li>
                            ))}
                        </ul>
                    </div>
                )}

                <Link to="/hr-forum">
                    <button className="w-full border px-4 py-2 rounded-md hover:bg-gray-50">
                        ← Back to jobs
                    </button>
                </Link>
            </aside>

            {/* CENTER – Job Details */}
            <main className="flex-1 border rounded-lg p-6 bg-white space-y-6">
                {/* Header */}
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-900">{job.jobTitle}</h1>
                        <p className="text-gray-600 text-lg mt-1">
                            {job.companyName} · {job.location}
                        </p>
                        <div className="flex gap-4 mt-3 text-sm text-gray-500">
                            <span className="flex items-center gap-1"><DollarSign className="w-4 h-4" /> ₹{job.payRange?.min?.toLocaleString()} - ₹{job.payRange?.max?.toLocaleString()}</span>
                            <span className="flex items-center gap-1"><Building className="w-4 h-4" /> {job.jobTypes?.join(", ")}</span>
                        </div>
                    </div>

                    {/* Save Button */}
                    <button
                        onClick={handleSaveToggle}
                        className={`p-3 rounded-lg border transition-all ${isSaved
                                ? "bg-amber-50 border-amber-200 text-amber-600"
                                : "bg-white border-gray-200 text-gray-400 hover:text-amber-500"
                            }`}
                    >
                        {isSaved ? <BookmarkCheck className="w-6 h-6 fill-current" /> : <Bookmark className="w-6 h-6" />}
                    </button>
                </div>

                <hr className="my-4" />

                {/* Job Description */}
                <section>
                    <h2 className="text-xl font-bold text-gray-900 mb-4">About the Role</h2>
                    <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{job.description}</p>
                </section>

                {/* Application Status or Apply Button */}
                {userApplication ? (
                    <section className={`p-6 rounded-lg border-2 ${userApplication.status === 'shortlisted'
                            ? 'bg-green-50 border-green-200'
                            : userApplication.status === 'rejected'
                                ? 'bg-red-50 border-red-200'
                                : 'bg-blue-50 border-blue-200'
                        }`}>
                        <p className="font-bold text-lg capitalize">{userApplication.status}</p>
                        {userApplication.atsResult && (
                            <p className="text-sm mt-2">Match Score: <span className="font-bold">{userApplication.atsResult.score}%</span></p>
                        )}
                        {userApplication.employerMessage && (
                            <p className="text-sm mt-2 italic">"{userApplication.employerMessage}"</p>
                        )}
                    </section>
                ) : (
                    <section>
                        <button
                            onClick={() => setModals({ ...modals, apply: true })}
                            className="w-full py-4 bg-blue-600 text-white rounded-lg font-bold text-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
                        >
                            <Send className="w-5 h-5" /> Apply Now
                        </button>
                    </section>
                )}

                {/* Applicants List (For Employers) */}
                {applicants.length > 0 && (
                    <section className="mt-8">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Applicants ({applicants.length})</h2>
                        <div className="space-y-3">
                            {applicants.map(app => (
                                <div
                                    key={app._id}
                                    className="p-4 border rounded-lg flex items-center justify-between hover:bg-gray-50 transition-colors"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold">
                                            {app.candidateName.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-900">{app.candidateName}</p>
                                            <p className="text-xs text-gray-500 mt-1">
                                                {app.atsResult && (
                                                    <span className={`px-2 py-0.5 rounded-full border text-[10px] font-bold ${jobService.getScoreColor(app.atsResult.score)}`}>
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
                                        <button
                                            onClick={() => {
                                                setSelectedApplicant(app);
                                                setModals({ ...modals, status: true, actionType: 'interested' });
                                            }}
                                            className="p-2 border rounded-lg hover:bg-gray-100"
                                        >
                                            <Edit2 className="w-4 h-4 text-gray-500" />
                                        </button>
                                    </div>
                                </div>
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
