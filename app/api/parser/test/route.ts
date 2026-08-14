import { NextResponse } from "next/server";
import { parseDuckDuckGoHtml } from "@/src/core/services/search/parser/html-parser";

export async function GET() {

  const html = `
    <html>
      <body>
        <a href="https://empresa1.com">Clínica Sorriso Recife</a>
        <a href="https://empresa2.com">Odonto Prime Boa Viagem</a>
        <a href="https://empresa3.com">Centro Odontológico Recife</a>
      </body>
    </html>
  `;

  const companies = parseDuckDuckGoHtml(html);

  return NextResponse.json({
    total: companies.length,
    companies
  });

}
