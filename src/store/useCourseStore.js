import { create } from "zustand";
import {  createCourse } from "@/services/coursesApi";

const useCourseStore = create((set) => ({
  loading: false,
  currentCourseId: null,

  createCourse: async (payload) => {
    set({ loading: true });
    try {
      const res = await createCourse(payload);
      set({ currentCourseId: res.data.id });
      return res.data.id;
    } finally {
      set({ loading: false });
    }
  },

  clearCurrentCourse: () => set({ currentCourseId: null }),
}));

export default useCourseStore;
