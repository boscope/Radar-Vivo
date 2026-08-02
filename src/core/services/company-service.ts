import { supabase } from "../../../lib/supabase";

export async function getCompanies() {

  const { data, error } = await supabase
    .from("companies")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return [];
  }

  return data ?? [];
}

export async function createCompany(company: {
  name: string;
  website?: string;
  segment?: string;
  city?: string;
  state?: string;
}) {

  const { data, error } = await supabase
    .from("companies")
    .insert([company])
    .select();

  if (error) {
    console.error(error);
    return null;
  }

  return data?.[0] ?? null;
}

export async function deleteCompany(id: string) {

  const { error } = await supabase
    .from("companies")
    .delete()
    .eq("id", id);

  return !error;
}
