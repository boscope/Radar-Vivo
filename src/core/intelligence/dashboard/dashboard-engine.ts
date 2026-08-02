import { getCompanyRanking } from "../../engines/ranking/ranking-engine";
import { generateOpportunity } from "../opportunities/opportunity-engine-v2";
import { generateCommercialAnalysis } from "./commercial-analysis";

export async function getDashboardData() {

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
