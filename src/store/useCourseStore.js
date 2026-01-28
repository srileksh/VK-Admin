// import { create } from "zustand";
// import {  createCourse } from "@/services/coursesApi";

// const useCourseStore = create((set) => ({
//   loading: false,
//   currentCourseId: null,

//   createCourse: async (payload) => {
//     set({ loading: true });
//     try {
//       const res = await createCourse(payload);
//       set({ currentCourseId: res.data.id });
//       return res.data.id;
//     } finally {
//       set({ loading: false });
//     }
//   },

//   clearCurrentCourse: () => set({ currentCourseId: null }),
// }));





// export default useCourseStore;



import { create } from "zustand";
import { createCourseApi, updateCourseApi } from "@/services/coursecontentApi";

const useCourseStore = create((set) => ({
  loading: false,
  error: null,

  // SCREEN 1
  createCourse: async (payload) => {
    try {
      set({ loading: true });
      const data = await createCourseApi(payload);
      return data.id; // courseId
    } catch (error) {
      set({ error });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  // SCREEN 2
  updateCourse: async (courseId, payload) => {
    try {
      set({ loading: true });
      const data = await updateCourseApi(courseId, payload);
      return data;
    } catch (error) {
      set({ error });
      throw error;
    } finally {
      set({ loading: false });
    }
  },
}));

export default useCourseStore;
