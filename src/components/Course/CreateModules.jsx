"use client";
import { useState, useEffect } from "react";
import PromoVideoSection from "./PromoVideoSection";
import LessonSection from "./LessonSection";
import { GoPlus } from "react-icons/go";
import useCourseStore from "@/store/useCourseStore";
import useSectionStore from "@/store/useSectionStore";
import { publishCourse } from "@/services/coursesApi";
import { FaPen } from "react-icons/fa";

export default function CreateModules({ onCancel, onFinish }) {
  const { courseId, publishCourseAction, currentCourse } = useCourseStore();
  const { createSection } = useSectionStore();

  const [sections, setSections] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [sectionTitle, setSectionTitle] = useState("");

  /* ================= PREFILL SECTIONS ON EDIT ================= */
  useEffect(() => {
    if (!currentCourse?.sections?.length) return;

    setSections(
      currentCourse.sections.map((s) => ({
        id: s.id,
        title: s.title,
        isOpen: false,
        lessons: s.lessons || [],   // pass existing lessons down
      }))
    );
  }, [currentCourse]);

  

  /* CREATE SECTION */
  const handleCreateSection = async () => {
    if (!sectionTitle.trim()) return;

    try {
      const data = await createSection({
        courseId,
        title: sectionTitle.trim(),
      });

      // close all sections and open new one
      setSections((prev) => [
        ...prev.map((s) => ({ ...s, isOpen: false })),
        {
          id: data.id,
          title: sectionTitle.trim(),
          isOpen: true,
        },
      ]);

      setSectionTitle("");
      setIsAdding(false);
    } catch {
      alert("Failed to create section");
    }
  };
  const handleRemoveSection = (id) => {
  setSections((prev) => prev.filter((s) => s.id !== id));
};


  /* TOGGLE SECTION (accordion) */
  const handleToggleSection = (id) => {
    setSections((prev) =>
      prev.map((s) =>
        s.id === id
          ? { ...s, isOpen: !s.isOpen }
          : { ...s, isOpen: false }
      )
    );
  };

 
const handleFinish = async () => {
  try {
    await publishCourseAction(courseId);
    onFinish();
  } catch {
    alert("Failed to finish course");
  }
};


  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
      <div className="bg-white w-full max-w-[1000px] rounded-xl shadow-lg p-6 px-8 max-h-[90vh] overflow-y-auto">
        <h2 className="text-lg font-semibold mb-4 text-[#1F304A]">
          Create modules{" "}
        </h2>

        <PromoVideoSection />
        <div className="border border-gray-200 rounded-lg mb-4 shadow-sm p-[12px]  text-sm text-[#1F304A]">
          <div className=" flex items-center gap-[5px]">Lessons<FaPen/></div>

          {/* SECTIONS */}
          {sections.map((section) => (
            <LessonSection
              key={section.id}
              sectionId={section.id}
              title={section.title}
              isOpen={section.isOpen}
              onToggle={() => handleToggleSection(section.id)}
              onDelete={() => handleRemoveSection(section.id)}
              initialLessons={section.lessons || []}
            />
          ))}

          {/* ADD SECTION INPUT */}
          {isAdding && (
            <div className="flex items-center gap-3 w-full mb-4 bg-white p-4 rounded-lg shadow-md">
              <input
                autoFocus
                value={sectionTitle}
                onChange={(e) => setSectionTitle(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleCreateSection()}
                placeholder="Section title"
                className="flex-1 px-4 py-2 border-b-2 border-gray-300 outline-none"
              />

              <button
                onClick={handleCreateSection}
                className="bg-gray-700 text-white px-5 py-2 rounded-lg"
              >
                Create
              </button>

              <button
                onClick={() => {
                  setIsAdding(false);
                  setSectionTitle("");
                }}
                className="border-2 border-[#1F304A] px-5 py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          )}

          {/* ADD BUTTON */}
          <div className="flex justify-end mb-6 mt-6">
            <button
              onClick={() => setIsAdding(true)}
              className="flex items-center gap-1 p-3 shadow-md rounded-lg"
            >
              <GoPlus /> Add new section
            </button>
          </div>
        </div>

        {/* FOOTER */}
        <div className="flex justify-end gap-6">
          <button
            onClick={onCancel}
            className="bg-gray-300 px-10 py-2 rounded-xl"
          >
            Cancel
          </button>

          <button
            onClick={handleFinish}
            className="bg-gray-700 px-10 py-2 rounded-xl text-white"
          >
            Finish
          </button>
        </div>
      </div>
    </div>
  );
}

