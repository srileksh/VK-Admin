// "use client";
// import { useState } from "react";
// import { toast } from "react-hot-toast";
// import SectionCard from "./SectionCard";
// import LessonItem from "./LessonItem";

// export default function LessonSection({
//   sectionId,
//   title,
//   isOpen,
//   onToggle,
//   onDelete,
// }) {
//   const [lessons, setLessons] = useState([
//     {
//       id: Date.now(),
//       lessonTitle: "",
//       description: "",
//       videoName: "",
//       videoFile: null,
//       videoAssetId: null,
//       thumbnailFile: null,
//       thumbnailUrl: "",
//       videoUploaded: false,
//       isSaved: false,
//       saving: false,
//       errors: {},
//       backendId: null,
//     },
//   ]);

//   const handleAddLesson = () => {
//     const hasUnsaved = lessons.some((l) => !l.isSaved);

//     if (hasUnsaved) {
//       toast.error("Save current lesson first");
//       return;
//     }

//     setLessons((prev) => [
//       ...prev,
//       {
//         id: Date.now(),
//         lessonTitle: "",
//         description: "",
//         videoName: "",
//         videoFile: null,
//         videoAssetId: null,
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
//       prev.map((lesson) =>
//         lesson.id === id
//           ? {
//               ...lesson,
//               [key]: value,
//               errors: { ...lesson.errors, [key]: "" },
//             }
//           : lesson
//       )
//     );
//   };

//   const handleReplaceLesson = (id, updater) => {
//     setLessons((prev) =>
//       prev.map((lesson) =>
//         lesson.id === id ? { ...lesson, ...updater } : lesson
//       )
//     );
//   };

//   return (
//     <SectionCard
//       sectionId={sectionId}
//       title={title}
//       isOpen={isOpen}
//       onToggle={onToggle}
//       onDelete={onDelete}
//     >
//       {lessons.map((lesson) => (
//         <LessonItem
//           key={lesson.id}
//           sectionId={sectionId}
//           lesson={lesson}
//           onUpdateLesson={handleUpdateLesson}
//           onReplaceLesson={handleReplaceLesson}
//         />
//       ))}

//       <div className="flex justify-center mt-6">
//         <button
//           onClick={handleAddLesson}
//           className="text-[#CCCBCB] text-[18px] font-semibold border-b-2"
//         >
//           + Add new video
//         </button>
//       </div>
//     </SectionCard>
//   );
// }

// "use client";
// import { useState } from "react";
// import { toast } from "react-hot-toast";
// import SectionCard from "./SectionCard";
// import LessonItem from "./LessonItem";

// export default function LessonSection({
//   sectionId,
//   title,
//   isOpen,
//   onToggle,
//   onDelete,
// }) {
//   const [lessons, setLessons] = useState([
//     {
//       id: Date.now(),
//       lessonTitle: "",
//       description: "",
//       videoName: "",
//       videoFile: null,
//       videoAssetId: null,
//       thumbnailFile: null,
//       thumbnailUrl: "",
//       videoUploaded: false,
//       isSaved: false,
//       saving: false,
//       errors: {},
//       backendId: null,
//       duration: 0,
//     },
//   ]);

//   const handleAddLesson = () => {
//     const hasUnsaved = lessons.some((l) => !l.isSaved);

//     if (hasUnsaved) {
//       toast.error("Save current lesson first");
//       return;
//     }

//     setLessons((prev) => [
//       ...prev,
//       {
//         id: Date.now(),
//         lessonTitle: "",
//         description: "",
//         videoName: "",
//         videoFile: null,
//         videoAssetId: null,
//         thumbnailFile: null,
//         thumbnailUrl: "",
//         videoUploaded: false,
//         isSaved: false,
//         saving: false,
//         errors: {},
//         backendId: null,
//         duration: 0,
//       },
//     ]);
//   };

