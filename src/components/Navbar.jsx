"use client";

import React from "react";
import { IoIosSettings } from "react-icons/io";
import { IoLogOutSharp } from "react-icons/io5";
import useAuthStore from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

function Navbar() {
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully");
      router.replace("/"); // better than push
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  return (
    <div className="flex justify-between items-center px-10 py-8">
      <div>
        <h1 className="text-[30px] text-[#1f285b] font-semibold">
          Welcome, {user?.name || "User"}
        </h1>
      </div>

      <div className="flex justify-center gap-[50px]">
        <button className="text-[#606060] flex items-center gap-[3px]">
          <IoIosSettings className="size-[29px]" /> Settings
        </button>

        <button
          onClick={handleLogout}
          className="text-[#606060] flex items-center gap-[3px]"
        >
          <IoLogOutSharp className="size-[29px]" /> Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;
