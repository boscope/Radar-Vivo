import { ExecutiveReport } from "@/lib/report/types";

export async function exportExecutiveReport(

    report:ExecutiveReport

){

    console.log("Preparando exportação do relatório...");

    console.table({

        empresa:report.company,

        score:report.score,

        tecnologias:report.technologies.length,

        oportunidades:report.opportunities.length,

        recomendacoes:report.recommendations.length

    });

    return true;

}
