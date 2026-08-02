import { generateOpportunity } from "@/engine/opportunity/generator";

export type ScannerResult = {
  company: string;
  rvIndex: number;
  closingProbability: number;
  monthlyLoss: number;
  recommendedService: string;
  priority: string;
  diagnosis: string[];
  salesMessage: string;
};

export async function analyzeCompany(
  companyName: string
): Promise<ScannerResult> {

  /*
    Nesta primeira versão usamos dados simulados.

    Nas próximas versões este método irá consultar
    Google Maps
    Site
    Instagram
    Facebook
    Google Business
    SEO
    e outras fontes públicas.
  */

  const fakeCompany = {
    company_name: companyName,

    rv_index: 87,

    estimated_value: 6800,

    has_site: false,

    has_seo: false,

    has_automation: false,
  };

  const opportunity = generateOpportunity(fakeCompany);

  return {

    company: companyName,

    rvIndex: fakeCompany.rv_index,

    closingProbability:
      opportunity.closingProbability,

    monthlyLoss:
      opportunity.estimatedMonthlyLoss,

    recommendedService:
      opportunity.recommendedService,

    priority:
      opportunity.priority,

    diagnosis: [

      "Site desatualizado.",

      "SEO Local muito fraco.",

      "Poucas avaliações no Google.",

      "Não encontramos automação de WhatsApp.",

    ],

    salesMessage:
      opportunity.salesMessage,

  };
}