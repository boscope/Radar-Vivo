export default function Plans(){

return(

<div className="p-10">

<h1 className="text-4xl font-bold text-white">

Planos

</h1>

<div className="grid md:grid-cols-3 gap-6 mt-10">

<div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
<h2 className="text-2xl font-bold text-white">Teste Grátis</h2>
<p className="mt-4 text-neutral-400">3 dias de acesso completo. R$ 0.</p>
</div>

<div className="bg-neutral-900 border border-green-500 rounded-2xl p-6">
<h2 className="text-2xl font-bold text-green-400">PRO</h2>
<p className="mt-4 text-neutral-400">R$ 197/mês. Plano recomendado.</p>
</div>

<div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
<h2 className="text-2xl font-bold text-white">Agência</h2>
<p className="mt-4 text-neutral-400">R$ 397/mês. Para equipes.</p>
</div>

</div>

</div>

);

}
