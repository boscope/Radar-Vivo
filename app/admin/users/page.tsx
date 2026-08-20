export default function UsersPage(){

const users=[
{name:"Bosco",plan:"PRO",status:"Ativo"},
{name:"Empresa Demo",plan:"Teste Grátis",status:"Teste"},
{name:"Radar Vivo",plan:"Agência",status:"Ativo"},
];

return(

<div className="p-10">

<h1 className="text-4xl font-bold text-white mb-8">

Usuários

</h1>

<div className="bg-neutral-900 rounded-2xl border border-neutral-800">

<table className="w-full">

<thead className="bg-neutral-800">

<tr>

<th className="text-left p-4 text-neutral-300">Nome</th>
<th className="text-left p-4 text-neutral-300">Plano</th>
<th className="text-left p-4 text-neutral-300">Status</th>

</tr>

</thead>

<tbody>

{users.map((u)=>(
<tr
key={u.name}
className="border-t border-neutral-800"
>

<td className="p-4 text-white">{u.name}</td>
<td className="p-4 text-neutral-300">{u.plan}</td>
<td className="p-4 text-green-400">{u.status}</td>

</tr>
))}

</tbody>

</table>

</div>

</div>

);

}
