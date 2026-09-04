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

function extractInstagramFromUrl(
  url?: string | null
): string | undefined {
  if (!url) return undefined;

  const clean = url
    .replace(/["'<>\\]/g, "")
    .split("?")[0]
    .split("#")[0];

  const match = clean.match(
    /(?:instagram\.com|ig\.me)\/([a-zA-Z0-9._]+)/i
  );

  if (!match) return undefined;

  const user = match[1].replace(/\/$/, "");

  if (
    user.toLowerCase() === "accounts" ||
    user.toLowerCase() === "login" ||
    user.toLowerCase() === "explore" ||
    user.toLowerCase() === "reels" ||
    user.toLowerCase() === "p"
  ) {
    return undefined;
  }

  return `https://www.instagram.com/${user}`;
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

export async function collectInstagramFromWebsite(
  website?: string | null
): Promise<string | undefined> {
  if (!website) return undefined;

  const direct = extractInstagramFromUrl(website);
  if (direct) return direct;

  try {
    const response = await fetchWithTimeout(website, 6000);
    const text = await response.text();
    const html = text.slice(0, 1_000_000);

    const clean = (url: string) =>
      url.replace(/\/$/, "").replace(/["'<>\\]/g, "");

    return (
      clean(
        firstSocial(
          html,
          /https:\/\/www\.instagram\.com\/[a-zA-Z0-9._]+/i
        ) ?? ""
      ) ||
      clean(
        firstSocial(html, /https:\/\/instagram\.com\/[a-zA-Z0-9._]+/i) ?? ""
      ) ||
      undefined
    );
  } catch {
    return undefined;
  }
}

export async function collectWebsite(
  website?: string | null
): Promise<WebsiteData> {
  if (!website) {
    return { hasWebsite: false, hasSeo: false };
  }

  const directInstagram = extractInstagramFromUrl(website);
  if (directInstagram) {
    return {
      website: directInstagram,
      hasWebsite: false,
      hasSeo: false,
      instagram: directInstagram,
    };
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

function normalizeUsername(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, "e")
    .replace(/[^a-z0-9_.]/g, "")
    .replace(/_+/g, "_")
    .replace(/\.+/g, ".")
    .replace(/^[_.]+|[_.]+$/g, "")
    .slice(0, 30);
}

function decodeDuckDuckGo(link: string): string | undefined {
  const m = link.match(/uddg=([^&]+)/);
  if (!m) return undefined;
  try {
    return decodeURIComponent(m[1]);
  } catch {
    return undefined;
  }
}

async function fetchDuckDuckGoSource(
  source: "html" | "lite",
  query: string
): Promise<string | null> {
  const url =
    source === "html"
      ? `https://html.duckduckgo.com/html/?q=${encodeURIComponent(query)}`
      : `https://lite.duckduckgo.com/lite/?q=${encodeURIComponent(query)}`;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 3500);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        "User-Agent": USER_AGENT,
        "Accept-Language": "pt-BR,pt;q=0.9",
      },
    });
    const body = await res.text();
    const marker = source === "html" ? "result__a" : "snippet";
    return body.includes(marker) ? body : null;
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

function extractInstagramLinks(
  source: "html" | "lite",
  body: string
): string[] {
  if (source === "html") {
    return [...body.matchAll(/class="result__a"[^>]*href="([^"]+)"/g)]
      .map((m) => decodeDuckDuckGo(m[1]))
      .filter((u): u is string => !!u);
  }

  return [...body.matchAll(/href="([^"]+)"/g)]
    .map((m) => m[1])
    .map((u) => (u.startsWith("//") ? `https:${u}` : u))
    .map((u) => decodeDuckDuckGo(u))
    .filter((u): u is string => !!u && /instagram\.com/i.test(u));
}

export async function discoverInstagramByName(
  name: string,
  city?: string
): Promise<string | undefined> {
  const username = normalizeUsername(name);

  if (username.length < 4) return undefined;

  const candidate = `https://www.instagram.com/${username}`;

  const localityQuery = name
    .split(/\s+/)
    .filter((w) => w.length >= 3)
    .slice(0, 3)
    .join(" ");

  const queries = [
    `"${localityQuery}" instagram ${city ?? ""}`.trim(),
    `"${name}" instagram`,
  ];

  for (const query of queries) {
    const [htmlBody, liteBody] = await Promise.all([
      fetchDuckDuckGoSource("html", query),
      fetchDuckDuckGoSource("lite", query),
    ]);

    for (const body of [htmlBody, liteBody]) {
      if (!body) continue;

      const links = extractInstagramLinks(
        body.includes("result__a") ? "html" : "lite",
        body
      );

      for (const link of links) {
        const match = link.match(
          /instagram\.com\/(?:p\/|reel\/|stories\/|[a-zA-Z0-9._]+)/
        );
        if (!match) continue;

        const user = match[0].split("/").pop()?.replace(/^@/, "");
        if (!user) continue;

        if (
          ["p", "reel", "stories", "accounts", "explore", "discover", "login", "share"].includes(user)
        ) {
          continue;
        }

        if (user.toLowerCase() === username.toLowerCase()) {
          return candidate;
        }

        const normalizedUser = normalizeUsername(user);
        if (
          normalizedUser === username ||
          normalizedUser.includes(username) ||
          username.includes(normalizedUser)
        ) {
          return `https://www.instagram.com/${user}`;
        }
      }
    }

    await new Promise((res) => setTimeout(res, 200));
  }

  return undefined;
}

const NON_OFFICIAL_DOMAINS = new Set([
  "instagram.com", "facebook.com", "facebook.net", "linkedin.com", "twitter.com",
  "x.com", "youtube.com", "youtu.be", "whatsapp.com", "wa.me", "tiktok.com",
  "google.com", "google.com.br", "maps.google.com", "g1.globo.com",
  "globo.com", "uol.com.br", "terra.com.br", "folha.uol.com.br",
  "mercadolivre.com", "olx.com.br", "gupy.io", "vagas.com.br", "indeed.com.br",
  "wikipedia.org", "guiamais.com.br", "apontador.com.br",
  "api.whatsapp.com", "youtube.com.br", "taplink.cc", "linktr.ee",
  "beacons.ai", "msha.ke",
]);

function extractWebsiteLinks(
  source: "html" | "lite",
  body: string
): string[] {
  if (source === "html") {
    return [...body.matchAll(/class="result__a"[^>]*href="([^"]+)"/g)]
      .map((m) => decodeDuckDuckGo(m[1]))
      .filter((u): u is string => !!u);
  }

  return [...body.matchAll(/href="([^"]+)"/g)]
    .map((m) => m[1])
    .map((u) => (u.startsWith("//") ? `https:${u}` : u))
    .map((u) => decodeDuckDuckGo(u))
    .filter((u): u is string => !!u);
}

function normalizeDomain(d: string): string {
  return d
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .replace(/\/.*$/, "")
    .split(":")[0]
    .trim();
}

function isNonOfficialDomain(domain: string): boolean {
  for (const bad of NON_OFFICIAL_DOMAINS) {
    if (domain.includes(bad)) return true;
  }
  return /\.(gov|edu)\.br$/.test(domain);
}

export async function discoverWebsiteByName(
  name: string,
  city?: string
): Promise<string | undefined> {
  const localityQuery = name
    .split(/\s+/)
    .filter((w) => w.length >= 3)
    .slice(0, 3)
    .join(" ");

  const queries = [
    `"${localityQuery}" ${city ?? ""} --instagram --facebook`.trim(),
    `"${name}" ${city ?? ""}`.trim(),
  ];

  for (const query of queries) {
    const [htmlBody, liteBody] = await Promise.all([
      fetchDuckDuckGoSource("html", query),
      fetchDuckDuckGoSource("lite", query),
    ]);

    const body = htmlBody || liteBody;
    if (body) {
      const links = extractWebsiteLinks(
        body.includes("result__a") ? "html" : "lite",
        body
      );

      const official = links
        .map((u) => u.split("?")[0])
        .find((u) => {
          const domain = normalizeDomain(u);
          if (!domain || !domain.includes(".")) return false;
          if (isNonOfficialDomain(domain)) return false;
          return true;
        });

      if (official) return official;
    }

    await new Promise((res) => setTimeout(res, 200));
  }

  return undefined;
}

function findCoreToken(name: string): string {
  const raw = name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

  const words = raw.split(/\s+/).filter((w) => w.length >= 3);

  const genericWords = [
    "supermercado", "restaurante", "padaria", "farmacia", "clinica",
    "loja", "mercado", "escola", "salao", "barbearia", "oficina",
    "hospital", "academia", "igreja", "advocacia", "pizzaria", "confeitaria",
    "agencia", "editora", "comercio", "distribuidora", "transporte",
  ];

  const distinct = words.filter(
    (w) => !genericWords.includes(w) && w !== "supermercados"
  );

  const source = distinct.length ? distinct : words;

  return source.slice(0, 2).join("");
}

function domainCandidates(name: string): string[] {
  const core = findCoreToken(name);
  if (core.length < 4) return [];
  const withCity = core; // núcleo já suficiente
  const tlds = ["com.br", "com", "net.br", "net"];
  const out: string[] = [];
  for (const tld of tlds) {
    out.push(`${core}.${tld}`);
    out.push(`www.${core}.${tld}`);
  }
  return out;
}

async function domainResponds(url: string, timeoutMs = 6000): Promise<boolean> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      method: "HEAD",
      signal: controller.signal,
      headers: { "User-Agent": USER_AGENT },
      redirect: "follow",
    });
    return res.status < 500;
  } catch {
    return false;
  } finally {
    clearTimeout(timer);
  }
}

export async function discoverWebsiteByDomain(
  name: string
): Promise<string | undefined> {
  const candidates = domainCandidates(name);

  const tested = await Promise.all(
    candidates.map(async (candidate) => {
      const ok = await domainResponds(`https://${candidate}`);
      return { candidate, ok };
    })
  );

  const first = tested.find((t) => t.ok);
  if (first) return `https://${first.candidate}`;

  return undefined;
}

