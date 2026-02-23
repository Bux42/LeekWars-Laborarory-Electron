import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:7000',
});

export const apiClient = async <T>({
  url,
  method,
  data,
  headers,
  signal,
}: {
  url: string;
  method: string;
  data?: unknown;
  headers?: Record<string, string>;
  signal?: AbortSignal;
}): Promise<T> => {
  const response = await axiosInstance.request<T>({
    url,
    method,
    data,
    headers,
    signal,
  });

  return response.data;
};
