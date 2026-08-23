import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const city = url.searchParams.get("city");
  const category = url.searchParams.get("category");
  const companyName = url.searchParams.get("company");

  if (!city || !category) {
    return NextResponse.json({ competitors: [] });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data: competitors, error } = await supabase
    .from("companies")
    .select("name, city, category, radar_score")
    .ilike("city", `%${city}%`)
    .ilike("category", `%${category}%`)
    .neq("name", companyName ?? "")
    .order("radar_score", { ascending: false, nullsFirst: false })
    .limit(5);

  if (error) {
    console.error("[COMPETITORS]", error.message);
  }

  return NextResponse.json({ competitors: competitors ?? [] });
}
