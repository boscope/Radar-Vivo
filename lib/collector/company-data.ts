import {
  findGoogleCompany,
} from "@/lib/google";

import {
  googleCompanyToCollector,
} from "./google-adapter";

import {
  collectGoogle,
} from "./google-collector";

import {
  collectWebsite,
} from "./site-collector";

import type {
  CompanyData,
} from "./types";

import {
  analyzeCompany,
} from "@/lib/intelligence";

import {
  enrichCompanyIntelligence,
} from "@/lib/intelligence/core/company-intelligence";

export async function collectCompanyData(
  company: string
): Promise<CompanyData> {

  const googleReal =
    await findGoogleCompany(company);

  const googleData =
    googleReal
      ? googleCompanyToCollector(googleReal)
      : await collectGoogle(company);

  const websiteData =
    await collectWebsite(company);

  const analysis = {

    companyName: company,

    city: googleData.city,

    category: googleData.category,

    website: websiteData.website,

    googleBusiness: true,

    instagram: undefined,

    facebook: undefined,

    hasWhatsapp:
      googleData.hasWhatsapp ?? false,

    hasSeo:
      websiteData.hasSeo ?? false,

    hasGoogleAds: false,

    hasMetaAds: false,

    hasAutomation: false,

  };

  const intelligence =
    analyzeCompany(analysis);

  const companyData = {

    companyName: company,

    website: websiteData.website,

    cnpj: undefined,

    googleMapsUrl:
      googleData.googleMapsUrl,

    city: googleData.city,

    category: googleData.category,

    phone: googleData.phone,

    email: undefined,

    instagram: undefined,

    facebook: undefined,

    googleRating:
      googleData.googleRating,

    googleReviews:
      googleData.googleReviews,

    hasWebsite:
      websiteData.hasWebsite ?? false,

    hasSeo:
      websiteData.hasSeo ?? false,

    hasWhatsapp:
      googleData.hasWhatsapp ?? false,

    intelligence,

  };

  return await enrichCompanyIntelligence(companyData);

}
