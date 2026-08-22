"use client";

import { useState } from "react";

type Props = {
  companyName: string;
};

export default function ExportPdfButton({ companyName }: Props) {
  const [generating, setGenerating] = useState(false);

  async function handleExport() {
    if (generating) return;
    setGenerating(true);
    try {
      const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
        import("html2canvas"),
        import("jspdf"),
      ]);

      const main = document.querySelector("main");
      if (!main) {
        window.print();
        return;
      }

      const canvas = await html2canvas(main as HTMLElement, {
        backgroundColor: "#000000",
        scale: 2,
        useCORS: true,
        logging: false,
      });

      const imgData = canvas.toDataURL("image/jpeg", 0.92);
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;

      while (heightLeft > 0) {
        position -= pdfHeight;
        pdf.addPage();
        pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;
      }

      const safeName = companyName.replace(/[^a-zA-Z0-9\s-]/g, "").trim().replace(/\s+/g, "-").toLowerCase();
      pdf.save(`relatorio-${safeName || "radar-vivo"}.pdf`);
    } catch (e) {
      window.print();
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
