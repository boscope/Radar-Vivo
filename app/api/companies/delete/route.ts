import { NextRequest, NextResponse } from "next/server";
import { getAuthUser, isAdmin, serviceRoleClient } from "@/lib/auth";

export async function DELETE(request: NextRequest) {
  try {
    const user = await getAuthUser(request);

    if (!user) {
      return NextResponse.json(
        { error: "Faça login para excluir a empresa." },
        { status: 401 }
      );
    }

    const { companyId } = await request.json();

    if (!companyId) {
      return NextResponse.json({ error: "ID da empresa não informado" }, { status: 400 });
    }

    const { data: company, error: companyError } = await serviceRoleClient()
      .from("companies")
      .select("id, owner_id")
      .eq("id", companyId)
      .maybeSingle();

    if (companyError || !company) {
      return NextResponse.json({ error: "Empresa não encontrada" }, { status: 404 });
    }

    const admin = await isAdmin(user.id);
    const isOwner = company.owner_id != null && company.owner_id === user.id;

    if (!isOwner && !admin) {
      return NextResponse.json(
        { error: "Esta empresa pertence a outro usuário." },
        { status: 403 }
      );
    }

    const { error } = await serviceRoleClient()
      .from("companies")
      .delete()
      .eq("id", companyId);

    if (error) {
      console.error("[COMPANIES DELETE]", error.message);
      return NextResponse.json({ error: "Erro ao excluir empresa" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[COMPANIES DELETE]", error);
    return NextResponse.json({ error: "Erro ao excluir empresa" }, { status: 500 });
  }
}