type Props={
  title:string;
  value:string;
  description:string;
};

export default function AdminCard({
  title,
  value,
  description
}:Props){

return(

<div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6">

<p className="text-neutral-400 text-sm">

{title}

</p>

<h2 className="text-4xl font-bold mt-3 text-green-400">

{value}

</h2>

<p className="text-neutral-500 mt-4">

{description}

</p>

</div>

);

}
