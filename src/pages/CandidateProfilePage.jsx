import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { jobService } from '../../services/jobService';
import { Loader, AlertTriangle, User, Mail, Download, FileText, Zap, ChevronLeft } from 'lucide-react';
import { BASE_URL } from '../../utils/urls';

const getResumeUrl = (path) => {
    if (!path) return null;
    if (path.startsWith('http')) return path;
    return `${BASE_URL}${path.startsWith('/') ? '' : '/'}${path}`;
};

const getScoreColor = (score) => {
    if (score >= 80) return "text-green-600 bg-green-50 border-green-200";
    if (score >= 50) return "text-amber-600 bg-amber-50 border-amber-200";
    return "text-red-600 bg-red-50 border-red-200";
};

export default function CandidateProfilePage() {
    const { applicationId } = useParams();
    const [application, setApplication] = useState(null);
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchApplicationData = async () => {
            if (!applicationId) return;
            setLoading(true);
            try {
                const appRes = await jobService.getApplicationById(applicationId);
                const appData = appRes.data;
                setApplication(appData);

                const jobId = appData.jobId?._id || appData.jobId;
                if (jobId) {
                    const jobRes = await jobService.getJobById(jobId);
                    setJob(jobRes.data);
                }
            } catch (err) {
                console.error("Error fetching application data:", err);
                setError("Failed to load candidate profile. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchApplicationData();
    }, [applicationId]);

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center bg-gray-50"><Loader className="w-12 h-12 text-blue-600 animate-spin" /></div>;
    }

    if (error) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center p-4">
                <AlertTriangle className="w-12 h-12 text-red-500 mb-4" />
                <h2 className="text-2xl font-bold text-red-700 mb-2">{error}</h2>
                <Link to="/hr-forum" className="text-blue-600 hover:underline">← Back to Job Listings</Link>
            </div>
        );
    }

    if (!application) {
        return <div className="min-h-screen flex items-center justify-center">Application not found.</div>;
    }

    const resumeUrl = getResumeUrl(application.resume);

    return (
        <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                <Link 
                    to={`/job-details/${application.jobId}`} 
                    className="inline-flex items-center gap-2 text-blue-600 font-medium mb-6 hover:translate-x-[-4px] transition-transform"
                >
                    <ChevronLeft className="w-4 h-4" /> Back to Job Details
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Candidate & Job Info */}
                    <div className="lg:col-span-1 space-y-8">
                        {/* Candidate Card */}
                        <div className="bg-white rounded-xl shadow-sm border p-6">
                            <div className="flex items-center gap-4 mb-5">
                                <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                                    {application.candidateName.charAt(0)}
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900">{application.candidateName}</h1>
                                    <p className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                                        <Mail size={14} /> {application.candidateEmail}
                                    </p>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div className="bg-gray-50 p-3 rounded-lg">
                                    <p className="text-xs text-gray-500 font-bold uppercase">Experience</p>
                                    <p className="font-semibold text-gray-800">{application.experience || 'N/A'} Years</p>
                                </div>
                                <div className="bg-gray-50 p-3 rounded-lg">
                                    <p className="text-xs text-gray-500 font-bold uppercase">Relocation</p>
                                    <p className="font-semibold text-gray-800 capitalize">{application.relocation || 'N/A'}</p>
                                </div>
                            </div>
                        </div>

                        {/* ATS Analysis */}
                        {application.atsResult && (
                            <div className="bg-white rounded-xl shadow-sm border p-6">
                                <div className="flex items-center gap-3 mb-3">
                                    <Zap className={`w-5 h-5 ${getScoreColor(application.atsResult.score).split(' ')[0]}`} />
                                    <h3 className="font-bold text-gray-900 text-lg">ATS Analysis</h3>
                                    <span className={`ml-auto px-3 py-1 rounded-full text-xs font-bold ${getScoreColor(application.atsResult.score)}`}>
                                        {application.atsResult.score}% Match
                                    </span>
                                </div>
                                <p className="text-gray-600 text-sm leading-relaxed bg-gray-50 p-4 rounded-lg border">
                                    {application.atsResult.analysis || "No detailed analysis available."}
                                </p>
                            </div>
                        )}

                        {/* Job Details Card */}
                        {job && (
                            <div className="bg-white rounded-xl shadow-sm border p-6">
                                <h3 className="font-bold text-gray-900 text-lg mb-4">Applied For</h3>
                                <h4 className="font-semibold text-blue-700">{job.jobTitle}</h4>
                                <p className="text-sm text-gray-500 mb-4">{job.companyName} · {job.location}</p>
                                <div className="text-xs space-y-2 text-gray-600">
                                    <p><strong>Salary:</strong> ₹{job.payRange?.min?.toLocaleString()} – ₹{job.payRange?.max?.toLocaleString()}</p>
                                    <p><strong>Experience:</strong> {job.experienceRequired || "N/A"}</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Column: Resume & Cover Letter */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Resume Viewer */}
                        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                            <div className="p-4 bg-gray-50 border-b flex justify-between items-center">
                                <h3 className="font-bold text-gray-900 flex items-center gap-2"><FileText size={16}/> Resume</h3>
                                {resumeUrl && (
                                    <a href={resumeUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs bg-blue-600 text-white px-3 py-1.5 rounded-md font-semibold hover:bg-blue-700">
                                        <Download size={14}/> Open in New Tab
                                    </a>
                                )}
                            </div>
                            <div className="p-2 h-[700px]">
                                {resumeUrl ? (
                                    <iframe src={resumeUrl} width="100%" height="100%" title="Resume Viewer"></iframe>
                                ) : (
                                    <div className="flex items-center justify-center h-full text-gray-500">No resume submitted.</div>
                                )}
                            </div>
                        </div>

                        {/* Cover Letter */}
                        <div className="bg-white rounded-xl shadow-sm border">
                             <div className="p-4 bg-gray-50 border-b">
                                <h3 className="font-bold text-gray-900">Cover Letter</h3>
                            </div>
                            <div className="p-6 text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
                                {application.coverLetter || "No cover letter provided."}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
