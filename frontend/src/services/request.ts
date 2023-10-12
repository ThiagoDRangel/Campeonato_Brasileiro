import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5173',
});

export const setToken = (token: any) => {
  api.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const requestData = async (endpoint: any) => {
  const { data } = await api.get(endpoint);
  return data;
};

export const requestLogin = async (endpoint: any, body: any) => {
  const { data } = await api.post(endpoint, body);
  return data;
};

export default api;