"use client";

import { useState } from "react";
import { useFreeSearchLimit } from "@/lib/hooks/useFreeSearchLimit";
import SearchLimitBanner from "@/components/SearchLimitBanner";

export default function HeroSearch() {
  const [empresa, setEmpresa] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [instagram, setInstagram] = useState("");
  const { blocked, incrementAndCheck, remaining, isLogged } = useFreeSearchLimit();

  function analisar() {
    if (!empresa.trim()) return;

    const isBlocked = incrementAndCheck();
    if (isBlocked) return;

    const qs = new URLSearchParams();
    const wpp = whatsapp.trim();
    const ig = instagram.trim();
    if (wpp) qs.set("whatsapp", wpp.replace(/\D/g, ""));
    if (ig) qs.set("instagram", ig.replace(/^@/, ""));

    window.open(
      "/scanner/result/" + encodeURIComponent(empresa.trim()) + (qs.toString() ? `?${qs}` : ""),
      "_blank",
      "noopener,noreferrer"
    );
  }

  return (
    <>
      <div className="mt-8 max-w-2xl bg-neutral-950 border border-neutral-700 rounded-2xl p-6">
        <label className="block text-neutral-300 text-sm font-semibold mb-3">
          Analise qualquer empresa grátis agora
        </label>

        <div className="flex flex-col sm:flex-row gap-3">
          <input
            value={empresa}
            onChange={(e) => setEmpresa(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") analisar();
            }}
            placeholder="Nome, CNPJ, site ou link do Google Maps"
            className="flex-1 p-4 rounded-xl bg-neutral-900 border border-neutral-700 text-white text-lg outline-none focus:border-green-400 transition"
          />

          <button
            onClick={analisar}
            disabled={blocked}
            className="bg-green-500 hover:bg-green-400 transition text-black font-bold py-4 px-8 rounded-xl text-lg disabled:opacity-60"
          >
            🚀 Analisar
          </button>
        </div>

        <div className="mt-4 flex flex-col sm:flex-row gap-3">
          <input
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
            placeholder="WhatsApp (opcional) — ex: (81) 91194-974"
            className="flex-1 p-3 rounded-xl bg-neutral-900 border border-neutral-700 text-white text-sm outline-none focus:border-green-400 transition"
          />
          <input
            value={instagram}
            onChange={(e) => setInstagram(e.target.value)}
            placeholder="Instagram (opcional) — ex: baratocarveiculos"
            className="flex-1 p-3 rounded-xl bg-neutral-900 border border-neutral-700 text-white text-sm outline-none focus:border-green-400 transition"
          />
        </div>

        <p className="mt-3 text-neutral-500 text-xs">
          Se você for o dono, confirme seus canais acima — o Google não
          expõe WhatsApp/Instagram de muitos perfis, e a confirmação garante
          um diagnóstico justo.
        </p>

        <p className="mt-2 text-neutral-500 text-sm">
          {isLogged
            ? "Você tem até 3 dias de teste grátis com acesso total. Depois, 3 buscas por dia no plano grátis."
            : remaining() > 0
            ? `${remaining()} busca${remaining() > 1 ? "s" : ""} grátis restante${remaining() > 1 ? "s" : ""}. Depois, teste 3 dias grátis.`
            : "Crie sua conta para continuar analisando."}
        </p>
      </div>

      {!isLogged && blocked && <SearchLimitBanner remaining={remaining()} isLogged={isLogged} />}
    </>
  );
}
