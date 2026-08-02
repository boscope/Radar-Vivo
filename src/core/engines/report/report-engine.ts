import { getCompanyRanking } from "../ranking/ranking-engine";

export async function generateReports() {
  const ranking = await getCompanyRanking();

  return ranking.map(({ company, radar }: any, index: number) => ({
    id: String(index + 1),
    company: company.name,
    score: radar.score,
    classification: radar.classification,
    generatedAt: new Date().toISOString(),
  }));
}
