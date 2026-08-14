import type { WebsiteData } from "./types";

export interface DomainData {

  domain?: string;

  hasSSL: boolean;

  dnsConfigured: boolean;

  expiresAt?: string;

}

export async function collectDomain(
  website: WebsiteData
): Promise<DomainData> {

  if (!website.website) {

    return {

      domain: undefined,

      hasSSL: false,

      dnsConfigured: false,

      expiresAt: undefined,

    };

  }

  const domain = website.website
    .replace("https://", "")
    .replace("http://", "")
    .split("/")[0];

  return {

    domain,

    hasSSL: true,

    dnsConfigured: true,

    expiresAt: undefined,

  };

}
