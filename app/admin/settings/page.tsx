"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminSettingsPage() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  async function handleChangePassword() {
    if (newPassword.length < 6) {
      setMsg("A senha precisa ter pelo menos 6 caracteres.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setMsg("As senhas não coincidem.");
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    setLoading(false);

    if (error) {
      setMsg("Erro: " + error.message);
    } else {
      setMsg("Senha alterada com sucesso!");
      setNewPassword("");
      setConfirmPassword("");
    }
    setTimeout(() => setMsg(""), 5000);
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/");
  }

  return (
    <main className="min-h-screen bg-black flex">
      <AdminSidebar />
      <div className="flex-1 p-8 overflow-auto">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-8">Configurações</h1>

          {/* Change Password */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 mb-6">
            <h2 className="text-lg font-bold text-white mb-4">Alterar senha</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-neutral-400 mb-2">Nova senha</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Mínimo 6 caracteres"
                  className="w-full bg-neutral-800 border border-neutral-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-400"
                />
              </div>
              <div>
                <label className="block text-sm text-neutral-400 mb-2">Confirmar senha</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repita a senha"
                  className="w-full bg-neutral-800 border border-neutral-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-400"
                />
              </div>
              <button
                onClick={handleChangePassword}
                disabled={loading}
                className="bg-green-500 hover:bg-green-400 text-black font-bold px-6 py-3 rounded-lg transition disabled:opacity-50"
              >
                {loading ? "Alterando..." : "Alterar senha"}
              </button>
              {msg && (
                <p className={`text-sm ${msg.includes("sucesso") ? "text-green-400" : "text-red-400"}`}>
                  {msg}
                </p>
              )}
            </div>
          </div>

          {/* Account */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-white mb-4">Conta</h2>
            <button
              onClick={handleLogout}
              className="bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 font-bold px-6 py-3 rounded-lg transition"
            >
              Sair da conta admin
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
