
import axios from'axios'
import { BASE_URL } from "../utils/urls"
axios.defaults.withCredentials = true
// import { getToken } from "../utils/storageHandler";

export const googlereviewAPI=async()=>{
    // const userToken=getToken()  
    const response=await axios.get(`${BASE_URL}/review/google`)    
    return response.data
}
