"use client";

import { useState } from "react";
import { useFreeSearchLimit } from "@/lib/hooks/useFreeSearchLimit";
import SearchLimitBanner from "@/components/SearchLimitBanner";
import RadarLoader from "@/components/ui/RadarLoader";

type Company = {
  name: string;
  city?: string;
  state?: string;
  category?: string;
  url?: string;
  mapsUrl?: string;
  phone?: string;
  instagram?: string;
  opportunityScore?: number;
  priority?: string;
  source?: string;
  externalId?: string;
  googlePlaceId?: string;
};

export default function BuscaMassaPage() {

  const { blocked, incrementAndCheck, remaining, isLogged } = useFreeSearchLimit();
  const [state, setState] = useState("PE");

  const [city, setCity] = useState("");

  const [category, setCategory] = useState("Dentista");

  const [carregando, setCarregando] = useState(false);

  const [erro, setErro] = useState<string | null>(null);

  const [salvos, setSalvos] = useState<string[]>([]);

  const [aviso, setAviso] = useState<string | null>(null);

  const [salvando, setSalvando] = useState<string | null>(null);

  const [resultado, setResultado] = useState<{
    total: number;
    state: string;
    city: string;
    category: string;
    companies: Company[];
  } | null>(null);

  async function buscar() {
    if (blocked) return;
    const isBlocked = incrementAndCheck();
    if (isBlocked) return;

    setErro(null);

    setCarregando(true);

    setResultado(null);

    try {

      const response = await fetch("/api/scanner/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ state, city, category }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErro(data?.error ?? "Erro ao buscar empresas.");
        return;
      }

      setResultado(data);

    } catch {

      setErro("Erro de conexão. Tente novamente.");

    } finally {

      setCarregando(false);

    }

  }

  async function salvarNoPipeline(company: Company) {

    setSalvando(company.name);

    setErro(null);

    try {

      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: company.phone
            ? `Contato · ${company.name}`
            : company.name,
          whatsapp: company.phone
            ? company.phone.replace(/\D/g, "")
            : "",
          company: company.name,
          city: company.city ?? null,
          state: company.state ?? null,
          category: company.category ?? null,
          score: company.opportunityScore ?? null,
          priority: company.priority ?? null,
          externalId: company.externalId ?? null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErro(data?.error ?? "Erro ao salvar no pipeline.");
        return;
      }

      if (data?.captured === false) {
        setAviso(
          `⚠️ ${company.name} salva no pipeline, mas você não está logado — ela pode reaparecer em buscas futuras. Faça login para reservar essa empresa pra você.`
        );
      } else {
        setAviso(null);
      }

      setSalvos((atual) => [...atual, company.name]);

    } catch {

      setErro("Erro de conexão.");

    } finally {

      setSalvando(null);

    }

  }

  const melhores =
    resultado?.companies.filter(
      (c) => c.priority === "Muito Alta" || c.priority === "Alta"
    ) ?? [];

  return (

    <main className="min-h-screen bg-black text-white">

      <div className="max-w-6xl mx-auto p-4 sm:p-6 md:p-10">

        <a
          href="/dashboard"
          className="text-green-400 hover:text-green-300"
        >
          ← Início
        </a>

        <h1 className="text-5xl font-bold mt-6">
          🎯 Busca de Oportunidades
        </h1>

        <p className="text-zinc-400 mt-3 mb-10">
          Escolha a região e a categoria. O Radar Vivo encontra as empresas
          e indica as melhores oportunidades para você oferecer seus serviços.
        </p>

        <div className="bg-zinc-900 rounded-xl p-8 border border-zinc-800">

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            <div>
              <label className="block text-zinc-400 text-sm mb-2">
                Estado (UF)
              </label>
              <input
                value={state}
                onChange={(e) => setState(e.target.value.toUpperCase())}
                placeholder="ex.: PE"
                maxLength={2}
                className="w-full p-4 rounded-lg bg-zinc-800 border border-zinc-700 text-white uppercase"
              />
            </div>

            <div>
              <label className="block text-zinc-400 text-sm mb-2">
                Cidade (opcional)
              </label>
              <input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="ex.: Recife"
                className="w-full p-4 rounded-lg bg-zinc-800 border border-zinc-700 text-white"
              />
            </div>

            <div>
              <label className="block text-zinc-400 text-sm mb-2">
                Categoria
              </label>
              <input
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="ex.: Dentista, Barbearia, Restaurante"
                className="w-full p-4 rounded-lg bg-zinc-800 border border-zinc-700 text-white"
              />
            </div>

          </div>

          <button
            onClick={buscar}
            disabled={carregando}
            className="mt-8 w-full bg-green-500 hover:bg-green-400 transition text-black font-bold py-4 rounded-lg text-xl disabled:opacity-60"
          >
            {carregando
              ? "Buscando empresas... (pode levar até 30s)"
              : "🔍 Buscar Oportunidades"}
          </button>

        </div>

        {carregando && (
          <div className="mt-8">
            <RadarLoader text="Buscando empresas na região... (pode levar até 30s)" />
          </div>
        )}

        {erro && (

          <div className="mt-8 bg-red-950 border border-red-700 rounded-xl p-6 text-red-300">
            {erro}
          </div>

        )}

        {aviso && !erro && (

          <div className="mt-8 bg-amber-950 border border-amber-600 rounded-xl p-5 text-amber-200 text-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">

            <span>{aviso}</span>

            <a
              href="/auth/login"
              className="bg-amber-500 hover:bg-amber-400 text-black font-bold px-4 py-2 rounded-lg text-xs whitespace-nowrap transition shrink-0"
            >
              Fazer login
            </a>
          </div>

        )}

        {resultado && !erro && (

          <div className="mt-10">

            <h2 className="text-2xl font-bold">
              {resultado.total} empresas encontradas
            </h2>

            <p className="text-zinc-400 mt-2 mb-8">
              {resultado.city || `Estado ${resultado.state}`} • {resultado.category}
            </p>

            {melhores.length > 0 && (

              <div className="bg-green-950 border border-green-700 rounded-xl p-6 mb-8">

                <h3 className="text-xl font-bold text-green-400">
                  🏆 Melhores oportunidades ({melhores.length})
                </h3>

                <p className="text-green-200 mt-2">
                  Empresas sem site próprio — alto potencial para seu serviço de presença digital.
                </p>

              </div>

            )}

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

              {resultado.companies.map((company, index) => {

                const score = company.opportunityScore ?? 0;

                const cor =
                  score >= 85 ? "text-red-400" :
                  score >= 70 ? "text-orange-400" :
                  "text-yellow-400";

                return (

                  <div key={index} className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">

                    <div className="flex justify-between items-start">

                      <h3 className="font-bold text-lg leading-tight">
                        {company.name}
                      </h3>

                      <span className={`text-2xl font-extrabold ${cor}`}>
                        {score}
                      </span>

                    </div>

                    <p className="text-zinc-500 text-sm mt-2">
                      {company.city ? `${company.city}, ` : ""}{company.state ?? ""}
                    </p>

                    <div className="mt-4 space-y-2 text-sm">

                      {company.url ? (
                        <p className="text-green-400">
                          ✅ Tem site
                        </p>
                      ) : (
                        <p className="text-red-400">
                          ❌ Sem site — oportunidade
                        </p>
                      )}

                      {company.phone ? (
                        <p className="text-zinc-400">
                          📞 {company.phone}
                        </p>
                      ) : (
                        <p className="text-zinc-600">
                          {company.instagram
                            ? "WhatsApp não visível — confira na bio do Instagram"
                            : "Telefone não disponível"}
                        </p>
                      )}

                      {company.instagram && (
                        <p className="text-zinc-400">
                          📸{" "}
                          <a
                            href={
                              company.instagram.startsWith("http")
                                ? company.instagram
                                : `https://www.instagram.com/${company.instagram.replace(/^@/, "")}`
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-purple-400 hover:text-purple-300 underline"
                          >
                            {company.instagram.startsWith("http")
                              ? company.instagram.replace(/^https?:\/\/(www\.)?instagram\.com\//, "@")
                              : company.instagram}
                          </a>
                        </p>
                      )}

                    </div>

                    <div className="mt-5 flex gap-2 flex-wrap">

                      {company.url && (
                        <a
                          href={company.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs bg-neutral-900 px-3 py-2 rounded-lg hover:bg-neutral-800 transition"
                        >
                          Ver site
                        </a>
                      )}

                      {company.mapsUrl && !company.url && (
                        <a
                          href={company.mapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs bg-neutral-900 px-3 py-2 rounded-lg hover:bg-neutral-800 transition"
                        >
                          Ver no mapa
                        </a>
                      )}

                      <a
                        href={`/scanner/result/${encodeURIComponent(company.name)}?city=${encodeURIComponent(company.city || "")}&state=${encodeURIComponent(company.state || "")}&category=${encodeURIComponent(company.category || "")}${company.googlePlaceId ? `&placeId=${encodeURIComponent(company.googlePlaceId)}` : ""}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs bg-green-500 text-black px-3 py-2 rounded-lg font-bold hover:bg-green-400 transition"
                      >
                        Analisar
                      </a>

                      <button
                        onClick={() => salvarNoPipeline(company)}
                        disabled={salvando === company.name}
                        className={`text-xs px-3 py-2 rounded-lg font-bold transition disabled:opacity-50 ${
                          salvos.includes(company.name)
                            ? "bg-emerald-600 text-white"
                            : "bg-neutral-900 hover:bg-neutral-800"
                        }`}
                      >
                        {salvos.includes(company.name)
                          ? "✅ No pipeline"
                          : salvando === company.name
                            ? "Salvando..."
                            : "📥 Salvar no pipeline"}
                      </button>

                    </div>

                  </div>

                );

              })}

            </div>

          </div>

        )}

      </div>

      {blocked && <SearchLimitBanner remaining={remaining()} isLogged={isLogged} />}

    </main>

  );

}
