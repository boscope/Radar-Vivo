import Stripe from "stripe";

let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (!_stripe) {
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: "2024-12-18.acacia" as Stripe.LatestApiVersion,
    });
  }
  return _stripe;
}

export const stripe = new Proxy({} as Stripe, {
  get(_, prop) {
    return (getStripe() as any)[prop];
  },
});

export const PLANS = {
  free: {
    name: "Teste Grátis",
    price: 0,
    trialDays: 3,
    stripePriceId: null,
  },
  pro: {
    name: "Pro",
    price: 197,
    stripePriceId: process.env.STRIPE_PRO_PRICE_ID!,
  },
  agency: {
    name: "Agência",
    price: 397,
    stripePriceId: process.env.STRIPE_AGENCY_PRICE_ID!,
  },
} as const;

export type PlanKey = keyof typeof PLANS;
