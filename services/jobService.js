import axios from "axios";
import { BASE_URL } from "../utils/urls";

export const jobService = {
  // CREATE JOB (ADMIN)
  createJob: async (data) => {
    const res = await axios.post(`${BASE_URL}/api/jobs`, data, {
      withCredentials: true,
    });
    return res.data;
  },

  // GET ALL JOBS
  getJobs: async () => {
    const res = await axios.get(`${BASE_URL}/api/jobs`);
    return res.data;
  },

  // GET SINGLE JOB
  getJobBySlug: async (slug) => {
    const res = await axios.get(`${BASE_URL}/api/jobs/${slug}`);
    return res.data;
  },

};