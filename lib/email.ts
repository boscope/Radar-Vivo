const RESEND_API_KEY = process.env.RESEND_API_KEY;
const FROM = "Radar Vivo <contato@radarvivo.com.br>";

type SendEmailArgs = {
  to: string;
  subject: string;
  html: string;
};

export async function sendEmail({ to, subject, html }: SendEmailArgs) {
  if (!RESEND_API_KEY) {
    console.warn("[EMAIL] RESEND_API_KEY não configurada, email ignorado");
    return { ok: false };
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM,
        to,
        subject,
        html,
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      console.error("[EMAIL] Erro ao enviar:", res.status, body);
      return { ok: false };
    }

    return { ok: true };
  } catch (e) {
    console.error("[EMAIL] Exceção:", e);
    return { ok: false };
  }
}

export function welcomeEmailTemplate(fullName: string) {
  const name = fullName?.split(" ")[0] || "";
  return `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:Arial,sans-serif;">
  <div style="max-width:560px;margin:0 auto;padding:40px 24px;">
    <div style="text-align:center;margin-bottom:32px;">
      <span style="font-size:24px;font-weight:bold;color:#22c55e;">Radar</span><span style="font-size:24px;font-weight:bold;color:#ffffff;">Vivo</span>
    </div>

    <div style="background:#141414;border:1px solid #262626;border-radius:16px;padding:32px;">
      <h1 style="color:#ffffff;font-size:20px;margin:0 0 16px;">Bem-vindo${name ? `, ${name}` : ""}! 👋</h1>

      <p style="color:#a3a3a3;font-size:15px;line-height:1.6;margin:0 0 16px;">
        Sua conta foi criada e você já pode começar a analisar empresas.
      </p>

      <p style="color:#a3a3a3;font-size:15px;line-height:1.6;margin:0 0 24px;">
        Seu <strong style="color:#22c55e;">teste de 3 dias</strong> começou agora.
        Nesse período você tem acesso completo à plataforma:
      </p>

      <ul style="color:#a3a3a3;font-size:15px;line-height:1.8;padding-left:20px;margin:0 0 24px;">
        <li>Análise completa de presença digital no Google</li>
        <li>Gestão de leads com pipeline de vendas</li>
        <li>Relatórios white-label com sua marca</li>
        <li>Comparativo com concorrentes</li>
      </ul>

      <div style="text-align:center;margin:32px 0;">
        <a href="https://www.radarvivo.com.br/dashboard"
           style="background:#22c55e;color:#000000;text-decoration:none;font-weight:bold;padding:14px 32px;border-radius:10px;display:inline-block;font-size:15px;">
          Começar agora
        </a>
      </div>

      <p style="color:#737373;font-size:13px;line-height:1.6;margin:0;">
        Qualquer dúvida, é só responder esse email.
      </p>
    </div>

    <p style="color:#525252;font-size:12px;text-align:center;margin-top:24px;">
      Radar Vivo © ${new Date().getFullYear()} · Você recebeu este email porque criou uma conta
    </p>
  </div>
</body>
</html>
`;
}

export function trialEndingEmailTemplate(fullName: string, daysLeft: number) {
  const name = fullName?.split(" ")[0] || "";
  return `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:Arial,sans-serif;">
  <div style="max-width:560px;margin:0 auto;padding:40px 24px;">
    <div style="text-align:center;margin-bottom:32px;">
      <span style="font-size:24px;font-weight:bold;color:#22c55e;">Radar</span><span style="font-size:24px;font-weight:bold;color:#ffffff;">Vivo</span>
    </div>

    <div style="background:#141414;border:1px solid #f59e0b;border-radius:16px;padding:32px;">
      <h1 style="color:#ffffff;font-size:20px;margin:0 0 16px;">Falta${daysLeft > 1 ? "m" : ""} ${daysLeft} dia${daysLeft > 1 ? "s" : ""} pra terminar seu teste ⏰</h1>

      <p style="color:#a3a3a3;font-size:15px;line-height:1.6;margin:0 0 16px;">
        Oi${name ? ` ${name}` : ""}, seu teste grátis acaba em breve — e com ele o acesso
        às análises, leads e relatórios.
      </p>

      <p style="color:#a3a3a3;font-size:15px;line-height:1.6;margin:0 0 24px;">
        Assine agora e continue transformando presença digital em clientes
        por apenas <strong style="color:#22c55e;">R$ 197/mês</strong>. Sem fidelidade, cancele quando quiser.
      </p>

      <div style="text-align:center;margin:32px 0;">
        <a href="https://www.radarvivo.com.br/dashboard"
           style="background:#22c55e;color:#000000;text-decoration:none;font-weight:bold;padding:14px 32px;border-radius:10px;display:inline-block;font-size:15px;">
          Garantir meu acesso
        </a>
      </div>

      <p style="color:#737373;font-size:13px;line-height:1.6;margin:0;">
        Já é cliente ou tem dúvidas? Responde esse email que a gente te ajuda.
      </p>
    </div>

    <p style="color:#525252;font-size:12px;text-align:center;margin-top:24px;">
      Radar Vivo © ${new Date().getFullYear()}
    </p>
  </div>
</body>
</html>
`;
}
