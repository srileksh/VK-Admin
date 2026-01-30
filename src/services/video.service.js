import axiosInstance from "./axios";


export const initiateVideoUpload = async (purpose) => {
  const res = await axiosInstance.post("/videos/initiate", {
    purpose, // "LESSON" | "PROMO"
  });

  return res.data.data; 
  // { provider, videoAssetId, uploadUrl }
};
