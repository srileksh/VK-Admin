// "use client";
// import { useEffect, useState } from "react";
// import { IoIosArrowForward, IoIosArrowDown, IoMdAddCircle } from "react-icons/io";
// import { RiDeleteBin5Fill } from "react-icons/ri";
// import { BiSolidEdit } from "react-icons/bi";
// import useCategoryStore from "@/store/categoryStore";

// export default function PackageItem() {
//   const {
//     categories,
//     fetchCategories,
//     createCategory,
//     updateCategory,
//     deleteCategory,
//   } = useCategoryStore();

//   const [showInput, setShowInput] = useState(false);
//   const [showDelete, setShowDelete] = useState(false);
//   const [subName, setSubName] = useState("");
//   const [selectedParent, setSelectedParent] = useState(null);
//   const [selectedEdit, setSelectedEdit] = useState(null);
//   const [selectedDelete, setSelectedDelete] = useState(null);
//   const [openIds, setOpenIds] = useState({});

//   useEffect(() => {
//     fetchCategories();
//   }, [fetchCategories]);

//   const toggleOpen = (id) => {
//     setOpenIds((prev) => ({ ...prev, [id]: !prev[id] }));
//   };

//   const handleAddOrEdit = async () => {
//     if (!subName.trim()) return;

//     if (selectedEdit) {
//       await updateCategory(selectedEdit.id, { name: subName });
//     } else if (selectedParent) {
//       await createCategory({
//         name: subName,
//         parentId: selectedParent.id,
//       });
//     }

//     setSubName("");
//     setSelectedEdit(null);
//     setSelectedParent(null);
//     setShowInput(false);
//   };

//   const handleDelete = async () => {
//     if (!selectedDelete) return;
//     await deleteCategory(selectedDelete.id);
//     setSelectedDelete(null);
//     setShowDelete(false);
//   };

//   // 🔁 Recursive renderer
//   const renderCategory = (category, level = 0) => {
//     const isOpen = openIds[category.id];
//     const hasChildren = category.children?.length > 0;

//     // 🎨 COLOR LOGIC
//     const bgColor =
//       level === 0 ? " bg-[#c4c4ff]" : "bg-[#c59ffe]";

//     return (
//       <div key={category.id} className="mt-4">
//         <div
//           className={`${bgColor} px-5 py-3 rounded-xl w-[70%] flex justify-between items-center cursor-pointer`}
//           style={{ marginLeft: level * 40 }}
//         >
//           {/* LEFT */}
//           <div
//             className="flex items-center gap-2"
//             onClick={() => hasChildren && toggleOpen(category.id)}
//           >
//             {hasChildren && (
//               <span className="text-[18px] font-bold">
//                 {isOpen ? <IoIosArrowDown  className="text-[#606060]"/> : <IoIosArrowForward className="text-[#606060] text-[20px]"/>}
//               </span>
//             )}

//             <div>
//               <p className="text-[12px] text-[#606060]">
//                 {level === 0 ? "Package name" : "Sub package name"}
//               </p>
//               <p className="text-[18px]  font-semibold">{category.name}</p>
//             </div>
//           </div>

//           {/* ACTIONS */}
//           <div className="flex gap-4 items-center">
//             <button
//               onClick={(e) => {
//                 e.stopPropagation();
//                 setSelectedParent(category);
//                 setSelectedEdit(null);
//                 setSubName("");
//                 setShowInput(true);
//               }}
//               className="flex items-center gap-2 underline underline-offset-4 text-[#606060]"
//             >
//               <IoMdAddCircle className="text-[26px] text-[#606060]" />
//               Add Sub package
//             </button>

//             <BiSolidEdit
//               className="text-[26px] cursor-pointer text-[#606060]"
//               onClick={(e) => {
//                 e.stopPropagation();
//                 setSelectedEdit(category);
//                 setSelectedParent(null);
//                 setSubName(category.name);
//                 setShowInput(true);
//               }}
//             />

//             <RiDeleteBin5Fill
//               className="text-[26px] cursor-pointer text-[#606060]"
//               onClick={(e) => {
//                 e.stopPropagation();
//                 setSelectedDelete(category);
//                 setShowDelete(true);
//               }}
//             />
//           </div>
//         </div>

