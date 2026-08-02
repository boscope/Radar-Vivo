export interface KPI{

id:string;

title:string;

value:string;

variation:number;

positive:boolean;

}

export async function getExecutiveKPIs():Promise<KPI[]>{

return[

{
id:"1",
title:"Radar Score Médio",
value:"91",
variation:7,
positive:true
},

{
id:"2",
title:"Empresas Prioritárias",
value:"46",
variation:11,
positive:true
},

{
id:"3",
title:"Conversão Estimada",
value:"32%",
variation:4,
positive:true
},

{
id:"4",
title:"Risco Comercial",
value:"18%",
variation:-3,
positive:true
}

];

}
