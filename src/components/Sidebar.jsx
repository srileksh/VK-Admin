"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { CgProfile } from "react-icons/cg";


function Sidebar() {
  const pathname = usePathname();
  const menuItems = [
    { name: "Dashboard", path: "/admin/dashboard" },
    { name: "Packages", path: "/admin/packages" },
    { name: "Courses", path: "/admin/courses" },
    { name: "Coupons", path: "/admin/coupons" },
  ];
  const isActive = (path) => pathname === path;
  return (
    <aside className="w-72 min-h-screen bg-[#1F304A] flex flex-col items-center py-8">
      {/* Logo */}
      <div>
        {/* <img src="/VK-Logo.png" /> */}
      </div>
      <Link href="/admin/dashbord" className="mb-6">
        <h1 className="text-3xl font-bold text-white"></h1>
      </Link>

      {/* Profile */}
      <div className="text-[100px] text-gray-300">
        {/* <img src="/profile.png" className="rounded-[100%]" /> */}
        <CgProfile />

      </div>
      <div className="flex flex-col items-center mb-8">
        <p className="mt-4 text-white text-3xl font-semibold">John David</p>
      </div>

      {/* Menu */}
      <nav className="w-full px-6 space-y-3">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            href={item.path}
            className={` block w-full text-start px-8 py-4 text-black  rounded-lg transition
                ${
                  isActive(item.path)
                    ? "bg-[#8BA8D4]  text-white font-semibold"
                    : "text-white  hover:text-white"
                }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
