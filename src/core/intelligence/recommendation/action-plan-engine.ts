import { getDashboardData } from "../dashboard/dashboard-engine";

export interface ActionPlan{

title:string;

description:string;

priority:"CRITICA"|"ALTA"|"MEDIA";

}

export async function generateActionPlan():Promise<ActionPlan[]>{

const dashboard=await getDashboardData();

const plans:ActionPlan[]=[];

if(dashboard.critical>0){

plans.push({

title:"Entrar em contato imediato",

description:`Existem ${dashboard.critical} empresas com prioridade crítica.`,

priority:"CRITICA"

});

}

if(dashboard.high>0){

plans.push({

title:"Agendar visitas",

description:`Planeje visitas para ${dashboard.high} empresas de alta prioridade.`,

priority:"ALTA"

});

}

plans.push({

title:"Atualizar pipeline",

description:"Registrar todas as interações comerciais realizadas hoje.",

priority:"MEDIA"

});

return plans;

}
