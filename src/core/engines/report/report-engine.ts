import { getCompanyRanking } from "../ranking/ranking-engine";

export type Report = {
  id: string;
  company: any;
  radar: any;
};

export async function generateReports(): Promise<Report[]> {

  const ranking = await getCompanyRanking();

  return ranking.map(({ company, radar }, index) => ({

    id: String(index + 1),

    company,

    radar

  }));

}
