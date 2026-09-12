"use client";

import { useEffect, useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";

type UsageStatus = {
  mes: string;
  textSearchCalls: number;
  detailsCalls: number;
  estimatedCostBrl: number;
  budgetBrl: number;
  blocked: boolean;
};

function formatBRL(value: number) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export default function AdminGoogleCostsPage() {
  const [status, setStatus] = useState<UsageStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/google/usage")
      .then((r) => r.json())
      .then((data) => {
        setStatus(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Não foi possível carregar os custos de uso do Google.");
        setLoading(false);
      });
  }, []);

  const usedPercent = status ? Math.min(100, (status.estimatedCostBrl / status.budgetBrl) * 100) : 0;

  return (
    <main className="min-h-screen bg-black flex">
      <AdminSidebar />
      <div className="flex-1 p-8 overflow-auto">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-1">Custos Google</h1>
          <p className="text-neutral-400 text-sm mb-8">
            Consumo da minha chave de produção (Places API) no mês de{" "}
            <span className="text-white font-semibold">{status?.mes ?? "..."}</span>
          </p>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 rounded-2xl p-6 mb-6">
              {error}
            </div>
          )}

          {loading && (
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 text-neutral-400">
              Carregando...
            </div>
          )}

          {status && !loading && (
            <>
              {/* Big numbers */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5">
                  <div className="text-xs text-neutral-500 mb-1">Custo estimado</div>
                  <div className={`text-2xl font-bold ${status.estimatedCostBrl > 0 ? "text-yellow-400" : "text-green-400"}`}>
                    {formatBRL(status.estimatedCostBrl)}
                  </div>
                </div>
                <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5">
                  <div className="text-xs text-neutral-500 mb-1">Orçamento</div>
                  <div className="text-2xl font-bold text-white">{formatBRL(status.budgetBrl)}</div>
                </div>
                <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5">
                  <div className="text-xs text-neutral-500 mb-1">Buscas</div>
                  <div className="text-2xl font-bold text-white">{status.textSearchCalls.toLocaleString("pt-BR")}</div>
                </div>
                <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5">
                  <div className="text-xs text-neutral-500 mb-1">Detalhes</div>
                  <div className="text-2xl font-bold text-white">{status.detailsCalls.toLocaleString("pt-BR")}</div>
                </div>
              </div>

              {/* Budget bar */}
              <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 mb-6">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-neutral-400">Uso do orçamento</span>
                  <span className={status.blocked ? "text-red-400 font-bold" : "text-neutral-200"}>
                    {usedPercent.toFixed(0)}%
                  </span>
                </div>
                <div className="h-3 bg-neutral-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${usedPercent >= 100 ? "bg-red-500" : usedPercent >= 70 ? "bg-yellow-500" : "bg-green-500"}`}
                    style={{ width: `${Math.max(2, usedPercent)}%` }}
                  />
                </div>
                {status.blocked ? (
                  <p className="mt-4 text-red-400 text-sm">
                    ⚠️ Orçamento de {formatBRL(status.budgetBrl)} atingido. O Radar está{" "}
                    <strong>bloqueando novas consultas ao Google</strong> até o mês virar (a trava é por
                    mês-calendário).
                  </p>
                ) : (
                  <p className="mt-4 text-neutral-500 text-sm">
                    Google liberado para consultas. A trava reativa automaticamente quando o custo
                    estimado alcançar {formatBRL(status.budgetBrl)}.
                  </p>
                )}
              </div>

              {/* How it's calculated */}
              <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 mb-6">
                <h2 className="text-lg font-bold text-white mb-3">Como esse custo é calculado</h2>
                <ul className="text-sm text-neutral-400 space-y-2 list-disc list-inside">
                  <li>
                    <strong className="text-neutral-200">5.000 buscas</strong> grátis por mês (Text Search) —
                    depois ≈ R$ 0,18 cada.
                  </li>
                  <li>
                    <strong className="text-neutral-200">1.000 detalhes</strong> grátis por mês (telefone,
                    nota e site) — depois ≈ R$ 0,11 cada.
                  </li>
                  <li>
                    Esse total ultrapassar R$ 50 (ou o valor da variável{" "}
                    <code className="text-green-400">GOOGLE_MONTHLY_BUDGET_BRL</code> na Vercel) → trava
                    automática.
                  </li>
                </ul>
                <p className="mt-4 text-sm text-neutral-500">
                  💡 O valor <strong>real</strong> cobrado pelo Google vem na conta do Cloud Billing
                  (console.cloud.google.com → Billing): esse painel é a estimativa que o Radar faz em
                  tempo real com o dólar a R$ 5,50.
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}