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

"use client";
import { useState } from "react";
import { toast } from "react-hot-toast";
import SectionCard from "./SectionCard";
import LessonItem from "./LessonItem";

export default function LessonSection({
  sectionId,
  title,
  isOpen,
  onToggle,
  onDelete,
}) {
  const [lessons, setLessons] = useState([
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
      duration: 0,
    },
  ]);

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
        duration: 0,
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

      <div className="flex justify-center mt-6">
        <button
          onClick={handleAddLesson}
          className="text-[#CCCBCB] text-[18px] font-semibold border-b-2"
        >
          + Add new video
        </button>
      </div>
    </SectionCard>
  );
}