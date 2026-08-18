"use client";

import { useState } from "react";

type Props = {
  company: string;
  city?: string;
  category?: string;
  score?: number;
  priority?: string;
};

export default function LeadCapture({
  company,
  city,
  category,
  score,
  priority,
}: Props) {
  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [erro, setErro] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);

  async function salvar() {
    if (!name.trim()) {
      setErro("Informe seu nome.");
      return;
    }

    if (whatsapp.replace(/\D/g, "").length < 10) {
      setErro("Informe um WhatsApp válido com DDD.");
      return;
    }

    setErro(null);
    setEnviando(true);

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          whatsapp: whatsapp.trim(),
          company,
          city: city ?? undefined,
          category: category ?? undefined,
          score: score ?? undefined,
          priority: priority ?? undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErro(data?.error ?? "Não foi possível salvar.");
        return;
      }

      setEnviado(true);
    } catch {
      setErro("Erro de conexão. Tente novamente.");
    } finally {
      setEnviando(false);
    }
  }

  if (enviado) {
    return (
      <div className="bg-green-950 border border-green-700 rounded-xl p-8 text-center">
        <h3 className="text-2xl font-bold text-green-400">
          ✅ Recebemos seu contato!
        </h3>
        <p className="text-green-200 mt-3">
          Em breve entraremos em contato pelo WhatsApp.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-zinc-900 rounded-xl p-8 border border-zinc-800">
      <h2 className="text-2xl font-bold mb-2">
        🚀 Quero saber mais
      </h2>

      <p className="text-zinc-400 mb-6">
        Deixe seu contato e entraremos em contato para apresentar
        o Radar Vivo e como ele pode ajudar sua agência.
      </p>

      <div className="grid md:grid-cols-2 gap-4">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Seu nome"
          className="p-4 rounded-lg bg-zinc-800 border border-zinc-700 text-white outline-none focus:border-green-400"
        />

        <input
          value={whatsapp}
          onChange={(e) => setWhatsapp(e.target.value)}
          placeholder="WhatsApp com DDD (ex.: 11999998888)"
          inputMode="tel"
          className="p-4 rounded-lg bg-zinc-800 border border-zinc-700 text-white outline-none focus:border-green-400"
        />
      </div>

      {erro && (
        <p className="text-red-400 mt-4">{erro}</p>
      )}

      <button
        onClick={salvar}
        disabled={enviando}
        className="mt-6 w-full bg-green-500 hover:bg-green-400 transition text-black font-bold py-4 rounded-lg text-lg disabled:opacity-60"
      >
        {enviando ? "Enviando..." : "Enviar contato"}
      </button>

      <p className="text-zinc-500 text-sm mt-4">
        Sem compromisso. Resposta em até 48h.
      </p>
    </div>
  );
}
