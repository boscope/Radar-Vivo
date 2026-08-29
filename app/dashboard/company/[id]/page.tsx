"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type Company = {
  id: string;
  company_name: string;
  category: string;
  city: string;
  rv_index: number;
  estimated_value: number;
};

export default function CompanyPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();

  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarEmpresa() {
      const { data, error } = await supabase
        .from("companies")
        .select("*")
        .eq("id", params.id)
        .single();

      if (!error && data) {
        setCompany(data);
      }

      setLoading(false);
    }

    carregarEmpresa();
  }, [params.id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        Carregando empresa...
      </main>
    );
  }

  if (!company) {
    return (
      <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-6">
        <h1 className="text-4xl font-bold">
          Empresa não encontrada
        </h1>

        <button
          onClick={() => router.push("/dashboard")}
          className="bg-green-500 hover:bg-green-400 text-black font-bold px-6 py-3 rounded-lg"
        >
          Voltar ao Dashboard
        </button>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white p-4 sm:p-10">

      <div className="max-w-6xl mx-auto">

        <button
          onClick={() => router.push("/dashboard")}
          className="mb-8 bg-zinc-800 hover:bg-zinc-700 px-5 py-2 rounded-lg"
        >
          ← Voltar
        </button>

        <h1 className="text-3xl md:text-5xl font-bold break-words">
          {company.company_name}
        </h1>

        <p className="text-zinc-400 mt-3">
          {company.city} • {company.category}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">

          <div className="bg-zinc-900 rounded-xl p-6">
            <p className="text-zinc-400">
              Índice RV
            </p>

            <h2 className="text-6xl font-bold text-green-400 mt-4">
              {company.rv_index}
            </h2>
          </div>

          <div className="bg-zinc-900 rounded-xl p-6">
            <p className="text-zinc-400">
              Potencial Financeiro
            </p>

            <h2 className="text-3xl font-bold text-green-400 mt-4">
              {Number(company.estimated_value).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </h2>
          </div>

          <div className="bg-zinc-900 rounded-xl p-6">
            <p className="text-zinc-400">
              Status
            </p>

            <h2 className="text-3xl font-bold text-orange-400 mt-4">
              Radar Quente
            </h2>
          </div>

        </div>

        <div className="bg-zinc-900 rounded-xl p-8 mt-10">

          <h2 className="text-2xl font-bold mb-6">
            Diagnóstico Inicial
          </h2>

          <ul className="space-y-4">

            <li>✅ Baixa presença digital.</li>
            <li>✅ Grande oportunidade para SEO Local.</li>
            <li>✅ Potencial para automação de WhatsApp.</li>
            <li>✅ Excelente candidata para novo site.</li>

          </ul>

        </div>

      </div>

    </main>
  );
}