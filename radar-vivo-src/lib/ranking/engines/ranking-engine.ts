import type {
  RankedCompany,
} from "../contracts/ranking";

export function rankCompanies(

  companies: RankedCompany[]

): RankedCompany[] {

  return [...companies].sort(

    (a, b) => b.score - a.score

  );

}
