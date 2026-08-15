import { NextResponse } from "next/server";
import {
  PIPELINE_STAGES,
  updateLeadStatus,
  deleteLead,
} from "@/lib/services/leads-service";

export const dynamic = "force-dynamic";

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const body = await request.json();

    const status: string = (body?.status ?? "").toString().trim();
    const externalId: string = (body?.externalId ?? "").toString().trim();

    if (!status || !PIPELINE_STAGES.includes(status as any)) {
      return NextResponse.json(
        { error: "Status inválido." },
        { status: 400 }
      );
    }

    const lead = await updateLeadStatus(id, status as any, externalId);

    return NextResponse.json({ success: true, lead });
  } catch (error) {
    console.error("[API LEAD STATUS]", error);

    return NextResponse.json(
      { error: "Não foi possível atualizar o status." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

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
