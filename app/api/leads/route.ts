import { NextResponse } from "next/server";
import { createLead, listLeads } from "@/lib/services/leads-service";
import { markCaptured } from "@/lib/services/company-db-service";
import { createSupabaseServerClient } from "@/lib/supabase-server";

export const dynamic = "force-dynamic";

function normalizeWhatsapp(value: string): string {
  return value.replace(/\D/g, "").replace(/^0+/, "");
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const name: string = (body?.name ?? "").toString().trim();
    const whatsapp: string = (body?.whatsapp ?? "").toString().trim();
    const company: string = (body?.company ?? "").toString().trim();
    const externalId: string = (body?.externalId ?? "").toString().trim();

    if (!name || name.length < 2) {
      return NextResponse.json(
        { error: "Informe seu nome." },
        { status: 400 }
      );
    }

    const digits = whatsapp ? normalizeWhatsapp(whatsapp) : "";

    if (digits && (digits.length < 10 || digits.length > 13)) {
      return NextResponse.json(
        { error: "Informe um WhatsApp válido com DDD (ex.: 11999998888)." },
        { status: 400 }
      );
    }

    const supabase = await createSupabaseServerClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const ownerId = user?.id ?? null;

    const lead = await createLead({
      name,
      whatsapp: digits || "Sem contato",
      company: company || "Não informada",
      city: body?.city ?? undefined,
      state: body?.state ?? undefined,
      category: body?.category ?? undefined,
      score: body?.score ?? undefined,
      priority: body?.priority ?? undefined,
      owner_id: ownerId ?? undefined,
      external_id: externalId || undefined,
    });

    if (externalId && ownerId) {
      await markCaptured(externalId, ownerId);
    }

    if (process.env.RESEND_API_KEY) {
      try {
        const { Resend } = await import("resend");
        const resend = new Resend(process.env.RESEND_API_KEY);
        await resend.emails.send({
          from: "Radar Vivo <onboarding@resend.dev>",
          to: "radarvivocontato@gmail.com",
          subject: `[Novo Lead] ${name} - ${company || "Sem empresa"}`,
          text: [
            `Novo lead capturado!`,
            ``,
            `Nome: ${name}`,
            `WhatsApp: ${whatsapp}`,
            `Empresa: ${company || "Não informada"}`,
            `Cidade: ${body?.city || "Não informada"}`,
            `Categoria: ${body?.category || "Não informada"}`,
            `Score: ${body?.score || "N/A"}`,
            `Prioridade: ${body?.priority || "N/A"}`,
          ].join("\n"),
        });
      } catch (e) {
        console.error("[LEADS] Erro ao enviar email:", e);
      }
    }

    return NextResponse.json({ success: true, lead });
  } catch (error) {
    console.error("[API LEADS]", error);

    return NextResponse.json(
      { error: "Não foi possível salvar seu contato. Tente novamente." },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const supabase = await createSupabaseServerClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const leads = await listLeads(user?.id);

    return NextResponse.json({ leads });
  } catch (error) {
    console.error("[API LEADS]", error);

    return NextResponse.json(
      { error: "Não foi possível carregar os leads." },
      { status: 500 }
    );
  }
}
