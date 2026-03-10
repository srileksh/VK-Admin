// "use client";
// import { useRef, useState } from "react";
// import { FaCircleMinus, FaPen } from "react-icons/fa6";
// import { GoPlus } from "react-icons/go";
// import { TbZoomReplace } from "react-icons/tb";
// import { HiMiniMinus } from "react-icons/hi2";
// import { GrGallery } from "react-icons/gr";
// import { Toaster, toast } from "react-hot-toast";
// import { MdOutlineFileUpload } from "react-icons/md";
// import { LiaSave } from "react-icons/lia";

// import useLessonStore from "@/store/useLessonStore";
// import { uploadImageToCloudinary } from "@/utils/cloudinaryImageUpload";

// export default function LessonSection({
//   sectionId,
//   title,
//   isOpen,
//   onToggle,
// }) {
//   const [lessons, setLessons] = useState([
//     {
//       id: Date.now(),
//       lessonTitle: "",
//       description: "",
//       videoName: "",
//       videoFile: null,

//       thumbnailFile: null,
//       thumbnailUrl: "",
//       videoUploaded: false,
//       isSaved: false,
//       saving: false,
//       errors: {},
//       backendId: null,
//     },
//   ]);

//   const [uploadingLessonId, setUploadingLessonId] = useState(null);
//   const [uploadingThumbnailId, setUploadingThumbnailId] = useState(null);

//   const fileRefs = useRef({});
//   const thumbnailRefs = useRef({});
//   const { uploadLessonVideo, updateLessonDetails, progress } =
//     useLessonStore();

//   const handleAddLesson = () => {
//     setLessons((prev) => [
//       ...prev,
//       {
//         id: Date.now(),
//         lessonTitle: "",
//         description: "",
//         videoName: "",
//         videoFile: null,
//         thumbnailFile: null,
//         thumbnailUrl: "",
//         videoUploaded: false,
//         isSaved: false,
//         saving: false,
//         errors: {},
//         backendId: null,
//       },
//     ]);
//   };

//   const handleUpdateLesson = (id, key, value) => {
//     setLessons((prev) =>
//       prev.map((l) =>
//         l.id === id
//           ? { ...l, [key]: value, errors: { ...l.errors, [key]: "" } }
//           : l
//       )
//     );
//   };

//   const isLessonComplete = (lesson) => {
//     return (
//       lesson.lessonTitle.trim() &&
//       lesson.description.trim() &&
//       lesson.videoUploaded
//     );
//   };
//   /* VIDEO SELECT */
//   const handleVideoSelect = (lesson, file) => {
//     if (!file) return;

//     setLessons((prev) =>
//       prev.map((l) =>
//         l.id === lesson.id
//           ? {
//             ...l,
//             videoFile: file,
//             videoName: file.name,
//             videoUploaded: false,
//           }
//           : l
//       )
//     );
//   };
//   // *******************

//   const getVideoDuration = (file) => {
//   return new Promise((resolve, reject) => {
//     const video = document.createElement("video");
//     video.preload = "metadata";

//     video.onloadedmetadata = () => {
//       window.URL.revokeObjectURL(video.src);
//       resolve(Math.floor(video.duration)); // seconds
//     };

//     video.onerror = () => {
//       reject("Failed to read video metadata");
//     };

//     video.src = URL.createObjectURL(file);
//   });
// };


//   const handleUploadVideo = async (lesson) => {
//   if (!lesson.videoFile || !sectionId) return;

//   const toastId = toast.loading("Uploading & creating lesson...");

//   try {
//     setUploadingLessonId(lesson.id);

//     // ✅ DEFINE duration BEFORE using it
//     const duration = await getVideoDuration(lesson.videoFile);

//     const createdLesson = await uploadLessonVideo(
//       lesson.videoFile,
//       sectionId,
//       {
//         title: lesson.lessonTitle || "Lesson video",
//         description: lesson.description || "Lesson description",
//         thumbnail: lesson.thumbnailUrl,
//         duration: duration, // ✅ now defined
//         order: 0,
//         isFree: false,
//       }
//     );

//     setLessons((prev) =>
//       prev.map((l) =>
//         l.id === lesson.id
//           ? {
//               ...l,
//               videoUploaded: true,
//               backendId: createdLesson.id,
//               isSaved: true,
//             }
//           : l
//       )
//     );

