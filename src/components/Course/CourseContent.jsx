"use client";
import { useEffect, useState } from "react";
import { FaPen } from "react-icons/fa";
import { BiSolidEdit } from "react-icons/bi";
import { RiDeleteBin5Fill } from "react-icons/ri";

import useCourseStore from "@/store/useCourseStore";
import useCategoryStore from "@/store/categoryStore";

export default function ContentInputs({ courseId, onCancel, onNext }) {
  const { updateCourse, loading } = useCourseStore();
  const { categories, fetchCategories } = useCategoryStore();

  const [contents, setContents] = useState(["", "", "", "", ""]);

  // UI control + tree navigation
  const [selectedIds, setSelectedIds] = useState({});
  const [selectedPath, setSelectedPath] = useState([]);

  /* ---------------- FETCH CATEGORIES ---------------- */
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  /* ---------------- HELPERS ---------------- */
  const getOptionsByLevel = (level) => {
    if (level === 0) return categories || [];
    return selectedPath[level - 1]?.children || [];
  };

  /* ---------------- HANDLE SELECT ---------------- */
  const handleSelect = (level, selectedId) => {
    const options = getOptionsByLevel(level);

    // ✅ STRING comparison (UUID safe)
    const selectedItem = options.find(
      (opt) => opt.id === selectedId
    );

    if (!selectedItem) return;

    // control dropdown UI
    setSelectedIds((prev) => {
      const updated = { ...prev, [level]: selectedId };

      // remove deeper selections
      Object.keys(updated)
        .filter((k) => Number(k) > level)
        .forEach((k) => delete updated[k]);

      return updated;
    });

    // control tree navigation
    setSelectedPath((prev) => [
      ...prev.slice(0, level),
      selectedItem,
    ]);
  };

  /* ---------------- SUBMIT ---------------- */
  const handleSubmit = async () => {
    const payload = {
      learningOutcomes: contents.filter((c) => c.trim()),
      categoryIds: selectedPath.map((c) => c.id), // UUIDs
    };

    try {
      await updateCourse(courseId, payload);
      onNext();
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  /* ---------------- DROPDOWN ---------------- */
  const CategoryDropdown = ({ level }) => {
    const options = getOptionsByLevel(level);
    if (!options.length) return null;

    return (
      <select
        className="w-full p-3 mb-3 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#8BA8D4]"
        value={selectedIds[level] || ""}
        onChange={(e) => handleSelect(level, e.target.value)}
      >
        <option value="">Select package</option>
        {options.map((opt) => (
          <option key={opt.id} value={opt.id}>
            {opt.name}
          </option>
        ))}
      </select>
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
                  placeholder={`Type content ${index + 1}`}
                  value={value}
                  onChange={(e) => {
                    const updated = [...contents];
                    updated[index] = e.target.value;
                    setContents(updated);
                  }}
                />

                <button className="text-gray-600 hover:text-black">
                  <BiSolidEdit />
                </button>

                <button
                  className="text-gray-600 hover:text-red-600"
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

          {/* RIGHT SIDE */}
          <div className="w-[50%]">
            <h1 className="font-semibold text-[16px] mb-3">
              Select package
            </h1>

            <div>
              {Array.from({ length: selectedPath.length + 1 }).map(
                (_, level) => (
                  <CategoryDropdown key={level} level={level} />
                )
              )}
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
