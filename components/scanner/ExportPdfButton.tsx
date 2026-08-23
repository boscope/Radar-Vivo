"use client";

import { useState } from "react";
import type { ReportPdfData } from "@/lib/pdf/generate-report";

type Props = {
  data: ReportPdfData;
};

export default function ExportPdfButton({ data }: Props) {
  const [generating, setGenerating] = useState(false);

  async function handleExport() {
    if (generating) return;
    setGenerating(true);
    try {
      const { generateReportPdf } = await import("@/lib/pdf/generate-report");
      generateReportPdf(data);
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      console.error("[EXPORT-PDF]", e);
      window.alert(`Falha ao gerar PDF: ${msg}`);
    } finally {
      setGenerating(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleExport}
      disabled={generating}
      className="no-print bg-neutral-800 border border-neutral-700 text-white rounded-xl px-6 py-3 hover:bg-neutral-700 transition disabled:opacity-60"
    >
      {generating ? "⏳ Gerando PDF..." : "📄 Baixar PDF"}
    </button>
  );
}