//     toast.success("Lesson created successfully", { id: toastId });
//   } catch (error) {
//     console.error(error);
//     toast.error("Video upload failed", { id: toastId });
//   } finally {
//     setUploadingLessonId(null);
//   }
// };

//   /* REMOVE VIDEO */
//   const handleRemoveVideo = (lesson) => {
//     // Note: If we remove video, we might want to delete lesson from backend too? A decision for another time.
//     // For now, just clear local state to allow re-upload?
//     // Given the flow, "Remove" probably just clears local selection if not uploaded,
//     // but if uploaded, it probably should delete from backend.
//     // The original code just cleared local state. I will keep it as is but warn.

//     setLessons((prev) =>
//       prev.map((l) =>
//         l.id === lesson.id
//           ? {
//             ...l,
//             videoFile: null,
//             videoName: "",
//             videoUploaded: false,
//             backendId: null, // Reset backend ID strictly speaking? Or allow replace?
//             // Ideally we'd delete from backend, but for now just reset UI.
//           }
//           : l
//       )
//     );
//   };

//   /* THUMBNAIL SELECT */
//   const handleThumbnailSelect = (lesson, file) => {
//     if (!file) return;

//     setLessons((prev) =>
//       prev.map((l) =>
//         l.id === lesson.id ? { ...l, thumbnailFile: file } : l
//       )
//     );
//   };

//   /* THUMBNAIL UPLOAD */
//   const handleUploadThumbnail = async (lesson) => {
//     if (!lesson.thumbnailFile) return;

//     const toastId = toast.loading("Uploading thumbnail...");

//     try {
//       setUploadingThumbnailId(lesson.id);

//       const url = await uploadImageToCloudinary(
//         lesson.thumbnailFile,
//         "LESSON_THUMBNAIL"
//       );

//       // Update local state
//       setLessons((prev) =>
//         prev.map((l) =>
//           l.id === lesson.id ? { ...l, thumbnailUrl: url } : l
//         )
//       );

//       // If lesson exists on backend, update it immediately
//       if (lesson.backendId) {
//         await updateLessonDetails(lesson.backendId, { thumbnail: url });
//         toast.success("Thumbnail updated!", { id: toastId });
//       } else {
//         toast.success("Thumbnail uploaded (save to persist)", { id: toastId });
//       }
//       return url;

//     } catch (error) {
//       console.error(error);
//       toast.error("Thumbnail upload failed", { id: toastId });
//       throw error;
//     } finally {
//       setUploadingThumbnailId(null);
//     }
//   };

//   /* SAVE (UPDATE) */
//   const handleSave = async (lesson) => {
//     if (!lesson.backendId) {
//       toast.error("Please upload video first to create the lesson.");
//       return;
//     }

//     const toastId = toast.loading("Saving lesson details...");
//     handleUpdateLesson(lesson.id, "saving", true);

//     try {
//       let currentThumbnailUrl = lesson.thumbnailUrl;

//       // 🔥 Auto-upload thumbnail if selected but not uploaded (and no URL)
//       if (lesson.thumbnailFile && !currentThumbnailUrl) {
//         try {
//           // Note: We can reuse the logic, but we need to be careful with toast conflicts.
//           // Reuse logic but manually call Cloudinary to avoid double toasts inside handleUploadThumbnail if we called it directly?
//           // Actually calling handleUploadThumbnail is fine, it just shows nested toasts which is okay-ish,
//           // OR we just inline the upload logic here. Better inline for cleaner UX here.

//           const url = await uploadImageToCloudinary(
//             lesson.thumbnailFile,
//             "LESSON_THUMBNAIL"
//           );
//           currentThumbnailUrl = url;

//           // Update state
//           setLessons((prev) =>
//             prev.map((l) =>
//               l.id === lesson.id ? { ...l, thumbnailUrl: url } : l
//             )
//           );
//         } catch (uploadErr) {
//           console.error("Auto-upload thumbnail failed", uploadErr);
//           toast.error("Failed to upload thumbnail");
//           // Continue? Or abort? Abort seems safer.
//           handleUpdateLesson(lesson.id, "saving", false);
//           return;
//         }
//       }

//       await updateLessonDetails(lesson.backendId, {
//         title: lesson.lessonTitle,
//         description: lesson.description,
//         thumbnail: currentThumbnailUrl,
//       });

