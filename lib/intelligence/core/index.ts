import { analyzeTechnologies } from "../technology";
import { calculateOpportunityScore } from "../opportunity";
import { generateCommercialAnalysis } from "../commercial";

export async function analyzeBusinessWebsite(url: string) {

  const technologies =
    await analyzeTechnologies(url);

  const opportunity =
    calculateOpportunityScore(
      technologies
    );

  const commercial =
    generateCommercialAnalysis(
      opportunity
    );

  return {

    technologies,

    opportunity,

    commercial,

  };

}
