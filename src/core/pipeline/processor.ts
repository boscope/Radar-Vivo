import { CompanyEntity } from "@/src/core/database/interfaces/company-repository-interface";
import { analyzeCompany, Opportunity } from "@/src/core/intelligence/company-analyzer";

export async function processCompanies(
  companies: CompanyEntity[]
): Promise<Opportunity[]> {

  return companies.map(company => {

    return analyzeCompany(company);

  });

}
