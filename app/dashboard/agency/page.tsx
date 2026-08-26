"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";
import Link from "next/link";

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function AgencySettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");
  const [plan, setPlan] = useState("");
  const router = useRouter();

  const [agencyName, setAgencyName] = useState("");
  const [agencyLogoUrl, setAgencyLogoUrl] = useState("");
  const [agencyColor, setAgencyColor] = useState("#22c55e");
  const [agencyWhatsapp, setAgencyWhatsapp] = useState("");
  const [agencyWebsite, setAgencyWebsite] = useState("");

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) { router.push("/auth/login"); return; }

    const { data } = await supabase
      .from("profiles")
      .select("plan, agency_name, agency_logo_url, agency_color, agency_whatsapp, agency_website")
      .eq("id", session.user.id)
      .single();

    if (data) {
      setPlan(data.plan || "free");
      setAgencyName(data.agency_name || "");
      setAgencyLogoUrl(data.agency_logo_url || "");
      setAgencyColor(data.agency_color || "#22c55e");
      setAgencyWhatsapp(data.agency_whatsapp || "");
      setAgencyWebsite(data.agency_website || "");
    }
    setLoading(false);
  }

  async function handleSave() {
    setSaving(true);
    setMsg("");
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;

    const { error } = await supabase
      .from("profiles")
      .update({
        agency_name: agencyName,
        agency_logo_url: agencyLogoUrl,
        agency_color: agencyColor,
        agency_whatsapp: agencyWhatsapp,
        agency_website: agencyWebsite,
      })
      .eq("id", session.user.id);

    if (error) {
      setMsg("Erro ao salvar: " + error.message);
    } else {
      setMsg("Configurações salvas!");
      setTimeout(() => setMsg(""), 3000);
    }
    setSaving(false);
  }

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
          <p className="text-neutral-400 mb-6">Faça upgrade para personalizar seus relatórios com a marca da sua agência.</p>
          <Link href="/#precos" className="bg-green-500 hover:bg-green-400 text-black font-bold px-6 py-3 rounded-xl transition">
            Ver planos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="border-b border-neutral-800/50 bg-black/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
              <span className="text-black font-bold text-sm">RV</span>
            </div>
            <span className="text-lg font-bold">
              <span className="text-green-400">Radar</span>
              <span className="text-white">Vivo</span>
            </span>
          </Link>
          <Link href="/dashboard" className="text-sm text-neutral-400 hover:text-white transition">
            ← Voltar ao painel
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold mb-2">Configurações da Agência</h1>
        <p className="text-neutral-400 mb-8">Personalize seus relatórios com a marca da sua agência.</p>

        <div className="space-y-6">
          {/* Agency Name */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
            <h2 className="text-lg font-bold mb-4">Identidade da Agência</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-neutral-400 mb-2">Nome da agência</label>
                <input
                  type="text"
                  value={agencyName}
                  onChange={(e) => setAgencyName(e.target.value)}
                  placeholder="Sua Agência Digital"
                  className="w-full bg-neutral-800 border border-neutral-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-400"
                />
              </div>
              <div>
                <label className="block text-sm text-neutral-400 mb-2">URL do logo (opcional)</label>
                <input
                  type="url"
                  value={agencyLogoUrl}
                  onChange={(e) => setAgencyLogoUrl(e.target.value)}
                  placeholder="https://exemplo.com/logo.png"
                  className="w-full bg-neutral-800 border border-neutral-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-400"
                />
              </div>
            </div>
          </div>

          {/* Branding */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
            <h2 className="text-lg font-bold mb-4">Personalização Visual</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-neutral-400 mb-2">Cor principal</label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={agencyColor}
                    onChange={(e) => setAgencyColor(e.target.value)}
                    className="w-12 h-12 rounded-lg border border-neutral-600 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={agencyColor}
                    onChange={(e) => setAgencyColor(e.target.value)}
                    className="flex-1 bg-neutral-800 border border-neutral-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-400"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-neutral-400 mb-2">WhatsApp da agência</label>
                <input
                  type="tel"
                  value={agencyWhatsapp}
                  onChange={(e) => setAgencyWhatsapp(e.target.value)}
                  placeholder="81999999999"
                  className="w-full bg-neutral-800 border border-neutral-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-400"
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-sm text-neutral-400 mb-2">Website da agência</label>
              <input
                type="url"
                value={agencyWebsite}
                onChange={(e) => setAgencyWebsite(e.target.value)}
                placeholder="https://suaagencia.com.br"
                className="w-full bg-neutral-800 border border-neutral-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-400"
              />
            </div>
          </div>

          {/* Preview */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
            <h2 className="text-lg font-bold mb-4">Pré-visualização</h2>
            <div className="bg-neutral-800 rounded-xl p-6 border-l-4" style={{ borderColor: agencyColor }}>
              <div className="flex items-center gap-3 mb-4">
                {agencyLogoUrl ? (
                  <img src={agencyLogoUrl} alt="Logo" className="h-8" />
                ) : (
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center text-black font-bold text-sm" style={{ backgroundColor: agencyColor }}>
                    {agencyName ? agencyName[0].toUpperCase() : "A"}
                  </div>
                )}
                <span className="font-bold text-lg">{agencyName || "Nome da Agência"}</span>
              </div>
              <p className="text-neutral-400 text-sm">Relatório de Presença Digital</p>
              <p className="text-neutral-500 text-xs mt-2">
                {agencyWebsite || "suaagencia.com.br"} · {agencyWhatsapp ? `WhatsApp: ${agencyWhatsapp}` : ""}
              </p>
            </div>
          </div>

          {/* Save */}
          <div className="flex items-center justify-between">
            <div>
              {msg && (
                <p className={`text-sm ${msg.includes("Erro") ? "text-red-400" : "text-green-400"}`}>
                  {msg}
                </p>
              )}
            </div>
            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-green-500 hover:bg-green-400 text-black font-bold px-8 py-3 rounded-xl transition disabled:opacity-50"
            >
              {saving ? "Salvando..." : "Salvar configurações"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
