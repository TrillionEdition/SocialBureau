import axios from "axios";
import { BASE_URL } from "@/utils/urls";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// 1. Get all reels (pass { active: true } for homepage public fetch)
export const getAllReelsAPI = async (params = {}) => {
  try {
    const response = await axios.get(`${BASE_URL}/reels`, {
      params,
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// 2. Add a new reel
export const addReelAPI = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/reels`, data, {
      withCredentials: true,
      headers: { ...getAuthHeaders(), "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// 3. Update a reel
export const updateReelAPI = async (id, data) => {
  try {
    const response = await axios.put(`${BASE_URL}/reels/${id}`, data, {
      withCredentials: true,
      headers: { ...getAuthHeaders(), "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// 4. Delete a reel
export const deleteReelAPI = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/reels/${id}`, {
      withCredentials: true,
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
