import type { TechnologyResult } from "./contracts";

export type Rule = {
  bucket: keyof TechnologyResult;
  name: string;
  signatures: string[];
};

export const TECHNOLOGY_RULES: Rule[] = [
  { bucket: "cms", name: "WordPress", signatures: ["wp-content", "wp-includes"] },
  { bucket: "cms", name: "Shopify", signatures: ["cdn.shopify.com", "shopify"] },
  { bucket: "cms", name: "Wix", signatures: ["wixstatic", "wix.com"] },
  { bucket: "cms", name: "Webflow", signatures: ["webflow"] },

  { bucket: "frameworks", name: "Next.js", signatures: ["__next"] },
  { bucket: "frameworks", name: "React", signatures: ["react"] },
  { bucket: "frameworks", name: "Vue", signatures: ["vue"] },
  { bucket: "frameworks", name: "Angular", signatures: ["angular"] },

  { bucket: "analytics", name: "Google Analytics", signatures: ["google-analytics","gtag("] },
  { bucket: "analytics", name: "Google Tag Manager", signatures: ["googletagmanager"] },
  { bucket: "analytics", name: "Meta Pixel", signatures: ["connect.facebook.net","fbq("] },

  { bucket: "marketing", name: "RD Station", signatures: ["rdstation"] },
  { bucket: "marketing", name: "HubSpot", signatures: ["hubspot"] },
  { bucket: "marketing", name: "Mailchimp", signatures: ["mailchimp"] },

  { bucket: "ecommerce", name: "WooCommerce", signatures: ["woocommerce"] },
  { bucket: "ecommerce", name: "Tray", signatures: ["traycdn"] },

  { bucket: "chats", name: "JivoChat", signatures: ["jivo"] },
  { bucket: "chats", name: "Tawk.to", signatures: ["tawk.to"] },

  { bucket: "libraries", name: "jQuery", signatures: ["jquery"] },
  { bucket: "libraries", name: "Bootstrap", signatures: ["bootstrap"] },

  { bucket: "infrastructure", name: "Cloudflare", signatures: ["cloudflare"] },
  { bucket: "infrastructure", name: "Vercel", signatures: ["x-vercel","vercel"] },
];
