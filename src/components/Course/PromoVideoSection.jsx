// "use client"
// import { useRef, useState } from "react";
// import { FaCircleMinus } from "react-icons/fa6";
// import { FaPen } from "react-icons/fa";
// import { GoPlus } from "react-icons/go";
// import { TbZoomReplace } from "react-icons/tb";
// import { HiMiniMinus } from "react-icons/hi2";
// import { GrGallery } from "react-icons/gr";
// import toast from "react-hot-toast";
// import { MdOutlineFileUpload } from "react-icons/md";
// import { LiaSave } from "react-icons/lia";

// import { initiateVideoUpload } from "@/services/video.service";
// import { uploadToVimeo } from "@/utils/vimeoUpload";
// import { uploadImageToCloudinary } from "@/utils/cloudinaryImageUpload";
// import useCourseStore from "@/store/useCourseStore";
// import { createPromoApi } from "@/services/promoApi";

// export default function PromoVideoSection() {
//   const { courseId, replacePromoVideo, removePromoVideo } = useCourseStore();

//   const [isOpen, setIsOpen] = useState(true);
//   const [uploading, setUploading] = useState(false);
//   const [thumbnailUploading, setThumbnailUploading] = useState(false);
//   const [saving, setSaving] = useState(false);
//   const [progress, setProgress] = useState(0);

//   /* Video */
//   const [videoName, setVideoName] = useState("");
//   const [selectedVideoFile, setSelectedVideoFile] = useState(null);
//   const [videoAssetId, setVideoAssetId] = useState(null);
//   const [videoProvider, setVideoProvider] = useState(null);

//   /* Thumbnail */
//   const [thumbnailUrl, setThumbnailUrl] = useState("");
//   const [selectedThumbnailFile, setSelectedThumbnailFile] = useState(null);
//   const [thumbnailName, setThumbnailName] = useState("");

//   /* Form */
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [isSaved, setIsSaved] = useState(false);

//   const fileRef = useRef(null);
//   const thumbRef = useRef(null);

//   const [errors, setErrors] = useState({
//     title: "",
//     description: "",
//     video: "",
//     thumbnail: "",
//   });

//   const isFormValid = () => {
//   return (
//     title.trim() &&
//     description.trim() &&
//     videoAssetId &&
//     thumbnailUrl
//   );
// };


//   /* ================= VIDEO ================= */

//   const handleFileSelect = (file) => {
//     if (!file || isSaved) return;
//     setSelectedVideoFile(file);
//     setVideoName(file.name);
//     setErrors((p) => ({ ...p, video: "" }));
//   };

//   const uploadPromo = async () => {
//     if (!selectedVideoFile || isSaved) {
//       setErrors((p) => ({ ...p, video: "Promo video is required" }));
//       return;
//     }

//     if (!courseId) {
//       toast.error("Course must be created first");
//       return;
//     }

//     try {
//       setUploading(true);
//       setProgress(0);

//       toast.loading("Uploading video...", { id: "video" });

//       const response = await initiateVideoUpload({
//         purpose: "PROMO",
//         size: selectedVideoFile.size,
//       });

//       const { uploadUrl, videoAssetId, provider } = response;

//       await uploadToVimeo(uploadUrl, selectedVideoFile, setProgress);

//       setVideoAssetId(videoAssetId);
//       setVideoProvider(provider);
//       setSelectedVideoFile(null);

//       await replacePromoVideo(videoAssetId, provider);

//       toast.success("Video uploaded successfully", { id: "video" });
//     } catch (err) {
//       console.error(err);
//       toast.error("Video upload failed", { id: "video" });
//     } finally {
//       setUploading(false);
//     }
//   };

//   const handleReplaceVideo = () => {
//     if (!videoAssetId || isSaved || uploading) return;
//     fileRef.current.click();
//   };

//   const handleRemoveVideo = async () => {
//     if (!videoAssetId || isSaved) return;

//     await removePromoVideo();

//     setVideoName("");
//     setVideoAssetId(null);
//     setVideoProvider(null);
//     setProgress(0);

//     setErrors((p) => ({ ...p, video: "Promo video is required" }));
//     toast.success("Video removed");
//   };

//   /* ================= THUMBNAIL ================= */

//   const handleThumbnailSelect = (file) => {
//     if (!file || isSaved) return;
//     setSelectedThumbnailFile(file);
//     setThumbnailName(file.name);
//     setErrors((p) => ({ ...p, thumbnail: "" }));
//   };

//   const handleThumbnailUpload = async () => {
//     if (!selectedThumbnailFile || isSaved) {
//       setErrors((p) => ({ ...p, thumbnail: "Thumbnail is required" }));
//       return;
//     }

