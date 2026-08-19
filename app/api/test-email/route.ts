import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "RESEND_API_KEY não configurada" });
  }

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);
    const result = await resend.emails.send({
      from: "Radar Vivo <contato@radarvivo.com.br>",
      to: "radarvivocontato@gmail.com",
      subject: "[Teste Lead] Email de teste",
      text: "Se você recebeu este email, o sistema de notificação de leads está funcionando!",
    });
    return NextResponse.json({ success: true, result });
  } catch (e: any) {
    return NextResponse.json({ error: e.message });
  }
}
