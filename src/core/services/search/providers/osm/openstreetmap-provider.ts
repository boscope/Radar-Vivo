import {
  SearchCompany,
  SearchProvider
} from "../../search-engine";

import { resolveCategoryTag } from "../../category-tags";

type OSMElement = {
  type: string;
  id: number;
  lat?: number;
  lon?: number;
  center?: { lat: number; lon: number };
  tags?: Record<string, string>;
};

const SERVERS = [
  "https://overpass-api.de/api/interpreter",
  "https://overpass.private.coffee/api/interpreter",
  "https://overpass.kumi.systems/api/interpreter"
];

export class OpenStreetMapProvider
implements SearchProvider {

  private async fetchOverpass(
    query: string
  ): Promise<OSMElement[]> {

    let lastError = "Erro desconhecido";

    for (const server of SERVERS) {

      try {

        const controller = new AbortController();

        const timer = setTimeout(
          () => controller.abort(),
          45000
        );

        try {

          const response = await fetch(
            `${server}?data=${encodeURIComponent(query)}`,
            {
              method: "GET",
              headers: {
                "Accept": "application/json",
                "User-Agent": "RadarVivo/1.0 (www.radarvivo.com.br)"
              },
              cache: "no-store",
              signal: controller.signal
            }
          );

          if (!response.ok) {
            lastError = `HTTP ${response.status}`;
            console.error(`[OSM] Servidor ${server} falhou: ${lastError}`);
            continue;
          }

          const data = await response.json();

          const elements: OSMElement[] =
            data.elements ?? [];

          if (elements.length > 0) return elements;

          lastError = "Nenhum elemento encontrado";

        } finally {

          clearTimeout(timer);

        }

      } catch (error) {

        lastError =
          error instanceof Error
            ? error.message
            : "Erro desconhecido";

        console.error(`[OSM] Erro no servidor ${server}: ${lastError}`);

      }

    }

    throw new Error(
      `Todos os servidores OpenStreetMap falharam. Último erro: ${lastError}`
    );

  }

  async search(
    city: string,
    state: string,
    category: string
  ): Promise<SearchCompany[]> {

    const tags = resolveCategoryTag(category);

    let areaSetup = "";
    let areaFilter = "area.searchArea";

    if (state) {

      areaSetup =
        `area["ISO3166-2"="BR-${state.toUpperCase()}"]->.searchState;`;

      areaFilter = "area.searchState";

    } else if (city) {

      areaSetup =
        `area["name"="${city}"]["boundary"="administrative"]->.searchArea;`;

    } else {

      areaSetup =
        `area["name"="Brasil"]["boundary"="administrative"]->.searchArea;`;

    }

    const body = tags
      .map((tag) => {

        const index = tag.indexOf("=");

        const tagKey = index > -1 ? tag.slice(0, index) : tag;

        const tagValue = index > -1 ? tag.slice(index + 1) : "";

        return `nwr["${tagKey}"="${tagValue}"]({AREA});`;

      })
      .join("");

    const finalQuery =
      `[out:json][timeout:30];${areaSetup}(` +
      body.replaceAll("{AREA}", areaFilter) +
      `);out center tags 25;`;

    const elements = await this.fetchOverpass(finalQuery);

    const companies: SearchCompany[] = [];

    for (const element of elements) {

      const elementTags = element.tags ?? {};

      const name = elementTags.name?.trim();

      if (!name) continue;

      const lat =
        element.lat ??
        element.center?.lat;

      const lon =
        element.lon ??
        element.center?.lon;

      companies.push({
        name,
        city: elementTags["addr:city"] ?? city,
        state: elementTags["addr:state"] ?? state,
        category,
        source: "OpenStreetMap",
        url:
          elementTags.website ||
          elementTags["contact:website"] ||
          undefined,
        mapsUrl:
          lat && lon
            ? `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lon}`
            : undefined,
        phone:
          elementTags.phone ??
          elementTags["contact:phone"],
        lat,
        lon,
      });

    }

    return companies.slice(0, 25);

  }

}
