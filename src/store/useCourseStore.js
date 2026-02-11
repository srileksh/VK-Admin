
// // // // // import { create } from "zustand";
// // // // // import { createCourseApi, updateCourseApi } from "@/services/coursecontentApi";

// // // // // const useCourseStore = create((set, get) => ({
// // // // //   loading: false,
// // // // //   error: null,
// // // // //   courseId: null,

// // // // //   // SCREEN 1
// // // // //   createCourse: async (payload) => {
// // // // //     try {
// // // // //       set({ loading: true, error: null });

// // // // //       const res = await createCourseApi(payload);
// // // // //       const courseId = res.data.id;

// // // // //       set({ courseId });
// // // // //       return courseId;
// // // // //     } catch (error) {
// // // // //       set({ error });
// // // // //       throw error;
// // // // //     } finally {
// // // // //       set({ loading: false });
// // // // //     }
// // // // //   },

// // // // //   // SCREEN 2+
// // // // //   updateCourse: async (payload) => {
// // // // //     const courseId = get().courseId;

// // // // //     if (!courseId) {
// // // // //       throw new Error("Course ID not found. Create course first.");
// // // // //     }

// // // // //     try {
// // // // //       set({ loading: true, error: null });
// // // // //       const res = await updateCourseApi(courseId, payload);
// // // // //       return res;
// // // // //     } catch (error) {
// // // // //       set({ error });
// // // // //       throw error;
// // // // //     } finally {
// // // // //       set({ loading: false });
// // // // //     }
// // // // //   },

// // // // //   resetCourse: () => set({ courseId: null, error: null }),
// // // // // }));

// // // // // export default useCourseStore;


// // // // import { create } from "zustand";
// // // // import {
// // // //   createCourseApi,
// // // //   updateCourseApi,
// // // //   getAllCourses,
// // // //   deleteCourseApi,
// // // // } from "@/services/coursesApi";

// // // // const useCourseStore = create((set, get) => ({
// // // //   loading: false,
// // // //   error: null,
// // // //   courseId: null,
// // // //   courses: [],

// // // //   /* ================= FETCH COURSES ================= */
// // // //   fetchCourses: async () => {
// // // //     try {
// // // //       set({ loading: true, error: null });

// // // //       const res = await getAllCourses();
// // // //       set({ courses: res.data || res });

// // // //     } catch (error) {
// // // //       set({ error });
// // // //     } finally {
// // // //       set({ loading: false });
// // // //     }
// // // //   },

// // // //   /* ================= CREATE COURSE ================= */
// // // //   createCourse: async (payload) => {
// // // //     try {
// // // //       set({ loading: true, error: null });

// // // //       const res = await createCourseApi(payload);
// // // //       const courseId = res.data?.id || res.id;

// // // //       set({ courseId });

// // // //       // Refresh list
// // // //       await get().fetchCourses();

// // // //       return courseId;
// // // //     } catch (error) {
// // // //       set({ error });
// // // //       throw error;
// // // //     } finally {
// // // //       set({ loading: false });
// // // //     }
// // // //   },

// // // //   /* ================= UPDATE COURSE ================= */
// // // //   updateCourse: async (payload) => {
// // // //     const courseId = get().courseId;

// // // //     if (!courseId) {
// // // //       throw new Error("Course ID not found. Create course first.");
// // // //     }

// // // //     try {
// // // //       set({ loading: true, error: null });

// // // //       await updateCourseApi(courseId, payload);

// // // //       await get().fetchCourses();

// // // //     } catch (error) {
// // // //       set({ error });
// // // //       throw error;
// // // //     } finally {
// // // //       set({ loading: false });
// // // //     }
// // // //   },

// // // //   /* ================= DELETE COURSE ================= */
// // // //   deleteCourse: async (courseId) => {
// // // //     try {
// // // //       set({ loading: true, error: null });

// // // //       await deleteCourseApi(courseId);

// // // //       await get().fetchCourses();

// // // //     } catch (error) {
// // // //       set({ error });
// // // //     } finally {
// // // //       set({ loading: false });
// // // //     }
// // // //   },

// // // //   setCourseId: (id) => set({ courseId: id }),

// // // //   resetCourse: () => set({ courseId: null, error: null }),
// // // // }));

// // // // export default useCourseStore;


// // // import { create } from "zustand";
// // // import {
// // //   createCourseApi,
// // //   updateCourseApi,
// // //   getAllCourses,
// // //   deleteCourseApi,
// // //   togglePopularApi,
// // // } from "@/services/coursesApi";

// // // const useCourseStore = create((set, get) => ({
// // //   loading: false,
// // //   error: null,
// // //   courseId: null,
// // //   courses: [],

// // //   /* ================= FETCH COURSES ================= */
// // //   fetchCourses: async () => {
// // //     try {
// // //       set({ loading: true, error: null });

// // //       const res = await getAllCourses();
// // //       set({ courses: res.data || res });

// // //     } catch (error) {
// // //       set({ error });
// // //     } finally {
// // //       set({ loading: false });
// // //     }
// // //   },

