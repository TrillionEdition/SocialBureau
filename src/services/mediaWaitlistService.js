import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const mediaWaitlistService = {
    joinWaitlist: async (data) => {
        try {
            const response = await axios.post(`${API_URL}/media-waitlist/join`, data);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    getAllEntries: async () => {
        try {
            const response = await axios.get(`${API_URL}/media-waitlist`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    updateStatus: async (id, status) => {
        try {
            const response = await axios.patch(`${API_URL}/media-waitlist/${id}/status`, { status });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    deleteEntry: async (id) => {
        try {
            const response = await axios.delete(`${API_URL}/media-waitlist/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    }
};

export default mediaWaitlistService;

