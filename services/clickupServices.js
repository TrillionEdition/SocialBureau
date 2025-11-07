import axios from'axios'
import { BASE_URL } from "../utils/urls"
axios.defaults.withCredentials = true
// import { getToken } from "../utils/storageHandler";

export const dashboardAPI=async()=>{
    // const userToken=getToken()  
    const response=await axios.get(`${BASE_URL}/clickup/time`)
    return response.data
}

export const userDetailsAPI=async(name)=>{
    // const userToken=getToken()  
    const response = await axios.get(`${BASE_URL}/clickup/user-details`, {
  params: { name },
  headers: { "Accept": "application/json" }
});

  console.log(name,response);
  
    return response.data
}