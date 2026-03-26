import { create } from "zustand";
import { initiateVideoUpload } from "@/services/video.service";
import { uploadToVimeo } from "@/utils/vimeoUpload";
import {
  createLesson,
  updateLesson,
  deleteLesson,
} from "@/services/lesson.service";

const useLessonStore = create((set) => ({
  loading: false,
  progress: 0,

  uploadLessonVideo: async (file) => {
    try {
      set({ loading: true, progress: 0 });


      /* 1️⃣ Initiate Vimeo upload */
      const { uploadUrl, videoAssetId } = await initiateVideoUpload({
        purpose: "LESSON",
        size: file.size,
      });

      /* 2️⃣ Upload video */
      await uploadToVimeo(uploadUrl, file, (p) =>
        set({ progress: p })
      );
      return { videoAssetId };
    } catch (err) {
      console.error("Video upload failed:", err);
      throw err;
    } finally{
      set({ loading:false});
    }
  },

      /* 3️⃣ Create lesson (API) */
createLessonAction: async (payload) => {
  return await createLesson(payload);
},
  replaceLessonVideo: async (lessonId, file) => {
    const { uploadUrl, videoAssetId } = await initiateVideoUpload({
      purpose: "LESSON",
      size: file.size,
    });

    await uploadToVimeo(uploadUrl, file);

    await updateLesson(lessonId, { videoAssetId });
  },

  updateLessonDetails: async (lessonId, payload) => {
    return await updateLesson(lessonId, payload);
  },

  removeLesson: async (lessonId) => {
    await deleteLesson(lessonId);
  },
}));

export default useLessonStore;






