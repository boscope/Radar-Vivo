import { scanCompanies } from "@/src/core/services/google-scanner";

export async function executeScannerPipeline(
  city: string,
  state: string,
  category: string
) {

  const result = await scanCompanies(
    city,
    state,
    category
  );

  return {

    companies: result.companies,

    repositoryTotal: result.repositoryTotal,

    opportunitiesGenerated: result.companies.length,

    opportunities: result.companies

  };

}
