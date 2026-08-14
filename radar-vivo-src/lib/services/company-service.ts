import { supabase } from "@/lib/supabase";
import { calculateRV } from "@/engine/rv-engine";
import type { Company } from "@/types/company";

export async function getCompanies(): Promise<Company[]> {
  const { data, error } = await supabase
    .from("companies")
    .select("*")
    .order("rv_index", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  const companies = (data ?? []) as Company[];

  return companies.map((company) => {
    const analysis = calculateRV(company);

    return {
      ...company,
      rv_index: analysis.rvIndex,
      diagnosis: analysis.diagnosis.join("\n"),
      closing_probability: analysis.closingProbability,
      monthly_loss: analysis.monthlyLoss,
      recommended_service: analysis.recommendedService,
    };
  });
}

export async function getCompanyById(id: string): Promise<Company> {
  const { data, error } = await supabase
    .from("companies")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  const company = data as Company;

  const analysis = calculateRV(company);

  return {
    ...company,
    rv_index: analysis.rvIndex,
    diagnosis: analysis.diagnosis.join("\n"),
    closing_probability: analysis.closingProbability,
    monthly_loss: analysis.monthlyLoss,
    recommended_service: analysis.recommendedService,
  };
}

export async function updateCompany(id: string, values: Partial<Company>) {
  const { data, error } = await supabase
    .from("companies")
    .update(values)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}