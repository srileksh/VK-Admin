// "use client";
// import React, { useState, useEffect } from "react";
// import { MdClose } from "react-icons/md";
// import { useRouter } from "next/navigation";

// export default function CreateCourse({ isOpen, onClose, initialData }) {
//   const router = useRouter();

//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     contents: "",
//     packageType: "Students",
//     amount: "",
//     thumbnail: null,
//   });

//   const [preview, setPreview] = useState(null);

//   useEffect(() => {
//     if (initialData) {
//       setFormData({
//         title: initialData.title || "",
//         description: initialData.description || "",
//         contents: initialData.contents || "",
//         packageType: initialData.packageType || "Students",
//         amount: initialData.amount || "",
//         thumbnail: initialData.thumbnail || null,
//       });
//       setPreview(initialData.preview || null);
//     }
//   }, [initialData]);

//   useEffect(() => {
//     if (!initialData && isOpen) {
//       setFormData({
//         title: "",
//         description: "",
//         contents: "",
//         packageType: "Students",
//         amount: "",
//         thumbnail: null,
//       });
//       setPreview(null);
//     }
//   }, [isOpen, initialData]);

//   if (!isOpen) return null;

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     setFormData({ ...formData, thumbnail: file });
//     setPreview(URL.createObjectURL(file));
//   };

//   const handleSubmit = () => {
//     router.push("/admin/courses/createmodules");
//     onClose();
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
//       <div className="bg-white w-full max-w-[1000px] rounded-2xl p-6 relative max-h-[90vh] overflow-y-auto">
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 text-2xl text-gray-500"
//         >
//           <MdClose />
//         </button>

//         <h2 className="text-xl font-semibold mb-6 text-[#1F304A]">
//           Create Course
//         </h2>

//         <div className="grid grid-cols-1 md:grid-cols-[65%_35%] gap-2">
//           <div className="space-y-4">
//             <div>
//               <label className="text-sm font-medium">Course Title *</label>
//               <input
//                 name="title"
//                 value={formData.title}
//                 onChange={handleChange}
//                 className="w-full border rounded-xl p-3"
//               />
//             </div>

//             <div>
//               <label className="text-sm font-medium">Course Description *</label>
//               <textarea
//                 name="description"
//                 value={formData.description}
//                 onChange={handleChange}
//                 rows="4"
//                 className="w-full border rounded-xl p-3"
//               />
//             </div>

//             <div>
//               <label className="text-sm font-medium">Course Contents</label>
//               <textarea
//                 name="contents"
//                 value={formData.contents}
//                 onChange={handleChange}
//                 rows="3"
//                 className="w-full border rounded-xl p-3"
//               />
//             </div>
//           </div>

//           <div className="space-y-4 px-3">
//             <div>
//               <label className="text-sm font-medium">Course Thumbnail</label>
//               <label className="h-[160px] border rounded-xl flex items-center justify-center cursor-pointer overflow-hidden">
//                 {preview ? (
//                   <img
//                     src={preview}
//                     alt="Thumbnail Preview"
//                     className="w-full h-full object-cover"
//                   />
//                 ) : (
//                   <span className="text-gray-400">Upload Image</span>
//                 )}
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={handleImageChange}
//                   className="hidden"
//                 />
//               </label>
//             </div>

//             <div>
//               <label className="text-sm font-medium">Package</label>
//               <select
//                 name="packageType"
//                 value={formData.packageType}
//                 onChange={handleChange}
//                 className="w-full border rounded-xl p-3"
//               >
//                 <option>Students</option>
//                 <option>Plus two</option>
//               </select>
//             </div>

//             <div>
//               <label className="text-sm font-medium">Total Amount *</label>
//               <input
//                 name="amount"
//                 value={formData.amount}
//                 onChange={handleChange}
//                 className="w-full border rounded-xl p-3"
//               />
//             </div>
//           </div>
//         </div>

//         <div className="flex justify-end gap-4 mt-8">
//           <button
//             onClick={onClose}
//             className="px-6 py-3 rounded-xl bg-gray-300"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={handleSubmit}
//             className="px-6 py-3 rounded-xl bg-[#1F304A] text-white"
//           >
//             Save & Continue
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";
import React from "react";
import { X } from "lucide-react";
import { ImArrowUp } from "react-icons/im";

export default function CreateCourse() {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-6xl rounded-xl shadow-lg p-6">
        {/* Header */}
        <h2 className="text-xl font-semibold text-[#1F2A44] mb-6">
          Create Course
        </h2>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* LEFT SECTION */}
          <div className="space-y-5 border-r-1 px-4">
            {/* Course Title */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Course Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder=""
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Course Description */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Course Description <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={5}
                placeholder=""
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Thumbnail */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Thumbnail
              </label>
              <div className="flex gap-4 items-center border rounded-lg p-4">
                <img
                  src="/profile.png"
                  alt="thumbnail"
                  className="w-80 h-24 object-cover rounded-md"
                />
                <p className="text-sm text-gray-500">
                  Text regarding the image pixel size that can be uploaded and
                  the MB
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT SECTION */}
          <div className="">
            {/* Faculty Info */}
            <h3 className="text-sm font-semibold mb-2">Faculty info</h3>

            <div className="border rounded-lg p-4">
              {/* Faculty List */}
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

              {/* Faculty Form */}

              <div className="flex gap-4">
                <div className="grid grid-row-2 gap-3 w-[300px]">
                  <input
                    type="text"
                    placeholder="John David"
                    className="border rounded-lg px-3  py-2 text-sm"
                  />
                  <input
                    type="text"
                    placeholder="M.com, CAIIB"
                    className="border rounded-lg px-3 py-2 text-sm"
                  />
                </div>

                {/* Image Upload */}
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      src="https://randomuser.me/api/portraits/men/75.jpg"
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

                  <button className="flex items-center gap-2 text-md ">
                    + Add New
                  </button>
                </div>
              </div>
            </div>

            {/* Total Amount */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Total Amount <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value="INR 5000"
                readOnly
                className="w-full border rounded-lg px-4 py-2 bg-gray-50"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-center gap-6 mt-8">
          <button className="px-10 py-2 rounded-lg bg-gray-400 text-white">
            Cancel
          </button>
          <button
          
          className="px-10 py-2 rounded-lg bg-gray-700 text-white">
            Save & Continue
          </button>
        </div>
      </div>
    </div>
  );
}
