import { IoMdAddCircle } from "react-icons/io";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { BiSolidEdit } from "react-icons/bi";

export default function SubPackageItem({ sub }) {
  return (
    <div className="ml-16 mt-4 bg-[#c4c4ff] p-4 rounded-xl w-[70%] flex justify-between items-center">
        <div>
          <p className="text-[12px]">Package name</p>
          <p className="text-[18px]">{sub.name}</p>
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
  );
}
