import { searchCompanies } from "./search";
import { filterCompanies } from "./filter";

import type { Opportunity } from "./types";

export async function runAutomaticRadar(
  city: string,
  category: string
): Promise<Opportunity[]> {

  console.log("=================================");
  console.log("🚀 RADAR VIVO AUTOMÁTICO");
  console.log("=================================");

  const companies =
    await searchCompanies(city, category);

  const filtered =
    filterCompanies(companies);

  console.log(
    `Empresas encontradas: ${filtered.length}`
  );

  return filtered;

}