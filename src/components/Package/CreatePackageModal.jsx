"use client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useCategoryStore from "@/store/categoryStore";

export default function CreateCategoryModal({ onClose }) {
  const { categories, fetchCategories, createCategory, loading } =
    useCategoryStore();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("");
  const [parentId, setParentId] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleCreate = async () => {
    if (!name.trim()) {
      toast.error("Category name is required");
      return;
    }

    // ✅ ONLY send required fields
    const payload = {
      name: name.trim(),
    };

    // ✅ Add optional fields ONLY if they exist
    if (description.trim()) payload.description = description.trim();
    if (icon.trim()) payload.icon = icon.trim();
    if (parentId) payload.parentId = parentId;

    try {
      await createCategory(payload);
      toast.success("Category created successfully");
      onClose();
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to create category",
      );
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-2xl w-[450px] shadow-xl">
        <h2 className="text-[22px] font-semibold mb-6">Create New Category</h2>

        {/* Category Name */}
        <label className="text-sm font-semibold text-[#5d5d5d]">
          Category Name *
        </label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border px-4 py-3 rounded-lg mt-1 outline-none"
          placeholder="e.g. Competitive Exams"
        />

        {/* Description */}
        <label className="text-sm font-semibold text-[#5d5d5d] mt-4 block">
          Description (optional)
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="w-full border px-4 py-3 rounded-lg mt-1 resize-none outline-none"
        />

        {/* Icon */}
        <label className="text-sm font-semibold text-[#5d5d5d] mt-4 block">
          Icon (optional)
        </label>
        <input
          value={icon}
          onChange={(e) => setIcon(e.target.value)}
          className="w-full border px-4 py-3 rounded-lg mt-1 outline-none"
          placeholder="code-outline"
        />

        {/* Parent Category */}
        <label className="text-sm font-semibold text-[#5d5d5d] mt-4 block">
          Parent Category (optional)
        </label>
        <select
          value={parentId ?? ""}
          onChange={(e) =>
            setParentId(e.target.value === "" ? null : e.target.value)
          }
          className="w-full border px-4 py-3 rounded-lg mt-1 outline-none"
        >
          <option value="">No Parent (Root)</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        {/* Actions */}
        <div className="flex gap-4 mt-8">
          <button
            onClick={onClose}
            className="w-1/2 py-3 bg-gray-300 rounded-lg"
            disabled={loading}
          >
            Cancel
          </button>

          <button
            onClick={handleCreate}
            disabled={loading}
            className="w-1/2 py-3 bg-[#5d5d5d] text-white rounded-lg disabled:opacity-60"
          >
            {loading ? "Creating..." : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
}
