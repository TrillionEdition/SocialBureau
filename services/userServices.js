import axios from'axios'
import { BASE_URL } from "../utils/urls"
axios.defaults.withCredentials = true
// import { getToken } from "../utils/storageHandler";

export const usersAPI=async(data)=>{
    // const userToken=getToken()  
    const response=await axios.get(`${BASE_URL}/user/team`)
    return response.data
}



////////////////////////////////
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


