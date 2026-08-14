import * as cheerio from "cheerio";

export interface ParsedCompany {

  name: string;

  url: string;

}

export function parseDuckDuckGoHtml(
  html: string
): ParsedCompany[] {

  const $ = cheerio.load(html);

  const companies: ParsedCompany[] = [];

  $("a").each((_, element) => {

    const name = $(element).text().trim();

    const url = $(element).attr("href") || "";

    if (
      name.length > 5 &&
      url.startsWith("http")
    ) {

      companies.push({
        name,
        url
      });

    }

  });

  return companies;

}
