// import { useRef, useState } from "react";
// import { FaCircleMinus } from "react-icons/fa6";
// import { FaPen } from "react-icons/fa";
// import { GoPlus } from "react-icons/go";
// import { TbZoomReplace } from "react-icons/tb";
// import { HiMiniMinus } from "react-icons/hi2";

// import { initiateVideoUpload } from "@/services/video.service";
// import { uploadToVimeo } from "@/utils/vimeoUpload";
// import axiosInstance from "@/services/axios";
// import { uploadImageToCloudinary } from "@/utils/cloudinaryImageUpload";
// import useCourseStore from "@/store/useCourseStore";

// export default function PromoVideoSection() {
//   const { courseId } = useCourseStore();

//   const [isOpen, setIsOpen] = useState(true);
//   const [uploading, setUploading] = useState(false);
//   const [saving, setSaving] = useState(false);
//   const [progress, setProgress] = useState(0);

//   const [videoName, setVideoName] = useState("");
//   const [thumbnailUrl, setThumbnailUrl] = useState("");

//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");

//   const [videoAssetId, setVideoAssetId] = useState(null);
//   const [videoProvider, setVideoProvider] = useState(null);

//   const [isSaved, setIsSaved] = useState(false);

//   const [toastMsg, setToastMsg] = useState("");
//   const [toastType, setToastType] = useState("error");

//   const fileRef = useRef(null);
//   const thumbRef = useRef(null);

//   /* ---------------- UPLOAD VIDEO ---------------- */
//   const uploadPromo = async (file) => {
//     if (!file || isSaved) return;

//     if (!courseId) {
//       setToastType("error");
//       setToastMsg("Course must be created first");
//       return;
//     }

//     try {
//       setToastMsg("");
//       setUploading(true);
//       setProgress(0);
//       setVideoName(file.name);

//       const { uploadUrl, videoAssetId, provider } =
//         await initiateVideoUpload({
//           purpose: "PROMO",
//           size: file.size,
//         });

//       await uploadToVimeo(uploadUrl, file, setProgress);

//       setVideoAssetId(videoAssetId);
//       setVideoProvider(provider);
//     } catch {
//       setToastType("error");
//       setToastMsg("Video upload failed");
//     } finally {
//       setUploading(false);
//     }
//   };

//   /* ---------------- SAVE PROMO ---------------- */
//   const handleSave = async () => {
//     if (!title.trim()) {
//       setToastType("error");
//       setToastMsg("Title is required");
//       return;
//     }

//     if (!videoAssetId) {
//       setToastType("error");
//       setToastMsg("Promo video is required");
//       return;
//     }

//     try {
//       setToastMsg("");
//       setSaving(true);

//       await axiosInstance.post("/promos", {
//         title,
//         description,
//         videoAssetId,
//         videoProvider,
//         imageUrl: thumbnailUrl || "",
//         courseId,
//         order: 0,
//       });

//       setIsSaved(true);
//       setToastType("success");
//       setToastMsg("Promo video saved successfully");
//     } catch {
//       setToastType("error");
//       setToastMsg("Failed to save promo video");
//     } finally {
//       setSaving(false);
//     }
//   };

//   const handleEdit = () => {
//     setIsSaved(false);
//     setToastType("success");
//     setToastMsg("Edit mode enabled");
//   };

//   const handleThumbnailUpload = async (file) => {
//     if (!file) return;
//     try {
//       const url = await uploadImageToCloudinary(file);
//       setThumbnailUrl(url);
//     } catch {
//       setToastType("error");
//       setToastMsg("Thumbnail upload failed");
//     }
//   };

//   return (
//     <div className="relative border border-gray-100 shadow-md rounded-lg p-4 sm:p-5 mb-4">

//       {/* HEADER */}
//       <div className="flex justify-between items-center">
//         <div className="flex items-center gap-2">
//           <span className="text-sm font-medium">
//             {title ? title : "Promo video"}
//           </span>
//           <FaPen className="text-gray-400" />
//         </div>

//         <button
//           onClick={() => setIsOpen(!isOpen)}
//           className="text-[26px] text-gray-400 hover:text-gray-700"
//         >
//           {isOpen ? <FaCircleMinus /> : <GoPlus />}
//         </button>
//       </div>

//       {/* COLLAPSED STATE → SHOW ONLY TITLE */}
//       {!isOpen && null}

//       {/* EXPANDED STATE */}
//       {isOpen && (
//         <>
//           <div className="border-b mt-2 mb-4" />

//           {/* TOAST */}
//           {toastMsg && (
//             <div
//               className={`absolute top-[70px] left-6 px-4 py-2 rounded-md text-sm shadow ${toastType === "success"
//                   ? "bg-green-50 text-green-700 border border-green-200"
//                   : "bg-red-50 text-red-600 border border-red-200"
//                 }`}
//             >
//               {toastMsg}
//             </div>
//           )}

