export function normalizeInput(
  value: string
): string {

  return value
    .trim()
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .replace(/\/$/, "");

}