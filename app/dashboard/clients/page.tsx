"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";
import Link from "next/link";

interface Client {
  company_name: string;
  city: string;
  category: string;
  latest_score: number;
  first_score: number;
  score_trend: number;
  last_analysis: string;
}

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [plan, setPlan] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => { load(); }, []);

  async function load() {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) { router.push("/auth/login"); return; }

    // Check plan
    const { data: profile } = await supabase
      .from("profiles")
      .select("plan")
      .eq("id", session.user.id)
      .single();

    setPlan(profile?.plan || "free");

    // Get companies with score history
    const { data: companies } = await supabase
      .from("companies")
      .select("name, city, category, radar_score, captured_at")
      .eq("owner_id", session.user.id)
      .order("captured_at", { ascending: false });

    // Get score history for each company
    const clientMap = new Map<string, Client>();

    for (const company of (companies ?? [])) {
      const { data: history } = await supabase
        .from("score_history")
        .select("score, created_at")
        .eq("user_id", session.user.id)
        .eq("company_name", company.name)
        .order("created_at", { ascending: true });

      const scores = (history ?? []).map(h => h.score);
      const firstScore = scores[0] ?? company.radar_score ?? 0;
      const latestScore = scores[scores.length - 1] ?? company.radar_score ?? 0;

      clientMap.set(company.name, {
        company_name: company.name,
        city: company.city,
        category: company.category,
        latest_score: latestScore,
        first_score: firstScore,
        score_trend: latestScore - firstScore,
        last_analysis: company.captured_at ?? new Date().toISOString(),
      });
    }

    setClients(Array.from(clientMap.values()));
    setLoading(false);
  }

  const filtered = clients.filter(c =>
    c.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-green-400 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (plan !== "agency") {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center max-w-md">
          <h2 className="text-2xl font-bold mb-4">Recurso exclusivo do plano Agência</h2>
          <p className="text-neutral-400 mb-6">Gerencie todos os seus clientes em um só lugar.</p>
          <Link href="/#precos" className="bg-green-500 hover:bg-green-400 text-black font-bold px-6 py-3 rounded-xl transition">
            Ver planos
          </Link>
        </div>
      </div>
    );
  }

  const avgScore = clients.length > 0
    ? Math.round(clients.reduce((s, c) => s + c.latest_score, 0) / clients.length)
    : 0;

  const improved = clients.filter(c => c.score_trend > 0).length;

  return (
    <div className="min-h-screen bg-black text-white">
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
          <div className="flex items-center gap-4">
            <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30">
              Agência
            </span>
            <Link href="/dashboard" className="text-sm text-neutral-400 hover:text-white transition">
              ← Painel
            </Link>
            <Link href="/dashboard/agency" className="text-sm text-neutral-400 hover:text-white transition">
              Configurações
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold mb-2">Meus Clientes</h1>
        <p className="text-neutral-400 mb-8">Acompanhe o desempenho digital de cada cliente.</p>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5">
            <div className="text-sm text-neutral-400 mb-1">Total de clientes</div>
            <div className="text-3xl font-extrabold text-white">{clients.length}</div>
          </div>
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5">
            <div className="text-sm text-neutral-400 mb-1">Score médio</div>
            <div className="text-3xl font-extrabold text-green-400">{avgScore}</div>
          </div>
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5">
            <div className="text-sm text-neutral-400 mb-1">Melhoraram</div>
            <div className="text-3xl font-extrabold text-green-400">{improved}</div>
            <div className="text-xs text-neutral-500">clientes com score subindo</div>
          </div>
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5">
            <div className="text-sm text-neutral-400 mb-1">Precisam de atenção</div>
            <div className="text-3xl font-extrabold text-yellow-400">
              {clients.filter(c => c.latest_score < 50).length}
            </div>
            <div className="text-xs text-neutral-500">score abaixo de 50</div>
          </div>
        </div>

        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar cliente por nome, cidade ou categoria..."
            className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-5 py-3 text-white focus:outline-none focus:border-green-400"
          />
        </div>

        {/* Clients Table */}
        {clients.length === 0 ? (
          <div className="border border-neutral-800 rounded-2xl p-12 text-center">
            <div className="text-4xl mb-4">🏢</div>
            <p className="text-neutral-400 mb-4">Nenhum cliente cadastrado ainda.</p>
            <Link href="/busca" className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-400 text-black font-bold px-6 py-3 rounded-xl transition">
              Buscar primeira empresa →
            </Link>
          </div>
        ) : (
          <div className="border border-neutral-800 rounded-2xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-neutral-800 text-neutral-400 bg-neutral-900/50">
                  <th className="text-left px-6 py-3 font-medium">Cliente</th>
                  <th className="text-left px-6 py-3 font-medium">Cidade</th>
                  <th className="text-left px-6 py-3 font-medium">Categoria</th>
                  <th className="text-left px-6 py-3 font-medium">Score Atual</th>
                  <th className="text-left px-6 py-3 font-medium">Tendência</th>
                  <th className="text-left px-6 py-3 font-medium">Última Análise</th>
                  <th className="text-left px-6 py-3 font-medium">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((client) => (
                  <tr key={client.company_name} className="border-b border-neutral-800/50 hover:bg-neutral-800/30 transition">
                    <td className="px-6 py-4 font-bold">{client.company_name}</td>
                    <td className="px-6 py-4 text-neutral-400">{client.city}</td>
                    <td className="px-6 py-4 text-neutral-400">{client.category}</td>
                    <td className="px-6 py-4">
                      <span className={`font-bold text-lg ${
                        client.latest_score >= 70 ? "text-green-400" :
                        client.latest_score >= 40 ? "text-yellow-400" : "text-red-400"
                      }`}>
                        {client.latest_score}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {client.score_trend > 0 ? (
                        <span className="text-green-400 font-bold">+{client.score_trend} ↑</span>
                      ) : client.score_trend < 0 ? (
                        <span className="text-red-400 font-bold">{client.score_trend} ↓</span>
                      ) : (
                        <span className="text-neutral-500">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-neutral-500 text-xs">
                      {new Date(client.last_analysis).toLocaleDateString("pt-BR")}
                    </td>
                    <td className="px-6 py-4">
                      <a
                        href={`/scanner/result/${encodeURIComponent(client.company_name)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs bg-green-500/10 text-green-400 px-3 py-1.5 rounded-lg hover:bg-green-500/20 transition"
                      >
                        Reanalisar
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
