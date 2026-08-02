import { getDashboardData } from "../dashboard/dashboard-engine";
import { generateActionPlan } from "../recommendation/action-plan-engine";

export interface ExecutiveSummary{

title:string;

subtitle:string;

marketMoment:string;

bestAction:string;

confidence:number;

generatedAt:string;

}

export async function generateExecutiveSummary():Promise<ExecutiveSummary>{

const dashboard=await getDashboardData();

const plans=await generateActionPlan();

const critical=dashboard.critical;
const high=dashboard.high;

let marketMoment="Mercado equilibrado";

if(critical>=5){

marketMoment="Mercado extremamente aquecido";

}else if(high>=5){

marketMoment="Mercado favorável para prospecção";

}

return{

title:"Resumo Executivo",

subtitle:`${dashboard.totalCompanies} empresas monitoradas`,

marketMoment,

bestAction:plans[0]?.title ?? "Continuar monitoramento",

confidence:92,

generatedAt:new Date().toISOString()

};

}
