"use client";
import { useState, useRef } from "react";
import useCourseStore from "@/store/useCourseStore";
import { X } from "lucide-react";
import { ImArrowUp } from "react-icons/im";
import { uploadImageToCloudinary } from "../../../src/utils/cloudinaryImageUpload";
import { MdAccountCircle } from "react-icons/md";
import { GrGallery } from "react-icons/gr";

export default function CreateCourse({ onCancel, onSuccess }) {
  const { createCourse, loading } = useCourseStore();
  const fileInputRef = useRef(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
  });

  const [errors, setErrors] = useState({});
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [thumbnailUploading, setThumbnailUploading] = useState(false);
  const [facultyUploading, setFacultyUploading] = useState(false);
  const [faculty, setFaculty] = useState([]);

  const [draftFaculty, setDraftFaculty] = useState({
    name: "",
    qualification: "",
    profileImage: "",
  });

  const handleThumbnailUpload = async (file) => {
    if (!file) return;
    setThumbnailUploading(true);
    try {
      const url = await uploadImageToCloudinary(file);
      setThumbnailUrl(url);
      setErrors((p) => ({ ...p, thumbnail: "" }));
    } finally {
      setThumbnailUploading(false);
    }
  };

  const uploadFacultyImage = async (file) => {
    if (!file) return;
    setFacultyUploading(true);
    try {
      const url = await uploadImageToCloudinary(file);
      setDraftFaculty((prev) => ({ ...prev, profileImage: url }));
    } finally {
      setFacultyUploading(false);
    }
  };

  const addFaculty = () => {
    const newErrors = {};
    if (!draftFaculty.name.trim())
      newErrors.facultyName = "This field is mandatory";
    if (!draftFaculty.qualification.trim())
      newErrors.facultyQualification = "This field is mandatory";

    if (Object.keys(newErrors).length) {
      setErrors((p) => ({ ...p, ...newErrors }));
      return;
    }

    setFaculty([...faculty, draftFaculty]);
    setDraftFaculty({ name: "", qualification: "", profileImage: "" });
    setErrors((p) => ({
      ...p,
      faculty: "",
      facultyName: "",
      facultyQualification: "",
    }));
  };

  const removeFaculty = (index) => {
    setFaculty(faculty.filter((_, i) => i !== index));
  };

  const validateFields = () => {
    const newErrors = {};
    if (!form.title.trim()) newErrors.title = "This field is required";
    if (!form.description.trim())
      newErrors.description = "This field is required";
    if (!thumbnailUrl) newErrors.thumbnail = "This field is required";
    if (!form.price) newErrors.price = "This field is required";
    if (faculty.length === 0) newErrors.faculty = "This field is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateFields()) return;

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
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-6xl rounded-xl shadow-lg p-4 sm:p-6 max-h-[95vh] flex flex-col">
        <div className="flex-1 overflow-y-auto px-4 lg:px-6 pt-6 pb-6">
          <h2 className="text-lg sm:text-xl font-semibold mb-6">
            Create Course
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* LEFT SIDE SAME AS BEFORE */}
            <div className="space-y-5 md:border-r border-[#a09f9f] md:pr-6">
              <div>
                <label className="block font-medium mb-1">Course Title *</label>
                <input
                  className="w-full border border-[#a09f9f] rounded-lg px-4 py-2"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                />
                {errors.title && (
                  <p className="text-xs text-red-500 mt-1">{errors.title}</p>
                )}
              </div>

              <div>
                <label className="block font-medium mb-1">
                  Course Description *
                </label>
                <textarea
                  rows={4}
                  className="w-full border border-[#a09f9f] rounded-lg px-4 py-2"
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                />
                {errors.description && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.description}
                  </p>
                )}
              </div>
               <label className="block font-medium mb-1">Thumbnail *</label>
                 <label className="flex flex-col sm:flex-row gap-4 items-start sm:items-center border border-[#a09f9f] rounded-lg p-4 cursor-pointer">
                   <div className="relative w-full sm:w-60 h-32 rounded-md overflow-hidden">
                     {thumbnailUrl ? (
  <img
    src={thumbnailUrl}
    className="w-full h-full object-cover"
  />
) : (
  <div className="w-full h-full flex items-center justify-center bg-gray-100">
    <GrGallery size={50} className="text-gray-400" />
  </div>
)}
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
                    onChange={(e) => handleThumbnailUpload(e.target.files[0])}
                  />
                </label>
                {errors.thumbnail && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.thumbnail}
                  </p>
                )}
              </div>
            
         

            {/* RIGHT SIDE */}
            <div>
              <h3 className="font-semibold ">Faculty info *</h3>
              {errors.faculty && (
                <p className="text-xs text-red-500 ">{errors.faculty}</p>
              )}

              <div className="border border-[#a09f9f] rounded-lg p-4 h-[250px] mb-4 mt-2 flex flex-wrap gap-4">

                {/* Faculty List */}
                {faculty.map((f, index) => (
                  <div key={index} className="relative text-center">
                   {draftFaculty.profileImage ? (
                        <img
                          src={draftFaculty.profileImage}
                          className="w-full h-full object-fill"
                        />
                      ) : (
                        <MdAccountCircle  size={50} className="text-gray-400" />
                      )}
                    <button
                      onClick={() => removeFaculty(index)}
                      className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-1"
                    >
                      <X size={12} />
                    </button>
                    <p className="text-xs mt-1 font-medium ">{f.name}</p>
                    <p className="text-[10px] text-gray-500">
                      {f.qualification}
                    </p>
                  </div>
                ))}

                {/* Add Faculty Section */}
                <div className="w-full">
                  <div className="flex flex-col sm:flex-row gap-3 items-center mt-4 px-6 md:px-0 lg:px-2.5">

                    <div className="grid gap-3 w-full sm:w-[300px]">
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

                    {/* PROFILE ICON FIXED */}
                    <div
                      onClick={() => fileInputRef.current.click()}
                      className="w-18 h-18 rounded-full flex items-center justify-center cursor-pointer overflow-hidden "
                    >
                      {draftFaculty.profileImage ? (
                        <img
                          src={draftFaculty.profileImage}
                          className="w-full h-full object-fill"
                        />
                      ) : (
                        <MdAccountCircle  size={100} className="text-gray-400" />
                      )}
                    </div>

                    <input
                      ref={fileInputRef}
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={(e) =>
                        uploadFacultyImage(e.target.files[0])
                      }
                    />

                    <div className="text-gray-600 flex flex-col items-center">
                      <ImArrowUp />
                      <button
                        onClick={addFaculty}
                        disabled={facultyUploading}
                        className="text-sm mt-1"
                      >
                        Upload
                      </button>
                    </div>

                  </div>
                </div>
              </div>

             <div className="mt-24">
               <label className="font-medium ">Total Amount *</label>
              <input
                className="w-full mt-1 border-[#a09f9f] border rounded-lg px-4 py-2 bg-gray-50"
                type="number"
                value={form.price}
                onChange={(e) =>
                  setForm({ ...form, price: e.target.value })
                }
              />
             </div>
            </div>
            </div>
             <div>
  
          </div>

          {/* FOOTER */}
          <div className="flex flex-col sm:flex-row justify-end gap-4 mt-8">
            <button
              onClick={onCancel}
              className="px-10 py-2 rounded-lg bg-gray-400 text-white"
            >
              Cancel
            </button>

            <button
              onClick={handleSubmit}
              disabled={loading || thumbnailUploading}
              className="px-10 py-2 rounded-lg bg-gray-600 text-white"
            >
              Save & Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
