type Props={
company:string;
score:number;
stars:number;
priority:string;
};

export default function RadarScoreCard({
company,
score,
stars,
priority
}:Props){

const color=
priority==="ALTA"
?"bg-green-500"
:priority==="MEDIA"
?"bg-yellow-500"
:"bg-red-500";

return(

<div className="rounded-2xl bg-white shadow p-6 border">

<div className="flex justify-between items-center">

<div>

<h2 className="text-xl font-bold">

{company}

</h2>

<p className="text-gray-500">

Radar Score

</p>

</div>

<div
className={`${color} text-white px-3 py-1 rounded-full text-sm font-bold`}
>

{priority}

</div>

</div>

<div className="mt-6">

<p className="text-6xl font-black text-neutral-100">

{score}

</p>

<p className="text-yellow-500 text-2xl mt-2">

{"★".repeat(stars)}

</p>

</div>

</div>

);

}
