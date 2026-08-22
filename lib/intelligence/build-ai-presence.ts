import type { CompanyAnalysis } from "./types";

export type AiPresence = {
  /** Probabilidade de aparecer em respostas de IAs (0-100) */
  visibilityScore: number;
  status: "visivel" | "parcial" | "invisivel";
  summary: string;
  detail: string;
};

/**
 * IAs (ChatGPT, Gemini, Perplexity) recomendam negócios locais com base
 * em sinais públicos indexados: site estruturado, SEO, perfil Google,
 * citações consistentes. Esta heurística estima a visibilidade da empresa
 * nessas respostas sem chamadas externas.
 */
export function buildAiPresence(
  company: CompanyAnalysis
): AiPresence {

  let points = 0;

  if (company.website) points += 30;
  if (company.hasSeo) points += 25;
  if (company.googleBusiness) points += 20;
  if (company.instagram) points += 10;
  if (company.facebook) points += 5;
  if (company.hasGoogleAds) points += 5;
  if (company.hasMetaAds) points += 5;

  const visibilityScore = Math.min(100, points);

  let status: AiPresence["status"];
  let summary: string;
  let detail: string;

  if (visibilityScore >= 60) {
    status = "visivel";
    summary = "Presença forte — provavelmente aparece nas recomendações de IAs.";
    detail =
      "Com site otimizado, Google e redes ativas, assistentes como ChatGPT e Gemini conseguem encontrar e recomendar esta empresa quando clientes pedem indicações.";
  } else if (visibilityScore >= 30) {
    status = "parcial";
    summary = "Presença parcial — aparece em algumas buscas, mas não é prioridade nas indicações.";
    detail =
      "A empresa tem alguns sinais digitais, mas faltam pilares (site estruturado, SEO local ou perfil completo no Google) para as IAs confiarem nela como recomendação principal. Concorrentes com presença mais completa são citados antes.";
  } else {
    status = "invisivel";
    summary = "Invisível para as IAs — quando pedem uma indicação, outra empresa é citada.";
    detail =
      "Sem os sinais que IAs usam para recomendar negócios locais (site, SEO, Google), assistentes como ChatGPT, Gemini e Perplexity não têm de onde puxar esta empresa. Cada indicação perdida vira cliente do concorrente.";
  }

  return {
    visibilityScore,
    status,
    summary,
    detail,
  };
}
