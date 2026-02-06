
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

  uploadLessonVideo: async (file, sectionId, payload) => {
    try {
      set({ loading: true, progress: 0 });

      if (!sectionId) {
        throw new Error("Section ID missing");
      }

      /* 1️⃣ Initiate Vimeo upload */
      const { uploadUrl, videoAssetId } = await initiateVideoUpload({
        purpose: "LESSON",
        size: file.size,
      });

      /* 2️⃣ Upload video */
      await uploadToVimeo(uploadUrl, file, (p) =>
        set({ progress: p })
      );

      /* 3️⃣ Create lesson (API) */
      await createLesson({
        sectionId,
        videoAssetId,
        title: payload.title,
        description: payload.description,
        thumbnail: payload.thumbnail,
        duration: payload.duration,
        order: payload.order ?? 0, // 🔥 REQUIRED
        isFree: payload.isFree,
      });

    } catch (err) {
      console.error("Lesson creation failed:", err);
      throw err;
    } finally {
      set({ loading: false });
    }
  },

  replaceLessonVideo: async (lessonId, file) => {
    const { uploadUrl, videoAssetId } = await initiateVideoUpload({
      purpose: "LESSON",
      size: file.size,
    });

    await uploadToVimeo(uploadUrl, file);

    await updateLesson(lessonId, { videoAssetId });
  },

  removeLesson: async (lessonId) => {
    await deleteLesson(lessonId);
  },
}));

export default useLessonStore;
