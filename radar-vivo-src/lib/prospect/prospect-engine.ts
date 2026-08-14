import {
  analyzeOpportunity,
} from "@/lib/opportunity";

import {
  calculatePriority,
} from "./engines/priority-engine";

import type {
  ProspectAnalysis,
} from "./contracts/prospect";

export function analyzeProspect(

  radarScore: number

): ProspectAnalysis {

  const opportunity =
    analyzeOpportunity(
      radarScore
    );

  return {

    ...opportunity,

    priority:

      calculatePriority(

        opportunity.closingProbability

      ),

  };

}
