export interface MapsLinkData {
  placeName?: string;
  query?: string;
  latitude?: number;
  longitude?: number;
}

const COORDS_RE = /@(-?\d+\.\d+),(-?\d+\.\d+)/;
const PLACE_RE = /maps\/place\/([^/@]+)/;
const QUERY_RE = /[?&]q=([^&]+)/;

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

  return data;
}

export function mapsLinkToSearch(maps: MapsLinkData): string | null {
  if (maps.placeName) return maps.placeName;
  if (maps.query) return maps.query;
  if (maps.latitude && maps.longitude) {
    return `${maps.latitude},${maps.longitude}`;
  }
  return null;
}
