type Props = {
  hasWebsite: boolean;
  hasSeo: boolean;
  hasWhatsapp: boolean;
  hasGoogle: boolean;
  hasGoogleAds?: boolean;
  hasMetaAds?: boolean;
  hasAutomation?: boolean;
  automationTool?: string;
};

export default function PresencaDigitalChecklist({
  hasWebsite,
  hasSeo,
  hasWhatsapp,
  hasGoogle,
  hasGoogleAds,
  hasMetaAds,
  hasAutomation,
  automationTool,
}: Props) {

  const items = [
    {
      nome: "Site próprio",
      presente: hasWebsite,
      explicacao: "Aparece no Google e passa credibilidade",
    },
    {
      nome: "SEO (aparece nas buscas)",
      presente: hasSeo,
      explicacao: "É encontrado por quem procura no Google",
    },
    {
      nome: "WhatsApp Business",
      presente: hasWhatsapp,
      explicacao: "Cliente chama e recebe resposta rápida",
    },
    {
      nome: "Presença no Google",
      presente: hasGoogle,
      explicacao: "Ficha da empresa, avaliações e horários",
    },
    {
      nome: "Google Ads (indício de anúncio)",
      presente: !!hasGoogleAds,
      explicacao: "Alguma tag/pixel de Google Ads encontrada no site",
    },
    {
      nome: "Meta Ads (indício de anúncio)",
      presente: !!hasMetaAds,
      explicacao: "Alguma tag/pixel da Meta encontrada no site",
    },
    {
      nome: "Automação comercial",
      presente: !!hasAutomation,
      explicacao: automationTool ? `Indício de ${automationTool} no site` : "Indício de ferramenta de automação no site",
    },
  ];

  const presentes = items.filter((item) => item.presente).length;
  const total = items.length;

  return (

    <div className="bg-zinc-900 rounded-xl p-8 border border-zinc-800">

      <div className="flex justify-between items-center mb-6">

        <h2 className="text-2xl font-bold">
          📋 Presença Digital
        </h2>

        <span className="text-4xl font-extrabold text-green-400">
          {presentes}/{total}
        </span>

      </div>

      <div className="space-y-4">

        {items.map((item) => (

          <div key={item.nome} className="flex items-center justify-between gap-3 flex-wrap bg-zinc-800/50 rounded-xl p-4">

            <div className="min-w-0">
              <p className="font-bold">
                {item.nome}
              </p>
              <p className="text-sm text-zinc-500">
                {item.explicacao}
              </p>
            </div>

            {item.presente ? (
              <span className="text-green-400 font-bold text-lg shrink-0">
                ✅ Tem
              </span>
            ) : (
              <span className="text-red-400 font-bold text-lg shrink-0">
                ❌ Falta
              </span>
            )}

          </div>

        ))}

      </div>

      <div className="mt-6 rounded-xl bg-red-950 border border-red-800 p-5">

        <p className="text-red-300 font-bold">
          {total - presentes} de {total} pontos em falta
        </p>

        <p className="text-red-400/80 text-sm mt-1">
          A cada item resolvido, o negócio aparece mais no Google
          e converte mais clientes.
        </p>

      </div>

    </div>

  );

}
