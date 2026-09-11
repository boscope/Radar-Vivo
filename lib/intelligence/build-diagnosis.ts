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

  if (company.website && company.hasWebsite !== false)
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
    strengths.push("Encontramos tag/pixel de Google Ads no site.");

  if (company.hasMetaAds)
    strengths.push("Encontramos tag/pixel da Meta (Instagram/Facebook) no site.");

  if (company.hasAutomation)
    strengths.push(`Encontramos indício de automação comercial (${company.automationTool ?? "ferramenta identificada"}).`);

  //--------------------------------------------------
  // Pontos fracos
  //--------------------------------------------------

  if (!company.website)
    weaknesses.push("Não possui website profissional.");

  if (!company.googleBusiness)
    weaknesses.push("Não possui presença otimizada no Google Business.");

  if (!company.hasSeo)
    weaknesses.push("SEO praticamente inexistente.");

  if (company.hasWebsite !== false && company.performanceScore !== undefined) {
    if (company.performanceScore >= 85) {
      strengths.push(`O site carrega rápido no celular (PageSpeed ${company.performanceScore}/100).`);
    } else if (company.performanceScore < 50) {
      weaknesses.push(
        `O site é lento no celular (PageSpeed ${company.performanceScore}/100) — isso afasta clientes e piora o ranking no Google.`
      );
    }
  }

  if (!company.instagram)
    weaknesses.push("Não identificamos perfil no Instagram.");

  if (!company.facebook)
    weaknesses.push("Não identificamos página no Facebook.");

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
