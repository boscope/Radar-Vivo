export default function ReportIndex(){

    const sections=[

        "Resumo Executivo",

        "Tecnologias Detectadas",

        "Oportunidades Encontradas",

        "Plano de Recomendações"

    ];

    return(

        <section className="bg-white rounded-xl shadow border p-6">

            <h2 className="text-xl font-bold mb-4">

                Índice do Relatório

            </h2>

            <ol className="space-y-2 list-decimal list-inside text-gray-700">

                {sections.map(item=>(

                    <li key={item}>{item}</li>

                ))}

            </ol>

        </section>

    );

}
