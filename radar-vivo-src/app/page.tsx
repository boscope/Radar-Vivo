"use client";

import { useState } from "react";

export default function ScannerPage() {

  const [empresa, setEmpresa] = useState("");
  const [analisando, setAnalisando] = useState(false);

  async function analisar() {

    if (!empresa.trim()) {

      alert("Digite uma empresa.");

      return;

    }

    setAnalisando(true);

    setTimeout(() => {

      window.location.href =
        "/scanner/result/" +
        encodeURIComponent(empresa);

    }, 3000);

  }

  if (analisando) {

    return (

      <main className="min-h-screen bg-black text-white flex items-center justify-center">

        <div className="text-center">

          <div className="text-7xl animate-pulse">

            🔎

          </div>

          <h1 className="text-4xl font-bold mt-8">

            Radar Vivo

          </h1>

          <p className="text-zinc-400 mt-4">

            Analisando empresa...

          </p>

          <div className="mt-10 space-y-3 text-left inline-block">

            <p>✅ Procurando Site...</p>

            <p>✅ Verificando Google...</p>

            <p>✅ Analisando SEO...</p>

            <p>✅ Procurando Google Maps...</p>

            <p>✅ Procurando Instagram...</p>

            <p>✅ Procurando Facebook...</p>

            <p>✅ Calculando Índice RV...</p>

            <p>🤖 IA montando diagnóstico...</p>

          </div>

        </div>

      </main>

    );

  }

  return (

    <main className="min-h-screen bg-black text-white">

      <div className="max-w-4xl mx-auto p-10">

        <h1 className="text-5xl font-bold mb-3">

          🔎 Radar Scanner

        </h1>

        <p className="text-zinc-400 mb-10">

          Analise qualquer empresa em poucos segundos.

        </p>

        <div className="bg-zinc-900 rounded-xl p-8">

          <label className="block text-zinc-300 mb-3">

            Nome da empresa, CNPJ, Site ou Google Maps

          </label>

          <input

            value={empresa}

            onChange={(e) => setEmpresa(e.target.value)}

            placeholder="Ex.: Clínica Vida Londrina"

            className="w-full p-4 rounded-lg bg-zinc-800 border border-zinc-700 text-white text-lg"

          />

          <button

            onClick={analisar}

            className="mt-8 w-full bg-green-500 hover:bg-green-400 transition text-black font-bold py-4 rounded-lg text-xl"

          >

            🚀 Analisar Empresa

          </button>

        </div>

      </div>

    </main>

  );

}