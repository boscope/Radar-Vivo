"use client";

import Link from "next/link";
import Image from "next/image";

export default function InstagramPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero mobile-first */}
      <div className="max-w-lg mx-auto px-6 py-12 text-center">

        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <Image src="/logo-512.png" alt="Radar Vivo" width={48} height={48} className="rounded-xl" />
          <span className="text-2xl font-black">
            <span className="text-green-400">Radar</span>
            <span className="text-white">Vivo</span>
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-3xl md:text-4xl font-black leading-tight mb-4">
          Quanto sua empresa está <span className="text-red-400">perdendo</span> no Google?
        </h1>
        <p className="text-neutral-400 text-base mb-8">
          Descubra em 60 segundos. Análise gratuita com inteligência artificial.
        </p>

        {/* Score preview */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 mb-8">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="w-16 h-16 mx-auto border-3 border-red-500 rounded-full flex items-center justify-center mb-2">
                <span className="text-2xl font-black text-red-400">34</span>
              </div>
              <p className="text-neutral-500 text-xs">Exemplo de Score</p>
            </div>
            <div>
              <div className="w-16 h-16 mx-auto border-3 border-yellow-500 rounded-full flex items-center justify-center mb-2">
                <span className="text-2xl font-black text-yellow-400">67</span>
              </div>
              <p className="text-neutral-500 text-xs">Bom</p>
            </div>
            <div>
              <div className="w-16 h-16 mx-auto border-3 border-green-500 rounded-full flex items-center justify-center mb-2">
                <span className="text-2xl font-black text-green-400">92</span>
              </div>
              <p className="text-neutral-500 text-xs">Excelente</p>
            </div>
          </div>
        </div>

        {/* CTA Principal */}
        <Link
          href="/scanner"
          className="block bg-green-500 hover:bg-green-400 text-black font-black text-lg py-4 rounded-2xl transition mb-4"
        >
          Analisar minha empresa grátis →
        </Link>

        <p className="text-neutral-500 text-xs mb-8">
          Sem cadastro · Resultado em 60 segundos · 100% gratuito
        </p>

        {/* Benefícios rápidos */}
        <div className="space-y-3 text-left mb-8">
          <div className="flex items-center gap-3 bg-neutral-900 border border-neutral-800 rounded-xl p-4">
            <span className="text-2xl">🔍</span>
            <div>
              <p className="font-bold text-sm">Análise completa</p>
              <p className="text-neutral-400 text-xs">Google, redes sociais, IA, concorrentes</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-neutral-900 border border-neutral-800 rounded-xl p-4">
            <span className="text-2xl">📊</span>
            <div>
              <p className="font-bold text-sm">Score de presença digital</p>
              <p className="text-neutral-400 text-xs">Número claro que mostra se está bem ou mal</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-neutral-900 border border-neutral-800 rounded-xl p-4">
            <span className="text-2xl">💰</span>
            <div>
              <p className="font-bold text-sm">Quanto está perdendo</p>
              <p className="text-neutral-400 text-xs">Estimativa de quanto deixa de faturar por mês</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-neutral-900 border border-neutral-800 rounded-xl p-4">
            <span className="text-2xl">📄</span>
            <div>
              <p className="font-bold text-sm">Relatório PDF</p>
              <p className="text-neutral-400 text-xs">Pronto pra salvar e compartilhar</p>
            </div>
          </div>
        </div>

        {/* WhatsApp */}
        <a
          href="https://wa.me/5581988867233?text=Ol%C3%A1!%20Vim%20pelo%20Instagram%20e%20quero%20analisar%20minha%20empresa."
          target="_blank"
          rel="noopener noreferrer"
          className="block border border-green-500/50 text-green-400 hover:bg-green-500/10 font-bold py-4 rounded-2xl transition text-lg"
        >
          💬 Falar no WhatsApp
        </a>

        <p className="text-neutral-600 text-xs mt-8">
          Radar Vivo · Análise de presença digital com IA
        </p>
      </div>
    </main>
  );
}
