import type { Company } from "@/types/company";
import DashboardMission from "./DashboardMission";

type Props = {
  companies: Company[];
};

export default function DashboardStats({
  companies,
}: Props) {

  const potencial = companies.reduce(
    (acc, empresa) => acc + Number(empresa.estimated_value),
    0
  );

  const radarQuente = companies.filter(
    (empresa) => empresa.rv_index >= 90
  ).length;

  return (
    <div className="grid md:grid-cols-4 gap-6 mb-10">

      <div className="bg-zinc-900 rounded-xl p-6">

        <p className="text-zinc-400">
          Empresas
        </p>

        <h2 className="text-5xl font-bold mt-4">
          {companies.length}
        </h2>

      </div>

      <div className="bg-zinc-900 rounded-xl p-6">

        <p className="text-zinc-400">
          Potencial Financeiro
        </p>

        <h2 className="text-3xl font-bold text-green-400 mt-4">

          {potencial.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}

        </h2>

      </div>

      <div className="bg-zinc-900 rounded-xl p-6">

        <p className="text-zinc-400">
          Radar Quente
        </p>

        <h2 className="text-5xl font-bold text-orange-400 mt-4">
          {radarQuente}
        </h2>

      </div>

      <DashboardMission />

    </div>
  );
}