//     try {
//       setThumbnailUploading(true);

//       toast.loading("Uploading thumbnail...", { id: "thumb" });

//       const url = await uploadImageToCloudinary(
//         selectedThumbnailFile,
//         "PROMO_IMAGE"
//       );

//       setThumbnailUrl(url);
//       setSelectedThumbnailFile(null);

//       toast.success("Thumbnail uploaded successfully", { id: "thumb" });
//     } catch (err) {
//       console.error(err);
//       toast.error("Thumbnail upload failed", { id: "thumb" });
//     } finally {
//       setThumbnailUploading(false);
//     }
//   };

  

//   /* ================= SAVE ================= */

//   const handleSave = async () => {
//     const newErrors = {
//       title: "",
//       description: "",
//       video: "",
//       thumbnail: "",
//     };

//     if (!title.trim()) newErrors.title = "Title is required";
//     if (!description.trim())
//       newErrors.description = "Description is required";
//     if (!videoAssetId) newErrors.video = "Promo video is required";
//     if (!thumbnailUrl) newErrors.thumbnail = "Thumbnail is required";

//     setErrors(newErrors);
//     if (Object.values(newErrors).some((err) => err)) return;

//     try {
//       setSaving(true);

//       // await axiosInstance.post("/admin/promos", {
//       //   title: title.trim(),
//       //   description: description.trim(),
//       //   videoAssetId,
//       //   videoProvider,
//       //   imageUrl: thumbnailUrl,
//       //   courseId,
//       //   order: 0,
//       // });

//       await createPromoApi({
//   title: title.trim(),
//   description: description.trim(),
//   videoAssetId,
//   videoProvider,
//   imageUrl: thumbnailUrl,
//   courseId,
//   order: 0,
// });

//       setIsSaved(true);
//       toast.success("Promo saved successfully");
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to save promo video");
//     } finally {
//       setSaving(false);
//     }
//   };

//   const handleEdit = () => {
//     setIsSaved(false);
//   };

//   /* ================= UI (UNCHANGED) ================= */

//   return (
//     <div className="border border-gray-100 shadow-md rounded-lg p-5 mb-4 mt-[10px]">
//       {/* HEADER */}
//       <div className="flex justify-between items-center text-[#1F304A]">
//         <div className="flex items-center gap-2 ">
//           <span className="text-sm font-medium">Promo video</span>
//           <FaPen />
//         </div>

//         <button
//           onClick={() => setIsOpen(!isOpen)}
//           className="text-2xl text-gray-400 hover:text-gray-700"
//         >
//           {isOpen ? <FaCircleMinus /> : <GoPlus />}
//         </button>
//       </div>

//       {isOpen && (
//         <>
//           <div className="border-b border-gray-400 mt-2 mb-4" />

//           <div className="flex justify-between gap-6">
//             {/* LEFT */}
//             <div className="flex-1">
//               <div className="flex gap-4 mb-2">
//                 <div>
//                   <input
//                     disabled={isSaved}
//                     value={title}
//                     maxLength={40}
//                     onChange={(e) => {
//                       setTitle(e.target.value);
//                       setErrors((p) => ({ ...p, title: "" }));
//                     }}
//                     placeholder="Title (limit: 40 characters)"
//                     className={`border border-gray-400 rounded-lg text-gray-600  p-2 w-[250px] outline-gray-400 placeholder:text-sm ${
//                       errors.title ? "border-red-400" : ""
//                     }`}
//                   />
//                   {errors.title && (
//                     <p className="text-red-500 text-xs mt-1">
//                       {errors.title}
//                     </p>
//                   )}
//                 </div>

//                 <div className="flex-1">
//                   <input
//                     disabled={isSaved}
//                     value={description}
//                     maxLength={130}
                    
//                     onChange={(e) => {
//                       setDescription(e.target.value);
//                       setErrors((p) => ({ ...p, description: "" }));
//                     }}
//                     placeholder="Description (limit: 130 characters)"
//                     className={`border border-gray-400 rounded-lg text-gray-600  p-2 w-full outline-gray-400  placeholder:text-sm ${
//                       errors.description ? "border-red-400" : ""
//                     }`}
                    
//                   />
//                   {errors.description && (
//                     <p className="text-red-500 text-xs mt-1">
//                       {errors.description}
//                     </p>
//                   )}
//                 </div>
//               </div>

