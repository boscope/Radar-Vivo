import { getCompanyRanking } from "../../engines/ranking/ranking-engine";
import { generateOpportunity } from "../opportunities/opportunity-engine-v2";
import { generateCommercialAnalysis } from "./commercial-analysis";
import { getOpportunities } from "@/src/core/services/opportunity-service";

export async function getDashboardData() {

  const stored = await getOpportunities();

  if (stored.length > 0) {

    return {

      totalCompanies: stored.length,

      critical: stored.filter(o => o.priority === "CRITICA").length,

      high: stored.filter(o => o.priority === "ALTA").length,

      medium: stored.filter(o => o.priority === "MEDIA").length,

      low: stored.filter(o => o.priority === "BAIXA").length,

      opportunities: stored.map(item => ({
        ...item,
        analysis: {
          score: item.probability,
          probability: item.probability,
          recommendation: item.nextAction
        }
      }))

    };

  }

  const companies = await getCompanyRanking();

  const opportunities = companies
    .slice(0, 10)
    .map((company: any) => {

      const opportunity = generateOpportunity(company);
      const analysis = generateCommercialAnalysis(company);

      return {

        ...opportunity,

        analysis

      };

    });

  return {

    totalCompanies: companies.length,

    critical: opportunities.filter(o => o.priority === "CRITICA").length,

    high: opportunities.filter(o => o.priority === "ALTA").length,

    medium: opportunities.filter(o => o.priority === "MEDIA").length,

    low: opportunities.filter(o => o.priority === "BAIXA").length,

    opportunities

  };

}
