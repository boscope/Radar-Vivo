export function calculatePriority(
  score: number
) {

  if (score >= 90)
    return "Muito Alta";

  if (score >= 75)
    return "Alta";

  if (score >= 55)
    return "Média";

  return "Baixa";

}
