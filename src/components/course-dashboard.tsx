"use client";

import { CheckCircle2, ChevronRight, Layers3 } from "lucide-react";
import Link from "next/link";
import { lessons, type CourseLevel } from "@/lib/course-data";
import { useCourseProgress } from "./progress";

const levels: CourseLevel[] = ["Basic", "Immediate", "Advanced"];

export function CourseDashboard() {
  const { completed } = useCourseProgress();
  const progress = Math.round((completed.length / lessons.length) * 100);
  const nextLesson = lessons.find((lesson) => !completed.includes(lesson.id)) ?? lessons[0];

  return (
    <AppContent>
      <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="min-w-0 border border-[#dce5d8] bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold text-[#31553a]">Start here</p>
          <h1 className="mt-3 max-w-3xl break-words text-3xl font-semibold leading-tight text-[#102018] sm:text-5xl">
            Supernatural Upgrade Discipleship
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-[#536157]">
            A simple course path with focused lessons, KJV study, lexicon notes, and review cards.
          </p>
          <Link
            href={`/lessons/${nextLesson.id}`}
            className="mt-7 inline-flex items-center gap-2 rounded-sm bg-[#1f4f35] px-5 py-3 text-sm font-semibold text-white hover:bg-[#2b6d47]"
          >
            Continue Course
            <ChevronRight size={17} aria-hidden />
          </Link>
        </div>

        <div className="min-w-0 border border-[#dce5d8] bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-[#5c6c60]">Course Progress</p>
              <p className="mt-1 text-4xl font-semibold">{progress}%</p>
            </div>
            <CheckCircle2 className="text-[#2c6d45]" size={38} aria-hidden />
          </div>
          <div className="mt-5 h-2 bg-[#edf2ea]">
            <div className="h-2 bg-[#2c6d45]" style={{ width: `${progress}%` }} />
          </div>
          <p className="mt-4 text-sm leading-6 text-[#66736a]">
            Progress is saved only in this browser. No account or signup is required.
          </p>
        </div>
      </section>

      <section className="mt-6 grid gap-4 lg:grid-cols-3">
        {levels.map((level) => {
          const levelLessons = lessons.filter((lesson) => lesson.level === level);
          const levelComplete = levelLessons.filter((lesson) => completed.includes(lesson.id)).length;

          return (
            <div key={level} className="border border-[#dce5d8] bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Layers3 size={17} className="text-[#2c6d45]" aria-hidden />
                  <h2 className="text-lg font-semibold">{level}</h2>
                </div>
                <span className="text-sm font-semibold text-[#66736a]">
                  {levelComplete}/{levelLessons.length}
                </span>
              </div>
              <div className="grid gap-3">
                {levelLessons.map((lesson) => (
                  <Link
                    key={lesson.id}
                    href={`/lessons/${lesson.id}`}
                    className="flex min-w-0 items-center gap-3 border border-[#e3eadf] bg-[#fbfdf9] px-3 py-3 text-sm hover:border-[#91ad86]"
                  >
                    <span className="min-w-0 flex-1">
                      <span className="block break-words font-semibold">{lesson.title}</span>
                      <span className="mt-1 block text-xs text-[#66736a]">{lesson.objective}</span>
                    </span>
                    {completed.includes(lesson.id) && <CheckCircle2 size={18} className="shrink-0 text-[#2c6d45]" />}
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </section>
    </AppContent>
  );
}

function AppContent({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto max-w-7xl px-5 py-8 lg:px-8">{children}</div>;
}

