const steps=[

    {
        number:"01",
        title:"Busque oportunidades",
        description:"Escolha estado, cidade e categoria. O Radar encontra negócios sem site, sem WhatsApp ou com presença fraca — e mostra quem tem mais potencial."
    },

    {
        number:"02",
        title:"Receba o script pronto",
        description:"Cada oportunidade vem com mensagem de WhatsApp, roteiro de ligação e respostas para objeções. É só copiar e abordar."
    },

    {
        number:"03",
        title:"Acompanhe até fechar",
        description:"Mova cada lead pelo pipeline (Contato, Reunião, Proposta, Fechado) e exporte para sua planilha ou CRM quando quiser."
    }

];

export default function HowItWorks(){

    return(

        <section className="max-w-7xl mx-auto px-6 py-24">

            <h2 className="text-4xl font-bold text-center">

                Como funciona

            </h2>

            <p className="text-center text-gray-500 mt-4 max-w-2xl mx-auto">

                Da busca à venda fechada, tudo em um só lugar. Sem planilha, sem perder horas pesquisando.

            </p>

            <div className="grid md:grid-cols-3 gap-8 mt-16">

                {steps.map(step=>(

                    <div
                        key={step.number}
                        className="border rounded-2xl p-8 shadow-sm hover:shadow-lg transition"
                    >

                        <div className="text-5xl font-extrabold text-green-500">

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
