import { RiDeleteBin5Fill } from "react-icons/ri";
import { BiSolidEdit } from "react-icons/bi";

export default function SubPackageItem({ sub, packageId }) {
  console.log(sub);
  
  const handleDelete = () => {
    console.log("Delete sub", sub.id, "from package", packageId);
  };

  return (
    <div className="ml-16 mt-4 bg-[#c4c4ff] p-4 rounded-xl w-[70%] flex justify-between items-center">
      <div>
        <p className="text-[12px]">Sub package name</p>
        <p className="text-[18px] font-semibold">{sub.name}</p>
      </div>

      <div className="flex gap-4">
        <RiDeleteBin5Fill
          onClick={handleDelete}
          className="text-[22px] cursor-pointer"
        />
        <BiSolidEdit className="text-[22px] cursor-pointer" />
      </div>
    </div>
  );
}

