// import axiosInstance from "./axios.js";

// export const createCourse = async (payload) => {
//   const res = await axiosInstance.post("/courses", payload);
//   return res.data;
// };
// export const publishCourse = async (courseId)=>{
//   const res = await axiosInstance.post(`/courses/${courseId}/publish`);
//   return res.data;
// }


import axiosInstance from "./axios";

/* ================= GET ALL COURSES ================= */
export const getAllCourses = async () => {
  const res = await axiosInstance.get("/admin/courses");
  return res.data;
};

/* ================= CREATE COURSE ================= */
export const createCourseApi = async (payload) => {
  const res = await axiosInstance.post("/courses", payload);
  return res.data;
};

/* ================= UPDATE COURSE ================= */
export const updateCourseApi = async (courseId, payload) => {
  const res = await axiosInstance.put(`/courses/${courseId}`, payload);
  return res.data;
};

/* ================= DELETE COURSE ================= */
export const deleteCourseApi = async (courseId) => {
  const res = await axiosInstance.delete(`/courses/${courseId}`);
  return res.data;
};

/* ================= PUBLISH ================= */
export const publishCourse = async (courseId) => {
  const res = await axiosInstance.post(`/courses/${courseId}/publish`);
  return res.data;
};
