import { calculateRadarScoreV2 } from "./scoring/radar-score-v2";

export interface IntelligenceResult {
  company: string;
  score: number;
  opportunityLevel: "ALTA" | "MEDIA" | "BAIXA";
  recommendations: string[];
  details: {
    digitalPresence: number;
    commercialPresence: number;
    authority: number;
    opportunity: number;
  };
}

export function analyzeCompany(company: any): IntelligenceResult {

  const radar = calculateRadarScoreV2(company);

  let opportunityLevel: "ALTA" | "MEDIA" | "BAIXA";

  if (radar.finalScore >= 85)
    opportunityLevel = "ALTA";
  else if (radar.finalScore >= 60)
    opportunityLevel = "MEDIA";
  else
    opportunityLevel = "BAIXA";

  return {

    company: company.name,

    score: radar.finalScore,

    opportunityLevel,

    recommendations: radar.recommendations,

    details: {

      digitalPresence: radar.digitalPresence,

      commercialPresence: radar.commercialPresence,

      authority: radar.authority,

      opportunity: radar.opportunity

    }

  };

}
