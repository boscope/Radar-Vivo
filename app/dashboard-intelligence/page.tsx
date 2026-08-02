import { getDashboardData } from "@/src/core/intelligence/dashboard/dashboard-engine";
import { generateActionPlan } from "@/src/core/intelligence/recommendation/action-plan-engine";

import RadarScoreCard from "@/components/dashboard/RadarScoreCard";
import ActionPlanCard from "@/components/dashboard/ActionPlanCard";

export default async function DashboardIntelligencePage(){

const dashboard=await getDashboardData();

const plans=await generateActionPlan();

const averageScore=Math.round(

dashboard.opportunities.reduce(

(total,item)=>total+item.analysis.score,

0

)/dashboard.opportunities.length

);

return(

<main className="min-h-screen bg-slate-100 p-8">

<div className="max-w-7xl mx-auto">

<div className="flex justify-between items-center mb-10">

<div>

<h1 className="text-5xl font-black">

Radar Vivo

</h1>

<p className="text-slate-600 mt-2">

Sistema de Inteligência Comercial

</p>

</div>

<RadarScoreCard score={averageScore}/>

</div>

<div className="grid lg:grid-cols-3 gap-6">

<div className="lg:col-span-2">

<div className="bg-white rounded-xl shadow p-8">

<h2 className="text-2xl font-bold mb-6">

Oportunidades Prioritárias

</h2>

<div className="space-y-5">

{dashboard.opportunities.map((item,index)=>(

<div
key={index}
className="border rounded-xl p-5 flex justify-between">

<div>

<h3 className="font-bold text-lg">

{item.company}

</h3>

<p className="text-slate-500">

{item.reason}

</p>

<p className="text-sm mt-3">

{item.analysis.recommendation}

</p>

</div>

<div className="text-right">

<div className="text-3xl font-bold">

{item.analysis.score}

</div>

<div>

{item.analysis.probability}%

</div>

</div>

</div>

))}

</div>

</div>

</div>

<div>

<ActionPlanCard plans={plans}/>

</div>

</div>

</div>

</main>

);

}
