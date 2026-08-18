import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "Campos obrigatórios faltando" }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "Email não configurado" }, { status: 500 });
    }

    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);

    const subjectLabels: Record<string, string> = {
      LGPD: "Direitos LGPD",
      Dados: "Dúvida sobre dados",
      Exclusão: "Exclusão de dados",
      Suporte: "Suporte técnico",
      Cobrança: "Cobrança/Pagamento",
      Outro: "Outro",
    };

    await resend.emails.send({
      from: "Radar Vivo <contato@radarvivo.com.br>",
      to: "radarvivocontato@gmail.com",
      replyTo: email,
      subject: `[${subjectLabels[subject] || subject}] ${name}`,
      text: `Nome: ${name}\nEmail: ${email}\nAssunto: ${subjectLabels[subject] || subject}\n\n${message}`,
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("[CONTACT]", error.message);
    return NextResponse.json({ error: "Erro ao enviar" }, { status: 500 });
  }
}
