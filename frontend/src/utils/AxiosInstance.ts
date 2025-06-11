import axios from "axios";


export function getToken(): string | null {
  return localStorage.getItem("token");
}





const AxiosInstance = axios.create({
  baseURL: "http://127.0.0.1:5000/api/",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Interceptor to dynamically update token for every request
AxiosInstance.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default AxiosInstance;
