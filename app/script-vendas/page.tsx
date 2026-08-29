"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  async function copiar() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      onClick={copiar}
      className="text-xs bg-neutral-800 hover:bg-neutral-700 text-neutral-300 px-3 py-1 rounded-md transition border border-neutral-700"
    >
      {copied ? "✓ Copiado!" : "Copiar"}
    </button>
  );
}

function TemplateCard({ title, text,}: { title: string; text: string; }) {
  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-bold text-sm">{title}</h3>
        <CopyButton text={text} />
      </div>
      <div className="bg-neutral-950 border border-neutral-800 rounded-lg p-4 text-sm text-neutral-300 whitespace-pre-line leading-relaxed">
        {text}
      </div>
    </div>
  );
}

export default function ScriptVendasPage() {
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
          <Link href="/scanner" className="bg-green-500 hover:bg-green-400 text-black font-bold px-5 py-2 rounded-lg text-sm transition">
            Abrir Scanner
          </Link>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-16">

        {/* Title */}
        <div className="text-center mb-16">
          <p className="text-green-400 font-semibold text-sm mb-4 tracking-wider uppercase">SCRIPT DE VENDAS</p>
          <h1 className="text-4xl md:text-5xl font-black mb-4">
            Como <span className="text-green-400">fechar mais clientes</span> com o Radar Vivo
          </h1>
          <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
            Templates prontos, objeções mapeadas e passo a passo para abordar, apresentar e fechar.
          </p>
        </div>

        {/* PASSO 0 - ABORDAGEM PARA AGÊNCIAS E CONSULTORES */}
        <section className="mb-16">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-12 h-12 bg-amber-500/20 border border-amber-500/30 rounded-xl flex items-center justify-center">
              <span className="text-xl font-black text-amber-400">⭐</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold">Abordagem para agências e consultores</h2>
              <p className="text-neutral-500 text-sm">Seu público principal — venda a ferramenta de vendas, não a análise</p>
            </div>
          </div>
          <div className="bg-amber-950 border border-amber-800 rounded-xl p-5 mb-6">
            <p className="text-amber-300 text-sm mb-2">
              <strong className="font-bold">💡 A chave:</strong> agência não paga pra analisar a própria empresa.
              Ela paga pra <strong>fechar contratos</strong>. Então nunca venda "análise de presença digital" —
              venda <strong>"a ferramenta que fecha 3x mais contratos com um relatório de 60 segundos"</strong>.
            </p>
            <p className="text-amber-300 text-sm">
              <strong className="font-bold">🎯 O movimento matador:</strong> antes de falar com a agência,
              gere o relatório de UMA empresa da cidade deles (cliente potencial óbvio).
              Chegue com o relatório pronto na mão — é a prova viva do valor.
            </p>
          </div>

          <div className="space-y-4">
            <TemplateCard
              title="WhatsApp — Abordagem agência (com relatório na mão)"
              text={`Olá [DONO DA AGÊNCIA]! 👋

Sou da equipe Radar Vivo. Fizemos uma análise da presença digital da [NOME DA EMPRESA] aqui de [CIDADE] — ela tem [X] pontos fracos e estimamos que está perdendo cerca de R$ [VALOR]/mês em clientes que vão pra concorrência.

Antes de te mostrar o relatório — você prospecta esse tipo de empresa pra fechar contrato de marketing?

✅ Se sim, essa ferramenta é exatamente pra você. Quer que eu te envie o relatório? É rápido e sem comproște.`}
            />

            <TemplateCard
              title="WhatsApp — Follow-up agência (envio do relatório)"
              text={`Pronto [DONO DA AGÊNCIA]! Aqui está o relatório da [NOME DA EMPRESA]:

👉 https://www.radarvivo.com.br/demo/[NOME]

Olha o Radar Score e o impacto financeiro. Isso é o tipo de empresa que fecha contrato de R$ 500+ por mês com você.

Só pra te contextualizar: com o Radar Vivo você GERA esse relatório em 60 segundos pra QUALQUER empresa da sua região. Sem fazer diagnóstico manual, sem gastar horas.

Quer ver uma versão com o nome da SUA agência no relatório?`}
            />

            <TemplateCard
              title="Ligação — Script agência (30 segundos)"
              text={`"Oi [DONO DA AGÊNCIA], tudo bem? Aqui é o [SEU NOME], da Radar Vivo.

A gente tem uma ferramenta que analisa qualquer empresa em 60 segundos e gera um relatório com score, impacto financeiro e plano de ação. Basicamente, a prova pronta que falta pra fechar contrato.

Já analisei a [NOME DA EMPRESA] aqui da sua cidade — ela tá perdendo R$ [VALOR]/mês no Google. Se você prospecta esse tipo de empresa, vale 2 minutos da sua atenção?

Te mando o relatório no WhatsApp?"`}
            />

            <TemplateCard
              title="Proposta agência — o cálculo que fecha"
              text={`[DONO DA AGÊNCIA], o raciocínio é simples:

Com R$ 197/mês no Radar Vivo, você gera relatórios ilimitados que fecham contratos.

Se fechar 1 contrato extra de R$ 500/mês por mês, o Radar se pagou 2,5x. O resto é lucro.

Sem fidelidade. Testa 3 dias grátis. Se não gostar, cancela.

Quero te mostrar como funciona na prática — me dá 15 minutos?`}
            />
          </div>
        </section>

        {/* PASSO 1 */}
        <section className="mb-16">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-green-500/20 border border-green-500/30 rounded-xl flex items-center justify-center">
              <span className="text-xl font-black text-green-400">1</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold">Abordagem inicial</h2>
              <p className="text-neutral-500 text-sm">Primeiro contato — gere curiosidade</p>
            </div>
          </div>

          <div className="space-y-4">
            <TemplateCard
              title="WhatsApp — Primeira mensagem"
              text={`Olá [NOME]! 👋

Sou da equipe Radar Vivo. Fizemos uma análise automática da presença digital da [EMPRESA] no Google e encontramos algumas oportunidades que podem trazer mais clientes pra você.

Quer que eu te mostre os resultados? É rápido e sem compromisso.`}
            />

            <TemplateCard
              title="WhatsApp — Follow-up (se não respondeu em 24h)"
              text={`[NOME], consegui gerar o relatório da [EMPRESA]. 

Tem 3 pontos que podem estar fazendo clientes escolherem seu concorrente em vez de você. 

Posso te mostrar? Leva 2 minutos.`}
            />

            <TemplateCard
              title="Ligação — Script de 30 segundos"
              text={`"Oi [NOME], tudo bem? Aqui é o [SEU NOME], da Radar Vivo.

Estamos fazendo uma análise gratuita da presença digital de empresas da região e a [EMPRESA] apareceu como uma com bastante potencial de crescimento.

Consegui gerar o relatório aqui — tem coisas que o Google tá mostrando pros seus clientes que podem estar afastando eles. Posso te mandar por WhatsApp agora?"`}
            />
          </div>
        </section>

        {/* PASSO 2 */}
        <section className="mb-16">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-green-500/20 border border-green-500/30 rounded-xl flex items-center justify-center">
              <span className="text-xl font-black text-green-400">2</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold">Apresentação do relatório</h2>
              <p className="text-neutral-500 text-sm">Mostre a dor com dados concretos</p>
            </div>
          </div>

          <div className="space-y-4">
            <TemplateCard
              title="WhatsApp — Enviar link do relatório"
              text={`Pronto [NOME]! Aqui está o relatório completo da [EMPRESA]:

👉 https://www.radarvivo.com.br/demo/[EMPRESA]

Olha especialmente o Radar Score e os concorrentes. [CONCORRENTE] tá com score [XX] e tá aparecendo bem mais no Google que vocês.

Quer que eu te explique o que Significa isso na prática?`}
            />

            <TemplateCard
              title="Presencial — Apresentar o relatório"
              text={`"[NOME], olha só o que o Radar Vivo encontrou:

→ O score da [EMPRESA] é [XX] de 100 — isso significa que sua presença digital tá fraca
→ O [CONCORRENTE] tá com [XX] — eles estão aparecendo mais quando alguém busca seu serviço
→ Estimamos que vocês estão perdendo cerca de R$ [VALOR]/mês em clientes que vão pro concorrente

Isso tem solução. Quer ver como?"`}
            />
          </div>
        </section>

        {/* PASSO 3 */}
        <section className="mb-16">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-green-500/20 border border-green-500/30 rounded-xl flex items-center justify-center">
              <span className="text-xl font-black text-green-400">3</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold">Proposta e fechamento</h2>
              <p className="text-neutral-500 text-sm">Transforme a dor em contrato</p>
            </div>
          </div>

          <div className="space-y-4">
            <TemplateCard
              title="WhatsApp — Proposta"
              text={`[NOME], baseado no relatório, o Radar Vivo resolve tudo isso:

✅ Cria site otimizado pra sua região
✅ Otimiza seu perfil no Google
✅ Configura anúncios que trazem clientes
✅ Automatiza agendamentos por WhatsApp
✅ Gera relatórios mensais de resultados

O investimento é R$ 197/mês, sem fidelidade.

Com apenas 1 cliente novo por mês, já se paga. E o melhor: vocês podem cancelar quando quiserem.

Quer que eu comece hoje?`}
            />

            <TemplateCard
              title="Presencial — Fechamento"
              text={`"[NOME], olhando esse relatório, fica claro que a [EMPRESA] tá perdendo clientes pro [CONCORRENTE].

O Radar Vivo resolve exatamente isso: sua empresa aparece quando o cliente busca, e o relatório mostra que tá funcionando.

O plano é R$ 197/mês. Sem fidelidade. Com um cliente novo por mês, já valeu a pena.

Topa começar hoje? Eu configuro tudo pra vocês."`}
            />
          </div>
        </section>

        {/* OBJEÇÕES */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Como responder <span className="text-green-400">objeções</span>
          </h2>

          <div className="space-y-4">
            <div className="bg-amber-950 border border-amber-800 rounded-xl p-6">
              <p className="text-amber-400 font-bold mb-2">❌ Agência: &ldquo;Não tenho interesse&rdquo; (a resposta que você recebeu)</p>
              <p className="text-neutral-300 text-sm mb-2">
                <strong className="text-green-400">Resposta:</strong> &ldquo;Entendo perfeitamente! [DONO DA AGÊNCIA], me responde só uma coisa: na última semana, quantos clientes recusaram um contrato seu porque precisavam 'pensar melhor'?
                Por isso eu te enviei esse relatório da [NOME DA EMPRESA] — é a prova que elimina esse 'vou pensar'. Quando o cliente VÊ o número de quanto ele tá perdendo, ele chama VOCÊ. 
                Se isso não for útil pra sua agência, eu te mostro 5 minutos só pra você ver e decide. Tudo bem?&rdquo;
              </p>
            </div>

            <div className="bg-amber-950 border border-amber-800 rounded-xl p-6">
              <p className="text-amber-400 font-bold mb-2">❌ Agência: &ldquo;Já tenho minhas ferramentas&rdquo;</p>
              <p className="text-neutral-300 text-sm mb-2">
                <strong className="text-green-400">Resposta:</strong> &ldquo;Legal! E suas ferramentas geram um relatório com score, impacto financeiro e plano de ação em 60 segundos pra qualquer empresa da região? O Radar Vivo não substitui sua stack — ele é a PONTAPÉ que fecha o contrato antes das outras ferramentas entrarem. É a arma de prospecção.&rdquo;
              </p>
            </div>

            <div className="bg-amber-950 border border-amber-800 rounded-xl p-6">
              <p className="text-amber-400 font-bold mb-2">❌ Agência: &ldquo;Manda o link que eu vejo depois&rdquo;</p>
              <p className="text-neutral-300 text-sm mb-2">
                <strong className="text-green-400">Resposta:</strong> &ldquo;Perfeito! Mas ó, se você olhar o relatório da [NOME DA EMPRESA] e não pensar 'isso aqui fecharia contrato mais rápido', me fala que eu mesmo indico outra ferramenta pra você. Vale? Já te mando o link.&rdquo;
              </p>
            </div>

            <div className="bg-red-950 border border-red-800 rounded-xl p-6">
              <p className="text-red-400 font-bold mb-2">❌ &ldquo;Tá caro&rdquo;</p>
              <p className="text-neutral-300 text-sm mb-2">
                <strong className="text-green-400">Resposta:</strong> &ldquo;Entendo. Mas olha o relatório: vocês estão perdendo R$ {`[VALOR]`}/mês em clientes. Com R$ 197, se vocês recuperarem 1 cliente, já pagou. E cancela quando quiser.&rdquo;
              </p>
            </div>

            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
              <p className="text-red-400 font-bold mb-2">❌ &ldquo;Já tenho site&rdquo;</p>
              <p className="text-neutral-300 text-sm mb-2">
                <strong className="text-green-400">Resposta:</strong> &ldquo;Que bom! Mas o Radar Score mostra que o site não tá aparecendo no Google. Ter site é uma coisa, aparecer quando o cliente busca é outra. O Radar Vivo resolve exatamente isso.&rdquo;
              </p>
            </div>

            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
              <p className="text-red-400 font-bold mb-2">❌ &ldquo;Não acredito em marketing digital&rdquo;</p>
              <p className="text-neutral-300 text-sm mb-2">
                <strong className="text-green-400">Resposta:</strong> &ldquo;Não é marketing — é presença digital. É o que aparece quando alguém pesquisa seu nome ou sua cidade no Google. Se não aparecer, o cliente vai pro concorrente. Olha o relatório: o [CONCORRENTE] tá aparecendo e vocês não.&rdquo;
              </p>
            </div>

            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
              <p className="text-red-400 font-bold mb-2">❌ &ldquo;Preciso pensar&rdquo;</p>
              <p className="text-neutral-300 text-sm mb-2">
                <strong className="text-green-400">Resposta:</strong> &ldquo;Claro, sem pressa. Mas olha o relatório: cada dia sem presença digital é cliente indo pro [CONCORRENTE]. E o melhor: não tem fidelidade — cancela quando quiser. Começa hoje e se não gostar, cancela.&rdquo;
              </p>
            </div>

            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
              <p className="text-red-400 font-bold mb-2">❌ &ldquo;Já tive experiência ruim com agência&rdquo;</p>
              <p className="text-neutral-300 text-sm mb-2">
                <strong className="text-green-400">Resposta:</strong> &ldquo;Entendo perfeitamente. A diferença é que o Radar Vivo não é agência — é uma plataforma. Você vê os resultados em tempo real, tem relatório mensal e pode cancelar quando quiser. Sem contrato, sem surpresa.&rdquo;
              </p>
            </div>
          </div>
        </section>

        {/* DICAS */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">
            <span className="text-green-400">Dicas</span> de ouro
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-green-950 border border-green-800 rounded-xl p-6">
              <h3 className="font-bold text-green-400 mb-2">🎯 Sempre analise ANTES</h3>
              <p className="text-neutral-400 text-sm">Nunca chegue sem dados. Analise a empresa no Radar Scanner antes de ligar/mandar mensagem. O relatório é sua arma.</p>
            </div>
            <div className="bg-green-950 border border-green-800 rounded-xl p-6">
              <h3 className="font-bold text-green-400 mb-2">📱 Use o PDF</h3>
              <p className="text-neutral-400 text-sm">O relatório PDF é tangível. O cliente leva pra casa, mostra pro sócio, fica com a marca na cabeça. Sempre envie.</p>
            </div>
            <div className="bg-green-950 border border-green-800 rounded-xl p-6">
              <h3 className="font-bold text-green-400 mb-2">💰 Foque na perda</h3>
              <p className="text-neutral-400 text-sm">Não venda ferramenta — venda o que ele tá perdendo. &ldquo;R$ 4.800/mês em clientes perdidos&rdquo; é mais forte que &ldquo;R$ 197/mês&rdquo;.</p>
            </div>
            <div className="bg-green-950 border border-green-800 rounded-xl p-6">
              <h3 className="font-bold text-green-400 mb-2">⏰ Crie urgência</h3>
              <p className="text-neutral-400 text-sm">&ldquo;Enquanto você pensa, o concorrente tá capturando seus clientes&rdquo;. Mostre o score do concorrente.</p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="text-center bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-2xl p-10">
          <h2 className="text-2xl font-bold mb-4">Pronto para usar?</h2>
          <p className="text-neutral-400 mb-6">
            Analise uma empresa agora e teste o script na prática.
          </p>
          <Link href="/scanner" className="bg-green-500 hover:bg-green-400 text-black font-bold px-8 py-4 rounded-xl text-lg transition">
            Abrir Radar Scanner →
          </Link>
        </div>
      </div>
    </main>
  );
}
