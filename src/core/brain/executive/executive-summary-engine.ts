export interface ExecutiveSummary{

todayPriority:string;

mainOpportunity:string;

recommendedAction:string;

marketSituation:string;

}

export async function getExecutiveSummary():Promise<ExecutiveSummary>{

return{

todayPriority:"Prospectar empresas com Radar Score acima de 90.",

mainOpportunity:"Empresas do setor de serviços continuam apresentando maior potencial de conversão.",

recommendedAction:"Entrar em contato com as empresas classificadas como prioridade máxima.",

marketSituation:"Mercado aquecido com tendência positiva."

};

}
