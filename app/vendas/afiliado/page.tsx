"use client";

import Link from "next/link";
import Image from "next/image";

export default function VendasAfiliadoPage() {
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
          <p className="text-green-400 font-semibold text-sm mb-4 tracking-wider uppercase">PROGRAMA DE AFILIADOS</p>
          <h1 className="text-4xl md:text-6xl font-black leading-tight mb-6">
            Ganhe <span className="text-green-400">R$ 100 por venda</span> indicando o Radar Vivo
          </h1>
          <p className="text-neutral-400 text-lg max-w-2xl mx-auto mb-8">
            Indique o Radar Vivo para agências e consultores de marketing. Para cada assinatura que eles fecharem, você ganha comissão. Sem estoque, sem suporte, sem complicação.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/login" className="bg-green-500 hover:bg-green-400 text-black font-bold px-8 py-4 rounded-xl text-lg transition">
              Quero ser afiliado →
            </Link>
            <a
              href="https://wa.me/5581988867233?text=Ol%C3%A1!%20Quero%20ser%20afiliado%20do%20Radar%20Vivo."
              target="_blank"
              rel="noopener noreferrer"
              className="border border-green-500/50 text-green-400 hover:bg-green-500/10 font-bold px-8 py-4 rounded-xl text-lg transition"
            >
              Falar no WhatsApp
            </a>
          </div>
        </div>

        {/* Por que ser afiliado */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-8 text-center">
            <span className="text-green-400">Por que</span> ser afiliado?
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-green-950 border border-green-800 rounded-2xl p-6">
              <span className="text-3xl mb-3 block">💰</span>
              <h3 className="font-bold text-lg mb-2">R$ 100 por venda</h3>
              <p className="text-neutral-400 text-sm">Para cada cliente que assinar pelo seu link, você ganha R$ 100. Venda 10 por mês = R$ 1.000 extra.</p>
            </div>
            <div className="bg-green-950 border border-green-800 rounded-2xl p-6">
              <span className="text-3xl mb-3 block">🎯</span>
              <h3 className="font-bold text-lg mb-2">Fácil de vender</h3>
              <p className="text-neutral-400 text-sm">O Radar Vivo se vende sozinho. O relatório gratuito já mostra a dor. Você só precisa compartilhar o link.</p>
            </div>
            <div className="bg-green-950 border border-green-800 rounded-2xl p-6">
              <span className="text-3xl mb-3 block">🔄</span>
              <h3 className="font-bold text-lg mb-2">Recorrência</h3>
              <p className="text-neutral-400 text-sm">Enquanto o cliente continuar assinando, você continua ganhando. Comissão mensal recorrente.</p>
            </div>
          </div>
        </section>

        {/* Como funciona */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-8 text-center">
            <span className="text-green-400">Como funciona</span>
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-14 h-14 bg-green-500/20 border border-green-500/30 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <span className="text-xl font-black text-green-400">1</span>
              </div>
              <h3 className="font-bold text-sm mb-1">Cadastre-se</h3>
              <p className="text-neutral-500 text-xs">Crie sua conta gratuita e receba seu link exclusivo</p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 bg-green-500/20 border border-green-500/30 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <span className="text-xl font-black text-green-400">2</span>
              </div>
              <h3 className="font-bold text-sm mb-1">Compartilhe</h3>
              <p className="text-neutral-500 text-xs">Mande seu link para agências e consultores</p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 bg-green-500/20 border border-green-500/30 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <span className="text-xl font-black text-green-400">3</span>
              </div>
              <h3 className="font-bold text-sm mb-1">Eles assinam</h3>
              <p className="text-neutral-500 text-xs">O cliente vê o Scanner, testa grátis e assina o plano Pro</p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 bg-green-500/20 border border-green-500/30 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <span className="text-xl font-black text-green-400">4</span>
              </div>
              <h3 className="font-bold text-sm mb-1">Você ganha</h3>
              <p className="text-neutral-500 text-xs">R$ 100 caem na sua conta. Todo mês.</p>
            </div>
          </div>
        </section>

        {/* Calculadora */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Quanto você pode <span className="text-green-400">ganhar?</span>
          </h2>
          <div className="bg-neutral-900 border border-green-500/30 rounded-2xl p-8 md:p-12 max-w-3xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <p className="text-5xl font-black text-green-400 mb-2">5</p>
                <p className="text-neutral-400 text-sm mb-1">vendas/mês</p>
                <p className="text-2xl font-bold text-white">R$ 500</p>
                <p className="text-neutral-500 text-xs">extra por mês</p>
              </div>
              <div>
                <p className="text-5xl font-black text-green-400 mb-2">10</p>
                <p className="text-neutral-400 text-sm mb-1">vendas/mês</p>
                <p className="text-2xl font-bold text-white">R$ 1.000</p>
                <p className="text-neutral-500 text-xs">extra por mês</p>
              </div>
              <div>
                <p className="text-5xl font-black text-green-400 mb-2">20</p>
                <p className="text-neutral-400 text-sm mb-1">vendas/mês</p>
                <p className="text-2xl font-bold text-white">R$ 2.000</p>
                <p className="text-neutral-500 text-xs">extra por mês</p>
              </div>
            </div>
            <p className="text-center text-neutral-500 text-sm mt-8">* Comissão recorrente: enquanto o cliente mantiver a assinatura</p>
          </div>
        </section>

        {/* Vantagens */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Vantagens do <span className="text-green-400">programa</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
              <h3 className="font-bold text-lg mb-3 text-green-400">✓ Sem estoque</h3>
              <p className="text-neutral-400 text-sm">Produto 100% digital. Você não precisa comprar nada, guardar nada ou enviar nada.</p>
            </div>
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
              <h3 className="font-bold text-lg mb-3 text-green-400">✓ Sem suporte</h3>
              <p className="text-neutral-400 text-sm">O suporte é por nossa conta. Você só indica, a gente cuida do resto.</p>
            </div>
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
              <h3 className="font-bold text-lg mb-3 text-green-400">✓ Comissão recorrente</h3>
              <p className="text-neutral-400 text-sm">Enquanto o cliente pagar, você ganha. Não é venda única — é renda mensal.</p>
            </div>
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
              <h3 className="font-bold text-lg mb-3 text-green-400">✓ Métricas em tempo real</h3>
              <p className="text-neutral-400 text-sm">Dashboard para acompanhar suas indicações, conversões e quanto já ganhou.</p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Perguntas <span className="text-green-400">frequentes</span>
          </h2>
          <div className="space-y-4 max-w-2xl mx-auto">
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
              <h3 className="font-bold mb-2">Como recebo a comissão?</h3>
              <p className="text-neutral-400 text-sm">O pagamento é feito via Pix ou transferência bancária, todo mês, referente às vendas do mês anterior.</p>
            </div>
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
              <h3 className="font-bold mb-2">Preciso ter empresa para ser afiliado?</h3>
              <p className="text-neutral-400 text-sm">Não. Qualquer pessoa pode se cadastrar. Se tiver empresa, emite nota fiscal. Se não tiver, trabalhamos como pessoa física.</p>
            </div>
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
              <h3 className="font-bold mb-2">A comissão é recorrente?</h3>
              <p className="text-neutral-400 text-sm">Sim! Enquanto o cliente que você indicou mantiver a assinatura ativa, você recebe R$ 100 todo mês.</p>
            </div>
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
              <h3 className="font-bold mb-2">Preciso saber vender?</h3>
              <p className="text-neutral-400 text-sm">Não precisa ser expert em vendas. O Radar Vivo tem um relatório gratuito que já mostra a dor do cliente. É só compartilhar o link.</p>
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <div className="text-center bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-2xl p-10">
          <h2 className="text-3xl font-bold mb-4">Comece a ganhar hoje</h2>
          <p className="text-neutral-400 mb-8 max-w-lg mx-auto">
            Cadastre-se agora, receba seu link exclusivo e comece a indicar. É grátis e sem compromisso.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/login" className="bg-green-500 hover:bg-green-400 text-black font-bold px-8 py-4 rounded-xl text-lg transition">
              Quero ser afiliado →
            </Link>
            <a
              href="https://wa.me/5581988867233?text=Ol%C3%A1!%20Quero%20ser%20afiliado%20do%20Radar%20Vivo."
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
