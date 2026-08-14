import { supabase } from "@/src/lib/supabase";

import {
  CompanyEntity,
  ICompanyRepository
} from "../../interfaces/company-repository-interface";

export class SupabaseCompanyRepository
  implements ICompanyRepository {

  async save(company: CompanyEntity): Promise<void> {

    const { error } = await supabase
      .from("companies")
      .insert({
        id: company.id,
        name: company.name,
        city: company.city,
        state: company.state,
        category: company.category,
        source: company.source,
        url: company.url ?? null
      });

    if (error) {
      console.error(
        "[SupabaseCompanyRepository] Erro ao salvar empresa:",
        error
      );

      throw new Error(
        `Erro ao salvar empresa: ${error.message}`
      );
    }
  }

  async findAll(): Promise<CompanyEntity[]> {

    const { data, error } = await supabase
      .from("companies")
      .select("*");

    if (error) {
      console.error(
        "[SupabaseCompanyRepository] Erro ao buscar empresas:",
        error
      );

      throw new Error(
        `Erro ao buscar empresas: ${error.message}`
      );
    }

    return (data ?? []).map((row: any) => ({
      id: row.id,
      name: row.name,
      city: row.city,
      state: row.state,
      category: row.category,
      source: row.source,
      url: row.url,
      createdAt: new Date(row.created_at)
    }));
  }

  async total(): Promise<number> {

    const { count, error } = await supabase
      .from("companies")
      .select("*", {
        count: "exact",
        head: true
      });

    if (error) {
      console.error(
        "[SupabaseCompanyRepository] Erro ao contar empresas:",
        error
      );

      throw new Error(
        `Erro ao contar empresas: ${error.message}`
      );
    }

    return count ?? 0;
  }
}
