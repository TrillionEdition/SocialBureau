import axios from "axios";
import { BASE_URL } from "@/utils/urls";

const API_URL = `${BASE_URL}/api/audit-reports`;

const auditReportService = {
  // Get reports for the currently logged-in user
  getMyReports: async () => {
    const response = await axios.get(`${API_URL}/my-reports`, {
      withCredentials: true,
    });
    return response.data;
  },

  // Download secure PDF - authenticated, then redirect to R2
  downloadReport: async (reportId) => {
    try {
      const response = await axios.get(`${API_URL}/download/${reportId}`, {
        withCredentials: true,
        maxRedirects: 0, // Don't auto-follow to avoid CORS with credentials
      });
      return response.data;
    } catch (error) {
      // Axios treats redirects as errors when maxRedirects: 0
      if (error.response?.status >= 300 && error.response?.status < 400) {
        const redirectUrl = error.response.headers.location;
        if (redirectUrl) {
          // Use window.location to navigate to R2 URL (bypasses CORS)
          window.location.href = redirectUrl;
          return { redirected: true };
        }
      }
      throw error;
    }
  },

  // ADMIN: Get all registered clients (paginated, filtered, searched)
  adminGetClients: async (page = 1, limit = 10, search = "", status = "") => {
    const response = await axios.get(`${API_URL}/admin/clients`, {
      params: { page, limit, search, status },
      withCredentials: true,
    });
    return response.data;
  },

  // ADMIN: Get client details and their uploaded reports
  adminGetClientDetails: async (clientId) => {
    const response = await axios.get(`${API_URL}/admin/client/${clientId}`, {
      withCredentials: true,
    });
    return response.data;
  },

  // ADMIN: Upload a new PDF report (multipart/form-data)
  adminUploadReport: async (formData) => {
    const response = await axios.post(`${API_URL}/admin/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });
    return response.data;
  },

  // ADMIN: Update metadata of an existing report
  adminUpdateReport: async (reportId, data) => {
    const response = await axios.put(`${API_URL}/admin/report/${reportId}`, data, {
      withCredentials: true,
    });
    return response.data;
  },

  // ADMIN: Delete a report
  adminDeleteReport: async (reportId) => {
    const response = await axios.delete(`${API_URL}/admin/report/${reportId}`, {
      withCredentials: true,
    });
    return response.data;
  },
  // ADMIN: Create a new client and user account
  adminCreateClient: async (data) => {
    const response = await axios.post(`${API_URL}/admin/clients`, data, {
      withCredentials: true,
    });
    return response.data;
  },
};

export default auditReportService;
