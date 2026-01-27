// "use client";
// import { useState } from "react";
// import CreateCourse from "./CreateCourse";
// import CourseContent from "./CourseContent";

// export default function CourseWizard({ onClose }) {
//   const [step, setStep] = useState(1);

//   return (
//     <div className="p-6">
//       {step === 1 && (
//         <CreateCourse
//           onCancel={onClose}
//           onSave={() => setStep(2)}
//         />
//       )}

//       {step === 2 && <CourseContent />}
//     </div>
//   );
// }
"use client";
import { useState } from "react";
import CreateCourse from "./CreateCourse";
import CourseContent from "./CourseContent";
import CreateModules from "./CreateModules";

export default function CourseWizard({ onClose }) {
  const [step, setStep] = useState(1);

  return (
    <>
      {step === 1 && (
        <CreateCourse
          onCancel={onClose}
          onSave={() => setStep(2)}
        />
      )}

      {step === 2 && (
        <CourseContent
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
