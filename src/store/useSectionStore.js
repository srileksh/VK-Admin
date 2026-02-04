import { create } from "zustand";
import axiosInstance from "@/services/axios";

const useSectionStore = create((set) => ({
  loading: false,

  createSection: async ({ courseId, title }) => {
    try {
      set({ loading: true });
      const res = await axiosInstance.post("/sections", {
        courseId,
        title,
      });
      return res.data.data; // { id }
    } finally {
      set({ loading: false });
    }
  },
}));

export default useSectionStore;
