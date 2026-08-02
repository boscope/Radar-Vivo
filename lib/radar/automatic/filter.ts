import type { Opportunity } from "./types";

export function filterCompanies(
  companies: Opportunity[]
): Opportunity[] {

  return companies.filter(
    (company) =>
      company.company.trim().length > 0
  );

}