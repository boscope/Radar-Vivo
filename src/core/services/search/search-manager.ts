import { SearchCompany } from "./search-engine";
import { OpenStreetMapProvider } from "./providers/osm/openstreetmap-provider";
import { GoogleProvider } from "./providers/google/google-provider";

export class SearchManager {

  private google = new GoogleProvider();
  private osm = new OpenStreetMapProvider();

  async search(
    city: string,
    state: string,
    category: string
  ): Promise<SearchCompany[]> {

    const googleResults = await this.safeSearch(
      () => this.google.search(city, state, category)
    );

    console.log("[SEARCH MANAGER] Google retornou:", googleResults.length);

    if (googleResults.length > 0) {
      return googleResults;
    }

    const osmResults = await this.safeSearch(
      () => this.osm.search(city, state, category)
    );

    console.log("[SEARCH MANAGER] OSM (fallback) retornou:", osmResults.length);

    return osmResults;
  }

  private async safeSearch(
    fn: () => Promise<SearchCompany[]>
  ): Promise<SearchCompany[]> {
    try {
      return await fn();
    } catch (error) {
      console.error("[SEARCH MANAGER] Erro:", error);
      return [];
    }
  }

}
