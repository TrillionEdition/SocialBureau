import axios from 'axios';
import { BASE_URL } from '../utils/urls';

const getHeaders = (clientId, extra = {}) => ({
    'x-client-id': clientId,
    ...extra,
});

export const fetchHistory = async (clientId) => {
    const res = await axios.get(`${BASE_URL}/ats/history`, {
        headers: getHeaders(clientId),
    });
    return res.data;
};

export const analyzeResume = async (clientId, file, jobDescription = '') => {
    const formData = new FormData();
    formData.append('resume', file);
    formData.append('jobDescription', jobDescription);

    const res = await axios.post(`${BASE_URL}/ats/analyze`, formData, {
        headers: getHeaders(clientId, { 'Content-Type': 'multipart/form-data' }),
    });
    return res.data;
};

export const generateResume = async (clientId, file, jobDescription = '') => {
    const formData = new FormData();
    formData.append('resume', file);
    if (jobDescription) formData.append('jobDescription', jobDescription);

    const res = await axios.post(`${BASE_URL}/ats/generate-resume`, formData, {
        headers: getHeaders(clientId, { 'Content-Type': 'multipart/form-data' }),
    });
    return res.data;
};

export const deleteScan = async (clientId, id) => {
    await axios.delete(`${BASE_URL}/ats/history/${id}`, {
        headers: getHeaders(clientId),
    });
};