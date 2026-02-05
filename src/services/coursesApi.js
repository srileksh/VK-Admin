import axiosInstance from "./axios.js";

export const createCourse = async (payload) => {
  const res = await axiosInstance.post("/courses", payload);
  return res.data;
};
export const publishCourse = async (courseId)=>{
  const res = await axiosInstance.post(`/courses/${courseId}/publish`);
  return res.data;
}