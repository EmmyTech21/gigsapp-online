import axios from 'axios';

const API_URL = 'https://your-backend-api-url/user';

export const getUserProfile = async (token: string) => {
  const response = await axios.get(`${API_URL}/profile`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};