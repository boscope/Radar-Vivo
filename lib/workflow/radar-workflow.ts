import {
  collectCompanyData,
} from "@/lib/collector";

import {
  analyzeProspect,
} from "@/lib/prospect";

import {
  buildExecutiveReport,
} from "@/lib/report";

import {
  buildCommercialAnalysis,
} from "@/lib/ai";

export async function runRadarWorkflow(

  company: string

) {

  const collected =

    await collectCompanyData(

      company

    );

  const analysis =

    analyzeProspect(

      collected.intelligence.score.score

    );

  const report =

    buildExecutiveReport(

      company,

      analysis

    );

  const ai =

    buildCommercialAnalysis(

      company

    );

  return {

    collected,

    analysis,

    report,

    ai,

  };

}
