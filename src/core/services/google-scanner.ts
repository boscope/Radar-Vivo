import { SearchManager } from "./search/search-manager";
import { SupabaseCompanyRepository } from "@/src/core/database/supabase/repositories/supabase-company-repository";
import { CompanyEntity } from "@/src/core/database/interfaces/company-repository-interface";

const manager = new SearchManager();
const repository = new SupabaseCompanyRepository();

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

  for (const company of companies) {

    const entity: CompanyEntity = {

      id: crypto.randomUUID(),

      name: company.name,

      city: company.city,

      state: company.state,

      category: company.category,

      source: company.source,

      url: company.url,

      createdAt: new Date()

    };

    await repository.save(entity);

  }

  const repositoryTotal =
    await repository.total();

  console.log(
    "[SCANNER] Retornando:",
    companies.length
  );

  console.log(
    "[SCANNER] Repository total:",
    repositoryTotal
  );

  return {

    companies,

    repositoryTotal

  };

}
