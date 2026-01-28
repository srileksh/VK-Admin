import axios from "axios";
import useAuthStore from "@/store/useAuthStore";
import toast from "react-hot-toast";


const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    "X-Client-Type": "web",
  },
});

let isRedirecting = false;

// Attach token
axiosInstance.interceptors.request.use((config) => {
  const { accessToken } = useAuthStore.getState();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// 🚨 GLOBAL 401 HANDLER
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const { logout } = useAuthStore.getState();

    if (status === 401 && !isRedirecting) {
      isRedirecting = true;

      logout();

      if (typeof window !== "undefined") {
        toast.error("Session timed out. Please login again.");
        window.location.href = "/";
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
