// // "use client";
// // import React, { useState } from "react";
// // import { IoMdAddCircle } from "react-icons/io";
// // import { RiDeleteBin5Fill } from "react-icons/ri";
// // import { BiSolidEdit } from "react-icons/bi";

// // export default function Page() {
// //   const [showPopup, setShowPopup] = useState(false);
// //   const [packageName, setPackageName] = useState("");
// //   const [packages, setPackages] = useState([]);

// //   const handleCreate = () => {
// //     if (!packageName.trim()) return;

// //     setPackages([...packages, packageName]); // add to background page
// //     setPackageName("");
// //     setShowPopup(false);
// //   };

// //   return (
// //     <div className="px-10">
// //       {/* Header */}
// //       <div className="flex justify-between items-center">
// //         <h1 className="text-[27px]">Course Type</h1>
// //         <button
// //           className="px-[35px] py-[10px] bg-[#1f304a] rounded-[15px] text-white text-[20px]"
// //           onClick={() => setShowPopup(true)}
// //         >
// //           Create new package
// //         </button>
// //       </div>

// //       {/* Background page list */}
// //       <div className="mt-6 grid gap-3">
// //         {packages.length === 0 && (
// //           <p className="text-gray-500">No packages created yet</p>
// //         )}

// //         {packages.map((pkg, index) => (
// //           <div
// //             key={index}
// //             className="p-5 w-[80%] border-none rounded-lg bg-[#c4c4ff] shadow-sm flex justify-between items-center"
// //           >
// //             <div>
// //               <p className="text-[12px]">Package Name</p>
// //               <p className="text-[18px]">{pkg}</p>
// //             </div>
// //             <button className="text-[18px] flex justify-center items-center underline underline-offset-4">
// //               <IoMdAddCircle className="text-[#555555] text-[30px]" />
// //               Add Sub package
// //             </button>
// //             <div className="flex justify-center items-center gap-[15px]">
// //               <button>
// //                 <RiDeleteBin5Fill className="text-[#555555] text-[30px]" />
// //               </button>
// //               <button>
// //                 <BiSolidEdit className="text-[#555555] text-[30px]" />
// //               </button>
// //             </div>
// //           </div>
// //         ))}
// //       </div>

// //       {/* Popup */}
// //       {showPopup && (
// //         <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
// //           <div
// //             className="bg-white p-8 rounded-lg w-[420px] h-[280px] shadow-lg"
// //             onClick={(e) => e.stopPropagation()}
// //           >
// //             <h2 className="text-[#1f285b] text-[24px] font-medium mb-3">
// //               Create new package
// //             </h2>

// //             <label className="font-medium text-[#5d5d5d]">
// //               Name of package
// //             </label>

// //             <div className="border-2 border-[#a4a4a4] rounded-[10px] mt-2">
// //               <input
// //                 value={packageName}
// //                 onChange={(e) => setPackageName(e.target.value)}
// //                 className="w-full py-[10px] px-[15px] outline-none rounded-[10px]"
// //                 placeholder="Enter package name"
// //               />
// //             </div>

// //             <div className="flex justify-center gap-3 mt-6">
// //               <button
// //                 onClick={() => setShowPopup(false)}
// //                 className="py-3 rounded-[15px] text-white text-[18px] bg-[#a4a4a4] font-medium w-[50%]"
// //               >
// //                 Cancel
// //               </button>

// //               <button
// //                 onClick={handleCreate}
// //                 className="py-3 bg-[#5d5d5d] text-white text-[18px] rounded-[15px] font-medium w-[50%]"
// //               >
// //                 Create
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }
// "use client";
// import React, { useState } from "react";
// import { IoMdAddCircle } from "react-icons/io";
// import { RiDeleteBin5Fill } from "react-icons/ri";
// import { BiSolidEdit } from "react-icons/bi";

// export default function Page() {
//   const [showPopup, setShowPopup] = useState(false);
//   const [packageName, setPackageName] = useState("");
//   const [subPackageName, setSubPackageName] = useState("");
//   const [activePackageId, setActivePackageId] = useState(null);

//   const [packages, setPackages] = useState([]);

//   /* Create main package */
//   const handleCreatePackage = () => {
//     if (!packageName.trim()) return;

//     setPackages([
//       ...packages,
//       {
//         id: Date.now(),
//         name: packageName,
//         subPackages: [],
//       },
//     ]);

//     setPackageName("");
//     setShowPopup(false);
//   };

//   /* Add sub package */
//   const handleAddSubPackage = (parentId) => {
//     if (!subPackageName.trim()) return;

