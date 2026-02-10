"use client";
import { useRef, useState } from "react";
import { FaCircleMinus, FaPen } from "react-icons/fa6";
import { GoPlus } from "react-icons/go";
import { TbZoomReplace } from "react-icons/tb";
import { HiMiniMinus } from "react-icons/hi2";
import useLessonStore from "@/store/useLessonStore";
import { uploadImageToCloudinary } from "@/utils/cloudinaryImageUpload";

export default function LessonSection({ sectionId,title }) {
  const [lessons, setLessons] = useState([
    {
      id: Date.now(),
      isOpen: true,
      lessonTitle: "",
      description: "",
      videoName: "",
      videoFile: null,
      thumbnailUrl: "",
      isSaved: false,
      saving: false,
    },
  ]);

  const fileRefs = useRef({});
  const thumbnailRefs = useRef({});

  const {
    uploadLessonVideo,
    replaceLessonVideo,
    removeLesson,
    loading,
    progress,
  } = useLessonStore();

  /* ✅ CLOSE ALL & ADD NEW */
  const handleAddLesson = () => {
    setLessons((prev) => {
      const closedLessons = prev.map((lesson) => ({
        ...lesson,
        isOpen: false,
      }));

      return [
        ...closedLessons,
        {
          id: Date.now(),
          isOpen: true,
          lessonTitle: "",
          description: "",
          videoName: "",
          videoFile: null,
          thumbnailUrl: "",
          isSaved: false,
          saving: false,
        },
      ];
    });
  };

  const handleUpdateLesson = (id, key, value) => {
    setLessons((prev) =>
      prev.map((l) =>
        l.id === id ? { ...l, [key]: value } : l
      )
    );
  };

  const handleVideoSelect = async (lesson, file) => {
    if (!file || !sectionId) return;

    handleUpdateLesson(lesson.id, "videoFile", file);
    handleUpdateLesson(lesson.id, "videoName", file.name);

    await uploadLessonVideo(file, sectionId, {
      title: lesson.lessonTitle || "Lesson video",
      description: lesson.description,
      thumbnail: lesson.thumbnailUrl,
      duration: 300,
      order: 0,
      isFree: false,
    });
  };

  const handleThumbnailUpload = async (lesson, file) => {
    if (!file) return;
    const url = await uploadImageToCloudinary(file);
    handleUpdateLesson(lesson.id, "thumbnailUrl", url);
  };

  /* ✅ SAVE WITH STATUS */
  const handleSave = async (lesson) => {
    try {
      handleUpdateLesson(lesson.id, "saving", true);
      handleUpdateLesson(lesson.id, "isSaved", false);

      // 👉 Replace with real API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      handleUpdateLesson(lesson.id, "isSaved", true);
    } catch (error) {
      console.error("Save failed", error);
    } finally {
      handleUpdateLesson(lesson.id, "saving", false);
    }
  };

  const handleEdit = (lesson) => {
    handleUpdateLesson(lesson.id, "isSaved", false);
  };

  return (
    <>
      {lessons.map((lesson, index) => (
        <div
          key={lesson.id}
          className="border border-gray-100 shadow-md rounded-lg p-4 sm:p-5 mb-4"
        >
          {/* Header */}
          <div className="flex justify-between items-center border-b pb-2 mb-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">
                {title}
              </span>
              <FaPen className="text-gray-400" />
            </div>

            <button
              onClick={() =>
                handleUpdateLesson(
                  lesson.id,
                  "isOpen",
                  !lesson.isOpen
                )
              }
              className="text-[26px] text-gray-400"
            >
              {lesson.isOpen ? <FaCircleMinus /> : <GoPlus />}
            </button>
          </div>

          {lesson.isOpen && (
            <>
              <label className="text-sm block mb-3">
                Video title
              </label>

              <div className="flex flex-col lg:flex-row gap-6">
                {/* LEFT */}
                <div className="flex-1">
                  <div className="flex gap-4 mb-4">
                    <input
                      disabled={lesson.isSaved}
                      className="border px-4 py-2 rounded-lg w-[250px]"
                      placeholder="Title"
                      value={lesson.lessonTitle}
                      onChange={(e) =>
                        handleUpdateLesson(
                          lesson.id,
                          "lessonTitle",
                          e.target.value
                        )
                      }
                    />

                    <input
                      disabled={lesson.isSaved}
                      className="border px-4 py-2 rounded-lg flex-1"
                      placeholder="Description"
                      value={lesson.description}
                      onChange={(e) =>
                        handleUpdateLesson(
                          lesson.id,
                          "description",
                          e.target.value
                        )
                      }
                    />
                  </div>

                  <div className="flex gap-6">
                    {/* Upload */}
                    <div className="flex gap-3">
                      <div className="w-24 h-20 border flex items-center justify-center text-xs">
                        {lesson.videoFile ? "Video" : "No Video"}
                      </div>

                      <div>
                        <p className="text-sm truncate max-w-[180px]">
                          {lesson.videoName || "Lesson-video.mp4"}
                        </p>

                        <button
                          onClick={() =>
                            fileRefs.current[lesson.id].click()
                          }
                          className="flex items-center gap-1 text-sm mt-4"
                          disabled={loading || lesson.isSaved}
                        >
                          <GoPlus /> Upload Video
                        </button>

                        <input
                          ref={(el) =>
                            (fileRefs.current[lesson.id] = el)
                          }
                          type="file"
                          hidden
                          accept="video/*"
                          onChange={(e) =>
                            handleVideoSelect(
                              lesson,
                              e.target.files[0]
                            )
                          }
                        />
                      </div>
                    </div>

                    {/* Status */}
                    <div className="flex-1 text-sm">
                      <p className="mb-1">Upload status</p>

                      <div className="relative w-full h-6">
                        <div className="absolute w-full h-[2px] bg-gray-300 top-1/2" />
                        <div
                          className="absolute h-[2px] bg-green-400 top-1/2"
                          style={{ width: `${progress}%` }}
                        />
                      </div>

                      <div className="flex justify-between mt-2">
                        <button className="flex items-center gap-1">
                          <TbZoomReplace /> Replace
                        </button>
                        <button className="flex items-center gap-1">
                          <HiMiniMinus /> Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Thumbnail */}
                <div className="flex flex-col items-center">
                  <div
                    onClick={() =>
                      !lesson.isSaved &&
                      thumbnailRefs.current[lesson.id].click()
                    }
                    className="w-40 h-28 bg-gray-300 rounded flex items-center justify-center cursor-pointer overflow-hidden"
                  >
                    {lesson.thumbnailUrl ? (
                      <img
                        src={lesson.thumbnailUrl}
                        className="w-full h-full object-cover"
                        alt="thumb"
                      />
                    ) : (
                      "Add thumbnail"
                    )}
                  </div>

                  <input
                    ref={(el) =>
                      (thumbnailRefs.current[lesson.id] = el)
                    }
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={(e) =>
                      handleThumbnailUpload(
                        lesson,
                        e.target.files[0]
                      )
                    }
                  />
                </div>
              </div>
            </>
          )}

          {/* ACTION BUTTONS */}
          {lesson.isOpen && (
            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => handleEdit(lesson)}
                disabled={!lesson.isSaved}
                className="flex items-center px-5 py-2 border-2 border-[#1F304A] rounded-xl text-sm disabled:opacity-50"
              >
                <FaPen /> Edit
              </button>

              <button
                onClick={() => handleSave(lesson)}
                disabled={lesson.saving || lesson.isSaved}
                className="px-8 py-2 bg-[#1F304A] text-white rounded-xl disabled:opacity-60"
              >
                {lesson.saving
                  ? "Saving..."
                  : lesson.isSaved
                  ? "Saved"
                  : "Save"}
              </button>
            </div>
          )}
        </div>
      ))}

      {/* ADD NEW VIDEO */}
      <div className="flex justify-center mt-6">
        <button
          onClick={handleAddLesson}
          className="text-[#CCCBCB] text-[18px] font-semibold border-b-2"
        >
          + Add new video
        </button>
      </div>
      
    </>
  );
}
