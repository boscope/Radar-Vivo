"use client";

import Link from "next/link";
import Image from "next/image";

export default function VendasConsultorPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-neutral-800 bg-black/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo-512.png" alt="Radar Vivo" width={32} height={32} className="rounded-lg" />
            <span className="text-lg font-bold">
              <span className="text-green-400">Radar</span>
              <span className="text-white">Vivo</span>
            </span>
          </Link>
          <Link href="/#precos" className="bg-green-500 hover:bg-green-400 text-black font-bold px-5 py-2 rounded-lg text-sm transition">
            Assinar agora
          </Link>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-16">

        {/* Hero */}
        <div className="text-center mb-20">
          <p className="text-green-400 font-semibold text-sm mb-4 tracking-wider uppercase">PARA CONSULTORES DE MARKETING</p>
          <h1 className="text-4xl md:text-6xl font-black leading-tight mb-6">
            Chega de <span className="text-red-400">achar clientes</span>. Deixe o Radar Vivo trazê-los pra você
          </h1>
          <p className="text-neutral-400 text-lg max-w-2xl mx-auto mb-8">
            Como consultor, você sabe que o maior desafio não é entregar resultado — é provar que o cliente precisa de você. O Radar Vivo faz essa prova em 60 segundos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/scanner" className="bg-green-500 hover:bg-green-400 text-black font-bold px-8 py-4 rounded-xl text-lg transition">
              Testar grátis agora →
            </Link>
            <a
              href="https://wa.me/5581988867233?text=Ol%C3%A1!%20Sou%20consultor%20e%20quero%20saber%20mais%20sobre%20o%20Radar%20Vivo."
              target="_blank"
              rel="noopener noreferrer"
              className="border border-green-500/50 text-green-400 hover:bg-green-500/10 font-bold px-8 py-4 rounded-xl text-lg transition"
            >
              Falar com especialista
            </a>
          </div>
        </div>

        {/* Dor do consultor */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-8 text-center">
            <span className="text-red-400">O que todo consultor</span> já passou
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-red-950 border border-red-800 rounded-2xl p-6">
              <span className="text-3xl mb-3 block">🤷</span>
              <h3 className="font-bold text-lg mb-2">&quot;Vou pensar&quot;</h3>
              <p className="text-neutral-400 text-sm">O cliente ouve sua proposta, diz que vai pensar e some. Sem prova da dor, ele não sente urgência.</p>
            </div>
            <div className="bg-red-950 border border-red-800 rounded-2xl p-6">
              <span className="text-3xl mb-3 block">⏰</span>
              <h3 className="font-bold text-lg mb-2">Horas perdidas</h3>
              <p className="text-neutral-400 text-sm">Você gasta 2-3 horas fazendo diagnóstico manual de cada prospect — tempo que poderia estar faturando.</p>
            </div>
            <div className="bg-red-950 border border-red-800 rounded-2xl p-6">
              <span className="text-3xl mb-3 block">📉</span>
              <h3 className="font-bold text-lg mb-2">Preço baixo</h3>
              <p className="text-neutral-400 text-sm">Sem mostrar o impacto financeiro, o cliente barganha e você fecha abaixo do valor justo pelo seu trabalho.</p>
            </div>
          </div>
        </section>

        {/* Solução */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-8 text-center">
            O <span className="text-green-400">arma secreta</span> do consultor
          </h2>
          <div className="bg-neutral-900 border border-green-500/30 rounded-2xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <p className="text-neutral-300 mb-6">
                  O Radar Scanner faz o diagnóstico que você fazia em horas, em <strong className="text-white">60 segundos</strong>. E gera um relatório que o cliente leva a sério:
                </p>
                <ul className="space-y-3">
                  {[
                    "Score numérico que mostra a urgência (0-100)",
                    "Impacto financeiro estimado — quanto ele está perdendo",
                    "Comparativo com concorrentes — prova que o concorrente já está à frente",
                    "Plano de ação com serviços — sua proposta já escrita",
                    "Presença em IAs — diferencial que nenhum consultor oferece",
                    "PDF pronto para enviar — sem trabalho extra",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-green-400 mt-0.5">✓</span>
                      <span className="text-neutral-300 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-black border border-neutral-700 rounded-xl p-6">
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 mb-4">
                  <p className="text-green-400 font-bold text-sm mb-1">Resultado típico:</p>
                  <p className="text-white text-lg font-bold">Consultor fecha 2-3 contratos/semana</p>
                  <p className="text-neutral-400 text-xs mt-1">usando o Radar Scanner como prova</p>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-neutral-400">
                    <span>Tempo de diagnóstico:</span>
                    <span className="text-green-400 font-bold">60 segundos</span>
                  </div>
                  <div className="flex justify-between text-neutral-400">
                    <span>Taxa de fechamento:</span>
                    <span className="text-green-400 font-bold">3x maior</span>
                  </div>
                  <div className="flex justify-between text-neutral-400">
                    <span>Ticket médio:</span>
                    <span className="text-green-400 font-bold">+40% maior</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Como usar como consultor */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-8 text-center">
            <span className="text-green-400">Como usar</span> como consultor
          </h2>
          <div className="space-y-6">
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 flex items-start gap-4">
              <div className="w-12 h-12 bg-green-500/20 border border-green-500/30 rounded-xl flex items-center justify-center shrink-0">
                <span className="text-green-400 font-bold">1</span>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Analise antes da reunião</h3>
                <p className="text-neutral-400 text-sm">Antes de marcar a reunião, rode o Radar Scanner na empresa do prospect. Chegue na reunião já sabendo exatamente o que o cliente precisa.</p>
              </div>
            </div>
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 flex items-start gap-4">
              <div className="w-12 h-12 bg-green-500/20 border border-green-500/30 rounded-xl flex items-center justify-center shrink-0">
                <span className="text-green-400 font-bold">2</span>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Use o relatório como prova</h3>
                <p className="text-neutral-400 text-sm">Na reunião, mostre o score, o impacto financeiro e o comparativo com concorrentes. O cliente vê os números e entende a urgência.</p>
              </div>
            </div>
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 flex items-start gap-4">
              <div className="w-12 h-12 bg-green-500/20 border border-green-500/30 rounded-xl flex items-center justify-center shrink-0">
                <span className="text-green-400 font-bold">3</span>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Feche com confiança</h3>
                <p className="text-neutral-400 text-sm">O plano de ação do relatório já lista os serviços que o cliente precisa. Você só precisa colocar o preço e fechar.</p>
              </div>
            </div>
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 flex items-start gap-4">
              <div className="w-12 h-12 bg-green-500/20 border border-green-500/30 rounded-xl flex items-center justify-center shrink-0">
                <span className="text-green-400 font-bold">4</span>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Envie o PDF por WhatsApp</h3>
                <p className="text-neutral-400 text-sm">Não conseguiu fechar na hora? Envie o relatório PDF pelo WhatsApp. O cliente vai olhar os números e voltar pra fechar.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Preço */}
        <section className="mb-20 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Um contrato de <span className="text-green-400">R$ 800/mês</span> paga o Radar Vivo
          </h2>
          <p className="text-neutral-400 mb-8 max-w-xl mx-auto">
            Feche apenas <strong className="text-white">1 cliente</strong> por mês e o investimento se paga. O resto é lucro do seu trabalho.
          </p>
          <div className="bg-neutral-900 border border-green-500/30 rounded-2xl p-8 max-w-md mx-auto">
            <p className="text-neutral-500 text-sm mb-2">Plano Pro</p>
            <p className="text-5xl font-black text-white mb-2">R$ 197<span className="text-lg font-normal text-neutral-500">/mês</span></p>
            <p className="text-neutral-400 text-sm mb-6">Sem fidelidade · Cancele quando quiser</p>
            <ul className="text-left space-y-2 mb-6 text-sm text-neutral-300">
              <li>✓ Análises ilimitadas</li>
              <li>✓ Relatórios PDF completos</li>
              <li>✓ Comparativo de concorrentes</li>
              <li>✓ Presença em IAs</li>
              <li>✓ Suporte por WhatsApp</li>
            </ul>
            <Link href="/#precos" className="block bg-green-500 hover:bg-green-400 text-black font-bold py-4 rounded-xl transition text-lg">
              Assinar agora →
            </Link>
          </div>
        </section>

        {/* CTA Final */}
        <div className="text-center bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-2xl p-10">
          <h2 className="text-3xl font-bold mb-4">Chega de trabalhar grátis</h2>
          <p className="text-neutral-400 mb-8 max-w-lg mx-auto">
            Analise uma empresa agora e veja como o Radar Scanner transforma seu processo de vendas como consultor.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/scanner" className="bg-green-500 hover:bg-green-400 text-black font-bold px-8 py-4 rounded-xl text-lg transition">
              Testar grátis agora →
            </Link>
            <a
              href="https://wa.me/5581988867233?text=Ol%C3%A1!%20Sou%20consultor%20e%20quero%20saber%20mais%20sobre%20o%20Radar%20Vivo."
              target="_blank"
              rel="noopener noreferrer"
              className="border border-green-500/50 text-green-400 hover:bg-green-500/10 font-bold px-8 py-4 rounded-xl text-lg transition"
            >
              Falar no WhatsApp
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
