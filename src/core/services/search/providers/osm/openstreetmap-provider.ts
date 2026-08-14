import {
  SearchCompany,
  SearchProvider
} from "../../search-engine";

type OSMElement = {
  type: string;
  id: number;
  tags?: Record<string, string>;
};

export class OpenStreetMapProvider
implements SearchProvider {

  async search(
    city: string,
    state: string,
    category: string
  ): Promise<SearchCompany[]> {

    const query = `
[out:json][timeout:25];
area["name"="${city}"]["boundary"="administrative"]->.searchArea;
nwr["amenity"="dentist"](area.searchArea);
out center tags;
`;

    const servers = [
      "https://overpass-api.de/api/interpreter",
      "https://overpass.private.coffee/api/interpreter",
      "https://overpass.kumi.systems/api/interpreter"
    ];

    let lastError = "Erro desconhecido";

    for (const server of servers) {

      try {

        console.log(
          `[OSM] Tentando servidor: ${server}`
        );

        const response = await fetch(
          `${server}?data=${encodeURIComponent(query)}`,
          {
            method: "GET",
            headers: {
              "Accept": "application/json"
            },
            cache: "no-store"
          }
        );

        if (!response.ok) {

          lastError =
            `HTTP ${response.status}`;

          console.error(
            `[OSM] Servidor falhou: ${server} - ${lastError}`
          );

          continue;
        }

        const data = await response.json();

        const elements: OSMElement[] =
          data.elements ?? [];

        console.log(
          `[OSM] ${elements.length} elementos encontrados`
        );

        const companies: SearchCompany[] =
          elements
            .map((element) => {

              const tags =
                element.tags ?? {};

              const name =
                tags.name?.trim();

              if (!name) {
                return null;
              }

              return {
                name,
                city,
                state,
                category,
                source: "OpenStreetMap",
                url:
                  tags.website ||
                  tags["contact:website"] ||
                  `https://www.openstreetmap.org/${element.type}/${element.id}`
              };

            })
            .filter(
              (
                company
              ): company is SearchCompany =>
                company !== null
            );

        console.log(
          `[OSM] Empresas válidas: ${companies.length}`
        );

        return companies;

      } catch (error) {

        lastError =
          error instanceof Error
            ? error.message
            : "Erro desconhecido";

        console.error(
          `[OSM] Erro no servidor ${server}: ${lastError}`
        );

      }

    }

    throw new Error(
      `Todos os servidores OpenStreetMap falharam. Último erro: ${lastError}`
    );

  }

}
