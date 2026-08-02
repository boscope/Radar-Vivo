export interface CommercialAnalysis{

score:number;

probability:number;

strengths:string[];

weaknesses:string[];

recommendation:string;

}

export function generateCommercialAnalysis(company:any):CommercialAnalysis{

const score=company.radar??75;

const probability=Math.min(99,score);

const strengths=[

"Crescimento identificado",

"Boa presença digital",

"Potencial comercial elevado"

];

const weaknesses=[

"Sem automação identificada",

"Possível ausência de CRM"

];

let recommendation="Entrar em contato esta semana.";

if(probability>=95){

recommendation="Contato imediato. Alta prioridade.";

}else if(probability>=85){

recommendation="Contato nas próximas 24 horas.";

}else if(probability>=70){

recommendation="Adicionar ao pipeline comercial.";

}

return{

score,

probability,

strengths,

weaknesses,

recommendation

};

}
