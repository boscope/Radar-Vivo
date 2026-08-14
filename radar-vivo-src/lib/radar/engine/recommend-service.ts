export function recommendService(
  rvIndex: number
): string {

  if (rvIndex >= 95) {
    return "Pacote Completo";
  }

  if (rvIndex >= 90) {
    return "Novo Site";
  }

  if (rvIndex >= 80) {
    return "SEO Local";
  }

  if (rvIndex >= 70) {
    return "Automação WhatsApp";
  }

  if (rvIndex >= 60) {
    return "Google Meu Negócio";
  }

  return "Consultoria Digital";

}
