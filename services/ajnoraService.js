import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const ajnoraService = {
  // Create new entry
  createEntry: async (data) => {
    try {
      let payload = data;
      let headers = {};

      // If data is not already FormData, check if we need to convert it
      // In this case, we expect 'data' to be the object from ClientFormaji.jsx
      const formData = new FormData();
      
      Object.keys(data).forEach(key => {
        if (key === 'uploadedFiles') {
          // data.uploadedFiles is a map of category: [file objects or {file: File}]
          Object.keys(data[key]).forEach(category => {
            const files = data[key][category];
            files.forEach(fileItem => {
              const file = fileItem.file || fileItem;
              if (file instanceof File) {
                formData.append(category, file);
              }
            });
          });
        } else if (key === 'partnersList') {
          // Send partner photos separately and stringify the rest of the list
          const list = data[key];
          list.forEach((partner, index) => {
            if (partner.photo && partner.photo.file instanceof File) {
              formData.append(`partner_photo_${index}`, partner.photo.file);
            }
          });
          formData.append(key, JSON.stringify(list));
        } else if (data[key] instanceof File) {
          formData.append(key, data[key]);
        } else if (typeof data[key] === 'object' && data[key] !== null) {
          formData.append(key, JSON.stringify(data[key]));
        } else {
          formData.append(key, data[key]);
        }
      });

      payload = formData;
      headers = { 'Content-Type': 'multipart/form-data' };

      const response = await axios.post(`${API_BASE_URL}/ajnora`, payload, { headers });
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
