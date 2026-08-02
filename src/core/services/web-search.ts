export type SearchResult = {
  title: string;
  city: string;
  category: string;
  source: string;
};

export async function searchCompanies(
  city: string,
  category: string
): Promise<SearchResult[]> {

  /*
   Nesta primeira versão o Radar Vivo já fica preparado
   para receber buscadores gratuitos.

   Depois substituiremos este mock pelo mecanismo de
   busca gratuito (DuckDuckGo/OpenStreetMap/etc)
   sem alterar nenhuma tela do sistema.
  */

  return [

    {
      title: `${category} Premium`,
      city,
      category,
      source: "Radar Vivo"
    },

    {
      title: `${category} Brasil`,
      city,
      category,
      source: "Radar Vivo"
    },

    {
      title: `${category} Center`,
      city,
      category,
      source: "Radar Vivo"
    }

  ];

}
