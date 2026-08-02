import type {
  CompanyAnalysis,
  RadarScore,
} from "./types";

export function buildScore(
  company: CompanyAnalysis
): RadarScore {

  let score = 100;

  //--------------------------------------------------
  // Presença Digital
  //--------------------------------------------------

  if (!company.website)
    score -= 20;

  if (!company.googleBusiness)
    score -= 15;

  if (!company.instagram)
    score -= 8;

  if (!company.facebook)
    score -= 5;

  //--------------------------------------------------
  // Marketing
  //--------------------------------------------------

  if (!company.hasSeo)
    score -= 15;

  if (!company.hasGoogleAds)
    score -= 10;

  if (!company.hasMetaAds)
    score -= 8;

  //--------------------------------------------------
  // Atendimento
  //--------------------------------------------------

  if (!company.hasWhatsapp)
    score -= 5;

  if (!company.hasAutomation)
    score -= 14;

  //--------------------------------------------------
  // Limites
  //--------------------------------------------------

  score = Math.max(0, Math.min(100, score));

  //--------------------------------------------------
  // Prioridade
  //--------------------------------------------------

  let priority: RadarScore["priority"];

  if (score <= 30) {

    priority = "Muito Alta";

  } else if (score <= 50) {

    priority = "Alta";

  } else if (score <= 75) {

    priority = "Média";

  } else {

    priority = "Baixa";

  }

  //--------------------------------------------------
  // Potencial Financeiro
  //--------------------------------------------------

  const estimatedRevenue =
    (100 - score) * 400;

  return {

    score,

    priority,

    estimatedRevenue,

  };

}