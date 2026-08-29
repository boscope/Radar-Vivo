const testimonials=[

{
name:"Carlos M.",
role:"Agência Digital · Recife, PE",
text:"Montei uma lista de 80 restaurantes sem site em menos de uma hora. O script de WhatsApp pronto fez o primeiro cliente fechar na primeira semana."
},

{
name:"Juliana S.",
role:"Consultora de Marketing · São Paulo, SP",
text:"Eu perdia fins de semana inteiros pesquisando empresas no Google. Hoje o Radar me entrega as oportunidades com o diagnóstico pronto. O tempo que sobra eu uso pra vender."
},

{
name:"Rafael T.",
role:"Vendedor de Sites · Goiânia, GO",
text:"O que mais gosto é a mensagem pronta pro WhatsApp. Já abordo com texto profissional e personalizado. Fechamos 3 sites no primeiro mês."
}

];

export default function SocialProof(){

    return(

        <section className="max-w-7xl mx-auto px-6 py-16">

            <h2 className="text-4xl font-bold text-center">

                Quem usa, recomenda

            </h2>

            <p className="text-center text-neutral-400 mt-3 max-w-2xl mx-auto">

                Vendedores e agências que transformaram prospecção em venda.

            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">

                {testimonials.map((t)=>(
                    <div key={t.name} className="border border-neutral-800 rounded-2xl p-8 bg-neutral-950">
                        <div className="text-green-400 text-xl">
                            ★★★★★
                        </div>
                        <p className="mt-4 text-neutral-200 italic">
                            "{t.text}"
                        </p>
                        <div className="mt-6">
                            <p className="font-bold">{t.name}</p>
                            <p className="text-neutral-500 text-sm">{t.role}</p>
                        </div>
                    </div>
                ))}

            </div>

        </section>

    );

}
