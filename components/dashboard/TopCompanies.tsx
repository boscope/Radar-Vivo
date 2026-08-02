import { getCompanyRanking } from "@/src/core/engines/ranking/ranking-engine";

export default async function TopCompanies() {

  const ranking = await getCompanyRanking();

  const top5 = ranking.slice(0, 5);

  return (

    <div className="bg-white rounded-2xl shadow p-6">

      <h2 className="text-2xl font-bold mb-6">
        Top Empresas
      </h2>

      <div className="space-y-4">

        {top5.map((company: any) => (

          <div
            key={company.id}
            className="flex justify-between border-b pb-3"
          >

            <span>{company.name}</span>

            <strong>{company.radar.score}</strong>

          </div>

        ))}

      </div>

    </div>

  );

}
