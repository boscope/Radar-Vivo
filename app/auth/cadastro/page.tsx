"use client";

import { useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CadastroPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!acceptedTerms) {
      setError("Você precisa aceitar os Termos de Uso e a Política de Privacidade.");
      return;
    }

    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
        emailRedirectTo: `${window.location.origin}/auth/confirm`,
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    if (data.user) {
      try {
        await fetch("/api/user/ensure-profile", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: data.user.id,
            email,
            fullName,
          }),
        });
      } catch (e) {
        console.error("[CADASTRO] ensure-profile error:", e);
      }
    }

    setSuccess(true);
  }

  if (success) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4">
        <div className="w-full max-w-md text-center">
          <div className="text-6xl mb-4">📧</div>
          <h1 className="text-xl font-semibold text-white mb-2">
            Confirme seu email
          </h1>
          <p className="text-neutral-400 text-sm">
            Enviamos um link de confirmação para <strong className="text-white">{email}</strong>.
            Clique no link para ativar sua conta.
          </p>
          <Link
            href="/auth/login"
            className="inline-block mt-6 text-green-400 hover:underline text-sm"
          >
            Voltar para o login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="text-2xl font-bold">
            <span className="text-green-400">Radar</span>
            <span className="text-white">Vivo</span>
          </Link>
          <h1 className="text-xl font-semibold text-white mt-4">
            Crie sua conta grátis
          </h1>
          <p className="text-neutral-400 text-sm mt-1">
            Comece a encontrar oportunidades em 3 dias
          </p>
        </div>

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block text-sm text-neutral-300 mb-1">Nome</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-500 transition"
              placeholder="Seu nome"
            />
          </div>

          <div>
            <label className="block text-sm text-neutral-300 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-500 transition"
              placeholder="seu@email.com"
            />
          </div>

          <div>
            <label className="block text-sm text-neutral-300 mb-1">Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-500 transition"
              placeholder="Mínimo 6 caracteres"
            />
          </div>

          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={acceptedTerms}
              onChange={(e) => setAcceptedTerms(e.target.checked)}
              required
              className="mt-1 w-4 h-4 rounded border-neutral-600 bg-neutral-900 text-green-500 focus:ring-green-500"
            />
            <span className="text-xs text-neutral-400 leading-relaxed">
              Li e aceito os{" "}
              <Link href="/termos" target="_blank" className="text-green-400 hover:underline">
                Termos de Uso
              </Link>{" "}
              e a{" "}
              <Link href="/privacidade" target="_blank" className="text-green-400 hover:underline">
                Política de Privacidade
              </Link>
              . Autorizo o tratamento dos meus dados pessoais conforme a LGPD.
            </span>
          </label>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-lg px-4 py-2">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-500 hover:bg-green-400 text-black font-semibold rounded-lg px-4 py-3 transition disabled:opacity-50"
          >
            {loading ? "Criando conta..." : "Começar teste grátis de 3 dias"}
          </button>

          <p className="text-center text-neutral-500 text-xs">
            Sem cartão de crédito. Cancele quando quiser.
          </p>
        </form>

        <p className="text-center text-neutral-400 text-sm mt-6">
          Já tem conta?{" "}
          <Link href="/auth/login" className="text-green-400 hover:underline">
            Entrar
          </Link>
        </p>
      </div>
    </div>
  );
}
