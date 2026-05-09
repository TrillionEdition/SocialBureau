import axios from 'axios';
import { BASE_URL } from '@/utils/urls';

export const blogAPI = {
  // ✅ FIXED: Correct endpoint paths without the extra '/blog' prefix

  // Get all blogs with filtering
  // Endpoint: GET /api/blogs
  getBlogs: async (params = {}) => {
    try {
      console.log('📚 Fetching blogs from:', `${BASE_URL}/blog`, 'with params:', params);
      const response = await axios.get(`${BASE_URL}/blog`, { 
        params,
        withCredentials: true 
      });
      console.log('✅ Blogs fetched successfully:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error fetching blogs:', error);
      console.error('Error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        url: `${BASE_URL}/blog`
      });
      throw error;
    }
  },

  // Get latest blogs
  // Endpoint: GET /api/blogs/latest
  getLatestBlogs: async (limit = 3) => {
    const response = await axios.get(`${BASE_URL}/blog/latest`, {
      params: { limit },
      withCredentials: true
    });
    return response.data;
  },

  // Get single blog by slug
  // Endpoint: GET /api/blogs/:slug
  getBlogBySlug: async (slug) => {
    try {
      console.log('📖 Fetching blog by slug:', slug, 'from:', `${BASE_URL}/blog/${slug}`);
      const response = await axios.get(`${BASE_URL}/blog/${slug}`, {
        withCredentials: true
      });
      console.log('✅ Blog fetched successfully:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error fetching blog by slug:', error);
      console.error('Error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        url: `${BASE_URL}/blog/${slug}`
      });
      throw error;
    }
  },

  // Create new blog
  // Endpoint: POST /api/blogs
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
    
    // SEO Fields
    if (data.seoTitle) formData.append('seoTitle', data.seoTitle);
    if (data.seoDescription) formData.append('seoDescription', data.seoDescription);

    if (data.keywords && data.keywords.length > 0) {
      formData.append('keywords', JSON.stringify(data.keywords));
    }
    if (data.childBlogs && data.childBlogs.length > 0) {
      formData.append('childBlogs', JSON.stringify(data.childBlogs));
    }

    // Process content sections
    const contentForBackend = data.content.map((section, index) => {
      const sectionData = {
        type: section.type,
        text: section.text || '',
        heading: section.heading || 'none',
      };

      if (section.image instanceof File) {
        sectionData.imageIndex = index;
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

    console.log('🚀 Sending blog data (Create):', Object.fromEntries(formData.entries()));
    const token = localStorage.getItem('token');
    
    try {
      const response = await axios.post(`${BASE_URL}/blog`, formData, {
        withCredentials: true,
        headers: {
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        }
      });
      return response.data;
    } catch (error) {
      const serverMessage = error.response?.data?.message || error.response?.data?.error || 'Unknown server error';
      console.error('❌ SERVER ERROR:', serverMessage);
      console.error('❌ API Error (Create Blog):', {
        message: error.message,
        serverMessage: serverMessage,
        status: error.response?.status,
        url: error.config?.url
      });
      throw error;
    }
  },

  // Update blog
  // Endpoint: PUT /api/blogs/:slug
  updateBlog: async (slug, data) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('excerpt', data.excerpt);
    formData.append('category', data.category);
    formData.append('author', data.author);

    if (data.customUrl) {
      formData.append('customUrl', data.customUrl);
    }

    // SEO Fields
    if (data.seoTitle) formData.append('seoTitle', data.seoTitle);
    if (data.seoDescription) formData.append('seoDescription', data.seoDescription);

    if (data.keywords && data.keywords.length > 0) {
      formData.append('keywords', JSON.stringify(data.keywords));
    }
    if (data.childBlogs && data.childBlogs.length > 0) {
      formData.append('childBlogs', JSON.stringify(data.childBlogs));
    }

    // Process content sections
    const contentForBackend = data.content.map((section, index) => {
      const sectionData = {
        type: section.type,
        text: section.text || '',
        heading: section.heading || 'none',
      };

      if (section.image instanceof File) {
        sectionData.imageIndex = index;
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

    console.log('🚀 Sending blog data (Update):', Object.fromEntries(formData.entries()));
    const token = localStorage.getItem('token');
    
    try {
      const response = await axios.put(`${BASE_URL}/blog/${slug}`, formData, {
        withCredentials: true,
        headers: {
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        }
      });
      return response.data;
    } catch (error) {
      const serverMessage = error.response?.data?.message || error.response?.data?.error || 'Unknown server error';
      console.error('❌ API Error (Update Blog):', {
        message: error.message,
        serverMessage: serverMessage,
        status: error.response?.status,
        url: error.config?.url
      });
      throw error;
    }
  },

  // Delete blog
  // Endpoint: DELETE /api/blogs/:slug
  deleteBlog: async (slug) => {
    const token = localStorage.getItem('token');
    const response = await axios.delete(`${BASE_URL}/blog/${slug}`, {
      withCredentials: true,
      headers: {
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
      }
    });
    return response.data;
  },

  // Get stats
  // Endpoint: GET /api/blogs/stats
  getStats: async () => {
    const response = await axios.get(`${BASE_URL}/blog/stats`, {
      withCredentials: true
    });
    return response.data;
  },

  // Like/Unlike blog
  // Endpoint: POST /api/blogs/:slug/like
  likeBlog: async (slug) => {
    const token = localStorage.getItem("token");

    const response = await fetch(
      `${BASE_URL}/blog/${slug}/like`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: 'include',
      }
    );

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      const msg = (err && err.message) || "";
      if (response.status === 401 && /jwt expired/i.test(msg)) {
        throw new Error("AUTH_EXPIRED");
      }
      if (response.status === 401) {
        throw new Error("AUTH_REQUIRED");
      }
      throw new Error(msg || "Failed to like blog");
    }

    return response.json();
  },

  // Get comments for a blog
  // Endpoint: GET /api/blogs/:slug/comments
  getComments: async (slug) => {
    const response = await axios.get(`${BASE_URL}/blog/${slug}/comments`, {
      withCredentials: true
    });
    return response.data;
  },

  // Add comment to blog
  // Endpoint: POST /api/blog/:slug/comments
  addComment: async (slug, text) => {
    const token = localStorage.getItem("token");
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers.Authorization = `Bearer ${token}`;

    const response = await axios.post(
      `${BASE_URL}/blog/${slug}/comments`,
      { text },
      {
        headers,
        withCredentials: true,
      }
    );

    return response.data;
  },


  // Delete comment from blog
  // Endpoint: DELETE /api/blog/:slug/comments/:commentId
  deleteComment: async (slug, commentId) => {
    const token = localStorage.getItem("token");
    const headers = {};
    if (token) headers.Authorization = `Bearer ${token}`;

    const response = await axios.delete(
      `${BASE_URL}/blog/${slug}/comments/${commentId}`,
      {
        headers,
        withCredentials: true,
      }
    );

    return response.data;
  },
};
