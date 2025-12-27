axios.defaults.withCredentials = true;

export const registerUserAPI = async (payload) => {
  const { data } = await axios.post(
    `${BASE_URL}/user/register`,
    payload
  );
  return data;
};

export const getTeamAPI = async () => {
  const { data } = await axios.get(`${BASE_URL}/user/team`);
  return data;
};