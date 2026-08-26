import { NextRequest, NextResponse } from "next/server";
import { createLead, listLeads } from "@/lib/services/leads-service";
import { markCaptured } from "@/lib/services/company-db-service";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

function normalizeWhatsapp(value: string): string {
  return value.replace(/\D/g, "").replace(/^0+/, "");
}

async function getAuthUser(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  const token = authHeader?.replace("Bearer ", "");

  if (token) {
    const sb = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      { global: { headers: { Authorization: `Bearer ${token}` } } }
    );
    const { data: { user } } = await sb.auth.getUser();
    if (user) return user;
  }

  const serverClient = await createSupabaseServerClient();
  const { data: { user } } = await serverClient.auth.getUser();
  return user;
}

export async function POST(request: NextRequest) {
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

    const user = await getAuthUser(request);
    const ownerId = user?.id ?? null;

    if (!ownerId) {
      return NextResponse.json(
        { error: "Faça login para salvar no pipeline." },
        { status: 401 }
      );
    }

    const lead = await createLead({
      name,
      whatsapp: digits || "Sem contato",
      company: company || "Não informada",
      city: body?.city ?? undefined,
      state: body?.state ?? undefined,
      category: body?.category ?? undefined,
      score: body?.score ?? undefined,
      priority: body?.priority ?? undefined,
      owner_id: ownerId,
      external_id: externalId || undefined,
    });

    if (externalId && ownerId) {
      await markCaptured(externalId, ownerId);
    }

    return NextResponse.json({ success: true, lead, captured: Boolean(externalId && ownerId) });
  } catch (error) {
    console.error("[API LEADS]", error);

    return NextResponse.json(
      { error: "Não foi possível salvar seu contato. Tente novamente." },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const user = await getAuthUser(request);
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
