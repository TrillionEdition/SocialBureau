import axios from "axios";
import { BASE_URL } from "@/utils/urls";

// Helper to get auth header
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// 1. Get all posters
export const getAllPostersAPI = async (params = {}) => {
  try {
    const response = await axios.get(`${BASE_URL}/posters`, {
      params,
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// 2. Add a new poster (multipart/form-data)
export const addPosterAPI = async (formData) => {
  try {
    const response = await axios.post(`${BASE_URL}/posters`, formData, {
      withCredentials: true,
      headers: {
        ...getAuthHeaders(),
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// 3. Update an existing poster (multipart/form-data)
export const updatePosterAPI = async (id, formData) => {
  try {
    const response = await axios.put(`${BASE_URL}/posters/${id}`, formData, {
      withCredentials: true,
      headers: {
        ...getAuthHeaders(),
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// 4. Delete a poster
export const deletePosterAPI = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/posters/${id}`, {
      withCredentials: true,
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
