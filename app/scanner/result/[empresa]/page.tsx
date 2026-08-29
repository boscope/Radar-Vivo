"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createBrowserClient } from "@supabase/ssr";

import OpportunityCard from "@/components/scanner/OpportunityCard";

import LeadCapture from "@/components/scanner/LeadCapture";

import PresencaDigitalChecklist from "@/components/scanner/PresencaDigitalChecklist";
import ExportPdfButton from "@/components/scanner/ExportPdfButton";
import RadarLoader from "@/components/ui/RadarLoader";

import type {
  CompanyData,
} from "@/lib/collector";

type AgencyBrand = {
  name: string;
  logoUrl: string;
  color: string;
  whatsapp: string;
  website: string;
};

type Props = {
  params: Promise<{
    empresa: string;
  }>;
};

export default function ScannerResultPage({
  params,
}: Props) {

  const [empresa, setEmpresa] =
    useState("Empresa");

  const [company, setCompany] =
    useState<CompanyData | null>(null);

  const [erro, setErro] = useState<string | null>(null);

  const [copied, setCopied] = useState(false);
  const [shortLink, setShortLink] = useState("");

  const [brand, setBrand] = useState<AgencyBrand | null>(null);
  const [ownerId, setOwnerId] = useState("");

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {

    async function carregar() {

      const { empresa } =
        await params;

      const nomeEmpresa =
        decodeURIComponent(empresa);

      setEmpresa(nomeEmpresa);

      const searchParams = new URLSearchParams(window.location.search);
      const city = searchParams.get("city") || "";
      const state = searchParams.get("state") || "";
      const category = searchParams.get("category") || "";
      const placeId = searchParams.get("placeId") || "";
      const oid = searchParams.get("ownerId") || "";
      if (oid) {
        setOwnerId(oid);
        try {
          const brandRes = await fetch(`/api/agency-brand?ownerId=${oid}`);
          const brandData = await brandRes.json();
          if (brandData.branding) setBrand(brandData.branding);
        } catch {}
      }

      try {

        const response =
          await fetch(
            "/api/analyze",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                input: nomeEmpresa,
                city,
                state,
                category,
                placeId,
              }),
            }
          );

        if (!response.ok) {

          const payload =
            await response.json();

          setErro(
            payload?.error ??
            "Não foi possível analisar a empresa."
          );

          return;

        }

        const data =
          await response.json();

        setCompany(data);

        try {
          const fullUrl = `${window.location.origin}/relatorio/${encodeURIComponent(empresa)}${window.location.search}${oid ? `&ownerId=${oid}` : ""}`;
          const res = await fetch("/api/short-link", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ url: fullUrl }),
          });
          const linkData = await res.json();
          if (linkData.shortUrl) setShortLink(linkData.shortUrl);
        } catch {}

        // Salvar score no histórico (antes/depois)
        try {
          const { data: { session } } = await supabase.auth.getSession();
          if (session) {
            await fetch("/api/score-history", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${session.access_token}`,
              },
              body: JSON.stringify({
                company_name: data.companyName,
                city: data.city,
                category: data.category,
                score: data.intelligence?.score?.score ?? 0,
              }),
            });

            // Salvar empresa no banco (auto-save pra Empresas no Radar)
            try {
              const { makeExternalId, upsertCompany } = await import("@/lib/services/company-db-service");
              const eid = makeExternalId(data.companyName, data.city || "", data.category || "");
              await upsertCompany(eid, {
                name: data.companyName,
                city: data.city,
                state: state || undefined,
                category: data.category,
                website: data.website || undefined,
                phone: data.phone || undefined,
                rating: data.googleRating || undefined,
                reviews: data.googleReviews || undefined,
                ownerId: session.user.id,
              });
            } catch (e) {
              console.error("[SCANNER] Erro ao salvar empresa:", e);
            }
          }
        } catch {
          // Silently fail - score history is non-critical
        }

      } catch {

        setErro(
          "Não foi possível analisar a empresa."
        );

      }

    }

    carregar();

  }, [params]);

  if (erro) {

    return (

      <main className="min-h-screen bg-black text-white flex items-center justify-center">

        <div className="max-w-lg text-center px-6">

          <h1 className="text-3xl font-bold mb-4">
            Não foi possível analisar
          </h1>

          <p className="text-zinc-400 mb-8">
            {erro}
          </p>

          <Link
            href="/scanner"
            className="inline-block bg-green-500 hover:bg-green-400 transition text-black font-bold py-3 px-6 rounded-lg"
          >
            ← Tentar outra empresa
          </Link>

        </div>

      </main>

    );

  }

  if (!company) {

    return (

      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <RadarLoader text="Analisando empresa..." />
      </main>

    );

  }

  return (

    <main className="min-h-screen bg-black text-white">

      <div className="max-w-6xl mx-auto p-10">

        <Link
          href="/scanner"
          className="text-green-400 hover:text-green-300"
        >
          ← Nova análise
        </Link>

        {brand && (
          <div className="flex items-center gap-3 mt-4 mb-6 pb-6 border-b border-neutral-800">
            {brand.logoUrl ? (
              <img src={brand.logoUrl} alt={brand.name} className="h-10" />
            ) : (
              <div className="w-10 h-10 rounded-lg flex items-center justify-center text-black font-bold" style={{ backgroundColor: brand.color }}>
                {brand.name[0]?.toUpperCase()}
              </div>
            )}
            <div>
              <p className="font-bold text-lg" style={{ color: brand.color }}>{brand.name}</p>
              {brand.website && <p className="text-neutral-500 text-xs">{brand.website}</p>}
            </div>
          </div>
        )}

        <h1 className="text-5xl font-bold mt-6">

          {empresa}

        </h1>

        <p className="text-zinc-400 mt-2">

          Resultado da análise inteligente

        </p>

        <div className="mt-10">

          <OpportunityCard

            priority={
              company.intelligence.score.priority
            }

            service={
              company.intelligence
                .commercial
                .recommendedServices[0] ??
              "Nenhum"
            }

            probability={
              company.intelligence
                .score
                .closingProbability
            }

            monthlyLoss={
              company.intelligence
                .score
                .estimatedRevenue
            }

          />

        </div>

        <div className="mt-6">

          <PresencaDigitalChecklist

            hasWebsite={company.hasWebsite}

            hasSeo={company.hasSeo}

            hasWhatsapp={company.hasWhatsapp}

            hasGoogle={company.hasGoogle ?? Boolean(company.googleMapsUrl)}

            hasGoogleAds={company.hasGoogleAds}

            hasMetaAds={company.hasMetaAds}

            hasAutomation={company.hasAutomation}

            automationTool={company.automationTool}

          />

        </div>

        <div className="mt-6 bg-green-950 border border-green-700 rounded-xl p-6">

          <h2 className="text-xl font-bold text-green-400 mb-2">
            📤 Envie esta análise ao cliente
          </h2>

          <p className="text-green-200 mb-4">
            Compartilhe o link público do relatório. O cliente vê o
            diagnóstico com cara de consultoria gratuita — e agenda a
            conversa com você.
          </p>

          {company?.phone ? (
            <div className="flex flex-col sm:flex-row gap-3">
              <code className="flex-1 bg-black text-green-400 p-4 rounded-lg text-sm break-all">
                {shortLink || `${typeof window !== "undefined" ? window.location.origin : ""}/relatorio/${encodeURIComponent(empresa)}`}
              </code>

              <button
                onClick={() => {
                  if (typeof window !== "undefined") {
                    navigator.clipboard.writeText(
                      shortLink || `${window.location.origin}/relatorio/${encodeURIComponent(empresa)}${window.location.search}${ownerId ? `&ownerId=${ownerId}` : ""}`
                    );
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  }
                }}
                className="bg-green-500 hover:bg-green-400 transition text-black font-bold px-6 py-3 rounded-lg"
              >
                {copied ? "✓ Copiado!" : "Copiar link"}
              </button>

              <a
                href={`https://wa.me/${company.phone.replace(/\D/g, "").replace(/^0+/, "").replace(/^(\d{2})/, "55$1")}?text=${encodeURIComponent(`Olá! Analisei a presença digital da ${company?.companyName ?? empresa} e encontrei oportunidades de melhoria. Confira o relatório completo:\n\n${shortLink}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 hover:bg-green-500 transition text-white font-bold px-6 py-3 rounded-lg text-center"
              >
                📱 Enviar via WhatsApp
              </a>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-3 items-start">
              <code className="flex-1 bg-black text-green-400 p-4 rounded-lg text-sm break-all">
                {shortLink || `${typeof window !== "undefined" ? window.location.origin : ""}/relatorio/${encodeURIComponent(empresa)}`}
              </code>

              <button
                onClick={() => {
                  if (typeof window !== "undefined") {
                    navigator.clipboard.writeText(
                      shortLink || `${window.location.origin}/relatorio/${encodeURIComponent(empresa)}${window.location.search}${ownerId ? `&ownerId=${ownerId}` : ""}`
                    );
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  }
                }}
                className="bg-green-500 hover:bg-green-400 transition text-black font-bold px-6 py-3 rounded-lg"
              >
                {copied ? "✓ Copiado!" : "Copiar link"}
              </button>

              <div className="bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-sm px-4 py-3 rounded-lg">
                ⚠️ WhatsApp não encontrado no Google. Copie o link e envie manualmente.
              </div>
            </div>
          )}

          <div className="mt-5 pt-5 border-t border-green-800/50 flex flex-col sm:flex-row gap-3">
            <ExportPdfButton
              data={{
                companyName: company.companyName,
                city: company.city,
                category: company.category,
                score: company.intelligence.score.score,
                closingProbability: company.intelligence.score.closingProbability,
                estimatedRevenue: company.intelligence.score.estimatedRevenue,
                priority: company.intelligence.score.priority,
                checks: [
                  { label: "Site profissional", ok: company.hasWebsite },
                  { label: "SEO local", ok: company.hasSeo },
                  { label: "Google Meu Negócio / Maps", ok: company.hasGoogle ?? Boolean(company.googleMapsUrl) },
                  { label: "WhatsApp comercial", ok: company.hasWhatsapp },
                  { label: "Google Ads", ok: Boolean(company.hasGoogleAds) },
                  { label: "Meta Ads (Instagram/Facebook)", ok: Boolean(company.hasMetaAds) },
                  { label: "Automação de atendimento", ok: Boolean(company.hasAutomation) },
                ],
                weaknesses: (company.intelligence.diagnosis.weaknesses ?? []).filter(
                  (w) => !w.startsWith("Invisível nas IAs")
                ),
                strengths: company.intelligence.diagnosis.strengths ?? [],
                services: company.intelligence.commercial.recommendedServices ?? [],
                aiPresence: company.intelligence.aiPresence,
              }}
            />
            <a
              href={`/relatorio/${encodeURIComponent(empresa)}${typeof window !== "undefined" ? window.location.search : ""}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-neutral-900 border border-green-700 text-green-400 font-bold px-6 py-3 rounded-lg text-center"
            >
              👁️ Ver relatório completo
            </a>
          </div>

        </div>

        <div className="mt-10">

          <LeadCapture

            company={company.companyName}

            city={company.city}

            category={company.category}

            score={company.intelligence.score.score}

            priority={company.intelligence.score.priority}

          />

        </div>

        <div className="bg-zinc-900 rounded-xl p-8 mt-10">

          <h2 className="text-2xl font-bold mb-6">

            🎯 Serviços Recomendados

          </h2>

          <ul className="space-y-4">

            {company.intelligence
              .commercial
              .recommendedServices
              .map((item, index) => (

                <li key={index}>

                  ✅ {item}

                </li>

              ))}

          </ul>

        </div>

        <div className="bg-zinc-900 rounded-xl p-8 mt-10">

          <h2 className="text-2xl font-bold mb-6">

            Diagnóstico Inteligente

          </h2>

          <ul className="space-y-4">

            {company.intelligence
              .diagnosis
              .weaknesses
              .map((item, index) => (

                <li key={index}>

                  ⚠️ {item}

                </li>

              ))}

          </ul>

        </div>

      </div>

    </main>

  );

}