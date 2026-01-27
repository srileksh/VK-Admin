"use client";
import { IoMdAddCircle } from "react-icons/io";
import { FaCircleMinus } from "react-icons/fa6";
import { FaPen } from "react-icons/fa";
import { GoPlus } from "react-icons/go";
import { TbZoomReplace } from "react-icons/tb";
import { HiMiniMinus } from "react-icons/hi2";
import { useRouter } from "next/navigation";

export default function createModules({ onCancel, onFinish }) {
  // const router = useRouter();
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-[1000px] rounded-xl shadow-lg p-6 px-8">
        {/* Title */}
        <h2 className="text-lg font-semibold mb-2 text-[#1F304A]">
          Create modules
        </h2>

        {/* Upload promo video */}
        <div className="flex justify-between items-center  border-gray-100 border shadow-md  rounded-lg px-4 py-3 mb-4">
          <span className="text-sm text-gray-700">Upload promo video</span>

          <button className="text-[30px] text-gray-300 hover:text-gray-700 ">
            <IoMdAddCircle />
          </button>
        </div>

        {/* Section */}
        <div className="  border-gray-100 border shadow-md  rounded-lg  p-5 mb-2">
          {/* Section Header */}

          <div className="flex justify-between items-center border-b-1 ">
            <div className="flex items-center gap-2 mb-2 ">
              <span className="text-sm font-medium ">Section 1</span>
              <button className="text-[18px] text-gray-300 hover:text-gray-700 ">
                <FaPen />
              </button>
            </div>
            <button className="text-[25px] text-gray-300 hover:text-gray-700 mb-2">
              <FaCircleMinus />
            </button>
          </div>

          {/* Video title */}
          <label className="text-sm text-gray-700 block mb-3">
            Video title
          </label>
          <div className="mb-4 flex justify-between  items-center border-b-1  gap-2">
            <div className=" mb-4">
              <div className="flex gap-4 mb-4 justify-between ">
                <input
                  type="text"
                  placeholder="Title of the video"
                  className="border rounded-lg px-4 py-2 w-[250px] border-gray-300 hover:border-gray-500"
                />
                <input
                  type="text"
                  placeholder="Short description"
                  className="border rounded-lg px-4 py-2 w-[450px]   border-gray-300 hover:border-gray-500"
                />
              </div>

              <div className="flex gap-6 items-start">
                {/* Video upload */}
                <div className="flex items-end gap-1">
                  <div className="w-26 h-20 border rounded flex items-center justify-center text-xs text-gray-400">
                    No Video
                  </div>
                  
                  <div className="">
                                      <p className="">vk accountancy intro video.mp4</p>

                    <button className="flex justify-center text-[14px] items-center text-gray-800 mt-6">
                     <GoPlus /> 
                      Upload Video
                    </button>
                  </div>
                </div>

                <div className="flex-1 text-center  text-sm text-gray-600">
                  <p className="">Upload status</p>

                  {/* Line graph container */}
                  <div className="relative w-full h-6 flex items-center justify-center">
                    {/* Base line */}
                    <div className="absolute w-full h-[2px] bg-gray-300"></div>

                    {/* Progress line */}
                    <div className="absolute left-0 h-[2px] bg-green-400 w-[60%]"></div>

                    {/* Graph points */}
                    <div className="absolute left-0 w-3 h-3 bg-green-400 rounded-full"></div>
                    <div className="absolute left-[30%] w-3 h-3 bg-green-400 rounded-full"></div>
                    <div className="absolute left-[60%] w-3 h-3 bg-green-400 rounded-full"></div>
                    <div className="absolute right-0 w-3 h-3 bg-gray-300 rounded-full"></div>
                  </div>

                  {/* Actions */}
                  <div className="flex  justify-between text-gray-800 ">
                    <button className="text-[14px] flex justify-center items-center">
                      <TbZoomReplace />
                          Replace Video
                    </button>
                    <button className="text-[14px] flex justify-center items-center">
                      <HiMiniMinus />

                      Remove Video
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className=" ">
              <div className="w-40 h-30 bg-gray-300 rounded-lg flex flex-col items-center justify-center text-xs text-gray-700">
                Add thumbnail
              </div>
              <span className="text-[10px] mb-1 flex justify-center text-center">
                Resolution - X - Px
              </span>
            </div>
          </div>
          <div className="flex justify-center text-gray-600  ">
            <button className="flex  gap-1 justify-center items-center border-b-1">
            <GoPlus />  Add new video
            </button>
          </div>
        </div>

        {/* Add new section */}
        <div className="flex justify-end text-gray-600   ">
            <button className="flex   justify-center items-center border-gray-50 rounded-[10px]  p-3  mb-5 shadow-md">
          <GoPlus />Add new section
            </button>
          </div>

        {/* Footer buttons */}
        <div className="flex justify-end mt-5 gap-6">
          <button
          //  onClick={() => router.push("/admin/courses")}
          onClick={onCancel}
          className="bg-gray-300 px-15 py-2 rounded-xl text-gray-700">
            Cancel
          </button>
          <button
           onClick={onFinish} className="bg-gray-700 px-15 py-2 rounded-xl text-white">
            Finish
          </button>
        </div>
      </div>
    </div>
  );
}
