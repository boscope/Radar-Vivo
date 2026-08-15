import { NextResponse } from "next/server";
import { createLead, listLeads } from "@/lib/services/leads-service";

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

    const lead = await createLead({
      name,
      whatsapp: digits || "Sem contato",
      company: company || "Não informada",
      city: body?.city ?? undefined,
      category: body?.category ?? undefined,
      score: body?.score ?? undefined,
      priority: body?.priority ?? undefined,
    });

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
    const leads = await listLeads();
    return NextResponse.json({ leads });
  } catch (error) {
    console.error("[API LEADS]", error);

    return NextResponse.json(
      { error: "Não foi possível carregar os leads." },
      { status: 500 }
    );
  }
}
