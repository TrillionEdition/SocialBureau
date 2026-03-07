import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserData } from "../../../utils/authUtils";
import { Link, Loader } from "lucide-react";
import { jobService } from "../../../services/jobService";

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
