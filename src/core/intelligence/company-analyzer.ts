import { CompanyEntity } from "@/src/core/database/interfaces/company-repository-interface";

export type Opportunity = {
  company: string;
  priority: "ALTA" | "MEDIA" | "BAIXA";
  probability: number;
  reason: string;
  nextAction: string;
};

export function analyzeCompany(company: CompanyEntity): Opportunity {

  let probability = 50;

  if (company.website) probability += 10;
  if (company.phone) probability += 10;

  const rating =
    typeof company.rating === "number"
      ? company.rating
      : 0;

  if (rating >= 4.7) probability += 20;
  else if (rating >= 4.0) probability += 10;
  else probability -= 10;

  probability = Math.max(0, Math.min(100, probability));

  let priority: "ALTA" | "MEDIA" | "BAIXA";

  if (probability >= 80)
    priority = "ALTA";
  else if (probability >= 60)
    priority = "MEDIA";
  else
    priority = "BAIXA";

  return {
    company: company.name,
    priority,
    probability,
    reason:
      priority === "ALTA"
        ? "Empresa com alto potencial comercial"
        : priority === "MEDIA"
        ? "Empresa com potencial moderado"
        : "Empresa em monitoramento",
    nextAction:
      priority === "ALTA"
        ? "Entrar em contato imediatamente"
        : priority === "MEDIA"
        ? "Agendar prospecção"
        : "Continuar acompanhando"
  };
}