//         {/* CHILDREN */}
//         {isOpen &&
//           category.children?.map((child) =>
//             renderCategory(child, level + 1)
//           )}
//       </div>
//     );
//   };

//   return (
//     <div className="p-6 space-y-4">
//       {categories.map((category) => renderCategory(category))}

//       {/* ADD / EDIT MODAL */}
//       {showInput && (selectedParent || selectedEdit) && (
//         <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
//           <div className="bg-white p-8 rounded-lg w-[420px]">
//             <h2 className="text-[22px] mb-2">
//               {selectedEdit
//                 ? `Edit ${selectedEdit.name}`
//                 : `Create new package for ${selectedParent.name}`}
//             </h2>

//             <p className="text-[#5d5d5d] font-semibold mb-1">
//               Name of package
//             </p>

//             <input
//               value={subName}
//               onChange={(e) => setSubName(e.target.value)}
//               className="w-full border px-4 py-3 rounded-lg outline-none"
//               placeholder="Package name"
//             />

//             <div className="flex gap-4 mt-6">
//               <button
//                 onClick={() => {
//                   setShowInput(false);
//                   setSelectedParent(null);
//                   setSelectedEdit(null);
//                   setSubName("");
//                 }}
//                 className="w-1/2 py-3 bg-gray-400 text-white rounded-lg"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleAddOrEdit}
//                 className="w-1/2 py-3 bg-[#5d5d5d] text-white rounded-lg"
//               >
//                 {selectedEdit ? "Update" : "Create"}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* DELETE MODAL */}
//       {showDelete && selectedDelete && (
//         <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
//           <div className="bg-white p-8 rounded-lg w-[420px]">
//             <h2 className="text-[20px] font-semibold mb-4">
//               Confirm Delete
//             </h2>
//             <p>
//               Are you sure you want to delete{" "}
//               <strong>{selectedDelete.name}</strong>
//               {selectedDelete.children?.length > 0 &&
//                 ` and its ${selectedDelete.children.length} sub-package(s)`}?
//             </p>

//             <div className="flex gap-4 mt-6">
//               <button
//                 onClick={() => setShowDelete(false)}
//                 className="w-1/2 py-3 bg-gray-400 text-white rounded-lg"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleDelete}
//                 className="w-1/2 py-3 bg-red-600 text-white rounded-lg"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
"use client";
import { useEffect, useState } from "react";
import {
  IoIosArrowForward,
  IoIosArrowDown,
  IoMdAddCircle,
} from "react-icons/io";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { BiSolidEdit } from "react-icons/bi";
import useCategoryStore from "@/store/categoryStore";

