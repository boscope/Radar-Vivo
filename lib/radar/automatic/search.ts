import { getMockCompanies } from "./mock-search";

import type { Opportunity } from "./types";

export async function searchCompanies(
  city: string,
  category: string
): Promise<Opportunity[]> {

  console.log(
    `🔎 Procurando empresas em ${city} (${category})`
  );

  const companies = getMockCompanies();

  return companies.filter(
    (company) =>
      company.city === city
  );

}