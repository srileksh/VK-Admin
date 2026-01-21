// "use client";
// import { useState } from "react";
// import { IoMdAddCircle } from "react-icons/io";
// import SubPackageItem from "./SubPackageItem";
// import { RiDeleteBin5Fill } from "react-icons/ri";
// import { BiSolidEdit } from "react-icons/bi";

// export default function PackageItem() {
//   const [showInput, setShowInput] = useState(false);
//   const [subName, setSubName] = useState("");

//   const handleAdd = () => {
//     if (!subName.trim()) return;
//     addSubPackage(pkg.id, subName);
//     setSubName("");
//     setShowInput(false);
//   };

//   return (
//     <div>
//       <div className="bg-[#c4c4ff] px-5 py-3 rounded-xl w-[70%] flex justify-between items-center">z
//         <div>
//           <p className="text-[12px]">Package name</p>
//           <p className="text-[18px]">{pkg.name}</p>
//         </div>

        // <button
        //   onClick={() => setShowInput(true)}
        //   className="flex items-center gap-2 underline underline-offset-4"
        // >
        //   <IoMdAddCircle className="text-[26px]" />
        //   Add Sub package
        // </button>
//         <div className="flex gap-4">
//           <RiDeleteBin5Fill className="text-[24px] cursor-pointer" />
//           <BiSolidEdit className="text-[24px] cursor-pointer" />
//         </div>
//       </div>

//       {showInput && (
//         <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
//           <div className="bg-white p-8 rounded-lg w-[420px]">
//             <h2 className="text-[22px] mb-2">Create new package for {pkg.name}</h2>
//             <p className="text-[#5d5d5d] font-semibold ">Name of package</p>

//             <input
//               value={subName}
//               onChange={(e) => setSubName(e.target.value)}
//               className="w-full border border-[#5d5d5d] px-4 py-3 rounded-lg outline-none"
//               placeholder="Package name"
//             />

