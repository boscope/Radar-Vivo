import type {
  CompanyAnalysis,
} from "./types";

export interface RiskResult {

  score: number;

  level:
    | "Baixo"
    | "Médio"
    | "Alto";

}

export function calculateRisk(
  analysis: CompanyAnalysis
): RiskResult {

  let score = 0;

  if (!analysis.website)
    score += 30;

  if (!analysis.hasSeo)
    score += 20;

  if (!analysis.hasAutomation)
    score += 20;

  if (!analysis.hasGoogleAds)
    score += 15;

  if (!analysis.hasMetaAds)
    score += 15;

  let level: RiskResult["level"] =
    "Baixo";

  if (score >= 70)
    level = "Alto";
  else if (score >= 40)
    level = "Médio";

  return {

    score,

    level,

  };

}
