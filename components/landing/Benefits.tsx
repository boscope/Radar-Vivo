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

<section className="bg-slate-50 py-24">

<div className="max-w-7xl mx-auto px-6">

<h2 className="text-4xl font-bold text-center">

Por que usar o Radar Vivo?

</h2>

<div className="grid md:grid-cols-2 gap-8 mt-16">

{benefits.map(item=>(

<div
key={item.title}
className="bg-white rounded-2xl border shadow-sm p-8 hover:shadow-lg transition"
>

<h3 className="text-2xl font-bold">

{item.title}

</h3>

<p className="mt-4 text-gray-600">

{item.description}

</p>

</div>

))}

</div>

</div>

</section>

);

}
