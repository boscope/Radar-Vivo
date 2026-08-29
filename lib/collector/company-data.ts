import type {
  CompanyData,
  GoogleData,
  WebsiteData,
} from "./types";

import { parseInput } from "./input-parser";

import { collectReceitaWS } from "./receita-collector";

import { searchOSMBusiness } from "./osm-collector";

import { searchGooglePlace, googlePlaceDetails } from "@/lib/google/places-client";

import {
  canUseGoogle,
} from "./google-usage";

import { supabase } from "@/lib/supabase";

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

import {
  makeExternalId,
  upsertCompany,
} from "@/lib/services/company-db-service";

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

async function collectFromGooglePlaces(
  name: string,
  locationHint?: { city?: string; state?: string; category?: string; placeId?: string }
): Promise<GoogleData | null> {
  const status = await canUseGoogle();
  if (!status.ok) {
    console.warn("[GOOGLE] Análise individual bloqueada:", status.reason);
    return null;
  }

  if (locationHint?.placeId) {
    const place = await googlePlaceDetails(locationHint.placeId);
    if (place) {
      return {
        companyName: place.name ?? name,
        city: place.address ? extrairCidade(place.address) : locationHint.city || "Cidade não identificada",
        category: place.types?.length
          ? mapGoogleTypes(place.types)
          : locationHint.category || "Empresa",
        phone: place.phone,
        website: place.website,
        googleMapsUrl: place.mapsUrl,
        googleRating: place.rating,
        googleReviews: place.reviews,
        hasWhatsapp: !!place.phone,
        googlePlaceId: place.id,
      };
    }
  }

  const query = locationHint?.city
    ? `${name} ${locationHint.city} ${locationHint.state || ""}`
    : name;

  const place = await searchGooglePlace(query);

  if (!place) return null;

  return {
    companyName: place.name ?? name,
    city: place.address ? extrairCidade(place.address) : "Cidade não identificada",
    category: place.types?.length
      ? mapGoogleTypes(place.types)
      : "Empresa",
    phone: place.phone,
    website: place.website,
    googleMapsUrl: place.mapsUrl,
    googleRating: place.rating,
    googleReviews: place.reviews,
    hasWhatsapp: !!place.phone,
    googlePlaceId: place.id,
  };
}

async function collectFromCache(
  name: string,
  locationHint?: { city?: string; state?: string; category?: string; placeId?: string }
): Promise<GoogleData | null> {
  try {
    const nomeLimpo = name.replace(/"/g, "").trim();

    const palavras = nomeLimpo
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .split(/\s+/)
      .filter((p) => p.length >= 3);

    if (!palavras.length) return null;

    const primeirasPalavras = palavras.slice(0, 2);

    let query = supabase
      .from("companies")
      .select(
        "name, city, category, phone, website, rating, reviews, google_place_id, lat, lon"
      )
      .or(
        primeirasPalavras
          .map((p) => `name.ilike.${p}%`)
          .join(",")
      );

    if (locationHint?.city) {
      query = query.ilike("city", `%${locationHint.city}%`);
    }

    const { data } = await query.limit(10);

    const linhas = (data ?? []).filter((c: any) => {
      return c.google_place_id && (c.phone || c.website || c.rating);
    });

    const cache =
      linhas.find((c: any) => {
        const nomeCache = (c.name ?? "")
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "");
        return palavras.every((p) => nomeCache.includes(p));
      }) ??
      linhas.find((c: any) => {
        const nomeCache = (c.name ?? "")
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "");
        return (
          nomeCache.includes(primeirasPalavras[0]) &&
          nomeCache.includes(primeirasPalavras[1])
        );
      });

    if (!cache) return null;

    return {
      companyName: cache.name ?? name,
      city: cache.city ?? "Cidade não identificada",
      category: cache.category ?? "Empresa",
      phone: cache.phone ?? undefined,
      website: cache.website ?? undefined,
      googleMapsUrl: cache.lat && cache.lon
        ? `https://www.google.com/maps?q=${cache.lat},${cache.lon}`
        : undefined,
      googleRating: cache.rating ?? undefined,
      googleReviews: cache.reviews ?? undefined,
      hasWhatsapp: !!cache.phone,
      googlePlaceId: cache.google_place_id ?? undefined,
    };
  } catch (error) {
    console.error("[GOOGLE] Erro ao ler cache:", error);
    return null;
  }
}

