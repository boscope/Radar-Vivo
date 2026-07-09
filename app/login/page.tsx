"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function fazerLogin(e: React.FormEvent) {
    e.preventDefault();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert("E-mail ou senha inválidos.");
      return;
    }

    router.push("/dashboard");
  }

  return (
    <main className="min-h-screen bg-black flex items-center justify-center px-6">
      <div className="w-full max-w-md rounded-2xl bg-zinc-900 p-8 shadow-xl border border-zinc-800">

        <h1 className="text-3xl font-bold text-white text-center">
          Radar Vivo
        </h1>

        <p className="text-zinc-400 text-center mt-2 mb-8">
          Entre na sua conta
        </p>

        <form onSubmit={fazerLogin} className="space-y-5">

          <div>
            <label className="text-zinc-300 text-sm">
              E-mail
            </label>

            <input
              type="email"
              placeholder="voce@email.com"
              className="mt-2 w-full rounded-lg bg-zinc-800 border border-zinc-700 p-3 text-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-zinc-300 text-sm">
              Senha
            </label>

            <input
              type="password"
              placeholder="********"
              className="mt-2 w-full rounded-lg bg-zinc-800 border border-zinc-700 p-3 text-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-400 transition rounded-lg py-3 font-bold text-black"
          >
            Entrar
          </button>

        </form>

      </div>
    </main>
  );
}