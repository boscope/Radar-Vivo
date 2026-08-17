"use client";

import { useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { useRouter } from "next/navigation";

const plans = [
  {
    key: "free",
    name: "Teste Grátis",
    price: "R$ 0",
    badge: "3 DIAS DE TESTE",
    highlight: false,
    description: "Acesso total por 3 dias para você sentir o poder do Radar Vivo.",
    features: [
      "3 dias de acesso completo",
      "Oportunidades ilimitadas",
      "Scripts de abordagem prontos",
      "Pipeline de leads",
      "Sem cartão de crédito",
    ],
  },
  {
    key: "pro",
    name: "Pro",
    price: "R$ 197",
    highlight: true,
    description: "Para quem quer fechar vendas todo mês.",
    features: [
      "Oportunidades ilimitadas",
      "Scripts de abordagem prontos",
      "Mensagem WhatsApp com 1 clique",
      "Pipeline completo até fechar",
      "Exportação em CSV",
      "Todas as categorias de negócio",
    ],
  },
  {
    key: "agency",
    name: "Agência",
    price: "R$ 397",
    description: "Para equipes e agências de marketing.",
    features: [
      "Tudo do Pro",
      "Até 5 usuários na equipe",
      "Relatórios executivos completos",
      "Suporte prioritário por WhatsApp",
      "Domínio e marca personalizada",
    ],
  },
];

export default function Pricing() {
  const [loading, setLoading] = useState<string | null>(null);
  const router = useRouter();

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  async function handlePlanClick(planKey: string, planName: string) {
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      router.push(`/auth/cadastro?plan=${planKey}`);
      return;
    }

    if (planKey === "free") {
      router.push("/busca");
      return;
    }

    setLoading(planKey);

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
        router.push("/dashboard");
      }
    } catch {
      alert("Erro ao iniciar pagamento. Tente novamente.");
    } finally {
      setLoading(null);
    }
  }

  return (
    <section id="pricing" className="max-w-7xl mx-auto px-6 py-16">
      <h2 className="text-4xl font-bold text-center">Planos simples, preço justo</h2>
      <p className="text-center text-neutral-400 mt-3 max-w-2xl mx-auto">
        Comece com 3 dias grátis. Um único site vendido já paga meses de assinatura.
      </p>

      <div className="grid md:grid-cols-3 gap-6 mt-12">
        {plans.map((plan) => (
          <div
            key={plan.key}
            className={
              plan.highlight
                ? "border-2 border-green-500 rounded-3xl p-8 bg-neutral-950 relative"
                : "border border-neutral-800 rounded-3xl p-8 bg-neutral-950 hover:border-neutral-600 transition"
            }
          >
            {plan.highlight && (
              <span className="absolute -top-4 left-8 bg-green-500 text-black text-sm font-bold px-4 py-1 rounded-full">
                Mais popular
              </span>
            )}
            {plan.badge && !plan.highlight && (
              <span className="inline-block bg-amber-500 text-black text-xs font-bold px-3 py-1 rounded-full mb-3">
                {plan.badge}
              </span>
            )}

            <h3 className="text-2xl font-bold">{plan.name}</h3>
            <p className="text-5xl font-extrabold mt-4">{plan.price}</p>
            <p className="text-neutral-400 mt-3">{plan.description}</p>

            <ul className="mt-6 space-y-3">
              {plan.features.map((feature) => (
                <li key={feature} className="flex gap-3">
                  <span className="text-green-500">✔</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => handlePlanClick(plan.key, plan.name)}
              disabled={loading === plan.key}
              className={
                plan.highlight
                  ? "mt-8 block w-full text-center bg-green-500 hover:bg-green-400 transition text-black font-bold py-4 rounded-xl disabled:opacity-50"
                  : "mt-8 block w-full text-center border border-neutral-600 hover:bg-neutral-900 transition font-bold py-4 rounded-xl disabled:opacity-50"
              }
            >
              {loading === plan.key
                ? "Redirecionando..."
                : plan.key === "free"
                ? "Testar grátis por 3 dias"
                : "Assinar agora"}
            </button>
          </div>
        ))}
      </div>

      <p className="text-center text-neutral-500 mt-10 text-sm">
        💡 Um site vendido (R$ 800 a R$ 3.000) paga 4 a 15 meses de assinatura Pro.
      </p>
    </section>
  );
}
