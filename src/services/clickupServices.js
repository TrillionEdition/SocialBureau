import axios from 'axios'
import { BASE_URL } from "@/utils/urls"
axios.defaults.withCredentials = true
// import { getToken } from "@/utils/storageHandler";

export const dashboardAPI = async () => {
  // const userToken=getToken()  
  const response = await axios.get(`${BASE_URL}/clickup/time`)
  return response.data
}

export const userDetailsAPI = async (name) => {
  const response = await axios.get(`${BASE_URL}/clickup/user-details`, {
    params: { name, skipClickup: true },
    headers: { "Accept": "application/json" }
  });
  return response.data
}

export const userClickupStatsAPI = async (clickupId) => {
  const response = await axios.get(`${BASE_URL}/clickup/stats`, {
    params: { clickupId },
    headers: { "Accept": "application/json" }
  });
  return response.data
}

export const createClickUpTask = async (taskData) => {
  const response = await axios.post(`${BASE_URL}/clickup/create-task`, taskData, {
    headers: { "Content-Type": "application/json" }
  });
  return response.data;
}

export const getClickUpTasks = async () => {
  const response = await axios.get(`${BASE_URL}/clickup/tasks`);
  return response.data;
}

export const getTaskActivity = async (taskId) => {
  const response = await axios.get(`${BASE_URL}/clickup/tasks/${taskId}/activity`);
  return response.data;
}

export const getClickUpActivity = async () => {
  const response = await axios.get(`${BASE_URL}/clickup/general-activity`);
  return response.data;
}

export const getClickUpTask = async (taskId) => {
  const response = await axios.get(`${BASE_URL}/clickup/tasks/${taskId}`);
  return response.data;
}

export const getClickUpChat = async (viewId) => {
  const response = await axios.get(`${BASE_URL}/clickup/chat-messages/${viewId}`);
  return response.data;
}

export const postClickUpChat = async (viewId, commentText) => {
  const response = await axios.post(`${BASE_URL}/clickup/chat-messages/${viewId}`, {
    comment_text: commentText
  });
  return response.data;
}

export const uploadClickUpAttachment = async (viewId, file) => {
  const formData = new FormData();
  formData.append('attachment', file);

  const response = await axios.post(`${BASE_URL}/clickup/chat-messages/${viewId}/attachment`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
}


