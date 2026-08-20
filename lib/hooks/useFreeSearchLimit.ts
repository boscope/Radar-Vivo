"use client";

import { useState, useEffect } from "react";
import { createBrowserClient } from "@supabase/ssr";

const MAX_FREE_SEARCHES = 3;
const STORAGE_KEY = "rv_free_searches";

export function useFreeSearchLimit() {
  const [count, setCount] = useState(0);
  const [blocked, setBlocked] = useState(false);
  const [isLogged, setIsLogged] = useState(false);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      const logged = !!session;
      setIsLogged(logged);

      if (logged) {
        setBlocked(false);
        return;
      }

      const stored = parseInt(localStorage.getItem(STORAGE_KEY) || "0", 10);
      setCount(stored);
      if (stored >= MAX_FREE_SEARCHES) setBlocked(true);
    });
  }, []);

  function incrementAndCheck(): boolean {
    if (isLogged) return false;

    const newCount = count + 1;
    setCount(newCount);
    localStorage.setItem(STORAGE_KEY, String(newCount));
    if (newCount > MAX_FREE_SEARCHES) setBlocked(true);
    return newCount > MAX_FREE_SEARCHES;
  }

  function remaining(): number {
    if (isLogged) return 999;
    return Math.max(0, MAX_FREE_SEARCHES - count);
  }

  return { count, blocked, incrementAndCheck, remaining, MAX_FREE_SEARCHES, isLogged };
}
