import type {
  CompanyAnalysis,
} from "./types";

export interface PatternResult {

  digitalPresence: number;

  marketingLevel: number;

  automationLevel: number;

  commercialPotential: number;

}

export function detectPatterns(
  analysis: CompanyAnalysis
): PatternResult {

  let digitalPresence = 0;

  if (analysis.website)
    digitalPresence += 25;

  if (analysis.googleBusiness)
    digitalPresence += 20;

  if (analysis.instagram)
    digitalPresence += 15;

  if (analysis.facebook)
    digitalPresence += 10;

  if (analysis.hasSeo)
    digitalPresence += 30;

  let marketingLevel = 0;

  if (analysis.hasGoogleAds)
    marketingLevel += 50;

  if (analysis.hasMetaAds)
    marketingLevel += 50;

  let automationLevel = 0;

  if (analysis.hasAutomation)
    automationLevel = 100;

  const commercialPotential =

    100 -

    Math.round(

      (digitalPresence * 0.40) +

      (marketingLevel * 0.30) +

      (automationLevel * 0.30)

    );

  return {

    digitalPresence,

    marketingLevel,

    automationLevel,

    commercialPotential,

  };

}
