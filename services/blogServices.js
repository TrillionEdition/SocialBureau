// import axios from 'axios';
// import { BASE_URL } from '../utils/urls';


// export const blogAPI = {
//   // Get all blogs
//   getBlogs: async (params = {}) => {
//     const response = await axios.get(`${BASE_URL}/blog/blogs`, { params });
//     return response.data;
//   },

//   // Get latest blogs
//   getLatestBlogs: async (limit = 3) => {
//     const response = await axios.get(`${BASE_URL}/blog/blogs/latest`, { 
//       params: { limit } 
//     });
//     return response.data;
//   },

//   // Get single blog by slug
//   getBlogBySlug: async (slug) => {
//     const response = await axios.get(`${BASE_URL}/blog/blogs/${slug}`);
//     return response.data;
//   },

//   // Create new blog
//   createBlog: async (data) => {
//     const formData = new FormData();
//     formData.append('title', data.title);
//     formData.append('excerpt', data.excerpt);
//     formData.append('category', data.category);
//     formData.append('author', data.author);
    
//     // Add optional fields
//     if (data.customUrl) {
//       formData.append('customUrl', data.customUrl);
//     }
//     if (data.keywords && data.keywords.length > 0) {
//       formData.append('keywords', JSON.stringify(data.keywords));
//     }
//     if (data.childBlogs && data.childBlogs.length > 0) {
//       formData.append('childBlogs', JSON.stringify(data.childBlogs));
//     }
    
//     // Process content sections - serialize without images first
//     const contentForBackend = data.content.map((section, index) => {
//       const sectionData = {
//         type: section.type,
//         text: section.text || '',
//         heading: section.heading || 'none',
//       };
      
//       // If section has an image, we'll upload it separately and add reference
//       if (section.image instanceof File) {
//         sectionData.imageIndex = index; // Mark that this section has an image
//       }
      
//       return sectionData;
//     });
    
//     formData.append('content', JSON.stringify(contentForBackend));
    
//     // Add main blog image
//     if (data.image instanceof File) {
//       formData.append('image', data.image);
//     } else if (data.image) {
//       formData.append('imageUrl', data.image);
//     }
    
//     // Add section images
//     data.content.forEach((section, index) => {
//       if (section.image instanceof File) {
//         formData.append(`sectionImage_${index}`, section.image);
//       }
//     });

//     const response = await axios.post(`${BASE_URL}/blog/blogs`, formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//     });
//     return response.data;
//   },

//   // Update blog
//   updateBlog: async (slug, data) => {
//     const response = await axios.patch(`${BASE_URL}/blog/blogs/${slug}`, data);
//     return response.data;
//   },

//   // Delete blog
//   deleteBlog: async (slug) => {
//     const response = await axios.delete(`${BASE_URL}/blog/blogs/${slug}`);
//     return response.data;
//   },

//   // Get stats
//   getStats: async () => {
//     const response = await axios.get(`${BASE_URL}/blog/stats`);
//     return response.data;
//   },
//   // NEW: Like methods
//   // likeBlog: async (slug, isLiked) => {
//   //   const response = await fetch(`${BASE_URL}/blog/blogs/${slug}/like`, {
//   //     method: 'POST',
//   //     headers: { 'Content-Type': 'application/json' },
//   //     body: JSON.stringify({ isLiked }),
//   //   });
//   //   console.log(response);
    
//   //   if (!response.ok) throw new Error('Failed to like blog');
//   //   return response.json();
//   // },
//   likeBlog: async (slug) => {
//   const token = localStorage.getItem("token");

//   const response = await fetch(
//     `${BASE_URL}/blog/blogs/${slug}/like`,
//     {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`, // kept for backward compatibility
//       },
//       // Ensure browser sends cookies (httpOnly token) to backend
//       credentials: 'include',
//     }
//   );
// console.log("response:", response);

//   if (!response.ok) {
//     const err = await response.json().catch(() => ({}));
//     const msg = (err && err.message) || "";
//     if (response.status === 401 && /jwt expired/i.test(msg)) {
//       throw new Error("AUTH_EXPIRED");
//     }
//     if (response.status === 401) {
//       throw new Error("AUTH_REQUIRED");
//     }
//     throw new Error(msg || "Failed to like blog");
//   }

//   return response.json();
// },


//   // NEW: Comments methods
//   // getComments: async (slug) => {
//   //   const response = await fetch(`${BASE_URL}/blog/blogs/${slug}/comments`);
//   //   if (!response.ok) throw new Error('Failed to fetch comments');
//   //   return response.json();
//   // },

//   // addComment: async (slug, text, author = 'Anonymous') => {
//   //   const response = await fetch(`${BASE_URL}/blog/blogs/${slug}/comments`, {
//   //     method: 'POST',
//   //     headers: { 'Content-Type': 'application/json' },
//   //     body: JSON.stringify({ text, author }),
//   //   });
//   //   if (!response.ok) throw new Error('Failed to add comment');
//   //   return response.json();
//   // },
// addComment: async (slug, text) => {
//   const token = localStorage.getItem("token");

