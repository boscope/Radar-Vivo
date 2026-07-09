"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function RegisterPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function cadastrar(e: React.FormEvent) {
    e.preventDefault();

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    alert("Cadastro realizado com sucesso!");

    router.push("/login");
  }

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center">
      <form
        onSubmit={cadastrar}
        className="bg-zinc-900 p-8 rounded-xl w-96 space-y-4"
      >
        <h1 className="text-3xl font-bold text-center">
          Criar Conta
        </h1>

        <input
          type="email"
          placeholder="E-mail"
          className="w-full p-3 rounded bg-zinc-800"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Senha"
          className="w-full p-3 rounded bg-zinc-800"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
        />

        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-400 text-black font-bold py-3 rounded-lg transition"
        >
          Criar Conta
        </button>
      </form>
    </main>
  );
}