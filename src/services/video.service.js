// services/video.service.js
import axiosInstance from "./axios";

export const initiateVideoUpload = async ({ purpose, size }) => {
  const res = await axiosInstance.post("/videos/initiate", {
    purpose, // "LESSON" | "PROMO"
    size,    // bytes
  });

  return res.data.data;
  // { provider, videoAssetId, uploadUrl }
};
