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
import { useEffect, useState } from "react";
import { FaPen, FaChevronDown, FaChevronRight } from "react-icons/fa";
import { BiSolidEdit } from "react-icons/bi";
import { RiDeleteBin5Fill } from "react-icons/ri";

import useCourseStore from "@/store/useCourseStore";
import useCategoryStore from "@/store/categoryStore";

export default function ContentInputs({ courseId, onCancel, onNext }) {
  const { updateCourse, loading } = useCourseStore();
  const { categories, fetchCategories } = useCategoryStore();

  const [contents, setContents] = useState(["", "", "", "", ""]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  /* ---------------- FETCH CATEGORY TREE ---------------- */
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  /* ---------------- TOGGLE CATEGORY ---------------- */
  const toggleCategory = (id) => {
    setSelectedCategories((prev) =>
      prev.includes(id)
        ? prev.filter((cid) => cid !== id)
        : [...prev, id]
    );
  };

  /* ---------------- SUBMIT ---------------- */
  const handleSubmit = async () => {
    const payload = {
      learningOutcomes: contents.filter((c) => c.trim() !== ""),
      categoryIds: selectedCategories,
    };

    try {
      await updateCourse(courseId, payload);
      onNext();
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  /* ---------------- CATEGORY TREE (INLINE) ---------------- */
  const CategoryNode = ({ cat, level = 0 }) => {
    const [open, setOpen] = useState(false);
    const hasChildren = cat.children && cat.children.length > 0;

    return (
      <div className="mb-2">
        <div
          className="flex items-center border "
          style={{ marginLeft: level * 12 }}
          onClick={() => hasChildren && setOpen(!open)}
        >
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={selectedCategories.includes(cat.id)}
              onChange={(e) => {
                e.stopPropagation();
                toggleCategory(cat.id);
              }}
            />
            <span className="text-sm">{cat.name}</span>
          </div>

          {hasChildren &&
            (open ? (
              <FaChevronDown className="text-gray-500" />
            ) : (
              <FaChevronRight className="text-gray-500" />
            ))}
        </div>
        {open &&
          hasChildren &&
          cat.children.map((child) => (
            <CategoryNode
              key={child.id}
              cat={child}
              level={level + 1}
            />
          ))}
      </div>
    );
  };

  /* ---------------- UI ---------------- */
  return (
    <div className="fixed inset-0 bg-black/60 p-4 flex items-center justify-center">
      <div className="bg-white w-full max-w-[1000px] rounded-xl shadow-lg p-6 px-8">
        <h1 className="text-[#1f285b] text-[20px] font-semibold">
          Course thumbnail & contents
        </h1>

        <div className="flex gap-[20px] mt-[20px]">
          {/* LEFT SIDE */}
          <div className="w-[50%] border-r-2 pr-5 border-[#bbbfbf]">
            <h2 className="flex items-center gap-1 font-semibold text-[16px] mb-3">
              Content title <FaPen />
            </h2>

            {contents.map((value, index) => (
              <div key={index} className="flex gap-2 mb-3">
                <input
                  className="p-[10px] rounded-[10px] w-[85%] border"
                  value={value}
                  placeholder={`Type content ${index + 1}`}
                  onChange={(e) => {
                    const updated = [...contents];
                    updated[index] = e.target.value;
                    setContents(updated);
                  }}
                />

                <button>
                  <BiSolidEdit />
                </button>

                <button
                  onClick={() =>
                    setContents((prev) =>
                      prev.filter((_, i) => i !== index)
                    )
                  }
                >
                  <RiDeleteBin5Fill />
                </button>
              </div>
            ))}
          </div>

          {/* RIGHT SIDE — CATEGORY TREE */}
          <div className="w-[50%]">
            <h1 className="font-semibold text-[16px] mb-3">
              Select categories
            </h1>

            <div className=" rounded-[12px] p-3 max-h-[400px]  overflow-y-auto">
              {categories.map((cat) => (
                <CategoryNode key={cat.id} cat={cat} />
              ))}
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="flex justify-end gap-6 mt-8">
          <button
            onClick={onCancel}
            className="px-10 py-2 bg-gray-400 text-white rounded-lg"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-10 py-2 bg-[#1f304a] text-white rounded-lg"
          >
            {loading ? "Saving..." : "Save & Continue"}
          </button>
        </div>
      </div>
    </div>
  );
}
