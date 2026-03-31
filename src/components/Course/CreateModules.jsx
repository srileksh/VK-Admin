// // "use client";
// // import { useState } from "react";
// // import PromoVideoSection from "./PromoVideoSection";
// // import LessonSection from "./LessonSection";
// // import { GoPlus } from "react-icons/go";
// // import useCourseStore from "@/store/useCourseStore";
// // import useSectionStore from "@/store/useSectionStore";
// // import { publishCourse } from "@/services/coursesApi";
// // import { FaPen } from "react-icons/fa";

// // export default function CreateModules({ onCancel, onFinish }) {
// //   const { courseId ,publishCourseAction } = useCourseStore();
// //   const { createSection } = useSectionStore();

// //   const [sections, setSections] = useState([]);
// //   const [isAdding, setIsAdding] = useState(false);
// //   const [sectionTitle, setSectionTitle] = useState("");

  

// //   /* CREATE SECTION */
// //   const handleCreateSection = async () => {
// //     if (!sectionTitle.trim()) return;

// //     try {
// //       const data = await createSection({
// //         courseId,
// //         title: sectionTitle.trim(),
// //       });

// //       // close all sections and open new one
// //       setSections((prev) => [
// //         ...prev.map((s) => ({ ...s, isOpen: false })),
// //         {
// //           id: data.id,
// //           title: sectionTitle.trim(),
// //           isOpen: true,
// //         },
// //       ]);

// //       setSectionTitle("");
// //       setIsAdding(false);
// //     } catch {
// //       alert("Failed to create section");
// //     }
// //   };
// //   const handleRemoveSection = (id) => {
// //   setSections((prev) => prev.filter((s) => s.id !== id));
// // };


// //   /* TOGGLE SECTION (accordion) */
// //   const handleToggleSection = (id) => {
// //     setSections((prev) =>
// //       prev.map((s) =>
// //         s.id === id
// //           ? { ...s, isOpen: !s.isOpen }
// //           : { ...s, isOpen: false }
// //       )
// //     );
// //   };

 
// // const handleFinish = async () => {
// //   try {
// //     await publishCourseAction(courseId);
// //     onFinish();
// //   } catch {
// //     alert("Failed to finish course");
// //   }
// // };


// //   return (
// //     <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
// //       <div className="bg-white w-full max-w-[1000px] rounded-xl shadow-lg p-6 px-8 max-h-[90vh] overflow-y-auto">
// //         <h2 className="text-lg font-semibold mb-4 text-[#1F304A]">
// //           Create modules{" "}
// //         </h2>

// //         <PromoVideoSection />
// //         <div className="border border-gray-200 rounded-lg mb-4 shadow-sm p-[12px]  text-sm text-[#1F304A]">
// //           <div className=" flex items-center gap-[5px]">Lessons<FaPen/></div>

// //           {/* SECTIONS */}
// //           {sections.map((section) => (
// //             <LessonSection
// //               key={section.id}
// //               sectionId={section.id}
// //               title={section.title}
// //               isOpen={section.isOpen}
// //               onToggle={() => handleToggleSection(section.id)}
// //                 onDelete={() => handleRemoveSection(section.id)}

// //             />
// //           ))}

// //           {/* ADD SECTION INPUT */}
// //           {isAdding && (
// //             <div className="flex items-center gap-3 w-full mb-4 bg-white p-4 rounded-lg shadow-md">
// //               <input
// //                 autoFocus
// //                 value={sectionTitle}
// //                 onChange={(e) => setSectionTitle(e.target.value)}
// //                 onKeyDown={(e) => e.key === "Enter" && handleCreateSection()}
// //                 placeholder="Section title"
// //                 className="flex-1 px-4 py-2 border-b-2 border-gray-300 outline-none"
// //               />

// //               <button
// //                 onClick={handleCreateSection}
// //                 className="bg-gray-700 text-white px-5 py-2 rounded-lg"
// //               >
// //                 Create
// //               </button>

// //               <button
// //                 onClick={() => {
// //                   setIsAdding(false);
// //                   setSectionTitle("");
// //                 }}
// //                 className="border-2 border-[#1F304A] px-5 py-2 rounded-lg"
// //               >
// //                 Cancel
// //               </button>
// //             </div>
// //           )}

// //           {/* ADD BUTTON */}
// //           <div className="flex justify-end mb-6 mt-6">
// //             <button
// //               onClick={() => setIsAdding(true)}
// //               className="flex items-center gap-1 p-3 shadow-md rounded-lg"
// //             >
// //               <GoPlus /> Add new section
// //             </button>
// //           </div>
// //         </div>

// //         {/* FOOTER */}
// //         <div className="flex justify-end gap-6">
// //           <button
// //             onClick={onCancel}
// //             className="bg-gray-300 px-10 py-2 rounded-xl"
// //           >
// //             Cancel
// //           </button>

