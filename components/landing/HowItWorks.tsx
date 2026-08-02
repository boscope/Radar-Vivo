const steps=[

    {
        number:"01",
        title:"Informe a empresa",
        description:"Digite o nome ou domínio da empresa que deseja analisar."
    },

    {
        number:"02",
        title:"A IA analisa",
        description:"O Radar Vivo identifica tecnologias, presença digital e oportunidades comerciais."
    },

    {
        number:"03",
        title:"Receba o relatório",
        description:"Visualize um relatório executivo com score, recomendações e potencial de compra."
    }

];

export default function HowItWorks(){

    return(

        <section className="max-w-7xl mx-auto px-6 py-24">

            <h2 className="text-4xl font-bold text-center">

                Como funciona

            </h2>

            <p className="text-center text-gray-500 mt-4 max-w-2xl mx-auto">

                Em poucos minutos você transforma dados públicos em oportunidades comerciais organizadas.

            </p>

            <div className="grid md:grid-cols-3 gap-8 mt-16">

                {steps.map(step=>(

                    <div
                        key={step.number}
                        className="border rounded-2xl p-8 shadow-sm hover:shadow-lg transition"
                    >

                        <div className="text-5xl font-extrabold text-slate-900">

                            {step.number}

                        </div>

                        <h3 className="text-2xl font-bold mt-6">

                            {step.title}

                        </h3>

                        <p className="mt-4 text-gray-600">

                            {step.description}

                        </p>

                    </div>

                ))}

            </div>

        </section>

    );

}
