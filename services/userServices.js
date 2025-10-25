import axios from'axios'
import { BASE_URL } from "../utils/urls"
axios.defaults.withCredentials = true
// import { getToken } from "../utils/storageHandler";

export const usersAPI=async(data)=>{
    // const userToken=getToken()  
    const response=await axios.get(`${BASE_URL}/user/team`)
    return response.data
}
