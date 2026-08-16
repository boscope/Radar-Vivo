import { SearchManager } from "./search/search-manager";
import { upsertCompany, makeExternalId } from "@/lib/services/company-db-service";

const manager = new SearchManager();

export async function scanCompanies(
  city: string,
  state: string,
  category: string
) {

  console.log("[SCANNER] Iniciando busca");

  const companies = await manager.search(
    city,
    state,
    category
  );

  console.log(
    "[SCANNER] Empresas recebidas:",
    companies.length
  );

  const saved: string[] = [];

  for (const company of companies) {

    const externalId = makeExternalId(
      company.name,
      company.city,
      company.state
    );

    await upsertCompany(externalId, {
      name: company.name,
      city: company.city,
      state: company.state,
      category: company.category,
      website: company.url,
      phone: company.phone,
      rating: company.rating,
      lat: (company as any).lat,
      lon: (company as any).lon,
      mapsUrl: (company as any).mapsUrl,
      googlePlaceId: (company as any).googlePlaceId,
    }).catch((error) => {
      console.error("[SCANNER] Erro ao salvar empresa:", error);
      return null;
    });

    saved.push(externalId);
  }

  return {
    companies,
    saved,
  };
}
