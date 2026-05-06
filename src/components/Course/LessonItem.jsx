"use client";
import { useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { GrGallery } from "react-icons/gr";
import { MdOutlineFileUpload, MdDeleteOutline } from "react-icons/md";
import { LiaSave } from "react-icons/lia";
import useLessonStore from "@/store/useLessonStore";
import { uploadImageToCloudinary } from "@/utils/cloudinaryImageUpload";

export default function LessonItem({
  sectionId,
  lesson,
  onUpdateLesson,
  onReplaceLesson,
  onDeleteLesson,
}) {
  const [uploadingVideo, setUploadingVideo] = useState(false);
  const [uploadingThumbnail, setUploadingThumbnail] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const fileRef = useRef(null);
  const thumbnailRef = useRef(null);

  // const {
  //   uploadLessonVideo,
  //   createLessonAction,
  //   updateLessonAction,
  //   removeLesson,
  //   progress,
  // } = useLessonStore();
  // const {
  //   uploadLessonVideo,
  //   checkLessonVideoStatus,
  //   createLessonAction,
  //   updateLessonAction,
  //   removeLesson,
  //   progress,
  // } = useLessonStore();
  const {
    uploadLessonVideo,
    checkLessonVideoStatus,
    createLessonAction,
    updateLessonAction,
    removeLesson,
    progress,
  } = useLessonStore();
  // const isLessonComplete = (lesson) => {
  //   return (
  //     lesson.lessonTitle.trim() &&
  //     lesson.description.trim() &&
  //     lesson.videoUploaded
  //   );
  // };

  // const isLessonComplete = (lesson) => {
  //   return (
  //     lesson.lessonTitle.trim() &&
  //     lesson.description.trim() &&
  //     lesson.videoUploaded &&
  //     lesson.videoStatus === "READY"
  //   );
  // };

  const isLessonComplete = (lesson) => {
    return (
      lesson.lessonTitle.trim() &&
      lesson.description.trim() &&
      lesson.videoUploaded &&
      lesson.videoStatus === "READY"
    );
  };

  const handleVideoSelect = (file) => {
    if (!file) return;

    onReplaceLesson(lesson.id, {
      videoFile: file,
      videoName: file.name,
      videoUploaded: false,
    });
  };

  const getVideoDuration = (file) => {
    return new Promise((resolve, reject) => {
      const video = document.createElement("video");
      video.preload = "metadata";

      video.onloadedmetadata = () => {
        window.URL.revokeObjectURL(video.src);
        resolve(Math.floor(video.duration));
      };

      video.onerror = () => reject("Failed to read video metadata");
      video.src = URL.createObjectURL(file);
    });
  };



  // const handleUploadVideo = async () => {
  //   if (!lesson.videoFile) return;

  //   const toastId = toast.loading("Uploading video...");

  //   try {
  //     setUploadingVideo(true);

  //     const { videoAssetId } = await uploadLessonVideo(lesson.videoFile);

  //     onReplaceLesson(lesson.id, {
  //       videoUploaded: true,
  //       videoAssetId,
  //     });

  //     toast.success("Video uploaded", { id: toastId });
  //   } catch (error) {
  //     console.error(error);
  //     toast.error("Video upload failed", { id: toastId });
  //   } finally {
  //     setUploadingVideo(false);
  //   }
  // };

  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const pollLessonVideoStatusUntilReady = async (videoAssetId) => {
    if (!videoAssetId) return null;

    const maxAttempts = 60;
    const intervalMs = 5000;

    onReplaceLesson(lesson.id, {
      videoStatus: "PROCESSING",
      pollingStatus: true,
      videoUploaded: false,
    });

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        const status = await checkLessonVideoStatus(videoAssetId);

        onReplaceLesson(lesson.id, {
          videoStatus: status,
        });

        if (status === "READY") {
          onReplaceLesson(lesson.id, {
            videoStatus: "READY",
            pollingStatus: false,
            videoUploaded: true,
          });

          toast.success("Lesson video is ready");
          return "READY";
        }

        await wait(intervalMs);
      } catch (error) {
        console.error("Lesson video status polling failed:", error);

        onReplaceLesson(lesson.id, {
          pollingStatus: false,
        });

        toast.error("Failed to check lesson video status");
        return null;
      }
    }

    onReplaceLesson(lesson.id, {
      pollingStatus: false,
    });

    toast.error("Video is still processing. Please check again later.");
    return null;
  };

  // const handleUploadVideo = async () => {
  //   if (!lesson.videoFile) return;

  //   const toastId = toast.loading("Uploading video...");

  //   try {
  //     setUploadingVideo(true);

  //     const { videoAssetId } = await uploadLessonVideo(lesson.videoFile);

  //     onReplaceLesson(lesson.id, {
  //       videoAssetId,
  //       videoUploaded: false,
  //       videoStatus: "PROCESSING",
  //       pollingStatus: true,
  //     });

  //     toast.success("Video uploaded. Processing started.", { id: toastId });

  //     await pollLessonVideoStatusUntilReady(videoAssetId);
  //   } catch (error) {
  //     console.error(error);

  //     onReplaceLesson(lesson.id, {
  //       pollingStatus: false,
  //       videoStatus: null,
  //     });

  //     toast.error("Video upload failed", { id: toastId });
  //   } finally {
  //     setUploadingVideo(false);
  //   }
  // };

  const handleUploadVideo = async () => {
    if (!lesson.videoFile) return;

    const toastId = toast.loading("Uploading video...");

    try {
      setUploadingVideo(true);

      onReplaceLesson(lesson.id, {
        uploadingVideo: true,
        videoStatus: null,
        pollingStatus: false,
        videoUploaded: false,
      });

      const { videoAssetId } = await uploadLessonVideo(lesson.videoFile);

      onReplaceLesson(lesson.id, {
        videoAssetId,
        videoUploaded: false,
        videoStatus: "PROCESSING",
        pollingStatus: true,
      });

      toast.success("Video uploaded. Processing started.", { id: toastId });

      await pollLessonVideoStatusUntilReady(videoAssetId);
    } catch (error) {
      console.error(error);

      onReplaceLesson(lesson.id, {
        uploadingVideo: false,
        pollingStatus: false,
        videoStatus: null,
        videoUploaded: false,
      });

      toast.error("Video upload failed", { id: toastId });
    } finally {
      setUploadingVideo(false);

      onReplaceLesson(lesson.id, {
        uploadingVideo: false,
      });
    }
  };

  const handleThumbnailSelect = (file) => {
    if (!file) return;

    onReplaceLesson(lesson.id, {
      thumbnailFile: file,
    });
  };

  const handleUploadThumbnail = async () => {
    if (!lesson.thumbnailFile) return;

    const toastId = toast.loading("Uploading thumbnail...");

    try {
      setUploadingThumbnail(true);

      const url = await uploadImageToCloudinary(
        lesson.thumbnailFile,
        "LESSON_THUMBNAIL",
      );

      onReplaceLesson(lesson.id, {
        thumbnailUrl: url,
      });

      if (lesson.backendId) {
        await updateLessonAction(lesson.backendId, { thumbnail: url });
        toast.success("Thumbnail updated!", { id: toastId });
      } else {
        toast.success("Thumbnail uploaded (save to persist)", { id: toastId });
      }
    } catch (error) {
      console.error(error);
      toast.error("Thumbnail upload failed", { id: toastId });
    } finally {
      setUploadingThumbnail(false);
    }
  };

  const handleSave = async () => {
    const toastId = toast.loading(
      lesson.backendId ? "Updating lesson..." : "Saving lesson...",
    );

    onUpdateLesson(lesson.id, "saving", true);

    try {
      if (!lesson.videoAssetId) {
        toast.error("Upload video first", { id: toastId });
        return;
      }
      const latestStatus = await checkLessonVideoStatus(lesson.videoAssetId);

      onReplaceLesson(lesson.id, {
        videoStatus: latestStatus,
        videoUploaded: latestStatus === "READY",
      });

      if (latestStatus !== "READY") {
        toast.error("Video is not ready yet. Please wait for processing.", {
          id: toastId,
        });
        return;
      }

      const duration = lesson.videoFile
        ? await getVideoDuration(lesson.videoFile)
        : lesson.duration || 0;

      let currentThumbnailUrl = lesson.thumbnailUrl;

      if (lesson.thumbnailFile && !currentThumbnailUrl) {
        const url = await uploadImageToCloudinary(
          lesson.thumbnailFile,
          "LESSON_THUMBNAIL",
        );
        currentThumbnailUrl = url;

        onReplaceLesson(lesson.id, {
          thumbnailUrl: url,
        });
      }

      const payload = {
        sectionId,
        videoAssetId: lesson.videoAssetId,
        title: lesson.lessonTitle,
        description: lesson.description,
        thumbnail: currentThumbnailUrl,
        duration,
        order: 0,
        isFree: false,
      };

      if (lesson.backendId) {
        const updatedLesson = await updateLessonAction(
          lesson.backendId,
          payload,
        );

        onReplaceLesson(lesson.id, {
          backendId: updatedLesson.id || lesson.backendId,
          isSaved: true,
          duration,
        });

        toast.success("Lesson updated successfully", { id: toastId });
      } else {
        const createdLesson = await createLessonAction(payload);

        onReplaceLesson(lesson.id, {
          backendId: createdLesson.id,
          isSaved: true,
          duration,
        });

        toast.success("Lesson created successfully", { id: toastId });
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to save lesson", { id: toastId });
    } finally {
      onUpdateLesson(lesson.id, "saving", false);
    }
  };

  const handleEdit = () => {
    onReplaceLesson(lesson.id, {
      isSaved: false,
    });
  };

  const handleDelete = async () => {
    try {
      setDeleting(true);

      if (lesson.backendId) {
        await removeLesson(lesson.backendId);
      }

      onDeleteLesson(lesson.id);
      toast.success("Lesson deleted");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete lesson");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="mb-6">
      <label className="text-sm block mb-3">Video title</label>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1">
          <div className="flex gap-4 mb-4">
            <input
              disabled={lesson.isSaved}
              className="border border-gray-400 px-4 py-2 rounded-lg w-[250px] outline-gray-400"
              placeholder="Title"
              value={lesson.lessonTitle}
              onChange={(e) =>
                onUpdateLesson(lesson.id, "lessonTitle", e.target.value)
              }
            />

            <input
              disabled={lesson.isSaved}
              className="border border-gray-400 px-4 py-2 rounded-lg flex-1 outline-gray-400"
              placeholder="Description"
              value={lesson.description}
              onChange={(e) =>
                onUpdateLesson(lesson.id, "description", e.target.value)
              }
            />
          </div>

          <div className="flex gap-6">
            <div className="flex gap-3">
              <div className="w-24 h-20 border border-gray-400 rounded flex items-center justify-center text-xs">
                <button
                  onClick={() => fileRef.current?.click()}
                  disabled={lesson.isSaved}
                >
                  {lesson.videoFile ? "Video Selected" : "Select Video"}
                </button>
              </div>

              <div>
                <p className="text-sm truncate max-w-[150px]">
                  {lesson.videoName || "Lesson-video.mp4"}
                </p>

                <button
                  onClick={handleUploadVideo}
                  className="text-sm mt-2 text-[12px] border px-2.5 py-0.5 text-[#37af47] flex justify-center items-center gap-[2px] rounded-[14px] disabled:opacity-60"
                  // disabled={
                  //   uploadingVideo ||
                  //   lesson.isSaved ||
                  //   !lesson.videoFile ||
                  //   lesson.videoUploaded
                  // }

                  disabled={
                    uploadingVideo ||
                    lesson.uploadingVideo ||
                    lesson.pollingStatus ||
                    lesson.isSaved ||
                    !lesson.videoFile ||
                    lesson.videoUploaded
                  }
                >
                  <MdOutlineFileUpload />
                  {uploadingVideo ? "Uploading..." : "Upload"}
                </button>

                <input
                  ref={fileRef}
                  type="file"
                  hidden
                  accept="video/*"
                  onChange={(e) => handleVideoSelect(e.target.files[0])}
                />
              </div>
            </div>

            <div className="flex-1 text-sm">
              <p className="mb-1">Upload status</p>

              <div className="relative w-full h-6">
                <div className="absolute w-full h-[2px] bg-gray-300 top-1/2" />
                <div
                  className="absolute h-[2px] bg-green-400 top-1/2"
                  style={{
                    width: uploadingVideo
                      ? `${progress}%`
                      : lesson.videoUploaded
                        ? "100%"
                        : "0%",
                  }}
                />
                <div className="mt-1 flex items-center gap-3 text-xs">
                  <span className="text-gray-500">
                    Video status:{" "}
                    <strong
                      className={
                        lesson.videoStatus === "READY"
                          ? "text-green-600"
                          : "text-[#1F304A]"
                      }
                    >
                      {lesson.pollingStatus
                        ? `Checking... ${lesson.videoStatus || "PROCESSING"}`
                        : lesson.videoStatus || "Not uploaded"}
                    </strong>
                  </span>

                  {lesson.videoAssetId && !lesson.isSaved && (
                    <button
                      type="button"
                      disabled={lesson.pollingStatus || lesson.uploadingVideo}
                      onClick={() =>
                        pollLessonVideoStatusUntilReady(lesson.videoAssetId)
                      }
                      className="rounded border border-gray-400 px-2 py-1 text-gray-600 disabled:opacity-50"
                    >
                      {lesson.pollingStatus ? "Checking..." : "Check status"}
                    </button>
                  )}
                </div>
                <div className="mt-7 flex items-center gap-3 text-xs">
                  <span className="text-gray-500">
                    Video status:{" "}
                    <strong className="text-[#1F304A]">
                      {lesson.pollingStatus
                        ? `Checking... ${lesson.videoStatus || "PROCESSING"}`
                        : lesson.videoStatus || "Not uploaded"}
                    </strong>
                  </span>

                  {lesson.videoAssetId && !lesson.isSaved && (
                    <button
                      type="button"
                      disabled={lesson.pollingStatus}
                      onClick={() =>
                        pollLessonVideoStatusUntilReady(lesson.videoAssetId)
                      }
                      className="rounded border border-gray-400 px-2 py-1 text-gray-600 disabled:opacity-50"
                    >
                      {lesson.pollingStatus ? "Checking..." : "Check status"}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <div
            // onClick={() => !lesson.isSaved && thumbnailRef.current?.click()}
            onClick={() =>
              !lesson.isSaved &&
              !lesson.uploadingVideo &&
              !lesson.pollingStatus &&
              thumbnailRef.current?.click()
            }
            className="w-40 h-28 bg-gray-300 rounded flex items-center justify-center overflow-hidden"
          >
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
            onClick={handleUploadThumbnail}
            // disabled={
            //   !lesson.thumbnailFile ||
            //   lesson.isSaved ||
            //   uploadingThumbnail ||
            //   (lesson.thumbnailUrl && !lesson.backendId)
            // }
            disabled={
              !lesson.thumbnailFile ||
              lesson.isSaved ||
              uploadingThumbnail ||
              lesson.uploadingVideo ||
              lesson.pollingStatus ||
              (lesson.thumbnailUrl && !lesson.backendId)
            }
            className="text-center mt-2 text-[12px] border px-2.5 py-0.5 text-[#37af47] rounded-[14px] disabled:opacity-60 flex justify-center items-center gap-[2px]"
          >
            <MdOutlineFileUpload />
            {uploadingThumbnail ? "Uploading..." : "Upload"}
          </button>

          <input
            ref={thumbnailRef}
            type="file"
            hidden
            accept="image/*"
            onChange={(e) => handleThumbnailSelect(e.target.files[0])}
          />
        </div>
      </div>

      <div className="flex justify-end gap-4 mt-6">
        <button
          onClick={handleDelete}
          // disabled={deleting}
          disabled={deleting || lesson.uploadingVideo || lesson.pollingStatus}
          className="flex items-center gap-1 px-4 py-1.5 border border-red-500 text-red-500 rounded-[12px] text-sm disabled:opacity-50"
        >
          <MdDeleteOutline />
          {deleting ? "Deleting..." : "Delete"}
        </button>

        <button
          onClick={handleEdit}
          // disabled={!lesson.isSaved}
          disabled={
            !lesson.isSaved || lesson.uploadingVideo || lesson.pollingStatus
          }
          className="flex items-center px-5 py-1.5 border shadow-[#37af47] shadow-2xl border-[#37af47] text-[#37af47] rounded-[12px] text-sm disabled:opacity-50"
        >
          Edit
        </button>

        <button
          onClick={handleSave}
          // disabled={lesson.saving || lesson.isSaved || !isLessonComplete(lesson)}
          disabled={
            lesson.saving ||
            lesson.isSaved ||
            lesson.uploadingVideo ||
            lesson.pollingStatus ||
            !isLessonComplete(lesson)
          }
          className="px-4 border py-0.5 bg-[#37af47] text-white rounded-[12px] disabled:opacity-50 flex justify-center items-center gap-[2px]"
        >
          <LiaSave className="text-[22px]" />
          {/* {lesson.backendId ? "Update" : "Save"} */}

          {/* {lesson.saving
            ? "Saving..."
            : lesson.pollingStatus
              ? "Checking Video"
              : lesson.videoStatus && lesson.videoStatus !== "READY"
                ? "Video Processing"
                : lesson.backendId
                  ? "Update"
                  : "Save"} */}
          {lesson.saving
            ? "Saving..."
            : lesson.uploadingVideo
              ? "Uploading Video"
              : lesson.pollingStatus
                ? "Checking Video"
                : lesson.videoStatus && lesson.videoStatus !== "READY"
                  ? "Video Processing"
                  : lesson.backendId
                    ? "Update"
                    : "Save"}
        </button>
      </div>
    </div>
  );
}
