"use client";

import Link from "next/link";
import Image from "next/image";

export default function VendasAgenciaPage() {
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
          <p className="text-green-400 font-semibold text-sm mb-4 tracking-wider uppercase">PARA AGENCIAS DE MARKETING</p>
          <h1 className="text-4xl md:text-6xl font-black leading-tight mb-6">
            Feche <span className="text-green-400">3x mais contratos</span> com relatórios que provam a dor
          </h1>
          <p className="text-neutral-400 text-lg max-w-2xl mx-auto mb-8">
            O Radar Vivo analisa a presença digital de qualquer empresa em 60 segundos e gera um relatório profissional que fecha contratos na hora.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/scanner" className="bg-green-500 hover:bg-green-400 text-black font-bold px-8 py-4 rounded-xl text-lg transition">
              Testar grátis agora →
            </Link>
            <a
              href="https://wa.me/5581988867233?text=Ol%C3%A1!%20Tenho%20uma%20ag%C3%AAncia%20e%20quero%20saber%20mais%20sobre%20o%20Radar%20Vivo."
              target="_blank"
              rel="noopener noreferrer"
              className="border border-green-500/50 text-green-400 hover:bg-green-500/10 font-bold px-8 py-4 rounded-xl text-lg transition"
            >
              Falar com especialista
            </a>
          </div>
        </div>

        {/* Dor da agência */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-8 text-center">
            <span className="text-red-400">A dor</span> de toda agência
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-red-950 border border-red-800 rounded-2xl p-6">
              <span className="text-3xl mb-3 block">😤</span>
              <h3 className="font-bold text-lg mb-2">Reunião sem prova</h3>
              <p className="text-neutral-400 text-sm">Você chega na reunião com powerpoint genérico. O cliente não vê a urgência e diz que &quot;vai pensar&quot;.</p>
            </div>
            <div className="bg-red-950 border border-red-800 rounded-2xl p-6">
              <span className="text-3xl mb-3 block">📉</span>
              <h3 className="font-bold text-lg mb-2">Proposta barata</h3>
              <p className="text-neutral-400 text-sm">Sem prova de que o cliente precisa de ajuda, ele barganha o preço e você acaba fechando abaixo do valor justo.</p>
            </div>
            <div className="bg-red-950 border border-red-800 rounded-2xl p-6">
              <span className="text-3xl mb-3 block">⏱️</span>
              <h3 className="font-bold text-lg mb-2">Horas em diagnóstico</h3>
              <p className="text-neutral-400 text-sm">Você gata 2-3 horas fazendo análise manual de cada prospect. Tempo que poderia estar fechando contrato.</p>
            </div>
          </div>
        </section>

        {/* Solução */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-8 text-center">
            O <span className="text-green-400">Radar Scanner</span> muda o jogo
          </h2>
          <div className="bg-neutral-900 border border-green-500/30 rounded-2xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <p className="text-neutral-300 mb-6">
                  Em 60 segundos, o Radar Scanner analisa a presença digital completa de qualquer empresa e gera um relatório que <strong className="text-white">prova a dor do cliente</strong>:
                </p>
                <ul className="space-y-3">
                  {[
                    "Score de presença digital (0 a 100) — número que o cliente entende",
                    "Impacto financeiro estimado — quanto ele está perdendo por mês",
                    "Comparativo com concorrentes da região — prova que o concorrente já está à frente",
                    "Lista de pontos fracos com serviço recomendado — sua proposta pronta",
                    "Presença em IAs (ChatGPT, Gemini, Perplexity) — diferencial que ninguém oferece",
                    "Relatório PDF profissional com logo da sua agência",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-green-400 mt-0.5">✓</span>
                      <span className="text-neutral-300 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-black border border-neutral-700 rounded-xl p-6">
                <div className="text-center mb-4">
                  <div className="w-20 h-20 mx-auto border-4 border-red-500 rounded-full flex items-center justify-center mb-3">
                    <span className="text-3xl font-black text-red-400">34</span>
                  </div>
                  <p className="text-sm font-bold text-red-400">Presença Digital Fraca</p>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-neutral-400">
                    <span>Impacto estimado:</span>
                    <span className="text-red-400 font-bold">R$ 4.800/mês</span>
                  </div>
                  <div className="flex justify-between text-neutral-400">
                    <span>Concorrentes à frente:</span>
                    <span className="text-red-400 font-bold">3 de 5</span>
                  </div>
                  <div className="flex justify-between text-neutral-400">
                    <span>Pontos fracos:</span>
                    <span className="text-red-400 font-bold">8 problemas</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Fluxo de trabalho */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-8 text-center">
            <span className="text-green-400">Seu novo fluxo</span> de vendas
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-14 h-14 bg-green-500/20 border border-green-500/30 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <span className="text-xl font-black text-green-400">1</span>
              </div>
              <h3 className="font-bold text-sm mb-1">Cadastre o lead</h3>
              <p className="text-neutral-500 text-xs">Adicione a empresa do prospect no painel</p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 bg-green-500/20 border border-green-500/30 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <span className="text-xl font-black text-green-400">2</span>
              </div>
              <h3 className="font-bold text-sm mb-1">Analise em 60s</h3>
              <p className="text-neutral-500 text-xs">O Scanner gera o diagnóstico completo</p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 bg-green-500/20 border border-green-500/30 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <span className="text-xl font-black text-green-400">3</span>
              </div>
              <h3 className="font-bold text-sm mb-1">Envie o PDF</h3>
              <p className="text-neutral-500 text-xs">Compartilhe o relatório com o cliente</p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 bg-green-500/20 border border-green-500/30 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <span className="text-xl font-black text-green-400">4</span>
              </div>
              <h3 className="font-bold text-sm mb-1">Feche o contrato</h3>
              <p className="text-neutral-500 text-xs">O cliente vê a dor e fecha na hora</p>
            </div>
          </div>
        </section>

        {/* O cálculo que fecha */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-8 text-center">
            <span className="text-green-400">O cálculo</span> que agência precisa ver
          </h2>
          <div className="bg-neutral-900 border border-green-500/30 rounded-2xl p-8 md:p-10">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="bg-black border border-neutral-700 rounded-xl p-6">
                <p className="text-neutral-500 text-sm mb-1">Investimento</p>
                <p className="text-3xl font-black text-white mb-2">R$ 197<span className="text-sm text-neutral-500">/mês</span></p>
                <p className="text-neutral-500 text-xs">O Radar Vivo</p>
              </div>
              <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6">
                <p className="text-neutral-400 text-sm mb-1">1 contrato fechado</p>
                <p className="text-3xl font-black text-green-400 mb-2">R$ 500<span className="text-sm text-neutral-500">/mês</span></p>
                <p className="text-neutral-500 text-xs">com o relatório como prova</p>
              </div>
              <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6">
                <p className="text-neutral-400 text-sm mb-1">ROI</p>
                <p className="text-3xl font-black text-green-400 mb-2">2.5x</p>
                <p className="text-neutral-500 text-xs">por mês, com só UM contrato</p>
              </div>
            </div>
            <p className="text-center text-neutral-500 text-sm mt-6">
              Cada contrato extra que o Radar Vivo ajuda a fechar é 100% lucro.
              A ferramenta não custa R$ 197 — ela custa <strong className="text-white">menos de 1 contrato perdido</strong>.
            </p>
          </div>
        </section>

        {/* Prova real */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Veja a <span className="text-green-400">prova</span> na prática
          </h2>
          <p className="text-neutral-400 text-center max-w-xl mx-auto mb-8">
            Digite o nome de uma empresa da sua região no Scanner e veja o relatório completo
            que você enviaria ao cliente. Leva 60 segundos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/scanner" className="bg-green-500 hover:bg-green-400 text-black font-bold px-8 py-4 rounded-xl text-lg transition">
              🚀 Testar com uma empresa real →
            </Link>
            <Link href="/demo" className="border border-green-500/50 text-green-400 hover:bg-green-500/10 font-bold px-8 py-4 rounded-xl text-lg transition">
              Ver relatório de exemplo
            </Link>
          </div>
        </section>

        {/* Números */}
        <section className="mb-20">
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8">
              <p className="text-5xl font-black text-green-400 mb-2">60s</p>
              <p className="text-neutral-400">Tempo para gerar o relatório</p>
            </div>
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8">
              <p className="text-5xl font-black text-green-400 mb-2">3x</p>
              <p className="text-neutral-400">Mais contratos fechados</p>
            </div>
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8">
              <p className="text-5xl font-black text-green-400 mb-2">R$ 4.8k</p>
              <p className="text-neutral-400">Impacto médio por cliente</p>
            </div>
          </div>
        </section>

        {/* Preço */}
        <section className="mb-20 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Um contrato de <span className="text-green-400">R$ 500/mês</span> paga o Radar Vivo
          </h2>
          <p className="text-neutral-400 mb-8 max-w-xl mx-auto">
            Feche apenas <strong className="text-white">1 cliente</strong> por mês e o investimento se paga. O resto é lucro puro.
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
          <h2 className="text-3xl font-bold mb-4">Pare de perder clientes</h2>
          <p className="text-neutral-400 mb-8 max-w-lg mx-auto">
            Analise uma empresa agora mesmo e veja como o Radar Scanner transforma seu processo de vendas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/scanner" className="bg-green-500 hover:bg-green-400 text-black font-bold px-8 py-4 rounded-xl text-lg transition">
              Testar grátis agora →
            </Link>
            <a
              href="https://wa.me/5581988867233?text=Ol%C3%A1!%20Tenho%20uma%20ag%C3%AAncia%20e%20quero%20saber%20mais%20sobre%20o%20Radar%20Vivo."
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
