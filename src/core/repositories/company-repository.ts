import { supabase } from "@/lib/supabase";

export async function getCompanies() {
  const { data, error } = await supabase
    .from("companies")
    .select("*")
    .order("radar_score", { ascending: false });

  if (error) throw error;

  return data ?? [];
}

export async function getCompanyById(id: string) {
  const { data, error } = await supabase
    .from("companies")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;

  return data;
}
