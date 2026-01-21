



"use client";
import React, { useState } from "react";
import { MdClose, MdCalendarToday } from "react-icons/md";

export default function CreateCoupon({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    couponCode: "",
    offerType: "",
    rate: "",
    expiry: "",
    package: "",
    users: "",
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 ">
      <div className="bg-white w-full max-w-lg rounded-xl p-5 shadow-lg relative px-10  ">

        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-[#555555]">Create Coupon</h2>
          <button onClick={onClose}>
            <MdClose size={22} />
          </button>
        </div>

        {/* Coupon Code */}
        <label className="text-md font-medium text-[#555555]">Coupon code</label>
        <div className="flex mt-1 mb-3 border rounded-lg">
          <input
            type="text"
            name="couponCode"
            placeholder=""
            value={formData.couponCode}
            onChange={handleChange}
            className="flex-1  px-3 py-3 text-sm  text-[#3F3D3D] outline-none"
          />
          <button
            
            className="bg-[#555555] text-white px-8 rounded-lg text-md m-1 "
          >
            Generate
          </button>
        </div>

        {/* Offer Type & Select Rate */}
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div>
            <label className="text-md font-medium text-[#555555]">Offer type</label>
            <select
              name="offerType"
              value={formData.offerType}
              onChange={handleChange}
              className="w-full mt-1 border rounded-lg px-3 py-3 text-md text-[#3F3D3D]"
            >
             
              <option value="percentage">Percentage</option>
              <option value="flat">Fixed Amount</option>
            </select>
          </div>

          <div>
            <label className="text-md font-medium text-[#555555]">Select rate</label>
            <div className="relative mt-1">
              <input
                type="number"
                name="rate"
                placeholder="--"
                value={formData.rate}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-3 text-md pr-8"
              />
              <span className="absolute right-3 top-2.5 text-[#3F3D3D] text-sm">
                %
              </span>
            </div>
          </div>
        </div>

        {/* Expiry Date */}
        <label className="text-md font-medium text-[#555555]">Expiry date</label>
        <div className=" mt-1 mb-3">
          <input
            type="date"
            placeholder=""
            name="expiry"
            value={formData.expiry}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-3 text-md pr-10 text-[#3F3D3D]"
          />
        </div>

        {/* Package */}
        <label className="text-md font-medium text-[#555555]">Package</label>
        <select
          name="package"
          value={formData.package}
          onChange={handleChange}
          className="w-full mt-1 mb-3 border rounded-lg px-3 py-3 text-md text-[#3F3D3D]"
        >
          {/* <option value="">Select</option> */}
          <option value="students">Students</option>
          <option value="plus-two">Plus Two</option>
          <option value="degree">Degree</option>
        </select>

        {/* No of Users */}
        <label className="text-md font-medium text-[#555555]">No: of Users</label>
        <select
          name="users"
          value={formData.users}
          onChange={handleChange}
          className="w-full mt-1 mb-5 border rounded-lg px-3 py-3 text-md text-[#3F3D3D]"
        >
          <option value="">Select</option>
          <option value="10">10</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>

        {/* Footer Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="w-1/2 bg-gray-300 text-gray-700 py-3 rounded-lg"
          >
            Cancel
          </button>
          <button
            className="w-1/2 bg-gray-700 text-white py-3 rounded-lg"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
