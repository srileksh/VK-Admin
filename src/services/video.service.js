import axiosInstance from "@/services/axios";

export const initiateVideoUpload = async (payload) => {
  const res = await axiosInstance.post("/videos/initiate", payload);
  return res.data?.data ?? res.data;
};

export const getVideoStatusApi = async (videoId) => {
  const res = await axiosInstance.get(`/videos/${videoId}/status`);
  return res.data?.data ?? res.data;
};