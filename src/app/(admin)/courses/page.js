// //app/(admin)/courses/page.js
// "use client";
// import React, { useEffect, useState } from "react";
// import { RiDeleteBin5Line } from "react-icons/ri";
// import { MdEditNote } from "react-icons/md";
// import CourseWizard from "@/components/Course/CourseWizard";
// import useCourseStore from "@/store/useCourseStore";

// export default function Page() {
//   const [showWizard, setShowWizard] = useState(false);
//   const [editingIndex, setEditingIndex] = useState(null);
//   const { fetchCourseById } = useCourseStore();
//   const { courses, fetchCourses,setCurrentCourse, deleteCourse, setCourseId, togglePopular } =
//     useCourseStore();

//   useEffect(() => {
//     fetchCourses();
//   }, []);

//   // const handleDelete = async (courseId) => {
//   //   await deleteCourse(courseId);
//   // };
// const handleDelete = async (courseId) => {
//   const confirmDelete = window.confirm("Are you sure you want to delete this course?");
//   if (!confirmDelete) return;

//   try {
//     await deleteCourse(courseId);
//   } catch (error) {
//     console.error("Delete failed", error);
//   }
// };
  

// //   const handleEdit = async (course) => {
// //   try {
// //     if (course.status === "DRAFT") {
// //       // 🔥 directly use existing data
// //       setCurrentCourse(course);
// //     } else {
// //       // only fetch for published
// //       await fetchCourseById(course.id);
// //     }

// //     setShowWizard(true);
// //   } catch (error) {
// //     console.error("Failed to load course");
// //   }
// // };

// const handleEdit = async (course) => {
//   try {
//     setCourseId(course.id); // ✅ ADD THIS

//     if (course.status === "DRAFT") {
//       setCurrentCourse(course);
//     } else {
//       await fetchCourseById(course.id);
//     }

//     setShowWizard(true);
//   } catch (error) {
//     console.error("Failed to load course");
//   }
// };
//   return (
//     <>
//       {!showWizard && (
//         <div className="mt-[25px] px-4 sm:px-6 md:px-8">
//           <div className="flex justify-between items-center mb-6">
//             <h1 className="text-[27px] text-[#1f304a] font-medium">Courses</h1>
//             <button
//               onClick={() => {
//                 setEditingIndex(null);
//                 setCourseId(null);
//                 useCourseStore.getState().resetCourse()
//                 setShowWizard(true);
//               }}
//               className="px-4  py-2
//               bg-[#1f304a] text-white
//               rounded-xl text-[16px] xl:text-[20px]
//               transition-colors duration-300
//               hover:bg-[#314279]"
//             >
//               Create new Course
//             </button>
//           </div>

//           <div className="space-y-2">
//             {courses?.map((course, index) => (
//               <div
//                 key={course.id}
//                className="p-4 sm:p-5 rounded-[15px]
//                 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6
//                 gap-2 items-center place-items-center text-center mt-5
//                 bg-[#E3EAF8] border border-[#A9BEE2]
//                 shadow-[0_4px_10px_rgba(0,0,0,0.12),_0_10px_25px_rgba(169,190,226,0.35)]"
//               >
//                 <div>
//                   <p className="text-xs text-gray-500">Course title</p>
//                   <p className="font-medium">{course.title}</p>
//                 </div>

//                 <div>
//                   <p className="text-xs text-gray-500">Status</p>
//                   <p>{course.status}</p>
//                 </div>

//                 <div>
//                   <p className="text-xs text-gray-500">Course amount</p>
//                   <p>{course.price}</p>
//                 </div>

//                 <div>
//                   <p className="text-xs text-gray-500">Total Videos</p>
//                   <p>{course.totalVideos}</p>
//                 </div>

//                 <div>
//                   <p className="text-xs text-gray-500 ">Popular</p>

//                   <button
//                     disabled={course.status === "DRAFT"}
//                     onClick={() =>
//                       course.status !== "DRAFT" &&
//                       togglePopular(course.id, course.isPopular)
//                     }
//                     className={`w-10 h-5 flex items-center rounded-full p-1 transition ${
//                       course.isPopular ? "bg-blue-950" : "bg-gray-300"
//                     } ${
//                       course.status === "DRAFT"
//                         ? "opacity-50 cursor-not-allowed"
//                         : "cursor-pointer"
//                     }`}
//                   >
//                     <div
//                       className={`bg-white w-4 h-4 rounded-full shadow-md transform transition ${
//                         course.isPopular ? "translate-x-5" : ""
//                       }`}
//                     />
//                   </button>
//                 </div>

//                 <div className="flex gap-4">
//                   <button
//                     onClick={() => handleDelete(course.id)}
//                     className="text-[22px] text-gray-600 hover:text-red-600"
//                   >
//                     <RiDeleteBin5Line />
//                   </button>

