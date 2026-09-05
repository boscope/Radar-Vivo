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

  if (company.hasGoogleAds)
    strengths.push("Encontramos indício de anúncio no Google (tag/pixel de Google Ads no site).");

  if (company.hasMetaAds)
    strengths.push("Encontramos indício de anúncio no Instagram/Facebook (tag/pixel da Meta no site).");

  if (company.hasAutomation)
    strengths.push(`Encontramos indício de automação comercial (${company.automationTool ?? "ferramenta identificada no site"}).`);

  //--------------------------------------------------
  // Pontos fracos
  //--------------------------------------------------

  if (!company.website)
    weaknesses.push("Não possui website profissional.");

  if (!company.googleBusiness)
    weaknesses.push("Não possui presença otimizada no Google Business.");

  if (!company.hasSeo)
    weaknesses.push("SEO praticamente inexistente.");

  if (!company.hasGoogleAds)
    weaknesses.push("Não encontramos indícios de anúncio pago no Google (Google Ads).");

  if (!company.hasMetaAds)
    weaknesses.push("Não encontramos indícios de anúncio pago no Instagram/Facebook (Meta Ads).");

  if (!company.hasAutomation)
    weaknesses.push("Não encontramos indícios de automação comercial no site.");

  if (!company.instagram)
    weaknesses.push("Não possui presença relevante no Instagram.");

  if (!company.facebook)
    weaknesses.push("Não possui página profissional no Facebook.");

  if (!company.hasWhatsapp)
    weaknesses.push("Não utiliza WhatsApp para atendimento.");

  const aiPoints =
    (company.website ? 30 : 0) +
    (company.hasSeo ? 25 : 0) +
    (company.googleBusiness ? 20 : 0);

  if (aiPoints < 30)
    weaknesses.push(
      "Invisível nas IAs — quando alguém pede indicação ao ChatGPT ou Gemini, outra empresa é citada."
    );

  //--------------------------------------------------
  // Resultado
  //--------------------------------------------------

  return {
    strengths,
    weaknesses,
    opportunities: buildOpportunities(company),
  };

}
