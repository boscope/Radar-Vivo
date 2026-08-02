import {
  analyzeProspect,
} from "@/lib/prospect";

import type {
  PipelineCompany,
} from "../contracts/pipeline";

export function processPipeline(

  companies: PipelineCompany[]

) {

  return companies.map(

    company => ({

      ...company,

      analysis:

        analyzeProspect(

          company.rvScore

        ),

    })

  );

}
