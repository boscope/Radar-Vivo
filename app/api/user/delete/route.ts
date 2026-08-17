import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function DELETE(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  const token = authHeader?.replace("Bearer ", "");

  if (!token) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { global: { headers: { Authorization: `Bearer ${token}` } } }
  );

  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    return NextResponse.json({ error: "Token inválido" }, { status: 401 });
  }

  const serviceSupabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  // Deletar leads do usuário
  await serviceSupabase.from("leads").delete().eq("user_id", user.id);

  // Liberar empresas capturadas (não deletar, só desvincular)
  await serviceSupabase
    .from("companies")
    .update({ owner_id: null, status: "disponivel", captured_at: null })
    .eq("owner_id", user.id);

  // Deletar perfil
  await serviceSupabase.from("profiles").delete().eq("id", user.id);

  // Deletar usuário do Auth
  const { error: deleteError } = await serviceSupabase.auth.admin.deleteUser(user.id);
  if (deleteError) {
    console.error("[USER DELETE] Erro ao deletar usuário:", deleteError);
    return NextResponse.json({ error: "Erro ao excluir" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
