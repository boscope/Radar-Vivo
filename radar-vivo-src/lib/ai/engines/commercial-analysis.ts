import type {
  AICommercialAnalysis,
} from "../contracts/analysis";

export function buildCommercialAnalysis(

  company: string

): AICommercialAnalysis {

  return {

    summary:
      `${company} possui potencial comercial.`,

    strengths: [],

    weaknesses: [],

    opportunities: [],

    recommendedServices: [],

  };

}
