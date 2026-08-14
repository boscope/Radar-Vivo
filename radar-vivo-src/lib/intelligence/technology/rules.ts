import type { TechnologyRule } from "./contracts";

export const TECHNOLOGY_RULES: TechnologyRule[] = [
  // CMS
  { name: "WordPress", category: "cms", signatures: ["wp-content", "wp-includes"] },
  { name: "Shopify", category: "cms", signatures: ["cdn.shopify.com", "shopify-payment-button"] },
  { name: "Wix", category: "cms", signatures: ["static.wixstatic.com", "wix.com"] },
  { name: "Webflow", category: "cms", signatures: ["webflow", "wf-section"] },

  // Frameworks
  { name: "Next.js", category: "frameworks", signatures: ["__next"] },
  { name: "React", category: "frameworks", signatures: ["react", "react-dom"] },
  { name: "Vue", category: "frameworks", signatures: ["vue.js", "vue.min.js"] },

  // Analytics
  { name: "Google Analytics", category: "analytics", signatures: ["google-analytics.com", "gtag("] },
  { name: "Google Tag Manager", category: "analytics", signatures: ["googletagmanager.com", "gtm.js"] },

  // Marketing
  { name: "Meta Pixel", category: "marketing", signatures: ["connect.facebook.net", "fbq("] },
  { name: "Hotjar", category: "marketing", signatures: ["hotjar", "hjSettings"] },
  { name: "Microsoft Clarity", category: "marketing", signatures: ["clarity.ms", "clarity("] },

  // Ecommerce
  { name: "WooCommerce", category: "ecommerce", signatures: ["woocommerce", "wc-cart-fragments"] },

  // Chats
  { name: "Tawk", category: "chats", signatures: ["tawk.to"] },
  { name: "JivoChat", category: "chats", signatures: ["jivosite.com", "jivochat"] },
  { name: "Crisp", category: "chats", signatures: ["crisp.chat", "$crisp"] },

  // Libraries
  { name: "Bootstrap", category: "libraries", signatures: ["bootstrap.min.css", "bootstrap.bundle"] },
  { name: "jQuery", category: "libraries", signatures: ["jquery.min.js", "jquery.js"] },

  // Infrastructure
  { name: "Cloudflare", category: "infrastructure", signatures: ["cloudflare", "cf-ray"] },
];
