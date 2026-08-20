import AdminSidebar from "@/components/admin/AdminSidebar";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const [
    { count: totalUsers },
    { count: totalLeads },
    { count: totalCompanies },
    { data: profiles },
    { data: recentUsers },
    { data: recentLeads },
  ] = await Promise.all([
    supabase.from("profiles").select("*", { count: "exact", head: true }),
    supabase.from("leads").select("*", { count: "exact", head: true }),
    supabase.from("companies").select("*", { count: "exact", head: true }),
    supabase.from("profiles").select("plan, subscription_status, created_at"),
    supabase.from("profiles").select("full_name, email, plan, created_at, subscription_status").order("created_at", { ascending: false }).limit(8),
    supabase.from("leads").select("company_name, status, score, created_at").order("created_at", { ascending: false }).limit(8),
  ]);

  const planCounts = { free: 0, pro: 0, agency: 0 };
  const activeCounts = { free: 0, pro: 0, agency: 0 };
  (profiles ?? []).forEach((p: any) => {
    const plan = (p.plan || "free") as keyof typeof planCounts;
    if (plan in planCounts) planCounts[plan]++;
    else planCounts.free++;
    if (p.subscription_status === "active" && plan in activeCounts) activeCounts[plan]++;
  });

  const mrr = (activeCounts.pro * 197) + (activeCounts.agency * 397);

  const last30d = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  const last7d = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const newUsers30d = (profiles ?? []).filter((p: any) => new Date(p.created_at) > last30d).length;
  const newUsers7d = (profiles ?? []).filter((p: any) => new Date(p.created_at) > last7d).length;

  const monthlyData: { month: string; count: number }[] = [];
  for (let i = 5; i >= 0; i--) {
    const d = new Date();
    d.setMonth(d.getMonth() - i);
    const month = d.toLocaleDateString("pt-BR", { month: "short" });
    const year = d.getFullYear();
    const monthNum = d.getMonth();
    const count = (profiles ?? []).filter((p: any) => {
      const pd = new Date(p.created_at);
      return pd.getMonth() === monthNum && pd.getFullYear() === year;
    }).length;
    monthlyData.push({ month, count });
  }

  const maxMonth = Math.max(...monthlyData.map(m => m.count), 1);

  const statusColors: Record<string, string> = {
    Novo: "bg-blue-500/20 text-blue-400",
    Contato: "bg-yellow-500/20 text-yellow-400",
    Proposta: "bg-purple-500/20 text-purple-400",
    Fechado: "bg-green-500/20 text-green-400",
    Perdido: "bg-red-500/20 text-red-400",
  };

  return (
    <main className="min-h-screen bg-black flex">
      <AdminSidebar />

      <div className="flex-1 p-8 overflow-auto">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white">Dashboard</h1>
              <p className="text-neutral-400 mt-1">Visão geral da plataforma Radar Vivo</p>
            </div>
            <div className="text-right text-sm text-neutral-500">
              {new Date().toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
            </div>
          </div>

          {/* Revenue Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/20 rounded-2xl p-5">
              <div className="text-sm text-green-400/70 mb-1">MRR</div>
              <div className="text-3xl font-extrabold text-green-400">
                R$ {mrr.toLocaleString("pt-BR")}
              </div>
              <div className="text-xs text-neutral-500 mt-1">Receita recorrente mensal</div>
            </div>
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5">
              <div className="text-sm text-neutral-400 mb-1">Assinantes ativos</div>
              <div className="text-3xl font-extrabold text-white">
                {activeCounts.pro + activeCounts.agency}
              </div>
              <div className="text-xs text-neutral-500 mt-1">
                Pro: {activeCounts.pro} · Agência: {activeCounts.agency}
              </div>
            </div>
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5">
              <div className="text-sm text-neutral-400 mb-1">Novos (30 dias)</div>
              <div className="text-3xl font-extrabold text-white">{newUsers30d}</div>
              <div className="text-xs text-neutral-500 mt-1">{newUsers7d} na última semana</div>
            </div>
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5">
              <div className="text-sm text-neutral-400 mb-1">Conversão</div>
              <div className="text-3xl font-extrabold text-white">
                {totalUsers ? Math.round(((activeCounts.pro + activeCounts.agency) / totalUsers) * 100) : 0}%
              </div>
              <div className="text-xs text-neutral-500 mt-1">Free → Pago</div>
            </div>
          </div>

          {/* Plan Distribution + Growth */}
          <div className="grid lg:grid-cols-2 gap-6 mb-6">

            {/* Plan Distribution */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
              <h2 className="text-lg font-bold text-white mb-4">Distribuição por Plano</h2>
              <div className="space-y-4">
                {[
                  { label: "Teste Grátis", count: planCounts.free, active: activeCounts.free, color: "bg-neutral-500", textColor: "text-neutral-400" },
                  { label: "Pro", count: planCounts.pro, active: activeCounts.pro, color: "bg-green-500", textColor: "text-green-400" },
                  { label: "Agência", count: planCounts.agency, active: activeCounts.agency, color: "bg-amber-500", textColor: "text-amber-400" },
                ].map(({ label, count, active, color, textColor }) => (
                  <div key={label}>
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-sm font-medium ${textColor}`}>{label}</span>
                      <span className="text-sm text-neutral-400">
                        {count} total · {active} ativos
                      </span>
                    </div>
                    <div className="h-2 bg-neutral-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${color} rounded-full transition-all`}
                        style={{ width: `${totalUsers ? (count / totalUsers) * 100 : 0}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Growth Chart */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
              <h2 className="text-lg font-bold text-white mb-4">Crescimento (6 meses)</h2>
              <div className="flex items-end gap-3 h-40">
                {monthlyData.map(({ month, count }) => (
                  <div key={month} className="flex-1 flex flex-col items-center gap-2">
                    <span className="text-xs text-neutral-400">{count}</span>
                    <div className="w-full bg-green-500/20 rounded-t-lg relative" style={{ height: `${(count / maxMonth) * 100}%`, minHeight: count > 0 ? "8px" : "2px" }}>
                      <div className="absolute inset-0 bg-green-500 rounded-t-lg" style={{ height: "100%" }} />
                    </div>
                    <span className="text-xs text-neutral-500 capitalize">{month}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            <a href="/admin/users" className="bg-neutral-900 border border-neutral-800 hover:border-neutral-600 rounded-xl p-4 flex items-center gap-3 transition">
              <span className="text-xl">👥</span>
              <span className="text-sm text-neutral-300">Usuários</span>
            </a>
            <a href="/admin/leads" className="bg-neutral-900 border border-neutral-800 hover:border-neutral-600 rounded-xl p-4 flex items-center gap-3 transition">
              <span className="text-xl">📋</span>
              <span className="text-sm text-neutral-300">Leads</span>
            </a>
            <a href="/admin/companies" className="bg-neutral-900 border border-neutral-800 hover:border-neutral-600 rounded-xl p-4 flex items-center gap-3 transition">
              <span className="text-xl">🏢</span>
              <span className="text-sm text-neutral-300">Empresas</span>
            </a>
            <a href="/admin/plans" className="bg-neutral-900 border border-neutral-800 hover:border-neutral-600 rounded-xl p-4 flex items-center gap-3 transition">
              <span className="text-xl">💳</span>
              <span className="text-sm text-neutral-300">Planos</span>
            </a>
          </div>

          {/* Tables */}
          <div className="grid lg:grid-cols-2 gap-6">

            {/* Recent Users */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden">
              <div className="px-6 py-4 border-b border-neutral-800 flex items-center justify-between">
                <h2 className="text-lg font-bold text-white">Últimos Usuários</h2>
                <a href="/admin/users" className="text-sm text-green-400 hover:underline">Ver todos →</a>
              </div>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-neutral-800 text-neutral-400">
                    <th className="text-left px-6 py-3 font-medium">Usuário</th>
                    <th className="text-left px-6 py-3 font-medium">Plano</th>
                    <th className="text-left px-6 py-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {(recentUsers ?? []).map((u: any, i: number) => (
                    <tr key={i} className="border-b border-neutral-800/50 hover:bg-neutral-800/30 transition">
                      <td className="px-6 py-3">
                        <div className="text-white font-medium">{u.full_name || "Sem nome"}</div>
                        <div className="text-neutral-500 text-xs">{u.email}</div>
                      </td>
                      <td className="px-6 py-3">
                        <span className={`text-xs font-semibold uppercase px-2 py-1 rounded-full ${
                          u.plan === "pro" ? "bg-green-500/10 text-green-400" :
                          u.plan === "agency" ? "bg-amber-500/10 text-amber-400" :
                          "bg-neutral-700 text-neutral-400"
                        }`}>
                          {u.plan || "free"}
                        </span>
                      </td>
                      <td className="px-6 py-3">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          u.subscription_status === "active" ? "bg-green-500/20 text-green-400" : "bg-neutral-700 text-neutral-400"
                        }`}>
                          {u.subscription_status === "active" ? "Ativo" : "Inativo"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Recent Leads */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden">
              <div className="px-6 py-4 border-b border-neutral-800 flex items-center justify-between">
                <h2 className="text-lg font-bold text-white">Últimos Leads</h2>
                <a href="/admin/leads" className="text-sm text-green-400 hover:underline">Ver todos →</a>
              </div>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-neutral-800 text-neutral-400">
                    <th className="text-left px-6 py-3 font-medium">Empresa</th>
                    <th className="text-left px-6 py-3 font-medium">Status</th>
                    <th className="text-left px-6 py-3 font-medium">Score</th>
                    <th className="text-left px-6 py-3 font-medium">Data</th>
                  </tr>
                </thead>
                <tbody>
                  {(recentLeads ?? []).map((l: any, i: number) => (
                    <tr key={i} className="border-b border-neutral-800/50 hover:bg-neutral-800/30 transition">
                      <td className="px-6 py-3 text-white font-medium">{l.company_name}</td>
                      <td className="px-6 py-3">
                        <span className={`text-xs px-2 py-1 rounded-full ${statusColors[l.status] ?? "bg-neutral-700 text-neutral-400"}`}>
                          {l.status}
                        </span>
                      </td>
                      <td className="px-6 py-3 text-neutral-300">{l.score ?? "—"}</td>
                      <td className="px-6 py-3 text-neutral-500 text-xs">
                        {new Date(l.created_at).toLocaleDateString("pt-BR")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}
