import type { WebsiteData } from "./types";

const USER_AGENT =
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36 RadarVivo/1.0";

async function fetchWithTimeout(
  url: string,
  timeoutMs = 8000
): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await fetch(url, {
      signal: controller.signal,
      headers: {
        "User-Agent": USER_AGENT,
        "Accept": "text/html,application/xhtml+xml",
        "Accept-Language": "pt-BR,pt;q=0.9",
      },
      redirect: "follow",
    });
  } finally {
    clearTimeout(timer);
  }
}

function titleTag(html: string): string | undefined {
  const match = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  return match?.[1]?.trim() || undefined;
}

function metaContent(
  html: string,
  name: string
): string | undefined {
  const patterns = [
    new RegExp(`<meta[^>]+name=["']${name}["'][^>]+content=["']([^"']*)["']`, "i"),
    new RegExp(`<meta[^>]+content=["']([^"']*)["'][^>]+name=["']${name}["']`, "i"),
    new RegExp(`<meta[^>]+property=["']og:${name}["'][^>]+content=["']([^"']*)["']`, "i"),
  ];

  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match?.[1]?.trim()) return match[1].trim();
  }

  return undefined;
}

function h1Tag(html: string): string | undefined {
  const match = html.match(/<h1[^>]*>([^<]+)<\/h1>/i);
  return match?.[1]?.trim() || undefined;
}

function firstSocial(
  html: string,
  pattern: RegExp
): string | undefined {
  const match = html.match(pattern);
  return match?.[0] || undefined;
}

function extractTechnologies(
  html: string
): string[] {
  const found: string[] = [];

  const markers: Array<[string, RegExp]> = [
    ["Next.js", /__NEXT_DATA__|_next\/static|next\/font/i],
    ["React", /react|data-reactroot/i],
    ["Vue.js", /vue\.js|__VUE__/i],
    ["Nuxt.js", /__NUXT__|nuxt/i],
    ["WordPress", /wp-content|wp-includes|wp-json/i],
    ["Shopify", /shopify\.com\/s/],
    ["Wix", /wix\.com|wixstatic/i],
    ["Angular", /ng-version|angular\.js/i],
    ["Bootstrap", /bootstrap/i],
    ["Tailwind", /tailwindcss/i],
    ["jQuery", /jquery/i],
  ];

  for (const [name, pattern] of markers) {
    if (pattern.test(html)) found.push(name);
  }

  return found;
}

export async function collectWebsite(
  website?: string | null
): Promise<WebsiteData> {
  if (!website) {
    return { hasWebsite: false, hasSeo: false };
  }

  try {
    const response = await fetchWithTimeout(website);

    const finalUrl = response.url || website;

    const text = await response.text();

    const html = text.slice(0, 2_000_000);

    const hasSSL = finalUrl.startsWith("https://");

    const instagram =
      firstSocial(html, /https:\/\/www\.instagram\.com\/[a-zA-Z0-9._]+/i) ??
      firstSocial(html, /https:\/\/instagram\.com\/[a-zA-Z0-9._]+/i);

    const facebook =
      firstSocial(html, /https:\/\/www\.facebook\.com\/[a-zA-Z0-9._]+/i) ??
      firstSocial(html, /https:\/\/facebook\.com\/[a-zA-Z0-9._]+/i);

    const whatsappRegex =
      /(https:\/\/wa\.me\/\d+|https:\/\/api\.whatsapp\.com\/send\?phone=\d+|https:\/\/chat\.whatsapp\.com\/[A-Za-z0-9]+)/i;

    const whatsappMatch = html.match(whatsappRegex);

    const hasOpenGraph = /og:image|og:title/.test(html);

    const hasSitemap = /sitemap|sitemap\.xml/i.test(html);

    const hasRobots = /<meta[^>]+name=["']robots["']/i.test(html);

    const hasSchema = /application\/ld\+json/.test(html);

    const hasAnalytics =
      /google-analytics|googletagmanager|gtag\(|analytics\.google/i.test(html);

    const hasTagManager = /googletagmanager|GTM-/.test(html);

    const hasMetaPixel = /fbevents\.js|fbq\(|facebook\.net\/en_US\/fbevents/i.test(html);

    const hasGoogleAds =
      /googlesyndication\.com|google_ads_conversion|gtag\(\s*['"]config['"]\s*['"]AW-/i.test(html) ||
      /AW-\d+/.test(html);

    const automationMarkers: Array<[string, RegExp]> = [
      ["HubSpot", /hubspot\.com|hs-scripts|_hsq/i],
      ["RD Station", /rdstation\.com|rdstation/i],
      ["Mailchimp", /mailchimp\.com|list-manage\.com|mc\.us/i],
      ["ActiveCampaign", /activecampaign\.com|track\.hc/i],
      ["ConvertKit", /convertkit\.com/i],
      ["ManyChat", /manychat\.com/i],
      ["Chatfuel", /chatfuel\.com/i],
      ["Hotjar", /hotjar\.com|hotjar/i],
      ["Microsoft Clarity", /clarity\.ms/i],
      ["Calendly", /calendly\.com/i],
      ["Tawk", /tawk\.to/i],
      ["Zendesk", /zendesk\.com/i],
      ["Intercom", /intercom\.com/i],
      ["Tidio", /tidio\.com/i],
    ];

    let hasAutomation = false;
    let automationTool: string | undefined;

    for (const [name, pattern] of automationMarkers) {
      if (pattern.test(html)) {
        hasAutomation = true;
        automationTool = name;
        break;
      }
    }

    const isResponsive = /<meta[^>]+name=["']viewport["']/i.test(html);

    const hasWhatsapp = !!whatsappMatch;

    const technologies = extractTechnologies(html);

    const seoSignals = [
      hasSSL,
      !!titleTag(html),
      !!metaContent(html, "description"),
      hasOpenGraph,
      hasSchema,
      hasSitemap,
      isResponsive,
    ].filter(Boolean).length;

    const seoScore = Math.min(
      100,
      Math.round((seoSignals / 7) * 100)
    );

    return {
      website: finalUrl,
      hasWebsite: true,
      hasSeo: seoScore >= 40,
      seoScore,
      hasSSL,
      hasSitemap,
      hasRobots,
      hasOpenGraph,
      hasSchema,
      hasAnalytics,
      hasTagManager,
      hasMetaPixel,
      hasGoogleAds,
      hasAutomation,
      automationTool,
      isResponsive,
      pageTitle: titleTag(html),
      metaDescription: metaContent(html, "description"),
      h1: h1Tag(html),
      technologies,
      hasWhatsapp,
      instagram,
      facebook,
      whatsapp: whatsappMatch?.[0],
    };
  } catch {
    return {
      website,
      hasWebsite: true,
      hasSeo: false,
      seoScore: 0,
      hasSSL: website.startsWith("https://"),
      isResponsive: false,
      technologies: [],
      hasGoogleAds: false,
      hasAutomation: false,
    };
  }
}
