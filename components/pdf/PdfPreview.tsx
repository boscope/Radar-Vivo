import { reportLayout } from "@/lib/pdf/report-layout";

export default function PdfPreview(){

    return(

        <section className="bg-white rounded-xl border shadow p-6">

            <h2 className="text-2xl font-bold mb-6">

                Estrutura do Relatório PDF

            </h2>

            <div className="space-y-3">

                {reportLayout.map(section=>(

                    <div

                        key={section.title}

                        className="border rounded-lg p-4 flex justify-between"

                    >

                        <span>

                            {section.title}

                        </span>

                        <span>

                            {section.visible?"✓":"✕"}

                        </span>

                    </div>

                ))}

            </div>

        </section>

    );

}
