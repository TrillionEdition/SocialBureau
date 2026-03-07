import axios from "axios";
import { BASE_URL } from "../utils/urls";

const HR_JOBS_URL = `${BASE_URL}/hr-jobs`;
const APPLICATIONS_URL = `${BASE_URL}/hr-applications`;

export const jobService = {
  // CREATE JOB (ADMIN)
  createJob: async (data) => {
    const res = await axios.post(`${BASE_URL}/job`, data, {
      withCredentials: true,
    });
    return res.data;
  },

  // GET ALL JOBS (Public)
  getJobs: async () => {
    const res = await axios.get(`${BASE_URL}/job`);
    return res.data;
  },

  // GET SINGLE JOB BY SLUG (Public)
  getJobBySlug: async (slug) => {
    const res = await axios.get(`${BASE_URL}/job/${slug}`);
    return res.data;
  },

  // HR / ADMIN METHODS
  // =================

  // Get Job by ID (HR)
  getJobById: async (id) => {
    const res = await axios.get(`${HR_JOBS_URL}/${id}`);
    return res;
  },

  // Get Applicants for a Job
  getJobApplicants: async (jobId) => {
    const res = await axios.get(`${APPLICATIONS_URL}/job-applicants/${jobId}`);
    return res;
  },

  // Submit Application
  submitApplication: async (jobId, userId, formData) => {
    formData.append("jobId", jobId);
    formData.append("userId", userId);
    
    const res = await axios.post(`${APPLICATIONS_URL}/apply`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
    });
    return res;
  },

  // Update Application Status
  updateApplicationStatus: async (appId, status, message) => {
    const res = await axios.put(`${APPLICATIONS_URL}/update-status/${appId}`, { status, message });
    return res;
  },

  // Check if user has applied
  getUserApplicationForJob: async (userId, jobId) => {
    try {
        const appsRes = await axios.get(`${APPLICATIONS_URL}/user-applications/${userId}`);
        return appsRes.data.find(a => a.jobId._id === jobId || a.jobId === jobId);
    } catch (error) {
        console.error("Error fetching user applications", error);
        return null;
    }
  },

  // Check if job is saved
  checkIfJobSaved: async (userId, jobId) => {
    try {
        const savedRes = await axios.get(`${APPLICATIONS_URL}/user-saved-jobs/${userId}`);
        return savedRes.data.some(s => s._id === jobId);
    } catch (error) {
        console.error("Error fetching saved jobs", error);
        return false;
    }
  },

  // Save Job
  saveJob: async (jobId, userId) => {
    // Assuming endpoint, usually toggle or explicit save
    // Based on usage in JobDetails, likely just a call
    // Note: The original code didn't have explicit save endpoint in the commented section,
    // but handleSaveToggle called jobService.saveJob. 
    // I'll assume a generic endpoint or maybe it was missing.
    // I will use a placeholder or guess based on pattern.
    // If specific endpoint is needed, user might need to provide it.
    // For now, I'll assume POST to user-saved-jobs
    const res = await axios.post(`${APPLICATIONS_URL}/save-job`, { jobId, userId });
    return res;
  },
  
  // Get Application by ID
  getApplicationById: async (appId) => {
    const res = await axios.get(`${APPLICATIONS_URL}/${appId}`);
    return res;
  },

  // Helper for score color (optional, but good to have)
  getScoreColor: (score) => {
      if (score >= 80) return "text-green-600 bg-green-50 border-green-200";
      if (score >= 50) return "text-amber-600 bg-amber-50 border-amber-200";
      return "text-red-600 bg-red-50 border-red-200";
  }
};
