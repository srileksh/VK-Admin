// "use client";

// import React from "react";
// import { IoIosSettings } from "react-icons/io";
// import { IoLogOutSharp } from "react-icons/io5";
// import useAuthStore from "@/store/useAuthStore";
// import { useRouter } from "next/navigation";
// import toast from "react-hot-toast";
// import { RiLogoutBoxRFill } from "react-icons/ri";


// function Navbar() {
//   const logout = useAuthStore((state) => state.logout);
//   const user = useAuthStore((state) => state.user);
//   const router = useRouter();

//   const handleLogout = async () => {
//     try {
//       await logout();
//       toast.success("Logged out successfully");
//       router.replace("/"); // better than push
//     } catch (error) {
//       toast.error("Logout failed");
//     }
//   };

//   return (
//     <div className="flex justify-between items-center px-10 py-5 border-b shadow-sm border-blue-50  mb-5">
//       <div>
//         <h1 className="text-[30px] text-[#1f285b] font-semibold">
//           Welcome, {user?.name || "User"}
//         </h1>
//       </div>

//       <div className="flex justify-center gap-[50px]">
//         <button className="text-[#606060] flex items-center gap-[3px] text-[16px]">
//           <IoIosSettings className="size-[29px]" /> Settings
//         </button>

//         <button
//           onClick={handleLogout}
//           className="text-[#606060] flex items-center gap-[3px] text-[16px]"
//         >
//           <RiLogoutBoxRFill className="size-[29px]" /> Logout
//         </button>
//       </div>
//     </div>
//   );
// }

// export default Navbar;






"use client";

import React, { useState } from "react";
import { IoIosSettings } from "react-icons/io";
import { RiLogoutBoxRFill } from "react-icons/ri";
import useAuthStore from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

function Navbar() {
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);
  const router = useRouter();

  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully");
      router.replace("/");
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <div className="flex justify-between items-center px-10 py-5 border-b shadow-sm border-blue-50 mb-5">
        <div>
          <h1 className="text-[30px] text-[#1f285b] font-semibold">
            Welcome, {user?.name || "User"}
          </h1>
        </div>

        <div className="flex justify-center gap-[50px]">
          <button className="text-[#606060] flex items-center gap-[3px] text-[16px]">
            <IoIosSettings className="size-[29px]" /> Settings
          </button>

          <button
            onClick={() => setShowLogoutModal(true)}
            className="text-[#606060] flex items-center gap-[3px] text-[16px]"
          >
            <RiLogoutBoxRFill className="size-[29px]" /> Logout
          </button>
        </div>
      </div>

      {/* ================= LOGOUT MODAL ================= */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-[400px] rounded-xl shadow-lg p-6">
            
            <h2 className="text-lg font-semibold text-[#1f285b] mb-2">
              Confirm Logout
            </h2>

            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to logout?
            </p>

            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-5 py-2 rounded-lg bg-gray-300 text-gray-700"
              >
                Cancel
              </button>

              <button
                onClick={handleLogout}
                className="px-5 py-2 rounded-lg bg-red-600 text-white"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;



// "use client";

// import React, { useState, useRef, useEffect } from "react";
// import { IoIosSettings } from "react-icons/io";
// import { RiLogoutBoxRFill } from "react-icons/ri";
// import useAuthStore from "@/store/useAuthStore";
// import { useRouter } from "next/navigation";
// import toast from "react-hot-toast";

// function Navbar() {
//   const logout = useAuthStore((state) => state.logout);
//   const user = useAuthStore((state) => state.user);
//   const router = useRouter();

//   const [openLogout, setOpenLogout] = useState(false);
//   const dropdownRef = useRef(null);

//   const handleLogout = async () => {
//     try {
//       await logout();
//       toast.success("Logged out successfully");
//       router.replace("/");
//     } catch (error) {
//       toast.error("Logout failed");
//     }
//   };

//   /* ---- CLOSE DROPDOWN ON OUTSIDE CLICK ---- */
//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
//         setOpenLogout(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   return (
//     <div className="flex justify-between items-center px-10 py-5 border-b shadow-sm border-blue-50 mb-5">
//       <div>
//         <h1 className="text-[30px] text-[#1f285b] font-semibold">
//           Welcome, {user?.name || "User"}
//         </h1>
//       </div>

//       {/* RIGHT ACTIONS */}
//       <div className="flex items-center gap-[40px] relative">
//         <button className="text-[#606060] flex items-center gap-[3px] text-[16px]">
//           <IoIosSettings className="size-[29px]" /> Settings
//         </button>

//         {/* LOGOUT DROPDOWN */}
//         <div className="relative" ref={dropdownRef}>
//           <button
//             onClick={() => setOpenLogout((prev) => !prev)}
//             className="text-[#606060] flex items-center gap-[3px] text-[16px]"
//           >
//             <RiLogoutBoxRFill className="size-[29px]" /> Logout
//           </button>

//           {openLogout && (
//             <div className="absolute right-0 mt-3 w-[260px] bg-white rounded-xl shadow-xl border z-50 p-4">
//               <p className="text-sm text-gray-700 mb-4">
//                 Are you sure you want to logout?
//               </p>

//               <div className="flex justify-end gap-3">
//                 <button
//                   onClick={() => setOpenLogout(false)}
//                   className="px-4 py-1.5 rounded-lg bg-gray-200 text-gray-700 text-sm"
//                 >
//                   Cancel
//                 </button>

//                 <button
//                   onClick={handleLogout}
//                   className="px-4 py-1.5 rounded-lg bg-red-600 text-white text-sm"
//                 >
//                   Logout
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Navbar;
