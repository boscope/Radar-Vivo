import { NextResponse } from "next/server";
import { collectCompanyData } from "@/lib/collector";
import { checkSearchQuota } from "@/lib/quota";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const input: string = (body?.input ?? "").toString().trim();
    const city: string = (body?.city ?? "").toString().trim();
    const state: string = (body?.state ?? "").toString().trim();
    const category: string = (body?.category ?? "").toString().trim();
    const placeId: string = (body?.placeId ?? "").toString().trim();

    if (!input) {
      return NextResponse.json(
        { error: "Informe uma empresa, CNPJ, site ou link do Google Maps." },
        { status: 400 }
      );
    }

    const quota = await checkSearchQuota(request as any);

    if (!quota.ok) {
      return NextResponse.json(
        { error: quota.error, needUpgrade: true },
        { status: quota.status }
      );
    }

    const data = await collectCompanyData(input, {
      city,
      state,
      category,
      placeId: placeId || undefined,
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error("[API ANALYZE]", error);

    return NextResponse.json(
      { error: "Não foi possível analisar a empresa. Tente novamente." },
      { status: 500 }
    );
  }
}
