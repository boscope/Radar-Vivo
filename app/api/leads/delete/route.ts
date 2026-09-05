import { NextRequest, NextResponse } from "next/server";
import { getAuthUser, isAdmin, serviceRoleClient } from "@/lib/auth";

export async function DELETE(request: NextRequest) {
  try {
    const user = await getAuthUser(request);

    if (!user) {
      return NextResponse.json(
        { error: "Faça login para excluir o lead." },
        { status: 401 }
      );
    }

    const { leadId } = await request.json();

    if (!leadId) {
      return NextResponse.json({ error: "ID do lead não informado" }, { status: 400 });
    }

    const { data: lead, error: leadError } = await serviceRoleClient()
      .from("leads")
      .select("id, owner_id")
      .eq("id", leadId)
      .maybeSingle();

    if (leadError || !lead) {
      return NextResponse.json({ error: "Lead não encontrado" }, { status: 404 });
    }

    if (lead.owner_id !== user.id && !(await isAdmin(user.id))) {
      return NextResponse.json(
        { error: "Este lead pertence a outro usuário." },
        { status: 403 }
      );
    }

    const { error } = await serviceRoleClient()
      .from("leads")
      .delete()
      .eq("id", leadId);

    if (error) {
      console.error("[LEADS DELETE]", error.message);
      return NextResponse.json({ error: "Erro ao excluir lead" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[LEADS DELETE]", error);
    return NextResponse.json({ error: "Erro ao excluir lead" }, { status: 500 });
  }
}