import { useRef, useState } from "react";
import { FaCircleMinus } from "react-icons/fa6";
import { FaPen } from "react-icons/fa";
import { GoPlus } from "react-icons/go";
import { TbZoomReplace } from "react-icons/tb";
import { HiMiniMinus } from "react-icons/hi2";
import { GrGallery } from "react-icons/gr";

import { initiateVideoUpload } from "@/services/video.service";
import { uploadToVimeo } from "@/utils/vimeoUpload";
import axiosInstance from "@/services/axios";
import { uploadImageToCloudinary } from "@/utils/cloudinaryImageUpload";
import useCourseStore from "@/store/useCourseStore";

export default function PromoVideoSection() {
  const { courseId, replacePromoVideo, removePromoVideo } = useCourseStore();

  const [isOpen, setIsOpen] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [progress, setProgress] = useState(0);

  const [videoName, setVideoName] = useState("");
  const [selectedVideoFile, setSelectedVideoFile] = useState(null);

  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [videoAssetId, setVideoAssetId] = useState(null);
  const [videoProvider, setVideoProvider] = useState(null);

  const [isSaved, setIsSaved] = useState(false);

  const fileRef = useRef(null);
  const thumbRef = useRef(null);

  const [errors, setErrors] = useState({
    title: "",
    description: "",
    video: "",
    thumbnail: "",
  });

  /* ---------------- VIDEO UPLOAD ---------------- */
  const uploadPromo = async (file) => {
    if (!file || isSaved) return;

    if (!courseId) {
      alert("Course must be created first");
      return;
    }

    try {
      setUploading(true);
      setProgress(0);

      const response = await initiateVideoUpload({
        purpose: "PROMO",
        size: file.size,
      });

      const { uploadUrl, videoAssetId, provider } = response;

      await uploadToVimeo(uploadUrl, file, setProgress);

      setVideoAssetId(videoAssetId);
      setVideoProvider(provider);
      setSelectedVideoFile(null);

      await replacePromoVideo(videoAssetId, provider);

      setErrors((prev) => ({ ...prev, video: "" }));
    } catch (err) {
      console.error("Video upload error:", err);
      alert("Video upload failed");
      setVideoName("");
      setSelectedVideoFile(null);
    } finally {
      setUploading(false);
    }
  };

  /* ---------------- FILE SELECT ---------------- */
  const handleFileSelect = (file) => {
    if (!file || isSaved) return;
    setSelectedVideoFile(file);
    setVideoName(file.name);
    setErrors((prev) => ({ ...prev, video: "" }));
  };

  const handleVideoBoxClick = () => {
    if (uploading || isSaved) return;
    fileRef.current.click();
  };

  const handleReplaceVideo = () => {
    if (uploading || isSaved) return;
    fileRef.current.click();
  };

  /* ---------------- REMOVE VIDEO ---------------- */
  const handleRemoveVideo = async () => {
    if (isSaved) return;

    try {
      await removePromoVideo();

      setVideoName("");
      setVideoAssetId(null);
      setVideoProvider(null);
      setSelectedVideoFile(null);
      setProgress(0);

      setErrors((prev) => ({
        ...prev,
        video: "Promo video is required",
      }));
    } catch (err) {
      console.error(err);
      alert("Failed to remove video");
    }
  };

  /* ---------------- THUMBNAIL ---------------- */
  const handleThumbnailUpload = async (file) => {
    if (!file || isSaved) return;

    try {
      const url = await uploadImageToCloudinary(file);
      setThumbnailUrl(url);
      setErrors((prev) => ({ ...prev, thumbnail: "" }));
    } catch (err) {
      console.error("Thumbnail upload error:", err);
      alert("Thumbnail upload failed");
    }
  };

  /* ---------------- SAVE ---------------- */
  const handleSave = async () => {
    const newErrors = {
      title: "",
      description: "",
      video: "",
      thumbnail: "",
    };

    if (!title.trim()) newErrors.title = "Title is required";
    if (!description.trim())
      newErrors.description = "Description is required";
    if (!videoAssetId) newErrors.video = "Promo video is required";
    if (!thumbnailUrl) newErrors.thumbnail = "Thumbnail is required";

    setErrors(newErrors);
    if (Object.values(newErrors).some((err) => err)) return;

    try {
      setSaving(true);

      await axiosInstance.post("/promos", {
        title: title.trim(),
        description: description.trim(),
        videoAssetId,
        videoProvider,
        imageUrl: thumbnailUrl,
        courseId,
        order: 0,
      });

      setIsSaved(true);
      alert("Promo video saved successfully");
    } catch (err) {
      console.error(err);
      alert("Failed to save promo video");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = () => setIsSaved(false);

  return (
    <div className="border border-gray-100 shadow-md rounded-lg p-5 mb-4">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2 text-[#1F304A]">
          <span className="text-sm font-medium">Promo video</span>
          <FaPen />
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-2xl text-gray-400 hover:text-gray-700"
        >
          {isOpen ? <FaCircleMinus /> : <GoPlus />}
        </button>
      </div>

      {isOpen && (
        <>
          <div className="border-b mt-2 mb-4" />

          <div className="flex justify-between gap-6">
            {/* LEFT */}
            <div className="flex-1">
              {/* Title & Description */}
              <div className="flex gap-4 mb-6">
                <div>
                  <input
                    disabled={isSaved}
                    value={title}
                    maxLength={40}
                    onChange={(e) => {
                      setTitle(e.target.value);
                      setErrors((p) => ({ ...p, title: "" }));
                    }}
                    placeholder="Title of the video"
                    className={`border rounded-lg px-4 py-2 w-[250px] ${
                      errors.title ? "border-red-400" : ""
                    }`}
                  />
                  {errors.title && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.title}
                    </p>
                  )}
                </div>

                <div className="flex-1">
                  <input
                    disabled={isSaved}
                    value={description}
                    maxLength={100}
                    onChange={(e) => {
                      setDescription(e.target.value);
                      setErrors((p) => ({ ...p, description: "" }));
                    }}
                    placeholder="Short description"
                    className={`border rounded-lg px-4 py-2 w-full ${
                      errors.description ? "border-red-400" : ""
                    }`}
                  />
                  {errors.description && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.description}
                    </p>
                  )}
                </div>
              </div>

              {/* Video Section */}
              <div className="flex gap-6 items-start">
                <div>
                  {/* Select Video Box */}
                  <div
                    onClick={handleVideoBoxClick}
                    className={`w-24 h-20 border rounded flex items-center justify-center text-xs cursor-pointer
                    ${
                      uploading || isSaved
                        ? "opacity-60 cursor-not-allowed"
                        : "text-gray-400 hover:border-blue-400"
                    }`}
                  >
                    {videoName ? "Video Selected" : "Select Video"}
                  </div>

                  <p className="text-sm mt-2">
                    {videoName || "promo-video.mp4"}
                  </p>

                  {/* Upload Button */}
                  <button
                    disabled={
                      uploading || isSaved || !selectedVideoFile
                    }
                    onClick={() => uploadPromo(selectedVideoFile)}
                    className="text-sm mt-2 disabled:opacity-40"
                  >
                    + Upload Video
                  </button>

                  <input
                    ref={fileRef}
                    type="file"
                    accept="video/*"
                    hidden
                    onChange={(e) =>
                      handleFileSelect(e.target.files[0])
                    }
                  />

                  {errors.video && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.video}
                    </p>
                  )}
                </div>

                {/* Progress + Actions */}
                <div className="flex-1 text-sm text-gray-600">
                  <p className="mb-1">Upload status</p>

                  <div className="relative w-full h-6">
                    <div className="absolute w-full h-[2px] bg-gray-300 top-1/2" />
                    <div
                      className="absolute h-[2px] bg-green-400 top-1/2"
                      style={{ width: `${progress}%` }}
                    />
                  </div>

                  <div className="flex justify-between mt-2">
                    <button
                      type="button"
                      disabled={isSaved}
                      onClick={handleReplaceVideo}
                      className="flex items-center gap-1 text-sm hover:text-blue-600 disabled:opacity-40"
                    >
                      <TbZoomReplace /> Replace Video
                    </button>

                    <button
                      type="button"
                      disabled={!videoAssetId || isSaved}
                      onClick={handleRemoveVideo}
                      className="flex items-center gap-1 text-sm hover:text-red-600 disabled:opacity-40"
                    >
                      <HiMiniMinus /> Remove Video
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT - Thumbnail */}
            <div>
              <label className="cursor-pointer">
                <div className="w-40 h-28 bg-gray-300 rounded-lg overflow-hidden flex items-center justify-center">
                  {thumbnailUrl ? (
                    <img
                      src={thumbnailUrl}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <GrGallery size={28} className="text-gray-500" />
                  )}
                </div>

                <input
                  ref={thumbRef}
                  type="file"
                  accept="image/*"
                  hidden
                  disabled={isSaved}
                  onChange={(e) =>
                    handleThumbnailUpload(e.target.files[0])
                  }
                />
              </label>

              {errors.thumbnail && (
                <p className="text-red-500 text-xs mt-2">
                  {errors.thumbnail}
                </p>
              )}
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex justify-end gap-4">
            <button
              onClick={handleEdit}
              disabled={!isSaved}
              className="px-5 py-2 border-2 border-[#1F304A] rounded-xl text-sm disabled:opacity-50"
            >
              Edit
            </button>

            <button
              onClick={handleSave}
              disabled={saving || isSaved}
              className="px-8 py-2 bg-[#1F304A] text-white rounded-xl disabled:opacity-60"
            >
              {saving ? "Saving..." : "Save"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