//             <div className="flex gap-4 mt-6">
//               <button
//                 onClick={onclose}
//                 className="w-1/2 py-3 bg-gray-400 text-white rounded-lg"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleAdd}
//                 className="w-1/2 py-3 bg-[#5d5d5d] text-white rounded-lg"
//               >
//                 Create
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {pkg.subPackages.map((sub) => (
//         <SubPackageItem key={sub.id} sub={sub} />
//       ))}
//     </div>
//   );
// }











// "use client";
// import { useEffect, useState } from "react";
// import { IoMdAddCircle } from "react-icons/io";
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

//   useEffect(() => {
//     fetchCategories();
//   }, [fetchCategories]);

//   // 🔹 Handle add / edit
//   const handleAddOrEdit = async () => {
//     if (!subName.trim()) return;

//     if (selectedEdit) {
//       // Edit
//       await updateCategory(selectedEdit.id, { name: subName });
//     } else if (selectedParent) {
//       // Add
//       await createCategory({ name: subName, parentId: selectedParent.id });
//     }

//     setSubName("");
//     setSelectedEdit(null);
//     setSelectedParent(null);
//     setShowInput(false);
//   };

//   // 🔹 Handle delete
//   const handleDelete = async () => {
//     if (!selectedDelete) return;
//     await deleteCategory(selectedDelete.id);
//     setSelectedDelete(null);
//     setShowDelete(false);
//   };

//   // Recursive render
//   const renderCategory = (category, level = 0, parentId = null) => {
//     return (
//       <div key={category.id} className="mt-4">
//         {/* Package Card */}
//         <div
//           className="bg-[#c4c4ff] px-5 py-3 rounded-xl w-[70%]  flex justify-between items-center"
//           style={{ marginLeft: level * 40 }}
//         >
//           <div>
//             <p className="text-[12px]">
//               {level === 0 ? "Package name" : "Sub package name"}
//             </p>
//             <p className="text-[18px] font-semibold">{category.name}</p>
//           </div>

//           <div className="flex gap-4 items-center">
//             {/* Add Sub */}
            

//              <button
//               onClick={() => {
//                 setSelectedParent(category);
//                 setSelectedEdit(null);
//                 setSubName("");
//                 setShowInput(true);
//               }}
//           className="flex items-center gap-2 underline underline-offset-4"
//         >
//           <IoMdAddCircle
//               className="text-[26px] cursor-pointer"
//               title="Add sub package"
             
//             />
//           Add Sub package
//         </button>

//             {/* Edit */}
//             <BiSolidEdit
//               className="text-[22px] cursor-pointer"
//               title="Edit"
//               onClick={() => {
//                 setSelectedEdit(category);
//                 setSelectedParent(null);
//                 setSubName(category.name);
//                 setShowInput(true);
//               }}
//             />

//             {/* Delete */}
//             <RiDeleteBin5Fill
//               className="text-[22px] cursor-pointer"
//               title="Delete"
//               onClick={() => {
//                 setSelectedDelete(category);
//                 setShowDelete(true);
//               }}
//             />
//           </div>
//         </div>

//         {/* Children */}
//         {category.children?.map((child) =>
//           renderCategory(child, level + 1, category.id)
//         )}
//       </div>
//     );
//   };

//   return (
//     <div className="p-6 space-y-4">
//       {categories.map((category) => renderCategory(category))}

//       {/* Add / Edit Popup */}
//       {showInput && (selectedParent || selectedEdit) && (
//         <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
//           <div className="bg-white p-8 rounded-lg w-[420px]">
//             <h2 className="text-[22px] mb-2">
//               {selectedEdit
//                 ? `Edit ${selectedEdit.name}`
//                 : `Create new package for ${selectedParent.name}`}
//             </h2>
//             <p className="text-[#5d5d5d] font-semibold mb-1">Name of package</p>

//             <input
//               value={subName}
//               onChange={(e) => setSubName(e.target.value)}
//               className="w-full border border-[#5d5d5d] px-4 py-3 rounded-lg outline-none"
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

//       {/* Delete Confirmation Popup */}
//       {showDelete && selectedDelete && (
//         <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
//           <div className="bg-white p-8 rounded-lg w-[420px]">
//             <h2 className="text-[20px] font-semibold mb-4">Confirm Delete</h2>
//             <p>
//               Are you sure you want to delete <strong>{selectedDelete.name}</strong>
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
import { IoIosArrowForward, IoMdAddCircle } from "react-icons/io";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { BiSolidEdit } from "react-icons/bi";
import useCategoryStore from "@/store/categoryStore";
import { IoIosArrowDown } from "react-icons/io";

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
  const [openIds, setOpenIds] = useState({}); // track expanded parents

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // Toggle sub-categories
  const toggleOpen = (id) => {
    setOpenIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Add / Edit
  const handleAddOrEdit = async () => {
    if (!subName.trim()) return;

    if (selectedEdit) {
      await updateCategory(selectedEdit.id, { name: subName });
    } else if (selectedParent) {
      await createCategory({ name: subName, parentId: selectedParent.id });
    }

    setSubName("");
    setSelectedEdit(null);
    setSelectedParent(null);
    setShowInput(false);
  };

  // Delete
  const handleDelete = async () => {
    if (!selectedDelete) return;
    await deleteCategory(selectedDelete.id);
    setSelectedDelete(null);
    setShowDelete(false);
  };

  // Recursive render
  const renderCategory = (category, level = 0) => {
    const isOpen = openIds[category.id];
    const hasChildren = category.children?.length > 0;

    return (
      <div key={category.id} className="mt-4">
        {/* Parent Card */}
        <div
          className="bg-[#c4c4ff] px-5 py-3 rounded-xl w-[70%] flex justify-between items-center cursor-pointer"
          style={{ marginLeft: level * 40 }}
        >
          <div className="flex items-center gap-2" onClick={() => hasChildren && toggleOpen(category.id)}>
            {/* Arrow */}
            {hasChildren && (
              <span className="text-[18px] font-bold">
                {isOpen ? <IoIosArrowDown/>: <IoIosArrowForward/>}
              </span>
            )}
            <div>
              <p className="text-[12px]">
                {level === 0 ? "Package name" : "Sub package name"}
              </p>
              <p className="text-[18px] font-semibold">{category.name}</p>
            </div>
          </div>

          <div className="flex gap-4 items-center">
            {/* Add Sub */}
            <button
              onClick={(e) => {
                e.stopPropagation(); // prevent toggle
                setSelectedParent(category);
                setSelectedEdit(null);
                setSubName("");
                setShowInput(true);
              }}
              className="flex items-center gap-2 underline underline-offset-4"
            >
              <IoMdAddCircle className="text-[26px]" /> Add Sub package
            </button>

            {/* Edit */}
            <BiSolidEdit
              className="text-[22px] cursor-pointer"
              title="Edit"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedEdit(category);
                setSelectedParent(null);
                setSubName(category.name);
                setShowInput(true);
              }}
            />

            {/* Delete */}
            <RiDeleteBin5Fill
              className="text-[22px] cursor-pointer"
              title="Delete"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedDelete(category);
                setShowDelete(true);
              }}
            />
          </div>
        </div>

        {/* Sub-categories (only if open) */}
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

      {/* Add / Edit Popup */}
      {showInput && (selectedParent || selectedEdit) && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg w-[420px]">
            <h2 className="text-[22px] mb-2">
              {selectedEdit
                ? `Edit ${selectedEdit.name}`
                : `Create new package for ${selectedParent.name}`}
            </h2>
            <p className="text-[#5d5d5d] font-semibold mb-1">Name of package</p>

            <input
              value={subName}
              onChange={(e) => setSubName(e.target.value)}
              className="w-full border border-[#5d5d5d] px-4 py-3 rounded-lg outline-none"
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

      {/* Delete Confirmation Popup */}
      {showDelete && selectedDelete && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg w-[420px]">
            <h2 className="text-[20px] font-semibold mb-4">Confirm Delete</h2>
            <p>
              Are you sure you want to delete <strong>{selectedDelete.name}</strong>
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
