// import { FaPen } from "react-icons/fa";
// import { BiSolidEdit } from "react-icons/bi";
// import { RiDeleteBin5Fill } from "react-icons/ri";
// import { FaChevronDown } from "react-icons/fa";

// export default function ContentInputs({onCancel}) {
//   const inputs = Array.from({ length: 5 });
//   const items = Array.from({ length: 3 });
//     const handleSubmit = () => {
//     router.push("/admin/courses/createmodule");

//     }
//   return (
//     <div className="fixed inset-0 bg-black/60 p-4 flex items-center justify-center">
//       <div className="bg-white w-full max-w-[1000px] rounded-xl shadow-lg p-6 px-8 ">
//         <h1 className="text-[#1f285b] text-[20px] font-semibold">
//           Course thumbnail & contents
//         </h1>
//         {/* Title — rendered ONCE */}
//         <div className="flex justify-start items-start gap-[20px] mt-[20px]">
//           <div className="w-[50%] border-r-2 pr-5 border-[#bbbfbf]">
//             <h2 className="flex items-center gap-1 font-semibold text-[16px] mb-3">
//               Content title <FaPen />
//             </h2>

//             {/* Inputs — mapped */}
//             {inputs.map((_, index) => (
//               <div
//                 key={index}
//                 className="flex justify-between items-center gap-2 mb-3"
//               >
//                 <input
//                   className="p-[10px] rounded-[10px] w-[85%] border outline-[#9a9696] border-[#bbbfbf]"
//                   type="text"
//                   placeholder={`Type content ${index + 1}`}
//                 />

//                 <button className="text-[22px]">
//                   <BiSolidEdit className="text-[#555555] cursor-pointer
//                 hover:text-blue-900  hover:scale-110
//                 transition-all duration-200"/>
//                 </button>

//                 <button className="text-[22px]">
//                   <RiDeleteBin5Fill className="text-[#555555] cursor-pointer
//                 hover:text-[#cf2323] hover:scale-110
//                 transition-all duration-200"/>
//                 </button>
//               </div>
//             ))}
//           </div>
//           <div className="w-[50%] flex flex-col items-start">
//             <h1 className="font-semibold text-[16px] mb-3">Select package</h1>

//             {items.map((_, id) => (
//               <div key={id} className="relative flex items-center mb-3 w-[85%]">
//                 {/* Select */}
//                 <select
//                   className="w-full p-[10px] pr-[40px] rounded-[10px] border border-[#bbbfbf] bg-white appearance-none"
//                   defaultValue=""
//                 >
//                   <option value="" disabled>
//                     Select package {id + 1}
//                   </option>
//                   <option value="basic">Basic</option>
//                   <option value="standard">Standard</option>
//                   <option value="premium">Premium</option>
//                 </select>

//                 {/* Custom Arrow Icon */}
//                 <FaChevronDown className="absolute right-4 pointer-events-none text-[#606060]" />
//               </div>
//             ))}
//           </div>
//         </div>
//         <div className="flex justify-end gap-6 mt-8">
//           <button onClick={onCancel} className="px-10 py-2 rounded-lg bg-gray-400 text-white w-[200px]">
//             Cancel
//           </button>
//           <button onClick={handleSubmit} className="px-10 py-2 rounded-lg bg-[#1f304a] text-white w-[200px]">
//             Save & Continue
//           </button>
//         </div>
//       </div>
//     </div>
//   )
//     }


"use client";
import { useState } from "react";
import useCourseStore from "@/store/useCourseStore";
import { BiSolidEdit } from "react-icons/bi";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { FaChevronDown, FaPen } from "react-icons/fa";

export default function CourseContent({ courseId, onCancel, onNext }) {
  const { updateCourse, loading } = useCourseStore();

  

  const [instructorName, setInstructorName] = useState("");
  const [instructorQualification, setInstructorQualification] = useState("");
  const [instructorImage, setInstructorImage] = useState("");
  const [learningOutcomes, setLearningOutcomes] = useState([]);

  // Example: add outcome (use existing UI input)
  const addOutcome = (value) => {
    if (!value.trim()) return;
    setLearningOutcomes((prev) => [...prev, value]);
  };

  const handleSubmit = async () => {
    const payload = {
      instructorName,
      instructorQualification,
      instructorImage, // Cloudinary URL
      learningOutcomes,
    };

    try {
      await updateCourse(courseId, payload);
      onNext(); // go to screen 3
    } catch (err) {
      console.error("Update failed", err);
    }
  };
  
   const inputs = Array.from({ length: 5 });
  const items = Array.from({ length: 3 });

  return (
    
     <div className="fixed inset-0 bg-black/60 p-4 flex items-center justify-center">
       <div className="bg-white w-full max-w-[1000px] rounded-xl shadow-lg p-6 px-8 ">
         <h1 className="text-[#1f285b] text-[20px] font-semibold">
           Course thumbnail & contents
         </h1>
         {/* Title — rendered ONCE */}
         <div className="flex justify-start items-start gap-[20px] mt-[20px]">
           <div className="w-[50%] border-r-2 pr-5 border-[#bbbfbf]">
             <h2 className="flex items-center gap-1 font-semibold text-[16px] mb-3">
              Content title <FaPen />
            </h2>

             {/* Inputs — mapped */}
             {inputs.map((_, index) => (
              <div
                key={index}
                className="flex justify-between items-center gap-2 mb-3"
              >
                <input
                  className="p-[10px] rounded-[10px] w-[85%] border outline-[#9a9696] border-[#bbbfbf]"
                  type="text"
                  placeholder={`Type content ${index + 1}`}
                />

                <button className="text-[22px]">
                  <BiSolidEdit className="text-[#555555] cursor-pointer
                hover:text-blue-900  hover:scale-110
                transition-all duration-200"/>
                </button>

                <button className="text-[22px]">
                  <RiDeleteBin5Fill className="text-[#555555] cursor-pointer
                hover:text-[#cf2323] hover:scale-110
                transition-all duration-200"/>
                </button>
              </div>
            ))}
          </div>
          <div className="w-[50%] flex flex-col items-start">
            <h1 className="font-semibold text-[16px] mb-3">Select package</h1>

            {items.map((_, id) => (
              <div key={id} className="relative flex items-center mb-3 w-[85%]">
                {/* Select */}
                <select
                  className="w-full p-[10px] pr-[40px] rounded-[10px] border border-[#bbbfbf] bg-white appearance-none"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select package {id + 1}
                  </option>
                  <option value="basic">Basic</option>
                  <option value="standard">Standard</option>
                  <option value="premium">Premium</option>
                </select>

                {/* Custom Arrow Icon */}
                <FaChevronDown className="absolute right-4 pointer-events-none text-[#606060]" />
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-end gap-6 mt-8">
          <button onClick={onCancel} className="px-10 py-2 rounded-lg bg-gray-400 text-white w-[200px]">
            Cancel
          </button>
         <button
        onClick={handleSubmit}
        disabled={loading}
        className="px-10 py-2 rounded-lg bg-[#1f304a] text-white"
      >
        {loading ? "Saving..." : "Save & Continue"}
      </button>
        </div>
      </div>
    </div>
  );
}