//               {/* VIDEO */}
//               <div className="flex gap-6 items-start mt-[15px]">
//                 <div className="flex gap-3">
//                   <div
//                     onClick={() =>
//                       !uploading && !isSaved && fileRef.current.click()
//                     }
//                     className="w-24 h-20 border rounded flex items-center justify-center text-xs cursor-pointer text-gray-400"
//                   >                    {videoName ? "Video Selected" : "Select Video"}
//                   </div>

//                   <div>
//                     <p className="text-sm mt-2 truncate max-w-[150px]">
//                       {videoName || "promo-video.mp4"}
//                     </p>

//                     <button
//                       disabled={uploading || isSaved || !selectedVideoFile}
//                       onClick={uploadPromo}
//                       className="border px-2.5 py-0.5 text-[12px] text-[#37af47] broder-none shadow-2xl border-[#37af47] rounded-[14px] disabled:opacity-60 text-sm mt-2 flex justify-center items-center gap-[2px]"
//                     ><MdOutlineFileUpload />


//                       {uploading ? "Uploading..." : "Upload"}
//                     </button>

//                     {errors.video && (
//                       <p className="text-red-500 text-xs mt-1">
//                         {errors.video}
//                       </p>
//                     )}

//                     <input
//                       ref={fileRef}
//                       type="file"
//                       accept="video/*"
//                       hidden
//                       onChange={(e) => handleFileSelect(e.target.files[0])}
//                     />
//                   </div>
//                 </div>

//                 {/* Progress */}
//                 <div className="flex-1">
//                   <p className="mb-1">Upload status</p>
//                   <div className="relative w-full h-[2px] bg-gray-300 mt-4">
//                     <div
//                       className="absolute h-[2px] bg-green-500"
//                       style={{ width: `${progress}%` }}
//                     />
//                   </div>

//                   {/* <div className="flex justify-between mt-3 text-sm">
//                     <button
//                       disabled={!videoAssetId || isSaved || uploading}
//                       onClick={handleReplaceVideo}
//                       className="flex items-center gap-1 disabled:opacity-40"
//                     >
//                       <TbZoomReplace /> Replace
//                     </button>

//                     <button
//                       disabled={!videoAssetId || isSaved}
//                       onClick={handleRemoveVideo}
//                       className="flex items-center gap-1 disabled:opacity-40"
//                     >
//                       <HiMiniMinus /> Remove
//                     </button>
//                   </div> */}
//                 </div>
//               </div>
//             </div>

//             {/* THUMBNAIL */}
//             <div>
//               <div className="flex flex-col justify-center items-center">             
//                 <div
//                 onClick={() => !isSaved && thumbRef.current.click()}
//                 className="w-40 h-28 bg-gray-300 rounded-lg flex items-center justify-center cursor-pointer overflow-hidden"
//               >
//                 {thumbnailUrl ? (
//                   <img
//                     src={thumbnailUrl}
//                     className="w-full h-full object-cover"
//                   />
//                 ) : (
//                   <div className="text-center text-gray-600">
//                     <GrGallery size={22} className="mx-auto mb-1" />
//                     <p className="text-xs">
//                       {thumbnailName || "No file selected"}
//                     </p>
//                   </div>
//                 )}
//               </div>

//               <button
//                 disabled={
//                   !selectedThumbnailFile || isSaved || thumbnailUploading
//                 }
//                 onClick={handleThumbnailUpload}
//                 className="text-sm mt-2 flex justify-center items-center gap-[2px] text-[12px] border px-2.5 py-0.5 text-[#37af47]  rounded-[14px] disabled:opacity-60"
//               >
//                 <MdOutlineFileUpload/>
//                 {thumbnailUploading
//                   ? "Uploading..."
//                   : "Upload"}
//               </button>
// </div>
 
//               {errors.thumbnail && (
//                 <p className="text-red-500 text-xs mt-1">
//                   {errors.thumbnail}
//                 </p>
//               )}

//               <input
//                 ref={thumbRef}
//                 type="file"
//                 accept="image/*"
//                 hidden
//                 onChange={(e) =>
//                   handleThumbnailSelect(e.target.files[0])
//                 }
//               />
//             </div>
//           </div>

//           {/* ACTION BUTTONS */}
//           <div className="flex justify-end gap-4 mt-4">
//             <button
//               onClick={handleEdit}
//               disabled={!isSaved}
//               className="flex items-center px-5 py-0.5 border shadow-[#37af47] shadow-2xl border-[#37af47] text-[#37af47] rounded-[12px] text-sm disabled:opacity-50"
//             >
//               Edit
              
//             </button>

