"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import PresencaDigitalChecklist from "@/components/scanner/PresencaDigitalChecklist";
import ExportPdfButton from "@/components/scanner/ExportPdfButton";

type Props = {
  params: Promise<{
    empresa: string;
  }>;
};

type AgencyBrand = {
  name: string;
  logoUrl: string;
  color: string;
  whatsapp: string;
  website: string;
};

type AnaliseData = {
  companyName: string;
  city?: string;
  state?: string;
  category?: string;
  hasWebsite: boolean;
  hasSeo: boolean;
  hasWhatsapp: boolean;
  hasGoogleAds?: boolean;
  hasMetaAds?: boolean;
  hasAutomation?: boolean;
  automationTool?: string;
  googleMapsUrl?: string;
  intelligence: {
    score: {
      score: number;
      closingProbability: number;
      estimatedRevenue: number;
      priority: string;
    };
    commercial: {
      recommendedServices: string[];
    };
    diagnosis: {
      weaknesses: string[];
      strengths: string[];
    };
  };
};

export default function RelatorioPublicoPage({
  params,
}: Props) {
  const [empresa, setEmpresa] = useState("");
  const [company, setCompany] = useState<AnaliseData | null>(null);
  const [erro, setErro] = useState<string | null>(null);
  const [brand, setBrand] = useState<AgencyBrand | null>(null);
  const accentColor = brand?.color || "#22c55e";

  useEffect(() => {
    async function carregar() {
      const { empresa } = await params;
      const nomeEmpresa = decodeURIComponent(empresa);
      setEmpresa(nomeEmpresa);

      const sp = new URLSearchParams(window.location.search);
      const city = sp.get("city") || "";
      const state = sp.get("state") || "";
      const category = sp.get("category") || "";
      const placeId = sp.get("placeId") || "";
      const ownerId = sp.get("ownerId") || "";

      if (ownerId) {
        try {
          const brandRes = await fetch(`/api/agency-brand?ownerId=${ownerId}`);
          const brandData = await brandRes.json();
          if (brandData.branding) setBrand(brandData.branding);
        } catch {}
      }

      try {
        const response = await fetch("/api/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ input: nomeEmpresa, city, state, category, placeId }),
        });

        if (!response.ok) {
          const payload = await response.json();
          setErro(payload?.error ?? "Não foi possível analisar.");
          return;
        }

        setCompany(await response.json());
      } catch {
        setErro("Não foi possível analisar.");
      }
    }

    carregar();
  }, [params]);

  if (erro) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="max-w-lg text-center px-6">
          <h1 className="text-3xl font-bold mb-4">Análise não disponível</h1>
          <p className="text-neutral-400 mb-8">{erro}</p>
          <Link
            href="/"
            className="inline-block bg-green-500 hover:bg-green-400 text-black font-bold py-3 px-6 rounded-lg transition"
          >
            ← Voltar ao início
          </Link>
        </div>
      </main>
    );
  }

  if (!company) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-green-400 border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-neutral-400">Gerando análise gratuita...</p>
        </div>
      </main>
    );
  }

  const score = company.intelligence.score;

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto p-8 md:p-12">
        {brand && (
          <div className="flex items-center gap-3 mb-8 pb-6 border-b border-neutral-800">
            {brand.logoUrl ? (
              <img src={brand.logoUrl} alt={brand.name} className="h-10" />
            ) : (
              <div className="w-10 h-10 rounded-lg flex items-center justify-center text-black font-bold" style={{ backgroundColor: accentColor }}>
                {brand.name[0]?.toUpperCase()}
              </div>
            )}
            <div>
              <p className="font-bold text-lg" style={{ color: accentColor }}>{brand.name}</p>
              {brand.website && <p className="text-neutral-500 text-xs">{brand.website}</p>}
            </div>
          </div>
        )}

        <div className="text-center">
          <span className="inline-block text-sm px-4 py-2 rounded-full border" style={{ backgroundColor: `${accentColor}15`, borderColor: `${accentColor}40`, color: accentColor }}>
            Análise de presença digital
          </span>

          <h1 className="text-4xl md:text-5xl font-extrabold mt-6 leading-tight">
            {company.companyName}
          </h1>

          <p className="text-neutral-400 mt-3">
            {company.city ? `${company.city}, ` : ""}{company.state ?? ""}
            {company.category ? ` · ${company.category}` : ""}
          </p>
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8 text-center">
            <p className="text-5xl font-extrabold" style={{ color: accentColor }}>{score.score}</p>
            <p className="text-neutral-400 mt-2 text-sm">
              Índice de presença digital
            </p>
          </div>

          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8 text-center">
            <p className="text-5xl font-extrabold" style={{ color: accentColor }}>
              {score.closingProbability}%
            </p>
            <p className="text-neutral-400 mt-2 text-sm">
              Clientes que você pode estar perdendo para a concorrência
            </p>
          </div>

          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8 text-center">
            <p className="text-5xl font-extrabold" style={{ color: accentColor }}>
              R$ {score.estimatedRevenue.toLocaleString("pt-BR")}
            </p>
            <p className="text-neutral-400 mt-2 text-sm">
              Por mês, em vendas que hoje ficam com quem aparece primeiro no Google
            </p>
          </div>
        </div>

        <div className="mt-8 flex justify-center no-print">
          <ExportPdfButton companyName={company.companyName} />
        </div>

        <div className="mt-12 bg-neutral-950 border border-neutral-800 text-white rounded-3xl p-8 md:p-10">
          <h2 className="text-2xl font-bold">
            O que a gente encontrou na sua presença digital
          </h2>

          <div className="mt-6">
            <PresencaDigitalChecklist
              hasWebsite={company.hasWebsite}
              hasSeo={company.hasSeo}
              hasWhatsapp={company.hasWhatsapp}
              hasGoogle={Boolean(company.googleMapsUrl)}
              hasGoogleAds={company.hasGoogleAds}
              hasMetaAds={company.hasMetaAds}
              hasAutomation={company.hasAutomation}
              automationTool={company.automationTool}
            />
          </div>

          <ul className="mt-6 space-y-4">
            {company.intelligence.diagnosis.weaknesses.map((item, index) => (
              <li key={index} className="flex gap-3">
                <span>⚠️</span>
                <span className="text-neutral-200">{item}</span>
              </li>
            ))}
            {company.intelligence.diagnosis.strengths?.map((item, index) => (
              <li key={index} className="flex gap-3">
                <span>✅</span>
                <span className="text-neutral-200">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Comparativo com concorrentes */}
        {company.city && company.category && (
          <CompetitorComparison
            companyName={company.companyName}
            city={company.city}
            category={company.category}
            currentScore={score.score}
            accentColor={accentColor}
          />
        )}

        <div className="mt-10 bg-neutral-900 border border-neutral-800 rounded-3xl p-8">
          <h2 className="text-2xl font-bold">Como podemos resolver</h2>
          <ul className="mt-6 space-y-4">
            {company.intelligence.commercial.recommendedServices.map((item, index) => (
              <li key={index} className="flex gap-3">
                <span>💡</span>
                <span className="text-neutral-200">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {brand?.whatsapp ? (
          <div className="mt-10 rounded-2xl p-8 text-center" style={{ backgroundColor: `${accentColor}15`, borderColor: accentColor, borderWidth: 1 }}>
            <p className="text-lg font-semibold text-white">
              Quer saber como colocar isso em prática?
            </p>
            <p className="text-neutral-400 mt-2 mb-6">
              Fale com {brand.name} e monte o plano para sua empresa.
            </p>
            <a
              href={`https://wa.me/${brand.whatsapp}?text=${encodeURIComponent(`Olá! Vi a análise da ${company.companyName} e quero saber mais sobre como melhorar minha presença digital.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-black font-bold py-3 px-8 rounded-lg transition hover:opacity-90"
              style={{ backgroundColor: accentColor }}
            >
              Falar com {brand.name} no WhatsApp
            </a>
          </div>
        ) : (
          <div className="mt-10 rounded-2xl p-8 text-center" style={{ backgroundColor: `${accentColor}15`, borderColor: accentColor, borderWidth: 1 }}>
            <p className="text-lg font-semibold text-white">
              Quer saber como colocar isso em prática e passar a aparecer
              antes dos seus concorrentes?
            </p>
            <p className="text-neutral-400 mt-2">
              Esta análise foi gerada pelo Radar Vivo. Entre em contato com
              quem te enviou este link para montar o plano da sua empresa.
            </p>
          </div>
        )}

        {brand && (
          <div className="mt-8 text-center text-neutral-600 text-xs">
            Powered by <span className="font-bold" style={{ color: accentColor }}>Radar Vivo</span>
          </div>
        )}
      </div>
    </main>
  );
}

function CompetitorComparison({
  companyName,
  city,
  category,
  currentScore,
  accentColor,
}: {
  companyName: string;
  city: string;
  category: string;
  currentScore: number;
  accentColor: string;
}) {
  const [competitors, setCompetitors] = useState<Array<{
    name: string;
    radar_score: number | null;
    google_rating: number | null;
  }>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/competitors?city=${encodeURIComponent(city)}&category=${encodeURIComponent(category)}&company=${encodeURIComponent(companyName)}`)
      .then(r => r.json())
      .then(data => {
        setCompetitors(data.competitors ?? []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [city, category, companyName]);

  if (loading || competitors.length === 0) return null;

  const betterCount = competitors.filter(c => (c.radar_score ?? 0) > currentScore).length;

  return (
    <div className="mt-10 bg-neutral-900 border border-neutral-800 rounded-3xl p-8">
      <h2 className="text-2xl font-bold mb-2">Comparativo com concorrentes</h2>
      <p className="text-neutral-400 text-sm mb-6">
        Sua empresa vs outras empresas de {category} em {city}
      </p>

      <div className="space-y-3">
        {/* Current company */}
        <div className="flex items-center justify-between p-4 rounded-xl" style={{ backgroundColor: `${accentColor}15`, borderColor: accentColor, borderWidth: 1 }}>
          <div className="flex items-center gap-3">
            <span className="font-bold" style={{ color: accentColor }}>📍</span>
            <span className="font-bold">{companyName} (sua empresa)</span>
          </div>
          <span className="text-2xl font-extrabold" style={{ color: accentColor }}>{currentScore}</span>
        </div>

        {/* Competitors */}
        {competitors.map((c) => (
          <div key={c.name} className="flex items-center justify-between p-4 bg-neutral-800/50 rounded-xl">
            <div className="flex items-center gap-3">
              <span className="text-neutral-500">🏪</span>
              <span className="text-neutral-300">{c.name}</span>
            </div>
            <div className="flex items-center gap-4">
              {c.google_rating && (
                <span className="text-sm text-neutral-400">⭐ {c.google_rating}</span>
              )}
              <span className="text-lg font-bold" style={{ color: (c.radar_score ?? 0) > currentScore ? "#ef4444" : accentColor }}>
                {c.radar_score ?? "—"}
              </span>
            </div>
          </div>
        ))}
      </div>

      {betterCount > 0 && (
        <div className="mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
          <p className="text-red-400 font-bold">
            ⚠️ {betterCount} concorrente{betterCount > 1 ? "s" : ""} à frente de você
          </p>
          <p className="text-red-400/70 text-sm mt-1">
            Estes concorrentes estão aparecendo mais no Google e atraindo mais clientes.
          </p>
        </div>
      )}
    </div>
  );
}
