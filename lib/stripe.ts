import Stripe from "stripe";

let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (!_stripe) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) throw new Error("STRIPE_SECRET_KEY is not set");
    _stripe = new Stripe(key);
  }
  return _stripe;
}

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