//             <button
//               onClick={handleSave}
//               disabled={saving || isSaved || !isFormValid()}
//               className="px-4  border py-0.5 bg-[#37af47]  text-white rounded-[12px] disabled:opacity-50 flex justify-center items-center gap-[2px]"
//             >
//               <p><LiaSave className="text-[22px]"/></p>
//               {saving ? "Saving..." : "Save"}
//             </button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }


"use client";

import { useEffect, useRef, useState } from "react";
import { FaCircleMinus } from "react-icons/fa6";
import { FaPen } from "react-icons/fa";
import { GoPlus } from "react-icons/go";
import { GrGallery } from "react-icons/gr";
import toast from "react-hot-toast";
import { MdOutlineFileUpload } from "react-icons/md";
import { LiaSave } from "react-icons/lia";

import { initiateVideoUpload } from "@/services/video.service";
import { uploadToVimeo } from "@/utils/vimeoUpload";
import { uploadImageToCloudinary } from "@/utils/cloudinaryImageUpload";
import useCourseStore from "@/store/useCourseStore";
import usePromoStore from "@/store/usePromoStore";

export default function PromoVideoSection({ promoId = null }) {
  const { courseId, replacePromoVideo, removePromoVideo } = useCourseStore();
  const { fetchPromoById, savePromo, updatePromo, loading } = usePromoStore();

  const [isOpen, setIsOpen] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [thumbnailUploading, setThumbnailUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [progress, setProgress] = useState(0);

  const [existingPromoId, setExistingPromoId] = useState(null);

  const [videoName, setVideoName] = useState("");
  const [selectedVideoFile, setSelectedVideoFile] = useState(null);
  const [videoAssetId, setVideoAssetId] = useState(null);
  const [videoProvider, setVideoProvider] = useState(null);

  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [selectedThumbnailFile, setSelectedThumbnailFile] = useState(null);
  const [thumbnailName, setThumbnailName] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const [existingPromoId, setExistingPromoId] = useState(null);

  /* ================= PREFILL ON EDIT ================= */
  useEffect(() => {
    const promo = currentCourse?.promos?.[0];
    if (!promo) return;

    setExistingPromoId(promo.id);
    setTitle(promo.title || "");
    setDescription(promo.description || "");
    setThumbnailUrl(promo.imageUrl || "");
    setVideoAssetId(promo.videoAssetId || null);
    setVideoProvider(promo.videoProvider || null);
    setVideoName(promo.videoAssetId ? promo.videoAssetId : "");
    setIsSaved(true);
  }, [currentCourse]);

  const fileRef = useRef(null);
  const thumbRef = useRef(null);

  const [errors, setErrors] = useState({
    title: "",
    description: "",
    video: "",
    thumbnail: "",
  });

  useEffect(() => {
    const loadPromo = async () => {
      if (!promoId) return;

      const promo = await fetchPromoById(promoId);

      if (!promo) return;

      setExistingPromoId(promo.id || promoId);
      setTitle(promo.title || "");
      setDescription(promo.description || "");
      setVideoAssetId(promo.videoAssetId || null);
      setVideoProvider(promo.videoProvider || null);
      setThumbnailUrl(promo.imageUrl || "");
      setVideoName(promo.videoName || "Uploaded promo video");
      setThumbnailName(promo.imageUrl ? "Uploaded thumbnail" : "");
      setIsSaved(true);
    };

    loadPromo();
  }, [promoId, fetchPromoById]);

  const isFormValid = () => {
    return title.trim() && description.trim() && videoAssetId && thumbnailUrl;
  };

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

      const url = await uploadImageToCloudinary(
        selectedThumbnailFile,
        "PROMO_IMAGE"
      );

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

  const handleSave = async () => {
    const newErrors = {
      title: "",
      description: "",
      video: "",
      thumbnail: "",
    };

    if (!title.trim()) newErrors.title = "Title is required";
    if (!description.trim()) newErrors.description = "Description is required";
    if (!videoAssetId) newErrors.video = "Promo video is required";
    if (!thumbnailUrl) newErrors.thumbnail = "Thumbnail is required";

    setErrors(newErrors);
    if (Object.values(newErrors).some((err) => err)) return;

    try {
      setSaving(true);

      const payload = {
        title: title.trim(),
        description: description.trim(),
        videoAssetId,
        videoProvider,
        imageUrl: thumbnailUrl,
        courseId,
        order: 0,
      };

      let result;

      if (existingPromoId) {
        result = await updatePromo(existingPromoId, payload);
      } else {
        result = await savePromo(payload);
      }

      if (!result.success) {
        toast.error(result.error || "Failed to save promo");
        return;
      }

      const savedPromo = result.data;

      setExistingPromoId(savedPromo?.id || existingPromoId);
      setIsSaved(true);
      toast.success(existingPromoId ? "Promo updated successfully" : "Promo saved successfully");
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

  return (
    <div className="mt-[10px] mb-4 rounded-lg border border-gray-100 p-5 shadow-md">
      <div className="flex items-center justify-between text-[#1F304A]">
        <div className="flex items-center gap-2">
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
          <div className="mt-2 mb-4 border-b border-gray-400" />

          {loading ? (
            <p className="py-6 text-sm text-gray-500">Loading promo...</p>
          ) : (
            <>
              <div className="flex justify-between gap-6">
                <div className="flex-1">
                  <div className="mb-2 flex gap-4">
                    <div>
                      <input
                        disabled={isSaved}
                        value={title}
                        maxLength={40}
                        onChange={(e) => {
                          setTitle(e.target.value);
                          setErrors((p) => ({ ...p, title: "" }));
                        }}
                        placeholder="Title (limit: 40 characters)"
                        className={`w-[250px] rounded-lg border border-gray-400 p-2 text-gray-600 outline-gray-400 placeholder:text-sm ${
                          errors.title ? "border-red-400" : ""
                        }`}
                      />
                      {errors.title && (
                        <p className="mt-1 text-xs text-red-500">{errors.title}</p>
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
                        placeholder="Description (limit: 130 characters)"
                        className={`w-full rounded-lg border border-gray-400 p-2 text-gray-600 outline-gray-400 placeholder:text-sm ${
                          errors.description ? "border-red-400" : ""
                        }`}
                      />
                      {errors.description && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors.description}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mt-[15px] flex items-start gap-6">
                    <div className="flex gap-3">
                      <div
                        onClick={() =>
                          !uploading && !isSaved && fileRef.current.click()
                        }
                        className="flex h-20 w-24 cursor-pointer items-center justify-center rounded border text-xs text-gray-400"
                      >
                        {videoName ? "Video Selected" : "Select Video"}
                      </div>

                      <div>
                        <p className="mt-2 max-w-[150px] truncate text-sm">
                          {videoName || "promo-video.mp4"}
                        </p>

                        <button
                          disabled={uploading || isSaved || !selectedVideoFile}
                          onClick={uploadPromo}
                          className="mt-2 flex items-center justify-center gap-[2px] rounded-[14px] border border-[#37af47] px-2.5 py-0.5 text-[12px] text-[#37af47] shadow-2xl disabled:opacity-60"
                        >
                          <MdOutlineFileUpload />
                          {uploading ? "Uploading..." : "Upload"}
                        </button>

                        {errors.video && (
                          <p className="mt-1 text-xs text-red-500">{errors.video}</p>
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

                    <div className="flex-1">
                      <p className="mb-1">Upload status</p>
                      <div className="relative mt-4 h-[2px] w-full bg-gray-300">
                        <div
                          className="absolute h-[2px] bg-green-500"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex flex-col items-center justify-center">
                    <div
                      onClick={() => !isSaved && thumbRef.current.click()}
                      className="flex h-28 w-40 cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-gray-300"
                    >
                      {thumbnailUrl ? (
                        <img
                          src={thumbnailUrl}
                          className="h-full w-full object-cover"
                          alt="Promo thumbnail"
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
                      className="mt-2 flex items-center justify-center gap-[2px] rounded-[14px] border px-2.5 py-0.5 text-[12px] text-[#37af47] disabled:opacity-60"
                    >
                      <MdOutlineFileUpload />
                      {thumbnailUploading ? "Uploading..." : "Upload"}
                    </button>
                  </div>

                  {errors.thumbnail && (
                    <p className="mt-1 text-xs text-red-500">{errors.thumbnail}</p>
                  )}

                  <input
                    ref={thumbRef}
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={(e) => handleThumbnailSelect(e.target.files[0])}
                  />
                </div>
              </div>

              <div className="mt-4 flex justify-end gap-4">
                <button
                  onClick={handleEdit}
                  disabled={!isSaved}
                  className="rounded-[12px] border border-[#37af47] px-5 py-0.5 text-sm text-[#37af47] shadow-2xl shadow-[#37af47] disabled:opacity-50"
                >
                  Edit
                </button>

                <button
                  onClick={handleSave}
                  disabled={saving || isSaved || !isFormValid()}
                  className="flex items-center justify-center gap-[2px] rounded-[12px] border bg-[#37af47] px-4 py-0.5 text-white disabled:opacity-50"
                >
                  <LiaSave className="text-[22px]" />
                  {saving ? "Saving..." : existingPromoId ? "Update" : "Save"}
                </button>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}