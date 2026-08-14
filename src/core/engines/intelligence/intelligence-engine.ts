import {getCompanyRanking} from "../ranking/ranking-engine";
import {getBestOpportunities} from "../opportunity/opportunity-engine";
import {getNotifications} from "../notification/notification-engine";
import {generateReports} from "../report/report-engine";

export function buildRadarIntelligence(){

return{

companies:getCompanyRanking(),

opportunities:getBestOpportunities(),

notifications:getNotifications(),

reports:generateReports(),

generatedAt:new Date().toISOString()

};

}
