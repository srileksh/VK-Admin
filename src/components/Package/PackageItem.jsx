"use client";
import { useState } from "react";
import { IoMdAddCircle } from "react-icons/io";
import SubPackageItem from "./SubPackageItem";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { BiSolidEdit } from "react-icons/bi";

export default function PackageItem({ pkg, addSubPackage }) {
  const [showInput, setShowInput] = useState(false);
  const [subName, setSubName] = useState("");

  const handleAdd = () => {
    if (!subName.trim()) return;
    addSubPackage(pkg.id, subName);
    setSubName("");
    setShowInput(false);
  };

  return (
    <div>
      <div className="bg-[#c4c4ff] px-5 py-3 rounded-xl w-[70%] flex justify-between items-center">
        <div>
          <p className="text-[12px]">Package name</p>
          <p className="text-[18px]">{pkg.name}</p>
        </div>

        <button
          onClick={() => setShowInput(true)}
          className="flex items-center gap-2 underline underline-offset-4"
        >
          <IoMdAddCircle className="text-[26px]" />
          Add Sub package
        </button>
        <div className="flex gap-4">
          <RiDeleteBin5Fill className="text-[24px] cursor-pointer" />
          <BiSolidEdit className="text-[24px] cursor-pointer" />
        </div>
      </div>

      {showInput && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg w-[420px]">
            <h2 className="text-[22px] mb-2">Create new package for {pkg.name}</h2>
            <p className="text-[#5d5d5d] font-semibold ">Name of package</p>

            <input
              value={subName}
              onChange={(e) => setSubName(e.target.value)}
              className="w-full border border-[#5d5d5d] px-4 py-3 rounded-lg outline-none"
              placeholder="Package name"
            />

            <div className="flex gap-4 mt-6">
              <button
                onClick={onclose}
                className="w-1/2 py-3 bg-gray-400 text-white rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleAdd}
                className="w-1/2 py-3 bg-[#5d5d5d] text-white rounded-lg"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}

      {pkg.subPackages.map((sub) => (
        <SubPackageItem key={sub.id} sub={sub} />
      ))}
    </div>
  );
}