//           <div className="flex justify-between gap-6">
//             {/* LEFT */}
//             <div className="flex-1">
//               <div className="flex gap-4 mb-6">
//                 <input
//                   disabled={isSaved}
//                   value={title}
//                   onChange={(e) => setTitle(e.target.value)}
//                   placeholder="Title of the video"
//                   className="border rounded-lg px-4 py-2 w-[250px]"
//                 />
//                 <input
//                   disabled={isSaved}
//                   value={description}
//                   onChange={(e) => setDescription(e.target.value)}
//                   placeholder="Short description"
//                   className="border rounded-lg px-4 py-2 flex-1"
//                 />
//               </div>

//               <div className="flex gap-6 items-start">
//                 <div className="flex gap-2 items-start">
//                   <div className="w-24 h-20 border rounded flex items-center justify-center text-xs text-gray-400">
//                     {videoName ? "Video" : "No Video"}
//                   </div>

//                   <div>
//                     <p className="text-sm truncate max-w-[180px]">
//                       {videoName || "promo-video.mp4"}
//                     </p>

//                     <button
//                       disabled={uploading || isSaved}
//                       onClick={() => fileRef.current.click()}
//                       className="text-sm mt-4 disabled:opacity-50"
//                     >
//                       + Upload Video
//                     </button>

//                     <input
//                       ref={fileRef}
//                       type="file"
//                       accept="video/*"
//                       hidden
//                       onChange={(e) => uploadPromo(e.target.files[0])}
//                     />
//                   </div>
//                 </div>

//                 {/* Progress */}
//                 <div className="flex-1 text-sm text-gray-600">
//                   <p className="mb-1">Upload status</p>

//                   <div className="relative w-full h-6">
//                     <div className="absolute w-full h-[2px] bg-gray-300 top-1/2" />
//                     <div
//                       className="absolute h-[2px] bg-green-400 top-1/2"
//                       style={{ width: `${progress}%` }}
//                     />
//                   </div>

//                   <div className="flex justify-between mt-2 text-gray-800">
//                     <button disabled className="flex items-center gap-1 text-sm">
//                       <TbZoomReplace /> Replace Video
//                     </button>
//                     <button disabled className="flex items-center gap-1 text-sm">
//                       <HiMiniMinus /> Remove Video
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* RIGHT */}
//             <div>
//               <label className="cursor-pointer">
//                 <div className="w-40 h-28 bg-gray-300 rounded-lg overflow-hidden relative">
//                   <img
//                     src={thumbnailUrl || "/profile.png"}
//                     className="w-full h-full object-cover"
//                   />
//                   <span className="absolute inset-0 flex items-center justify-center text-xs text-white bg-black/40">
//                     Upload Thumbnail
//                   </span>
//                 </div>
//                 <input
//                   ref={thumbRef}
//                   type="file"
//                   accept="image/*"
//                   hidden
//                   disabled={isSaved}
//                   onChange={(e) =>
//                     handleThumbnailUpload(e.target.files[0])
//                   }
//                 />
//               </label>
//             </div>
//           </div>

//           {/* ACTION BUTTONS */}
//           <div className="flex justify-end gap-4 mt-6">
//             <button
//               onClick={handleEdit}
//               disabled={!isSaved}
//               className="flex items-center px-5 py-2 border-2 border-[#1F304A] rounded-xl text-sm disabled:opacity-50"
//             >
//               <FaPen /> Edit
//             </button>

