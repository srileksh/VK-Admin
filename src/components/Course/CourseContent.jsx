

"use client";

import { useEffect, useState } from "react";
import { FaPen } from "react-icons/fa";
import { BiSolidEdit } from "react-icons/bi";
import { RiDeleteBin5Fill } from "react-icons/ri";

import useCourseStore from "@/store/useCourseStore";
import useCategoryStore from "@/store/categoryStore";

export default function ContentInputs({ onCancel, onNext }) {
  const { updateCourse, loading } = useCourseStore();
  const { categories, fetchCategories } = useCategoryStore();

  const [contents, setContents] = useState(["", "", "", "", ""]);
  const [selectedIds, setSelectedIds] = useState({});
  const [selectedPath, setSelectedPath] = useState([]);
  const [categoryLoading, setCategoryLoading] = useState(true);

  // 🔥 Unified loading state
  const isLoading = loading || categoryLoading;

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setCategoryLoading(true);
        await fetchCategories();
      } catch (error) {
        console.error("Category fetch failed:", error);
      } finally {
        setCategoryLoading(false);
      }
    };

    loadCategories();
  }, [fetchCategories]);

  const getOptionsByLevel = (level) => {
    if (level === 0) return categories || [];
    return selectedPath[level - 1]?.children || [];
  };

  const handleSelect = (level, selectedId) => {
    const options = getOptionsByLevel(level);
    const selectedItem = options.find((opt) => opt.id === selectedId);
    if (!selectedItem) return;

    setSelectedIds((prev) => {
      const updated = { ...prev, [level]: selectedId };
      Object.keys(updated)
        .filter((k) => Number(k) > level)
        .forEach((k) => delete updated[k]);
      return updated;
    });

    setSelectedPath((prev) => [...prev.slice(0, level), selectedItem]);
  };

  const handleSubmit = async () => {
    const payload = {
      learningOutcomes: contents.filter((c) => c.trim()),
      categoryIds: selectedPath.map((c) => c.id),
    };

    try {
      await updateCourse(payload);
      onNext();
    } catch (error) {
      console.error("Update failed:", error);
      alert(error.message);
    }
  };

  const CategoryDropdown = ({ level }) => {
    const options = getOptionsByLevel(level);
    if (!options.length) return null;

    return (
      <select
        className="w-full p-3 mb-3 border rounded-lg text-sm border-gray-400"
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

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-[1000px] h-[550px] rounded-xl flex flex-col relative overflow-hidden">

        {/* MAIN CONTENT WRAPPER */}
        <div
          className={`flex flex-col h-full transition-opacity duration-300 ${
            isLoading ? "opacity-40 pointer-events-none" : "opacity-100"
          }`}
        >
          {/* HEADER */}
          <div className="px-8 py-5">
            <h1 className="text-[#1f285b] text-[20px] font-semibold">
              Course thumbnail & contents
            </h1>
          </div>

          {/* BODY */}
          <div className="flex-1 overflow-y-auto px-8 py-6">
            <div className="flex gap-5">

              {/* LEFT */}
              <div className="w-1/2 border-r pr-5">
                <h2 className="flex items-center gap-1 font-semibold mb-3 text-gray-600">
                  Content title  <FaPen  className="text-gray-600"/>
                </h2>

                {contents.map((value, index) => (
                  <div key={index} className="flex gap-[2px] mb-3">
                    <input
                      className="p-3 rounded-lg w-[85%] border-gray-400 border outline-gray-500"
                      placeholder={`Type content ${index + 1}`}
                      value={value}
                      onChange={(e) => {
                        const updated = [...contents];
                        updated[index] = e.target.value;
                        setContents(updated);
                      }}
                    />

                    {/* <button type="button">
                      <BiSolidEdit  className="text-gray-600"/>
                    </button>

                    <button
                      type="button"
                      disabled={contents.length === 1}
                      onClick={() =>
                        setContents((prev) =>
                          prev.filter((_, i) => i !== index)
                        )
                      }
                    >
                      <RiDeleteBin5Fill className="text-gray-600"/>
                    </button> */}
                    <button
  type="button"
  className="p-2 rounded-md transition-colors duration-200 hover:bg-blue-100"
>
  <BiSolidEdit className="text-gray-600 hover:text-blue-800 text-lg" />
</button>

<button
  type="button"
  disabled={contents.length === 1}
  onClick={() =>
    setContents((prev) =>
      prev.filter((_, i) => i !== index)
    )
  }
  className="p-2 rounded-md transition-colors duration-200 
             hover:bg-red-100 disabled:opacity-40 disabled:cursor-not-allowed"
>
  <RiDeleteBin5Fill className="text-gray-600 hover:text-red-600 text-lg" />
</button>

                  </div>
                ))}

                <button
                  type="button"
                  onClick={() => setContents((prev) => [...prev, ""])}
                  className="text-sm font-semibold text-gray-600 p-[10px]"
                >
                  + Add more topics
                </button>
              </div>

              {/* RIGHT */}
              <div className="w-1/2">
                <h1 className="font-semibold mb-3 text-gray-600">Select package</h1>

                {Array.from({ length: selectedPath.length + 1 }).map(
                  (_, level) => (
                    <CategoryDropdown key={level} level={level} />
                  )
                )}
              </div>
            </div>
          </div>

          {/* FOOTER */}
          <div className="px-8 py-4 flex justify-end gap-4">
            <button
              onClick={onCancel}
              disabled={isLoading}
              className="px-10 py-2 bg-gray-400 text-white rounded-lg"
            >
              Cancel
            </button>

            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="px-10 py-2 bg-[#1f304a] text-white rounded-lg"
            >
              {loading ? "Saving..." : "Save & Continue"}
            </button>
          </div>
        </div>

        {/* FULL COMPONENT LOADER */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/10 backdrop-blur-sm z-50">
            <div className="w-14 h-14 border-4 border-[#1f304a] border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>
    </div>
  );
}
