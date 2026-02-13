import { useRef, useState } from "react";
import { FaCircleMinus } from "react-icons/fa6";
import { FaPen } from "react-icons/fa";
import { GoPlus } from "react-icons/go";
import { TbZoomReplace } from "react-icons/tb";
import { HiMiniMinus } from "react-icons/hi2";
import { GrGallery } from "react-icons/gr";
import toast from "react-hot-toast";

import { initiateVideoUpload } from "@/services/video.service";
import { uploadToVimeo } from "@/utils/vimeoUpload";
import axiosInstance from "@/services/axios";
import { uploadImageToCloudinary } from "@/utils/cloudinaryImageUpload";
import useCourseStore from "@/store/useCourseStore";

export default function PromoVideoSection() {
  const { courseId, replacePromoVideo, removePromoVideo } = useCourseStore();

  const [isOpen, setIsOpen] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [thumbnailUploading, setThumbnailUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [progress, setProgress] = useState(0);

  /* Video */
  const [videoName, setVideoName] = useState("");
  const [selectedVideoFile, setSelectedVideoFile] = useState(null);
  const [videoAssetId, setVideoAssetId] = useState(null);
  const [videoProvider, setVideoProvider] = useState(null);

  /* Thumbnail */
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [selectedThumbnailFile, setSelectedThumbnailFile] = useState(null);
  const [thumbnailName, setThumbnailName] = useState("");

  /* Form */
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isSaved, setIsSaved] = useState(false);

  const fileRef = useRef(null);
  const thumbRef = useRef(null);

  const [errors, setErrors] = useState({
    title: "",
    description: "",
    video: "",
    thumbnail: "",
  });

  /* ================= VIDEO ================= */

  const handleFileSelect = (file) => {
    if (!file || isSaved) return;
    setSelectedVideoFile(file);
    setVideoName(file.name);
    setErrors((p) => ({ ...p, video: "" }));
  };

  const uploadPromo = async () => {
    if (!selectedVideoFile || isSaved) {
      setErrors((p) => ({ ...p, video: "Promo video is required" }));
      return;
    }

    if (!courseId) {
      toast.error("Course must be created first");
      return;
    }

    try {
      setUploading(true);
      setProgress(0);

      toast.loading("Uploading video...", { id: "video" });

      const response = await initiateVideoUpload({
        purpose: "PROMO",
        size: selectedVideoFile.size,
      });

      const { uploadUrl, videoAssetId, provider } = response;

      await uploadToVimeo(uploadUrl, selectedVideoFile, setProgress);

      setVideoAssetId(videoAssetId);
      setVideoProvider(provider);
      setSelectedVideoFile(null);

      await replacePromoVideo(videoAssetId, provider);

      toast.success("Video uploaded successfully", { id: "video" });
    } catch (err) {
      console.error(err);
      toast.error("Video upload failed", { id: "video" });
    } finally {
      setUploading(false);
    }
  };

  const handleReplaceVideo = () => {
    if (!videoAssetId || isSaved || uploading) return;
    fileRef.current.click();
  };

  const handleRemoveVideo = async () => {
    if (!videoAssetId || isSaved) return;

    await removePromoVideo();

    setVideoName("");
    setVideoAssetId(null);
    setVideoProvider(null);
    setProgress(0);

    setErrors((p) => ({ ...p, video: "Promo video is required" }));
    toast.success("Video removed");
  };

  /* ================= THUMBNAIL ================= */

  const handleThumbnailSelect = (file) => {
    if (!file || isSaved) return;
    setSelectedThumbnailFile(file);
    setThumbnailName(file.name);
    setErrors((p) => ({ ...p, thumbnail: "" }));
  };

  const handleThumbnailUpload = async () => {
    if (!selectedThumbnailFile || isSaved) {
      setErrors((p) => ({ ...p, thumbnail: "Thumbnail is required" }));
      return;
    }

    try {
      setThumbnailUploading(true);

      toast.loading("Uploading thumbnail...", { id: "thumb" });

      const url = await uploadImageToCloudinary(selectedThumbnailFile);

      setThumbnailUrl(url);
      setSelectedThumbnailFile(null);

      toast.success("Thumbnail uploaded successfully", { id: "thumb" });
    } catch (err) {
      console.error(err);
      toast.error("Thumbnail upload failed", { id: "thumb" });
    } finally {
      setThumbnailUploading(false);
    }
  };

  /* ================= SAVE ================= */

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
      toast.success("Promo saved successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to save promo video");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = () => {
    setIsSaved(false);
  };

  /* ================= UI (UNCHANGED) ================= */

  return (
    <div className="border border-gray-100 shadow-md rounded-lg p-5 mb-4 mt-[10px]">
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
              <div className="flex gap-4 mb-2">
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
                    maxLength={130}
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

              {/* VIDEO */}
              <div className="flex gap-6 items-start mt-[15px]">
                <div className="flex gap-3">
                  <div
                    onClick={() =>
                      !uploading && !isSaved && fileRef.current.click()
                    }
                    className="w-24 h-20 border rounded flex items-center justify-center text-xs cursor-pointer text-gray-400"
                  >
                    {videoName ? "Video Selected" : "Select Video"}
                  </div>

                  <div>
                    <p className="text-sm mt-2 truncate max-w-[150px]">
                      {videoName || "promo-video.mp4"}
                    </p>

                    <button
                      disabled={uploading || isSaved || !selectedVideoFile}
                      onClick={uploadPromo}
                      className="text-sm mt-2 disabled:opacity-40"
                    >
                      {uploading ? "Uploading..." : "+ Upload Video"}
                    </button>

                    {errors.video && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.video}
                      </p>
                    )}

                    <input
                      ref={fileRef}
                      type="file"
                      accept="video/*"
                      hidden
                      onChange={(e) => handleFileSelect(e.target.files[0])}
                    />
                  </div>
                </div>

                {/* Progress */}
                <div className="flex-1">
                  <p className="mb-1">Upload status</p>
                  <div className="relative w-full h-[2px] bg-gray-300 mt-6">
                    <div
                      className="absolute h-[2px] bg-green-500"
                      style={{ width: `${progress}%` }}
                    />
                  </div>

                  <div className="flex justify-between mt-3 text-sm">
                    <button
                      disabled={!videoAssetId || isSaved}
                      onClick={handleReplaceVideo}
                      className="flex items-center gap-1 disabled:opacity-40"
                    >
                      <TbZoomReplace /> Replace
                    </button>

                    <button
                      disabled={!videoAssetId || isSaved}
                      onClick={handleRemoveVideo}
                      className="flex items-center gap-1 disabled:opacity-40"
                    >
                      <HiMiniMinus /> Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* THUMBNAIL */}
            <div>
              <div
                onClick={() => !isSaved && thumbRef.current.click()}
                className="w-40 h-28 bg-gray-300 rounded-lg flex items-center justify-center cursor-pointer overflow-hidden"
              >
                {thumbnailUrl ? (
                  <img
                    src={thumbnailUrl}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-center text-gray-600">
                    <GrGallery size={22} className="mx-auto mb-1" />
                    <p className="text-xs">
                      {thumbnailName || "No file selected"}
                    </p>
                  </div>
                )}
              </div>

              <button
                disabled={
                  !selectedThumbnailFile || isSaved || thumbnailUploading
                }
                onClick={handleThumbnailUpload}
                className="text-sm mt-2 w-full disabled:opacity-40"
              >
                {thumbnailUploading
                  ? "Uploading..."
                  : "+ Upload Thumbnail"}
              </button>

              {errors.thumbnail && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.thumbnail}
                </p>
              )}

              <input
                ref={thumbRef}
                type="file"
                accept="image/*"
                hidden
                onChange={(e) =>
                  handleThumbnailSelect(e.target.files[0])
                }
              />
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex justify-end gap-4 mt-4">
            <button
              onClick={handleEdit}
              disabled={!isSaved}
              className="flex items-center px-5 py-2 border-2 border-[#1F304A] rounded-xl text-sm disabled:opacity-50"
            >
                                <FaPen /> Edit
              
            </button>

            <button
              onClick={handleSave}
              disabled={saving || isSaved}
              className="px-8 py-2 bg-[#1F304A] text-white rounded-xl"
            >
              {saving ? "Saving..." : "Save"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}







