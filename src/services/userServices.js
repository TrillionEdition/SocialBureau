import axios from 'axios'
import { BASE_URL } from "@/utils/urls"
axios.defaults.withCredentials = true
// import { getToken } from "@/utils/storageHandler";

export const usersAPI = async (data) => {
  // const userToken=getToken()  
  const response = await axios.get(`${BASE_URL}/user/team`)
  return response.data
}


axios.defaults.withCredentials = true;

export const registerUserAPI = async (payload) => {
  console.log(payload);

  const { data } = await axios.post(
    `${BASE_URL}/user/register`,
    payload,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return data;
};

export const getTeamAPI = async () => {
  const { data } = await axios.get(`${BASE_URL}/user/team`);
  return data;
};

/**
 * ✅ Check if email already exists in DB
 * Uses existing /user/team API
 */
export const checkEmailExistsAPI = async (email) => {
  const users = await getTeamAPI();

  return users.some(
    (u) => u.email?.toLowerCase() === email.toLowerCase()
  );
};



export const getUserProfileAPI = async (userId) => {
  // If userId is provided, fetch specific user
  // Otherwise try /user/profile (me)
  const endpoint = userId ? `${BASE_URL}/user/${userId}` : `${BASE_URL}/user/profile`;

  try {
    const { data } = await axios.get(endpoint);
    return data;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
};

export const updateUserProfileAPI = async (userId, payload) => {
  const endpoint = userId ? `${BASE_URL}/user/${userId}` : `${BASE_URL}/user/profile`;

  try {
    const { data } = await axios.put(endpoint, payload, { withCredentials: true });
    return data;
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw error;
  }
};

export const updateProfileWithImagesAPI = async (userId, payload) => {
  const endpoint = userId ? `${BASE_URL}/user/${userId}` : `${BASE_URL}/user/profile`;
  const formData = new FormData();

  Object.keys(payload).forEach(key => {
    const value = payload[key];

    if (value !== null && value !== undefined) {
      if (value instanceof File) {
        // Direct file upload
        formData.append(key, value);
      } else if (Array.isArray(value) || (typeof value === 'object' && !(value instanceof File))) {
        // Stringify arrays and objects for FormData
        formData.append(key, JSON.stringify(value));
      } else {
        // Primitive values (string, number, etc)
        formData.append(key, value);
      }
    }
  });

  try {
    const { data } = await axios.put(endpoint, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });
    return data;
  } catch (error) {
    console.error("Error updating profile with images:", error.response?.data || error.message);
    throw error;
  }
};

export const logoutUser = async () => {
  const response = await axios.post(
    `${BASE_URL}/user/logout`,
    {},
    { withCredentials: true } // VERY important for cookies
  )

  return response.data
}

// HR FORUM ACTIVITY
export const getUserApplicationsAPI = async (userId) => {
  const { data } = await axios.get(`${BASE_URL}/hr-applications/user-applications/${userId}`);
  return data;
};

export const getUserSavedJobsAPI = async (userId) => {
  const { data } = await axios.get(`${BASE_URL}/hr-applications/user-saved-jobs/${userId}`);
  return data;
};
