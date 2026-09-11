"use client";

type Props = {
  hasWebsite: boolean;
  hasSeo: boolean;
  hasGoogle: boolean;
  hasGoogleAds?: boolean;
  hasMetaAds?: boolean;
  hasAutomation?: boolean;
  automationTool?: string;
};

export default function PresencaDigitalChecklist({
  hasWebsite,
  hasSeo,
  hasGoogle,
  hasGoogleAds,
  hasMetaAds,
  hasAutomation,
  automationTool,
}: Props) {

  const itens = [
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
      nome: "Presença no Google",
      presente: hasGoogle,
      explicacao: "Ficha da empresa, avaliações e horários",
    },
  ];

  const indícios = [
    {
      nome: "Google Ads",
      presente: !!hasGoogleAds,
      explicacao: "Tag/pixel de Google Ads",
    },
    {
      nome: "Meta Ads (Instagram/Facebook)",
      presente: !!hasMetaAds,
      explicacao: "Tag/pixel da Meta",
    },
    {
      nome: "Automação comercial",
      presente: !!hasAutomation,
      explicacao: automationTool ? `Ferramenta identificada: ${automationTool}` : "Ferramenta de automação",
    },
  ];

  const presentes = itens.filter((item) => item.presente).length;
  const total = itens.length;

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

        {itens.map((item) => (

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

      <div className="mt-6 rounded-xl bg-neutral-800/60 border border-neutral-700 p-5">

        <p className="text-neutral-300 font-bold text-sm mb-1">
          Indícios de anúncios e automação
        </p>

        <div className="space-y-3">
          {indícios.map((item) => (
            <div key={item.nome} className="flex items-center justify-between gap-3 flex-wrap">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-neutral-200">
                  {item.nome}
                </p>
                <p className="text-xs text-neutral-500">
                  {item.explicacao}
                </p>
              </div>
              {item.presente ? (
                <span className="text-green-400 font-bold text-sm shrink-0">
                  ✅ Indício encontrado
                </span>
              ) : (
                <span className="text-neutral-400 font-bold text-sm shrink-0">
                  ◇ Não verificado
                </span>
              )}
            </div>
          ))}
        </div>

        <p className="text-xs text-neutral-500 mt-4 leading-relaxed">
          A ausência de tag de anúncio ou automação no site <strong>não significa</strong> que a
          empresa não anuncia ou não automatiza — esses rastreios costumam ficar em páginas de
          campanha, no Gerenciador de Tags (GTM) ou em plataformas externas.
        </p>

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