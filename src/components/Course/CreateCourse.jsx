
"use client";
import { useState } from "react";
import useCourseStore from "@/store/useCourseStore";
import { X } from "lucide-react";
import { ImArrowUp } from "react-icons/im";

export default function CreateCourse({ onCancel, onSuccess }) {
  const { createCourse, loading } = useCourseStore();

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
  });

  // Faculty array for API
  const [faculty] = useState([
    {
      name: "John Doe",
      qualification: "M.com, CAIIB",
      profileImage: "/profile.png",
    },
  ]);

  const handleSubmit = async () => {
    // Replace with your real category UUID
    const payload = {
      title: form.title,
      description: form.description,
      thumbnail: "https://example.com/course.png",
      price: Number(form.price),
      duration: 600,
      level: "BEGINNER",
      faculty, // ✅ faculty array
   
    };

    const courseId = await createCourse(payload);
    onSuccess(courseId);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-6xl rounded-xl shadow-lg p-6">
        {/* Header */}
        <h2 className="text-xl px-4 font-semibold text-[#1F2A44] mb-6">
          Create Course
        </h2>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* LEFT SECTION */}
          <div className="space-y-5 border-[#B3B8B8] border-r-1 px-4">
            {/* Course Title */}
            <div>
              <label className="block text-md text-[#5D5D5D] font-medium mb-1">
                Course Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="w-full border-[#B3B8B8] border-1 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={form.title}
                onChange={(e) =>
                  setForm({ ...form, title: e.target.value })
                }
              />
            </div>

            {/* Course Description */}
            <div>
              <label className="block text-md text-[#5D5D5D] font-medium">
                Course Description <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={5}
                className="w-full border-[#B3B8B8] border-1 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />
            </div>

            {/* Thumbnail */}
            <div>
              <label className="block text-md text-[#5D5D5D] font-medium mb-2">
                Thumbnail
              </label>
              <div className="flex gap-4 items-center border-[#B3B8B8] border-1 rounded-lg p-4">
                <img
                  src="/profile.png"
                  alt="thumbnail"
                  className="w-60 h-30 object-cover rounded-md"
                />
                <p className="text-sm text-gray-500">
                  Text regarding the image pixel size that can be uploaded and
                  the MB
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT SECTION */}
          <div>
            <h3 className="text-md text-[#5D5D5D] font-semibold mb-1.5">
              Faculty info
            </h3>

            <div className="border-[#B3B8B8] border-1 rounded-lg p-4">
              <div className="flex gap-3 mb-4">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="relative text-center">
                    <img
                      src="/profile.png"
                      className="w-12 h-12 rounded-full border"
                    />
                    <button className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-1">
                      <X size={12} />
                    </button>
                    <p className="text-xs mt-1 font-medium">John Doe</p>
                    <p className="text-[10px] text-gray-500">M.com, CAIIB</p>
                  </div>
                ))}
              </div>

              <div className="flex gap-4">
                <div className="grid grid-row-2 gap-3 w-[300px]">
                  <input
                    type="text"
                    placeholder="John David"
                    className="border-[#B3B8B8] border-1 rounded-lg px-3 py-2 text-sm"
                  />
                  <input
                    type="text"
                    placeholder="M.com, CAIIB"
                    className="border-[#B3B8B8] border-1 rounded-lg px-3 py-2 text-sm"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      src="/profile.png"
                      className="w-22 h-22 rounded-full"
                    />
                    <span className="absolute inset-0 flex items-center justify-center text-xs text-white bg-black/40 rounded-full">
                      Change Photo
                    </span>
                  </div>
                </div>

                <div className="text-gray-600">
                  <p className="px-10">
                    <ImArrowUp />
                  </p>
                  <button className="flex items-center gap-2 text-md">
                    + Add New
                  </button>
                </div>
              </div>
            </div>

            {/* Total Amount */}
            <div className="mt-[140px]">
              <label className="text-md text-[#5D5D5D] font-medium">
                Total Amount <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="w-full border-[#B3B8B8] border-1 rounded-lg px-4 py-2 bg-gray-50"
                value={form.price}
                onChange={(e) =>
                  setForm({ ...form, price: e.target.value })
                }
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-4 mt-8">
          <button
            onClick={onCancel}
            className="px-20 py-2 rounded-lg bg-[#9D9D9D] hover:bg-[#555555] text-white"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-10 py-2 rounded-lg bg-[#9D9D9D] hover:bg-[#555555] text-white"
          >
            {loading ? "Saving..." : "Save & Continue"}
          </button>
        </div>
      </div>
    </div>
  );
}
