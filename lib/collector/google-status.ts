let everOk = false;
let lastError: string | null = null;

export function resetGoogleStatus() {
  everOk = false;
  lastError = null;
}

export function googleOk() {
  everOk = true;
}

export function googleFail(reason: string) {
  if (!lastError) lastError = reason;
}

export function getGoogleStatus(): {
  status: "ok" | "partial" | "unavailable";
  reason?: string;
} {
  if (lastError && !everOk) {
    return { status: "unavailable", reason: lastError };
  }
  if (lastError) {
    return { status: "partial", reason: lastError };
  }
  return { status: "ok" };
}