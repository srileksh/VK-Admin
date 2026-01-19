"use client";
import { useState } from "react";

export default function CreatePackageModal({ onClose, onCreate }) {
  const [name, setName] = useState("");

  const handleCreate = () => {
    if (!name.trim()) return;
    onCreate(name);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg w-[420px]">
        <h2 className="text-[22px] mb-4">Create new package</h2>
<p className="text-[#5d5d5d] font-semibold ">Name of package</p>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-[#5d5d5d] px-4 py-3 rounded-lg outline-none"
          placeholder="Package name"
        />

        <div className="flex gap-4 mt-6">
          <button
            onClick={onClose}
            className="w-1/2 py-3 bg-gray-400 text-white rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={handleCreate}
            className="w-1/2 py-3 bg-[#5d5d5d] text-white rounded-lg"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
