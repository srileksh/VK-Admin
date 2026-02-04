"use client";
import { useRef, useState } from "react";
import { FaCircleMinus } from "react-icons/fa6";
import { FaPen } from "react-icons/fa";
import { GoPlus } from "react-icons/go";
import { TbZoomReplace } from "react-icons/tb";
import { HiMiniMinus } from "react-icons/hi2";

import { initiateVideoUpload } from "@/services/video.service";
import { uploadToVimeo } from "@/utils/vimeoUpload";
import axiosInstance from "@/services/axios";
import { uploadImageToCloudinary } from "@/utils/cloudinaryImageUpload";
import useCourseStore from "@/store/useCourseStore";

export default function PromoVideoSection() {
  const { courseId } = useCourseStore();

  const [isOpen, setIsOpen] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const [videoName, setVideoName] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [videoAssetId, setVideoAssetId] = useState(null);
  const [videoProvider, setVideoProvider] = useState(null);

  const fileRef = useRef(null);
  const thumbRef = useRef(null);

  /* ---------------- UPLOAD VIDEO ONLY ---------------- */
  const uploadPromo = async (file) => {
    if (!file) return;

    if (!courseId) {
      alert("Course not created yet");
      return;
    }

    const MAX_SIZE = 3 * 1024 * 1024 * 1024;

    if (!file.type.startsWith("video/")) {
      alert("Please upload a valid video file");
      return;
    }

    if (file.size > MAX_SIZE) {
      alert("Video must be less than 3GB");
      return;
    }

    try {
      setUploading(true);
      setProgress(0);
      setVideoName(file.name);

      // 1️⃣ initiate
      const { uploadUrl, videoAssetId, provider } =
        await initiateVideoUpload({
          purpose: "PROMO",
          size: file.size,
        });

      // 2️⃣ upload to vimeo
      await uploadToVimeo(uploadUrl, file, setProgress);

      // 3️⃣ store for Done button
      setVideoAssetId(videoAssetId);
      setVideoProvider(provider);
    } catch (err) {
      console.error(err);
      alert("Video upload failed");
    } finally {
      setUploading(false);
    }
  };

  /* ---------------- SAVE PROMO ---------------- */
  const handleDone = async () => {
    if (!videoAssetId) {
      alert("Please upload promo video");
      return;
    }

    if (!title.trim()) {
      alert("Title is required");
      return;
    }

    try {
      await axiosInstance.post("/promos", {
        title,
        description,
        videoAssetId,
        videoProvider,
        imageUrl: thumbnailUrl || "",
        courseId,
        order: 0,
      });

      alert("Promo video saved successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to save promo");
    }
  };

  /* ---------------- REMOVE VIDEO ---------------- */
  const handleRemove = () => {
    setVideoName("");
    setProgress(0);
    setVideoAssetId(null);
    setVideoProvider(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  /* ---------------- UPLOAD THUMBNAIL ---------------- */
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

  /* ---------------- UI ---------------- */
  return (
    <div className="border border-gray-100 shadow-md rounded-lg p-4 sm:p-5 mb-4">
      {/* Header */}
      <div className="flex justify-between items-center border-b pb-2 mb-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Promo video</span>
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
        <div className="flex justify-between gap-6">
          {/* LEFT */}
          <div className="flex-1">
            <div className="flex gap-4 mb-4">
              <input
                placeholder="Title of the video"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border rounded-lg px-4 py-2 w-[250px]"
              />
              <input
                placeholder="Short description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border rounded-lg px-4 py-2 flex-1"
              />
            </div>

            <div className="flex gap-6 items-start">
              <div className="flex gap-2 items-start">
                <div className="w-24 h-20 border rounded flex items-center justify-center text-xs text-gray-400">
                  {videoName ? "Video" : "No Video"}
                </div>

                <div>
                  <p className="text-sm">
                    {videoName || "promo-video.mp4"}
                  </p>

                  <button
                    disabled={uploading}
                    onClick={() => fileRef.current.click()}
                    className="flex items-center gap-1 text-sm mt-4 disabled:opacity-50"
                  >
                    <GoPlus /> Upload Video
                  </button>

                  <input
                    ref={fileRef}
                    type="file"
                    accept="video/*"
                    hidden
                    onChange={(e) => uploadPromo(e.target.files[0])}
                  />
                </div>
              </div>

              {/* Progress */}
              <div className="flex-1 text-sm text-gray-600">
                <p className="mb-2">Upload status</p>

                <div className="relative w-full h-6">
                  <div className="absolute w-full h-[2px] bg-gray-300 top-1/2" />
                  <div
                    className="absolute h-[2px] bg-green-400 top-1/2 transition-all"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                <div className="flex justify-between mt-4 text-gray-800">
                  <button
                    disabled={uploading}
                    onClick={() => fileRef.current.click()}
                    className="flex items-center gap-1 text-sm disabled:opacity-50"
                  >
                    <TbZoomReplace /> Replace Video
                  </button>

                  <button
                    disabled={uploading}
                    onClick={handleRemove}
                    className="flex items-center gap-1 text-sm disabled:opacity-50"
                  >
                    <HiMiniMinus /> Remove Video
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div>
            <label className="cursor-pointer">
              <div className="w-40 h-28 bg-gray-300 rounded-lg overflow-hidden relative">
                <img
                  src={thumbnailUrl || "/profile.png"}
                  className="w-full h-full object-cover"
                />
                <span className="absolute inset-0 flex items-center justify-center text-xs text-white bg-black/40">
                  Upload Thumbnail
                </span>
              </div>
              <input
                ref={thumbRef}
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => handleThumbnailUpload(e.target.files[0])}
              />
            </label>
            <p className="text-[10px] text-center mt-1">
              Resolution – X × Y px
            </p>
          </div>
        </div>
      )}

      <button
        onClick={handleDone}
        className="border px-[20px] py-[5px] rounded-[10px] bg-blue-950 text-white mt-4"
      >
        Done
      </button>
    </div>
  );
}
