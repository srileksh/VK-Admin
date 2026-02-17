// import { create } from "zustand";
// import {
//   createCourseApi,
//   updateCourseApi,
//   getAllCourses,
//   deleteCourseApi,
// } from "@/services/coursesApi";

// const useCourseStore = create((set, get) => ({
//   loading: false,
//   error: null,
//   courseId: null,
//   courses: [],

//   /* ================= FETCH COURSES ================= */
//   fetchCourses: async () => {
//     try {
//       set({ loading: true, error: null });

//       const res = await getAllCourses();
//       set({ courses: res.data || res });

//     } catch (error) {
//       set({ error });
//     } finally {
//       set({ loading: false });
//     }
//   },

//   /* ================= CREATE COURSE ================= */
//   createCourse: async (payload) => {
//     try {
//       set({ loading: true, error: null });

//       const res = await createCourseApi(payload);
//       const courseId = res.data?.id || res.id;

//       set({ courseId });

//       // Refresh list
//       await get().fetchCourses();

//       return courseId;
//     } catch (error) {
//       set({ error });
//       throw error;
//     } finally {
//       set({ loading: false });
//     }
//   },

//   /* ================= UPDATE COURSE ================= */
//   updateCourse: async (payload) => {
//     const courseId = get().courseId;

//     if (!courseId) {
//       throw new Error("Course ID not found. Create course first.");
//     }

//     try {
//       set({ loading: true, error: null });

//       await updateCourseApi(courseId, payload);

//       await get().fetchCourses();

//     } catch (error) {
//       set({ error });
//       throw error;
//     } finally {
//       set({ loading: false });
//     }
//   },

//   /* ================= DELETE COURSE ================= */
//   deleteCourse: async (courseId) => {
//     try {
//       set({ loading: true, error: null });

//       await deleteCourseApi(courseId);

//       await get().fetchCourses();

//     } catch (error) {
//       set({ error });
//     } finally {
//       set({ loading: false });
//     }
//   },

//   setCourseId: (id) => set({ courseId: id }),

//   resetCourse: () => set({ courseId: null, error: null }),
// }));

// export default useCourseStore;




