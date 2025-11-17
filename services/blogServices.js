import axios from 'axios';
import { BASE_URL } from '../utils/urls';


export const blogAPI = {
  // Get all blogs
  getBlogs: async (params = {}) => {
    const response = await axios.get(`${BASE_URL}/blog/blogs`, { params });
    return response.data;
  },

  // Get latest blogs
  getLatestBlogs: async (limit = 3) => {
    const response = await axios.get(`${BASE_URL}/blog/blogs/latest`, { 
      params: { limit } 
    });
    return response.data;
  },

  // Get single blog by slug
  getBlogBySlug: async (slug) => {
    const response = await axios.get(`${BASE_URL}/blog/blogs/${slug}`);
    return response.data;
  },

  // Create new blog
  createBlog: async (data) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('excerpt', data.excerpt);
    formData.append('content', JSON.stringify(data.content));
    formData.append('category', data.category);
    formData.append('author', data.author);
    
    if (data.image instanceof File) {
      formData.append('image', data.image);
    } else if (data.image) {
      formData.append('imageUrl', data.image);
    }

    const response = await axios.post(`${BASE_URL}/blog/blogs`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Update blog
  updateBlog: async (slug, data) => {
    const response = await axios.patch(`${BASE_URL}/blog/blogs/${slug}`, data);
    return response.data;
  },

  // Delete blog
  deleteBlog: async (slug) => {
    const response = await axios.delete(`${BASE_URL}/blog/blogs/${slug}`);
    return response.data;
  },

  // Get stats
  getStats: async () => {
    const response = await axios.get(`${BASE_URL}/blog/stats`);
    return response.data;
  },
};
