"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Props = {
  params: Promise<{
    empresa: string;
  }>;
};

type AnaliseData = {
  companyName: string;
  city?: string;
  state?: string;
  category?: string;
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

  useEffect(() => {

    async function carregar() {

      const { empresa } = await params;

      const nomeEmpresa = decodeURIComponent(empresa);

      setEmpresa(nomeEmpresa);

      try {

        const response = await fetch("/api/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ input: nomeEmpresa }),
        });

        if (!response.ok) {

          const payload = await response.json();

          setErro(
            payload?.error ?? "Não foi possível analisar."
          );

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

      <main className="min-h-screen bg-white text-slate-900 flex items-center justify-center">

        <div className="max-w-lg text-center px-6">

          <h1 className="text-3xl font-bold mb-4">
            Análise não disponível
          </h1>

          <p className="text-slate-500 mb-8">{erro}</p>

          <Link
            href="/"
            className="inline-block bg-slate-900 text-white font-bold py-3 px-6 rounded-lg"
          >
            ← Voltar ao início
          </Link>

        </div>

      </main>

    );

  }

  if (!company) {

    return (

      <main className="min-h-screen bg-white text-slate-900 flex items-center justify-center">

        <p className="text-slate-500">
          Gerando análise gratuita...
        </p>

      </main>

    );

  }

  const score = company.intelligence.score;

  return (

    <main className="min-h-screen bg-white text-slate-900">

      <div className="max-w-4xl mx-auto p-8 md:p-12">

        <div className="text-center">

          <span className="inline-block bg-slate-100 text-slate-600 text-sm px-4 py-2 rounded-full">

            🎁 Análise gratuita e sem compromisso

          </span>

          <h1 className="text-4xl md:text-5xl font-extrabold mt-6 leading-tight">

            {company.companyName}

          </h1>

          <p className="text-slate-500 mt-3">

            {company.city ? `${company.city}, ` : ""}{company.state ?? ""}

            {company.category ? ` · ${company.category}` : ""}

          </p>

        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-6">

          <div className="bg-slate-50 rounded-2xl p-8 text-center border border-slate-100">

            <p className="text-5xl font-extrabold">
              {score.score}
            </p>

            <p className="text-slate-500 mt-2 text-sm">
              Índice de presença digital
            </p>

          </div>

          <div className="bg-slate-50 rounded-2xl p-8 text-center border border-slate-100">

            <p className="text-5xl font-extrabold">
              {score.closingProbability}%
            </p>

            <p className="text-slate-500 mt-2 text-sm">
              Clientes que você pode estar perdendo para a concorrência
            </p>

          </div>

          <div className="bg-slate-50 rounded-2xl p-8 text-center border border-slate-100">

            <p className="text-5xl font-extrabold">
              R$ {score.estimatedRevenue.toLocaleString("pt-BR")}
            </p>

            <p className="text-slate-500 mt-2 text-sm">
              Por mês, em vendas que hoje ficam com quem aparece primeiro no Google
            </p>

          </div>

        </div>

        <div className="mt-12 bg-slate-900 text-white rounded-3xl p-8 md:p-10">

          <h2 className="text-2xl font-bold">

            O que a gente encontrou na sua presença digital

          </h2>

          <ul className="mt-6 space-y-4">

            {company.intelligence.diagnosis.weaknesses.map((item, index) => (

              <li key={index} className="flex gap-3">

                <span>⚠️</span>

                <span className="text-slate-200">{item}</span>

              </li>

            ))}

            {company.intelligence.diagnosis.strengths?.map((item, index) => (

              <li key={index} className="flex gap-3">

                <span>✅</span>

                <span className="text-slate-200">{item}</span>

              </li>

            ))}

          </ul>

        </div>

        <div className="mt-10 rounded-3xl border border-slate-200 p-8">

          <h2 className="text-2xl font-bold">

            Como podemos resolver

          </h2>

          <ul className="mt-6 space-y-4">

            {company.intelligence.commercial.recommendedServices.map((item, index) => (

              <li key={index} className="flex gap-3">

                <span>💡</span>

                <span>{item}</span>

              </li>

            ))}

          </ul>

        </div>

        <div className="mt-10 bg-slate-100 rounded-2xl p-8 text-center">

          <p className="text-lg font-semibold">

            Quer saber como colocar isso em prática e passar a aparecer
            antes dos seus concorrentes?

          </p>

          <p className="text-slate-600 mt-2">

            Esta análise foi gerada pelo Radar Vivo. Entre em contato com
            quem te enviou este link para montar o plano da sua empresa.

          </p>

        </div>

      </div>

    </main>

  );

}
