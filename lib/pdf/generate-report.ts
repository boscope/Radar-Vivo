import { jsPDF } from "jspdf";

export type ReportPdfData = {
  companyName: string;
  city?: string;
  state?: string;
  category?: string;
  score: number;
  closingProbability: number;
  estimatedRevenue: number;
  priority?: string;
  checks: { label: string; ok: boolean }[];
  weaknesses: string[];
  strengths: string[];
  services: string[];
  aiPresence?: {
    visibilityScore: number;
    status: "visivel" | "parcial" | "invisivel";
    summary: string;
    detail: string;
  };
};

const GREEN: [number, number, number] = [34, 197, 94];
const BG: [number, number, number] = [10, 10, 10];
const CARD: [number, number, number] = [24, 24, 27];
const BORDER: [number, number, number] = [55, 55, 60];
const WHITE: [number, number, number] = [255, 255, 255];
const LIGHT: [number, number, number] = [212, 212, 216];
const GRAY: [number, number, number] = [145, 145, 152];
const RED: [number, number, number] = [239, 68, 68];
const AMBER: [number, number, number] = [245, 158, 11];

const PAGE_W = 210;
const PAGE_H = 297;
const M = 16;
const CONTENT_W = PAGE_W - M * 2;

export function generateReportPdf(data: ReportPdfData) {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  let y = M;

  const paintBackground = () => {
    doc.setFillColor(...BG);
    doc.rect(0, 0, PAGE_W, PAGE_H, "F");
  };

  paintBackground();

  const ensureSpace = (needed: number) => {
    if (y + needed > PAGE_H - 20) {
      doc.addPage();
      paintBackground();
      y = M + 6;
    }
  };

  const money = `R$ ${data.estimatedRevenue.toLocaleString("pt-BR")}`;

  // Cabeçalho
  doc.setFillColor(...CARD);
  doc.rect(0, 0, PAGE_W, 42, "F");
  doc.setFillColor(...GREEN);
  doc.rect(0, 42, PAGE_W, 1.2, "F");
  doc.setTextColor(...GREEN);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(15);
  doc.text("RadarVivo", M, 17);
  doc.setTextColor(...LIGHT);
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("Análise de presença digital", M, 25);
  doc.setTextColor(...GRAY);
  doc.setFontSize(8);
  doc.text(
    new Date().toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" }),
    PAGE_W - M,
    25,
    { align: "right" }
  );

  y = 56;

  // Nome da empresa
  doc.setTextColor(...WHITE);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  const nameLines = doc.splitTextToSize(data.companyName, CONTENT_W);
  doc.text(nameLines, M, y);
  y += nameLines.length * 9 + 1;

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...GREEN);
  const localizacao = [
    data.city ? `${data.city}${data.state ? `, ${data.state}` : ""}` : "",
    data.category,
  ]
    .filter(Boolean)
    .join(" · ");
  if (localizacao) {
    doc.text(localizacao, M, y);
    y += 8;
  }
  if (data.priority) {
    doc.setTextColor(...GRAY);
    doc.setFontSize(9);
    doc.text(`Prioridade de contato: ${data.priority}`, M, y);
    y += 8;
  }
  y += 2;

  // KPIs
  ensureSpace(32);
  const kpis = [
    { value: String(data.score), label: "Índice de presença digital" },
    { value: `${data.closingProbability}%`, label: "Clientes perdendo p/ concorrência" },
    { value: money, label: "Por mês em vendas em risco" },
  ];
  const kpiW = (CONTENT_W - 6) / 3;
  kpis.forEach((kpi, i) => {
    const x = M + i * (kpiW + 3);
    doc.setDrawColor(...BORDER);
    doc.setFillColor(...CARD);
    doc.setLineWidth(0.4);
    doc.roundedRect(x, y, kpiW, 26, 2, 2, "FD");
    doc.setTextColor(...GREEN);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text(kpi.value, x + kpiW / 2, y + 11, { align: "center" });
    doc.setTextColor(...GRAY);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(6.5);
    const labelLines = doc.splitTextToSize(kpi.label, kpiW - 4);
    doc.text(labelLines, x + kpiW / 2, y + 16.5, { align: "center" });
  });
  y += 36;

  // Checklist
  sectionHeader(doc, "Presença digital", y, ensureSpace);
  y += 13;
  data.checks.forEach((check) => {
    ensureSpace(9);
    doc.setFillColor(...CARD);
    doc.setDrawColor(...BORDER);
    doc.setLineWidth(0.3);
    doc.roundedRect(M, y - 4.5, CONTENT_W, 8, 1.5, 1.5, "FD");
    if (check.ok) {
      doc.setTextColor(...GREEN);
      doc.setFont("helvetica", "bold");
      doc.text("✓", M + 3, y);
      doc.setTextColor(...WHITE);
      doc.setFont("helvetica", "normal");
    } else {
      doc.setTextColor(...RED);
      doc.setFont("helvetica", "bold");
      doc.text("✗", M + 3, y);
      doc.setTextColor(...LIGHT);
      doc.setFont("helvetica", "normal");
    }
    doc.setFontSize(10);
    doc.text(check.label, M + 9, y);
    y += 10;
  });
  y += 4;

  // Diagnóstico
  sectionHeader(doc, "Diagnóstico", y, ensureSpace);
  y += 13;
  subHeader(doc, "Pontos de atenção", RED, y);
  y += 6;
  y = bulletList(doc, data.weaknesses, M, y, CONTENT_W, ensureSpace);
  y += 4;
  ensureSpace(14);
  subHeader(doc, "Pontos fortes", GREEN, y);
  y += 6;
  y = bulletList(doc, data.strengths, M, y, CONTENT_W, ensureSpace);
  y += 7;

  // Presença em IAs
  if (data.aiPresence) {
    sectionHeader(doc, "Sua empresa nas inteligências artificiais", y, ensureSpace);
    y += 13;
    ensureSpace(18);
    doc.setFillColor(...CARD);
    doc.setDrawColor(...BORDER);
    doc.setLineWidth(0.4);
    doc.roundedRect(M, y - 4, CONTENT_W, 10, 1.5, 1.5, "FD");
    const statusColor =
      data.aiPresence.status === "invisivel"
        ? RED
        : data.aiPresence.status === "parcial"
          ? AMBER
          : GREEN;
    doc.setTextColor(...statusColor);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.text(
      `Visibilidade nas IAs: ${data.aiPresence.visibilityScore}/100`,
      M + 3,
      y + 2.5
    );
    y += 13;
    doc.setTextColor(...WHITE);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    const sumLines = doc.splitTextToSize(data.aiPresence.summary, CONTENT_W);
    ensureSpace(sumLines.length * 5 + 2);
    doc.text(sumLines, M, y);
    y += sumLines.length * 5 + 2;
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...GRAY);
    doc.setFontSize(9);
    const detLines = doc.splitTextToSize(data.aiPresence.detail, CONTENT_W);
    ensureSpace(detLines.length * 4.5 + 4);
    doc.text(detLines, M, y);
    y += detLines.length * 4.5 + 8;
  }

  // Como resolver
  sectionHeader(doc, "Como resolver", y, ensureSpace);
  y += 13;
  data.services.forEach((service, index) => {
    ensureSpace(14);
    doc.setFillColor(...GREEN);
    doc.circle(M + 2.5, y - 2.2, 2.5, "F");
    doc.setTextColor(...BG);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.text(String(index + 1), M + 2.5, y - 0.6, { align: "center" });
    doc.setTextColor(...LIGHT);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    const lines = doc.splitTextToSize(service, CONTENT_W - 10);
    doc.text(lines, M + 9, y);
    y += lines.length * 5 + 3;
  });

  addFooter(doc);

  const safeName =
    data.companyName
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-zA-Z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-")
      .toLowerCase() || "radar-vivo";
  doc.save(`relatorio-${safeName}.pdf`);
}

