
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true, // 🔴 required for refreshToken cookie
  headers: {
    "Content-Type": "application/json",
    "X-Client-Type": "web", // 🔴 required by backend
  },
});

export default axiosInstance;