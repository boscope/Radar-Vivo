"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useFreeSearchLimit } from "@/lib/hooks/useFreeSearchLimit";
import SearchLimitBanner from "@/components/SearchLimitBanner";
import RadarLoader from "@/components/ui/RadarLoader";

export default function HeroSearch() {
  const router = useRouter();
  const [empresa, setEmpresa] = useState("");
  const [analisando, setAnalisando] = useState(false);
  const { blocked, incrementAndCheck, remaining, isLogged } = useFreeSearchLimit();

  function analisar() {
    if (!empresa.trim()) return;

    const isBlocked = incrementAndCheck();
    if (isBlocked) return;

    setAnalisando(true);
    router.push(
      "/scanner/result/" + encodeURIComponent(empresa.trim())
    );
  }

  return (
    <>
      <div className="mt-8 max-w-2xl bg-neutral-950 border border-neutral-700 rounded-2xl p-6">
        <label className="block text-neutral-300 text-sm font-semibold mb-3">
          Analise qualquer empresa grátis agora
        </label>

        {analisando ? (
          <div className="py-8">
            <RadarLoader text="Analisando empresa..." />
          </div>
        ) : (
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
              disabled={analisando || blocked}
              className="bg-green-500 hover:bg-green-400 transition text-black font-bold py-4 px-8 rounded-xl text-lg disabled:opacity-60"
            >
              🚀 Analisar
            </button>
          </div>
        )}

        <p className="mt-4 text-neutral-500 text-sm">
          {isLogged
            ? "Buscas ilimitadas. Aproveite o Radar Vivo!"
            : remaining() > 0
            ? `${remaining()} busca${remaining() > 1 ? "s" : ""} grátis restante${remaining() > 1 ? "s" : ""}. Depois, teste 3 dias grátis.`
            : "Crie sua conta para continuar analisando."}
        </p>
      </div>

      {!isLogged && blocked && <SearchLimitBanner remaining={remaining()} isLogged={isLogged} />}
    </>
  );
}
