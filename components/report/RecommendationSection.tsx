import { ExecutiveReport } from "@/lib/report/types";

export default function RecommendationSection({

    report,

}:{

    report:ExecutiveReport;

}){

    return(

        <section className="bg-white rounded-xl shadow border p-6 mt-8">

            <h2 className="text-2xl font-bold mb-5">

                Plano de Recomendações

            </h2>

            <div className="space-y-4">

                {report.recommendations.map((item,index)=>(

                    <div

                        key={index}

                        className="rounded-lg border-l-4 border-blue-600 bg-blue-50 p-4"

                    >

                        <div className="font-semibold">

                            Recomendação {index+1}

                        </div>

                        <div className="mt-1">

                            {item}

                        </div>

                    </div>

                ))}

            </div>

        </section>

    );

}
