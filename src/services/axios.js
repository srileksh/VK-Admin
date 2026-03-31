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

axiosInstance.interceptors.request.use((config) => {
  const { accessToken } = useAuthStore.getState();

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error.response?.status;
    const requestUrl = error.config?.url || "";
    const { logout } = useAuthStore.getState();

    const isLoginRequest = requestUrl.includes("/auth/login");

    // login failure should stay on login page
    if (isLoginRequest) {
      return Promise.reject(error);
    }

    // protected route auth failure
    if ((status === 401 || status === 403) && !isRedirecting) {
      isRedirecting = true;

      await logout();

      if (typeof window !== "undefined") {
        toast.error("Session expired or unauthorized. Please login again.");
        window.location.href = "/admin";
      }

      setTimeout(() => {
        isRedirecting = false;
      }, 1000);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;