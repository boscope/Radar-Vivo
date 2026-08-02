import {
  calculateBuyingProbability,
} from "./engines/buying-probability";

import {
  calculateTimingScore,
} from "./engines/timing-score";

import {
  calculateEstimatedTicket,
} from "./engines/estimated-ticket";

import {
  calculateClosingProbability,
} from "./engines/closing-probability";

import type {
  OpportunityAnalysis,
} from "./contracts/opportunity";

export function analyzeOpportunity(

  radarScore: number

): OpportunityAnalysis {

  const buyingProbability =
    calculateBuyingProbability(
      radarScore
    );

  const timingScore =
    calculateTimingScore(
      radarScore
    );

  const estimatedTicket =
    calculateEstimatedTicket(
      radarScore
    );

  const closingProbability =
    calculateClosingProbability(
      buyingProbability,
      timingScore
    );

  return {

    buyingProbability,

    timingScore,

    estimatedTicket,

    closingProbability,

    rvScore: radarScore,

  };

}
