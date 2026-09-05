import { NextResponse } from "next/server";
import { listLeads } from "@/lib/services/leads-service";
import { createSupabaseServerClient } from "@/lib/supabase-server";

export const dynamic = "force-dynamic";

function escapeCsv(value: unknown): string {
  const text = String(value ?? "");
  if (/[";\n]/.test(text)) {
    return `"${text.replace(/"/g, '""')}"`;
  }
  return text;
}

export async function GET() {
  try {
    const supabase = await createSupabaseServerClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: "Faça login para exportar seus leads." },
        { status: 401 }
      );
    }

    const leads = await listLeads(user.id);

    const headers = [
      "Nome",
      "WhatsApp",
      "Empresa",
      "Cidade",
      "Categoria",
      "Score",
      "Prioridade",
      "Status",
      "Data",
    ];

    const rows = leads.map((lead) =>
      [
        lead.name,
        `55${lead.whatsapp}`,
        lead.company,
        lead.city,
        lead.category,
        lead.score,
        lead.priority,
        lead.status,
        lead.created_at,
      ]
        .map(escapeCsv)
        .join(";")
    );

    const csv = [headers.join(";"), ...rows].join("\n");

    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition":
          'attachment; filename="leads-radar-vivo.csv"',
      },
    });
  } catch (error) {
    console.error("[API LEADS EXPORT]", error);

    return NextResponse.json(
      { error: "Não foi possível exportar os leads." },
      { status: 500 }
    );
  }
}
