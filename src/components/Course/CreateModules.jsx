
// "use client";
// import PromoVideoSection from "./PromoVideoSection";
// import LessonSection from "./LessonSection";
// import { GoPlus } from "react-icons/go";

// export default function CreateModules({ onCancel, onFinish }) {
//   return (
//     <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
//       <div className="bg-white w-full max-w-[1000px] rounded-xl shadow-lg p-6 px-8 max-h-[90vh] overflow-y-auto">
//         <h2 className="text-lg font-semibold mb-4 text-[#1F304A]">
//           Create modules
//         </h2>

//         <PromoVideoSection />
//         <LessonSection title="Section 1" />

//         <div className="flex justify-end mb-6">
//           <button className="flex items-center gap-1 p-3 shadow-md rounded-lg">
//             <GoPlus /> Add new section
//           </button>
//         </div>

//         <div className="flex justify-end gap-6">
//           <button
//             onClick={onCancel}
//             className="bg-gray-300 px-10 py-2 rounded-xl"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={onFinish}
//             className="bg-gray-700 px-10 py-2 rounded-xl text-white"
//           >
//             Finish
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";
import PromoVideoSection from "./PromoVideoSection";
import LessonSection from "./LessonSection";
import { GoPlus } from "react-icons/go";

export default function CreateModules({ onCancel, onFinish }) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
      <div className="bg-white w-full max-w-[1000px] rounded-xl shadow-lg p-6 px-8 max-h-[90vh] overflow-y-auto">
        <h2 className="text-lg font-semibold mb-4 text-[#1F304A]">
          Create modules
        </h2>

        {/* Promo video */}
        <PromoVideoSection />

        {/* Lesson section */}
        <LessonSection
          sectionId="section-1"
          title="Section 1"
        />

        {/* Add section */}
        <div className="flex justify-end mb-6">
          <button className="flex items-center gap-1 p-3 shadow-md rounded-lg">
            <GoPlus /> Add new section
          </button>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-6">
          <button
            onClick={onCancel}
            className="bg-gray-300 px-10 py-2 rounded-xl"
          >
            Cancel
          </button>
          <button
            onClick={onFinish}
            className="bg-gray-700 px-10 py-2 rounded-xl text-white"
          >
            Finish
          </button>
        </div>
      </div>
    </div>
  );
}

