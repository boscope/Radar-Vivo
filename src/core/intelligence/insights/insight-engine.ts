export interface CommercialInsight{

id:string;

title:string;

description:string;

impact:"ALTO"|"MEDIO"|"BAIXO";

}

export async function getCommercialInsights():Promise<CommercialInsight[]>{

return[

{
id:"1",
title:"Maior concentração de oportunidades",
description:"As empresas de serviços apresentam maior potencial de conversão neste momento.",
impact:"ALTO"
},

{
id:"2",
title:"Acompanhamento recomendado",
description:"Empresas contatadas há mais de 15 dias devem retornar ao fluxo comercial.",
impact:"MEDIO"
},

{
id:"3",
title:"Priorizar empresas críticas",
description:"Empresas com Radar Score elevado tendem a gerar maior retorno imediato.",
impact:"ALTO"
}

];

}
