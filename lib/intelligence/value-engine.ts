import type {
  CompanyAnalysis,
} from "./types";

export function estimateOpportunityValue(
  analysis: CompanyAnalysis
): number {

  let value = 0;

  if (!analysis.website)
    value += 4500;

  if (!analysis.hasSeo)
    value += 2500;

  if (!analysis.hasAutomation)
    value += 3500;

  if (!analysis.hasGoogleAds)
    value += 2000;

  if (!analysis.hasMetaAds)
    value += 1800;

  return value;

}
