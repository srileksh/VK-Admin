"use client";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import SectionCard from "./SectionCard";
import LessonItem from "./LessonItem";
import { getLessonById } from "@/services/lesson.service";

export default function LessonSection({
  sectionId,
  title,
  isOpen,
  onToggle,
  onDelete,
  initialLessons = [],
  onBusyChange,
  moduleBusy = false,
}) {
  // const emptyLesson = () => ({
  //   id: Date.now(),
  //   lessonTitle: "",
  //   description: "",
  //   videoName: "",
  //   videoFile: null,
  //   videoAssetId: null,
  //   thumbnailFile: null,
  //   thumbnailUrl: "",
  //   videoUploaded: false,
  //   isSaved: false,
  //   saving: false,
  //   errors: {},
  //   backendId: null,
  //   duration: 0,
  //   videoStatus: null,
  //   pollingStatus: false,
  // });

  const emptyLesson = () => ({
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
    duration: 0,
    videoStatus: null,
    pollingStatus: false,
    uploadingVideo: false,
  });
  const [lessons, setLessons] = useState([emptyLesson()]);
  const [fetchingLessons, setFetchingLessons] = useState(false);
  const sectionBusy = lessons.some(
    (lesson) => lesson.uploadingVideo || lesson.pollingStatus || lesson.saving,
  );
  const sectionActionsLocked = moduleBusy || sectionBusy;

  /* ================= PREFILL LESSONS FROM API ================= */
  useEffect(() => {
    if (!initialLessons.length) {
      setFetchingLessons(false);
      setLessons([emptyLesson()]);
      return;
    }

    const prefill = async () => {
      try {
        setFetchingLessons(true);

        // Fetch each lesson in full (GET /lessons/:lessonId) to get
        // description + videoAssetId which section/course API omits
        const fullLessons = await Promise.all(
          initialLessons.map((l) => getLessonById(l.id)),
        );

        // setLessons(
        //   fullLessons.map((l) => ({
        //     id: l.id,
        //     lessonTitle: l.title || "",
        //     description: l.description || "",
        //     videoName: l.videoAssetId || "",
        //     videoFile: null,
        //     videoAssetId: l.videoAssetId || null,
        //     thumbnailFile: null,
        //     thumbnailUrl: l.thumbnail || "",
        //     videoUploaded: !!l.videoAssetId,
        //     isSaved: true,
        //     saving: false,
        //     errors: {},
        //     backendId: l.id,
        //     duration: l.duration || 0,
        //     videoStatus: l.videoAssetId ? "READY" : null,
        //     pollingStatus: false,
        //   })),
        // );
        setLessons(
          fullLessons.map((l) => ({
            id: l.id,
            lessonTitle: l.title || "",
            description: l.description || "",
            videoName: l.videoAssetId || "",
            videoFile: null,
            videoAssetId: l.videoAssetId || null,
            thumbnailFile: null,
            thumbnailUrl: l.thumbnail || "",
            videoUploaded: !!l.videoAssetId,
            isSaved: true,
            saving: false,
            errors: {},
            backendId: l.id,
            duration: l.duration || 0,
            videoStatus: l.videoAssetId ? "READY" : null,
            pollingStatus: false,
            uploadingVideo: false,
          })),
        );
      } catch (err) {
        console.error("Failed to prefill lessons:", err);
        toast.error("Failed to load lessons");
      } finally {
        setFetchingLessons(false);
      }
    };

    prefill();
  }, [sectionId, initialLessons]);

  // const handleAddLesson = () => {
  //   const hasUnsaved = lessons.some((l) => !l.isSaved);

  //   if (hasUnsaved) {
  //     toast.error("Save current lesson first");
  //     return;
  //   }

  //   setLessons((prev) => [...prev, emptyLesson()]);
  // };
  const handleAddLesson = () => {
    if (sectionActionsLocked) {
      toast.error("Please wait until the video upload is completed");
      return;
    }

    const hasUnsaved = lessons.some((l) => !l.isSaved);

    if (hasUnsaved) {
      toast.error("Save current lesson first");
      return;
    }

    setLessons((prev) => [...prev, emptyLesson()]);
  };

  useEffect(() => {
    onBusyChange?.(sectionBusy);
  }, [sectionBusy, onBusyChange]);
  const handleUpdateLesson = (id, key, value) => {
    setLessons((prev) =>
      prev.map((lesson) =>
        lesson.id === id
          ? {
              ...lesson,
              [key]: value,
              errors: { ...lesson.errors, [key]: "" },
            }
          : lesson,
      ),
    );
  };

  const handleReplaceLesson = (id, updater) => {
    setLessons((prev) =>
      prev.map((lesson) =>
        lesson.id === id ? { ...lesson, ...updater } : lesson,
      ),
    );
  };

  const handleDeleteLesson = (id) => {
    setLessons((prev) => prev.filter((lesson) => lesson.id !== id));
  };

  return (
    <SectionCard
      sectionId={sectionId}
      title={title}
      isOpen={isOpen}
      onToggle={onToggle}
      onDelete={onDelete}
      actionsDisabled={sectionActionsLocked}
    >
      {fetchingLessons ? (
        <p className="text-sm text-gray-500">Loading lessons...</p>
      ) : (
        <>
          {lessons.map((lesson) => (
            <LessonItem
              key={lesson.id}
              sectionId={sectionId}
              lesson={lesson}
              onUpdateLesson={handleUpdateLesson}
              onReplaceLesson={handleReplaceLesson}
              onDeleteLesson={handleDeleteLesson}
              moduleBusy={moduleBusy}
            />
          ))}

          <div className="mt-6 flex justify-center">
            {/* <button
              onClick={handleAddLesson}
              className="border-b-2 text-[18px] font-semibold text-[#CCCBCB]"
            >
              + Add new video
            </button> */}
            <button
              type="button"
              onClick={handleAddLesson}
              disabled={sectionActionsLocked}
              className="border-b-2 text-[18px] font-semibold text-[#CCCBCB] disabled:cursor-not-allowed disabled:opacity-50"
            >
              + Add new video
            </button>
          </div>
        </>
      )}
    </SectionCard>
  );
}
