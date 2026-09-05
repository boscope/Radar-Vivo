import { NextRequest, NextResponse } from "next/server";
import { scanCompanies } from "@/src/core/services/google-scanner";
import { getAuthUser } from "@/lib/auth";

export async function POST(req: NextRequest) {

  const user = await getAuthUser(req);

  if (!user) {
    return NextResponse.json(
      { error: "Faça login para executar essa busca." },
      { status: 401 }
    );
  }

  const body = await req.json();

  const result = await scanCompanies(
    body.city,
    body.state,
    body.category
  );

  return NextResponse.json({

    success: true,

    total: result.companies.length,

    companies: result.companies

  });

}
