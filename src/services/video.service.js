// // services/video.service.js
// import axiosInstance from "./axios";

// export const initiateVideoUpload = async ({ purpose, size }) => {
//   const res = await axiosInstance.post("/videos/initiate", {
//     purpose, // "LESSON" | "PROMO"
//     size,    // bytes
//   });

//   return res.data.data;
//   // { provider, videoAssetId, uploadUrl }
// };
import axiosInstance from "@/services/axios";

export const initiateVideoUpload = async (payload) => {
  const res = await axiosInstance.post("/videos/upload", payload);
  return res.data?.data ?? res.data;
};

export const getVideoStatusApi = async (videoId) => {
  const res = await axiosInstance.get(`/videos/${videoId}/status`);
  return res.data?.data ?? res.data;
};