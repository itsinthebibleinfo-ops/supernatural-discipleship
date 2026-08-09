"use client";

import { useEffect, useState } from "react";

const storageKey = "discipleship-progress";

export function useCourseProgress() {
  const [completed, setCompleted] = useState<string[]>([]);

  useEffect(() => {
    const handle = window.setTimeout(() => {
      const saved = window.localStorage.getItem(storageKey);
      if (saved) setCompleted(JSON.parse(saved));
    }, 0);

    return () => window.clearTimeout(handle);
  }, []);

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(completed));
  }, [completed]);

  function toggleLesson(id: string) {
    setCompleted((items) =>
      items.includes(id) ? items.filter((item) => item !== id) : [...items, id]
    );
  }

  return { completed, toggleLesson };
}

