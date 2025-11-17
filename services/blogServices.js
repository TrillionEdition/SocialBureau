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
    formData.append('category', data.category);
    formData.append('author', data.author);
    
    // Add optional fields
    if (data.customUrl) {
      formData.append('customUrl', data.customUrl);
    }
    if (data.keywords && data.keywords.length > 0) {
      formData.append('keywords', JSON.stringify(data.keywords));
    }
    if (data.childBlogs && data.childBlogs.length > 0) {
      formData.append('childBlogs', JSON.stringify(data.childBlogs));
    }
    
    // Process content sections - serialize without images first
    const contentForBackend = data.content.map((section, index) => {
      const sectionData = {
        type: section.type,
        text: section.text || '',
        heading: section.heading || 'none',
      };
      
      // If section has an image, we'll upload it separately and add reference
      if (section.image instanceof File) {
        sectionData.imageIndex = index; // Mark that this section has an image
      }
      
      return sectionData;
    });
    
    formData.append('content', JSON.stringify(contentForBackend));
    
    // Add main blog image
    if (data.image instanceof File) {
      formData.append('image', data.image);
    } else if (data.image) {
      formData.append('imageUrl', data.image);
    }
    
    // Add section images
    data.content.forEach((section, index) => {
      if (section.image instanceof File) {
        formData.append(`sectionImage_${index}`, section.image);
      }
    });

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
