"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import HowItWorks from "@/components/landing/HowItWorks";
import Benefits from "@/components/landing/Benefits";
import ProductPreview from "@/components/landing/ProductPreview";
import Pricing from "@/components/landing/Pricing";

export default function HomePage() {

  const router = useRouter();

  const [empresa, setEmpresa] = useState("");

  const [analisando, setAnalisando] = useState(false);

  function analisar() {

    if (!empresa.trim()) return;

    setAnalisando(true);

    router.push(
      "/scanner/result/" +
        encodeURIComponent(empresa.trim())
    );

  }

  return (

    <main className="bg-slate-950 text-white">

      <section className="bg-slate-950 text-white">

        <div className="max-w-7xl mx-auto px-6 py-24">

          <span className="inline-block px-4 py-2 rounded-full bg-slate-800 text-sm">

            Inteligência Comercial com IA

          </span>

          <h1 className="mt-8 text-5xl md:text-6xl font-extrabold leading-tight max-w-4xl">

            Descubra empresas que realmente têm potencial para comprar seus serviços.

          </h1>

          <p className="mt-8 text-xl text-slate-300 max-w-3xl">

            O Radar Vivo analisa empresas automaticamente,
            identifica oportunidades comerciais,
            calcula o potencial de compra
            e entrega relatórios executivos em poucos segundos.

          </p>

          <div className="mt-12 max-w-2xl bg-slate-900 border border-slate-700 rounded-2xl p-6">

            <label className="block text-slate-300 text-sm font-semibold mb-3">

              Analise qualquer empresa grátis agora

            </label>

            <div className="flex flex-col sm:flex-row gap-3">

              <input

                value={empresa}

                onChange={(e) => setEmpresa(e.target.value)}

                onKeyDown={(e) => {
                  if (e.key === "Enter") analisar();
                }}

                placeholder="Nome, CNPJ, site ou link do Google Maps"

                className="flex-1 p-4 rounded-xl bg-slate-800 border border-slate-700 text-white text-lg outline-none focus:border-green-400 transition"

              />

              <button

                onClick={analisar}

                disabled={analisando}

                className="bg-green-500 hover:bg-green-400 transition text-black font-bold py-4 px-8 rounded-xl text-lg disabled:opacity-60"

              >

                {analisando ? "Analisando..." : "🚀 Analisar"}

              </button>

            </div>

            <p className="mt-4 text-slate-500 text-sm">

              Ex.: Barbearia Mateleus • 03.007.331/0001-41 • www.suaempresa.com.br

            </p>

          </div>

          <div className="mt-12 flex gap-5 flex-wrap">

            <a

              href="/scanner"

              className="bg-white text-slate-900 px-8 py-4 rounded-xl font-bold hover:bg-slate-200 transition"

            >

              Abrir Scanner Completo

            </a>

          </div>

        </div>

      </section>

      <HowItWorks />

      <Benefits />

      <ProductPreview />

      <Pricing />

    </main>

  );

}
