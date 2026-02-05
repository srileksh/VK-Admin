"use client";
import { useRef, useState } from "react";
import { FaCircleMinus, FaPen } from "react-icons/fa6";
import { GoPlus } from "react-icons/go";
import { TbZoomReplace } from "react-icons/tb";
import { HiMiniMinus } from "react-icons/hi2";
import useLessonStore from "@/store/useLessonStore";
import { uploadImageToCloudinary } from "@/utils/cloudinaryImageUpload";

export default function LessonSection({ title, sectionId }) {
  const [isOpen, setIsOpen] = useState(true);

  const [videoName, setVideoName] = useState("");
  const [lessonTitle, setLessonTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [toastType, setToastType] = useState("error"); // error | success
  const [toastMsg, setToastMsg] = useState("");

  const fileRef = useRef(null);
  const thumbnailRef = useRef(null);

  const {
    uploadLessonVideo,
    replaceLessonVideo,
    removeLesson,
    loading,
    progress,
  } = useLessonStore();

  const lessonId = "temp-lesson-id";

  const handleVideoSelect = async (file) => {
    if (!file || !sectionId) return;

    setVideoFile(file);
    setVideoName(file.name);

    await uploadLessonVideo(file, sectionId, {
      title: lessonTitle || "Lesson video",
      description,
      thumbnail: thumbnailUrl,
      duration: 300,
      order: 0,
      isFree: false,
    });
  };

  const handleThumbnailUpload = async (file) => {
    if (!file) return;
    try {
      const url = await uploadImageToCloudinary(file);
      setThumbnailUrl(url);
    } catch (err) {
      console.error(err);
      alert("Thumbnail upload failed");
    }
  };

  const handleSaveLesson = () => {
    if (!lessonTitle) {
      alert("Upload video and add title");
      return;
    }
    alert("Lesson saved");
  };

  const handleEditLesson = () => {
    setIsSaved(false);
    setToastType("success");
    setToastMsg("Edit mode enabled")
    
  };

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
        <div>
          <label className="text-sm block mb-3">Video title</label>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* LEFT */}
            <div className="flex-1">
              <div className="flex gap-4 mb-4">
                <input
                  className="border px-4 py-2 rounded-lg w-[250px]"
                  placeholder="Title"
                  value={lessonTitle}
                  onChange={(e) => setLessonTitle(e.target.value)}
                />
                <input
                  className="border px-4 py-2 rounded-lg flex-1"
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="flex gap-6">
                {/* Upload */}
                <div className="flex gap-3">
                  <div className="w-24 h-20 border flex items-center justify-center text-xs">
                    {videoFile ? "Video" : "No Video"}
                  </div>

                  <div>
                    <p className="text-sm truncate max-w-[180px]">
                      {videoName || "Lesson-video.mp4"}
                    </p>

                    <button
                      onClick={() => fileRef.current.click()}
                      className="flex items-center gap-1 text-sm mt-4 disabled:opacity-50"
                      disabled={loading}
                    >
                      <GoPlus /> Upload Video
                    </button>

                    <input
                      ref={fileRef}
                      type="file"
                      hidden
                      accept="video/*"
                      onChange={(e) =>
                        handleVideoSelect(e.target.files[0])
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
                      className="absolute h-[2px] bg-green-400 top-1/2 transition-all"
                      style={{ width: `${progress}%` }}
                    />
                  </div>

                  <div className="flex justify-between mt-2 text-gray-800">
                    <button
                      className="flex items-center gap-[5px]"
                      onClick={() =>
                        replaceLessonVideo(
                          lessonId,
                          fileRef.current?.files?.[0]
                        )
                      }
                      disabled={!videoFile || loading}
                    >
                      <TbZoomReplace /> Replace Video
                    </button>

                    <button
                      onClick={() => removeLesson(lessonId)}
                      className="flex items-center gap-[5px]"
                      disabled={loading}
                    >
                      <HiMiniMinus /> Remove Video
                    </button>
                  </div>
                </div>
              </div>

              {/* Save + Edit Buttons */}
              <div className="mt-6 flex gap-3">
                <button
                  onClick={handleSaveLesson}
                  className="px-6 py-2 bg-black text-white rounded"
                  disabled={loading}
                >
                  Save
                </button>

                <button
                  onClick={handleEditLesson}
                  className="flex items-center px-5 py-2 border-2 border-[#1F304A] rounded-xl text-sm disabled:opacity-50"
                >
                  <FaPen /> Edit
                </button>
              </div>
            </div>

            {/* Thumbnail */}
            <div className="flex flex-col items-center">
              <div
                onClick={() => thumbnailRef.current.click()}
                className="w-40 h-28 bg-gray-300 rounded flex items-center justify-center cursor-pointer overflow-hidden"
              >
                {thumbnailUrl ? (
                  <img
                    src={thumbnailUrl}
                    alt="thumbnail"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  "Add thumbnail"
                )}
              </div>

              <input
                ref={thumbnailRef}
                type="file"
                hidden
                accept="image/*"
                onChange={(e) =>
                  handleThumbnailUpload(e.target.files[0])
                }
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
