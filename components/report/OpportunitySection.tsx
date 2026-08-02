import { ExecutiveReport } from "@/lib/report/types";

export default function OpportunitySection({

    report,

}:{

    report:ExecutiveReport;

}){

    return(

        <section className="bg-white rounded-xl shadow border p-6 mt-8">

            <h2 className="text-2xl font-bold mb-5">

                Oportunidades Detectadas

            </h2>

            <div className="space-y-3">

                {report.opportunities.map((item,index)=>(

                    <div

                        key={index}

                        className="flex gap-3 items-start border rounded-lg p-4 bg-green-50"

                    >

                        <div className="text-green-700 font-bold">

                            ✓

                        </div>

                        <div>

                            {item}

                        </div>

                    </div>

                ))}

            </div>

        </section>

    );

}
