"use client";

import { useState } from "react";
import Link from "next/link";
import PresencaDigitalChecklist from "@/components/scanner/PresencaDigitalChecklist";
import ExportPdfButton from "@/components/scanner/ExportPdfButton";

const demoCompany = {
  companyName: "Clínica Odonto Sorriso",
  city: "Carpina",
  state: "PE",
  category: "Dentista",
  hasWebsite: false,
  hasSeo: false,
  hasWhatsapp: true,
  hasGoogleAds: false,
  hasMetaAds: true,
  hasAutomation: false,
  automationTool: undefined,
  googleMapsUrl: "https://maps.google.com/?q=clinica-odonto-sorriso",
};

const demoScore = {
  score: 34,
  closingProbability: 62,
  estimatedRevenue: 4800,
};

const demoWeaknesses = [
  "Não tem site próprio — quem procura 'dentista em Carpina' encontra só o perfil do Google",
  "Nenhuma estratégia de SEO local — aparece apenas quando pesquisam o nome exato",
  "Não investe em Google Ads enquanto 3 concorrentes aparecem nos anúncios patrocinados",
  "Sem automação de WhatsApp — cada agendamento depende de resposta manual",
];

const demoStrengths = [
  "Perfil do Google ativo com avaliação 4,7 ⭐",
  "WhatsApp comercial disponível para contato",
  "Já investe em Instagram Ads — conhece o valor do tráfego pago",
];

const demoCompetitors = [
  { name: "Odonto Excelência", radar_score: 71, google_rating: 4.8 },
  { name: "Dra. Camila Ortodontia", radar_score: 58, google_rating: 4.9 },
  { name: "Sorrir Mais Odontologia", radar_score: 22, google_rating: 4.5 },
];

const demoServices = [
  "Criação de site otimizado para 'dentista em Carpina' e buscas da região",
  "Otimização completa do perfil no Google Meu Negócio (fotos, posts, palavras-chave)",
  "Campanha de Google Ads captando quem está com dor de dente AGORA",
  "Automação de WhatsApp para agendamentos sem perder nenhum contato",
];

