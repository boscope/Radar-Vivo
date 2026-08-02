import type {
  CompanyAnalysis,
  CommercialRecommendation,
  Diagnosis,
  RadarScore,
} from "./types";

export function buildCommercial(
  company: CompanyAnalysis,
  score: RadarScore,
  diagnosis: Diagnosis
): CommercialRecommendation {

  const recommendedServices: string[] = [];

  if (!company.website)
    recommendedServices.push("Criação de Website");

  if (!company.hasSeo)
    recommendedServices.push("SEO Local");

  if (!company.hasAutomation)
    recommendedServices.push("Automação de WhatsApp");

  if (!company.hasGoogleAds)
    recommendedServices.push("Google Ads");

  if (!company.hasMetaAds)
    recommendedServices.push("Meta Ads");

  if (!company.googleBusiness)
    recommendedServices.push("Google Business");

  if (!company.instagram)
    recommendedServices.push("Instagram Profissional");

  if (!company.facebook)
    recommendedServices.push("Facebook Business");

  let estimatedTicket = 3000;

  if (recommendedServices.length >= 2)
    estimatedTicket += 2000;

  if (recommendedServices.length >= 4)
    estimatedTicket += 4000;

  if (recommendedServices.length >= 6)
    estimatedTicket += 6000;

  let firstApproach = "";

  if (score.priority === "Muito Alta") {

    firstApproach =
      "Esta empresa apresenta grande potencial de crescimento. A abordagem deve demonstrar rapidamente como aumentar clientes utilizando presença digital e automação.";

  } else if (score.priority === "Alta") {

    firstApproach =
      "A empresa possui boas oportunidades. O foco deve ser apresentar ganhos rápidos.";

  } else if (score.priority === "Média") {

    firstApproach =
      "A empresa já possui alguma estrutura digital. O objetivo é otimizar resultados.";

  } else {

    firstApproach =
      "A empresa apresenta boa maturidade digital. O foco deve ser crescimento e escala.";

  }

  return {

    recommendedServices,

    firstApproach,

    estimatedTicket,

  };

}