export default function PackageItem() {
  const {
    categories,
    fetchCategories,
    createCategory,
    updateCategory,
    deleteCategory,
  } = useCategoryStore();

  const [showInput, setShowInput] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [subName, setSubName] = useState("");
  const [selectedParent, setSelectedParent] = useState(null);
  const [selectedEdit, setSelectedEdit] = useState(null);
  const [selectedDelete, setSelectedDelete] = useState(null);
  const [openIds, setOpenIds] = useState({});

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const toggleOpen = (id) => {
    setOpenIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleAddOrEdit = async () => {
    if (!subName.trim()) return;

    if (selectedEdit) {
      await updateCategory(selectedEdit.id, { name: subName });
    } else if (selectedParent) {
      await createCategory({
        name: subName,
        parentId: selectedParent.id,
      });
    }

    setSubName("");
    setSelectedEdit(null);
    setSelectedParent(null);
    setShowInput(false);
  };

  const handleDelete = async () => {
    if (!selectedDelete) return;
    await deleteCategory(selectedDelete.id);
    setSelectedDelete(null);
    setShowDelete(false);
  };

  // 🔁 Recursive renderer
  const renderCategory = (category, level = 0) => {
    const isOpen = openIds[category.id];
    const hasChildren = category.children?.length > 0;

    // 🎨 COLOR RULE
    const bgColor =
level === 0 ? " bg-[#c4c4ff]" : "bg-[#c59ffe]";
    return (
      <div key={category.id} className="mt-4">
        {/* CARD */}
        <div
          className={`${bgColor} px-5 py-3 rounded-xl w-[70%]
          flex justify-between items-center cursor-pointer
          hover:brightness-105 transition-all duration-200`}
          style={{ marginLeft: level * 40 }}
        >
          {/* LEFT */}
          <div
            className="flex items-center gap-2"
            onClick={() => hasChildren && toggleOpen(category.id)}
          >
            {hasChildren && (
              <span className="text-[18px] font-bold text-[#606060]">
                {isOpen ? <IoIosArrowDown /> : <IoIosArrowForward />}
              </span>
            )}

            <div>
              <p className="text-[12px] text-[#606060]">
                {level === 0 ? "Package name" : "Sub package name"}
              </p>
              <p className="text-[18px] font-semibold">
                {category.name}
              </p>
            </div>
          </div>

          {/* ACTIONS */}
          <div className="flex gap-5 items-center">
            {/* ADD */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedParent(category);
                setSelectedEdit(null);
                setSubName("");
                setShowInput(true);
              }}
              className="
                flex items-center gap-2 underline underline-offset-4
                text-[#606060] text-[15px]
                hover:text-[#555555] hover:scale-105
                transition-all duration-200
              "
            >
              <IoMdAddCircle className="text-[28px]" />
              Add Sub package
            </button>

            {/* EDIT */}
            <BiSolidEdit
              className="
                text-[28px] cursor-pointer text-[#606060]
                hover:text-[#555555] hover:scale-110
                transition-all duration-200
              "
              onClick={(e) => {
                e.stopPropagation();
                setSelectedEdit(category);
                setSelectedParent(null);
                setSubName(category.name);
                setShowInput(true);
              }}
            />

            {/* DELETE */}
            <RiDeleteBin5Fill
              className="
                text-[28px] cursor-pointer text-[#606060]
                hover:text-[#555555] hover:scale-110
                transition-all duration-200
              "
              onClick={(e) => {
                e.stopPropagation();
                setSelectedDelete(category);
                setShowDelete(true);
              }}
            />
          </div>
        </div>

        {/* CHILDREN */}
        {isOpen &&
          category.children?.map((child) =>
            renderCategory(child, level + 1)
          )}
      </div>
    );
  };

  return (
    <div className="p-6 space-y-4">
      {categories.map((category) => renderCategory(category))}

      {/* ADD / EDIT MODAL */}
      {showInput && (selectedParent || selectedEdit) && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg w-[420px]">
            <h2 className="text-[22px] mb-2">
              {selectedEdit
                ? `Edit ${selectedEdit.name}`
                : `Create new package for ${selectedParent.name}`}
            </h2>

            <p className="text-[#5d5d5d] font-semibold mb-1">
              Name of package
            </p>

            <input
              value={subName}
              onChange={(e) => setSubName(e.target.value)}
              className="w-full border px-4 py-3 rounded-lg outline-none"
              placeholder="Package name"
            />

            <div className="flex gap-4 mt-6">
              <button
                onClick={() => {
                  setShowInput(false);
                  setSelectedParent(null);
                  setSelectedEdit(null);
                  setSubName("");
                }}
                className="w-1/2 py-3 bg-gray-400 text-white rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleAddOrEdit}
                className="w-1/2 py-3 bg-[#5d5d5d] text-white rounded-lg"
              >
                {selectedEdit ? "Update" : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE MODAL */}
      {showDelete && selectedDelete && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg w-[420px]">
            <h2 className="text-[20px] font-semibold mb-4">
              Confirm Delete
            </h2>
            <p>
              Are you sure you want to delete{" "}
              <strong>{selectedDelete.name}</strong>
              {selectedDelete.children?.length > 0 &&
                ` and its ${selectedDelete.children.length} sub-package(s)`}?
            </p>

            <div className="flex gap-4 mt-6">
              <button
                onClick={() => setShowDelete(false)}
                className="w-1/2 py-3 bg-gray-400 text-white rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="w-1/2 py-3 bg-red-600 text-white rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
