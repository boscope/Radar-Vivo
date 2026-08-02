import type { Company } from "@/types/company";
import CompanyRow from "./CompanyRow";

type Props = {
  companies: Company[];
  loading: boolean;
};

export default function CompaniesTable({
  companies,
  loading,
}: Props) {
  return (
    <div className="bg-zinc-900 rounded-xl overflow-hidden">

      <div className="p-6 border-b border-zinc-800">

        <h2 className="text-2xl font-bold">
          Empresas Encontradas
        </h2>

      </div>

      {loading ? (

        <div className="p-8">
          Carregando...
        </div>

      ) : (

        <table className="w-full">

          <thead className="bg-zinc-800">

            <tr>

              <th className="text-left p-4">
                Empresa
              </th>

              <th className="text-left p-4">
                Cidade
              </th>

              <th className="text-left p-4">
                Segmento
              </th>

              <th className="text-center p-4">
                Índice RV
              </th>

              <th className="text-center p-4">
                Potencial
              </th>

            </tr>

          </thead>

          <tbody>

            {companies.map((company) => (
              <CompanyRow
                key={company.id}
                company={company}
              />
            ))}

          </tbody>

        </table>

      )}

    </div>
  );
}