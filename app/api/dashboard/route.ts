import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  const token = authHeader?.replace("Bearer ", "");

  if (!token) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { global: { headers: { Authorization: `Bearer ${token}` } } }
  );

  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    return NextResponse.json({ error: "Token inválido" }, { status: 401 });
  }

  const admin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data: profile } = await admin
    .from("profiles")
    .select("plan, subscription_status, subscription_current_period_end")
    .eq("id", user.id)
    .single();

  const { data: leads } = await admin
    .from("leads")
    .select("id, company, status, score, created_at")
    .eq("owner_id", user.id)
    .order("created_at", { ascending: false })
    .limit(50);

  const { data: analyses } = await admin
    .from("companies")
    .select("id, name, city, category, radar_score, status, captured_at, last_checked_at")
    .eq("owner_id", user.id)
    .order("captured_at", { ascending: false })
    .limit(50);

  const totalLeads = leads?.length ?? 0;
  const activeLeads = leads?.filter((l) => l.status !== "Perdido").length ?? 0;
  const capturedCompanies = analyses?.length ?? 0;
  const avgScore = capturedCompanies > 0
    ? Math.round(
        (analyses?.reduce((sum, c) => sum + (c.radar_score ?? 0), 0) ?? 0) /
          capturedCompanies
      )
    : 0;

  return NextResponse.json({
    profile,
    stats: {
      totalLeads,
      activeLeads,
      capturedCompanies,
      avgScore,
    },
    leads: leads ?? [],
    companies: analyses ?? [],
  });
}
