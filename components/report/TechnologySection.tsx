import { ExecutiveReport } from "@/lib/report/types";

export default function TechnologySection({

    report,

}:{

    report:ExecutiveReport;

}){

    return(

        <section className="bg-white rounded-xl shadow border p-6 mt-8">

            <h2 className="text-2xl font-bold mb-5">

                Tecnologias Detectadas

            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">

                {report.technologies.map((tech,index)=>(

                    <div
                        key={index}
                        className="border rounded-lg px-4 py-3 bg-slate-50 hover:bg-slate-100 transition"
                    >

                        {tech}

                    </div>

                ))}

            </div>

        </section>

    );

}
