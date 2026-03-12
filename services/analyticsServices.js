import axios from "axios";
import { BASE_URL } from "../utils/urls";

export const analyticsAPI = {
  getAnalytics: async (
    range = "last30Days",
    param = null,
    startDate = null,
    endDate = null
  ) => {
    try {
      const params = { range };
      if (param) params.param = param;
      if (startDate) params.startDate = startDate;
      if (endDate) params.endDate = endDate;

      const response = await axios.get(`${BASE_URL}/api/analytics`, {
        params,
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching analytics:", error);
      throw error;
    }
  },

  getSummary: async (range = "last30Days") => {
    try {
      const response = await axios.get(`${BASE_URL}/api/analytics/summary`, {
        params: { range },
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching analytics summary:", error);
      throw error;
    }
  },
};

