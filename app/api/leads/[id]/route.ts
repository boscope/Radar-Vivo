import { NextRequest, NextResponse } from "next/server";
import {
  PIPELINE_STAGES,
  updateLeadStatus,
  deleteLead,
  getLead,
} from "@/lib/services/leads-service";
import { getAuthUser, isAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const user = await getAuthUser(request);

    if (!user) {
      return NextResponse.json(
        { error: "Faça login para atualizar o status." },
        { status: 401 }
      );
    }

    const lead = await getLead(id);

    if (!lead) {
      return NextResponse.json({ error: "Lead não encontrado." }, { status: 404 });
    }

    if (lead.owner_id !== user.id && !(await isAdmin(user.id))) {
      return NextResponse.json(
        { error: "Este lead pertence a outro usuário." },
        { status: 403 }
      );
    }

    const body = await request.json();

    const status: string = (body?.status ?? "").toString().trim();
    const externalId: string = (body?.externalId ?? "").toString().trim();

    if (!status || !PIPELINE_STAGES.includes(status as any)) {
      return NextResponse.json(
        { error: "Status inválido." },
        { status: 400 }
      );
    }

    const updated = await updateLeadStatus(id, status as any, externalId);

    return NextResponse.json({ success: true, lead: updated });
  } catch (error) {
    console.error("[API LEAD STATUS]", error);

    return NextResponse.json(
      { error: "Não foi possível atualizar o status." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const user = await getAuthUser(request);

    if (!user) {
      return NextResponse.json(
        { error: "Faça login para excluir o lead." },
        { status: 401 }
      );
    }

    const lead = await getLead(id);

    if (!lead) {
      return NextResponse.json({ error: "Lead não encontrado." }, { status: 404 });
    }

    if (lead.owner_id !== user.id && !(await isAdmin(user.id))) {
      return NextResponse.json(
        { error: "Este lead pertence a outro usuário." },
        { status: 403 }
      );
    }

    const body = await request.json().catch(() => ({}));

    const externalId: string = (body?.externalId ?? "").toString().trim();

    await deleteLead(id, externalId);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[API LEAD DELETE]", error);

    return NextResponse.json(
      { error: "Não foi possível excluir o lead." },
      { status: 500 }
    );
  }
}
