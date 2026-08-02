export interface RadarScoreResult {

  finalScore:number;

  digitalPresence:number;

  commercialPresence:number;

  authority:number;

  opportunity:number;

  recommendations:string[];

}

export function calculateRadarScoreV2(company:any):RadarScoreResult{

  let digitalPresence=0;

  let commercialPresence=0;

  let authority=0;

  let opportunity=0;

  const recommendations:string[]=[];

  if(company.website){

    digitalPresence+=25;

  }else{

    recommendations.push("Criar website profissional");

  }

  if(company.phone){

    commercialPresence+=20;

  }else{

    recommendations.push("Adicionar telefone");

  }

  if((company.rating??0)>=4.7){

    authority+=25;

  }else{

    recommendations.push("Melhorar reputação online");

  }

  if((company.reviews??0)>=200){

    authority+=15;

  }

  opportunity=40;

  const finalScore=

  digitalPresence+

  commercialPresence+

  authority+

  opportunity;

  return{

    finalScore,

    digitalPresence,

    commercialPresence,

    authority,

    opportunity,

    recommendations

  };

}
