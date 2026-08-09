"use client";

import { BookOpen, CheckCircle2, ChevronLeft, ChevronRight, Library } from "lucide-react";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { lessons, lexicon } from "@/lib/course-data";
import { useCourseProgress } from "./progress";

export function LessonDetail() {
  const params = useParams<{ id: string }>();
  const activeLesson = lessons.find((lesson) => lesson.id === params.id);

  if (!activeLesson) notFound();

  const { completed, toggleLesson } = useCourseProgress();
  const index = lessons.findIndex((lesson) => lesson.id === activeLesson.id);
  const previous = lessons[index - 1];
  const next = lessons[index + 1];
  const lessonLexicon = lexicon
    .filter((entry) =>
      `${activeLesson.title} ${activeLesson.teaching} ${activeLesson.practice.join(" ")}`
        .toLowerCase()
        .includes(entry.term.toLowerCase())
    )
    .slice(0, 5);

  return (
    <div className="mx-auto grid max-w-7xl gap-6 px-5 py-8 lg:grid-cols-[300px_1fr] lg:px-8">
      <aside className="order-2 h-fit min-w-0 border border-[#dce5d8] bg-white p-4 shadow-sm lg:order-1">
        <p className="mb-4 text-sm font-semibold text-[#405044]">Course Lessons</p>
        <div className="grid gap-2">
          {lessons.map((lesson, lessonIndex) => (
            <Link
              key={lesson.id}
              href={`/lessons/${lesson.id}`}
              className={`flex min-w-0 items-center gap-3 rounded-sm px-3 py-3 text-sm ${
                activeLesson.id === lesson.id
                  ? "bg-[#1f4f35] text-white"
                  : "bg-[#f5f8f2] text-[#243028] hover:bg-[#e9f0e5]"
              }`}
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-sm bg-[#18211d] text-xs font-semibold text-white">
                {lessonIndex + 1}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block break-words font-semibold">{lesson.title}</span>
                <span className="text-xs opacity-75">{lesson.level}</span>
              </span>
            </Link>
          ))}
        </div>
      </aside>

      <article className="order-1 min-w-0 border border-[#dce5d8] bg-white p-5 shadow-sm sm:p-7 lg:order-2">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="rounded-sm bg-[#e9f0e5] px-3 py-1 text-sm font-semibold text-[#31553a]">
            Lesson {index + 1} · {activeLesson.level}
          </span>
          <button
            onClick={() => toggleLesson(activeLesson.id)}
            className="inline-flex items-center gap-2 rounded-sm bg-[#18211d] px-4 py-2 text-sm font-semibold text-white hover:bg-[#2b3a31]"
          >
            <CheckCircle2 size={16} aria-hidden />
            {completed.includes(activeLesson.id) ? "Completed" : "Mark Complete"}
          </button>
        </div>

        <h1 className="mt-5 break-words text-3xl font-semibold leading-tight">{activeLesson.title}</h1>
        <p className="mt-3 text-lg leading-8 text-[#56645a]">{activeLesson.objective}</p>

        <section className="mt-7">
          <h2 className="text-lg font-semibold">Teaching</h2>
          <p className="mt-2 leading-8 text-[#35423a]">{activeLesson.teaching}</p>
        </section>

        <section className="mt-7">
          <div className="mb-3 flex items-center gap-2">
            <BookOpen size={17} className="text-[#2c6d45]" aria-hidden />
            <h2 className="text-lg font-semibold">Scriptures to Study</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {activeLesson.scriptures.map((item) => (
              <Link
                key={item}
                href={`/bible?reference=${encodeURIComponent(item)}`}
                className="rounded-sm border border-[#cbdac5] bg-[#f8faf7] px-3 py-2 text-sm font-semibold text-[#264533] hover:border-[#2c6d45]"
              >
                {item}
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-7 grid gap-5 md:grid-cols-2">
          <div>
            <h2 className="text-lg font-semibold">Deep Dive</h2>
            <ul className="mt-3 grid gap-3">
              {activeLesson.deepDive.map((item) => (
                <li key={item} className="border-l-2 border-[#91ad86] pl-3 leading-7 text-[#3d4b42]">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-semibold">Practical Application</h2>
            <ol className="mt-3 grid gap-3">
              {activeLesson.practice.map((item, practiceIndex) => (
                <li key={item} className="flex gap-3 leading-7 text-[#3d4b42]">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-sm bg-[#1f4f35] text-sm font-semibold text-white">
                    {practiceIndex + 1}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="mt-7 border border-[#dce5d8] bg-[#f8faf7] p-4">
          <h2 className="text-lg font-semibold">Prayer Focus</h2>
          <p className="mt-2 leading-8 text-[#35423a]">{activeLesson.prayerFocus}</p>
        </section>

        <section className="mt-7 border border-[#dce5d8] bg-white p-4">
          <div className="mb-3 flex items-center gap-2">
            <Library size={17} className="text-[#2c6d45]" aria-hidden />
            <h2 className="text-lg font-semibold">Lexicon Notes for This Lesson</h2>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {(lessonLexicon.length ? lessonLexicon : lexicon.slice(0, 4)).map((entry) => (
              <details key={entry.term} className="border border-[#e3eadf] bg-[#fbfdf9] p-3">
                <summary className="cursor-pointer text-sm font-semibold">
                  {entry.term} <span className="text-[#66736a]">({entry.strongs})</span>
                </summary>
                <p className="mt-2 text-sm leading-6 text-[#35423a]">
                  {entry.transliteration}: {entry.shortDefinition}
                </p>
                <p className="mt-2 text-xs leading-5 text-[#66736a]">{entry.studyNote}</p>
              </details>
            ))}
          </div>
        </section>

        <div className="mt-7 flex flex-col gap-3 border-t border-[#e3eadf] pt-5 sm:flex-row sm:items-center sm:justify-between">
          {previous ? (
            <Link
              href={`/lessons/${previous.id}`}
              className="inline-flex items-center justify-center gap-2 rounded-sm border border-[#cbdac5] px-4 py-3 text-sm font-semibold"
            >
              <ChevronLeft size={16} aria-hidden />
              Previous
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              href={`/lessons/${next.id}`}
              className="inline-flex items-center justify-center gap-2 rounded-sm bg-[#1f4f35] px-4 py-3 text-sm font-semibold text-white"
            >
              Next Lesson
              <ChevronRight size={16} aria-hidden />
            </Link>
          ) : (
            <Link
              href="/flashcards"
              className="inline-flex items-center justify-center gap-2 rounded-sm bg-[#1f4f35] px-4 py-3 text-sm font-semibold text-white"
            >
              Review Flashcards
              <ChevronRight size={16} aria-hidden />
            </Link>
          )}
        </div>
      </article>
    </div>
  );
}
