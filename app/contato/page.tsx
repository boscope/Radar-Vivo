"use client";

import { useState } from "react";
import Link from "next/link";

export default function ContatoPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message }),
      });

      if (res.ok) {
        setSent(true);
      } else {
        alert("Erro ao enviar. Tente novamente ou envie para radarvivocontato@gmail.com");
      }
    } catch {
      alert("Erro de conexão. Tente novamente.");
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="border-b border-neutral-800 px-6 py-4">
        <Link href="/" className="text-xl font-bold">
          <span className="text-green-400">Radar</span>
          <span className="text-white">Vivo</span>
        </Link>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-2">Contato</h1>
        <p className="text-neutral-400 text-sm mb-8">
          Dúvidas, sugestões ou exercer seus direitos LGPD. Envie sua mensagem.
        </p>

        {sent ? (
          <div className="border border-green-500/30 rounded-xl p-8 text-center">
            <div className="text-4xl mb-4">✅</div>
            <h2 className="text-xl font-semibold mb-2">Mensagem enviada!</h2>
            <p className="text-neutral-400 text-sm">
              Respondemos em até 48 horas úteis.
            </p>
            <Link
              href="/"
              className="inline-block mt-4 text-green-400 hover:underline text-sm"
            >
              ← Voltar para o início
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-neutral-300 mb-1">Nome</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-500 transition"
                placeholder="Seu nome"
              />
            </div>

            <div>
              <label className="block text-sm text-neutral-300 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-500 transition"
                placeholder="seu@email.com"
              />
            </div>

            <div>
              <label className="block text-sm text-neutral-300 mb-1">Assunto</label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
                className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-500 transition"
              >
                <option value="">Selecione...</option>
                <option value="LGPD">Quero exercer meus direitos (LGPD)</option>
                <option value="Dados">Dúvida sobre meus dados</option>
                <option value="Exclusão">Solicitar exclusão de dados</option>
                <option value="Suporte">Suporte técnico</option>
                <option value="Cobrança">Dúvida sobre cobrança/pagamento</option>
                <option value="Outro">Outro assunto</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-neutral-300 mb-1">Mensagem</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows={5}
                className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-500 transition resize-none"
                placeholder="Descreva sua solicitação..."
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-500 hover:bg-green-400 text-black font-semibold rounded-lg px-4 py-3 transition disabled:opacity-50"
            >
              {loading ? "Enviando..." : "Enviar mensagem"}
            </button>

            <p className="text-center text-neutral-500 text-xs">
              Resposta em até 48 horas úteis. Para urgentes:{" "}
              <a
                href="mailto:radarvivocontato@gmail.com"
                className="text-green-400 hover:underline"
              >
                radarvivocontato@gmail.com
              </a>
            </p>
          </form>
        )}
      </main>
    </div>
  );
}
