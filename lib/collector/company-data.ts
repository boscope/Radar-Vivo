import type {
  CompanyData,
  GoogleData,
  WebsiteData,
} from "./types";

import { parseInput } from "./input-parser";

import { collectReceitaWS } from "./receita-collector";

import { searchOSMBusiness } from "./osm-collector";

import { searchGooglePlace, googlePlaceDetails, resolveCityCoordinates } from "@/lib/google/places-client";

import {
  canUseGoogle,
} from "./google-usage";

import { supabase } from "@/lib/supabase";

import {
  parseMapsLink,
  mapsLinkToSearch,
} from "./maps-parser";

import { collectWebsite, discoverSocialByName, discoverWebsiteByName, discoverWebsiteByDomain, isRealBusinessWebsite } from "./site-collector";

import {
  analyzeCompany,
} from "@/lib/intelligence";

function extractInstagramFromUrl(url?: string | null): string | undefined {
  if (!url) return undefined;

  const clean = url.replace(/["'<>\\]/g, "").split("?")[0].split("#")[0];

  const match = clean.match(
    /(?:instagram\.com|ig\.me)\/([a-zA-Z0-9._]+)/i
  );

  if (!match) return undefined;

  const user = match[1].replace(/\/$/, "");

  if (user.toLowerCase() === "accounts" || user.toLowerCase() === "login") {
    return undefined;
  }

  return `https://www.instagram.com/${user}`;
}

function isMobileNumber(raw?: string | null): boolean {
  return isMobilePhoneNumber(raw);
}

function hasRealGooglePresence(g: GoogleData): boolean {
  return Boolean(g.googlePlaceId || g.googleRating || g.googleReviews);
}

import { isMobilePhoneNumber } from "./phone-utils";

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
    hasWhatsapp: isMobileNumber(data.telefone),
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
        hasWhatsapp: isMobileNumber(place.phone),
        googlePlaceId: place.id,
        googleFresh: true,
      };
    }
  }

  const query = locationHint?.city
    ? `${name} ${locationHint.city} ${locationHint.state || ""}`
    : name;

  const location = locationHint?.city
    ? await resolveCityCoordinates(
        locationHint.city,
        locationHint.state
      )
    : null;

  const place = await searchGooglePlace(
    query,
    location ?? undefined,
    name
  );

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
    hasWhatsapp: isMobileNumber(place.phone),
    googlePlaceId: place.id,
    googleFresh: true,
  };
}

const GOOGLE_CACHE_FRESHNESS_MS = 7 * 24 * 60 * 60 * 1000;

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
        "name, city, category, phone, website, rating, reviews, google_place_id, lat, lon, last_checked_at"
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

    const linha = linhas.find((c: any) => {
      const nomeCache = (c.name ?? "")
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
      return palavras.every((p) => nomeCache.includes(p));
    });

    const cache =
      linha ??
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

    const verificadaEm = new Date(
      cache.last_checked_at ?? ""
    ).getTime();

    const cacheFresco =
      Number.isFinite(verificadaEm) &&
      Date.now() - verificadaEm < GOOGLE_CACHE_FRESHNESS_MS;

    if (!cacheFresco) return null;

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
      hasWhatsapp: isMobileNumber(cache.phone),
      googlePlaceId: cache.google_place_id ?? undefined,
      googleFresh: false,
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
    const byName = await collectFromName(search, {
      placeId: parsed.placeId,
    });
    if (byName.googleMapsUrl || byName.category !== "Empresa") {
      return { ...byName, googleMapsUrl: url };
    }
  }

  if (parsed.latitude && parsed.longitude) {
    const byName = await collectFromName(search ?? `${parsed.latitude},${parsed.longitude}`);
    if (byName.googleMapsUrl || byName.category !== "Empresa") {
      return { ...byName, googleMapsUrl: url };
    }
  }

  const resolvido = parsed.placeName ?? parsed.query;

  return {
    companyName: resolvido ?? (parsed.cid
      ? "Não foi possível identificar a empresa pelo link"
      : url),
    city: "Cidade não identificada",
    category: "Empresa",
    googleMapsUrl: url,
    googleRating: undefined,
    googleReviews: undefined,
  };
}

function hostnameOf(url?: string | null): string {
  if (!url) return "";
  try {
    return new URL(url).hostname.replace(/^www\./i, "").toLowerCase();
  } catch {
    return "";
  }
}

function mismatchSuspeito(
  category: string | undefined,
  websiteUrl?: string | null
): boolean {
  if (/locality|country|administrative|natural feature/i.test(category ?? ""))
    return true;

  const host = hostnameOf(websiteUrl);
  if (!host) return false;

  return /\.(gov|gov\.br|mil|edu|us|uk|ca|au)(\/|$)/.test(host);
}

function limparMarca(title?: string): string | undefined {
  if (!title) return undefined;
  const limpa = title
    .replace(/\s*\|.*$/i, "")
    .replace(/\s*-{1,2}.*$/i, "")
    .trim();
  return limpa.length >= 3 ? limpa : undefined;
}

