
// "use client";
// import { useState } from "react";
// import CreateCourse from "./CreateCourse";
// import CourseContent from "./CourseContent";
// import CreateModules from "./CreateModules";

// export default function CourseWizard({ onClose }) {
//   const [step, setStep] = useState(1);
//   const [courseId, setCourseId] = useState(null);

//   return (
//     <>
//       {step === 1 && (
//         <CreateCourse
//           onCancel={onClose}
//           onSuccess={(courseId) => {
//             setCourseId(courseId);
//             setStep(2);
//           }}
//         />
//       )}

//       {step === 2 && (
//         <CourseContent
//         onCancel={onClose}
//           courseId={courseId}
//           onBack={() => setStep(1)}
//           onNext={() => setStep(3)}
//         />
//       )}

//      {step === 3 && (
//         <CreateModules
//           courseId={courseId}
//           onCancel={() => setStep(2)}
//           onFinish={onClose}
//         />
//       )}
//     </>
//   );
// }


"use client";
import { useEffect, useState } from "react";
import CreateCourse from "./CreateCourse";
import CourseContent from "./CourseContent";
import CreateModules from "./CreateModules";
import useCourseStore from "@/store/useCourseStore";

export default function CourseWizard({ onClose, editingIndex }) {
  const { currentCourse } = useCourseStore();
  const { selectedCourse } = useCourseStore();

  const [step, setStep] = useState(1);
  useEffect(() => {
  if (selectedCourse) {
    setFormData({
      title: selectedCourse.title || "",
      description: selectedCourse.description || "",
      faculty: selectedCourse.faculty || [],
      learningOutcomes: selectedCourse.learningOutcomes || [],
    });
  }
}, [selectedCourse]);

  /* 🔥 Smart Redirection: Check what's missing */
  useEffect(() => {
    if (editingIndex !== null && currentCourse) {
      const hasContent =
        currentCourse.learningOutcomes?.length > 0 ||
        currentCourse.categories?.length > 0;

      if (!hasContent) {
        setStep(2); // Go to Content step if missing
      } else {
        setStep(3); // Go to Modules step if content exists
      }
    }
  }, [editingIndex, currentCourse]);

  return (
    <>
      {step === 1 && (
        <CreateCourse
          onCancel={onClose}
          onSuccess={() => setStep(2)}
        />
      )}

      {step === 2 && (
        <CourseContent
          onCancel={onClose}
          onBack={() => setStep(1)}
          onNext={() => setStep(3)}
        />
      )}

      {step === 3 && (
        <CreateModules
          onCancel={() => setStep(2)}
          onFinish={onClose}
        />
      )}
    </>
  );
}
