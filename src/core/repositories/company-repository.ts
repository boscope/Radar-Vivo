import { supabase } from "@/lib/supabase";

export type Company = {
  id?: string;
  name: string;
  city?: string;
  state?: string;
  category?: string;
  phone?: string;
  website?: string;
  rating?: number;
  reviews?: number;
  google_place_id?: string;
  radar_score?: number;
  status?: string;
};

export async function getCompanies() {
  const { data, error } = await supabase
    .from("companies")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data;
}

export async function createCompany(company: Company) {
  const { data, error } = await supabase
    .from("companies")
    .insert(company)
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function updateCompany(id: string, company: Partial<Company>) {
  const { data, error } = await supabase
    .from("companies")
    .update(company)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function deleteCompany(id: string) {
  const { error } = await supabase
    .from("companies")
    .delete()
    .eq("id", id);

  if (error) throw error;

  return true;
}
