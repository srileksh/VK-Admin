// "use client";
// import { useState } from "react";
// import { toast } from "react-hot-toast";
// import { FaCircleMinus, FaPen } from "react-icons/fa6";
// import { GoPlus } from "react-icons/go";
// import { LiaSave } from "react-icons/lia";
// import { MdDelete } from "react-icons/md";
// import useSectionStore from "@/store/useSectionStore";

// export default function SectionCard({
//   sectionId,
//   title,
//   isOpen,
//   onToggle,
//   onDelete,
//   children,
// }) {
//   const [editingTitle, setEditingTitle] = useState(false);
//   const [sectionTitle, setSectionTitle] = useState(title);
//   const [deleting, setDeleting] = useState(false);

//   const { updateSection, deleteSection } = useSectionStore();

//   const handleUpdateSectionTitle = async () => {
//     if (!sectionTitle.trim()) {
//       toast.error("Section title cannot be empty");
//       return;
//     }

//     const toastId = toast.loading("Updating section...");

//     try {
//       await updateSection({
//         sectionId,
//         title: sectionTitle,
//       });

//       toast.success("Section title updated", { id: toastId });
//       setEditingTitle(false);
//     } catch (error) {
//       console.error(error);
//       toast.error("Failed to update section", { id: toastId });
//     }
//   };

// //   const handleDeleteSection = async () => {
// //     const confirmDelete = confirm(
// //       "Are you sure you want to delete this section?"
// //     );

// //     if (!confirmDelete) return;

// //     const toastId = toast.loading("Deleting section...");

// //     try {
// //       setDeleting(true);
// //       await deleteSection(sectionId);
// //       toast.success("Section deleted", { id: toastId });
// //       onDelete?.();
// //     } catch (error) {
// //       console.error(error);
// //       toast.error("Failed to delete section", { id: toastId });
// //     } finally {
// //       setDeleting(false);
// //     }
// //   };


// const handleDeleteSection = async () => {
//   if (deleting) return;

//   const confirmDelete = confirm(
//     "Are you sure you want to delete this section?"
//   );

//   if (!confirmDelete) return;

//   const toastId = toast.loading("Deleting section...");

//   try {
//     setDeleting(true);

//     await deleteSection(sectionId);

//     toast.success("Section deleted", { id: toastId });
//     onDelete(); // remove from parent
//   } catch (error) {
//     console.error(error);
//     toast.error("Failed to delete section", { id: toastId });
//   } finally {
//     setDeleting(false);
//   }
// };

//   return (
//     <div className="border border-gray-100 shadow-md rounded-lg p-4 sm:p-5 mb-4">
//       <div className="flex justify-between items-center border-b pb-2 mb-4">
//         <div className="flex items-center gap-2">
//           {editingTitle ? (
//             <input
//               value={sectionTitle}
//               onChange={(e) => setSectionTitle(e.target.value)}
//               className="border px-2 py-1 text-sm rounded outline-gray-400"
//             />
//           ) : (
//             <span className="text-sm font-medium">{sectionTitle}</span>
//           )}
//         </div>

//         <div className="flex items-center gap-3">
//           {!editingTitle && (
//             <button
//               onClick={() => setEditingTitle(true)}
//               className="flex items-center gap-1 text-sm border px-3 py-1 rounded text-blue-600 border-blue-600"
//             >
//               <FaPen />
//               Edit
//             </button>
//           )}

//           {editingTitle && (
//             <button
//               onClick={handleUpdateSectionTitle}
//               className="flex items-center gap-1 text-sm border px-3 py-1 rounded bg-[#37af47] text-white"
//             >
//               <LiaSave className="text-[18px]" />
//               Save
//             </button>
//           )}

//           <button
//             onClick={handleDeleteSection}
//             disabled={deleting}
//             className="flex items-center gap-1 text-sm border px-3 py-1 rounded text-red-600 border-red-600 disabled:opacity-50"
//           >
//             <MdDelete />
//             {deleting ? "Deleting..." : "Delete"}
//           </button>

//           <button onClick={onToggle} className="text-[26px] text-gray-400">
//             {isOpen ? <FaCircleMinus /> : <GoPlus />}
//           </button>
//         </div>
//       </div>

//       {isOpen && children}
//     </div>
//   );
// }


"use client";

import { useEffect, useState } from "react";
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
  const [sectionTitle, setSectionTitle] = useState(title || "");
  const [deleting, setDeleting] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [sectionData, setSectionData] = useState(null);

  const { updateSection, deleteSection, getSectionById } = useSectionStore();

  useEffect(() => {
    const fetchSection = async () => {
      if (!sectionId) return;

      try {
        setFetching(true);

        const data = await getSectionById(sectionId);

        setSectionData(data);
        setSectionTitle(data?.title || "");
      } catch (error) {
        console.error("Fetch section failed:", error);
        toast.error("Failed to fetch section");
      } finally {
        setFetching(false);
      }
    };

    fetchSection();
  }, [sectionId, getSectionById]);

  const handleUpdateSectionTitle = async () => {
    if (!sectionTitle.trim()) {
      toast.error("Section title cannot be empty");
      return;
    }

    const toastId = toast.loading("Updating section...");

    try {
      const updatedData = await updateSection({
        sectionId,
        title: sectionTitle,
      });

      setSectionData((prev) => ({
        ...prev,
        ...updatedData,
        title: sectionTitle,
      }));

      toast.success("Section title updated", { id: toastId });
      setEditingTitle(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update section", { id: toastId });
    }
  };

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
      onDelete?.(sectionId);
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete section", { id: toastId });
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="mb-4 rounded-lg border border-gray-100 p-4 shadow-md sm:p-5">
      <div className="mb-4 flex items-center justify-between border-b pb-2">
        <div className="flex items-center gap-2">
          {fetching ? (
            <span className="text-sm text-gray-500">Loading section...</span>
          ) : editingTitle ? (
            <input
              value={sectionTitle}
              onChange={(e) => setSectionTitle(e.target.value)}
              className="rounded border px-2 py-1 text-sm outline-gray-400"
            />
          ) : (
            <span className="text-sm font-medium">
              {sectionData?.title || sectionTitle || "Untitled Section"}
            </span>
          )}
        </div>

        <div className="flex items-center gap-3">
          {!editingTitle && !fetching && (
            <button
              onClick={() => setEditingTitle(true)}
              className="flex items-center gap-1 rounded border border-blue-600 px-3 py-1 text-sm text-blue-600"
            >
              <FaPen />
              Edit
            </button>
          )}

          {editingTitle && (
            <button
              onClick={handleUpdateSectionTitle}
              className="flex items-center gap-1 rounded border bg-[#37af47] px-3 py-1 text-sm text-white"
            >
              <LiaSave className="text-[18px]" />
              Save
            </button>
          )}

          <button
            onClick={handleDeleteSection}
            disabled={deleting}
            className="flex items-center gap-1 rounded border border-red-600 px-3 py-1 text-sm text-red-600 disabled:opacity-50"
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