export default function ProductPreview(){

return(

<section className="py-24">

<div className="max-w-7xl mx-auto px-6">

<h2 className="text-4xl font-bold text-center">

Veja o Radar Vivo em ação

</h2>

<p className="text-center text-gray-500 mt-4 max-w-3xl mx-auto">

Uma prévia da plataforma que identifica oportunidades comerciais usando Inteligência Artificial.

</p>

<div className="mt-16 rounded-3xl border bg-slate-900 shadow-2xl overflow-hidden">

<div className="bg-slate-800 px-6 py-4 flex gap-2">

<div className="w-3 h-3 rounded-full bg-red-400"></div>
<div className="w-3 h-3 rounded-full bg-yellow-400"></div>
<div className="w-3 h-3 rounded-full bg-green-400"></div>

</div>

<div className="grid md:grid-cols-2 gap-8 p-10 text-white">

<div>

<h3 className="text-3xl font-bold">

Radar Score

</h3>

<p className="text-7xl font-extrabold mt-6 text-emerald-400">

94

</p>

<p className="mt-6 text-slate-300">

Excelente potencial comercial.

</p>

</div>

<div className="space-y-5">

<div className="rounded-xl bg-slate-800 p-5">

✔ React

</div>

<div className="rounded-xl bg-slate-800 p-5">

✔ Google Analytics

</div>

<div className="rounded-xl bg-slate-800 p-5">

✔ WhatsApp Business

</div>

<div className="rounded-xl bg-slate-800 p-5">

✔ Oportunidade Alta

</div>

</div>

</div>

</div>

</div>

</section>

);

}
