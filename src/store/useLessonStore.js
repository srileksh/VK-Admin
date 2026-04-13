// import { create } from "zustand";
// import { initiateVideoUpload } from "@/services/video.service";
// import { uploadToVimeo } from "@/utils/vimeoUpload";
// import {
//   createLesson,
//   updateLesson,
//   deleteLesson,
// } from "@/services/lesson.service";

// const useLessonStore = create((set) => ({
//   loading: false,
//   progress: 0,

//   uploadLessonVideo: async (file) => {
//     try {
//       set({ loading: true, progress: 0 });


//       /* 1️⃣ Initiate Vimeo upload */
//       const { uploadUrl, videoAssetId } = await initiateVideoUpload({
//         purpose: "LESSON",
//         size: file.size,
//       });

//       /* 2️⃣ Upload video */
//       await uploadToVimeo(uploadUrl, file, (p) =>
//         set({ progress: p })
//       );
//       return { videoAssetId };
//     } catch (err) {
//       console.error("Video upload failed:", err);
//       throw err;
//     } finally{
//       set({ loading:false});
//     }
//   },

//       /* 3️⃣ Create lesson (API) */
// createLessonAction: async (payload) => {
//   return await createLesson(payload);
// },
//   replaceLessonVideo: async (lessonId, file) => {
//     const { uploadUrl, videoAssetId } = await initiateVideoUpload({
//       purpose: "LESSON",
//       size: file.size,
//     });

//     await uploadToVimeo(uploadUrl, file);

//     await updateLesson(lessonId, { videoAssetId });
//   },

//   updateLessonDetails: async (lessonId, payload) => {
//     return await updateLesson(lessonId, payload);
//   },

//   removeLesson: async (lessonId) => {
//     await deleteLesson(lessonId);
//   },
// }));

// export default useLessonStore;


import { create } from "zustand";
import { initiateVideoUpload } from "@/services/video.service";
import { uploadToVimeo } from "@/utils/vimeoUpload";
import {
  createLesson,
  getLessonById,
  updateLesson,
  deleteLesson,
} from "@/services/lesson.service";

const useLessonStore = create((set) => ({
  loading: false,
  progress: 0,
  error: null,

  uploadLessonVideo: async (file) => {
    try {
      set({ loading: true, progress: 0, error: null });

      const { uploadUrl, videoAssetId } = await initiateVideoUpload({
        purpose: "LESSON",
        size: file.size,
      });

      await uploadToVimeo(uploadUrl, file, (p) => set({ progress: p }));

      return { videoAssetId };
    } catch (err) {
      console.error("Video upload failed:", err);
      set({ error: err?.response?.data?.message || "Video upload failed" });
      throw err;
    } finally {
      set({ loading: false });
    }
  },

  createLessonAction: async (payload) => {
    try {
      set({ loading: true, error: null });
      return await createLesson(payload);
    } catch (err) {
      set({ error: err?.response?.data?.message || "Lesson create failed" });
      throw err;
    } finally {
      set({ loading: false });
    }
  },

  getLessonByIdAction: async (lessonId) => {
    try {
      set({ loading: true, error: null });
      return await getLessonById(lessonId);
    } catch (err) {
      set({ error: err?.response?.data?.message || "Lesson fetch failed" });
      throw err;
    } finally {
      set({ loading: false });
    }
  },

  // updateLessonAction: async (lessonId, payload) => {
  //   try {
  //     set({ loading: true, error: null });
  //     return await updateLesson(lessonId, payload);
  //   } catch (err) {
  //     set({ error: err?.response?.data?.message || "Lesson update failed" });
  //     throw err;
  //   } finally {
  //     set({ loading: false });
  //   }
  // },

  updateLessonAction: async (lessonId, payload) => {
  try {
    set({ loading: true, error: null });
    return await updateLesson(lessonId, payload);
  } catch (err) {
    set({ error: err?.response?.data?.message || "Lesson update failed" });
    throw err;
  } finally {
    set({ loading: false });
  }
},

  replaceLessonVideo: async (lessonId, file) => {
    try {
      set({ loading: true, error: null });

      const { uploadUrl, videoAssetId } = await initiateVideoUpload({
        purpose: "LESSON",
        size: file.size,
      });

      await uploadToVimeo(uploadUrl, file);
      await updateLesson(lessonId, { videoAssetId });

      return { videoAssetId };
    } catch (err) {
      set({ error: err?.response?.data?.message || "Replace video failed" });
      throw err;
    } finally {
      set({ loading: false });
    }
  },

  updateLessonDetails: async (lessonId, payload) => {
    try {
      set({ loading: true, error: null });
      return await updateLesson(lessonId, payload);
    } catch (err) {
      set({ error: err?.response?.data?.message || "Lesson update failed" });
      throw err;
    } finally {
      set({ loading: false });
    }
  },

  /* PUT /lessons/:lessonId — used by LessonItem on edit */
  // updateLessonAction: async (lessonId, payload) => {
  //   return await updateLesson(lessonId, payload);
  // },

  // /* PUT /lessons/:lessonId — used by LessonItem on edit */
  // updateLessonAction: async (lessonId, payload) => {
  //   return await updateLesson(lessonId, payload);
  // },

  /* GET /lessons/:lessonId */
  getLessonAction: async (lessonId) => {
    return await getLessonById(lessonId);
  },

  removeLesson: async (lessonId) => {
    try {
      set({ loading: true, error: null });
      await deleteLesson(lessonId);
    } catch (err) {
      set({ error: err?.response?.data?.message || "Lesson delete failed" });
      throw err;
    } finally {
      set({ loading: false });
    }
  },
}));

export default useLessonStore;





