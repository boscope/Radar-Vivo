import RadarScoreCard from "@/components/core/RadarScoreCard";

export default function CoreDemo(){

return(

<div className="min-h-screen bg-slate-100 p-10">

<h1 className="text-5xl font-bold mb-10">

Radar Score Engine

</h1>

<div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

<RadarScoreCard
company="Mercado Livre"
score={96}
stars={5}
priority="ALTA"
/>

<RadarScoreCard
company="Magazine Luiza"
score={82}
stars={5}
priority="ALTA"
/>

<RadarScoreCard
company="Shopee"
score={68}
stars={4}
priority="MEDIA"
/>

<RadarScoreCard
company="Amazon"
score={54}
stars={3}
priority="MEDIA"
/>

<RadarScoreCard
company="Empresa Local"
score={31}
stars={2}
priority="BAIXA"
/>

</div>

</div>

);

}
