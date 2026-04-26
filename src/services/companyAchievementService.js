import axios from 'axios';
import { BASE_URL } from '@/utils/urls';

// Add a new company achievement
export const addCompanyAchievementAPI = async (achievementData) => {
    try {
        const response = await axios.post(
            `${BASE_URL}/company-achievement`,
            achievementData
        );
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

// Get all company achievements
export const getAllCompanyAchievementsAPI = async () => {
    try {
        const response = await axios.get(
            `${BASE_URL}/company-achievement`
        );
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

// Update a company achievement
export const updateCompanyAchievementAPI = async (id, updateData) => {
    try {
        const response = await axios.put(
            `${BASE_URL}/company-achievement/${id}`,
            updateData
        );
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

// Delete a company achievement
export const deleteCompanyAchievementAPI = async (id) => {
    try {
        const response = await axios.delete(
            `${BASE_URL}/company-achievement/${id}`
        );
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

