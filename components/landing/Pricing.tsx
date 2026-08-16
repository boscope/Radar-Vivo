const plans=[

{
name:"Teste Grátis",
price:"R$ 0",
badge:"3 DIAS DE TESTE",
highlight:false,
description:"Acesso total por 3 dias para você sentir o poder do Radar Vivo.",
features:[
"3 dias de acesso completo",
"Oportunidades ilimitadas",
"Scripts de abordagem prontos",
"Pipeline de leads",
"Sem cartão de crédito"
]
},

{
name:"Pro",
price:"R$ 197",
highlight:true,
description:"Para quem quer fechar vendas todo mês.",
features:[
"Oportunidades ilimitadas",
"Scripts de abordagem prontos",
"Mensagem WhatsApp com 1 clique",
"Pipeline completo até fechar",
"Exportação em CSV",
"Todas as categorias de negócio"
]
},

{
name:"Agência",
price:"R$ 397",
description:"Para equipes e agências de marketing.",
features:[
"Tudo do Pro",
"Até 5 usuários na equipe",
"Relatórios executivos completos",
"Suporte prioritário por WhatsApp",
"Domínio e marca personalizada"
]
}

];

export default function Pricing(){

    return(

        <section className="max-w-7xl mx-auto px-6 py-16">

            <h2 className="text-4xl font-bold text-center">

                Planos simples, preço justo

            </h2>

            <p className="text-center text-neutral-400 mt-3 max-w-2xl mx-auto">

                Comece com 3 dias grátis. Um único site vendido já paga meses de assinatura.

            </p>

            <div className="grid md:grid-cols-3 gap-6 mt-12">

                {plans.map(plan=>(

                    <div
                        key={plan.name}
                        className={
                            plan.highlight
                            ? "border-2 border-green-500 rounded-3xl p-8 bg-neutral-950 relative"
                            : "border border-neutral-800 rounded-3xl p-8 bg-neutral-950 hover:border-neutral-600 transition"
                        }
                    >

                        {plan.highlight && (

                            <span className="absolute -top-4 left-8 bg-green-500 text-black text-sm font-bold px-4 py-1 rounded-full">

                                Mais popular

                            </span>

                        )}

                        {plan.badge && !plan.highlight && (

                            <span className="inline-block bg-amber-500 text-black text-xs font-bold px-3 py-1 rounded-full mb-3">

                                {plan.badge}

                            </span>

                        )}

                        <h3 className="text-2xl font-bold">

                            {plan.name}

                        </h3>

                        <p className="text-5xl font-extrabold mt-4">

                            {plan.price}

                        </p>

                        <p className="text-neutral-400 mt-3">

                            {plan.description}

                        </p>

                        <ul className="mt-6 space-y-3">

                            {plan.features.map(feature=>(

                                <li key={feature} className="flex gap-3">

                                    <span className="text-green-500">✔</span>

                                    <span>{feature}</span>

                                </li>

                            ))}

                        </ul>

                        <a

                            href="/busca"

                            className={
                                plan.highlight
                                ? "mt-8 block text-center bg-green-500 hover:bg-green-400 transition text-black font-bold py-4 rounded-xl"
                                : "mt-8 block text-center border border-neutral-600 hover:bg-neutral-900 transition font-bold py-4 rounded-xl"
                            }

                        >

                            {plan.name === "Teste Grátis" ? "Testar grátis por 3 dias" : "Assinar agora"}

                        </a>

                    </div>

                ))}

            </div>

            <p className="text-center text-neutral-500 mt-10 text-sm">

                💡 Um site vendido (R$ 800 a R$ 3.000) paga 4 a 15 meses de assinatura Pro.

            </p>

        </section>

    );

}
