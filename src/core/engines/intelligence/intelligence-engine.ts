import { getCompanyRanking } from "../ranking/ranking-engine";
import { getBestOpportunities } from "../opportunity/opportunity-engine";
import { getNotifications } from "../notification/notification-engine";
import { generateReports } from "../report/report-engine";

export async function buildRadarIntelligence() {
  const companies = await getCompanyRanking();
  const opportunities = await getBestOpportunities();
  const notifications = await getNotifications();
  const reports = await generateReports();

  return {
    companies,
    opportunities,
    notifications,
    reports,
    generatedAt: new Date().toISOString(),
  };
}
