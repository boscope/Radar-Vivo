import type {
  ProspectAnalysis,
} from "@/lib/prospect";

import type {
  ExecutiveReport,
} from "./contracts/report";

export function buildExecutiveReport(

  companyName: string,

  analysis: ProspectAnalysis

): ExecutiveReport {

  return {

    companyName,

    rvScore:
      analysis.rvScore,

    buyingProbability:
      analysis.buyingProbability,

    closingProbability:
      analysis.closingProbability,

    estimatedTicket:
      analysis.estimatedTicket,

    priority:
      analysis.priority,

  };

}
