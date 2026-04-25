import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const ajnoraService = {
  // Create new entry
  createEntry: async (data) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/ajnora`, data);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get all entries
  getAllEntries: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/ajnora`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get stats
  getStats: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/ajnora/stats`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Update entry
  updateEntry: async (id, data) => {
    try {
      const response = await axios.patch(`${API_BASE_URL}/ajnora/${id}`, data);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Delete entry
  deleteEntry: async (id) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/ajnora/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};

export default ajnoraService;
