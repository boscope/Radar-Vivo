"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import OpportunityCard from "@/components/scanner/OpportunityCard";

import {
  collectCompanyData,
  type CompanyData,
} from "@/lib/collector";

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

  useEffect(() => {

    async function carregar() {

      const { empresa } =
        await params;

      const nomeEmpresa =
        decodeURIComponent(empresa);

      setEmpresa(nomeEmpresa);

      const data =
        await collectCompanyData(nomeEmpresa);

      setCompany(data);

    }

    carregar();

  }, [params]);

  if (!company) {

    return (

      <main className="min-h-screen bg-black text-white flex items-center justify-center">

        Carregando análise...

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

            probability={80}

            monthlyLoss={
              company.intelligence
                .score
                .estimatedRevenue
            }

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