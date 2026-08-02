import ExecutiveReportView from "@/components/report/ExecutiveReportView";
import PdfPreview from "@/components/pdf/PdfPreview";
import ReportActions from "@/components/report/ReportActions";
import ReportIndex from "@/components/report/ReportIndex";
import ReportFooter from "@/components/report/ReportFooter";
import { mockExecutiveReport } from "@/lib/report/mock-report";

export default function ReportPage(){

    return(

        <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">

            <div>

                <h1 className="text-4xl font-bold">

                    Relatório Executivo

                </h1>

                <p className="text-gray-500 mt-2">

                    Pré-visualização completa do relatório que será exportado em PDF.

                </p>

            </div>

            <ReportIndex/>

            <ExecutiveReportView
                report={mockExecutiveReport}
            />

            <ReportActions/>

            <PdfPreview/>

            <ReportFooter/>

        </main>

    );

}
