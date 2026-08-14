import type {
  ScannerReport,
} from "./report-builder";

export function buildExecutiveSummary(
  report: ScannerReport
): string {

  return [

    `${report.company} possui índice Radar Vivo de ${report.rvIndex}.`,

    `Prioridade ${report.priority}.`,

    `Potencial estimado de R$ ${report.estimatedRevenue.toLocaleString("pt-BR")}.`,

    `Ticket recomendado de R$ ${report.estimatedTicket.toLocaleString("pt-BR")}.`

  ].join(" ");

}
