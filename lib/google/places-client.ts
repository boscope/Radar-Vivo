import {
  canUseGoogle,
  recordGoogleUsage,
} from "@/lib/collector/google-usage";
import {
  googleOk,
  googleFail,
} from "@/lib/collector/google-status";
import { supabase } from "@/lib/supabase";

const GOOGLE_API_KEY =
  process.env.GOOGLE_API_KEY ?? "";

const TEXT_SEARCH_URL =
  "https://places.googleapis.com/v1/places:searchText";

const PLACE_DETAILS_URL =
  "https://places.googleapis.com/v1/places";

export interface GooglePlaceBasic {
  id: string;
  name: string;
  address: string;
  city?: string;
  state?: string;
  latitude?: number;
  longitude?: number;
  rating?: number;
  reviews?: number;
  types?: string[];
  businessStatus?: string;
}

export interface GooglePlaceFull extends GooglePlaceBasic {
  phone?: string;
  website?: string;
  mapsUrl?: string;
}

type TextSearchField =
  | "places.id"
  | "places.displayName"
  | "places.formattedAddress"
  | "places.location"
  | "places.rating"
  | "places.userRatingCount"
  | "places.types"
  | "places.businessStatus";

type DetailsField =
  | "id"
  | "displayName"
  | "formattedAddress"
  | "location"
  | "rating"
  | "userRatingCount"
  | "types"
  | "businessStatus"
  | "nationalPhoneNumber"
  | "websiteUri"
  | "googleMapsUri";

const TEXT_SEARCH_FIELDS: TextSearchField[] = [
  "places.id",
  "places.displayName",
  "places.formattedAddress",
  "places.location",
  "places.rating",
  "places.userRatingCount",
  "places.types",
  "places.businessStatus",
];

const DETAILS_FIELDS: DetailsField[] = [
  "id",
  "displayName",
  "formattedAddress",
  "location",
  "rating",
  "userRatingCount",
  "types",
  "businessStatus",
  "nationalPhoneNumber",
  "websiteUri",
  "googleMapsUri",
];

export async function googleTextSearch(
  query: string,
  location?: { lat: number; lng: number }
): Promise<GooglePlaceBasic[]> {
  const status = await canUseGoogle();
  if (!status.ok) {
    console.warn("[GOOGLE PLACES] Trava:", status.reason);
    googleFail(status.reason);
    return [];
  }

  const body: Record<string, unknown> = {
    textQuery: query,
    languageCode: "pt-BR",
    regionCode: "BR",
  };

  if (location) {
    body.locationBias = {
      circle: {
        center: { latitude: location.lat, longitude: location.lng },
        radius: 50000,
      },
    };
  }

  try {
    const response = await fetch(TEXT_SEARCH_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": GOOGLE_API_KEY,
        "X-Goog-FieldMask": TEXT_SEARCH_FIELDS.join(","),
      },
      body: JSON.stringify(body),
      cache: "no-store",
    });

    if (!response.ok) {
      const text = await response.text();
      console.error(
        "[GOOGLE PLACES] TextSearch erro:",
        response.status,
        text.slice(0, 300)
      );
      googleFail(`TextSearch HTTP ${response.status}`);
      return [];
    }

    const json = await response.json();

    await recordGoogleUsage("text_search");
    googleOk();

    return ((json.places ?? []) as any[]).map((p: any) => ({
      id: p.id,
      name: p.displayName?.text ?? "",
      address: p.formattedAddress ?? "",
      latitude: p.location?.latitude,
      longitude: p.location?.longitude,
      rating: p.rating,
      reviews: p.userRatingCount,
      types: p.types ?? [],
      businessStatus: p.businessStatus,
    }));
  } catch (error) {
    console.error("[GOOGLE PLACES] Erro TextSearch:", error);
    googleFail("TextSearch (rede)");
    return [];
  }
}

const detailsCache = new Map<
  string,
  { at: number; data: GooglePlaceFull | null }
>();
const DETAILS_CACHE_TTL_MS = 24 * 60 * 60 * 1000;
const DB_CACHE_FRESHNESS_MS = 7 * 24 * 60 * 60 * 1000;

type CachedPlaceRow = {
  name: string | null;
  city: string | null;
  phone: string | null;
  website: string | null;
  rating: number | null;
  reviews: number | null;
  lat: number | null;
  lon: number | null;
  google_place_id: string;
  last_checked_at: string | null;
};

function rowToPlaceFull(row: CachedPlaceRow): GooglePlaceFull {
  return {
    id: row.google_place_id,
    name: row.name ?? "",
    address: "",
    city: row.city ?? undefined,
    latitude: row.lat ?? undefined,
    longitude: row.lon ?? undefined,
    rating: row.rating ?? undefined,
    reviews: row.reviews ?? undefined,
    types: [],
    phone: row.phone ?? undefined,
    website: row.website ?? undefined,
    mapsUrl:
      row.lat != null && row.lon != null
        ? `https://www.google.com/maps?q=${row.lat},${row.lon}`
        : undefined,
  };
}