import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  createCourseApi,
  updateCourseApi,
  getAllCourses,
  deleteCourseApi,
  replacePromoVideoApi,
  removePromoVideoApi,
  togglePopularApi,
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

  /* ================= TOGGLE POPULAR ================= */
  togglePopular: async (courseId, currentValue) => {
    const newValue = !currentValue;

    // Optimistic update (instant UI update)
    set({
      courses: get().courses.map((course) =>
        course.id === courseId
          ? { ...course, isPopular: newValue }
          : course
      ),
    });

    try {
      await togglePopularApi(courseId, newValue);
    } catch (error) {
      // Rollback if API fails
      set({
        courses: get().courses.map((course) =>
          course.id === courseId
            ? { ...course, isPopular: currentValue }
            : course
        ),
      });
      set({ error });
    }
  },

  /* ================= REPLACE PROMO VIDEO ================= */
  replacePromoVideo: async (videoAssetId, videoProvider) => {
    const courseId = get().courseId;
    if (!courseId) throw new Error("Course not created");

    try {
      set({ loading: true, error: null });

      await replacePromoVideoApi(courseId, videoAssetId, videoProvider);

    } catch (error) {
      set({ error });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  /* ================= REMOVE PROMO VIDEO ================= */
  removePromoVideo: async () => {
    const courseId = get().courseId;
    if (!courseId) throw new Error("Course not created");

    try {
      set({ loading: true, error: null });

      await removePromoVideoApi(courseId);

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


// import { create } from "zustand";
// import {
//   createCourseApi,
//   updateCourseApi,
//   getAllCourses,
//   deleteCourseApi,
//   replacePromoVideoApi,
//   removePromoVideoApi,
// } from "@/services/coursesApi";
// import axiosInstance from "@/services/axios";

// const useCourseStore = create((set, get) => ({
//   loading: false,
//   error: null,
//   courseId: null,
//   courses: [],
//   currentCourse: null,

//   /* ================= FETCH ALL COURSES ================= */
//   fetchCourses: async () => {
//     try {
//       set({ loading: true, error: null });

//       const res = await getAllCourses();
//       set({ courses: res.data || res });

//     } catch (error) {
//       set({ error });
//     } finally {
//       set({ loading: false });
//     }
//   },

//   /* ================= FETCH SINGLE COURSE ================= */
//   fetchCourseById: async (courseId) => {
//     try {
//       set({ loading: true, error: null });

//       const res = await axiosInstance.get(`/courses/${courseId}`);
//       set({
//         currentCourse: res.data.data,
//         courseId: courseId,
//       });

//     } catch (error) {
//       set({ error });
//     } finally {
//       set({ loading: false });
//     }
//   },

//   /* ================= CREATE COURSE ================= */
//   createCourse: async (payload) => {
//     try {
//       set({ loading: true, error: null });

//       const res = await createCourseApi(payload);
//       const id = res.data?.id || res.id;

//       set({ courseId: id });

//       await get().fetchCourses();
//       return id;

//     } catch (error) {
//       set({ error });
//       throw error;
//     } finally {
//       set({ loading: false });
//     }
//   },

//   /* ================= UPDATE COURSE ================= */
//   updateCourse: async (payload) => {
//     const courseId = get().courseId;
//     if (!courseId) throw new Error("Course ID not found");

//     try {
//       set({ loading: true, error: null });

//       await updateCourseApi(courseId, payload);
//       await get().fetchCourseById(courseId);

//     } catch (error) {
//       set({ error });
//       throw error;
//     } finally {
//       set({ loading: false });
//     }
//   },

//   /* ================= TOGGLE POPULAR ================= */
//   togglePopular: async (courseId, currentValue) => {
//     const newValue = !currentValue;

//     set({
//       courses: get().courses.map((c) =>
//         c.id === courseId ? { ...c, isPopular: newValue } : c
//       ),
//     });

//     try {
//       await togglePopularApi(courseId, newValue);
//     } catch (error) {
//       set({ error });
//     }
//   },

//   /* ================= PROMO VIDEO ================= */
//   replacePromoVideo: async (videoAssetId, videoProvider) => {
//     const courseId = get().courseId;
//     if (!courseId) throw new Error("Course not created");

//     await replacePromoVideoApi(courseId, videoAssetId, videoProvider);
//   },

//   removePromoVideo: async () => {
//     const courseId = get().courseId;
//     if (!courseId) throw new Error("Course not created");

//     await removePromoVideoApi(courseId);
//   },

//   /* ================= DELETE ================= */
//   deleteCourse: async (courseId) => {
//     try {
//       set({ loading: true, error: null });
//       await deleteCourseApi(courseId);
//       await get().fetchCourses();
//     } finally {
//       set({ loading: false });
//     }
//   },

//   setCourseId: (id) => set({ courseId: id }),

//   resetCourse: () =>
//     set({
//       courseId: null,
//       currentCourse: null,
//       error: null,
//     }),
// }));

// export default useCourseStore;
// import { create } from "zustand";
// import { persist } from "zustand/middleware";
// import {
//   createCourseApi,
//   updateCourseApi,
//   getAllCourses,
//   deleteCourseApi,
//   replacePromoVideoApi,
//   removePromoVideoApi,
//   togglePopularApi,
// } from "@/services/coursesApi";
// import axiosInstance from "@/services/axios";

// const useCourseStore = create(
//   persist(
//     (set, get) => ({
//       loading: false,
//       error: null,
//       courseId: null,
//       courses: [],
//       currentCourse: null,

//       /* ================= FETCH ALL COURSES ================= */
//       fetchCourses: async () => {
//         try {
//           set({ loading: true, error: null });

//           const res = await getAllCourses();
//           set({ courses: res.data || res });

//         } catch (error) {
//           set({ error });
//         } finally {
//           set({ loading: false });
//         }
//       },

//       /* ================= FETCH SINGLE COURSE ================= */
//       // fetchCourseById: async (courseId) => {
//       //   try {
//       //     set({ loading: true, error: null });

//       //     const res = await axiosInstance.get(`/courses/${courseId}`);

//       //     set({
//       //       currentCourse: res.data.data,
//       //       courseId: courseId, // ✅ fixed bug here
//       //     });

//       //   } catch (error) {
//       //     set({ error });
//       //   } finally {
//       //     set({ loading: false });
//       //   }
//       // },

 
// fetchCourses: async () => {
//   try {
//     set({ loading: true, error: null });

//     const res = await getAllCourses();

//     // ✅ res.data is already the array
//     const courses = (res.data || []).map((course) => ({
//       ...course,
//       isPopular: course.isPopular ?? course.is_popular ?? false,
//     }));

//     set({ courses });

//   } catch (error) {
//     set({ error });
//   } finally {
//     set({ loading: false });
//   }
// },


//       /* ================= CREATE COURSE ================= */
//       createCourse: async (payload) => {
//         try {
//           set({ loading: true, error: null });

//           const res = await createCourseApi(payload);
//           const id = res.data?.id || res.id;

//           set({ courseId: id });

//           await get().fetchCourses();
//           return id;

//         } catch (error) {
//           set({ error });
//           throw error;
//         } finally {
//           set({ loading: false });
//         }
//       },

//       /* ================= UPDATE COURSE ================= */
//       updateCourse: async (payload) => {
//         const courseId = get().courseId;
//         if (!courseId) throw new Error("Course ID not found");

//         try {
//           set({ loading: true, error: null });

//           await updateCourseApi(courseId, payload);
//           await get().fetchCourseById(courseId);

//         } catch (error) {
//           set({ error });
//           throw error;
//         } finally {
//           set({ loading: false });
//         }
//       },

//       /* ================= TOGGLE POPULAR ================= */
//       togglePopular: async (courseId, currentValue) => {
//         const newValue = !currentValue;

//         // Optimistic update
//         set({
//           courses: get().courses.map((c) =>
//             c.id === courseId ? { ...c, isPopular: newValue } : c
//           ),
//         });

//         try {
//           await togglePopularApi(courseId, newValue);
//         } catch (error) {
//           set({ error });
//         }
//       },

//       /* ================= PROMO VIDEO ================= */
//       replacePromoVideo: async (videoAssetId, videoProvider) => {
//         const courseId = get().courseId;
//         if (!courseId) throw new Error("Course not created");

//         await replacePromoVideoApi(courseId, videoAssetId, videoProvider);
//       },

//       removePromoVideo: async () => {
//         const courseId = get().courseId;
//         if (!courseId) throw new Error("Course not created");

//         await removePromoVideoApi(courseId);
//       },

//       /* ================= DELETE ================= */
//       deleteCourse: async (courseId) => {
//         try {
//           set({ loading: true, error: null });
//           await deleteCourseApi(courseId);

//           // Remove locally instead of refetching
//           set({
//             courses: get().courses.filter((c) => c.id !== courseId),
//           });

//         } finally {
//           set({ loading: false });
//         }
//       },

//       setCourseId: (id) => set({ courseId: id }),

//       resetCourse: () =>
//         set({
//           courseId: null,
//           currentCourse: null,
//           error: null,
//         }),
//     }),
//     {
//       name: "course-storage", // localStorage key
//       partialize: (state) => ({
//         courses: state.courses,
//         courseId: state.courseId,
//         currentCourse: state.currentCourse,
//       }),
//     }
//   )
// );

// export default useCourseStore;
