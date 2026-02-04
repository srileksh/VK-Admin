"use client";
import { useRef, useState } from "react";
import { FaCircleMinus } from "react-icons/fa6";
import { FaPen } from "react-icons/fa";
import { GoPlus } from "react-icons/go";
import { TbZoomReplace } from "react-icons/tb";
import { HiMiniMinus } from "react-icons/hi2";
import useLessonStore from "@/store/useLessonStore";

export default function LessonSection({ title, sectionId }) {
  const [isOpen, setIsOpen] = useState(true);
  const fileRef = useRef(null);

  const {
    uploadLessonVideo,
    replaceLessonVideo,
    removeLesson,
    loading,
  } = useLessonStore();

  const lessonId = "temp-lesson-id";

  return (
    <div className="border border-gray-100 shadow-md rounded-lg p-4 sm:p-5 mb-4">
      {/* Header */}
      <div className="flex justify-between items-center border-b pb-2 mb-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">{title}</span>
          <button className="text-[16px] text-gray-400 hover:text-gray-700">
            <FaPen />
          </button>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-[26px] text-gray-400 hover:text-gray-700"
        >
          {isOpen ? <FaCircleMinus /> : <GoPlus />}
        </button>
      </div>

      {isOpen && (
        <>
          <label className="text-sm text-gray-700 block mb-3">
            Video title
          </label>

          {/* Main layout */}
          <div className="flex flex-col lg:flex-row gap-6 mb-4">
            {/* LEFT */}
            <div className="flex-1">
              {/* Inputs */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-4">
                <input
                  placeholder="Title of the video"
                  className="border rounded-lg px-4 py-2 w-full sm:w-[250px]"
                />
                <input
                  placeholder="Short description"
                  className="border rounded-lg px-4 py-2 w-full"
                />
              </div>

              {/* Upload + Status */}
              <div className="flex flex-col md:flex-row gap-6 items-start">
                {/* Upload */}
                <div className="flex gap-3 items-start">
                  <div className="w-24 h-20 border rounded flex items-center justify-center text-xs text-gray-400 shrink-0">
                    No Video
                  </div>

                  <div>
                    <p className="text-sm truncate max-w-[160px]">
                      lesson-video.mp4
                    </p>

                    <button
                      onClick={() => fileRef.current.click()}
                      className="flex items-center gap-1 text-sm mt-4"
                    >
                      <GoPlus /> Upload Video
                    </button>

                    <input
                      ref={fileRef}
                      type="file"
                      hidden
                      onChange={(e) =>
                        uploadLessonVideo(
                          e.target.files[0],
                          sectionId,
                          {
                            title: "Lesson video",
                            description: "Short description",
                            thumbnail: "",
                            duration: 300,
                            order: 0,
                            isFree: false,
                          }
                        )
                      }
                    />
                  </div>
                </div>

                {/* Status */}
                <div className="flex-1 w-full text-sm text-gray-600">
                  <p className="mb-2">Upload status</p>

                  <div className="relative w-full h-6">
                    <div className="absolute w-full h-[2px] bg-gray-300 top-1/2" />
                    <div className="absolute h-[2px] bg-green-400 w-[40%] top-1/2" />
                  </div>

                  <div className="flex flex-wrap gap-4 justify-between mt-4 text-gray-800">
                    <button
                      onClick={() =>
                        replaceLessonVideo(
                          lessonId,
                          fileRef.current?.files?.[0]
                        )
                      }
                      className="flex items-center gap-1 text-sm"
                    >
                      <TbZoomReplace /> Replace Video
                    </button>

                    <button
                      onClick={() => removeLesson(lessonId)}
                      className="flex items-center gap-1 text-sm"
                    >
                      <HiMiniMinus /> Remove Video
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* THUMBNAIL */}
            <div className="flex flex-col items-start lg:items-center">
              <div className="w-32 sm:w-36 lg:w-40 h-24 lg:h-28 bg-gray-300 rounded-lg flex items-center justify-center text-xs">
                Add thumbnail
              </div>
              <p className="text-[10px] text-center mt-1">
                Resolution - X - Px
              </p>
            </div>
          </div>

          {/* Add video */}
          <div className="flex justify-center text-gray-600">
            <button className="flex items-center gap-1">
              <GoPlus /> Add new video
            </button>
          </div>
        </>
      )}
    </div>
  );
}
