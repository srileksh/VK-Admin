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
//   onCancel={onClose}
//   onSuccess={(courseId) => {
//     setCourseId(courseId);
//     setStep(2);
//   }}
// />
//       )}

//       {step === 2 && (
//         <CourseContent
//           courseId={courseId}
//           onBack={() => setStep(1)}
//           onNext={() => setStep(3)}
//         />
//       )}

//       {step === 3 && (
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
import { useState } from "react";
import CreateCourse from "./CreateCourse";
import CourseContent from "./CourseContent";
import CreateModules from "./CreateModules";

export default function CourseWizard({ onClose }) {
  const [step, setStep] = useState(1);
  const [courseId, setCourseId] = useState(null);

  return (
    <>
      {step === 1 && (
        <CreateCourse
          onCancel={onClose}
          onSuccess={(courseId) => {
            setCourseId(courseId);
            setStep(2);
          }}
        />
      )}

      {step === 2 && (
        <CourseContent
          courseId={courseId}
          onBack={() => setStep(1)}
          onNext={() => setStep(3)}
        />
      )}

      {step === 3 && (
        <CreateModules
          courseId={courseId}
          onCancel={() => setStep(2)}
          onFinish={onClose}
        />
      )}
    </>
  );
}
