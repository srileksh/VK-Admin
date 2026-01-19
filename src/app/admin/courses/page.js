"use client";
import React, { useState } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { MdEditNote } from "react-icons/md";
import CreateCourse from "@/components/CreateCourse";

function Page() {
  const [createCourse, setCreateCourse] = useState(false);

  return (
    <div className="px-4 sm:px-6 md:px-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-[18px] sm:text-[20px] text-black">Courses</h1>

        <button
          onClick={() => setCreateCourse(true)}
          className="bg-[#1F304A] text-white text-[14px] sm:text-[16px] md:text-[18px]
                     rounded-[15px] px-6 py-3 w-full sm:w-auto"
        >
          Create new course
        </button>
      </div>

      {/* Course Card */}
      <div
        className="mt-8 p-4 sm:p-6 bg-[#F8F6F6] border-2 border-[#EEEEEE]
                   shadow-lg rounded-[15px]
                   grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 text-center"
      >
        <div>
          <h3 className="text-[12px] text-gray-500">Course title</h3>
          <h2 className="text-[14px] sm:text-[16px]">Advanced Accounting</h2>
        </div>

        <div>
          <h3 className="text-[12px] text-gray-500">Course based on</h3>
          <h2 className="text-[14px] sm:text-[16px]">Fees</h2>
        </div>

        <div>
          <h3 className="text-[12px] text-gray-500">Number of videos</h3>
          <h2 className="text-[14px] sm:text-[16px]">21</h2>
        </div>

        <div>
          <h3 className="text-[12px] text-gray-500">Course Amount</h3>
          <h2 className="text-[14px] sm:text-[16px]">INR 1500</h2>
        </div>

        <div>
          <h3 className="text-[12px] text-gray-500">Duration</h3>
          <h2 className="text-[14px] sm:text-[16px]">6 m</h2>
        </div>

        {/* Actions */}
        <div className="flex gap-6 items-center justify-start sm:justify-end">
          <button className="text-[#555555] text-[22px] sm:text-[26px]">
            <RiDeleteBin5Line />
          </button>
          <button className="text-[#555555] text-[26px] sm:text-[34px]">
            <MdEditNote />
          </button>
        </div>
      </div>

      {/* Modal */}
      <CreateCourse
        isOpen={createCourse}
        onClose={() => setCreateCourse(false)}
      />
    </div>
  );
}

export default Page;