//       handleUpdateLesson(lesson.id, "isSaved", true);
//       toast.success("Lesson saved successfully", { id: toastId });
//     } catch (error) {
//       console.error(error);
//       toast.error("Failed to save lesson", { id: toastId });
//     } finally {
//       handleUpdateLesson(lesson.id, "saving", false);
//     }
//   };

//   const handleEdit = (lesson) => {
//     handleUpdateLesson(lesson.id, "isSaved", false);
//   };


//   return (
//     <>
//       <Toaster position="top-center" reverseOrder={false} />

//       {/* SECTION HEADER (ONLY ONCE) */}
//       <div className="border border-gray-100 shadow-md rounded-lg p-4 sm:p-5 mb-4">
//         <div className="flex justify-between items-center border-b pb-2 mb-4">
//           <div className="flex items-center gap-2">
//             <span className="text-sm font-medium">{title}</span>
//             <FaPen className="text-gray-400" />
//           </div>

//           <button
//             onClick={onToggle}
//             className="text-[26px] text-gray-400"
//           >
//             {isOpen ? <FaCircleMinus /> : <GoPlus />}
//           </button>
//         </div>

//         {/* SECTION CONTENT */}
//         {isOpen && (
//           <>
//             {lessons.map((lesson) => (
//               <div key={lesson.id} className="mb-6">
//                 <label className="text-sm block mb-3">
//                   Video title
//                 </label>

//                 <div className="flex flex-col lg:flex-row gap-6">
//                   {/* LEFT SIDE */}
//                   <div className="flex-1">
//                     <div className="flex gap-4 mb-4">
//                       <input
//                         disabled={lesson.isSaved}
//                         className="border border-gray-400 px-4 py-2 rounded-lg w-[250px] outline-gray-400"
//                         placeholder="Title"
//                         value={lesson.lessonTitle}
//                         onChange={(e) =>
//                           handleUpdateLesson(
//                             lesson.id,
//                             "lessonTitle",
//                             e.target.value
//                           )
//                         }
//                       />

//                       <input
//                         disabled={lesson.isSaved}
//                         className="border border-gray-400 px-4 py-2 rounded-lg flex-1 outline-gray-400"
//                         placeholder="Description"
//                         value={lesson.description}
//                         onChange={(e) =>
//                           handleUpdateLesson(
//                             lesson.id,
//                             "description",
//                             e.target.value
//                           )
//                         }
//                       />
//                     </div>
//                                       {/* Video Section */}
//                   <div className="flex gap-6">
//                     <div className="flex gap-3">
//                       <div className="w-24 h-20 border border-gray-400 rounded flex items-center justify-center text-xs">
//                         <button
//                           onClick={() =>
//                             fileRefs.current[lesson.id].click()
//                           }
//                           disabled={lesson.isSaved}
//                         >
//                           {lesson.videoFile
//                             ? "Video Selected"
//                             : "Select Video"}
//                         </button>
//                       </div>

//                       <div>
//                         <p className="text-sm truncate max-w-[150px]">
//                           {lesson.videoName || "Lesson-video.mp4"}
//                         </p>

//                         <button
//                           onClick={() => handleUploadVideo(lesson)}
//                           className="text-sm mt-2 gap-[2px] text-[12px] border px-2.5 py-0.5 text-[#37af47] flex justify-center items-center gap-[2px] rounded-[14px] disabled:opacity-60"
//                           disabled={
//                             uploadingLessonId === lesson.id ||
//                             lesson.isSaved ||
//                             !lesson.videoFile ||
//                             lesson.videoUploaded
//                           }

//                         >
//                           <MdOutlineFileUpload/>

//                           {uploadingLessonId === lesson.id
//                             ? "Uploading..."
//                             : "Upload"}
//                         </button>

//                         <input
//                           ref={(el) => (fileRefs.current[lesson.id] = el)}
//                           type="file"
//                           hidden
//                           accept="video/*"
//                           onChange={(e) =>
//                             handleVideoSelect(lesson, e.target.files[0])
//                           }
//                         />
//                       </div>
//                     </div>

//                     {/* Upload Status Bar */}
//                     <div className="flex-1 text-sm">
//                       <p className="mb-1">Upload status</p>

//                       <div className="relative w-full h-6">
//                         <div className="absolute w-full h-[2px] bg-gray-300 top-1/2" />
//                         <div
//                           className="absolute h-[2px] bg-green-400 top-1/2"
//                           style={{
//                             width:
//                               uploadingLessonId === lesson.id
//                                 ? `${progress}%`
//                                 : lesson.videoUploaded
//                                   ? "100%"
//                                   : "0%",
//                           }}
//                         />
//                       </div>