async function loadCachedPlaces(
  placeIds: string[]
): Promise<Map<string, GooglePlaceFull>> {
  const map = new Map<string, GooglePlaceFull>();
  if (!placeIds.length) return map;

  try {
    const { data } = await supabase
      .from("companies")
      .select(
        "name, city, phone, website, rating, reviews, lat, lon, google_place_id, last_checked_at"
      )
      .in("google_place_id", placeIds);

    const cutoff = Date.now() - DB_CACHE_FRESHNESS_MS;

    for (const row of (data ?? []) as CachedPlaceRow[]) {
      if (!row.google_place_id) continue;
      const checked = new Date(row.last_checked_at ?? "").getTime();
      const fresh = Number.isFinite(checked) && checked > cutoff;
      const hasData = !!(row.phone || row.website || row.rating);
      if (fresh && hasData) {
        map.set(row.google_place_id, rowToPlaceFull(row));
      }
    }
  } catch (error) {
    console.error("[GOOGLE PLACES] Erro cache DB:", error);
  }

  return map;
}

export async function googlePlaceDetails(
  placeId: string
): Promise<GooglePlaceFull | null> {
  const cached = detailsCache.get(placeId);
  if (cached && Date.now() - cached.at < DETAILS_CACHE_TTL_MS) {
    return cached.data;
  }

  const fromDb = (await loadCachedPlaces([placeId])).get(placeId);
  if (fromDb) {
    detailsCache.set(placeId, { at: Date.now(), data: fromDb });
    return fromDb;
  }

  const status = await canUseGoogle();
  if (!status.ok) {
    console.warn("[GOOGLE PLACES] Trava:", status.reason);
    googleFail(status.reason);
    return null;
  }

  try {
    const response = await fetch(
      `${PLACE_DETAILS_URL}/${encodeURIComponent(placeId)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": GOOGLE_API_KEY,
          "X-Goog-FieldMask": DETAILS_FIELDS.join(","),
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      const text = await response.text();
      console.error(
        "[GOOGLE PLACES] Details erro:",
        response.status,
        text.slice(0, 300)
      );
      googleFail(`Details HTTP ${response.status}`);
      return null;
    }

    const json = await response.json();

    await recordGoogleUsage("details");
    googleOk();

    const p = json;
    const result: GooglePlaceFull | null = {
      id: p.id ?? placeId,
      name: p.displayName?.text ?? "",
      address: p.formattedAddress ?? "",
      latitude: p.location?.latitude,
      longitude: p.location?.longitude,
      rating: p.rating,
      reviews: p.userRatingCount,
      types: p.types ?? [],
      businessStatus: p.businessStatus,
      phone: p.nationalPhoneNumber,
      website: p.websiteUri,
      mapsUrl: p.googleMapsUri,
    };
    detailsCache.set(placeId, { at: Date.now(), data: result });
    return result;
  } catch (error) {
    console.error("[GOOGLE PLACES] Erro Details:", error);
    googleFail("Details (rede)");
    return null;
  }
}

export async function searchGooglePlace(
  query: string,
  location?: { lat: number; lng: number },
  matchName?: string
): Promise<GooglePlaceFull | null> {
  const results = await googleTextSearch(query, location);

  if (!results.length) return null;

  const top = pickBestMatch(matchName ?? query, results);

  const details = await googlePlaceDetails(top.id);

  if (details) {
    return {
      ...details,
      types: details.types?.length ? details.types : top.types,
    };
  }

  return {
    id: top.id,
    name: top.name,
    address: top.address,
    latitude: top.latitude,
    longitude: top.longitude,
    rating: top.rating,
    reviews: top.reviews,
    types: top.types,
    businessStatus: top.businessStatus,
  };
}

const STOPWORDS = new Set([
  "supermercado", "restaurante", "padaria", "farmacia", "clinica", "loja",
  "mercado", "escola", "salão", "salao", "barbearia", "oficina",
  "advocacia", "em", "de", "da", "do", "das", "dos", "e",
]);

function normalizeToken(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]/g, " ");
}

function pickBestMatch(
  query: string,
  results: GooglePlaceBasic[]
): GooglePlaceBasic {
  const q = normalizeToken(query);
  const tokens = q
    .split(/\s+/)
    .filter((t) => t.length >= 3 && !STOPWORDS.has(t) && !/^\d+$/.test(t));

  if (!tokens.length) return results[0];

  let best: GooglePlaceBasic = results[0];
  let bestScore = -1;

  for (const place of results) {
    const name = normalizeToken(place.name);
    const nameTokens = name.split(/\s+/).filter((t) => t.length >= 3);
    let score = 0;
    for (const t of tokens) {
      if (nameTokens.includes(t) || name.includes(t)) score += 2;
    }
    if (score > bestScore) {
      bestScore = score;
      best = place;
    }
  }

  return best;
}

export async function searchGooglePlacesByCategory(
  category: string,
  city: string,
  state: string,
  limit = 20
): Promise<GooglePlaceFull[]> {
  const location = await resolveCityCoordinates(city, state);

  const query = location
    ? `${category} em ${city}, ${state}`
    : `${category} ${city} ${state}`.trim();

  let results = await googleTextSearch(
    query,
    location ?? undefined
  );

  results = results.filter((place) =>
    matchesState(place, state, city)
  );

  const limited = results.slice(0, limit);

  const full: GooglePlaceFull[] = [];

  const cachedMap = await loadCachedPlaces(limited.map((p) => p.id));

  for (const place of limited) {
    const cached = cachedMap.get(place.id);

    if (cached) {
      full.push({
        ...cached,
        types: cached.types?.length ? cached.types : place.types,
      });
      continue;
    }

    const details = await googlePlaceDetails(place.id);
    if (details) {
      full.push(details);
    } else {
      full.push({
        id: place.id,
        name: place.name,
        address: place.address,
        latitude: place.latitude,
        longitude: place.longitude,
        rating: place.rating,
        reviews: place.reviews,
        types: place.types,
        businessStatus: place.businessStatus,
      });
    }
  }

  return full;
}

const BR_STATES =
  /(?:^|[\s-])(AC|AL|AP|AM|BA|CE|DF|ES|GO|MA|MT|MS|MG|PA|PB|PR|PE|PI|RJ|RN|RS|RO|RR|SC|SP|SE|TO)(?=[\s,.]|$)/i;

function stateFromAddress(address: string): string | null {
  if (!address) return null;
  const match = address.match(BR_STATES);
  return match ? match[1].toUpperCase() : null;
}

function matchesState(
  place: GooglePlaceBasic,
  state: string,
  _city: string
): boolean {
  if (!state) return true;
  const wanted = state.toUpperCase();

  if (!BR_STATES.test(wanted)) return true;

  const found = stateFromAddress(place.address ?? "");

  if (found == null) return true;

  return found === wanted;
}

const MANUAL_COORDS: Record<string, { lat: number; lng: number }> = {
    "londrina|pr": { lat: -23.3045, lng: -51.1696 },
    "londrina|parana": { lat: -23.3045, lng: -51.1696 },
    "são paulo|sp": { lat: -23.5505, lng: -46.6333 },
    "sao paulo|sp": { lat: -23.5505, lng: -46.6333 },
    "rio de janeiro|rj": { lat: -22.9068, lng: -43.1729 },
    "curitiba|pr": { lat: -25.4284, lng: -49.2733 },
    "belo horizonte|mg": { lat: -19.9167, lng: -43.9345 },
    "recife|pe": { lat: -8.0476, lng: -34.877 },
    "salvador|ba": { lat: -12.9777, lng: -38.5016 },
    "porto alegre|rs": { lat: -30.0346, lng: -51.2177 },
    "fortaleza|ce": { lat: -3.7172, lng: -38.5433 },
    "brasilia|df": { lat: -15.8267, lng: -47.9218 },
    "goiania|go": { lat: -16.6869, lng: -49.2648 },
    "manaus|am": { lat: -3.119, lng: -60.0217 },
    "florianopolis|sc": { lat: -27.5954, lng: -48.548 },
    "cuiaba|mt": { lat: -15.6014, lng: -56.0979 },
    "carpina|pe": { lat: -7.8486, lng: -35.2523 },
  };

const coordsCache = new Map<string, { lat: number; lng: number }>();

function cityToCoordinates(
  city: string,
  state: string
): { lat: number; lng: number } | null {
  const key = `${city}|${state}`.toLowerCase().trim();
  return MANUAL_COORDS[key] ?? null;
}

export async function resolveCityCoordinates(
  city?: string,
  state?: string
): Promise<{ lat: number; lng: number } | null> {
  if (!city) return null;

  const cached = cityToCoordinates(city, state ?? "");
  if (cached) return cached;

  const cacheKey = `${city}|${state}`.toLowerCase().trim();
  const inMem = coordsCache.get(cacheKey);
  if (inMem) return inMem;

  try {
    const q = state
      ? `${city}, ${state.toUpperCase()}, Brasil`
      : `${city}, Brasil`;

    const response = await fetch(
      `https://nominatim.openstreetmap.org/search` +
        `?q=${encodeURIComponent(q)}` +
        `&format=json&limit=1&countrycodes=br`,
      {
        headers: {
          "Accept": "application/json",
          "User-Agent": "RadarVivo/1.0 (www.radarvivo.com.br)",
        },
      }
    );

    if (!response.ok) return null;

    const results: any[] = await response.json();
    const first = results[0];
    if (!first) return null;

    const coords = {
      lat: parseFloat(first.lat),
      lng: parseFloat(first.lon),
    };
    if (isNaN(coords.lat) || isNaN(coords.lng)) return null;

    coordsCache.set(cacheKey, coords);
    return coords;
  } catch {
    return null;
  }
}
