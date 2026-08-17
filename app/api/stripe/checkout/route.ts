import { NextRequest, NextResponse } from "next/server";
import { getStripe, PLANS, type PlanKey } from "@/lib/stripe";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: NextRequest) {
  try {
    const { plan, userId, email } = await request.json();

    if (!plan || !PLANS[plan as PlanKey]) {
      return NextResponse.json({ error: "Plano inválido" }, { status: 400 });
    }

    const planConfig = PLANS[plan as PlanKey];

    // Teste grátis não precisa de checkout
    if (plan === "free") {
      return NextResponse.json({ url: null, message: "Teste grátis ativado" });
    }

    if (!planConfig.stripePriceId) {
      return NextResponse.json(
        { error: "Stripe Price ID não configurado" },
        { status: 500 }
      );
    }

    // Buscar ou criar customer no Stripe
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { data: profile } = await supabase
      .from("profiles")
      .select("stripe_customer_id")
      .eq("id", userId)
      .single();

    let customerId = profile?.stripe_customer_id;

    if (!customerId) {
      const customer = await getStripe().customers.create({
        email,
        metadata: { userId },
      });
      customerId = customer.id;

      await supabase
        .from("profiles")
        .update({ stripe_customer_id: customerId })
        .eq("id", userId);
    }

    // Criar sessão de checkout
    const session = await getStripe().checkout.sessions.create({
      customer: customerId,
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: planConfig.stripePriceId,
          quantity: 1,
        },
      ],
      success_url: `${request.headers.get("origin") || "https://www.radarvivo.com.br"}/dashboard?upgraded=true`,
      cancel_url: `${request.headers.get("origin") || "https://www.radarvivo.com.br"}/#pricing`,
      metadata: { userId, plan },
      subscription_data: {
        trial_period_days: plan === "pro" ? 3 : 0,
        metadata: { userId, plan },
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error("[STRIPE CHECKOUT]", error.type, error.message, error.code);
    return NextResponse.json(
      { error: "Erro ao criar sessão de pagamento", detail: error.message },
      { status: 500 }
    );
  }
}
