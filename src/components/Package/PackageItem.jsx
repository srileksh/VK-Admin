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
import EditPackage from "./EditPackage";
import DeletePackage from "./DeletePackage";

export default function PackageItem() {
  const {
    categories,
    fetchCategories,
    createCategory,
    updateCategory,
    deleteCategory,
  } = useCategoryStore();

  const [subName, setSubName] = useState("");
  const [selectedParent, setSelectedParent] = useState(null);
  const [selectedEdit, setSelectedEdit] = useState(null);
  const [selectedDelete, setSelectedDelete] = useState(null);
    const [showInput, setShowInput] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
  
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
    // const bgColor = level === 0 ? " bg-[#c4c4ff]" : "bg-[#c59ffe]";
  const bgColor =
  level === 0
    ? " bg-[#BBDCE5]"
    : "bg-[#c4c4ff]";
// bg-gradient-to-br from-[#79A3B1] to-[#D0E8F2]

    return (
      <div key={category.id} className="mt-4 ">
        {/* CARD */}
        <div
          className={`${bgColor} px-5 py-3 rounded-xl w-[70%]
          flex justify-between items-center cursor-pointer
          hover:brightness-105 transition-all duration-200 `}
          style={{ marginLeft: level * 40 }}
        >
          {/* LEFT */}
          <div
            className="flex items-center gap-2"
            onClick={() => hasChildren && toggleOpen(category.id)}
          >
            {hasChildren && (
              <span className="text-[18px] font-bold">
                {isOpen ? <IoIosArrowDown /> : <IoIosArrowForward />}
              </span>
            )}

            <div>
              <p className="text-[12px]">
                {level === 0 ? "Package name" : "Sub package name"}
              </p>
              <p className="text-[18px] font-semibold me-4">{category.name}</p>
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
                flex items-center gap-1 underline underline-offset-4
                 text-[15px]
                hover:text-[#555555] hover:scale-105
                transition-all duration-200 w-[160px]
              "
            >
              <IoMdAddCircle className="text-[24px]" />
              Add Sub package
            </button>

            {/* EDIT */}
            <BiSolidEdit
              className="
                text-[24px] cursor-pointer
                hover:text-[#60606] hover:scale-110
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
                text-[24px] cursor-pointer
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
          category.children?.map((child) => renderCategory(child, level + 1))}
      </div>
    );
  };

  return (
    <div className="p-6 space-y-4">
      {categories.map((category) => renderCategory(category))}
        {showInput && (selectedParent || selectedEdit) && (
<EditPackage
  isOpen={showInput && (selectedParent || selectedEdit)}
  isEdit={!!selectedEdit}
  value={subName}
  title={
    selectedEdit
      ? `Edit ${selectedEdit.name}`
      : `Create new package for ${selectedParent?.name}`
  }
  onChange={setSubName}
  onCancel={() => {
    setShowInput(false);
    setSelectedParent(null);
    setSelectedEdit(null);
    setSubName("");
  }}
  onSubmit={handleAddOrEdit}
/>

      )}
          {showDelete && selectedDelete && (
<DeletePackage
  isOpen={showDelete}
  item={selectedDelete}
  onCancel={() => setShowDelete(false)}
  onConfirm={handleDelete}
/>

      )}
    </div>
  );
}
