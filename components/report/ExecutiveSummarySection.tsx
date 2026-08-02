import { ExecutiveReport } from "@/lib/report/types";

export default function ExecutiveSummarySection({

    report,

}:{

    report:ExecutiveReport;

}){

    const cards=[

        {
            title:"Radar Score",
            value:`${report.score}/100`
        },

        {
            title:"Chance de Fechamento",
            value:`${report.probability}%`
        },

        {
            title:"Prioridade",
            value:report.priority
        },

        {
            title:"Potencial",
            value:report.potential
        }

    ];

    return(

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mt-8">

            {cards.map(card=>(

                <div

                    key={card.title}

                    className="border rounded-xl bg-white shadow p-5"

                >

                    <p className="text-sm text-gray-500">

                        {card.title}

                    </p>

                    <h2 className="text-3xl font-bold mt-3">

                        {card.value}

                    </h2>

                </div>

            ))}

        </div>

    );

}
