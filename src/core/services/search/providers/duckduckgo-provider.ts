import { SearchCompany, SearchProvider } from "../search-engine";
import { downloadPage } from "../http/http-client";
import { parseDuckDuckGoHtml } from "../parser/html-parser";

export class DuckDuckGoProvider implements SearchProvider {

  async search(
    city: string,
    state: string,
    category: string
  ): Promise<SearchCompany[]> {

    const query = encodeURIComponent(
      `${category} ${city} ${state}`
    );

    const url =
      `https://duckduckgo.com/html/?q=${query}`;

    const html = await downloadPage(url);

    const parsed = parseDuckDuckGoHtml(html);

    return parsed.map(company => ({

      name: company.name,

      city,

      state,

      category,

      source: "DuckDuckGo",

      url: company.url

    }));

  }

}
