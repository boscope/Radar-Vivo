const benefits=[

{
title:"Economize horas de pesquisa",
description:"A IA encontra informações importantes automaticamente."
},

{
title:"Encontre empresas com maior potencial",
description:"Priorize quem realmente possui perfil para comprar."
},

{
title:"Relatórios profissionais",
description:"Apresente análises completas em poucos segundos."
},

{
title:"Mais produtividade comercial",
description:"Sua equipe vende mais gastando menos tempo pesquisando."
}

];

export default function Benefits(){

return(

<section className="bg-black py-16">

<div className="max-w-7xl mx-auto px-6">

<h2 className="text-4xl font-bold text-center">

Por que usar o Radar Vivo?

</h2>

<div className="grid md:grid-cols-2 gap-6 mt-12">

{benefits.map(item=>(

<div
key={item.title}
className="bg-neutral-950 rounded-2xl border border-neutral-800 p-8 hover:bg-neutral-900/50 transition"
>

<h3 className="text-2xl font-bold">

{item.title}

</h3>

<p className="mt-3 text-neutral-400">

{item.description}

</p>

</div>

))}

</div>

</div>

</section>

);

}
