import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

async function requireAdmin(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  const token = authHeader?.replace("Bearer ", "");
  if (!token) return { error: "Não autenticado", admin: null, supabase: null };

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { global: { headers: { Authorization: `Bearer ${token}` } } }
  );

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Token inválido", admin: null, supabase: null };

  const adminSupabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data: profile } = await adminSupabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin") {
    return { error: "Sem permissão", admin: null, supabase: null };
  }

  return { error: null, admin: adminSupabase, supabase };
}

// GET - Listar todos os usuários
export async function GET(request: NextRequest) {
  const { error, admin } = await requireAdmin(request);
  if (error) return NextResponse.json({ error }, { status: 403 });

  const url = new URL(request.url);
  const search = url.searchParams.get("search") || "";
  const status = url.searchParams.get("status") || "";
  const plan = url.searchParams.get("plan") || "";

  let query = admin!
    .from("profiles")
    .select("id, email, full_name, plan, subscription_status, subscription_current_period_end, role, created_at")
    .order("created_at", { ascending: false });

  if (search) {
    query = query.or(`email.ilike.%${search}%,full_name.ilike.%${search}%`);
  }
  if (status) {
    query = query.eq("subscription_status", status);
  }
  if (plan) {
    query = query.eq("plan", plan);
  }

  const { data, error: queryError } = await query;

  if (queryError) {
    return NextResponse.json({ error: queryError.message }, { status: 500 });
  }

  return NextResponse.json({ users: data ?? [] });
}

// PATCH - Atualizar usuário (plano, role, status)
export async function PATCH(request: NextRequest) {
  const { error, admin } = await requireAdmin(request);
  if (error) return NextResponse.json({ error }, { status: 403 });

  const body = await request.json();
  const { userId, plan, role, subscription_status } = body;

  if (!userId) {
    return NextResponse.json({ error: "userId obrigatório" }, { status: 400 });
  }

  const updates: Record<string, string> = {};
  if (plan !== undefined) updates.plan = plan;
  if (role !== undefined) updates.role = role;
  if (subscription_status !== undefined) updates.subscription_status = subscription_status;

  const { error: updateError } = await admin!
    .from("profiles")
    .update(updates)
    .eq("id", userId);

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

// DELETE - Excluir usuário
export async function DELETE(request: NextRequest) {
  const { error, admin } = await requireAdmin(request);
  if (error) return NextResponse.json({ error }, { status: 403 });

  const url = new URL(request.url);
  const userId = url.searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "userId obrigatório" }, { status: 400 });
  }

  // Don't let admin delete themselves
  const { data: { user: currentUser } } = await admin!.auth.getUser();
  if (userId === currentUser?.id) {
    return NextResponse.json({ error: "Não é possível excluir a si mesmo" }, { status: 400 });
  }

  // Delete from auth (this cascades to profiles via FK)
  const { error: deleteError } = await admin!.auth.admin.deleteUser(userId);

  if (deleteError) {
    return NextResponse.json({ error: deleteError.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
