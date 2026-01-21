"use client";
import React, { useState } from "react";
import { X, Calendar } from "lucide-react";

export default function CreateCoupon({ isOpen = true, onClose = () => {} }) {
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

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-lg rounded-xl shadow-lg relative px-6 py-5 sm:px-10 max-h-[90vh] overflow-y-auto">

        {/* Header */}
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-semibold text-[#555555]">Create Coupon</h2>
          <button onClick={onClose} className="hover:bg-gray-100 rounded p-1 transition">
            <X size={22} />
          </button>
        </div>

        {/* Coupon Code */}
        <label className="text-sm sm:text-md font-medium text-[#555555]">Coupon code</label>
        <div className="flex flex-col sm:flex-row mt-1 mb-3 border rounded-lg">
          <input
            type="text"
            name="couponCode"
            placeholder="Enter or generate code"
            value={formData.couponCode}
            onChange={handleChange}
            className="flex-1 px-3 py-3 text-sm text-[#3F3D3D] outline-none rounded-lg sm:rounded-lg sm:rounded-tr-none"
          />
          <button className="bg-[#555555] text-white px-6 sm:px-8 py-3 sm:py-0 rounded-b-lg sm:rounded-lg sm:rounded text-sm sm:text-md sm:m-1 hover:bg-[#3F3D3D] transition">
            Generate
          </button>
        </div>

        {/* Offer Type & Select Rate */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
          <div>
            <label className="text-sm sm:text-md font-medium text-[#555555]">Offer type</label>
            <select
              name="offerType"
              value={formData.offerType}
              onChange={handleChange}
              className="w-full mt-1 border rounded-lg px-3 py-3 text-sm sm:text-md text-[#3F3D3D] outline-none"
            >
              <option value="">Select type</option>
              <option value="percentage">Percentage</option>
              <option value="flat">Fixed Amount</option>
            </select>
          </div>

          <div>
            <label className="text-sm sm:text-md font-medium text-[#555555]">Select rate</label>
            <div className="relative mt-1">
              <input
                type="number"
                name="rate"
                placeholder="0"
                value={formData.rate}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-3 text-sm sm:text-md pr-8 outline-none"
              />
              <span className="absolute right-3 top-3 text-[#3F3D3D] text-sm">
                %
              </span>
            </div>
          </div>
        </div>

        {/* Expiry Date */}
        <label className="text-sm sm:text-md font-medium text-[#555555]">Expiry date</label>
        <div className="mt-1 mb-3">
          <input
            type="date"
            name="expiry"
            value={formData.expiry}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-3 text-sm sm:text-md text-[#3F3D3D] outline-none"
          />
        </div>

        {/* Package */}
        <label className="text-sm sm:text-md font-medium text-[#555555]">Package</label>
        <select
          name="package"
          value={formData.package}
          onChange={handleChange}
          className="w-full mt-1 mb-3 border rounded-lg px-3 py-3 text-sm sm:text-md text-[#3F3D3D] outline-none"
        >
          <option value="">Select package</option>
          <option value="students">Students</option>
          <option value="plus-two">Plus Two</option>
          <option value="degree">Degree</option>
        </select>

        {/* No of Users */}
        <label className="text-sm sm:text-md font-medium text-[#555555]">No: of Users</label>
        <select
          name="users"
          value={formData.users}
          onChange={handleChange}
          className="w-full mt-1 mb-5 border rounded-lg px-3 py-3 text-sm sm:text-md text-[#3F3D3D] outline-none"
        >
          <option value="">Select</option>
          <option value="10">10</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>

        {/* Footer Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={onClose}
            className="w-full sm:w-1/2 bg-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-400 transition font-medium"
          >
            Cancel
          </button>
          <button className="w-full sm:w-1/2 bg-gray-700 text-white py-3 rounded-lg hover:bg-gray-800 transition font-medium">
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
