import type {
  ScannerReport,
} from "./report-builder";

export interface CommercialPlan {

  objective: string;

  estimatedRevenue: number;

  services: string[];

}

export function buildCommercialPlan(
  report: ScannerReport
): CommercialPlan {

  return {

    objective:
      "Transformar a empresa em referência digital.",

    estimatedRevenue:
      report.estimatedTicket,

    services:
      report.recommendedServices,

  };

}
