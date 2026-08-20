"use client";

import { Suspense, useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    const { data: userData } = await supabase.auth.getUser();
    if (userData.user) {
      const { data: existing } = await supabase
        .from("profiles")
        .select("id")
        .eq("id", userData.user.id)
        .single();

      if (!existing) {
        try {
          await fetch("/api/user/ensure-profile", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              userId: userData.user.id,
              email: userData.user.email || email,
              fullName: userData.user.user_metadata?.full_name || "",
            }),
          });
        } catch (e) {
          console.error("[LOGIN] ensure-profile error:", e);
        }
      }
    }

    localStorage.removeItem("rv_free_searches");
    window.location.href = "/";
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
            Entrar na sua conta
          </h1>
          <p className="text-neutral-400 text-sm mt-1">
            Acesse seu painel de oportunidades
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
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
              className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-500 transition"
              placeholder="••••••••"
            />
          </div>

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
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <p className="text-center text-neutral-400 text-sm mt-6">
          Não tem conta?{" "}
          <Link href="/auth/cadastro" className="text-green-400 hover:underline">
            Cadastre-se grátis
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-green-400 border-t-transparent rounded-full" />
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}
