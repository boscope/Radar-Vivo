import type { WebsiteData } from "./types";

export async function collectWebsite(
  company: string
): Promise<WebsiteData> {

  const companyName = company.toLowerCase();

  let website: string | undefined;

  if (companyName.includes("mercado livre")) {
    website = "https://www.mercadolivre.com.br";
  }

  if (companyName.includes("barbearia")) {
    website = "https://barbearia-exemplo.com.br";
  }

  if (companyName.includes("clinica")) {
    website = "https://clinica-exemplo.com.br";
  }

  const hasWebsite = !!website;

  return {

    website,

    hasWebsite,

    hasSeo: hasWebsite,

    seoScore: hasWebsite ? 78 : 0,

    hasSSL: hasWebsite,

    hasSitemap: hasWebsite,

    hasRobots: hasWebsite,

    hasOpenGraph: hasWebsite,

    hasSchema: false,

    hasAnalytics: true,

    hasTagManager: true,

    hasMetaPixel: false,

    isResponsive: true,

    pageTitle: hasWebsite ? company : undefined,

    metaDescription: hasWebsite
      ? `Site oficial de ${company}`
      : undefined,

    h1: hasWebsite
      ? company
      : undefined,

    technologies: hasWebsite
      ? ["Next.js", "React", "TypeScript"]
      : [],

    responseTime: hasWebsite
      ? 820
      : undefined,

    performanceScore: hasWebsite
      ? 86
      : undefined,

  };

}