// // //   /* ================= CREATE COURSE ================= */
// // //   createCourse: async (payload) => {
// // //     try {
// // //       set({ loading: true, error: null });

// // //       const res = await createCourseApi(payload);
// // //       const courseId = res.data?.id || res.id;

// // //       set({ courseId });

// // //       await get().fetchCourses();
// // //       return courseId;

// // //     } catch (error) {
// // //       set({ error });
// // //       throw error;
// // //     } finally {
// // //       set({ loading: false });
// // //     }
// // //   },

// // //   /* ================= UPDATE COURSE ================= */
// // //   updateCourse: async (payload) => {
// // //     const courseId = get().courseId;

// // //     if (!courseId) {
// // //       throw new Error("Course ID not found. Create course first.");
// // //     }

// // //     try {
// // //       set({ loading: true, error: null });

// // //       await updateCourseApi(courseId, payload);
// // //       await get().fetchCourses();

// // //     } catch (error) {
// // //       set({ error });
// // //       throw error;
// // //     } finally {
// // //       set({ loading: false });
// // //     }
// // //   },

// // //   /* ================= DELETE COURSE ================= */
// // //   deleteCourse: async (courseId) => {
// // //     try {
// // //       set({ loading: true, error: null });

// // //       await deleteCourseApi(courseId);
// // //       await get().fetchCourses();

// // //     } catch (error) {
// // //       set({ error });
// // //     } finally {
// // //       set({ loading: false });
// // //     }
// // //   },

// // //  togglePopular: async (courseId, currentValue) => {
// // //     try {
// // //       set({ loading: true, error: null });

// // //       const newValue = !currentValue;

// // //       await togglePopularApi(courseId, newValue);

// // //       // Update locally (no refetch needed)
// // //       set((state) => ({
// // //         courses: state.courses.map((course) =>
// // //           course.id === courseId
// // //             ? { ...course, isPopular: newValue }
// // //             : course
// // //         ),
// // //       }));

// // //     } catch (error) {
// // //       set({ error });
// // //     } finally {
// // //       set({ loading: false });
// // //     }
// // //   },

// // //   /* ================= SET COURSE ID ================= */
// // //   setCourseId: (id) => set({ courseId: id }),

// // //   /* ================= RESET ================= */
// // //   resetCourse: () => set({ courseId: null, error: null }),
// // // }));

// // // export default useCourseStore;
// // import { create } from "zustand";
// // import {
// //   createCourseApi,
// //   updateCourseApi,
// //   getAllCourses,
// //   deleteCourseApi,
// //   togglePopularApi,
// // } from "@/services/coursesApi";

// // const useCourseStore = create((set, get) => ({
// //   loading: false,
// //   error: null,
// //   courseId: null,
// //   courses: [],

// //   /* ================= FETCH COURSES ================= */
// //   fetchCourses: async () => {
// //     try {
// //       set({ loading: true, error: null });

// //       const res = await getAllCourses();
// //       set({ courses: res.data || res });

// //     } catch (error) {
// //       set({ error });
// //     } finally {
// //       set({ loading: false });
// //     }
// //   },

// //   /* ================= CREATE COURSE ================= */
// //   createCourse: async (payload) => {
// //     try {
// //       set({ loading: true, error: null });

// //       const res = await createCourseApi(payload);
// //       const courseId = res.data?.id || res.id;

// //       set({ courseId });

// //       await get().fetchCourses();
// //       return courseId;

// //     } catch (error) {
// //       set({ error });
// //       throw error;
// //     } finally {
// //       set({ loading: false });
// //     }
// //   },

// //   /* ================= UPDATE COURSE ================= */
// //   updateCourse: async (payload) => {
// //     const courseId = get().courseId;

// //     if (!courseId) {
// //       throw new Error("Course ID not found.");
// //     }

// //     try {
// //       set({ loading: true, error: null });

// //       await updateCourseApi(courseId, payload);
// //       await get().fetchCourses();

// //     } catch (error) {
// //       set({ error });
// //       throw error;
// //     } finally {
// //       set({ loading: false });
// //     }
// //   },

// //   // /* ================= DELETE COURSE ================= */
// //   // deleteCourse: async (courseId) => {
// //   //   try {
// //   //     set({ loading: true, error: null });

// //   //     await deleteCourseApi(courseId);
// //   //     await get().fetchCourses();

// //   //   } catch (error) {
// //   //     set({ error });
// //   //   } finally {
// //   //     set({ loading: false });
// //   //   }
// //   // },

// //   deleteCourse: async (courseId) => {
// //   try {
// //     set({ loading: true, error: null });

// //     await deleteCourseApi(courseId);

// //     // Remove locally (no need refetch)
// //     set((state) => ({
// //       courses: state.courses.filter(
// //         (course) => course.id !== courseId
// //       ),
// //     }));

// //   } catch (error) {
// //     set({ error });
// //   } finally {
// //     set({ loading: false });
// //   }
// // },


