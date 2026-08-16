import { getCompanies } from "../../../src/core/services/company-service";

export default async function CompaniesLivePage() {

  const companies = await getCompanies();

  return (

    <main className="min-h-screen bg-neutral-100 p-10">

      <h1 className="text-5xl font-bold mb-10">

        Empresas (Supabase)

      </h1>

      <div className="bg-white rounded-2xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-neutral-800">

            <tr>

              <th className="text-left p-4">Empresa</th>
              <th className="text-left p-4">Segmento</th>
              <th className="text-left p-4">Cidade</th>
              <th className="text-left p-4">Score</th>
              <th className="text-left p-4">Prioridade</th>

            </tr>

          </thead>

          <tbody>

          {companies.length===0 ? (

            <tr>

              <td
                colSpan={5}
                className="text-center p-8 text-gray-500"
              >

                Nenhuma empresa cadastrada.

              </td>

            </tr>

          ) : (

            companies.map((c:any)=>(

              <tr
                key={c.id}
                className="border-t"
              >

                <td className="p-4">{c.name}</td>
                <td className="p-4">{c.segment ?? "-"}</td>
                <td className="p-4">{c.city ?? "-"}</td>
                <td className="p-4">{c.score}</td>
                <td className="p-4">{c.priority}</td>

              </tr>

            ))

          )}

          </tbody>

        </table>

      </div>

    </main>

  );

}
