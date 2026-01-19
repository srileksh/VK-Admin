
import axios from "axios";
import useAuthStore from "@/store/useAuthStore";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    "X-Client-Type": "web",
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;

    const { accessToken, logout } = useAuthStore.getState();

    // 🚫 Do NOT refresh for auth routes
    const isAuthRoute =
      originalRequest.url.includes("/auth/login") ||
      originalRequest.url.includes("/auth/refresh");

    // ✅ Refresh ONLY if:
    if (
      status === 401 &&
      accessToken &&               // token existed
      !originalRequest._retry &&
      !isAuthRoute
    ) {
      originalRequest._retry = true;

      try {
        const refreshRes = await axiosInstance.post("/auth/refresh");

        const newAccessToken =
          refreshRes.data?.data?.accessToken;

        useAuthStore.setState({
          accessToken: newAccessToken,
        });

        originalRequest.headers.Authorization =
          `Bearer ${newAccessToken}`;

        return axiosInstance(originalRequest);
      } catch (err) {
        logout();
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
