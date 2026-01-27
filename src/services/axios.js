
// import axios from "axios";
// import useAuthStore from "@/store/useAuthStore";

// const axiosInstance = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
//   withCredentials: true,
//   headers: {
//     "Content-Type": "application/json",
//     "X-Client-Type": "web",
//   },
// });

// // Attach token on every request
// axiosInstance.interceptors.request.use((config) => {
//   const { accessToken } = useAuthStore.getState();
//   console.log("accesstoken",accessToken)
//   if (accessToken) {
//     config.headers.Authorization = `Bearer ${accessToken}`;
//   }
//   return config;
// });

// // Response interceptor for 401 / refresh token
// axiosInstance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;
//     if (!originalRequest) return Promise.reject(error);

//     const status = error.response?.status;
//     const { accessToken, logout } = useAuthStore.getState();

//     const isAuthRoute =
//       originalRequest.url.includes("/auth/login") ||
//       originalRequest.url.includes("/auth/refresh");

//     if (status === 401 && accessToken && !originalRequest._retry && !isAuthRoute) {
//       originalRequest._retry = true;

//       try {
//         const refreshRes = await axiosInstance.post("/auth/refresh");
//         const newAccessToken = refreshRes.data?.data?.accessToken;

//         if (!newAccessToken) throw new Error("Refresh failed");

//         useAuthStore.setState({ accessToken: newAccessToken });

//         originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
//         return axiosInstance(originalRequest);
//       } catch (err) {
//         logout();
//         return Promise.reject(err);
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// export default axiosInstance;









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
