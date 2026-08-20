export default function Companies(){

return(

<div className="p-10">

<h1 className="text-4xl font-bold text-white">

Empresas Monitoradas

</h1>

<div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mt-10">

{Array.from({length:8}).map((_,i)=>(

<div
key={i}
className="bg-neutral-900 rounded-2xl p-6 border border-neutral-800"
>

<h2 className="font-bold text-white">

Empresa {i+1}

</h2>

<p className="text-neutral-400 mt-2">

Monitoramento ativo

</p>

</div>

))}

</div>

</div>

);

}
