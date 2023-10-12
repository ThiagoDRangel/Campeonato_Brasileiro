import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5173',
});

export const setToken = (token: any) => {
  api.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const requestData = async (endpoint: string, params: Record<string, any>) => {
  const { data } = await api.get(endpoint, { params });
  return data;
};

export const requestLogin = async (endpoint: any, body: any) => {
  const { data } = await api.post(endpoint, body);
  return data;
};

export default api;