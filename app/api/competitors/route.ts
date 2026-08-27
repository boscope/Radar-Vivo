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

  const { data, error } = await supabase
    .from("companies")
    .select("name, city, category, radar_score, rating, website, phone")
    .ilike("city", `%${city}%`)
    .ilike("category", `%${category}%`)
    .neq("name", companyName ?? "")
    .limit(50);

  if (error) {
    console.error("[COMPETITORS]", error.message);
  }

  const competitors = (data ?? [])
    .map((c) => {
      const semSite = !c.website;
      const semTelefone = !c.phone;
      let score = 30;
      if (semSite) score += 45;
      if (semTelefone) score += 15;
      if (c.city) score += 10;
      if (score > 100) score = 100;
      const finalScore = c.radar_score ?? score;
      return {
        ...c,
        radar_score: finalScore,
        google_rating: c.rating,
      };
    })
    .sort((a: any, b: any) => b.radar_score - a.radar_score)
    .slice(0, 5);

  return NextResponse.json({ competitors });
}
