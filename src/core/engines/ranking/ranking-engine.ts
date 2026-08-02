import { getCompanies } from "../../repositories/company-repository";

export async function getCompanyRanking() {

  const companies = await getCompanies();

  return companies
    .map((company: any) => {

      const score =
        typeof company.radar === "number"
          ? company.radar
          : company.score ?? 75;

      return {

        company,

        radar: score

      };

    })

    .sort((a, b) => b.radar - a.radar);

}
