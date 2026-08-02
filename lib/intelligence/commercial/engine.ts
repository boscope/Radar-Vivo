import type { OpportunityScore } from "../opportunity";

import type { CommercialAnalysis } from "./contracts";

export function generateCommercialAnalysis(
  opportunity: OpportunityScore
): CommercialAnalysis {

  const services: string[] = [];
  const argumentsList: string[] = [];

  if (
    opportunity.negatives.some(x =>
      x.toLowerCase().includes("analytics")
    )
  ) {
    services.push("Google Analytics");
    services.push("Google Tag Manager");

    argumentsList.push(
      "A empresa não mede seus visitantes e perde informações importantes para vender mais."
    );
  }

  if (
    opportunity.negatives.some(x =>
      x.toLowerCase().includes("marketing")
    )
  ) {
    services.push("Automação de Marketing");

    argumentsList.push(
      "Não foram encontradas ferramentas modernas de marketing."
    );
  }

  if (
    opportunity.technologies.cms.length
  ) {
    services.push("SEO");
    services.push("Landing Page");
  }

  const probability = Math.min(
    98,
    opportunity.score + 5
  );

  const potential =
    probability >= 80
      ? "Alto"
      : probability >= 50
      ? "Médio"
      : "Baixo";

  const priority =
    probability >= 80
      ? "Alta"
      : probability >= 50
      ? "Média"
      : "Baixa";

  return {
    probability,

    potential,

    priority,

    recommendedServices:
      [...new Set(services)],

    arguments:
      [...new Set(argumentsList)],

    nextAction:
      probability >= 80
        ? "Entrar em contato imediatamente."
        : probability >= 50
        ? "Prospectar ainda esta semana."
        : "Adicionar ao acompanhamento."
  };
}
