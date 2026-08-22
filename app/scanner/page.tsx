"use client";

import { useState } from "react";

export default function ScannerPage() {
  const [empresa, setEmpresa] = useState("");

  function analisar() {

    if (!empresa.trim()) {
      alert("Digite uma empresa.");
      return;
    }

    window.open(
      "/scanner/result/" + encodeURIComponent(empresa.trim()),
      "_blank",
      "noopener,noreferrer"
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
            placeholder="Ex.: Clínica Vida Caruaru"
            className="w-full p-4 rounded-lg bg-zinc-800 border border-zinc-700 text-white text-lg"
          />

          <button
            onClick={analisar}
            className="mt-8 w-full bg-green-500 hover:bg-green-400 transition text-black font-bold py-4 rounded-lg text-xl"
          >
            🚀 Analisar Empresa
          </button>

          <div className="mt-6 text-center">

            <a href="/busca" className="text-green-400 hover:text-green-300 text-sm underline">
              🎯 Ou busque oportunidades por estado e categoria
            </a>

          </div>

        </div>

      </div>

    </main>

  );

}