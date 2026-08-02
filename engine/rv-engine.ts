export type CompanyAnalysis = {
  website?: string | null;
  google_rating?: number | null;
  google_reviews?: number | null;
  has_whatsapp?: boolean;
  has_google_business?: boolean;
  has_seo?: boolean;
  has_ads?: boolean;
  has_automation?: boolean;
};

export type RVResult = {
  rvIndex: number;
  radarLevel: string;
  closingProbability: number;
  monthlyLoss: number;
  recommendedService: string;
  diagnosis: string[];
};

export function calculateRV(data: CompanyAnalysis): RVResult {
  let score = 100;

  const diagnosis: string[] = [];

  if (!data.website) {
    score -= 15;
    diagnosis.push("Empresa não possui site.");
  }

  if (!data.has_google_business) {
    score -= 15;
    diagnosis.push("Empresa não possui Google Business otimizado.");
  }

  if (!data.has_seo) {
    score -= 15;
    diagnosis.push("SEO praticamente inexistente.");
  }

  if (!data.has_ads) {
    score -= 10;
    diagnosis.push("Não foram encontrados anúncios ativos.");
  }

  if (!data.has_automation) {
    score -= 10;
    diagnosis.push("Empresa não possui automação de atendimento.");
  }

  if (!data.has_whatsapp) {
    score -= 10;
    diagnosis.push("Empresa não possui WhatsApp comercial.");
  }

  if ((data.google_reviews ?? 0) < 30) {
    score -= 10;
    diagnosis.push("Poucas avaliações no Google.");
  }

  if ((data.google_rating ?? 0) < 4.5) {
    score -= 15;
    diagnosis.push("Nota do Google abaixo do ideal.");
  }

  if (score < 0) score = 0;

  let radarLevel = "Frio";

  if (score >= 90) radarLevel = "Radar Quente";
  else if (score >= 70) radarLevel = "Radar Bom";
  else if (score >= 50) radarLevel = "Radar Médio";

  const closingProbability = Math.min(
    95,
    Math.round(score * 0.95)
  );

  const monthlyLoss = Math.round((100 - score) * 450);

  let recommendedService = "Consultoria";

  if (!data.website) {
    recommendedService = "Novo Site";
  } else if (!data.has_seo) {
    recommendedService = "SEO Local";
  } else if (!data.has_automation) {
    recommendedService = "Automação WhatsApp";
  }

  return {
    rvIndex: score,
    radarLevel,
    closingProbability,
    monthlyLoss,
    recommendedService,
    diagnosis,
  };
}