//     setPackages((prev) =>
//       prev.map((pkg) =>
//         pkg.id === parentId
//           ? {
//               ...pkg,
//               subPackages: [
//                 ...pkg.subPackages,
//                 { id: Date.now(), name: subPackageName },
//               ],
//             }
//           : pkg
//       )
//     );

//     setSubPackageName("");
//     setActivePackageId(null);
//   };

//   return (
//     <div className="px-10 py-6">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-[27px] font-medium">Course Type</h1>
//         <button
//           onClick={() => setShowPopup(true)}
//           className="px-[35px] py-[10px] bg-[#1f304a] rounded-[15px] text-white text-[18px]"
//         >
//           Create new package
//         </button>
//       </div>

//       {/* Package List */}
//       <div className="space-y-5">
//         {packages.map((pkg) => (
//           <div key={pkg.id}>
//             {/* Parent Package */}
//             <div className="flex justify-between items-center bg-[#c4c4ff] p-5 rounded-xl w-[80%]">
//               <div>
//                 <p className="text-[12px]">Package name</p>
//                 <p className="text-[18px] font-medium">{pkg.name}</p>
//               </div>

//               <button
//                 onClick={() => setActivePackageId(pkg.id)}
//                 className="flex items-center gap-2 underline underline-offset-4"
//               >
//                 <IoMdAddCircle className="text-[28px]" />
//                 Add Sub package
//               </button>

//               <div className="flex gap-4">
//                 <RiDeleteBin5Fill className="text-[26px] cursor-pointer" />
//                 <BiSolidEdit className="text-[26px] cursor-pointer" />
//               </div>
//             </div>

//             {/* Sub Package Input */}
//             {activePackageId === pkg.id && (
//               <div className="ml-16 mt-3 flex gap-3">
//                 <input
//                   value={subPackageName}
//                   onChange={(e) => setSubPackageName(e.target.value)}
//                   placeholder="Sub package name"
//                   className="border px-4 py-2 rounded-lg w-[300px]"
//                 />
//                 <button
//                   onClick={() => handleAddSubPackage(pkg.id)}
//                   className="bg-[#5d5d5d] text-white px-6 rounded-lg"
//                 >
//                   Add
//                 </button>
//               </div>
//             )}

//             {/* Sub Packages */}
//             {pkg.subPackages.map((sub) => (
//               <div
//                 key={sub.id}
//                 className="ml-16 mt-4 flex justify-between items-center bg-[#c4c4ff] p-4 rounded-xl w-[70%]"
//               >
//                 <div>
//                   <p className="text-[12px]">Package name</p>
//                   <p className="text-[16px] font-medium">{sub.name}</p>
//                 </div>

//                 <button className="flex items-center gap-2 underline underline-offset-4">
//                   <IoMdAddCircle />
//                   Add Sub package
//                 </button>

//                 <div className="flex gap-4">
//                   <RiDeleteBin5Fill className="text-[24px] cursor-pointer" />
//                   <BiSolidEdit className="text-[24px] cursor-pointer" />
//                 </div>
//               </div>
//             ))}
//           </div>
//         ))}
//       </div>

//       {/* Create Package Popup */}
//       {showPopup && (
//         <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
//           <div className="bg-white p-8 rounded-lg w-[420px] shadow-lg">
//             <h2 className="text-[24px] font-medium mb-4">
//               Create new package
//             </h2>

//             <label className="text-[#5d5d5d] font-medium">
//               Name of package
//             </label>

//             <input
//               value={packageName}
//               onChange={(e) => setPackageName(e.target.value)}
//               className="w-full border rounded-lg px-4 py-3 mt-2"
//               placeholder="Enter package name"
//             />

//             <div className="flex gap-4 mt-6">
//               <button
//                 onClick={() => setShowPopup(false)}
//                 className="w-1/2 py-3 bg-[#a4a4a4] text-white rounded-lg"
//               >
//                 Cancel
//               </button>

//               <button
//                 onClick={handleCreatePackage}
//                 className="w-1/2 py-3 bg-[#5d5d5d] text-white rounded-lg"
//               >
//                 Create
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
"use client";
import { useState } from "react";
import CreatePackageModal from "@/components/Package/CreatePackageModal";
import PackageList from "@/components/Package/PackageList";

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

      <PackageList packages={packages} addSubPackage={addSubPackage} />

      {showPopup && (
        <CreatePackageModal
          onClose={() => setShowPopup(false)}
          onCreate={addPackage}
        />
      )}
    </div>
  );
}
