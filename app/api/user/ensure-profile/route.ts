import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: Request) {
  const { userId, email, fullName } = await request.json();

  if (!userId || !email) {
    return NextResponse.json({ error: "Missing userId or email" }, { status: 400 });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data, error } = await supabase
    .from("profiles")
    .upsert(
      {
        id: userId,
        email,
        full_name: fullName || "",
        plan: "free",
        subscription_status: "inactive",
      },
      { onConflict: "id" }
    )
    .select()
    .single();

  if (error) {
    console.error("[ENSURE-PROFILE] Error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ profile: data });
}
