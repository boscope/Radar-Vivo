"use client";

import { useEffect } from "react";

type Props = {
  companyName: string;
};

export default function ExportPdfButton({ companyName }: Props) {
  useEffect(() => {
    const style = document.createElement("style");
    style.setAttribute("data-radar-vivo-pdf", companyName);
    style.textContent = `
      @media print {
        @page {
          margin: 14mm;
        }

        body {
          background: #ffffff !important;
          color: #000000 !important;
        }

        .no-print,
        nav,
        header,
        footer,
        button {
          display: none !important;
        }

        main {
          background: #ffffff !important;
          color: #000000 !important;
          min-height: auto !important;
          padding: 0 !important;
          max-width: 100% !important;
        }

        * {
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      if (style.parentNode === document.head) {
        document.head.removeChild(style);
      }
    };
  }, [companyName]);

  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="no-print bg-neutral-800 border border-neutral-700 text-white rounded-xl px-6 py-3 hover:bg-neutral-700 transition"
    >
      📄 Baixar PDF
    </button>
  );
}
