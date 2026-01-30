import axios from 'axios';
import { BASE_URL } from '../utils/urls';

// Add a new achievement
export const addAchievementAPI = async (achievementData) => {
    try {
        const response = await axios.post(
            `${BASE_URL}/achievement/add`,
            achievementData
        );
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

// Get all achievements for a user
export const getUserAchievementsAPI = async (userId) => {
    console.log("diaplay 1");
    try {
        const response = await axios.get(
            `${BASE_URL}/achievement/user/${userId}`
        );
        console.log("data", response.data);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

// Update an achievement
export const updateAchievementAPI = async (achievementId, updateData) => {
    try {
        const response = await axios.put(
            `${BASE_URL}/achievement/${achievementId}`,
            updateData
        );
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

// Delete an achievement
export const deleteAchievementAPI = async (achievementId) => {
    try {
        const response = await axios.delete(
            `${BASE_URL}/achievement/${achievementId}`
        );
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

// Get user details with achievements
export const getUserDetailsWithAchievementsAPI = async (name) => {
    try {
        const response = await axios.get(
            `${BASE_URL}/achievement/user-details/${name}`
        );
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};