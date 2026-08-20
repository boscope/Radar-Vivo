import { NextResponse } from "next/server";
import { collectCompanyData } from "@/lib/collector";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const input: string = (body?.input ?? "").toString().trim();
    const city: string = (body?.city ?? "").toString().trim();
    const state: string = (body?.state ?? "").toString().trim();
    const category: string = (body?.category ?? "").toString().trim();

    if (!input) {
      return NextResponse.json(
        { error: "Informe uma empresa, CNPJ, site ou link do Google Maps." },
        { status: 400 }
      );
    }

    const data = await collectCompanyData(input, { city, state, category });

    return NextResponse.json(data);
  } catch (error) {
    console.error("[API ANALYZE]", error);

    return NextResponse.json(
      { error: "Não foi possível analisar a empresa. Tente novamente." },
      { status: 500 }
    );
  }
}
