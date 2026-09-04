import { NextRequest, NextResponse } from "next/server";
import { executeScannerPipeline } from "@/src/core/pipeline/scanner-pipeline";
import {
  makeExternalId,
  getCapturedIds,
  upsertCompany,
} from "@/lib/services/company-db-service";
import { createClient } from "@supabase/supabase-js";
import { isRealBusinessWebsite } from "@/lib/collector/site-collector";

export const dynamic = "force-dynamic";

async function getUserId(request: NextRequest): Promise<string | null> {
  const authHeader = request.headers.get("authorization");
  const token = authHeader?.replace("Bearer ", "");
  if (!token) return null;

  const sb = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { global: { headers: { Authorization: `Bearer ${token}` } } }
  );
  const { data: { user } } = await sb.auth.getUser();
  return user?.id ?? null;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const state: string = (body?.state ?? "").toString().trim().toUpperCase();
    const city: string = (body?.city ?? "").toString().trim();
    const category: string = (body?.category ?? "").toString().trim();

    if (!state && !city) {
      return NextResponse.json(
        { error: "Informe o estado ou a cidade." },
        { status: 400 }
      );
    }

    if (!category) {
      return NextResponse.json(
        { error: "Informe a categoria (ex.: Dentista, Barbearia, Restaurante)." },
        { status: 400 }
      );
    }

    const ownerId = await getUserId(request);

    const result = await executeScannerPipeline(city, state, category);

    const externalIds = (result.companies ?? []).map((company: any) =>
      makeExternalId(company.name, company.city, company.state)
    );

    const capturadas = await getCapturedIds(externalIds);

    const ranked = (result.companies ?? [])
      .filter((company: any) => {
        const id = makeExternalId(
          company.name,
          company.city,
          company.state
        );
        return !capturadas.has(id);
      })
      .map((company: any) => {

        const semSite = !isRealBusinessWebsite(company.url);
        const semTelefone = !company.phone;

        let score = 30;

        if (semSite) score += 45;
        if (semTelefone) score += 15;
        if (company.city) score += 10;

        let priority = "Média";

        if (score >= 70) priority = "Alta";
        if (score >= 85) priority = "Muito Alta";

        return {
          ...company,
          externalId: makeExternalId(
            company.name,
            company.city,
            company.state
          ),
          opportunityScore: score,
          priority,
        };
      })
      .sort((a: any, b: any) => b.opportunityScore - a.opportunityScore);

    if (ownerId) {
      for (const company of ranked) {
        try {
          await upsertCompany(company.externalId, {
            name: company.name,
            city: company.city,
            state: company.state,
            category: category,
            website: company.url,
            phone: company.phone,
            rating: company.rating,
            lat: company.lat,
            lon: company.lon,
            googlePlaceId: company.googlePlaceId,
            ownerId: ownerId,
          });
        } catch (e) {
          console.error("[BUSCA] Erro ao salvar empresa:", e);
        }
      }
    }

    return NextResponse.json({
      total: ranked.length,
      totalEncontradas: (result.companies ?? []).length,
      state,
      city,
      category,
      companies: ranked,
    });
  } catch (error) {
    console.error("[API BUSCA MASSA]", error);

    return NextResponse.json(
      {
        error:
          "Não foi possível buscar as empresas. O servidor de dados públicos pode estar temporariamente indisponível. Tente novamente em instantes.",
      },
      { status: 500 }
    );
  }
}
