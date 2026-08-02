import { SearchCompany, SearchProvider } from "./search-engine";

export class DuckDuckGoProvider implements SearchProvider {

  async search(
    city: string,
    state: string,
    category: string
  ): Promise<SearchCompany[]> {

    console.log(
      `[Scanner] Pesquisando: ${category} em ${city}/${state}`
    );

    /*
      Próxima etapa:
      Aqui será implementado o parser da busca gratuita
      do DuckDuckGo.

      Toda a arquitetura já ficará pronta para substituir
      este retorno sem alterar nenhuma outra parte
      do Radar Vivo.
    */

    return [
      {
        name: `${category} Exemplo`,
        city,
        state,
        category,
        source: "DuckDuckGo"
      }
    ];

  }

}
