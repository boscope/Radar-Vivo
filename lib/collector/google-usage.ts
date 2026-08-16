import { supabase } from "@/lib/supabase";

export const GOOGLE_TEXT_SEARCH_FREE = 5000;
export const GOOGLE_TEXT_SEARCH_PRICE_USD = 32;
export const GOOGLE_DETAILS_FREE = 10000;
export const GOOGLE_DETAILS_PRICE_USD = 5;
export const USD_TO_BRL = 5.5;

export const MONTHLY_BUDGET_BRL = Number(
  process.env.GOOGLE_MONTHLY_BUDGET_BRL ?? 50
);

export type GoogleUsageRow = {
  id: string;
  mes: string;
  text_search_calls: number;
  details_calls: number;
  estimated_cost_brl: number;
  blocked: boolean;
  updated_at: string;
};

export function currentMonth(): string {
  return new Date().toISOString().slice(0, 7);
}

export function estimateCostBrl(
  textCalls: number,
  detailsCalls: number
): number {
  const textExtra = Math.max(
    0,
    textCalls - GOOGLE_TEXT_SEARCH_FREE
  );
  const detailsExtra = Math.max(
    0,
    detailsCalls - GOOGLE_DETAILS_FREE
  );

  const usd =
    (textExtra / 1000) * GOOGLE_TEXT_SEARCH_PRICE_USD +
    (detailsExtra / 1000) * GOOGLE_DETAILS_PRICE_USD;

  return Math.round(usd * USD_TO_BRL * 100) / 100;
}

async function getUsageRow(
  mes: string
): Promise<GoogleUsageRow | null> {
  try {
    const { data } = await supabase
      .from("google_usage")
      .select("*")
      .eq("mes", mes)
      .maybeSingle();

    return (data as GoogleUsageRow) ?? null;
  } catch (error) {
    console.error("[GOOGLE USAGE] Erro ao buscar uso:", error);
    return null;
  }
}

async function upsertUsageRow(
  mes: string,
  textCalls: number,
  detailsCalls: number
): Promise<void> {
  const cost = estimateCostBrl(textCalls, detailsCalls);
  const blocked = cost >= MONTHLY_BUDGET_BRL;

  try {
    await supabase.from("google_usage").upsert(
      {
        mes,
        text_search_calls: textCalls,
        details_calls: detailsCalls,
        estimated_cost_brl: cost,
        blocked,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "mes" }
    );
  } catch (error) {
    console.error("[GOOGLE USAGE] Erro ao gravar uso:", error);
  }
}

export async function recordGoogleUsage(
  kind: "text_search" | "details",
  count = 1
): Promise<void> {
  const mes = currentMonth();
  const row = await getUsageRow(mes);

  const textCalls =
    (row?.text_search_calls ?? 0) +
    (kind === "text_search" ? count : 0);
  const detailsCalls =
    (row?.details_calls ?? 0) +
    (kind === "details" ? count : 0);

  await upsertUsageRow(mes, textCalls, detailsCalls);
}

export async function canUseGoogle(): Promise<{
  ok: boolean;
  reason: string;
}> {
  if (!process.env.GOOGLE_API_KEY) {
    return {
      ok: false,
      reason: "GOOGLE_API_KEY não configurada.",
    };
  }

  const mes = currentMonth();
  const row = await getUsageRow(mes);

  if (row?.blocked) {
    return {
      ok: false,
      reason: `Orçamento mensal de R$ ${MONTHLY_BUDGET_BRL} atingido.`,
    };
  }

  return { ok: true, reason: "ok" };
}

export async function getGoogleUsageStatus() {
  const mes = currentMonth();
  const row = await getUsageRow(mes);

  return {
    mes,
    textSearchCalls: row?.text_search_calls ?? 0,
    detailsCalls: row?.details_calls ?? 0,
    estimatedCostBrl: row?.estimated_cost_brl ?? 0,
    budgetBrl: MONTHLY_BUDGET_BRL,
    blocked: row?.blocked ?? false,
    freeTextSearch: GOOGLE_TEXT_SEARCH_FREE,
    freeDetails: GOOGLE_DETAILS_FREE,
  };
}
