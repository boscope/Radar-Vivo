"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";
import AdminSidebar from "@/components/admin/AdminSidebar";

interface Lead {
  id: string;
  company_name: string;
  status: string;
  score: number | null;
  created_at: string;
  owner_id: string;
  owner_email?: string;
}

const statusColors: Record<string, string> = {
  Novo: "bg-blue-500/20 text-blue-400",
  Contato: "bg-yellow-500/20 text-yellow-400",
  Proposta: "bg-purple-500/20 text-purple-400",
  Fechado: "bg-green-500/20 text-green-400",
  Perdido: "bg-red-500/20 text-red-400",
};

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [msg, setMsg] = useState("");
  const router = useRouter();

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => { loadLeads(); }, [search, filterStatus]);

  async function loadLeads() {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) { router.push("/auth/login"); return; }

    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (filterStatus) params.set("status", filterStatus);

    const res = await fetch(`/api/admin/leads?${params}`, {
      headers: { Authorization: `Bearer ${session.access_token}` },
    });
    const data = await res.json();
    setLeads(data.leads ?? []);
    setLoading(false);
  }

  async function deleteLead(id: string) {
    const { data: { session } } = await supabase.auth.getSession();
    const res = await fetch("/api/admin/leads", {
      method: "DELETE",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${session?.access_token}` },
      body: JSON.stringify({ id }),
    });
    const data = await res.json();
    if (!data.error) {
      setMsg("Lead excluído!");
      setConfirmDelete(null);
      loadLeads();
    }
    setTimeout(() => setMsg(""), 3000);
  }

  async function updateStatus(id: string, status: string) {
    const { data: { session } } = await supabase.auth.getSession();
    const res = await fetch("/api/admin/leads", {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${session?.access_token}` },
      body: JSON.stringify({ id, status }),
    });
    const data = await res.json();
    if (!data.error) {
      setMsg("Status atualizado!");
      loadLeads();
    }
    setTimeout(() => setMsg(""), 3000);
  }

  return (
    <main className="min-h-screen bg-black flex">
      <AdminSidebar />
      <div className="flex-1 p-8 overflow-auto">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white">Leads</h1>
              <p className="text-neutral-400 mt-1">{leads.length} leads na plataforma</p>
            </div>
            {msg && (
              <div className="bg-green-500/10 border border-green-500/30 text-green-400 text-sm px-4 py-2 rounded-lg">
                {msg}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por empresa ou email do dono..."
              className="bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-400"
            />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-400"
            >
              <option value="">Todos os status</option>
              <option value="Novo">Novo</option>
              <option value="Contato">Contato</option>
              <option value="Proposta">Proposta</option>
              <option value="Fechado">Fechado</option>
              <option value="Perdido">Perdido</option>
            </select>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin w-8 h-8 border-2 border-green-400 border-t-transparent rounded-full" />
            </div>
          ) : leads.length === 0 ? (
            <div className="border border-neutral-800 rounded-2xl p-12 text-center text-neutral-400">
              Nenhum lead encontrado.
            </div>
          ) : (
            <div className="border border-neutral-800 rounded-2xl overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-neutral-800 text-neutral-400 bg-neutral-900/50">
                    <th className="text-left px-4 py-3 font-medium">Empresa</th>
                    <th className="text-left px-4 py-3 font-medium">Status</th>
                    <th className="text-left px-4 py-3 font-medium">Score</th>
                    <th className="text-left px-4 py-3 font-medium">Dono</th>
                    <th className="text-left px-4 py-3 font-medium">Data</th>
                    <th className="text-left px-4 py-3 font-medium">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((l: Lead) => (
                    <tr key={l.id} className="border-b border-neutral-800/50 hover:bg-neutral-800/30 transition">
                      <td className="px-4 py-3 font-bold text-white">{l.company_name}</td>
                      <td className="px-4 py-3">
                        <select
                          value={l.status}
                          onChange={(e) => updateStatus(l.id, e.target.value)}
                          className={`text-xs px-2 py-1 rounded-lg bg-neutral-800 border border-neutral-700 text-white focus:outline-none focus:border-green-400 ${statusColors[l.status] ?? ""}`}
                        >
                          <option value="Novo">Novo</option>
                          <option value="Contato">Contato</option>
                          <option value="Proposta">Proposta</option>
                          <option value="Fechado">Fechado</option>
                          <option value="Perdido">Perdido</option>
                        </select>
                      </td>
                      <td className="px-4 py-3 text-neutral-300">{l.score ?? "—"}</td>
                      <td className="px-4 py-3 text-neutral-500 text-xs">{l.owner_email}</td>
                      <td className="px-4 py-3 text-neutral-500 text-xs">
                        {new Date(l.created_at).toLocaleDateString("pt-BR")}
                      </td>
                      <td className="px-4 py-3">
                        {confirmDelete === l.id ? (
                          <div className="flex items-center gap-2">
                            <button onClick={() => deleteLead(l.id)} className="text-xs bg-red-500 text-white px-2 py-1 rounded hover:bg-red-400">Sim</button>
                            <button onClick={() => setConfirmDelete(null)} className="text-xs bg-neutral-700 text-white px-2 py-1 rounded hover:bg-neutral-600">Não</button>
                          </div>
                        ) : (
                          <button onClick={() => setConfirmDelete(l.id)} className="text-xs text-red-400 hover:text-red-300">
                            Excluir
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
