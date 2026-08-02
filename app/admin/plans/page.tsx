export default function Plans(){

return(

<div className="p-10">

<h1 className="text-4xl font-bold">

Planos

</h1>

<div className="grid md:grid-cols-3 gap-6 mt-10">

<div className="bg-white rounded-2xl shadow p-6">
<h2 className="text-2xl font-bold">Starter</h2>
<p className="mt-4">Ideal para pequenos negócios.</p>
</div>

<div className="bg-white rounded-2xl shadow p-6">
<h2 className="text-2xl font-bold">PRO</h2>
<p className="mt-4">Plano recomendado.</p>
</div>

<div className="bg-white rounded-2xl shadow p-6">
<h2 className="text-2xl font-bold">Enterprise</h2>
<p className="mt-4">Grandes empresas.</p>
</div>

</div>

</div>

);

}
