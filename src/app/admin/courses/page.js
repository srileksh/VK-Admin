
// // "use client";
// // import React, { useState } from "react";
// // import { RiDeleteBin5Line } from "react-icons/ri";
// // import { MdEditNote } from "react-icons/md";
// // import CourseWizard from "@/components/Course/CourseWizard";

// // export default function Page() {
// //   const [showWizard, setShowWizard] = useState(false);
// //   const [courses, setCourses] = useState([]);
// //   const [editingIndex, setEditingIndex] = useState(null);

// //   const handleDelete = (index) => {
// //     setCourses((prev) => prev.filter((_, i) => i !== index));
// //   };

// //   const handleEdit = (index) => {
// //     setEditingIndex(index);
// //     setShowWizard(true);
// //   };

// //   return (
// //     <>
// //       {/* ================= COURSE LIST (UNCHANGED) ================= */}
// //       {!showWizard && (
// //         <div className="px-4 sm:px-6 md:px-8">
// //           <div className="flex justify-between items-center mb-6">
// //             <h1 className="text-[27px] text-[#1f304a] font-medium">Courses</h1>
// //             <button
// //               onClick={() => {
// //                 setEditingIndex(null);
// //                 setShowWizard(true);
// //               }}
// //               className="px-6 xl:px-10 py-3
// //     bg-[#1f304a] text-white
// //     rounded-xl text-[18px] xl:text-[20px]
// //     transition-colors duration-300
// //     hover:bg-[#314279]"
// //             >
// //               Create new Course
// //             </button>
// //           </div>

// //           <div className="space-y-2">
// //             {courses.map((course, index) => (
// //               <div
// //                 key={index}
// //                 className="bg-[#F8F6F6] p-4 sm:p-5 rounded-[15px] shadow
// //                            grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6
// //                            gap-2 items-center place-items-center text-center mt-5"
// //               >
// //                 <div>
// //                   <p className="text-xs text-gray-500">Course title</p>
// //                   <p className="font-medium">{course.title}</p>
// //                 </div>

// //                 <div>
// //                   <p className="text-xs text-gray-500">Course based on</p>
// //                   <p>{course.packageType}</p>
// //                 </div>

// //                 <div>
// //                   <p className="text-xs text-gray-500">Course amount</p>
// //                   <p>{course.amount}</p>
// //                 </div>

// //                 <div className="flex gap-4">
// //                   <button
// //                     onClick={() => handleDelete(index)}
// //                     className="text-[22px] text-gray-600 hover:text-red-600"
// //                   >
// //                     <RiDeleteBin5Line />
// //                   </button>

// //                   <button
// //                     onClick={() => handleEdit(index)}
// //                     className="text-[28px] text-gray-600 hover:text-blue-600"
// //                   >
// //                     <MdEditNote />
// //                   </button>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //         </div>
// //       )}

// //       {/* ================= COURSE WIZARD ================= */}
// //       {showWizard && (
// //         <CourseWizard
// //           onClose={() => setShowWizard(false)}
// //           editingIndex={editingIndex}
// //         />
// //       )}
// //     </>
// //   );
// // }


// "use client";
// import React, { useEffect, useState } from "react";
// import { RiDeleteBin5Line } from "react-icons/ri";
// import { MdEditNote } from "react-icons/md";
// import CourseWizard from "@/components/Course/CourseWizard";
// import useCourseStore from "@/store/useCourseStore";

// export default function Page() {
//   const [showWizard, setShowWizard] = useState(false);
//   const [editingIndex, setEditingIndex] = useState(null);

//   const {
//     courses,
//     fetchCourses,
//     deleteCourse,
//     setCourseId,
//     togglePopular,
//   } = useCourseStore();

//   /* ================= FETCH ON LOAD ================= */
//   useEffect(() => {
//     fetchCourses();
//   }, []);

//   const handleDelete = async (courseId) => {
//     await deleteCourse(courseId);
//   };

//   const handleEdit = (course, index) => {
//     setCourseId(course.id);
//     setEditingIndex(index);
//     setShowWizard(true);
//   };

//   return (
//     <>
//       {!showWizard && (
//         <div className="px-4 sm:px-6 md:px-8">
//           <div className="flex justify-between items-center mb-6">
//             <h1 className="text-[27px] text-[#1f304a] font-medium">
//               Courses
//             </h1>
//             <button
//               onClick={() => {
//                 setEditingIndex(null);
//                 setCourseId(null);
//                 setShowWizard(true);
//               }}
//               className="px-6 xl:px-10 py-3
//               bg-[#1f304a] text-white
//               rounded-xl text-[18px] xl:text-[20px]
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
//                 className="bg-[#F8F6F6] p-4 sm:p-5 rounded-[15px] shadow
//                 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6
//                 gap-2 items-center place-items-center text-center mt-5"
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

//                  <div>
//                   <p className="text-xs text-gray-500">Total Videos</p>
//                   <p>{course.totalVideos}</p>
//                 </div>

//                  <div>
//                   <p className="text-xs text-gray-500">Popular</p>

//                   <button
//                     onClick={() =>
//                       togglePopular(course.id, course.isPopular)
//                     }
//                     className={`w-10 h-5 flex items-center rounded-full p-1 transition ${
//                       course.isPopular ? "bg-green-500" : "bg-gray-300"
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
//                     onClick={() => handleEdit(course, index)}
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

export default function Page() {
  const [showWizard, setShowWizard] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  const {
    courses,
    fetchCourses,
    deleteCourse,
    setCourseId,
    togglePopular,
  } = useCourseStore();

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleDelete = async (courseId) => {
    await deleteCourse(courseId);
  };

  const handleEdit = (course, index) => {
    setCourseId(course.id);
    setEditingIndex(index);
    setShowWizard(true);
  };

  return (
    <>
      {!showWizard && (
        <div className="px-4 sm:px-6 md:px-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-[27px] text-[#1f304a] font-medium">
              Courses
            </h1>
            <button
              onClick={() => {
                setEditingIndex(null);
                setCourseId(null);
                setShowWizard(true);
              }}
              className="px-6 xl:px-10 py-3
              bg-[#1f304a] text-white
              rounded-xl text-[18px] xl:text-[20px]
              transition-colors duration-300
              hover:bg-[#314279]"
            >
              Create new Course
            </button>
          </div>

          <div className="space-y-2">
            {courses?.map((course, index) => (
              <div
                key={course.id}
                className="bg-[#F8F6F6] p-4 sm:p-5 rounded-[15px] shadow
                grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6
                gap-2 items-center place-items-center text-center mt-5"
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
                  <p className="text-xs text-gray-500 ">Popular</p>

                  <button
                    onClick={() =>
                      togglePopular(course.id, course.isPopular)
                    }
                    className={`w-10 h-5 flex items-center rounded-full p-1 transition ${
                      course.isPopular ? "bg-blue-950" : "bg-gray-300"
                    }`}
                  >
                    <div
                      className={`bg-white w-4 h-4 rounded-full shadow-md transform transition ${
                        course.isPopular ? "translate-x-5" : ""
                      }`}
                    />
                  </button>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => handleDelete(course.id)}
                    className="text-[22px] text-gray-600 hover:text-red-600"
                  >
                    <RiDeleteBin5Line />
                  </button>

                  <button
                    onClick={() => handleEdit(course, index)}
                    className="text-[28px] text-gray-600 hover:text-blue-600"
                  >
                    <MdEditNote />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {showWizard && (
        <CourseWizard
          onClose={() => setShowWizard(false)}
          editingIndex={editingIndex}
        />
      )}
    </>
  );
}

