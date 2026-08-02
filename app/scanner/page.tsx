import { searchCompanies } from "../../src/core/services/web-search";

export default async function ScannerPage() {

  const city = "Curitiba";
  const category = "Barbearia";

  const companies = await searchCompanies(city, category);

  return (
    <main className="min-h-screen bg-slate-100">

      <div className="max-w-7xl mx-auto p-8">

        <h1 className="text-4xl font-bold">
          Scanner Inteligente Radar Vivo
        </h1>

        <p className="text-gray-500 mt-2">
          Primeira versão do motor de busca
        </p>

        <div className="mt-10 grid gap-4">

          {companies.map((company, index) => (

            <div
              key={index}
              className="bg-white rounded-xl shadow p-6"
            >

              <div className="flex justify-between">

                <div>

                  <h2 className="font-bold text-xl">
                    {company.title}
                  </h2>

                  <p className="text-gray-500">
                    {company.city}
                  </p>

                  <p className="mt-2">
                    Categoria:
                    <strong> {company.category}</strong>
                  </p>

                </div>

                <div className="text-right">

                  <span className="px-3 py-1 rounded-full bg-green-100 text-green-700">

                    {company.source}

                  </span>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </main>
  );

}
