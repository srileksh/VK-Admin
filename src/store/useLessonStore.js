import { create } from "zustand";
import { initiateVideoUpload } from "@/services/video.service";
import {
  createLesson,
  updateLesson,
  deleteLesson,
  reorderLessons,
} from "@/services/lesson.service";
import { uploadToVimeo } from "@/utils/vimeoUpload";

const useLessonStore = create((set) => ({
  loading: false,

  // ✅ Upload + create lesson
  uploadLessonVideo: async (file, sectionId, meta) => {
    set({ loading: true });

    const { uploadUrl, videoAssetId, provider } =
      await initiateVideoUpload("LESSON");

    await uploadToVimeo(uploadUrl, file);

    await createLesson({
      sectionId,
      videoAssetId,
      videoProvider: provider,
      ...meta,
    });

    set({ loading: false });
  },

  // 🔁 Replace lesson video
  replaceLessonVideo: async (lessonId, file) => {
    set({ loading: true });

    const { uploadUrl, videoAssetId, provider } =
      await initiateVideoUpload("LESSON");

    await uploadToVimeo(uploadUrl, file);

    await updateLesson(lessonId, {
      videoAssetId,
      videoProvider: provider,
    });

    set({ loading: false });
  },

  // ❌ Remove lesson
  removeLesson: async (lessonId) => {
    await deleteLesson(lessonId);
  },

  // 🔀 Reorder lessons
  reorderLessons: async (sectionId, lessons) => {
    await reorderLessons({
      sectionId,
      lessons,
    });
  },
}));

export default useLessonStore;
