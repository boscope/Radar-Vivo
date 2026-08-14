import type {
  CompanyAnalysis,
} from "./types";

export function recommendService(
  analysis: CompanyAnalysis
): string {

  if (!analysis.website)
    return "Criação de Site";

  if (!analysis.hasAutomation)
    return "Automação de WhatsApp";

  if (!analysis.hasSeo)
    return "SEO Local";

  if (!analysis.hasGoogleAds)
    return "Google Ads";

  if (!analysis.hasMetaAds)
    return "Meta Ads";

  return "Consultoria Digital";

}
