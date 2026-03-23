import axios from "axios";
import { BASE_URL } from "../utils/urls";

export const jobService = {

  createJob: async (data) => {
    const res = await axios.post(`${BASE_URL}/job`, data, {
      withCredentials: true,
    });
    return res.data;
  },

  // GET ALL JOBS
  getJobs: async () => {
    const res = await axios.get(`${BASE_URL}/job`);
    return res.data;
  },

  // GET SINGLE JOB
  getJobBySlug: async (slug) => {
    const res = await axios.get(`${BASE_URL}/job/${slug}`);
    return res.data;
  },

};