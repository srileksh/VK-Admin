"use client";
import { useCallback, useState, useEffect } from "react";
import PromoVideoSection from "./PromoVideoSection";
import LessonSection from "./LessonSection";
import { GoPlus } from "react-icons/go";
import useCourseStore from "@/store/useCourseStore";
import useSectionStore from "@/store/useSectionStore";
import { FaPen } from "react-icons/fa";

export default function CreateModules({ onCancel, onFinish }) {
  const { courseId, publishCourseAction, currentCourse } = useCourseStore();
  const { createSection } = useSectionStore();
  const [sections, setSections] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [sectionTitle, setSectionTitle] = useState("");
  const [promoId] = useState(null);
  const [busySections, setBusySections] = useState({});
  const moduleBusy = Object.values(busySections).some(Boolean);

  const handleSectionBusyChange = useCallback((sectionId, busy) => {
    setBusySections((prev) => {
      if (prev[sectionId] === busy) return prev;

      if (!busy) {
        const next = { ...prev };
        delete next[sectionId];
        return next;
      }

      return {
        ...prev,
        [sectionId]: true,
      };
    });
  }, []);
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
    setBusySections((prev) => {
      if (!(id in prev)) return prev;

      const next = { ...prev };
      delete next[id];
      return next;
    });
  };

  const handleToggleSection = (id) => {
    setSections((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, isOpen: !s.isOpen } : { ...s, isOpen: false },
      ),
    );
  };

  const handleFinish = async () => {
    if (moduleBusy) {
      alert("Please wait until video upload is completed");
      return;
    }

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

        <PromoVideoSection promoId={promoId} moduleBusy={moduleBusy} />

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
              moduleBusy={moduleBusy}
            />
          ))}

          {isAdding && (
            <div className="mb-4 flex w-full items-center gap-3 rounded-lg bg-white p-4 shadow-md">
              <label htmlFor="module-section-title" className="sr-only">
                Section title
              </label>
              <input
                id="module-section-title"
                name="sectionTitle"
                type="text"
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
                type="button"
                onClick={handleCreateSection}
                disabled={moduleBusy}
                className="rounded-lg bg-gray-700 px-5 py-2 text-white disabled:opacity-50"
              >
                Create
              </button>

              <button
                type="button"
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
              type="button"
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
            </button>
          </div>
        </div>

        <div className="flex justify-end gap-6">
          <button
            type="button"
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
            type="button"
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
