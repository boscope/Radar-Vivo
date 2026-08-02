type RecommendationInput = {
  rvIndex: number;
  hasSite: boolean;
  hasSeo: boolean;
  hasAutomation: boolean;
};

export function generateRecommendation(
  data: RecommendationInput
) {

  const reasons: string[] = [];

  if (!data.hasSite) {
    reasons.push(
      "A empresa não possui um site profissional."
    );
  }

  if (!data.hasSeo) {
    reasons.push(
      "Ela possui baixa presença no Google."
    );
  }

  if (!data.hasAutomation) {
    reasons.push(
      "Não encontramos automação de atendimento."
    );
  }

  if (data.rvIndex >= 85) {
    reasons.push(
      "O Índice RV indica alta probabilidade de fechamento."
    );
  }

  return reasons;
}