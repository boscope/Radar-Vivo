"use client";

import { useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import Link from "next/link";

export default function RecuperarSenhaPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  async function handleReset(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/nova-senha`,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setSent(true);
    setLoading(false);
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
            Recuperar senha
          </h1>
          <p className="text-neutral-400 text-sm mt-1">
            Enviaremos um link para você criar uma nova senha
          </p>
        </div>

        {sent ? (
          <div className="bg-green-500/10 border border-green-500/30 text-green-400 rounded-xl px-4 py-6 text-center">
            <p className="font-semibold mb-2">✉️ Email enviado!</p>
            <p className="text-sm text-neutral-300">
              Verifique sua caixa de entrada em <strong>{email}</strong> e clique
              no link para criar uma nova senha.
            </p>
          </div>
        ) : (
          <form onSubmit={handleReset} className="space-y-4">
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
              {loading ? "Enviando..." : "Enviar link de recuperação"}
            </button>
          </form>
        )}

        <p className="text-center text-neutral-400 text-sm mt-6">
          Lembrou a senha?{" "}
          <Link href="/auth/login" className="text-green-400 hover:underline">
            Voltar ao login
          </Link>
        </p>
      </div>
    </div>
  );
}
