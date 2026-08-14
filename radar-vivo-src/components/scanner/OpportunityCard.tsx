type Props = {
  priority: string;
  service: string;
  probability: number;
  monthlyLoss: number;
};

export default function OpportunityCard({
  priority,
  service,
  probability,
  monthlyLoss,
}: Props) {
  return (
    <div className="bg-zinc-900 rounded-xl p-8 border border-zinc-800">

      <h2 className="text-3xl font-bold mb-8">
        💰 Oportunidade Comercial
      </h2>

      <div className="grid md:grid-cols-2 gap-6">

        <div>
          <p className="text-zinc-400">
            Prioridade
          </p>

          <p className="text-2xl font-bold text-orange-400">
            {priority}
          </p>
        </div>

        <div>
          <p className="text-zinc-400">
            Serviço Ideal
          </p>

          <p className="text-2xl font-bold text-green-400">
            {service}
          </p>
        </div>

        <div>
          <p className="text-zinc-400">
            Chance de Fechamento
          </p>

          <p className="text-2xl font-bold">
            {probability}%
          </p>
        </div>

        <div>
          <p className="text-zinc-400">
            Perda Mensal Estimada
          </p>

          <p className="text-2xl font-bold text-red-400">
            {monthlyLoss.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </p>
        </div>

      </div>

    </div>
  );
}