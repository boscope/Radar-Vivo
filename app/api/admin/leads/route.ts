import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

async function requireAdmin(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  const token = authHeader?.replace("Bearer ", "");
  if (!token) return null;

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { global: { headers: { Authorization: `Bearer ${token}` } } }
  );

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const adminSupabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data: profile } = await adminSupabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin") return null;
  return adminSupabase;
}

export async function GET(request: NextRequest) {
  const admin = await requireAdmin(request);
  if (!admin) return NextResponse.json({ error: "Sem permissão" }, { status: 403 });

  const url = new URL(request.url);
  const search = url.searchParams.get("search") || "";
  const status = url.searchParams.get("status") || "";

  let query = admin
    .from("leads")
    .select("id, name, whatsapp, company, city, category, status, score, created_at, owner_id")
    .order("created_at", { ascending: false });

  if (status) {
    query = query.eq("status", status);
  }

  const { data: leadsData, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // Get owner emails
  const ownerIds = [...new Set((leadsData ?? []).map((l: any) => l.owner_id))];
  const { data: profiles } = await admin
    .from("profiles")
    .select("id, email")
    .in("id", ownerIds);

  const profileMap = new Map((profiles ?? []).map((p: any) => [p.id, p.email]));

  const enriched = (leadsData ?? []).map((l: any) => ({
    ...l,
    company_name: l.company,
    owner_email: profileMap.get(l.owner_id) ?? "—",
  }));

  let result = enriched;

  if (search) {
    const s = search.toLowerCase();
    result = enriched.filter((l: any) =>
      l.company.toLowerCase().includes(s) ||
      l.name.toLowerCase().includes(s) ||
      (l.owner_email ?? "").toLowerCase().includes(s)
    );
  }

  return NextResponse.json({ leads: result });
}

export async function DELETE(request: NextRequest) {
  const admin = await requireAdmin(request);
  if (!admin) return NextResponse.json({ error: "Sem permissão" }, { status: 403 });

  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "id obrigatório" }, { status: 400 });

  const { error } = await admin.from("leads").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ ok: true });
}

export async function PATCH(request: NextRequest) {
  const admin = await requireAdmin(request);
  if (!admin) return NextResponse.json({ error: "Sem permissão" }, { status: 403 });

  const body = await request.json();
  const { id, status } = body;
  if (!id || !status) return NextResponse.json({ error: "id e status obrigatórios" }, { status: 400 });

  const { error } = await admin.from("leads").update({ status }).eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ ok: true });
}
