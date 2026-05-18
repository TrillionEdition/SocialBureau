import axios from "axios";
import { BASE_URL } from "@/utils/urls";

export const jobService = {

  createJob: async (formData) => {
    const res = await axios.post(`${BASE_URL}/job`, formData, {
      withCredentials: true,
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  },

  // GET ALL JOBS
  getJobs: async () => {
    const res = await axios.get(`${BASE_URL}/job`, {
      withCredentials: true,
    });
    return res.data;
  },

  // GET SINGLE JOB
  getJobBySlug: async (slug) => {
    const res = await axios.get(`${BASE_URL}/job/${slug}`, {
      withCredentials: true,
    });
    return res.data;
  },

  updateJob: async (id, formData) => {
    const res = await axios.put(`${BASE_URL}/job/${id}`, formData, {
      withCredentials: true,
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  },

  deleteJob: async (id) => {
    const res = await axios.delete(`${BASE_URL}/job/${id}`, {
      withCredentials: true,
    });
    return res.data;
  },

  toggleJobStatus: async (id) => {
    const res = await axios.patch(`${BASE_URL}/job/${id}/toggle`, {}, {
      withCredentials: true,
    });
    return res.data;
  },
};
