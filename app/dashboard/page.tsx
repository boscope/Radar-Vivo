"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";
import Link from "next/link";

interface DashboardData {
  profile: {
    plan: string;
    subscription_status: string;
    subscription_current_period_end: string | null;
  } | null;
  stats: {
    totalLeads: number;
    activeLeads: number;
    capturedCompanies: number;
    avgScore: number;
  };
  leads: Array<{
    id: string;
    company_name: string;
    status: string;
    score: number | null;
    created_at: string;
  }>;
  companies: Array<{
    id: string;
    name: string;
    city: string;
    category: string;
    radar_score: number | null;
    status: string;
    captured_at: string | null;
  }>;
}

const statusColors: Record<string, string> = {
  Novo: "bg-blue-500/20 text-blue-400",
  Contato: "bg-yellow-500/20 text-yellow-400",
  Proposta: "bg-purple-500/20 text-purple-400",
  Fechado: "bg-green-500/20 text-green-400",
  Perdido: "bg-red-500/20 text-red-400",
};

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [passwordMsg, setPasswordMsg] = useState("");
  const router = useRouter();

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    loadDashboard();
    const params = new URLSearchParams(window.location.search);
    if (params.get("upgraded") === "true") {
      setShowUpgrade(true);
      setTimeout(() => setShowUpgrade(false), 5000);
    }
  }, []);

  async function loadDashboard() {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      router.push("/auth/login");
      return;
    }

    try {
      const res = await fetch("/api/dashboard", {
        headers: { Authorization: `Bearer ${session.access_token}` },
      });
      const dashboardData = await res.json();
      setData(dashboardData);
    } catch {
      console.error("Erro ao carregar dashboard");
    } finally {
      setLoading(false);
    }
  }

  async function handleManagePlan() {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;

    const res = await fetch("/api/stripe/portal", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: session.user.id }),
    });
    const { url } = await res.json();
    if (url) window.location.href = url;
  }

  async function handleChangePassword() {
    if (newPassword.length < 6) {
      setPasswordMsg("A senha precisa ter pelo menos 6 caracteres.");
      return;
    }
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) {
      setPasswordMsg("Erro ao trocar senha: " + error.message);
    } else {
      setPasswordMsg("Senha alterada com sucesso!");
      setNewPassword("");
      setTimeout(() => { setShowPassword(false); setPasswordMsg(""); }, 2000);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-green-400 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-neutral-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-xl font-bold">
            <span className="text-green-400">Radar</span>
            <span className="text-white">Vivo</span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm text-neutral-400">
              Plano:{" "}
              <span className="text-white font-semibold uppercase">
                {data.profile?.plan ?? "free"}
              </span>
            </span>
            {data.profile?.subscription_status === "active" && (
              <button
                onClick={handleManagePlan}
                className="text-sm text-neutral-400 hover:text-white transition"
              >
                Gerenciar assinatura
              </button>
            )}
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="text-sm text-neutral-400 hover:text-white transition"
            >
              Trocar senha
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Upgrade banner */}
        {showUpgrade && (
          <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 mb-6 text-green-400">
            Assinatura ativada com sucesso!
          </div>
        )}

        {/* Password change */}
        {showPassword && (
          <div className="bg-neutral-900 border border-neutral-700 rounded-xl p-6 mb-6">
            <h3 className="text-lg font-bold mb-4">Trocar senha</h3>
            <div className="flex gap-3">
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Nova senha (mínimo 6 caracteres)"
                className="flex-1 bg-neutral-800 border border-neutral-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-400"
              />
              <button
                onClick={handleChangePassword}
                className="bg-green-500 hover:bg-green-400 text-black font-bold px-6 py-3 rounded-lg transition"
              >
                Salvar
              </button>
            </div>
            {passwordMsg && (
              <p className={`mt-3 text-sm ${passwordMsg.includes("sucesso") ? "text-green-400" : "text-red-400"}`}>
                {passwordMsg}
              </p>
            )}
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard label="Leads ativos" value={data.stats.activeLeads} icon="📋" />
          <StatCard label="Total de leads" value={data.stats.totalLeads} icon="📊" />
          <StatCard label="Empresas capturadas" value={data.stats.capturedCompanies} icon="🏢" />
          <StatCard label="Score médio" value={data.stats.avgScore} icon="🎯" />
        </div>

        {/* Leads recentes */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Leads Recentes</h2>
            <Link
              href="/busca"
              className="text-sm text-green-400 hover:underline"
            >
              + Nova análise
            </Link>
          </div>
          {data.leads.length === 0 ? (
            <div className="border border-neutral-800 rounded-xl p-8 text-center text-neutral-400">
              Nenhum lead ainda.{" "}
              <Link href="/busca" className="text-green-400 hover:underline">
                Comece analisando uma empresa
              </Link>
            </div>
          ) : (
            <div className="border border-neutral-800 rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-neutral-800 text-neutral-400">
                    <th className="text-left px-4 py-3">Empresa</th>
                    <th className="text-left px-4 py-3">Status</th>
                    <th className="text-left px-4 py-3">Score</th>
                    <th className="text-left px-4 py-3">Data</th>
                  </tr>
                </thead>
                <tbody>
                  {data.leads.map((lead) => (
                    <tr
                      key={lead.id}
                      className="border-b border-neutral-800/50 hover:bg-neutral-900/50 transition"
                    >
                      <td className="px-4 py-3 font-medium">{lead.company_name}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`text-xs font-medium px-2 py-1 rounded-full ${
                            statusColors[lead.status] ?? "bg-neutral-500/20 text-neutral-400"
                          }`}
                        >
                          {lead.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">{lead.score ?? "—"}</td>
                      <td className="px-4 py-3 text-neutral-400">
                        {new Date(lead.created_at).toLocaleDateString("pt-BR")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* Empresas capturadas */}
        <section>
          <h2 className="text-xl font-bold mb-4">Empresas Capturadas</h2>
          {data.companies.length === 0 ? (
            <div className="border border-neutral-800 rounded-xl p-8 text-center text-neutral-400">
              Nenhuma empresa capturada ainda.
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.companies.map((company) => (
                <div
                  key={company.id}
                  className="border border-neutral-800 rounded-xl p-4 hover:border-neutral-600 transition"
                >
                  <h3 className="font-semibold">{company.name}</h3>
                  <p className="text-sm text-neutral-400 mt-1">
                    {company.city} · {company.category}
                  </p>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-sm">
                      Score:{" "}
                      <span className="font-bold text-green-400">
                        {company.radar_score ?? "—"}
                      </span>
                    </span>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        company.status === "capturada"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-neutral-500/20 text-neutral-400"
                      }`}
                    >
                      {company.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

function StatCard({ label, value, icon }: { label: string; value: number; icon: string }) {
  return (
    <div className="border border-neutral-800 rounded-xl p-4">
      <div className="text-2xl mb-1">{icon}</div>
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-sm text-neutral-400">{label}</div>
    </div>
  );
}
