"use client";
import { useState, useEffect } from "react";
import PromoVideoSection from "./PromoVideoSection";
import LessonSection from "./LessonSection";
import { GoPlus } from "react-icons/go";
import useCourseStore from "@/store/useCourseStore";
import useSectionStore from "@/store/useSectionStore";
import usePromoStore from "@/store/usePromoStore";
import { FaPen } from "react-icons/fa";

export default function CreateModules({ onCancel, onFinish }) {
  const { courseId, publishCourseAction, currentCourse } = useCourseStore();
  const { createSection } = useSectionStore();
  const { fetchActivePromo } = usePromoStore();
  // const [moduleBusy, setModuleBusy] = useState(false);
  const [sections, setSections] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [sectionTitle, setSectionTitle] = useState("");
  const [promoId, setPromoId] = useState(null);
  // const [busySections, setBusySections] = useState({});
  const [busySections, setBusySections] = useState({});
  const moduleBusy = Object.values(busySections).some(Boolean);

  const handleSectionBusyChange = (sectionId, busy) => {
    setBusySections((prev) => ({
      ...prev,
      [sectionId]: busy,
    }));
  };
  /* ================= PREFILL SECTIONS ON EDIT ================= */
  useEffect(() => {
    if (!currentCourse?.sections?.length) return;

    setSections(
      currentCourse.sections.map((s) => ({
        id: s.id,
        title: s.title,
        isOpen: false,
        lessons: s.lessons || [], // pass existing lessons down
      })),
    );
  }, [currentCourse]);

  const handleCreateSection = async () => {
    if (moduleBusy) {
      alert("Please wait until video upload is completed");
      return;
    }

    if (!sectionTitle.trim()) return;

    try {
      const data = await createSection({
        courseId,
        title: sectionTitle.trim(),
      });

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

  const handleToggleSection = (id) => {
    setSections((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, isOpen: !s.isOpen } : { ...s, isOpen: false },
      ),
    );
  };

  const handleFinish = async () => {
    try {
      // If the course is already published, we don't need to publish it again
      if (currentCourse?.status !== "PUBLISHED") {
        await publishCourseAction(courseId);
      }
      onFinish();
    } catch {
      alert("Failed to finish course");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="max-h-[90vh] w-full max-w-[1000px] overflow-y-auto rounded-xl bg-white p-6 px-8 shadow-lg">
        <h2 className="mb-4 text-lg font-semibold text-[#1F304A]">
          Create modules
        </h2>

        <PromoVideoSection promoId={promoId} />

        <div className="mb-4 rounded-lg border border-gray-200 p-[12px] text-sm text-[#1F304A] shadow-sm">
          <div className="flex items-center gap-[5px]">
            Lessons <FaPen />
          </div>

          {sections.map((section) => (
            // <LessonSection
            //   key={section.id}
            //   sectionId={section.id}
            //   title={section.title}
            //   isOpen={section.isOpen}
            //   onToggle={() => handleToggleSection(section.id)}
            //   onDelete={() => handleRemoveSection(section.id)}
            //   initialLessons={section.lessons || []}
            // />
            <LessonSection
              key={section.id}
              sectionId={section.id}
              title={section.title}
              isOpen={section.isOpen}
              onToggle={() => handleToggleSection(section.id)}
              onDelete={() => handleRemoveSection(section.id)}
              initialLessons={section.lessons || []}
              onBusyChange={(busy) => handleSectionBusyChange(section.id, busy)}
            />
          ))}

          {isAdding && (
            <div className="mb-4 flex w-full items-center gap-3 rounded-lg bg-white p-4 shadow-md">
              <input
                autoFocus
                value={sectionTitle}
                onChange={(e) => setSectionTitle(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleCreateSection()}
                placeholder="Section title"
                className="flex-1 border-b-2 outline-none border-gray-300 px-4 py-2"
              />

              {/* <button
                onClick={handleCreateSection}
                className="rounded-lg bg-gray-700 px-5 py-2 text-white"
              >
                Create
              </button> */}
              <button
                onClick={handleCreateSection}
                disabled={moduleBusy}
                className="rounded-lg bg-gray-700 px-5 py-2 text-white disabled:opacity-50"
              >
                Create
              </button>

              <button
                onClick={() => {
                  setIsAdding(false);
                  setSectionTitle("");
                }}
                className="rounded-lg border-2 border-[#1F304A] px-5 py-2"
              >
                Cancel
              </button>
            </div>
          )}

          <div className="mb-6 mt-6 flex justify-end">
            {/* <button
              onClick={() => setIsAdding(true)}
              className="flex items-center gap-1 rounded-lg p-3 shadow-md"
            >
              <GoPlus /> Add new section
            </button> */}
<button
  onClick={() => {
    if (moduleBusy) {
      alert("Please wait until video upload is completed");
      return;
    }

    setIsAdding(true);
  }}
  disabled={moduleBusy}
  className="flex items-center gap-1 rounded-lg p-3 shadow-md disabled:cursor-not-allowed disabled:opacity-50"
>
  <GoPlus /> Add new section
</button>          </div>
        </div>

        <div className="flex justify-end gap-6">
<button
  onClick={onCancel}
  disabled={moduleBusy}
  className="rounded-xl bg-gray-300 px-10 py-2 disabled:cursor-not-allowed disabled:opacity-50"
>
  Cancel
</button>
          {/* <button
            onClick={handleFinish}
            className="rounded-xl bg-gray-700 px-10 py-2 text-white"
          >
            Finish
          </button> */}
          <button
            onClick={handleFinish}
            disabled={moduleBusy}
            className="rounded-xl bg-gray-700 px-10 py-2 text-white disabled:opacity-50"
          >
            Finish
          </button>
        </div>
      </div>
    </div>
  );
}
