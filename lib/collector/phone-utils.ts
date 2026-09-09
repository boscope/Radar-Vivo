export function isMobilePhoneNumber(raw?: string | null): boolean {
  if (!raw) return false;

  let digits = raw.replace(/\D/g, "").replace(/^0+/, "");

  if (digits.length >= 12 && digits.startsWith("55")) {
    digits = digits.slice(2);
  }

  if (digits.length === 11) return digits[2] === "9";
  if (digits.length === 10) return digits[2] === "9";
  if (digits.length === 9) return digits[0] === "9";
  if (digits.length === 8) return digits[0] === "9";

  return false;
}