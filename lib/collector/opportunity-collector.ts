import { analyzeTechnologies } from "@/lib/intelligence/technology";
import { calculateOpportunityScore } from "@/lib/intelligence/opportunity";

export async function collectOpportunity(url: string) {
  const technologies = await analyzeTechnologies(url);

  const opportunity = calculateOpportunityScore(
    technologies
  );

  return opportunity;
}
