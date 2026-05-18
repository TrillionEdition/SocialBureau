import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const getMyProfile = async (token) => {
    const config = {
        withCredentials: true,
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    const response = await axios.get(`${API_URL}/team-v2/me`, config);
    return response.data;
};

const updateMyProfile = async (profileData, token) => {
    const config = {
        withCredentials: true,
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    const response = await axios.put(`${API_URL}/team-v2/me`, profileData, config);
    return response.data;
};

const uploadImage = async (file, token) => {
    const formData = new FormData();
    formData.append('image', file);
    const config = {
        withCredentials: true,
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
        }
    };
    const response = await axios.post(`${API_URL}/team-v2/upload`, formData, config);
    return response.data;
};

const getAllMembers = async (token) => {
    const config = {
        withCredentials: true,
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    const response = await axios.get(`${API_URL}/team-v2/admin/members`, config);
    return response.data;
};

const updateMemberById = async (id, profileData, token) => {
    const config = {
        withCredentials: true,
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    const response = await axios.put(`${API_URL}/team-v2/admin/member/${id}`, profileData, config);
    return response.data;
};

const createMember = async (profileData, token) => {
    const config = {
        withCredentials: true,
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    const response = await axios.post(`${API_URL}/team-v2/admin/member`, profileData, config);
    return response.data;
};

const deleteMember = async (id, token) => {
    const config = {
        withCredentials: true,
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    const response = await axios.delete(`${API_URL}/team-v2/admin/member/${id}`, config);
    return response.data;
};

const teamService = {
    getMyProfile,
    updateMyProfile,
    uploadImage,
    getAllMembers,
    updateMemberById,
    createMember,
    deleteMember
};

export default teamService;
