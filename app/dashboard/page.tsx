"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";
import Link from "next/link";
import RadarLoader from "@/components/ui/RadarLoader";

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
    company: string;
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
  Novo: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  Contato: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  Proposta: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  Fechado: "bg-green-500/20 text-green-400 border-green-500/30",
  Perdido: "bg-red-500/20 text-red-400 border-red-500/30",
};

const statusIcons: Record<string, string> = {
  Novo: "🆕",
  Contato: "📞",
  Proposta: "📝",
  Fechado: "✅",
  Perdido: "❌",
};

const planNames: Record<string, string> = {
  free: "Teste Grátis",
  pro: "Pro",
  agency: "Agência",
};

const planColors: Record<string, string> = {
  free: "text-neutral-400 bg-neutral-800",
  pro: "text-green-400 bg-green-500/10 border border-green-500/30",
  agency: "text-amber-400 bg-amber-500/10 border border-amber-500/30",
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

  // Busca states
  const [buscaState, setBuscaState] = useState("PE");
  const [buscaCity, setBuscaCity] = useState("");
  const [buscaCategory, setBuscaCategory] = useState("");
  const [buscaLoading, setBuscaLoading] = useState(false);
  const [buscaResults, setBuscaResults] = useState<any[] | null>(null);
  const [buscaError, setBuscaError] = useState<string | null>(null);
  const [buscaSalvos, setBuscaSalvos] = useState<string[]>([]);
  const [buscaSalvando, setBuscaSalvando] = useState<string | null>(null);

  // Delete states
  const [deletando, setDeletando] = useState<string | null>(null);

  // Scanner states
  const [scannerInput, setScannerInput] = useState("");
  const [scannerLoading, setScannerLoading] = useState(false);

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

  async function handleBuscar() {
    if (!buscaCategory.trim()) {
      setBuscaError("Informe a categoria.");
      return;
    }
    setBuscaLoading(true);
    setBuscaError(null);
    setBuscaResults(null);

    try {
      const res = await fetch("/api/scanner/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ state: buscaState, city: buscaCity, category: buscaCategory }),
      });
      const data = await res.json();
      if (!res.ok) {
        setBuscaError(data?.error ?? "Erro ao buscar empresas.");
        return;
      }
      setBuscaResults(data.companies ?? []);
    } catch {
      setBuscaError("Erro de conexão. Tente novamente.");
    } finally {
      setBuscaLoading(false);
    }
  }

  function handleAnalisar() {
    if (!scannerInput.trim()) {
      alert("Digite o nome de uma empresa.");
      return;
    }
    setScannerLoading(true);
    window.open("/scanner/result/" + encodeURIComponent(scannerInput.trim()), "_blank", "noopener,noreferrer");
    setTimeout(() => setScannerLoading(false), 3000);
  }

  async function salvarNoPipeline(company: any) {
    setBuscaSalvando(company.name);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        alert("Faça login para salvar no pipeline.");
        return;
      }
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: company.phone ? `Contato · ${company.name}` : company.name,
          whatsapp: company.phone ? company.phone.replace(/\D/g, "") : "",
          company: company.name,
          city: company.city ?? null,
          state: company.state ?? null,
          category: company.category ?? null,
          score: company.opportunityScore ?? null,
          priority: company.priority ?? null,
          externalId: company.externalId ?? null,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        alert(data?.error ?? "Erro ao salvar.");
        return;
      }
      setBuscaSalvos((prev) => [...prev, company.name]);
      loadDashboard();
    } catch {
      alert("Erro de conexão.");
    } finally {
      setBuscaSalvando(null);
    }
  }

  async function excluirLead(leadId: string) {
    if (!confirm("Excluir este lead do pipeline?")) return;
    setDeletando(leadId);
    try {
      const res = await fetch("/api/leads/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ leadId }),
      });
      if (res.ok) {
        setData((prev) => prev ? {
          ...prev,
          leads: prev.leads.filter((l) => l.id !== leadId),
          stats: { ...prev.stats, totalLeads: prev.stats.totalLeads - 1, activeLeads: prev.stats.activeLeads - 1 },
        } : prev);
      }
    } catch {
      alert("Erro ao excluir.");
    } finally {
      setDeletando(null);
    }
  }

  async function excluirEmpresa(companyId: string) {
    if (!confirm("Excluir esta empresa do radar? Ela voltará a aparecer nas buscas.")) return;
    setDeletando(companyId);
    try {
      const res = await fetch("/api/companies/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ companyId }),
      });
      if (res.ok) {
        setData((prev) => prev ? {
          ...prev,
          companies: prev.companies.filter((c) => c.id !== companyId),
          stats: { ...prev.stats, capturedCompanies: prev.stats.capturedCompanies - 1 },
        } : prev);
      }
    } catch {
      alert("Erro ao excluir.");
    } finally {
      setDeletando(null);
    }
  }

  async function handleManagePlan() {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const res = await fetch("/api/stripe/portal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: session.user.id }),
      });

      const portalData = await res.json();

      if (!res.ok || !portalData.url) {
        alert(portalData?.error ?? "Erro ao abrir portal de assinatura. Tente novamente.");
        return;
      }

      window.location.href = portalData.url;
    } catch {
      alert("Erro de conexão ao abrir portal de assinatura.");
    }
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

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/");
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <RadarLoader text="Carregando painel..." />
      </div>
    );
  }

  if (!data) return null;

  const isTrial = data.profile?.subscription_status === "active" && data.profile?.plan === "free";
  const isActive = data.profile?.subscription_status === "active";
  const isInactive = !isActive && data.profile?.subscription_status !== "active";
  const plan = data.profile?.plan ?? "free";
  const periodEnd = data.profile?.subscription_current_period_end;

  const pipelineStatuses = ["Novo", "Contato", "Proposta", "Fechado"];
  const pipelineCounts = pipelineStatuses.map(status => ({
    status,
    count: data.leads.filter(l => l.status === status).length,
    color: statusColors[status],
  }));

  return (
    <div className="min-h-screen bg-black text-white">

      {/* Header */}
      <header className="border-b border-neutral-800/50 bg-black/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
              <span className="text-black font-bold text-sm">RV</span>
            </div>
            <span className="text-lg font-bold">
              <span className="text-green-400">Radar</span>
              <span className="text-white">Vivo</span>
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <span className={`text-xs font-semibold px-3 py-1.5 rounded-full ${planColors[plan]}`}>
              {planNames[plan] ?? plan}
            </span>

            {isActive && (
              <button
                onClick={handleManagePlan}
                className="text-sm text-neutral-400 hover:text-white transition px-3 py-1.5 rounded-lg hover:bg-neutral-800"
              >
                Assinatura
              </button>
            )}

            <button
              onClick={() => setShowPassword(!showPassword)}
              className="text-sm text-neutral-400 hover:text-white transition px-3 py-1.5 rounded-lg hover:bg-neutral-800"
            >
              Senha
            </button>

            <button
              onClick={handleLogout}
              className="text-sm text-red-400 hover:text-red-300 transition px-3 py-1.5 rounded-lg hover:bg-red-500/10"
            >
              Sair
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">

        {/* Upgrade Success */}
        {showUpgrade && (
          <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 mb-6 flex items-center gap-3">
            <span className="text-2xl">🎉</span>
            <div>
              <p className="text-green-400 font-bold">Assinatura ativada!</p>
              <p className="text-green-400/70 text-sm">Aproveite todos os recursos do plano.</p>
            </div>
          </div>
        )}

        {/* Password Modal */}
        {showPassword && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50" onClick={() => setShowPassword(false)}>
            <div className="bg-neutral-900 border border-neutral-700 rounded-2xl p-6 w-full max-w-md" onClick={e => e.stopPropagation()}>
              <h3 className="text-lg font-bold mb-4">Trocar senha</h3>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Nova senha (mínimo 6 caracteres)"
                className="w-full bg-neutral-800 border border-neutral-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-400 mb-4"
                autoFocus
              />
              <div className="flex gap-3">
                <button
                  onClick={() => setShowPassword(false)}
                  className="flex-1 border border-neutral-600 hover:bg-neutral-800 transition font-bold py-3 rounded-lg"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleChangePassword}
                  className="flex-1 bg-green-500 hover:bg-green-400 text-black font-bold py-3 rounded-lg transition"
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
          </div>
        )}

        {/* Inactive Banner */}
        {isInactive && (
          <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-2xl p-6 mb-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center text-2xl">
                  🚀
                </div>
                <div>
                  <h3 className="text-lg font-bold">Ative seu plano</h3>
                  <p className="text-neutral-400 text-sm">
                    Escolha um plano para ter buscas ilimitadas e relatórios completos.
                  </p>
                </div>
              </div>
              <Link
                href="/#precos"
                className="bg-green-500 hover:bg-green-400 text-black font-bold px-6 py-3 rounded-xl transition whitespace-nowrap"
              >
                Ver planos →
              </Link>
            </div>
          </div>
        )}

        {/* Trial Banner */}
        {isTrial && (
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-4 mb-8 flex items-center gap-3">
            <span className="text-2xl">⏰</span>
            <div className="flex-1">
              <p className="text-amber-400 font-semibold">Período de teste ativo</p>
              <p className="text-amber-400/60 text-sm">
                Aproveite todos os recursos gratuitamente.
                {periodEnd && ` Expira em ${new Date(periodEnd).toLocaleDateString("pt-BR")}.`}
              </p>
            </div>
            <Link href="/#precos" className="text-sm text-amber-400 hover:text-amber-300 font-bold whitespace-nowrap">
              Assinar agora →
            </Link>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            label="Leads ativos"
            value={data.stats.activeLeads}
            icon="📋"
            trend={data.stats.activeLeads > 0 ? "+" + data.stats.activeLeads : undefined}
          />
          <StatCard
            label="Total de leads"
            value={data.stats.totalLeads}
            icon="📊"
          />
          <StatCard
            label="Empresas"
            value={data.stats.capturedCompanies}
            icon="🏢"
          />
          <StatCard
            label="Score médio"
            value={data.stats.avgScore}
            icon="🎯"
            accent
          />
        </div>

        {/* Scanner + Busca embutidos */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">

          {/* Radar Scanner */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
            <h2 className="text-lg font-bold mb-1 flex items-center gap-2">
              <span>🔎</span> Radar Scanner
            </h2>
            <p className="text-neutral-500 text-sm mb-5">Analise qualquer empresa em poucos segundos.</p>

            <label className="block text-neutral-300 text-sm mb-2">
              Nome da empresa, CNPJ, Site ou Google Maps
            </label>
            <input
              value={scannerInput}
              onChange={(e) => setScannerInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAnalisar()}
              placeholder="Ex.: Clínica Vida Caruaru"
              className="w-full p-4 rounded-lg bg-neutral-800 border border-neutral-700 text-white"
            />

            <button
              onClick={handleAnalisar}
              disabled={scannerLoading}
              className="mt-5 w-full bg-green-500 hover:bg-green-400 transition text-black font-bold py-3.5 rounded-lg text-lg disabled:opacity-60"
            >
              {scannerLoading ? "Analisando..." : "🚀 Analisar Empresa"}
            </button>

            {scannerLoading && (
              <div className="mt-4 flex justify-center">
                <RadarLoader text="Analisando empresa..." />
              </div>
            )}
          </div>

          {/* Busca de Oportunidades */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
            <h2 className="text-lg font-bold mb-1 flex items-center gap-2">
              <span>🎯</span> Busca de Oportunidades
            </h2>
            <p className="text-neutral-500 text-sm mb-5">Encontre empresas por região e categoria.</p>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-neutral-400 text-xs mb-1">Estado</label>
                <input
                  value={buscaState}
                  onChange={(e) => setBuscaState(e.target.value.toUpperCase())}
                  maxLength={2}
                  placeholder="PE"
                  className="w-full p-3 rounded-lg bg-neutral-800 border border-neutral-700 text-white uppercase text-sm"
                />
              </div>
              <div>
                <label className="block text-neutral-400 text-xs mb-1">Cidade</label>
                <input
                  value={buscaCity}
                  onChange={(e) => setBuscaCity(e.target.value)}
                  placeholder="Carpina"
                  className="w-full p-3 rounded-lg bg-neutral-800 border border-neutral-700 text-white text-sm"
                />
              </div>
              <div>
                <label className="block text-neutral-400 text-xs mb-1">Categoria</label>
                <input
                  value={buscaCategory}
                  onChange={(e) => setBuscaCategory(e.target.value)}
                  placeholder="Dentista"
                  className="w-full p-3 rounded-lg bg-neutral-800 border border-neutral-700 text-white text-sm"
                />
              </div>
            </div>

            <button
              onClick={handleBuscar}
              disabled={buscaLoading}
              className="mt-5 w-full bg-green-500 hover:bg-green-400 transition text-black font-bold py-3.5 rounded-lg text-lg disabled:opacity-60"
            >
              {buscaLoading ? "Buscando... (até 30s)" : "🔍 Buscar Oportunidades"}
            </button>

            {buscaLoading && (
              <div className="mt-5 flex justify-center py-6">
                <RadarLoader text="Buscando empresas na região..." />
              </div>
            )}

            {buscaError && (
              <div className="mt-4 bg-red-950 border border-red-700 rounded-lg p-3 text-red-300 text-sm">
                {buscaError}
              </div>
            )}

            {buscaResults && (
              <div className="mt-4 max-h-64 overflow-y-auto space-y-2">
                {buscaResults.length === 0 ? (
                  <p className="text-neutral-500 text-sm text-center py-4">Nenhuma empresa encontrada.</p>
                ) : (
                  <>
                    <p className="text-neutral-400 text-xs mb-2">{buscaResults.length} empresas encontradas</p>
                    {buscaResults.slice(0, 10).map((c: any, i: number) => (
                      <div key={i} className="bg-neutral-800 border border-neutral-700 rounded-lg p-3">
                        <div className="flex items-center justify-between">
                          <div className="min-w-0">
                            <p className="text-sm font-medium truncate">{c.name}</p>
                            <p className="text-xs text-neutral-500">{c.city} · {c.category}</p>
                          </div>
                          <div className="flex items-center gap-2 ml-3 shrink-0">
                            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                              (c.opportunityScore ?? 0) >= 70 ? "bg-green-500/20 text-green-400" :
                              (c.opportunityScore ?? 0) >= 40 ? "bg-yellow-500/20 text-yellow-400" :
                              "bg-neutral-700 text-neutral-400"
                            }`}>
                              {c.opportunityScore}
                            </span>
                            <a
                              href={`/scanner/result/${encodeURIComponent(c.name)}?city=${encodeURIComponent(c.city || "")}&state=${encodeURIComponent(c.state || "")}&category=${encodeURIComponent(c.category || "")}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs bg-green-500 hover:bg-green-400 text-black font-bold px-2.5 py-1 rounded-md transition"
                            >
                              Analisar
                            </a>
                            <button
                              onClick={() => salvarNoPipeline(c)}
                              disabled={buscaSalvando === c.name}
                              className={`text-xs px-2.5 py-1 rounded-md font-bold transition disabled:opacity-50 ${
                                buscaSalvos.includes(c.name)
                                  ? "bg-emerald-600 text-white"
                                  : "bg-neutral-700 hover:bg-neutral-600 text-white"
                              }`}
                            >
                              {buscaSalvos.includes(c.name)
                                ? "✅ Salvo"
                                : buscaSalvando === c.name
                                  ? "..."
                                  : "📥 Salvar"}
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </div>
            )}
          </div>

        </div>

        {/* Quick Actions extras */}
        {plan === "agency" && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
            <QuickAction icon="👥" label="Meus clientes" href="/dashboard/clients" />
            <QuickAction icon="🎨" label="Configurar marca" href="/dashboard/agency" />
            {isActive && (
              <QuickAction icon="⚙️" label="Gerenciar assinatura" onClick={handleManagePlan} />
            )}
          </div>
        )}

        {plan === "free" && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
            <QuickAction icon="⭐" label="Assinar plano" href="/#precos" accent />
            {isActive && (
              <QuickAction icon="⚙️" label="Gerenciar assinatura" onClick={handleManagePlan} />
            )}
          </div>
        )}

        {plan === "pro" && isActive && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
            <QuickAction icon="⚙️" label="Gerenciar assinatura" onClick={handleManagePlan} />
          </div>
        )}

        {/* Pipeline */}
        {data.leads.length > 0 && (
          <section className="mb-8">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <span>📊 Status do Pipeline</span>
              <span className="text-sm font-normal text-neutral-500">({data.stats.totalLeads} leads)</span>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {pipelineCounts.map(({ status, count, color }) => (
                <div key={status} className={`rounded-xl p-4 border ${color.split(" ").filter(c => c.startsWith("border-")).join(" ") || "border-neutral-700"} bg-neutral-900/50`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">{status}</span>
                    <span className="text-lg">{statusIcons[status]}</span>
                  </div>
                  <div className="text-3xl font-bold">{count}</div>
                  <div className="mt-2 h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${color.split(" ").filter(c => c.startsWith("bg-")).join(" ") || "bg-neutral-500"}`}
                      style={{ width: `${data.stats.totalLeads > 0 ? (count / data.stats.totalLeads) * 100 : 0}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Leads do Pipeline */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold">📋 Leads do Pipeline</h2>
              <p className="text-neutral-500 text-sm mt-1">Contatos salvos pra entrar em contato.</p>
            </div>
          </div>
          {data.leads.length === 0 ? (
            <div className="border border-neutral-800 rounded-2xl p-12 text-center">
              <div className="text-4xl mb-4">🔍</div>
              <p className="text-neutral-400 mb-4">Nenhum lead no pipeline ainda. Use o Scanner ou a Busca acima pra começar.</p>
            </div>
          ) : (
            <div className="border border-neutral-800 rounded-2xl overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-neutral-800 text-neutral-400 bg-neutral-900/50">
                    <th className="text-left px-5 py-3 font-medium">Empresa</th>
                    <th className="text-left px-5 py-3 font-medium">Status</th>
                    <th className="text-left px-5 py-3 font-medium">Score</th>
                    <th className="text-left px-5 py-3 font-medium">Data</th>
                    <th className="text-right px-5 py-3 font-medium"></th>
                  </tr>
                </thead>
                <tbody>
                  {data.leads.map((lead) => (
                    <tr
                      key={lead.id}
                      className="border-b border-neutral-800/50 hover:bg-neutral-900/30 transition"
                    >
                      <td className="px-5 py-3 font-medium">{lead.company}</td>
                      <td className="px-5 py-3">
                        <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${statusColors[lead.status] ?? "bg-neutral-500/20 text-neutral-400 border-neutral-500/30"}`}>
                          {statusIcons[lead.status]} {lead.status}
                        </span>
                      </td>
                      <td className="px-5 py-3">
                        {lead.score != null ? (
                          <span className={`font-bold ${lead.score >= 70 ? "text-green-400" : lead.score >= 40 ? "text-yellow-400" : "text-red-400"}`}>
                            {lead.score}
                          </span>
                        ) : (
                          <span className="text-neutral-500">—</span>
                        )}
                      </td>
                      <td className="px-5 py-3 text-neutral-400">
                        {new Date(lead.created_at).toLocaleDateString("pt-BR")}
                      </td>
                      <td className="px-5 py-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <a
                            href={`/scanner/result/${encodeURIComponent(lead.company)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs bg-green-500 hover:bg-green-400 text-black font-bold px-2 py-1 rounded transition"
                          >
                            Analisar
                          </a>
                          <button
                            onClick={() => excluirLead(lead.id)}
                            disabled={deletando === lead.id}
                            className="text-xs text-red-400 hover:text-red-300 transition disabled:opacity-50"
                            title="Excluir lead"
                          >
                            {deletando === lead.id ? "..." : "🗑️"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* Empresas no Radar */}
        <section>
          <h2 className="text-lg font-bold mb-4">🏢 Empresas no Radar</h2>
          <p className="text-neutral-500 text-sm mb-4">Empresas já encontradas nas buscas — não aparecem mais duplicadas.</p>
          {data.companies.length === 0 ? (
            <div className="border border-neutral-800 rounded-2xl p-12 text-center">
              <div className="text-4xl mb-4">🏢</div>
              <p className="text-neutral-400">Nenhuma empresa rastreada ainda. Faça uma busca pra popular sua base.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.companies.map((company) => (
                <div
                  key={company.id}
                  className="border border-neutral-800 rounded-2xl p-5 hover:border-green-500/30 transition group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-bold group-hover:text-green-400 transition">{company.name}</h3>
                      <p className="text-sm text-neutral-400 mt-1">
                        {company.city} · {company.category}
                      </p>
                    </div>
                    <ScoreBadge score={company.radar_score} />
                  </div>
                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-neutral-800/50">
                    <span className={`text-xs px-2.5 py-1 rounded-full ${
                      company.status === "capturada"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-neutral-500/20 text-neutral-400"
                    }`}>
                      {company.status}
                    </span>
                    <div className="flex items-center gap-2">
                      <a
                        href={`/scanner/result/${encodeURIComponent(company.name)}?city=${encodeURIComponent(company.city || "")}&category=${encodeURIComponent(company.category || "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs bg-green-500 hover:bg-green-400 text-black font-bold px-2.5 py-1 rounded-md transition"
                      >
                        Analisar
                      </a>
                      <button
                        onClick={() => excluirEmpresa(company.id)}
                        disabled={deletando === company.id}
                        className="text-xs text-red-400 hover:text-red-300 transition disabled:opacity-50"
                        title="Excluir empresa do radar"
                      >
                        {deletando === company.id ? "..." : "🗑️"}
                      </button>
                    </div>
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

function StatCard({ label, value, icon, trend, accent }: {
  label: string;
  value: number;
  icon: string;
  trend?: string;
  accent?: boolean;
}) {
  return (
    <div className={`rounded-2xl p-5 border transition hover:scale-[1.02] ${
      accent
        ? "bg-green-500/5 border-green-500/20"
        : "bg-neutral-900/50 border-neutral-800 hover:border-neutral-700"
    }`}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-2xl">{icon}</span>
        {trend && (
          <span className="text-xs font-bold text-green-400 bg-green-500/10 px-2 py-0.5 rounded-full">
            {trend}
          </span>
        )}
      </div>
      <p className="text-3xl font-black">{value}</p>
      <p className="text-neutral-500 text-sm mt-1">{label}</p>
    </div>
  );
}

function QuickAction({ icon, label, href, onClick, accent }: {
  icon: string;
  label: string;
  href?: string;
  onClick?: () => void;
  accent?: boolean;
}) {
  const base = `flex items-center gap-3 p-4 rounded-xl border transition ${
    accent
      ? "bg-green-500/10 border-green-500/30 hover:bg-green-500/20"
      : "bg-neutral-900 border-neutral-800 hover:border-neutral-700 hover:bg-neutral-800"
  }`;

  if (href) {
    return (
      <Link href={href} className={base}>
        <span className="text-2xl">{icon}</span>
        <span className={`font-semibold text-sm ${accent ? "text-green-400" : ""}`}>{label}</span>
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={`${base} w-full text-left`}>
      <span className="text-2xl">{icon}</span>
      <span className="font-semibold text-sm">{label}</span>
    </button>
  );
}

function ScoreBadge({ score }: { score: number | null }) {
  if (score == null) return <span className="text-neutral-600 text-sm">—</span>;

  return (
    <span className={`text-sm font-bold px-2.5 py-1 rounded-lg ${
      score >= 70 ? "bg-green-500/20 text-green-400" :
      score >= 40 ? "bg-yellow-500/20 text-yellow-400" :
      "bg-red-500/20 text-red-400"
    }`}>
      {score}
    </span>
  );
}
