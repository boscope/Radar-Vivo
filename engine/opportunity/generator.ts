export type Opportunity = {
  priority: "Baixa" | "Média" | "Alta";

  recommendedService: string;

  estimatedMonthlyLoss: number;

  closingProbability: number;

  salesMessage: string;
};

type CompanyData = {
  company_name: string;

  rv_index: number;

  estimated_value: number;

  has_site?: boolean;

  has_seo?: boolean;

  has_automation?: boolean;
};

export function generateOpportunity(
  company: CompanyData
): Opportunity {

  let priority: Opportunity["priority"] = "Baixa";

  if (company.rv_index >= 90) priority = "Alta";
  else if (company.rv_index >= 70) priority = "Média";

  let recommendedService = "Consultoria Digital";

  if (!company.has_site) {
    recommendedService = "Novo Site";
  } else if (!company.has_seo) {
    recommendedService = "SEO Local";
  } else if (!company.has_automation) {
    recommendedService = "Automação WhatsApp";
  }

  const estimatedMonthlyLoss = Math.round(
    company.estimated_value * 2.8
  );

  const closingProbability = Math.min(
    95,
    Math.max(20, company.rv_index)
  );

  const salesMessage =
`Olá!

Analisei gratuitamente a presença digital da empresa ${company.company_name}.

Encontrei algumas oportunidades que podem aumentar sua geração de clientes.

Posso lhe mostrar um relatório completo em poucos minutos.`;

  return {
    priority,
    recommendedService,
    estimatedMonthlyLoss,
    closingProbability,
    salesMessage,
  };
}