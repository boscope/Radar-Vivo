import { scanCompanies } from "../services/google-scanner";
import { analyzeCompany } from "../intelligence/intelligence-engine";

export async function executeScannerPipeline(
  city: string,
  state: string,
  category: string
) {

  const companies = await scanCompanies(
    city,
    state,
    category
  );

  return companies.map(company => {

    const intelligence = analyzeCompany(company);

    return {

      ...company,

      intelligence,

      validated: true,

      duplicated: false,

      importedAt: new Date().toISOString()

    };

  });

}
