import { NextRequest, NextResponse } from "next/server";
import { executeScannerPipeline } from "@/src/core/pipeline/scanner-pipeline";
import { getAuthUser } from "@/lib/auth";

export async function POST(request: NextRequest) {

  const user = await getAuthUser(request);

  if (!user) {
    return NextResponse.json(
      { error: "Faça login para executar essa busca." },
      { status: 401 }
    );
  }

  const body = await request.json();

  const result = await executeScannerPipeline(
    body.city,
    body.state,
    body.category
  );

  return NextResponse.json(result);

}
