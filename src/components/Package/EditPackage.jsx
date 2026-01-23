"use client";
import React, { useState } from "react";

function EditPackage() {
  const [showInput, setShowInput] = useState(false);

  return (
    <div>
      {/* ADD / EDIT MODAL */}
      {showInput && (selectedParent || selectedEdit) && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg w-[420px]">
            <h2 className="text-[22px] mb-2">
              {selectedEdit
                ? `Edit ${selectedEdit.name}`
                : `Create new package for ${selectedParent.name}`}
            </h2>

            <p className="text-[#5d5d5d] font-semibold mb-1">Name of package</p>

            <input
              value={subName}
              onChange={(e) => setSubName(e.target.value)}
              className="w-full border px-4 py-3 rounded-lg outline-none"
              placeholder="Package name"
            />

            <div className="flex gap-4 mt-6">
              <button
                onClick={() => {
                  setShowInput(false);
                  setSelectedParent(null);
                  setSelectedEdit(null);
                  setSubName("");
                }}
                className="w-1/2 py-3 bg-gray-400 text-white rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleAddOrEdit}
                className="w-1/2 py-3 bg-[#5d5d5d] text-white rounded-lg"
              >
                {selectedEdit ? "Update" : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EditPackage;
