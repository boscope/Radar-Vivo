import { SearchCompany } from "./search-engine";
import { DuckDuckGoProvider } from "./duckduckgo-provider";

export class SearchManager {

  private providers = [
    new DuckDuckGoProvider()
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

        results.push(...response);

      } catch (error) {

        console.error(
          "Erro no provider:",
          error
        );

      }

    }

    return results;

  }

}
