import {
  canUseGoogle,
  recordGoogleUsage,
} from "@/lib/collector/google-usage";

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
      return [];
    }

    const json = await response.json();

    await recordGoogleUsage("text_search");

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
    return [];
  }
}

export async function googlePlaceDetails(
  placeId: string
): Promise<GooglePlaceFull | null> {
  const status = await canUseGoogle();
  if (!status.ok) {
    console.warn("[GOOGLE PLACES] Trava:", status.reason);
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
      return null;
    }

    const json = await response.json();

    await recordGoogleUsage("details");

    const p = json;
    return {
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
  } catch (error) {
    console.error("[GOOGLE PLACES] Erro Details:", error);
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

  if (details) return details;

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

  for (const place of limited) {
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
