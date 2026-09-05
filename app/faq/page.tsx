"use client";

import { useState } from "react";
import Link from "next/link";

const faqs = [
  {
    question: "O que é o Radar Vivo?",
    answer:
      "O Radar Vivo é uma plataforma de análise de presença digital que usa inteligência artificial para avaliar como empresas locais estão aparecendo no Google e outras plataformas online. Em segundos, você descobre o score de presença digital, os pontos fracos e quanto pode estar perdendo em vendas.",
  },
  {
    question: "É realmente gratuito?",
    answer:
      "Sim! Criando uma conta, você tem 3 dias de acesso total ao Radar Vivo, sem cartão. Depois do teste, a conta grátis continua funcionando com 3 buscas por dia. Para buscas e análises ilimitadas, temos os planos Pro (R$197/mês) e Agência (R$397/mês).",
  },
  {
    question: "Como funciona a análise?",
    answer:
      "O Radar Vivo coleta dados públicos da empresa no Google Maps, no site e outras fontes. Com isso, calcula um score de presença digital de 0 a 100, identifica o que falta (SEO, Google Ads, WhatsApp, etc.) e estima quanto a empresa pode estar perdendo em receita.",
  },
  {
    question: "Preciso ter conta para usar?",
    answer:
      "Não. Qualquer pessoa pode analisar uma empresa sem criar conta — são 3 buscas por dia. Ao criar uma conta gratuita, você desbloqueia 3 dias de acesso total e o dashboard com pipeline de leads e histórico.",
  },
  {
    question: "O que está incluído no plano Pro?",
    answer:
      "O plano Pro (R$197/mês) inclui: buscas ilimitadas, dashboard completo com pipeline de leads, histórico de antes/depois, exportação de relatórios, suporte prioritário e todas as análises ilimitadas.",
  },
  {
    question: "O que está incluído no plano Agência?",
    answer:
      "O plano Agência (R$397/mês) inclui tudo do Pro mais: white-label (seus relatórios com marca da agência), multi-cliente (gerencie todos os seus clientes em um só lugar), comparativo com concorrentes, WhatsApp automático, relatórios compartilháveis com a identidade visual da sua agência.",
  },
  {
    question: "Posso cancelar quando quiser?",
    answer:
      "Sim. Não existe fidelidade. Você pode cancelar a assinatura a qualquer momento pelo portal do Stripe, sem multas ou taxas extras.",
  },
  {
    question: "Meus dados estão seguros?",
    answer:
      "Sim. O Radar Vivo utiliza Supabase (mesma infraestrutura do Firebase) com criptografia em repouso e em trânsito. Seguimos rigorosamente a LGPD, o Código de Defesa do Consumidor e a Lei Marco Civil da Internet. Seus dados nunca são vendidos para terceiros.",
  },
  {
    question: "Como faço para assinar?",
    answer:
      'Clique em "Começar agora" ou acesse a página de preços, escolha o plano ideal (Pro ou Agência) e você será redirecionado ao checkout seguro do Stripe. O pagamento é processado instantaneamente e seu acesso é liberado na hora.',
  },
  {
    question: "Preciso de cartão de crédito?",
    answer:
      "Sim. O pagamento é feito por cartão de crédito ou débito via Stripe, a plataforma de pagamentos mais segura do mundo. Não trabalhamos com boleto ou PIX neste momento.",
  },
];

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  function toggle(index: number) {
    setOpenIndex((current) => (current === index ? null : index));
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="border-b border-neutral-800 px-6 py-4">
        <Link href="/" className="text-xl font-bold">
          <span className="text-green-400">Radar</span>
          <span className="text-white">Vivo</span>
        </Link>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 rounded-full bg-neutral-900 border border-green-500/30 text-sm text-green-400">
            📡 Central de ajuda
          </span>

          <h1 className="mt-6 text-3xl md:text-4xl font-extrabold leading-snug">
            Perguntas Frequentes
          </h1>

          <p className="mt-5 text-lg text-neutral-400 max-w-2xl mx-auto">
            Tudo o que você precisa saber sobre o Radar Vivo, planos, análise e segurança dos seus dados.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={faq.question}
                className={`bg-neutral-900 border rounded-xl transition-colors ${
                  isOpen ? "border-green-500/40" : "border-neutral-700 hover:border-neutral-500"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-semibold text-white">{faq.question}</span>

                  <svg
                    className={`w-5 h-5 flex-shrink-0 text-green-400 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                <div
                  className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-neutral-400 leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-14 border border-neutral-800 rounded-2xl p-8 text-center bg-gradient-to-b from-neutral-900/60 to-black">
          <h2 className="text-2xl font-extrabold">Ainda tem dúvidas?</h2>

          <p className="mt-3 text-neutral-400 max-w-md mx-auto">
            Fale com a nossa equipe. Respondemos rapidamente e ajudamos você a escolher o melhor caminho.
          </p>

          <div className="mt-6 flex gap-4 flex-wrap justify-center">
            <Link
              href="/contato"
              className="bg-green-500 hover:bg-green-400 transition text-black px-8 py-4 rounded-xl font-bold"
            >
              💬 Falar com o time
            </Link>

            <a
              href="https://wa.me/5581988867233?text=Ol%C3%A1!%20Tenho%20d%C3%BAvidas%20sobre%20o%20Radar%20Vivo."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-neutral-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-neutral-800 transition border border-neutral-700"
            >
              📱 Chamar no WhatsApp
            </a>
          </div>
        </div>
      </main>

      <footer className="border-t border-neutral-800 px-6 py-8 text-center text-xs text-neutral-600">
        © {new Date().getFullYear()} Radar Vivo. Todos os direitos reservados. Cancele quando quiser.
      </footer>
    </div>
  );
}
