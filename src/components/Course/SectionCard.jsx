"use client";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { FaCircleMinus, FaPen } from "react-icons/fa6";
import { GoPlus } from "react-icons/go";
import { LiaSave } from "react-icons/lia";
import { MdDelete } from "react-icons/md";
import useSectionStore from "@/store/useSectionStore";

export default function SectionCard({
  sectionId,
  title,
  isOpen,
  onToggle,
  onDelete,
  children,
}) {
  const [editingTitle, setEditingTitle] = useState(false);
  const [sectionTitle, setSectionTitle] = useState(title);
  const [deleting, setDeleting] = useState(false);

  const { updateSection, deleteSection } = useSectionStore();

  const handleUpdateSectionTitle = async () => {
    if (!sectionTitle.trim()) {
      toast.error("Section title cannot be empty");
      return;
    }

    const toastId = toast.loading("Updating section...");

    try {
      await updateSection({
        sectionId,
        title: sectionTitle,
      });

      toast.success("Section title updated", { id: toastId });
      setEditingTitle(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update section", { id: toastId });
    }
  };

//   const handleDeleteSection = async () => {
//     const confirmDelete = confirm(
//       "Are you sure you want to delete this section?"
//     );

//     if (!confirmDelete) return;

//     const toastId = toast.loading("Deleting section...");

//     try {
//       setDeleting(true);
//       await deleteSection(sectionId);
//       toast.success("Section deleted", { id: toastId });
//       onDelete?.();
//     } catch (error) {
//       console.error(error);
//       toast.error("Failed to delete section", { id: toastId });
//     } finally {
//       setDeleting(false);
//     }
//   };


const handleDeleteSection = async () => {
  if (deleting) return;

  const confirmDelete = confirm(
    "Are you sure you want to delete this section?"
  );

  if (!confirmDelete) return;

  const toastId = toast.loading("Deleting section...");

  try {
    setDeleting(true);

    await deleteSection(sectionId);

    toast.success("Section deleted", { id: toastId });
    onDelete(); // remove from parent
  } catch (error) {
    console.error(error);
    toast.error("Failed to delete section", { id: toastId });
  } finally {
    setDeleting(false);
  }
};

  return (
    <div className="border border-gray-100 shadow-md rounded-lg p-4 sm:p-5 mb-4">
      <div className="flex justify-between items-center border-b pb-2 mb-4">
        <div className="flex items-center gap-2">
          {editingTitle ? (
            <input
              value={sectionTitle}
              onChange={(e) => setSectionTitle(e.target.value)}
              className="border px-2 py-1 text-sm rounded outline-gray-400"
            />
          ) : (
            <span className="text-sm font-medium">{sectionTitle}</span>
          )}
        </div>

        <div className="flex items-center gap-3">
          {!editingTitle && (
            <button
              onClick={() => setEditingTitle(true)}
              className="flex items-center gap-1 text-sm border px-3 py-1 rounded text-blue-600 border-blue-600"
            >
              <FaPen />
              Edit
            </button>
          )}

          {editingTitle && (
            <button
              onClick={handleUpdateSectionTitle}
              className="flex items-center gap-1 text-sm border px-3 py-1 rounded bg-[#37af47] text-white"
            >
              <LiaSave className="text-[18px]" />
              Save
            </button>
          )}

          <button
            onClick={handleDeleteSection}
            disabled={deleting}
            className="flex items-center gap-1 text-sm border px-3 py-1 rounded text-red-600 border-red-600 disabled:opacity-50"
          >
            <MdDelete />
            {deleting ? "Deleting..." : "Delete"}
          </button>

          <button onClick={onToggle} className="text-[26px] text-gray-400">
            {isOpen ? <FaCircleMinus /> : <GoPlus />}
          </button>
        </div>
      </div>

      {isOpen && children}
    </div>
  );
}