export type StoredEvent = {
  event: string;
  page: string;
  timestamp: number;
  utms: Record<string, string>;
};

type AnalyticsSummary = {
  totalEvents: number;
  eventCounts: Record<string, number>;
};

const EVENTS_KEY = "radar_vivo_events";
const UTMS_KEY = "radar_vivo_utms";
const MAX_EVENTS = 500;

const UTM_PARAMS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
];

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "";

function gtag(...args: unknown[]): void {
  if (!isBrowser() || !GA_ID) return;
  window.dataLayer = window.dataLayer || [];
  window.gtag?.(...args);
}

export function captureUTMs(): void {
  if (!isBrowser()) return;
  const params = new URLSearchParams(window.location.search);
  const utms: Record<string, string> = {};
  for (const key of UTM_PARAMS) {
    const value = params.get(key);
    if (value) utms[key] = value;
  }
  if (Object.keys(utms).length === 0) return;
  try {
    localStorage.setItem(UTMS_KEY, JSON.stringify(utms));
  } catch {
    return;
  }
}

export function getStoredUTMs(): Record<string, string> {
  if (!isBrowser()) return {};
  try {
    const raw = localStorage.getItem(UTMS_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as Record<string, string>;
  } catch {
    return {};
  }
}

export function trackEvent(
  eventName: string,
  properties?: Record<string, string>
): void {
  if (!isBrowser()) return;

  // Espelha eventos para o Google Analytics 4
  gtag("event", eventName, {
    page_path: window.location.pathname,
    ...getStoredUTMs(),
    ...(properties || {}),
  });

  const entry: StoredEvent & { properties?: Record<string, string> } = {
    event: eventName,
    page: window.location.pathname,
    timestamp: Date.now(),
    utms: getStoredUTMs(),
    ...(properties ? { properties } : {}),
  };
  try {
    const events = getEvents();
    events.push(entry);
    const trimmed = events.slice(-MAX_EVENTS);
    localStorage.setItem(EVENTS_KEY, JSON.stringify(trimmed));
  } catch {
    return;
  }
}

export function trackPageView(page: string): void {
  trackEvent("page_view", { path: page });
}

function getEvents(): StoredEvent[] {
  try {
    const raw = localStorage.getItem(EVENTS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as StoredEvent[]) : [];
  } catch {
    return [];
  }
}

export function getAnalyticsSummary(): AnalyticsSummary {
  const events = getEvents();
  const eventCounts: Record<string, number> = {};
  for (const e of events) {
    eventCounts[e.event] = (eventCounts[e.event] ?? 0) + 1;
  }
  return {
    totalEvents: events.length,
    eventCounts,
  };
}
