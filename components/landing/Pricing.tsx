const plans=[

{
name:"Starter",
price:"R$ 97",
description:"Ideal para profissionais autônomos.",
features:[
"50 análises por mês",
"Radar Score",
"Relatório Executivo",
"Suporte por e-mail"
]
},

{
name:"Pro",
price:"R$ 197",
highlight:true,
description:"Para equipes comerciais.",
features:[
"500 análises por mês",
"Todas as tecnologias",
"Oportunidades com IA",
"Relatórios completos",
"Suporte prioritário"
]
},

{
name:"Enterprise",
price:"Sob consulta",
description:"Empresas com alta demanda.",
features:[
"Análises ilimitadas",
"Equipe multiusuário",
"API",
"Treinamento",
"Suporte dedicado"
]
}

];

export default function Pricing(){

return(

<section className="py-24 bg-slate-100">

<div className="max-w-7xl mx-auto px-6">

<h2 className="text-4xl font-bold text-center">

Planos

</h2>

<div className="grid lg:grid-cols-3 gap-8 mt-16">

{plans.map(plan=>(

<div
key={plan.name}
className={`rounded-3xl border p-8 bg-white shadow-sm ${
plan.highlight
? "border-slate-900 shadow-xl scale-105"
: ""
}`}
>

<h3 className="text-3xl font-bold">

{plan.name}

</h3>

<p className="text-5xl font-extrabold mt-6">

{plan.price}

</p>

<p className="text-gray-500 mt-4">

{plan.description}

</p>

<ul className="space-y-3 mt-8">

{plan.features.map(item=>(

<li key={item}>

✔ {item}

</li>

))}

</ul>

<a href="/scanner" className="mt-10 w-full block text-center rounded-xl bg-slate-900 text-white py-4 font-bold hover:bg-slate-800 transition">

Começar

</a>
</div>

))}

</div>

</div>

</section>

);

}
