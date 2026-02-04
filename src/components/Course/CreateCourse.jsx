
"use client";
import { useState } from "react";
import useCourseStore from "@/store/useCourseStore";
import { X } from "lucide-react";
import { ImArrowUp } from "react-icons/im";
import { uploadImageToCloudinary } from "../../../src/utils/cloudinaryImageUpload";

export default function CreateCourse({ onCancel, onSuccess }) {
  const { createCourse, loading } = useCourseStore();

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
  });

  const [thumbnailUrl, setThumbnailUrl] = useState("");

  /* ✅ LOADING STATES */
  const [thumbnailUploading, setThumbnailUploading] = useState(false);
  const [facultyUploading, setFacultyUploading] = useState(false);

  /* 🔹 FACULTY */
  const [faculty, setFaculty] = useState([]);
  const [draftFaculty, setDraftFaculty] = useState({
    name: "",
    qualification: "",
    profileImage: "",
  });

  /* ================= THUMBNAIL ================= */
  const handleThumbnailUpload = async (file) => {
    if (!file) return;

    setThumbnailUploading(true);
    try {
      const url = await uploadImageToCloudinary(file);
      setThumbnailUrl(url);
    } finally {
      setThumbnailUploading(false);
    }
  };

  /* ================= FACULTY IMAGE ================= */
  const uploadFacultyImage = async (file) => {
    if (!file) return;

    setFacultyUploading(true);
    try {
      const url = await uploadImageToCloudinary(file);
      setDraftFaculty({ ...draftFaculty, profileImage: url });
    } finally {
      setFacultyUploading(false);
    }
  };

  /* ================= FACULTY ================= */
  const addFaculty = () => {
    if (!draftFaculty.name || !draftFaculty.qualification) return;

    setFaculty([...faculty, draftFaculty]);
    setDraftFaculty({
      name: "",
      qualification: "",
      profileImage: "",
    });
  };

  const removeFaculty = (index) => {
    setFaculty(faculty.filter((_, i) => i !== index));
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async () => {
    const payload = {
      title: form.title,
      description: form.description,
      thumbnail: thumbnailUrl,
      price: Number(form.price),
      duration: 600,
      level: "BEGINNER",
      faculty,
    };

    const courseId = await createCourse(payload);
    onSuccess(courseId);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-6xl rounded-xl shadow-lg p-6">
        <h2 className="text-xl px-4 font-semibold mb-6">Create Course</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* LEFT */}
          <div className="space-y-5 border-r border-[#a09f9f] px-4">
            <div>
              <label className="block font-medium mb-1">Course Title *</label>
              <input
                className="w-full border border-[#a09f9f] rounded-lg px-4 py-2"
                value={form.title}
                onChange={(e) =>
                  setForm({ ...form, title: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block font-medium">Course Description *</label>
              <textarea
                rows={5}
                className="w-full border border-[#a09f9f] rounded-lg px-4 py-2"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />
            </div>

            {/* THUMBNAIL */}
            <div>
              <label className="block font-medium mb-2">Thumbnail</label>
              <label className="flex gap-4 items-center border border-[#a09f9f] rounded-lg p-4 cursor-pointer">
                <div className="relative w-60 h-32 rounded-md overflow-hidden">
                  <img
                    src={thumbnailUrl || "/profile.png"}
                    className="w-full h-full object-cover"
                  />

                  {thumbnailUploading && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin" />
                    </div>
                  )}
                </div>

                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={(e) =>
                    handleThumbnailUpload(e.target.files[0])
                  }
                />
                <p className="text-sm text-gray-500">
                  Click to upload thumbnail
                </p>
              </label>
            </div>
          </div>

          {/* RIGHT */}
          <div>
            <h3 className="font-semibold mb-2">Faculty info</h3>

            <div className="flex gap-4 mb-4 h-[220px] border  border-[#a09f9f] rounded-lg p-4 flex-wrap">
              {faculty.map((f, index) => (
                <div key={index} className="relative text-center">
                  <img
                    src={f.profileImage || "/profile.png"}
                    className="w-12 h-12 rounded-full border border-[#a09f9f] object-cover"
                  />
                  <button
                    onClick={() => removeFaculty(index)}
                    className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-1"
                  >
                    <X size={12} />
                  </button>
                  <p className="text-xs mt-1 font-medium">{f.name}</p>
                  <p className="text-[10px] text-gray-500">
                    {f.qualification}
                  </p>
                </div>
              ))}

              <div>
                <div className="flex gap-4">
                  <div className="grid gap-3 w-[300px]">
                    <input
                      placeholder="John David"
                      className="border border-[#a09f9f] rounded-lg px-3 py-2 text-sm"
                      value={draftFaculty.name}
                      onChange={(e) =>
                        setDraftFaculty({
                          ...draftFaculty,
                          name: e.target.value,
                        })
                      }
                    />
                    <input
                      placeholder="M.com, CAIIB"
                      className="border border-[#a09f9f] rounded-lg px-3 py-2 text-sm"
                      value={draftFaculty.qualification}
                      onChange={(e) =>
                        setDraftFaculty({
                          ...draftFaculty,
                          qualification: e.target.value,
                        })
                      }
                    />
                  </div>

                  <label className="relative cursor-pointer">
                    <img
                      src={draftFaculty.profileImage || "/profile.png"}
                      className="w-22 h-22 rounded-full object-cover"
                    />
                    <input
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={(e) =>
                        uploadFacultyImage(e.target.files[0])
                      }
                    />
                    <span className="absolute inset-0 flex items-center justify-center text-xs text-white bg-black/40 rounded-full">
                      {facultyUploading ? "Uploading..." : "Change Photo"}
                    </span>
                  </label>

                  <div className="text-gray-600 pt-4">
                    <p className="px-10">
                      <ImArrowUp />
                    </p>
                    <button
                      onClick={addFaculty}
                      disabled={facultyUploading}
                      className="flex items-center gap-2 text-md"
                    >
                      + Add New
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-[150px]">
              <label className="font-medium">Total Amount *</label>
              <input
                className="w-full border border-[#a09f9f] rounded-lg px-4 py-2 bg-gray-50"
                value={form.price}
                onChange={(e) =>
                  setForm({ ...form, price: e.target.value })
                }
              />
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="flex justify-end gap-4 mt-8">
          <button
            onClick={onCancel}
            className="px-20 py-2 rounded-lg bg-gray-400 text-white"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading || thumbnailUploading}
            className="px-10 py-2 rounded-lg bg-gray-600 text-white"
          >
            {thumbnailUploading ? "Uploading..." : "Save & Continue"}
          </button>
        </div>
      </div>
    </div>
  );
}
