import type {
  CompanyAnalysis,
} from "./types";

export interface LearningResult {

  confidence: number;

  recommendationWeight: number;

  futurePotential: number;

}

export function learningEngine(
  analysis: CompanyAnalysis
): LearningResult {

  let confidence = 50;

  if (analysis.website)
    confidence += 5;

  if (analysis.googleBusiness)
    confidence += 10;

  if (analysis.hasSeo)
    confidence += 10;

  if (analysis.hasGoogleAds)
    confidence += 10;

  if (analysis.hasMetaAds)
    confidence += 5;

  if (analysis.hasAutomation)
    confidence += 10;

  const recommendationWeight =
    Math.min(100, confidence);

  const futurePotential =
    Math.max(0, 100 - confidence);

  return {

    confidence,

    recommendationWeight,

    futurePotential,

  };

}
