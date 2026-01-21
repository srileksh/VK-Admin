"use client";

import React, { useState } from "react";
import { MdEditNote } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";
import CreateCoupon from "@/components/Coupon/CreateCoupon";

function Page() {
  const [openPopup, setOpenPopup] = useState(false);

  return (
    <>
      {/* Main Content */}
      <div className="px-4 sm:px-6 md:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-[20px] font-semibold text-[#1F304A]">Coupons</h1>
          <button
            onClick={() => setOpenPopup(true)}
            className="bg-[#1F304A] text-white px-6 py-3 rounded-xl hover:bg-[#162338] transition"
          >
            Create new Coupon
          </button>
        </div>

        {/* Coupon Cards */}
        <div className="space-y-2">
          <div
            className="bg-[#F8F6F6] p-4 sm:p-5 rounded-[15px] shadow
              grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6
              gap-2 items-center place-items-center text-center mt-5"
          >
            <div>
              <p className="text-xs text-gray-500">Coupon code</p>
              <p className="font-medium">VK1234</p>
            </div>

            <div>
              <p className="text-xs text-gray-500">Created date</p>
              <p>16/10/25</p>
            </div>

            <div>
              <p className="text-xs text-gray-500">Offer type</p>
              <p>Percentage</p>
            </div>

            <div>
              <p className="text-xs text-gray-500">Offer amount</p>
              <p>10%</p>
            </div>

            <div>
              <p className="text-xs text-gray-500">Expiry date</p>
              <p>12/10/26</p>
            </div>

            <div className="flex gap-4">
              <button className="text-[22px] text-gray-600 hover:text-red-600">
                <RiDeleteBin5Line />
              </button>

              <button className="text-[28px] text-gray-600 hover:text-blue-600">
                <MdEditNote />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Popup Component */}
      <CreateCoupon
        isOpen={openPopup}
        onClose={() => setOpenPopup(false)}
      />
    </>
  );
}

export default Page;
