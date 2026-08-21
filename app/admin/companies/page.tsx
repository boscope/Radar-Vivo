"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";
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
  const router = useRouter();

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => { load(); }, [search]);

  async function load() {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) { router.push("/auth/login"); return; }

    const adminSupabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    let query = adminSupabase
      .from("companies")
      .select("id, name, city, category, radar_score, status, captured_at, owner_id")
      .order("captured_at", { ascending: false })
      .limit(200);

    if (search) {
      query = query.or(`name.ilike.%${search}%,city.ilike.%${search}%,category.ilike.%${search}%`);
    }

    const { data } = await query;
    setCompanies(data ?? []);
    setLoading(false);
  }

  async function deleteCompany(id: string) {
    const adminSupabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { error } = await adminSupabase.from("companies").delete().eq("id", id);
    if (error) {
      setMsg("Erro: " + error.message);
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
      <AdminSidebar />
      <div className="flex-1 p-8 overflow-auto">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white">Empresas</h1>
              <p className="text-neutral-400 mt-1">{companies.length} empresas cadastradas</p>
            </div>
            {msg && (
              <div className="bg-green-500/10 border border-green-500/30 text-green-400 text-sm px-4 py-2 rounded-lg">
                {msg}
              </div>
            )}
          </div>

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
            <div className="border border-neutral-800 rounded-2xl overflow-hidden">
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
          )}
        </div>
      </div>
    </main>
  );
}
