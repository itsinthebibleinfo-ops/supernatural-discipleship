"use client";

import { BookOpen, Library, Search } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import { lexicon, quickReferences } from "@/lib/course-data";

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

export function BibleStudy() {
  const searchParams = useSearchParams();
  const initialReference = searchParams.get("reference") ?? "2 Corinthians 5:17";
  const [reference, setReference] = useState(initialReference);
  const [bibleResult, setBibleResult] = useState<BibleResult | null>(initialBibleResult);
  const [bibleError, setBibleError] = useState("");
  const [loadingBible, setLoadingBible] = useState(false);
  const [termSearch, setTermSearch] = useState("");

  const filteredLexicon = useMemo(() => {
    const query = termSearch.trim().toLowerCase();
    if (!query) return lexicon;
    return lexicon.filter((entry) =>
      `${entry.term} ${entry.strongs} ${entry.transliteration} ${entry.shortDefinition}`
        .toLowerCase()
        .includes(query)
    );
  }, [termSearch]);

  const lookupBible = useCallback(async (nextReference = reference) => {
    setLoadingBible(true);
    setBibleError("");

    try {
      const response = await fetch(`/api/bible?reference=${encodeURIComponent(nextReference)}`);
      const payload = await response.json();

      if (!response.ok) throw new Error(payload.error ?? "Unable to load passage.");

      setBibleResult(payload);
      setReference(nextReference);
    } catch (error) {
      setBibleError(error instanceof Error ? error.message : "Unable to load passage.");
      setBibleResult(null);
    } finally {
      setLoadingBible(false);
    }
  }, [reference]);

  useEffect(() => {
    const handle = window.setTimeout(() => {
      if (initialReference !== initialBibleResult.reference) {
        lookupBible(initialReference);
      }
    }, 0);

    return () => window.clearTimeout(handle);
  }, [initialReference, lookupBible]);

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    lookupBible(reference);
  }

  return (
    <div className="mx-auto grid max-w-7xl gap-6 px-5 py-8 lg:grid-cols-[1fr_380px] lg:px-8">
      <section className="min-w-0 border border-[#dce5d8] bg-white p-5 shadow-sm sm:p-7">
        <div className="mb-5 flex items-center gap-2">
          <BookOpen size={19} className="text-[#2c6d45]" aria-hidden />
          <h1 className="text-3xl font-semibold">KJV Bible Study</h1>
        </div>
        <form className="flex gap-2" onSubmit={onSubmit}>
          <input
            value={reference}
            onChange={(event) => setReference(event.target.value)}
            className="min-w-0 flex-1 border border-[#cbdac5] px-3 py-3 text-base outline-none focus:border-[#2c6d45]"
            placeholder="John 3:16"
          />
          <button
            type="submit"
            className="inline-flex h-12 w-12 items-center justify-center rounded-sm bg-[#1f4f35] text-white hover:bg-[#2b6d47]"
            aria-label="Search KJV"
          >
            <Search size={18} aria-hidden />
          </button>
        </form>

        <div className="mt-4 flex flex-wrap gap-2">
          {quickReferences.slice(0, 18).map((item) => (
            <button
              key={item}
              onClick={() => lookupBible(item)}
              className="rounded-sm border border-[#d5dfd1] px-3 py-2 text-sm font-semibold text-[#31553a] hover:border-[#2c6d45]"
            >
              {item}
            </button>
          ))}
        </div>

        <div className="mt-6 min-h-[320px] border border-[#e3eadf] bg-[#fbfdf9] p-5">
          {loadingBible && <p className="text-sm text-[#66736a]">Loading KJV passage...</p>}
          {bibleError && <p className="text-sm font-semibold text-[#8a302b]">{bibleError}</p>}
          {bibleResult && !loadingBible && (
            <div>
              <p className="text-sm font-semibold text-[#1f4f35]">
                {bibleResult.reference} · {bibleResult.translation}
              </p>
              <div className="mt-4 grid gap-3 text-lg leading-9 text-[#35423a]">
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

      <aside className="h-fit min-w-0 border border-[#dce5d8] bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center gap-2">
          <Library size={18} className="text-[#2c6d45]" aria-hidden />
          <h2 className="text-xl font-semibold">Lexicon</h2>
        </div>
        <input
          value={termSearch}
          onChange={(event) => setTermSearch(event.target.value)}
          className="mb-4 w-full border border-[#cbdac5] px-3 py-2 text-sm outline-none focus:border-[#2c6d45]"
          placeholder="Search term or Strong's"
        />
        <div className="grid gap-3">
          {filteredLexicon.map((entry) => (
            <details key={entry.term} className="border border-[#e3eadf] bg-[#fbfdf9] p-3">
              <summary className="cursor-pointer text-sm font-semibold">
                {entry.term} <span className="text-[#66736a]">({entry.strongs})</span>
              </summary>
              <p className="mt-2 text-sm leading-6 text-[#35423a]">
                {entry.transliteration}: {entry.shortDefinition}
              </p>
              <p className="mt-2 text-xs leading-5 text-[#66736a]">{entry.studyNote}</p>
              <p className="mt-2 text-xs font-semibold text-[#31553a]">{entry.scriptures.join(", ")}</p>
            </details>
          ))}
        </div>
      </aside>
    </div>
  );
}
