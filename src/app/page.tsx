"use client";

import {
  BookOpen,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Layers3,
  Library,
  RotateCcw,
  Search,
  Sparkles
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { flashcards, lessons, lexicon, quickReferences, type CourseLevel } from "@/lib/course-data";

type BibleVerse = {
  book_name: string;
  chapter: number;
  verse: number;
  text: string;
};

type BibleResult = {
  reference: string;
  translation: string;
  verses: BibleVerse[];
  text: string;
};

const levels: CourseLevel[] = ["Basic", "Immediate", "Advanced"];

const initialBibleResult: BibleResult = {
  reference: "2 Corinthians 5:17",
  translation: "King James Version",
  verses: [
    {
      book_name: "2 Corinthians",
      chapter: 5,
      verse: 17,
      text: "Therefore if any man be in Christ, he is a new creature: old things are passed away; behold, all things are become new."
    }
  ],
  text: "Therefore if any man be in Christ, he is a new creature: old things are passed away; behold, all things are become new."
};

export default function Home() {
  const [activeLevel, setActiveLevel] = useState<CourseLevel>("Basic");
  const [activeLessonId, setActiveLessonId] = useState(lessons[0].id);
  const [completed, setCompleted] = useState<string[]>([]);
  const [reference, setReference] = useState("2 Corinthians 5:17");
  const [bibleResult, setBibleResult] = useState<BibleResult | null>(initialBibleResult);
  const [bibleError, setBibleError] = useState("");
  const [loadingBible, setLoadingBible] = useState(false);
  const [activeCard, setActiveCard] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    const handle = window.setTimeout(() => {
      const saved = window.localStorage.getItem("discipleship-progress");
      if (saved) setCompleted(JSON.parse(saved));
    }, 0);

    return () => window.clearTimeout(handle);
  }, []);

  useEffect(() => {
    window.localStorage.setItem("discipleship-progress", JSON.stringify(completed));
  }, [completed]);

  const lessonsForLevel = lessons.filter((lesson) => lesson.level === activeLevel);
  const activeLesson = lessons.find((lesson) => lesson.id === activeLessonId) ?? lessons[0];
  const progress = Math.round((completed.length / lessons.length) * 100);
  const currentCards = flashcards.filter((card) => card.level === activeLevel);
  const selectedCard = currentCards[activeCard % currentCards.length];

  const lessonLexicon = useMemo(() => {
    const text = `${activeLesson.title} ${activeLesson.teaching} ${activeLesson.practice.join(" ")}`.toLowerCase();
    return lexicon.filter((entry) => text.includes(entry.term.toLowerCase())).slice(0, 5);
  }, [activeLesson]);

  async function lookupBible(nextReference = reference) {
    setLoadingBible(true);
    setBibleError("");

    try {
      const response = await fetch(`/api/bible?reference=${encodeURIComponent(nextReference)}`);
      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.error ?? "Unable to load passage.");
      }

      setBibleResult(payload);
      setReference(nextReference);
    } catch (error) {
      setBibleError(error instanceof Error ? error.message : "Unable to load passage.");
      setBibleResult(null);
    } finally {
      setLoadingBible(false);
    }
  }

  function selectLevel(level: CourseLevel) {
    setActiveLevel(level);
    const firstLesson = lessons.find((lesson) => lesson.level === level);
    if (firstLesson) setActiveLessonId(firstLesson.id);
    setActiveCard(0);
    setShowAnswer(false);
  }

  function toggleLesson(id: string) {
    setCompleted((items) =>
      items.includes(id) ? items.filter((item) => item !== id) : [...items, id]
    );
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f8faf7] text-[#18211d]">
      <section className="border-b border-[#dce5d8] bg-[#fbfdf9]">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-8 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
          <div className="flex min-h-[360px] min-w-0 flex-col justify-between">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-sm border border-[#bdd2b4] bg-white px-3 py-2 text-sm font-semibold text-[#37533b]">
                <Sparkles size={16} aria-hidden />
                No-login discipleship course
              </div>
              <h1 className="max-w-3xl break-words text-3xl font-semibold leading-tight text-[#102018] sm:text-5xl">
                Supernatural Upgrade Discipleship
              </h1>
              <p className="mt-5 max-w-2xl break-words text-lg leading-8 text-[#536157]">
                A clean, step-by-step course for new and growing believers: basic foundations,
                immediate spiritual practice, advanced prayer, KJV study, lexicon notes, and flashcards.
              </p>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {levels.map((level) => (
                <button
                  key={level}
                  onClick={() => selectLevel(level)}
                  className={`rounded-sm border px-4 py-4 text-left transition ${
                    activeLevel === level
                      ? "border-[#1f4f35] bg-[#1f4f35] text-white"
                      : "border-[#d5dfd1] bg-white text-[#223027] hover:border-[#91ad86]"
                  }`}
                >
                  <span className="block text-sm font-semibold">{level}</span>
                  <span className="mt-1 block text-xs opacity-80">
                    {lessons.filter((lesson) => lesson.level === level).length} guided lessons
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="min-w-0 border border-[#dce5d8] bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-[#5c6c60]">Course Progress</p>
                <p className="mt-1 text-3xl font-semibold">{progress}%</p>
              </div>
              <CheckCircle2 className="text-[#2c6d45]" size={34} aria-hidden />
            </div>
            <div className="mt-5 h-2 bg-[#edf2ea]">
              <div className="h-2 bg-[#2c6d45]" style={{ width: `${progress}%` }} />
            </div>
            <div className="mt-6 grid gap-3">
              {lessons.map((lesson, index) => (
                <button
                  key={lesson.id}
                  onClick={() => {
                    setActiveLevel(lesson.level);
                    setActiveLessonId(lesson.id);
                  }}
                  className={`flex items-center gap-3 border px-3 py-3 text-left text-sm transition ${
                    activeLesson.id === lesson.id
                      ? "border-[#2c6d45] bg-[#f0f7ef]"
                      : "border-[#e3eadf] bg-white hover:border-[#bdd2b4]"
                  }`}
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-sm bg-[#18211d] text-xs font-semibold text-white">
                    {index + 1}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block break-words font-semibold">{lesson.title}</span>
                    <span className="text-xs text-[#66736a]">{lesson.level}</span>
                  </span>
                  {completed.includes(lesson.id) && <CheckCircle2 className="text-[#2c6d45]" size={18} />}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-5 py-8 lg:grid-cols-[280px_1fr_360px] lg:px-8">
        <aside className="h-fit min-w-0 border border-[#dce5d8] bg-white p-4">
          <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-[#405044]">
            <Layers3 size={16} aria-hidden />
            {activeLevel} Track
          </div>
          <div className="grid gap-2">
            {lessonsForLevel.map((lesson) => (
              <button
                key={lesson.id}
                onClick={() => setActiveLessonId(lesson.id)}
                className={`min-w-0 rounded-sm px-3 py-3 text-left text-sm ${
                  activeLesson.id === lesson.id
                    ? "bg-[#1f4f35] text-white"
                    : "bg-[#f5f8f2] text-[#243028] hover:bg-[#e9f0e5]"
                }`}
              >
                {lesson.title}
              </button>
            ))}
          </div>
        </aside>

        <article className="min-w-0 border border-[#dce5d8] bg-white p-5 shadow-sm sm:p-7">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="rounded-sm bg-[#e9f0e5] px-3 py-1 text-sm font-semibold text-[#31553a]">
              {activeLesson.level}
            </span>
            <button
              onClick={() => toggleLesson(activeLesson.id)}
              className="inline-flex items-center gap-2 rounded-sm bg-[#18211d] px-4 py-2 text-sm font-semibold text-white hover:bg-[#2b3a31]"
            >
              <CheckCircle2 size={16} aria-hidden />
              {completed.includes(activeLesson.id) ? "Completed" : "Mark Complete"}
            </button>
          </div>

          <h2 className="mt-5 break-words text-3xl font-semibold leading-tight">{activeLesson.title}</h2>
          <p className="mt-3 text-lg leading-8 text-[#56645a]">{activeLesson.objective}</p>

          <div className="mt-7 grid gap-6">
            <section>
              <h3 className="text-lg font-semibold">Teaching</h3>
              <p className="mt-2 leading-8 text-[#35423a]">{activeLesson.teaching}</p>
            </section>

            <section>
              <h3 className="mb-3 text-lg font-semibold">Scriptures to Study</h3>
              <div className="flex flex-wrap gap-2">
                {activeLesson.scriptures.map((item) => (
                  <button
                    key={item}
                    onClick={() => lookupBible(item)}
                    className="rounded-sm border border-[#cbdac5] bg-[#f8faf7] px-3 py-2 text-sm font-semibold text-[#264533] hover:border-[#2c6d45]"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </section>

            <section className="grid gap-5 md:grid-cols-2">
              <div>
                <h3 className="text-lg font-semibold">Deep Dive</h3>
                <ul className="mt-3 grid gap-3">
                  {activeLesson.deepDive.map((item) => (
                    <li key={item} className="border-l-2 border-[#91ad86] pl-3 leading-7 text-[#3d4b42]">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Practical Application</h3>
                <ol className="mt-3 grid gap-3">
                  {activeLesson.practice.map((item, index) => (
                    <li key={item} className="flex gap-3 leading-7 text-[#3d4b42]">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-sm bg-[#1f4f35] text-sm font-semibold text-white">
                        {index + 1}
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </section>

            <section className="border border-[#dce5d8] bg-[#f8faf7] p-4">
              <h3 className="text-lg font-semibold">Prayer Focus</h3>
              <p className="mt-2 leading-8 text-[#35423a]">{activeLesson.prayerFocus}</p>
            </section>
          </div>
        </article>

        <aside className="grid h-fit min-w-0 gap-6">
          <section className="border border-[#dce5d8] bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-[#405044]">
              <BookOpen size={16} aria-hidden />
              KJV Study Tool
            </div>
            <form
              className="flex gap-2"
              onSubmit={(event) => {
                event.preventDefault();
                lookupBible(reference);
              }}
            >
              <input
                value={reference}
                onChange={(event) => setReference(event.target.value)}
                className="min-w-0 flex-1 border border-[#cbdac5] px-3 py-2 text-sm outline-none focus:border-[#2c6d45]"
                placeholder="John 3:16"
              />
              <button
                type="submit"
                className="inline-flex h-10 w-10 items-center justify-center rounded-sm bg-[#1f4f35] text-white hover:bg-[#2b6d47]"
                aria-label="Search KJV"
              >
                <Search size={17} aria-hidden />
              </button>
            </form>
            <div className="mt-3 flex flex-wrap gap-2">
              {activeLesson.scriptures.slice(0, 4).map((item) => (
                <button
                  key={item}
                  onClick={() => lookupBible(item)}
                  className="rounded-sm bg-[#eef5eb] px-2 py-1 text-xs font-semibold text-[#31553a]"
                >
                  {item}
                </button>
              ))}
            </div>
            <div className="mt-4 min-h-[150px] border border-[#e3eadf] bg-[#fbfdf9] p-4">
              {loadingBible && <p className="text-sm text-[#66736a]">Loading KJV passage...</p>}
              {bibleError && <p className="text-sm font-semibold text-[#8a302b]">{bibleError}</p>}
              {bibleResult && !loadingBible && (
                <div>
                  <p className="text-sm font-semibold text-[#1f4f35]">
                    {bibleResult.reference} · {bibleResult.translation}
                  </p>
                  <div className="mt-3 grid gap-2 text-sm leading-7 text-[#35423a]">
                    {bibleResult.verses.map((verse) => (
                      <p key={`${verse.book_name}-${verse.chapter}-${verse.verse}`}>
                        <sup className="mr-1 font-semibold text-[#2c6d45]">{verse.verse}</sup>
                        {verse.text.trim()}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>

          <section className="border border-[#dce5d8] bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-[#405044]">
              <Library size={16} aria-hidden />
              Lexicon Notes
            </div>
            <div className="grid gap-3">
              {(lessonLexicon.length ? lessonLexicon : lexicon.slice(0, 3)).map((entry) => (
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

          <section className="border border-[#dce5d8] bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between gap-3">
              <p className="text-sm font-semibold text-[#405044]">Flashcards</p>
              <button
                onClick={() => setShowAnswer(false)}
                className="inline-flex h-8 w-8 items-center justify-center rounded-sm bg-[#eef5eb] text-[#31553a]"
                aria-label="Reset card"
              >
                <RotateCcw size={15} aria-hidden />
              </button>
            </div>
            <button
              onClick={() => setShowAnswer((value) => !value)}
              className="min-h-[150px] w-full border border-[#cbdac5] bg-[#f8faf7] p-4 text-left"
            >
              <span className="block text-xs font-semibold uppercase text-[#66736a]">
                {showAnswer ? "Definition" : "Term"}
              </span>
              <span className="mt-3 block text-xl font-semibold leading-7">
                {showAnswer ? selectedCard.definition : selectedCard.term}
              </span>
              <span className="mt-3 block text-sm text-[#66736a]">{selectedCard.scripture}</span>
            </button>
            <div className="mt-4 flex items-center justify-between">
              <button
                onClick={() => {
                  setActiveCard((value) => (value - 1 + currentCards.length) % currentCards.length);
                  setShowAnswer(false);
                }}
                className="inline-flex items-center gap-2 rounded-sm border border-[#cbdac5] px-3 py-2 text-sm font-semibold"
              >
                <ChevronLeft size={16} aria-hidden />
                Prev
              </button>
              <span className="text-sm text-[#66736a]">
                {(activeCard % currentCards.length) + 1}/{currentCards.length}
              </span>
              <button
                onClick={() => {
                  setActiveCard((value) => (value + 1) % currentCards.length);
                  setShowAnswer(false);
                }}
                className="inline-flex items-center gap-2 rounded-sm border border-[#cbdac5] px-3 py-2 text-sm font-semibold"
              >
                Next
                <ChevronRight size={16} aria-hidden />
              </button>
            </div>
          </section>
        </aside>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-10 lg:px-8">
        <div className="border border-[#dce5d8] bg-white p-5">
          <h2 className="text-xl font-semibold">Quick Scripture Index</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {quickReferences.map((item) => (
              <button
                key={item}
                onClick={() => lookupBible(item)}
                className="rounded-sm border border-[#d5dfd1] px-3 py-2 text-sm font-semibold text-[#31553a] hover:border-[#2c6d45]"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
