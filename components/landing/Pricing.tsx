"use client";

import { useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { useRouter } from "next/navigation";

const plans = [
  {
    key: "free",
    name: "Teste Grátis",
    price: "0",
    period: "3 dias",
    badge: null,
    highlight: false,
    icon: "🧪",
    description: "Acesso total por 3 dias. Sem cartão.",
    features: [
      { text: "Buscas ilimitadas por 3 dias", included: true },
      { text: "Análise completa de empresas", included: true },
      { text: "Scripts de abordagem prontos", included: true },
      { text: "Pipeline de leads", included: true },
      { text: "Relatório público compartilhável", included: true },
      { text: "Exportação em CSV", included: false },
      { text: "Mensagem WhatsApp automática", included: false },
      { text: "Suporte prioritário", included: false },
    ],
    cta: "Começar grátis",
    ctaStyle: "border border-neutral-600 hover:bg-neutral-900 text-white",
  },
  {
    key: "pro",
    name: "Pro",
    price: "197",
    period: "/mês",
    badge: "Mais popular",
    highlight: true,
    icon: "⚡",
    description: "Para quem quer fechar vendas todo mês.",
    features: [
      { text: "Buscas ilimitadas", included: true },
      { text: "Análise completa de empresas", included: true },
      { text: "Scripts de abordagem prontos", included: true },
      { text: "Pipeline completo até fechar", included: true },
      { text: "Relatório público compartilhável", included: true },
      { text: "Exportação em CSV", included: true },
      { text: "Mensagem WhatsApp com 1 clique", included: true },
      { text: "Todas as categorias de negócio", included: true },
    ],
    cta: "Assinar Pro",
    ctaStyle: "bg-green-500 hover:bg-green-400 text-black",
  },
  {
    key: "agency",
    name: "Agência",
    price: "397",
    period: "/mês",
    badge: "Para equipes",
    highlight: false,
    icon: "🏢",
    description: "Para agências e equipes de marketing.",
    features: [
      { text: "Tudo do Pro incluído", included: true },
      { text: "White-label (sua marca nos relatórios)", included: true },
      { text: "Dashboard multi-cliente", included: true },
      { text: "Histórico de scores (antes/depois)", included: true },
      { text: "Envio automático via WhatsApp", included: true },
      { text: "Comparativo com concorrentes", included: true },
      { text: "Suporte prioritário por WhatsApp", included: true },
      { text: "Até 5 usuários na equipe", included: true },
    ],
    cta: "Assinar Agência",
    ctaStyle: "border border-amber-500/50 hover:bg-amber-500/10 text-amber-400",
  },
];

export default function Pricing() {
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  async function handlePlanClick(planKey: string) {
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      router.push(`/auth/cadastro?plan=${planKey}`);
      return;
    }

    if (planKey === "free") {
      localStorage.removeItem("rv_free_searches");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setLoading(planKey);
    setError(null);

    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          plan: planKey,
          userId: session.user.id,
          email: session.user.email,
        }),
      });

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        setError("Erro ao redirecionar para o pagamento. Tente novamente.");
        setLoading(null);
      }
    } catch {
      setError("Erro ao iniciar pagamento. Tente novamente.");
      setLoading(null);
    }
  }

  return (
    <section id="precos" className="max-w-7xl mx-auto px-6 py-20">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-extrabold">
          Planos simples, <span className="text-green-400">preço justo</span>
        </h2>
        <p className="text-neutral-400 mt-4 max-w-2xl mx-auto text-lg">
          Comece com 3 dias grátis. Um único site vendido já paga meses de assinatura.
        </p>

        {/* ROI Callout */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 bg-green-500/10 border border-green-500/20 rounded-2xl px-6 py-3 mt-8 text-center">
          <span className="text-green-400 font-bold">💡 Um site vendido (R$ 800 a R$ 3.000)</span>
          <span className="text-neutral-400">= 4 a 15 meses de assinatura Pro</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {plans.map((plan) => (
          <div
            key={plan.key}
            className={`relative rounded-3xl p-8 transition-all duration-300 ${
              plan.highlight
                ? "border-2 border-green-500 bg-gradient-to-b from-green-500/5 to-transparent scale-[1.02] shadow-2xl shadow-green-500/10"
                : "border border-neutral-800 bg-neutral-950 hover:border-neutral-600 hover:shadow-xl"
            }`}
          >
            {/* Badge */}
            {plan.badge && (
              <span className={`absolute -top-3.5 left-8 text-xs font-bold px-4 py-1.5 rounded-full ${
                plan.highlight
                  ? "bg-green-500 text-black"
                  : "bg-amber-500/20 text-amber-400 border border-amber-500/30"
              }`}>
                {plan.badge}
              </span>
            )}

            {/* Header */}
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{plan.icon}</span>
                <h3 className="text-xl font-bold">{plan.name}</h3>
              </div>
              <p className="text-neutral-400 text-sm">{plan.description}</p>
            </div>

            {/* Price */}
            <div className="mb-8">
              <div className="flex items-baseline gap-1">
                <span className="text-sm text-neutral-400">R$</span>
                <span className={`text-5xl font-extrabold ${plan.highlight ? "text-green-400" : "text-white"}`}>
                  {plan.price}
                </span>
                <span className="text-sm text-neutral-400 ml-1">{plan.period}</span>
              </div>
              {plan.key === "free" && (
                <p className="text-xs text-neutral-500 mt-2">Sem cartão de crédito</p>
              )}
              {plan.key === "pro" && (
                <p className="text-xs text-green-400/60 mt-2">Cancele quando quiser</p>
              )}
              {plan.key === "agency" && (
                <p className="text-xs text-amber-400/60 mt-2">R$ 79,40 por usuário/mês</p>
              )}
            </div>

            {/* Features */}
            <ul className="space-y-3 mb-8">
              {plan.features.map((feature) => (
                <li key={feature.text} className="flex items-start gap-3">
                  <span className={`mt-0.5 ${feature.included ? "text-green-500" : "text-neutral-600"}`}>
                    {feature.included ? "✓" : "—"}
                  </span>
                  <span className={`text-sm ${feature.included ? "text-neutral-200" : "text-neutral-500"}`}>
                    {feature.text}
                  </span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <button
              onClick={() => handlePlanClick(plan.key)}
              disabled={loading !== null}
              className={`block w-full text-center font-bold py-4 rounded-xl transition disabled:opacity-50 ${plan.ctaStyle}`}
            >
              {loading === plan.key
                ? "Redirecionando..."
                : plan.cta}
            </button>
          </div>
        ))}
      </div>

      {error && (
        <div className="mt-8 bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-xl px-6 py-4 text-center max-w-md mx-auto">
          {error}
        </div>
      )}

      {/* Trust Badges */}
      <div className="flex flex-wrap items-center justify-center gap-8 mt-16 text-sm text-neutral-500">
        <div className="flex items-center gap-2">
          <span className="text-green-500">🔒</span>
          <span>Pagamento seguro via Stripe</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-green-500">↩️</span>
          <span>7 dias de garantia</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-green-500">⚡</span>
          <span>Ativação imediata</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-green-500">💳</span>
          <span>Sem fidelidade</span>
        </div>
      </div>
    </section>
  );
}
