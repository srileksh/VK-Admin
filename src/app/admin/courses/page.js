"use client";
import React, { useState } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { MdEditNote } from "react-icons/md";
import CreateCourse from "@/components/CreateCourse";

export default function Page() {
  const [createCourse, setCreateCourse] = useState(false);
  const [courses, setCourses] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  // ADD or UPDATE
  const handleSaveCourse = (courseData) => {
    if (editingIndex !== null) {
      // update
      const updatedCourses = [...courses];
      updatedCourses[editingIndex] = courseData;
      setCourses(updatedCourses);
      setEditingIndex(null);
    } else {
      // add
      setCourses((prev) => [...prev, courseData]);
    }
    setCreateCourse(false);
  };

  // DELETE
  const handleDelete = (index) => {
    const filtered = courses.filter((_, i) => i !== index);
    setCourses(filtered);
  };

  // EDIT
  const handleEdit = (index) => {
    setEditingIndex(index);
    setCreateCourse(true);
  };

  return (
    <div className="px-4 sm:px-6 md:px-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-[20px] font-semibold">Courses</h1>
        <button
          onClick={() => {
            setEditingIndex(null);
            setCreateCourse(true);
          }}
          className="bg-[#1F304A] text-white px-6 py-3 rounded-xl"
        >
          Create new course
        </button>
      </div>

      {/* Course Cards */}
      <div className="space-y-2">
        {courses.map((course, index) => (
          <div
            key={index}
            className="bg-[#F8F6F6] p-4 sm:p-5 rounded-[15px] shadow
                       grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6
                       gap-2 items-center place-items-center text-center mt-5"
          >
            <div>
              <p className="text-xs text-gray-500">Course title</p>
              <p className="font-medium">{course.title}</p>
            </div>

            <div>
              <p className="text-xs text-gray-500">Course based on</p>
              <p>{course.packageType}</p>
            </div>

            <div>
              <p className="text-xs text-gray-500">Number of videos</p>
              <p>{course.videos || "—"}</p>
            </div>

            <div>
              <p className="text-xs text-gray-500">Course amount</p>
              <p>{course.amount}</p>
            </div>

            <div>
              <p className="text-xs text-gray-500">Duration</p>
              <p>{course.duration || "—"}</p>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <button
                onClick={() => handleDelete(index)}
                className="text-[22px] text-gray-600 hover:text-red-600"
              >
                <RiDeleteBin5Line />
              </button>

              <button
                onClick={() => handleEdit(index)}
                className="text-[28px] text-gray-600 hover:text-blue-600"
              >
                <MdEditNote />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Popup */}
      <CreateCourse
        isOpen={createCourse}
        onClose={() => setCreateCourse(false)}
        onSave={handleSaveCourse}
        initialData={editingIndex !== null ? courses[editingIndex] : null}
      />
    </div>
  );
}
