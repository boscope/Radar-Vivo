import Link from "next/link";

const menu=[

["Dashboard","/admin"],
["Pipeline","/admin/leads"],
["Empresas","/admin/companies"],
["Usuários","/admin/users"],
["Planos","/admin/plans"],
["Configurações","/admin/settings"],

];

export default function AdminSidebar(){

return(

<aside className="w-72 bg-slate-900 text-white min-h-screen p-8">

<h2 className="text-3xl font-bold mb-12">

Radar Vivo

</h2>

<nav className="space-y-3">

{menu.map(([name,url])=>(

<Link
key={name}
href={url}
className="block rounded-xl px-4 py-3 hover:bg-slate-800 transition"
>

{name}

</Link>

))}

</nav>

</aside>

);

}
