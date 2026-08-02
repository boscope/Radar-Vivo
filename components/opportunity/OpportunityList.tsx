import { getBestOpportunities } from "../../src/core/engines/opportunity/opportunity-engine";

export default async function OpportunityList() {
  const list = await getBestOpportunities();

  return (
    <div className="rounded-2xl bg-white shadow p-6">
      <h2 className="text-2xl font-bold mb-6">
        Oportunidades Encontradas
      </h2>

      <div className="space-y-4">
        {list.map((item: any, index: number) => (
          <div
            key={index}
            className="border rounded-xl p-4"
          >
            <h3 className="font-bold">
              {item.company.name}
            </h3>

            <p className="text-gray-600">
              Oportunidade {item.opportunity}
            </p>

            <div className="flex justify-between mt-3">
              <span>
                Score {item.score}
              </span>

              <span className="font-bold">
                {item.opportunity}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}