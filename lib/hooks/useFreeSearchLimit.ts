"use client";

import { useState, useEffect } from "react";

const MAX_FREE_SEARCHES = 2;
const STORAGE_KEY = "rv_free_searches";

export function useFreeSearchLimit() {
  const [count, setCount] = useState(0);
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    const stored = parseInt(localStorage.getItem(STORAGE_KEY) || "0", 10);
    setCount(stored);
    if (stored >= MAX_FREE_SEARCHES) setBlocked(true);
  }, []);

  function incrementAndCheck(): boolean {
    const newCount = count + 1;
    setCount(newCount);
    localStorage.setItem(STORAGE_KEY, String(newCount));
    if (newCount >= MAX_FREE_SEARCHES) setBlocked(true);
    return newCount >= MAX_FREE_SEARCHES;
  }

  function remaining(): number {
    return Math.max(0, MAX_FREE_SEARCHES - count);
  }

  return { count, blocked, incrementAndCheck, remaining, MAX_FREE_SEARCHES };
}