// //           <button
// //             onClick={handleFinish}
// //             className="bg-gray-700 px-10 py-2 rounded-xl text-white"
// //           >
// //             Finish
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// "use client";
// import { useEffect, useState } from "react";
// import PromoVideoSection from "./PromoVideoSection";
// import LessonSection from "./LessonSection";
// import { GoPlus } from "react-icons/go";
// import useCourseStore from "@/store/useCourseStore";
// import useSectionStore from "@/store/useSectionStore";
// import usePromoStore from "@/store/usePromoStore";
// import { FaPen } from "react-icons/fa";

// export default function CreateModules({ onCancel, onFinish }) {
//   const { courseId, publishCourseAction } = useCourseStore();
//   const { createSection } = useSectionStore();
//   const { fetchActivePromo } = usePromoStore();

//   const [sections, setSections] = useState([]);
//   const [isAdding, setIsAdding] = useState(false);
//   const [sectionTitle, setSectionTitle] = useState("");
//   const [promoId, setPromoId] = useState(null);

//   useEffect(() => {
//     const loadPromo = async () => {
//       try {
//         const promo = await fetchActivePromo();
//         setPromoId(promo?.id || null);
//       } catch (error) {
//         console.error("Failed to fetch active promo:", error);
//       }
//     };

//     loadPromo();
//   }, [fetchActivePromo]);

//   const handleCreateSection = async () => {
//     if (!sectionTitle.trim()) return;

//     try {
//       const data = await createSection({
//         courseId,
//         title: sectionTitle.trim(),
//       });

//       setSections((prev) => [
//         ...prev.map((s) => ({ ...s, isOpen: false })),
//         {
//           id: data.id,
//           title: sectionTitle.trim(),
//           isOpen: true,
//         },
//       ]);

//       setSectionTitle("");
//       setIsAdding(false);
//     } catch {
//       alert("Failed to create section");
//     }
//   };

//   const handleRemoveSection = (id) => {
//     setSections((prev) => prev.filter((s) => s.id !== id));
//   };

//   const handleToggleSection = (id) => {
//     setSections((prev) =>
//       prev.map((s) =>
//         s.id === id
//           ? { ...s, isOpen: !s.isOpen }
//           : { ...s, isOpen: false }
//       )
//     );
//   };

//   const handleFinish = async () => {
//     try {
//       await publishCourseAction(courseId);
//       onFinish();
//     } catch {
//       alert("Failed to finish course");
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
//       <div className="max-h-[90vh] w-full max-w-[1000px] overflow-y-auto rounded-xl bg-white p-6 px-8 shadow-lg">
//         <h2 className="mb-4 text-lg font-semibold text-[#1F304A]">
//           Create modules
//         </h2>

//         <PromoVideoSection promoId={promoId} />

//         <div className="mb-4 rounded-lg border border-gray-200 p-[12px] text-sm text-[#1F304A] shadow-sm">
//           <div className="flex items-center gap-[5px]">
//             Lessons
//             <FaPen />
//           </div>

//           {sections.map((section) => (
//             <LessonSection
//               key={section.id}
//               sectionId={section.id}
//               title={section.title}
//               isOpen={section.isOpen}
//               onToggle={() => handleToggleSection(section.id)}
//               onDelete={() => handleRemoveSection(section.id)}
//             />
//           ))}

//           {isAdding && (
//             <div className="mb-4 flex w-full items-center gap-3 rounded-lg bg-white p-4 shadow-md">
//               <input
//                 autoFocus
//                 value={sectionTitle}
//                 onChange={(e) => setSectionTitle(e.target.value)}
//                 onKeyDown={(e) => e.key === "Enter" && handleCreateSection()}
//                 placeholder="Section title"
//                 className="flex-1 border-b-2 border-gray-300 px-4 py-2 outline-none"
//               />

//               <button
//                 onClick={handleCreateSection}
//                 className="rounded-lg bg-gray-700 px-5 py-2 text-white"
//               >
//                 Create
//               </button>

//               <button
//                 onClick={() => {
//                   setIsAdding(false);
//                   setSectionTitle("");
//                 }}
//                 className="rounded-lg border-2 border-[#1F304A] px-5 py-2"
//               >
//                 Cancel
//               </button>
//             </div>
//           )}

//           <div className="mb-6 mt-6 flex justify-end">
//             <button
//               onClick={() => setIsAdding(true)}
//               className="flex items-center gap-1 rounded-lg p-3 shadow-md"
//             >
//               <GoPlus /> Add new section
//             </button>
//           </div>
//         </div>

//         <div className="flex justify-end gap-6">
//           <button
//             onClick={onCancel}
//             className="rounded-xl bg-gray-300 px-10 py-2"
//           >
//             Cancel
//           </button>

