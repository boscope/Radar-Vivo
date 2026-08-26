import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export type CapturedCompany = {
  id: string;
  name: string;
  city: string | null;
  state: string | null;
  category: string | null;
  website: string | null;
  phone: string | null;
  radar_score: number | null;
  captured_at: string | null;
  last_checked_at: string | null;
  owner_id: string | null;
};

export function makeExternalId(
  name: string,
  city: string,
  state: string
): string {
  const base = `${name}|${state}|${city}`
    .toLowerCase()
    .replace(/[^a-z0-9|]/g, "");

  return base.slice(0, 120);
}

export type UpsertCompanyInput = {
  name: string;
  city?: string;
  state?: string;
  category?: string;
  website?: string;
  phone?: string;
  rating?: number;
  reviews?: number;
  lat?: number;
  lon?: number;
  googlePlaceId?: string;
  radarScore?: number;
  mapsUrl?: string;
  ownerId?: string;
};

export async function upsertCompany(
  externalId: string,
  input: UpsertCompanyInput
): Promise<CapturedCompany | null> {

  const values = {
    external_id: externalId,
    name: input.name,
    city: input.city ?? null,
    state: input.state ?? null,
    category: input.category ?? null,
    website: input.website ?? null,
    phone: input.phone ?? null,
    rating: input.rating ?? null,
    reviews: input.reviews ?? null,
    lat: input.lat ?? null,
    lon: input.lon ?? null,
    google_place_id: input.googlePlaceId ?? null,
    radar_score: input.radarScore ?? null,
    last_checked_at: new Date().toISOString(),
  };

  const { data: existente, error: erroBusca } = await supabase
    .from("companies")
    .select("id, status, owner_id")
    .eq("external_id", externalId)
    .maybeSingle();

  if (erroBusca) {
    console.error("[EMPRESA] Erro ao buscar existente:", erroBusca);
    throw new Error(erroBusca.message);
  }

  if (existente) {
    const { error } = await supabase
      .from("companies")
      .update(values)
      .eq("id", existente.id);

    if (error) {
      console.error("[EMPRESA] Erro ao atualizar:", error);
      throw new Error(error.message);
    }

    return { ...existente, ...values } as unknown as CapturedCompany;
  }

  const { data, error } = await supabase
    .from("companies")
    .insert({
      ...values,
      owner_id: input.ownerId ?? null,
      status: input.ownerId ? "capturada" : "disponivel",
    })
    .select()
    .single();

  if (error) {
    console.error("[EMPRESA] Erro ao inserir:", error);
    throw new Error(error.message);
  }

  return data as CapturedCompany;
}

export async function getCapturedIds(externalIds: string[]): Promise<Set<string>> {

  if (!externalIds.length) return new Set();

  const { data, error } = await supabase
    .from("companies")
    .select("external_id, owner_id, status")
    .in("external_id", externalIds);

  if (error) {
    console.error("[EMPRESA] Erro ao buscar capturadas:", error);
    throw new Error(error.message);
  }

  const capturadas = new Set<string>();

  for (const row of data ?? []) {
    const fechado = row.status === "Fechado" || row.status === "fechado" || row.status === "cliente";

    if (fechado && row.owner_id) {
      capturadas.add(row.external_id);
    }
  }

  return capturadas;
}

export async function markCaptured(
  externalId: string,
  ownerId: string
): Promise<void> {

  const { error } = await supabase
    .from("companies")
    .update({
      owner_id: ownerId,
      status: "capturada",
      captured_at: new Date().toISOString(),
    })
    .eq("external_id", externalId);

  if (error) {
    console.error("[EMPRESA] Erro ao capturar:", error);
    throw new Error(error.message);
  }
}

export async function markClosed(
  externalId: string
): Promise<void> {

  const { error } = await supabase
    .from("companies")
    .update({
      status: "Fechado",
    })
    .eq("external_id", externalId);

  if (error) {
    console.error("[EMPRESA] Erro ao fechar:", error);
    throw new Error(error.message);
  }
}

export async function releaseCompany(
  externalId: string
): Promise<void> {

  const { error } = await supabase
    .from("companies")
    .update({
      owner_id: null,
      status: "disponivel",
      captured_at: null,
    })
    .eq("external_id", externalId);

  if (error) {
    console.error("[EMPRESA] Erro ao liberar:", error);
    throw new Error(error.message);
  }
}

export async function listAvailableCompanies(
  state: string,
  city: string,
  category: string,
  limit = 25
): Promise<CapturedCompany[]> {

  let query = supabase
    .from("companies")
    .select("*")
    .eq("status", "disponivel")
    .order("radar_score", { ascending: false })
    .limit(limit);

  if (state) query = query.eq("state", state);
  if (city) query = query.ilike("city", `%${city}%`);
  if (category) query = query.ilike("category", `%${category}%`);

  const { data, error } = await query;

  if (error) {
    console.error("[EMPRESA] Erro ao listar disponíveis:", error);
    throw new Error(error.message);
  }

  return (data ?? []) as CapturedCompany[];
}

export async function touchCompaniesForMonitoring(
  externalIds: string[]
): Promise<void> {

  if (!externalIds.length) return;

  const { error } = await supabase
    .from("companies")
    .update({ last_checked_at: new Date().toISOString() })
    .in("external_id", externalIds);

  if (error) {
    console.error("[EMPRESA] Erro no toque de monitoramento:", error);
  }
}
