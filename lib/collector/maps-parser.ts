export interface MapsLinkData {
  placeName?: string;
  query?: string;
  latitude?: number;
  longitude?: number;
  cid?: string;
}

const COORDS_RE = /@(-?\d+\.\d+),(-?\d+\.\d+)/;
const PLACE_RE = /maps\/place\/([^/@]+)/;
const QUERY_RE = /[?&]q=([^&]+)/;
const CID_RE = /[?&]cid=(\d+)/;

export async function parseMapsLink(
  url: string
): Promise<MapsLinkData> {
  let finalUrl = url;

  try {
    if (url.includes("goo.gl") || url.includes("maps.app.goo.gl")) {
      const redirect = await fetch(url, {
        method: "GET",
        redirect: "manual",
        headers: { "User-Agent": "RadarVivo/1.0" },
      });

      const location = redirect.headers.get("location");
      if (location) finalUrl = location.startsWith("http") ? location : `https://maps.google.com${location}`;
    }
  } catch {
    // mantém a url original
  }

  const data: MapsLinkData = {};

  const coords = finalUrl.match(COORDS_RE);
  if (coords) {
    data.latitude = parseFloat(coords[1]);
    data.longitude = parseFloat(coords[2]);
  }

  const place = finalUrl.match(PLACE_RE);
  if (place) {
    data.placeName = decodeURIComponent(
      place[1].replace(/\+/g, " ")
    );
  }

  const query = finalUrl.match(QUERY_RE);
  if (query) {
    data.query = decodeURIComponent(
      query[1].replace(/\+/g, " ")
    );
  }

  const cid = finalUrl.match(CID_RE);
  if (cid) {
    data.cid = cid[1];
  }

  if (cid && !data.placeName && !data.query) {
    const resolved = await resolveCidPlaceName(cid[1]);
    if (resolved?.placeName) data.placeName = resolved.placeName;
  }

  return data;
}

async function resolveCidPlaceName(
  cid: string
): Promise<{ placeName?: string; placeId?: string } | null> {
  try {
    const response = await fetch(
      `https://www.google.com/maps?cid=${encodeURIComponent(cid)}&output=embed`,
      {
        headers: { "User-Agent": "Mozilla/5.0" },
        redirect: "follow",
      }
    );
    if (!response.ok) return null;

    const html = await response.text();

    let placeName: string | undefined;
    const og = html.match(/property="og:title"\s+content="([^"]+)"/);
    if (og) placeName = og[1];
    if (!placeName) {
      const title = html.match(/<title>([^<]+)<\/title>/);
      if (title && !/google maps/i.test(title[1])) placeName = title[1].trim();
    }

    let placeId: string | undefined;
    const cidFallback = html.match(/place_id:['"]([^'"]+)['"]/);
    if (cidFallback) placeId = cidFallback[1];

    return { placeName, placeId };
  } catch {
    return null;
  }
}

export function mapsLinkToSearch(maps: MapsLinkData): string | null {
  if (maps.placeName) return maps.placeName;
  if (maps.query) return maps.query;
  if (maps.latitude && maps.longitude) {
    return `${maps.latitude},${maps.longitude}`;
  }
  return null;
}
