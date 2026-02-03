// "use client";
// import { useState } from "react";
// import { FaCircleMinus } from "react-icons/fa6";
// import { FaPen } from "react-icons/fa";
// import { GoPlus } from "react-icons/go";
// import { TbZoomReplace } from "react-icons/tb";
// import { HiMiniMinus } from "react-icons/hi2";

// export default function PromoVideoSection() {
//   const [isOpen, setIsOpen] = useState(true);

//   return (
//     <div className="border border-gray-100 shadow-md rounded-lg p-5 mb-4">
//       {/* Header */}
//       <div className="flex justify-between items-center border-b pb-2 mb-4">
//         <div className="flex items-center gap-2">
//           <span className="text-sm font-medium">promo video</span>
//           <button className="text-[16px] text-gray-400 hover:text-gray-700">
//             <FaPen />
//           </button>
//         </div>

//         <button
//           onClick={() => setIsOpen(!isOpen)}
//           className="text-[26px] text-gray-400 hover:text-gray-700"
//         >
//           {isOpen ? <FaCircleMinus /> : <GoPlus />}
//         </button>
//       </div>

//       {isOpen && (
//         <>
//           <label className="text-sm text-gray-700 block mb-3">
//             Video title
//           </label>

//           <div className="flex justify-between gap-6 mb-4">
//             <div className="flex-1">
//               <div className="flex gap-4 mb-4">
//                 <input
//                   placeholder="Title of the video"
//                   className="border rounded-lg px-4 py-2 w-[250px]"
//                 />
//                 <input
//                   placeholder="Short description"
//                   className="border rounded-lg px-4 py-2 flex-1"
//                 />
//               </div>

//               <div className="flex gap-6 items-start">
//                 <div className="flex gap-2 items-start">
//                   <div className="w-24 h-20 border rounded flex items-center justify-center text-xs text-gray-400">
//                     No Video
//                   </div>

//                   <div>
//                     <p className="text-sm">
//                       vk accountancy intro video.mp4
//                     </p>
//                     <button className="flex items-center gap-1 text-sm mt-4">
//                       <GoPlus /> Upload Video
//                     </button>
//                   </div>
//                 </div>

//                 <div className="flex-1 text-sm text-gray-600">
//                   <p className="mb-2">Upload status</p>

//                   <div className="relative w-full h-6">
//                     <div className="absolute w-full h-[2px] bg-gray-300 top-1/2" />
//                     <div className="absolute h-[2px] bg-green-400 w-[60%] top-1/2" />
//                   </div>

//                   <div className="flex justify-between mt-4 text-gray-800">
//                     <button className="flex items-center gap-1 text-sm">
//                       <TbZoomReplace /> Replace Video
//                     </button>
//                     <button className="flex items-center gap-1 text-sm">
//                       <HiMiniMinus /> Remove Video
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div>
//               <div className="w-40 h-28 bg-gray-300 rounded-lg flex items-center justify-center text-xs">
//                 Add thumbnail
//               </div>
//               <p className="text-[10px] text-center mt-1">
//                 Resolution - X - Px
//               </p>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }
"use client";
import { useRef, useState } from "react";
import { FaCircleMinus } from "react-icons/fa6";
import { FaPen } from "react-icons/fa";
import { GoPlus } from "react-icons/go";
import { TbZoomReplace } from "react-icons/tb";
import { HiMiniMinus } from "react-icons/hi2";
import { initiateVideoUpload } from "@/services/video.service";
import { uploadToVimeo } from "@/utils/vimeoUpload";
import axiosInstance from "@/services/axios";


export default function PromoVideoSection() {
  const [isOpen, setIsOpen] = useState(true);
  const fileRef = useRef(null);

  const uploadPromo = async (file) => {
    const { uploadUrl, videoAssetId, provider } =
      await initiateVideoUpload("PROMO");

    await uploadToVimeo(uploadUrl, file);

    await axiosInstance.post("/promos", {
      title: "Course Promo",
      videoAssetId,
      videoProvider: provider,
      imageUrl: "",
      courseId: "course-id",
      order: 0,
    });
  };

  return (
    <div className="border border-gray-100 shadow-md rounded-lg p-5 mb-4">
      {/* Header */}
      <div className="flex justify-between items-center border-b pb-2 mb-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">promo video</span>
          <button className="text-[16px] text-gray-400 hover:text-gray-700">
            <FaPen />
          </button>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-[26px] text-gray-400 hover:text-gray-700"
        >
          {isOpen ? <FaCircleMinus /> : <GoPlus />}
        </button>
      </div>

      {isOpen && (
        <>
          <label className="text-sm text-gray-700 block mb-3">
            Video title
          </label>

          <div className="flex justify-between gap-6 mb-4">
            <div className="flex-1">
              <div className="flex gap-4 mb-4">
                <input
                  placeholder="Title of the video"
                  className="border rounded-lg px-4 py-2 w-[250px]"
                />
                <input
                  placeholder="Short description"
                  className="border rounded-lg px-4 py-2 flex-1"
                />
              </div>

              <div className="flex gap-6 items-start">
                <div className="flex gap-2 items-start">
                  <div className="w-24 h-20 border rounded flex items-center justify-center text-xs text-gray-400">
                    No Video
                  </div>

                  <div>
                    <p className="text-sm">promo-video.mp4</p>
                    <button
                      onClick={() => fileRef.current.click()}
                      className="flex items-center gap-1 text-sm mt-4"
                    >
                      <GoPlus /> Upload Video
                    </button>

                    <input
                      ref={fileRef}
                      type="file"
                      hidden
                      onChange={(e) => uploadPromo(e.target.files[0])}
                    />
                  </div>
                </div>

                <div className="flex-1 text-sm text-gray-600">
                  <p className="mb-2">Upload status</p>

                  <div className="relative w-full h-6">
                    <div className="absolute w-full h-[2px] bg-gray-300 top-1/2" />
                    <div className="absolute h-[2px] bg-green-400 w-[60%] top-1/2" />
                  </div>

                  <div className="flex justify-between mt-4 text-gray-800">
                    <button className="flex items-center gap-1 text-sm">
                      <TbZoomReplace /> Replace Video
                    </button>
                    <button className="flex items-center gap-1 text-sm">
                      <HiMiniMinus /> Remove Video
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="w-40 h-28 bg-gray-300 rounded-lg flex items-center justify-center text-xs">
                Add thumbnail
              </div>
              <p className="text-[10px] text-center mt-1">
                Resolution - X - Px
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
