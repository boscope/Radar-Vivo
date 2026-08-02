export default function UsersPage(){

const users=[
{name:"Bosco",plan:"PRO",status:"Ativo"},
{name:"Empresa Demo",plan:"Starter",status:"Teste"},
{name:"Radar Vivo",plan:"Enterprise",status:"Ativo"},
];

return(

<div className="p-10">

<h1 className="text-4xl font-bold mb-8">

Usuários

</h1>

<div className="bg-white rounded-2xl shadow">

<table className="w-full">

<thead className="bg-slate-100">

<tr>

<th className="text-left p-4">Nome</th>
<th className="text-left p-4">Plano</th>
<th className="text-left p-4">Status</th>

</tr>

</thead>

<tbody>

{users.map((u)=>(
<tr
key={u.name}
className="border-t"
>

<td className="p-4">{u.name}</td>
<td className="p-4">{u.plan}</td>
<td className="p-4">{u.status}</td>

</tr>
))}

</tbody>

</table>

</div>

</div>

);

}
