import { getCompanies } from "@/src/core/repositories/company-repository";

export default async function IntelligenceDashboard() {

  const companies = await getCompanies();

  return (

    <div className="grid md:grid-cols-4 gap-6">

      <div className="bg-white rounded-2xl shadow p-6">

        <p className="text-gray-500">Empresas</p>

        <h2 className="text-4xl font-bold">

          {companies.length}

        </h2>

      </div>

    </div>

  );

}
