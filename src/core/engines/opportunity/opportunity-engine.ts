import { getCompanyRanking } from "../ranking/ranking-engine";

export async function getBestOpportunities() {

  const ranking = await getCompanyRanking();

  return ranking
    .slice(0, 5)
    .map((company: any, index: number) => ({

      position: index + 1,

      company,

      score: company.radar.score,

      opportunity:
        company.radar.score >= 90
          ? "Alta"
          : company.radar.score >= 70
          ? "Média"
          : "Baixa"

    }));

}
