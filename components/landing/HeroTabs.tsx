"use client";

import { useState } from "react";
import { useFreeSearchLimit } from "@/lib/hooks/useFreeSearchLimit";
import SearchLimitBanner from "@/components/SearchLimitBanner";
import Link from "next/link";
import RadarLoader from "@/components/ui/RadarLoader";

export default function HeroTabs() {
  const [activeTab, setActiveTab] = useState<"buscar" | "analisar">("buscar");

  const [empresa, setEmpresa] = useState("");
  const { blocked, incrementAndCheck, remaining, isLogged } = useFreeSearchLimit();

  const [buscaState, setBuscaState] = useState("PE");
  const [buscaCity, setBuscaCity] = useState("");
  const [buscaCategory, setBuscaCategory] = useState("");
  const [buscaLoading, setBuscaLoading] = useState(false);
  const [buscaError, setBuscaError] = useState<string | null>(null);
  const [buscaResults, setBuscaResults] = useState<any[] | null>(null);

  async function handleBuscar() {
    if (!buscaCategory.trim()) {
      setBuscaError("Informe a categoria.");
      return;
    }
    setBuscaLoading(true);
    setBuscaError(null);
    setBuscaResults(null);

    try {
      const res = await fetch("/api/scanner/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ state: buscaState, city: buscaCity, category: buscaCategory }),
      });
      const data = await res.json();
      if (!res.ok) {
        setBuscaError(data?.error ?? "Erro ao buscar empresas.");
        return;
      }
      setBuscaResults(data.companies ?? []);
    } catch {
      setBuscaError("Erro de conexão. Tente novamente.");
    } finally {
      setBuscaLoading(false);
    }
  }

  function analisar() {
    if (!empresa.trim()) return;
    const isBlocked = incrementAndCheck();
    if (isBlocked) return;
    window.open(
      "/scanner/result/" + encodeURIComponent(empresa.trim()),
      "_blank",
      "noopener,noreferrer"
    );
  }

  return (
    <>
      <div className="mt-8 w-full px-4 sm:px-0 sm:max-w-2xl mx-auto">
        {/* Tabs */}
        <div className="flex bg-neutral-900 border border-neutral-700 rounded-xl p-1 mb-0">
          <button
            onClick={() => setActiveTab("buscar")}
            className={`flex-1 py-3 px-4 rounded-lg text-sm font-bold transition ${
              activeTab === "buscar"
                ? "bg-green-500 text-black"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            🎯 Buscar Oportunidades
          </button>
          <button
            onClick={() => setActiveTab("analisar")}
            className={`flex-1 py-3 px-4 rounded-lg text-sm font-bold transition ${
              activeTab === "analisar"
                ? "bg-green-500 text-black"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            🔍 Analisar Empresa
          </button>
        </div>

        {/* Tab Content */}
        <div className="bg-neutral-950 border border-neutral-700 border-t-0 rounded-b-2xl p-6">
          {activeTab === "buscar" ? (
            <div>
              <p className="text-neutral-400 text-sm mb-4">Encontre empresas por região e categoria</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-neutral-400 text-xs mb-1">Estado</label>
                  <input
                    value={buscaState}
                    onChange={(e) => setBuscaState(e.target.value.toUpperCase())}
                    maxLength={2}
                    placeholder="PE"
                    className="w-full p-3 rounded-lg bg-neutral-800 border border-neutral-700 text-white uppercase text-sm outline-none focus:border-green-400 transition"
                  />
                </div>
                <div>
                  <label className="block text-neutral-400 text-xs mb-1">Cidade</label>
                  <input
                    value={buscaCity}
                    onChange={(e) => setBuscaCity(e.target.value)}
                    placeholder="Carpina"
                    className="w-full p-3 rounded-lg bg-neutral-800 border border-neutral-700 text-white text-sm outline-none focus:border-green-400 transition"
                  />
                </div>
                <div>
                  <label className="block text-neutral-400 text-xs mb-1">Categoria</label>
                  <input
                    value={buscaCategory}
                    onChange={(e) => setBuscaCategory(e.target.value)}
                    placeholder="Dentista"
                    className="w-full p-3 rounded-lg bg-neutral-800 border border-neutral-700 text-white text-sm outline-none focus:border-green-400 transition"
                  />
                </div>
              </div>

              <button
                onClick={handleBuscar}
                disabled={buscaLoading}
                className="mt-4 w-full bg-green-500 hover:bg-green-400 transition text-black font-bold py-3.5 rounded-lg text-lg disabled:opacity-60"
              >
                {buscaLoading ? "Buscando... (até 45s)" : "🔍 Buscar Oportunidades"}
              </button>

              {buscaLoading && (
                <div className="mt-4 flex justify-center py-6">
                  <RadarLoader text="Buscando empresas na região..." />
                </div>
              )}

              {buscaError && (
                <div className="mt-4 bg-red-950 border border-red-700 rounded-lg p-3 text-red-300 text-sm">
                  {buscaError}
                </div>
              )}

              {buscaResults && (
                <div className="mt-4 max-h-64 overflow-y-auto space-y-2">
                  {buscaResults.length === 0 ? (
                    <p className="text-neutral-500 text-sm text-center py-4">Nenhuma empresa encontrada.</p>
                  ) : (
                    <>
                      <p className="text-neutral-400 text-xs mb-2">{buscaResults.length} empresas encontradas</p>
                      {buscaResults.map((c: any, i: number) => (
                        <div key={i} className="bg-neutral-800 border border-neutral-700 rounded-lg p-3">
                          <div className="flex items-center justify-between">
                            <div className="min-w-0">
                              <p className="text-sm font-medium truncate">{c.name}</p>
                              <p className="text-xs text-neutral-500">{c.city} · {c.category}</p>
                              <div className="mt-1 space-y-0.5">
                                {c.phone && (
                                  <p className="text-xs text-neutral-400 truncate">📞 {c.phone}</p>
                                )}
                                {c.instagram && (
                                  <p className="text-xs text-purple-400 truncate">
                                    📸{" "}
                                    <a
                                      href={c.instagram.startsWith("http") ? c.instagram : `https://www.instagram.com/${c.instagram.replace(/^@/, "")}`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="hover:text-purple-300 underline"
                                    >
                                      {c.instagram.startsWith("http")
                                        ? c.instagram.replace(/^https?:\/\/(www\.)?instagram\.com\//, "@")
                                        : c.instagram}
                                    </a>
                                  </p>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center gap-2 ml-3 shrink-0">
                              <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                                (c.opportunityScore ?? 0) >= 70 ? "bg-green-500/20 text-green-400" :
                                (c.opportunityScore ?? 0) >= 40 ? "bg-yellow-500/20 text-yellow-400" :
                                "bg-neutral-700 text-neutral-400"
                              }`}>
                                {c.opportunityScore}
                              </span>
                              <a
                                href={`/scanner/result/${encodeURIComponent(c.name)}?city=${encodeURIComponent(c.city || "")}&state=${encodeURIComponent(c.state || "")}&category=${encodeURIComponent(c.category || "")}&placeId=${encodeURIComponent(c.googlePlaceId || "")}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs bg-green-500 hover:bg-green-400 text-black font-bold px-2.5 py-1 rounded-md transition"
                              >
                                Analisar
                              </a>
                            </div>
                          </div>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div>
              <p className="text-neutral-400 text-sm mb-4">Analise a presença digital de qualquer empresa</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  value={empresa}
                  onChange={(e) => setEmpresa(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") analisar();
                  }}
                  placeholder="Nome, CNPJ, site ou link do Google Maps"
                  className="flex-1 p-4 rounded-xl bg-neutral-800 border border-neutral-700 text-white text-lg outline-none focus:border-green-400 transition"
                />
                <button
                  onClick={analisar}
                  disabled={blocked}
                  className="bg-green-500 hover:bg-green-400 transition text-black font-bold py-4 px-8 rounded-xl text-lg disabled:opacity-60"
                >
                  🚀 Analisar
                </button>
              </div>
              <p className="mt-3 text-neutral-500 text-sm">
                {isLogged
                  ? "Buscas ilimitadas. Aproveite o Radar Vivo!"
                  : remaining() > 0
                  ? `${remaining()} busca${remaining() > 1 ? "s" : ""} grátis restante${remaining() > 1 ? "s" : ""}. Depois, teste 3 dias grátis.`
                  : "Crie sua conta para continuar analisando."}
              </p>
            </div>
          )}
        </div>
      </div>

      {!isLogged && blocked && <SearchLimitBanner remaining={remaining()} isLogged={isLogged} />}
    </>
  );
}
