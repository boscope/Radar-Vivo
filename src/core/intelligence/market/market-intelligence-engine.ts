export interface MarketIndicator{

title:string;

value:string;

variation:number;

trend:"UP"|"DOWN"|"STABLE";

description:string;

}

export async function getMarketIndicators():Promise<MarketIndicator[]>{

return[

{
title:"Mercado Aquecido",
value:"87%",
variation:12,
trend:"UP",
description:"Aumento de empresas com alta prioridade."
},

{
title:"Conversão Esperada",
value:"32%",
variation:5,
trend:"UP",
description:"Estimativa baseada no Radar Score."
},

{
title:"Empresas Monitoradas",
value:"1.250",
variation:8,
trend:"UP",
description:"Base ativa do Radar Vivo."
},

{
title:"Oportunidades Hoje",
value:"46",
variation:-2,
trend:"STABLE",
description:"Empresas com potencial imediato."
}

];

}
