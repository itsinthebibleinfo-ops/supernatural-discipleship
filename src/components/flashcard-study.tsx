"use client";

import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";
import { useState } from "react";
import { flashcards, type CourseLevel } from "@/lib/course-data";

const levels: CourseLevel[] = ["Basic", "Immediate", "Advanced"];

export function FlashcardStudy() {
  const [activeLevel, setActiveLevel] = useState<CourseLevel>("Basic");
  const [activeCard, setActiveCard] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const currentCards = flashcards.filter((card) => card.level === activeLevel);
  const selectedCard = currentCards[activeCard % currentCards.length];

  function chooseLevel(level: CourseLevel) {
    setActiveLevel(level);
    setActiveCard(0);
    setShowAnswer(false);
  }

  return (
    <div className="mx-auto max-w-5xl px-5 py-8 lg:px-8">
      <section className="border border-[#dce5d8] bg-white p-5 shadow-sm sm:p-7">
        <p className="text-sm font-semibold text-[#31553a]">Review mode</p>
        <h1 className="mt-3 text-3xl font-semibold">Flashcards</h1>
        <p className="mt-3 max-w-2xl leading-7 text-[#536157]">
          Flip each card, review the Scripture anchor, then move through the track at your pace.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {levels.map((level) => (
            <button
              key={level}
              onClick={() => chooseLevel(level)}
              className={`rounded-sm border px-4 py-4 text-left transition ${
                activeLevel === level
                  ? "border-[#1f4f35] bg-[#1f4f35] text-white"
                  : "border-[#d5dfd1] bg-white text-[#223027] hover:border-[#91ad86]"
              }`}
            >
              <span className="block text-sm font-semibold">{level}</span>
              <span className="mt-1 block text-xs opacity-80">
                {flashcards.filter((card) => card.level === level).length} cards
              </span>
            </button>
          ))}
        </div>

        <button
          onClick={() => setShowAnswer((value) => !value)}
          className="mt-6 min-h-[260px] w-full border border-[#cbdac5] bg-[#f8faf7] p-6 text-left"
        >
          <span className="block text-xs font-semibold uppercase text-[#66736a]">
            {showAnswer ? "Definition" : "Term"}
          </span>
          <span className="mt-5 block text-3xl font-semibold leading-tight">
            {showAnswer ? selectedCard.definition : selectedCard.term}
          </span>
          <span className="mt-5 block text-sm font-semibold text-[#31553a]">{selectedCard.scripture}</span>
        </button>

        <div className="mt-5 flex items-center justify-between">
          <button
            onClick={() => {
              setActiveCard((value) => (value - 1 + currentCards.length) % currentCards.length);
              setShowAnswer(false);
            }}
            className="inline-flex items-center gap-2 rounded-sm border border-[#cbdac5] px-4 py-3 text-sm font-semibold"
          >
            <ChevronLeft size={16} aria-hidden />
            Prev
          </button>
          <button
            onClick={() => setShowAnswer(false)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-sm bg-[#eef5eb] text-[#31553a]"
            aria-label="Reset card"
          >
            <RotateCcw size={16} aria-hidden />
          </button>
          <button
            onClick={() => {
              setActiveCard((value) => (value + 1) % currentCards.length);
              setShowAnswer(false);
            }}
            className="inline-flex items-center gap-2 rounded-sm border border-[#cbdac5] px-4 py-3 text-sm font-semibold"
          >
            Next
            <ChevronRight size={16} aria-hidden />
          </button>
        </div>
      </section>
    </div>
  );
}
