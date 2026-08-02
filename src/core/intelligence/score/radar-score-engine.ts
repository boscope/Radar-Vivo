export interface RadarScoreResult{

score:number;

classification:string;

stars:string;

color:string;

priority:"CRITICA"|"ALTA"|"MEDIA"|"BAIXA";

}

export function calculateRadarScore(score:number):RadarScoreResult{

const value=Math.max(0,Math.min(100,score));

if(value>=95){

return{

score:value,

classification:"EXTREMO",

stars:"★★★★★",

color:"red",

priority:"CRITICA"

};

}

if(value>=85){

return{

score:value,

classification:"MUITO ALTO",

stars:"★★★★☆",

color:"orange",

priority:"ALTA"

};

}

if(value>=70){

return{

score:value,

classification:"ALTO",

stars:"★★★☆☆",

color:"yellow",

priority:"MEDIA"

};

}

return{

score:value,

classification:"MÉDIO",

stars:"★★☆☆☆",

color:"blue",

priority:"BAIXA"

};

}
