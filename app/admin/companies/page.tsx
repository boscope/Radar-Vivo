"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";
import AdminSidebar from "@/components/admin/AdminSidebar";

interface Company {
  id: string;
  name: string;
  city: string;
  category: string;
  radar_score: number | null;
  status: string;
  captured_at: string;
  owner_id: string;
}

export default function AdminCompaniesPage() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [msg, setMsg] = useState("");
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => { load(); }, [search]);

  async function load() {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) { router.push("/auth/login"); return; }

    const params = new URLSearchParams();
    if (search) params.set("search", search);

    const res = await fetch(`/api/admin/companies?${params}`, {
      headers: { Authorization: `Bearer ${session.access_token}` },
    });
    const data = await res.json();
    setCompanies(data.companies ?? []);
    setLoading(false);
  }

  async function deleteCompany(id: string) {
    const { data: { session } } = await supabase.auth.getSession();
    const res = await fetch(`/api/admin/companies?id=${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${session?.access_token}` },
    });
    const data = await res.json();
    if (data.error) {
      setMsg("Erro: " + data.error);
    } else {
      setMsg("Empresa excluída!");
      setConfirmDelete(null);
      load();
    }
    setTimeout(() => setMsg(""), 3000);
  }

  const scoreColor = (score: number | null) => {
    if (score == null) return "text-neutral-500";
    if (score >= 70) return "text-green-400";
    if (score >= 40) return "text-yellow-400";
    return "text-red-400";
  };

  return (
    <main className="min-h-screen bg-black flex">
      <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 p-4 lg:p-8 overflow-auto">
        <div className="max-w-7xl mx-auto">
          <div className="lg:hidden flex items-center gap-3 mb-6">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-lg border border-neutral-800 bg-neutral-900 text-white"
              aria-label="Abrir menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
            <h1 className="text-2xl font-bold text-white">Empresas</h1>
          </div>

          <div className="hidden lg:flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white">Empresas</h1>
              <p className="text-neutral-400 mt-1">{companies.length} empresas cadastradas</p>
            </div>
          </div>

          {msg && (
            <div className="bg-green-500/10 border border-green-500/30 text-green-400 text-sm px-4 py-2 rounded-lg mb-4">
              {msg}
            </div>
          )}

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar empresa, cidade ou categoria..."
            className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-400 mb-6"
          />

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin w-8 h-8 border-2 border-green-400 border-t-transparent rounded-full" />
            </div>
          ) : companies.length === 0 ? (
            <div className="border border-neutral-800 rounded-2xl p-12 text-center text-neutral-400">
              Nenhuma empresa encontrada.
            </div>
          ) : (
            <>
              <div className="hidden lg:block border border-neutral-800 rounded-2xl overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-neutral-800 text-neutral-400 bg-neutral-900/50">
                      <th className="text-left px-4 py-3 font-medium">Empresa</th>
                      <th className="text-left px-4 py-3 font-medium">Cidade</th>
                      <th className="text-left px-4 py-3 font-medium">Categoria</th>
                      <th className="text-left px-4 py-3 font-medium">Score</th>
                      <th className="text-left px-4 py-3 font-medium">Status</th>
                      <th className="text-left px-4 py-3 font-medium">Data</th>
                      <th className="text-left px-4 py-3 font-medium">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {companies.map((c) => (
                      <tr key={c.id} className="border-b border-neutral-800/50 hover:bg-neutral-800/30 transition">
                        <td className="px-4 py-3 font-bold text-white">{c.name}</td>
                        <td className="px-4 py-3 text-neutral-400">{c.city}</td>
                        <td className="px-4 py-3 text-neutral-400">{c.category}</td>
                        <td className={`px-4 py-3 font-bold ${scoreColor(c.radar_score)}`}>
                          {c.radar_score ?? "—"}
                        </td>
                        <td className="px-4 py-3">
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            c.status === "capturada" ? "bg-green-500/20 text-green-400" : "bg-neutral-700 text-neutral-400"
                          }`}>
                            {c.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-neutral-500 text-xs">
                          {new Date(c.captured_at).toLocaleDateString("pt-BR")}
                        </td>
                        <td className="px-4 py-3">
                          {confirmDelete === c.id ? (
                            <div className="flex items-center gap-2">
                              <button onClick={() => deleteCompany(c.id)} className="text-xs bg-red-500 text-white px-2 py-1 rounded hover:bg-red-400">Sim</button>
                              <button onClick={() => setConfirmDelete(null)} className="text-xs bg-neutral-700 text-white px-2 py-1 rounded hover:bg-neutral-600">Não</button>
                            </div>
                          ) : (
                            <button onClick={() => setConfirmDelete(c.id)} className="text-xs text-red-400 hover:text-red-300">
                              Excluir
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="lg:hidden space-y-4">
                {companies.map((c) => (
                  <div key={c.id} className="bg-neutral-900 border border-neutral-800 rounded-xl p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="font-bold text-white truncate">{c.name}</p>
                        <p className="text-sm text-neutral-400 mt-1">{c.city} · {c.category}</p>
                      </div>
                      <span className={`text-sm font-bold shrink-0 ${scoreColor(c.radar_score)}`}>
                        {c.radar_score ?? "—"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-2">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          c.status === "capturada" ? "bg-green-500/20 text-green-400" : "bg-neutral-700 text-neutral-400"
                        }`}>
                          {c.status}
                        </span>
                        <span className="text-xs text-neutral-500">
                          {new Date(c.captured_at).toLocaleDateString("pt-BR")}
                        </span>
                      </div>
                      {confirmDelete === c.id ? (
                        <div className="flex items-center gap-2">
                          <button onClick={() => deleteCompany(c.id)} className="text-xs bg-red-500 text-white px-3 py-1.5 rounded hover:bg-red-400">Sim</button>
                          <button onClick={() => setConfirmDelete(null)} className="text-xs bg-neutral-700 text-white px-3 py-1.5 rounded hover:bg-neutral-600">Não</button>
                        </div>
                      ) : (
                        <button onClick={() => setConfirmDelete(c.id)} className="text-xs text-red-400 hover:text-red-300">
                          Excluir
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
