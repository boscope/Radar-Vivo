import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function generateId(): string {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let id = "";
  for (let i = 0; i < 7; i++) {
    id += chars[Math.floor(Math.random() * chars.length)];
  }
  return id;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { url } = body;

    if (!url) {
      return NextResponse.json({ error: "url obrigatória" }, { status: 400 });
    }

    const admin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const id = generateId();

    const { error } = await admin.from("short_links").insert({
      id,
      target_url: url,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const shortUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(
      ".supabase.co",
      ""
    ).replace("https://", "")}/r/${id}`;

    return NextResponse.json({
      shortUrl: `https://www.radarvivo.com.br/r/${id}`,
      id,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao criar link" },
      { status: 500 }
    );
  }
}
