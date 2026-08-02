import type { TechnologyResult } from "../technology/contracts";
import type { OpportunityScore } from "./contracts";

export function calculateOpportunityScore(
  tech: TechnologyResult
): OpportunityScore {

  let score = 0;

  const positives: string[] = [];
  const negatives: string[] = [];

  if (tech.frameworks.length) {
    score += 20;
    positives.push("Framework moderno");
  } else {
    negatives.push("Framework não identificado");
  }

  if (tech.analytics.length) {
    score += 15;
    positives.push("Analytics instalado");
  } else {
    negatives.push("Sem Analytics");
  }

  if (tech.marketing.length) {
    score += 15;
    positives.push("Ferramentas de marketing");
  } else {
    negatives.push("Sem automação de marketing");
  }

  if (tech.chats.length) {
    score += 10;
    positives.push("Chat online");
  }

  if (tech.ecommerce.length) {
    score += 15;
    positives.push("Possui e-commerce");
  }

  if (tech.cms.length) {
    score += 10;
  }

  if (tech.libraries.length) {
    score += 5;
  }

  if (tech.infrastructure.length) {
    score += 10;
  }

  if (score > 100) score = 100;

  const level =
    score >= 70
      ? "Alto"
      : score >= 40
      ? "Médio"
      : "Baixo";

  return {
    score,
    level,
    positives,
    negatives,
    technologies: tech,
  };
}
