import { NextResponse } from "next/server";
import { executeScannerPipeline } from "@/src/core/pipeline/scanner-pipeline";

export async function POST(request: Request) {

  const body = await request.json();

  const result = await executeScannerPipeline(
    body.city,
    body.state,
    body.category
  );

  return NextResponse.json(result);

}
