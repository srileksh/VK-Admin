"use client";
import React from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { MdEditNote } from "react-icons/md";

function page() {
  return (
    <div className="px-10">
      <div className="flex justify-between">
        <h1 className="text-[20px] text-black">Courses</h1>
        <button className="bg-[#1F304A] text-[20px] text-white rounded-[15px] p-3 px-8">
          Create new course
        </button>
      </div>

      <div className="flex justify-between mt-10 p-3 bg-[#F8F6F6] border-2 border-[#EEEEEE] shadow-lg rounded-[15px] px-6">
        <div>
          <h3 className="text-[12px]">Course title</h3>
          <h2 className="text-[16px]">Advanced Accounting</h2>
        </div>
        <div>
          <h3 className="text-[12px]">Course based on</h3>
          <h2 className="text-[16px]">Fees</h2>
        </div>
        <div>
          <h3 className="text-[12px]">Number of videos</h3>
          <h2 className="text-[16px]">21</h2>
        </div>
        <div>
          <h3 className="text-[12px]">Course Amount</h3>
          <h2 className="text-[16px]">INR 1500</h2>
        </div>
        <div>
          <h3 className="text-[12px]">Duration</h3>
          <h2 className="text-[16px]">6 m</h2>
        </div>
        <div className="flex items-center gap-4 text-[#555555] text-[26px]">
          <RiDeleteBin5Line />
          <MdEditNote />
        </div>
      </div>
    </div>
  );
}

export default page;
