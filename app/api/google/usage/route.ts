import { NextResponse } from "next/server";

import {
  getGoogleUsageStatus,
} from "@/lib/collector/google-usage";

export const dynamic = "force-dynamic";

export async function GET() {

  const status = await getGoogleUsageStatus();

  return NextResponse.json(status);

}