async function collectFromName(
  name: string,
  locationHint?: { city?: string; state?: string; category?: string; placeId?: string }
): Promise<GoogleData> {
  const cache = await collectFromCache(name, locationHint);

  if (cache) return cache;

  const google = await collectFromGooglePlaces(name, locationHint);

  if (google) return google;

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

function extrairCidade(address: string): string {
  const partes = address.split(",").map((p) => p.trim());

  const indiceEstado = partes.findIndex((p) =>
    /^[A-Z]{2}$/.test(p)
  );

  if (indiceEstado > 0) {
    return partes[indiceEstado - 1]
      .replace(/\s*-\s*[A-Z]{2}$/i, "")
      .trim();
  }

  const cepIndex = partes.findIndex((p) => /\b\d{5}-\d{3}\b/.test(p));
  if (cepIndex > 1) {
    return partes[cepIndex - 1]
      .replace(/\s*-\s*[A-Z]{2}$/i, "")
      .trim();
  }

  return "Cidade não identificada";
}

function mapGoogleTypes(types: string[]): string {
  const map: Record<string, string> = {
    barber_shop: "Barbearia",
    beauty_salon: "Salão de Beleza",
    dentist: "Dentista",
    doctor: "Consultório Médico",
    hospital: "Hospital",
    health: "Saúde",
    restaurant: "Restaurante",
    cafe: "Cafeteria",
    bakery: "Padaria",
    pharmacy: "Farmácia",
    school: "Escola",
    university: "Universidade",
    supermarket: "Supermercado",
    store: "Loja",
    shop: "Loja",
    florist: "Floricultura",
    car_repair: "Oficina",
    gym: "Academia",
    hotel: "Hotel",
    hair_care: "Barbearia",
  };

  for (const type of types) {
    if (map[type]) return map[type];
  }

  return types[0]
    ? types[0].replace(/_/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase())
    : "Empresa";
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
  company: string,
  locationHint?: { city?: string; state?: string; category?: string; placeId?: string }
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
    googleData = await collectFromName(value, locationHint);
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
    hasGoogleAds: websiteData.hasGoogleAds ?? false,
    hasMetaAds: websiteData.hasMetaPixel ?? false,
    hasAutomation: websiteData.hasAutomation ?? false,
    automationTool: websiteData.automationTool,
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
    hasGoogle: !!googleData.googleMapsUrl || !!googleData.googlePlaceId || !!googleData.googleRating,
    hasWhatsapp: analysis.hasWhatsapp,
    hasGoogleAds: websiteData.hasGoogleAds ?? false,
    hasMetaAds: websiteData.hasMetaPixel ?? false,
    hasAutomation: websiteData.hasAutomation ?? false,
    automationTool: websiteData.automationTool,
    intelligence,
    websiteData,
  };

  const cachedResult = await enrichCompanyIntelligence(companyData);

  if (type !== "site") {
    const externalId = makeExternalId(
      cachedResult.companyName,
      cachedResult.city,
      cachedResult.category
    );

    await upsertCompany(externalId, {
      name: cachedResult.companyName,
      city: cachedResult.city,
      state: undefined,
      category: cachedResult.category,
      website: cachedResult.website ?? undefined,
      phone: cachedResult.phone ?? undefined,
      rating: cachedResult.googleRating ?? undefined,
      reviews: cachedResult.googleReviews ?? undefined,
      lat: undefined,
      lon: undefined,
      googlePlaceId: googleData.googlePlaceId,
      radarScore:
        cachedResult.intelligence?.score?.score ?? undefined,
    }).catch((error) => {
      console.error("[GOOGLE] Erro ao salvar cache:", error);
    });
  }

  return cachedResult;
}
