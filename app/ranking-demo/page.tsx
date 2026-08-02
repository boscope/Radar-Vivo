import { getCompanyRanking } from "@/src/core/engines/ranking/ranking-engine";

export default async function RankingDemo() {

  const ranking = await getCompanyRanking();

  return (

    <main className="p-10">

      <h1 className="text-4xl font-bold mb-8">
        Ranking Radar Vivo
      </h1>

      <div className="space-y-4">

        {ranking.map((company: any) => (

          <div
            key={company.id}
            className="bg-white rounded-xl shadow p-5 border"
          >

            <h2 className="font-bold text-xl">
              {company.name}
            </h2>

            <p>
              Score: {company.radar.score}
            </p>

          </div>

        ))}

      </div>

    </main>

  );

}
