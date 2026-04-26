import axios from'axios'
import { BASE_URL } from "@/utils/urls"
axios.defaults.withCredentials = true
// import { getToken } from "@/utils/storageHandler";

export const dashboardAPI=async()=>{
    // const userToken=getToken()  
    const response=await axios.get(`${BASE_URL}/clickup/time`)
    return response.data
}

export const userDetailsAPI=async(name)=>{
    const response = await axios.get(`${BASE_URL}/clickup/user-details`, {
    params: { name, skipClickup: true },
    headers: { "Accept": "application/json" }
  });
    return response.data
}

export const userClickupStatsAPI=async(clickupId)=>{
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
