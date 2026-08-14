import type {
  CompanyAnalysis,
  RadarScore,
} from "./types";

function detectGaps(company: CompanyAnalysis) {
  return {
    website: !company.website,
    seo: !company.hasSeo,
    whatsapp: !company.hasWhatsapp,
    googleBusiness: !company.googleBusiness,
    instagram: !company.instagram,
    facebook: !company.facebook,
    automation: !company.hasAutomation,
    googleAds: !company.hasGoogleAds,
    metaAds: !company.hasMetaAds,
  };
}

export function buildScore(
  company: CompanyAnalysis
): RadarScore {

  const gaps = detectGaps(company);

  //--------------------------------------------------
  // Presença Digital
  //--------------------------------------------------

  let score = 100;

  if (gaps.website)
    score -= 20;

  if (gaps.googleBusiness)
    score -= 15;

  if (gaps.instagram)
    score -= 8;

  if (gaps.facebook)
    score -= 5;

  //--------------------------------------------------
  // Marketing
  //--------------------------------------------------

  if (gaps.seo)
    score -= 15;

  if (gaps.googleAds)
    score -= 10;

  if (gaps.metaAds)
    score -= 8;

  //--------------------------------------------------
  // Atendimento
  //--------------------------------------------------

  if (gaps.whatsapp)
    score -= 5;

  if (gaps.automation)
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
  // Chance de Fechamento (estimativa baseada nos
  // sinais reais detectados - nunca um número fixo)
  //--------------------------------------------------

  const sinaisFavoraveis =
    Number(gaps.website) +
    Number(gaps.seo) +
    Number(gaps.whatsapp) +
    Number(gaps.googleBusiness) +
    Number(gaps.instagram) +
    Number(gaps.facebook);

  const closingProbability = Math.min(
    85,
    Math.round(25 + sinaisFavoraveis * 10)
  );

  //--------------------------------------------------
  // Potencial Mensal (estimativa por item faltante -
  // pior cenário informado ao cliente como "potencial")
  //--------------------------------------------------

  const itensFaltantes =
    Number(gaps.website) +
    Number(gaps.seo) +
    Number(gaps.whatsapp) +
    Number(gaps.automation) +
    Number(gaps.googleAds) +
    Number(gaps.metaAds) +
    Number(gaps.googleBusiness) +
    Number(gaps.instagram) +
    Number(gaps.facebook);

  const estimatedRevenue =
    itensFaltantes * 300;

  return {

    score,

    priority,

    closingProbability,

    estimatedRevenue,

  };

}
