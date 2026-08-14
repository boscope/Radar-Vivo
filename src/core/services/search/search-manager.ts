import { SearchCompany } from "./search-engine";
import { OpenStreetMapProvider } from "./providers/osm/openstreetmap-provider";

export class SearchManager {

  private providers = [
    new OpenStreetMapProvider()
  ];

  async search(
    city: string,
    state: string,
    category: string
  ): Promise<SearchCompany[]> {

    const results: SearchCompany[] = [];

    for (const provider of this.providers) {

      try {

        const response = await provider.search(
          city,
          state,
          category
        );

        console.log("[SEARCH MANAGER] Provider retornou:", response.length);
      console.log("[SEARCH MANAGER] Primeiro resultado:", response[0]);
      results.push(...response);
      console.log("[SEARCH MANAGER] Total acumulado:", results.length);

      } catch (error) {

        console.error(
          "Erro no provider:",
          error
        );

      }

    }

    console.log("[SEARCH MANAGER] RETORNANDO:", results.length);
    return results;

  }

}
