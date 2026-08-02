import type {
  CompanyAnalysis,
  Diagnosis,
  RadarScore,
} from "./types";

import { buildOpportunities } from "./build-opportunities";

export function buildDiagnosis(
  company: CompanyAnalysis,
  score: RadarScore
): Diagnosis {

  const strengths: string[] = [];

  const weaknesses: string[] = [];

  //--------------------------------------------------
  // Pontos fortes
  //--------------------------------------------------

  if (company.website)
    strengths.push("Possui website profissional.");

  if (company.googleBusiness)
    strengths.push("Está presente no Google Business.");

  if (company.instagram)
    strengths.push("Possui perfil ativo no Instagram.");

  if (company.facebook)
    strengths.push("Possui página no Facebook.");

  if (company.hasSeo)
    strengths.push("Possui estrutura inicial de SEO.");

  if (company.hasWhatsapp)
    strengths.push("Utiliza WhatsApp para atendimento.");

  if (company.hasAutomation)
    strengths.push("Já utiliza algum nível de automação.");

  //--------------------------------------------------
  // Pontos fracos
  //--------------------------------------------------

  if (!company.website)
    weaknesses.push("Não possui website profissional.");

  if (!company.googleBusiness)
    weaknesses.push("Não possui presença otimizada no Google Business.");

  if (!company.hasSeo)
    weaknesses.push("SEO praticamente inexistente.");

  if (!company.hasAutomation)
    weaknesses.push("Não utiliza automação comercial.");

  if (!company.hasGoogleAds)
    weaknesses.push("Não investe em Google Ads.");

  if (!company.hasMetaAds)
    weaknesses.push("Não investe em Meta Ads.");

  if (!company.instagram)
    weaknesses.push("Não possui presença relevante no Instagram.");

  if (!company.facebook)
    weaknesses.push("Não possui página profissional no Facebook.");

  //--------------------------------------------------
  // Resultado
  //--------------------------------------------------

  return {

    strengths,

    weaknesses,

    opportunities: buildOpportunities(company),

  };

}