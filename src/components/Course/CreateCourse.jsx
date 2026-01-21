"use client";
import React, { useState, useEffect } from "react";
import { MdClose } from "react-icons/md";
import { useRouter } from "next/navigation";

export default function CreateCourse({ isOpen, onClose, initialData }) {
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    contents: "",
    packageType: "Students",
    amount: "",
    thumbnail: null,
  });

  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        description: initialData.description || "",
        contents: initialData.contents || "",
        packageType: initialData.packageType || "Students",
        amount: initialData.amount || "",
        thumbnail: initialData.thumbnail || null,
      });
      setPreview(initialData.preview || null);
    }
  }, [initialData]);

  useEffect(() => {
    if (!initialData && isOpen) {
      setFormData({
        title: "",
        description: "",
        contents: "",
        packageType: "Students",
        amount: "",
        thumbnail: null,
      });
      setPreview(null);
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFormData({ ...formData, thumbnail: file });
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = () => {
    router.push("/admin/courses/createmodules");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="bg-white w-full max-w-[1000px] rounded-2xl p-6 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl text-gray-500"
        >
          <MdClose />
        </button>

        <h2 className="text-xl font-semibold mb-6 text-[#1F304A]">
          Create Course
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-[65%_35%] gap-2">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Course Title *</label>
              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full border rounded-xl p-3"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Course Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                className="w-full border rounded-xl p-3"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Course Contents</label>
              <textarea
                name="contents"
                value={formData.contents}
                onChange={handleChange}
                rows="3"
                className="w-full border rounded-xl p-3"
              />
            </div>
          </div>

          <div className="space-y-4 px-3">
            <div>
              <label className="text-sm font-medium">Course Thumbnail</label>
              <label className="h-[160px] border rounded-xl flex items-center justify-center cursor-pointer overflow-hidden">
                {preview ? (
                  <img
                    src={preview}
                    alt="Thumbnail Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-gray-400">Upload Image</span>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>

            <div>
              <label className="text-sm font-medium">Package</label>
              <select
                name="packageType"
                value={formData.packageType}
                onChange={handleChange}
                className="w-full border rounded-xl p-3"
              >
                <option>Students</option>
                <option>Plus two</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium">Total Amount *</label>
              <input
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                className="w-full border rounded-xl p-3"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-8">
          <button
            onClick={onClose}
            className="px-6 py-3 rounded-xl bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-3 rounded-xl bg-[#1F304A] text-white"
          >
            Save & Continue
          </button>
        </div>
      </div>
    </div>
  );
}