//                       <div className="flex justify-between mt-2">
//                         <button
//                           onClick={() =>
//                             fileRefs.current[lesson.id].click()
//                           }
//                           disabled={
//                             !lesson.videoUploaded || lesson.isSaved
//                           }
//                           className="flex items-center gap-1 disabled:opacity-40"
//                         >
//                           <TbZoomReplace /> Replace
//                         </button>

//                         <button
//                           onClick={() => handleRemoveVideo(lesson)}
//                           disabled={
//                             !lesson.videoUploaded || lesson.isSaved
//                           }
//                           className="flex items-center gap-1 disabled:opacity-40"
//                         >
//                           <HiMiniMinus /> Remove
//                         </button>
//                       </div>
//                     </div>
//                   </div>

//                   </div>

//                   {/* THUMBNAIL */}
//                   <div className="flex flex-col items-center">
//                     <div 
//                     onClick={() =>
//                       !lesson.isSaved &&
//                       thumbnailRefs.current[lesson.id].click()
//                     }
//                     className="w-40 h-28 bg-gray-300 rounded flex items-center justify-center">
//                       {lesson.thumbnailUrl ? (
//                         <img
//                           src={lesson.thumbnailUrl}
//                           className="w-full h-full object-cover"
//                           alt="thumb"
//                         />
//                       ) : (
//                         <div className="text-center text-gray-600">
//                           <GrGallery size={22} className="mx-auto mb-1" />
//                           <p className="text-xs">No file selected</p>
//                         </div>
//                       )}
//                     </div>
//                                       <button
//                     onClick={() => handleUploadThumbnail(lesson)}
//                     disabled={
//                       !lesson.thumbnailFile ||
//                       lesson.isSaved ||
//                       uploadingThumbnailId === lesson.id ||
//                       (lesson.thumbnailUrl && !lesson.backendId)
//                     }
//                     className="text-center mt-2 text-[12px] border px-2.5 py-0.5 text-[#37af47]  rounded-[14px] disabled:opacity-60 flex justify-center items-center gap-[2px]"
//                   >
//                                     <MdOutlineFileUpload/>
                    
//                     {uploadingThumbnailId === lesson.id
//                       ? "Uploading..."
//                       : "Upload"}
//                   </button>

//                   <input
//                     ref={(el) =>
//                       (thumbnailRefs.current[lesson.id] = el)
//                     }
//                     type="file"
//                     hidden
//                     accept="image/*"
//                     onChange={(e) =>
//                       handleThumbnailSelect(
//                         lesson,
//                         e.target.files[0]
//                       )
//                     }
//                   />

//                   </div>
//                 </div>

//                 {/* ACTION BUTTONS */}
                
//                 <div className="flex justify-end gap-4 mt-6">
//                   <button
//                     disabled={!lesson.isSaved}
//                     className="flex items-center px-5 py-1.5 border shadow-[#37af47] shadow-2xl border-[#37af47] text-[#37af47] rounded-[12px] text-sm disabled:opacity-50"
//                   >
//                     Edit
//                   </button>

//                   <button
//                     disabled={
//                       lesson.saving ||
//                       lesson.isSaved ||
//                       !isLessonComplete(lesson)
//                     }
//                     className="px-4 border py-0.5 bg-[#37af47] text-white rounded-[12px] disabled:opacity-50 flex justify-center items-center gap-[2px]"
//                   >
//                     <LiaSave className="text-[22px]" />
//                     Save
//                   </button>
//                 </div>
//               </div>
//             ))}

//             <div className="flex justify-center mt-6">
//               <button
//                 onClick={handleAddLesson}
//                 className="text-[#CCCBCB] text-[18px] font-semibold border-b-2"
//               >
//                 + Add new video
//               </button>
//             </div>
//           </>
//         )}
//       </div>
//     </>
//   );
// }


"use client";
import { useRef, useState } from "react";
import { FaCircleMinus, FaPen } from "react-icons/fa6";
import { GoPlus } from "react-icons/go";
import { TbZoomReplace } from "react-icons/tb";
import { HiMiniMinus } from "react-icons/hi2";
import { GrGallery } from "react-icons/gr";
import { Toaster, toast } from "react-hot-toast";
import { MdOutlineFileUpload } from "react-icons/md";
import { LiaSave } from "react-icons/lia";

