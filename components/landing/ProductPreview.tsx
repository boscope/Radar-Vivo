export default function ProductPreview(){

return(

<section className="py-24">

<div className="max-w-7xl mx-auto px-6">

<h2 className="text-4xl font-bold text-center">

Veja o Radar Vivo em ação

</h2>

<p className="text-center text-gray-500 mt-4 max-w-3xl mx-auto">

Uma prévia real da busca de oportunidades: empresas sem site, com score e prioridade.

</p>

<div className="mt-16 rounded-3xl border bg-slate-900 shadow-2xl overflow-hidden">

<div className="bg-slate-800 px-6 py-4 flex gap-2">

<div className="w-3 h-3 rounded-full bg-red-400"></div>
<div className="w-3 h-3 rounded-full bg-yellow-400"></div>
<div className="w-3 h-3 rounded-full bg-green-400"></div>

<span className="ml-4 text-slate-400 text-sm">
  Busca: Estado PE • Padaria
</span>

</div>

<div className="p-8 space-y-4 text-white">

<div className="flex items-center justify-between rounded-xl bg-slate-800 p-5">

  <div>
    <p className="font-bold">Padaria Canaã</p>
    <p className="text-sm text-slate-400">Recife, PE</p>
  </div>

  <div className="text-right">
    <p className="text-2xl font-extrabold text-red-400">100</p>
    <p className="text-xs text-red-400 font-bold">Muito Alta</p>
  </div>

  <span className="text-xs bg-red-950 text-red-300 px-3 py-2 rounded-lg font-bold">
    ❌ Sem site
  </span>

</div>

<div className="flex items-center justify-between rounded-xl bg-slate-800 p-5">

  <div>
    <p className="font-bold">Padaria Tropical</p>
    <p className="text-sm text-slate-400">Olinda, PE</p>
  </div>

  <div className="text-right">
    <p className="text-2xl font-extrabold text-red-400">100</p>
    <p className="text-xs text-red-400 font-bold">Muito Alta</p>
  </div>

  <span className="text-xs bg-red-950 text-red-300 px-3 py-2 rounded-lg font-bold">
    ❌ Sem site
  </span>

</div>

<div className="flex items-center justify-between rounded-xl bg-slate-800 p-5">

  <div>
    <p className="font-bold">Panificadora Pão Quente</p>
    <p className="text-sm text-slate-400">Caruaru, PE</p>
  </div>

  <div className="text-right">
    <p className="text-2xl font-extrabold text-orange-400">90</p>
    <p className="text-xs text-orange-400 font-bold">Alta</p>
  </div>

  <span className="text-xs bg-slate-950 text-slate-300 px-3 py-2 rounded-lg font-bold">
    📞 Tem contato
  </span>

</div>

<div className="rounded-xl bg-slate-800 p-4 text-sm text-slate-300">

  💬 Cada oportunidade vem com script de WhatsApp, roteiro de ligação e quebra de objeções prontos.

</div>

</div>

</div>

</div>

</section>

);

}
