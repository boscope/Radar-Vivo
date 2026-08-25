"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import RadarLoader from "@/components/ui/RadarLoader";
import PresencaDigitalChecklist from "@/components/scanner/PresencaDigitalChecklist";
import ExportPdfButton from "@/components/scanner/ExportPdfButton";

type Props = {
  params: Promise<{ empresa: string }>;
};

export default function DemoPersonalizadaPage({ params }: Props) {
  const [empresa, setEmpresa] = useState("");
  const [company, setCompany] = useState<any>(null);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    async function carregar() {
      const { empresa: raw } = await params;
      const nome = decodeURIComponent(raw);
      setEmpresa(nome);

      const sp = new URLSearchParams(window.location.search);
      const city = sp.get("city") || "";
      const state = sp.get("state") || "";
      const category = sp.get("category") || "";
      const placeId = sp.get("placeId") || "";

      try {
        const res = await fetch("/api/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ input: nome, city, state, category, placeId }),
        });
        if (!res.ok) {
          const payload = await res.json();
          setErro(payload?.error ?? "Não foi possível analisar esta empresa.");
          return;
        }
        setCompany(await res.json());
      } catch {
        setErro("Erro ao analisar. Tente novamente.");
      }
    }
    carregar();
  }, [params]);

  if (erro) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="max-w-lg text-center px-6">
          <h1 className="text-3xl font-bold mb-4">Não foi possível analisar</h1>
          <p className="text-zinc-400 mb-8">{erro}</p>
          <Link href="/" className="inline-block bg-green-500 hover:bg-green-400 transition text-black font-bold py-3 px-6 rounded-lg">
            ← Voltar ao início
          </Link>
        </div>
      </main>
    );
  }

  if (!company) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <RadarLoader text={`Analisando ${empresa}...`} />
      </main>
    );
  }

  const score = company.intelligence?.score?.score ?? 0;
  const priority = company.intelligence?.score?.priority ?? "Média";
  const weaknesses = company.intelligence?.diagnosis?.weaknesses ?? [];
  const strengths = company.intelligence?.diagnosis?.strengths ?? [];
  const services = company.intelligence?.commercial?.recommendedServices ?? [];
  const competitors = company.intelligence?.commercial?.competitors ?? [];
  const revenue = company.intelligence?.score?.estimatedRevenue ?? 0;
  const probability = company.intelligence?.score?.closingProbability ?? 0;

  const scoreColor = score >= 70 ? "text-green-400" : score >= 40 ? "text-yellow-400" : "text-red-400";
  const scoreRing = score >= 70 ? "border-green-500" : score >= 40 ? "border-yellow-500" : "border-red-500";

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-neutral-800 bg-black/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo-512.png" alt="Radar Vivo" width={32} height={32} className="rounded-lg" />
            <span className="text-lg font-bold">
              <span className="text-green-400">Radar</span>
              <span className="text-white">Vivo</span>
            </span>
          </Link>
          <span className="text-xs text-neutral-500">Relatório de Presença Digital</span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10">

        {/* Empresa */}
        <div className="mb-10">
          <p className="text-neutral-500 text-sm mb-1">Análise completa para</p>
          <h1 className="text-4xl md:text-5xl font-bold">{company.companyName}</h1>
          <p className="text-neutral-400 mt-2">{company.city}{company.state ? ` · ${company.state}` : ""} · {company.category}</p>
        </div>

        {/* Score */}
        <div className="flex flex-col md:flex-row gap-6 mb-10">
          <div className={`bg-neutral-900 border ${scoreRing} rounded-2xl p-8 flex flex-col items-center justify-center min-w-[180px]`}>
            <span className={`text-6xl font-black ${scoreColor}`}>{score}</span>
            <span className="text-neutral-400 text-sm mt-1">Radar Score</span>
          </div>
          <div className="flex-1 grid grid-cols-2 gap-4">
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5">
              <p className="text-neutral-500 text-xs mb-1">Prioridade</p>
              <p className="text-xl font-bold text-white">{priority}</p>
            </div>
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5">
              <p className="text-neutral-500 text-xs mb-1">Probabilidade de fechamento</p>
              <p className="text-xl font-bold text-green-400">{probability}%</p>
            </div>
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5">
              <p className="text-neutral-500 text-xs mb-1">Perda estimada/mês</p>
              <p className="text-xl font-bold text-red-400">R$ {revenue.toLocaleString("pt-BR")}</p>
            </div>
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5">
              <p className="text-neutral-500 text-xs mb-1">Presença digital</p>
              <p className="text-xl font-bold">{score < 50 ? "Fraca" : score < 70 ? "Razoável" : "Boa"}</p>
            </div>
          </div>
        </div>

        {/* Checklist */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-4">Presença Digital</h2>
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

        {/* Pontos Fracos */}
        {weaknesses.length > 0 && (
          <div className="mb-10 bg-red-950 border border-red-800 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-red-400 mb-4">Pontos Fracos Encontrados</h2>
            <ul className="space-y-3">
              {weaknesses.map((w: string, i: number) => (
                <li key={i} className="flex items-start gap-3 text-neutral-300">
                  <span className="text-red-400 mt-1">✗</span>
                  <span>{w}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Pontos Fortes */}
        {strengths.length > 0 && (
          <div className="mb-10 bg-green-950 border border-green-800 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-green-400 mb-4">Pontos Fortes</h2>
            <ul className="space-y-3">
              {strengths.map((s: string, i: number) => (
                <li key={i} className="flex items-start gap-3 text-neutral-300">
                  <span className="text-green-400 mt-1">✓</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Concorrentes */}
        {competitors.length > 0 && (
          <div className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Comparativo com Concorrentes</h2>
            <div className="space-y-3">
              {competitors.map((c: any, i: number) => (
                <div key={i} className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 flex items-center justify-between">
                  <div>
                    <p className="font-bold">{c.name}</p>
                    <p className="text-sm text-neutral-400">
                      Score: <span className="text-white font-bold">{c.radar_score ?? "—"}</span>
                      {c.google_rating && <span className="ml-3">⭐ {c.google_rating}</span>}
                    </p>
                  </div>
                  {(c.radar_score ?? 0) > score && (
                    <span className="text-xs bg-red-500/20 text-red-400 border border-red-500/30 px-3 py-1 rounded-full font-bold">
                      À sua frente
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Serviços Recomendados */}
        {services.length > 0 && (
          <div className="mb-10 bg-green-950 border border-green-700 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-green-400 mb-4">Como resolver os problemas encontrados</h2>
            <ul className="space-y-3">
              {services.map((s: string, i: number) => (
                <li key={i} className="flex items-start gap-3 text-neutral-300">
                  <span className="text-green-400 mt-1">→</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* PDF */}
        <div className="mb-10">
          <ExportPdfButton
            data={{
              companyName: company.companyName,
              city: company.city,
              state: company.state,
              category: company.category,
              score,
              closingProbability: probability,
              estimatedRevenue: revenue,
              priority,
              checks: [
                { label: "Site próprio", ok: company.hasWebsite },
                { label: "SEO otimizado", ok: company.hasSeo },
                { label: "WhatsApp comercial", ok: company.hasWhatsapp },
                { label: "Google Meu Negócio", ok: Boolean(company.googleMapsUrl) },
                { label: "Google Ads", ok: company.hasGoogleAds },
                { label: "Meta Ads", ok: company.hasMetaAds },
                { label: "Automação", ok: company.hasAutomation },
              ],
              weaknesses,
              strengths,
              services,
            }}
          />
        </div>

        {/* CTA Final */}
        <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-2xl p-8 text-center mb-10">
          <h2 className="text-2xl font-bold mb-3">Essa análise foi automatizada pelo Radar Vivo</h2>
          <p className="text-neutral-400 mb-6 max-w-xl mx-auto">
            Em menos de 1 minuto, o Radar Vivo identificou {weaknesses.length} pontos fracos que estão fazendo {company.companyName} perder clientes pra concorrência.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/#precos"
              className="bg-green-500 hover:bg-green-400 text-black font-bold px-8 py-4 rounded-xl text-lg transition"
            >
              Assinar por R$ 197/mês →
            </Link>
            <a
              href={`https://wa.me/5581988867233?text=${encodeURIComponent(`Olá! Vi a análise da ${company.companyName} no Radar Vivo e quero saber mais.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-green-500/50 text-green-400 hover:bg-green-500/10 font-bold px-8 py-4 rounded-xl text-lg transition"
            >
              Falar com especialista
            </a>
          </div>
        </div>

        <p className="text-center text-neutral-600 text-xs">
          Relatório gerado automaticamente por <span className="text-green-400">Radar Vivo</span> · radarvivo.com.br
        </p>
      </div>
    </main>
  );
}
