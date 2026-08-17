import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createClient } from "@supabase/supabase-js";
import Stripe from "stripe";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const sig = request.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "Signature missing" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error("[STRIPE WEBHOOK] Signature verification failed:", err.message);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.metadata?.userId;
      const plan = session.metadata?.plan;

      if (userId) {
        await supabase
          .from("profiles")
          .update({
            plan: plan || "pro",
            subscription_status: "active",
            stripe_subscription_id: session.subscription as string,
          })
          .eq("id", userId);
      }
      break;
    }

    case "customer.subscription.updated": {
      const subscription = event.data.object as Stripe.Subscription;
      const userId = subscription.metadata?.userId;
      const status =
        subscription.status === "active"
          ? "active"
          : subscription.status === "past_due"
          ? "past_due"
          : "canceled";

      const periodEnd = (subscription as any).current_period_end;

      if (userId) {
        await supabase
          .from("profiles")
          .update({
            subscription_status: status,
            subscription_current_period_end: periodEnd
              ? new Date(periodEnd * 1000).toISOString()
              : null,
          })
          .eq("id", userId);
      }
      break;
    }

    case "customer.subscription.deleted": {
      const subscription = event.data.object as Stripe.Subscription;
      const userId = subscription.metadata?.userId;

      if (userId) {
        await supabase
          .from("profiles")
          .update({
            subscription_status: "canceled",
            plan: "free",
          })
          .eq("id", userId);
      }
      break;
    }

    case "invoice.payment_failed": {
      const invoice = event.data.object as Stripe.Invoice;
      const subscriptionId = (invoice as any).subscription as string;

      const { data: sub } = await supabase
        .from("profiles")
        .select("id")
        .eq("stripe_subscription_id", subscriptionId)
        .single();

      if (sub) {
        await supabase
          .from("profiles")
          .update({ subscription_status: "past_due" })
          .eq("id", sub.id);
      }
      break;
    }
  }

  return NextResponse.json({ received: true });
}