//   const response = await fetch(
//     `${BASE_URL}/blog/blogs/${slug}/comments`,
//     {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${token}`, // kept for backward compatibility
//       },
//       body: JSON.stringify({ text }),
//       // Ensure browser sends cookies (httpOnly token) to backend
//       credentials: 'include',
//     }
//   );

//   if (!response.ok) {
//     const err = await response.json().catch(() => ({}));
//     const msg = (err && err.message) || "";
//     if (response.status === 401 && /jwt expired/i.test(msg)) {
//       throw new Error("AUTH_EXPIRED");
//     }
//     if (response.status === 401) {
//       throw new Error("AUTH_REQUIRED");
//     }
//     throw new Error(msg || 'Failed to add comment');
//   }

//   return response.json();
// },

//   // deleteComment: async (slug, commentId) => {
//   //   const response = await fetch(`${BASE_URL}/blog/blogs/${slug}/comments/${commentId}`, {
//   //     method: 'DELETE',
//   //   });
//   //   if (!response.ok) throw new Error('Failed to delete comment');
//   //   return response.json();
//   // },
// deleteComment: async (slug, commentId) => {
//   const token = localStorage.getItem("token");

//   const response = await fetch(
//     `${BASE_URL}/blog/blogs/${slug}/comments/${commentId}`,
//     {
//       method: 'DELETE',
//       headers: {
//         Authorization: `Bearer ${token}`, // kept for backward compatibility
//       },
//       // Ensure browser sends cookies (httpOnly token) to backend
//       credentials: 'include',
//     }
//   );

//   if (!response.ok) {
//     const err = await response.json().catch(() => ({}));
//     const msg = (err && err.message) || "";
//     if (response.status === 401 && /jwt expired/i.test(msg)) {
//       throw new Error("AUTH_EXPIRED");
//     }
//     if (response.status === 401) {
//       throw new Error("AUTH_REQUIRED");
//     }
//     throw new Error(msg || 'Failed to delete comment');
//   }

//   return response.json();
// },

// };



import axios from 'axios';
import { BASE_URL } from '../utils/urls';

export const blogAPI = {
  // ✅ FIXED: Correct endpoint paths without the extra '/blog' prefix
  
  // Get all blogs with filtering
  // Endpoint: GET /api/blogs
  getBlogs: async (params = {}) => {
    const response = await axios.get(`${BASE_URL}/blogs`, { params });
    return response.data;
  },

  // Get latest blogs
  // Endpoint: GET /api/blogs/latest
  getLatestBlogs: async (limit = 3) => {
    const response = await axios.get(`${BASE_URL}/blogs/latest`, { 
      params: { limit } 
    });
    return response.data;
  },

  // Get single blog by slug
  // Endpoint: GET /api/blogs/:slug
  getBlogBySlug: async (slug) => {
    const response = await axios.get(`${BASE_URL}/blogs/${slug}`);
    return response.data;
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

    const response = await axios.post(`${BASE_URL}/blogs`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Update blog
  // Endpoint: PUT /api/blogs/:slug
  updateBlog: async (slug, data) => {
    const response = await axios.put(`${BASE_URL}/blogs/${slug}`, data);
    return response.data;
  },

  // Delete blog
  // Endpoint: DELETE /api/blogs/:slug
  deleteBlog: async (slug) => {
    const response = await axios.delete(`${BASE_URL}/blogs/${slug}`);
    return response.data;
  },

  // Get stats
  // Endpoint: GET /api/blogs/stats
  getStats: async () => {
    const response = await axios.get(`${BASE_URL}/blogs/stats`);
    return response.data;
  },

  // Like/Unlike blog
  // Endpoint: POST /api/blogs/:slug/like
  likeBlog: async (slug) => {
    const token = localStorage.getItem("token");

    const response = await fetch(
      `${BASE_URL}/blogs/${slug}/like`,
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
    const response = await axios.get(`${BASE_URL}/blogs/${slug}/comments`);
    return response.data;
  },

  // Add comment to blog
  // Endpoint: POST /api/blogs/:slug/comments
  addComment: async (slug, text) => {
    const token = localStorage.getItem("token");

    const response = await fetch(
      `${BASE_URL}/blogs/${slug}/comments`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ text }),
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
      throw new Error(msg || 'Failed to add comment');
    }

    return response.json();
  },

  // Delete comment from blog
  // Endpoint: DELETE /api/blogs/:slug/comments/:commentId
  deleteComment: async (slug, commentId) => {
    const token = localStorage.getItem("token");

    const response = await fetch(
      `${BASE_URL}/blogs/${slug}/comments/${commentId}`,
      {
        method: 'DELETE',
        headers: {
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
      throw new Error(msg || 'Failed to delete comment');
    }

    return response.json();
  },
};