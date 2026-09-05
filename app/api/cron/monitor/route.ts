import { NextResponse } from "next/server";
import { serviceRoleClient } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const supabase = serviceRoleClient();

    const { data, error } = await supabase
      .from("companies")
      .select("*")
      .eq("status", "disponivel")
      .order("last_checked_at", { ascending: true })
      .limit(100);

    if (error) {
      console.error("[CRON MONITOR]", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const now = new Date().toISOString();

    for (const company of data ?? []) {
      const ultimaChecagem = company.last_checked_at
        ? new Date(company.last_checked_at).getTime()
        : 0;

      const diasDesdeChecagem = (Date.now() - ultimaChecagem) / (1000 * 60 * 60 * 24);

      if (diasDesdeChecagem >= 1) {
        await supabase
          .from("companies")
          .update({
            last_checked_at: now,
          })
          .eq("id", company.id);
      }
    }

    return NextResponse.json({
      ok: true,
      processadas: data?.length ?? 0,
      timestamp: now,
    });
  } catch (error) {
    console.error("[CRON MONITOR]", error);
    return NextResponse.json({ error: "Falha no monitoramento." }, { status: 500 });
  }
}