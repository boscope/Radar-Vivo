import { ExecutiveReport } from "@/lib/report/types";

import ExecutiveHeader from "./ExecutiveHeader";
import ExecutiveSummarySection from "./ExecutiveSummarySection";
import TechnologySection from "./TechnologySection";
import OpportunitySection from "./OpportunitySection";
import RecommendationSection from "./RecommendationSection";

export default function ExecutiveReportView({

    report,

}:{

    report:ExecutiveReport;

}){

    return(

        <main className="max-w-7xl mx-auto space-y-8">

            <ExecutiveHeader

                report={report}

            />

            <ExecutiveSummarySection

                report={report}

            />

            <TechnologySection

                report={report}

            />

            <OpportunitySection

                report={report}

            />

            <RecommendationSection

                report={report}

            />

        </main>

    );

}
