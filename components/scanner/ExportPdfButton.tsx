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
      if (!main) return;

      // Desce pela cadeia de containers únicos até achar a lista de blocos
      let container: HTMLElement | null = main as HTMLElement;
      while (container) {
        const children: Element[] = Array.from(container.children).filter(
          (el) => el.tagName === "DIV" || el.tagName === "SECTION"
        );
        if (children.length === 1) {
          container = children[0] as HTMLElement;
        } else if (children.length > 1) {
          break;
        } else {
          container = null;
        }
      }

      const source = container ?? (main as HTMLElement);
      const blocks = Array.from(
        source.querySelectorAll<HTMLElement>(":scope > div")
      ).filter((el) => !el.classList.contains("no-print"));

      const list =
        blocks.length > 0 ? blocks : [source];

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const margin = 8;
      const usableWidth = pdfWidth - margin * 2;

      let first = true;
      let blockIdx = 0;

      for (const block of list) {
        const canvas = await html2canvas(block, {
          backgroundColor: "#0a0a0a",
          scale: Math.min(2, Math.max(1.5, window.devicePixelRatio || 1)),
          useCORS: true,
          logging: false,
          ignoreElements: (el) =>
            el.classList?.contains("no-print") ?? false,
        });

        const imgData = canvas.toDataURL("image/jpeg", 0.85);
        const imgHeight = (canvas.height * usableWidth) / canvas.width;

        if (!first && imgHeight > pdfHeight - margin * 2) {
          // Bloco maior que uma página inteira: fatia em várias páginas
          const alias = `bloco-${blockIdx}`;
          let remainingHeight = imgHeight;
          let position = 0;
          while (remainingHeight > 0) {
            pdf.addPage();
            const sliceHeight = Math.min(
              remainingHeight,
              pdfHeight - margin * 2
            );
            pdf.addImage(
              imgData,
              "JPEG",
              margin,
              margin - position,
              usableWidth,
              imgHeight,
              alias,
              "FAST"
            );
            position += sliceHeight;
            remainingHeight -= sliceHeight;
          }
        } else if (!first) {
          pdf.addPage();
          pdf.addImage(imgData, "JPEG", margin, margin, usableWidth, imgHeight);
        } else {
          pdf.addImage(imgData, "JPEG", margin, margin, usableWidth, imgHeight);
        }

        first = false;
        blockIdx++;
      }

      const safeName = companyName
        .replace(/[^a-zA-Z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-")
        .toLowerCase();
      pdf.save(`relatorio-${safeName || "radar-vivo"}.pdf`);
    } catch {
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
