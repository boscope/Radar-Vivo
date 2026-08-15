"use client";

import { useState } from "react";
import {
  PIPELINE_STAGES,
  type Lead,
} from "@/lib/services/leads-service";
import {
  gerarScriptsDeAbordagem,
  linkWhatsAppComMensagem,
} from "@/lib/services/scripts-service";

type Props = {
  initialLeads: Lead[];
  initialError: string | null;
};

const CORES_STATUS: Record<string, string> = {
  "Novo": "bg-green-500 text-black",
  "Contato feito": "bg-yellow-500 text-black",
  "Reunião": "bg-orange-500 text-black",
  "Proposta enviada": "bg-blue-500 text-white",
  "Fechado": "bg-emerald-400 text-black",
  "Perdido": "bg-zinc-700 text-zinc-300",
};

export default function AdminLeadsClient({
  initialLeads,
  initialError,
}: Props) {

  const [leads, setLeads] = useState<Lead[]>(initialLeads);

  const [erro, setErro] = useState<string | null>(initialError);

  const [busca, setBusca] = useState("");

  const [filtroStatus, setFiltroStatus] = useState<string>("todos");

  const [scriptAberto, setScriptAberto] = useState<string | null>(null);

  const [excluindo, setExcluindo] = useState<string | null>(null);

  const leadsFiltrados = leads.filter((lead) => {

    if (filtroStatus !== "todos" && lead.status !== filtroStatus) {
      return false;
    }

    if (busca.trim()) {

      const termo = busca.toLowerCase();

      const combinar = [
        lead.name,
        lead.company,
        lead.city,
        lead.category,
      ]
        .join(" ")
        .toLowerCase();

      if (!combinar.includes(termo)) return false;

    }

    return true;

  });

  async function mudarStatus(id: string, status: string) {

    setErro(null);

    try {

      const response = await fetch(`/api/leads/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErro(data?.error ?? "Erro ao atualizar.");
        return;
      }

      setLeads((atual) =>
        atual.map((lead) =>
          lead.id === id ? { ...lead, status: status as any } : lead
        )
      );

    } catch {

      setErro("Erro de conexão.");

    }

  }

  async function excluir(id: string) {

    if (!confirm("Excluir este lead?")) return;

    setExcluindo(id);

    try {

      const response = await fetch(`/api/leads/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setLeads((atual) => atual.filter((lead) => lead.id !== id));
      } else {
        setErro("Não foi possível excluir.");
      }

    } catch {

      setErro("Erro de conexão.");

    } finally {

      setExcluindo(null);

    }

  }

  return (

    <div className="min-h-screen bg-slate-950 text-white">

      <div className="max-w-7xl mx-auto p-8">

        <div className="flex flex-wrap justify-between items-start gap-4">

          <div>

            <h1 className="text-4xl font-bold">
              📥 Pipeline de Oportunidades
            </h1>

            <p className="text-zinc-400 mt-2">
              {leads.length} leads capturados. Aborde pelo WhatsApp com o
              script pronto e acompanhe a venda até fechar.
            </p>

          </div>

          <a
            href="/api/leads/export"
            className="bg-slate-800 hover:bg-slate-700 transition px-6 py-3 rounded-lg font-bold text-sm"
          >
            ⬇️ Exportar CSV
          </a>

        </div>

        <div className="mt-8 flex flex-wrap gap-4">

          <input

            value={busca}

            onChange={(e) => setBusca(e.target.value)}

            placeholder="Buscar por empresa, nome ou cidade..."

            className="flex-1 min-w-64 p-4 rounded-lg bg-zinc-900 border border-zinc-800 outline-none focus:border-green-500"

          />

          <select

            value={filtroStatus}

            onChange={(e) => setFiltroStatus(e.target.value)}

            className="p-4 rounded-lg bg-zinc-900 border border-zinc-800 text-white outline-none"

          >

            <option value="todos">Todos os status</option>

            {PIPELINE_STAGES.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}

          </select>

        </div>

        {erro && (

          <div className="mt-6 bg-red-950 border border-red-700 rounded-xl p-5 text-red-300">
            {erro}
          </div>

        )}

        {!erro && leadsFiltrados.length === 0 && (

          <div className="mt-10 bg-zinc-900 rounded-xl p-12 text-center text-zinc-400">

            <p className="text-2xl mb-2">Nenhum lead encontrado</p>

            <p>
              Os leads aparecem aqui quando alguém pede a análise completa
              ou quando você salva oportunidades da busca em massa.
            </p>

          </div>

        )}

        <div className="mt-8 grid md:grid-cols-2 xl:grid-cols-3 gap-6">

          {leadsFiltrados.map((lead) => {

            const scripts = gerarScriptsDeAbordagem(lead);

            const linkWa =
              lead.whatsapp && lead.whatsapp !== "Sem contato"
                ? linkWhatsAppComMensagem(lead.whatsapp, scripts.mensagemWhatsApp)
                : null;

            const aberto = scriptAberto === lead.id;

            return (

              <div key={lead.id} className="bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden">

                <div className="p-6">

                  <div className="flex justify-between items-start gap-3">

                    <h2 className="text-xl font-bold leading-tight">
                      {lead.company}
                    </h2>

                    <span className={`text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap ${CORES_STATUS[lead.status ?? "Novo"] ?? "bg-zinc-700"}`}>
                      {lead.status ?? "Novo"}
                    </span>

                  </div>

                  <div className="mt-4 space-y-1.5 text-sm text-zinc-400">

                    {lead.name && (
                      <p>
                        👤 <span className="text-white">{lead.name}</span>
                      </p>
                    )}

                    {lead.city && (
                      <p>
                        📍 {lead.city}
                      </p>
                    )}

                    {lead.category && (
                      <p>
                        🏷️ {lead.category}
                      </p>
                    )}

                    {lead.score !== null && lead.score !== undefined && (
                      <p>
                        🎯 Score:{" "}
                        <span className="text-white font-bold">
                          {lead.score}
                        </span>
                        {lead.priority ? ` · ${lead.priority}` : ""}
                      </p>
                    )}

                  </div>

                </div>

                <div className="px-6 pb-6 space-y-3">

                  {linkWa && (
                    <a

                      href={linkWa}

                      target="_blank"

                      rel="noopener noreferrer"

                      className="block w-full text-center bg-green-500 hover:bg-green-400 transition text-black font-bold px-4 py-3 rounded-lg"

                    >
                      💬 Abordar no WhatsApp com script
                    </a>
                  )}

                  {!linkWa && lead.whatsapp && lead.whatsapp !== "Sem contato" && (
                    <p className="text-sm text-zinc-500">
                      📞 {lead.whatsapp}
                    </p>
                  )}

                  {!linkWa && (
                    <p className="text-sm text-zinc-600 bg-slate-950 rounded-lg p-3 border border-zinc-800">
                      ⚠️ Sem WhatsApp cadastrado. Use a busca para encontrar o
                      contato antes de abordar.
                    </p>
                  )}

                  <button

                    onClick={() =>
                      setScriptAberto(aberto ? null : (lead.id ?? null))
                    }

                    className="w-full bg-slate-800 hover:bg-slate-700 transition px-4 py-3 rounded-lg text-sm font-bold"

                  >
                    {aberto ? "Ocultar scripts" : "📝 Ver script de abordagem"}
                  </button>

                  {aberto && (

                    <div className="space-y-4 mt-2">

                      <div>

                        <h3 className="text-green-400 font-bold text-sm mb-2">
                          Mensagem WhatsApp
                        </h3>

                        <p className="text-zinc-300 text-sm whitespace-pre-line bg-slate-950 rounded-lg p-4 border border-zinc-800">
                          {scripts.mensagemWhatsApp}
                        </p>

                        <button

                          onClick={() => {
                            navigator.clipboard.writeText(scripts.mensagemWhatsApp);
                          }}

                          className="mt-2 text-xs text-slate-400 hover:text-white underline"

                        >
                          Copiar mensagem
                        </button>

                      </div>

                      <div>

                        <h3 className="text-green-400 font-bold text-sm mb-2">
                          Roteiro de ligação
                        </h3>

                        <p className="text-zinc-300 text-sm whitespace-pre-line bg-slate-950 rounded-lg p-4 border border-zinc-800">
                          {scripts.roteiroLigacao}
                        </p>

                      </div>

                      <div>

                        <h3 className="text-green-400 font-bold text-sm mb-2">
                          Quebrar objeções
                        </h3>

                        <div className="space-y-2">

                          {scripts.quebrarObjecao.map((item) => (

                            <details key={item.objeção} className="bg-slate-950 rounded-lg border border-zinc-800">

                              <summary className="cursor-pointer p-3 text-sm text-zinc-300">
                                " {item.objeção} "
                              </summary>

                              <p className="px-3 pb-3 text-sm text-zinc-400">
                                {item.resposta}
                              </p>

                            </details>

                          ))}

                        </div>

                      </div>

                    </div>

                  )}

                  <div className="flex gap-2">

                    {PIPELINE_STAGES.map((status) => (
                      <button

                        key={status}

                        onClick={() => lead.id && mudarStatus(lead.id, status)}

                        className={`flex-1 text-[11px] px-2 py-2 rounded-lg transition font-bold ${
                          lead.status === status
                            ? "bg-green-500 text-black"
                            : "bg-slate-800 hover:bg-slate-700"
                        }`}

                      >
                        {status}
                      </button>
                    ))}

                  </div>

                  <div className="flex justify-between items-center pt-2">

                    <p className="text-zinc-600 text-xs">
                      {lead.created_at
                        ? new Date(lead.created_at).toLocaleDateString("pt-BR")
                        : ""}
                    </p>

                    <button

                      onClick={() => lead.id && excluir(lead.id)}

                      disabled={excluindo === lead.id}

                      className="text-red-500 hover:text-red-400 text-xs font-bold disabled:opacity-50"

                    >
                      {excluindo === lead.id ? "..." : "Excluir"}
                    </button>

                  </div>

                </div>

              </div>

            );

          })}

        </div>

      </div>

    </div>

  );

}