//   const handleUpdateLesson = (id, key, value) => {
//     setLessons((prev) =>
//       prev.map((lesson) =>
//         lesson.id === id
//           ? {
//               ...lesson,
//               [key]: value,
//               errors: { ...lesson.errors, [key]: "" },
//             }
//           : lesson
//       )
//     );
//   };

//   const handleReplaceLesson = (id, updater) => {
//     setLessons((prev) =>
//       prev.map((lesson) =>
//         lesson.id === id ? { ...lesson, ...updater } : lesson
//       )
//     );
//   };

//   const handleDeleteLesson = (id) => {
//     setLessons((prev) => prev.filter((lesson) => lesson.id !== id));
//   };

//   return (
//     <SectionCard
//       sectionId={sectionId}
//       title={title}
//       isOpen={isOpen}
//       onToggle={onToggle}
//       onDelete={onDelete}
//     >
//       {lessons.map((lesson) => (
//         <LessonItem
//           key={lesson.id}
//           sectionId={sectionId}
//           lesson={lesson}
//           onUpdateLesson={handleUpdateLesson}
//           onReplaceLesson={handleReplaceLesson}
//           onDeleteLesson={handleDeleteLesson}
//         />
//       ))}

//       <div className="flex justify-center mt-6">
//         <button
//           onClick={handleAddLesson}
//           className="text-[#CCCBCB] text-[18px] font-semibold border-b-2"
//         >
//           + Add new video
//         </button>
//       </div>
//     </SectionCard>
//   );
// }

"use client";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import SectionCard from "./SectionCard";
import LessonItem from "./LessonItem";
import useLessonStore from "@/store/useLessonStore";

export default function LessonSection({
  sectionId,
  title,
  isOpen,
  onToggle,
  onDelete,
  lessonIds = [],
}) {
  const { getLessonByIdAction } = useLessonStore();

  const [lessons, setLessons] = useState([]);
  const [fetchingLessons, setFetchingLessons] = useState(false);

  useEffect(() => {
    const fetchLessons = async () => {
      if (!isOpen || !lessonIds.length) return;

      try {
        setFetchingLessons(true);

        const lessonResponses = await Promise.all(
          lessonIds.map((lessonId) => getLessonByIdAction(lessonId))
        );

        const mappedLessons = lessonResponses.map((item, index) => ({
          id: item.id || `${Date.now()}-${index}`,
          lessonTitle: item.title || "",
          description: item.description || "",
          videoName: item.videoName || "",
          videoFile: null,
          videoAssetId: item.videoAssetId || null,
          thumbnailFile: null,
          thumbnailUrl: item.thumbnail || "",
          videoUploaded: !!item.videoAssetId,
          isSaved: true,
          saving: false,
          errors: {},
          backendId: item.id,
          duration: item.duration || 0,
          order: item.order || index,
          isFree: item.isFree || false,
        }));

        setLessons(mappedLessons);
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch lessons");
      } finally {
        setFetchingLessons(false);
      }
    };

    fetchLessons();
  }, [isOpen, lessonIds, getLessonByIdAction]);

  const handleAddLesson = () => {
    const hasUnsaved = lessons.some((l) => !l.isSaved);

    if (hasUnsaved) {
      toast.error("Save current lesson first");
      return;
    }

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
      prev.map((lesson) =>
        lesson.id === id
          ? {
              ...lesson,
              [key]: value,
              errors: { ...lesson.errors, [key]: "" },
            }
          : lesson
      )
    );
  };

  const handleReplaceLesson = (id, updater) => {
    setLessons((prev) =>
      prev.map((lesson) =>
        lesson.id === id ? { ...lesson, ...updater } : lesson
      )
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
            />
          ))}

          <div className="mt-6 flex justify-center">
            <button
              onClick={handleAddLesson}
              className="border-b-2 text-[18px] font-semibold text-[#CCCBCB]"
            >
              + Add new video
            </button>
          </div>
        </>
      )}
    </SectionCard>
  );
}