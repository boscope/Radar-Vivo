import type { CompanyData } from "./types";

export interface SocialData {

  instagram?: string;

  facebook?: string;

  linkedin?: string;

  youtube?: string;

  tiktok?: string;

}

export async function collectSocial(
  company: CompanyData
): Promise<SocialData> {

  const name =
    company.companyName
      .toLowerCase()
      .replace(/\s+/g, "");

  return {

    instagram:
      `https://instagram.com/${name}`,

    facebook:
      `https://facebook.com/${name}`,

    linkedin:
      `https://linkedin.com/company/${name}`,

    youtube:
      undefined,

    tiktok:
      undefined,

  };

}
