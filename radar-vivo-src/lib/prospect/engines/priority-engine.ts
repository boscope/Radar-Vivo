export function calculatePriority(

  probability: number

):

  | "Muito Alta"
  | "Alta"
  | "Média"
  | "Baixa" {

  if (probability >= 85)
    return "Muito Alta";

  if (probability >= 70)
    return "Alta";

  if (probability >= 50)
    return "Média";

  return "Baixa";

}
