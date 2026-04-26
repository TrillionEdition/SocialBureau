import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}/api-leads`;

const apiLeadService = {
  createLead: (leadData) => {
    return axios.post(API_URL, leadData);
  },
  getAllLeads: () => {
    return axios.get(API_URL);
  },
  updateLeadStatus: (id, status) => {
    return axios.put(`${API_URL}/${id}`, { status });
  },
  deleteLead: (id) => {
    return axios.delete(`${API_URL}/${id}`);
  }
};

export default apiLeadService;

