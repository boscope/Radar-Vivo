export type InputType = "cnpj" | "maps" | "site" | "nome";

const CNPJ_RE = /^(\d{2}\.?\d{3}\.?\d{3}\/?\d{4}-?\d{2})$/;
const URL_RE = /^(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,}(\/\S*)?$/i;

export function parseInput(input: string): { type: InputType; value: string } {
  const trimmed = input.trim();

  if (CNPJ_RE.test(trimmed)) {
    return { type: "cnpj", value: trimmed.replace(/\D/g, "") };
  }

  if (trimmed.includes("google.com/maps") || trimmed.includes("maps.app.goo.gl") || trimmed.includes("goo.gl/maps")) {
    return { type: "maps", value: trimmed };
  }

  if (URL_RE.test(trimmed)) {
    return { type: "site", value: trimmed.startsWith("http") ? trimmed : `https://${trimmed}` };
  }

  return { type: "nome", value: trimmed };
}
