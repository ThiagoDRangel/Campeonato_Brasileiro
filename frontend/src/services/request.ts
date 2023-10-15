import axios, { AxiosResponse } from 'axios';

export interface ApiResponse<T> {
  data: T;
}

const api = axios.create({
  baseURL: `http://localhost:${process.env.API_PORT || '3010'}`,
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
