"use client";

import Link from "next/link";
import Image from "next/image";

export default function ApresentacaoPage() {
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
          <p className="text-green-400 font-semibold text-sm mb-4 tracking-wider uppercase">PARA AGENCIAS E CONSULTORES</p>
          <h1 className="text-4xl md:text-6xl font-black leading-tight mb-6">
            Pare de <span className="text-red-400">perder clientes</span> por falta de presença digital
          </h1>
          <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
            O Radar Vivo analisa a presença digital de qualquer empresa em 60 segundos e mostra exatamente o que fazer para atrair mais clientes.
          </p>
        </div>

        {/* Problema */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-8 text-center">
            <span className="text-red-400">O problema</span> que todo dono de negócio ignora
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-red-950 border border-red-800 rounded-2xl p-6 text-center">
              <span className="text-4xl mb-4 block">🔍</span>
              <h3 className="font-bold text-lg mb-2">73% das buscas locais</h3>
              <p className="text-neutral-400 text-sm">Começam no Google. Se a empresa não aparece, ela não existe pro cliente.</p>
            </div>
            <div className="bg-red-950 border border-red-800 rounded-2xl p-6 text-center">
              <span className="text-4xl mb-4 block">💸</span>
              <h3 className="font-bold text-lg mb-2">R$ 4.800/mês em perdas</h3>
              <p className="text-neutral-400 text-sm">É o que uma empresa local perde em média por não ter presença digital completa.</p>
            </div>
            <div className="bg-red-950 border border-red-800 rounded-2xl p-6 text-center">
              <span className="text-4xl mb-4 block">🏃</span>
              <h3 className="font-bold text-lg mb-2">Concorrentes já estão lá</h3>
              <p className="text-neutral-400 text-sm">Enquanto seu cliente hesita, o concorrente investe e captura os clientes dele.</p>
            </div>
          </div>
        </section>

        {/* Solução */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-8 text-center">
            A <span className="text-green-400">solução</span> que cabe no seu bolso
          </h2>
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-4">Radar Scanner</h3>
                <p className="text-neutral-400 mb-6">
                  Em 60 segundos, o Radar Vivo analisa a presença digital completa de qualquer empresa e gera um relatório profissional com:
                </p>
                <ul className="space-y-3">
                  {[
                    "Score de presença digital (0 a 100)",
                    "Comparativo com concorrentes da região",
                    "Lista de pontos fracos com impacto financeiro",
                    "Plano de ação com serviços recomendados",
                    "Presença em IA (ChatGPT, Gemini, Perplexity)",
                    "Relatório PDF pronto para enviar ao cliente",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-green-400 mt-1">✓</span>
                      <span className="text-neutral-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-black border border-neutral-700 rounded-xl p-6">
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto border-4 border-red-500 rounded-full flex items-center justify-center mb-4">
                    <span className="text-4xl font-black text-red-400">34</span>
                  </div>
                  <p className="text-neutral-400 text-sm mb-2">Radar Score</p>
                  <p className="text-lg font-bold text-red-400">Presença Digital Fraca</p>
                  <p className="text-neutral-500 text-xs mt-2">Essa empresa está perdendo clientes</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Como funciona */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-8 text-center">
            <span className="text-green-400">3 passos</span> para fechar mais clientes
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500/20 border border-green-500/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-black text-green-400">1</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Analise a empresa</h3>
              <p className="text-neutral-400 text-sm">Digite o nome da empresa no Radar Scanner. Em 60 segundos você tem o diagnóstico completo.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500/20 border border-green-500/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-black text-green-400">2</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Apresente o relatório</h3>
              <p className="text-neutral-400 text-sm">Mostre ao cliente os pontos fracos e o quanto ele está perdendo. O relatório PDF é a prova concreta.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500/20 border border-green-500/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-black text-green-400">3</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Feche o contrato</h3>
              <p className="text-neutral-400 text-sm">Com a dor exposta, o cliente entende que precisa de ajuda. Ofereça o pacote e feche na hora.</p>
            </div>
          </div>
        </section>

        {/* Depoimentos */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-8 text-center">
            O que nossos <span className="text-green-400">parceiros</span> dizem
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
              <p className="text-neutral-300 mb-4 italic">
                &ldquo;Com o Radar Vivo, fechei 3 contratos na primeira semana. O relatório PDF é impressionante — os clientes levam a sério quando veem os números.&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
                  <span className="text-green-400 font-bold">M</span>
                </div>
                <div>
                  <p className="font-bold text-sm">Marcos Silva</p>
                  <p className="text-neutral-500 text-xs">Agência Digital · São Paulo</p>
                </div>
              </div>
            </div>
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
              <p className="text-neutral-300 mb-4 italic">
                &ldquo;Antes eu levava 2 horas pra fazer uma proposta. Agora levo 5 minutos — o Radar Vivo faz o diagnóstico completo sozinho.&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
                  <span className="text-green-400 font-bold">A</span>
                </div>
                <div>
                  <p className="font-bold text-sm">Ana Costa</p>
                  <p className="text-neutral-500 text-xs">Consultora de Marketing · Recife</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Preço */}
        <section className="mb-20 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Quanto vale <span className="text-green-400">fechar 1 contrato</span> de R$ 500/mês?
          </h2>
          <p className="text-neutral-400 mb-8 max-w-xl mx-auto">
            Com R$ 197/mês no Radar Vivo, você só precisa fechar <strong className="text-white">1 cliente</strong> para o investimento se pagar. O resto é lucro.
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
          <h2 className="text-3xl font-bold mb-4">Pronto para começar?</h2>
          <p className="text-neutral-400 mb-8 max-w-lg mx-auto">
            Analise a empresa do seu cliente agora mesmo e veja o poder do Radar Vivo na prática.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/scanner" className="bg-green-500 hover:bg-green-400 text-black font-bold px-8 py-4 rounded-xl text-lg transition">
              Testar grátis agora →
            </Link>
            <a
              href="https://wa.me/5581988867233?text=Ol%C3%A1!%20Quero%20saber%20mais%20sobre%20o%20Radar%20Vivo."
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
