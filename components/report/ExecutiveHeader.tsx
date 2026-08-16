import { ExecutiveReport } from "@/lib/report/types";

export default function ExecutiveHeader({

    report,

}:{

    report:ExecutiveReport;

}){

    return(

        <div className="bg-neutral-950 text-white rounded-xl p-8">

            <h1 className="text-3xl font-bold">

                Relatório Executivo

            </h1>

            <div className="mt-6 grid md:grid-cols-2 gap-3">

                <p><strong>Empresa:</strong> {report.company}</p>

                <p><strong>Cidade:</strong> {report.city}</p>

                <p><strong>Categoria:</strong> {report.category}</p>

                <p><strong>Radar Score:</strong> {report.score}/100</p>

            </div>

        </div>

    );

}