//                   <button
//                     // onClick={() => handleEdit(course, index)}
//                     onClick={() => handleEdit(course)}
//                     className="text-[28px] text-gray-600 hover:text-blue-600"
//                   >
//                     <MdEditNote />
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {showWizard && (
//         <CourseWizard
//           onClose={() => setShowWizard(false)}
//           editingIndex={editingIndex}
//         />
//       )}
//     </>
//   );
// }




"use client";
import React, { useEffect, useState } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { MdEditNote } from "react-icons/md";
import CourseWizard from "@/components/Course/CourseWizard";
import useCourseStore from "@/store/useCourseStore";

function DeleteCourseModal({
  open,
  courseTitle,
  onClose,
  onConfirm,
  deleting,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
        <h2 className="text-xl font-semibold text-[#1f304a]">Delete Course</h2>

        <p className="mt-3 text-sm text-gray-600 leading-6">
          Are you sure you want to delete{" "}
          <span className="font-semibold text-gray-900">
            {courseTitle || "this course"}
          </span>
          ? This action cannot be undone.
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            disabled={deleting}
            className="rounded-xl bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            disabled={deleting}
            className="rounded-xl bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {deleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  const [showWizard, setShowWizard] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [deletingCourseId, setDeletingCourseId] = useState(null);

  const { fetchCourseById } = useCourseStore();
  const {
    courses,
    fetchCourses,
    setCurrentCourse,
    deleteCourse,
    setCourseId,
    togglePopular,
  } = useCourseStore();

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  const openDeleteModal = (course) => {
    setSelectedCourse(course);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    if (deletingCourseId) return;
    setDeleteModalOpen(false);
    setSelectedCourse(null);
  };

  const handleConfirmDelete = async () => {
    if (!selectedCourse?.id) return;

    try {
      setDeletingCourseId(selectedCourse.id);
      await deleteCourse(selectedCourse.id);
      setDeleteModalOpen(false);
      setSelectedCourse(null);
    } catch (error) {
      console.error("Delete failed", error);
    } finally {
      setDeletingCourseId(null);
    }
  };

  const handleEdit = async (course) => {
    try {
      setCourseId(course.id);

      if (course.status === "DRAFT") {
        setCurrentCourse(course);
      } else {
        await fetchCourseById(course.id);
      }

      setShowWizard(true);
    } catch (error) {
      console.error("Failed to load course");
    }
  };

  return (
    <>
      {!showWizard && (
        <div className="mt-[25px] px-4 sm:px-6 md:px-8">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-[27px] font-medium text-[#1f304a]">Courses</h1>

            <button
              onClick={() => {
                setEditingIndex(null);
                setCourseId(null);
                useCourseStore.getState().resetCourse();
                setShowWizard(true);
              }}
              className="rounded-xl bg-[#1f304a] px-4 py-2 text-[16px] text-white transition-colors duration-300 hover:bg-[#314279] xl:text-[20px]"
            >
              Create new Course
            </button>
          </div>

          <div className="space-y-2">
            {courses?.map((course) => {
              const isDeleting = deletingCourseId === course.id;

              return (
                <div
                  key={course.id}
                  className="mt-5 grid grid-cols-1 place-items-center gap-2 rounded-[15px] border border-[#A9BEE2] bg-[#E3EAF8] p-4 text-center shadow-[0_4px_10px_rgba(0,0,0,0.12),_0_10px_25px_rgba(169,190,226,0.35)] sm:grid-cols-2 sm:p-5 lg:grid-cols-6"
                >
                  <div>
                    <p className="text-xs text-gray-500">Course title</p>
                    <p className="font-medium">{course.title}</p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">Status</p>
                    <p>{course.status}</p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">Course amount</p>
                    <p>{course.price}</p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">Total Videos</p>
                    <p>{course.totalVideos}</p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">Popular</p>

                    <button
                      disabled={course.status === "DRAFT" || isDeleting}
                      onClick={() =>
                        course.status !== "DRAFT" &&
                        togglePopular(course.id, course.isPopular)
                      }
                      className={`flex h-5 w-10 items-center rounded-full p-1 transition ${
                        course.isPopular ? "bg-blue-950" : "bg-gray-300"
                      } ${
                        course.status === "DRAFT" || isDeleting
                          ? "cursor-not-allowed opacity-50"
                          : "cursor-pointer"
                      }`}
                    >
                      <div
                        className={`h-4 w-4 rounded-full bg-white shadow-md transform transition ${
                          course.isPopular ? "translate-x-5" : ""
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => openDeleteModal(course)}
                      disabled={isDeleting}
                      className="text-[22px] text-gray-600 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {isDeleting ? "..." : <RiDeleteBin5Line />}
                    </button>

                    <button
                      onClick={() => handleEdit(course)}
                      disabled={isDeleting}
                      className="text-[28px] text-gray-600 hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <MdEditNote />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {showWizard && (
        <CourseWizard
          onClose={() => setShowWizard(false)}
          editingIndex={editingIndex}
        />
      )}

      <DeleteCourseModal
        open={deleteModalOpen}
        courseTitle={selectedCourse?.title}
        onClose={closeDeleteModal}
        onConfirm={handleConfirmDelete}
        deleting={!!deletingCourseId}
      />
    </>
  );
}