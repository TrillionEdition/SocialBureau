import axios from 'axios';
import { BASE_URL } from '@/utils/urls';

export const qaAPI = {
  // Get all questions
  getQuestions: async (params = {}) => {
    const response = await axios.get(`${BASE_URL}/qa/questions`, { params });
    return response.data;
  },

  // Get single question
  getQuestionById: async (id) => {
    const response = await axios.get(`${BASE_URL}/qa/questions/${id}`);
    return response.data;
  },

  // Create new question
  createQuestion: async (data) => {
    const response = await axios.post(`${BASE_URL}/qa/questions`, data);
    return response.data;
  },

  // Upvote question
  upvoteQuestion: async (id, userId) => {
    const response = await axios.post(`${BASE_URL}/qa/questions/${id}/upvote`, { userId });
    return response.data;
  },

  // Mark as answered
  markAnswered: async (id, data) => {
    const response = await axios.post(`${BASE_URL}/qa/questions/${id}/answer`, data);
    return response.data;
  },

  // Update question
  updateQuestion: async (id, data) => {
    const response = await axios.patch(`${BASE_URL}/qa/questions/${id}`, data);
    return response.data;
  },

  // Delete question
  deleteQuestion: async (id) => {
    const response = await axios.delete(`${BASE_URL}/qa/questions/${id}`);
    return response.data;
  },

  // Get stats
  getStats: async () => {
    const response = await axios.get(`${BASE_URL}/qa/stats`);
    return response.data;
  },
};