// //   /* ================= TOGGLE POPULAR ================= */
// //   togglePopular: async (courseId, currentValue) => {
// //     const newValue = !currentValue;

// //     // 🔥 Optimistic UI update (instant switch)
// //     set((state) => ({
// //       courses: state.courses.map((course) =>
// //         course.id === courseId
// //           ? { ...course, isPopular: newValue }
// //           : course
// //       ),
// //     }));

// //     try {
// //       await togglePopularApi(courseId, newValue);
// //     } catch (error) {
// //       console.error("Toggle failed:", error);

// //       // ❌ Revert if API fails
// //       set((state) => ({
// //         courses: state.courses.map((course) =>
// //           course.id === courseId
// //             ? { ...course, isPopular: currentValue }
// //             : course
// //         ),
// //       }));
// //     }
// //   },

// //   /* ================= SET COURSE ID ================= */
// //   setCourseId: (id) => set({ courseId: id }),

// //   /* ================= RESET ================= */
// //   resetCourse: () => set({ courseId: null, error: null }),
// // }));

// // export default useCourseStore;


// import { create } from "zustand";
// import { persist } from "zustand/middleware";
// import {
//   createCourseApi,
//   updateCourseApi,
//   getAllCourses,
//   deleteCourseApi,
//   togglePopularApi,
// } from "@/services/coursesApi";

// const useCourseStore = create(
//   persist(
//     (set, get) => ({
//       loading: false,
//       error: null,
//       courseId: null,
//       courses: [],

//       /* ================= LAST EDITED ROUTES ================= */
//       lastEditedRoutes: {},

//       setLastEditedRoute: (courseId, route) =>
//         set((state) => ({
//           lastEditedRoutes: {
//             ...state.lastEditedRoutes,
//             [courseId]: route,
//           },
//         })),

//       /* ================= FETCH COURSES ================= */
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

//       /* ================= CREATE COURSE ================= */
//       createCourse: async (payload) => {
//         try {
//           set({ loading: true, error: null });

//           const res = await createCourseApi(payload);
//           const courseId = res.data?.id || res.id;

//           set({ courseId });

//           await get().fetchCourses();
//           return courseId;
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

//         if (!courseId) {
//           throw new Error("Course ID not found.");
//         }

//         try {
//           set({ loading: true, error: null });
//           await updateCourseApi(courseId, payload);
//           await get().fetchCourses();
//         } catch (error) {
//           set({ error });
//           throw error;
//         } finally {
//           set({ loading: false });
//         }
//       },

//       /* ================= DELETE COURSE ================= */
//       deleteCourse: async (courseId) => {
//         try {
//           set({ loading: true, error: null });

//           await deleteCourseApi(courseId);

//           set((state) => ({
//             courses: state.courses.filter(
//               (course) => course.id !== courseId
//             ),
//           }));
//         } catch (error) {
//           set({ error });
//         } finally {
//           set({ loading: false });
//         }
//       },

//       /* ================= TOGGLE POPULAR ================= */
//       togglePopular: async (courseId, currentValue) => {
//         try {
//           const newValue = !currentValue;

//           await togglePopularApi(courseId, newValue);

//           set((state) => ({
//             courses: state.courses.map((course) =>
//               course.id === courseId
//                 ? { ...course, isPopular: newValue }
//                 : course
//             ),
//           }));
//         } catch (error) {
//           set({ error });
//         }
//       },

//       setCourseId: (id) => set({ courseId: id }),

//       resetCourse: () => set({ courseId: null, error: null }),
//     }),
//     {
//       name: "course-storage",
//     }
//   )
// );

// export default useCourseStore;


import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  createCourseApi,
  updateCourseApi,
  getAllCourses,
  deleteCourseApi,
  togglePopularApi,
} from "@/services/coursesApi";

const useCourseStore = create(
  persist(
    (set, get) => ({
      loading: false,
      error: null,
      courseId: null,
      courses: [],

      /* ================= LAST EDITED ROUTES ================= */
      lastEditedRoutes: {},

      setLastEditedRoute: (courseId, route) =>
        set((state) => ({
          lastEditedRoutes: {
            ...state.lastEditedRoutes,
            [courseId]: route,
          },
        })),

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
          throw new Error("Course ID not found.");
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

          set((state) => ({
            courses: state.courses.filter(
              (course) => course.id !== courseId
            ),
          }));
        } catch (error) {
          set({ error });
        } finally {
          set({ loading: false });
        }
      },

      /* ================= TOGGLE POPULAR ================= */
      togglePopular: async (courseId, currentValue) => {
        try {
          const newValue = !currentValue;

          await togglePopularApi(courseId, newValue);

          set((state) => ({
            courses: state.courses.map((course) =>
              course.id === courseId
                ? { ...course, isPopular: newValue }
                : course
            ),
          }));
        } catch (error) {
          set({ error });
        }
      },

      setCourseId: (id) => set({ courseId: id }),

      resetCourse: () => set({ courseId: null, error: null }),
    }),
    {
      name: "course-storage",
    }
  )
);

export default useCourseStore;
