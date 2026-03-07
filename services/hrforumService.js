import axios from "axios";
import { BASE_URL } from "../utils/urls";


// Job queries
export const getJobById = (jobId) => {
    return axios.get(`${BASE_URL}/hr-jobs/${jobId}`);
};

export const getJobApplicants = (jobId) => {
    return axios.get(`${BASE_URL}/hr-applications/job-applicants/${jobId}`);
};

export const getApplicationById = (applicationId) => {
    return axios.get(`${BASE_URL}/hr-applications/application/${applicationId}`);
};

// Application queries
export const getUserApplications = (userId) => {
    return axios.get(`${BASE_URL}/hr-applications/user-applications/${userId}`);
};

export const getUserSavedJobs = (userId) => {
    return axios.get(`${BASE_URL}/hr-applications/user-saved-jobs/${userId}`);
};

export const checkIfJobSaved = (userId, jobId) => {
    return getUserSavedJobs(userId).then(res => res.data.some(s => s._id === jobId));
};

// Application actions
export const submitApplication = (jobId, userId, formData) => {
    const data = new FormData();
    data.append("jobId", jobId);
    data.append("userId", userId);
    data.append("candidateName", formData.candidateName);
    data.append("candidateEmail", formData.candidateEmail);
    data.append("coverLetter", formData.coverLetter);
    data.append("relocationInterest", formData.relocationInterest || false);
    data.append("resume", formData.resume);

    return axios.post(`${BASE_URL}/hr-applications/apply`, data, {
        headers: { "Content-Type": "multipart/form-data" }
    });
};

export const saveJob = (jobId, userId) => {
    return axios.post(`${BASE_URL}/hr-applications/save`, { jobId, userId });
};

export const updateApplicationStatus = (applicationId, status, message) => {
    return axios.put(`${BASE_URL}/hr-applications/update-status/${applicationId}`, { status, message });
};

// Helper: Get user's specific application for a job
export const getUserApplicationForJob = async (userId, jobId) => {
    try {
        const res = await getUserApplications(userId);
        return res.data.find(a => a.jobId._id === jobId) || null;
    } catch (err) {
        console.error("Error fetching user application:", err);
        return null;
    }
};

// Helper: Calculate match color
export const getScoreColor = (score) => {
    if (score >= 80) return "text-green-600 bg-green-50 border-green-200";
    if (score >= 50) return "text-amber-600 bg-amber-50 border-amber-200";
    return "text-red-600 bg-red-50 border-red-200";
};