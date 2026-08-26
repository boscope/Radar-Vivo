import { NextResponse } from "next/server";
import { executeScannerPipeline } from "@/src/core/pipeline/scanner-pipeline";
import {
  makeExternalId,
  getCapturedIds,
  upsertCompany,
} from "@/lib/services/company-db-service";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
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

    const result = await executeScannerPipeline(city, state, category);

    const externalIds = (result.companies ?? []).map((company: any) =>
      makeExternalId(company.name, company.city, company.state)
    );

    const capturadas = await getCapturedIds(externalIds);

    // Salvar todas as empresas encontradas no banco pra evitar duplicatas
    for (const company of (result.companies ?? [])) {
      const eid = makeExternalId(company.name, company.city, company.state);
      if (!capturadas.has(eid)) {
        try {
          await upsertCompany(eid, {
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
          });
        } catch (e) {
          console.error("[BUSCA] Erro ao salvar empresa:", e);
        }
      }
    }

    // Re-buscar IDs capturados depois de salvar
    const capturadasFinal = await getCapturedIds(externalIds);

    const ranked = (result.companies ?? [])
      .filter((company: any) => {
        const id = makeExternalId(
          company.name,
          company.city,
          company.state
        );
        return !capturadasFinal.has(id);
      })
      .map((company: any) => {

        const semSite = !company.url;
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
