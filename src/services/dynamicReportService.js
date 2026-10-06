import axios from "axios";
import { BASE_URL } from "@/utils/urls";

const API_URL = `${BASE_URL}/api/dynamic-reports`;

const dynamicReportService = {
  list: async () => (await axios.get(`${API_URL}/admin`, { withCredentials: true })).data,
  get: async (id) => (await axios.get(`${API_URL}/admin/report/${id}`, { withCredentials: true })).data,
  create: async (data) => (await axios.post(`${API_URL}/admin`, data, { withCredentials: true })).data,
  update: async (id, data) => (await axios.put(`${API_URL}/admin/${id}`, data, { withCredentials: true })).data,
  remove: async (id) => (await axios.delete(`${API_URL}/admin/${id}`, { withCredentials: true })).data,
  upload: async (file) => {
    const body = new FormData();
    body.append("file", file);
    return (await axios.post(`${API_URL}/admin/upload`, body, { withCredentials: true })).data;
  },
  getPublic: async (slug) => (await axios.get(`${API_URL}/${encodeURIComponent(slug)}`)).data,
};

export default dynamicReportService;