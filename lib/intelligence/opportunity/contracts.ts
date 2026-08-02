import type { TechnologyResult } from "../technology/contracts";

export interface OpportunityScore {
  score: number;
  level: "Baixo" | "Médio" | "Alto";
  positives: string[];
  negatives: string[];
  technologies: TechnologyResult;
}
