import { supabase } from "@/lib/supabase";
import { releaseCompany } from "./company-db-service";

export const PIPELINE_STAGES = [
  "Novo",
  "Contato feito",
  "Reunião",
  "Proposta enviada",
  "Fechado",
  "Perdido",
] as const;

export type PipelineStage = (typeof PIPELINE_STAGES)[number];

export type Lead = {
  id?: string;
  name: string;
  whatsapp: string;
  company: string;
  city?: string;
  state?: string;
  category?: string;
  score?: number;
  priority?: string;
  status?: PipelineStage;
  owner_id?: string;
  company_id?: string;
  external_id?: string;
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
      state: lead.state ?? null,
      category: lead.category ?? null,
      score: lead.score ?? null,
      priority: lead.priority ?? null,
      status: lead.status ?? "Novo",
      owner_id: lead.owner_id ?? null,
      company_id: lead.company_id ?? null,
      external_id: lead.external_id ?? null,
    })
    .select()
    .single();

  if (error) {
    console.error("[LEADS] Erro ao salvar:", error);
    throw new Error(error.message);
  }

  return data;
}

export async function listLeads(ownerId?: string) {
  let query = supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });

  if (ownerId) {
    query = query.eq("owner_id", ownerId);
  }

  const { data, error } = await query;

  if (error) {
    console.error("[LEADS] Erro ao listar:", error);
    throw new Error(error.message);
  }

  return data ?? [];
}

export async function updateLeadStatus(
  id: string,
  status: PipelineStage,
  externalId?: string
) {
  const { data, error } = await supabase
    .from("leads")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("[LEADS] Erro ao atualizar status:", error);
    throw new Error(error.message);
  }

  if (status === "Perdido" && externalId) {
    await releaseCompany(externalId);
  }

  return data;
}

export async function deleteLead(id: string, externalId?: string) {
  const { error } = await supabase
    .from("leads")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("[LEADS] Erro ao excluir:", error);
    throw new Error(error.message);
  }

  if (externalId) {
    await releaseCompany(externalId);
  }
}
