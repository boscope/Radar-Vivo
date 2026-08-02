import {CompanyData} from "../../types/company";
import {RadarScoreResult} from "../../types/radar-score";

export function calculateRadarScore(
company:CompanyData
):RadarScoreResult{

const score=Math.min(
100,

Math.round(

company.opportunities*0.35+

company.updates*0.10+

company.popularity*0.15+

company.relevance*0.20+

company.confidence*0.20

)

);

let stars=1;

if(score>=20) stars=2;
if(score>=40) stars=3;
if(score>=60) stars=4;
if(score>=80) stars=5;

let priority:"BAIXA"|"MEDIA"|"ALTA"="BAIXA";

if(score>=50) priority="MEDIA";

if(score>=80) priority="ALTA";

return{

score,

stars,

priority

};

}
