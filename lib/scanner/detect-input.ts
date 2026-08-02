import { normalizeInput } from "./normalize-input";
import type { ScannerInput } from "./types";

export function detectInput(
  value: string
): ScannerInput {

  const normalized = normalizeInput(value);

  const digits = normalized.replace(/\D/g, "");

  if (digits.length === 14) {
    return {
      original: value,
      normalized: digits,
      type: "cnpj",
    };
  }

  if (
    normalized.includes("google.") ||
    normalized.includes("maps")
  ) {
    return {
      original: value,
      normalized,
      type: "google-maps",
    };
  }

  if (
    normalized.includes(".com") ||
    normalized.includes(".com.br") ||
    normalized.includes(".net") ||
    normalized.includes(".org")
  ) {
    return {
      original: value,
      normalized,
      type: "website",
    };
  }

  return {
    original: value,
    normalized,
    type: "company",
  };
}