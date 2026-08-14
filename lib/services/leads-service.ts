import { supabase } from "@/lib/supabase";

export type Lead = {
  id?: string;
  name: string;
  whatsapp: string;
  company: string;
  city?: string;
  category?: string;
  score?: number;
  priority?: string;
  status?: string;
  created_at?: string;
};

export async function createLead(
  lead: Omit<Lead, "id" | "created_at">
) {
  const { data, error } = await supabase
    .from("leads")
    .insert({
      name: lead.name,
      whatsapp: lead.whatsapp,
      company: lead.company,
      city: lead.city ?? null,
      category: lead.category ?? null,
      score: lead.score ?? null,
      priority: lead.priority ?? null,
      status: lead.status ?? "Novo",
    })
    .select()
    .single();

  if (error) {
    console.error("[LEADS] Erro ao salvar:", error);
    throw new Error(error.message);
  }

  return data;
}

export async function listLeads() {
  const { data, error } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[LEADS] Erro ao listar:", error);
    throw new Error(error.message);
  }

  return data ?? [];
}