//             <button
//               onClick={handleSave}
//               disabled={saving || isSaved}
//               className="px-8 py-2 bg-[#1F304A] text-white rounded-xl disabled:opacity-60"
//             >
//               {saving ? "Saving..." : "Save"}
//             </button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }
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
  const [saving, setSaving] = useState(false);
  const [progress, setProgress] = useState(0);

  const [videoName, setVideoName] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [videoAssetId, setVideoAssetId] = useState(null);
  const [videoProvider, setVideoProvider] = useState(null);

  const [isSaved, setIsSaved] = useState(false);

  const [toastMsg, setToastMsg] = useState("");
  const [toastType, setToastType] = useState("error");

  const fileRef = useRef(null);
  const thumbRef = useRef(null);

  /* ---------------- UPLOAD VIDEO ---------------- */
  const uploadPromo = async (file) => {
    if (!file || isSaved) return;

    if (!courseId) {
      setToastType("error");
      setToastMsg("Course must be created first");
      return;
    }

    try {
      setToastMsg("");
      setUploading(true);
      setProgress(0);
      setVideoName(file.name);

      const { uploadUrl, videoAssetId, provider } =
        await initiateVideoUpload({
          purpose: "PROMO",
          size: file.size,
        });

      await uploadToVimeo(uploadUrl, file, setProgress);

      setVideoAssetId(videoAssetId);
      setVideoProvider(provider);
    } catch {
      setToastType("error");
      setToastMsg("Video upload failed");
    } finally {
      setUploading(false);
    }
  };

  /* ---------------- SAVE PROMO ---------------- */
  const handleSave = async () => {
    if (!title.trim()) {
      setToastType("error");
      setToastMsg("Title is required");
      return;
    }

    if (!videoAssetId) {
      setToastType("error");
      setToastMsg("Promo video is required");
      return;
    }

    try {
      setToastMsg("");
      setSaving(true);

      await axiosInstance.post("/promos", {
        title: title.trim(),
        description: description.trim(),
        videoAssetId,
        videoProvider,
        imageUrl: thumbnailUrl || "",
        courseId,
        order: 0,
      });

      setIsSaved(true);
      setToastType("success");
      setToastMsg("Promo video saved successfully");
    } catch {
      setToastType("error");
      setToastMsg("Failed to save promo video");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = () => {
    setIsSaved(false);
    setToastType("success");
    setToastMsg("Edit mode enabled");
  };

  const handleThumbnailUpload = async (file) => {
    if (!file) return;
    try {
      const url = await uploadImageToCloudinary(file);
      setThumbnailUrl(url);
    } catch {
      setToastType("error");
      setToastMsg("Thumbnail upload failed");
    }
  };

  return (
    <div className="relative border border-gray-100 shadow-md rounded-lg p-4 sm:p-5 mb-4">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">
            {title ? title : "Promo video"}
          </span>
          <FaPen className="text-gray-400" />
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-[26px] text-gray-400 hover:text-gray-700"
        >
          {isOpen ? <FaCircleMinus /> : <GoPlus />}
        </button>
      </div>

      {!isOpen && null}

      {isOpen && (
        <>
          <div className="border-b mt-2 mb-4" />

          {toastMsg && (
            <div
              className={`absolute top-[70px] left-6 px-4 py-2 rounded-md text-sm shadow ${
                toastType === "success"
                  ? "bg-green-50 text-green-700 border border-green-200"
                  : "bg-red-50 text-red-600 border border-red-200"
              }`}
            >
              {toastMsg}
            </div>
          )}

          <div className="flex justify-between gap-6">
            {/* LEFT */}
            <div className="flex-1">
              <div className="flex gap-4 mb-6">
                {/* Title - max 40 */}
                <input
                  disabled={isSaved}
                  value={title}
                  maxLength={40}
                  onChange={(e) =>
                    setTitle(e.target.value.slice(0, 40))
                  }
                  placeholder="Title of the video"
                  className="border rounded-lg px-4 py-2 w-[250px]"
                />

                {/* Description - max 100 */}
                <input
                  disabled={isSaved}
                  value={description}
                  maxLength={100}
                  onChange={(e) =>
                    setDescription(e.target.value.slice(0, 100))
                  }
                  placeholder="Short description"
                  className="border rounded-lg px-4 py-2 flex-1"
                />
              </div>

              <div className="flex gap-6 items-start">
                <div className="flex gap-2 items-start">
                  <div className="w-24 h-20 border rounded flex items-center justify-center text-xs text-gray-400">
                    {videoName ? "Video" : "No Video"}
                  </div>

                  <div>
                    <p className="text-sm truncate max-w-[180px]">
                      {videoName || "promo-video.mp4"}
                    </p>

                    <button
                      disabled={uploading || isSaved}
                      onClick={() => fileRef.current.click()}
                      className="text-sm mt-4 disabled:opacity-50"
                    >
                      + Upload Video
                    </button>

                    <input
                      ref={fileRef}
                      type="file"
                      accept="video/*"
                      hidden
                      onChange={(e) =>
                        uploadPromo(e.target.files[0])
                      }
                    />
                  </div>
                </div>

                {/* Progress */}
                <div className="flex-1 text-sm text-gray-600">
                  <p className="mb-1">Upload status</p>

                  <div className="relative w-full h-6">
                    <div className="absolute w-full h-[2px] bg-gray-300 top-1/2" />
                    <div
                      className="absolute h-[2px] bg-green-400 top-1/2"
                      style={{ width: `${progress}%` }}
                    />
                  </div>

                  <div className="flex justify-between mt-2 text-gray-800">
                    <button disabled className="flex items-center gap-1 text-sm">
                      <TbZoomReplace /> Replace Video
                    </button>
                    <button disabled className="flex items-center gap-1 text-sm">
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
                  disabled={isSaved}
                  onChange={(e) =>
                    handleThumbnailUpload(e.target.files[0])
                  }
                />
              </label>
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex justify-end gap-4 mt-6">
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