async function enrichSiteIdentity(
  googleData: GoogleData,
  websiteData: WebsiteData,
  enable: boolean
): Promise<GoogleData> {
  if (!enable || !websiteData.website) return googleData;

  const status = await canUseGoogle();
  if (!status.ok) return googleData;

  try {
    if (websiteData.cnpj) {
      const receita = await collectReceitaWS(websiteData.cnpj);
      if (receita?.cnpj) {
        return {
          ...googleData,
          companyName:
            receita.nomeFantasia ?? receita.razaoSocial ?? googleData.companyName,
          city: receita.cidade ?? googleData.city,
          category: receita.categoria ?? googleData.category,
          phone: receita.telefone ?? googleData.phone,
          email: receita.email ?? googleData.email,
          hasWhatsapp:
            isMobileNumber(receita.telefone) || googleData.hasWhatsapp,
          cnpj: receita.cnpj ?? websiteData.cnpj,
          googleFresh: googleData.googleFresh,
        };
      }
    }

    const brand = limparMarca(
      websiteData.pageTitle ?? websiteData.h1 ?? googleData.companyName
    );

    if (!brand) return googleData;

    const place = await searchGooglePlace(brand, undefined, brand);

    if (
      place &&
      place.website &&
      hostnameOf(place.website) === hostnameOf(websiteData.website)
    ) {
      return {
        ...googleData,
        companyName: place.name ?? googleData.companyName,
        city: place.address
          ? extrairCidade(place.address)
          : googleData.city,
        category: place.types?.length
          ? mapGoogleTypes(place.types)
          : googleData.category,
        phone: place.phone ?? googleData.phone,
        website: place.website ?? googleData.website,
        googleMapsUrl: place.mapsUrl ?? googleData.googleMapsUrl,
        googleRating: place.rating ?? googleData.googleRating,
        googleReviews: place.reviews ?? googleData.googleReviews,
        hasWhatsapp:
          isMobileNumber(place.phone) || googleData.hasWhatsapp,
        googlePlaceId: place.id ?? googleData.googlePlaceId,
        googleFresh: googleData.googleFresh,
      };
    }
  } catch {
    /* enriquecimento opcional */
  }

  return googleData;
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

  let websiteUrl =
    type === "site"
      ? value
      : googleData.website ?? undefined;

  let websiteData: WebsiteData =
    await collectWebsite(websiteUrl);

  const resultadoIncompativel =
    type === "nome" &&
    mismatchSuspeito(googleData.category, websiteData.website);

  const discoveredWebsite =
    (resultadoIncompativel || !isRealBusinessWebsite(websiteData.website)) &&
    type !== "site"
      ? (await discoverWebsiteByName(company, googleData.city ?? undefined)) ??
        (await discoverWebsiteByDomain(company))
      : undefined;

  const usouDescoberta =
    !!discoveredWebsite && discoveredWebsite !== websiteUrl;

  if (usouDescoberta) {
    websiteUrl = discoveredWebsite;
    websiteData = await collectWebsite(websiteUrl);
  }

  if (type === "site" || resultadoIncompativel || usouDescoberta) {
    googleData = await enrichSiteIdentity(
      googleData,
      websiteData,
      true
    );
  }

  const instagramFromWebsite =
    extractInstagramFromUrl(googleData.website) ??
    extractInstagramFromUrl(websiteUrl) ??
    websiteData.instagram;

  const { instagram: instagramDiscovered, facebook: facebookDiscovered } =
    !instagramFromWebsite && !googleData.instagram && !websiteData.facebook
      ? await discoverSocialByName(company, googleData.city ?? undefined)
      : { instagram: undefined, facebook: undefined };

  const instagram =
    instagramFromWebsite ??
    googleData.instagram ??
    instagramDiscovered;

  const facebook =
    websiteData.facebook ??
    googleData.facebook ??
    facebookDiscovered;

  const companyName =
    googleData.companyName ?? company;

  const analysis = {
    companyName,
    city: googleData.city ?? "Cidade não identificada",
    category: googleData.category ?? "Empresa",
    website: websiteData.website,
    hasWebsite: websiteData.hasWebsite ?? false,
    googleBusiness: hasRealGooglePresence(googleData),
    instagram,
    facebook,
    hasWhatsapp:
      websiteData.hasWhatsapp ?? googleData.hasWhatsapp ?? false,
    hasSeo: websiteData.hasSeo ?? false,
    hasGoogleAds: websiteData.hasGoogleAds ?? false,
    hasMetaAds: websiteData.hasMetaPixel ?? false,
    hasAutomation: websiteData.hasAutomation ?? false,
    automationTool: websiteData.automationTool,
    performanceScore: websiteData.performanceScore,
  };

  const intelligence = analyzeCompany(analysis);

  const companyData: CompanyData = {
    companyName,
    website: websiteData.website,
    cnpj: googleData.cnpj ?? websiteData.cnpj,
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
    hasGoogle: hasRealGooglePresence(googleData),
    hasWhatsapp: analysis.hasWhatsapp,
    hasGoogleAds: websiteData.hasGoogleAds ?? false,
    hasMetaAds: websiteData.hasMetaPixel ?? false,
    hasAutomation: websiteData.hasAutomation ?? false,
    automationTool: websiteData.automationTool,
    intelligence,
    websiteData,
  };

  const cachedResult = await enrichCompanyIntelligence(companyData);

  if (type !== "site" && googleData.googleFresh) {
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
