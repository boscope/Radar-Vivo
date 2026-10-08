"use client";

import { useState } from "react";
import { createBrowserClient } from "@supabase/ssr";

type Props = {
  companyName: string;
  city?: string;
  state?: string;
  category?: string;
  placeId?: string;
  phone?: string;
  compact?: boolean;
};

function normalizarTelefone(phone?: string): string | null {
  if (!phone) return null;
  const digits = phone.replace(/\D/g, "");
  if (digits.length < 10) return null;
  return digits.startsWith("55") ? digits : `55${digits}`;
}

function mensagemPadrao(
  companyName: string,
  link: string,
  city?: string
) {
  const local = city ? ` em ${city}` : "";
  return `Oi! 👋

Montei uma análise gratuita da presença digital da ${companyName}${local} no Google.
Leva 2 minutos e mostra o que está faltando e quanto a empresa pode estar perdendo por mês em vendas:

${link}

Dá uma olhada — qualquer dúvida eu te explico.`;
}

export default function GerarAbordagem({
  companyName,
  city,
  state,
  category,
  placeId,
  phone,
  compact = false,
}: Props) {
  const [aberto, setAberto] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [link, setLink] = useState("");
  const [copiado, setCopiado] = useState<"link" | "msg" | null>(null);
  const [logado, setLogado] = useState(true);

  async function abrir() {
    let ownerId = "";
    try {
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );
      const { data } = await supabase.auth.getSession();
      ownerId = data.session?.user?.id ?? "";
      setLogado(Boolean(ownerId));
    } catch {
      ownerId = "";
      setLogado(false);
    }

    // Nunca envia a cidade-placeholder como se fosse real.
    const cidadeValida =
      city && !/^cidade n/i.test(city.trim()) ? city : "";

    const params = new URLSearchParams();
    if (cidadeValida) params.set("city", cidadeValida);
    if (state && !/^cidade n/i.test(state.trim())) params.set("state", state);
    if (category) params.set("category", category);
    if (placeId) params.set("placeId", placeId);
    if (ownerId) params.set("ownerId", ownerId);

    const qs = params.toString();
    const urlAlvo = `${window.location.origin}/relatorio/${encodeURIComponent(
      companyName
    )}${qs ? `?${qs}` : ""}`;

    // Tenta encurtar via /api/short-link (link /r/... é mais curto e robusto).
    let linkFinal = urlAlvo;
    try {
      const res = await fetch("/api/short-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: urlAlvo }),
      });
      const data = await res.json();
      if (data.shortUrl) linkFinal = data.shortUrl;
    } catch {}

    setLink(linkFinal);
    setMensagem(mensagemPadrao(companyName, linkFinal, cidadeValida));
    setCopiado(null);
    setAberto(true);
  }

  async function copiar(texto: string, tipo: "link" | "msg") {
    await navigator.clipboard.writeText(texto);
    setCopiado(tipo);
    setTimeout(() => setCopiado(null), 2000);
  }

  const telefone = normalizarTelefone(phone);
  const waUrl = telefone
    ? `https://wa.me/${telefone}?text=${encodeURIComponent(mensagem)}`
    : null;

  return (
    <>
      <button
        onClick={abrir}
        title="Gerar abordagem"
        className={
          compact
            ? "text-xs bg-blue-600 hover:bg-blue-500 text-white px-2.5 py-1 rounded-md font-bold transition"
            : "text-xs bg-blue-600 hover:bg-blue-500 text-white px-3 py-2 rounded-lg font-bold transition"
        }
      >
        {compact ? "📲 Abordagem" : "📲 Gerar abordagem"}
      </button>

      {aberto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
          <div className="bg-neutral-900 border border-neutral-700 rounded-xl w-full max-w-lg p-6 relative">
            <button
              onClick={() => setAberto(false)}
              className="absolute top-3 right-3 text-neutral-400 hover:text-white transition text-xl"
              aria-label="Fechar"
            >
              ×
            </button>

            <h3 className="text-lg font-bold mb-1">📲 Abordagem pronta</h3>
            <p className="text-neutral-400 text-xs mb-4">
              Envie o link + mensagem para <strong>{companyName}</strong>. O
              relatório abre como uma página com a sua marca.
            </p>

            {!logado && (
              <div className="mb-4 p-3 bg-amber-950/50 border border-amber-700/50 rounded-lg">
                <p className="text-amber-300 text-xs">
                  💡 Você não está logado. <a href="/auth/login" className="underline font-bold">Entre na sua conta</a> para o relatório sair com a marca da sua agência.
                </p>
              </div>
            )}

            <label className="block text-xs font-bold text-neutral-400 mb-1">
              Link do relatório (com sua marca)
            </label>
            <div className="flex gap-2 mb-4">
              <input
                readOnly
                value={link}
                onFocus={(e) => e.currentTarget.select()}
                className="flex-1 bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-neutral-300 focus:outline-none"
              />
              <button
                onClick={() => copiar(link, "link")}
                className="text-xs bg-neutral-800 hover:bg-neutral-700 text-neutral-200 px-3 py-2 rounded-lg border border-neutral-700 whitespace-nowrap"
              >
                {copiado === "link" ? "✓ Copiado" : "Copiar"}
              </button>
            </div>

            <label className="block text-xs font-bold text-neutral-400 mb-1">
              Mensagem (edite se quiser)
            </label>
            <textarea
              value={mensagem}
              onChange={(e) => setMensagem(e.target.value)}
              rows={9}
              className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-neutral-300 focus:outline-none mb-4 whitespace-pre-line"
            />
            <div className="flex gap-2">
              <button
                onClick={() => copiar(mensagem, "msg")}
                className="flex-1 text-xs bg-green-600 hover:bg-green-500 text-black font-bold px-3 py-2 rounded-lg transition"
              >
                {copiado === "msg" ? "✓ Copiado!" : "Copiar mensagem"}
              </button>
              {waUrl && (
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center text-xs bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-3 py-2 rounded-lg transition"
                >
                  Abrir WhatsApp
                </a>
              )}
            </div>

            <p className="text-neutral-500 text-[11px] mt-4">
              💡 Envie como oferta de valor, não como venda. O dono abre um
              diagnóstico sobre a própria empresa — é isso que abre a conversa.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
