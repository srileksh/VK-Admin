"use client";

import { MdClose } from "react-icons/md";

export default function CreateCourse({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div
        className="bg-white w-full max-w-[1000px] rounded-[20px]
                   p-4 sm:p-6 md:p-8 relative shadow-xl
                   max-h-[90vh] overflow-y-auto"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-xl sm:text-2xl text-gray-500 hover:text-black"
        >
          <MdClose />
        </button>

        <h2 className="text-[18px] sm:text-[20px] md:text-[22px] font-semibold mb-6 text-[#1F304A]">
          Create Course
        </h2>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {/* Left */}
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">
                Course Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="w-full mt-1 border rounded-xl p-3 text-sm"
                placeholder="Course title"
              />
            </div>

            <div>
              <label className="text-sm font-medium">
                Course Description <span className="text-red-500">*</span>
              </label>
              <textarea
                rows="4"
                className="w-full mt-1 border rounded-xl p-3 text-sm"
                placeholder="Course description"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Course Contents</label>
              <textarea
                rows="3"
                className="w-full mt-1 border rounded-xl p-3 text-sm"
              />
            </div>
          </div>

          {/* Right */}
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Course Thumbnail</label>
              <div
                className="mt-2 h-[120px] sm:h-[140px] md:h-[160px]
                           border rounded-xl flex items-center justify-center
                           text-gray-400 text-sm"
              >
                Upload Image
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Package</label>
              <select className="w-full mt-1 border rounded-xl p-3 text-sm pr-10">
                <option className="">Students</option>
              </select>
              <select className="w-full mt-2 border rounded-xl p-3 text-sm pr-10">
                <option>Plus two</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium">
                Total Amount <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="w-full mt-1 border rounded-xl p-3 text-sm"
                placeholder="INR 5000"
              />
            </div>
          </div>
        </div>

        {/* Footer buttons */}
        <div className="flex flex-col sm:flex-row justify-end gap-3 mt-8">
          <button
            onClick={onClose}
            className="px-6 py-3 rounded-xl bg-gray-300 hover:bg-[#555555]
                       text-black hover:text-white w-full sm:w-auto"
          >
            Cancel
          </button>
          <button
            className="px-6 py-3 rounded-xl bg-gray-300 hover:bg-[#555555]
                       text-black hover:text-white w-full sm:w-auto"
          >
            Save & Continue
          </button>
        </div>
      </div>
    </div>
  );
}
