import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const ownerId = url.searchParams.get("ownerId");
  if (!ownerId) {
    return NextResponse.json({ error: "ownerId obrigatório" }, { status: 400 });
  }

  const adminSupabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data, error } = await adminSupabase
    .from("profiles")
    .select(
      "agency_name, agency_logo_url, agency_color, agency_whatsapp, agency_website"
    )
    .eq("id", ownerId)
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  if (!data) return NextResponse.json({ error: "Agência não encontrada" }, { status: 404 });

  return NextResponse.json({
    branding: {
      name: data.agency_name,
      logoUrl: data.agency_logo_url,
      color: data.agency_color,
      whatsapp: data.agency_whatsapp,
      website: data.agency_website,
    },
  });
}
