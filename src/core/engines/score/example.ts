import {calculateRadarScore} from "./radar-score";

const empresa={

id:"1",

name:"Empresa Teste",

opportunities:92,

updates:75,

popularity:83,

relevance:91,

confidence:87

};

console.log(calculateRadarScore(empresa));
