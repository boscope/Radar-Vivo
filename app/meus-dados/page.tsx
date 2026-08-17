"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";
import Link from "next/link";

interface UserData {
  profile: {
    email: string;
    full_name: string;
    plan: string;
    subscription_status: string;
    created_at: string;
  } | null;
  leads: Array<{ company_name: string; created_at: string }>;
  companies: Array<{ name: string; city: string; captured_at: string | null }>;
}

export default function MeusDadosPage() {
  const [data, setData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      router.push("/auth/login?redirect=/meus-dados");
      return;
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", session.user.id)
      .single();

    const { data: leads } = await supabase
      .from("leads")
      .select("company_name, created_at")
      .eq("user_id", session.user.id);

    const { data: companies } = await supabase
      .from("companies")
      .select("name, city, captured_at")
      .eq("owner_id", session.user.id);

    setData({
      profile,
      leads: leads ?? [],
      companies: companies ?? [],
    });
    setLoading(false);
  }

  async function handleDeleteAccount() {
    if (!password) {
      setError("Digite sua senha para confirmar");
      return;
    }

    setDeleting(true);
    setError("");

    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;

    // Re-authenticate
    const { error: authError } = await supabase.auth.signInWithPassword({
      email: session.user.email!,
      password,
    });

    if (authError) {
      setError("Senha incorreta");
      setDeleting(false);
      return;
    }

    // Delete user data via API
    try {
      const res = await fetch("/api/user/delete", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${session.access_token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: session.user.id }),
      });

      if (!res.ok) throw new Error("Erro ao excluir dados");

      // Sign out
      await supabase.auth.signOut();
      router.push("/");
    } catch {
      setError("Erro ao excluir conta. Tente novamente.");
      setDeleting(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-green-400 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="border-b border-neutral-800 px-6 py-4">
        <Link href="/" className="text-xl font-bold">
          <span className="text-green-400">Radar</span>
          <span className="text-white">Vivo</span>
        </Link>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-2">Meus Dados (LGPD)</h1>
        <p className="text-neutral-400 text-sm mb-8">
          Conforme a Lei Geral de Proteção de Dados, você tem direito de acessar,
          corrigir e solicitar a exclusão dos seus dados pessoais.
        </p>

        {/* Dados da conta */}
        <section className="border border-neutral-800 rounded-xl p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Dados da Conta</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-neutral-400">Nome</span>
              <span>{data?.profile?.full_name || "—"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-400">Email</span>
              <span>{data?.profile?.email || "—"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-400">Plano</span>
              <span className="uppercase">{data?.profile?.plan || "free"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-400">Status</span>
              <span>{data?.profile?.subscription_status || "inactive"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-400">Membro desde</span>
              <span>
                {data?.profile?.created_at
                  ? new Date(data.profile.created_at).toLocaleDateString("pt-BR")
                  : "—"}
              </span>
            </div>
          </div>
        </section>

        {/* Leads */}
        <section className="border border-neutral-800 rounded-xl p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">
            Leads Coletados ({data?.leads.length ?? 0})
          </h2>
          {data?.leads.length === 0 ? (
            <p className="text-neutral-400 text-sm">Nenhum lead coletado.</p>
          ) : (
            <div className="text-sm space-y-2 max-h-48 overflow-y-auto">
              {data?.leads.map((lead, i) => (
                <div key={i} className="flex justify-between text-neutral-300">
                  <span>{lead.company_name}</span>
                  <span className="text-neutral-500">
                    {new Date(lead.created_at).toLocaleDateString("pt-BR")}
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Empresas */}
        <section className="border border-neutral-800 rounded-xl p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">
            Empresas Capturadas ({data?.companies.length ?? 0})
          </h2>
          {data?.companies.length === 0 ? (
            <p className="text-neutral-400 text-sm">Nenhuma empresa capturada.</p>
          ) : (
            <div className="text-sm space-y-2 max-h-48 overflow-y-auto">
              {data?.companies.map((c, i) => (
                <div key={i} className="flex justify-between text-neutral-300">
                  <span>
                    {c.name} — {c.city}
                  </span>
                  <span className="text-neutral-500">
                    {c.captured_at
                      ? new Date(c.captured_at).toLocaleDateString("pt-BR")
                      : "—"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Direitos LGPD */}
        <section className="border border-neutral-800 rounded-xl p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Seus Direitos (LGPD)</h2>
          <ul className="text-sm space-y-2 text-neutral-300">
            <li>✔ Acesso aos seus dados pessoais</li>
            <li>✔ Correção de dados incompletos ou desatualizados</li>
            <li>✔ Exclusão dos dados pessoais</li>
            <li>✔ Portabilidade dos dados</li>
            <li>✔ Revogação do consentimento</li>
          </ul>
          <p className="text-sm text-neutral-400 mt-4">
            Para exercer qualquer direito, envie email para{" "}
            <a
              href="mailto:contato@radarvivo.com.br"
              className="text-green-400 hover:underline"
            >
              contato@radarvivo.com.br
            </a>
          </p>
        </section>

        {/* Excluir conta */}
        <section className="border border-red-500/30 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-red-400 mb-2">
            Excluir minha conta e dados
          </h2>
          <p className="text-sm text-neutral-400 mb-4">
            Esta ação é <strong className="text-red-400">irreversível</strong>.
            Todos os seus dados (perfil, leads, empresas capturadas) serão
            permanentemente excluídos em até 30 dias.
          </p>

          {!showConfirm ? (
            <button
              onClick={() => setShowConfirm(true)}
              className="px-4 py-2 border border-red-500/50 text-red-400 rounded-lg hover:bg-red-500/10 transition text-sm"
            >
              Solicitar exclusão de dados
            </button>
          ) : (
            <div className="space-y-3">
              <p className="text-sm text-neutral-300">
                Digite sua senha para confirmar:
              </p>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Sua senha"
                className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-red-500"
              />
              {error && (
                <p className="text-red-400 text-sm">{error}</p>
              )}
              <div className="flex gap-3">
                <button
                  onClick={handleDeleteAccount}
                  disabled={deleting}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-400 transition text-sm disabled:opacity-50"
                >
                  {deleting ? "Excluindo..." : "Sim, excluir minha conta"}
                </button>
                <button
                  onClick={() => { setShowConfirm(false); setPassword(""); setError(""); }}
                  className="px-4 py-2 border border-neutral-600 text-neutral-400 rounded-lg hover:bg-neutral-900 transition text-sm"
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}
        </section>

        <div className="mt-8 text-center">
          <Link href="/dashboard" className="text-green-400 hover:underline">
            ← Voltar ao dashboard
          </Link>
        </div>
      </main>
    </div>
  );
}
