import { listLeads } from "@/lib/services/leads-service";

export const dynamic = "force-dynamic";

export default async function AdminLeads() {

  let leads: Awaited<ReturnType<typeof listLeads>> = [];

  let erro: string | null = null;

  try {
    leads = await listLeads();
  } catch (error) {
    erro = error instanceof Error ? error.message : "Erro ao carregar leads.";
  }

  return (

    <div className="min-h-screen bg-slate-950 text-white p-10">

      <h1 className="text-4xl font-bold">
        📥 Leads Capturados
      </h1>

      <p className="text-zinc-400 mt-2 mb-10">
        Pessoas que pediram a análise completa. Entre em contato pelo WhatsApp.
      </p>

      {erro && (

        <div className="bg-red-950 border border-red-700 rounded-xl p-6 text-red-300">
          {erro}
        </div>

      )}

      {!erro && leads.length === 0 && (

        <div className="bg-zinc-900 rounded-xl p-10 text-center text-zinc-400">

          Nenhum lead ainda. Quando alguém pedir a análise completa, aparece aqui.

        </div>

      )}

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

        {leads.map((lead) => (

          <div key={lead.id} className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">

            <h2 className="text-xl font-bold">
              {lead.name}
            </h2>

            <a
              href={`https://wa.me/55${lead.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-3 bg-green-500 hover:bg-green-400 text-black font-bold px-4 py-2 rounded-lg"
            >
              💬 Chamar no WhatsApp
            </a>

            <div className="mt-5 space-y-2 text-sm text-zinc-400">

              <p>
                Empresa: <span className="text-white">{lead.company}</span>
              </p>

              {lead.city && (
                <p>
                  Cidade: <span className="text-white">{lead.city}</span>
                </p>
              )}

              {lead.category && (
                <p>
                  Categoria: <span className="text-white">{lead.category}</span>
                </p>
              )}

              {lead.score !== null && lead.score !== undefined && (
                <p>
                  Score: <span className="text-white">{lead.score}</span>
                  {lead.priority ? ` (${lead.priority})` : ""}
                </p>
              )}

            </div>

            <p className="text-zinc-600 text-xs mt-4">
              {lead.created_at
                ? new Date(lead.created_at).toLocaleString("pt-BR")
                : ""}
            </p>

          </div>

        ))}

      </div>

    </div>

  );

}