//           <button
//             onClick={handleFinish}
//             className="rounded-xl bg-gray-700 px-10 py-2 text-white"
//           >
//             Finish
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";
import { useState, useEffect } from "react";
import PromoVideoSection from "./PromoVideoSection";
import LessonSection from "./LessonSection";
import { GoPlus } from "react-icons/go";
import useCourseStore from "@/store/useCourseStore";
import useSectionStore from "@/store/useSectionStore";
import usePromoStore from "@/store/usePromoStore";
import { FaPen } from "react-icons/fa";

export default function CreateModules({ onCancel, onFinish }) {
  const { courseId, publishCourseAction, currentCourse } = useCourseStore();
  const { createSection } = useSectionStore();
  const { fetchActivePromo } = usePromoStore();

  const [sections, setSections] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [sectionTitle, setSectionTitle] = useState("");
  const [promoId, setPromoId] = useState(null);

  /* ================= PREFILL SECTIONS ON EDIT ================= */
  useEffect(() => {
    if (!currentCourse?.sections?.length) return;

    setSections(
      currentCourse.sections.map((s) => ({
        id: s.id,
        title: s.title,
        isOpen: false,
        lessons: s.lessons || [],   // pass existing lessons down
      }))
    );
  }, [currentCourse]);

  

  const handleCreateSection = async () => {
    if (!sectionTitle.trim()) return;

    try {
      const data = await createSection({
        courseId,
        title: sectionTitle.trim(),
      });

      setSections((prev) => [
        ...prev.map((s) => ({ ...s, isOpen: false })),
        {
          id: data.id,
          title: sectionTitle.trim(),
          isOpen: true,
        },
      ]);

      setSectionTitle("");
      setIsAdding(false);
    } catch {
      alert("Failed to create section");
    }
  };

  const handleRemoveSection = (id) => {
    setSections((prev) => prev.filter((s) => s.id !== id));
  };

  const handleToggleSection = (id) => {
    setSections((prev) =>
      prev.map((s) =>
        s.id === id
          ? { ...s, isOpen: !s.isOpen }
          : { ...s, isOpen: false }
      )
    );
  };

 
const handleFinish = async () => {
  try {
    // If the course is already published, we don't need to publish it again
    if (currentCourse?.status !== "PUBLISHED") {
      await publishCourseAction(courseId);
    }
    onFinish();
  } catch {
    alert("Failed to finish course");
  }
};


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="max-h-[90vh] w-full max-w-[1000px] overflow-y-auto rounded-xl bg-white p-6 px-8 shadow-lg">
        <h2 className="mb-4 text-lg font-semibold text-[#1F304A]">
          Create modules
        </h2>

        <PromoVideoSection promoId={promoId} />

        <div className="mb-4 rounded-lg border border-gray-200 p-[12px] text-sm text-[#1F304A] shadow-sm">
          <div className="flex items-center gap-[5px]">
            Lessons <FaPen />
          </div>

          {sections.map((section) => (
            <LessonSection
              key={section.id}
              sectionId={section.id}
              title={section.title}
              isOpen={section.isOpen}
              onToggle={() => handleToggleSection(section.id)}
              onDelete={() => handleRemoveSection(section.id)}
              initialLessons={section.lessons || []}
            />
          ))}

          {isAdding && (
            <div className="mb-4 flex w-full items-center gap-3 rounded-lg bg-white p-4 shadow-md">
              <input
                autoFocus
                value={sectionTitle}
                onChange={(e) => setSectionTitle(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleCreateSection()}
                placeholder="Section title"
                className="flex-1 border-b-2 outline-none border-gray-300 px-4 py-2"
              />

              <button
                onClick={handleCreateSection}
                className="rounded-lg bg-gray-700 px-5 py-2 text-white"
              >
                Create
              </button>

              <button
                onClick={() => {
                  setIsAdding(false);
                  setSectionTitle("");
                }}
                className="rounded-lg border-2 border-[#1F304A] px-5 py-2"
              >
                Cancel
              </button>
            </div>
          )}

          <div className="mb-6 mt-6 flex justify-end">
            <button
              onClick={() => setIsAdding(true)}
              className="flex items-center gap-1 rounded-lg p-3 shadow-md"
            >
              <GoPlus /> Add new section
            </button>
          </div>
        </div>

        <div className="flex justify-end gap-6">
          <button
            onClick={onCancel}
            className="rounded-xl bg-gray-300 px-10 py-2"
          >
            Cancel
          </button>

          <button
            onClick={handleFinish}
            className="rounded-xl bg-gray-700 px-10 py-2 text-white"
          >
            Finish
          </button>
        </div>
      </div>
    </div>
  );
}