import useLessonStore from "@/store/useLessonStore";
import { uploadImageToCloudinary } from "@/utils/cloudinaryImageUpload";

export default function LessonSection({
  sectionId,
  title,
  isOpen,
  onToggle,
}) {
  const [lessons, setLessons] = useState([
    {
      id: Date.now(),
      lessonTitle: "",
      description: "",
      videoName: "",
      videoFile: null,

      thumbnailFile: null,
      thumbnailUrl: "",
      videoUploaded: false,
      isSaved: false,
      saving: false,
      errors: {},
      backendId: null,
    },
  ]);

  const [uploadingLessonId, setUploadingLessonId] = useState(null);
  const [uploadingThumbnailId, setUploadingThumbnailId] = useState(null);

  const fileRefs = useRef({});
  const thumbnailRefs = useRef({});
  const { uploadLessonVideo,
    createLessonAction, 
    updateLessonDetails, 
    progress, 
  } =
    useLessonStore();

  const handleAddLesson = () => {
    setLessons((prev) => [
      ...prev,
      {
        id: Date.now(),
        lessonTitle: "",
        description: "",
        videoName: "",
        videoFile: null,
          videoAssetId: null,

        thumbnailFile: null,
        thumbnailUrl: "",
        videoUploaded: false,
        isSaved: false,
        saving: false,
        errors: {},
        backendId: null,
      },
    ]);
  };

  const handleUpdateLesson = (id, key, value) => {
    setLessons((prev) =>
      prev.map((l) =>
        l.id === id
          ? { ...l, [key]: value, errors: { ...l.errors, [key]: "" } }
          : l
      )
    );
  };

  const isLessonComplete = (lesson) => {
    return (
      lesson.lessonTitle.trim() &&
      lesson.description.trim() &&
      lesson.videoUploaded
    );
  };
  /* VIDEO SELECT */
  const handleVideoSelect = (lesson, file) => {
    if (!file) return;

    setLessons((prev) =>
      prev.map((l) =>
        l.id === lesson.id
          ? {
            ...l,
            videoFile: file,
            videoName: file.name,
            videoUploaded: false,
          }
          : l
      )
    );
  };
  // *******************

  const getVideoDuration = (file) => {
  return new Promise((resolve, reject) => {
    const video = document.createElement("video");
    video.preload = "metadata";

    video.onloadedmetadata = () => {
      window.URL.revokeObjectURL(video.src);
      resolve(Math.floor(video.duration)); // seconds
    };

    video.onerror = () => {
      reject("Failed to read video metadata");
    };

    video.src = URL.createObjectURL(file);
  });
};


  const handleUploadVideo = async (lesson) => {
  if (!lesson.videoFile) return;

  const toastId = toast.loading("Uploading video...");

  try {
    setUploadingLessonId(lesson.id);

    const { videoAssetId } = await uploadLessonVideo(
      lesson.videoFile
    );

    setLessons((prev) =>
      prev.map((l) =>
        l.id === lesson.id
          ? {
              ...l,
              videoUploaded: true,
              videoAssetId: videoAssetId,

            }
          : l
      )
    );

    toast.success("Video uploaded", { id: toastId });
  } catch (error) {
    console.error(error);
    toast.error("Video upload failed", { id: toastId });
  } finally {
    setUploadingLessonId(null);
  }
};


  /* THUMBNAIL SELECT */
  const handleThumbnailSelect = (lesson, file) => {
    if (!file) return;

    setLessons((prev) =>
      prev.map((l) =>
        l.id === lesson.id ? { ...l, thumbnailFile: file } : l
      )
    );
  };

  /* THUMBNAIL UPLOAD */
  const handleUploadThumbnail = async (lesson) => {
    if (!lesson.thumbnailFile) return;

    const toastId = toast.loading("Uploading thumbnail...");

    try {
      setUploadingThumbnailId(lesson.id);

      const url = await uploadImageToCloudinary(
        lesson.thumbnailFile,
        "LESSON_THUMBNAIL"
      );

      // Update local state
      setLessons((prev) =>
        prev.map((l) =>
          l.id === lesson.id ? { ...l, thumbnailUrl: url } : l
        )
      );

      // If lesson exists on backend, update it immediately
      if (lesson.backendId) {
        await updateLessonDetails(lesson.backendId, { thumbnail: url });
        toast.success("Thumbnail updated!", { id: toastId });
      } else {
        toast.success("Thumbnail uploaded (save to persist)", { id: toastId });
      }
      return url;

    } catch (error) {
      console.error(error);
      toast.error("Thumbnail upload failed", { id: toastId });
      throw error;
    } finally {
      setUploadingThumbnailId(null);
    }
  };

  /* SAVE (UPDATE) */
  const handleSave = async (lesson) => {

    const toastId = toast.loading("Saving lesson...");
    handleUpdateLesson(lesson.id, "saving", true);

    try {
          if (!lesson.videoAssetId) {
      toast.error("Upload video first");
      return;
    }
    const duration = await getVideoDuration(lesson.videoFile);

      let currentThumbnailUrl = lesson.thumbnailUrl;

      // 🔥 Auto-upload thumbnail if selected but not uploaded (and no URL)
      if (lesson.thumbnailFile && !currentThumbnailUrl) {

          const url = await uploadImageToCloudinary(
            lesson.thumbnailFile,
            "LESSON_THUMBNAIL"
          );
          currentThumbnailUrl = url;

          // Update state
          setLessons((prev) =>
            prev.map((l) =>
              l.id === lesson.id ? { ...l, thumbnailUrl: url } : l
            )
          );
        } 
            /* CREATE LESSON */
    const createdLesson = await createLessonAction({
      sectionId,
      videoAssetId: lesson.videoAssetId,
      title: lesson.lessonTitle,
      description: lesson.description,
      thumbnail: currentThumbnailUrl,
      duration: duration,
      order: 0,
      isFree: false,
    });

    setLessons((prev) =>
      prev.map((l) =>
        l.id === lesson.id
          ? {
              ...l,
              backendId: createdLesson.id,
              isSaved: true,
            }
          : l
      )
    );

    toast.success("Lesson created successfully", { id: toastId });

  } catch (error) {
    console.error(error);
    toast.error("Failed to save lesson", { id: toastId });
  } finally {
    handleUpdateLesson(lesson.id, "saving", false);
  }
};
const handleEdit = (lesson) => {
  setLessons((prev) =>
    prev.map((l) =>
      l.id === lesson.id
        ? { ...l, isSaved: false }
        : l
    )
  );
};

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />

      {/* SECTION HEADER (ONLY ONCE) */}
      <div className="border border-gray-100 shadow-md rounded-lg p-4 sm:p-5 mb-4">
        <div className="flex justify-between items-center border-b pb-2 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">{title}</span>
            <FaPen className="text-gray-400" />
          </div>

          <button
            onClick={onToggle}
            className="text-[26px] text-gray-400"
          >
            {isOpen ? <FaCircleMinus /> : <GoPlus />}
          </button>
        </div>

        {/* SECTION CONTENT */}
        {isOpen && (
          <>
            {lessons.map((lesson) => (
              <div key={lesson.id} className="mb-6">
                <label className="text-sm block mb-3">
                  Video title
                </label>

                <div className="flex flex-col lg:flex-row gap-6">
                  {/* LEFT SIDE */}
                  <div className="flex-1">
                    <div className="flex gap-4 mb-4">
                      <input
                        disabled={lesson.isSaved}
                        className="border border-gray-400 px-4 py-2 rounded-lg w-[250px] outline-gray-400"
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
                        className="border border-gray-400 px-4 py-2 rounded-lg flex-1 outline-gray-400"
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
                                      {/* Video Section */}
                  <div className="flex gap-6">
                    <div className="flex gap-3">
                      <div className="w-24 h-20 border border-gray-400 rounded flex items-center justify-center text-xs">
                        <button
                          onClick={() =>
                            fileRefs.current[lesson.id].click()
                          }
                          disabled={lesson.isSaved}
                        >
                          {lesson.videoFile
                            ? "Video Selected"
                            : "Select Video"}
                        </button>
                      </div>

                      <div>
                        <p className="text-sm truncate max-w-[150px]">
                          {lesson.videoName || "Lesson-video.mp4"}
                        </p>

                        <button
                          onClick={() => handleUploadVideo(lesson)}
                          className="text-sm mt-2 gap-[2px] text-[12px] border px-2.5 py-0.5 text-[#37af47] flex justify-center items-center gap-[2px] rounded-[14px] disabled:opacity-60"
                          disabled={
                            uploadingLessonId === lesson.id ||
                            lesson.isSaved ||
                            !lesson.videoFile ||
                            lesson.videoUploaded
                          }

                        >
                          <MdOutlineFileUpload/>

                          {uploadingLessonId === lesson.id
                            ? "Uploading..."
                            : "Upload"}
                        </button>

                        <input
                          ref={(el) => (fileRefs.current[lesson.id] = el)}
                          type="file"
                          hidden
                          accept="video/*"
                          onChange={(e) =>
                            handleVideoSelect(lesson, e.target.files[0])
                          }
                        />
                      </div>
                    </div>

                    {/* Upload Status Bar */}
                    <div className="flex-1 text-sm">
                      <p className="mb-1">Upload status</p>

                      <div className="relative w-full h-6">
                        <div className="absolute w-full h-[2px] bg-gray-300 top-1/2" />
                        <div
                          className="absolute h-[2px] bg-green-400 top-1/2"
                          style={{
                            width:
                              uploadingLessonId === lesson.id
                                ? `${progress}%`
                                : lesson.videoUploaded
                                  ? "100%"
                                  : "0%",
                          }}
                        />
                      </div>

                      <div className="flex justify-between mt-2">
                        <button
                          onClick={() =>
                            fileRefs.current[lesson.id].click()
                          }
                          disabled={
                            !lesson.videoUploaded || lesson.isSaved
                          }
                          className="flex items-center gap-1 disabled:opacity-40"
                        >
                          <TbZoomReplace /> Replace
                        </button>

                        <button
                          onClick={() => handleRemoveVideo(lesson)}
                          disabled={
                            !lesson.videoUploaded || lesson.isSaved
                          }
                          className="flex items-center gap-1 disabled:opacity-40"
                        >
                          <HiMiniMinus /> Remove
                        </button>
                      </div>
                    </div>
                  </div>

                  </div>

                  {/* THUMBNAIL */}
                  <div className="flex flex-col items-center">
                    <div 
                    onClick={() =>
                      !lesson.isSaved &&
                      thumbnailRefs.current[lesson.id].click()
                    }
                    className="w-40 h-28 bg-gray-300 rounded flex items-center justify-center">
                      {lesson.thumbnailUrl ? (
                        <img
                          src={lesson.thumbnailUrl}
                          className="w-full h-full object-cover"
                          alt="thumb"
                        />
                      ) : (
                        <div className="text-center text-gray-600">
                          <GrGallery size={22} className="mx-auto mb-1" />
                          <p className="text-xs">No file selected</p>
                        </div>
                      )}
                    </div>
                                      <button
                    onClick={() => handleUploadThumbnail(lesson)}
                    disabled={
                      !lesson.thumbnailFile ||
                      lesson.isSaved ||
                      uploadingThumbnailId === lesson.id ||
                      (lesson.thumbnailUrl && !lesson.backendId)
                    }
                    className="text-center mt-2 text-[12px] border px-2.5 py-0.5 text-[#37af47]  rounded-[14px] disabled:opacity-60 flex justify-center items-center gap-[2px]"
                  >
                                    <MdOutlineFileUpload/>
                    
                    {uploadingThumbnailId === lesson.id
                      ? "Uploading..."
                      : "Upload"}
                  </button>

                  <input
                    ref={(el) =>
                      (thumbnailRefs.current[lesson.id] = el)
                    }
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={(e) =>
                      handleThumbnailSelect(
                        lesson,
                        e.target.files[0]
                      )
                    }
                  />

                  </div>
                </div>

                {/* ACTION BUTTONS */}
                
                <div className="flex justify-end gap-4 mt-6">
                  <button
                    onClick={() => handleEdit(lesson)}

                    disabled={!lesson.isSaved}
                    className="flex items-center px-5 py-1.5 border shadow-[#37af47] shadow-2xl border-[#37af47] text-[#37af47] rounded-[12px] text-sm disabled:opacity-50"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleSave(lesson)}

                    disabled={
                      lesson.saving ||
                      lesson.isSaved ||
                      !isLessonComplete(lesson)
                    }
                    className="px-4 border py-0.5 bg-[#37af47] text-white rounded-[12px] disabled:opacity-50 flex justify-center items-center gap-[2px]"
                  >
                    <LiaSave className="text-[22px]" />
                    Save
                  </button>
                </div>
              </div>
            ))}

            <div className="flex justify-center mt-6">
              <button
                onClick={handleAddLesson}
                className="text-[#CCCBCB] text-[18px] font-semibold border-b-2"
              >
                + Add new video
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}


