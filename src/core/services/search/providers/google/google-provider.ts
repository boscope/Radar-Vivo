import { SearchCompany, SearchProvider } from "../../search-engine";
import { googleSearch } from "./google-client";

export class GoogleProvider implements SearchProvider {

  async search(
    city: string,
    state: string,
    category: string
  ): Promise<SearchCompany[]> {

    await googleSearch(
      `${category} ${city} ${state}`
    );

    return [];

  }

}
