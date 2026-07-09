"use client";

import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function DashboardPage() {
  const router = useRouter();

  async function sair() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <div className="max-w-6xl mx-auto">

        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-bold">
              🚀 Radar Vivo
            </h1>

            <p className="text-zinc-400 mt-2">
              Bem-vindo ao seu painel.
            </p>
          </div>

          <button
            onClick={sair}
            className="bg-red-500 hover:bg-red-400 px-5 py-2 rounded-lg font-bold text-black"
          >
            Sair
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
            <h2 className="text-zinc-400">
              Oportunidades
            </h2>

            <p className="text-5xl font-bold mt-4">
              0
            </p>
          </div>

          <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
            <h2 className="text-zinc-400">
              Potencial Estimado
            </h2>

            <p className="text-3xl font-bold mt-4 text-green-400">
              R$ 0,00
            </p>
          </div>

          <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
            <h2 className="text-zinc-400">
              Missão do Dia
            </h2>

            <p className="mt-4">
              Em breve...
            </p>
          </div>

        </div>

      </div>
    </main>
  );
}