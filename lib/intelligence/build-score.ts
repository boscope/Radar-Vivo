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
    googleAds: !company.hasGoogleAds,
    metaAds: !company.hasMetaAds,
    automation: !company.hasAutomation,
  };
}

export function buildScore(
  company: CompanyAnalysis
): RadarScore {

  const gaps = detectGaps(company);

  //--------------------------------------------------
  // Presença Digital (45 pontos)
  //--------------------------------------------------

  let score = 100;

  if (gaps.website)
    score -= 20;

  if (gaps.googleBusiness)
    score -= 15;

  if (gaps.instagram)
    score -= 5;

  if (gaps.facebook)
    score -= 5;

  //--------------------------------------------------
  // Marketing (30 pontos)
  //--------------------------------------------------

  if (gaps.seo)
    score -= 15;

  if (gaps.googleAds)
    score -= 8;

  if (gaps.metaAds)
    score -= 7;

  //--------------------------------------------------
  // Atendimento e Automação (25 pontos)
  //--------------------------------------------------

  if (gaps.whatsapp)
    score -= 5;

  if (gaps.automation)
    score -= 10;

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
  // Chance de Fechamento
  //--------------------------------------------------

  const sinaisFavoraveis =
    Number(gaps.website) +
    Number(gaps.seo) +
    Number(gaps.whatsapp) +
    Number(gaps.googleBusiness) +
    Number(gaps.instagram) +
    Number(gaps.facebook) +
    Number(gaps.googleAds) +
    Number(gaps.metaAds) +
    Number(gaps.automation);

  const closingProbability = Math.min(
    85,
    Math.round(20 + sinaisFavoraveis * 7)
  );

  //--------------------------------------------------
  // Potencial Mensal
  //--------------------------------------------------

  const categoryRevenueMap: Record<string, number> = {
    "Dentista": 2800,
    "Consultório Médico": 2500,
    "Clínica": 2200,
    "Barbearia": 1500,
    "Salão de Beleza": 1800,
    "Restaurante": 2000,
    "Padaria": 1200,
    "Farmácia": 1500,
    "Academia": 1900,
    "Oficina": 2300,
    "Loja": 1600,
    "Supermercado": 1800,
    "Escola": 2000,
    "Hotel": 3500,
    "Imobiliária": 3000,
    "Escritório de Advocacia": 2800,
    "Contabilidade": 2200,
    "Estúdio": 1700,
    "Pet Shop": 1400,
    "Floricultura": 1100,
  };

  const baseRevenue = categoryRevenueMap[company.category ?? ""] || 1800;

  const itensFaltantes =
    Number(gaps.website) +
    Number(gaps.seo) +
    Number(gaps.whatsapp) +
    Number(gaps.googleBusiness) +
    Number(gaps.instagram) +
    Number(gaps.facebook) +
    Number(gaps.googleAds) +
    Number(gaps.metaAds) +
    Number(gaps.automation);

  const estimatedRevenue =
    Math.round((baseRevenue * itensFaltantes) / 9 / 100) * 100;

  return {
    score,
    priority,
    closingProbability,
    estimatedRevenue,
  };

}
