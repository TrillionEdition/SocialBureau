import axios from "axios";
import { BASE_URL } from "../utils/urls";

axios.defaults.withCredentials = true;

export const partnershipAPI = {
  createPartner: async (data) => {
    const response = await axios.post(`${BASE_URL}/partners`, data);
    return response.data;
  },

  getPartners: async () => {
    const response = await axios.get(`${BASE_URL}/partners`);
    return response.data;
  },

  getPartnerByParam: async (param) => {
    const response = await axios.get(`${BASE_URL}/partners/${param}`);
    return response.data;
  },

  updatePartner: async (id, data) => {
    const response = await axios.put(`${BASE_URL}/partners/${id}`, data);
    return response.data;
  },

  deletePartner: async (id) => {
    const response = await axios.delete(`${BASE_URL}/partners/${id}`);
    return response.data;
  },
};
