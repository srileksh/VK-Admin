import axiosInstance from "@/services/axios";

export const createSectionApi = async ({ courseId, title }) => {
  const res = await axiosInstance.post("/sections", {
    courseId,
    title,
  });

  return res.data.data; // { id }
};
