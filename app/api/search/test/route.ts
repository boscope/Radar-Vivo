import { NextRequest, NextResponse } from "next/server";
import { scanCompanies } from "@/src/core/services/google-scanner";

export async function POST(req: NextRequest) {

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
