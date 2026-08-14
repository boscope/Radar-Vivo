import { getCompanies } from "../../repositories/company-repository";
import { calculateRadarScore } from "../score/radar-score";

export async function getCompanyRanking() {

  const companies = await getCompanies();

  return companies
    .map((company: any) => ({
      ...company,
      radar:
        calculateRadarScore(company)
    }))
    .sort((a: any, b: any) => b.radar.score - a.radar.score);

}
