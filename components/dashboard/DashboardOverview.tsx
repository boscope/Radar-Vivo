import ExecutiveSummary from "./ExecutiveSummary";
import OpportunityMeter from "./OpportunityMeter";
import CommercialPanel from "./CommercialPanel";

type Props={

    score:number;

    probability:number;

    priority:string;

    potential:string;

    services:string[];

    argumentsList:string[];

    nextAction:string;

};

export default function DashboardOverview({

    score,

    probability,

    priority,

    potential,

    services,

    argumentsList,

    nextAction,

}:Props){

    return(

        <div className="space-y-8">

            <ExecutiveSummary

                score={score}

                probability={probability}

                priority={priority}

                potential={potential}

            />

            <OpportunityMeter

                score={score}

            />

            <CommercialPanel

                services={services}

                argumentsList={argumentsList}

                nextAction={nextAction}

            />

        </div>

    );

}
