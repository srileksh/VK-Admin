// import { create } from "zustand";
// import axiosInstance from "@/services/axios";
// import { updateSectionApi } from "@/services/section.service";
// import { deleteSectionApi } from "@/services/section.service";
// const useSectionStore = create((set) => ({
//   loading: false,

//   createSection: async ({ courseId, title }) => {
//     try {
//       set({ loading: true });
//       const res = await axiosInstance.post("/sections", {
//         courseId,
//         title,
//       });
//       return res.data.data; // { id }
//     } finally {
//       set({ loading: false });
//     }
//   },
//     /* UPDATE SECTION */
//   updateSection: async ({ sectionId, title }) => {
//     try {
//       set({ loading: true });
//       const data = await updateSectionApi({ sectionId, title });
//       return data;
//     } finally {
//       set({ loading: false });
//     }
//   },
//     /* DELETE */
//   deleteSection: async (sectionId) => {
//     try {
//       set({ loading: true });
//       await deleteSectionApi(sectionId);
//       return true;
//     } finally {
//       set({ loading: false });
//     }
//   },


// }));

// export default useSectionStore;


import { create } from "zustand";
import {
  createSectionApi,
  updateSectionApi,
  deleteSectionApi,
  getSectionByIdApi,
} from "@/services/section.service";

const useSectionStore = create((set) => ({
  loading: false,
  error: null,

  /* ================= CREATE ================= */
  createSection: async ({ courseId, title }) => {
    try {
      set({ loading: true, error: null });

      const data = await createSectionApi({ courseId, title });

      return data; // { id }
    } catch (error) {
      set({ error: error?.response?.data?.message || "Create failed" });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  /* ================= GET ================= */
  getSectionById: async (sectionId) => {
    try {
      set({ loading: true, error: null });

      const data = await getSectionByIdApi(sectionId);

      return data;
    } catch (error) {
      set({ error: error?.response?.data?.message || "Fetch failed" });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  /* ================= UPDATE ================= */
  updateSection: async ({ sectionId, title }) => {
    try {
      set({ loading: true, error: null });

      const data = await updateSectionApi({ sectionId, title });

      return data;
    } catch (error) {
      set({ error: error?.response?.data?.message || "Update failed" });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  /* ================= DELETE ================= */
  deleteSection: async (sectionId) => {
    try {
      set({ loading: true, error: null });

      await deleteSectionApi(sectionId);

      return true;
    } catch (error) {
      set({ error: error?.response?.data?.message || "Delete failed" });
      throw error;
    } finally {
      set({ loading: false });
    }
  },
}));

export default useSectionStore;