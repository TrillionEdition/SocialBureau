import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const clientService = {
  // Create new client
  createClient: async (data) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/clients/intake`, data);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get all clients (with optional filters)
  getAllClients: async (filters = {}) => {
    try {
      const params = new URLSearchParams();
      if (filters.status) params.append('status', filters.status);
      if (filters.search) params.append('search', filters.search);

      const response = await axios.get(`${API_BASE_URL}/clients${params.toString() ? '?' + params.toString() : ''}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get single client
  getClient: async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/clients/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Update client
  updateClient: async (id, data) => {
    try {
      const response = await axios.patch(`${API_BASE_URL}/clients/${id}`, data);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Add interaction/follow-up
  addInteraction: async (clientId, data) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/clients/${clientId}/follow-up`, data);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get stats
  getStats: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/clients`);
      const clients = response.data.data || [];

      return {
        totalLeads: clients.length,
        thisMonth: clients.filter(c => {
          const createdAt = new Date(c.createdAt);
          const now = new Date();
          return createdAt.getMonth() === now.getMonth();
        }).length,
        inPipeline: clients.filter(c => ['intake', 'qualified', 'proposal_sent'].includes(c.status)).length,
        closedThisMonth: clients.filter(c => {
          const createdAt = new Date(c.createdAt);
          const now = new Date();
          return c.status === 'closed_won' && createdAt.getMonth() === now.getMonth();
        }).length
      };
    } catch (error) {
      throw error;
    }
  }
};

export default clientService;
