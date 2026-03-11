import { create } from "zustand";
import axiosInstance from "@/services/axios";
import { updateSectionApi } from "@/services/section.service";
import { deleteSectionApi } from "@/services/section.service";
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
    /* UPDATE SECTION */
  updateSection: async ({ sectionId, title }) => {
    try {
      set({ loading: true });
      const data = await updateSectionApi({ sectionId, title });
      return data;
    } finally {
      set({ loading: false });
    }
  },
    /* DELETE */
  deleteSection: async (sectionId) => {
    try {
      set({ loading: true });
      await deleteSectionApi(sectionId);
      return true;
    } finally {
      set({ loading: false });
    }
  },


}));

export default useSectionStore;
