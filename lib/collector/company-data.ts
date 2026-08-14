import type {
  CompanyData,
  GoogleData,
  WebsiteData,
} from "./types";

import { parseInput } from "./input-parser";

import { collectReceitaWS } from "./receita-collector";

import { searchOSMBusiness } from "./osm-collector";

import {
  parseMapsLink,
  mapsLinkToSearch,
} from "./maps-parser";

import { collectWebsite } from "./site-collector";

import {
  analyzeCompany,
} from "@/lib/intelligence";

import {
  enrichCompanyIntelligence,
} from "@/lib/intelligence/core/company-intelligence";

async function collectFromCnpj(
  cnpj: string
): Promise<GoogleData> {
  const data = await collectReceitaWS(cnpj);

  if (!data) {
    return {
      companyName: cnpj,
      city: "Cidade não identificada",
      category: "Empresa",
    };
  }

  return {
    companyName: data.nomeFantasia ?? data.razaoSocial ?? cnpj,
    city: data.cidade ?? "Cidade não identificada",
    category: data.categoria ?? "Empresa",
    phone: data.telefone,
    email: data.email,
    hasWhatsapp: !!data.telefone,
    cnpj: data.cnpj ?? cnpj,
    googleMapsUrl: undefined,
    googleRating: undefined,
    googleReviews: undefined,
  };
}

async function collectFromName(
  name: string
): Promise<GoogleData> {
  const result = await searchOSMBusiness(name);

  if (!result) {
    return {
      companyName: name,
      city: "Cidade não identificada",
      category: "Empresa",
    };
  }

  return {
    companyName: result.name ?? name,
    city: result.cidade ?? "Cidade não identificada",
    category: result.categoria ?? "Empresa",
    googleMapsUrl: result.latitude && result.longitude
      ? `https://www.google.com/maps?q=${result.latitude},${result.longitude}`
      : undefined,
    googleRating: undefined,
    googleReviews: undefined,
  };
}

async function collectFromMapsLink(
  url: string
): Promise<GoogleData> {
  const parsed = await parseMapsLink(url);

  const search = mapsLinkToSearch(parsed);

  if (search) {
    const byName = await collectFromName(search);
    if (byName.googleMapsUrl || byName.category !== "Empresa") {
      return { ...byName, googleMapsUrl: url };
    }
  }

  return {
    companyName: parsed.placeName ?? parsed.query ?? url,
    city: "Cidade não identificada",
    category: "Empresa",
    googleMapsUrl: url,
    googleRating: undefined,
    googleReviews: undefined,
  };
}

export async function collectCompanyData(
  company: string
): Promise<CompanyData> {
  const { type, value } = parseInput(company);

  let googleData: GoogleData;

  if (type === "cnpj") {
    googleData = await collectFromCnpj(value);
  } else if (type === "maps") {
    googleData = await collectFromMapsLink(value);
  } else if (type === "site") {
    googleData = {
      companyName: value.replace(/^https?:\/\//, "").split("/")[0],
      city: "Cidade não identificada",
      category: "Empresa",
    };
  } else {
    googleData = await collectFromName(value);
  }

  const websiteUrl =
    type === "site"
      ? value
      : googleData.website ?? undefined;

  const websiteData: WebsiteData =
    await collectWebsite(websiteUrl);

  const companyName =
    googleData.companyName ?? company;

  const analysis = {
    companyName,
    city: googleData.city ?? "Cidade não identificada",
    category: googleData.category ?? "Empresa",
    website: websiteData.website,
    googleBusiness: !!googleData.googleMapsUrl,
    instagram: websiteData.instagram ?? googleData.instagram,
    facebook: websiteData.facebook ?? googleData.facebook,
    hasWhatsapp:
      websiteData.hasWhatsapp ?? googleData.hasWhatsapp ?? false,
    hasSeo: websiteData.hasSeo ?? false,
    hasGoogleAds: false,
    hasMetaAds: false,
    hasAutomation: false,
  };

  const intelligence = analyzeCompany(analysis);

  const companyData: CompanyData = {
    companyName,
    website: websiteData.website,
    cnpj: googleData.cnpj,
    googleMapsUrl: googleData.googleMapsUrl,
    city: googleData.city ?? "Cidade não identificada",
    category: googleData.category ?? "Empresa",
    phone: googleData.phone,
    email: googleData.email,
    instagram: analysis.instagram,
    facebook: analysis.facebook,
    linkedin: undefined,
    youtube: undefined,
    tiktok: undefined,
    googleRating: googleData.googleRating,
    googleReviews: googleData.googleReviews,
    hasWebsite: websiteData.hasWebsite ?? false,
    hasSeo: websiteData.hasSeo ?? false,
    hasWhatsapp: analysis.hasWhatsapp,
    intelligence,
    websiteData,
  };

  return await enrichCompanyIntelligence(companyData);
}
