import { analyzeCompany } from "../intelligence-engine";

export interface Opportunity {

  company:string;

  priority:"CRITICA"|"ALTA"|"MEDIA"|"BAIXA";

  probability:number;

  reason:string;

  nextAction:string;

}

export function generateOpportunity(company:any):Opportunity{

  const analysis=analyzeCompany(company);

  let priority:"CRITICA"|"ALTA"|"MEDIA"|"BAIXA"="BAIXA";

  let probability=40;

  let reason="Empresa em monitoramento";

  let nextAction="Continuar acompanhando";

  if(analysis.score>=90){

      priority="CRITICA";
      probability=98;
      reason="Excelente oportunidade comercial";
      nextAction="Entrar em contato imediatamente";

  }else if(analysis.score>=80){

      priority="ALTA";
      probability=90;
      reason="Grande potencial de compra";
      nextAction="Agendar visita";

  }else if(analysis.score>=65){

      priority="MEDIA";
      probability=75;
      reason="Necessita prospecção";
      nextAction="Enviar apresentação";

  }

  return{

      company:analysis.company,

      priority,

      probability,

      reason,

      nextAction

  };

}