export default function DemoPage() {
  const [copied, setCopied] = useState(false);

  function copyLink() {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  const accentColor = "#22c55e";

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="bg-green-500/10 border-b border-green-500/30">
        <div className="max-w-4xl mx-auto px-6 py-3 text-center">
          <p className="text-sm text-green-400 font-medium">
            📋 Este é um relatório de exemplo. Veja o que sua análise mostra sobre qualquer empresa.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-8 md:p-12">
        <div className="text-center">
          <span
            className="inline-block text-sm px-4 py-2 rounded-full border"
            style={{
              backgroundColor: `${accentColor}15`,
              borderColor: `${accentColor}40`,
              color: accentColor,
            }}
          >
            Análise de presença digital
          </span>

          <h1 className="text-4xl md:text-5xl font-extrabold mt-6 leading-tight">
            {demoCompany.companyName}
          </h1>

          <p className="text-neutral-400 mt-3">
            {demoCompany.city}, {demoCompany.state} · {demoCompany.category}
          </p>
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8 text-center">
            <p className="text-5xl font-extrabold" style={{ color: accentColor }}>
              {demoScore.score}
            </p>
            <p className="text-neutral-400 mt-2 text-sm">
              Índice de presença digital
            </p>
          </div>

          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8 text-center">
            <p className="text-5xl font-extrabold" style={{ color: accentColor }}>
              {demoScore.closingProbability}%
            </p>
            <p className="text-neutral-400 mt-2 text-sm">
              Clientes que você pode estar perdendo para a concorrência
            </p>
          </div>

          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8 text-center">
            <p className="text-5xl font-extrabold" style={{ color: accentColor }}>
              R$ {demoScore.estimatedRevenue.toLocaleString("pt-BR")}
            </p>
            <p className="text-neutral-400 mt-2 text-sm">
              Por mês, em vendas que hoje ficam com quem aparece primeiro no Google
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3 no-print">
          <ExportPdfButton
            data={{
              companyName: demoCompany.companyName,
              city: demoCompany.city,
              state: demoCompany.state,
              category: demoCompany.category,
              score: demoScore.score,
              closingProbability: demoScore.closingProbability,
              estimatedRevenue: demoScore.estimatedRevenue,
              checks: [
                { label: "Site profissional", ok: demoCompany.hasWebsite },
                { label: "SEO local", ok: demoCompany.hasSeo },
                { label: "Google Meu Negócio / Maps", ok: Boolean(demoCompany.googleMapsUrl) },
                { label: "WhatsApp comercial", ok: demoCompany.hasWhatsapp },
                { label: "Google Ads", ok: false },
                { label: "Meta Ads (Instagram/Facebook)", ok: true },
                { label: "Automação de atendimento", ok: false },
              ],
              weaknesses: demoWeaknesses,
              strengths: demoStrengths,
              services: demoServices,
              aiPresence: {
                visibilityScore: 12,
                status: "invisivel",
                summary:
                  "Invisível para as IAs — quando pedem uma indicação, outra clínica é citada.",
                detail:
                  "Sem os sinais que IAs usam para recomendar negócios locais (site, SEO, Google), assistentes como ChatGPT, Gemini e Perplexity não têm de onde puxar esta empresa. Cada indicação perdida vira cliente do concorrente.",
              },
            }}
          />
          <button
            onClick={copyLink}
            className="bg-neutral-800 border border-neutral-700 text-white rounded-xl px-6 py-3 hover:bg-neutral-700 transition"
          >
            {copied ? "✓ Copiado!" : "🔗 Copiar link deste exemplo"}
          </button>
        </div>

        <div className="mt-12 bg-neutral-950 border border-neutral-800 text-white rounded-3xl p-8 md:p-10">
          <h2 className="text-2xl font-bold">
            O que a gente encontrou na sua presença digital
          </h2>

          <div className="mt-6">
            <PresencaDigitalChecklist
              hasWebsite={demoCompany.hasWebsite}
              hasSeo={demoCompany.hasSeo}
              hasWhatsapp={demoCompany.hasWhatsapp}
              hasGoogle={Boolean(demoCompany.googleMapsUrl)}
              hasGoogleAds={demoCompany.hasGoogleAds}
              hasMetaAds={demoCompany.hasMetaAds}
              hasAutomation={demoCompany.hasAutomation}
              automationTool={demoCompany.automationTool}
            />
          </div>

          <ul className="mt-6 space-y-4">
            {demoWeaknesses.map((item, index) => (
              <li key={`w-${index}`} className="flex gap-3">
                <span>⚠️</span>
                <span className="text-neutral-200">{item}</span>
              </li>
            ))}
            {demoStrengths.map((item, index) => (
              <li key={`s-${index}`} className="flex gap-3">
                <span>✅</span>
                <span className="text-neutral-200">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10 bg-neutral-900 border border-neutral-800 rounded-3xl p-8">
          <h2 className="text-2xl font-bold mb-2">Comparativo com concorrentes</h2>
          <p className="text-neutral-400 text-sm mb-6">
            A clínica vs outras empresas de {demoCompany.category.toLowerCase()} em{" "}
            {demoCompany.city}
          </p>

          <div className="space-y-3">
            <div
              className="flex items-center justify-between p-4 rounded-xl"
              style={{
                backgroundColor: `${accentColor}15`,
                borderColor: accentColor,
                borderWidth: 1,
              }}
            >
              <div className="flex items-center gap-3">
                <span className="font-bold" style={{ color: accentColor }}>
                  📍
                </span>
                <span className="font-bold">
                  {demoCompany.companyName} (sua empresa)
                </span>
              </div>
              <span className="text-2xl font-extrabold" style={{ color: accentColor }}>
                {demoScore.score}
              </span>
            </div>

            {demoCompetitors.map((c) => (
              <div
                key={c.name}
                className="flex items-center justify-between p-4 bg-neutral-800/50 rounded-xl"
              >
                <div className="flex items-center gap-3">
                  <span className="text-neutral-500">🏪</span>
                  <span className="text-neutral-300">{c.name}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-neutral-400">⭐ {c.google_rating}</span>
                  <span
                    className="text-lg font-bold"
                    style={{
                      color: c.radar_score > demoScore.score ? "#ef4444" : accentColor,
                    }}
                  >
                    {c.radar_score}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
            <p className="text-red-400 font-bold">⚠️ 2 concorrentes à frente de você</p>
            <p className="text-red-400/70 text-sm mt-1">
              Estes concorrentes estão aparecendo mais no Google e atraindo mais clientes.
            </p>
          </div>
        </div>

        <div className="mt-10 bg-neutral-900 border border-neutral-800 rounded-3xl p-8">
          <div className="flex items-start justify-between gap-4">
            <h2 className="text-2xl font-bold">🤖 Sua empresa nas IAs</h2>
            <span className="text-xs font-bold px-3 py-1.5 rounded-full whitespace-nowrap bg-red-500/10 text-red-400">
              12/100 visibilidade
            </span>
          </div>

          <p className="text-neutral-400 text-sm mt-1 mb-6">
            Quando alguém pede uma indicação ao ChatGPT, Gemini ou Perplexity,
            sua empresa é citada?
          </p>

          <p className="font-semibold text-lg">
            Invisível para as IAs — quando pedem uma indicação, outra clínica é citada.
          </p>
          <p className="text-neutral-400 mt-2 text-sm leading-relaxed">
            Sem os sinais que IAs usam para recomendar negócios locais (site, SEO,
            Google), assistentes como ChatGPT, Gemini e Perplexity não têm de onde
            puxar esta empresa. Cada indicação perdida vira cliente do concorrente.
          </p>
        </div>

        <div className="mt-10 bg-neutral-900 border border-neutral-800 rounded-3xl p-8">
          <h2 className="text-2xl font-bold">Como podemos resolver</h2>
          <ul className="mt-6 space-y-4">
            {demoServices.map((item, index) => (
              <li key={index} className="flex gap-3">
                <span>💡</span>
                <span className="text-neutral-200">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div
          className="mt-10 rounded-2xl p-8 text-center"
          style={{
            backgroundColor: `${accentColor}15`,
            borderColor: accentColor,
            borderWidth: 1,
          }}
        >
          <p className="text-xl font-bold text-white">
            Quer esse raio-X da SUA empresa (ou do seu cliente)?
          </p>
          <p className="text-neutral-400 mt-2 mb-6">
            Análise gratuita, resultado na hora. Sem cadastro.
          </p>
          <Link
            href="/"
            className="inline-block bg-green-500 hover:bg-green-400 text-black font-bold py-4 px-10 rounded-lg transition text-lg"
          >
            Analisar empresa grátis agora →
          </Link>
        </div>

        <div className="mt-8 text-center text-neutral-600 text-xs">
          Powered by <span className="font-bold text-green-400">Radar Vivo</span>
        </div>
      </div>
    </main>
  );
}
