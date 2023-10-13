import axios, { AxiosResponse } from 'axios';

interface ApiResponse<T> {
  data: T;
}

const apiBaseURL = process.env.NODE_ENV === 'production'
  ? 'http://seu-servidor-em-producao.com'
  : 'http://localhost:3000';

const api = axios.create({
  baseURL: apiBaseURL,
});

export const setToken = (token: string) => {
  api.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const requestData = async <T>(endpoint: string): Promise<T> => {
  const response: AxiosResponse<ApiResponse<T>> = await api.get(endpoint);
  return response.data.data;
};

export const requestLogin = async <T>(endpoint: string, body: unknown): Promise<T> => {
  const response: AxiosResponse<ApiResponse<T>> = await api.post(endpoint, body);
  return response.data.data;
};

export default api;
