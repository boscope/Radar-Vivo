"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";
import AdminSidebar from "@/components/admin/AdminSidebar";

interface User {
  id: string;
  email: string;
  full_name: string | null;
  plan: string;
  subscription_status: string;
  subscription_current_period_end: string | null;
  role: string;
  created_at: string;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterPlan, setFilterPlan] = useState("");
  const [actionMsg, setActionMsg] = useState("");
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => { loadUsers(); }, [search, filterStatus, filterPlan]);

  async function loadUsers() {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) { router.push("/auth/login"); return; }

    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (filterStatus) params.set("status", filterStatus);
    if (filterPlan) params.set("plan", filterPlan);

    const res = await fetch(`/api/admin/users?${params}`, {
      headers: { Authorization: `Bearer ${session.access_token}` },
    });
    const data = await res.json();
    setUsers(data.users ?? []);
    setLoading(false);
  }

  async function updateRole(userId: string, role: string) {
    const { data: { session } } = await supabase.auth.getSession();
    await fetch("/api/admin/users", {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${session?.access_token}` },
      body: JSON.stringify({ userId, role }),
    });
    setActionMsg("Role atualizado!");
    setTimeout(() => setActionMsg(""), 3000);
    loadUsers();
  }

  async function updatePlan(userId: string, plan: string) {
    const { data: { session } } = await supabase.auth.getSession();
    await fetch("/api/admin/users", {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${session?.access_token}` },
      body: JSON.stringify({ userId, plan }),
    });
    setActionMsg("Plano atualizado!");
    setTimeout(() => setActionMsg(""), 3000);
    loadUsers();
  }

  async function updateStatus(userId: string, status: string) {
    const { data: { session } } = await supabase.auth.getSession();
    await fetch("/api/admin/users", {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${session?.access_token}` },
      body: JSON.stringify({ userId, subscription_status: status }),
    });
    setActionMsg(status === "active" ? "Conta ativada!" : "Conta pausada!");
    setTimeout(() => setActionMsg(""), 3000);
    loadUsers();
  }

  async function deleteUser(userId: string) {
    const { data: { session } } = await supabase.auth.getSession();
    const res = await fetch(`/api/admin/users?userId=${userId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${session?.access_token}` },
    });
    const data = await res.json();
    if (data.error) {
      setActionMsg("Erro: " + data.error);
    } else {
      setActionMsg("Usuário excluído!");
      setConfirmDelete(null);
    }
    setTimeout(() => setActionMsg(""), 3000);
    loadUsers();
  }

  const isDelinquent = (u: User) =>
    u.subscription_status === "past_due" || u.subscription_status === "canceled";

  const daysUntilExpiry = (date: string | null) => {
    if (!date) return null;
    const diff = Math.ceil((new Date(date).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    return diff;
  };

  return (
    <main className="min-h-screen bg-black flex">
      <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 p-4 lg:p-8 overflow-auto">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-6 lg:hidden">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg border border-neutral-800 bg-neutral-900 text-white"
              aria-label="Abrir menu"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
            <h1 className="text-2xl font-bold text-white">Usuários</h1>
          </div>

          <div className="hidden lg:flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white">Usuários</h1>
              <p className="text-neutral-400 mt-1">{users.length} usuários encontrados</p>
            </div>
            {actionMsg && (
              <div className="bg-green-500/10 border border-green-500/30 text-green-400 text-sm px-4 py-2 rounded-lg">
                {actionMsg}
              </div>
            )}
          </div>

          {actionMsg && (
            <div className="lg:hidden mb-4 bg-green-500/10 border border-green-500/30 text-green-400 text-sm px-4 py-2 rounded-lg">
              {actionMsg}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por email ou nome..."
              className="bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-400"
            />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-400"
            >
              <option value="">Todos os status</option>
              <option value="active">Ativo</option>
              <option value="inactive">Inativo</option>
              <option value="past_due">Inadimplente</option>
              <option value="canceled">Cancelado</option>
            </select>
            <select
              value={filterPlan}
              onChange={(e) => setFilterPlan(e.target.value)}
              className="bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-400"
            >
              <option value="">Todos os planos</option>
              <option value="free">Teste Grátis</option>
              <option value="pro">Pro</option>
              <option value="agency">Agência</option>
            </select>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin w-8 h-8 border-2 border-green-400 border-t-transparent rounded-full" />
            </div>
          ) : users.length === 0 ? (
            <div className="border border-neutral-800 rounded-2xl p-12 text-center text-neutral-400">
              Nenhum usuário encontrado.
            </div>
          ) : (
            <>
              <div className="lg:hidden space-y-4">
                {users.map((u) => {
                  const expiry = daysUntilExpiry(u.subscription_current_period_end);
                  return (
                    <div key={u.id} className={`bg-neutral-900 border border-neutral-800 rounded-xl p-4 ${isDelinquent(u) ? "bg-red-500/5" : ""}`}>
                      <div className="mb-4">
                        <div className="text-white font-bold">{u.full_name || "Sem nome"}</div>
                        <div className="text-xs text-neutral-500 break-all">{u.email}</div>
                      </div>
                      <div className="grid grid-cols-2 gap-3 mb-3">
                        <div>
                          <label className="block text-xs text-neutral-500 mb-1">Plano</label>
                          <select
                            value={u.plan}
                            onChange={(e) => updatePlan(u.id, e.target.value)}
                            className={`w-full text-xs font-semibold px-2 py-2 rounded-lg bg-neutral-800 border border-neutral-700 focus:outline-none focus:border-green-400 ${
                              u.plan === "pro" ? "text-green-400" :
                              u.plan === "agency" ? "text-amber-400" : "text-white"
                            }`}
                          >
                            <option value="free">Free</option>
                            <option value="pro">Pro</option>
                            <option value="agency">Agência</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs text-neutral-500 mb-1">Status</label>
                          <select
                            value={u.subscription_status}
                            onChange={(e) => updateStatus(u.id, e.target.value)}
                            className={`w-full text-xs px-2 py-2 rounded-lg bg-neutral-800 border border-neutral-700 focus:outline-none focus:border-green-400 ${
                              u.subscription_status === "active" ? "text-green-400" :
                              u.subscription_status === "past_due" || u.subscription_status === "canceled" ? "text-red-400" : "text-white"
                            }`}
                          >
                            <option value="active">Ativo</option>
                            <option value="inactive">Inativo</option>
                            <option value="past_due">Inadimplente</option>
                            <option value="canceled">Cancelado</option>
                          </select>
                          {u.subscription_status === "active" && expiry !== null && expiry <= 7 && expiry > 0 && (
                            <div className="text-xs text-amber-400 mt-1">Expira em {expiry}d</div>
                          )}
                          {isDelinquent(u) && (
                            <div className="text-xs text-red-400 mt-1">⚠️ Inadimplente</div>
                          )}
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3 items-end mb-4">
                        <div>
                          <label className="block text-xs text-neutral-500 mb-1">Role</label>
                          <select
                            value={u.role || "user"}
                            onChange={(e) => updateRole(u.id, e.target.value)}
                            className="w-full text-xs px-2 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white focus:outline-none focus:border-green-400"
                          >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs text-neutral-500 mb-1">Cadastro</label>
                          <div className="text-xs text-neutral-400 px-2 py-2">
                            {new Date(u.created_at).toLocaleDateString("pt-BR")}
                          </div>
                        </div>
                      </div>
                      {confirmDelete === u.id ? (
                        <div className="flex items-center gap-2 pt-3 border-t border-neutral-800">
                          <span className="text-xs text-red-400">Excluir?</span>
                          <button onClick={() => deleteUser(u.id)} className="text-xs bg-red-500 text-white px-3 py-1.5 rounded-lg hover:bg-red-400">Sim</button>
                          <button onClick={() => setConfirmDelete(null)} className="text-xs bg-neutral-700 text-white px-3 py-1.5 rounded-lg hover:bg-neutral-600">Não</button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setConfirmDelete(u.id)}
                          className="w-full text-xs text-red-400 border border-red-500/30 hover:bg-red-500/10 px-3 py-2 rounded-lg transition"
                        >
                          Excluir
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="hidden lg:block">
                <div className="border border-neutral-800 rounded-2xl overflow-hidden">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-neutral-800 text-neutral-400 bg-neutral-900/50">
                        <th className="text-left px-4 py-3 font-medium">Usuário</th>
                        <th className="text-left px-4 py-3 font-medium">Plano</th>
                        <th className="text-left px-4 py-3 font-medium">Status</th>
                        <th className="text-left px-4 py-3 font-medium">Role</th>
                        <th className="text-left px-4 py-3 font-medium">Cadastro</th>
                        <th className="text-left px-4 py-3 font-medium">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((u) => {
                        const expiry = daysUntilExpiry(u.subscription_current_period_end);
                        return (
                          <tr key={u.id} className={`border-b border-neutral-800/50 hover:bg-neutral-800/30 transition ${isDelinquent(u) ? "bg-red-500/5" : ""}`}>
                            <td className="px-4 py-3">
                              <div className="text-white font-medium">{u.full_name || "Sem nome"}</div>
                              <div className="text-neutral-500 text-xs">{u.email}</div>
                            </td>
                            <td className="px-4 py-3">
                              <select
                                value={u.plan}
                                onChange={(e) => updatePlan(u.id, e.target.value)}
                                className={`text-xs font-semibold px-2 py-1 rounded-lg bg-neutral-800 border border-neutral-700 text-white focus:outline-none focus:border-green-400 ${
                                  u.plan === "pro" ? "text-green-400" :
                                  u.plan === "agency" ? "text-amber-400" : ""
                                }`}
                              >
                                <option value="free">Free</option>
                                <option value="pro">Pro</option>
                                <option value="agency">Agência</option>
                              </select>
                            </td>
                            <td className="px-4 py-3">
                              <select
                                value={u.subscription_status}
                                onChange={(e) => updateStatus(u.id, e.target.value)}
                                className={`text-xs px-2 py-1 rounded-lg bg-neutral-800 border border-neutral-700 text-white focus:outline-none focus:border-green-400 ${
                                  u.subscription_status === "active" ? "text-green-400" :
                                  u.subscription_status === "past_due" ? "text-red-400" :
                                  u.subscription_status === "canceled" ? "text-red-400" : ""
                                }`}
                              >
                                <option value="active">Ativo</option>
                                <option value="inactive">Inativo</option>
                                <option value="past_due">Inadimplente</option>
                                <option value="canceled">Cancelado</option>
                              </select>
                              {u.subscription_status === "active" && expiry !== null && expiry <= 7 && expiry > 0 && (
                                <div className="text-xs text-amber-400 mt-1">Expira em {expiry}d</div>
                              )}
                              {isDelinquent(u) && (
                                <div className="text-xs text-red-400 mt-1">⚠️ Inadimplente</div>
                              )}
                            </td>
                            <td className="px-4 py-3">
                              <select
                                value={u.role || "user"}
                                onChange={(e) => updateRole(u.id, e.target.value)}
                                className="text-xs px-2 py-1 rounded-lg bg-neutral-800 border border-neutral-700 text-white focus:outline-none focus:border-green-400"
                              >
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                              </select>
                            </td>
                            <td className="px-4 py-3 text-neutral-500 text-xs">
                              {new Date(u.created_at).toLocaleDateString("pt-BR")}
                            </td>
                            <td className="px-4 py-3">
                              {confirmDelete === u.id ? (
                                <div className="flex items-center gap-2">
                                  <span className="text-xs text-red-400">Excluir?</span>
                                  <button onClick={() => deleteUser(u.id)} className="text-xs bg-red-500 text-white px-2 py-1 rounded hover:bg-red-400">Sim</button>
                                  <button onClick={() => setConfirmDelete(null)} className="text-xs bg-neutral-700 text-white px-2 py-1 rounded hover:bg-neutral-600">Não</button>
                                </div>
                              ) : (
                                <button onClick={() => setConfirmDelete(u.id)} className="text-xs text-red-400 hover:text-red-300 transition">
                                  Excluir
                                </button>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
