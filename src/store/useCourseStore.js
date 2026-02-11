
// import { create } from "zustand";
// import { createCourseApi, updateCourseApi } from "@/services/coursecontentApi";

// const useCourseStore = create((set, get) => ({
//   loading: false,
//   error: null,
//   courseId: null,

//   // SCREEN 1
//   createCourse: async (payload) => {
//     try {
//       set({ loading: true, error: null });

//       const res = await createCourseApi(payload);
//       const courseId = res.data.id;

//       set({ courseId });
//       return courseId;
//     } catch (error) {
//       set({ error });
//       throw error;
//     } finally {
//       set({ loading: false });
//     }
//   },

//   // SCREEN 2+
//   updateCourse: async (payload) => {
//     const courseId = get().courseId;

//     if (!courseId) {
//       throw new Error("Course ID not found. Create course first.");
//     }

//     try {
//       set({ loading: true, error: null });
//       const res = await updateCourseApi(courseId, payload);
//       return res;
//     } catch (error) {
//       set({ error });
//       throw error;
//     } finally {
//       set({ loading: false });
//     }
//   },

//   resetCourse: () => set({ courseId: null, error: null }),
// }));

// export default useCourseStore;


import { create } from "zustand";
import {
  createCourseApi,
  updateCourseApi,
  getAllCourses,
  deleteCourseApi,
} from "@/services/coursesApi";

const useCourseStore = create((set, get) => ({
  loading: false,
  error: null,
  courseId: null,
  courses: [],

  /* ================= FETCH COURSES ================= */
  fetchCourses: async () => {
    try {
      set({ loading: true, error: null });

      const res = await getAllCourses();
      set({ courses: res.data || res });

    } catch (error) {
      set({ error });
    } finally {
      set({ loading: false });
    }
  },

  /* ================= CREATE COURSE ================= */
  createCourse: async (payload) => {
    try {
      set({ loading: true, error: null });

      const res = await createCourseApi(payload);
      const courseId = res.data?.id || res.id;

      set({ courseId });

      // Refresh list
      await get().fetchCourses();

      return courseId;
    } catch (error) {
      set({ error });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  /* ================= UPDATE COURSE ================= */
  updateCourse: async (payload) => {
    const courseId = get().courseId;

    if (!courseId) {
      throw new Error("Course ID not found. Create course first.");
    }

    try {
      set({ loading: true, error: null });

      await updateCourseApi(courseId, payload);

      await get().fetchCourses();

    } catch (error) {
      set({ error });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  /* ================= DELETE COURSE ================= */
  deleteCourse: async (courseId) => {
    try {
      set({ loading: true, error: null });

      await deleteCourseApi(courseId);

      await get().fetchCourses();

    } catch (error) {
      set({ error });
    } finally {
      set({ loading: false });
    }
  },

  setCourseId: (id) => set({ courseId: id }),

  resetCourse: () => set({ courseId: null, error: null }),
}));

export default useCourseStore;
