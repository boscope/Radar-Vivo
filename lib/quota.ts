import { NextRequest } from "next/server";
import { getAuthUser, getUserProfile, serviceRoleClient } from "@/lib/auth";

export const FREE_DAILY_LIMIT = 3;
export const TRIAL_DAYS = 3;

type QuotaResult =
  | { ok: true }
  | { ok: false; error: string; status: number; needUpgrade: boolean };

export async function checkSearchQuota(
  request: NextRequest,
  increment = true
): Promise<QuotaResult> {
  const user = await getAuthUser(request);

  if (user) {
    const profile = await getUserProfile(user.id);

    if (profile) {
      const paid =
        (profile.plan === "pro" || profile.plan === "agency") &&
        profile.subscription_status === "active";

      if (paid || profile.role === "admin") {
        return { ok: true };
      }

      if (profile.subscription_status === "trialing") {
        return { ok: true };
      }

      const createdAt = new Date(user.created_at ?? Date.now()).getTime();
      const emTrial = profile.plan === "free" &&
        Date.now() < createdAt + TRIAL_DAYS * 24 * 60 * 60 * 1000;

      if (emTrial) {
        return { ok: true };
      }
    }
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "desconhecido";
  const owner = user ? `user:${user.id}` : `ip:${ip}`;
  const today = new Date().toISOString().slice(0, 10);

  const supabase = serviceRoleClient();

  const { data, error } = await supabase
    .from("search_usage")
    .select("count")
    .eq("owner", owner)
    .eq("used_on", today)
    .maybeSingle();

  if (error) {
    console.error("[QUOTA] Erro ao ler uso:", error.message);
    return { ok: true };
  }

  const used = (data?.count as number) ?? 0;

  if (used >= FREE_DAILY_LIMIT) {
    const mensagem = user
      ? "Seu teste grátis de 3 dias terminou. Assine agora para continuar com buscas ilimitadas."
      : "Você atingiu o limite de buscas grátis de hoje. Crie sua conta grátis e aproveite o teste de 3 dias — ou assine para buscas ilimitadas.";

    return {
      ok: false,
      error: mensagem,
      status: 429,
      needUpgrade: true,
    };
  }

  if (increment) {
    const { error: err } = await supabase
      .from("search_usage")
      .upsert(
        { owner, used_on: today, count: used + 1 },
        { onConflict: "owner,used_on" }
      );

    if (err) {
      console.error("[QUOTA] Erro ao registrar uso:", err.message);
    }
  }

  return { ok: true };
}