import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { sendEmail, trialEndingEmailTemplate } from "@/lib/email";

export const dynamic = "force-dynamic";

const CRON_SECRET = process.env.CRON_SECRET;

export async function GET(request: Request) {
  // Proteção: Vercel Cron envia Authorization: Bearer <CRON_SECRET>
  const authHeader = request.headers.get("authorization");
  if (CRON_SECRET && authHeader !== `Bearer ${CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Trial dura 3 dias. Aviso enviado quando a conta completou 2 dias
    // (falta 1 dia). Rodando diário, cada usuário recebe exatamente 1 email.
    const twoDaysAgoStart = new Date();
    twoDaysAgoStart.setUTCDate(twoDaysAgoStart.getUTCDate() - 2);
    twoDaysAgoStart.setUTCHours(0, 0, 0, 0);

    const twoDaysAgoEnd = new Date(twoDaysAgoStart);
    twoDaysAgoEnd.setUTCDate(twoDaysAgoEnd.getUTCDate() + 1);

    const { data: profiles, error } = await supabase
      .from("profiles")
      .select("id, email, full_name")
      .eq("plan", "free")
      .gte("created_at", twoDaysAgoStart.toISOString())
      .lt("created_at", twoDaysAgoEnd.toISOString());

    if (error) {
      console.error("[CRON TRIAL]", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    let enviados = 0;
    for (const p of profiles ?? []) {
      if (!p.email) continue;

      const result = await sendEmail({
        to: p.email,
        subject: "Seu teste do Radar Vivo acaba amanhã ⏰",
        html: trialEndingEmailTemplate(p.full_name || "", 1),
      });

      if (result.ok) enviados++;
    }

    return NextResponse.json({
      ok: true,
      encontrados: profiles?.length ?? 0,
      emailsEnviados: enviados,
      timestamp: new Date().toISOString(),
    });
  } catch (e) {
    console.error("[CRON TRIAL]", e);
    return NextResponse.json({ error: "Falha no aviso de trial." }, { status: 500 });
  }
}