type EnsureSpace = (needed: number) => void;

function sectionHeader(doc: jsPDF, title: string, y: number, ensureSpace: EnsureSpace) {
  ensureSpace(16);
  doc.setFillColor(...GREEN);
  doc.rect(M, y - 4, 1.8, 7, "F");
  doc.setTextColor(...WHITE);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text(title, M + 6, y + 1.5);
}

function subHeader(doc: jsPDF, title: string, color: [number, number, number], y: number) {
  doc.setTextColor(...color);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text(title, M, y);
}

function bulletList(
  doc: jsPDF,
  items: string[],
  x: number,
  startY: number,
  width: number,
  ensureSpace: EnsureSpace
): number {
  let y = startY;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  items.forEach((item) => {
    const lines = doc.splitTextToSize(item, width - 8);
    ensureSpace(lines.length * 4.6 + 1.5);
    doc.setTextColor(...GREEN);
    doc.text("•", x + 1, y);
    doc.setTextColor(...LIGHT);
    doc.text(lines, x + 6, y);
    y += lines.length * 4.6 + 1.5;
  });
  return y;
}

function addFooter(doc: jsPDF) {
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setDrawColor(...BORDER);
    doc.line(M, PAGE_H - 12, PAGE_W - M, PAGE_H - 12);
    doc.setTextColor(...GRAY);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.text("Gerado por ", M, PAGE_H - 6.5);
    doc.setTextColor(...GREEN);
    doc.setFont("helvetica", "bold");
    doc.text("RadarVivo", M + 16, PAGE_H - 6.5);
    doc.setTextColor(...GRAY);
    doc.setFont("helvetica", "normal");
    doc.text(`${i}/${pageCount}`, PAGE_W - M, PAGE_H - 6.5, { align: "right" });
  }
}
