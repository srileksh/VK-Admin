"use client";
import { useState } from "react";
import CreatePackageModal from "@/components/Package/CreatePackageModal";
import PackageItem from "@/components/Package/PackageItem";

export default function Page() {
  const [packages, setPackages] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  const addPackage = (name) => {
    setPackages([
      ...packages,
      { id: Date.now(), name, subPackages: [] },
    ]);
  };

  const addSubPackage = (parentId, name) => {
    setPackages((prev) =>
      prev.map((pkg) =>
        pkg.id === parentId
          ? {
              ...pkg,
              subPackages: [
                ...pkg.subPackages,
                { id: Date.now(), name },
              ],
            }
          : pkg
      )
    );
  };

  return (
    <div className="px-10 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-[27px]">Course Type</h1>
        <button
          onClick={() => setShowPopup(true)}
          className="px-18 py-3 bg-[#1f304a] text-white rounded-xl text-[20px]"
        >
          Create new package
        </button>
      </div>

     <div className="overflow-scroll">
       <PackageItem packages={packages} addSubPackage={addSubPackage} />
     </div>

      {showPopup && (
        <CreatePackageModal
          onClose={() => setShowPopup(false)}
          onCreate={addPackage}
        />
      )}
    </div>
  );
}
